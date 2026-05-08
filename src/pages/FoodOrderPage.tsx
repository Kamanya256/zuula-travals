import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, MapPin, ArrowRight, Star, Clock } from "lucide-react";
import { restaurants } from "@/data/restaurants";

export default function FoodOrderPage() {
  return (
    <div>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl mx-auto">
          <UtensilsCrossed className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl font-display font-bold mb-4">Order Food & Drinks</h1>
          <p className="text-primary-foreground/80">Pick a restaurant, explore their menu, read reviews, and place your order for delivery.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Choose a Restaurant</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <Link
                key={r.slug}
                to={`/restaurants/${r.slug}`}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all group"
              >
                <div className="relative overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{r.type}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg mb-1">{r.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="w-3 h-3" /> {r.location}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Clock className="w-3 h-3" /> {r.hours}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{r.menu.length} menu items</span>
                    <span className="text-primary font-semibold text-sm flex items-center gap-1">
                      View Menu <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30 text-center">
        <div className="container max-w-2xl">
          <h2 className="text-2xl font-display font-bold mb-4">Looking for Shopping Malls?</h2>
          <p className="text-muted-foreground mb-6">Discover malls with restaurants, shops, and entertainment across Kampala.</p>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/malls">Browse Shopping Malls <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
