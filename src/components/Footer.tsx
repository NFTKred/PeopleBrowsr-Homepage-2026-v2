import { useContactModal } from "@/hooks/use-contact-modal";

const socialLinks = [
  {
    label: "X / Twitter",
    href: "https://x.com/PeopleBrowsr",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/peoplebrowsr",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export const Footer = () => {
  const { open } = useContactModal();

  return (
    <footer className="relative border-t border-border/30">
      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col gap-3 max-w-xs">
              <span className="font-display text-base font-semibold text-foreground">
                People<span className="text-gradient-primary">Browsr</span>
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The social identity, reputation, and tokenization layer for the agentic web.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Products</p>
                {[
                  { label: "AgenticID.Kred", href: "https://agenticid-kred.vercel.app/" },
                  { label: "Score.Kred", href: "https://agenticid-kred.vercel.app/score/" },
                  { label: "Matrix.Kred", href: "https://agenticid-kred.vercel.app/matrix/" },
                  { label: "Empire.Kred", href: "https://awards.empire.kred/" },
                  { label: "NFT.NYC", href: "https://www.nft.nyc" },
                ].map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Company</p>
                <a href="/manifesto"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Manifesto
                </a>
                <button
                  onClick={open}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Contact
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Legal</p>
                {[
                  { label: "Privacy Policy", href: "https://www.peoplebrowsr.com/privacy" },
                  { label: "Terms of Service", href: "https://www.peoplebrowsr.com/terms" },
                ].map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} PeopleBrowsr. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/50">
              Self-funded since 2007. Every dollar earned from customers. U.S. Patent Nos. 11,301,460 &amp; 12,038,911. DARPA-backed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
