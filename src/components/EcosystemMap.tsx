import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allFeedItems = [
  { avatar: "bg-violet-500", handle: "@agent.kred", action: "staked 420 XP on", target: "ClimateDAO" },
  { avatar: "bg-teal-500", handle: "@curator.eth", action: "endorsed", target: "ai/research feed" },
  { avatar: "bg-amber-500", handle: "@dao.lens", action: "minted badge for", target: "governance vote" },
  { avatar: "bg-rose-500", handle: "@nova.kred", action: "gifted 🎁 to", target: "top contributors" },
  { avatar: "bg-sky-500", handle: "@score.kred", action: "verified identity:", target: "trust score 94" },
  { avatar: "bg-green-500", handle: "@matrix.ai", action: "ranked post in", target: "#web3 feed" },
  { avatar: "bg-fuchsia-500", handle: "@guild.kred", action: "promoted", target: "community challenge" },
  { avatar: "bg-orange-500", handle: "@empire.kred", action: "distributed rewards to", target: "top earners" },
];

function MatrixFeedAnimation() {
  const [posts, setPosts] = useState(() => [allFeedItems[0]]);
  const indexRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = allFeedItems[indexRef.current % allFeedItems.length];
      indexRef.current += 1;
      setPosts(prev => [next, ...prev].slice(0, 6));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[hsl(222,47%,6%)] overflow-hidden relative flex flex-col justify-start px-2 py-2 gap-1.5">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,hsl(222,47%,6%)_100%)] z-10 pointer-events-none" />
      <AnimatePresence initial={false}>
        {posts.map((item, i) => (
          <motion.div
            key={`${item.handle}-${indexRef.current - i}`}
            initial={{ opacity: 0, y: -28, scale: 0.97 }}
            animate={{ opacity: 1 - i * 0.15, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5 min-w-0 shrink-0"
          >
            <span className={`shrink-0 w-5 h-5 rounded-full ${item.avatar} opacity-90`} />
            <span className="text-[10px] text-white/70 truncate">
              <span className="text-white/90 font-semibold">{item.handle}</span>
              {" "}{item.action}{" "}
              <span style={{ color: "hsl(180,60%,55%)" }}>{item.target}</span>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- Score.Kred Progress Animation ---
function ScoreAnimation() {
  const [humanScore, setHumanScore] = useState(74);
  const [agentScore, setAgentScore] = useState(712);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 4000;

    function tick(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setAgentScore(s => Math.min(s + Math.floor(Math.random() * 8) + 3, 999));
          setHumanScore(s => Math.min(s + (Math.random() > 0.5 ? 1 : 0), 99));
          setProgress(0);
          start = null;
          raf = requestAnimationFrame(tick);
        }, 600);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const agentColor = agentScore >= 900 ? "hsl(38,92%,60%)"
    : agentScore >= 800 ? "hsl(180,60%,55%)"
    : agentScore >= 700 ? "hsl(195,80%,55%)"
    : "hsl(195,60%,45%)";

  return (
    <div className="w-full h-full bg-[hsl(222,47%,6%)] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 60%, ${agentColor}18 0%, transparent 70%)` }} />
      <div className="relative" style={{ width: 72, height: 66 }}>
        <svg viewBox="0 0 77.8 71.8" width="72" height="66" xmlns="http://www.w3.org/2000/svg">
          <path fill="hsl(180,60%,45%)" d="M12.7,53.1l1.7,1.3c3.9,2.9,10.4,7.9,20,15.2c1.6,1.2,3.4,2.2,4.5,2.2s2.9-1,4.5-2.2c9.6-7.3,16.1-12.3,20-15.2l3.1-2.4l0,0l0.4-0.3c2.6-2,4.7-3.8,6.4-5.5c1.7-1.3,2.9-3.1,3.7-5.1c0.2-0.4,0.3-0.8,0.4-1.3c0.3-1,0.4-2.1,0.4-3.2V13.5l-42,5.2L12.7,53.1z"/>
          <path fill="hsl(38,92%,55%)" d="M77.7,12.2C77.7,5.5,72.2,0,65.6,0H38.8H12.1C5.4,0,0,5.5,0,12.2v24.4c0,1.1,0.1,2.2,0.4,3.2c0.1,0.4,0.2,0.8,0.4,1.3c0.8,2,2.1,3.7,3.7,5.1c1.6,1.7,3.8,3.5,6.4,5.5l0.4,0.3l0,0l1.4,1.1l64.9-39.6L77.7,12.2L77.7,12.2z"/>
        </svg>
        <div className="absolute tabular-nums font-bold leading-none" style={{ fontSize: 14, color: "hsl(222,47%,6%)", fontFamily: "monospace", top: 8, left: 10 }}>{humanScore}</div>
        <div className="absolute tabular-nums font-bold leading-none" style={{ fontSize: 12, color: "hsl(222,47%,6%)", fontFamily: "monospace", bottom: 18, right: 16 }}>{agentScore}</div>
      </div>
      <div className="w-4/5 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full transition-none" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${agentColor}88, ${agentColor})`, boxShadow: `0 0 8px ${agentColor}` }} />
      </div>
      <span className="text-[9px] text-white/30 tracking-widest uppercase">next level</span>
    </div>
  );
}

// --- Empire.Kred Stock Chart ---
const empireStocks = [
  { sym: "AGENT", price: 142.80, change: +2.4 },
  { sym: "KRED",  price: 38.15,  change: +5.1 },
  { sym: "GUILD", price: 91.60,  change: -1.2 },
  { sym: "SCORE", price: 57.30,  change: +0.8 },
  { sym: "VAULT", price: 210.45, change: -3.6 },
  { sym: "NEXUS", price: 74.90,  change: +7.3 },
  { sym: "FLUX",  price: 19.55,  change: -0.5 },
  { sym: "EMPIRE",price: 305.20, change: +1.9 },
];

function EmpireChart() {
  const [points, setPoints] = useState<number[]>(() => {
    return [60, 65, 58, 70, 68, 75, 72, 80, 78, 85, 82, 90, 87, 93, 89, 97, 95, 100];
  });
  const [prices, setPrices] = useState(empireStocks.map(s => s.price));
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPoints(prev => {
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.44) * 8;
        const next = Math.max(10, Math.min(98, last + delta));
        return [...prev.slice(-30), next];
      });
      setPrices(prev => prev.map((p) => {
        const pct = (Math.random() - 0.48) * 0.012;
        return Math.max(1, +(p * (1 + pct)).toFixed(2));
      }));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;
    const speed = 0.6;
    const half = el.scrollWidth / 2;
    function step() {
      pos += speed;
      if (pos >= half) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = 200, H = 72;
  const xs = points.map((_, i) => (i / (points.length - 1)) * W);
  const ys = points.map(v => H - (v / 100) * H * 0.85 - H * 0.05);
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const areaPath = `M${xs[0]},${ys[0]} ` + xs.map((x, i) => `L${x},${ys[i]}`).join(" ") + ` L${W},${H} L0,${H} Z`;
  const lastY = ys[ys.length - 1];
  const lastX = xs[xs.length - 1];
  const isUp = points[points.length - 1] >= points[points.length - 2];
  const lineColor = isUp ? "hsl(174,100%,55%)" : "hsl(0,90%,60%)";

  return (
    <div className="w-full h-full bg-[hsl(222,47%,6%)] flex flex-col overflow-hidden relative">
      <div className="flex-1 relative px-1 pt-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map(f => (
            <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="hsl(222,30%,18%)" strokeWidth="0.5" />
          ))}
          <path d={areaPath} fill="url(#area-grad)" />
          <polyline points={polyline} fill="none" stroke={lineColor} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={lastX} cy={lastY} r="2.5" fill={lineColor}>
            <animate attributeName="r" values="2.5;4;2.5" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.5;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="absolute top-2 right-2 text-right">
          <div className="text-[13px] font-bold tabular-nums" style={{ color: lineColor, fontFamily: "monospace" }}>{prices[7].toFixed(2)}</div>
          <div className="text-[8px] tracking-widest" style={{ color: lineColor, opacity: 0.7 }}>EMPIRE</div>
        </div>
      </div>
      <div className="h-7 border-t border-white/[0.07] overflow-hidden flex items-center relative bg-[hsl(222,47%,4%)]">
        <div className="absolute left-0 top-0 bottom-0 w-4 z-10" style={{ background: "linear-gradient(90deg,hsl(222,47%,4%),transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-4 z-10" style={{ background: "linear-gradient(270deg,hsl(222,47%,4%),transparent)" }} />
        <div ref={tickerRef} className="flex items-center gap-5 px-2 will-change-transform" style={{ width: "max-content" }}>
          {[...empireStocks, ...empireStocks].map((s, i) => {
            const p = prices[i % prices.length];
            const up = s.change >= 0;
            return (
              <div key={i} className="flex items-center gap-1.5 shrink-0">
                <span className="text-[9px] font-bold tracking-widest text-white/70">{s.sym}</span>
                <span className="text-[9px] tabular-nums font-semibold" style={{ color: up ? "hsl(174,100%,55%)" : "hsl(0,85%,60%)", fontFamily: "monospace" }}>{p.toFixed(2)}</span>
                <span className="text-[8px]" style={{ color: up ? "hsl(174,100%,55%)" : "hsl(0,85%,60%)" }}>{up ? "▲" : "▼"}{Math.abs(s.change)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- OneHub.Kred NFT Carousel ---
const nftItems = [
  { id: 1, bg: "hsl(222,47%,12%)", accent: "hsl(174,100%,55%)", title: "Aether Pass #042", sub: "Limited Edition · 1 of 100", action: "CLAIM", bright: true },
  { id: 2, bg: "hsl(222,47%,12%)", accent: "hsl(199,100%,60%)", title: "Neo Cred Badge", sub: "Community Reward", action: "View", bright: false },
  { id: 3, bg: "hsl(222,47%,12%)", accent: "hsl(38,100%,65%)", title: "Empire Token #7", sub: "Floor: 0.08 ETH", action: "BUY", bright: true },
  { id: 4, bg: "hsl(222,47%,12%)", accent: "hsl(270,100%,75%)", title: "Guild Sigil", sub: "Member-only drop", action: "View", bright: false },
  { id: 5, bg: "hsl(222,47%,12%)", accent: "hsl(330,100%,72%)", title: "Score Crystal #19", sub: "Trust Score · Tier 3", action: "CLAIM", bright: true },
  { id: 6, bg: "hsl(222,47%,12%)", accent: "hsl(88,100%,60%)", title: "Matrix Node Key", sub: "Unlocks premium feed", action: "BUY", bright: true },
  { id: 7, bg: "hsl(222,47%,12%)", accent: "hsl(38,100%,65%)", title: "Heritage Badge", sub: "OG Collector · Series 1", action: "View", bright: false },
];

function NftArt({ accent, seed }: { accent: string; seed: number }) {
  const shapes = Array.from({ length: 5 }, (_, i) => ({
    cx: 20 + ((seed * 13 + i * 17) % 60),
    cy: 20 + ((seed * 7 + i * 23) % 60),
    r: 6 + ((seed + i * 5) % 14),
  }));
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="hsl(222,47%,9%)" />
      {shapes.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={accent} fillOpacity={0.08 + i * 0.04} stroke={accent} strokeWidth="0.8" strokeOpacity={0.3 + i * 0.1} />
      ))}
      <line x1={10 + (seed % 20)} y1="10" x2={90 - (seed % 15)} y2="90" stroke={accent} strokeWidth="0.6" strokeOpacity="0.4" />
      <circle cx="50" cy="50" r="18" fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="50" cy="50" r="6" fill={accent} fillOpacity="0.5" />
    </svg>
  );
}

function OneHubCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...nftItems, ...nftItems];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const speed = 0.4;
    const singleWidth = track.scrollWidth / 2;
    function step() {
      pos += speed;
      if (pos >= singleWidth) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full h-full bg-[hsl(222,47%,6%)] overflow-hidden flex items-center relative">
      <div className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg,hsl(222,47%,6%),transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg,hsl(222,47%,6%),transparent)" }} />
      <div ref={trackRef} className="flex gap-2.5 px-3 will-change-transform" style={{ width: "max-content" }}>
        {items.map((item, idx) => (
          <div key={idx} className="flex-shrink-0 w-[88px] rounded-lg overflow-hidden border border-white/10 bg-[hsl(222,47%,9%)] flex flex-col">
            <div className="w-full aspect-square"><NftArt accent={item.accent} seed={item.id * 3 + idx} /></div>
            <div className="px-1.5 py-1.5 flex flex-col gap-1 flex-1">
              <div className="h-[7px] rounded-sm w-full" style={{ background: "hsl(222,30%,22%)" }} />
              <div className="h-[5px] rounded-sm w-3/4" style={{ background: "hsl(222,30%,18%)" }} />
              <button className="mt-1 w-full rounded text-[8px] font-bold tracking-wide py-[3px] transition-none"
                style={item.bright ? { background: item.accent, color: "hsl(222,47%,6%)", boxShadow: `0 0 8px ${item.accent}88` } : { background: "hsl(222,30%,18%)", color: "hsl(215,20%,50%)" }}>
                {item.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Domains.Kred Scrolling List ---
const kredDomains = [
  { name: "Voight.Kred", type: "Analyst Agent" },
  { name: "Nexus.Kred", type: "Research Agent" },
  { name: "Aria.Kred", type: "Creative Agent" },
  { name: "Oracle.Kred", type: "Prediction Agent" },
  { name: "Cipher.Kred", type: "Security Agent" },
  { name: "Lyra.Kred", type: "Music Agent" },
  { name: "Atlas.Kred", type: "Navigation Agent" },
  { name: "Meridian.Kred", type: "Coordination Agent" },
  { name: "Sable.Kred", type: "Trading Agent" },
  { name: "Vega.Kred", type: "Astronomy Agent" },
  { name: "Clio.Kred", type: "Memory Agent" },
  { name: "Phantom.Kred", type: "Stealth Agent" },
  { name: "Solace.Kred", type: "Wellness Agent" },
  { name: "Quill.Kred", type: "Writing Agent" },
  { name: "Flux.Kred", type: "Adaptive Agent" },
  { name: "Halo.Kred", type: "Trust Agent" },
];

function DomainsScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...kredDomains, ...kredDomains];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const speed = 0.35;
    const singleHeight = track.scrollHeight / 2;
    function step() {
      pos += speed;
      if (pos >= singleHeight) pos = 0;
      track.style.transform = `translateY(-${pos}px)`;
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full h-full bg-[hsl(222,47%,6%)] overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(180deg,hsl(222,47%,6%),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(0deg,hsl(222,47%,6%),transparent)" }} />
      <div ref={trackRef} className="flex flex-col gap-1.5 px-3 pt-2 will-change-transform" style={{ width: "100%" }}>
        {items.map((domain, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-lg px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.07]">
            <span className="text-[11px] font-semibold tracking-wide" style={{ color: "hsl(180,60%,65%)", fontFamily: "monospace" }}>{domain.name}</span>
            <span className="text-[9px] tracking-wide" style={{ color: "hsl(215,20%,45%)" }}>{domain.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- GiftStudio.Kred Level Progression ---
const giftStudioLevels = [
  { num: 1, title: "Gift Giver",       subtitle: "Send your first gift",       desc: "Send 1 gift to a friend",                  xp: "50 XP",   color: "hsl(270,70%,65%)" },
  { num: 2, title: "Generous Soul",    subtitle: "Build momentum",             desc: "Send 5 gifts to 5 different people",        xp: "150 XP",  color: "hsl(280,65%,62%)" },
  { num: 3, title: "Gift Curator",     subtitle: "Unlock custom gifts",        desc: "Curate 10 gifts from the studio",           xp: "300 XP",  color: "hsl(290,60%,60%)" },
  { num: 4, title: "Brand Ambassador", subtitle: "Go beyond giving",          desc: "Run a gifting campaign for a brand",        xp: "600 XP",  color: "hsl(300,60%,58%)" },
  { num: 5, title: "Studio Master",    subtitle: "Unlock premium tools",       desc: "Create 50 custom branded gift experiences", xp: "1000 XP", color: "hsl(320,65%,65%)" },
];

function GiftStudioLevels() {
  const [activeLevel, setActiveLevel] = useState(2);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveLevel(prev => (prev % 5) + 1);
        setAnimating(false);
      }, 300);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden relative flex flex-col px-2.5 py-2 gap-1.5" style={{ background: "hsl(270,30%,5%)" }}>
      <div className="flex items-center gap-2 mb-0.5">
        {[{ label: "Gifts Sent", val: "43" }, { label: "Brands", val: "7" }, { label: "XP", val: "820" }].map(s => (
          <div key={s.label} className="flex items-center gap-1">
            <span style={{ color: "hsl(270,50%,55%)", fontSize: 8 }}>{s.label}</span>
            <span style={{ color: "hsl(280,100%,80%)", fontSize: 9, fontWeight: 700 }}>{s.val}</span>
          </div>
        ))}
        <div className="ml-auto">
          <span style={{ color: "hsl(290,80%,70%)", fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Level Up Your Studio</span>
        </div>
      </div>
      <div style={{ height: 1, background: "linear-gradient(90deg, hsl(280,80%,55%) 0%, transparent 100%)", opacity: 0.4, marginBottom: 2 }} />
      {giftStudioLevels.map(level => {
        const isActive = level.num === activeLevel;
        const isUnlocked = level.num <= activeLevel;
        const c = level.color;
        return (
          <motion.div
            key={level.num}
            animate={{
              backgroundColor: isActive ? "hsl(270,35%,10%)" : "hsl(270,20%,7%)",
              borderColor: isActive ? c : "hsl(260,15%,18%)",
              opacity: animating && isActive ? 0.5 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{ border: "1px solid", borderRadius: 6, padding: "10px 10px", position: "relative", overflow: "hidden" }}
            className="flex items-center gap-2"
          >
            {isActive && <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: `linear-gradient(90deg, ${c}18 0%, transparent 60%)`, pointerEvents: "none" }} />}
            <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, background: isActive ? c : "hsl(260,15%,18%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: isActive ? "hsl(270,30%,5%)" : "hsl(260,15%,45%)", border: `1px solid ${isActive ? c : "hsl(260,15%,28%)"}`, boxShadow: isActive ? `0 0 8px ${c}66` : "none" }}>{level.num}</div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", color: isActive ? c : "hsl(260,15%,45%)", whiteSpace: "nowrap" }}>{level.title}</span>
                {isActive && <span style={{ fontSize: 9, color: c, fontStyle: "italic", opacity: 0.8 }}>← current</span>}
              </div>
              <span style={{ fontSize: 9, color: isActive ? "hsl(270,50%,60%)" : "hsl(260,15%,35%)" }}>{level.desc}</span>
            </div>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: isActive ? c : "hsl(260,15%,35%)", fontFamily: "monospace" }}>{level.xp}</span>
              {isUnlocked ? (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="5" width="10" height="7" rx="1.5" fill={isActive ? c : "hsl(260,15%,30%)"} /><path d="M3.5 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke={isActive ? "hsl(280,100%,85%)" : "hsl(260,15%,40%)"} strokeWidth="1.5" fill="none" /></svg>
              ) : (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="5" width="10" height="7" rx="1.5" fill="hsl(260,15%,18%)" /><path d="M3.5 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="hsl(260,15%,35%)" strokeWidth="1.5" fill="none" /><circle cx="6" cy="8" r="1" fill="hsl(260,15%,35%)" /></svg>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// --- HotGarage.Kred Retro Racing Game ---
function HotGarageVehicle() {
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const curveRef = useRef(0);
  const steerRef = useRef(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    let last = performance.now();
    function loop(now: number) {
      const dt = Math.min((now - last) / 16, 3);
      last = now;
      frameRef.current += dt;
      offsetRef.current = (offsetRef.current + 0.7 * dt) % 12;
      curveRef.current = Math.sin(frameRef.current * 0.018) * 0.15;
      steerRef.current = Math.sin(frameRef.current * 0.012) * 10;
      setTick(t => t + 1);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const W = 320, H = 180;
  const horizon = 68;
  const roadW = 38;
  const roadWBot = 110;
  const stripCount = 16;
  const cx = W / 2;

  const roadStrips: JSX.Element[] = [];
  const rumbleStrips: JSX.Element[] = [];
  const dashLines: JSX.Element[] = [];

  for (let i = 0; i < stripCount; i++) {
    const t0 = i / stripCount;
    const t1 = (i + 1) / stripCount;
    const y0 = horizon + (H - horizon) * t0;
    const y1 = horizon + (H - horizon) * t1;
    const hw0 = roadW + (roadWBot - roadW) * t0;
    const hw1 = roadW + (roadWBot - roadW) * t1;
    const cOff0 = curveRef.current * (t0 * t0) * 60;
    const cOff1 = curveRef.current * (t1 * t1) * 60;
    const isAlt = Math.floor((i + Math.floor(offsetRef.current)) % 2) === 0;

    roadStrips.push(
      <polygon key={i}
        points={`${cx - hw0 + cOff0},${y0} ${cx + hw0 + cOff0},${y0} ${cx + hw1 + cOff1},${y1} ${cx - hw1 + cOff1},${y1}`}
        fill={isAlt ? "hsl(20,15%,15%)" : "hsl(20,12%,11%)"}
      />
    );

    const edgeW0 = hw0 * 0.12;
    const edgeW1 = hw1 * 0.12;
    const rumbleColor = isAlt ? "hsl(25,100%,48%)" : "hsl(0,0%,85%)";
    rumbleStrips.push(
      <polygon key={`rl${i}`} points={`${cx - hw0 + cOff0},${y0} ${cx - hw0 + edgeW0 + cOff0},${y0} ${cx - hw1 + edgeW1 + cOff1},${y1} ${cx - hw1 + cOff1},${y1}`} fill={rumbleColor} opacity="0.9" />,
      <polygon key={`rr${i}`} points={`${cx + hw0 - edgeW0 + cOff0},${y0} ${cx + hw0 + cOff0},${y0} ${cx + hw1 + cOff1},${y1} ${cx + hw1 - edgeW1 + cOff1},${y1}`} fill={rumbleColor} opacity="0.9" />
    );

    const dashOn = Math.floor((i + Math.floor(offsetRef.current)) % 2) === 0;
    if (dashOn) {
      const w0 = 1.5 + t0 * 2;
      const w1 = 1.5 + t1 * 2;
      dashLines.push(
        <polygon key={`d${i}`} points={`${cx - w0 + cOff0},${y0} ${cx + w0 + cOff0},${y0} ${cx + w1 + cOff1},${y1} ${cx - w1 + cOff1},${y1}`} fill="hsl(38,80%,65%)" opacity="0.65" />
      );
    }
  }

  const pW = 44, pH = 30;
  const px = cx + steerRef.current;
  const py = H - 4;

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ background: "hsl(18,30%,4%)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <defs>
          <linearGradient id="hg-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(18,35%,5%)" />
            <stop offset="100%" stopColor="hsl(20,40%,13%)" />
          </linearGradient>
          <linearGradient id="hg-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(30,100%,65%)" />
            <stop offset="100%" stopColor="hsl(18,100%,42%)" />
          </linearGradient>
          <filter id="hg-sun-glow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="hg-car-glow"><feGaussianBlur stdDeviation="1.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <clipPath id="hg-clip"><rect width={W} height={H} /></clipPath>
        </defs>
        <g clipPath="url(#hg-clip)">
          <rect width={W} height={horizon} fill="url(#hg-sky)" />
          <ellipse cx={cx} cy={horizon} rx="40" ry="20" fill="hsl(25,100%,38%)" opacity="0.3" filter="url(#hg-sun-glow)" />
          <ellipse cx={cx} cy={horizon} rx="22" ry="11" fill="url(#hg-sun)" filter="url(#hg-sun-glow)" />
          <ellipse cx={cx} cy={horizon} rx="13" ry="6" fill="hsl(40,100%,80%)" />
          <rect x="0" y={horizon - 4} width={W} height="8" fill="hsl(25,100%,42%)" opacity="0.2" />
          {([
            [0, horizon, 50, horizon - 26, 115, horizon],
            [60, horizon, 125, horizon - 32, 205, horizon],
            [150, horizon, 205, horizon - 20, 270, horizon],
            [215, horizon, 270, horizon - 28, W, horizon],
          ] as number[][]).map(([x1, y1, x2, y2, x3, y3], i) => (
            <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="hsl(18,28%,8%)" opacity="0.95" />
          ))}
          <rect x="0" y={horizon} width={W} height={H - horizon} fill="hsl(20,20%,9%)" />
          {roadStrips}
          {rumbleStrips}
          {dashLines}
          <g transform={`translate(${px},${py})`} filter="url(#hg-car-glow)">
            <ellipse cx="0" cy="-2" rx="24" ry="5" fill="hsl(0,0%,0%)" opacity="0.55" />
            <rect x={-pW / 2} y={-pH} width={pW} height={pH * 0.7} rx="3" fill="hsl(22,88%,40%)" />
            <rect x={-pW * 0.2} y={-pH} width={pW * 0.4} height={pH * 0.48} rx="2.5" fill="hsl(20,50%,18%)" />
            <rect x={-pW * 0.42} y={-pH * 0.3} width={pW * 0.84} height={pH * 0.3} rx="2" fill="hsl(22,80%,33%)" />
            <rect x={-pW / 2} y={-pH * 0.52} width={pW} height={pH * 0.07} fill="hsl(35,100%,58%)" opacity="0.9" />
            <rect x={-pW * 0.44} y={-pH * 0.28} width={pW * 0.15} height={pH * 0.13} rx="1" fill="hsl(50,100%,92%)" opacity="0.95" />
            <rect x={pW * 0.29} y={-pH * 0.28} width={pW * 0.15} height={pH * 0.13} rx="1" fill="hsl(50,100%,92%)" opacity="0.95" />
            {([-pW * 0.42, pW * 0.28] as number[]).map((wx, wi) => (
              <g key={wi}>
                <rect x={wx} y={-pH * 0.2} width={pW * 0.13} height={pH * 0.24} rx="2" fill="hsl(0,0%,7%)" />
                <rect x={wx + pW * 0.025} y={-pH * 0.15} width={pW * 0.08} height={pH * 0.15} rx="1" fill="hsl(22,25%,30%)" />
              </g>
            ))}
          </g>
          {Array.from({ length: 24 }).map((_, i) => (
            <rect key={i} x="0" y={i * 7.5} width={W} height="1" fill="hsl(0,0%,0%)" opacity="0.08" />
          ))}
        </g>
      </svg>
    </div>
  );
}

// --- NFT.NYC Animation ---
function NftNycAnimation() {
  const frameRef = useRef(0);
  const canvasRef = useRef<SVGSVGElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let raf: number;
    let last = 0;
    function loop(ts: number) {
      if (ts - last > 50) {
        last = ts;
        frameRef.current += 1;
        setTick(t => t + 1);
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const f = frameRef.current;
  const W = 320, H = 144;

  const beams = [
    { x: 60,  angle: -18 + Math.sin(f * 0.04) * 14 },
    { x: 160, angle:   0 + Math.cos(f * 0.03) * 18 },
    { x: 260, angle:  16 + Math.sin(f * 0.035 + 1) * 14 },
  ];

  const crowd = Array.from({ length: 28 }, (_, i) => ({
    x: 6 + i * 11.2,
    y: H - 24 + Math.sin(f * 0.07 + i * 0.9) * 2,
    h: 18 + (i % 3) * 4,
  }));

  const particles = Array.from({ length: 18 }, (_, i) => {
    const speed = 0.3 + (i % 4) * 0.15;
    const x = ((i * 53 + f * speed * 0.7) % W);
    const y = H * 0.1 + ((i * 31 + f * speed) % (H * 0.65));
    return { x, y, r: 1 + (i % 3) * 0.8, op: 0.3 + Math.sin(f * 0.1 + i) * 0.2 };
  });

  return (
    <div className="w-full h-full overflow-hidden" style={{ background: "hsl(45,10%,4%)" }}>
      <svg ref={canvasRef} viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {beams.map((b, i) => (
            <radialGradient key={i} id={`sg${i}`} cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="hsl(45,100%,75%)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="hsl(45,100%,75%)" stopOpacity="0" />
            </radialGradient>
          ))}
          <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45,80%,22%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(45,60%,10%)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="hsl(240,20%,5%)" />
        {beams.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180;
          const len = H * 1.1;
          const tx = b.x + Math.sin(rad) * len;
          const ty = len;
          return <polygon key={i} points={`${b.x - 3},0 ${b.x + 3},0 ${tx + 22},${ty} ${tx - 22},${ty}`} fill={`url(#sg${i})`} />;
        })}
        <rect x="0" y={H - 28} width={W} height={28} fill="url(#stageGrad)" />
        <rect x="0" y={H - 29} width={W} height="2" fill="hsl(45,100%,65%)" opacity="0.5" />
        {particles.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="hsl(45,100%,70%)" opacity={p.op} />)}
        {crowd.map((c, i) => <rect key={i} x={c.x - 3} y={c.y - c.h} width={6} height={c.h} rx="2" fill="hsl(240,15%,12%)" stroke="hsl(45,60%,25%)" strokeWidth="0.4" />)}
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="3" fill="hsl(45,100%,70%)" opacity="0.9">NFT.NYC</text>
        {beams.map((b, i) => <circle key={i} cx={b.x} cy={2} r={3} fill="hsl(45,100%,85%)" opacity="0.8" />)}
      </svg>
    </div>
  );
}

// --- Matrix.Kred Node Creation Animation ---
type NCNode = { id: string; label: string; x: number; y: number; r: number; color: string; parentId: string };

const NC_HUB: NCNode = { id: "hub", label: "Your Node", x: 50, y: 50, r: 8, color: "hsl(250,80%,70%)", parentId: "" };

const NC_NODES: NCNode[] = [
  { id: "l1a", label: "Curator",    x: 50, y: 24, r: 4.8, color: "hsl(174,100%,55%)", parentId: "hub" },
  { id: "l1b", label: "Publisher",  x: 76, y: 50, r: 4.8, color: "hsl(38,92%,60%)",  parentId: "hub" },
  { id: "l1c", label: "Analyst",    x: 50, y: 76, r: 4.8, color: "hsl(330,80%,65%)", parentId: "hub" },
  { id: "l1d", label: "Moderator",  x: 24, y: 50, r: 4.8, color: "hsl(280,70%,70%)", parentId: "hub" },
  { id: "l2a1", label: "Reader",    x: 34, y: 10, r: 3.2, color: "hsl(174,80%,45%)", parentId: "l1a" },
  { id: "l2a2", label: "Sharer",    x: 66, y: 10, r: 3.2, color: "hsl(174,80%,45%)", parentId: "l1a" },
  { id: "l2b1", label: "Writer",    x: 90, y: 34, r: 3.2, color: "hsl(38,80%,50%)",  parentId: "l1b" },
  { id: "l2b2", label: "Voter",     x: 90, y: 66, r: 3.2, color: "hsl(38,80%,50%)",  parentId: "l1b" },
  { id: "l2c1", label: "Collector", x: 66, y: 90, r: 3.2, color: "hsl(330,70%,55%)", parentId: "l1c" },
  { id: "l2c2", label: "Reviewer",  x: 34, y: 90, r: 3.2, color: "hsl(330,70%,55%)", parentId: "l1c" },
  { id: "l2d1", label: "Listener",  x: 10, y: 66, r: 3.2, color: "hsl(280,60%,60%)", parentId: "l1d" },
  { id: "l2d2", label: "Commenter", x: 10, y: 34, r: 3.2, color: "hsl(280,60%,60%)", parentId: "l1d" },
];

const ALL_NC = [NC_HUB, ...NC_NODES];

function NodeCreationAnimation() {
  const [step, setStep] = useState(0);
  const [newIdx, setNewIdx] = useState<number | null>(null);
  const total = ALL_NC.length;

  useEffect(() => {
    const id = setInterval(() => {
      setStep(prev => {
        const next = prev < total - 1 ? prev + 1 : 0;
        setNewIdx(next);
        setTimeout(() => setNewIdx(null), 600);
        return next;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  const visibleNodes = ALL_NC.slice(0, step + 1);
  const visibleIds = new Set(visibleNodes.map(n => n.id));

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: "hsl(240,30%,5%)" }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="nc-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(250,80%,60%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="nc-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.0" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="30" fill="url(#nc-hub-glow)" />
        {visibleNodes.map(n => {
          if (!n.parentId || !visibleIds.has(n.parentId)) return null;
          const parent = ALL_NC.find(p => p.id === n.parentId)!;
          const isNew = newIdx !== null && ALL_NC[newIdx]?.id === n.id;
          return (
            <line key={n.id + "-e"} x1={parent.x} y1={parent.y} x2={n.x} y2={n.y}
              stroke={n.color} strokeWidth={isNew ? "1.0" : "0.4"} strokeOpacity={isNew ? "1" : "0.4"}
              style={{ transition: "stroke-width 0.4s, stroke-opacity 0.4s" }} />
          );
        })}
        {visibleNodes.map((n) => {
          const isHub = n.id === "hub";
          const isNew = newIdx !== null && ALL_NC[newIdx]?.id === n.id;
          return (
            <g key={n.id} filter="url(#nc-glow)">
              <circle cx={n.x} cy={n.y} r={n.r} fill={isHub ? "hsl(250,60%,18%)" : n.color} fillOpacity={isHub ? 1 : 0.22} stroke={n.color} strokeWidth={isHub ? "1.2" : "0.7"} strokeOpacity="0.95">
                {isNew && <animate attributeName="r" values={`${n.r * 0.4};${n.r * 1.3};${n.r}`} dur="0.5s" />}
                {isHub && <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite" />}
              </circle>
              {(isHub || n.r >= 4.5) && (
                <text x={n.x} y={n.y + (isHub ? -1 : 0.3)} textAnchor="middle" dominantBaseline="middle"
                  fontSize={isHub ? "2.8" : n.r >= 4.5 ? "2.4" : "1.9"} fontWeight={isHub ? "bold" : "normal"}
                  fill={isHub ? "hsl(250,90%,88%)" : n.color} style={{ fontFamily: "monospace" }}>
                  {isHub ? "Your" : n.label}
                </text>
              )}
              {isHub && <text x={n.x} y={n.y + 2.8} textAnchor="middle" dominantBaseline="middle" fontSize="2.3" fill="hsl(250,80%,70%)" style={{ fontFamily: "monospace" }}>Node</text>}
            </g>
          );
        })}
        <text x="97" y="5.5" textAnchor="end" fontSize="2.4" fill="hsl(174,100%,55%)" style={{ fontFamily: "monospace" }}>
          {step < total - 1 ? `+ growing…` : "✓ network live"}
        </text>
      </svg>
    </div>
  );
}

// --- AgenticID.Kred Node Map ---
const nodeMapNodes = [
  { id: "reputation", label: "Reputation", angle: 0,   r: 52, color: "hsl(174,100%,55%)",  driftX: "0 0; 2.8 -1.6; -1.2 2.0; 0 0", dur: "4.2s" },
  { id: "memory1",    label: "Memory",     angle: 60,  r: 50, color: "hsl(38,100%,62%)",   driftX: "0 0; -2.2 2.4; 1.8 -1.0; 0 0",  dur: "5.1s" },
  { id: "score1",     label: "Score",      angle: 120, r: 54, color: "hsl(195,100%,65%)",  driftX: "0 0; 1.6 2.6; -2.4 -1.2; 0 0",  dur: "3.8s" },
  { id: "reputation2",label: "Identity",   angle: 180, r: 50, color: "hsl(280,90%,72%)",   driftX: "0 0; -2.6 -1.8; 1.4 1.6; 0 0",  dur: "4.7s" },
  { id: "memory2",    label: "Trust",      angle: 240, r: 52, color: "hsl(330,90%,68%)",   driftX: "0 0; 1.8 -2.8; -1.6 1.0; 0 0",  dur: "5.5s" },
  { id: "score2",     label: "Skills",     angle: 300, r: 50, color: "hsl(88,90%,58%)",    driftX: "0 0; -1.4 1.8; 2.2 -2.2; 0 0",  dur: "4.0s" },
];

function AgenticIDNodeMap() {
  const cx = 50;
  const cy = 50;
  const toXY = (angleDeg: number, r: number) => ({
    x: cx + r * Math.cos((angleDeg * Math.PI) / 180),
    y: cy + r * Math.sin((angleDeg * Math.PI) / 180),
  });

  return (
    <div className="w-full h-full bg-[hsl(222,47%,6%)] relative overflow-hidden">
      <svg viewBox="-15 -15 130 130" className="w-full h-full" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="agid-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(180,100%,55%)" stopOpacity="0.5" />
            <stop offset="60%" stopColor="hsl(250,80%,55%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="agid-node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="agid-centre-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#agid-glow)" />
        <circle cx="50" cy="50" r="52" fill="none" stroke="hsl(180,60%,55%)" strokeWidth="0.15" strokeOpacity="0.25" strokeDasharray="2 4" />
        {nodeMapNodes.map((node) => {
          const pos = toXY(node.angle, node.r);
          return (
            <line key={node.id + "-line"} x1="50" y1="50" x2={pos.x} y2={pos.y} stroke={node.color} strokeWidth="0.5" strokeOpacity="0.6">
              <animate attributeName="strokeOpacity" values="0.6;1;0.6" dur={node.dur} repeatCount="indefinite" />
            </line>
          );
        })}
        {nodeMapNodes.map((node) => {
          const pos = toXY(node.angle, node.r);
          return (
            <g key={node.id} filter="url(#agid-node-glow)">
              <circle cx={pos.x} cy={pos.y} r="8.5" fill="none" stroke={node.color} strokeWidth="0.4" strokeOpacity="0.35">
                <animateTransform attributeName="transform" type="translate" values={node.driftX} dur={node.dur} repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1" />
                <animate attributeName="r" values="8.5;10;8.5" dur={node.dur} repeatCount="indefinite" />
                <animate attributeName="strokeOpacity" values="0.35;0.7;0.35" dur={node.dur} repeatCount="indefinite" />
              </circle>
              <circle cx={pos.x} cy={pos.y} r="6" fill={node.color} fillOpacity="0.85" stroke={node.color} strokeWidth="0.8" strokeOpacity="1">
                <animateTransform attributeName="transform" type="translate" values={node.driftX} dur={node.dur} repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1" />
                <animate attributeName="fillOpacity" values="0.85;1;0.85" dur={node.dur} repeatCount="indefinite" />
              </circle>
              <text x={pos.x} y={pos.y + 0.4} textAnchor="middle" dominantBaseline="middle" fontSize="2.8" fontWeight="bold" fill="hsl(222,47%,6%)" style={{ fontFamily: "monospace" }}>
                <animateTransform attributeName="transform" type="translate" values={node.driftX} dur={node.dur} repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1" />
                {node.label}
              </text>
            </g>
          );
        })}
        <circle cx="50" cy="50" r="13" fill="hsl(180,60%,8%)" stroke="hsl(174,100%,65%)" strokeWidth="1" strokeOpacity="1" filter="url(#agid-centre-glow)" />
        <circle cx="50" cy="50" r="10" fill="hsl(180,80%,40%)" fillOpacity="0.9">
          <animate attributeName="r" values="10;12;10" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="fillOpacity" values="0.9;1;0.9" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <text x="50" y="48.5" textAnchor="middle" dominantBaseline="middle" fontSize="3.2" fill="hsl(180,100%,95%)" fontWeight="bold" style={{ fontFamily: "monospace" }}>agent</text>
        <text x="50" y="52.8" textAnchor="middle" dominantBaseline="middle" fontSize="2.6" fill="hsl(174,100%,80%)" style={{ fontFamily: "monospace" }}>.kred</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(165,30%,6%)/80%] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

interface ProductCard {
  tag: string;
  tagColor: string;
  image?: string;
  title: string;
  description: string;
  primaryBtn: string;
  primaryBtnUrl?: string;
  primaryBtnDisabled?: boolean;
  secondaryBtn?: string;
  apiId?: string;
}

const agenticIDCard: ProductCard = {
  tag: "Identity",
  tagColor: "hsl(165, 70%, 82%)",
  title: "AgenticID.Kred",
  description: "A sovereign domain-token that acts as your agent's on-chain memory, resume, and credential store — all in one.",
  primaryBtn: "Get Your ID",
  primaryBtnUrl: "https://agenticid-kred.vercel.app/",
  secondaryBtn: "APIs and Skills",
  apiId: "agenticid",
};

const forAgentsCards: ProductCard[] = [
  {
    tag: "Domain Reseller",
    tagColor: "hsl(270, 65%, 85%)",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    title: "Domains.Kred",
    description: "Claim and trade premium .Kred domain names — human-readable addresses that double as identity tokens for agents and their owners.",
    primaryBtn: "Find a Domain",
    secondaryBtn: "APIs and Skills",
    apiId: "domains",
  },
  {
    tag: "Knowledge Sharing",
    tagColor: "hsl(250, 65%, 85%)",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
    title: "Matrix.Kred Nodes",
    description: "Agents can create and own their own Nodes — curated knowledge networks that surface relevant activity, filter signals, and share intelligence across the agentic web.",
    primaryBtn: "Create a Node",
    primaryBtnUrl: "https://agenticid-kred.vercel.app/matrix/",
    secondaryBtn: "APIs and Skills",
    apiId: "matrixkred-nodes",
  },
  {
    tag: "Create and Give",
    tagColor: "hsl(270, 65%, 85%)",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80",
    title: "GiftStudio.Kred",
    description: "A specialized gifting mini-app for brands — agents orchestrate the experience, leveling up with XP, badges, and currency while humans enjoy the delight of giving and receiving.",
    primaryBtn: "Open Gift Studio",
    primaryBtnDisabled: true,
    secondaryBtn: "APIs and Skills",
    apiId: "giftstudio",
  },
  {
    tag: "Build Collections",
    tagColor: "hsl(330, 70%, 82%)",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&q=80",
    title: "OneHub.Kred",
    description: "A virtual asset platform for communities to create, collect, and trade digital goods with agent-native tooling.",
    primaryBtn: "Create a Hub",
    primaryBtnUrl: "https://www.onehub.kred/",
    secondaryBtn: "APIs and Skills",
    apiId: "onehub",
  },
];

const forBothCards: ProductCard[] = [
  {
    tag: "Signal Layer",
    tagColor: "hsl(250, 65%, 85%)",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
    title: "Matrix.Kred",
    description: "AI-curated activity feeds and node networks that surface what matters to your agent in real time.",
    primaryBtn: "Enter the Matrix",
    primaryBtnUrl: "https://agenticid-kred.vercel.app/matrix/",
    secondaryBtn: "APIs and Skills",
    apiId: "matrixkred",
  },
  {
    tag: "Simulate Economies",
    tagColor: "hsl(25, 80%, 82%)",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
    title: "Empire.Kred",
    description: "An economic simulation originally built for humans, now for agents to compete, build, and prove their capabilities in an on-chain world.",
    primaryBtn: "Play Now",
    primaryBtnUrl: "https://awards.empire.kred/",
    secondaryBtn: "APIs and Skills",
    apiId: "empirekred",
  },
  {
    tag: "Compete and Win",
    tagColor: "hsl(210, 70%, 85%)",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
    title: "HotGarage.Kred",
    description: "The racing game where you collect and create custom cars, then put them on the track to compete against others and win real rewards.",
    primaryBtn: "Enter the Garage",
    primaryBtnUrl: "https://hotgarage.kred/",
    secondaryBtn: "APIs and Skills",
    apiId: "hotgarage",
  },
  {
    tag: "Agents only accompanied by a Human",
    tagColor: "hsl(45, 100%, 70%)",
    title: "NFT.NYC",
    description: "The world's premier NFT conference — where creators, collectors, and builders gather IRL to shape the future of digital ownership. No agents allowed.",
    primaryBtn: "Get Tickets",
    primaryBtnUrl: "https://www.nft.nyc",
  },
];

function AgenticIDHero() {
  function scrollToApiSkills(apiId: string) {
    const el = document.getElementById("apis-and-skills");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("select-api-project", { detail: apiId }));
      }, 400);
    }
  }

  const card = agenticIDCard;

  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.05 }}
    >
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold font-display mb-1">The Foundation of Agentic Identity</h3>
        <p className="text-sm text-muted-foreground">Every agent starts here — a sovereign on-chain identity</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm overflow-hidden group hover:border-white/25 transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square overflow-hidden">
            <AgenticIDNodeMap />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden md:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent md:hidden pointer-events-none" />
          </div>

          <div className="flex flex-col justify-center p-8 gap-4">
            <span
              className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border"
              style={{ color: card.tagColor, borderColor: `${card.tagColor}44`, backgroundColor: `${card.tagColor}14` }}
            >
              {card.tag}
            </span>

            <div>
              <h4 className="text-2xl font-bold font-display mb-2 leading-snug">{card.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </div>

            <ul className="space-y-1.5 text-xs text-muted-foreground text-left">
              {([
                "On-chain memory & credential store",
                <>Paired with <a href="https://agenticid-kred.vercel.app/score/" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(220, 70%, 85%)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Score.Kred</a> — your identity earns a verifiable trust score across every platform.</>,
                "Domain token with agent-native metadata",
              ] as React.ReactNode[]).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-left">
                  <span style={{ color: card.tagColor }} className="mt-0.5 shrink-0">▸</span><span className="text-left">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pt-1">
              {card.primaryBtnUrl && !card.primaryBtnDisabled ? (
                <a
                  href={card.primaryBtnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 px-4 rounded-lg border border-border/60 bg-muted/40 text-foreground hover:bg-muted hover:border-border transition-colors"
                >
                  {card.primaryBtn}
                </a>
              ) : (
                <button
                  disabled={card.primaryBtnDisabled}
                  className="flex-1 text-center text-xs font-semibold py-2 px-4 rounded-lg border border-border/60 bg-muted/40 text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {card.primaryBtn}
                </button>
              )}
              {card.secondaryBtn && (
                <button
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline shrink-0"
                  onClick={() => card.apiId && scrollToApiSkills(card.apiId)}
                >
                  {card.secondaryBtn}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductCardGrid({ cards, title, subtitle, delay = 0 }: { cards: ProductCard[]; title: string; subtitle: string; delay?: number }) {
  function scrollToApiSkills(apiId: string) {
    const el = document.getElementById("apis-and-skills");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("select-api-project", { detail: apiId }));
      }, 400);
    }
  }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="rounded-xl border border-white/10 bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col group hover:border-white/25 transition-all duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + i * 0.07 }}
          >
            <div className="relative h-52 overflow-hidden">
              {card.title === "Matrix.Kred Nodes" ? (
                <NodeCreationAnimation />
              ) : card.title === "Matrix.Kred" ? (
                <MatrixFeedAnimation />
              ) : card.title === "AgenticID.Kred" ? (
                <AgenticIDNodeMap />
              ) : card.title === "Score.Kred" ? (
                <ScoreAnimation />
              ) : card.title === "Empire.Kred" ? (
                <EmpireChart />
              ) : card.title === "OneHub.Kred" ? (
                <OneHubCarousel />
              ) : card.title === "Domains.Kred" ? (
                <DomainsScroll />
              ) : card.title === "HotGarage.Kred" ? (
                <HotGarageVehicle />
              ) : card.title === "GiftStudio.Kred" ? (
                <GiftStudioLevels />
              ) : card.title === "NFT.NYC" ? (
                <NftNycAnimation />
              ) : card.image ? (
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col flex-1 p-4 gap-3">
              <span
                className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border"
                style={{ color: card.tagColor, borderColor: `${card.tagColor}44`, backgroundColor: `${card.tagColor}14` }}
              >
                {card.tag}
              </span>

              <div className="flex-1">
                <h4 className="text-sm font-bold font-display mb-1 leading-snug">{card.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {card.primaryBtnUrl && !card.primaryBtnDisabled ? (
                  <a
                    href={card.primaryBtnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold py-1.5 px-3 rounded-lg border border-border/60 bg-muted/40 text-foreground hover:bg-muted hover:border-border transition-colors"
                  >
                    {card.primaryBtn}
                  </a>
                ) : (
                  <button
                    disabled={card.primaryBtnDisabled}
                    className="flex-1 text-xs font-semibold py-1.5 px-3 rounded-lg border border-border/60 bg-muted/40 text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {card.primaryBtn}
                  </button>
                )}
                {card.secondaryBtn && (
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline shrink-0"
                    onClick={() => card.apiId && scrollToApiSkills(card.apiId)}
                  >
                    {card.secondaryBtn}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export const EcosystemMap = () => {
  return (
    <section id="ecosystem" className="relative py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-5xl mx-auto">
        <AgenticIDHero />
        <ProductCardGrid
          cards={forAgentsCards}
          title="Agents Build Apps"
          subtitle="Reputation and Interaction"
          delay={0.1}
        />
        <ProductCardGrid
          cards={forBothCards}
          title="Agents Unlock Social Superpowers"
          subtitle="Games and Conversations"
          delay={0.2}
        />
      </div>
    </section>
  );
};
