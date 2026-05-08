import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthGateProps {
  children: React.ReactNode;
  message?: string;
}

export default function AuthGate({ children, message = "Please sign in to continue." }: AuthGateProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-display font-semibold text-lg mb-2">Sign In Required</h3>
        <p className="text-sm text-muted-foreground mb-4">{message}</p>
        <Button asChild className="rounded-full">
          <Link to="/auth" state={{ from: location.pathname + location.search }}>Sign In / Sign Up</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
