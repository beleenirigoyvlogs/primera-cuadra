import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function FAQV3() {
  const { isDark } = useTheme();

  const lightBg = isDark ? '#1E1C24' : '#EFEDE8';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';

  const faqs = [
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
      a: 'La web es tuya. Solo pagás la renovación del dominio y el hosting, que te informo al contratar.' 
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
          padding: 'clamp(64px, 8vw, 104px) 24px',
          boxSizing: 'border-box'
        }}
      >
        <p 
          style={{ 
            margin: 0, 
            fontFamily: "'Oswald', sans-serif", 
            fontSize: '15px', 
            letterSpacing: '.14em', 
            textTransform: 'uppercase', 
            color: muted 
          }}
        >
          Preguntas frecuentes
        </p>
        <h2 
          style={{ 
            margin: '10px 0 0', 
            fontFamily: "'Oswald', sans-serif", 
            fontWeight: 600, 
            fontSize: 'clamp(34px, 4vw, 54px)', 
            lineHeight: 1.05, 
            textTransform: 'uppercase' 
          }}
        >
          Antes de empezar
        </h2>

        <dl 
          style={{ 
            margin: '48px 0 0', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', 
            gap: '0 56px' 
          }}
        >
          {faqs.map((q) => (
            <div key={q.q} style={{ padding: '24px 0', borderTop: `2px solid ${line}` }}>
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
