import { useRef, useEffect } from 'react';

/**
 * useMagneticButton - Añade efecto magnético sutil a botones primarios en desktop.
 * Se desplaza hasta 6px hacia el cursor y vuelve con easing elástico al salir.
 * Desactivado en táctil y en prefers-reduced-motion.
 */
export function useMagneticButton(maxMove = 6) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      const moveX = Math.max(-maxMove, Math.min(maxMove, (x / (rect.width / 2)) * maxMove));
      const moveY = Math.max(-maxMove, Math.min(maxMove, (y / (rect.height / 2)) * maxMove));

      el.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
      el.style.transition = 'transform 0.12s ease-out';
    };

    const onMouseLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [maxMove]);

  return ref;
}
