import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

export default function WhatsAppFloatingBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
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

  const msg = encodeURIComponent(
    '¡Hola Belén! Quisiera consultar sobre el servicio de Google Maps, WhatsApp y Página Web para mi negocio.'
  );

  if (!isVisible) return null;

  return (
    <div className="whatsapp-floating-container">
      {!isDismissed && (
        <div className="whatsapp-floating-tooltip">
          <div className="tooltip-text">
            <strong>¿Tenés dudas?</strong>
            <span>Escribime por WhatsApp</span>
          </div>
          <button 
            type="button" 
            className="btn-tooltip-close" 
            onClick={() => setIsDismissed(true)}
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
