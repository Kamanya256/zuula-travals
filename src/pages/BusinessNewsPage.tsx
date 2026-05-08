import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type News = { id: string; country: string | null; sector: string | null; title: string; slug: string; summary: string | null; image_url: string | null; published_at: string };

export default function BusinessNewsPage() {
  const [items, setItems] = useState<News[]>([]);
  const [country, setCountry] = useState<string>("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("business_news")
        .select("id,country,sector,title,slug,summary,image_url,published_at")
        .eq("is_active", true)
        .order("published_at", { ascending: false })
        .limit(100);
      setItems((data ?? []) as News[]);
    })();
  }, []);

  const countries = ["All", ...Array.from(new Set(items.map((i) => i.country).filter(Boolean) as string[]))];
  const filtered = items.filter((i) =>
    (country === "All" || i.country === country) &&
    (!q || i.title.toLowerCase().includes(q.toLowerCase()) || (i.summary ?? "").toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="py-12">
      <div className="container">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Daily Business News</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profitable business briefs across East Africa — country by country. Updated daily by our AI research desk.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
          <div className="flex flex-wrap gap-1.5">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${country === c ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-secondary"}`}
              >{c}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No articles yet. New briefs are generated daily.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((n) => (
              <Link key={n.id} to={`/business-news/${n.slug}`}>
                <Card className="overflow-hidden h-full hover:shadow-elevated transition-shadow">
                  <div className="aspect-video bg-muted">
                    {n.image_url && <img src={n.image_url} alt={n.title} loading="lazy" className="w-full h-full object-cover" />}
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      {n.country && <Badge variant="secondary" className="text-xs">{n.country}</Badge>}
                      {n.sector && <Badge className="text-xs">{n.sector}</Badge>}
                    </div>
                    <h3 className="font-display font-semibold text-lg leading-tight mb-2 line-clamp-2">{n.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{n.summary}</p>
                    <p className="text-xs text-muted-foreground mt-3">{new Date(n.published_at).toLocaleDateString()}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
