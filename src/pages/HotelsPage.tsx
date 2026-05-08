import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hotel, Star, MapPin, Wifi, UtensilsCrossed, ArrowRight, Waves, Dumbbell, Search, CheckCircle } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import hotelLuxuryImg from "@/assets/hotel-luxury.jpg";
import apartmentImg from "@/assets/hotel-apartment.jpg";
import cottageImg from "@/assets/hotel-cottage.jpg";
import heroHotelRoom from "@/assets/hero-hotel-room.jpg";
import heroLodge from "@/assets/hero-lodge.jpg";
import heroCottage from "@/assets/hero-cottage.jpg";

const categories = ["All", "Hotels", "Safari Lodges", "Motels", "Furnished Apartments", "Country Homes"];

const accommodations = [
  { name: "Kampala Serena Hotel", location: "Kampala", rating: 5, type: "Hotels", price: "$220/night", img: hotelLuxuryImg, gallery: [hotelLuxuryImg, heroHotelRoom, lodgeImg], offer: "Airport pickup coordination, breakfast guidance, city tour add-on, and 5% group discount for 5+ guests.", amenities: ["WiFi", "Pool", "Spa", "Restaurant"], desc: "5-star luxury hotel in the heart of Kampala with world-class amenities and conference facilities." },
  { name: "Sheraton Kampala Hotel", location: "Kampala", rating: 5, type: "Hotels", price: "$200/night", img: heroHotelRoom, gallery: [heroHotelRoom, hotelLuxuryImg, apartmentImg], offer: "Flexible city-tour pairing, airport transfer support, breakfast options, and corporate group planning.", amenities: ["WiFi", "Pool", "Gym", "Restaurant"], desc: "Iconic luxury hotel with panoramic city views, multiple restaurants, and a golf course." },
  { name: "Lake Victoria Serena Resort", location: "Entebbe", rating: 5, type: "Hotels", price: "$250/night", img: hotelLuxuryImg, gallery: [hotelLuxuryImg, heroCottage, cottageImg], offer: "Lake cruise add-on, airport transfer support, honeymoon setup request, and family room guidance.", amenities: ["WiFi", "Pool", "Spa", "Lake View"], desc: "Lakeside resort with private beach, water sports, and stunning Lake Victoria sunsets." },
  { name: "Volcanoes Bwindi Lodge", location: "Bwindi", rating: 5, type: "Safari Lodges", price: "$450/night", img: heroLodge, gallery: [heroLodge, lodgeImg, heroCottage], offer: "Gorilla permit planning, packed-lunch support, trekking briefing, and private guide add-on.", amenities: ["WiFi", "Restaurant", "Fireplace", "Forest View"], desc: "Exclusive eco-lodge at the edge of Bwindi forest. Perfect for gorilla trekking visitors." },
  { name: "Paraa Safari Lodge", location: "Murchison Falls", rating: 4, type: "Safari Lodges", price: "$200/night", img: lodgeImg, amenities: ["WiFi", "Pool", "Restaurant", "Game Drives"], desc: "Classic safari lodge on the banks of the Nile with game drive and boat cruise access." },
  { name: "Kyaninga Lodge", location: "Fort Portal", rating: 5, type: "Safari Lodges", price: "$350/night", img: heroLodge, amenities: ["WiFi", "Pool", "Restaurant", "Crater View"], desc: "Stunning hand-crafted lodge overlooking Kyaninga crater lake, surrounded by chimpanzee habitat." },
  { name: "Wildwaters Lodge", location: "Jinja", rating: 4, type: "Safari Lodges", price: "$280/night", img: hotelLuxuryImg, amenities: ["WiFi", "Restaurant", "Rapids View", "Spa"], desc: "Boutique island lodge on the Nile with private decks overlooking Class V rapids." },
  { name: "Entebbe Palm Hotel", location: "Entebbe", rating: 3, type: "Motels", price: "$60/night", img: heroHotelRoom, amenities: ["WiFi", "Restaurant", "Parking"], desc: "Comfortable budget motel near Entebbe airport, perfect for transit stays." },
  { name: "Jinja City Motel", location: "Jinja", rating: 3, type: "Motels", price: "$45/night", img: heroHotelRoom, amenities: ["WiFi", "Parking", "Restaurant"], desc: "Clean and affordable motel in the center of Jinja, close to Nile adventure activities." },
  { name: "Naguru Skyview Apartments", location: "Kampala", rating: 4, type: "Furnished Apartments", price: "$120/night", img: apartmentImg, amenities: ["WiFi", "Kitchen", "Gym", "City View"], desc: "Modern fully-furnished apartments in Naguru with panoramic views of Kampala city." },
  { name: "Kololo Executive Suites", location: "Kampala", rating: 4, type: "Furnished Apartments", price: "$150/night", img: apartmentImg, amenities: ["WiFi", "Kitchen", "Pool", "Security"], desc: "Luxury serviced apartments in Kololo, ideal for long-stay business travelers." },
  { name: "Sipi Falls Cottage", location: "Kapchorwa", rating: 4, type: "Country Homes", price: "$80/night", img: cottageImg, amenities: ["WiFi", "Fireplace", "Garden", "Waterfall View"], desc: "Rustic cottage overlooking the spectacular Sipi Falls in eastern Uganda." },
  { name: "Lake Bunyonyi Retreat", location: "Kabale", rating: 4, type: "Country Homes", price: "$95/night", img: heroCottage, amenities: ["WiFi", "Garden", "Lake Access", "Canoes"], desc: "Charming lakeside country home on the 'Switzerland of Africa' with canoe access." },
  { name: "Fort Portal Country Lodge", location: "Fort Portal", rating: 3, type: "Country Homes", price: "$70/night", img: cottageImg, amenities: ["WiFi", "Garden", "Fireplace", "Mountain View"], desc: "Peaceful countryside retreat near Kibale Forest and the Rwenzori Mountains." },
];

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi, Restaurant: UtensilsCrossed, Pool: Waves, Gym: Dumbbell,
};

