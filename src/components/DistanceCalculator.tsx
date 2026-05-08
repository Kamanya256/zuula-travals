import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
  "Entebbe Airport", "Kampala City Center", "Jinja", "Fort Portal", "Bwindi Impenetrable Forest",
  "Murchison Falls NP", "Queen Elizabeth NP", "Kibale NP", "Lake Bunyonyi", "Sipi Falls",
  "Ssese Islands", "Nairobi, Kenya", "Kigali, Rwanda", "Dar es Salaam, Tanzania",
];

const distances: Record<string, Record<string, { km: number; hours: string }>> = {
  "Entebbe Airport": { "Kampala City Center": { km: 40, hours: "1h" }, "Jinja": { km: 120, hours: "2.5h" }, "Fort Portal": { km: 320, hours: "5.5h" }, "Bwindi Impenetrable Forest": { km: 460, hours: "8h" }, "Murchison Falls NP": { km: 330, hours: "5h" }, "Queen Elizabeth NP": { km: 420, hours: "7h" }, "Kibale NP": { km: 350, hours: "6h" }, "Lake Bunyonyi": { km: 480, hours: "8.5h" }, "Sipi Falls": { km: 280, hours: "5h" }, "Ssese Islands": { km: 80, hours: "2h+ferry" } },
  "Kampala City Center": { "Jinja": { km: 80, hours: "1.5h" }, "Fort Portal": { km: 300, hours: "5h" }, "Bwindi Impenetrable Forest": { km: 440, hours: "7.5h" }, "Murchison Falls NP": { km: 305, hours: "5h" }, "Queen Elizabeth NP": { km: 400, hours: "6.5h" }, "Kibale NP": { km: 320, hours: "5.5h" }, "Lake Bunyonyi": { km: 460, hours: "8h" }, "Sipi Falls": { km: 260, hours: "4.5h" } },
};

export default function DistanceCalculator() {
  const [from, setFrom] = useState("Entebbe Airport");
  const [to, setTo] = useState("Kampala City Center");
  const result = distances[from]?.[to] || distances[to]?.[from] || null;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Navigation className="w-5 h-5 text-primary" /> Distance Calculator</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {locations.filter((l) => l !== from).map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      {result ? (
        <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/10">
          <p className="text-2xl font-display font-bold text-primary">{result.km} km</p>
          <p className="text-sm text-muted-foreground">Approx. {result.hours} by road</p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">Select two different locations to see distance.</p>
      )}
      <p className="text-[10px] text-muted-foreground text-center mt-3">Distances are approximate. Actual travel time depends on road conditions.</p>
    </div>
  );
}
