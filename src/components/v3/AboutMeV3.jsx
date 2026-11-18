import React from 'react';
import SectionCornerStamp from './SectionCornerStamp';
import MaskRevealH2 from './MaskRevealH2';

export default function AboutMeV3() {
  return (
    <section 
      id="sobre-mi" 
      style={{ 
        background: '#18161E', 
        color: '#F4F2EC', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Decorative Striped Circle via SVG (Zero layout overflow) */}
      <svg 
        aria-hidden="true" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none', 
          overflow: 'hidden' 
        }}
      >
        <defs>
          <pattern id="about-stripes" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(164,139,255,0.28)" strokeWidth="3" />
          </pattern>
        </defs>
        <circle cx="30" cy="100%" r="150" fill="url(#about-stripes)" />
      </svg>

      <div 
        style={{ 
          position: 'relative', 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(64px, 7vw, 96px) 24px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '48px', 
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Photo Container - Enters from Left */}
        <figure 
          className="pc-reveal-l" 
          style={{ 
            flex: '1 1 280px', 
            margin: '0 auto', 
            position: 'relative', 
            maxWidth: 'min(360px, calc(100% - 24px))',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Offset Purple Border */}
          <div 
            aria-hidden="true" 
            style={{ 
              position: 'absolute', 
              right: '-12px', 
              top: '-12px', 
              width: '100%', 
              height: '100%', 
              border: '5px solid #673DE6', 
              borderRadius: '8px',
              pointerEvents: 'none'
            }} 
          />

          {/* Photo Card with Aspect Ratio 4/5 */}
          <div 
            style={{ 
              position: 'relative', 
              aspectRatio: '4 / 5', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              background: '#26232E',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <picture>
              <source srcSet="/belen-400.webp" type="image/webp" />
              <img 
                src="/belen.webp" 
                alt="Belén Irigoy - Fundadora y desarrolladora de Primera Cuadra" 
                width="400" 
                height="500" 
                loading="lazy" 
                decoding="async" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  display: 'block' 
                }} 
              />
            </picture>
          </div>
        </figure>

        {/* Text Column - Enters from Right */}
        <div className="pc-reveal-r" style={{ flex: '999 1 480px', minWidth: 0 }}>
          <p 
            style={{ 
              margin: 0, 
              fontFamily: "'Oswald', sans-serif", 
              fontSize: '15px', 
              letterSpacing: '.14em', 
              textTransform: 'uppercase', 
              color: '#A48BFF',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <SectionCornerStamp stroke="#A48BFF" size={16} />
            <span>Quién está detrás</span>
          </p>
          <MaskRevealH2 
            text="Hola, soy Belén Irigoy"
            style={{ 
              margin: '10px 0 0', 
              fontFamily: "'Oswald', sans-serif", 
              fontWeight: 600, 
              fontSize: 'clamp(34px, 4vw, 54px)', 
              lineHeight: 1.05, 
              textTransform: 'uppercase',
              color: '#F4F2EC'
            }}
          />
          <p 
            style={{ 
              margin: '22px 0 0', 
              fontSize: 'clamp(16px, 2vw, 18px)', 
              color: '#E4E0D7', 
              lineHeight: 1.6 
            }}
          >
            Diseño y programo páginas web desde Tigre para negocios de Tigre, Zona Norte y CABA. Creé Primera Cuadra para que cualquier negocio, del rubro y el tamaño que sea, tenga una web a la altura de lo que hace.
          </p>
          <p 
            style={{ 
              margin: '16px 0 0', 
              color: '#CFCBD8', 
              fontSize: '16px', 
              lineHeight: 1.6 
            }}
          >
            Muchos negocios trabajan muy bien, pero cuando alguien los busca en Google no los encuentra y termina eligiendo a otro. Mi trabajo es que eso no te pase. Cada proyecto lo atiendo yo, sin intermediarios.
          </p>
          <a 
            href="https://wa.me/5491128779641?text=%C2%A1Hola%20Bel%C3%A9n!%20Le%C3%AD%20tu%20presentaci%C3%B3n%20en%20Primera%20Cuadra%20y%20quer%C3%ADa%20hacerte%20una%20consulta." 
            target="_blank" 
            rel="noopener noreferrer" 
            data-wa="sobre-mi"
            style={{ 
              display: 'inline-block', 
              marginTop: '30px', 
              textDecoration: 'none', 
              background: '#673DE6', 
              color: '#FFFFFF', 
              padding: '15px 26px', 
              borderRadius: '6px', 
              fontWeight: 600,
              fontSize: '15px'
            }}
          >
            Hablar con Belén
          </a>
        </div>
      </div>
    </section>
  );
}
