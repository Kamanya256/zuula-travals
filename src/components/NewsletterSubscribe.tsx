import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscriptions").insert({ email } as any);
    setLoading(false);
    if (error?.code === "23505") {
      toast({ title: "Already subscribed!", description: "This email is already on our list." });
    } else if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Subscribed! 🎉", description: "You'll receive our latest travel news." });
      setEmail("");
    }
  };

  return (
    <form onSubmit={subscribe} className="flex gap-2 max-w-md">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background/40" />
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10 bg-background/10 border-background/20 text-background placeholder:text-background/40 rounded-full"
        />
      </div>
      <Button type="submit" disabled={loading} className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
        {loading ? "..." : "Subscribe"}
      </Button>
    </form>
  );
}
