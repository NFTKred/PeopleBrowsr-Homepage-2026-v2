import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Vision", href: "#vision" },
  { label: "Platform", href: "#platform" },
];

export const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40">
      <div className="backdrop-blur-xl bg-background/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-display font-semibold text-foreground text-sm tracking-tight">
              PeopleBrowsr<span className="text-primary">.Kred</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
