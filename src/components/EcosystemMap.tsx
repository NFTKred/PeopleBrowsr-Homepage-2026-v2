import { motion } from "framer-motion";

const CELL = 200;
const TAB_R = 22;
const TAB_D = 24;

type Edge = "flat" | "tab" | "slot";

interface PieceData {
  number: number;
  name: string;
  title: string;
  description: string;
  icon: string;
  fill: string;
  fillHover: string;
  textColor: string;
  col: number;
  row: number;
  edges: { top: Edge; right: Edge; bottom: Edge; left: Edge };
}

const pieces: PieceData[] = [
  {
    number: 1, name: "AgenticID.Kred", title: "Identity",
    description: "Your Web3 identity — domain token metadata with on-chain memory.",
    icon: "🌐", fill: "hsl(165, 35%, 22%)", fillHover: "hsl(165, 40%, 28%)",
    textColor: "hsl(165, 60%, 70%)", col: 0, row: 0,
    edges: { top: "flat", right: "tab", bottom: "tab", left: "flat" },
  },
  {
    number: 2, name: "Link.Kred", title: "Profile Hub",
    description: "Your profile hub — link-in-bio meets Web3.",
    icon: "🔗", fill: "hsl(280, 30%, 28%)", fillHover: "hsl(280, 35%, 34%)",
    textColor: "hsl(280, 55%, 75%)", col: 1, row: 0,
    edges: { top: "flat", right: "tab", bottom: "slot", left: "slot" },
  },
  {
    number: 3, name: "Score.Kred", title: "Trust",
    description: "Reputation scores for agents and humans.",
    icon: "🏅", fill: "hsl(220, 35%, 27%)", fillHover: "hsl(220, 40%, 33%)",
    textColor: "hsl(220, 60%, 75%)", col: 2, row: 0,
    edges: { top: "flat", right: "flat", bottom: "tab", left: "slot" },
  },
  {
    number: 4, name: "AgenticEmpire.Kred", title: "Sim Game",
    description: "Play and prove — agentic economic simulation.",
    icon: "👑", fill: "hsl(25, 45%, 26%)", fillHover: "hsl(25, 50%, 32%)",
    textColor: "hsl(25, 70%, 72%)", col: 0, row: 1,
    edges: { top: "slot", right: "tab", bottom: "slot", left: "flat" },
  },
  {
    number: 5, name: "SocialOS.io", title: "Social Layer",
    description: "Your social layer — feeds, forums, communities.",
    icon: "💬", fill: "hsl(45, 50%, 28%)", fillHover: "hsl(45, 55%, 34%)",
    textColor: "hsl(45, 80%, 72%)", col: 1, row: 1,
    edges: { top: "tab", right: "tab", bottom: "tab", left: "slot" },
  },
  {
    number: 6, name: "Matrix.Kred", title: "Feeds",
    description: "Node network — curated, AI-filtered activity streams.",
    icon: "⚡", fill: "hsl(250, 30%, 26%)", fillHover: "hsl(250, 35%, 32%)",
    textColor: "hsl(250, 55%, 75%)", col: 2, row: 1,
    edges: { top: "slot", right: "flat", bottom: "slot", left: "slot" },
  },
  {
    number: 7, name: "OneHub.Kred", title: "Create & Collect",
    description: "Virtual asset platform for communities.",
    icon: "⚙️", fill: "hsl(330, 35%, 25%)", fillHover: "hsl(330, 40%, 31%)",
    textColor: "hsl(330, 60%, 72%)", col: 0, row: 2,
    edges: { top: "tab", right: "tab", bottom: "flat", left: "flat" },
  },
  {
    number: 8, name: "AgenticGiving", title: "Gift Studio mini App",
    description: "Specialized gifting experience for brands.",
    icon: "🎁", fill: "hsl(270, 30%, 28%)", fillHover: "hsl(270, 35%, 34%)",
    textColor: "hsl(270, 55%, 75%)", col: 1, row: 2,
    edges: { top: "slot", right: "tab", bottom: "flat", left: "slot" },
  },
  {
    number: 9, name: "NFT.NYC", title: "HUMANS ONLY",
    description: "The gathering — live human event experience on stage.",
    icon: "🎤", fill: "hsl(210, 40%, 24%)", fillHover: "hsl(210, 45%, 30%)",
    textColor: "hsl(210, 60%, 72%)", col: 2, row: 2,
    edges: { top: "tab", right: "flat", bottom: "flat", left: "slot" },
  },
];

