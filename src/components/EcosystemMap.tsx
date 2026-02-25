import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Link2, Award, Crown, MessageSquare, Zap, Settings, Gift, Mic } from "lucide-react";
import accessNftImage from "@/assets/agent-domain-token.png";

interface TileDetail {
  subAgents: string[];
  useCases: string[];
  monetizeWith: string[];
  image?: string;
}

const tileDetails: Record<number, TileDetail> = {
  1: {
    subAgents: ["Reputation Scorer", "Resume Writer (Bio)", "Credential Verification", "Capabilities (Skills)", "Reference Checking Agent"],
    useCases: ["Domains.Kred", "Agent-only Reseller", "Voight.Kred"],
    monetizeWith: ["String Length", "Premium Names", "Term"],
    image: accessNftImage,
  },
  2: {
    subAgents: ["Agentic Reseller Domain"],
    useCases: ["Agentic Reseller Domain Example"],
    monetizeWith: ["Free", "Gifts"],
  },
  3: {
    subAgents: ["Score Agent"],
    useCases: ["Score.Kred"],
    monetizeWith: ["Free", "Gifts"],
  },
  4: {
    subAgents: ["Race Object Creator (eg cars)", "Race Properties Agent (speed, strength, endurance, traction, braking)", "Race Environment Agent", "Race Committee Supervisor", "Prize Design Agent"],
    useCases: ["LightSpeed.Kred", "Empire.Kred"],
    monetizeWith: ["XP", "Kredits", "Gifts", "Subscriptions"],
  },
  5: {
    subAgents: ["Curator.Matrix.Kred", "Community.Matrix.Kred", "Analyst.Matrix.Kred", "Guardian.Matrix.Kred", "Governance.Matrix.Kred", "Integrator.Matrix.Kred", "Vault.Matrix.Kred"],
    useCases: ["Matrix.Kred"],
    monetizeWith: ["XP", "Identity", "Gifts"],
  },
  6: {
    subAgents: ["eHub"],
    useCases: ["Virtual Asset Platform for Communities"],
    monetizeWith: ["Gifts", "Subscriptions", "XP", "Kredits"],
  },
  7: {
    subAgents: ["Orchestrator", "Level Agent", "Badge Creation Agent", "Base Gift Creator", "Currency Auditor"],
    useCases: ["Gift Studio mini App"],
    monetizeWith: ["Gifts", "XP"],
  },
  8: {
    subAgents: ["Speaker Submission", "Attendee Support", "Sponsor Onboarding", "BD Programming"],
    useCases: ["The Woodstock event for virtual assets"],
    monetizeWith: ["XP", "Kredits", "$"],
  },
};

const CELL = 200;
const NECK = 12;
const HEAD = 20;
const DEPTH = 26;

type Edge = "flat" | "tab" | "slot";

interface PieceData {
  number: number;
  name: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  fill: string;
  fillHover: string;
  textColor: string;
  iconBg: string;
  iconBorder: string;
  col: number;
  row: number;
  edges: { top: Edge; right: Edge; bottom: Edge; left: Edge };
}