export default function HotelsPage() {
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");
  const sorted = [...accommodations]
    .filter((h) => activeType === "All" || h.type === activeType)
    .filter((h) => !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase()) || h.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={hotelLuxuryImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Hotel className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Accommodation</h1>
          <p className="text-primary-foreground/80 text-lg mb-6">Hotels, safari lodges, motels, furnished apartments & country homes across Uganda.</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search accommodation..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-background text-foreground text-sm outline-none shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border sticky top-16 md:top-[4.5rem] z-30 bg-background/95 backdrop-blur-md">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveType(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeType === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((hotel) => (
              <div key={hotel.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">{hotel.type}</div>
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">{hotel.price}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: hotel.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1">{hotel.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><MapPin className="w-3 h-3" />{hotel.location}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{hotel.desc}</p>
                  {"offer" in hotel && hotel.offer && (
                    <p className="mb-3 rounded-lg bg-accent/10 px-3 py-2 text-xs text-foreground"><CheckCircle className="mr-1 inline h-3 w-3 text-primary" />{hotel.offer}</p>
                  )}
                  {"gallery" in hotel && hotel.gallery && (
                    <div className="mb-4">
                      <ImageGallery images={hotel.gallery.map((src, i) => ({ src, alt: `${hotel.name} gallery ${i + 1}` }))} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hotel.amenities.map((a) => (
                      <span key={a} className="text-xs bg-secondary px-2 py-0.5 rounded-full">{a}</span>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                    <Link to={`/booking?package=hotel-${hotel.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      Book Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Transfers */}
      <section className="py-12 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Airport Pickup & Drop-off</h2>
            <p className="text-sm text-muted-foreground">We arrange convenient transfers from Entebbe International Airport to your accommodation.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { route: "Airport → Kampala", price: "$30-50", time: "45 min - 1.5 hrs" },
              { route: "Airport → Entebbe Hotels", price: "$15-25", time: "10-20 min" },
              { route: "Airport → Jinja", price: "$80-100", time: "2.5-3 hrs" },
            ].map((t) => (
              <div key={t.route} className="bg-card rounded-xl p-5 border border-border text-center">
                <h3 className="font-display font-semibold text-sm mb-2">{t.route}</h3>
                <p className="text-accent font-bold text-lg">{t.price}</p>
                <p className="text-xs text-muted-foreground">{t.time}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">Contact us for transfers to other destinations. All vehicles are air-conditioned with professional drivers.</p>
        </div>
      </section>
    </div>
  );
}
