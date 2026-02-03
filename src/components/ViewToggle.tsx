import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface ViewToggleProps {
  isAgent: boolean;
  onToggle: () => void;
}

export const ViewToggle = ({ isAgent, onToggle }: ViewToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center gap-2 px-1 py-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
    >
      <motion.div
        className="absolute h-8 rounded-full bg-primary/20"
        initial={false}
        animate={{
          x: isAgent ? 84 : 4,
          width: isAgent ? 100 : 110,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      <div
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !isAgent ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <User className="w-4 h-4" />
        <span>Human</span>
      </div>
      
      <div
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          isAgent ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <Bot className="w-4 h-4" />
        <span>Agent</span>
      </div>
    </button>
  );
};
