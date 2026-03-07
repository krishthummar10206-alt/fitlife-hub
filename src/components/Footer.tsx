import { Link } from "react-router-dom";
import { Dumbbell, Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border/30">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Dumbbell className="h-7 w-7 text-primary" />
            <span className="font-heading text-2xl font-bold tracking-wider">IRON<span className="text-primary">FIT</span></span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Transform your body and mind at the best fitness center in the city. Join our community of fitness enthusiasts today.
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4 text-foreground">Quick Links</h4>
          {["About", "Services", "Trainers", "Gallery", "Plans", "Blog", "Transformations", "Contact"].map((l) => (
            <Link key={l} to={`/${l.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
              {l}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4 text-foreground">Services</h4>
          {["Weight Training", "Cardio Programs", "Personal Training", "Group Classes", "Diet Consultation", "CrossFit"].map((s) => (
            <p key={s} className="text-sm text-muted-foreground py-1.5">{s}</p>
          ))}
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4 text-foreground">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>123 Fitness Street, Downtown, Your City - 100001</span>
            </div>
            <a href="tel:+918238280606" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>+91 8238 280 606</span>
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>info@ironfit.com</span>
            </div>
          </div>
          <div className="mt-5">
            <h5 className="text-sm font-semibold text-foreground mb-2">Opening Hours</h5>
            <p className="text-sm text-muted-foreground">Mon - Sat: 5:00 AM - 10:00 PM</p>
            <p className="text-sm text-muted-foreground">Sunday: 6:00 AM - 12:00 PM</p>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-border/30 py-5">
      <p className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} IronFit. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
