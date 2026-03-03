export const Footer = () => {
  return (
    <footer className="relative border-t border-border/30">
      <div className="border-t border-border/20 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">P</span>
            </div>
            <span className="font-display text-sm font-semibold text-foreground">
              PeopleBrowsr
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PeopleBrowsr
          </p>
        </div>
      </div>
    </footer>
  );
};
