import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Store } from "lucide-react";

interface Site {
  id: string; slug: string; business_name: string; tagline: string | null;
  category: string | null; city: string | null; country: string | null; cover_url: string | null;
}

export default function VendorsPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Verified Partners | Zula Travels";
    (async () => {
      const { data } = await supabase
        .from("vendor_sites")
        .select("id, slug, business_name, tagline, category, city, country, cover_url")
        .eq("published", true)
        .order("business_name");
      setSites((data as unknown as Site[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = sites.filter((s) =>
    [s.business_name, s.tagline, s.category, s.city, s.country].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container">
          <p className="uppercase tracking-wider text-sm text-primary-foreground/80 mb-2">Partners</p>
          <h1 className="text-4xl font-display font-bold mb-3">Our verified vendor pages</h1>
          <p className="max-w-2xl text-primary-foreground/90">
            Lodges, tour operators, car hire firms and restaurants across East Africa — each with their own mini
            website they manage themselves.
          </p>
        </div>
      </section>

      <section className="container py-12 space-y-8">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search partners, cities, categories" className="pl-9" />
          </div>
          <Button asChild variant="outline" className="rounded-full"><Link to="/vendor">Are you a vendor? Manage your page</Link></Button>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="border border-dashed border-border rounded-2xl p-12 text-center">
            <Store className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No partner pages published yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <Card key={s.id} className="overflow-hidden">
                {s.cover_url && <img src={s.cover_url} alt={s.business_name} loading="lazy" className="w-full h-40 object-cover" />}
                <CardContent className="pt-5 space-y-2">
                  {s.category && <Badge variant="secondary">{s.category}</Badge>}
                  <h2 className="font-display font-semibold text-lg">{s.business_name}</h2>
                  {s.tagline && <p className="text-sm text-muted-foreground line-clamp-2">{s.tagline}</p>}
                  <p className="text-xs text-muted-foreground">{[s.city, s.country].filter(Boolean).join(", ")}</p>
                  <Button asChild variant="link" className="px-0"><Link to={`/v/${s.slug}`}>Visit page</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