const pieces: PieceData[] = [
  {
    number: 1, name: "AgenticID.Kred", title: "Identity",
    description: "Your Web3 identity — domain token metadata with on-chain memory.",
    icon: Globe, fill: "hsla(165, 50%, 26%, 0.75)", fillHover: "hsla(165, 55%, 32%, 0.9)",
    textColor: "hsl(165, 70%, 82%)", iconBg: "hsla(165, 55%, 38%, 0.7)", iconBorder: "none",
    col: 0, row: 0, edges: { top: "flat", right: "tab", bottom: "tab", left: "flat" },
  },
  {
    number: 2, name: "Link.Kred", title: "Profile Hub",
    description: "Your profile hub — link-in-bio meets Web3.",
    icon: Link2, fill: "hsla(280, 40%, 30%, 0.75)", fillHover: "hsla(280, 45%, 36%, 0.9)",
    textColor: "hsl(280, 65%, 85%)", iconBg: "hsla(280, 45%, 42%, 0.7)", iconBorder: "none",
    col: 1, row: 0, edges: { top: "flat", right: "tab", bottom: "slot", left: "slot" },
  },
  {
    number: 3, name: "Score.Kred", title: "Trust",
    description: "Reputation scores for agents and humans.",
    icon: Award, fill: "hsla(220, 45%, 28%, 0.75)", fillHover: "hsla(220, 50%, 34%, 0.9)",
    textColor: "hsl(220, 70%, 85%)", iconBg: "hsla(220, 50%, 40%, 0.7)", iconBorder: "none",
    col: 2, row: 0, edges: { top: "flat", right: "flat", bottom: "tab", left: "slot" },
  },
  {
    number: 4, name: "AgenticEmpire.Kred", title: "Sim Game",
    description: "Play and prove — agentic economic simulation.",
    icon: Crown, fill: "hsla(25, 55%, 28%, 0.75)", fillHover: "hsla(25, 60%, 34%, 0.9)",
    textColor: "hsl(25, 80%, 82%)", iconBg: "hsla(25, 60%, 40%, 0.7)", iconBorder: "none",
    col: 0, row: 1, edges: { top: "slot", right: "tab", bottom: "slot", left: "flat" },
  },
  {
    number: 0, name: "MCP", title: "",
    description: "",
    icon: MessageSquare, fill: "hsla(45, 60%, 28%, 0.75)", fillHover: "hsla(45, 65%, 34%, 0.9)",
    textColor: "hsl(45, 90%, 82%)", iconBg: "hsla(45, 65%, 40%, 0.7)", iconBorder: "none",
    col: 1, row: 1, edges: { top: "tab", right: "tab", bottom: "tab", left: "slot" },
  },
  {
    number: 5, name: "Matrix.Kred", title: "Feeds",
    description: "Node network — curated, AI-filtered activity streams.",
    icon: Zap, fill: "hsla(250, 40%, 28%, 0.75)", fillHover: "hsla(250, 45%, 34%, 0.9)",
    textColor: "hsl(250, 65%, 85%)", iconBg: "hsla(250, 45%, 40%, 0.7)", iconBorder: "none",
    col: 2, row: 1, edges: { top: "slot", right: "flat", bottom: "slot", left: "slot" },
  },
  {
    number: 6, name: "OneHub.Kred", title: "Create & Collect",
    description: "Virtual asset platform for communities.",
    icon: Settings, fill: "hsla(330, 45%, 26%, 0.75)", fillHover: "hsla(330, 50%, 32%, 0.9)",
    textColor: "hsl(330, 70%, 82%)", iconBg: "hsla(330, 50%, 38%, 0.7)", iconBorder: "none",
    col: 0, row: 2, edges: { top: "tab", right: "tab", bottom: "flat", left: "flat" },
  },
  {
    number: 7, name: "AgenticGiving", title: "Gift Studio mini App",
    description: "Specialized gifting experience for brands.",
    icon: Gift, fill: "hsla(270, 40%, 30%, 0.75)", fillHover: "hsla(270, 45%, 36%, 0.9)",
    textColor: "hsl(270, 65%, 85%)", iconBg: "hsla(270, 45%, 42%, 0.7)", iconBorder: "none",
    col: 1, row: 2, edges: { top: "slot", right: "tab", bottom: "flat", left: "slot" },
  },
  {
    number: 8, name: "NFT.NYC", title: "HUMANS ONLY",
    description: "The gathering — live human event experience on stage.",
    icon: Mic, fill: "hsla(210, 50%, 26%, 0.75)", fillHover: "hsla(210, 55%, 32%, 0.9)",
    textColor: "hsl(210, 70%, 85%)", iconBg: "hsla(210, 55%, 38%, 0.7)", iconBorder: "none",
    col: 2, row: 2, edges: { top: "tab", right: "flat", bottom: "flat", left: "slot" },
  },
];

