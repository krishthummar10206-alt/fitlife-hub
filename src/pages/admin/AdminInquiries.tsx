import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MailOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tables } from "@/integrations/supabase/types";

type Submission = Tables<"contact_submissions">;

const AdminInquiries = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: inquiries = [] } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Submission[];
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-inquiries"] });
      toast({ title: "Marked as read" });
    },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Contact Inquiries</h1>
      <div className="space-y-4">
        {inquiries.map((s) => (
          <div key={s.id} className={cn("p-5 rounded-lg border", s.is_read ? "bg-card border-border" : "bg-card border-primary/30")}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {s.is_read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                  <span className="font-heading text-foreground">{s.name}</span>
                  {!s.is_read && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">New</span>}
                </div>
                <p className="text-sm text-muted-foreground">{s.email} {s.phone && `· ${s.phone}`}</p>
                <p className="text-foreground mt-2">{s.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(s.created_at).toLocaleString()}</p>
              </div>
              {!s.is_read && (
                <Button variant="outline" size="sm" onClick={() => markRead.mutate(s.id)}>Mark Read</Button>
              )}
            </div>
          </div>
        ))}
        {inquiries.length === 0 && <p className="text-muted-foreground text-center py-8">No inquiries yet.</p>}
      </div>
    </div>
  );
};

export default AdminInquiries;
