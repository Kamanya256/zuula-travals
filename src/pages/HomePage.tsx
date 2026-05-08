import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Star, Shield, Plane, Hotel, Truck, Car, Calendar, TreePine, Award, Building2, ChevronLeft, ChevronRight, BriefcaseBusiness, Pickaxe, Sprout, Fish, GraduationCap, HeartPulse } from "lucide-react";
import heroImage from "@/assets/hero-uganda.jpg";
import WildlifeSpotlight from "@/components/WildlifeSpotlight";
import BusinessSpotlight from "@/components/BusinessSpotlight";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";
import cultureImg from "@/assets/culture-uganda.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import { getRandomHeroSlides, type HeroSlide } from "@/data/heroSlides";

const stats = [
  { value: "10+", label: "National Parks" },
  { value: "50+", label: "Wildlife Species" },
  { value: "1000+", label: "Happy Travelers" },
  { value: "15+", label: "Years Experience" },
];

const destinations = [
  { title: "Uganda", desc: "Gorilla trekking, Nile adventures, Queen Elizabeth NP, and cultural immersion.", img: heroImage, tours: "12 Tours" },
  { title: "Kenya", desc: "Maasai Mara, Amboseli, coastal beaches, and Nairobi city experiences.", img: wildlifeImg, tours: "8 Tours" },
  { title: "Tanzania", desc: "Serengeti migration, Kilimanjaro, Zanzibar beaches, and Ngorongoro Crater.", img: adventureImg, tours: "10 Tours" },
  { title: "Rwanda", desc: "Volcanoes NP gorilla treks, Kigali culture, and Lake Kivu relaxation.", img: cultureImg, tours: "6 Tours" },
];

const reasons = [
  { title: "Gorilla Trekking", desc: "Encounter mountain gorillas in their natural habitat — a life-changing adventure.", img: gorillaImg },
  { title: "Adventure Activities", desc: "From white-water rafting on the Nile to hiking volcanic mountains.", img: adventureImg },
  { title: "Rich Culture", desc: "Discover over 56 indigenous cultures with unique traditions, dances, and crafts.", img: cultureImg },
  { title: "Wildlife Safari", desc: "Home to over 50% of the world's remaining mountain gorillas and countless species.", img: wildlifeImg },
  { title: "Premium Lodging", desc: "Luxury accommodations from safari lodges to boutique hotels across East Africa.", img: lodgeImg },
  { title: "Warm Hospitality", desc: "Experience the famous East African hospitality that makes every visitor feel at home.", img: cultureImg },
];

const services = [
  { icon: Plane, title: "Flights", desc: "Domestic & international flight bookings", path: "/flights" },
  { icon: Hotel, title: "Hotels", desc: "Curated accommodation across East Africa", path: "/hotels" },
  { icon: Car, title: "Car Hire", desc: "Self-drive & chauffeur-driven vehicles", path: "/cars" },
  { icon: Truck, title: "Courier", desc: "Reliable parcel & logistics services", path: "/courier" },
  { icon: Calendar, title: "Events", desc: "Venue booking & event management", path: "/venues" },
  { icon: TreePine, title: "Tours", desc: "Custom safari & tour packages", path: "/packages" },
];

const specialties = [
  { icon: Shield, title: "Eco-Friendly", desc: "Sustainable travel that protects wildlife and supports communities." },
  { icon: Star, title: "Premium Quality", desc: "From luxury lodges to expert guides, we ensure the best." },
  { icon: Users, title: "Expert Team", desc: "15+ years of experience in African travel and wildlife tourism." },
];

const investmentOpportunities = [
  { icon: Pickaxe, title: "Mining & Minerals", desc: "Uganda, Rwanda, Kenya, and Congo hold opportunities in gold, tin, tungsten, cobalt, copper, limestone, and value-added mineral processing." },
  { icon: Sprout, title: "Agriculture & Agro-Processing", desc: "Coffee, tea, dairy, grains, fruits, spices, and export-ready food processing remain strong entry points for long-term regional investors." },
  { icon: Fish, title: "Fishing & Aquaculture", desc: "Lake Victoria and regional waterways support fish farming, cold-chain logistics, processing, and sustainable export partnerships." },
  { icon: TreePine, title: "Tourism & Hospitality", desc: "Safari lodges, cultural trails, eco-camps, wellness retreats, and adventure tourism continue to grow across East Africa." },
  { icon: GraduationCap, title: "Education & Skills", desc: "Demand is rising for vocational training, digital learning, hospitality skills, healthcare training, and international-standard schools." },
  { icon: HeartPulse, title: "Health & Wellness", desc: "Clinics, diagnostics, telemedicine, medical tourism, pharmacies, and wellness facilities are expanding in cities and tourism corridors." },
];

