import { useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";

// Inject the race-funnel styles scoped to this page
const RACE_FUNNEL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

.rf-page * { box-sizing: border-box; }

.rf-page {
  font-family: 'Inter', sans-serif;
  color: #e2e8f0;
}

.rf-inner { max-width: 1100px; margin: 0 auto; padding: 48px 32px; }

/* HERO */
.rf-hero { text-align: center; padding: 60px 0 40px 0; position: relative; }
.rf-hero::before {
  content: '';
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.rf-hero .rf-flag { font-size: 56px; margin-bottom: 12px; }
.rf-hero h1 { font-family: 'Orbitron', sans-serif; font-size: 44px; font-weight: 900; letter-spacing: -1px; margin-bottom: 8px; }
.rf-hero h1 .rf-grad { background: linear-gradient(135deg, #00e5a0, #00b4d8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.rf-hero .rf-sub { font-size: 17px; color: #94a3b8; max-width: 700px; margin: 0 auto 12px auto; line-height: 1.6; }
.rf-hero .rf-definition { font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: 700; color: #00b4d8; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }
.rf-hero .rf-pills { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.rf-pill { font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 20px; letter-spacing: 0.5px; }
.rf-pill.teal { background: rgba(0,229,160,0.12); color: #00e5a0; border: 1px solid rgba(0,229,160,0.25); }
.rf-pill.orange { background: rgba(255,107,53,0.12); color: #ff6b35; border: 1px solid rgba(255,107,53,0.25); }
.rf-pill.red { background: rgba(239,68,68,0.12); color: #ef4444; border: 1px solid rgba(239,68,68,0.25); }

/* VS */
.rf-vs { display: grid; grid-template-columns: 1fr 48px 1fr; align-items: center; margin: 48px 0; }
.rf-vs-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; }
.rf-vs-box h3 { font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
.rf-vs-box.old { border-color: rgba(239,68,68,0.2); }
.rf-vs-box.old h3 { color: #ef4444; }
.rf-vs-box.new { border-color: rgba(0,229,160,0.2); }
.rf-vs-box.new h3 { color: #00e5a0; }
.rf-vs-box ul { list-style: none; font-size: 13px; line-height: 2.1; padding: 0; margin: 0; }
.rf-vs-box.old li::before { content: "✗  "; color: #ef4444; font-weight: 700; }
.rf-vs-box.new li::before { content: "✓  "; color: #00e5a0; font-weight: 700; }
.rf-vs-arrow { text-align: center; font-size: 28px; color: #334155; }

/* ENGINES */
.rf-engines { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 48px 0; }
.rf-engine { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; text-align: center; position: relative; overflow: hidden; }
.rf-engine::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.rf-engine.curiosity::before { background: linear-gradient(90deg, #00b4d8, #8b5cf6); }
.rf-engine.generosity::before { background: linear-gradient(90deg, #ff6b35, #ec4899); }
.rf-engine .rf-icon { font-size: 36px; margin-bottom: 8px; }
.rf-engine h4 { font-family: 'Orbitron', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 4px; }
.rf-engine .rf-maps { font-size: 11px; color: #00e5a0; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
.rf-engine p { font-size: 13px; color: #94a3b8; line-height: 1.6; }

/* TRACK SECTION */
.rf-track-section { margin: 56px 0; }
.rf-track-header { text-align: center; margin-bottom: 40px; }
.rf-track-header .rf-label { font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 700; color: #00e5a0; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 6px; }
.rf-track-header h2 { font-family: 'Orbitron', sans-serif; font-size: 30px; font-weight: 800; margin-bottom: 6px; }
.rf-track-header .rf-desc { font-size: 14px; color: #64748b; max-width: 500px; margin: 0 auto; }
.rf-track { position: relative; padding: 0; }
.rf-track-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.rf-track-dashes { animation: rfDashFlow 1.5s linear infinite; }
@keyframes rfDashFlow { to { stroke-dashoffset: -40; } }
.rf-track-glow { animation: rfTrackPulse 4s ease-in-out infinite; }
@keyframes rfTrackPulse { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.25; } }
.rf-track-pulse-dot { animation: rfPulseMove 4s ease-in-out infinite; }
@keyframes rfPulseMove {
  0% { offset-distance: 0%; opacity: 0; }
  5% { opacity: 1; }
  90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
.rf-track-zones { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 32px; padding: 20px 0; }
.rf-zone { position: relative; padding: 24px 28px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: grid; grid-template-columns: 1fr 140px; gap: 20px; align-items: center; transition: border-color 0.3s; width: 52%; }
.rf-zone:hover { border-color: rgba(0,229,160,0.3); }
.rf-zone:nth-child(odd) { align-self: flex-start; margin-left: 3%; }
.rf-zone:nth-child(even) { align-self: flex-end; margin-right: 3%; }
.rf-zone-marker { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid; background: #080c14; z-index: 3; }
.rf-zone:nth-child(odd) .rf-zone-marker { right: -36px; left: auto; }
.rf-zone:nth-child(even) .rf-zone-marker { left: -36px; }
.rf-zone:nth-child(1) .rf-zone-marker { border-color: #00e5a0; box-shadow: 0 0 24px rgba(0,229,160,0.4); }
.rf-zone:nth-child(2) .rf-zone-marker { border-color: #8b5cf6; box-shadow: 0 0 24px rgba(139,92,246,0.4); }
.rf-zone:nth-child(3) .rf-zone-marker { border-color: #ffd600; box-shadow: 0 0 24px rgba(255,214,0,0.4); }
.rf-zone:nth-child(4) .rf-zone-marker { border-color: #ec4899; box-shadow: 0 0 24px rgba(236,72,153,0.4); }
.rf-zone:nth-child(5) .rf-zone-marker { border-color: #00b4d8; box-shadow: 0 0 24px rgba(0,180,216,0.4); }
.rf-zone:nth-child(6) .rf-zone-marker { border-color: #ff6b35; box-shadow: 0 0 24px rgba(255,107,53,0.4); }
.rf-zone-body h4 { font-family: 'Orbitron', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 2px; }
.rf-zone-body .rf-zone-name { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.rf-zone:nth-child(1) .rf-zone-name { color: #00e5a0; }
.rf-zone:nth-child(2) .rf-zone-name { color: #8b5cf6; }
.rf-zone:nth-child(3) .rf-zone-name { color: #ffd600; }
.rf-zone:nth-child(4) .rf-zone-name { color: #ec4899; }
.rf-zone:nth-child(5) .rf-zone-name { color: #00b4d8; }
.rf-zone:nth-child(6) .rf-zone-name { color: #ff6b35; }
.rf-zone-body p { font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 8px; }
.rf-zone-tags { display: flex; gap: 5px; flex-wrap: wrap; }
.rf-tag { font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 6px; }
.rf-tag.kred { background: rgba(0,229,160,0.1); color: #00e5a0; border: 1px solid rgba(0,229,160,0.2); }
.rf-tag.h3pack { background: rgba(0,180,216,0.1); color: #00b4d8; border: 1px solid rgba(0,180,216,0.2); }
.rf-zone-metric { text-align: right; }
.rf-zone-metric .rf-val { font-family: 'Orbitron', sans-serif; font-size: 28px; font-weight: 800; color: #fff; }
.rf-zone-metric .rf-lbl { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 1px; }
.rf-zone-metric .rf-meter { margin-top: 6px; height: 5px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; width: 100%; }
.rf-zone-metric .rf-meter-fill { height: 100%; border-radius: 3px; }
.rf-zone:nth-child(1) .rf-meter-fill { width: 0%; background: #00e5a0; }
.rf-zone:nth-child(2) .rf-meter-fill { width: 20%; background: #8b5cf6; }
.rf-zone:nth-child(3) .rf-meter-fill { width: 40%; background: #ffd600; }
.rf-zone:nth-child(4) .rf-meter-fill { width: 60%; background: #ec4899; }
.rf-zone:nth-child(5) .rf-meter-fill { width: 80%; background: #00b4d8; }
.rf-zone:nth-child(6) .rf-meter-fill { width: 95%; background: #ff6b35; }

/* FINISH LINE */
.rf-finish-line { position: relative; margin-top: 16px; padding: 24px 28px; background: linear-gradient(135deg, rgba(0,229,160,0.08), rgba(0,180,216,0.08)); border: 1px solid rgba(0,229,160,0.2); border-radius: 16px; text-align: center; width: 70%; margin-left: auto; margin-right: auto; z-index: 2; }
.rf-finish-line .rf-finish-marker { position: absolute; left: 50%; top: -24px; transform: translateX(-50%); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; border: 3px solid #00e5a0; background: #080c14; box-shadow: 0 0 30px rgba(0,229,160,0.5); z-index: 3; }
.rf-finish-line .rf-finish-metric { font-family: 'Orbitron', sans-serif; font-size: 28px; font-weight: 900; background: linear-gradient(135deg, #00e5a0, #00b4d8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 2px; margin-top: 12px; }
.rf-finish-line p { font-family: 'Orbitron', sans-serif; font-size: 13px; color: #00e5a0; font-weight: 600; letter-spacing: 1px; }
.rf-finish-line .rf-loop-text { font-family: 'Inter', sans-serif; font-size: 12px; color: #64748b; margin-top: 4px; font-style: italic; letter-spacing: 0; }

/* INSIGHT */
.rf-insight { background: linear-gradient(135deg, rgba(0,229,160,0.06), rgba(0,180,216,0.06)); border: 1px solid rgba(0,229,160,0.15); border-radius: 16px; padding: 32px; text-align: center; margin: 48px 0; }
.rf-insight .rf-insight-label { font-family: 'Orbitron', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #00e5a0; margin-bottom: 10px; }
.rf-insight blockquote { font-size: 19px; font-weight: 600; line-height: 1.6; color: #fff; max-width: 640px; margin: 0 auto; }

/* WOM */
.rf-wom { margin: 48px 0; }
.rf-wom h3 { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 20px; }
.rf-wom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.rf-wom-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; }
.rf-wom-card .rf-wl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; }
.rf-wom-card.bad .rf-wl { color: #475569; }
.rf-wom-card.good .rf-wl { color: #00e5a0; }
.rf-wom-card .rf-wq { font-size: 14px; font-weight: 600; font-style: italic; line-height: 1.5; }
.rf-wom-card.bad .rf-wq { color: #334155; text-decoration: line-through; text-decoration-color: #1e293b; }
.rf-wom-card.good .rf-wq { color: #e2e8f0; }

/* ARCH */
.rf-arch { margin: 48px 0; }
.rf-arch h3 { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 6px; }
.rf-arch .rf-arch-sub { font-size: 13px; color: #64748b; margin-bottom: 20px; }
.rf-arch-layers { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; overflow: hidden; }
.rf-arch-row { display: grid; grid-template-columns: 160px 1fr; gap: 16px; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.rf-arch-row:last-child { border-bottom: none; }
.rf-arch-row .rf-layer-name { font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.rf-arch-row .rf-chips { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.rf-chip { font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 6px; }
.rf-chip.lov { background: rgba(168,85,247,0.12); color: #a855f7; border: 1px solid rgba(168,85,247,0.25); }
.rf-chip.tw  { background: rgba(59,130,246,0.12); color: #3b82f6; border: 1px solid rgba(59,130,246,0.25); }
.rf-chip.sg  { background: rgba(0,180,216,0.12); color: #00b4d8; border: 1px solid rgba(0,180,216,0.25); }
.rf-chip.kr  { background: rgba(0,229,160,0.12); color: #00e5a0; border: 1px solid rgba(0,229,160,0.2); }
.rf-chip.ch  { background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25); }
.rf-chip.arr { background: none; border: none; color: #334155; font-size: 14px; padding: 0 2px; }
.rf-chip.desc{ background: none; border: none; color: #64748b; font-size: 11px; padding: 0; }

/* FOOTER NOTE */
.rf-footer-note { text-align: center; padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.05); }
.rf-footer-note .rf-tagline { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 800; background: linear-gradient(135deg, #00e5a0, #00b4d8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 4px; }
.rf-footer-note .rf-credit { font-size: 12px; color: #475569; }

@media (max-width: 700px) {
  .rf-vs { grid-template-columns: 1fr; }
  .rf-vs-arrow { display: none; }
  .rf-engines { grid-template-columns: 1fr; }
  .rf-zone { width: 92%; align-self: center !important; margin: 0 auto !important; }
  .rf-zone-marker { display: none; }
  .rf-finish-line { width: 92%; }
  .rf-wom-grid { grid-template-columns: 1fr; }
  .rf-arch-row { grid-template-columns: 1fr; gap: 8px; }
  .rf-hero h1 { font-size: 28px; }
  .rf-track-header h2 { font-size: 20px; }
}
`;

export default function RaceFunnel() {
  useEffect(() => {
    // Inject styles once
    const id = "rf-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = RACE_FUNNEL_CSS;
      document.head.appendChild(style);
    }

    // Run track layout JS after paint
    const timer = setTimeout(() => {
      const trackEl = document.querySelector<HTMLElement>(".rf-track");
      const zones = document.querySelectorAll<HTMLElement>(".rf-track-zones .rf-zone");
      const finishEl = document.querySelector<HTMLElement>(".rf-finish-line");
      const svgEl = document.querySelector<SVGSVGElement>(".rf-track-svg");
      const checkpointGroup = document.querySelector<SVGGElement>(".rf-checkpoint-glows");

      if (!trackEl || !svgEl || !checkpointGroup || zones.length === 0 || !finishEl) return;

      const totalW = trackEl.offsetWidth;
      const totalH = trackEl.offsetHeight;
      svgEl.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`);

      const points: { x: number; y: number; color: string }[] = [];
      const zoneColors = ["#00e5a0", "#8b5cf6", "#ffd600", "#ec4899", "#00b4d8", "#ff6b35"];

      zones.forEach((z, i) => {
        const rect = z.getBoundingClientRect();
        const trackRect = trackEl.getBoundingClientRect();
        const y = rect.top - trackRect.top + rect.height / 2;
        let x: number;
        if (i % 2 === 0) {
          x = rect.left - trackRect.left + rect.width + 56;
        } else {
          x = rect.left - trackRect.left - 56;
        }
        x = Math.max(80, Math.min(totalW - 80, x));
        points.push({ x, y, color: zoneColors[i] });
      });

      const finishRect = finishEl.getBoundingClientRect();
      const trackRect = trackEl.getBoundingClientRect();
      const finishY = finishRect.top - trackRect.top + finishRect.height / 2;
      points.push({ x: totalW / 2, y: finishY, color: "#00e5a0" });

      const startX = totalW / 2;
      const startY = 0;
      let d = `M ${startX},${startY}`;
      const first = points[0];
      const midY0 = (startY + first.y) / 2;
      d += ` C ${startX},${midY0} ${first.x},${midY0} ${first.x},${first.y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const pt = points[i];
        const midY = (prev.y + pt.y) / 2;
        d += ` C ${prev.x},${midY} ${pt.x},${midY} ${pt.x},${pt.y}`;
      }

      document.querySelectorAll(".rf-track-path").forEach((p) => p.setAttribute("d", d));

      const pulseDot = document.querySelector<SVGCircleElement>(".rf-track-pulse-dot");
      const refPath = document.querySelector(".rf-track-path");
      if (refPath && pulseDot) {
        const pathD = refPath.getAttribute("d") || "";
        (pulseDot.style as CSSStyleDeclaration & { offsetPath: string }).offsetPath = `path('${pathD}')`;
        (pulseDot.style as CSSStyleDeclaration & { offsetRotate: string }).offsetRotate = "0deg";
      }

      const ns = "http://www.w3.org/2000/svg";
      points.forEach((pt, i) => {
        if (i >= zoneColors.length) return;
        const ring = document.createElementNS(ns, "circle");
        ring.setAttribute("cx", String(pt.x));
        ring.setAttribute("cy", String(pt.y));
        ring.setAttribute("r", "22");
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", pt.color);
        ring.setAttribute("stroke-width", "2");
        ring.setAttribute("opacity", "0.4");
        const animR = document.createElementNS(ns, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", "22;32;22");
        animR.setAttribute("dur", `${3 + i * 0.3}s`);
        animR.setAttribute("repeatCount", "indefinite");
        ring.appendChild(animR);
        const animO = document.createElementNS(ns, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", "0.4;0.1;0.4");
        animO.setAttribute("dur", `${3 + i * 0.3}s`);
        animO.setAttribute("repeatCount", "indefinite");
        ring.appendChild(animO);
        checkpointGroup.appendChild(ring);

        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.setAttribute("r", "6");
        dot.setAttribute("fill", pt.color);
        dot.setAttribute("opacity", "0.6");
        checkpointGroup.appendChild(dot);
      });

      const finishPt = points[points.length - 1];
      const fRing = document.createElementNS(ns, "circle");
      fRing.setAttribute("cx", String(finishPt.x));
      fRing.setAttribute("cy", String(finishPt.y));
      fRing.setAttribute("r", "28");
      fRing.setAttribute("fill", "none");
      fRing.setAttribute("stroke", "#00e5a0");
      fRing.setAttribute("stroke-width", "3");
      fRing.setAttribute("opacity", "0.5");
      const fAnimR = document.createElementNS(ns, "animate");
      fAnimR.setAttribute("attributeName", "r");
      fAnimR.setAttribute("values", "28;40;28");
      fAnimR.setAttribute("dur", "2.5s");
      fAnimR.setAttribute("repeatCount", "indefinite");
      fRing.appendChild(fAnimR);
      const fAnimO = document.createElementNS(ns, "animate");
      fAnimO.setAttribute("attributeName", "opacity");
      fAnimO.setAttribute("values", "0.5;0.15;0.5");
      fAnimO.setAttribute("dur", "2.5s");
      fAnimO.setAttribute("repeatCount", "indefinite");
      fRing.appendChild(fAnimO);
      checkpointGroup.appendChild(fRing);
    }, 300);

    return () => {
      clearTimeout(timer);
      // Clean up checkpoint glows on unmount so they re-render cleanly if revisited
      const cg = document.querySelector(".rf-checkpoint-glows");
      if (cg) cg.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <NavBar />
      <main className="relative z-10 rf-page">
        <div className="rf-inner">

          {/* HERO */}
          <div className="rf-hero">
            <div className="rf-flag">🏁</div>
            <h1>THE <span className="rf-grad">RACE FUNNEL</span></h1>
            <div className="rf-definition">Agentic Lead Gen That Plays Like a Game</div>
            <p className="rf-sub">
              How we used our own APIs and agents to replace HubSpot — powered by Lovable, SendGrid,
              Twenty CRM and the Kred ecosystem.
            </p>
            <div className="rf-pills">
              <span className="rf-pill teal">Lovable · Twenty CRM · SendGrid</span>
              <span className="rf-pill orange">Replaced HubSpot Enterprise</span>
            </div>
          </div>

          {/* VS */}
          <div className="rf-vs">
            <div className="rf-vs-box old">
              <h3>🏴 Traditional Funnel</h3>
              <ul>
                <li>Lead scores hidden from prospects</li>
                <li>Email opens treated as engagement</li>
                <li>Gated content extracts data upfront</li>
                <li>Generic lifecycle stages</li>
                <li>Separate tools, separate silos</li>
                <li>Expensive enterprise licensing</li>
              </ul>
            </div>
            <div className="rf-vs-arrow">→</div>
            <div className="rf-vs-box new">
              <h3>🏁 Race Funnel (New)</h3>
              <ul>
                <li>Progress visible to the player</li>
                <li>Curiosity and Generosity are real signals</li>
                <li>Superpowers are earned through discovery</li>
                <li>Agent journey creates a natural lifecycle</li>
                <li>Every product IS the funnel</li>
                <li>Lovable, Twenty CRM, SendGrid combined with our own APIs</li>
              </ul>
            </div>
          </div>

          {/* ENGINES */}
          <div className="rf-engines">
            <div className="rf-engine curiosity">
              <div className="rf-icon">🔍</div>
              <h4>Curiosity</h4>
              <div className="rf-maps">Maps to Contribution Level (Score.Kred Gen2)</div>
              <p>What the agent explores and learns. Visiting Matrix nodes, trying products, joining conversations. Each exploration unlocks a trait that makes the agent faster.</p>
            </div>
            <div className="rf-engine generosity">
              <div className="rf-icon">🎁</div>
              <h4>Generosity</h4>
              <div className="rf-maps">Maps to Trust Score (Score.Kred Gen2)</div>
              <p>What the agent gives to others. Sending gifts, giving +Kred, sharing builds. Generosity increases top speed and creates viral reciprocity loops.</p>
            </div>
          </div>

          {/* RACE TRACK */}
          <div className="rf-track-section">
            <div className="rf-track-header">
              <div className="rf-label">⏱ The Race Track</div>
              <h2>Six Zones — 0% to Finish Line</h2>
              <div className="rf-desc">Lead engagement from the starting grid to the checkered flag. Data is captured as a byproduct of play.</div>
            </div>

            <div className="rf-track">
              <svg className="rf-track-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="rf-rainbowAnimated" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#00e5a0"><animate attributeName="stop-color" values="#00e5a0;#00b4d8;#8b5cf6;#ec4899;#ff6b35;#ffd600;#00e5a0" dur="6s" repeatCount="indefinite"/></stop>
                    <stop offset="17%" stopColor="#00b4d8"><animate attributeName="stop-color" values="#00b4d8;#8b5cf6;#ec4899;#ff6b35;#ffd600;#00e5a0;#00b4d8" dur="6s" repeatCount="indefinite"/></stop>
                    <stop offset="33%" stopColor="#8b5cf6"><animate attributeName="stop-color" values="#8b5cf6;#ec4899;#ff6b35;#ffd600;#00e5a0;#00b4d8;#8b5cf6" dur="6s" repeatCount="indefinite"/></stop>
                    <stop offset="50%" stopColor="#ec4899"><animate attributeName="stop-color" values="#ec4899;#ff6b35;#ffd600;#00e5a0;#00b4d8;#8b5cf6;#ec4899" dur="6s" repeatCount="indefinite"/></stop>
                    <stop offset="67%" stopColor="#ff6b35"><animate attributeName="stop-color" values="#ff6b35;#ffd600;#00e5a0;#00b4d8;#8b5cf6;#ec4899;#ff6b35" dur="6s" repeatCount="indefinite"/></stop>
                    <stop offset="83%" stopColor="#ffd600"><animate attributeName="stop-color" values="#ffd600;#00e5a0;#00b4d8;#8b5cf6;#ec4899;#ff6b35;#ffd600" dur="6s" repeatCount="indefinite"/></stop>
                    <stop offset="100%" stopColor="#00e5a0"><animate attributeName="stop-color" values="#00e5a0;#00b4d8;#8b5cf6;#ec4899;#ff6b35;#ffd600;#00e5a0" dur="6s" repeatCount="indefinite"/></stop>
                  </linearGradient>
                  <filter id="rf-trackGlow" x="-30%" y="-5%" width="160%" height="110%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur"/>
                  </filter>
                  <filter id="rf-pulseGlow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
                  </filter>
                </defs>
                <path className="rf-track-path rf-track-glow" fill="none" stroke="url(#rf-rainbowAnimated)" strokeWidth="50" strokeLinecap="round" filter="url(#rf-trackGlow)" d=""/>
                <path className="rf-track-path" fill="none" stroke="#111827" strokeWidth="34" strokeLinecap="round" d=""/>
                <path className="rf-track-path" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="36" strokeLinecap="round" d=""/>
                <path className="rf-track-path" fill="none" stroke="#0f1320" strokeWidth="30" strokeLinecap="round" d=""/>
                <path className="rf-track-path" fill="none" stroke="url(#rf-rainbowAnimated)" strokeWidth="24" strokeLinecap="round" opacity="0.35" d=""/>
                <path className="rf-track-path rf-track-dashes" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="16 24" strokeLinecap="round" d=""/>
                <circle className="rf-track-pulse-dot" r="18" fill="url(#rf-rainbowAnimated)" filter="url(#rf-pulseGlow)" opacity="0.8"/>
                <g className="rf-checkpoint-glows"></g>
              </svg>

              <div className="rf-track-zones">
                <div className="rf-zone">
                  <div className="rf-zone-marker">🚀</div>
                  <div className="rf-zone-body">
                    <h4>1. Mount Your Agent</h4>
                    <div className="rf-zone-name">🚩 Starting Grid</div>
                    <p>Visitor picks an archetype (Curious, Generous, Maverick). Agent is born with a temp name. No email. No wallet. No friction.</p>
                    <div className="rf-zone-tags">
                      <span className="rf-tag h3pack">Lovable</span>
                      <span className="rf-tag h3pack">Twenty CRM</span>
                      <span className="rf-tag kred">AgenticID.Kred</span>
                    </div>
                  </div>
                  <div className="rf-zone-metric">
                    <div className="rf-val">0%</div>
                    <div className="rf-lbl">Starting Line</div>
                    <div className="rf-meter"><div className="rf-meter-fill"></div></div>
                  </div>
                </div>

                <div className="rf-zone">
                  <div className="rf-zone-marker">🔮</div>
                  <div className="rf-zone-body">
                    <h4>2. The Signal Jungle</h4>
                    <div className="rf-zone-name">⚛ Matrix.Kred</div>
                    <p>Agent enters live conversation nodes. Each topic explored earns a trait: Awareness, Adaptability, Polymath. Player discovers content organically.</p>
                    <div className="rf-zone-tags">
                      <span className="rf-tag kred">Matrix.Kred</span>
                      <span className="rf-tag kred">Score.Kred</span>
                    </div>
                  </div>
                  <div className="rf-zone-metric">
                    <div className="rf-val">20%</div>
                    <div className="rf-lbl">Lead Engagement</div>
                    <div className="rf-meter"><div className="rf-meter-fill"></div></div>
                  </div>
                </div>

                <div className="rf-zone">
                  <div className="rf-zone-marker">🔧</div>
                  <div className="rf-zone-body">
                    <h4>3. The Garage</h4>
                    <div className="rf-zone-name">⚙ OneHub · Chop Shop</div>
                    <p>Build a visual identity for the agent. Remix assets, create a racing livery. Every build generates a shareable social card.</p>
                    <div className="rf-zone-tags">
                      <span className="rf-tag kred">OneHub.Kred</span>
                      <span className="rf-tag kred">NFT Platform API</span>
                    </div>
                  </div>
                  <div className="rf-zone-metric">
                    <div className="rf-val">40%</div>
                    <div className="rf-lbl">Lead Engagement</div>
                    <div className="rf-meter"><div className="rf-meter-fill"></div></div>
                  </div>
                </div>

                <div className="rf-zone">
                  <div className="rf-zone-marker">🎁</div>
                  <div className="rf-zone-body">
                    <h4>4. The Oasis</h4>
                    <div className="rf-zone-name">❤ GiftStudio.Kred</div>
                    <p>You power up by giving gifts to other racers. Reciprocity creates viral loops. Generosity is the mechanic — you literally cannot win alone.</p>
                    <div className="rf-zone-tags">
                      <span className="rf-tag kred">GiftStudio.Kred</span>
                      <span className="rf-tag h3pack">SendGrid</span>
                      <span className="rf-tag kred">XP System</span>
                    </div>
                  </div>
                  <div className="rf-zone-metric">
                    <div className="rf-val">60%</div>
                    <div className="rf-lbl">Lead Engagement</div>
                    <div className="rf-meter"><div className="rf-meter-fill"></div></div>
                  </div>
                </div>

                <div className="rf-zone">
                  <div className="rf-zone-marker">⚡</div>
                  <div className="rf-zone-body">
                    <h4>5. The Proving Ground</h4>
                    <div className="rf-zone-name">★ Score.Kred</div>
                    <p>All stats evaluated. Agent earns tier promotion. Temp agents upgrade to permanent AgenticID.Kred domains here. Email capture happens at this stage — earned, never gated.</p>
                    <div className="rf-zone-tags">
                      <span className="rf-tag kred">Score.Kred</span>
                      <span className="rf-tag kred">AgenticID.Kred</span>
                      <span className="rf-tag h3pack">Twenty CRM</span>
                      <span className="rf-tag h3pack">SendGrid</span>
                    </div>
                  </div>
                  <div className="rf-zone-metric">
                    <div className="rf-val">80%</div>
                    <div className="rf-lbl">Lead Engagement</div>
                    <div className="rf-meter"><div className="rf-meter-fill"></div></div>
                  </div>
                </div>

                <div className="rf-zone">
                  <div className="rf-zone-marker">🏁</div>
                  <div className="rf-zone-body">
                    <h4>6. The Race</h4>
                    <div className="rf-zone-name">⚡ Lightcycle.Kred</div>
                    <p>Head-to-head autonomous races. Curiosity controls acceleration. Generosity controls top speed. Results generate share cards and drive re-engagement.</p>
                    <div className="rf-zone-tags">
                      <span className="rf-tag kred">HotGarage.Kred</span>
                      <span className="rf-tag kred">Empire.Kred</span>
                      <span className="rf-tag h3pack">SendGrid</span>
                      <span className="rf-tag h3pack">Lovable</span>
                    </div>
                  </div>
                  <div className="rf-zone-metric">
                    <div className="rf-val">95%</div>
                    <div className="rf-lbl">Lead Engagement</div>
                    <div className="rf-meter"><div className="rf-meter-fill"></div></div>
                  </div>
                </div>
              </div>

              <div className="rf-finish-line">
                <div className="rf-finish-marker">🔄</div>
                <div className="rf-finish-metric">100%</div>
                <p>🏁 FINISH LINE — FULLY ENGAGED LEAD 🏁</p>
                <div className="rf-loop-text">↺ "I want to be faster" — the race result drives the player back to the start. Every loop deepens the experience and enriches the CRM record.</div>
              </div>
            </div>
          </div>

          {/* INSIGHT */}
          <div className="rf-insight">
            <div className="rf-insight-label">💡 The Key Insight</div>
            <blockquote>The visitor launches an agent, explores your products, and earns superpowers. Data, engagement, and conversion are all byproducts of play — never the point.</blockquote>
          </div>

          {/* WOM */}
          <div className="rf-wom">
            <h3>💬 What Do They Tell a Friend?</h3>
            <div className="rf-wom-grid">
              <div className="rf-wom-card bad"><div className="rf-wl">Nobody Says</div><div className="rf-wq">"I signed up for PeopleBrowsr's CRM platform."</div></div>
              <div className="rf-wom-card good"><div className="rf-wl">They Actually Say</div><div className="rf-wq">"I built an AI agent and raced it against other people's agents."</div></div>
              <div className="rf-wom-card bad"><div className="rf-wl">Nobody Says</div><div className="rf-wq">"I explored their agentic identity API documentation."</div></div>
              <div className="rf-wom-card good"><div className="rf-wl">They Actually Say</div><div className="rf-wq">"My agent has 11 superpowers and just hit Established tier."</div></div>
            </div>
          </div>

          {/* ARCHITECTURE */}
          <div className="rf-arch">
            <h3>⚙ Technical Architecture</h3>
            <div className="rf-arch-sub">H3 Pack combined with Kred APIs. Every layer has a job.</div>
            <div className="rf-arch-layers">
              <div className="rf-arch-row">
                <div className="rf-layer-name" style={{color:"#a855f7"}}>Presentation</div>
                <div className="rf-chips"><span className="rf-chip lov">Lovable</span><span className="rf-chip arr">→</span><span className="rf-chip desc">Landing pages, agent launch, race viewer, leaderboard</span></div>
              </div>
              <div className="rf-arch-row">
                <div className="rf-layer-name" style={{color:"#3b82f6"}}>CRM and Data</div>
                <div className="rf-chips"><span className="rf-chip tw">Twenty CRM</span><span className="rf-chip arr">→</span><span className="rf-chip desc">Contacts, archetypes, superpowers, tiers, XP, race results</span></div>
              </div>
              <div className="rf-arch-row">
                <div className="rf-layer-name" style={{color:"#00b4d8"}}>Communications</div>
                <div className="rf-chips"><span className="rf-chip sg">SendGrid</span><span className="rf-chip arr">→</span><span className="rf-chip desc">Race alerts, gift notifications, level-ups, expiry warnings</span></div>
              </div>
              <div className="rf-arch-row">
                <div className="rf-layer-name" style={{color:"#00e5a0"}}>Engagement</div>
                <div className="rf-chips"><span className="rf-chip kr">Score.Kred</span><span className="rf-chip kr">Matrix.Kred</span><span className="rf-chip kr">GiftStudio</span><span className="rf-chip kr">AgenticID</span><span className="rf-chip kr">XP</span><span className="rf-chip kr">NFT API</span></div>
              </div>
              <div className="rf-arch-row">
                <div className="rf-layer-name" style={{color:"#f59e0b"}}>Agents</div>
                <div className="rf-chips"><span className="rf-chip ch">Pydantic AI</span><span className="rf-chip ch">LangGraph</span><span className="rf-chip ch">OpenRouter</span><span className="rf-chip arr">→</span><span className="rf-chip desc">Agent runtime, orchestration, LLM routing</span></div>
              </div>
              <div className="rf-arch-row">
                <div className="rf-layer-name" style={{color:"#f59e0b"}}>On-Chain</div>
                <div className="rf-chips"><span className="rf-chip ch">ERC-8004</span><span className="rf-chip ch">ERC-721</span><span className="rf-chip ch">Base L2</span><span className="rf-chip ch">EAS</span><span className="rf-chip arr">→</span><span className="rf-chip desc">Permanent identity, attestations, domain NFTs</span></div>
              </div>
            </div>
          </div>

          <div className="rf-footer-note">
            <div className="rf-tagline">The agentic web has a starting line.</div>
            <div className="rf-credit">PeopleBrowsr · peoplebrowsr.com</div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
