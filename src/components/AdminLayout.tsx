import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard, Users, CreditCard, Image, MessageSquare, Star, LogOut, Home,
  Wrench, BarChart3, FileText, ArrowLeftRight, ThumbsUp, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/services", icon: Wrench, label: "Services" },
  { to: "/admin/trainers", icon: Users, label: "Trainers" },
  { to: "/admin/plans", icon: CreditCard, label: "Plans" },
  { to: "/admin/gallery", icon: Image, label: "Gallery" },
  { to: "/admin/transformations", icon: ArrowLeftRight, label: "Transformations" },
  { to: "/admin/statistics", icon: BarChart3, label: "Statistics" },
  { to: "/admin/reviews", icon: ThumbsUp, label: "Reviews" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/blog", icon: FileText, label: "Blog" },
  { to: "/admin/inquiries", icon: MessageSquare, label: "Inquiries" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-border">
          <h1 className="font-heading text-2xl text-foreground">Iron<span className="text-primary">Fit</span></h1>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}
                className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  location.pathname === item.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}>
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-border space-y-2">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2">
            <Home className="h-4 w-4" /> View Site
          </Link>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <h1 className="font-heading text-xl text-foreground">Iron<span className="text-primary">Fit</span></h1>
          <ScrollArea className="max-w-[60vw]">
            <div className="flex gap-2">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to}
                  className={cn("p-2 rounded-lg shrink-0", location.pathname === item.to ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </ScrollArea>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
