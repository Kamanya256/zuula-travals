import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SECTORS = [
  { sector: "Mining", country: "Uganda", focus: "gold, copper, cobalt, rare earths" },
  { sector: "Mining", country: "DRC", focus: "cobalt, coltan, copper, diamonds" },
  { sector: "Mining", country: "Rwanda", focus: "tin, tungsten, tantalum (3T minerals)" },
  { sector: "Mining", country: "Kenya", focus: "titanium, gold, soda ash, rare earths" },
  { sector: "Agriculture", country: "Uganda", focus: "coffee, tea, maize, dairy, horticulture" },
  { sector: "Agriculture", country: "Kenya", focus: "tea, avocado, flowers, macadamia" },
  { sector: "Agriculture", country: "Tanzania", focus: "cashew, cotton, sisal, sunflower" },
  { sector: "Fishing & Aquaculture", country: "Uganda", focus: "Lake Victoria tilapia & Nile perch, cage fish farming" },
  { sector: "Tourism", country: "East Africa", focus: "eco-lodges, safari operations, cultural tourism" },
  { sector: "Education", country: "East Africa", focus: "international schools, vocational/TVET, EdTech" },
  { sector: "Health", country: "East Africa", focus: "private clinics, diagnostic labs, pharma manufacturing" },
  { sector: "Real Estate", country: "Kenya", focus: "Nairobi commercial, affordable housing, gated estates" },
  { sector: "Renewable Energy", country: "Kenya", focus: "geothermal, solar mini-grids, wind" },
  { sector: "Manufacturing", country: "Tanzania", focus: "agro-processing, textiles, cement" },
  { sector: "ICT & Fintech", country: "Rwanda", focus: "Kigali Innovation City, mobile money, BPO" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    // pick a sector not used in last 5 spotlights
    const { data: recent } = await admin
      .from("business_spotlights")
      .select("sector,country")
      .order("created_at", { ascending: false })
      .limit(5);
    const recentKeys = new Set((recent ?? []).map((r) => `${r.sector}::${r.country}`));
    const candidates = SECTORS.filter((s) => !recentKeys.has(`${s.sector}::${s.country}`));
    const pick = (candidates.length ? candidates : SECTORS)[Math.floor(Math.random() * (candidates.length ? candidates.length : SECTORS.length))];

    // Optional Perplexity research
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    let research = "";
    if (PERPLEXITY_API_KEY) {
      try {
        const pr = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "sonar",
            messages: [
              { role: "system", content: "Be precise, cite recent figures." },
              { role: "user", content: `Latest 2025 data on ${pick.sector} (${pick.focus}) in ${pick.country}: deposits/locations, market size & trend, prices, key fraud risks, government policies/licensing requirements. Be concise.` },
            ],
          }),
        });
        if (pr.ok) {
          const pj = await pr.json();
          research = pj.choices?.[0]?.message?.content ?? "";
        }
      } catch (e) { console.warn("Perplexity failed:", e); }
    }

    // Generate structured article via Lovable AI
    const ai = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an East African investment research analyst. Write factual, useful briefs for travelers considering investment opportunities. Avoid making up specific prices; use ranges and qualitative trend language. Output strictly JSON." },
          { role: "user", content: `Create an investment spotlight on: ${pick.sector} in ${pick.country} (${pick.focus}).\n\n${research ? "Live research notes:\n" + research + "\n\n" : ""}Return JSON with keys: title (catchy, <80 chars), summary (2 sentences for the homepage card), full_article (700-1000 words, markdown, with H2 sections), deposits_locations, market_trends, fraud_warnings, government_policies, requirements, prices (price ranges/trend, no fake quotes), key_stats (object of 3-5 short stat strings).` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "save_spotlight",
            description: "Save the spotlight content",
            parameters: {
              type: "object",
              properties: {
                title: { type: "string" },
                summary: { type: "string" },
                full_article: { type: "string" },
                deposits_locations: { type: "string" },
                market_trends: { type: "string" },
                fraud_warnings: { type: "string" },
                government_policies: { type: "string" },
                requirements: { type: "string" },
                prices: { type: "string" },
                key_stats: { type: "object", additionalProperties: { type: "string" } },
              },
              required: ["title", "summary", "full_article"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "save_spotlight" } },
      }),
    });

    if (!ai.ok) {
      const t = await ai.text();
      throw new Error(`AI gateway error ${ai.status}: ${t}`);
    }
    const aj = await ai.json();
    const args = aj.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error("AI returned no tool call");
    const content = JSON.parse(args);

    // Generate image
    let image_url: string | null = null;
    try {
      const img = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content: `Realistic editorial photo: ${pick.sector} in ${pick.country}, ${pick.focus}. East African setting, professional, no text overlay.` }],
          modalities: ["image", "text"],
        }),
      });
      if (img.ok) {
        const ij = await img.json();
        const b64 = ij.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (b64) {
          const data = b64.startsWith("data:") ? b64.split(",")[1] : b64;
          const bytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
          const path = `business/${crypto.randomUUID()}.png`;
          const up = await admin.storage.from("wildlife-images").upload(path, bytes, { contentType: "image/png" });
          if (!up.error) image_url = admin.storage.from("wildlife-images").getPublicUrl(path).data.publicUrl;
        }
      }
    } catch (e) { console.warn("Image gen failed:", e); }

    const slug = (content.title as string)
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      .slice(0, 80) + "-" + Date.now().toString(36);

    // deactivate previous spotlights so only newest is "active hero"
    await admin.from("business_spotlights").update({ is_active: false }).eq("is_active", true);

    const { data, error } = await admin.from("business_spotlights").insert({
      sector: pick.sector,
      country: pick.country,
      title: content.title,
      slug,
      summary: content.summary,
      full_article: content.full_article,
      deposits_locations: content.deposits_locations,
      market_trends: content.market_trends,
      fraud_warnings: content.fraud_warnings,
      government_policies: content.government_policies,
      requirements: content.requirements,
      prices: content.prices,
      key_stats: content.key_stats ?? {},
      image_url,
      is_active: true,
    }).select().single();
    if (error) throw error;

    return new Response(JSON.stringify({ success: true, spotlight: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-business-spotlight error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
