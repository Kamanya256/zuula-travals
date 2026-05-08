import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

interface Spotlight {
  id: string;
  animal_name: string;
  description: string;
  habitat: string;
  location: string;
  fun_facts: string;
  image_url: string;
  conservation_status: string;
  best_time_to_visit: string;
  featured_date: string;
}

export default function WildlifeSpotlight() {
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotlight = async () => {
      const { data } = await supabase
        .from("wildlife_spotlight" as any)
        .select("*")
        .eq("is_active", true)
        .order("featured_date", { ascending: false })
        .limit(1)
        .single();
      setSpotlight(data as any);
      setLoading(false);
    };
    fetchSpotlight();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-secondary/50">
        <div className="container flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!spotlight) return null;

  const facts = spotlight.fun_facts?.split("\n").filter(Boolean) || [];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">🦁 Today's Wildlife Spotlight</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet the {spotlight.animal_name}</h2>
          <p className="text-muted-foreground text-sm">
            Featured on {new Date(spotlight.featured_date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={spotlight.image_url}
              alt={spotlight.animal_name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                spotlight.conservation_status?.toLowerCase().includes("endangered")
                  ? "bg-destructive text-destructive-foreground"
                  : spotlight.conservation_status?.toLowerCase().includes("vulnerable")
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}>
                <ShieldCheck className="w-3 h-3 inline mr-1" />
                {spotlight.conservation_status}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">{spotlight.description}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Where to Find</p>
                  <p className="text-xs text-muted-foreground">{spotlight.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border">
                <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Best Time to Visit</p>
                  <p className="text-xs text-muted-foreground">{spotlight.best_time_to_visit}</p>
                </div>
              </div>
            </div>

            {facts.length > 0 && (
              <div className="bg-card rounded-xl p-5 border border-border">
                <h4 className="font-display font-semibold mb-3">🌟 Fun Facts</h4>
                <ul className="space-y-2">
                  {facts.map((fact, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to={`/packages?search=${spotlight.animal_name}`}>
                  Book a Visit <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/wildlife">Explore All Wildlife</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