function buildPath(col: number, row: number, edges: PieceData["edges"]): string {
  const x0 = col * CELL;
  const y0 = row * CELL;
  const x1 = x0 + CELL;
  const y1 = y0 + CELL;
  const mx = x0 + CELL / 2;
  const my = y0 + CELL / 2;

  let d = `M ${x0},${y0} `;

  // Top edge (→)
  if (edges.top === "tab") {
    d += `L ${mx - TAB_R},${y0} A ${TAB_R} ${TAB_D} 0 0 0 ${mx + TAB_R},${y0} `;
  } else if (edges.top === "slot") {
    d += `L ${mx - TAB_R},${y0} A ${TAB_R} ${TAB_D} 0 0 1 ${mx + TAB_R},${y0} `;
  }
  d += `L ${x1},${y0} `;

  // Right edge (↓)
  if (edges.right === "tab") {
    d += `L ${x1},${my - TAB_R} A ${TAB_D} ${TAB_R} 0 0 1 ${x1},${my + TAB_R} `;
  } else if (edges.right === "slot") {
    d += `L ${x1},${my - TAB_R} A ${TAB_D} ${TAB_R} 0 0 0 ${x1},${my + TAB_R} `;
  }
  d += `L ${x1},${y1} `;

  // Bottom edge (←)
  if (edges.bottom === "tab") {
    d += `L ${mx + TAB_R},${y1} A ${TAB_R} ${TAB_D} 0 0 0 ${mx - TAB_R},${y1} `;
  } else if (edges.bottom === "slot") {
    d += `L ${mx + TAB_R},${y1} A ${TAB_R} ${TAB_D} 0 0 1 ${mx - TAB_R},${y1} `;
  }
  d += `L ${x0},${y1} `;

  // Left edge (↑)
  if (edges.left === "tab") {
    d += `L ${x0},${my + TAB_R} A ${TAB_D} ${TAB_R} 0 0 0 ${x0},${my - TAB_R} `;
  } else if (edges.left === "slot") {
    d += `L ${x0},${my + TAB_R} A ${TAB_D} ${TAB_R} 0 0 1 ${x0},${my - TAB_R} `;
  }
  d += `L ${x0},${y0} Z`;

  return d;
}

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
            Nine interlocking products that form the complete infrastructure for the Agentic Web.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
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
              <g key={p.number} className="group">
                {/* Piece shape */}
                <path
                  d={buildPath(p.col, p.row, p.edges)}
                  fill={p.fill}
                  stroke="hsl(222, 47%, 8%)"
                  strokeWidth="3"
                  className="transition-all duration-300 cursor-pointer"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                  onMouseEnter={(e) => {
                    (e.target as SVGPathElement).style.fill = p.fillHover;
                    (e.target as SVGPathElement).style.filter = "drop-shadow(0 4px 12px rgba(0,0,0,0.5))";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as SVGPathElement).style.fill = p.fill;
                    (e.target as SVGPathElement).style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))";
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
                  <div
                    style={{ fontFamily: "var(--font-display)" }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span
                        className="text-[10px] sm:text-xs font-bold leading-tight"
                        style={{ color: p.textColor }}
                      >
                        {p.number}. {p.name}:
                      </span>
                      <span className="text-sm sm:text-base ml-1 flex-shrink-0">{p.icon}</span>
                    </div>
                    <p
                      className="text-[9px] sm:text-[11px] font-semibold italic leading-tight mb-1"
                      style={{ color: p.textColor, opacity: 0.85 }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="text-[8px] sm:text-[10px] leading-snug"
                      style={{ color: "hsl(210, 30%, 75%)", fontFamily: "var(--font-body)" }}
                    >
                      {p.description}
                    </p>
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
