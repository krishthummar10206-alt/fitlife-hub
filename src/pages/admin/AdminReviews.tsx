import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, Check, Trash2, X } from "lucide-react";

const AdminReviews = () => {
  const qc = useQueryClient();

  const { data: reviews = [] } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const approve = useMutation({
    mutationFn: async ({ id, approved }: { id: string; approved: boolean }) => {
      const { error } = await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-reviews"] }); toast.success("Updated"); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-reviews"] }); toast.success("Deleted"); },
  });

  const pending = reviews.filter((r: any) => !r.is_approved);
  const approved = reviews.filter((r: any) => r.is_approved);

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Reviews</h1>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-xl text-foreground mb-4">Pending Approval ({pending.length})</h2>
          <div className="space-y-4">
            {pending.map((r: any) => (
              <div key={r.id} className="p-5 rounded-lg border border-primary/30 bg-card">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading text-foreground">{r.name}</span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Pending</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">{r.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(r.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" onClick={() => approve.mutate({ id: r.id, approved: true })}>
                      <Check className="h-3 w-3 mr-1" /> Approve
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => remove.mutate(r.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-heading text-xl text-foreground mb-4">Approved Reviews ({approved.length})</h2>
      <div className="space-y-4">
        {approved.map((r: any) => (
          <div key={r.id} className="p-5 rounded-lg border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-heading text-foreground">{r.name}</span>
                <div className="flex gap-0.5 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">{r.message}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => approve.mutate({ id: r.id, approved: false })}>
                  <X className="h-3 w-3 mr-1" /> Hide
                </Button>
                <Button variant="destructive" size="sm" onClick={() => remove.mutate(r.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {approved.length === 0 && <p className="text-muted-foreground text-center py-8">No approved reviews.</p>}
      </div>
    </div>
  );
};

export default AdminReviews;
