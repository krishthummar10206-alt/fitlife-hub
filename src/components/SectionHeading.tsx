import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeading = ({ title, subtitle, center = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    )}
    <div className={`h-1 w-16 bg-primary mt-4 rounded-full ${center ? "mx-auto" : ""}`} />
  </motion.div>
);

export default SectionHeading;
