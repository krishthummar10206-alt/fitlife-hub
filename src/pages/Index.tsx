import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SectionHeading from "@/components/SectionHeading";
import DynamicIcon from "@/components/DynamicIcon";
import heroImg from "@/assets/hero-gym.jpg";
import { Check, ArrowRight, ChevronRight, Star, Phone, Send } from "lucide-react";
import { toast } from "sonner";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const fallbackServices = [
  { id: "1", name: "Weight Training", description: "Build strength with our state-of-the-art equipment and expert guidance.", icon_name: "dumbbell" },
  { id: "2", name: "Cardio Training", description: "Boost your endurance with high-intensity cardio programs.", icon_name: "heart" },
  { id: "3", name: "Personal Training", description: "One-on-one sessions tailored to your specific fitness goals.", icon_name: "user-check" },
  { id: "4", name: "Zumba / Yoga", description: "Find your balance through energizing dance and mindful yoga.", icon_name: "activity" },
  { id: "5", name: "CrossFit", description: "Push your limits with functional training and competitive workouts.", icon_name: "flame" },
];

const fallbackBenefits = [
  { icon_name: "shield", text: "Certified Trainers" },
  { icon_name: "dumbbell", text: "Modern Equipment" },
  { icon_name: "target", text: "Affordable Plans" },
  { icon_name: "zap", text: "Clean & Hygienic" },
  { icon_name: "users", text: "Friendly Community" },
  { icon_name: "clock", text: "Flexible Timings" },
];

const Index = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const { data: services } = useQuery({
    queryKey: ["public-services"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").eq("is_active", true).order("display_order").limit(6);
      return data && data.length > 0 ? data : null;
    },
  });

  const { data: plans = [] } = useQuery({
    queryKey: ["public-plans"],
    queryFn: async () => {
      const { data } = await supabase.from("plans").select("*").eq("is_active", true).order("display_order");
      return data ?? [];
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["public-reviews"],
    queryFn: async () => {
      const { data } = await supabase.from("reviews").select("*").eq("is_approved", true).order("created_at", { ascending: false }).limit(6);
      return data ?? [];
    },
  });

  const { data: statistics } = useQuery({
    queryKey: ["public-statistics"],
    queryFn: async () => {
      const { data } = await supabase.from("statistics").select("*").eq("is_active", true).order("display_order");
      return data && data.length > 0 ? data : null;
    },
  });

  const displayServices = services ?? fallbackServices;

  const fallbackStats = [
    { value: "10+", title: "Years Experience" },
    { value: "50+", title: "Expert Trainers" },
    { value: "5K+", title: "Happy Members" },
    { value: "15+", title: "Programs" },
  ];
  const displayStats = statistics ?? fallbackStats;

  const submitReview = async () => {
    if (!reviewForm.name || !reviewForm.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: reviewForm.name,
      rating: reviewForm.rating,
      message: reviewForm.message,
    });
    if (error) {
      toast.error("Error submitting review");
    } else {
      toast.success("Thank you! Your review will appear after approval.");
      setReviewForm({ name: "", rating: 5, message: "" });
      setReviewOpen(false);
    }
    setSubmitting(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="IronFit gym workout" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
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
              <a href="tel:+918238280606">
                <Button size="lg" variant="outline" className="font-heading tracking-wider text-base px-8 border-primary/50 text-primary hover:bg-primary/10">
                  <Phone className="mr-2 h-5 w-5" /> CALL NOW
                </Button>
              </a>
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
                {displayStats.map((s: any, i: number) => (
                  <div key={i} className="bg-card rounded-lg p-6 text-center neon-border">
                    <p className="font-heading text-4xl text-primary">{s.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading title="Our Services" subtitle="Everything you need to reach your fitness goals under one roof." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((s: any, i: number) => (
              <motion.div key={s.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-lg p-6 border border-border/50 hover:border-primary/40 transition-all group">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <DynamicIcon name={s.icon_name} className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">{s.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
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
            {fallbackBenefits.map((b, i) => (
              <motion.div key={b.text} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-card rounded-lg p-5 border border-border/50 hover:border-primary/30 transition-all">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <DynamicIcon name={b.icon_name} className="h-5 w-5 text-primary" />
                </div>
                <span className="font-heading text-lg text-foreground">{b.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading title="What Our Members Say" subtitle="Real stories from real transformations." />
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reviews.map((r: any, i: number) => (
                <motion.div key={r.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-background rounded-lg p-6 border border-border/50">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className={`h-4 w-4 ${si < r.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm italic leading-relaxed mb-4">"{r.message}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-heading text-primary text-sm">{r.name.charAt(0)}</span>
                    </div>
                    <span className="font-semibold text-sm text-foreground">{r.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          )}
          <div className="text-center mt-10">
            <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
              <DialogTrigger asChild>
                <Button className="font-heading tracking-wider">
                  <Send className="mr-2 h-4 w-4" /> WRITE A REVIEW
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Share Your Experience</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Your Name *" value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setReviewForm({ ...reviewForm, rating: n })}>
                        <Star className={`h-6 w-6 ${n <= reviewForm.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                      </button>
                    ))}
                  </div>
                  <Textarea placeholder="Your experience *" rows={4} value={reviewForm.message}
                    onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })} />
                  <Button className="w-full font-heading tracking-wider" onClick={submitReview} disabled={submitting}>
                    {submitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading title="Membership Plans" subtitle="Choose the plan that fits your fitness journey." />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                  <span className="text-muted-foreground">/{p.duration}</span>
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
                    JOIN NOW
                  </Button>
                </a>
              </motion.div>
            ))}
            {plans.length === 0 && (
              <p className="col-span-3 text-center text-muted-foreground">Plans coming soon!</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
