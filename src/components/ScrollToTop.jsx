import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const prevPathname = useRef(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const storageKey = `scroll-pos::${pathname}`;
    isTransitioning.current = true;

    if (navigationType === "POP") {
      // Restore saved scroll position when going back/forward
      const saved = sessionStorage.getItem(storageKey);
      if (saved !== null) {
        const targetY = parseInt(saved, 10);

        // Retry scrolling until the page has rendered enough to reach the saved position
        let attempts = 0;
        const tryScroll = () => {
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          if (maxScroll >= targetY || attempts >= 10) {
            window.scrollTo({ top: targetY, behavior: "instant" });
            // Settle down transition status
            setTimeout(() => {
              isTransitioning.current = false;
            }, 100);
          } else {
            attempts++;
            setTimeout(tryScroll, 100);
          }
        };

        // Give the page 150ms to render components before first attempt
        setTimeout(tryScroll, 150);
      } else {
        window.scrollTo(0, 0);
        setTimeout(() => {
          isTransitioning.current = false;
        }, 100);
      }
    } else {
      // PUSH / REPLACE
      // Scroll to top on new navigation
      window.scrollTo(0, 0);
      setTimeout(() => {
        isTransitioning.current = false;
      }, 300); // Settle down scroll tracking state
    }

    // Clean up scroll-based navbar classes
    document.body.classList.remove("scroll-down", "scroll-up", "nav-scrolling");

    prevPathname.current = pathname;
  }, [pathname, navigationType]);

  // Continuously save scroll position so the latest value is always stored (ignore browser clamping in transition)
  useEffect(() => {
    const saveScroll = () => {
      if (!isTransitioning.current) {
        sessionStorage.setItem(`scroll-pos::${pathname}`, String(window.scrollY));
      }
    };
    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => window.removeEventListener("scroll", saveScroll);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
