import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import accessNftImage from "@/assets/access-nft-domain-tokens-v1.png";

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
    number: 0, name: "MCP", title: "",
    description: "",
    icon: "💬", fill: "hsl(45, 50%, 28%)", fillHover: "hsl(45, 55%, 34%)",
    textColor: "hsl(45, 80%, 72%)", col: 1, row: 1,
    edges: { top: "tab", right: "tab", bottom: "tab", left: "slot" },
  },
  {
    number: 5, name: "Matrix.Kred", title: "Feeds",
    description: "Node network — curated, AI-filtered activity streams.",
    icon: "⚡", fill: "hsl(250, 30%, 26%)", fillHover: "hsl(250, 35%, 32%)",
    textColor: "hsl(250, 55%, 75%)", col: 2, row: 1,
    edges: { top: "slot", right: "flat", bottom: "slot", left: "slot" },
  },
  {
    number: 6, name: "OneHub.Kred", title: "Create & Collect",
    description: "Virtual asset platform for communities.",
    icon: "⚙️", fill: "hsl(330, 35%, 25%)", fillHover: "hsl(330, 40%, 31%)",
    textColor: "hsl(330, 60%, 72%)", col: 0, row: 2,
    edges: { top: "tab", right: "tab", bottom: "flat", left: "flat" },
  },
  {
    number: 7, name: "AgenticGiving", title: "Gift Studio mini App",
    description: "Specialized gifting experience for brands.",
    icon: "🎁", fill: "hsl(270, 30%, 28%)", fillHover: "hsl(270, 35%, 34%)",
    textColor: "hsl(270, 55%, 75%)", col: 1, row: 2,
    edges: { top: "slot", right: "tab", bottom: "flat", left: "slot" },
  },
  {
    number: 8, name: "NFT.NYC", title: "HUMANS ONLY",
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

function buildExpandedPath(edges: PieceData["edges"]): string {
  const S = 600; // full puzzle size
  const TR = TAB_R * 3; // scale tab proportionally
  const TD = TAB_D * 3;
  const x0 = 0, y0 = 0, x1 = S, y1 = S;
  const mx = S / 2, my = S / 2;

  let d = `M ${x0},${y0} `;

  if (edges.top === "tab") {
    d += `L ${mx - TR},${y0} A ${TR} ${TD} 0 0 0 ${mx + TR},${y0} `;
  } else if (edges.top === "slot") {
    d += `L ${mx - TR},${y0} A ${TR} ${TD} 0 0 1 ${mx + TR},${y0} `;
  }
  d += `L ${x1},${y0} `;

  if (edges.right === "tab") {
    d += `L ${x1},${my - TR} A ${TD} ${TR} 0 0 1 ${x1},${my + TR} `;
  } else if (edges.right === "slot") {
    d += `L ${x1},${my - TR} A ${TD} ${TR} 0 0 0 ${x1},${my + TR} `;
  }
  d += `L ${x1},${y1} `;

  if (edges.bottom === "tab") {
    d += `L ${mx + TR},${y1} A ${TR} ${TD} 0 0 0 ${mx - TR},${y1} `;
  } else if (edges.bottom === "slot") {
    d += `L ${mx + TR},${y1} A ${TR} ${TD} 0 0 1 ${mx - TR},${y1} `;
  }
  d += `L ${x0},${y1} `;

  if (edges.left === "tab") {
    d += `L ${x0},${my + TR} A ${TD} ${TR} 0 0 0 ${x0},${my - TR} `;
  } else if (edges.left === "slot") {
    d += `L ${x0},${my + TR} A ${TD} ${TR} 0 0 1 ${x0},${my - TR} `;
  }
  d += `L ${x0},${y0} Z`;

  return d;
}

export const EcosystemMap = () => {
  const [selected, setSelected] = useState<PieceData | null>(null);

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
            Where Agents are People,
            <br />
            and People are Agentic
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nine interlocking products that form the complete infrastructure for the Agentic Web.
          </p>
        </motion.div>

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
                {/* Piece shape */}
                <path
                  d={buildPath(p.col, p.row, p.edges)}
                  fill={p.fill}
                  stroke="hsl(222, 47%, 8%)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
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
                      <span className="text-base sm:text-lg mb-1">{p.icon}</span>
                      <span
                        className="text-[10px] sm:text-xs font-bold leading-tight mb-0.5"
                        style={{ color: p.textColor }}
                      >
                        {p.number}. {p.name}
                      </span>
                      <p
                        className="text-[9px] sm:text-[11px] font-semibold italic leading-tight mb-0.5"
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
                  stroke="hsl(222, 47%, 12%)"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.6))" }}
                />

                {/* Content via foreignObject clipped to piece shape */}
                <g clipPath="url(#expanded-piece-clip)">
                  <foreignObject x="0" y="0" width="600" height="600">
                    <div className="flex flex-col items-center justify-center h-full w-full text-center px-12">
                      {/* Close button */}
                      <button
                        onClick={() => setSelected(null)}
                        className="absolute top-24 right-24 text-white/60 hover:text-white transition-colors text-3xl leading-none z-10"
                      >
                        ✕
                      </button>

                      {selected.number === 0 ? (
                        <>
                          <span className="text-6xl mb-6">{selected.icon}</span>
                          <h3
                            className="text-6xl font-bold font-display"
                            style={{ color: selected.textColor }}
                          >
                            MCP
                          </h3>
                        </>
                      ) : selected.number === 1 ? (
                        /* AgenticID.Kred expanded detail */
                        <div className="flex flex-col h-full w-full justify-center">
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-4xl">{selected.icon}</span>
                            <h3
                              className="text-2xl font-bold font-display"
                              style={{ color: selected.textColor }}
                            >
                              {selected.number}. {selected.name}
                            </h3>
                          </div>
                          <p
                            className="text-sm italic mb-5 text-center"
                            style={{ color: selected.textColor, opacity: 0.85 }}
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
                                {["Reputation Scorer", "Resume Writer (Bio)", "Credential Verification", "Capabilities (Skills)", "Reference Checking Agent"].map((item) => (
                                  <li key={item} className="text-[11px] leading-tight flex items-start gap-1">
                                    <span className="text-[9px] mt-0.5" style={{ color: selected.textColor }}>▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Examples */}
                            <div>
                              <h4
                                className="text-xs font-bold uppercase tracking-wider mb-2"
                                style={{ color: selected.textColor }}
                              >
                                Use Cases
                              </h4>
                              <ul className="space-y-1.5" style={{ color: "hsl(210, 30%, 80%)" }}>
                                {["Domains.Kred", "Agent-only Reseller", "Voight.Kred"].map((item) => (
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
                                {["String Length", "Premium Names", "Term"].map((item) => (
                                  <li key={item} className="text-[11px] leading-tight flex items-start gap-1">
                                    <span className="text-[9px] mt-0.5" style={{ color: selected.textColor }}>▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-center">
                            <img
                              src={accessNftImage}
                              alt="NFT Domain Tokens"
                              className="max-w-[80%] rounded-lg opacity-90"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="text-6xl mb-6">{selected.icon}</span>
                          <h3
                            className="text-4xl font-bold font-display mb-3"
                            style={{ color: selected.textColor }}
                          >
                            {selected.number}. {selected.name}
                          </h3>
                          <p
                            className="text-2xl font-semibold italic mb-4"
                            style={{ color: selected.textColor, opacity: 0.85 }}
                          >
                            {selected.title}
                          </p>
                          <p
                            className="text-lg leading-relaxed max-w-sm"
                            style={{ color: "hsl(210, 30%, 80%)" }}
                          >
                            {selected.description}
                          </p>
                        </>
                      )}
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
