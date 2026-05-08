import { useState } from "react";
import { Phone, Shield, Stethoscope, MapPin, Building2, Plane, AlertTriangle } from "lucide-react";

const emergencyData: Record<string, { police: string; ambulance: string; fire: string; hospitals: { name: string; phone: string; location: string }[]; embassies: { country: string; phone: string }[]; tips: string[] }> = {
  Uganda: {
    police: "999 / 112",
    ambulance: "911",
    fire: "999",
    hospitals: [
      { name: "Mulago National Referral Hospital", phone: "+256-414-554-001", location: "Mulago Hill, Kampala" },
      { name: "International Hospital Kampala", phone: "+256-312-200-400", location: "Namuwongo, Kampala" },
      { name: "Mengo Hospital", phone: "+256-414-270-222", location: "Mengo, Kampala" },
      { name: "Norvik Hospital", phone: "+256-414-256-003", location: "Naguru, Kampala" },
      { name: "AAR Healthcare", phone: "+256-414-560-900", location: "Bukoto, Kampala" },
    ],
    embassies: [
      { country: "USA", phone: "+256-414-259-791" },
      { country: "UK", phone: "+256-312-312-000" },
      { country: "France", phone: "+256-414-242-175" },
      { country: "Germany", phone: "+256-414-501-111" },
    ],
    tips: ["Keep copies of your passport", "Carry your yellow fever certificate", "Save local emergency numbers on your phone", "Register with your embassy", "Keep travel insurance details handy"],
  },
  Kenya: {
    police: "999 / 112",
    ambulance: "999",
    fire: "999",
    hospitals: [
      { name: "Nairobi Hospital", phone: "+254-20-284-5000", location: "Argwings Kodhek Rd, Nairobi" },
      { name: "Aga Khan University Hospital", phone: "+254-20-366-2000", location: "3rd Parklands, Nairobi" },
      { name: "Kenyatta National Hospital", phone: "+254-20-272-6300", location: "Hospital Rd, Nairobi" },
    ],
    embassies: [
      { country: "USA", phone: "+254-20-363-6000" },
      { country: "UK", phone: "+254-20-287-3000" },
    ],
    tips: ["Keep hotel address in local language", "Use registered taxi services", "Avoid walking alone at night in cities", "Carry bottled water"],
  },
  Rwanda: {
    police: "112",
    ambulance: "912",
    fire: "111",
    hospitals: [
      { name: "King Faisal Hospital", phone: "+250-788-304-038", location: "Kigali" },
      { name: "CHUK University Hospital", phone: "+250-788-868-240", location: "Kigali" },
    ],
    embassies: [
      { country: "USA", phone: "+250-252-596-400" },
      { country: "UK", phone: "+250-252-556-000" },
    ],
    tips: ["Plastic bags are banned — don't carry them", "Rwanda is very safe for tourists", "Download the RwandAir app for local flights"],
  },
  Tanzania: {
    police: "112 / 114",
    ambulance: "114",
    fire: "114",
    hospitals: [
      { name: "Muhimbili National Hospital", phone: "+255-22-215-3596", location: "Dar es Salaam" },
      { name: "Aga Khan Hospital", phone: "+255-22-211-5151", location: "Dar es Salaam" },
    ],
    embassies: [
      { country: "USA", phone: "+255-22-229-4000" },
      { country: "UK", phone: "+255-22-229-0000" },
    ],
    tips: ["Zanzibar has separate emergency services", "Carry malaria medication", "Safari parks have ranger stations for emergencies"],
  },
  "DR Congo": {
    police: "112",
    ambulance: "Local numbers vary",
    fire: "118",
    hospitals: [
      { name: "Centre Hospitalier Monkole", phone: "+243-99-810-8998", location: "Kinshasa" },
    ],
    embassies: [
      { country: "USA", phone: "+243-81-556-0151" },
    ],
    tips: ["Travel with a registered guide", "Carry comprehensive travel insurance with evacuation", "Keep satellite communication devices for remote areas"],
  },
  "South Sudan": {
    police: "777",
    ambulance: "Local numbers vary",
    fire: "Local numbers vary",
    hospitals: [
      { name: "Juba Teaching Hospital", phone: "+211-956-111-111", location: "Juba" },
    ],
    embassies: [
      { country: "USA", phone: "+211-963-341-100" },
    ],
    tips: ["Register with your embassy before travel", "Carry medical evacuation insurance", "Travel with an experienced guide"],
  },
};

const countryList = Object.keys(emergencyData);

export default function EmergencyPage() {
  const [activeCountry, setActiveCountry] = useState("Uganda");
  const data = emergencyData[activeCountry];

  return (
    <div>
      <section className="py-20 bg-destructive text-destructive-foreground text-center">
        <div className="container max-w-3xl">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Emergency Contacts</h1>
          <p className="text-destructive-foreground/80 text-lg">Quick access to police, hospitals, ambulances, and embassy contacts across East Africa.</p>
        </div>
      </section>

      {/* Country Selector */}
      <section className="py-6 border-b border-border sticky top-16 md:top-[4.5rem] z-30 bg-background/95 backdrop-blur-md">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {countryList.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCountry(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCountry === c ? "bg-destructive text-destructive-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          {/* Emergency Numbers */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Police", number: data.police, icon: Shield, color: "bg-primary" },
              { label: "Ambulance", number: data.ambulance, icon: Stethoscope, color: "bg-destructive" },
              { label: "Fire", number: data.fire, icon: AlertTriangle, color: "bg-accent" },
            ].map((e) => (
              <div key={e.label} className={`${e.color} text-white rounded-xl p-6 text-center`}>
                <e.icon className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-display font-bold text-lg">{e.label}</h3>
                <p className="text-2xl font-bold mt-1">{e.number}</p>
              </div>
            ))}
          </div>

          {/* Hospitals */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-display font-bold">Hospitals & Medical Facilities</h2>
            </div>
            <div className="space-y-3">
              {data.hospitals.map((h) => (
                <div key={h.name} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-sm">{h.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{h.location}</p>
                  </div>
                  <a href={`tel:${h.phone.replace(/[-\s]/g, "")}`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
                    <Phone className="w-4 h-4" />{h.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Embassies */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-display font-bold">Embassies & Consulates</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.embassies.map((e) => (
                <div key={e.country} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <span className="font-medium text-sm">{e.country} Embassy</span>
                  <a href={`tel:${e.phone.replace(/[-\s]/g, "")}`} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />{e.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-accent/10 rounded-xl border border-accent/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-display font-bold">Safety Tips for {activeCountry}</h2>
            </div>
            <div className="space-y-2">
              {data.tips.map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{t}
                </div>
              ))}
            </div>
          </div>

          {/* Zula Contact */}
          <div className="mt-8 bg-primary text-primary-foreground rounded-xl p-6 text-center">
            <Plane className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg mb-2">Zula Travels 24/7 Emergency Line</h3>
            <a href="tel:+256774488956" className="text-2xl font-bold text-accent hover:underline">+256 774 488 956</a>
            <p className="text-sm text-primary-foreground/70 mt-2">Our team is available around the clock for all traveling clients.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
