import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Vision", href: "#vision" },
  { label: "Platform", href: "#platform" },
];

export const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="font-display font-semibold text-foreground text-sm tracking-tight">
              PeopleBrowsr
            </span>
          </a>

          {/* Nav links + CTA grouped right */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
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

            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium px-5 rounded-full transition-colors"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
