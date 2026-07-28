import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { country, days, travellers, travel_style, budget_range, interests, start_date, notes } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `Create a day-by-day East Africa travel itinerary.
Destination/country: ${country || "Uganda"}
Duration: ${days} days
Travellers: ${travellers}
Travel style: ${travel_style || "balanced"}
Budget range: ${budget_range || "mid-range"}
Interests: ${(interests || []).join(", ") || "general sightseeing"}
Start date: ${start_date || "flexible"}
Extra notes: ${notes || "none"}

Rules:
- NEVER invent prices, costs, availability or booking confirmations.
- Use real places, parks, cities and cultural sites.
- Practical driving/flight times and realistic pacing.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are Zula Travels' expert East Africa itinerary planner. Always reply with the requested tool call. Never mention money amounts, prices or availability.",
          },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "build_itinerary",
              description: "Return a structured travel itinerary",
              parameters: {
                type: "object",
                properties: {
                  summary: { type: "string", description: "2-3 sentence overview of the trip" },
                  best_time: { type: "string", description: "Best time of year for this trip" },
                  packing_tips: { type: "array", items: { type: "string" } },
                  days: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "number" },
                        title: { type: "string" },
                        location: { type: "string" },
                        activities: { type: "array", items: { type: "string" } },
                        stay: { type: "string", description: "Type of accommodation suggested" },
                      },
                      required: ["day", "title", "location", "activities"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["summary", "best_time", "packing_tips", "days"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "build_itinerary" } },
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Our planner is busy right now. Please try again in a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI planning is temporarily unavailable. Please contact our team to plan your trip." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      throw new Error(`AI gateway error: ${t}`);
    }

    const data = await response.json();
    const call = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error("No itinerary returned");
    const itinerary = JSON.parse(call.function.arguments);

    return new Response(JSON.stringify({ itinerary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-trip-plan error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
