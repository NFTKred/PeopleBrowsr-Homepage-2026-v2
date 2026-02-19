import { motion } from "framer-motion";

const puzzlePieces = [
  {
    number: 1,
    name: "AgenticID.Kred",
    title: "Identity",
    description: "Your Web3 identity — domain token metadata with on-chain memory.",
    icon: "🌐",
    accent: "180 60% 50%",
  },
  {
    number: 2,
    name: "Link.Kred",
    title: "Profile Hub",
    description: "Your profile hub — link-in-bio meets Web3.",
    icon: "🔗",
    accent: "195 80% 45%",
  },
  {
    number: 3,
    name: "Score.Kred",
    title: "Trust",
    description: "See who to trust — reputation scores for agents and humans.",
    icon: "🏅",
    accent: "220 70% 55%",
  },
  {
    number: 4,
    name: "AgenticEmpire.Kred",
    title: "Sim Game",
    description: "Play and prove — agentic economic simulation with 200K+ players.",
    icon: "👑",
    accent: "38 92% 60%",
  },
  {
    number: 5,
    name: "SocialOS.io",
    title: "Social Layer",
    description: "Your social layer — feeds, forums, communities.",
    icon: "💬",
    accent: "50 90% 55%",
  },
  {
    number: 6,
    name: "Matrix.Kred",
    title: "Feeds",
    description: "Node network feeds — curated, AI-filtered activity streams.",
    icon: "⚡",
    accent: "260 50% 55%",
  },
  {
    number: 7,
    name: "OneHub.Kred",
    title: "Create & Collect",
    description: "Create and collect — virtual asset platform for communities.",
    icon: "⚙️",
    accent: "330 60% 55%",
  },
  {
    number: 8,
    name: "AgenticGiving",
    title: "Gift Studio mini App",
    description: "Gift Studio — specialized gifting experience for brands.",
    icon: "🎁",
    accent: "280 55% 55%",
  },
  {
    number: 9,
    name: "NFT.NYC",
    title: "HUMANS ONLY",
    description: "The gathering — live human event experience on stage.",
    icon: "🎤",
    accent: "210 60% 50%",
  },
];

const PuzzlePiece = ({
  piece,
  index,
}: {
  piece: (typeof puzzlePieces)[0];
  index: number;
}) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  // Determine which edges have connectors (tab out) vs slots (tab in)
  const hasRight = col < 2;
  const hasBottom = row < 2;
  const hasLeft = col > 0;
  const hasTop = row > 0;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        className="relative rounded-2xl p-5 md:p-6 h-full border border-border/40 backdrop-blur-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:border-border/80 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(${piece.accent} / 0.12) 0%, hsl(var(--card)) 70%)`,
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, hsl(${piece.accent} / 0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Connector indicators */}
        {hasRight && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-8 rounded-full z-10"
            style={{ background: `hsl(${piece.accent} / 0.3)` }}
          />
        )}
        {hasBottom && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-4 rounded-full z-10"
            style={{ background: `hsl(${piece.accent} / 0.3)` }}
          />
        )}
        {hasLeft && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-8 rounded-full z-10"
            style={{ background: `hsl(${piece.accent} / 0.25)` }}
          />
        )}
        {hasTop && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 rounded-full z-10"
            style={{ background: `hsl(${piece.accent} / 0.25)` }}
          />
        )}

        {/* Content */}
        <div className="relative z-20">
          <div className="flex items-start justify-between mb-3">
            <span
              className="text-xs font-mono font-medium px-2 py-0.5 rounded-full"
              style={{
                background: `hsl(${piece.accent} / 0.15)`,
                color: `hsl(${piece.accent})`,
              }}
            >
              {piece.number}
            </span>
            <span className="text-xl">{piece.icon}</span>
          </div>

          <h4
            className="text-base md:text-lg font-bold font-display mb-1"
            style={{ color: `hsl(${piece.accent})` }}
          >
            {piece.name}
          </h4>
          <p
            className="text-xs uppercase tracking-wider font-semibold mb-2"
            style={{ color: `hsl(${piece.accent} / 0.7)` }}
          >
            {piece.title}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {piece.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const EcosystemMap = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-medium">
            The Ecosystem
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-display mb-4">
            The Kred Puzzle
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nine interlocking products that form the complete infrastructure for
            the Agentic Web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {puzzlePieces.map((piece, index) => (
            <PuzzlePiece key={piece.number} piece={piece} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
