import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Instagram, Facebook, Twitter } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Trainers = () => {
  const { data: trainers = [] } = useQuery({
    queryKey: ["public-trainers"],
    queryFn: async () => {
      const { data } = await supabase.from("trainers").select("*").eq("is_active", true).order("display_order");
      return data ?? [];
    },
  });

  return (
    <div>
      <section className="relative py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">Meet The Team</p>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Our <span className="text-primary">Trainers</span></h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {trainers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((t: any, i: number) => (
                <motion.div key={t.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-xl border border-border/50 overflow-hidden group hover:border-primary/40 transition-all">
                  <div className="h-56 bg-secondary flex items-center justify-center overflow-hidden">
                    {t.image_url ? (
                      <img src={t.image_url} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <span className="font-heading text-6xl text-primary/40">
                        {t.name.split(" ").map((n: string) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-foreground">{t.name}</h3>
                    <p className="text-primary text-sm font-medium mt-1">{t.specialization}</p>
                    <p className="text-muted-foreground text-xs mt-1">{t.experience_years} Years Experience</p>
                    {t.bio && <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{t.bio}</p>}
                    <div className="flex gap-2 mt-4">
                      {t.social_instagram && <a href={t.social_instagram} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-3.5 w-3.5" /></a>}
                      {t.social_facebook && <a href={t.social_facebook} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-3.5 w-3.5" /></a>}
                      {t.social_twitter && <a href={t.social_twitter} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-3.5 w-3.5" /></a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">Trainer profiles coming soon!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Trainers;
