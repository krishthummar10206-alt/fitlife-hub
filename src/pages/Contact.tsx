import { motion } from "framer-motion";
import { MapPin, Phone, Clock, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Contact = () => {
  return (
    <div>
      <section className="relative py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">Get In Touch</p>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Contact <span className="text-primary">Us</span></h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          {/* Call Button */}
          <motion.div {...fadeUp} className="text-center mb-16">
            <a href="tel:+918238280606">
              <Button size="lg" className="font-heading tracking-wider text-xl px-12 py-8 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                <PhoneCall className="mr-3 h-7 w-7" /> CALL NOW
              </Button>
            </a>
            <p className="text-muted-foreground mt-4 text-lg font-heading">+91 8238 280 606</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div {...fadeUp} className="space-y-6">
              <h2 className="font-heading text-2xl text-foreground mb-6">Contact Information</h2>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+918238280606" className="text-foreground hover:text-primary transition-colors text-lg">
                    +91 8238 280 606
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-foreground text-lg">123 Fitness Street, Downtown, Your City - 100001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Opening Hours</p>
                  <p className="text-foreground">Mon - Sat: 5:00 AM - 10:00 PM</p>
                  <p className="text-foreground">Sunday: 6:00 AM - 12:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="rounded-xl overflow-hidden border border-border/50 aspect-video h-full min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="IronFit Gym Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