const credentials = [
  { icon: Building2, title: "URSB Registered", desc: "Officially registered with the Uganda Registration Services Bureau." },
  { icon: Award, title: "Uganda Tourism Board", desc: "Licensed and regulated by the Uganda Tourism Board (UTB)." },
  { icon: Award, title: "Uganda Tourism Association", desc: "Proud member of the Uganda Tourism Association (UTA)." },
];

export default function HomePage() {
  const heroSlides = useMemo(() => getRandomHeroSlides(7), []);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <div>
      {/* Hero Slider — dynamic content from across the site */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        {heroSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          </div>
        ))}
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6">
            <p className="text-accent font-medium tracking-wider uppercase text-sm">{slide.subtitle}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-background leading-[1.1]">
              {slide.title.split(" ").map((word, i) => (
                <span key={i}>{i === 1 ? <span className="text-accent">{word} </span> : `${word} `}</span>
              ))}
            </h1>
            <p className="text-lg text-background/80 max-w-lg leading-relaxed">{slide.desc}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="text-base px-8 rounded-full">
                <Link to={slide.link}>Explore <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 rounded-full bg-background/10 border-background/30 text-background hover:bg-background/20 hover:text-background">
                <Link to="/contact">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Slider controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? "bg-accent w-8" : "bg-background/40"}`} />
            ))}
          </div>
          <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-display font-bold text-accent">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* East Africa Destinations */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Destinations</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Explore East Africa</h2>
            <p className="text-muted-foreground">From Uganda's gorillas to Kenya's savannahs, Tanzania's Serengeti, and Rwanda's volcanic landscapes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link key={dest.title} to="/packages" className="group relative rounded-xl overflow-hidden h-80 shadow-card hover:shadow-elevated transition-all duration-300">
                <img src={dest.img} alt={dest.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-accent text-xs font-medium uppercase tracking-wider">{dest.tours}</span>
                  <h3 className="font-display font-bold text-xl text-background mt-1">{dest.title}</h3>
                  <p className="text-background/70 text-sm mt-1 line-clamp-2">{dest.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Wildlife Spotlight */}
      <WildlifeSpotlight />

      {/* Why Uganda */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Discover</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Choose East Africa?</h2>
            <p className="text-muted-foreground">A region of breathtaking beauty, rich culture, and unforgettable adventures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="group rounded-xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src={reason.img} alt={reason.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground">Comprehensive travel and logistics solutions across East Africa.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} to={service.path} className="group bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1.5">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company Profile & Credentials */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Company Profile</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Trusted & Certified</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Zula Travels is a fully registered Ugandan travel and logistics company, committed to excellence in tourism and service delivery across East Africa. We operate under the regulation and guidance of Uganda's top tourism bodies.
              </p>
              <div className="space-y-5">
                {credentials.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={lodgeImg} alt="Zula Travels Office" className="rounded-2xl shadow-elevated w-full" />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-elevated border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm">East Africa</p>
                    <p className="text-xs text-muted-foreground">Uganda • Kenya • Tanzania • Rwanda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-curated Business Spotlight (rotates every 8h) */}
      <BusinessSpotlight />

      {/* Business & Investment Opportunities */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="inline-flex w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-6">
                <BriefcaseBusiness className="w-7 h-7 text-primary" />
              </div>
              <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Business Tourism</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">Did you know your travel can also become a business venture?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                East Africa is not only a destination for adventure — it is also a gateway for investors, diaspora entrepreneurs, institutions, and visitors exploring practical opportunities in high-growth sectors.
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact">Request Investment Guidance <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {investmentOpportunities.map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Why Zula Travels</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Makes Us Special</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {specialties.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready for Your East African Adventure?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            Let us help you create the perfect itinerary. Whether you're seeking wildlife encounters, cultural experiences, or pure relaxation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/packages">Start Planning Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
