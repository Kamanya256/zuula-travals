import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, MapPin, Calendar, Users, ArrowRight, Dumbbell, Fish, Star } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import heroImg from "@/assets/hero-uganda.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";

const stadiums = [
  { name: "Namboole National Stadium", location: "Kampala", capacity: "45,000", desc: "Uganda's largest stadium, home of the Uganda Cranes national football team. Hosts major international matches and concerts.", sport: "Football" },
  { name: "Mandela National Stadium", location: "Namboole, Kampala", capacity: "45,202", desc: "Multi-purpose stadium opened in 1997 for football, athletics, and concerts. Named after Nelson Mandela.", sport: "Multi-sport" },
  { name: "Lugogo Indoor Stadium", location: "Kampala", capacity: "3,000", desc: "Home of Uganda's netball, basketball, and volleyball national teams. Hosts the National Basketball League.", sport: "Indoor Sports" },
  { name: "Nelson Mandela Stadium", location: "Kampala", capacity: "10,000", desc: "Modern multi-purpose arena for indoor sports events, concerts, and cultural shows.", sport: "Multi-purpose" },
];

const teams = [
  { name: "Uganda Cranes", sport: "Football", league: "FUFA Big League / AFCON", desc: "The national football team of Uganda. Qualified for AFCON 2017 and 2019. Rich history in African football." },
  { name: "KCCA FC", sport: "Football", league: "Uganda Premier League", desc: "Kampala's top football club. Multiple-time champions. Represented Uganda in CAF Champions League." },
  { name: "Vipers SC", sport: "Football", league: "Uganda Premier League", desc: "One of Uganda's most successful clubs with multiple league titles. Based at St. Mary's Stadium, Kitende." },
  { name: "She Cranes", sport: "Netball", league: "World Netball Rankings", desc: "Uganda's national netball team, ranked among the top 10 in the world. African champions." },
  { name: "Silverbacks", sport: "Basketball", league: "FIBA AfroBasket", desc: "Uganda's national basketball team making waves in African basketball tournaments." },
];

const activities = [
  { name: "White-Water Rafting", location: "Jinja, Source of the Nile", desc: "Grade 5 rapids on the River Nile — one of the best rafting experiences in the world. Full-day and half-day trips available.", icon: Dumbbell },
  { name: "Sport Fishing", location: "Lake Victoria / Nile", desc: "Fish for legendary Nile Perch (up to 100kg), tilapia, and catfish. Equipment, boats, and expert guides provided.", icon: Fish },
  { name: "Bungee Jumping", location: "Jinja, Nile River", desc: "44-meter bungee jump over the Nile River. East Africa's premier bungee jumping experience.", icon: Dumbbell },
  { name: "Mountain Biking", location: "Mabira Forest / Jinja", desc: "Trail riding through tropical forests, rural villages, and scenic countryside. Bikes and guides available.", icon: Dumbbell },
  { name: "Marathon & Running", location: "Kampala / Kapchorwa", desc: "Uganda hosts the Kampala Marathon annually. Kapchorwa (home of Olympic champions) offers altitude training.", icon: Trophy },
  { name: "Golf Tourism", location: "Kampala / Entebbe / Jinja", desc: "Play at Uganda Golf Club (Africa's oldest), Lake Victoria Serena Golf Resort, and Jinja Nile Resort.", icon: Star },
];

export default function SportsTourismPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src={adventureImg} alt="" className="w-full h-full object-cover" /></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Trophy className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Sports Tourism</h1>
          <p className="text-primary-foreground/80 text-lg">From premier league football to world-class rafting — Uganda is an emerging sports tourism hotspot.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-display font-bold mb-8">Major Stadiums</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stadiums.map((s) => (
              <div key={s.name} className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-elevated transition-all">
                <Trophy className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-semibold mb-1">{s.name}</h3>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><MapPin className="w-3 h-3" />{s.location}</p>
                <p className="flex items-center gap-1 text-xs text-accent font-medium mb-2"><Users className="w-3 h-3" />Capacity: {s.capacity}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-display font-bold mb-8">Local Teams & Leagues</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((t) => (
              <div key={t.name} className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Trophy className="w-4 h-4 text-primary" /></div>
                  <div>
                    <h3 className="font-display font-semibold text-sm">{t.name}</h3>
                    <p className="text-xs text-accent">{t.sport} — {t.league}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-display font-bold mb-8">Adventure & Sport Activities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((a) => (
              <div key={a.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1 p-6">
                <a.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg mb-1">{a.name}</h3>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><MapPin className="w-3 h-3" />{a.location}</p>
                <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to={`/booking?package=sport-${a.name.toLowerCase().replace(/\s+/g, "-")}`}>Book <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Discount Banner */}
      <section className="py-12 bg-accent/10 border-y border-accent/20">
        <div className="container text-center max-w-2xl">
          <Users className="w-10 h-10 text-accent mx-auto mb-3" />
          <h2 className="text-2xl font-display font-bold mb-2">Group Discount: 5% Off!</h2>
          <p className="text-muted-foreground mb-4">Book for more than 5 people and get an automatic <strong>5% discount</strong> on any sports tourism package. Perfect for team-building trips, school groups, and corporate outings.</p>
          <Button asChild className="rounded-full"><Link to="/booking">Book a Group Trip <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-center mb-6">Sports Venues Map</h2>
          <GoogleMapEmbed query="Namboole Stadium Kampala Uganda" height="400px" />
        </div>
      </section>
    </div>
  );
}
