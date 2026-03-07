import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { data: items = [] } = useQuery({
    queryKey: ["public-gallery"],
    queryFn: async () => {
      const { data } = await supabase.from("gallery").select("*").eq("is_active", true).order("display_order");
      return data ?? [];
    },
  });

  const categories = ["All", ...Array.from(new Set(items.map((i: any) => i.category)))];
  const filtered = filter === "All" ? items : items.filter((i: any) => i.category === filter);

  return (
    <div>
      <section className="relative py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">Our Space</p>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Photo <span className="text-primary">Gallery</span></h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {items.length > 0 ? (
            <>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((c: string) => (
                  <button key={c} onClick={() => setFilter(c)}
                    className={`font-heading tracking-wider text-sm px-5 py-2 rounded-full border transition-colors ${
                      filter === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((img: any, i: number) => (
                  <motion.div key={img.id} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => setLightbox(img.image_url)}>
                    <img src={img.image_url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground py-16">Gallery photos coming soon!</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 text-foreground" onClick={() => setLightbox(null)}>
              <X className="h-8 w-8" />
            </button>
            <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] rounded-lg object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
