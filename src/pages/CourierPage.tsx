import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Package, MapPin, Clock, Shield, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const features = [
  { icon: Package, title: "Door-to-Door", desc: "We pick up and deliver right to your doorstep" },
  { icon: Clock, title: "Express Delivery", desc: "Same-day and next-day options available" },
  { icon: Shield, title: "Fully Insured", desc: "Your parcels are protected throughout transit" },
  { icon: MapPin, title: "East Africa Wide", desc: "Uganda, Kenya, Tanzania, Rwanda coverage" },
];

export default function CourierPage() {
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      toast({ title: "Tracking", description: `Looking up parcel ${trackingId}... (Coming soon)` });
    }
  };

  return (
    <div>
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <Truck className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Courier & Logistics</h1>
          <p className="text-primary-foreground/80 text-lg">Reliable parcel delivery and logistics services across East Africa.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          {/* Track Parcel */}
          <div className="bg-card rounded-xl border border-border shadow-elevated p-8 mb-16">
            <h2 className="font-display font-bold text-2xl mb-2 text-center">Track Your Parcel</h2>
            <p className="text-muted-foreground text-center mb-6">Enter your tracking ID to check delivery status</p>
            <form onSubmit={handleTrack} className="flex gap-3 max-w-md mx-auto">
              <Input
                placeholder="Enter tracking ID..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="rounded-full px-6">
                <Search className="w-4 h-4 mr-2" /> Track
              </Button>
            </form>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-xl p-6 border border-border shadow-card flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-sunset/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-sunset" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-secondary/50 rounded-xl p-10">
            <h2 className="text-3xl font-display font-bold mb-4">Need to Send a Parcel?</h2>
            <p className="text-muted-foreground mb-6">Get a quote for your shipment — domestic or cross-border.</p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/contact">Get a Quote <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
