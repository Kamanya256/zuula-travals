import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ship, ArrowRight, Clock, Users, MapPin, Star } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import marineImg from "@/assets/tour-marine.jpg";
import heroLake from "@/assets/hero-lake.jpg";

const rides = [
  { title: "Kazinga Channel Cruise", location: "Queen Elizabeth NP", duration: "2-3 hours", price: "From $30", rating: 5, group: "2-20", desc: "Cruise along the channel connecting Lake Edward and Lake George. Spot hippos, elephants, buffalo, and 100+ bird species.", img: marineImg },
  { title: "Murchison Falls Boat Safari", location: "Murchison Falls NP", duration: "3 hours", price: "From $40", rating: 5, group: "2-20", desc: "Navigate the Nile to the bottom of the thundering Murchison Falls. See crocodiles, hippos, and elephants.", img: heroLake },
  { title: "Source of the Nile Cruise", location: "Jinja", duration: "1-2 hours", price: "From $20", rating: 4, group: "2-10", desc: "Visit where the Nile begins at Lake Victoria. Historic boat ride to the Speke Monument.", img: marineImg },
  { title: "Lake Victoria Sunset Cruise", location: "Entebbe", duration: "2 hours", price: "From $35", rating: 5, group: "2-15", desc: "Private sunset cruise on Africa's largest lake with drinks and canapes. Perfect for couples.", img: heroLake },
  { title: "Ssese Islands Ferry", location: "Nakiwogo → Kalangala", duration: "3-4 hours", price: "From $15", rating: 4, group: "Public", desc: "Ferry ride to the beautiful Ssese Islands for beach holidays and island exploration.", img: marineImg },
  { title: "Lake Bunyonyi Canoe", location: "Kabale", duration: "1-3 hours", price: "From $10", rating: 5, group: "2-6", desc: "Paddle through the 'Switzerland of Africa' — 29 islands, terraced hills, and serene waters.", img: heroLake },
];

export default function BoatRidesPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src={heroLake} alt="" className="w-full h-full object-cover" /></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Ship className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Boat Rides & Water Safaris</h1>
          <p className="text-primary-foreground/80 text-lg">Explore Uganda's magnificent waterways — lakes, rivers, and channels teeming with wildlife.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride) => (
              <div key={ride.title} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={ride.img} alt={ride.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">{ride.price}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">{Array.from({ length: ride.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}</div>
                  <h3 className="font-display font-semibold text-lg mb-1">{ride.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ride.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ride.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ride.group}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{ride.desc}</p>
                  <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                    <Link to={`/booking?package=boat-${ride.title.toLowerCase().replace(/\s+/g, "-")}`}>Book Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-center mb-6">Water Safari Locations</h2>
          <GoogleMapEmbed query="Lake Victoria, Uganda" height="400px" />
        </div>
      </section>
    </div>
  );
}
