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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-500 ease-out ${
          scrolled
            ? "mt-3 mx-4 px-5 h-12 rounded-full border border-border/40 bg-card/70 backdrop-blur-xl shadow-lg shadow-black/20 max-w-xl"
            : "mt-0 mx-0 px-6 h-14 rounded-none border-b border-transparent bg-background/80 backdrop-blur-xl max-w-7xl w-full"
        }`}
      >
        <div className="flex items-center justify-between h-full w-full">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className={`font-display font-semibold text-foreground tracking-tight transition-all duration-500 ${
              scrolled ? "text-xs" : "text-sm"
            }`}>
              PeopleBrowsr
            </span>
          </a>

          {/* Nav links */}
          <nav className={`hidden md:flex items-center transition-all duration-500 ${
            scrolled ? "gap-4" : "gap-6"
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-muted-foreground hover:text-foreground transition-colors ${
                  scrolled ? "text-xs" : "text-sm"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Button
            size="sm"
            className={`bg-transparent border border-primary/80 text-primary hover:bg-primary/10 font-medium rounded-md transition-all duration-500 ${
              scrolled ? "text-xs px-3 h-7" : "text-sm px-5 h-9"
            }`}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
