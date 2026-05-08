import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { newsArticles } from "@/data/newsArticles";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type FeedArticle = {
  slug: string;
  title: string;
  published_at: string;
  category: string;
  summary: string | null;
  image_url: string | null;
};

export default function NewsPage() {
  const [feedArticles, setFeedArticles] = useState<FeedArticle[]>([]);

  useEffect(() => {
    (supabase as any)
      .from("tourism_news_feed")
      .select("slug,title,published_at,category,summary,image_url")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(9)
      .then(({ data }: { data: FeedArticle[] | null }) => setFeedArticles(data || []));
  }, []);

  const liveArticles = feedArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.published_at,
    category: article.category,
    summary: article.summary || "AI-curated East Africa travel intelligence for visitors.",
    image: article.image_url || newsArticles[0].image,
  }));
  const articles = [...liveArticles, ...newsArticles];

  return (
    <div>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl mx-auto">
          <Newspaper className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl font-display font-bold mb-4">Travel News & Updates</h1>
          <p className="text-primary-foreground/80 mb-6">Stay updated with the latest travel news, destination updates, and special offers across East Africa.</p>
          <NewsletterSubscribe />
        </div>
      </section>

      {/* Featured article */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <Link to={`/news/${articles[0].slug}`} className="group block bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all">
            <div className="grid md:grid-cols-2">
              <img src={articles[0].image} alt={articles[0].title} className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{articles[0].category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(articles[0].date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
                <h2 className="font-display font-bold text-2xl mb-3 group-hover:text-primary transition-colors">{articles[0].title}</h2>
                <p className="text-muted-foreground mb-4">{articles[0].summary}</p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All articles */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <Link key={article.slug} to={`/news/${article.slug}`} className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all">
                <img src={article.image} alt={article.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{article.category}</span>
                    <span className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{article.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
