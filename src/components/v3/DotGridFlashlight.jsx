import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * DotGridFlashlight - Grilla de puntos con efecto linterna que sigue al cursor suavemente con lerp.
 * Los puntos lejanos quedan como están hoy; los cercanos (~220px) se iluminan.
 * Solo activo en dispositivos con hover y pointer: fine.
 */
export default function DotGridFlashlight({ className = '', style = {}, children }) {
  const { isDark } = useTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;
    let rafId = null;
    let isHovering = false;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!isHovering) {
        isHovering = true;
        currentX = targetX;
        currentY = targetY;
        el.style.setProperty('--spot-opacity', '1');
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      el.style.setProperty('--spot-opacity', '0');
    };

    const loop = () => {
      if (isHovering) {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        el.style.setProperty('--spot-x', `${currentX.toFixed(1)}px`);
        el.style.setProperty('--spot-y', `${currentY.toFixed(1)}px`);
      }
      rafId = requestAnimationFrame(loop);
    };

    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const baseDotColor = isDark ? 'rgba(164, 139, 255, 0.16)' : 'rgba(103, 61, 230, 0.16)';
  const brightDotColor = isDark ? '#A48BFF' : '#673DE6';

  return (
    <div
      ref={containerRef}
      className={`pc-dot-flashlight-container ${className}`}
      style={{
        position: 'relative',
        ...style
      }}
    >
      {/* Base ambient dot grid */}
      <div
        className="pc-dots-base"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${baseDotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Bright spotlight layer with radial-gradient mask */}
      <div
        className="pc-dots-spotlight"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${brightDotColor} 2px, transparent 2px)`,
          backgroundSize: '24px 24px',
          WebkitMaskImage: 'radial-gradient(220px circle at var(--spot-x, -999px) var(--spot-y, -999px), black 0%, transparent 100%)',
          maskImage: 'radial-gradient(220px circle at var(--spot-x, -999px) var(--spot-y, -999px), black 0%, transparent 100%)',
          opacity: 'var(--spot-opacity, 0)',
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
