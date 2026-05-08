import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Globe, Heart, Award, TreePine } from "lucide-react";
import cultureImg from "@/assets/culture-uganda.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";

const values = [
  { icon: Shield, title: "Safety First", desc: "Your safety and comfort are our top priority on every journey." },
  { icon: Heart, title: "Passion for Africa", desc: "Born and raised in Uganda, we share our love for East Africa with you." },
  { icon: Globe, title: "Sustainable Travel", desc: "We support local communities and protect wildlife through responsible tourism." },
  { icon: Award, title: "Excellence", desc: "Award-winning service recognized by East African tourism boards." },
  { icon: Users, title: "Expert Guides", desc: "Our certified guides bring decades of local knowledge and expertise." },
  { icon: TreePine, title: "Conservation", desc: "A portion of every booking supports wildlife conservation efforts." },
];

const team = [
  { name: "Sarah Kamanya", role: "Founder & CEO", desc: "15+ years in East African tourism" },
  { name: "David Okello", role: "Head of Operations", desc: "Expert in logistics and tour planning" },
  { name: "Grace Nakato", role: "Lead Tour Guide", desc: "Certified wildlife specialist" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={wildlifeImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wider uppercase mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Zula Travels</h1>
          <p className="text-primary-foreground/80 text-lg">
            Born from a deep love for Uganda and East Africa, we're dedicated to sharing the Pearl of Africa with the world through premium, sustainable travel experiences.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Premium Travel & Logistics Across East Africa</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in Kampala, Zula Travels has grown from a small local tour operator into one of East Africa's most trusted travel and logistics companies.
                </p>
                <p>
                  We offer everything from gorilla trekking in Bwindi to white-water rafting on the Nile, from luxury safari lodges to reliable courier services across the region.
                </p>
                <p>
                  Our mission is simple: to provide unforgettable experiences while supporting local communities and protecting the natural heritage that makes this region so special.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={cultureImg} alt="Ugandan culture" className="rounded-xl shadow-elevated h-64 object-cover w-full" />
              <img src={wildlifeImg} alt="Wildlife safari" className="rounded-xl shadow-elevated h-64 object-cover w-full mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl p-6 border border-border shadow-card">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container text-center">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Our Team</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">Meet the Experts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-card rounded-xl p-6 border border-border shadow-card">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold">{member.name}</h3>
                <p className="text-primary text-sm font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Let's Plan Your Adventure</h2>
          <p className="text-primary-foreground/80 mb-6">Get in touch with our team to start planning your perfect East African journey.</p>
          <Button asChild size="lg" className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
