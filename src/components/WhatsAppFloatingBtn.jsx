import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloatingBtn({ niche }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappNumber = '5491128779641';

  const msg = encodeURIComponent(
    '¡Hola Primera Cuadra! Quisiera consultar sobre el servicio de Google Maps, WhatsApp y Página Web para mi negocio.'
  );

  return (
    <div className="whatsapp-floating-container">
      {showTooltip && (
        <div className="whatsapp-floating-tooltip">
          <div className="tooltip-text">
            <strong>¿Tenés dudas?</strong>
            <span>Escribinos al WhatsApp directo</span>
          </div>
          <button 
            type="button" 
            className="btn-tooltip-close" 
            onClick={() => setShowTooltip(false)}
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
        aria-label="Contactar por WhatsApp"
      >
        <span className="floating-pulse-ring"></span>
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
