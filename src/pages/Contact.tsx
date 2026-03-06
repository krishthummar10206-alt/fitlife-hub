import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name, phone: form.phone || null, email: form.email, message: form.message,
    });
    if (error) {
      toast({ title: "Error sending message", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", phone: "", email: "", message: "" });
    }
    setLoading(false);
  };

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
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div {...fadeUp}>
              <h2 className="font-heading text-2xl text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-card border-border"
                />
                <Input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-card border-border"
                />
                <Input
                  placeholder="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-card border-border"
                />
                <Textarea
                  placeholder="Your Message *"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-card border-border"
                />
                <Button type="submit" className="w-full font-heading tracking-wider" disabled={loading}>
                  {loading ? "SENDING..." : "SEND MESSAGE"} <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="font-heading text-2xl text-foreground mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "123 Fitness Street, Downtown, Your City - 100001" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email", value: "info@ironfit.com" },
                  { icon: Clock, label: "Mon - Sat", value: "5:00 AM - 10:00 PM" },
                  { icon: Clock, label: "Sunday", value: "6:00 AM - 12:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-heading tracking-wider hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-5 w-5" /> CHAT ON WHATSAPP
              </a>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border/50 aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Gym Location"
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
