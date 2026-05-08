import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, BriefcaseBusiness } from "lucide-react";

type Spotlight = {
  id: string;
  sector: string;
  country: string | null;
  title: string;
  slug: string;
  summary: string | null;
  image_url: string | null;
  created_at: string;
};

export default function BusinessSpotlight() {
  const [item, setItem] = useState<Spotlight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("business_spotlights")
        .select("id,sector,country,title,slug,summary,image_url,created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setItem(data as Spotlight | null);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-secondary/40 to-background">
        <div className="container">
          <div className="h-64 bg-muted animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }
  if (!item) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/40 to-background">
      <div className="container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" /> BUSINESS SPOTLIGHT • Updates every 8 hours
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Did you know your travel can also become a business venture?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Today we're spotlighting <span className="font-semibold text-foreground">{item.sector}</span>
            {item.country ? <> in <span className="font-semibold text-foreground">{item.country}</span></> : null}.
          </p>
        </div>

        <Card className="overflow-hidden grid md:grid-cols-2 gap-0 shadow-elevated">
          <div className="relative aspect-video md:aspect-auto bg-muted">
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <BriefcaseBusiness className="w-20 h-20 text-primary/50" />
              </div>
            )}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold">
              {item.sector}{item.country ? ` • ${item.country}` : ""}
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight">{item.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{item.summary}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to={`/business/${item.slug}`}>Read Full Article <ArrowRight className="ml-1 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/business-news">Daily Business News</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
