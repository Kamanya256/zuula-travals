import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Plane, Hotel, Truck, Car, Calendar } from "lucide-react";
import zulaLogo from "@/assets/zula-logo.jpeg";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Tour Packages", path: "/packages" },
  { label: "Attractions", path: "/attractions" },
  { label: "Country Guides", path: "/country-guides" },
  { label: "Volunteer", path: "/volunteer" },
  { label: "Visa & Permits", path: "/visa-permits" },
  { label: "Boat Rides", path: "/boat-rides" },
  { label: "Shopping & Dining", path: "/malls" },
  { label: "Order Food", path: "/food-order" },
  { label: "Travel News", path: "/news" },
  { label: "Travel Tips", path: "/travel-tips" },
  { label: "FAQ", path: "/faq" },
  { label: "Emergency Contacts", path: "/emergency" },
  { label: "Get in Touch", path: "/contact" },
];

const services = [
  { label: "Flights", path: "/flights", icon: Plane },
  { label: "Hotels", path: "/hotels", icon: Hotel },
  { label: "Courier", path: "/courier", icon: Truck },
  { label: "Car Hire", path: "/cars", icon: Car },
  { label: "Events", path: "/venues", icon: Calendar },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/90">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold mb-1">Subscribe to Travel News</h3>
            <p className="text-background/60 text-sm">Get the latest travel updates, deals, and destination guides.</p>
          </div>
          <NewsletterSubscribe />
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={zulaLogo} alt="Zula Travels - Everything is Tourism" className="h-14 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              Premium travel and logistics across East Africa. Registered with URSB. Member of Uganda Tourism Board & Uganda Tourism Association.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-background/60 hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} className="flex items-center gap-2 text-sm text-background/60 hover:text-accent transition-colors">
                    <service.icon className="w-3.5 h-3.5" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li><a href="tel:+256774488956" className="flex items-center gap-2.5 text-sm text-background/60 hover:text-accent transition-colors"><Phone className="w-4 h-4 shrink-0" />+256 774 488 956</a></li>
              <li><a href="tel:+256703936165" className="flex items-center gap-2.5 text-sm text-background/60 hover:text-accent transition-colors"><Phone className="w-4 h-4 shrink-0" />+256 703 936 165</a></li>
              <li><a href="tel:+256393256310" className="flex items-center gap-2.5 text-sm text-background/60 hover:text-accent transition-colors"><Phone className="w-4 h-4 shrink-0" />+256 393 256 310</a></li>
              <li><a href="mailto:zulatravels@gmail.com" className="flex items-center gap-2.5 text-sm text-background/60 hover:text-accent transition-colors"><Mail className="w-4 h-4 shrink-0" />zulatravels@gmail.com</a></li>
              <li><div className="flex items-start gap-2.5 text-sm text-background/60"><MapPin className="w-4 h-4 shrink-0 mt-0.5" />Kampala, Uganda</div></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container flex flex-col md:flex-row items-center justify-between py-5 gap-2">
          <p className="text-xs text-background/40">© {currentYear} Zula Travels. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-background/40">
            <Link to="/privacy" className="hover:text-background/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background/70 transition-colors">Terms of Service</Link>
            <Link to="/news" className="hover:text-background/70 transition-colors">Travel News</Link>
            <Link to="/emergency" className="hover:text-background/70 transition-colors">Emergency</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
