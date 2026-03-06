import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Image, MessageSquare, Star } from "lucide-react";

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [trainers, plans, gallery, testimonials, inquiries, unread] = await Promise.all([
        supabase.from("trainers").select("id", { count: "exact", head: true }),
        supabase.from("plans").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);
      return {
        trainers: trainers.count ?? 0,
        plans: plans.count ?? 0,
        gallery: gallery.count ?? 0,
        testimonials: testimonials.count ?? 0,
        inquiries: inquiries.count ?? 0,
        unread: unread.count ?? 0,
      };
    },
  });

  const cards = [
    { title: "Trainers", value: stats?.trainers ?? 0, icon: Users },
    { title: "Plans", value: stats?.plans ?? 0, icon: CreditCard },
    { title: "Gallery Photos", value: stats?.gallery ?? 0, icon: Image },
    { title: "Testimonials", value: stats?.testimonials ?? 0, icon: Star },
    { title: "Total Inquiries", value: stats?.inquiries ?? 0, icon: MessageSquare },
    { title: "Unread Inquiries", value: stats?.unread ?? 0, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl text-foreground">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
