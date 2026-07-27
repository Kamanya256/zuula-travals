import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Detail {
  id: string;
  industry: string;
  country: string | null;
  title: string;
  summary: string | null;
  market_overview: string | null;
  opportunities: string | null;
  incentives: string | null;
  risks: string | null;
  min_investment: number | null;
  currency: string;
  image_url: string | null;
}

const Block = ({ title, body }: { title: string; body: string | null }) =>
  body ? (
    <div>
      <h2 className="font-display font-semibold text-xl mb-2">{title}</h2>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{body}</p>
    </div>
  ) : null;

export default function InvestmentDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("investment_opportunities")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data }) => {
        setItem(data as Detail | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container py-20 text-muted-foreground">Loading…</div>;
  if (!item)
    return (
      <div className="container py-20">
        <p className="text-muted-foreground mb-4">Opportunity not found.</p>
        <Button asChild variant="outline"><Link to="/investment">Back to Investment</Link></Button>
      </div>
    );

  return (
    <article>
      <div className="relative h-[45vh] min-h-[320px] bg-secondary">
        {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 to-foreground/20" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container max-w-3xl">
            <p className="text-accent text-sm uppercase tracking-wider font-medium mb-2">
              {item.industry}{item.country ? ` • ${item.country}` : ""}
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-background">{item.title}</h1>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-12 space-y-8">
        <Link to="/investment" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> All opportunities
        </Link>

        {item.summary && <p className="text-lg leading-relaxed">{item.summary}</p>}

        {item.min_investment && (
          <div className="bg-secondary/60 border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Indicative entry capital</p>
            <p className="text-2xl font-display font-bold">
              {item.currency} {Number(item.min_investment).toLocaleString()}
            </p>
          </div>
        )}

        <Block title="Market Overview" body={item.market_overview} />
        <Block title="Where the Opportunities Are" body={item.opportunities} />
        <Block title="Incentives & Support" body={item.incentives} />
        <Block title="Risks to Plan For" body={item.risks} />

        <div className="border-t border-border pt-8">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contact">Speak to our Investment Desk <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
