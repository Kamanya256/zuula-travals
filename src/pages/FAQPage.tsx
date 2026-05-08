import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    title: "Booking & Payments",
    items: [
      { q: "How do I book a tour package?", a: "Browse our packages, select your preferred tour, click 'View Details' to see the full itinerary, then click 'Book Now'. Fill in your details, review your booking, and choose a payment method. Our team will confirm within 24 hours." },
      { q: "What payment methods do you accept?", a: "We accept Mobile Money (MTN & Airtel), Visa/Mastercard, and bank transfers to Stanbic Bank Uganda. Payment integration is being finalized — currently our team processes payments manually after booking confirmation." },
      { q: "Can I cancel or modify my booking?", a: "Yes. Cancellations made 14+ days before travel receive a full refund. 7-14 days: 50% refund. Less than 7 days: no refund. Modifications are free if requested 7+ days in advance." },
      { q: "Do I need to pay a deposit?", a: "Yes, a 30% deposit is required to confirm your booking. The remaining balance is due 7 days before your travel date." },
    ],
  },
  {
    title: "Tours & Safaris",
    items: [
      { q: "What is included in a gorilla trekking permit?", a: "A gorilla trekking permit ($700 for foreign non-residents) grants you access to Bwindi or Mgahinga National Park and 1 hour with a gorilla family. Our packages include the permit, accommodation, meals, transport, and a professional guide." },
      { q: "What should I pack for a safari?", a: "Pack lightweight, neutral-colored clothing, sturdy hiking boots, a rain jacket, sunscreen, insect repellent, binoculars, a camera, and any personal medications. We provide a detailed packing list after booking." },
      { q: "Are your tours suitable for children?", a: "Most tours are family-friendly. However, gorilla trekking requires participants to be 15+ years. City tours, marine tours, and cultural safaris are great for all ages. Contact us for family-specific itineraries." },
      { q: "Do you offer custom itineraries?", a: "Absolutely! We specialize in tailor-made safaris. Contact us with your preferences, budget, and travel dates, and we'll create a personalized itinerary." },
    ],
  },
  {
    title: "Accommodation",
    items: [
      { q: "What types of accommodation do you offer?", a: "We offer 5-star hotels, safari lodges, motels, furnished apartments, and country homes across Uganda. Each is rated and reviewed to ensure quality." },
      { q: "Can I book accommodation without a tour?", a: "Yes! Visit our Hotels page to browse and book accommodation independently. We offer competitive rates at all our partner properties." },
      { q: "Is airport pickup included?", a: "Airport transfers are included in most tour packages. For standalone bookings, airport pickup can be arranged for $30-50 depending on your destination." },
    ],
  },
  {
    title: "Car Hire & Transport",
    items: [
      { q: "What's the difference between dry and wet hire?", a: "Dry hire means you get the vehicle only — you handle fuel and maintenance. Wet hire includes the vehicle plus fuel and a professional driver. Wet hire is recommended for safari drives." },
      { q: "Do I need an international driving license?", a: "Yes, for self-drive you need a valid international driving license. You must be at least 23 years old. Insurance is included in all rentals." },
      { q: "Do you provide drivers for all vehicles?", a: "Professional drivers are available for all vehicles. Some larger vehicles (Hiace, Coaster) are wet-hire only and come with a driver as standard." },
    ],
  },
  {
    title: "Travel & Safety",
    items: [
      { q: "Is Uganda safe for tourists?", a: "Uganda is one of the safest countries in East Africa for tourists. Our guides are experienced and we monitor travel advisories. National parks have ranger security. We recommend standard travel precautions." },
      { q: "Do I need a visa to visit Uganda?", a: "Most visitors need a visa. You can apply for an e-visa at visas.immigration.go.ug before travel. A single-entry tourist visa costs $50. East Africa Tourist Visas ($100) cover Uganda, Kenya, and Rwanda." },
      { q: "What vaccinations do I need?", a: "Yellow fever vaccination is mandatory. We also recommend Hepatitis A & B, Typhoid, and anti-malaria medication. Consult your doctor 4-6 weeks before travel." },
      { q: "Do you provide travel insurance?", a: "We strongly recommend travel insurance but it is not included in our packages. We can recommend trusted insurance providers upon request." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <HelpCircle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-primary-foreground/80 text-lg">Everything you need to know about traveling with Zula Travels.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-10">
            {faqCategories.map((cat) => (
              <div key={cat.title}>
                <h2 className="text-2xl font-display font-bold mb-4">{cat.title}</h2>
                <div className="space-y-2">
                  {cat.items.map((item) => {
                    const key = `${cat.title}-${item.q}`;
                    const isOpen = openItems[key];
                    return (
                      <div key={key} className="bg-card rounded-xl border border-border overflow-hidden">
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-medium text-sm pr-4">{item.q}</span>
                          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 animate-fade-in">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-secondary/50 rounded-2xl p-10">
            <h2 className="text-2xl font-display font-bold mb-3">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">Our travel experts are ready to help you plan the perfect trip.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">Contact Us</Link>
              <a href="https://wa.me/256774488956" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-[hsl(142,70%,45%)] text-white rounded-full font-medium hover:opacity-90 transition-opacity">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
