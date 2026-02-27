import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/30">
      {/* CTA section */}
      <div className="py-20 px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
            Start building with PeopleBrowsr
          </h2>
          <p className="text-muted-foreground mb-8">
            Get your API key, explore the spec, and ship your first agent in under 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
              Get Free API Key
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground">
              Full Build Guide
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">P</span>
            </div>
            <span className="font-display text-sm font-semibold text-foreground">
              PeopleBrowsr
            </span>
          </div>


          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PeopleBrowsr
          </p>
        </div>
      </div>
    </footer>
  );
};
