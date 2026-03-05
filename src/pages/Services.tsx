import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Dumbbell, Flame, TrendingUp, UserCheck, Users, Apple, Zap, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const services = [
  { icon: Dumbbell, title: "Weight Training", desc: "Build muscle and strength with our extensive free weight and machine sections, guided by certified trainers." },
  { icon: Flame, title: "Fat Loss Program", desc: "Specialized high-intensity programs designed to burn fat efficiently while preserving lean muscle mass." },
  { icon: TrendingUp, title: "Muscle Gain Program", desc: "Structured hypertrophy training combined with nutrition plans for maximum muscle growth." },
  { icon: UserCheck, title: "Personal Training", desc: "One-on-one sessions with expert trainers who create customized plans for your unique goals." },
  { icon: Users, title: "Group Fitness Classes", desc: "Energizing group workouts including HIIT, Zumba, Yoga, and Spinning classes." },
  { icon: Apple, title: "Diet Consultation", desc: "Expert nutritionists create personalized meal plans to complement your training regimen." },
  { icon: Zap, title: "Strength Training", desc: "Functional strength programs focused on improving performance, posture, and daily life activities." },
  { icon: Heart, title: "Cardio Programs", desc: "From treadmills to rowing machines, our cardio zone keeps your heart healthy and endurance high." },
];

const Services = () => (
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
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/40 transition-all group"
            >
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <Link to="/contact" className="inline-flex items-center text-primary text-sm font-medium hover:underline">
                Learn More <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary">
      <div className="container mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">Not Sure Where to Start?</h2>
        <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">Book a free consultation and let our experts design the perfect program for you.</p>
        <Link to="/contact">
          <Button size="lg" variant="outline" className="font-heading tracking-wider border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            GET STARTED <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default Services;
