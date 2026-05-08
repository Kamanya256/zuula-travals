import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function ContactPage() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const { error } = await supabase.from("contact_messages").insert({
      full_name: data.get("full_name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string || null,
      subject: data.get("subject") as string,
      message: data.get("message") as string,
    });

    setSending(false);
    if (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      form.reset();
    }
  };

  const contacts = [
    { icon: Phone, label: "Phone", value: "+256 774 488 956", href: "tel:+256774488956" },
    { icon: Phone, label: "Phone 2", value: "+256 703 936 165", href: "tel:+256703936165" },
    { icon: Phone, label: "Phone 3", value: "+256 393 256 310", href: "tel:+256393256310" },
    { icon: Mail, label: "Email", value: "zulatravels@gmail.com", href: "mailto:zulatravels@gmail.com" },
    { icon: MapPin, label: "Address", value: "Kampala, Uganda" },
    { icon: Clock, label: "Hours", value: "Mon - Sat: 8:00 AM - 6:00 PM" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <p className="text-accent font-medium text-sm tracking-wider uppercase mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 text-lg">Ready to plan your adventure? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl mb-6">Let's Talk</h2>
                <p className="text-muted-foreground">Whether you're planning a gorilla trek, need courier services, or want a custom itinerary — our team is ready to help.</p>
              </div>
              <div className="space-y-5">
                {contacts.map((item) => (
                  <div key={item.label + item.value} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border shadow-card p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <Input name="full_name" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <Input name="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone</label>
                    <Input name="phone" type="tel" placeholder="+256 774 488 956" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Subject</label>
                    <Input name="subject" placeholder="Tour Inquiry" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message</label>
                  <Textarea name="message" placeholder="Tell us about your travel plans..." rows={5} required />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-full" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
