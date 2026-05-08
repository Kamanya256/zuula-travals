import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, CheckCircle, AlertTriangle, Globe, Clock, DollarSign } from "lucide-react";
import heroImg from "@/assets/hero-uganda.jpg";

const visaTypes = [
  { country: "Uganda", types: [
    { name: "Single Entry Visa", price: "$50", duration: "90 days", processing: "3-5 days" },
    { name: "Multiple Entry Visa", price: "$100", duration: "6-12 months", processing: "5-7 days" },
    { name: "East Africa Tourist Visa", price: "$100", duration: "90 days (UG+KE+RW)", processing: "5-7 days" },
    { name: "Transit Visa", price: "$30", duration: "7 days", processing: "1-2 days" },
  ]},
  { country: "Kenya", types: [
    { name: "eVisa (Single Entry)", price: "$51", duration: "90 days", processing: "2-3 days" },
    { name: "Transit Visa", price: "$21", duration: "72 hours", processing: "1-2 days" },
  ]},
  { country: "Tanzania", types: [
    { name: "Ordinary Visa", price: "$50", duration: "90 days", processing: "5-10 days" },
    { name: "Multiple Entry Visa", price: "$100", duration: "Up to 1 year", processing: "5-10 days" },
  ]},
  { country: "Rwanda", types: [
    { name: "Visa on Arrival", price: "$30", duration: "30 days", processing: "On arrival" },
    { name: "East Africa Visa", price: "$100", duration: "90 days (UG+KE+RW)", processing: "3-5 days" },
  ]},
];

const gorillaPermits = [
  { country: "Uganda", park: "Bwindi / Mgahinga", price: "$800", foreignResident: "$600", eastAfrican: "UGX 300,000", notes: "1 hour with gorillas. Book 3-6 months ahead." },
  { country: "Rwanda", park: "Volcanoes NP", price: "$1,500", foreignResident: "$1,500", eastAfrican: "RWF 75,000", notes: "1 hour with gorillas. Premium experience." },
  { country: "DR Congo", park: "Virunga NP", price: "$400", foreignResident: "$400", eastAfrican: "$200", notes: "1 hour. Most affordable option." },
];

const npPermits = [
  { park: "Queen Elizabeth NP", country: "Uganda", foreign: "$40/day", resident: "UGX 25,000" },
  { park: "Murchison Falls NP", country: "Uganda", foreign: "$40/day", resident: "UGX 25,000" },
  { park: "Kibale NP (Chimps)", country: "Uganda", foreign: "$200 (permit)", resident: "UGX 150,000" },
  { park: "Maasai Mara", country: "Kenya", foreign: "$80/day", resident: "KES 1,200" },
  { park: "Serengeti NP", country: "Tanzania", foreign: "$60/day", resident: "TZS 15,000" },
  { park: "Volcanoes NP", country: "Rwanda", foreign: "$75/day", resident: "RWF 5,000" },
];

export default function VisaPermitsPage() {
  return (
    <div>
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src={heroImg} alt="" className="w-full h-full object-cover" /></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Visa & Permits</h1>
          <p className="text-primary-foreground/80 text-lg">Everything you need to know about visas, gorilla permits, and national park entry fees across East Africa.</p>
        </div>
      </section>

      {/* Visa Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">Visa Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {visaTypes.map((v) => (
              <div key={v.country} className="bg-card rounded-xl border border-border p-6 shadow-card">
                <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> {v.country}</h3>
                <div className="space-y-3">
                  {v.types.map((t) => (
                    <div key={t.name} className="bg-secondary/50 rounded-lg p-3">
                      <p className="font-semibold text-sm">{t.name}</p>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{t.price}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.duration}</span>
                        <span>Processing: {t.processing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-accent/10 rounded-xl p-4 border border-accent/20 text-center">
            <p className="text-sm text-muted-foreground">🛂 <strong>We assist with visa applications!</strong> Contact us for help with documentation and processing.</p>
            <Button asChild size="sm" className="rounded-full mt-3"><Link to="/contact">Get Visa Assistance <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </div>
        </div>
      </section>

      {/* Gorilla Permits */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">🦍 Gorilla Trekking Permits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {gorillaPermits.map((p) => (
              <div key={p.country} className="bg-card rounded-xl border border-border p-6 shadow-card">
                <h3 className="font-display font-bold text-lg mb-1">{p.country}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.park}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Foreign</span><span className="font-bold text-primary">{p.price}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Foreign Resident</span><span>{p.foreignResident}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">East African</span><span>{p.eastAfrican}</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">{p.notes}</p>
                <Button asChild size="sm" className="w-full rounded-full mt-4">
                  <Link to={`/booking?package=gorilla-permit-${p.country.toLowerCase()}`}>Book Permit <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National Park Entry Fees */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">🏞️ National Park Entry Fees</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-secondary/50 text-left">
                  <th className="px-4 py-3 font-semibold">Park</th><th className="px-4 py-3 font-semibold">Country</th>
                  <th className="px-4 py-3 font-semibold">Foreign</th><th className="px-4 py-3 font-semibold">Resident</th>
                </tr></thead>
                <tbody>
                  {npPermits.map((p) => (
                    <tr key={p.park} className="border-t border-border hover:bg-secondary/20">
                      <td className="px-4 py-3 font-medium">{p.park}</td><td className="px-4 py-3 text-muted-foreground">{p.country}</td>
                      <td className="px-4 py-3 text-primary font-semibold">{p.foreign}</td><td className="px-4 py-3">{p.resident}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Need Help with Permits?</h2>
          <p className="text-primary-foreground/80 mb-6">We handle all permit bookings for gorilla trekking, chimpanzee tracking, and national park visits. Let us take care of the paperwork.</p>
          <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
