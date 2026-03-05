import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const plans = [
  {
    name: "Basic",
    price: "999",
    duration: "per month",
    features: ["Full Gym Access", "Locker Facility", "Cardio Zone Access", "Free WiFi", "Shower & Changing Room"],
    popular: false,
  },
  {
    name: "Standard",
    price: "1,999",
    duration: "per month",
    features: ["Full Gym Access", "Cardio Zone", "Group Fitness Classes", "Locker Facility", "Diet Tips & Guidance", "Progress Tracking", "Free WiFi"],
    popular: true,
  },
  {
    name: "Premium",
    price: "3,499",
    duration: "per month",
    features: ["Full Gym Access", "Dedicated Personal Trainer", "Custom Diet Plan", "All Group Classes", "All Facilities", "Priority Support", "Body Composition Analysis", "Guest Passes (2/month)"],
    popular: false,
  },
];

const Plans = () => (
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
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-xl p-8 border relative ${
                p.popular ? "border-primary neon-border bg-card" : "border-border/50 bg-card"
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
                <p className="text-muted-foreground text-sm mt-1">{p.duration}</p>
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
                  JOIN NOW <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Plans;
