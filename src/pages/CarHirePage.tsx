import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Users, Fuel, Settings, ArrowRight, Shield, Phone, Gauge } from "lucide-react";
import landcruiserImg from "@/assets/car-landcruiser.jpg";
import sedanImg from "@/assets/car-sedan.jpg";
import minivanImg from "@/assets/car-minivan.jpg";

const vehicles = [
  { name: "Toyota Land Cruiser V8", type: "Safari 4x4", seats: 7, fuel: "Diesel", transmission: "Automatic", price: "$120/day", img: landcruiserImg, driver: "Available", lease: "Dry & Wet", features: ["Pop-up Roof", "GPS", "AC", "Cooler Box"], make: "Toyota", model: "Land Cruiser V8" },
  { name: "Land Cruiser Prado", type: "Safari SUV", seats: 7, fuel: "Diesel", transmission: "Automatic", price: "$100/day", img: landcruiserImg, driver: "Available", lease: "Dry & Wet", features: ["4WD", "Pop-up Roof", "AC", "GPS"], make: "Toyota", model: "Prado TX" },
  { name: "Toyota RAV4", type: "SUV", seats: 5, fuel: "Petrol", transmission: "Automatic", price: "$80/day", img: sedanImg, driver: "Available", lease: "Dry & Wet", features: ["AC", "GPS", "Bluetooth", "USB"], make: "Toyota", model: "RAV4" },
  { name: "Toyota Premio", type: "Sedan", seats: 5, fuel: "Petrol", transmission: "Automatic", price: "$50/day", img: sedanImg, driver: "Available", lease: "Dry & Wet", features: ["AC", "Bluetooth", "USB", "Leather Seats"], make: "Toyota", model: "Premio" },
  { name: "Toyota Hiace", type: "Minivan", seats: 14, fuel: "Diesel", transmission: "Manual", price: "$150/day", img: minivanImg, driver: "Driver Only", lease: "Wet Only", features: ["AC", "PA System", "Luggage Space", "Reclining Seats"], make: "Toyota", model: "Hiace" },
  { name: "Coaster Bus", type: "Bus", seats: 30, fuel: "Diesel", transmission: "Manual", price: "$200/day", img: minivanImg, driver: "Driver Only", lease: "Wet Only", features: ["AC", "PA System", "Entertainment", "Luggage Compartment"], make: "Toyota", model: "Coaster" },
  { name: "Toyota Hilux Double Cab", type: "Pickup", seats: 5, fuel: "Diesel", transmission: "Manual", price: "$90/day", img: landcruiserImg, driver: "Available", lease: "Dry & Wet", features: ["4WD", "AC", "Tow Bar", "Cargo Bed"], make: "Toyota", model: "Hilux" },
  { name: "Super Custom", type: "Family Van", seats: 8, fuel: "Petrol", transmission: "Automatic", price: "$110/day", img: minivanImg, driver: "Available", lease: "Dry & Wet", features: ["AC", "Power Doors", "Entertainment", "Captain Seats"], make: "Toyota", model: "Super Custom" },
];

export default function CarHirePage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={landcruiserImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Car className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Car Hire & Rental</h1>
          <p className="text-primary-foreground/80 text-lg">Self-drive & chauffeur-driven vehicles for safari, business, and city travel across Uganda.</p>
        </div>
      </section>

      {/* Lease Terms Info */}
      <section className="py-10 bg-secondary/50">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-display font-semibold text-sm mb-1">Dry Hire</h3>
              <p className="text-xs text-muted-foreground">Vehicle only — you fuel & maintain during rental</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-display font-semibold text-sm mb-1">Wet Hire</h3>
              <p className="text-xs text-muted-foreground">Vehicle + fuel + driver included in price</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-display font-semibold text-sm mb-1">Self-Drive</h3>
              <p className="text-xs text-muted-foreground">Valid license required, min age 23, insurance included</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-display font-semibold text-sm mb-1">With Driver</h3>
              <p className="text-xs text-muted-foreground">Professional, experienced local driver provided</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicles.map((v) => (
              <div key={v.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">{v.price}</div>
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">{v.type}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg">{v.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{v.make} {v.model}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{v.seats} seats</span>
                    <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{v.fuel}</span>
                    <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" />{v.transmission}</span>
                    <span className="flex items-center gap-1"><Settings className="w-3.5 h-3.5" />{v.lease}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {v.features.map((f) => (
                      <span key={f} className="text-xs bg-secondary px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-4">
                    <span className={`px-2 py-0.5 rounded-full ${v.driver === "Available" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent-foreground"}`}>
                      {v.driver === "Available" ? "Self-drive or Driver" : "Driver Only"}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <Link to={`/booking?package=car-${v.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      Rent Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            {[
              { icon: Shield, title: "Fully Insured", desc: "Comprehensive insurance on all vehicles" },
              { icon: Settings, title: "Well Maintained", desc: "Regular servicing and safety inspections" },
              { icon: Phone, title: "24/7 Support", desc: "Roadside assistance across Uganda" },
            ].map((f) => (
              <div key={f.title} className="text-center p-6">
                <f.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="font-display font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