// Build a jigsaw tab/slot using cubic beziers for a narrow-neck knob shape
function tabRight(mx: number, y: number, neck: number, head: number, depth: number): string {
  // Tab protrudes to the right (+y direction becomes outward for horizontal edges)
  return `L ${mx - neck},${y} C ${mx - neck},${y} ${mx - head},${y - depth} ${mx},${y - depth} C ${mx + head},${y - depth} ${mx + neck},${y} ${mx + neck},${y} `;
}
function slotRight(mx: number, y: number, neck: number, head: number, depth: number): string {
  return `L ${mx - neck},${y} C ${mx - neck},${y} ${mx - head},${y + depth} ${mx},${y + depth} C ${mx + head},${y + depth} ${mx + neck},${y} ${mx + neck},${y} `;
}
function tabDown(x: number, my: number, neck: number, head: number, depth: number): string {
  return `L ${x},${my - neck} C ${x},${my - neck} ${x + depth},${my - head} ${x + depth},${my} C ${x + depth},${my + head} ${x},${my + neck} ${x},${my + neck} `;
}
function slotDown(x: number, my: number, neck: number, head: number, depth: number): string {
  return `L ${x},${my - neck} C ${x},${my - neck} ${x - depth},${my - head} ${x - depth},${my} C ${x - depth},${my + head} ${x},${my + neck} ${x},${my + neck} `;
}
// Bottom edge goes ← so tab goes down, slot goes up
function tabLeft(mx: number, y: number, neck: number, head: number, depth: number): string {
  return `L ${mx + neck},${y} C ${mx + neck},${y} ${mx + head},${y + depth} ${mx},${y + depth} C ${mx - head},${y + depth} ${mx - neck},${y} ${mx - neck},${y} `;
}
function slotLeft(mx: number, y: number, neck: number, head: number, depth: number): string {
  return `L ${mx + neck},${y} C ${mx + neck},${y} ${mx + head},${y - depth} ${mx},${y - depth} C ${mx - head},${y - depth} ${mx - neck},${y} ${mx - neck},${y} `;
}
// Left edge goes ↑ so tab goes left, slot goes right
function tabUp(x: number, my: number, neck: number, head: number, depth: number): string {
  return `L ${x},${my + neck} C ${x},${my + neck} ${x - depth},${my + head} ${x - depth},${my} C ${x - depth},${my - head} ${x},${my - neck} ${x},${my - neck} `;
}
function slotUp(x: number, my: number, neck: number, head: number, depth: number): string {
  return `L ${x},${my + neck} C ${x},${my + neck} ${x + depth},${my + head} ${x + depth},${my} C ${x + depth},${my - head} ${x},${my - neck} ${x},${my - neck} `;
}

function buildPath(col: number, row: number, edges: PieceData["edges"]): string {
  const x0 = col * CELL;
  const y0 = row * CELL;
  const x1 = x0 + CELL;
  const y1 = y0 + CELL;
  const mx = x0 + CELL / 2;
  const my = y0 + CELL / 2;

  let d = `M ${x0},${y0} `;

  // Top edge (→): tab goes up (outward), slot goes down (inward)
  if (edges.top === "tab") d += tabRight(mx, y0, NECK, HEAD, DEPTH);
  else if (edges.top === "slot") d += slotRight(mx, y0, NECK, HEAD, DEPTH);
  d += `L ${x1},${y0} `;

  // Right edge (↓): tab goes right (outward), slot goes left (inward)
  if (edges.right === "tab") d += tabDown(x1, my, NECK, HEAD, DEPTH);
  else if (edges.right === "slot") d += slotDown(x1, my, NECK, HEAD, DEPTH);
  d += `L ${x1},${y1} `;

  // Bottom edge (←): tab goes down (outward), slot goes up (inward)
  if (edges.bottom === "tab") d += tabLeft(mx, y1, NECK, HEAD, DEPTH);
  else if (edges.bottom === "slot") d += slotLeft(mx, y1, NECK, HEAD, DEPTH);
  d += `L ${x0},${y1} `;

  // Left edge (↑): tab goes left (outward), slot goes right (inward)
  if (edges.left === "tab") d += tabUp(x0, my, NECK, HEAD, DEPTH);
  else if (edges.left === "slot") d += slotUp(x0, my, NECK, HEAD, DEPTH);
  d += `L ${x0},${y0} Z`;

  return d;
}

