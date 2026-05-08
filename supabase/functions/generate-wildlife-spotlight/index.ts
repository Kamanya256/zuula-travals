import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EAST_AFRICAN_ANIMALS = [
  "Mountain Gorilla", "African Elephant", "Lion", "Leopard", "African Buffalo",
  "Rhinoceros", "Chimpanzee", "Giraffe", "Zebra", "Hippopotamus",
  "Nile Crocodile", "Shoebill Stork", "Grey Crowned Crane", "Flamingo",
  "Cheetah", "Wildebeest", "Impala", "Warthog", "African Wild Dog",
  "Colobus Monkey", "Golden Monkey", "Marabou Stork", "Secretary Bird",
  "Ostrich", "Pangolin", "Okapi", "Bongo", "Sitatunga", "Kob",
  "Topi", "Hyena", "Jackal", "Serval Cat", "Caracal",
  "African Fish Eagle", "Crowned Eagle", "Red Colobus Monkey",
  "Olive Baboon", "Blue Monkey", "Vervet Monkey",
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pick a random animal that hasn't been featured recently
    const { data: recentSpotlights } = await supabase
      .from("wildlife_spotlight")
      .select("animal_name")
      .order("featured_date", { ascending: false })
      .limit(15);

    const recentNames = new Set((recentSpotlights || []).map((s: any) => s.animal_name));
    const available = EAST_AFRICAN_ANIMALS.filter(a => !recentNames.has(a));
    const animal = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : EAST_AFRICAN_ANIMALS[Math.floor(Math.random() * EAST_AFRICAN_ANIMALS.length)];

    // Generate content with AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "You are a wildlife expert for Zula Travels, a tour company based in East Africa. Return ONLY valid JSON, no markdown."
          },
          {
            role: "user",
            content: `Generate a wildlife spotlight for the "${animal}" in East Africa. Return JSON with these exact keys:
{
  "animal_name": "${animal}",
  "description": "A compelling 3-4 sentence description about this animal, its behavior, and why travelers should see it.",
  "habitat": "Brief description of its natural habitat",
  "location": "Specific parks and reserves in East Africa where this animal can be found (Uganda, Kenya, Tanzania, Rwanda, Congo)",
  "fun_facts": "3-4 fun facts, each on a new line",
  "conservation_status": "Its IUCN conservation status (e.g. Endangered, Vulnerable, Least Concern)",
  "best_time_to_visit": "Best months/season to see this animal"
}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) throw new Error(`AI error: ${aiResponse.status}`);
    const aiData = await aiResponse.json();
    let content = aiData.choices?.[0]?.message?.content || "";
    
    // Clean markdown code fences if present
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const animalData = JSON.parse(content);

    // Generate an image for the animal
    const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-image-preview",
        messages: [
          {
            role: "user",
            content: `Generate a stunning wildlife photograph of a ${animal} in its natural East African habitat. The image should be photorealistic, well-lit, and show the animal in a dramatic natural setting.`
          }
        ],
        modalities: ["image", "text"],
      }),
    });

    let imageUrl = `https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800`;
    
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      const generatedImage = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      if (generatedImage) {
        // Upload to Supabase storage
        const base64Data = generatedImage.replace(/^data:image\/\w+;base64,/, "");
        const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        const fileName = `wildlife-spotlight/${animal.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.png`;
        const { error: uploadError } = await supabase.storage
          .from("wildlife-images")
          .upload(fileName, imageBytes, { contentType: "image/png", upsert: true });
        
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from("wildlife-images").getPublicUrl(fileName);
          imageUrl = urlData.publicUrl;
        }
      }
    }

    // Deactivate previous spotlights
    await supabase.from("wildlife_spotlight").update({ is_active: false }).eq("is_active", true);

    // Insert new spotlight
    const { data: newSpotlight, error } = await supabase.from("wildlife_spotlight").insert({
      animal_name: animalData.animal_name || animal,
      description: animalData.description,
      habitat: animalData.habitat,
      location: animalData.location,
      fun_facts: animalData.fun_facts,
      image_url: imageUrl,
      conservation_status: animalData.conservation_status,
      best_time_to_visit: animalData.best_time_to_visit,
      is_active: true,
      featured_date: new Date().toISOString().split("T")[0],
    }).select().single();

    if (error) throw error;

    // Send to newsletter subscribers
    const { data: subscribers } = await supabase
      .from("newsletter_subscriptions")
      .select("email");

    // Log the newsletter send (actual sending would need email infrastructure)
    console.log(`Wildlife spotlight generated for ${animal}. ${(subscribers || []).length} subscribers to notify.`);

    return new Response(JSON.stringify({ success: true, animal: animalData.animal_name, subscribers: (subscribers || []).length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Wildlife spotlight error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
