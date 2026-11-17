import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// The home page and the Manifesto are static HTML files served by Vercel
// (public/index.html and public/manifesto.html). When an in-app link lands on
// one of those paths, load the static page from the server instead.
const ServerPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const key = "server-page-reload";
    // Guard against a reload loop where the server also answers with the app
    // (for example the local dev server): skip if this path reloaded seconds ago.
    try {
      const [lastPath, lastTime] = (sessionStorage.getItem(key) || "").split("|");
      if (lastPath === pathname && Date.now() - Number(lastTime) < 3000) return;
      sessionStorage.setItem(key, `${pathname}|${Date.now()}`);
    } catch {
      /* storage unavailable: reload regardless */
    }
    window.location.replace(pathname);
  }, [pathname]);
  return null;
};

export default ServerPage;
