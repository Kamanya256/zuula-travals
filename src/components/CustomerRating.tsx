import { useState, useEffect } from "react";
import { Star, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AuthGate from "@/components/AuthGate";

interface Props {
  itemName: string;
  itemType: string;
}

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
};

export default function CustomerRating({ itemName, itemType }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .eq("item_name", itemName)
      .eq("item_type", itemType)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setReviews(data as unknown as Review[]);
      });
  }, [itemName, itemType, submitted]);

  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  const submit = async () => {
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (!user) return;

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      item_name: itemName,
      item_type: itemType,
      rating,
      comment: review || null,
    } as any);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Thank you!", description: "Your review has been submitted." });
  };

  return (
    <div className="space-y-4">
      <AuthGate message="Sign in to leave a review and rating.">
        {submitted ? (
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-5 h-5 ${s <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <p className="text-sm font-medium">Thank you for rating {itemName}!</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-display font-semibold text-sm mb-3">Rate this {itemType}</h3>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="p-0.5">
                  <Star className={`w-7 h-7 transition-colors ${s <= (hover || rating) ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                </button>
              ))}
              {rating > 0 && <span className="ml-2 text-sm text-muted-foreground self-center">{rating}/5</span>}
            </div>
            <Textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Share your experience..." rows={3} className="mb-3 text-sm" />
            <Button onClick={submit} size="sm" className="rounded-full"><Send className="w-3.5 h-3.5 mr-1.5" /> Submit Review</Button>
          </div>
        )}
      </AuthGate>

      {/* Display existing reviews */}
      {reviews.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm">Reviews ({reviews.length})</h3>
            {avgRating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold">{avgRating}</span>
                <span className="text-muted-foreground">/ 5</span>
              </div>
            )}
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {reviews.map((r) => (
              <div key={r.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
                {r.comment && <p className="text-xs text-muted-foreground">{r.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
