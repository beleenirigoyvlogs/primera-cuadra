import { useEffect } from 'react';

/**
 * useMouseParallaxDots
 * Agrega un efecto interactivo al fondo punteado (dot grid):
 * A medida que el usuario mueve el mouse por la pantalla,
 * los puntitos se desplazan sutilmente en dirección opuesta (efecto parallax suave).
 */
export function useMouseParallaxDots() {
  useEffect(() => {
    // Si el usuario prefiere movimiento reducido, no aplicamos la animación
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      // Normalizar coordenadas respecto al centro de la ventana (-1 a 1)
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;

      // Amplitud sutil en píxeles (máximo 14px de desplazamiento de los puntos)
      targetX = normX * 28;
      targetY = normY * 28;
    };

    // Interpolación suave (lerp) para movimiento fluido a 60fps
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      document.documentElement.style.setProperty('--dot-offset-x', `${currentX.toFixed(2)}px`);
      document.documentElement.style.setProperty('--dot-offset-y', `${currentY.toFixed(2)}px`);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
}
