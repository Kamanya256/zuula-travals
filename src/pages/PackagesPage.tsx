import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, MapPin, Star, Search } from "lucide-react";
import gorillaBwindiImg from "@/assets/gorilla-bwindi.jpg";
import nileRaftingImg from "@/assets/nile-rafting.jpg";
import cultureImg from "@/assets/culture-uganda.jpg";
import elephantsImg from "@/assets/elephants-queen-elizabeth.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import heroImg from "@/assets/hero-uganda.jpg";
import kampalaImg from "@/assets/kampala-skyline.jpg";
import namirembeImg from "@/assets/namirembe-cathedral.jpg";
import rubagaImg from "@/assets/rubaga-cathedral.jpg";
import gaddafiImg from "@/assets/gaddafi-mosque.jpg";
import kibuliImg from "@/assets/kibuli-mosque.jpg";
import lakeVictoriaImg from "@/assets/lake-victoria.jpg";
import sseeseImg from "@/assets/ssese-islands.jpg";
import balloonImg from "@/assets/balloon-safari.jpg";
import politicalImg from "@/assets/tour-political.jpg";
import healthImg from "@/assets/tour-health.jpg";
import chimpImg from "@/assets/tour-chimp.jpg";
import npImg from "@/assets/tour-national-park.jpg";
import educationImg from "@/assets/tour-education.jpg";
import namugongoImg from "@/assets/namugongo-shrine.jpg";
import mabirImg from "@/assets/tour-mabira.jpg";
import murchisionImg from "@/assets/murchison-falls.jpg";
import kasubiImg from "@/assets/kasubi-tombs.jpg";
import sipiImg from "@/assets/sipi-falls.jpg";
import rwenzoriImg from "@/assets/rwenzori-mountains.jpg";

const categories = ["All", "Wildlife", "Adventure", "Cultural", "City Tours", "Religious", "Marine", "Aero Tourism", "Political", "Health", "Education", "Memorial", "National Parks", "Mountain", "Luxury"];

