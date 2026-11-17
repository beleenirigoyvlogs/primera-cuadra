import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function PortfolioV3() {
  const { isDark } = useTheme();

  const altBg = isDark ? '#19171F' : '#E5E2DB';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const shadow = isDark ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.08)';

  const examples = [
    { 
      rubro: 'Parrilla', 
      kicker: 'Parrilla & bodegón', 
      name: 'El Fogón de Tigre', 
      href: '/ejemplos/parrilla',
      image: '/demos/parrilla/cover.webp'
    },
    { 
      rubro: 'Barbería', 
      kicker: 'Barbería urbana', 
      name: 'Barber Studio 96', 
      href: '/ejemplos/barberia',
      image: '/demos/barberia/cover.webp'
    },
    { 
      rubro: 'Taller', 
      kicker: 'Mecánica integral', 
      name: 'Mecánica Álvarez', 
      href: '/ejemplos/taller',
      image: '/demos/taller/cover.webp'
    },
    { 
      rubro: 'Dental', 
      kicker: 'Odontología', 
      name: 'Centro Delta', 
      href: '/ejemplos/dental',
      image: '/demos/dental/cover.webp'
    }
  ];

  return (
    <section 
      id="ejemplos" 
      style={{ 
        background: altBg, 
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 56px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 480px' }}>
            <p 
              className="pc-reveal-l"
              style={{ 
                margin: 0, 
                fontFamily: "'Oswald', sans-serif", 
                fontSize: '15px', 
                letterSpacing: '.14em', 
                textTransform: 'uppercase', 
                color: muted 
              }}
            >
              Portfolio
            </p>
            <h2 
              className="pc-reveal-u"
              style={{ 
                margin: '10px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(34px, 4vw, 54px)', 
                lineHeight: 1.05, 
                textTransform: 'uppercase' 
              }}
            >
              Ejemplos de páginas web
            </h2>
          </div>
          <p 
            className="pc-reveal-u"
            style={{ 
              margin: 0, 
              flex: '1 1 380px', 
              maxWidth: '480px', 
              color: muted,
              fontSize: '15px',
              lineHeight: 1.6
            }}
          >
            Webs completas que diseñé para cuatro rubros. Los negocios son ficticios; el diseño y el código son reales. Entrá y navegalas.
          </p>
        </div>

        <div 
          style={{ 
            marginTop: '44px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '24px' 
          }}
        >
          {examples.map((e, idx) => (
            <a 
              key={e.rubro}
              href={e.href} 
              className="pc-reveal-u pc-card-hover" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex', 
                flexDirection: 'column', 
                background: cardBg, 
                borderRadius: '8px', 
                overflow: 'hidden', 
                boxShadow: `0 12px 30px ${shadow}`,
                color: ink,
                '--pc-delay': `${idx * 0.12}s`,
                transitionDelay: `${idx * 0.12}s`
              }}
            >
              <div 
                style={{ 
                  aspectRatio: '4 / 3', 
                  width: '100%', 
                  overflow: 'hidden', 
                  position: 'relative',
                  background: '#151515'
                }}
              >
                <img 
                  src={e.image} 
                  alt={`Captura real de la página web de ejemplo: ${e.name} (${e.rubro})`} 
                  width="800" 
                  height="600" 
                  loading="lazy" 
                  decoding="async" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block' 
                  }} 
                />
              </div>
              <div 
                style={{ 
                  padding: '18px 20px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  gap: '12px', 
                  borderTop: '5px solid #673DE6' 
                }}
              >
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', textTransform: 'uppercase' }}>
                  {e.rubro}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#A48BFF' : '#5025C4' }}>
                  Ver web <span className="pc-arrow" style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

