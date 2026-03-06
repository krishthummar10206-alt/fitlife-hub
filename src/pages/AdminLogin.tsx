import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable/index";
import { LogIn } from "lucide-react";

const AdminLogin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) console.error("Login error:", error);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
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
      <div className="glass rounded-2xl p-10 max-w-md w-full mx-4 text-center space-y-6">
        <h1 className="font-heading text-4xl text-foreground">Admin <span className="text-primary">Panel</span></h1>
        <p className="text-muted-foreground">Sign in with Google to access the dashboard</p>
        <Button onClick={handleGoogleLogin} className="w-full font-heading tracking-wider" size="lg">
          <LogIn className="mr-2 h-5 w-5" /> SIGN IN WITH GOOGLE
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
