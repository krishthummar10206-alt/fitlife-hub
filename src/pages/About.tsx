import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import gymInterior from "@/assets/gym-interior.jpg";
import { Target, Eye, Award, Clock } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const About = () => (
  <div>
    {/* Hero */}
    <section className="relative py-32 bg-card">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">Our Story</p>
          <h1 className="font-heading text-5xl md:text-6xl text-foreground">About <span className="text-primary">IronFit</span></h1>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <img src={gymInterior} alt="Gym interior" className="rounded-xl w-full object-cover aspect-square" />
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Where Fitness Meets <span className="text-primary">Passion</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2014, IronFit was born from a simple belief — that everyone deserves access to world-class fitness facilities and expert guidance, regardless of their fitness level.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Over the past decade, we've grown from a small neighborhood gym to one of the city's most trusted fitness centers, transforming over 5,000 lives along the way.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of 50+ certified trainers brings decades of combined experience in strength training, nutrition, physiotherapy, and sports science. We don't just build bodies — we build confidence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission / Vision */}
    <section className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Target, title: "Our Mission", text: "To empower individuals of all fitness levels with the tools, knowledge, and support to achieve their health and fitness goals in a welcoming environment." },
            { icon: Eye, title: "Our Vision", text: "To become the most trusted fitness brand in the country, inspiring millions to embrace a healthy, active lifestyle through innovation and community." },
          ].map((item, i) => (
            <motion.div key={item.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-background rounded-xl p-8 border border-border/50">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Clock, num: "10+", label: "Years of Experience" },
            { icon: Award, num: "50+", label: "Certified Trainers" },
            { icon: Target, num: "5K+", label: "Transformations" },
            { icon: Eye, num: "15+", label: "Fitness Programs" },
          ].map((s, i) => (
            <motion.div key={s.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center bg-card rounded-lg p-6 border border-border/50">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-heading text-3xl text-primary">{s.num}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
