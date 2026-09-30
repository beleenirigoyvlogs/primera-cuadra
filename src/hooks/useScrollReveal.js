import { useEffect } from 'react';

/**
 * Custom hook to initialize scroll-triggered entrance animations using Intersection Observer.
 * 
 * Requirements satisfied:
 * - Observes main sections, cards, and key interactive blocks (.reveal).
 * - Animates from opacity: 0 and translateY(30px) to opacity: 1 and translateY(0).
 * - Duration: 0.6s with cubic-bezier(0.16, 1, 0.3, 1).
 * - Intersection Observer options: threshold: 0.15, rootMargin: "0px 0px -40px 0px".
 * - Executes only once (unobserves on intersection so it never re-animates on scroll up).
 * - Respects prefers-reduced-motion (skips animations and shows everything immediately).
 * - Supports staggered delay (80-100ms) for groups of cards (.reveal-group).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // 1. Check prefers-reduced-motion: if active, display all elements immediately with no animations
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('visible', 'revealed');
      });
      return;
    }

    // 2. Set up staggered entrance delay for cards within card groups (90ms between 80-100ms)
    const groups = document.querySelectorAll('.reveal-group');
    groups.forEach((group) => {
      const cards = group.querySelectorAll('.reveal');
      cards.forEach((card, index) => {
        if (!card.style.getPropertyValue('--reveal-delay')) {
          card.style.setProperty('--reveal-delay', `${index * 90}ms`);
        }
      });
    });

    // 3. Create Intersection Observer with required options
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('visible');
          target.setAttribute('data-revealed', 'true');

          // Optimize GPU memory: clean up will-change after transition finishes
          const onTransitionEnd = (e) => {
            if (e.target === target && (e.propertyName === 'opacity' || e.propertyName === 'transform')) {
              target.classList.add('revealed');
              target.removeEventListener('transitionend', onTransitionEnd);
            }
          };
          target.addEventListener('transitionend', onTransitionEnd);

          // Safety fallback ensures state persists even if transitionend doesn't fire
          setTimeout(() => {
            target.classList.add('revealed');
            target.setAttribute('data-revealed', 'true');
          }, 800);

          // Only run once: unobserve immediately so scrolling up doesn't re-trigger
          obs.unobserve(target);
        }
      });
    }, observerOptions);

    // 4. Observe all reveal elements
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      observer.observe(el);
    });

    // 5. Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);
}

export default useScrollReveal;
