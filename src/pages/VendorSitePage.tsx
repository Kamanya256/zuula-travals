import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Loader2, Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";

interface Service { name: string; description?: string }
interface Site {
  id: string; slug: string; business_name: string; tagline: string | null; about: string | null;
  category: string | null; logo_url: string | null; cover_url: string | null; phone: string | null;
  email: string | null; whatsapp: string | null; website: string | null; address: string | null;
  city: string | null; country: string | null; opening_hours: string | null;
  services: Service[]; gallery: string[]; socials: Record<string, string>;
}

export default function VendorSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("vendor_sites").select("*").eq("slug", slug!).eq("published", true).maybeSingle();
      setSite(data as unknown as Site | null);
      setLoading(false);
      if (data) {
        document.title = `${data.business_name} | Zula Travels Partner`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", (data.tagline || data.about || "").slice(0, 155));
      }
    })();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  if (!site) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-display font-bold mb-3">Partner page not found</h1>
        <p className="text-muted-foreground mb-6">This vendor page may be unpublished or the address is wrong.</p>
        <Button asChild className="rounded-full"><Link to="/vendors">Browse partners</Link></Button>
      </div>
    );
  }

  const services = site.services || [];
  const gallery = site.gallery || [];
  const socials = site.socials || {};

  return (
    <div className="min-h-screen">
      <section className="relative h-72 md:h-96 bg-muted overflow-hidden">
        {site.cover_url && (
          <img src={site.cover_url} alt={`${site.business_name} cover`} className="w-full h-full object-cover" loading="lazy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="container relative h-full flex items-end pb-8">
          <div className="flex items-end gap-4">
            {site.logo_url && (
              <img src={site.logo_url} alt={`${site.business_name} logo`} className="w-20 h-20 rounded-2xl object-cover border-4 border-background" loading="lazy" />
            )}
            <div>
              {site.category && <Badge className="mb-2">{site.category}</Badge>}
              <h1 className="text-3xl md:text-4xl font-display font-bold">{site.business_name}</h1>
              {site.tagline && <p className="text-muted-foreground">{site.tagline}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 grid lg:grid-cols-[1fr_340px] gap-10 items-start">
        <div className="space-y-10">
          {site.about && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-3">About</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{site.about}</p>
            </div>
          )}

          {services.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-4">Services</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s, i) => (
                  <Card key={i}><CardContent className="pt-6">
                    <h3 className="font-semibold mb-1">{s.name}</h3>
                    {s.description && <p className="text-sm text-muted-foreground">{s.description}</p>}
                  </CardContent></Card>
                ))}
              </div>
            </div>
          )}

          {gallery.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-4">Gallery</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {gallery.map((g, i) => (
                  <img key={i} src={g} alt={`${site.business_name} photo ${i + 1}`} loading="lazy"
                    className="w-full h-40 object-cover rounded-xl" />
                ))}
              </div>
            </div>
          )}
        </div>

        <Card className="lg:sticky lg:top-24">
          <CardContent className="pt-6 space-y-3 text-sm">
            <h2 className="font-display font-bold text-lg">Get in touch</h2>
            {(site.address || site.city) && (
              <p className="flex gap-2"><MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>{[site.address, site.city, site.country].filter(Boolean).join(", ")}</span></p>
            )}
            {site.phone && <p className="flex gap-2"><Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <a href={`tel:${site.phone}`} className="hover:text-primary">{site.phone}</a></p>}
            {site.email && <p className="flex gap-2"><Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <a href={`mailto:${site.email}`} className="hover:text-primary break-all">{site.email}</a></p>}
            {site.website && <p className="flex gap-2"><Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <a href={site.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary break-all">{site.website}</a></p>}
            {site.opening_hours && <p className="flex gap-2"><Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>{site.opening_hours}</span></p>}

            {site.whatsapp && (
              <Button asChild className="w-full rounded-full mt-2">
                <a href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
                </a>
              </Button>
            )}
            <Button asChild variant="outline" className="w-full rounded-full"><Link to="/booking">Book through Zula</Link></Button>

            {Object.values(socials).some(Boolean) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {Object.entries(socials).filter(([, v]) => v).map(([k, v]) => (
                  <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="text-xs text-primary capitalize underline">{k}</a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
