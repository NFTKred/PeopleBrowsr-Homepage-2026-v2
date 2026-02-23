import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Hero } from "@/components/Hero";
import { EcosystemMap } from "@/components/EcosystemMap";
import { Manifesto } from "@/components/Manifesto";
import { FourPillars } from "@/components/FourPillars";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="font-display font-semibold text-foreground hidden sm:block">
              PeopleBrowsr
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <EcosystemMap />
        <Manifesto />
        <FourPillars />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
