import { Link } from "react-router-dom";
import { Plane, Hotel, Car, Truck, Calendar, TreePine, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-uganda.jpg";

const services = [
  { icon: TreePine, title: "Tour Packages", desc: "Customized safari and tour packages across East Africa. From gorilla trekking to cultural experiences, we create unforgettable journeys.", path: "/packages", color: "bg-primary/10 text-primary" },
  { icon: Plane, title: "Flight Bookings", desc: "Domestic and international flight bookings with competitive pricing. We partner with major airlines serving East Africa.", path: "/flights", color: "bg-sky/10 text-sky" },
  { icon: Hotel, title: "Hotel Reservations", desc: "Curated accommodation from luxury lodges to budget-friendly hotels across Uganda, Kenya, Tanzania, and Rwanda.", path: "/hotels", color: "bg-accent/15 text-accent" },
  { icon: Car, title: "Car Hire", desc: "Self-drive and chauffeur-driven vehicle rental. From 4x4 safari vehicles to city sedans, we have the perfect ride.", path: "/cars", color: "bg-earth/10 text-earth" },
  { icon: Truck, title: "Courier & Logistics", desc: "Reliable parcel delivery and logistics services across East Africa. Track your shipments in real-time.", path: "/courier", color: "bg-sunset/10 text-sunset" },
  { icon: Calendar, title: "Venues & Events", desc: "Event venue booking and management. Corporate events, weddings, and conferences in stunning locations.", path: "/venues", color: "bg-primary/10 text-primary" },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wider uppercase mb-3">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 text-lg">
            Comprehensive travel, logistics, and event management across East Africa.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className="group bg-card rounded-xl p-8 border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex gap-6"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center shrink-0`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
