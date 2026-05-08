import { Plane, Clock, MapPin, Info } from "lucide-react";

const airlines = [
  { name: "Uganda Airlines", code: "UR", routes: "Domestic & Regional", destinations: "Entebbe, Jinja, Nairobi, Dar es Salaam, Mogadishu, Johannesburg", hub: "Entebbe International Airport" },
  { name: "Kenya Airways", code: "KQ", routes: "Pan-African & International", destinations: "Nairobi, Entebbe, London, Amsterdam, Mumbai, Bangkok", hub: "Jomo Kenyatta International Airport" },
  { name: "Ethiopian Airlines", code: "ET", routes: "Global Network", destinations: "Addis Ababa, Entebbe, Dubai, Washington, Beijing, Lagos", hub: "Bole International Airport" },
  { name: "RwandAir", code: "WB", routes: "Regional & International", destinations: "Kigali, Entebbe, Nairobi, Johannesburg, London, Dubai", hub: "Kigali International Airport" },
  { name: "Turkish Airlines", code: "TK", routes: "Europe & Asia", destinations: "Istanbul, Entebbe, London, New York, Tokyo, Dubai", hub: "Istanbul Airport" },
  { name: "Emirates", code: "EK", routes: "Middle East & Global", destinations: "Dubai, Entebbe, London, New York, Sydney, Mumbai", hub: "Dubai International Airport" },
  { name: "Qatar Airways", code: "QR", routes: "Global Network", destinations: "Doha, Entebbe, London, New York, Singapore, Melbourne", hub: "Hamad International Airport" },
  { name: "Brussels Airlines", code: "SN", routes: "Europe & Africa", destinations: "Brussels, Entebbe, Kigali, Bujumbura", hub: "Brussels Airport" },
];

const sampleFlights = [
  { airline: "Uganda Airlines", flight: "UR 201", from: "Entebbe (EBB)", to: "Nairobi (NBO)", departure: "07:30", arrival: "08:45", frequency: "Daily" },
  { airline: "Uganda Airlines", flight: "UR 301", from: "Entebbe (EBB)", to: "Dar es Salaam (DAR)", departure: "10:00", arrival: "12:15", frequency: "Mon, Wed, Fri" },
  { airline: "Kenya Airways", flight: "KQ 417", from: "Nairobi (NBO)", to: "Entebbe (EBB)", departure: "09:15", arrival: "10:30", frequency: "Daily" },
  { airline: "Ethiopian Airlines", flight: "ET 807", from: "Addis Ababa (ADD)", to: "Entebbe (EBB)", departure: "13:00", arrival: "14:15", frequency: "Daily" },
  { airline: "Turkish Airlines", flight: "TK 608", from: "Istanbul (IST)", to: "Entebbe (EBB)", departure: "01:30", arrival: "08:45", frequency: "Daily" },
  { airline: "Emirates", flight: "EK 729", from: "Dubai (DXB)", to: "Entebbe (EBB)", departure: "22:45", arrival: "03:30+1", frequency: "Daily" },
  { airline: "RwandAir", flight: "WB 464", from: "Kigali (KGL)", to: "Entebbe (EBB)", departure: "16:00", arrival: "16:50", frequency: "Daily" },
  { airline: "Qatar Airways", flight: "QR 1433", from: "Doha (DOH)", to: "Entebbe (EBB)", departure: "02:15", arrival: "08:20", frequency: "Tue, Thu, Sat, Sun" },
];

const airports = [
  { name: "Entebbe International Airport", code: "EBB", type: "International", location: "Entebbe (40km from Kampala)", facilities: "Full international terminal, duty-free, lounges" },
  { name: "Kajjansi Airfield", code: "N/A", type: "Domestic", location: "Kajjansi (15km from Kampala)", facilities: "Charter flights, training" },
  { name: "Kisoro Airstrip", code: "KSR", type: "Domestic", location: "Kisoro (near Bwindi)", facilities: "Safari flights to gorilla trekking" },
  { name: "Kasese Airstrip", code: "KSE", type: "Domestic", location: "Kasese (near Queen Elizabeth NP)", facilities: "Safari charter flights" },
  { name: "Pakuba Airstrip", code: "PAF", type: "Domestic", location: "Murchison Falls NP", facilities: "Safari charter flights" },
  { name: "Kidepo Airstrip", code: "N/A", type: "Domestic", location: "Kidepo Valley NP", facilities: "Safari charter flights" },
];

export default function FlightsPage() {
  return (
    <div>
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <Plane className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Flight Information</h1>
          <p className="text-primary-foreground/80 text-lg">Arrivals, departures, and airline information for flights serving Uganda.</p>
        </div>
      </section>

      {/* Notice */}
      <section className="py-4 bg-accent/10 border-b border-accent/20">
        <div className="container flex items-center gap-2 text-sm">
          <Info className="w-4 h-4 text-accent shrink-0" />
          <p className="text-muted-foreground"><strong>Note:</strong> We provide flight information only. For bookings, please contact the airline directly or visit our <a href="/contact" className="text-primary underline">contact page</a> for assistance.</p>
        </div>
      </section>

      {/* Flight Schedule */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-2">Sample Flight Schedule</h2>
            <p className="text-muted-foreground text-sm">Schedules are indicative — please verify with the airline.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Airline</th>
                  <th className="px-4 py-3 text-left font-medium">Flight</th>
                  <th className="px-4 py-3 text-left font-medium">From</th>
                  <th className="px-4 py-3 text-left font-medium">To</th>
                  <th className="px-4 py-3 text-left font-medium">Departure</th>
                  <th className="px-4 py-3 text-left font-medium">Arrival</th>
                  <th className="px-4 py-3 text-left font-medium">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {sampleFlights.map((f, i) => (
                  <tr key={i} className={`border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}>
                    <td className="px-4 py-3 font-medium">{f.airline}</td>
                    <td className="px-4 py-3">{f.flight}</td>
                    <td className="px-4 py-3">{f.from}</td>
                    <td className="px-4 py-3">{f.to}</td>
                    <td className="px-4 py-3 font-mono">{f.departure}</td>
                    <td className="px-4 py-3 font-mono">{f.arrival}</td>
                    <td className="px-4 py-3 text-xs">{f.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Airlines */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold">Airlines Serving Uganda</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {airlines.map((airline) => (
              <div key={airline.code} className="bg-card rounded-xl p-5 border border-border shadow-card">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-display font-bold text-primary mb-3">{airline.code}</div>
                <h3 className="font-semibold text-sm mb-1">{airline.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{airline.routes}</p>
                <p className="text-xs text-muted-foreground"><MapPin className="w-3 h-3 inline mr-1" />{airline.hub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airports */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold">Airports in Uganda</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {airports.map((a) => (
              <div key={a.name} className="bg-card rounded-xl p-5 border border-border shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-sm">{a.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.type === "International" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{a.type}</span>
                </div>
                {a.code !== "N/A" && <p className="text-xs font-mono text-muted-foreground mb-1">Code: {a.code}</p>}
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" />{a.location}</p>
                <p className="text-xs text-muted-foreground">{a.facilities}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
