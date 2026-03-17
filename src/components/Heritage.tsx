import { motion } from "framer-motion";
import { Shield, FlaskConical, FileCheck, Gamepad2, Radio } from "lucide-react";

const credentials = [
  {
    icon: Radio,
    label: "17 Years",
    detail: "Gameplay, entertainment, social engagement, community building & cultural collecting",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: FlaskConical,
    label: "DARPA CLIQR",
    detail: "Gamification social sandbox built for the U.S. Department of Defense (2013)",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: FileCheck,
    label: "Two U.S. Patents",
    detail: "Nos. 11,301,460 & 12,038,911 — Actionable Non-Fungible Tokens (KNFT) with social vectors",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const coreTech = [
  { label: "Processing Social Streams", icon: "📡" },
  { label: "Scoring", icon: "📊" },
  { label: "Non-Fungible Blockchain Tokenization", icon: "🔗" },
];

export const Heritage = () => {
  return (
    <section className="relative py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Built on 17 Years of Proof
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The Platform design leverages PeopleBrowsr's 17-year history of building applications for
            gameplay, entertainment, social engagement, community building, and cultural collecting —
            powered by deep skills and patents in three core technologies.
          </p>
        </motion.div>

        {/* Credential cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.label}
              className="flex items-start gap-4 p-5 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className={`w-10 h-10 rounded-lg ${cred.bg} flex items-center justify-center flex-shrink-0`}>
                <cred.icon className={`w-5 h-5 ${cred.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold font-display text-foreground">{cred.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{cred.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core technologies strip */}
        <motion.div
          className="border-t border-border/30 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[10px] font-mono text-primary/50 uppercase tracking-widest text-center mb-4">
            Core Technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {coreTech.map((tech, i) => (
              <div key={tech.label} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="hidden md:inline text-muted-foreground/20 text-lg">|</span>
                )}
                <span className="text-sm text-muted-foreground font-medium">
                  {tech.icon} {tech.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
