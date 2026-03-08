import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, CreditCard, Image, MessageSquare, Star, Wrench, BarChart3, FileText, ArrowLeftRight, ThumbsUp } from "lucide-react";

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      // Single optimized batch of parallel count queries
      const tables = [
        { key: "services", table: "services" as const },
        { key: "trainers", table: "trainers" as const },
        { key: "plans", table: "plans" as const },
        { key: "gallery", table: "gallery" as const },
        { key: "testimonials", table: "testimonials" as const },
        { key: "blogPosts", table: "blog_posts" as const },
        { key: "transformations", table: "transformations" as const },
        { key: "reviews", table: "reviews" as const },
      ] as const;

      const results = await Promise.all([
        ...tables.map(t => supabase.from(t.table).select("id", { count: "exact", head: true })),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("reviews").select("id", { count: "exact", head: true }).eq("is_approved", false),
      ]);

      const counts: Record<string, number> = {};
      tables.forEach((t, i) => { counts[t.key] = results[i].count ?? 0; });
      counts.unread = results[tables.length].count ?? 0;
      counts.pendingReviews = results[tables.length + 1].count ?? 0;
      return counts;
    },
    staleTime: 1000 * 60 * 2,
  });

  const cards = [
    { title: "Services", key: "services", icon: Wrench },
    { title: "Trainers", key: "trainers", icon: Users },
    { title: "Plans", key: "plans", icon: CreditCard },
    { title: "Gallery", key: "gallery", icon: Image },
    { title: "Transformations", key: "transformations", icon: ArrowLeftRight },
    { title: "Pending Reviews", key: "pendingReviews", icon: ThumbsUp },
    { title: "Testimonials", key: "testimonials", icon: Star },
    { title: "Blog Posts", key: "blogPosts", icon: FileText },
    { title: "Unread Inquiries", key: "unread", icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-9 w-16" />
              ) : (
                <p className="font-heading text-3xl text-foreground">{stats?.[c.key] ?? 0}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
