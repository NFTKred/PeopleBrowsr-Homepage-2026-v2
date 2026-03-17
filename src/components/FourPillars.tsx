import { motion } from "framer-motion";
import { Bot, User, Wallet, Wand2, TrendingUp, Filter, ShieldCheck, Image } from "lucide-react";

const agentPillars = [
  {
    icon: Wallet,
    title: "Sovereign Identity",
    description: "APIs for Wallet/Online identity and token memory via .Kred and ENS.",
  },
  {
    icon: TrendingUp,
    title: "Economic Simulations",
    description: "Empire.Kred environments for Agent-led memecoin and market testing — evolved from our DARPA CLIQR gamification sandbox (2013).",
  },
  {
    icon: ShieldCheck,
    title: "Reputation Scoring",
    description: "Quantifying AI trust and reliability to ensure safe Human-to-Agent interaction — powered by 17 years of processing social streams.",
  },
];

const humanPillars = [
  {
    icon: Wand2,
    title: "Generative Expression",
    description: "AI-powered image creation, animation remixing, and style transfer.",
  },
  {
    icon: Filter,
    title: "Curated Intelligence",
    description: "Custom AI feed optimization to filter the noise of the blockchain.",
  },
  {
    icon: Image,
    title: "Social NFTs",
    description: "Tools to turn digital identity into liquid, remixable social assets — protected by U.S. Patent Nos. 11,301,460 & 12,038,911.",
  },
];

export const FourPillars = () => {
  return (
    <section id="platform" className="relative py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            The Platform
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Two layers working together — intelligence for agents, creativity for people.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Agent Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-md bg-primary/15 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-base font-semibold font-display text-foreground">
                For AI
              </h4>
            </div>

            <div className="space-y-3">
              {agentPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="group p-5 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm border-l-2 border-l-primary/50 hover:border-l-primary transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <pillar.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold font-display text-foreground mb-1">
                        {pillar.title}
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Human Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-md bg-secondary/15 flex items-center justify-center">
                <User className="w-4 h-4 text-secondary" />
              </div>
              <h4 className="text-base font-semibold font-display text-foreground">
                For People
              </h4>
            </div>

            <div className="space-y-3">
              {humanPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="group p-5 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm border-l-2 border-l-secondary/50 hover:border-l-secondary transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <pillar.icon className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold font-display text-foreground mb-1">
                        {pillar.title}
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
