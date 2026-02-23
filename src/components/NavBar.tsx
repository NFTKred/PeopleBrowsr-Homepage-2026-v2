import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Vision", href: "#vision" },
  { label: "Platform", href: "#platform" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled
            ? "mt-3 h-10 px-4 rounded-full border border-border/30 bg-card/60 backdrop-blur-2xl shadow-lg shadow-black/25 w-auto gap-5"
            : "mt-0 h-12 px-6 rounded-none border-b border-transparent bg-background/80 backdrop-blur-xl w-full max-w-[1200px] gap-8"
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <span className="font-display font-semibold text-foreground text-[15px] tracking-tight whitespace-nowrap">
            PeopleBrowsr
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className="bg-transparent border border-primary/80 text-primary hover:bg-primary/10 font-medium rounded-md text-[14px] px-5 h-8 flex-shrink-0"
        >
          Get Started
        </Button>
      </nav>
    </header>
  );
};
