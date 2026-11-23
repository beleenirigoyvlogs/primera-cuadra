import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import SectionCornerStamp from './SectionCornerStamp';
import MaskRevealH2 from './MaskRevealH2';
import DotGridFlashlight from './DotGridFlashlight';

export default function ServicesV3() {
  const { isDark } = useTheme();

  const lightBg = isDark ? '#1E1C24' : '#EFEDE8';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const numberColor = isDark ? '#F1EEE7' : '#1B1B1B';

  const services = [
    { 
      n: '01', 
      title: 'Diseño de páginas web', 
      text: 'Tu web a medida, con dominio propio y pensada para el celular: servicios, precios, fotos, ubicación y botón directo a WhatsApp.' 
    },
    { 
      n: '02', 
      title: 'Posicionamiento en Google', 
      text: 'Estructura, textos y velocidad optimizados para que tu web aparezca cuando buscan lo que ofrecés en tu zona.' 
    },
    { 
      n: '03', 
      title: 'Ficha de Google Maps', 
      text: 'Categoría correcta, fotos, horarios, servicios y respuestas a reseñas para aparecer en el mapa de tu zona.' 
    },
    { 
      n: '04', 
      title: 'WhatsApp Business', 
      text: 'Perfil de empresa, catálogo con precios y respuestas rápidas para convertir cada visita en una consulta.' 
    }
  ];

  return (
    <section 
      id="servicios" 
      style={{ 
        background: lightBg, 
        color: ink, 
        transition: 'background 0.3s ease, color 0.3s ease',
        position: 'relative'
      }}
    >
      <DotGridFlashlight>
        <div 
          style={{ 
            maxWidth: '1240px', 
            margin: '0 auto', 
            padding: 'clamp(36px, 4vw, 56px) 24px',
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
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SectionCornerStamp color="#673DE6" size={15} />
            Qué hago
          </p>
          <MaskRevealH2 
            style={{ 
              margin: '10px 0 0', 
              fontFamily: "'Oswald', sans-serif", 
              fontWeight: 600, 
              fontSize: 'clamp(34px, 4vw, 54px)', 
              lineHeight: 1.05, 
              textTransform: 'uppercase', 
              letterSpacing: '-0.005em' 
            }}
          >
            Servicios de diseño web
          </MaskRevealH2>
          <p 
            className="pc-reveal-u"
            style={{ 
              margin: '16px 0 0', 
              maxWidth: '680px', 
              fontSize: 'clamp(16px, 1.8vw, 17px)', 
              lineHeight: 1.6,
              color: muted 
            }}
          >
            Una web profesional sola no alcanza: tiene que aparecer en Google y llevar al cliente a escribirte. Por eso armo las cuatro piezas juntas.
          </p>

        <div 
          style={{ 
            marginTop: '44px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '40px 48px' 
          }}
        >
          {services.map((s, idx) => (
            <article 
              key={s.n} 
              className="pc-reveal-u"
              style={{
                '--pc-delay': `${idx * 0.12}s`,
                transitionDelay: `${idx * 0.12}s`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span 
                  style={{ 
                    fontFamily: "'Oswald', sans-serif", 
                    fontSize: '52px', 
                    fontWeight: 600, 
                    lineHeight: 1, 
                    color: numberColor 
                  }}
                >
                  {s.n}
                </span>
                <span style={{ flex: 1, height: '5px', background: '#673DE6', maxWidth: '72px' }} />
              </div>
              <h3 
                style={{ 
                  margin: '18px 0 10px', 
                  fontFamily: "'Oswald', sans-serif", 
                  fontSize: '26px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  lineHeight: 1.15 
                }}
              >
                {s.title}
              </h3>
              <p style={{ margin: 0, color: muted, fontSize: '15px', lineHeight: 1.6 }}>
                {s.text}
              </p>
            </article>
          ))}
        </div>
      </div>
      </DotGridFlashlight>
    </section>
  );
}

