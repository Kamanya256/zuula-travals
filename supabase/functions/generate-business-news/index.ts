import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COUNTRIES = ["Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi", "South Sudan", "DRC"];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

    const created: string[] = [];
    for (const country of COUNTRIES) {
      try {
        const ai = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: "Profitable-business news brief for travelers/investors visiting East Africa. Factual, no fabricated quotes." },
              { role: "user", content: `Write today's profitable-business brief for ${country}. Pick ONE high-potential sector. Return JSON: { sector, title (<90 chars), summary (2 sentences), full_article (400-600 words markdown) }.` },
            ],
            tools: [{
              type: "function",
              function: {
                name: "save_news",
                parameters: {
                  type: "object",
                  properties: {
                    sector: { type: "string" },
                    title: { type: "string" },
                    summary: { type: "string" },
                    full_article: { type: "string" },
                  },
                  required: ["sector", "title", "summary", "full_article"],
                },
              },
            }],
            tool_choice: { type: "function", function: { name: "save_news" } },
          }),
        });
        if (!ai.ok) continue;
        const aj = await ai.json();
        const args = aj.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
        if (!args) continue;
        const c = JSON.parse(args);
        const slug = `${country.toLowerCase().replace(/\s+/g, "-")}-${(c.title as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}-${Date.now().toString(36)}`;
        const { error } = await admin.from("business_news").insert({
          country, sector: c.sector, title: c.title, slug,
          summary: c.summary, full_article: c.full_article,
          published_at: new Date().toISOString(),
        });
        if (!error) created.push(slug);
      } catch (e) { console.warn(`news ${country} failed`, e); }
    }
    return new Response(JSON.stringify({ success: true, created }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("generate-business-news error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
