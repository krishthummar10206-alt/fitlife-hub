import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Plans = () => {
  const { data: plans = [] } = useQuery({
    queryKey: ["public-plans-page"],
    queryFn: async () => {
      const { data } = await supabase.from("plans").select("*").eq("is_active", true).order("display_order");
      return data ?? [];
    },
  });

  return (
    <div>
      <section className="relative py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">Pricing</p>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Membership <span className="text-primary">Plans</span></h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Invest in your health. Choose a plan that fits your goals and budget.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((p: any, i: number) => (
              <motion.div key={p.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`rounded-xl p-8 border relative ${p.is_popular ? "border-primary neon-border bg-card" : "border-border/50 bg-card"}`}>
                {p.is_popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-heading tracking-wider px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-heading text-2xl text-foreground text-center">{p.name}</h3>
                <div className="text-center my-6">
                  <span className="text-muted-foreground text-lg">₹</span>
                  <span className="font-heading text-5xl text-primary">{p.price.toLocaleString("en-IN")}</span>
                  <p className="text-muted-foreground text-sm mt-1">{p.duration}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f: string) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="tel:+918238280606">
                  <Button className={`w-full font-heading tracking-wider ${p.is_popular ? "" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                    JOIN NOW <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.div>
            ))}
            {plans.length === 0 && <p className="col-span-3 text-center text-muted-foreground py-16">Plans coming soon!</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;
