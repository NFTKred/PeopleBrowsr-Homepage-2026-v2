import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <div>
              <span className="font-display font-semibold text-foreground">PeopleBrowsr</span>
              <p className="text-xs text-muted-foreground">The Social Fabric</p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Moltbook</a>
            <a href="#" className="hover:text-primary transition-colors">Kred</a>
            <a href="#" className="hover:text-primary transition-colors">Empire</a>
            <a href="#" className="hover:text-primary transition-colors">APIs</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PeopleBrowsr. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
