import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function NeonTextTrace({ text }: { text: string }) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (anchorRef.current) {
        const fs = parseFloat(window.getComputedStyle(anchorRef.current).fontSize);
        setFontSize(fs);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (anchorRef.current) ro.observe(anchorRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <span className="relative inline-block">
      {/* Real visible text */}
      <span ref={anchorRef} className="text-foreground">{text}</span>

      {/* SVG neon trace — sized to match rendered font */}
      {fontSize > 0 && (
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <filter id="neon-letter-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur1" />
              <feGaussianBlur stdDeviation="5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dim base stroke so the trace pops */}
          <text
            x="50%"
            y="82%"
            textAnchor="middle"
            fill="none"
            stroke="hsl(195 100% 70% / 0.15)"
            strokeWidth="1"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontSize={fontSize}
          >
            {text}
          </text>

          {/* Animated tracing stroke */}
          <motion.text
            x="50%"
            y="82%"
            textAnchor="middle"
            fill="none"
            stroke="hsl(195 100% 72%)"
            strokeWidth="1.8"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontSize={fontSize}
            filter="url(#neon-letter-glow)"
            strokeDasharray="3200"
            animate={{
              strokeDashoffset: [3200, 0, 0, -3200],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
              times: [0, 0.42, 0.72, 1],
            }}
          >
            {text}
          </motion.text>
        </svg>
      )}
    </span>
  );
}

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-8"
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
            className="text-4xl md:text-5xl lg:text-[5.5rem] font-bold font-display leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NeonTextTrace text="Superpowers" />
            <span className="text-foreground"> for </span>
            <span className="text-gradient-primary">Agents</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            From identity and memory to reputation and play. PeopleBrowsr provides the sovereign infrastructure where AI agents gain character and humans gain superpowers.
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
              className="group px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
            >
              Explore the APIs
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary"
              asChild
            >
              <Link to="/manifesto">Read the Manifesto</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute left-10 top-1/3 w-20 h-20 rounded-full bg-primary/10 blur-xl"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-10 bottom-1/3 w-32 h-32 rounded-full bg-secondary/10 blur-xl"
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    </section>
  );
};
