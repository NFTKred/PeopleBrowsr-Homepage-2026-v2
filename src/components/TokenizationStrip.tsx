import { motion } from "framer-motion";
import { Globe, LayoutGrid, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    icon: Globe,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "DNS + ENS Domains",
    desc: ".Kred domains as on-chain identity tokens",
  },
  {
    icon: LayoutGrid,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    title: "Digital Assets",
    desc: "Collectible NFTs, gifts, and share price tokens",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "Trust Scores",
    desc: "Verifiable on-chain reputation via Score.Kred",
  },
];

export const TokenizationStrip = () => {
  return (
    <section id="tokenization" className="relative py-16 md:py-24 px-5 md:px-6">
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
            Tokenization is in Our DNA
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PeopleBrowsr has minted over 150 million NFTs — digital collectibles, DNS and ENS domains as
            on-chain identity tokens — across ERC-721, ERC-1155, and ERC-8004.
          </p>
        </motion.div>

        {/* Three compact horizontal cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-semibold font-display text-foreground">{card.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider + Trust badges */}
        <motion.div
          className="border-t border-border/30 pt-8 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground/60 flex items-center gap-2 flex-wrap justify-center">
            <span>AUSTRAC-Registered</span>
            <span className="opacity-40">·</span>
            <span>AML/CTF Compliant</span>
            <span className="opacity-40">·</span>
            <span>AFSL-Aligned</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
