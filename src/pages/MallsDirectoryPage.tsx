import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MapPin, Clock, ArrowRight, Utensils } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { restaurants } from "@/data/restaurants";

const malls = [
  { name: "Acacia Mall", location: "Kisementi, Kampala", hours: "9 AM - 9 PM", desc: "Upscale shopping center with international brands, supermarket, cinema, restaurants, and rooftop dining.", amenities: ["Shoprite", "Cinema", "Java House", "Gym", "Forex"], mapQuery: "Acacia Mall Kampala" },
  { name: "Garden City Mall", location: "Yusuf Lule Rd, Kampala", hours: "9 AM - 9 PM", desc: "Major shopping complex with Game store, food court, banks, and entertainment options.", amenities: ["Game Store", "Food Court", "Banks", "Pharmacy", "Restaurants"], mapQuery: "Garden City Mall Kampala" },
  { name: "Forest Mall", location: "Lugogo, Kampala", hours: "9 AM - 9 PM", desc: "Modern mall near Lugogo Cricket Oval with retail, dining, and leisure facilities.", amenities: ["Carrefour", "Restaurants", "Banks", "Beauty", "Fitness"], mapQuery: "Forest Mall Kampala" },
  { name: "Village Mall", location: "Bugolobi, Kampala", hours: "8 AM - 10 PM", desc: "Neighborhood mall popular with expats, featuring cafes, restaurants, and boutiques.", amenities: ["Cafes", "Boutiques", "Pharmacy", "Restaurant", "Spa"], mapQuery: "Village Mall Bugolobi Kampala" },
  { name: "Arena Mall", location: "Nsambya, Kampala", hours: "9 AM - 9 PM", desc: "Community mall with a variety of shops, supermarket, and dining options.", amenities: ["Supermarket", "Fast Food", "Banks", "Salon", "Gym"], mapQuery: "Arena Mall Kampala" },
  { name: "Victoria Mall", location: "Entebbe Road", hours: "9 AM - 8 PM", desc: "Shopping center on Entebbe Road with retail shops and entertainment.", amenities: ["Supermarket", "Restaurants", "Banks", "Cinema", "Shops"], mapQuery: "Victoria Mall Entebbe Road" },
];


export default function MallsDirectoryPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl mx-auto">
          <ShoppingBag className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Shopping & Dining</h1>
          <p className="text-primary-foreground/80 text-lg">Discover malls, restaurants, bars, and essential services across Kampala and beyond.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">🛍️ Shopping Malls</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {malls.map((mall) => (
              <div key={mall.name} className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-elevated transition-all">
                <h3 className="font-display font-bold text-lg mb-1">{mall.name}</h3>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><MapPin className="w-3 h-3" />{mall.location}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3"><Clock className="w-3 h-3" />{mall.hours}</p>
                <p className="text-sm text-muted-foreground mb-3">{mall.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{mall.amenities.map((a) => <span key={a} className="text-xs bg-secondary px-2 py-0.5 rounded-full">{a}</span>)}</div>
                <GoogleMapEmbed query={mall.mapQuery} height="180px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">🍽️ Top Restaurants</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((r) => (
              <Link key={r.slug} to={`/restaurants/${r.slug}`} className="bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <img src={r.image} alt={r.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="w-4 h-4 text-primary" />
                    <h3 className="font-display font-semibold">{r.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1"><MapPin className="w-3 h-3 inline" /> {r.location} · {r.type}</p>
                  <p className="text-sm text-muted-foreground mb-3">{r.desc}</p>
                  <span className="text-primary font-semibold text-sm flex items-center gap-1">
                    View Menu & Order <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <div className="container max-w-2xl">
          <h2 className="text-2xl font-display font-bold mb-4">Hungry? Order Food Delivery</h2>
          <p className="text-muted-foreground mb-6">Browse menus and order food delivered to your hotel, lodge, or location.</p>
          <Button asChild className="rounded-full"><Link to="/food-order">Order Food Now <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
        </div>
      </section>
    </div>
  );
}
