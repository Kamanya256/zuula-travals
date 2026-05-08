import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="py-32 text-center">
      <div className="container max-w-lg">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your payment. Your booking has been confirmed.</p>
        <p className="text-muted-foreground mb-8">You will receive a confirmation email shortly.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild><Link to="/packages">Browse Packages</Link></Button>
          <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
        </div>
      </div>
    </div>
  );
}
