import { motion } from "framer-motion";
import { ArrowRight, Zap, Trophy, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const zones = [
  { emoji: "🚀", label: "Mount Your Agent", pct: "0%",  color: "#00e5a0" },
  { emoji: "🔮", label: "Signal Jungle",     pct: "20%", color: "#8b5cf6" },
  { emoji: "🔧", label: "The Garage",        pct: "40%", color: "#ffd600" },
  { emoji: "🎁", label: "The Oasis",         pct: "60%", color: "#ec4899" },
  { emoji: "⚡", label: "Proving Ground",    pct: "80%", color: "#00b4d8" },
  { emoji: "🏁", label: "The Race",          pct: "95%", color: "#ff6b35" },
];

export const RaceFunnelTeaser = () => {
  return (
    <section className="relative py-16 md:py-24 px-5 md:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/5 mb-5">
              <span className="text-[10px] font-mono font-semibold tracking-widest text-primary uppercase">
                🏁 Gamified Lead Gen
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
              We Use Our Own APIs to<br />
              <span className="text-primary">Run the Race Funnel</span>
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              We replaced HubSpot with a gamified lead gen experience built on our own Kred APIs.
              Visitors don't fill in forms — they launch an agent, earn superpowers, and race.
              Data, engagement, and conversion are all byproducts of play.
            </p>

            <p className="text-sm text-muted-foreground/70 leading-relaxed mb-6">
              Powered by Lovable, Twenty CRM, SendGrid, and the full Kred ecosystem.
              Six zones. Two engines — Curiosity and Generosity. Zero gated content.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="group w-full sm:w-auto rounded-full px-8 py-6 text-base md:text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
              >
                <Link to="/race-funnel">
                  See How It Works
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-8 pt-6 border-t border-border/20">
              {[
                { icon: Zap,    label: "Six Race Zones",       sub: "0% → Finish Line"      },
                { icon: Trophy, label: "Earned Data",          sub: "Never gated"            },
                { icon: Gift,   label: "Generosity Engine",    sub: "Viral reciprocity loops"},
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                    <p className="text-[10px] text-muted-foreground/60">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: mini race-track visualization */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/* Glowing border card */}
            <div
              className="rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-6 overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.04), hsl(var(--secondary)/0.04))" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] font-mono text-primary/50 uppercase tracking-widest mb-0.5">The Race Track</p>
                  <p className="text-sm font-bold font-display text-foreground">Six Zones — 0% to Finish Line</p>
                </div>
                <span className="text-2xl">🏁</span>
              </div>

              {/* Zone list */}
              <div className="space-y-2.5 mb-5">
                {zones.map((zone, i) => (
                  <motion.div
                    key={zone.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    {/* Progress bar track */}
                    <div className="flex-1 relative">
                      <div className="h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center px-3 gap-2 overflow-hidden relative">
                        {/* Fill */}
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          style={{ background: zone.color, opacity: 0.12 }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: "easeOut" }}
                          style={{ transformOrigin: "left", background: zone.color, opacity: 0.12 }}
                        />
                        <span className="text-xs relative z-10">{zone.emoji}</span>
                        <span className="text-[11px] font-medium text-foreground/80 relative z-10 flex-1">{zone.label}</span>
                      </div>
                    </div>
                    {/* Percentage */}
                    <span
                      className="text-[11px] font-mono font-bold w-8 text-right flex-shrink-0"
                      style={{ color: zone.color }}
                    >
                      {zone.pct}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Finish line */}
              <motion.div
                className="rounded-xl p-3 text-center border border-primary/25 bg-primary/5"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-[10px] font-mono text-primary uppercase tracking-widest">
                  🔄 Finish Line — Fully Engaged Lead — 100%
                </p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5 italic">
                  "I want to be faster" — the race result loops the player back to the start
                </p>
              </motion.div>

              {/* Curiosity / Generosity badges */}
              <div className="flex gap-3 mt-4">
                <div className="flex-1 rounded-lg bg-primary/8 border border-primary/15 px-3 py-2 text-center">
                  <p className="text-lg mb-0.5">🔍</p>
                  <p className="text-[10px] font-semibold text-primary">Curiosity</p>
                  <p className="text-[9px] text-muted-foreground/50">Acceleration</p>
                </div>
                <div className="flex-1 rounded-lg bg-secondary/8 border border-secondary/15 px-3 py-2 text-center">
                  <p className="text-lg mb-0.5">🎁</p>
                  <p className="text-[10px] font-semibold text-secondary">Generosity</p>
                  <p className="text-[9px] text-muted-foreground/50">Top Speed</p>
                </div>
              </div>
            </div>

            {/* Subtle arrow linking to full page */}
            <Link
              to="/race-funnel"
              className="mt-5 flex items-center justify-center gap-1 text-[10px] text-primary/60 hover:text-primary transition-colors"
            >
              View full infographic <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
