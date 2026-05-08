import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { getArticleBySlug, newsArticles } from "@/data/newsArticles";
import ReactMarkdown from "react-markdown";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const staticArticle = slug ? getArticleBySlug(slug) : undefined;
  const [liveArticle, setLiveArticle] = useState<any>(null);
  const [liveChecked, setLiveChecked] = useState(false);

  useEffect(() => {
    setLiveChecked(false);
    if (!slug || staticArticle) {
      setLiveChecked(true);
      return;
    }
    (supabase as any)
      .from("tourism_news_feed")
      .select("slug,title,published_at,category,summary,content,image_url,source_url")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
      .then(({ data }: { data: any }) => setLiveArticle(data))
      .finally(() => setLiveChecked(true));
  }, [slug, staticArticle]);

  const article = staticArticle || (liveArticle ? {
    slug: liveArticle.slug,
    title: liveArticle.title,
    date: liveArticle.published_at,
    category: liveArticle.category,
    summary: liveArticle.summary,
    image: liveArticle.image_url || newsArticles[0].image,
    content: liveArticle.content,
    relatedLink: "/packages",
  } : undefined);

  if (!article && !liveChecked) {
    return <div className="py-32 text-center text-muted-foreground">Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Article Not Found</h1>
        <Button asChild><Link to="/news">Back to News</Link></Button>
      </div>
    );
  }

  const otherArticles = newsArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[300px]">
        <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container max-w-4xl">
            <Link to="/news" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium">{article.category}</span>
              <span className="text-xs text-white/70 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">{article.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-foreground">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <Button asChild className="rounded-full">
                  <Link to={article.relatedLink}>Explore Related Services <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-card sticky top-24">
                <h3 className="font-display font-semibold text-lg mb-4">More News</h3>
                <div className="space-y-4">
                  {otherArticles.map((a) => (
                    <Link key={a.slug} to={`/news/${a.slug}`} className="block group">
                      <span className="text-xs text-muted-foreground">{a.category}</span>
                      <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">{a.title}</h4>
                    </Link>
                  ))}
                </div>
                <hr className="my-4 border-border" />
                <NewsletterSubscribe />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
