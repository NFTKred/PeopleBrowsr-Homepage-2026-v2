import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useContactModal } from "@/hooks/use-contact-modal";
import {
  ShieldCheck,
  BarChart2,
  Star,
  Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07 },
  }),
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">{children}</p>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/5 text-xs text-primary font-medium tracking-wide mb-5">
    {children}
  </span>
);

// ── Gap cards ─────────────────────────────────────────────────────────────────
const gapCards = [
  {
    icon: ShieldCheck,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    accent: "border-l-primary/60",
    title: "Identity NFTs (Name Tokens)",
    intro:
      "The biggest hurdle in wholesale digital currency adoption is verifying participants without building a massive centralized database.",
    body:
      "PeopleBrowsr Identity NFTs provide privacy-preserving KYC. A non-transferable credential that proves investor status on-chain. The ledger verifies the token — not the person's private data.",
    bullets: [
      "Wallet-native identity credential",
      "Privacy-preserving verification",
      "Cross-platform portability",
      "Regulatory whitelist without centralized PII storage",
    ],
  },
  {
    icon: Layers,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    accent: "border-l-secondary/60",
    title: "Dynamic NFT Wrappers",
    intro:
      "Simple 1:1 tokenization lacks the intelligence to handle complex regulatory lifecycle events — GST, royalties, title transfer, probate.",
    body:
      "PeopleBrowsr Smart NFTs act as programmable legal containers. The NFT carries the legal title, real-time audit trail, and embedded compliance logic. When an asset trades, tax and legal transfer execute atomically.",
    bullets: [
      "Embedded smart contract compliance",
      "Atomic settlement with legal title transfer",
      "Self-describing audit trail",
      "Works across public and private ledgers",
    ],
  },
  {
    icon: BarChart2,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    accent: "border-l-primary/60",
    title: "Score.Kred for Regulated Markets",
    intro:
      "Regulated markets need verifiable trust — not social media likes. Score.Kred provides institutional-grade reputation scoring built on blockchain data.",
    body:
      "Participants carry a portable trust score across platforms and jurisdictions. Market operators can set minimum score thresholds for participation.",
    bullets: [
      "On-chain verifiable reputation",
      "Cross-jurisdictional portability",
      "Configurable threshold gates",
      "Built on ERC-8004",
    ],
  },
];

// ── Compliance cards ──────────────────────────────────────────────────────────
const complianceCards = [
  {
    title: "AUSTRAC-Registered",
    desc: "Digital currency exchange registration. Operational AML/CTF program with four-tier KYC framework.",
  },
  {
    title: "AFSL-Aligned",
    desc: "Platform architecture designed to align with the Digital Assets Framework licensing requirements.",
  },
  {
    title: "Global by Design",
    desc: "Jurisdiction-agnostic identity infrastructure. One credential, verified anywhere.",
  },
];

// ── Platform cards ────────────────────────────────────────────────────────────
const platformCards = [
  {
    name: "AgenticID.Kred",
    desc: "Sovereign identity credentials for AI agents and human participants",
  },
  {
    name: "Score.Kred",
    desc: "On-chain trust scoring and verifiable reputation infrastructure",
  },
  {
    name: "Matrix.Kred",
    desc: "Real-time social intelligence and influence graph",
  },
  {
    name: "Empire.Kred",
    desc: "Gamified influence economy and social capital platform",
  },
  {
    name: "NFT.Kred",
    desc: "Enterprise NFT minting, management, and distribution",
  },
];

export default function TokenizationPage() {
  const { open: openContact } = useContactModal();

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <NavBar />

      <main className="relative z-10">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Pill>Trust Infrastructure for the Agentic Economy</Pill>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
              Where Digital Identity Meets{" "}
              <span className="text-gradient-primary">Tokenized Finance</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              PeopleBrowsr's battle-proven NFT technology provides the identity, trust, and programmability
              layer for the next generation of tokenized asset markets.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={openContact}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold font-display hover:opacity-90 transition-opacity"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </section>

        {/* ── The Opportunity ───────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-muted/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Pill>The Opportunity</Pill>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                A Trillion-Dollar Trust Gap
              </h2>
              <P>
                Global wholesale tokenized asset markets are projected to unlock tens of billions in annual
                productivity gains. The missing piece isn't the money layer — it's the trust layer.
              </P>
              <div className="mt-8 inline-block glass-card rounded-2xl px-10 py-8">
                <p className="text-5xl md:text-6xl font-bold font-display text-gradient-primary mb-2">$24B+</p>
                <p className="text-sm text-muted-foreground">Projected annual digital finance opportunity</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Three Technical Gaps ──────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Pill>Technical Foundations</Pill>
              <h2 className="text-3xl md:text-4xl font-bold font-display">
                Three Technical Gaps We Solve
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {gapCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  className={`glass-card rounded-2xl p-7 border-l-4 ${card.accent} flex flex-col`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-5`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold font-display text-foreground mb-3">{card.title}</h3>
                  <P>{card.intro}</P>
                  <P>{card.body}</P>
                  <ul className="mt-auto space-y-2 pt-2 border-t border-border/30">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-primary mt-0.5">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Regulatory Readiness ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-muted/10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Pill><Star className="w-3 h-3" /> Regulatory Readiness</Pill>
              <h2 className="text-3xl md:text-4xl font-bold font-display">
                Institutional-Grade Compliance
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-5">
              {complianceCards.map((c, i) => (
                <motion.div
                  key={c.title}
                  className="glass-card rounded-2xl p-6 text-center flex flex-col items-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                >
                  <h3 className="text-base font-bold font-display text-secondary mb-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Platform ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Pill>The Platform</Pill>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Built on 15+ Years of Infrastructure
              </h2>
              <p className="text-base text-muted-foreground max-w-xl mx-auto">
                Battle-proven identity, social, and digital asset infrastructure — now purpose-built for tokenized finance.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {platformCards.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="glass-card rounded-xl p-5 hover:border-primary/40 transition-colors group"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                >
                  <p className="text-sm font-bold font-display text-primary mb-1 group-hover:text-primary/90 transition-colors">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────────── */}
        <section id="contact" className="py-24 px-6 bg-muted/10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Pill>Get in Touch</Pill>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-5">
                Partner With Us
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Whether you're a financial institution exploring tokenized assets, a regulator shaping
                digital finance policy, or a technology provider building market infrastructure — we'd like
                to talk.
              </p>
              <button
                onClick={openContact}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold font-display hover:opacity-90 transition-opacity"
              >
                Start a Conversation
              </button>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
