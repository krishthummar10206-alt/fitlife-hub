import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const trainers = [
  { name: "Vikram Singh", exp: "12 Years", spec: "Strength & Conditioning", bio: "Former national-level powerlifter with a passion for helping clients break their limits." },
  { name: "Ananya Rao", exp: "8 Years", spec: "Yoga & Flexibility", bio: "Certified yoga instructor specializing in Vinyasa and therapeutic yoga practices." },
  { name: "Rajesh Kumar", exp: "10 Years", spec: "Weight Loss", bio: "Transformed 1000+ clients with his holistic approach to fitness and nutrition." },
  { name: "Sneha Kapoor", exp: "6 Years", spec: "CrossFit & HIIT", bio: "CrossFit Level 2 certified trainer who brings energy and motivation to every session." },
  { name: "Amit Joshi", exp: "15 Years", spec: "Bodybuilding", bio: "Multiple-time bodybuilding champion who mentors aspiring competitors and fitness enthusiasts." },
  { name: "Meera Nair", exp: "7 Years", spec: "Zumba & Dance Fitness", bio: "Licensed Zumba instructor who makes fitness fun through rhythm and dance." },
];

const Trainers = () => (
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border/50 overflow-hidden group hover:border-primary/40 transition-all"
            >
              {/* Avatar placeholder */}
              <div className="h-56 bg-secondary flex items-center justify-center">
                <span className="font-heading text-6xl text-primary/40">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-foreground">{t.name}</h3>
                <p className="text-primary text-sm font-medium mt-1">{t.spec}</p>
                <p className="text-muted-foreground text-xs mt-1">{t.exp} Experience</p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{t.bio}</p>
                <div className="flex gap-2 mt-4">
                  {[Instagram, Facebook, Twitter].map((Icon, j) => (
                    <a key={j} href="#" className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Trainers;
