import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTipBySlug, tips } from "@/data/travelTips";
import ReactMarkdown from "react-markdown";

export default function TravelTipDetailPage() {
  const { slug } = useParams();
  const tip = slug ? getTipBySlug(slug) : undefined;

  if (!tip) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Tip Not Found</h1>
        <Button asChild><Link to="/travel-tips">Back to Travel Tips</Link></Button>
      </div>
    );
  }

  const otherTips = tips.filter((t) => t.slug !== slug);
  const Icon = tip.icon;

  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-4xl">
          <Link to="/travel-tips" className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> All Travel Tips
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">{tip.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-foreground">
                <ReactMarkdown>{tip.full}</ReactMarkdown>
              </div>
              <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link to="/booking">Book a Trip <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/contact">Ask Us a Question</Link>
                </Button>
              </div>
            </div>

            <aside>
              <div className="bg-card rounded-xl border border-border p-6 shadow-card sticky top-24">
                <h3 className="font-display font-semibold text-lg mb-4">Other Tips</h3>
                <ul className="space-y-3">
                  {otherTips.map((t) => (
                    <li key={t.slug}>
                      <Link to={`/travel-tips/${t.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <t.icon className="w-4 h-4 shrink-0" />
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <hr className="my-4 border-border" />
                <Link to="/faq" className="inline-flex items-center text-sm text-primary font-medium hover:underline">
                  View FAQ <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
