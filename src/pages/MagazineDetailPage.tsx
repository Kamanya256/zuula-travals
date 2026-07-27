import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileDown } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  issue_number: string | null;
  category: string | null;
  cover_image_url: string | null;
  summary: string | null;
  content: string | null;
  pdf_url: string | null;
  published_at: string;
}

export default function MagazineDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("magazine_issues")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
      .then(({ data }) => {
        setItem(data as Issue | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container py-20 text-muted-foreground">Loading…</div>;
  if (!item)
    return (
      <div className="container py-20">
        <p className="text-muted-foreground mb-4">Issue not found.</p>
        <Button asChild variant="outline"><Link to="/magazine">Back to Magazine</Link></Button>
      </div>
    );

  return (
    <article className="container max-w-3xl py-12">
      <Link to="/magazine" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> All issues
      </Link>
      <p className="text-xs uppercase tracking-wider text-primary font-medium">
        {item.issue_number}{item.category ? ` • ${item.category}` : ""}
      </p>
      <h1 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4">{item.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {new Date(item.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
      </p>
      {item.cover_image_url && (
        <img src={item.cover_image_url} alt={item.title} className="w-full rounded-2xl shadow-elevated mb-8" />
      )}
      {item.summary && <p className="text-lg leading-relaxed mb-6">{item.summary}</p>}
      {item.content && <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{item.content}</p>}
      {item.pdf_url && (
        <Button asChild className="rounded-full mt-8">
          <a href={item.pdf_url} target="_blank" rel="noreferrer">
            <FileDown className="w-4 h-4 mr-2" /> Download the issue
          </a>
        </Button>
      )}
    </article>
  );
}
