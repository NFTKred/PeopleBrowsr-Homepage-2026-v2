import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Vision", href: "#vision" },
  { label: "Platform", href: "#platform" },
  { label: "APIs & Skills", href: "#apis-and-skills" },
  { label: "Manifesto", href: "/manifesto" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Prefix anchor links with "/" when not on the homepage so they navigate correctly
  const resolveHref = (href: string) =>
    !isHome && href.startsWith("#") ? `/${href}` : href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
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
              People<span className="text-gradient-primary">Browsr</span>
            </span>
          </a>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => {
              const href = resolveHref(link.href);
              return href.startsWith("/") && !href.includes("#") ? (
                <Link
                  key={link.label}
                  to={href}
                  className="text-[14px] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={href}
                  className="text-[14px] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* CTA */}
            <Button
              size="sm"
              className="bg-transparent border border-primary/80 text-primary hover:bg-primary/10 font-medium rounded-full text-[14px] px-5 h-8 flex-shrink-0 hidden sm:inline-flex"
              onClick={() => document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started
            </Button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-8 h-8 text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-14" onClick={() => setMobileOpen(false)}>
          <div
            className="mx-4 mt-2 rounded-2xl border border-border/30 bg-card/95 backdrop-blur-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col py-2">
            {navLinks.map((link) => {
                const href = resolveHref(link.href);
                return href.startsWith("/") && !href.includes("#") ? (
                  <Link
                    key={link.label}
                    to={href}
                    onClick={handleLinkClick}
                    className="px-6 py-3.5 text-base text-foreground hover:bg-muted/40 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={href}
                    onClick={handleLinkClick}
                    className="px-6 py-3.5 text-base text-foreground hover:bg-muted/40 transition-colors"
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="px-6 py-3 border-t border-border/20 mt-1">
                <Button
                  size="sm"
                  className="w-full bg-transparent border border-primary/80 text-primary hover:bg-primary/10 font-medium rounded-full text-[14px] h-9"
                  onClick={() => { document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
