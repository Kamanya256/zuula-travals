import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Static exchange rates (approximate) — in production, use a live API
const rates: Record<string, number> = {
  USD: 1,
  UGX: 3750,
  KES: 153,
  TZS: 2530,
  RWF: 1280,
  CDF: 2750,
  EUR: 0.92,
  GBP: 0.79,
  ZAR: 18.5,
};

const currencyNames: Record<string, string> = {
  USD: "US Dollar",
  UGX: "Uganda Shilling",
  KES: "Kenya Shilling",
  TZS: "Tanzania Shilling",
  RWF: "Rwanda Franc",
  CDF: "Congo Franc",
  EUR: "Euro",
  GBP: "British Pound",
  ZAR: "South African Rand",
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("UGX");

  const convert = () => {
    const a = parseFloat(amount) || 0;
    const inUSD = a / rates[from];
    return (inUSD * rates[to]).toFixed(2);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card">
      <h3 className="font-display font-semibold text-sm mb-4">💱 Currency Converter</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Amount</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {Object.keys(rates).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <Button variant="ghost" size="icon" onClick={swap} className="mt-5 shrink-0">
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {Object.keys(rates).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-secondary rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">{amount} {from} =</p>
          <p className="text-xl font-display font-bold text-primary">{convert()} {to}</p>
          <p className="text-xs text-muted-foreground mt-1">{currencyNames[to]}</p>
        </div>
        <p className="text-[10px] text-muted-foreground text-center">Approximate rates. Actual rates may vary at point of exchange.</p>
      </div>
    </div>
  );
}
