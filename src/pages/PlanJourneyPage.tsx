import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CalendarDays, Compass, Loader2, MapPin, Sparkles, Trash2, Users } from "lucide-react";

const COUNTRIES = ["Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi", "South Sudan", "DR Congo", "Multi-country East Africa"];
const STYLES = ["Safari & Wildlife", "Cultural & Heritage", "Religious Pilgrimage", "Adventure & Hiking", "Beach & Marine", "Business & Investment", "Family Holiday", "Honeymoon"];
const BUDGETS = ["Budget", "Mid-range", "Premium", "Luxury"];
const INTERESTS = ["Gorilla trekking", "Big five safari", "Birding", "Hiking", "Water sports", "City tours", "Local cuisine", "Markets & crafts", "Historical sites", "Community & volunteering", "Photography", "Nightlife"];

interface ItineraryDay { day: number; title: string; location: string; activities: string[]; stay?: string }
interface Itinerary { summary: string; best_time: string; packing_tips: string[]; days: ItineraryDay[] }
interface TripPlan {
  id: string; trip_name: string; country: string | null; travel_style: string | null;
  start_date: string | null; days: number; travellers: number; budget_range: string | null;
  interests: string[]; notes: string | null; generated_itinerary: unknown; created_at: string;
}

export default function PlanJourneyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [tripName, setTripName] = useState("");
  const [country, setCountry] = useState("Uganda");
  const [style, setStyle] = useState(STYLES[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(5);
  const [travellers, setTravellers] = useState(2);
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [saved, setSaved] = useState<TripPlan[]>([]);

  useEffect(() => {
    document.title = "Plan My Journey | Zula Travels";
  }, []);

  const loadPlans = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("trip_plans")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    setSaved((data as unknown as TripPlan[]) || []);
  };

  useEffect(() => { loadPlans(); /* eslint-disable-next-line */ }, [user]);

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const generate = async () => {
    if (!user) { navigate("/auth"); return; }
    setGenerating(true);
    setItinerary(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-trip-plan", {
        body: { country, days, travellers, travel_style: style, budget_range: budget, interests, start_date: startDate || null, notes },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      setItinerary((data as { itinerary: Itinerary }).itinerary);
      toast({ title: "Your journey is ready", description: "Review the plan below, then save it." });
    } catch (e) {
      toast({ title: "Could not build the plan", description: (e as Error).message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const savePlan = async () => {
    if (!user || !itinerary) return;
    const { error } = await supabase.from("trip_plans").insert({
      user_id: user.id,
      trip_name: tripName || `${days}-day ${country} journey`,
      country, travel_style: style, budget_range: budget,
      start_date: startDate || null, days, travellers, interests, notes,
      generated_itinerary: itinerary as unknown as never,
      status: "saved",
    });
    if (error) { toast({ title: "Save failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Trip saved", description: "Find it under My saved journeys." });
    loadPlans();
  };

  const removePlan = async (id: string) => {
    await supabase.from("trip_plans").delete().eq("id", id);
    loadPlans();
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <p className="uppercase tracking-wider text-sm text-primary-foreground/80 mb-2">Plan My Journey</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Build your East African journey</h1>
          <p className="max-w-2xl text-primary-foreground/90">
            Tell us how you like to travel and our planner will shape a day-by-day route across Uganda, Kenya, Tanzania,
            Rwanda and beyond. Save it, refine it, and our team turns it into a confirmed booking.
          </p>
        </div>
      </section>

      <section className="container py-14 grid lg:grid-cols-[420px_1fr] gap-10 items-start">
        <Card className="lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display"><Compass className="w-5 h-5 text-primary" /> Your preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="trip-name">Trip name</Label>
              <Input id="trip-name" value={tripName} onChange={(e) => setTripName(e.target.value)} placeholder="Family safari 2026" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Destination</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Travel style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STYLES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="days">Days</Label>
                <Input id="days" type="number" min={1} max={30} value={days} onChange={(e) => setDays(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pax">Travellers</Label>
                <Input id="pax" type="number" min={1} max={60} value={travellers} onChange={(e) => setTravellers(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Budget</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{BUDGETS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start">Preferred start date</Label>
              <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button key={i} type="button" onClick={() => toggleInterest(i)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${interests.includes(i) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"}`}>
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Anything else?</Label>
              <Textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Accessibility needs, dietary needs, must-see places..." />
            </div>

            {travellers > 5 && (
              <p className="text-xs text-primary">Groups above 5 travellers qualify for a 5% group discount.</p>
            )}

            <Button className="w-full rounded-full" onClick={generate} disabled={generating || loading}>
              {generating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Building your journey...</> : <><Sparkles className="w-4 h-4 mr-2" /> Generate itinerary</>}
            </Button>
            {!user && !loading && (
              <p className="text-xs text-muted-foreground text-center">
                <Link to="/auth" className="text-primary underline">Sign in</Link> to generate and save journeys.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-10">
          {!itinerary && !generating && (
            <div className="border border-dashed border-border rounded-2xl p-12 text-center">
              <Compass className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-display font-semibold mb-2">Your itinerary will appear here</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Choose a destination, duration and the experiences you care about — we handle the routing, pacing and
                the best time to travel.
              </p>
            </div>
          )}

          {itinerary && (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-2xl font-display font-bold">{tripName || `${days}-day ${country} journey`}</h2>
                  <p className="text-muted-foreground">{itinerary.summary}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {country}</span>
                    <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-primary" /> {days} days</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> {travellers} travellers</span>
                  </div>
                  <p className="text-sm"><span className="font-medium">Best time to travel:</span> {itinerary.best_time}</p>
                  <div className="flex flex-wrap gap-2">
                    {itinerary.packing_tips?.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button onClick={savePlan} className="rounded-full">Save this journey</Button>
                    <Button asChild variant="outline" className="rounded-full"><Link to="/booking">Request a booking</Link></Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {itinerary.days?.map((d) => (
                  <Card key={d.day}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex flex-col items-center justify-center text-xs font-semibold">
                          <span className="text-[10px] uppercase">Day</span>{d.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-lg">{d.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin className="w-3.5 h-3.5" /> {d.location}</p>
                          <ul className="space-y-1.5 text-sm">
                            {d.activities?.map((a, i) => (
                              <li key={i} className="flex gap-2"><span className="text-primary">•</span><span>{a}</span></li>
                            ))}
                          </ul>
                          {d.stay && <p className="text-xs text-muted-foreground mt-3">Overnight: {d.stay}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {saved.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-4">My saved journeys</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {saved.map((p) => (
                  <Card key={p.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">{p.trip_name}</h3>
                          <p className="text-sm text-muted-foreground">{p.country} · {p.days} days · {p.travellers} travellers</p>
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => removePlan(p.id)} aria-label="Delete saved journey">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button variant="link" className="px-0 mt-2"
                        onClick={() => { setItinerary(p.generated_itinerary as Itinerary); setTripName(p.trip_name); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                        View itinerary
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
