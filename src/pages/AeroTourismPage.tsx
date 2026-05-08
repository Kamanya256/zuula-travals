import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, ArrowRight, MapPin, Clock, DollarSign, Wind } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import heroImg from "@/assets/hero-uganda.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";

const experiences = [
  {
    title: "Scenic Flights Over the Rift Valley",
    duration: "1-2 hours",
    price: "From $250",
    location: "Entebbe / Kajjansi Airfield",
    desc: "Soar above the Great Rift Valley, Queen Elizabeth NP, and the Rwenzori Mountains. A bird's-eye view of Uganda's diverse landscapes — from savanna plains to volcanic craters and shimmering lakes.",
    highlights: ["Panoramic views of crater lakes", "Fly over Queen Elizabeth NP wildlife", "Photo opportunities from the air", "Professional pilot commentary"],
    img: heroImg,
  },
  {
    title: "Helicopter Tours",
    duration: "30 min - 2 hours",
    price: "From $400",
    location: "Kampala / Entebbe",
    desc: "Experience Uganda from a helicopter — fly over Murchison Falls, circle the snow-capped Rwenzori peaks, or take a cityscape tour of Kampala. The most exclusive way to see East Africa.",
    highlights: ["Murchison Falls aerial view", "Rwenzori Mountains flyover", "Kampala city panorama", "Custom routes available"],
    img: adventureImg,
  },
  {
    title: "Hot Air Balloon Safaris",
    duration: "1 hour flight + breakfast",
    price: "From $350",
    location: "Queen Elizabeth NP",
    desc: "Float silently over the savanna at dawn, watching wildlife below as the sun rises over the African plains. Includes a champagne bush breakfast after landing.",
    highlights: ["Sunrise over the savanna", "Silent wildlife viewing from above", "Champagne bush breakfast", "Professional balloon pilots"],
    img: lodgeImg,
  },
  {
    title: "Air Charter Services",
    duration: "Varies",
    price: "From $500",
    location: "All major destinations",
    desc: "Skip long drives and fly directly to remote safari lodges, national parks, and island destinations. Cessna Caravans and helicopters available for charter.",
    highlights: ["Direct flights to safari lodges", "Time-saving for multi-park safaris", "Bwindi, Murchison, Kidepo access", "Group and private charters"],
    img: heroImg,
  },
];

export default function AeroTourismPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src={heroImg} alt="" className="w-full h-full object-cover" /></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Wind className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Aero Tourism</h1>
          <p className="text-primary-foreground/80 text-lg">See Uganda from the skies — scenic flights, helicopter tours, hot air balloons, and air charters.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={exp.title} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="rounded-xl overflow-hidden shadow-elevated h-72">
                  <img src={exp.img} alt={exp.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold mb-3">{exp.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{exp.duration}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{exp.price}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{exp.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{exp.desc}</p>
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold mb-2">Highlights</h4>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                      {exp.highlights.map((h) => <li key={h} className="flex items-center gap-1"><Plane className="w-3 h-3 text-accent shrink-0" />{h}</li>)}
                    </ul>
                  </div>
                  <Button asChild className="rounded-full">
                    <Link to={`/booking?package=aero-${exp.title.toLowerCase().replace(/\s+/g, "-")}`}>Book This Experience <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-center mb-6">Departure Points</h2>
          <GoogleMapEmbed query="Kajjansi Airfield Uganda" height="400px" />
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Take to the Skies</h2>
          <p className="text-primary-foreground/80 mb-6">Experience East Africa from a breathtaking aerial perspective.</p>
          <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/booking">Book a Flight Experience</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
