import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, ArrowRight } from "lucide-react";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import weddingImg from "@/assets/venue-wedding.jpg";
import conferenceImg from "@/assets/venue-conference.jpg";

const venues = [
  { name: "Speke Resort Convention Center", location: "Munyonyo, Kampala", capacity: "1000+", type: "Convention", rating: 5, img: conferenceImg, desc: "Uganda's premier convention center with state-of-the-art facilities, multiple halls, and lakeside setting." },
  { name: "Kampala Serena Ballroom", location: "Kampala", capacity: "300", type: "Wedding/Gala", rating: 5, img: weddingImg, desc: "Elegant ballroom perfect for weddings, galas, and formal dinners with world-class catering." },
  { name: "Lake Victoria Serena Gardens", location: "Entebbe", capacity: "500+", type: "Outdoor Event", rating: 5, img: weddingImg, desc: "Stunning lakeside gardens for outdoor weddings, corporate retreats, and large celebrations." },
  { name: "Mestil Hotel Conference", location: "Kampala", capacity: "200", type: "Corporate", rating: 4, img: conferenceImg, desc: "Modern corporate event space with AV equipment, breakout rooms, and business center." },
  { name: "Jinja Nile Resort", location: "Jinja", capacity: "150", type: "Retreat", rating: 4, img: lodgeImg, desc: "Riverside venue ideal for team retreats, workshops, and intimate gatherings." },
  { name: "Fort Portal Country Club", location: "Fort Portal", capacity: "100", type: "Boutique", rating: 4, img: weddingImg, desc: "Charming highland venue surrounded by tea plantations and Rwenzori mountain views." },
  { name: "Protea Hotel Entebbe", location: "Entebbe", capacity: "250", type: "Corporate", rating: 4, img: conferenceImg, desc: "Professional event space near the airport with modern conference facilities." },
  { name: "Chobe Safari Lodge", location: "Murchison Falls", capacity: "80", type: "Bush Event", rating: 4, img: lodgeImg, desc: "Unique bush venue for exclusive safari-themed events and corporate retreats." },
];

export default function VenuesPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={weddingImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Venues & Events</h1>
          <p className="text-primary-foreground/80 text-lg">Stunning event venues for weddings, conferences, and corporate retreats across Uganda.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.map((v) => (
              <div key={v.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">{v.type}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: v.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1">{v.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{v.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{v.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{v.capacity} guests</span>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                    <Link to={`/booking?package=venue-${v.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      Inquire & Book <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50 text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Planning a Special Event?</h2>
          <p className="text-muted-foreground mb-6">Our events team will help you find the perfect venue and handle all the logistics.</p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contact">Talk to Our Events Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
