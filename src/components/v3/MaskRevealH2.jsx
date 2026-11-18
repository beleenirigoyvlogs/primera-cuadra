import React, { useRef, useEffect, useState } from 'react';

/**
 * MaskRevealH2 - Revela cada línea del H2 subiendo desde abajo dentro de un contenedor overflow: hidden
 * translateY 100% -> 0, 0.7s, cubic-bezier(.16, 1, .3, 1), 80ms entre líneas.
 * Reemplaza al fade actual solo en los H2.
 */
export default function MaskRevealH2({
  children,
  text,
  lines,
  className = '',
  style = {},
  as = 'h2'
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // If prefers-reduced-motion, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      }, { threshold: 0.15 });

      observer.observe(el);

      // Progressive enhancement timeout fallback
      const timer = setTimeout(() => setIsRevealed(true), 1200);

      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    } else {
      setIsRevealed(true);
    }
  }, []);

  const Component = as;
  const lineArray = lines || (text ? [text] : (Array.isArray(children) ? children : [children]));

  return (
    <Component
      ref={ref}
      className={`pc-mask-h2 ${isRevealed ? 'revealed' : ''} ${className}`}
      style={style}
    >
      {lineArray.map((line, idx) => (
        <span
          key={idx}
          className="pc-mask-line"
          style={{ display: 'block', overflow: 'hidden' }}
        >
          <span
            className="pc-mask-text"
            style={{
              display: 'block',
              transform: isRevealed ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${idx * 80}ms`,
              willChange: 'transform'
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
}
