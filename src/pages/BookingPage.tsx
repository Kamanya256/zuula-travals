import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Users, ArrowLeft, CheckCircle, CreditCard, Lock, ArrowRight, Banknote, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import BookingReceipt from "@/components/BookingReceipt";
import AuthGate from "@/components/AuthGate";

const steps = ["Details", "Review", "Payment"];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const packageSlug = searchParams.get("package") || "";
  const packageName = packageSlug.replace(/-/g, " ");
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [travelDate, setTravelDate] = useState<Date>();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const [form, setForm] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    travelers: "2",
    message: "",
    paymentMethod: "mobile_money",
    paymentOption: "online",
    cardNumber: "", cardExpiry: "", cardCvv: "", mobileNumber: "",
  });

  const canProceed = () => {
    if (currentStep === 0) return form.fullName && form.email && form.phone && travelDate && agreedToTerms;
    if (currentStep === 1) return true;
    if (currentStep === 2) {
      if (form.paymentOption === "cash") return true;
      if (form.paymentMethod === "card") return form.cardNumber && form.cardExpiry && form.cardCvv;
      if (form.paymentMethod === "mobile_money") return form.mobileNumber;
      return true;
    }
    return false;
  };

  const [payLoading, setPayLoading] = useState(false);

  const handleSubmit = async () => {
    // For card payments, redirect to Stripe
    if (form.paymentOption === "online" && form.paymentMethod === "card") {
      setPayLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("create-payment", {
          body: {
            amount: 50, // deposit amount
            description: `Zula Travels Booking - ${packageName || "Custom"}`,
            metadata: { packageName: packageName || "Custom", travelers: form.travelers },
          },
        });
        if (error) throw error;
        if (data?.url) {
          window.open(data.url, "_blank");
          return;
        }
      } catch (e: any) {
        toast({ title: "Payment Error", description: e.message || "Could not start payment. Try again.", variant: "destructive" });
      } finally {
        setPayLoading(false);
      }
      return;
    }
    // For other methods, just confirm
    setSubmitted(true);
    toast({ title: "Booking Confirmed!", description: "Your booking request has been submitted. We'll contact you within 24 hours." });
  };

  if (submitted) {
    return (
      <div className="py-32 text-center">
        <div className="container max-w-lg">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you, <strong>{form.fullName}</strong>.</p>
          <p className="text-muted-foreground mb-8">Our team will contact you within 24 hours at <strong>{form.email}</strong>.</p>
          <div className="bg-card rounded-xl border border-border p-6 text-left mb-8">
            <h3 className="font-display font-semibold mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Package:</span><span className="capitalize font-medium">{packageName || "Custom Booking"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Travel Date:</span><span>{travelDate ? format(travelDate, "PPP") : "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Travelers:</span><span>{form.travelers}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment:</span><span className="capitalize">{form.paymentOption === "cash" ? "Pay at Premises" : form.paymentMethod.replace("_", " ")}</span></div>
              {promoCode && <div className="flex justify-between"><span className="text-muted-foreground">Promo Code:</span><span className="text-primary font-medium">{promoCode}</span></div>}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingReceipt booking={{
              fullName: form.fullName, email: form.email, phone: form.phone,
              travelers: form.travelers, travelDate: travelDate ? format(travelDate, "PPP") : "N/A",
              packageName: packageName || "Custom", paymentMethod: form.paymentOption === "cash" ? "Pay at Premises" : form.paymentMethod,
              promoCode: promoCode || undefined,
            }} />
            <Button asChild><Link to="/packages">Browse More Packages</Link></Button>
            <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container max-w-3xl">
          <Link to="/packages" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-4"><ArrowLeft className="w-4 h-4" /> Back to Packages</Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Book Your Trip</h1>
          <p className="text-primary-foreground/80">Complete the steps below to secure your booking. All payments are processed in USD.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <AuthGate message="You must sign in or create an account before booking a trip.">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${i <= currentStep ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
                  <span className={`text-sm font-medium hidden sm:inline ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
                  {i < steps.length - 1 && <div className={`w-16 sm:w-24 h-0.5 mx-2 ${i < currentStep ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
            </div>

            {packageSlug && (
              <div className="bg-accent/10 rounded-xl p-4 border border-accent/20 mb-6">
                <p className="text-sm text-muted-foreground">Selected Package:</p>
                <p className="font-display font-semibold capitalize">{packageName}</p>
              </div>
            )}

            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-semibold">Your Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1.5 block">Full Name *</label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Your full name" /></div>
                  <div><label className="text-sm font-medium mb-1.5 block">Email *</label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1.5 block">Phone Number *</label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+256 7XX XXX XXX" /></div>
                  <div><label className="text-sm font-medium mb-1.5 block">Number of Travelers</label><Input type="number" min="1" max="50" value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} /></div>
                </div>
                {parseInt(form.travelers) > 5 && (
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20 flex items-center gap-3">
                    <Users className="w-6 h-6 text-accent shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-accent">🎉 Group Discount Applied!</p>
                      <p className="text-xs text-muted-foreground">You qualify for a <strong>5% discount</strong> with {form.travelers} travelers. The discount will be applied automatically.</p>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Preferred Travel Date *</label>
                  <Popover><PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !travelDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{travelDate ? format(travelDate, "PPP") : "Pick a date"}</Button>
                  </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={travelDate} onSelect={setTravelDate} disabled={(date) => date < new Date()} initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent></Popover>
                </div>
                <div><label className="text-sm font-medium mb-1.5 block">Promo Code (optional)</label><Input value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} placeholder="Enter promo code" /></div>
                <div><label className="text-sm font-medium mb-1.5 block">Special Requests</label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any special requirements..." rows={3} /></div>
                <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(v) => setAgreedToTerms(v === true)} className="mt-1" />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I agree to the <Link to="/terms" className="text-primary underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>. All payments are in USD.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-semibold">Review Your Booking</h2>
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground block">Name</span><span className="font-medium">{form.fullName}</span></div>
                    <div><span className="text-muted-foreground block">Email</span><span className="font-medium">{form.email}</span></div>
                    <div><span className="text-muted-foreground block">Phone</span><span className="font-medium">{form.phone}</span></div>
                    <div><span className="text-muted-foreground block">Travelers</span><span className="font-medium">{form.travelers}</span></div>
                    <div><span className="text-muted-foreground block">Travel Date</span><span className="font-medium">{travelDate ? format(travelDate, "PPP") : "Not set"}</span></div>
                    {packageSlug && <div><span className="text-muted-foreground block">Package</span><span className="font-medium capitalize">{packageName}</span></div>}
                    {promoCode && <div><span className="text-muted-foreground block">Promo Code</span><span className="font-medium text-primary">{promoCode}</span></div>}
                  </div>
                  {form.message && <div className="pt-3 border-t border-border text-sm"><span className="text-muted-foreground block mb-1">Special Requests</span><p>{form.message}</p></div>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-semibold">Payment Method</h2>
                <p className="text-sm text-muted-foreground">💵 All payments are strictly in <strong>US Dollars (USD)</strong>.</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {[{ id: "online", label: "Pay Online", desc: "Mobile Money, Card, or Bank Transfer" }, { id: "cash", label: "Pay at Premises", desc: "Pay cash (USD) at accommodation or office" }].map((o) => (
                    <button key={o.id} onClick={() => setForm({ ...form, paymentOption: o.id })} className={`p-4 rounded-xl border text-left transition-all ${form.paymentOption === o.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/30"}`}>
                      <p className="font-medium text-sm">{o.label}</p><p className="text-xs text-muted-foreground">{o.desc}</p>
                    </button>
                  ))}
                </div>
                {form.paymentOption === "online" && (
                  <>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[{ id: "mobile_money", label: "Mobile Money", icon: Banknote, desc: "MTN, Airtel" }, { id: "card", label: "Card", icon: CreditCard, desc: "Visa, Mastercard" }, { id: "bank_transfer", label: "Bank Transfer", icon: Lock, desc: "Direct deposit" }].map((m) => (
                        <button key={m.id} onClick={() => setForm({ ...form, paymentMethod: m.id })} className={`p-4 rounded-xl border text-left transition-all ${form.paymentMethod === m.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/30"}`}>
                          <m.icon className="w-6 h-6 text-primary mb-2" /><p className="font-medium text-sm">{m.label}</p><p className="text-xs text-muted-foreground">{m.desc}</p>
                        </button>
                      ))}
                    </div>
                    {form.paymentMethod === "card" && (
                      <div className="space-y-4 bg-card rounded-xl border border-border p-6">
                        <div><label className="text-sm font-medium mb-1.5 block">Card Number</label><Input value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} placeholder="1234 5678 9012 3456" /></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="text-sm font-medium mb-1.5 block">Expiry</label><Input value={form.cardExpiry} onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })} placeholder="MM/YY" /></div>
                          <div><label className="text-sm font-medium mb-1.5 block">CVV</label><Input value={form.cardCvv} onChange={(e) => setForm({ ...form, cardCvv: e.target.value })} placeholder="123" type="password" /></div>
                        </div>
                      </div>
                    )}
                    {form.paymentMethod === "mobile_money" && (
                      <div className="bg-card rounded-xl border border-border p-6"><div><label className="text-sm font-medium mb-1.5 block">Mobile Money Number</label><Input value={form.mobileNumber} onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })} placeholder="+256 7XX XXX XXX" /></div></div>
                    )}
                    {form.paymentMethod === "bank_transfer" && (
                      <div className="bg-card rounded-xl border border-border p-6 space-y-3 text-sm">
                        <h3 className="font-semibold">Bank Transfer Details</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p><strong>Bank:</strong> Stanbic Bank Uganda</p><p><strong>Account Name:</strong> Zula Travels Ltd</p>
                          <p><strong>Account Number:</strong> 9030012345678</p><p><strong>Branch:</strong> Kampala Main Branch</p>
                          <p><strong>Swift Code:</strong> SBICUGKX</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {form.paymentOption === "cash" && (
                  <div className="bg-card rounded-xl border border-border p-6 text-sm">
                    <h3 className="font-semibold mb-2">💵 Pay at Premises (USD Only)</h3>
                    <p className="text-muted-foreground">You can pay in cash at the accommodation or our office. All prices are in US Dollars.</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => setCurrentStep((s) => s - 1)} disabled={currentStep === 0} className="rounded-full"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              {currentStep < 2 ? (
                <Button onClick={() => {
                  if (!canProceed()) {
                    if (currentStep === 0 && !agreedToTerms) { toast({ title: "Terms Required", description: "Please agree to the Terms & Conditions.", variant: "destructive" }); return; }
                    toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" }); return;
                  }
                  setCurrentStep((s) => s + 1);
                }} className="rounded-full">Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
              ) : (
                <Button onClick={handleSubmit} disabled={payLoading} className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {payLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
                  {form.paymentOption === "online" && form.paymentMethod === "card" ? "Pay with Stripe" : "Confirm Booking"}
                </Button>
              )}
            </div>
          </AuthGate>
        </div>
      </section>
    </div>
  );
}
