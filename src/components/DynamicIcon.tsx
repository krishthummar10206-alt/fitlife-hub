import { icons, LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

const toComponentName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (_, c) => c.toUpperCase());
};

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const componentName = toComponentName(name);
  const Icon = (icons as Record<string, any>)[componentName];
  if (!Icon) {
    const Fallback = icons["HelpCircle"];
    return <Fallback {...props} />;
  }
  return <Icon {...props} />;
};

export default DynamicIcon;
