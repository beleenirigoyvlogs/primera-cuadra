import { useEffect } from 'react';

const REVEAL_SELECTOR = '.pc-reveal-r, .pc-reveal-l, .pc-reveal-u, .reveal, .reveal-group > *, [data-reveal]';

function revealElement(el) {
  if (!el) return;
  el.classList.add('is-visible', 'visible', 'revealed');
  el.setAttribute('data-revealed', 'true');
}

export function useScrollReveal(dependency) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach(revealElement);
      return;
    }

    const observedSet = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -10px 0px'
      }
    );

    const observeNewElements = () => {
      const elements = document.querySelectorAll(REVEAL_SELECTOR);
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial observation
    observeNewElements();

    // Re-check after brief render tick
    const animFrame = requestAnimationFrame(observeNewElements);
    const tickTimer = setTimeout(observeNewElements, 100);

    // Watch for DOM changes (SPA route transitions, async component loads)
    let mutationObserver = null;
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        observeNewElements();
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // 1.5s Safety fallback: ensure nothing stays hidden permanently
    const safetyTimer = setTimeout(() => {
      document.documentElement.classList.add('pc-revealed-fallback');
      document.querySelectorAll(REVEAL_SELECTOR).forEach(revealElement);
    }, 1500);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(tickTimer);
      clearTimeout(safetyTimer);
      if (mutationObserver) mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [dependency]);
}
