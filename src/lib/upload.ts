import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File, folder: string = "uploads"): Promise<string> => {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  
  const { error } = await supabase.storage.from("images").upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });
  
  if (error) throw error;
  
  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  return data.publicUrl;
};
