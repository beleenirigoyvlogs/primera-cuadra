import React from 'react';
import { Check, MessageSquare } from 'lucide-react';
import SectionCornerStamp from './SectionCornerStamp';
import MaskRevealH2 from './MaskRevealH2';
import { useMagneticButton } from '../../hooks/useMagneticButton';

export default function FreeAuditV3() {
  const auditBtnRef = useMagneticButton(6);
  const auditWaMsg = encodeURIComponent('¡Hola Belén! Quiero la revisión gratis. Mi negocio es: (nombre) y está en: (zona)');

  const items = [
    'Si aparecés en Google Maps y en qué lugar',
    'Si tu ficha tiene horarios, fotos y teléfono correctos',
    'Cómo se ven tus reseñas y si las estás respondiendo',
    'Cómo se ve tu web o tu Instagram desde el celular'
  ];

  return (
    <section 
      id="revision" 
      style={{ 
        background: '#673DE6', 
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(32px, 4vw, 48px) 24px',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '40px 56px', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}
        >
          {/* Left Column: Heading and Description */}
          <div style={{ flex: '999 1 520px', minWidth: 0 }}>
            <p 
              className="pc-reveal-l"
              style={{ 
                margin: 0, 
                fontFamily: "'Oswald', sans-serif", 
                fontSize: '15px', 
                letterSpacing: '.14em', 
                textTransform: 'uppercase', 
                color: '#FFFFFF',
                opacity: 0.9,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <SectionCornerStamp stroke="#FFFFFF" size={16} />
              <span>REVISIÓN GRATIS</span>
            </p>

            <MaskRevealH2 
              text="¿CÓMO TE ENCUENTRAN HOY EN GOOGLE?"
              style={{ 
                margin: '10px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(32px, 4.2vw, 52px)', 
                lineHeight: 1.05, 
                textTransform: 'uppercase', 
                color: '#FFFFFF' 
              }}
            />

            <p 
              className="pc-reveal-u"
              style={{ 
                margin: '18px 0 0', 
                fontSize: 'clamp(16px, 1.8vw, 17px)', 
                lineHeight: 1.6, 
                color: '#FFFFFF',
                maxWidth: '680px'
              }}
            >
              Pasame el nombre de tu negocio y tu zona. Lo busco como lo buscaría un cliente y en 24 horas te mando por WhatsApp qué está bien y qué te está haciendo perder consultas. Sin costo y sin compromiso.
            </p>

            {/* 4 Items with Check */}
            <ul 
              className="pc-reveal-u"
              style={{ 
                margin: '28px 0 0', 
                padding: 0, 
                listStyle: 'none', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '14px 24px' 
              }}
            >
              {items.map((item, idx) => (
                <li 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '10px', 
                    fontSize: '15px', 
                    lineHeight: 1.5 
                  }}
                >
                  <span 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: '#FFFFFF', 
                      color: '#4B25C4', 
                      flexShrink: 0, 
                      marginTop: '2px' 
                    }}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: CTA Button */}
          <div 
            className="pc-reveal-u"
            style={{ 
              flex: '1 1 240px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '14px', 
              alignItems: 'flex-start' 
            }}
          >
            <a 
              ref={auditBtnRef}
              href={`https://wa.me/5491128779641?text=${auditWaMsg}`}
              target="_blank" 
              rel="noopener noreferrer" 
              data-wa="revision-gratis"
              className="pc-btn-sheen pc-btn-magnetic"
              style={{ 
                textDecoration: 'none', 
                background: '#FFFFFF', 
                color: '#4B25C4', 
                padding: '16px 28px', 
                borderRadius: '6px', 
                fontWeight: 600, 
                fontSize: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <MessageSquare size={18} />
              <span>Quiero mi revisión gratis</span>
            </a>
            <span style={{ fontSize: '13px', opacity: 0.85 }}>
              Respuesta en menos de 24 horas hábiles
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

