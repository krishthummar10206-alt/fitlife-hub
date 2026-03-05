import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-gym.jpg";
import {
  Dumbbell, Heart, UserCheck, Zap, Shield, Clock, Users, Star,
  Check, ArrowRight, ChevronRight, Activity, Flame, Target
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const services = [
  { icon: Dumbbell, title: "Weight Training", desc: "Build strength with our state-of-the-art equipment and expert guidance." },
  { icon: Heart, title: "Cardio Training", desc: "Boost your endurance with high-intensity cardio programs." },
  { icon: UserCheck, title: "Personal Training", desc: "One-on-one sessions tailored to your specific fitness goals." },
  { icon: Activity, title: "Zumba / Yoga", desc: "Find your balance through energizing dance and mindful yoga." },
  { icon: Flame, title: "CrossFit", desc: "Push your limits with functional training and competitive workouts." },
];

const benefits = [
  { icon: Shield, text: "Certified Trainers" },
  { icon: Dumbbell, text: "Modern Equipment" },
  { icon: Target, text: "Affordable Plans" },
  { icon: Zap, text: "Clean & Hygienic" },
  { icon: Users, text: "Friendly Community" },
  { icon: Clock, text: "Flexible Timings" },
];

const plans = [
  {
    name: "Basic",
    price: "999",
    duration: "/month",
    features: ["Gym Access", "Locker Facility", "Cardio Access", "Free WiFi"],
    popular: false,
  },
  {
    name: "Standard",
    price: "1,999",
    duration: "/month",
    features: ["Gym Access", "Cardio + Group Classes", "Locker Facility", "Diet Tips", "Progress Tracking"],
    popular: true,
  },
  {
    name: "Premium",
    price: "3,499",
    duration: "/month",
    features: ["Gym Access", "Personal Trainer", "Custom Diet Plan", "Group Classes", "All Facilities", "Priority Support"],
    popular: false,
  },
];

const testimonials = [
  { name: "Rahul Sharma", review: "IronFit completely transformed my lifestyle. Lost 20kg in 6 months with their amazing trainers!", rating: 5 },
  { name: "Priya Patel", review: "The best gym I've ever been to. Clean, modern equipment, and the community is incredibly supportive.", rating: 5 },
  { name: "Arjun Mehta", review: "Personal training sessions are worth every penny. My trainer pushed me beyond my limits!", rating: 4 },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Gym workout" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-4 uppercase">Welcome to IronFit</p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground">
              Transform Your <span className="text-primary text-glow">Body.</span>
              <br />
              Transform Your <span className="text-primary text-glow">Life.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Join the best fitness center in your city. Expert trainers, modern equipment, and a community that pushes you forward.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/plans">
                <Button size="lg" className="font-heading tracking-wider text-base px-8">
                  JOIN NOW <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="font-heading tracking-wider text-base px-8 border-primary/50 text-primary hover:bg-primary/10">
                  FREE TRIAL
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="text-primary font-heading tracking-[0.2em] text-sm mb-2 uppercase">About Us</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                More Than Just A <span className="text-primary">Gym</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At IronFit, we believe fitness is a journey, not a destination. Founded with a passion for transforming lives, our state-of-the-art facility combines cutting-edge equipment with expert guidance.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you're a beginner or a seasoned athlete, our certified trainers design personalized programs to help you achieve your goals.
              </p>
              <Link to="/about">
                <Button variant="outline" className="font-heading tracking-wider border-primary/50 text-primary hover:bg-primary/10">
                  LEARN MORE <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-lg p-6 text-center neon-border">
                  <p className="font-heading text-4xl text-primary">10+</p>
                  <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
                </div>
                <div className="bg-card rounded-lg p-6 text-center neon-border">
                  <p className="font-heading text-4xl text-primary">50+</p>
                  <p className="text-sm text-muted-foreground mt-1">Expert Trainers</p>
                </div>
                <div className="bg-card rounded-lg p-6 text-center neon-border">
                  <p className="font-heading text-4xl text-primary">5K+</p>
                  <p className="text-sm text-muted-foreground mt-1">Happy Members</p>
                </div>
                <div className="bg-card rounded-lg p-6 text-center neon-border">
                  <p className="font-heading text-4xl text-primary">15+</p>
                  <p className="text-sm text-muted-foreground mt-1">Programs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading title="Our Services" subtitle="Everything you need to reach your fitness goals under one roof." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-lg p-6 border border-border/50 hover:border-primary/40 transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" className="font-heading tracking-wider border-primary/50 text-primary hover:bg-primary/10">
                VIEW ALL SERVICES <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading title="Why Choose IronFit?" subtitle="We provide the best fitness experience in the city." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.text}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-card rounded-lg p-5 border border-border/50"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-heading text-lg text-foreground">{b.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading title="Membership Plans" subtitle="Choose the plan that fits your fitness journey." />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`rounded-xl p-8 border relative ${
                  p.popular
                    ? "border-primary neon-border bg-background"
                    : "border-border/50 bg-background"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-heading tracking-wider px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-heading text-2xl text-foreground text-center">{p.name}</h3>
                <div className="text-center my-6">
                  <span className="text-muted-foreground text-lg">₹</span>
                  <span className="font-heading text-5xl text-primary">{p.price}</span>
                  <span className="text-muted-foreground">{p.duration}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button
                    className={`w-full font-heading tracking-wider ${
                      p.popular ? "" : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    JOIN NOW
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading title="What Our Members Say" subtitle="Real stories from real transformations." />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-lg p-6 border border-border/50"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`h-4 w-4 ${si < t.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic leading-relaxed mb-4">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-heading text-primary text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <span className="font-semibold text-sm text-foreground">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(142_71%_55%/0.3),transparent_60%)]" />
        <div className="container mx-auto text-center relative">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-4">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
              Take the first step today. Book a free trial session and experience IronFit.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-heading tracking-wider text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                BOOK FREE TRIAL <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
