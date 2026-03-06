import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Testimonial = Tables<"testimonials">;

const AdminTestimonials = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ member_name: "", review: "", rating: 5, image_url: "", display_order: 0, is_active: true });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("display_order");
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("testimonials").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: editing ? "Updated" : "Added" });
      setOpen(false); setEditing(null);
      setForm({ member_name: "", review: "", rating: 5, image_url: "", display_order: 0, is_active: true });
    },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-testimonials"] }); toast({ title: "Deleted" }); },
  });

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ member_name: t.member_name, review: t.review, rating: t.rating, image_url: t.image_url ?? "", display_order: t.display_order, is_active: t.is_active });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl text-foreground">Testimonials</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm({ member_name: "", review: "", rating: 5, image_url: "", display_order: 0, is_active: true }); setOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Member Name *" value={form.member_name} onChange={(e) => setForm({ ...form, member_name: e.target.value })} />
              <Textarea placeholder="Review *" value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rating:</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setForm({ ...form, rating: n })}>
                    <Star className={`h-5 w-5 ${n <= form.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
              <Input placeholder="Photo URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              <Button className="w-full" onClick={() => save.mutate()} disabled={save.isPending || !form.member_name || !form.review}>
                {save.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div>
              <p className="font-heading text-foreground">{t.member_name}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{t.review}</p>
              <div className="flex gap-0.5 mt-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove.mutate(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-muted-foreground text-center py-8">No testimonials yet.</p>}
      </div>
    </div>
  );
};

export default AdminTestimonials;