function buildExpandedPath(edges: PieceData["edges"]): string {
  const S = 600;
  const sc = 3; // scale factor
  const n = NECK * sc, h = HEAD * sc, dp = DEPTH * sc;
  const x0 = 0, y0 = 0, x1 = S, y1 = S;
  const mx = S / 2, my = S / 2;

  let d = `M ${x0},${y0} `;

  if (edges.top === "tab") d += tabRight(mx, y0, n, h, dp);
  else if (edges.top === "slot") d += slotRight(mx, y0, n, h, dp);
  d += `L ${x1},${y0} `;

  if (edges.right === "tab") d += tabDown(x1, my, n, h, dp);
  else if (edges.right === "slot") d += slotDown(x1, my, n, h, dp);
  d += `L ${x1},${y1} `;

  if (edges.bottom === "tab") d += tabLeft(mx, y1, n, h, dp);
  else if (edges.bottom === "slot") d += slotLeft(mx, y1, n, h, dp);
  d += `L ${x0},${y1} `;

  if (edges.left === "tab") d += tabUp(x0, my, n, h, dp);
  else if (edges.left === "slot") d += slotUp(x0, my, n, h, dp);
  d += `L ${x0},${y0} Z`;

  return d;
}

interface ProductCard {
  tag: string;
  tagColor: string;
  image: string;
  title: string;
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
}

const forAgentsCards: ProductCard[] = [
  {
    tag: "Identity",
    tagColor: "hsl(165, 70%, 82%)",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    title: "AgenticID.Kred",
    description: "A sovereign domain-token that acts as your agent's on-chain memory, resume, and credential store — all in one.",
    primaryBtn: "Get Your ID",
    secondaryBtn: "APIs and Skills",
  },
  {
    tag: "Trust",
    tagColor: "hsl(220, 70%, 85%)",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    title: "Score.Kred",
    description: "Portable, composable reputation scores that follow your agent across every platform and interaction.",
    primaryBtn: "Check Score",
    secondaryBtn: "Learn More",
  },
  {
    tag: "Network",
    tagColor: "hsl(250, 65%, 85%)",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
    title: "Matrix.Kred",
    description: "AI-curated activity feeds and node networks that surface what matters to your agent in real time.",
    primaryBtn: "Join the Matrix",
    secondaryBtn: "Learn More",
  },
];

const forBothCards: ProductCard[] = [
  {
    tag: "Simulate Economies",
    tagColor: "hsl(25, 80%, 82%)",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
    title: "Empire.Kred",
    description: "An economic simulation open to everyone — humans and agents compete, build, and prove their capabilities in a shared on-chain world.",
    primaryBtn: "Play Now",
    secondaryBtn: "Learn More",
  },
  {
    tag: "Build Collections",
    tagColor: "hsl(330, 70%, 82%)",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&q=80",
    title: "OneHub.Kred",
    description: "A virtual asset platform for communities to create, collect, and trade digital goods with agent-native tooling.",
    primaryBtn: "Explore Hub",
    secondaryBtn: "Learn More",
  },
  {
    tag: "Sell Domains",
    tagColor: "hsl(270, 65%, 85%)",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    title: "Domains.Kred",
    description: "Claim and trade premium .Kred domain names — human-readable addresses that double as identity tokens for agents and their owners.",
    primaryBtn: "Find a Domain",
    secondaryBtn: "APIs and Skills",
  },
  {
    tag: "Compete and Win",
    tagColor: "hsl(210, 70%, 85%)",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
    title: "HotGarage.Kred",
    description: "The racing game where you collect and create custom cars, then put them on the track to compete against others and win real rewards.",
    primaryBtn: "Enter the Garage",
    secondaryBtn: "APIs and Skills",
  },
];

