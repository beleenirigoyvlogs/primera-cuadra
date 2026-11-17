import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

export default function WhatsAppFloatingBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [isOverCaseStudy, setIsOverCaseStudy] = useState(false);
  const whatsappNumber = '5491128779641';

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show text bubble only once after 20 seconds, unless dismissed
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wasDismissed = sessionStorage.getItem('wa_bubble_dismissed');
    if (wasDismissed) return;

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  // Do not let bubble overlap The Point case study or bespoke software section
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targets = document.querySelectorAll('#caso-the-point, .the-point-showcase-section, .case-showcase-box');
    if (!targets || targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyIntersecting = entries.some(e => e.isIntersecting);
        setIsOverCaseStudy(isAnyIntersecting);
      },
      { threshold: 0.1 }
    );

    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const handleDismissBubble = (e) => {
    e.stopPropagation();
    setShowBubble(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('wa_bubble_dismissed', '1');
    }
  };

  const msg = encodeURIComponent(
    '¡Hola Belén! Quisiera consultar sobre el servicio de Google Maps, WhatsApp y Página Web para mi negocio.'
  );

  if (!isVisible) return null;

  return (
    <div className="whatsapp-floating-container">
      {showBubble && !isOverCaseStudy && (
        <div className="whatsapp-floating-tooltip">
          <div className="tooltip-text">
            <strong>¿Tenés dudas?</strong>
            <span>Escribime por WhatsApp</span>
          </div>
          <button 
            type="button" 
            className="btn-tooltip-close" 
            onClick={handleDismissBubble}
            aria-label="Cerrar sugerencia"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <a
        href={`https://wa.me/${whatsappNumber}?text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-button"
        aria-label="Contactar a Belén por WhatsApp"
        onClick={() => trackWhatsAppClick('desktop_floating_bubble', 'Presencia_digital')}
      >
        <span className="floating-pulse-ring"></span>
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
