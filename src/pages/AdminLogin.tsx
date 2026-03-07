import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, Dumbbell } from "lucide-react";
import { toast } from "sonner";

const ADMIN_EMAIL = "admin@ironfit.local";

const AdminLogin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    if (error) {
      toast.error("Invalid password");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-heading text-xl">Loading...</div>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <h1 className="font-heading text-3xl text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">Your account does not have admin privileges.</p>
          <Button variant="outline" onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <form onSubmit={handleLogin} className="glass rounded-2xl p-10 max-w-md w-full mx-4 space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Dumbbell className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="font-heading text-4xl text-foreground">Admin <span className="text-primary">Panel</span></h1>
          <p className="text-muted-foreground mt-2">Enter password to access dashboard</p>
        </div>
        <div>
          <Input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-center text-lg py-6"
          />
        </div>
        <Button type="submit" className="w-full font-heading tracking-wider" size="lg" disabled={submitting}>
          <LogIn className="mr-2 h-5 w-5" /> {submitting ? "SIGNING IN..." : "SIGN IN"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
