import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe, Users, Link2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import kredEcosystem from "@/assets/kred-ecosystem.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium tracking-wide">
              Powered by SocialOS APIs
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-foreground">Identity Memory Reputation</span>
            <br />
            <span className="text-foreground">for </span>
            <span className="text-gradient-primary">Web3</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sovereign infrastructure where AI agents gain character and humans gain superpowers — built for developers and AI agents.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
            >
              Get Free API Key
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
            >
              View API Reference
            </Button>
          </motion.div>
        </motion.div>

        {/* Right — Agent Card */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full bg-primary/10 blur-[80px]" />
          </div>

          <div className="relative w-full max-w-md">
            {/* Card */}
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl overflow-hidden">
              {/* Banner */}
              <div className="h-32 overflow-hidden relative">
                <img
                  src={kredEcosystem}
                  alt="Kred ecosystem visualization"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90" />
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center -mt-10 relative z-10">
                <div className="w-20 h-20 rounded-full bg-card border-4 border-card flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/30">
                    <Globe className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <h3 className="text-lg font-bold font-display text-primary mt-3">
                  PeopleBrowsr.Kred
                </h3>
                <p className="text-xs text-muted-foreground mt-1 text-center max-w-[260px] px-4">
                  Sovereign identity infrastructure — domains, reputation, and memory for the Agentic Web.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px bg-border/30 mt-5 mx-5 rounded-lg overflow-hidden">
                <div className="bg-muted/40 flex flex-col items-center py-3">
                  <Globe className="w-4 h-4 text-muted-foreground mb-1" />
                  <span className="text-lg font-bold text-foreground">9</span>
                  <span className="text-[10px] text-muted-foreground">Products</span>
                </div>
                <div className="bg-muted/40 flex flex-col items-center py-3">
                  <Users className="w-4 h-4 text-muted-foreground mb-1" />
                  <span className="text-lg font-bold text-foreground">20+</span>
                  <span className="text-[10px] text-muted-foreground">Subagents</span>
                </div>
                <div className="bg-muted/40 flex flex-col items-center py-3">
                  <Link2 className="w-4 h-4 text-primary mb-1" />
                  <span className="text-lg font-bold text-primary">MCP</span>
                  <span className="text-[10px] text-muted-foreground">Protocol</span>
                </div>
              </div>

              {/* Kred Score */}
              <div className="mx-5 my-4 rounded-lg bg-muted/30 border border-border/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Kred Score</span>
                </div>
                <span className="text-lg font-bold text-primary font-display">847</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Agent Discovery Bar */}
      <motion.div
        className="absolute bottom-8 left-6 right-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Agent Discovery</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="outline" size="sm" className="text-xs border-border/50 text-muted-foreground">
                OpenAPI Spec
              </Button>
              <Button variant="outline" size="sm" className="text-xs border-border/50 text-muted-foreground">
                llms.txt
              </Button>
              <span className="text-xs text-muted-foreground">
                Base URL: <code className="text-primary font-mono">sandbox.socialos.io/v2</code>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
