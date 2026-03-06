import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { Tables } from "@/integrations/supabase/types";

type Plan = Tables<"plans">;

const emptyPlan = { name: "", price: 0, duration: "1 Month", features: [] as string[], is_popular: false, display_order: 0, is_active: true };

const AdminPlans = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [form, setForm] = useState(emptyPlan);
  const [featureInput, setFeatureInput] = useState("");

  const { data: plans = [] } = useQuery({
    queryKey: ["admin-plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("plans").select("*").order("display_order");
      if (error) throw error;
      return data as Plan[];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("plans").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("plans").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-plans"] });
      toast({ title: editing ? "Plan updated" : "Plan added" });
      setOpen(false); setEditing(null); setForm(emptyPlan);
    },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("plans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-plans"] }); toast({ title: "Plan deleted" }); },
  });

  const openEdit = (p: Plan) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, duration: p.duration, features: p.features, is_popular: p.is_popular, display_order: p.display_order, is_active: p.is_active });
    setOpen(true);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm((f) => ({ ...f, features: [...f.features, featureInput.trim()] }));
      setFeatureInput("");
    }
  };

  const removeFeature = (i: number) => setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl text-foreground">Plans</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm(emptyPlan); setOpen(true); }}><Plus className="h-4 w-4 mr-2" /> Add Plan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Plan</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Plan Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
              <Input placeholder="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              <div className="flex gap-2">
                <Input placeholder="Add feature" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())} />
                <Button type="button" variant="outline" onClick={addFeature}>Add</Button>
              </div>
              <div className="space-y-1">
                {form.features.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm bg-secondary px-3 py-1.5 rounded">
                    <span className="text-foreground">{f}</span>
                    <button onClick={() => removeFeature(i)} className="text-destructive text-xs">✕</button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_popular} onCheckedChange={(v) => setForm({ ...form, is_popular: v })} />
                <span className="text-sm text-muted-foreground">Mark as Popular</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <Input placeholder="Display Order" type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: +e.target.value })} />
              <Button className="w-full" onClick={() => save.mutate()} disabled={save.isPending || !form.name}>{save.isPending ? "Saving..." : "Save"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {plans.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div>
              <p className="font-heading text-foreground">{p.name} {p.is_popular && <span className="text-primary text-xs">★ Popular</span>}</p>
              <p className="text-sm text-muted-foreground">₹{p.price} · {p.duration} · {p.features.length} features</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove.mutate(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {plans.length === 0 && <p className="text-muted-foreground text-center py-8">No plans yet.</p>}
      </div>
    </div>
  );
};

export default AdminPlans;
