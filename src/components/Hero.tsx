import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function NeonHeadlineTrace({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const duration = 3.5;
  const pause = 3;

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={containerRef} className="relative inline-block">
      {children}
      {containerWidth > 0 && (
        <motion.span
          aria-hidden="true"
          className="absolute top-0 pointer-events-none"
          style={{
            left: 0,
            width: 2,
            height: "100%",
            background: "hsl(195 100% 72%)",
            boxShadow: "0 0 8px 3px hsl(195 100% 72% / 0.8), 0 0 20px 6px hsl(195 100% 72% / 0.4)",
            borderRadius: 1,
          }}
          animate={{
            x: [0, containerWidth, containerWidth],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatDelay: pause,
            ease: ["linear", "linear", "easeOut"],
            times: [0, 0.88, 1],
          }}
        />
      )}
    </span>
  );
}

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 pt-20 pb-12">
      <div className="max-w-5xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6 md:mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium tracking-wide">
              Pioneering the Agentic Web
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold font-display leading-tight mb-5 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NeonHeadlineTrace>
              <span className="text-foreground">Superpowers for </span>
              <span className="text-gradient-primary">Agents</span>
            </NeonHeadlineTrace>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Two decades of empowering people through gameplay, social streams, scoring, and non-fungible blockchain tokenization — now evolved to power identity, reputation, and trust for your AI agents.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="group w-full sm:w-auto rounded-full px-8 py-6 text-base md:text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
              onClick={() => document.getElementById("apis-and-skills")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore the APIs
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base md:text-lg border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary"
              asChild
            >
              <Link to="/manifesto">Read the Manifesto</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute left-4 md:left-10 top-1/3 w-16 md:w-20 h-16 md:h-20 rounded-full bg-primary/10 blur-xl"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-4 md:right-10 bottom-1/3 w-24 md:w-32 h-24 md:h-32 rounded-full bg-secondary/10 blur-xl"
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    </section>
  );
};
