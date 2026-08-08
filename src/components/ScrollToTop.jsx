import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll position restoration on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to the very top on load, refresh, or route change (if no hash)
    if (!hash) {
      window.scrollTo(0, 0);

      // Secondary check to handle any delayed layout re-renders
      const timer1 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);

      const timer2 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 150);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    // Clean up scroll-based navbar classes
    document.body.classList.remove("scroll-down", "scroll-up", "nav-scrolling");
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
