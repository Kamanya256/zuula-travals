import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TOPICS = [
  { category: "Tourism", query: "Uganda tourism safari travel" },
  { category: "Weather", query: "Uganda Kenya Tanzania Rwanda travel weather forecast" },
  { category: "Finance", query: "East Africa currency fuel prices travel trends" },
  { category: "Events", query: "Kampala Nairobi Kigali Dar es Salaam tourism events festival" },
  { category: "Leisure", query: "East Africa food culture nightlife hobbies travel" },
];

const FALLBACK_IMAGES: Record<string, string> = {
  Tourism: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
  Weather: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  Finance: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
  Events: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
  Leisure: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
};

function stripTags(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);
}

async function cacheImage(supabase: any, category: string, imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return imageUrl;
    const bytes = new Uint8Array(await response.arrayBuffer());
    const fileName = `tourism-news/${category.toLowerCase()}-${Date.now()}.jpg`;
    const { error } = await supabase.storage.from("wildlife-images").upload(fileName, bytes, {
      contentType: response.headers.get("content-type") || "image/jpeg",
      upsert: true,
    });
    if (error) return imageUrl;
    const { data } = supabase.storage.from("wildlife-images").getPublicUrl(fileName);
    return data.publicUrl;
  } catch {
    return imageUrl;
  }
}

async function fetchGoogleNews(query: string) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-UG&gl=UG&ceid=UG:en`;
  const response = await fetch(url, { headers: { "User-Agent": "ZulaTravelsBot/1.0" } });
  if (!response.ok) throw new Error(`News fetch failed: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 3).map((match) => {
    const item = match[1];
    return {
      title: stripTags(item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/)?.[1] || item.match(/<title>([\s\S]*?)<\/title>/)?.[1]),
      link: stripTags(item.match(/<link>([\s\S]*?)<\/link>/)?.[1]),
      snippet: stripTags(item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/)?.[1] || ""),
    };
  }).filter((item) => item.title && item.link);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("AI is not configured");

    const created = [];
    for (const topic of TOPICS) {
      const items = await fetchGoogleNews(topic.query);
      const source = items[0];
      if (!source) continue;

      const ai = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: "You rewrite public travel news for Zula Travels. Never invent booking confirmations, availability, exact live prices, or payment instructions. Return only valid JSON." },
            { role: "user", content: `Rewrite this into an original, useful travel-feed item for East Africa visitors. Category: ${topic.category}. Source title: ${source.title}. Source snippet: ${source.snippet}. Return JSON with title, summary, content, tags array, relevance_score 1-100.` },
          ],
        }),
      });
      if (!ai.ok) continue;
      const data = await ai.json();
      const raw = (data.choices?.[0]?.message?.content || "{}").replace(/```json|```/g, "").trim();
      const rewritten = JSON.parse(raw);
      const slug = `${slugify(rewritten.title || source.title)}-${new Date().toISOString().slice(0, 10)}`;
      const cachedImageUrl = await cacheImage(supabase, topic.category, FALLBACK_IMAGES[topic.category]);

      const { data: saved, error } = await supabase.from("tourism_news_feed").upsert({
        title: rewritten.title || source.title,
        slug,
        category: topic.category,
        summary: rewritten.summary || source.snippet,
        content: rewritten.content || source.snippet,
        source_url: source.link,
        image_url: cachedImageUrl,
        tags: rewritten.tags || [topic.category],
        relevance_score: rewritten.relevance_score || 70,
        rewritten_by_ai: true,
        is_published: true,
      }, { onConflict: "slug" }).select().single();
      if (!error) created.push(saved);
    }

    return new Response(JSON.stringify({ success: true, created: created.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("refresh-tourism-news error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});