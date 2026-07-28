import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  const supabaseAnon = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authErr } = await supabaseAnon.auth.getUser(token);
    if (authErr || !userData.user) throw new Error("Not authenticated");

    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) throw new Error("Unauthorized: Admin access required");

    const body = await req.json();
    const { action, table, id, updates, conversation_id } = body;

    // Whitelist of allowed tables for CRUD
    const allowedTables = [
      "bookings", "booking_items", "booking_audit", "orders", "payments",
      "tour_packages", "tour_itinerary_days", "tour_package_destinations", "tours",
      "destinations", "destination_info", "destination_distances", "countries",
      "airlines", "flights", "flight_price_history",
      "hotels", "hotel_rooms",
      "cars", "car_hire_rates", "car_hire_options", "car_bookings", "drivers",
      "courier_fleet", "courier_bookings", "courier_tracking",
      "providers", "vendors", "venues",
      "places_of_interest", "national_parks", "nearby_airports",
      "events", "media", "ai_knowledge", "faqs", "external_links",
      "pricing_rules", "promo_codes", "availability",
      "volunteer_programs", "wildlife", "travel_alerts", "search_logs",
      "surprise_packages", "provider_ai_settings", "restaurants_extended",
      "tourism_news_feed", "package_offers", "accommodation_offers",
      "business_spotlights", "business_news", "chatbot_conversations", "chatbot_messages",
      "investment_opportunities", "business_directory", "magazine_issues", "zula_tv_videos", "testimonials", "homepage_hero_slides",
      "trip_plans",
      "reviews", "contact_messages", "newsletter_subscriptions", "user_roles", "profiles",
    ];

    let result;

    switch (action) {
      case "list": {
        if (!allowedTables.includes(table)) throw new Error(`Table not allowed: ${table}`);
        const { data, error } = await supabaseAdmin
          .from(table)
          .select("*")
          .order("created_at", { ascending: false })
          .limit(500);
        if (error) throw error;
        result = data;
        break;
      }
      case "update": {
        if (!allowedTables.includes(table)) throw new Error(`Table not allowed: ${table}`);
        if (id === null && table === "user_roles") {
          const { data, error } = await supabaseAdmin
            .from("user_roles")
            .upsert(updates, { onConflict: "user_id,role" })
            .select()
            .single();
          if (error) throw error;
          result = data;
        } else {
          const { data, error } = await supabaseAdmin
            .from(table)
            .update(updates)
            .eq("id", id)
            .select()
            .single();
          if (error) throw error;
          result = data;
        }
        break;
      }
      case "insert": {
        if (!allowedTables.includes(table)) throw new Error(`Table not allowed: ${table}`);
        const { data, error } = await supabaseAdmin
          .from(table)
          .insert(updates)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }
      case "delete": {
        if (!allowedTables.includes(table)) throw new Error(`Table not allowed: ${table}`);
        const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
        if (error) throw error;
        result = { success: true };
        break;
      }
      case "stats": {
        const tables = [
          "bookings", "orders", "contact_messages", "newsletter_subscriptions",
          "reviews", "tour_packages", "destinations", "flights", "hotels",
          "cars", "drivers", "courier_fleet", "courier_bookings", "payments",
          "events", "venues", "national_parks", "wildlife", "promo_codes",
          "tourism_news_feed", "package_offers", "accommodation_offers",
        ];
        const counts = await Promise.all(
          tables.map(t => supabaseAdmin.from(t).select("id", { count: "exact", head: true }))
        );
        result = {};
        tables.forEach((t, i) => { result[t] = counts[i].count || 0; });
        break;
      }
      case "list_users": {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
        if (error) throw error;
        result = data.users.map((u: any) => ({
          id: u.id,
          email: u.email,
          full_name: u.user_metadata?.full_name || "",
          created_at: u.created_at,
          last_sign_in: u.last_sign_in_at,
        }));
        break;
      }
      case "list_messages_for_conversation": {
        if (!conversation_id) throw new Error("conversation_id required");
        const { data, error } = await supabaseAdmin
          .from("chatbot_messages")
          .select("*")
          .eq("conversation_id", conversation_id)
          .order("created_at", { ascending: true });
        if (error) throw error;
        result = data;
        break;
      }
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("admin-api error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: error.message.includes("Unauthorized") ? 403 : 500,
    });
  }
});
