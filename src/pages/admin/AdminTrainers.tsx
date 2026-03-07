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
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type Trainer = Tables<"trainers">;

const emptyTrainer: Omit<TablesInsert<"trainers">, "id"> = {
  name: "", specialization: "", experience_years: 0, bio: "", image_url: "",
  social_instagram: "", social_twitter: "", social_facebook: "", display_order: 0, is_active: true,
};

const AdminTrainers = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Trainer | null>(null);
  const [form, setForm] = useState(emptyTrainer);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: trainers = [] } = useQuery({
    queryKey: ["admin-trainers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("trainers").select("*").order("display_order");
      if (error) throw error;
      return data as Trainer[];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("trainers").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("trainers").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-trainers"] });
      toast.success(editing ? "Trainer updated" : "Trainer added");
      setOpen(false); setEditing(null); setForm(emptyTrainer);
    },
    onError: (e) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("trainers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-trainers"] }); toast.success("Deleted"); },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "trainers");
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message);
    }
    setUploading(false);
  };

  const openEdit = (t: Trainer) => {
    setEditing(t);
    setForm({
      name: t.name, specialization: t.specialization, experience_years: t.experience_years,
      bio: t.bio ?? "", image_url: t.image_url ?? "", social_instagram: t.social_instagram ?? "",
      social_twitter: t.social_twitter ?? "", social_facebook: t.social_facebook ?? "",
      display_order: t.display_order, is_active: t.is_active,
    });
    setOpen(true);
  };

  const set = (key: string, val: string | number | boolean) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl text-foreground">Trainers</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm(emptyTrainer); setOpen(true); }}><Plus className="h-4 w-4 mr-2" /> Add Trainer</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Trainer</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Name *" value={form.name} onChange={(e) => set("name", e.target.value)} />
              <Input placeholder="Specialization *" value={form.specialization} onChange={(e) => set("specialization", e.target.value)} />
              <Input placeholder="Experience (years)" type="number" value={form.experience_years} onChange={(e) => set("experience_years", +e.target.value)} />
              <Textarea placeholder="Bio" value={form.bio ?? ""} onChange={(e) => set("bio", e.target.value)} />
              <div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full">
                  <Upload className="h-4 w-4 mr-2" /> {uploading ? "Uploading..." : "Upload Photo"}
                </Button>
                {form.image_url && <img src={form.image_url as string} alt="Preview" className="mt-2 rounded-lg max-h-24 object-cover" />}
              </div>
              <Input placeholder="Instagram URL" value={form.social_instagram ?? ""} onChange={(e) => set("social_instagram", e.target.value)} />
              <Input placeholder="Twitter URL" value={form.social_twitter ?? ""} onChange={(e) => set("social_twitter", e.target.value)} />
              <Input placeholder="Facebook URL" value={form.social_facebook ?? ""} onChange={(e) => set("social_facebook", e.target.value)} />
              <Input placeholder="Display Order" type="number" value={form.display_order} onChange={(e) => set("display_order", +e.target.value)} />
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => set("is_active", v)} />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <Button className="w-full" onClick={() => save.mutate()} disabled={save.isPending || !form.name || !form.specialization}>
                {save.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {trainers.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-4">
              {t.image_url ? <img src={t.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" /> : null}
              <div>
                <p className="font-heading text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.specialization} · {t.experience_years}y</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove.mutate(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {trainers.length === 0 && <p className="text-muted-foreground text-center py-8">No trainers yet.</p>}
      </div>
    </div>
  );
};

export default AdminTrainers;