const packages = [
  // Wildlife
  { title: "Gorilla Trekking — Bwindi", img: gorillaBwindiImg, duration: "3 Days", group: "2-8", location: "Bwindi", price: "From $1,500", slug: "gorilla", category: "Wildlife", rating: 5, desc: "Trek through misty forests to encounter mountain gorillas in their natural habitat at Bwindi Impenetrable Forest." },
  { title: "Chimpanzee Tracking", img: chimpImg, duration: "2 Days", group: "2-8", location: "Kibale NP", price: "From $600", slug: "chimp", category: "Wildlife", rating: 5, desc: "Track habituated chimpanzees through the lush rainforests of Kibale National Park." },
  { title: "Queen Elizabeth Safari", img: elephantsImg, duration: "4 Days", group: "2-8", location: "Queen Elizabeth NP", price: "From $1,200", slug: "safari", category: "Wildlife", rating: 5, desc: "Game drives, boat cruises on Kazinga Channel, and encounters with elephants, lions, and hippos." },
  { title: "Murchison Falls Safari", img: murchisionImg, duration: "3 Days", group: "2-10", location: "Murchison Falls NP", price: "From $950", slug: "murchison", category: "Wildlife", rating: 5, desc: "Witness the world's most powerful waterfall and spot giraffes, elephants, and Nile crocodiles." },
  { title: "Combined East Africa", img: heroImg, duration: "10 Days", group: "2-8", location: "Uganda, Kenya, TZ", price: "From $4,500", slug: "combined", category: "Wildlife", rating: 5, desc: "The ultimate safari across three countries — gorillas, Serengeti, and more." },

  // National Parks
  { title: "National Parks Explorer", img: npImg, duration: "7 Days", group: "2-8", location: "Multiple Parks", price: "From $2,500", slug: "national-parks", category: "National Parks", rating: 5, desc: "The ultimate safari covering Queen Elizabeth, Murchison Falls, and Bwindi." },

  // Adventure
  { title: "Nile Rafting Adventure", img: nileRaftingImg, duration: "2 Days", group: "4-12", location: "Jinja", price: "From $350", slug: "adventure", category: "Adventure", rating: 5, desc: "White-water rafting, bungee jumping, and kayaking on the mighty River Nile at the source." },
  { title: "Mabira Forest Adventure", img: mabirImg, duration: "1 Day", group: "2-12", location: "Jinja Road", price: "From $60", slug: "mabira", category: "Adventure", rating: 4, desc: "Zip-lining, nature walks, bird watching, and mountain biking through Uganda's largest tropical rainforest." },
  { title: "Sipi Falls Hiking", img: sipiImg, duration: "2 Days", group: "2-10", location: "Mt. Elgon", price: "From $180", slug: "sipi-falls", category: "Adventure", rating: 5, desc: "Hike to three stunning waterfalls on Mt. Elgon surrounded by coffee plantations and breathtaking views." },

  // Mountain
  { title: "Rwenzori Mountains Trek", img: rwenzoriImg, duration: "7-9 Days", group: "2-8", location: "Kasese", price: "From $2,200", slug: "rwenzori", category: "Mountain", rating: 5, desc: "Summit the legendary Mountains of the Moon — snow-capped peaks, glacial lakes, and unique alpine vegetation." },

  // City Tours
  { title: "Kampala City Tour", img: kampalaImg, duration: "1 Day", group: "2-15", location: "Kampala", price: "From $80", slug: "city-tour", category: "City Tours", rating: 4, desc: "Discover Kampala's landmarks, vibrant markets, local cuisine, the Uganda Museum, and Owino Market." },

  // Religious
  { title: "Namirembe Cathedral Visit", img: namirembeImg, duration: "Half Day", group: "2-20", location: "Namirembe Hill", price: "From $40", slug: "namirembe", category: "Religious", rating: 4, desc: "Visit the historic St. Paul's Cathedral on Namirembe Hill — the oldest Anglican cathedral in Uganda, built in 1890." },
  { title: "Rubaga Cathedral Tour", img: rubagaImg, duration: "Half Day", group: "2-20", location: "Rubaga Hill", price: "From $40", slug: "rubaga", category: "Religious", rating: 4, desc: "Explore the stunning Rubaga Cathedral (St. Mary's) — the seat of the Catholic Archdiocese of Kampala on Lubaga Hill." },
  { title: "Gaddafi National Mosque", img: gaddafiImg, duration: "Half Day", group: "2-30", location: "Old Kampala", price: "From $30", slug: "gaddafi-mosque", category: "Religious", rating: 5, desc: "Tour the magnificent Uganda National Mosque with its golden dome — climb the minaret for 360° views of Kampala." },
  { title: "Kibuli Mosque Tour", img: kibuliImg, duration: "Half Day", group: "2-20", location: "Kibuli Hill", price: "From $30", slug: "kibuli", category: "Religious", rating: 4, desc: "Visit the beautiful Kibuli Mosque perched on Kibuli Hill with panoramic views of Kampala city." },
  { title: "Namugongo Martyrs Shrine", img: namugongoImg, duration: "Half Day", group: "2-50", location: "Namugongo", price: "From $25", slug: "namugongo", category: "Religious", rating: 5, desc: "Pilgrimage to the sacred Namugongo Martyrs Shrine — where 22 Christian converts were martyred in 1886." },

  // Cultural
  { title: "Cultural Safari", img: cultureImg, duration: "5 Days", group: "2-10", location: "Multiple", price: "From $800", slug: "culture", category: "Cultural", rating: 4, desc: "Immerse yourself in Uganda's 56 indigenous cultures, traditional dances, and local cuisine." },
  { title: "Kasubi Royal Tombs", img: kasubiImg, duration: "Half Day", group: "2-20", location: "Kampala", price: "From $35", slug: "kasubi", category: "Cultural", rating: 5, desc: "Visit the UNESCO World Heritage Site — the burial grounds of four Buganda Kings with traditional thatched architecture." },

  // Marine
  { title: "Lake Victoria Cruise", img: lakeVictoriaImg, duration: "3 Days", group: "2-10", location: "Lake Victoria", price: "From $500", slug: "marine", category: "Marine", rating: 4, desc: "Sunset cruises, sport fishing, and traditional fishing village visits on Africa's largest lake." },
  { title: "Ssese Islands Getaway", img: sseeseImg, duration: "3 Days", group: "2-8", location: "Ssese Islands", price: "From $450", slug: "ssese", category: "Marine", rating: 5, desc: "Tropical island paradise on Lake Victoria — white sand beaches, kayaking, and ultimate relaxation." },

  // Aero Tourism
  { title: "Balloon Safari", img: balloonImg, duration: "1-2 Days", group: "2-4", location: "Multiple", price: "From $600", slug: "aero", category: "Aero Tourism", rating: 5, desc: "Hot air balloon safaris at sunrise, helicopter tours, and scenic flights over Uganda's stunning landscapes." },

  // Political
  { title: "Political Heritage Tour", img: politicalImg, duration: "2 Days", group: "2-15", location: "Kampala", price: "From $250", slug: "political", category: "Political", rating: 4, desc: "Explore Uganda's political history, Parliament, Idi Amin's legacy, and independence monuments." },

  // Health
  { title: "Health & Wellness Retreat", img: healthImg, duration: "5-7 Days", group: "1-6", location: "Multiple", price: "From $1,800", slug: "health", category: "Health", rating: 5, desc: "Kitagata hot springs, spa treatments, yoga, meditation, and traditional healing experiences." },

  // Education
  { title: "Education Tour", img: educationImg, duration: "3-5 Days", group: "10-40", location: "Multiple", price: "From $300", slug: "education", category: "Education", rating: 4, desc: "Educational tours for schools and universities — museums, research centers, wildlife reserves, and cultural institutions." },

  // Memorial
  { title: "Memorial Heritage Tour", img: namugongoImg, duration: "2 Days", group: "2-20", location: "Kampala", price: "From $200", slug: "memorial", category: "Memorial", rating: 4, desc: "Visit Namugongo Martyrs Shrine, Kasubi Royal Tombs, Independence Monument, and other memorial sites." },

  // Luxury
  { title: "Luxury Honeymoon Retreat", img: lodgeImg, duration: "7 Days", group: "2", location: "Multiple", price: "From $3,000", slug: "honeymoon", category: "Luxury", rating: 5, desc: "Premium lodges, private guides, and exclusive romantic experiences across Uganda's finest destinations." },
  { title: "Great Migration Safari", img: balloonImg, duration: "8 Days", group: "2-8", location: "Kenya & Tanzania", price: "From $3,850", slug: "great-migration", category: "Wildlife", rating: 5, desc: "Maasai Mara, Serengeti and Ngorongoro with migration viewing, crater game drives, and optional balloon safari." },
  { title: "Zanzibar Blue Safari", img: sseeseImg, duration: "4 Days", group: "2-10", location: "Zanzibar", price: "From $950", slug: "zanzibar-blue-safari", category: "Marine", rating: 5, desc: "Stone Town, spice farms, sandbanks, snorkeling, dhow sailing, seafood lunches, and beach relaxation." },
  { title: "Kigali Genocide Memorial & City", img: politicalImg, duration: "2 Days", group: "2-12", location: "Rwanda", price: "From $420", slug: "kigali-memorial", category: "Memorial", rating: 5, desc: "A respectful city and memorial experience covering Kigali's history, reconciliation story, markets, and local cuisine." },
  { title: "Uganda Birding & Shoebill", img: lakeVictoriaImg, duration: "3 Days", group: "2-6", location: "Mabamba & Entebbe", price: "From $480", slug: "shoebill-birding", category: "Wildlife", rating: 5, desc: "Track the rare shoebill by canoe, visit botanical gardens, and explore wetland birdlife around Lake Victoria." },
  { title: "Coffee, Tea & Farm Tour", img: sipiImg, duration: "2 Days", group: "2-12", location: "Sipi & Fort Portal", price: "From $220", slug: "agro-tourism", category: "Cultural", rating: 4, desc: "Hands-on coffee processing, tea estate walks, local farm lunches, waterfalls, and community storytelling." },
  { title: "East Africa Student Expedition", img: educationImg, duration: "10 Days", group: "10-40", location: "Uganda, Kenya, Rwanda", price: "From $1,450", slug: "student-expedition", category: "Education", rating: 4, desc: "Museums, universities, conservation labs, innovation hubs, national parks, and guided curriculum-friendly learning." },
];

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = packages
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wider uppercase mb-3">Explore Uganda</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Tour Packages</h1>
          <p className="text-primary-foreground/80 text-lg mb-6">
            From gorilla trekking to city tours, marine adventures to health retreats — discover Uganda your way.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours, destinations..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-background text-foreground text-sm outline-none shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border sticky top-16 md:top-[4.5rem] z-30 bg-background/95 backdrop-blur-md">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container">
          <p className="text-muted-foreground mb-8">{filtered.length} package{filtered.length !== 1 ? "s" : ""} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((pkg) => (
              <div key={pkg.slug} className="group bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-full">
                    {pkg.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
                    {pkg.category}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm text-xs font-medium px-3 py-2 rounded-lg">
                    Includes booking support, itinerary planning & group offer guidance
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: pkg.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{pkg.group} pax</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.location}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <Link to={`/packages/${pkg.slug}`}>
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/50 text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-muted-foreground mb-6">We create custom itineraries tailored to your preferences, budget, and schedule.</p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contact">Request Custom Package</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
