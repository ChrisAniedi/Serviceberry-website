import type Lenis from "lenis";

// The page's smooth scroller, when there is one (pointer devices without reduced motion).
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};

/** Scroll the page to `y`, through Lenis when it runs so the two never fight. */
export function scrollToY(y: number, immediate = false) {
  if (lenis) lenis.scrollTo(y, { immediate, duration: 1.1 });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

/** Freeze page scrolling (for full-screen viewers) and let it go again. */
export function lockScroll(on: boolean) {
  if (lenis) {
    if (on) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = on ? "hidden" : "";
}
