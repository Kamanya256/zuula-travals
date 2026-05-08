import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ship, Anchor, Fish, Waves, MapPin, Clock, Users, Star, ArrowRight, Compass } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import heroLake from "@/assets/hero-lake.jpg";
import marineImg from "@/assets/tour-marine.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";

const categories = [
  {
    title: "Boat Cruises",
    icon: Ship,
    items: [
      { name: "Kazinga Channel Cruise", location: "Queen Elizabeth NP", duration: "2-3 hrs", price: "$30", desc: "Cruise between Lake Edward & Lake George. Spot hippos, elephants, buffalo, and 100+ bird species along the banks.", img: marineImg },
      { name: "Murchison Falls Nile Cruise", location: "Murchison Falls NP", duration: "3 hrs", price: "$40", desc: "Navigate the Nile to the thundering Murchison Falls. Crocodiles, hippos, elephants, and kingfishers abound.", img: heroLake },
      { name: "Lake Victoria Sunset Cruise", location: "Entebbe", duration: "2 hrs", price: "$35", desc: "Private sunset cruise on Africa's largest lake with cocktails and canapés. Perfect for couples and celebrations.", img: marineImg },
    ],
  },
  {
    title: "Island Tours",
    icon: Compass,
    items: [
      { name: "Ssese Islands Explorer", location: "Kalangala", duration: "2-3 days", price: "$150", desc: "84 islands on Lake Victoria — pristine beaches, tropical forests, fishing villages, and unforgettable sunsets.", img: heroLake },
      { name: "Ngamba Island Chimp Sanctuary", location: "Lake Victoria", duration: "Half day", price: "$85", desc: "Visit 49 orphaned chimpanzees on this island sanctuary. Feed chimps and learn about conservation efforts.", img: adventureImg },
    ],
  },
  {
    title: "Fishing Experiences",
    icon: Fish,
    items: [
      { name: "Nile Perch Sport Fishing", location: "Jinja / Murchison", duration: "Full day", price: "$80", desc: "Fish for the legendary Nile Perch (up to 100kg) on the River Nile. Equipment, boat, and guide included.", img: adventureImg },
      { name: "Lake Victoria Fishing", location: "Entebbe / Ssese", duration: "Half day", price: "$50", desc: "Traditional and sport fishing on Africa's largest lake. Tilapia, Nile Perch, and catfish.", img: marineImg },
    ],
  },
  {
    title: "Ferry & Lake Activities",
    icon: Anchor,
    items: [
      { name: "Ssese Islands Ferry", location: "Nakiwogo → Kalangala", duration: "3-4 hrs", price: "$15", desc: "Public ferry to the beautiful Ssese Islands. Cars and passengers welcome.", img: heroLake },
      { name: "Lake Bunyonyi Canoe Tour", location: "Kabale", duration: "1-3 hrs", price: "$10", desc: "Paddle through the 'Switzerland of Africa' — 29 islands, terraced hills, and the deepest lake (900m).", img: marineImg },
    ],
  },
];

const lakes = [
  { name: "Lake Victoria", desc: "Africa's largest lake (68,800 km²), source of the White Nile. Shared by Uganda, Kenya, and Tanzania. Home to the Ssese Islands and diverse fish species.", significance: "Sustains 30+ million people; vital for fishing, transport, and biodiversity." },
  { name: "Lake Albert", desc: "Located on the Uganda-DRC border in the Albertine Rift. Important for oil reserves and fisheries.", significance: "Named after Prince Albert; connects to Lake Edward via the Semliki River." },
  { name: "Lake Edward", desc: "In Queen Elizabeth NP, connected to Lake George by the Kazinga Channel.", significance: "Named after King Edward VII; famous for boat cruises and hippo populations." },
  { name: "Lake Bunyonyi", desc: "One of Africa's deepest lakes (900m) with 29 islands. Known as the 'Switzerland of Africa'.", significance: "Sacred cultural site; each island has its own legend and history." },
  { name: "Lake Mutanda", desc: "A beautiful crater lake near Bwindi, surrounded by volcanic peaks.", significance: "Gateway to gorilla trekking; offers canoe trips with views of the Virunga Volcanoes." },
];

const craterLakes = [
  { name: "Crater Lakes of Fort Portal", count: "52+ lakes", desc: "A spectacular cluster of volcanic crater lakes in the Kibale-Fort Portal region. Emerald-green waters surrounded by lush vegetation. Popular for hiking, bird watching, and photography." },
  { name: "Lake Nyinabulitwa", count: "1 lake", desc: "A stunning crater lake near Kibale NP perfect for canoeing and nature walks." },
  { name: "Lake Nkuruba", count: "1 lake", desc: "Community-managed crater lake with a forest reserve. Colobus monkeys and 100+ bird species." },
];

export default function MarineTourismPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src={heroLake} alt="" className="w-full h-full object-cover" /></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Waves className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Marine Tourism</h1>
          <p className="text-primary-foreground/80 text-lg">Explore Uganda's magnificent lakes, rivers, crater lakes, and island paradises.</p>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat.title} className="py-16 odd:bg-secondary/30">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><cat.icon className="w-5 h-5 text-primary" /></div>
              <h2 className="text-2xl font-display font-bold">{cat.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item) => (
                <div key={item.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">{item.price}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg mb-1">{item.name}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                    <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                      <Link to={`/booking?package=marine-${item.name.toLowerCase().replace(/\s+/g, "-")}`}>Book Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Lakes & Rivers of Uganda</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lakes.map((lake) => (
              <div key={lake.name} className="bg-card rounded-xl border border-border p-6 shadow-card">
                <Waves className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg mb-2">{lake.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{lake.desc}</p>
                <p className="text-xs text-accent font-medium">{lake.significance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Crater Lakes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {craterLakes.map((cl) => (
              <div key={cl.name} className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="text-xs font-bold text-accent mb-2">{cl.count}</div>
                <h3 className="font-display font-semibold mb-2">{cl.name}</h3>
                <p className="text-sm text-muted-foreground">{cl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-center mb-6">Marine Tourism Map</h2>
          <GoogleMapEmbed query="Lake Victoria Uganda" height="400px" />
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Ready for a Water Adventure?</h2>
          <p className="text-primary-foreground/80 mb-6">Explore Uganda's stunning waterways with expert guides.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/boat-rides">View Boat Rides</Link></Button>
            <Button asChild variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><Link to="/booking">Book Now</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
