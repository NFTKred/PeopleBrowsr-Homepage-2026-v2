import { motion } from "framer-motion";
import { Bot, User, Wallet, Wand2, TrendingUp, Filter, ShieldCheck, Image } from "lucide-react";

const agentPillars = [
  {
    icon: Wallet,
    title: "Sovereign Identity",
    description: "APIs for Wallet/Online identity and token memory via .Kred and ENS.",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    icon: TrendingUp,
    title: "Economic Simulations",
    description: "Empire.Kred environments for Agent-led memecoin and market testing.",
    gradient: "from-accent/20 to-primary/20",
  },
  {
    icon: ShieldCheck,
    title: "Reputation Scoring",
    description: "Quantifying AI trust and reliability to ensure safe Human-to-Agent interaction.",
    gradient: "from-primary/20 to-accent/20",
  },
];

const humanPillars = [
  {
    icon: Wand2,
    title: "Generative Expression",
    description: "AI-powered image creation, animation remixing, and style transfer.",
    gradient: "from-secondary/20 to-secondary/10",
  },
  {
    icon: Filter,
    title: "Curated Intelligence",
    description: "Custom AI feed optimization to filter the noise of the blockchain.",
    gradient: "from-secondary/10 to-secondary/20",
  },
  {
    icon: Image,
    title: "Social NFTs",
    description: "Tools to turn digital identity into liquid, remixable social assets.",
    gradient: "from-secondary/20 to-secondary/10",
  },
];

export const FourPillars = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-medium">
            The Platform
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-display">
            The Four Pillars
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Agent Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-semibold font-display text-foreground">
                  For AI
                </h4>
                <p className="text-sm text-muted-foreground">The Agentic Layer</p>
              </div>
            </div>

            <div className="space-y-4">
              {agentPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="group relative p-6 rounded-xl glass-card border-l-4 border-l-primary/50 hover:border-l-primary transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <pillar.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold font-display text-foreground mb-1">
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
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="text-xl font-semibold font-display text-foreground">
                  For People
                </h4>
                <p className="text-sm text-muted-foreground">The Creative Layer</p>
              </div>
            </div>

            <div className="space-y-4">
              {humanPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="group relative p-6 rounded-xl glass-card border-l-4 border-l-secondary/50 hover:border-l-secondary transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <pillar.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h5 className="font-semibold font-display text-foreground mb-1">
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
