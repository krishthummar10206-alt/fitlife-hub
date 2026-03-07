import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { uploadImage } from "@/lib/upload";

const empty = { client_name: "", description: "", before_image_url: "", after_image_url: "", display_order: 0, is_active: true };

const AdminTransformations = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState<string | null>(null);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-transformations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("transformations").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("transformations").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("transformations").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-transformations"] });
      toast.success(editing ? "Updated" : "Added");
      setOpen(false); setEditing(null); setForm(empty);
    },
    onError: (e) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("transformations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-transformations"] }); toast.success("Deleted"); },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "before_image_url" | "after_image_url") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(field);
    try {
      const url = await uploadImage(file, "transformations");
      setForm((f) => ({ ...f, [field]: url }));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message);
    }
    setUploading(null);
  };

  const openEdit = (t: any) => {
    setEditing(t);
    setForm({ client_name: t.client_name ?? "", description: t.description ?? "", before_image_url: t.before_image_url, after_image_url: t.after_image_url, display_order: t.display_order, is_active: t.is_active });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl text-foreground">Transformations</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm(empty); setOpen(true); }}><Plus className="h-4 w-4 mr-2" /> Add Transformation</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Transformation</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Client Name (optional)" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
              <Textarea placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Before Image *</label>
                <input ref={beforeRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, "before_image_url")} />
                <Button type="button" variant="outline" onClick={() => beforeRef.current?.click()} disabled={uploading === "before_image_url"} className="w-full">
                  <Upload className="h-4 w-4 mr-2" /> {uploading === "before_image_url" ? "Uploading..." : "Upload Before Image"}
                </Button>
                {form.before_image_url && <img src={form.before_image_url} alt="Before" className="mt-2 rounded-lg max-h-24 object-cover" />}
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-1">After Image *</label>
                <input ref={afterRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, "after_image_url")} />
                <Button type="button" variant="outline" onClick={() => afterRef.current?.click()} disabled={uploading === "after_image_url"} className="w-full">
                  <Upload className="h-4 w-4 mr-2" /> {uploading === "after_image_url" ? "Uploading..." : "Upload After Image"}
                </Button>
                {form.after_image_url && <img src={form.after_image_url} alt="After" className="mt-2 rounded-lg max-h-24 object-cover" />}
              </div>

              <Input placeholder="Display Order" type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: +e.target.value })} />
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <Button className="w-full" onClick={() => save.mutate()} disabled={save.isPending || !form.before_image_url || !form.after_image_url}>
                {save.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {items.map((t: any) => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <img src={t.before_image_url} alt="Before" className="h-12 w-12 rounded object-cover" />
                <img src={t.after_image_url} alt="After" className="h-12 w-12 rounded object-cover" />
              </div>
              <div>
                <p className="font-heading text-foreground">{t.client_name || "Unnamed"}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{t.description || "No description"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove.mutate(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-center py-8">No transformations yet.</p>}
      </div>
    </div>
  );
};

export default AdminTransformations;
