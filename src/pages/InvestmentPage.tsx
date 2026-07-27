import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

export interface Opportunity {
  id: string;
  industry: string;
  country: string | null;
  title: string;
  slug: string;
  summary: string | null;
  min_investment: number | null;
  currency: string;
  image_url: string | null;
}

export default function InvestmentPage() {
  const [items, setItems] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [industry, setIndustry] = useState<string>("All");

  useEffect(() => {
    supabase
      .from("investment_opportunities")
      .select("id,industry,country,title,slug,summary,min_investment,currency,image_url")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as Opportunity[]) || []);
        setLoading(false);
      });
  }, []);

  const industries = ["All", ...Array.from(new Set(items.map((i) => i.industry)))];
  const filtered = industry === "All" ? items : items.filter((i) => i.industry === industry);

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container max-w-3xl">
          <p className="text-accent font-medium text-sm tracking-wider uppercase mb-2">Investment</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Invest in East Africa</h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Sector-by-sector guidance on where capital is moving across Uganda, Kenya, Tanzania, Rwanda and the wider region — with incentives, risks and realistic entry points.
          </p>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-10">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  industry === ind
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading opportunities…</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground">No opportunities published yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/investment/${item.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-44 overflow-hidden bg-secondary">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium mb-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {item.industry}
                      {item.country && <span className="text-muted-foreground">• {item.country}</span>}
                    </div>
                    <h2 className="font-display font-semibold text-lg mb-2">{item.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
                    {item.min_investment && (
                      <p className="text-sm font-medium mt-3">
                        From {item.currency} {Number(item.min_investment).toLocaleString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-14 bg-secondary/60 border border-border rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-display font-bold mb-3">Need help entering the market?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our investment desk arranges site visits, introductions and regulatory guidance alongside your travel plans.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/contact">
                Request Investment Guidance <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
