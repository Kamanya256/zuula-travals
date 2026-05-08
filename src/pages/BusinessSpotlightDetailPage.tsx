import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Building2, MapPin, TrendingUp, FileText, DollarSign } from "lucide-react";

type Row = {
  id: string; title: string; slug: string; sector: string; country: string | null;
  summary: string | null; full_article: string | null; image_url: string | null;
  deposits_locations: string | null; market_trends: string | null; fraud_warnings: string | null;
  government_policies: string | null; requirements: string | null; prices: string | null;
  key_stats: Record<string, string> | null; created_at: string;
};

export default function BusinessSpotlightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("business_spotlights").select("*").eq("slug", slug).maybeSingle();
      setItem(data as Row | null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="py-32 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" /></div>;
  if (!item) return <div className="py-32 text-center"><h1 className="text-2xl font-bold mb-4">Article not found</h1><Button asChild><Link to="/">Back home</Link></Button></div>;

  const stats = item.key_stats && typeof item.key_stats === "object" ? Object.entries(item.key_stats) : [];

  return (
    <article className="pb-20">
      <div className="relative h-[40vh] min-h-[300px] bg-muted">
        {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="container absolute inset-x-0 bottom-0 pb-8">
          <Button asChild variant="secondary" size="sm" className="mb-4"><Link to="/"><ArrowLeft className="w-4 h-4 mr-1" /> Home</Link></Button>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge>{item.sector}</Badge>
            {item.country && <Badge variant="secondary">{item.country}</Badge>}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold max-w-4xl">{item.title}</h1>
        </div>
      </div>

      <div className="container py-10 max-w-4xl">
        {item.summary && <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{item.summary}</p>}

        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {stats.map(([k, v]) => (
              <Card key={k} className="p-4">
                <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">{k.replace(/_/g, " ")}</p>
                <p className="font-semibold">{String(v)}</p>
              </Card>
            ))}
          </div>
        )}

        {item.full_article && (
          <div className="prose prose-lg max-w-none mb-10 prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/90">
            <ReactMarkdown>{item.full_article}</ReactMarkdown>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {item.deposits_locations && <DetailCard icon={MapPin} title="Deposits & Locations" body={item.deposits_locations} />}
          {item.market_trends && <DetailCard icon={TrendingUp} title="Market Trends" body={item.market_trends} />}
          {item.prices && <DetailCard icon={DollarSign} title="Prices" body={item.prices} />}
          {item.government_policies && <DetailCard icon={Building2} title="Government Policies" body={item.government_policies} />}
          {item.requirements && <DetailCard icon={FileText} title="Requirements to Start" body={item.requirements} />}
          {item.fraud_warnings && <DetailCard icon={AlertTriangle} title="Fraud Warnings" body={item.fraud_warnings} variant="warning" />}
        </div>

        <Card className="p-6 mt-10 bg-primary/5 border-primary/20 text-center">
          <p className="font-display text-xl mb-3">Want to combine your trip with an investment scouting visit?</p>
          <Button asChild size="lg"><Link to="/contact">Talk to our team</Link></Button>
        </Card>
      </div>
    </article>
  );
}

function DetailCard({ icon: Icon, title, body, variant }: { icon: any; title: string; body: string; variant?: "warning" }) {
  return (
    <Card className={`p-5 ${variant === "warning" ? "border-destructive/30 bg-destructive/5" : ""}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${variant === "warning" ? "text-destructive" : "text-primary"}`} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{body}</p>
    </Card>
  );
}
