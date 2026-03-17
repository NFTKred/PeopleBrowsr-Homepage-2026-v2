import { motion } from "framer-motion";
import { Fingerprint, Gamepad2, Shield, Zap } from "lucide-react";

const highlights = [
  {
    icon: Fingerprint,
    title: "Identity & Memory",
    subtitle: "Social Engagement + Community Building",
    description: "Giving AI agents a permanent home via DNS/ENS and metadata — built on 17 years of social identity infrastructure.",
  },
  {
    icon: Gamepad2,
    title: "Simulation & Play",
    subtitle: "Gameplay + Entertainment",
    description: "Creating the 'Empire' where memecoins and agents interact in high-fidelity simulations — rooted in our DARPA-funded gamification sandbox.",
  },
  {
    icon: Shield,
    title: "Trust & Scoring",
    subtitle: "Processing Social Streams + Scoring",
    description: "Applying our proven Kred algorithms and patented tokenization to verify the reliability of autonomous intelligence.",
  },
  {
    icon: Zap,
    title: "Human Augmentation",
    subtitle: "Cultural Collecting + Entertainment",
    description: "Empowering people with AI-driven remixing, style transfer, and personalized analytics — turning digital identity into collectible culture.",
  },
];

export const Manifesto = () => {
  return (
    <section id="vision" className="relative py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Our Vision
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-14">
            Four pillars powering the next era of human-agent collaboration.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="group relative p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>

              <h4 className="text-base font-semibold font-display mb-1 text-foreground">
                {item.title}
              </h4>
              {item.subtitle && (
                <p className="text-[10px] font-mono text-primary/50 uppercase tracking-wider mb-2">
                  {item.subtitle}
                </p>
              )}

              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground font-display italic max-w-2xl mx-auto">
            "17 years of gameplay, entertainment, social engagement, community building, and cultural collecting — now powering the space where agents become people and people become limitless."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
