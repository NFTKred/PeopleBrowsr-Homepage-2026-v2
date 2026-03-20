import { AnimatedBackground } from "@/components/AnimatedBackground";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { EcosystemMap } from "@/components/EcosystemMap";
import { RaceFunnelTeaser } from "@/components/RaceFunnelTeaser";
import { Heritage } from "@/components/Heritage";
import { Manifesto } from "@/components/Manifesto";
import { TokenizationStrip } from "@/components/TokenizationStrip";
import { FourPillars } from "@/components/FourPillars";
import { ApiSkills } from "@/components/ApiSkills";
import { Footer } from "@/components/Footer";
import { isStage1 } from "@/config/stage";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <NavBar />

      <main className="relative z-10">
        <Hero />
        <EcosystemMap />
        {isStage1 && <RaceFunnelTeaser />}
        <Heritage />
        <Manifesto />
        <TokenizationStrip />
        <FourPillars />
        {isStage1 && <ApiSkills />}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
