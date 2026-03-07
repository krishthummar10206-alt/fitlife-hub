import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Transformations = () => {
  const { data: items = [] } = useQuery({
    queryKey: ["public-transformations"],
    queryFn: async () => {
      const { data } = await supabase.from("transformations").select("*").eq("is_active", true).order("display_order");
      return data ?? [];
    },
  });

  return (
    <div>
      <section className="relative py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">Real Results</p>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Before & <span className="text-primary">After</span></h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">See the incredible transformations of our members. Real people, real results.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {items.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {items.map((t: any, i: number) => (
                <motion.div key={t.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <div className="grid grid-cols-2 relative">
                    <div className="relative">
                      <img src={t.before_image_url} alt="Before" className="w-full aspect-[3/4] object-cover" loading="lazy" />
                      <span className="absolute bottom-3 left-3 bg-background/80 text-foreground text-xs font-heading tracking-wider px-3 py-1 rounded">BEFORE</span>
                    </div>
                    <div className="relative">
                      <img src={t.after_image_url} alt="After" className="w-full aspect-[3/4] object-cover" loading="lazy" />
                      <span className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-xs font-heading tracking-wider px-3 py-1 rounded">AFTER</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <ArrowRight className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-5">
                    {t.client_name && <p className="font-heading text-lg text-foreground">{t.client_name}</p>}
                    {t.description && <p className="text-sm text-muted-foreground mt-1">{t.description}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">Transformations coming soon!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Transformations;
