import { Link } from "react-router-dom";
import { MapPin, ArrowRight, TreePine, Waves, Mountain, Church, GraduationCap, Landmark } from "lucide-react";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";
import cultureImg from "@/assets/culture-uganda.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import heroLake from "@/assets/hero-lake.jpg";
import npImg from "@/assets/tour-national-park.jpg";
import religionImg from "@/assets/tour-religion.jpg";

const attractions = [
  {
    category: "National Parks & Forests",
    icon: TreePine,
    items: [
      { name: "Bwindi Impenetrable Forest", location: "South-western Uganda", desc: "UNESCO World Heritage Site, home to half the world's mountain gorillas. Dense tropical rainforest with 120+ mammal species, 350+ bird species, and 220+ butterfly species. The ultimate gorilla trekking destination.", img: gorillaImg, link: "/packages/gorilla" },
      { name: "Mabira Forest Reserve", location: "Jinja Road, 54km from Kampala", desc: "One of Uganda's largest surviving natural tropical rainforests covering 300 sq km. Perfect for zip-lining, nature walks, bird watching (315 species), and mountain biking. Home to the rare grey-cheeked mangabey monkey.", img: npImg, link: "/packages/national-parks" },
      { name: "Queen Elizabeth National Park", location: "Western Uganda", desc: "Uganda's most popular safari park with the famous tree-climbing lions of Ishasha, Kazinga Channel boat cruises, and 95+ mammal species including all the Big Five.", img: wildlifeImg, link: "/packages/safari" },
      { name: "Murchison Falls National Park", location: "North-western Uganda", desc: "The world's most powerful waterfall where the entire Nile forces through a 7-meter gap. Game drives, Nile boat cruises, chimpanzee tracking, and sport fishing.", img: adventureImg, link: "/packages/national-parks" },
      { name: "Kibale National Park", location: "Fort Portal, Western Uganda", desc: "The 'Primate Capital of the World' with 13 primate species including habituated chimpanzees. Also home to forest elephants and 375+ bird species.", img: npImg, link: "/packages/chimp" },
    ],
  },
  {
    category: "Lakes & Waterways",
    icon: Waves,
    items: [
      { name: "Lake Victoria", location: "Southern Uganda", desc: "Africa's largest lake and the source of the White Nile. Visit the Ssese Islands for beaches, fishing, and island hopping. Home to diverse fish species and spectacular sunsets.", img: heroLake, link: "/packages/marine" },
      { name: "River Nile (Source)", location: "Jinja", desc: "The source of the world's longest river. White-water rafting (Grade 5 rapids), bungee jumping, kayaking, and sunset boat cruises. Jinja is East Africa's adventure capital.", img: adventureImg, link: "/packages/adventure" },
      { name: "Lake Bunyonyi", location: "Kabale, South-western Uganda", desc: "The 'Switzerland of Africa' — a stunning terraced lake with 29 islands. Perfect for canoe trips, bird watching, and peaceful retreats. One of the deepest lakes in Africa (900m).", img: heroLake, link: "/packages/honeymoon" },
      { name: "Lake Mburo National Park", location: "Western Uganda", desc: "Uganda's smallest savanna national park with zebras, elands, and hippos. Horseback safaris, night game drives, and boat rides. Only 3.5 hours from Kampala.", img: wildlifeImg, link: "/packages/safari" },
    ],
  },
  {
    category: "Religious & Memorial Sites",
    icon: Church,
    items: [
      { name: "Namugongo Martyrs Shrine", location: "Namugongo, Kampala", desc: "A sacred pilgrimage site where 45 Christian converts were martyred in 1886. The Basilica hosts the annual Martyrs Day celebration (June 3) attracting 3+ million pilgrims. Both Catholic and Anglican shrines stand as powerful symbols of faith.", img: religionImg, link: "/packages/religion" },
      { name: "Kasubi Royal Tombs", location: "Kasubi Hill, Kampala", desc: "UNESCO World Heritage Site — the burial grounds of the Kings of Buganda. A masterpiece of organic architecture built entirely from natural materials. Rich cultural significance.", img: cultureImg, link: "/packages/culture" },
      { name: "Gadaffi National Mosque", location: "Old Kampala", desc: "Uganda's largest mosque with stunning panoramic views of Kampala from its minaret. Open to all visitors regardless of faith. A landmark of East African Islamic architecture.", img: religionImg, link: "/packages/religion" },
    ],
  },
  {
    category: "Mountains & Volcanoes",
    icon: Mountain,
    items: [
      { name: "Rwenzori Mountains", location: "Western Uganda", desc: "The legendary 'Mountains of the Moon' — Africa's third highest peak (5,109m). Glaciers, alpine meadows, and unique vegetation zones. A challenging trek rewarded with breathtaking views.", img: lodgeImg, link: "/packages/national-parks" },
      { name: "Mount Elgon", location: "Eastern Uganda", desc: "An extinct volcano with the world's largest caldera. Hot springs, Sipi Falls, and cave explorations. Less crowded than Kilimanjaro with equally stunning landscapes.", img: npImg, link: "/packages/national-parks" },
      { name: "Sipi Falls", location: "Kapchorwa, Eastern Uganda", desc: "Three spectacular waterfalls cascading down Mount Elgon. Hiking, abseiling, coffee tours, and breathtaking views of the Karamoja plains below.", img: lodgeImg, link: "/packages/adventure" },
    ],
  },
  {
    category: "Education & Cultural Tours",
    icon: GraduationCap,
    items: [
      { name: "Uganda Museum", location: "Kampala", desc: "Uganda's oldest and largest museum showcasing ethnography, natural history, science, and traditional musical instruments. A comprehensive introduction to Uganda's diverse cultures.", img: cultureImg, link: "/packages/city-tour" },
      { name: "Igongo Cultural Centre", location: "Mbarara", desc: "An award-winning museum telling the story of the Ankole people. Interactive exhibits, traditional Hima homestead, and cultural performances. Essential stop on the western Uganda route.", img: cultureImg, link: "/packages/culture" },
      { name: "Ndere Cultural Centre", location: "Kampala", desc: "Weekly cultural performances showcasing dances from all 56 tribes of Uganda. Live drumming, traditional cuisine, and craft workshops. The best cultural experience in Kampala.", img: cultureImg, link: "/packages/culture" },
    ],
  },
];

export default function AttractionsPage() {
  return (
    <div>
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <Landmark className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Tourist Attractions</h1>
          <p className="text-primary-foreground/80 text-lg">
            Discover Uganda's breathtaking national parks, sacred sites, mighty waterways, and rich cultural heritage.
          </p>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-8 bg-accent/10 border-b border-accent/20">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">🌍 <strong>Welcome to the Pearl of Africa!</strong> Uganda offers some of the most diverse and stunning attractions in all of Africa. Let us guide you through the best experiences this beautiful country has to offer.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {attractions.map((cat) => (
            <div key={cat.category} className="mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">{cat.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <div key={item.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><MapPin className="w-3 h-3" />{item.location}</p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.desc}</p>
                      <Link to={item.link} className="inline-flex items-center text-sm text-primary font-medium hover:underline">
                        Explore Package <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Explore Uganda?</h2>
          <p className="text-primary-foreground/80 mb-6">Let us create a custom itinerary featuring your favorite attractions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/packages" className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent/90">View Tour Packages</Link>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-primary-foreground/30 text-primary-foreground rounded-full font-medium hover:bg-primary-foreground/10">Custom Itinerary</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
