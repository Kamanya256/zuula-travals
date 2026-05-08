import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TreePine, ArrowRight, MapPin, Clock, Users, Star, Shield, Heart } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";
import npImg from "@/assets/tour-national-park.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";

const gorillaInfo = {
  title: "Mountain Gorilla Trekking",
  subtitle: "A Once-in-a-Lifetime Experience",
  img: gorillaImg,
  overview: "Uganda is home to over half of the world's remaining mountain gorillas (approximately 459 individuals). Trekking through Bwindi Impenetrable Forest to meet these gentle giants is consistently rated as one of the greatest wildlife experiences on Earth.",
  history: "Mountain gorillas were first scientifically described in 1902 by Captain Robert von Beringe. By the 1980s, their population had dropped to just 254 due to habitat loss, poaching, and civil unrest. Conservation efforts led by organizations like the Dian Fossey Gorilla Fund, Uganda Wildlife Authority, and local communities have helped the population recover to over 1,000 individuals today — one of conservation's greatest success stories.",
  habitat: "Gorillas live in the dense tropical montane forests of the Virunga Mountains and Bwindi Impenetrable Forest at elevations between 2,200m and 4,300m. These forests are among the most biodiverse on Earth, hosting 120+ mammal species, 350+ bird species, and 220+ butterfly species.",
  experience: "Treks begin at 8am with a briefing by UWA rangers. Groups of 8 trekkers are assigned a habituated gorilla family. The trek through dense vegetation can last 2-8 hours. Once found, you spend one magical hour observing gorillas feeding, playing, and interacting — just meters away. The emotional impact is profound.",
  permits: "A gorilla permit costs $800 per person for foreign non-residents (as of 2024). Permits must be booked months in advance through UWA or authorized tour operators. Uganda offers the most affordable gorilla trekking compared to Rwanda ($1,500) and DRC ($400).",
  locations: ["Bwindi Impenetrable Forest (4 sectors: Buhoma, Ruhija, Rushaga, Nkuringo)", "Mgahinga Gorilla National Park (Nyakagezi group)"],
};

const chimpInfo = {
  title: "Chimpanzee Tracking",
  subtitle: "Meet Our Closest Relatives",
  img: npImg,
  overview: "Uganda hosts an estimated 5,000 chimpanzees — the largest population in East Africa. Chimpanzee tracking offers an intimate encounter with animals that share 98.7% of our DNA.",
  history: "Jane Goodall's pioneering research in the 1960s transformed our understanding of chimpanzees. Uganda's habituation efforts began in the 1990s at Kibale Forest, and today several chimp communities are fully habituated for tourism. The Chimpanzee Habituation Experience (CHER) in Kibale lets visitors spend a full day with chimps being habituated.",
  habitat: "Chimps inhabit tropical rainforests and wet savannas. Kibale Forest, known as the 'Primate Capital of the World', contains 13 primate species and the highest density of chimps in Africa at 1,500 individuals.",
  experience: "Tracking begins at dawn with expert guides. You'll hear their calls echoing through the canopy before spotting them — swinging between trees, grooming, using tools to extract termites, and caring for young. The standard permit allows 1 hour with chimps; the CHER experience gives you an entire day.",
  locations: ["Kibale National Park (Fort Portal)", "Budongo Forest (Murchison Falls)", "Kyambura Gorge (Queen Elizabeth NP)", "Kalinzu Forest Reserve"],
};

const otherWildlife = [
  { name: "Tree-Climbing Lions", location: "Ishasha, Queen Elizabeth NP", desc: "One of only two populations in the world. Lions lounge in fig trees during the heat of the day — a sight unique to Uganda and Tanzania.", img: wildlifeImg },
  { name: "Big Five Safari", location: "Queen Elizabeth & Murchison Falls NP", desc: "Uganda has all of Africa's Big Five: lions, leopards, elephants, buffalo, and rhinos (at Ziwa Rhino Sanctuary). Combine multiple parks for the complete experience.", img: adventureImg },
  { name: "Shoebill Stork", location: "Mabamba Swamp, Lake Victoria", desc: "The prehistoric-looking Shoebill is one of Africa's most sought-after birds. Uganda's Mabamba Swamp offers the best chances of spotting this extraordinary bird.", img: npImg },
  { name: "Golden Monkeys", location: "Mgahinga Gorilla NP", desc: "Track endangered golden monkeys in the bamboo forests of the Virunga Mountains. Only found in the Virungas and one small area in Rwanda.", img: gorillaImg },
];

