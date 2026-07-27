import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Issue {
  id: string;
  title: string;
  slug: string;
  issue_number: string | null;
  category: string | null;
  cover_image_url: string | null;
  summary: string | null;
  published_at: string;
}

export default function MagazinePage() {
  const [items, setItems] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("magazine_issues")
      .select("id,title,slug,issue_number,category,cover_image_url,summary,published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as Issue[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="bg-background py-14 border-b border-border">
        <div className="container max-w-3xl">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Zula Magazine</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Stories From the Continent</h1>
          <p className="text-muted-foreground text-lg">
            Long-form reporting on travel, culture, commerce and the people building East Africa.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container">
          {loading ? (
            <p className="text-muted-foreground">Loading issues…</p>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">No issues published yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((issue) => (
                <Link key={issue.id} to={`/magazine/${issue.slug}`} className="group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary shadow-card group-hover:shadow-elevated transition-all">
                    {issue.cover_image_url && (
                      <img
                        src={issue.cover_image_url}
                        alt={issue.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-primary font-medium mt-4">
                    {issue.issue_number}{issue.category ? ` • ${issue.category}` : ""}
                  </p>
                  <h2 className="font-display font-semibold text-xl mt-1">{issue.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
