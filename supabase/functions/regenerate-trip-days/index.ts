import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Day { day: number; title: string; location: string; activities: string[]; stay?: string }

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const {
      country, travellers, travel_style, budget_range, interests, notes,
      itinerary, day_numbers, instruction,
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const allDays: Day[] = itinerary?.days || [];
    const targets: number[] = (day_numbers || []).map(Number);
    if (!targets.length) throw new Error("Select at least one day to regenerate");

    const context = allDays
      .map((d) => `Day ${d.day}: ${d.title} — ${d.location}${targets.includes(d.day) ? "  <-- REGENERATE THIS DAY" : ""}`)
      .join("\n");

    const prompt = `Rewrite ONLY the marked days of this East Africa itinerary. Keep every other day untouched and keep the route geographically coherent with the days before and after.

Destination/country: ${country || "Uganda"}
Travellers: ${travellers}
Travel style: ${travel_style || "balanced"}
Budget range: ${budget_range || "mid-range"}
Interests: ${(interests || []).join(", ") || "general sightseeing"}
Traveller notes: ${notes || "none"}
Extra instruction for the rewrite: ${instruction || "make these days stronger and better paced"}

Current itinerary outline:
${context}

Return ONLY the regenerated days (day numbers: ${targets.join(", ")}).

Rules:
- NEVER invent prices, costs, availability or booking confirmations.
- Use real places, parks, cities and cultural sites.
- Realistic driving/flight times and pacing.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are Zula Travels' expert East Africa itinerary planner. Always reply with the requested tool call. Never mention money amounts, prices or availability." },
          { role: "user", content: prompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "regenerate_days",
            description: "Return only the rewritten itinerary days",
            parameters: {
              type: "object",
              properties: {
                days: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      day: { type: "number" },
                      title: { type: "string" },
                      location: { type: "string" },
                      activities: { type: "array", items: { type: "string" } },
                      stay: { type: "string" },
                    },
                    required: ["day", "title", "location", "activities"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["days"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "regenerate_days" } },
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Our planner is busy right now. Please try again in a moment." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI planning is temporarily unavailable. Please edit the days manually or contact our team." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) throw new Error(`AI gateway error: ${await response.text()}`);

    const data = await response.json();
    const call = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error("No days returned");
    const newDays: Day[] = JSON.parse(call.function.arguments).days || [];

    const merged = allDays.map((d) => newDays.find((n) => Number(n.day) === d.day) || d);

    return new Response(JSON.stringify({ itinerary: { ...itinerary, days: merged }, regenerated: targets }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("regenerate-trip-days error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
