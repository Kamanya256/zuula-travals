import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PlayCircle } from "lucide-react";

interface Video {
  id: string;
  title: string;
  guest_name: string | null;
  organisation: string | null;
  category: string | null;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration: string | null;
}

export default function ZulaTVPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("zula_tv_videos")
      .select("*")
      .eq("is_active", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as Video[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container max-w-3xl">
          <p className="text-accent font-medium text-sm tracking-wider uppercase mb-2">Zula TV</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Interviews & Insights</h1>
          <p className="text-primary-foreground/80 text-lg">
            Conversations with tourism boards, government agencies, banks and the entrepreneurs shaping East Africa.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container">
          {loading ? (
            <p className="text-muted-foreground">Loading episodes…</p>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">No episodes published yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((v) => {
                const Wrapper = v.video_url ? "a" : "div";
                return (
                  <Wrapper
                    key={v.id}
                    {...(v.video_url ? { href: v.video_url, target: "_blank", rel: "noreferrer" } : {})}
                    className="group block bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
                  >
                    <div className="relative h-44 bg-secondary overflow-hidden">
                      {v.thumbnail_url && (
                        <img src={v.thumbnail_url} alt={v.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 bg-foreground/25 flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-background" />
                      </div>
                      {v.duration && (
                        <span className="absolute bottom-2 right-2 text-xs bg-foreground/80 text-background px-2 py-0.5 rounded">
                          {v.duration}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1.5">{v.category}</p>
                      <h2 className="font-display font-semibold text-lg mb-1">{v.title}</h2>
                      {(v.guest_name || v.organisation) && (
                        <p className="text-sm text-muted-foreground">{[v.guest_name, v.organisation].filter(Boolean).join(" — ")}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{v.description}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