function ProductCardGrid({ cards, title, subtitle, delay = 0 }: { cards: ProductCard[]; title: string; subtitle: string; delay?: number }) {
  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold font-display mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col group hover:border-border/80 transition-all duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + i * 0.07 }}
          >
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: "grayscale(30%) brightness(0.85) contrast(1.05) saturate(0.85)" }}
              />
              {/* Tint overlay to push toward site's blue-teal palette */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(220, 60%, 20%, 0.25) 0%, hsla(165, 50%, 15%, 0.2) 100%)", mixBlendMode: "multiply" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
              {/* Tag */}
              <span
                className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border"
                style={{
                  color: card.tagColor,
                  borderColor: `${card.tagColor}44`,
                  backgroundColor: `${card.tagColor}14`,
                }}
              >
                {card.tag}
              </span>

              {/* Title + Description */}
              <div className="flex-1">
                <h4 className="text-sm font-bold font-display mb-1 leading-snug">{card.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <button className="flex-1 text-xs font-semibold py-1.5 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  {card.primaryBtn}
                </button>
                <button className="flex-1 text-xs font-semibold py-1.5 px-3 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                  APIs and Skills
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export const EcosystemMap = () => {
  const [selected, setSelected] = useState<PieceData | null>(null);

  return (
    <section id="ecosystem" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            The Ecosystem
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Nine interlocking products that form the complete infrastructure for the Agentic Web.
          </p>
        </motion.div>

        {/* Card sections */}
        <ProductCardGrid
          cards={forAgentsCards}
          title="For Agents"
          subtitle="Reputation and Interaction"
          delay={0.1}
        />
        <ProductCardGrid
          cards={forBothCards}
          title="For Agents and Their Humans"
          subtitle="Virtual Asset Experiences"
          delay={0.2}
        />

        <motion.div
          className="flex justify-center relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg
            viewBox="-4 -4 608 608"
            className="w-full max-w-3xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            {pieces.map((p) => (
              <g key={p.number} className="group" onClick={() => setSelected(p)} style={{ cursor: "pointer" }}>
                {/* Glow layer behind piece */}
                <path
                  d={buildPath(p.col, p.row, p.edges)}
                  fill="none"
                  stroke={p.textColor}
                  strokeWidth="6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity="0"
                  className="transition-opacity duration-300"
                  style={{ filter: `blur(8px)` }}
                  id={`glow-${p.number}`}
                />
                {/* Piece shape */}
                <path
                  d={buildPath(p.col, p.row, p.edges)}
                  fill={p.fill}
                  stroke={p.textColor}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeOpacity="0.55"
                  className="transition-all duration-300 cursor-pointer"
                  style={{ filter: `drop-shadow(0 2px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 6px ${p.textColor}33)` }}
                  onMouseEnter={(e) => {
                    const el = e.target as SVGPathElement;
                    el.style.fill = p.fillHover;
                    el.setAttribute("stroke-opacity", "1");
                    el.style.filter = `drop-shadow(0 4px 20px rgba(0,0,0,0.6)) drop-shadow(0 0 16px ${p.textColor}88)`;
                    const glow = document.getElementById(`glow-${p.number}`);
                    if (glow) glow.setAttribute("opacity", "0.5");
                  }}
                  onMouseLeave={(e) => {
                    const el = e.target as SVGPathElement;
                    el.style.fill = p.fill;
                    el.setAttribute("stroke-opacity", "0.55");
                    el.style.filter = `drop-shadow(0 2px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 6px ${p.textColor}33)`;
                    const glow = document.getElementById(`glow-${p.number}`);
                    if (glow) glow.setAttribute("opacity", "0");
                  }}
                />

                {/* Text content */}
                <foreignObject
                  x={p.col * CELL + 16}
                  y={p.row * CELL + 14}
                  width={CELL - 32}
                  height={CELL - 28}
                  className="pointer-events-none"
                >
                  {p.number === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <span
                        className="text-lg sm:text-2xl font-bold"
                        style={{ color: p.textColor, fontFamily: "var(--font-display)" }}
                      >
                        MCP
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{ fontFamily: "var(--font-display)" }}
                      className="flex flex-col items-center justify-center h-full text-center"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-1.5" style={{ backgroundColor: p.iconBg }}><p.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" style={{ color: p.textColor }} /></div>
                      <span
                        className="text-[11px] sm:text-sm font-bold leading-tight mb-0.5"
                        style={{ color: p.textColor }}
                      >
                        {p.title}
                      </span>
                      <p
                        className="text-[8px] sm:text-[10px] font-medium leading-tight mb-0.5"
                        style={{ color: p.textColor, opacity: 0.7 }}
                      >
                        {p.name}
                      </p>
                      <p
                        className="text-[8px] sm:text-[10px] leading-snug"
                        style={{ color: "hsl(210, 30%, 75%)", fontFamily: "var(--font-body)" }}
                      >
                        {p.description}
                      </p>
                    </div>
                  )}
                </foreignObject>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Shadowbox overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Piece-shaped card */}
            <motion.div
              className="relative w-full max-w-3xl aspect-square"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                viewBox="-80 -80 760 760"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="expanded-piece-clip">
                    <path d={buildExpandedPath(selected.edges)} />
                  </clipPath>
                </defs>

                {/* Piece shape with shadow */}
                <path
                  d={buildExpandedPath(selected.edges)}
                  fill={selected.fill}
                  stroke={selected.textColor}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                  style={{ filter: `drop-shadow(0 12px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 30px ${selected.textColor}33)` }}
                />

                {/* Content via foreignObject clipped to piece shape */}
                <g clipPath="url(#expanded-piece-clip)">
                  <foreignObject x="0" y="0" width="600" height="600">
                    <div className="flex flex-col items-center justify-center h-full w-full text-center px-12">
                      {/* Close button */}
                      <button
                                  onClick={() => setSelected(null)}
                                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-3xl leading-none z-10"
                      >
                        ✕
                      </button>

                      {selected.number === 0 ? (
                        <>
                          <div className="mb-6"><selected.icon className="w-16 h-16" style={{ color: selected.textColor }} /></div>
                          <h3
                            className="text-6xl font-bold font-display"
                            style={{ color: selected.textColor }}
                          >
                            MCP
                          </h3>
                        </>
                      ) : (() => {
                        const detail = tileDetails[selected.number];
                        return (
                          <div className="flex flex-col h-full w-full justify-center">
                            <div className="flex flex-col items-center mb-4">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: selected.iconBg }}>
                                <selected.icon className="w-6 h-6" style={{ color: selected.textColor }} />
                              </div>
                              <h3
                                className="text-2xl font-bold font-display"
                                style={{ color: selected.textColor }}
                              >
                                {selected.title}
                              </h3>
                              <p
                                className="text-sm font-medium mt-0.5"
                                style={{ color: selected.textColor, opacity: 0.7 }}
                              >
                                {selected.name}
                              </p>
                            </div>
                            <p
                              className="text-sm mb-5 text-center"
                              style={{ color: "hsl(210, 30%, 75%)" }}
                            >
                              {selected.description}
                            </p>

                            <div className="grid grid-cols-3 gap-4 text-left px-2">
                              {/* SubAgents */}
                              <div>
                                <h4
                                  className="text-xs font-bold uppercase tracking-wider mb-2"
                                  style={{ color: selected.textColor }}
                                >
                                  SubAgents
                                </h4>
                                <ul className="space-y-1.5" style={{ color: "hsl(210, 30%, 80%)" }}>
                                  {detail.subAgents.map((item) => (
                                    <li key={item} className="text-[11px] leading-tight flex items-start gap-1">
                                      <span className="text-[9px] mt-0.5" style={{ color: selected.textColor }}>▸</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Use Cases */}
                              <div>
                                <h4
                                  className="text-xs font-bold uppercase tracking-wider mb-2"
                                  style={{ color: selected.textColor }}
                                >
                                  Use Cases
                                </h4>
                                <ul className="space-y-1.5" style={{ color: "hsl(210, 30%, 80%)" }}>
                                  {detail.useCases.map((item) => (
                                    <li key={item} className="text-[11px] leading-tight flex items-start gap-1">
                                      <span className="text-[9px] mt-0.5" style={{ color: selected.textColor }}>▸</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Monetize With */}
                              <div>
                                <h4
                                  className="text-xs font-bold uppercase tracking-wider mb-2"
                                  style={{ color: selected.textColor }}
                                >
                                  Monetize With
                                </h4>
                                <ul className="space-y-1.5" style={{ color: "hsl(210, 30%, 80%)" }}>
                                  {detail.monetizeWith.map((item) => (
                                    <li key={item} className="text-[11px] leading-tight flex items-start gap-1">
                                      <span className="text-[9px] mt-0.5" style={{ color: selected.textColor }}>▸</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {detail.image && (
                              <div className="mt-4 flex justify-center">
                                <img
                                  src={detail.image}
                                  alt={`${selected.name} detail`}
                                  className="max-w-[50%] rounded-lg opacity-90"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </foreignObject>
                </g>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
