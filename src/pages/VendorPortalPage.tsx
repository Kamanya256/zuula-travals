import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ExternalLink, Loader2, Plus, Store, Trash2 } from "lucide-react";

interface Service { name: string; description?: string }

interface VendorSite {
  id?: string;
  slug: string; business_name: string; tagline: string; about: string; category: string;
  logo_url: string; cover_url: string; phone: string; email: string; whatsapp: string;
  website: string; address: string; city: string; country: string; opening_hours: string;
  services: Service[]; gallery: string[]; socials: { facebook?: string; instagram?: string; x?: string; youtube?: string };
  published: boolean;
}

const EMPTY: VendorSite = {
  slug: "", business_name: "", tagline: "", about: "", category: "Tour operator",
  logo_url: "", cover_url: "", phone: "", email: "", whatsapp: "", website: "",
  address: "", city: "", country: "Uganda", opening_hours: "Mon–Sat, 8:00–18:00",
  services: [], gallery: [], socials: {}, published: false,
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

export default function VendorPortalPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [site, setSite] = useState<VendorSite>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { document.title = "Vendor Portal | Zula Travels"; }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate("/auth"); return; }
    (async () => {
      const { data } = await supabase.from("vendor_sites").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setSite({
          ...EMPTY,
          ...(data as unknown as VendorSite),
          services: (data.services as unknown as Service[]) || [],
          gallery: (data.gallery as unknown as string[]) || [],
          socials: (data.socials as unknown as VendorSite["socials"]) || {},
        });
      }
      setReady(true);
    })();
  }, [user, loading, navigate]);

  const set = <K extends keyof VendorSite>(key: K, value: VendorSite[K]) =>
    setSite((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    if (!user) return;
    if (!site.business_name.trim()) { toast({ title: "Business name is required", variant: "destructive" }); return; }
    const slug = slugify(site.slug || site.business_name);
    setBusy(true);
    const payload = {
      user_id: user.id,
      slug,
      business_name: site.business_name,
      tagline: site.tagline || null,
      about: site.about || null,
      category: site.category || null,
      logo_url: site.logo_url || null,
      cover_url: site.cover_url || null,
      phone: site.phone || null,
      email: site.email || null,
      whatsapp: site.whatsapp || null,
      website: site.website || null,
      address: site.address || null,
      city: site.city || null,
      country: site.country || null,
      opening_hours: site.opening_hours || null,
      services: site.services as unknown as never,
      gallery: site.gallery as unknown as never,
      socials: site.socials as unknown as never,
      published: site.published,
    };
    const res = site.id
      ? await supabase.from("vendor_sites").update(payload).eq("id", site.id).select("id").single()
      : await supabase.from("vendor_sites").insert(payload).select("id").single();
    setBusy(false);
    if (res.error) {
      toast({ title: "Could not save", description: res.error.message.includes("duplicate") ? "That web address is already taken — try another." : res.error.message, variant: "destructive" });
      return;
    }
    setSite((prev) => ({ ...prev, id: res.data.id, slug }));
    toast({ title: "Website saved", description: site.published ? "Your mini website is live." : "Saved as a draft." });
  };

  if (loading || !ready) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container">
          <p className="uppercase tracking-wider text-sm text-primary-foreground/80 mb-2">Vendor Portal</p>
          <h1 className="text-4xl font-display font-bold mb-3">Manage your mini website</h1>
          <p className="max-w-2xl text-primary-foreground/90">
            Every Zula partner gets their own page on zulatravels — update your story, services, photos and contacts
            any time. Changes go live the moment you publish.
          </p>
        </div>
      </section>

      <section className="container py-12 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="font-display flex items-center gap-2"><Store className="w-5 h-5 text-primary" /> Business profile</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bn">Business name</Label>
                  <Input id="bn" value={site.business_name} onChange={(e) => set("business_name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat">Category</Label>
                  <Input id="cat" value={site.category} onChange={(e) => set("category", e.target.value)} placeholder="Hotel, Tour operator, Car hire..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Web address</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/v/</span>
                  <Input id="slug" value={site.slug} onChange={(e) => set("slug", slugify(e.target.value))} placeholder="my-safari-lodge" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Tagline</Label>
                <Input id="tag" value={site.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Authentic safaris from Entebbe since 2012" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about">About your business</Label>
                <Textarea id="about" rows={6} value={site.about} onChange={(e) => set("about", e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">Contact & location</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="ph">Phone</Label><Input id="ph" value={site.phone} onChange={(e) => set("phone", e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="wa">WhatsApp</Label><Input id="wa" value={site.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="em">Email</Label><Input id="em" type="email" value={site.email} onChange={(e) => set("email", e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="web">Website</Label><Input id="web" value={site.website} onChange={(e) => set("website", e.target.value)} placeholder="https://" /></div>
              <div className="space-y-2 sm:col-span-2"><Label htmlFor="ad">Address</Label><Input id="ad" value={site.address} onChange={(e) => set("address", e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="ci">City</Label><Input id="ci" value={site.city} onChange={(e) => set("city", e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="co">Country</Label><Input id="co" value={site.country} onChange={(e) => set("country", e.target.value)} /></div>
              <div className="space-y-2 sm:col-span-2"><Label htmlFor="oh">Opening hours</Label><Input id="oh" value={site.opening_hours} onChange={(e) => set("opening_hours", e.target.value)} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">Services</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {site.services.map((s, i) => (
                <div key={i} className="grid sm:grid-cols-[1fr_2fr_auto] gap-3 items-start">
                  <Input value={s.name} placeholder="Service name"
                    onChange={(e) => set("services", site.services.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
                  <Input value={s.description || ""} placeholder="Short description"
                    onChange={(e) => set("services", site.services.map((x, j) => j === i ? { ...x, description: e.target.value } : x))} />
                  <Button variant="ghost" size="icon" aria-label="Remove service"
                    onClick={() => set("services", site.services.filter((_, j) => j !== i))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => set("services", [...site.services, { name: "", description: "" }])}>
                <Plus className="w-4 h-4 mr-1.5" /> Add service
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">Images</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="logo">Logo URL</Label><Input id="logo" value={site.logo_url} onChange={(e) => set("logo_url", e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="cover">Cover image URL</Label><Input id="cover" value={site.cover_url} onChange={(e) => set("cover_url", e.target.value)} /></div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gal">Gallery image URLs (one per line)</Label>
                <Textarea id="gal" rows={4} value={site.gallery.join("\n")}
                  onChange={(e) => set("gallery", e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">Social links</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {(["facebook", "instagram", "x", "youtube"] as const).map((k) => (
                <div key={k} className="space-y-2">
                  <Label htmlFor={k} className="capitalize">{k}</Label>
                  <Input id={k} value={site.socials[k] || ""} onChange={(e) => set("socials", { ...site.socials, [k]: e.target.value })} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="lg:sticky lg:top-24">
          <CardHeader><CardTitle className="font-display">Publish</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-sm">Live on Zula Travels</p>
                <p className="text-xs text-muted-foreground">Turn off to hide your page.</p>
              </div>
              <Switch checked={site.published} onCheckedChange={(v) => set("published", v)} />
            </div>
            <Button className="w-full rounded-full" onClick={save} disabled={busy}>
              {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save website"}
            </Button>
            {site.id && site.slug && (
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to={`/v/${site.slug}`}>View my page <ExternalLink className="w-4 h-4 ml-2" /></Link>
              </Button>
            )}
            <Button asChild variant="ghost" className="w-full"><Link to="/vendors">Browse all partners</Link></Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
