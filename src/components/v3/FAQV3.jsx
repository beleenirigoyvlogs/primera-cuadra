import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import SectionCornerStamp from './SectionCornerStamp';
import MaskRevealH2 from './MaskRevealH2';

export default function FAQV3({ extraFaqs = [] }) {
  const { isDark } = useTheme();

  const lightBg = isDark ? '#1E1C24' : '#EFEDE8';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';

  const baseFaqs = [
    { 
      q: '¿Cuánto tarda mi página web?', 
      a: 'Cuatro días hábiles desde que recibo tu material; 48 horas en el plan Express.' 
    },
    { 
      q: '¿Tengo que preparar el contenido?', 
      a: 'No. Me mandás lo que tengas por WhatsApp y yo escribo los textos y ordeno las fotos.' 
    },
    { 
      q: '¿Voy a salir primero en Google?', 
      a: 'Nadie puede garantizarlo. Sí optimizo todo lo que se puede: estructura, textos, velocidad y tu ficha de Google Maps.' 
    },
    { 
      q: '¿Qué pasa después del primer año?', 
      a: 'Dominio .com.ar y hosting están incluidos el primer año. Desde el segundo año pagás la renovación aproximada de $10.000 por año, directamente a tu nombre. El mantenimiento mensual es opcional, cuesta $50.000 por mes e incluye cambios de textos, precios y fotos, y revisión de que todo funcione.' 
    },
    { 
      q: '¿Cómo se paga?', 
      a: 'La mitad al empezar y la otra mitad cuando revisás todo y estás conforme. Transferencia, Mercado Pago o efectivo.' 
    },
    { 
      q: '¿Puedo ver una propuesta antes?', 
      a: 'Sí. Te armo una propuesta base sin costo para que veas cómo quedaría tu web antes de decidir.' 
    }
  ];

  const faqs = [...extraFaqs, ...baseFaqs];

  return (
    <section 
      style={{ 
        background: lightBg, 
        color: ink, 
        transition: 'background 0.3s ease, color 0.3s ease' 
      }}
    >
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(64px, 7vw, 96px) 24px',
          boxSizing: 'border-box'
        }}
      >
        <p 
          className="pc-reveal-l"
          style={{ 
            margin: 0, 
            fontFamily: "'Oswald', sans-serif", 
            fontSize: '15px', 
            letterSpacing: '.14em', 
            textTransform: 'uppercase', 
            color: muted,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <SectionCornerStamp stroke={isDark ? '#A48BFF' : '#673DE6'} size={16} />
          <span>Preguntas frecuentes</span>
        </p>
        <MaskRevealH2 
          text="Antes de empezar"
          style={{ 
            margin: '10px 0 0', 
            fontFamily: "'Oswald', sans-serif", 
            fontWeight: 600, 
            fontSize: 'clamp(34px, 4vw, 54px)', 
            lineHeight: 1.05, 
            textTransform: 'uppercase',
            color: ink
          }}
        />

        <dl 
          style={{ 
            margin: '44px 0 0', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', 
            gap: '0 56px' 
          }}
        >
          {faqs.map((q, idx) => (
            <div 
              key={q.q} 
              className="pc-reveal-u"
              style={{ 
                padding: '24px 0', 
                borderTop: `2px solid ${line}`,
                '--pc-delay': `${Math.min(idx * 0.08, 0.36)}s`,
                transitionDelay: `${Math.min(idx * 0.08, 0.36)}s`
              }}
            >
              <dt style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '21px', textTransform: 'uppercase', lineHeight: 1.25 }}>
                {q.q}
              </dt>
              <dd style={{ margin: '10px 0 0', color: muted, fontSize: '15px', lineHeight: 1.6 }}>
                {q.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

