import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a friendly and knowledgeable travel assistant for Zula Travels, a premium travel and logistics company based in Kampala, Uganda. You help customers with:

- Information about Uganda's tourist attractions (Bwindi, Murchison Falls, Queen Elizabeth NP, Lake Victoria, River Nile, Namugongo, Mabira Forest, etc.)
- Tour packages (gorilla trekking, safaris, city tours, cultural tours, marine, aero tourism, boat rides, industrial parks, etc.)
- Accommodation advice (hotels, safari lodges, motels, apartments, country homes)
- Car hire, flights, courier services
- Volunteer opportunities (orphanages, hospitals, elderly homes, community projects)
- Country guides for Uganda, Kenya, Tanzania, Rwanda, Congo, South Sudan
- Visa applications and gorilla permit information
- Emergency contacts and safety information
- Custom itinerary generation based on user preferences
- Restaurant and mall recommendations
- Food ordering assistance
- Travel tips (visas, vaccinations, packing, best times to visit, currency)

IMPORTANT RULES:
- LANGUAGE: Detect the user's language and respond in the SAME language. If they write in Swahili, respond in Swahili. French → French. etc.
- Do NOT provide specific pricing or booking confirmations. Direct users to the booking page or contact team.
- For bookings: "You can book through our website or contact us at +256 774 488 956 / zulatravels@gmail.com"
- Keep responses concise (2-4 sentences) but helpful.
- Be warm and enthusiastic about East African tourism.
- If asked to create a custom itinerary, generate a detailed day-by-day plan based on their preferences, budget, and duration.
- All payments are in USD.
- If asked about something outside travel, politely redirect.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, userName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build personalized system prompt
    let systemPrompt = SYSTEM_PROMPT;
    if (userName) {
      systemPrompt += `\n\nThe user's name is "${userName}". Address them by their first name to make the conversation personal.`;
    }
    systemPrompt += `\n\nIMPORTANT: Always mention that groups of 5+ people get a 5% discount on all bookings. Proactively suggest this when relevant.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ reply: "I'm receiving too many requests right now. Please try again in a moment." }), {
          status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ reply: "Our AI service is temporarily unavailable. Please contact us directly at +256 774 488 956." }), {
          status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that right now.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("travel-assistant error:", e);
    return new Response(JSON.stringify({ reply: "I'm having trouble right now. Please contact us at +256 774 488 956 or zulatravels@gmail.com." }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
