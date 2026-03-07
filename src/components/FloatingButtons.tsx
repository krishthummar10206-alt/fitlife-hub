import { Phone, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="tel:+918238280606"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <Phone className="h-6 w-6 text-primary-foreground" />
      </a>

      {showScroll && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default FloatingButtons;
