import { AnimatedBackground } from "@/components/AnimatedBackground";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { EcosystemMap } from "@/components/EcosystemMap";
import { Manifesto } from "@/components/Manifesto";
import { FourPillars } from "@/components/FourPillars";
import { ApiSkills } from "@/components/ApiSkills";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <NavBar />

      <main className="relative z-10">
        <Hero />
        <EcosystemMap />
        <Manifesto />
        <FourPillars />
        <ApiSkills />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
