import { Link } from "react-router-dom";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tips } from "@/data/travelTips";

export default function TravelTipsPage() {
  return (
    <div>
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <Lightbulb className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Travel Tips</h1>
          <p className="text-primary-foreground/80 text-lg">Essential information to prepare for your East African adventure.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main tips */}
            <div className="lg:col-span-2 space-y-6">
              {tips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div key={tip.slug} className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-elevated transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-display font-semibold mb-2">{tip.title}</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tip.summary}</p>
                        <Button asChild variant="outline" size="sm" className="rounded-full">
                          <Link to={`/travel-tips/${tip.slug}`}>
                            Read Full Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-card sticky top-24">
                <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {tips.map((tip) => {
                    const Icon = tip.icon;
                    return (
                      <li key={tip.slug}>
                        <Link to={`/travel-tips/${tip.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Icon className="w-4 h-4" />
                          {tip.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <hr className="my-4 border-border" />
                <h3 className="font-display font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-3">Our travel experts are ready to answer your questions.</p>
                <Link to="/contact" className="inline-flex items-center text-sm text-primary font-medium hover:underline">
                  Contact Us <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <hr className="my-4 border-border" />
                <Link to="/faq" className="inline-flex items-center text-sm text-primary font-medium hover:underline">
                  View FAQ <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-accent/10 rounded-xl border border-accent/20 p-6">
                <h3 className="font-display font-semibold mb-2">Emergency Contacts</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li><strong>Police:</strong> 999 / 112</li>
                  <li><strong>Ambulance:</strong> 911</li>
                  <li><strong>Tourist Police:</strong> +256 800 199 199</li>
                  <li><strong>Zula Travels 24/7:</strong> +256 774 488 956</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
