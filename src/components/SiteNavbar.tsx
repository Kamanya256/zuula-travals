import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail, User, LogOut, Shield } from "lucide-react";
import zulaLogo from "@/assets/zula-logo.jpeg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import GoogleTranslate from "@/components/GoogleTranslate";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Packages", path: "/packages" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Flights", path: "/flights" },
      { label: "Hotels", path: "/hotels" },
      { label: "Car Hire", path: "/cars" },
      { label: "Courier", path: "/courier" },
      { label: "Venues & Events", path: "/venues" },
    ],
  },
  { label: "Attractions", path: "/attractions" },
  {
    label: "Tourism",
    path: "#",
    children: [
      { label: "Wildlife Tourism", path: "/wildlife" },
      { label: "Marine Tourism", path: "/marine" },
      { label: "Aero Tourism", path: "/aero" },
      { label: "Sports Tourism", path: "/sports" },
      { label: "Boat Rides", path: "/boat-rides" },
    ],
  },
  { label: "News", path: "/news" },
  {
    label: "Explore",
    path: "#",
    children: [
      { label: "Country Guides", path: "/country-guides" },
      { label: "Volunteer", path: "/volunteer" },
      { label: "Visa & Permits", path: "/visa-permits" },
      { label: "Restaurants", path: "/restaurants" },
      { label: "Shopping & Dining", path: "/malls" },
      { label: "Travel Tips", path: "/travel-tips" },
      { label: "FAQ", path: "/faq" },
      { label: "Emergency Contacts", path: "/emergency" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

export default function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm hidden md:block">
        <div className="container flex justify-between items-center py-1.5">
          <div className="flex items-center gap-6">
            <a href="tel:+256774488956" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +256 774 488 956
            </a>
            <a href="mailto:zulatravels@gmail.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="w-3.5 h-3.5" />
              zulatravels@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="min-w-[140px]">
              <GoogleTranslate />
            </div>
            <p className="text-primary-foreground/80">Premium Travel & Logistics</p>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-18">
          {/* Logo area */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <img src={zulaLogo} alt="Zula Travels - Everything is Tourism" className="h-12 md:h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-card rounded-lg shadow-elevated border border-border p-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            isActive(child.path)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Auth + Mobile toggle */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/profile"><User className="w-4 h-4 mr-1" /> {user.user_metadata?.full_name || "Account"}</Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="w-8 h-8" title="Admin">
                  <Link to="/admin"><Shield className="w-4 h-4" /></Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
                <Link to="/auth"><User className="w-4 h-4 mr-1.5" /> Sign In</Link>
              </Button>
            )}
            <Button asChild className="hidden md:inline-flex">
              <Link to="/booking">Book Now</Link>
            </Button>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <div className="container py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => toggleMobileDropdown(link.label)}
                      className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-muted-foreground rounded-md hover:bg-secondary"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === link.label && (
                      <div className="ml-4 space-y-1 animate-fade-in">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive(link.path)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              {/* Mobile Google Translate */}
              <div className="px-3 py-2">
                <GoogleTranslate />
              </div>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-sm font-medium text-primary">
                    <User className="w-4 h-4 inline mr-1" /> My Account
                  </Link>
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 inline mr-1" /> Admin
                  </Link>
                  <button onClick={() => { signOut(); setIsOpen(false); }} className="flex items-center gap-2 w-full px-3 py-3 text-sm text-muted-foreground">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-sm font-medium text-primary">
                  Sign In / Sign Up
                </Link>
              )}
              <Button asChild className="w-full mt-4">
                <Link to="/booking" onClick={() => setIsOpen(false)}>Book Now</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
