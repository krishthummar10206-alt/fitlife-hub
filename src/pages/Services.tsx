import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const fallbackServices = [
  { id: "1", name: "Weight Training", description: "Build muscle and strength with our extensive free weight and machine sections.", icon_name: "dumbbell" },
  { id: "2", name: "Fat Loss Program", description: "Specialized high-intensity programs designed to burn fat efficiently.", icon_name: "flame" },
  { id: "3", name: "Muscle Gain Program", description: "Structured hypertrophy training combined with nutrition plans.", icon_name: "trending-up" },
  { id: "4", name: "Personal Training", description: "One-on-one sessions with expert trainers for customized plans.", icon_name: "user-check" },
  { id: "5", name: "Group Fitness Classes", description: "Energizing group workouts including HIIT, Zumba, Yoga, and Spinning.", icon_name: "users" },
  { id: "6", name: "Diet Consultation", description: "Expert nutritionists create personalized meal plans.", icon_name: "apple" },
  { id: "7", name: "Strength Training", description: "Functional strength programs for performance and daily life.", icon_name: "zap" },
  { id: "8", name: "Cardio Programs", description: "Treadmills to rowing machines, keeping your heart healthy.", icon_name: "heart" },
];

const Services = () => {
  const { data: services } = useQuery({
    queryKey: ["public-services-page"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").eq("is_active", true).order("display_order");
      return data && data.length > 0 ? data : null;
    },
  });

  const displayServices = services ?? fallbackServices;

  return (
    <div>
      <section className="relative py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">What We Offer</p>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Our <span className="text-primary">Services</span></h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayServices.map((s: any, i: number) => (
              <motion.div key={s.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/40 transition-all group">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <DynamicIcon name={s.icon_name} className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">{s.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">Not Sure Where to Start?</h2>
          <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">Book a free consultation and let our experts design the perfect program for you.</p>
          <a href="tel:+918238280606">
            <Button size="lg" variant="outline" className="font-heading tracking-wider border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              CALL NOW <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
