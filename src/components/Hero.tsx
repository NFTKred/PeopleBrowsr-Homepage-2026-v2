import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function NeonTextTrace({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [fontSize, setFontSize] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [letterPositions, setLetterPositions] = useState<{ x: number; y: number }[]>([]);

  const letters = text.split("");
  const perLetter = 3; // seconds each letter takes to trace
  const letterDelay = 0.1; // seconds between each letter starting
  const pause = 3;     // seconds gap before the cycle repeats
  const n = letters.length;
  const repeatDelay = (n - 1) * letterDelay + perLetter + pause;

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const fs = parseFloat(window.getComputedStyle(containerRef.current).fontSize);
      setFontSize(fs);
      setContainerSize({ width: containerRect.width, height: containerRect.height });
      const positions = letterRefs.current.map((ref) => {
        if (!ref) return { x: 0, y: fs * 0.85 };
        const r = ref.getBoundingClientRect();
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: fs * 0.85,
        };
      });
      setLetterPositions(positions);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [text]);

  return (
    <span ref={containerRef} className="relative inline-block">
      {/* Real visible text — each letter gets a ref for position measurement */}
      <span className="text-foreground">
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => { letterRefs.current[i] = el; }}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </span>

      {/* SVG neon overlay — one animated text per letter */}
      {fontSize > 0 && letterPositions.length === n && (
        <svg
          className="absolute inset-0 overflow-visible pointer-events-none"
          style={{ width: containerSize.width, height: containerSize.height }}
          aria-hidden="true"
        >
          <defs>
            <filter id="neon-letter-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur1" />
              <feGaussianBlur stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dim ghost strokes so you can see the outline before the trace hits */}
          {letters.map((char, i) => (
            <text
              key={`ghost-${i}`}
              x={letterPositions[i]?.x}
              y={letterPositions[i]?.y}
              textAnchor="middle"
              fill="none"
              stroke="hsl(195 100% 70% / 0.12)"
              strokeWidth="1"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize={fontSize}
            >
              {char}
            </text>
          ))}

          {/* Animated tracing stroke — staggered per letter */}
          {letters.map((char, i) => (
            <motion.text
              key={`trace-${i}`}
              x={letterPositions[i]?.x}
              y={letterPositions[i]?.y}
              textAnchor="middle"
              fill="none"
              stroke="hsl(195 100% 72%)"
              strokeWidth="2"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize={fontSize}
              filter="url(#neon-letter-glow)"
              strokeDasharray="600"
              animate={{
                strokeDashoffset: [600, 0, 0, -600],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: perLetter,
                delay: i * letterDelay,
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
                times: [0, 0.38, 0.68, 1],
              }}
            >
              {char}
            </motion.text>
          ))}
        </svg>
      )}

      {/* Vertical bar sweeping left → right, timed with the neon glow */}
      {fontSize > 0 && containerSize.width > 0 && (
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
            x: [0, containerSize.width, containerSize.width],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: (n - 1) * letterDelay + perLetter,
            delay: 0,
            repeat: Infinity,
            repeatDelay,
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
            PeopleBrowsr's battle-proven identity, scoring, social and digital asset infrastructure is now available for your AI Agent.
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
