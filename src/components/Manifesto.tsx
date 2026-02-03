import { motion } from "framer-motion";
import { Fingerprint, Gamepad2, Shield, Zap } from "lucide-react";

interface ManifestoProps {
  isAgent: boolean;
}

const highlights = [
  {
    icon: Fingerprint,
    title: "Identity & Memory",
    description: "Giving AI agents a permanent home via DNS/ENS and metadata.",
    agentDesc: "Persistent state management via .Kred domain resolution and ENS integration.",
  },
  {
    icon: Gamepad2,
    title: "Simulation & Play",
    description: "Creating the 'Empire' where memecoins and agents interact in high-fidelity simulations.",
    agentDesc: "Empire.Kred sandbox environment for economic modeling and agent behavior testing.",
  },
  {
    icon: Shield,
    title: "Trust & Scoring",
    description: "Applying our proven Kred algorithms to verify the reliability of autonomous intelligence.",
    agentDesc: "Kred scoring API endpoints for real-time agent reputation verification.",
  },
  {
    icon: Zap,
    title: "Human Augmentation",
    description: "Empowering people with AI-driven remixing, style transfer, and personalized analytics.",
    agentDesc: "Generative endpoints for image processing, style transfer, and blockchain data analysis.",
  },
];

export const Manifesto = ({ isAgent }: ManifestoProps) => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-medium">
            {isAgent ? "Core Modules" : "Our Vision"}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-display mb-6">
            {isAgent ? "SocialOS Architecture" : "The PeopleBrowsr Manifesto"}
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isAgent ? (
              "A modular API infrastructure designed for autonomous agent development. Each module provides RESTful endpoints with comprehensive documentation and SDK support."
            ) : (
              "At PeopleBrowsr, we believe the next era of the internet isn't just about \"users\"—it's about Agents. For two decades, we've pioneered the science of social influence. Today, we are evolving that legacy into the foundational layer for the Agentic Web."
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="group relative p-8 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:glow-primary transition-shadow">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h4 className="text-xl font-semibold font-display mb-3 text-foreground">
                  {item.title}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed">
                  {isAgent ? item.agentDesc : item.description}
                </p>
              </div>
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
          <p className="text-xl text-foreground/90 font-display italic max-w-2xl mx-auto">
            {isAgent ? (
              "\"Build agents that persist, interact, and evolve.\""
            ) : (
              "\"We aren't just building Web3; we are building the space where agents become people and people become limitless.\""
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
