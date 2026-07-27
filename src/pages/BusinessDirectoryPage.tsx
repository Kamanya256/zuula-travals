import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BadgeCheck, Globe, Mail, MapPin, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Business {
  id: string;
  name: string;
  sector: string | null;
  country: string | null;
  city: string | null;
  description: string | null;
  services: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  cover_image_url: string | null;
  is_verified: boolean;
}

export default function BusinessDirectoryPage() {
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("All");

  useEffect(() => {
    supabase
      .from("business_directory")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .then(({ data }) => {
        setItems((data as Business[]) || []);
        setLoading(false);
      });
  }, []);

  const sectors = ["All", ...Array.from(new Set(items.map((i) => i.sector).filter(Boolean) as string[]))];
  const filtered = items.filter((i) => {
    const matchSector = sector === "All" || i.sector === sector;
    const term = q.trim().toLowerCase();
    const matchTerm =
      !term ||
      i.name.toLowerCase().includes(term) ||
      (i.description || "").toLowerCase().includes(term) ||
      (i.country || "").toLowerCase().includes(term);
    return matchSector && matchTerm;
  });

  return (
    <div>
      <section className="bg-secondary py-14">
        <div className="container max-w-3xl">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Business Directory</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Verified Businesses Across East Africa</h1>
          <p className="text-muted-foreground text-lg">
            Find suppliers, partners and service providers before you land — from agro-exporters to advisory firms.
          </p>
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, sector or country"
              className="pl-9 rounded-full bg-background"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-8">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setSector(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  sector === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading directory…</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground">No businesses match your search.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((b) => (
                <div key={b.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
                  <div className="h-36 bg-secondary overflow-hidden">
                    {b.cover_image_url && (
                      <img src={b.cover_image_url} alt={b.name} loading="lazy" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-display font-semibold text-lg">{b.name}</h2>
                      {b.is_verified && <BadgeCheck className="w-5 h-5 text-primary shrink-0" aria-label="Verified" />}
                    </div>
                    <p className="text-xs uppercase tracking-wider text-primary font-medium">{b.sector}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{b.description}</p>
                    <div className="pt-2 space-y-1.5 text-sm text-muted-foreground">
                      {(b.city || b.country) && (
                        <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{[b.city, b.country].filter(Boolean).join(", ")}</p>
                      )}
                      {b.phone && <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{b.phone}</p>}
                      {b.email && <p className="flex items-center gap-2 break-all"><Mail className="w-3.5 h-3.5 shrink-0" />{b.email}</p>}
                      {b.website && (
                        <a href={b.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                          <Globe className="w-3.5 h-3.5" /> Visit website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
