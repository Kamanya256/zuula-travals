import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

type Row = { id: string; country: string | null; sector: string | null; title: string; slug: string; summary: string | null; full_article: string | null; image_url: string | null; published_at: string };

export default function BusinessNewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("business_news").select("*").eq("slug", slug).maybeSingle();
      setItem(data as Row | null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="py-32 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" /></div>;
  if (!item) return <div className="py-32 text-center"><h1 className="text-2xl font-bold mb-4">Article not found</h1><Button asChild><Link to="/business-news">Back to News</Link></Button></div>;

  return (
    <article className="py-10">
      <div className="container max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-4"><Link to="/business-news"><ArrowLeft className="w-4 h-4 mr-1" /> All Business News</Link></Button>
        <div className="flex gap-2 mb-3">
          {item.country && <Badge variant="secondary">{item.country}</Badge>}
          {item.sector && <Badge>{item.sector}</Badge>}
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">{item.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">{new Date(item.published_at).toLocaleDateString()}</p>
        {item.image_url && <img src={item.image_url} alt={item.title} className="w-full rounded-xl mb-6" />}
        {item.summary && <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{item.summary}</p>}
        {item.full_article && (
          <div className="prose prose-lg max-w-none prose-headings:font-display">
            <ReactMarkdown>{item.full_article}</ReactMarkdown>
          </div>
        )}
      </div>
    </article>
  );
}
