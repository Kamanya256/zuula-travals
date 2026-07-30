import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";

export interface ItineraryDay { day: number; title: string; location: string; activities: string[]; stay?: string }
export interface Itinerary { summary: string; best_time: string; packing_tips: string[]; days: ItineraryDay[] }

interface Props {
  itinerary: Itinerary;
  onChange: (next: Itinerary) => void;
  onRegenerate: (dayNumbers: number[], instruction: string) => Promise<void>;
  regenerating: boolean;
}

export default function ItineraryEditor({ itinerary, onChange, onRegenerate, regenerating }: Props) {
  const [editing, setEditing] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [instruction, setInstruction] = useState("");

  const days = itinerary.days || [];

  const updateDay = (index: number, patch: Partial<ItineraryDay>) => {
    const next = days.map((d, i) => (i === index ? { ...d, ...patch } : d));
    onChange({ ...itinerary, days: next });
  };

  const renumber = (list: ItineraryDay[]) => list.map((d, i) => ({ ...d, day: i + 1 }));

  const addDay = () => {
    const next = renumber([...days, { day: days.length + 1, title: "New day", location: "", activities: [""], stay: "" }]);
    onChange({ ...itinerary, days: next });
    setEditing(next.length - 1);
  };

  const removeDay = (index: number) => {
    onChange({ ...itinerary, days: renumber(days.filter((_, i) => i !== index)) });
    setEditing(null);
    setSelected([]);
  };

  const toggleSelected = (day: number) =>
    setSelected((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));

  return (
    <div className="space-y-4">
      <Card className="bg-muted/40">
        <CardContent className="pt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-semibold">Itinerary editor</h3>
              <p className="text-sm text-muted-foreground">
                Edit any day by hand, or tick days and re-generate just those.
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-full" onClick={addDay}>
              <Plus className="w-4 h-4 mr-1.5" /> Add day
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regen-instruction">What should change on the selected days?</Label>
            <Input
              id="regen-instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="More time in the park, less driving, add a cultural visit..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              className="rounded-full"
              disabled={!selected.length || regenerating}
              onClick={() => onRegenerate([...selected].sort((a, b) => a - b), instruction)}
            >
              {regenerating
                ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Re-generating...</>
                : <><RefreshCw className="w-4 h-4 mr-1.5" /> Re-generate {selected.length || "selected"} day{selected.length === 1 ? "" : "s"}</>}
            </Button>
            {selected.length > 0 && (
              <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
                <X className="w-4 h-4 mr-1.5" /> Clear selection
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {days.map((d, index) => {
        const isEditing = editing === index;
        return (
          <Card key={`${d.day}-${index}`} className={selected.includes(d.day) ? "border-primary" : undefined}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex flex-col items-center justify-center text-xs font-semibold">
                    <span className="text-[10px] uppercase">Day</span>{d.day}
                  </div>
                  <Checkbox
                    checked={selected.includes(d.day)}
                    onCheckedChange={() => toggleSelected(d.day)}
                    aria-label={`Select day ${d.day} for re-generation`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input value={d.title} onChange={(e) => updateDay(index, { title: e.target.value })} placeholder="Day title" />
                      <Input value={d.location} onChange={(e) => updateDay(index, { location: e.target.value })} placeholder="Location" />
                      <Textarea
                        rows={4}
                        value={(d.activities || []).join("\n")}
                        onChange={(e) => updateDay(index, { activities: e.target.value.split("\n") })}
                        placeholder="One activity per line"
                      />
                      <Input value={d.stay || ""} onChange={(e) => updateDay(index, { stay: e.target.value })} placeholder="Overnight stay" />
                      <div className="flex gap-2">
                        <Button size="sm" className="rounded-full" onClick={() => {
                          updateDay(index, { activities: (d.activities || []).filter((a) => a.trim()) });
                          setEditing(null);
                        }}>Done</Button>
                        <Button size="sm" variant="ghost" onClick={() => removeDay(index)}>
                          <Trash2 className="w-4 h-4 mr-1.5" /> Remove day
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display font-semibold text-lg">{d.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{d.location}</p>
                        </div>
                        <Button size="icon" variant="ghost" aria-label={`Edit day ${d.day}`} onClick={() => setEditing(index)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </div>
                      <ul className="space-y-1.5 text-sm">
                        {(d.activities || []).map((a, i) => (
                          <li key={i} className="flex gap-2"><span className="text-primary">•</span><span>{a}</span></li>
                        ))}
                      </ul>
                      {d.stay && <p className="text-xs text-muted-foreground mt-3">Overnight: {d.stay}</p>}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
