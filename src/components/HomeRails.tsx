import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, PlayCircle, Quote, Star, TrendingUp } from "lucide-react";

interface Opportunity {
  id: string; title: string; slug: string; industry: string; country: string | null;
  summary: string | null; image_url: string | null;
}
interface Business {
  id: string; name: string; sector: string | null; country: string | null;
  description: string | null; cover_image_url: string | null; is_verified: boolean;
}
interface Issue {
  id: string; title: string; slug: string; issue_number: string | null;
  cover_image_url: string | null; summary: string | null;
}
interface Video {
  id: string; title: string; guest_name: string | null; organisation: string | null;
  thumbnail_url: string | null; video_url: string | null; duration: string | null;
}
interface Testimonial {
  id: string; author_name: string; role: string | null; country: string | null;
  quote: string; rating: number | null;
}

const SectionHead = ({ eyebrow, title, desc, to, cta }: { eyebrow: string; title: string; desc: string; to: string; cta: string }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
    <div className="max-w-2xl">
      <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground">{desc}</p>
    </div>
    <Button asChild variant="outline" className="rounded-full shrink-0">
      <Link to={to}>{cta} <ArrowRight className="w-4 h-4 ml-2" /></Link>
    </Button>
  </div>
);

export default function HomeRails() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const [inv, biz, mag, tv, tst] = await Promise.all([
        supabase.from("investment_opportunities").select("id,title,slug,industry,country,summary,image_url").eq("is_active", true).order("is_featured", { ascending: false }).limit(3),
        supabase.from("business_directory").select("id,name,sector,country,description,cover_image_url,is_verified").eq("is_active", true).order("is_featured", { ascending: false }).limit(4),
        supabase.from("magazine_issues").select("id,title,slug,issue_number,cover_image_url,summary").eq("is_published", true).order("published_at", { ascending: false }).limit(3),
        supabase.from("zula_tv_videos").select("id,title,guest_name,organisation,thumbnail_url,video_url,duration").eq("is_active", true).order("published_at", { ascending: false }).limit(3),
        supabase.from("testimonials").select("id,author_name,role,country,quote,rating").eq("is_active", true).order("display_order").limit(4),
      ]);
      if (!active) return;
      setOpportunities((inv.data as Opportunity[]) || []);
      setBusinesses((biz.data as Business[]) || []);
      setIssues((mag.data as Issue[]) || []);
      setVideos((tv.data as Video[]) || []);
      setTestimonials((tst.data as Testimonial[]) || []);
    })();
    return () => { active = false; };
  }, []);

  return (
    <>
      {opportunities.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container">
            <SectionHead
              eyebrow="Investment"
              title="Where Capital Is Moving"
              desc="Sector briefs with incentives, entry capital and the risks worth planning for."
              to="/investment"
              cta="All opportunities"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((o) => (
                <Link key={o.id} to={`/investment/${o.slug}`} className="group bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                  <div className="h-44 bg-secondary overflow-hidden">
                    {o.image_url && <img src={o.image_url} alt={o.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary font-medium mb-2">
                      <TrendingUp className="w-3.5 h-3.5" /> {o.industry}{o.country ? ` • ${o.country}` : ""}
                    </p>
                    <h3 className="font-display font-semibold text-lg mb-2">{o.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{o.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {businesses.length > 0 && (
        <section className="py-20 bg-secondary/50">
          <div className="container">
            <SectionHead
              eyebrow="Business Directory"
              title="Meet Verified Local Partners"
              desc="Suppliers, advisors and operators you can contact before you travel."
              to="/business-directory"
              cta="Browse directory"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {businesses.map((b) => (
                <div key={b.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
                  <div className="h-32 bg-secondary overflow-hidden">
                    {b.cover_image_url && <img src={b.cover_image_url} alt={b.name} loading="lazy" className="w-full h-full object-cover" />}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display font-semibold">{b.name}</h3>
                      {b.is_verified && <BadgeCheck className="w-4 h-4 text-primary shrink-0" />}
                    </div>
                    <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">{b.sector}{b.country ? ` • ${b.country}` : ""}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {issues.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container">
            <SectionHead
              eyebrow="Zula Magazine"
              title="Stories From the Continent"
              desc="Long-form reporting on travel, culture and commerce across East Africa."
              to="/magazine"
              cta="Read the magazine"
            />
            <div className="grid sm:grid-cols-3 gap-8">
              {issues.map((i) => (
                <Link key={i.id} to={`/magazine/${i.slug}`} className="group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary shadow-card group-hover:shadow-elevated transition-all">
                    {i.cover_image_url && <img src={i.cover_image_url} alt={i.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-primary font-medium mt-4">{i.issue_number}</p>
                  <h3 className="font-display font-semibold text-lg mt-1">{i.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{i.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="py-20 bg-secondary/50">
          <div className="container">
            <SectionHead
              eyebrow="Zula TV"
              title="Interviews & Insights"
              desc="Conversations with tourism boards, agencies, banks and founders."
              to="/zula-tv"
              cta="Watch all episodes"
            />
            <div className="grid sm:grid-cols-3 gap-6">
              {videos.map((v) => (
                <a
                  key={v.id}
                  href={v.video_url || "/zula-tv"}
                  {...(v.video_url ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group block bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
                >
                  <div className="relative h-40 bg-secondary overflow-hidden">
                    {v.thumbnail_url && <img src={v.thumbnail_url} alt={v.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    <div className="absolute inset-0 bg-foreground/25 flex items-center justify-center">
                      <PlayCircle className="w-11 h-11 text-background" />
                    </div>
                    {v.duration && <span className="absolute bottom-2 right-2 text-xs bg-foreground/80 text-background px-2 py-0.5 rounded">{v.duration}</span>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{[v.guest_name, v.organisation].filter(Boolean).join(" — ")}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Travellers, Investors, Partners</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t) => (
                <figure key={t.id} className="bg-card border border-border rounded-xl p-6 shadow-card">
                  <Quote className="w-6 h-6 text-accent mb-3" />
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</blockquote>
                  <figcaption className="mt-4">
                    <p className="font-display font-semibold text-sm">{t.author_name}</p>
                    <p className="text-xs text-muted-foreground">{[t.role, t.country].filter(Boolean).join(", ")}</p>
                    <div className="flex gap-0.5 mt-2">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
