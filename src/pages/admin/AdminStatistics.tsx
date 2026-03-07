import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DynamicIcon from "@/components/DynamicIcon";

const empty = { title: "", value: "", icon_name: "trophy", display_order: 0, is_active: true };

const AdminStatistics = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(empty);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("statistics").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("statistics").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("statistics").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-statistics"] });
      toast.success(editing ? "Updated" : "Added");
      setOpen(false); setEditing(null); setForm(empty);
    },
    onError: (e) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("statistics").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-statistics"] }); toast.success("Deleted"); },
  });

  const openEdit = (s: any) => {
    setEditing(s);
    setForm({ title: s.title, value: s.value, icon_name: s.icon_name, display_order: s.display_order, is_active: s.is_active });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl text-foreground">Statistics</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm(empty); setOpen(true); }}><Plus className="h-4 w-4 mr-2" /> Add Statistic</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Statistic</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title (e.g. Years of Experience) *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input placeholder="Value (e.g. 10+) *" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Icon Name</label>
                <div className="flex items-center gap-3">
                  <Input placeholder="Icon name" value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} />
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <DynamicIcon name={form.icon_name} className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
              <Input placeholder="Display Order" type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: +e.target.value })} />
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <Button className="w-full" onClick={() => save.mutate()} disabled={save.isPending || !form.title || !form.value}>
                {save.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {items.map((s: any) => (
          <div key={s.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <DynamicIcon name={s.icon_name} className="h-5 w-5 text-primary" />
              <div>
                <p className="font-heading text-foreground">{s.value} — {s.title}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove.mutate(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-center py-8">No statistics yet.</p>}
      </div>
    </div>
  );
};

export default AdminStatistics;