export default function WildlifeTourismPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src={gorillaImg} alt="" className="w-full h-full object-cover" /></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <TreePine className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Wildlife Tourism</h1>
          <p className="text-primary-foreground/80 text-lg">From mountain gorillas to tree-climbing lions — Uganda is the ultimate wildlife destination.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">{gorillaInfo.title}</h2>
              <p className="text-accent font-medium mb-4">{gorillaInfo.subtitle}</p>
              <p className="text-muted-foreground mb-4">{gorillaInfo.overview}</p>
              <div className="space-y-4">
                <div><h3 className="font-semibold text-sm uppercase tracking-wide text-primary mb-1">Conservation History</h3><p className="text-sm text-muted-foreground">{gorillaInfo.history}</p></div>
                <div><h3 className="font-semibold text-sm uppercase tracking-wide text-primary mb-1">Habitat</h3><p className="text-sm text-muted-foreground">{gorillaInfo.habitat}</p></div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-elevated"><img src={gorillaInfo.img} alt="Mountain Gorilla" className="w-full h-80 object-cover" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-card rounded-xl border border-border p-6"><h3 className="font-semibold mb-2 flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /> The Trekking Experience</h3><p className="text-sm text-muted-foreground">{gorillaInfo.experience}</p></div>
            <div className="bg-card rounded-xl border border-border p-6"><h3 className="font-semibold mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Permits & Pricing</h3><p className="text-sm text-muted-foreground">{gorillaInfo.permits}</p>
              <div className="mt-3"><p className="text-xs text-muted-foreground font-medium">Available locations:</p><ul className="text-xs text-muted-foreground mt-1 space-y-1">{gorillaInfo.locations.map((l) => <li key={l} className="flex items-start gap-1"><MapPin className="w-3 h-3 mt-0.5 text-accent shrink-0" />{l}</li>)}</ul></div>
            </div>
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="rounded-full"><Link to="/booking?package=gorilla-trekking">Book Gorilla Trekking <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <div className="rounded-xl overflow-hidden shadow-elevated md:order-1"><img src={chimpInfo.img} alt="Chimpanzee" className="w-full h-80 object-cover" /></div>
            <div className="md:order-2">
              <h2 className="text-3xl font-display font-bold mb-2">{chimpInfo.title}</h2>
              <p className="text-accent font-medium mb-4">{chimpInfo.subtitle}</p>
              <p className="text-muted-foreground mb-4">{chimpInfo.overview}</p>
              <div className="space-y-4">
                <div><h3 className="font-semibold text-sm uppercase tracking-wide text-primary mb-1">Research History</h3><p className="text-sm text-muted-foreground">{chimpInfo.history}</p></div>
                <div><h3 className="font-semibold text-sm uppercase tracking-wide text-primary mb-1">Habitat & Behavior</h3><p className="text-sm text-muted-foreground">{chimpInfo.habitat}</p></div>
                <div><h3 className="font-semibold text-sm uppercase tracking-wide text-primary mb-1">The Experience</h3><p className="text-sm text-muted-foreground">{chimpInfo.experience}</p></div>
              </div>
              <div className="mt-4"><p className="text-xs text-muted-foreground font-medium">Locations:</p><ul className="text-xs text-muted-foreground mt-1 space-y-1">{chimpInfo.locations.map((l) => <li key={l} className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent" />{l}</li>)}</ul></div>
            </div>
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="rounded-full"><Link to="/booking?package=chimp-tracking">Book Chimp Tracking <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">More Wildlife Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherWildlife.map((item) => (
              <div key={item.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1">
                <div className="h-40 overflow-hidden"><img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" /></div>
                <div className="p-4">
                  <h3 className="font-display font-semibold mb-1">{item.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><MapPin className="w-3 h-3" />{item.location}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-center mb-6">Wildlife Locations Map</h2>
          <GoogleMapEmbed query="Bwindi Impenetrable Forest Uganda" height="400px" />
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Plan Your Wildlife Safari</h2>
          <p className="text-primary-foreground/80 mb-6">Our expert guides will create a custom itinerary featuring the best wildlife encounters.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/packages">View Packages</Link></Button>
            <Button asChild variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact">Custom Safari</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
