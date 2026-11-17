import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import ThePointLightbox from './ThePointLightbox';

export default function ThePointV3() {
  const { isDark } = useTheme();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const lightBg = isDark ? '#1E1C24' : '#EFEDE8';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';
  const shadow = isDark ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.08)';

  const stack = ['Electron', 'Node.js', 'React', 'SQLite'];

  return (
    <section 
      id="caso"
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
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '48px', 
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Left Column Description */}
        <div style={{ flex: '1 1 380px', minWidth: 0 }}>
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
            Desarrollo a medida
          </p>
          <h2 
            style={{ 
              margin: '10px 0 0', 
              fontFamily: "'Oswald', sans-serif", 
              fontWeight: 600, 
              fontSize: 'clamp(30px, 3.4vw, 46px)', 
              lineHeight: 1.08, 
              textTransform: 'uppercase' 
            }}
          >
            The Point: sistema de caja y stock
          </h2>
          <p 
            style={{ 
              margin: '20px 0 0', 
              color: muted, 
              fontSize: '16px', 
              lineHeight: 1.6 
            }}
          >
            Un sistema que diseñé y programé para un emprendimiento propio: punto de venta táctil, control de stock, caja diaria y reportes. Funciona sin internet y sin abonos mensuales.
          </p>
          <ul 
            style={{ 
              margin: '24px 0 0', 
              padding: 0, 
              listStyle: 'none', 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px' 
            }}
          >
            {stack.map((k) => (
              <li 
                key={k} 
                style={{ 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  padding: '6px 12px', 
                  border: `2px solid ${ink}`, 
                  borderRadius: '4px' 
                }}
              >
                {k}
              </li>
            ))}
          </ul>
          <a 
            href="/desarrollo-a-medida" 
            style={{ 
              display: 'inline-block', 
              marginTop: '30px', 
              textDecoration: 'none', 
              fontWeight: 600, 
              borderBottom: '3px solid #673DE6', 
              paddingBottom: '2px', 
              color: ink 
            }}
          >
            Ver el caso completo →
          </a>
        </div>

        {/* Right Column: Desktop Window Frame with High-Res Screenshot & Lightbox Trigger */}
        <figure 
          className="pc-reveal-r" 
          style={{ 
            flex: '999 1 540px', 
            minWidth: 0, 
            margin: 0, 
            position: 'relative' 
          }}
        >
          {/* Decorative Purple Accent Circle */}
          <div 
            aria-hidden="true" 
            style={{ 
              position: 'absolute', 
              left: '-24px', 
              top: '-24px', 
              width: '130px', 
              height: '130px', 
              borderRadius: '50%', 
              background: '#673DE6',
              pointerEvents: 'none'
            }} 
          />

          {/* Window Container */}
          <div 
            style={{ 
              position: 'relative', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              border: `1px solid ${line}`, 
              background: '#11161D', 
              boxShadow: `0 24px 60px ${shadow}` 
            }}
          >
            {/* Window Header */}
            <div 
              style={{ 
                height: '34px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '0 14px', 
                background: '#0B0F14', 
                fontSize: '13px', 
                color: '#8A96A3' 
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '99px', background: '#3A4450' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '99px', background: '#3A4450' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '99px', background: '#3A4450' }} />
              <span style={{ marginLeft: '10px', fontFamily: "'Poppins', sans-serif", fontSize: '12px' }}>
                The Point — Punto de venta
              </span>
            </div>

            {/* Clickable High-Res Image Area */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              style={{ 
                aspectRatio: '16 / 9', 
                width: '100%', 
                cursor: 'zoom-in', 
                position: 'relative',
                overflow: 'hidden'
              }}
              title="Click para abrir el visor en alta resolución"
            >
              <picture>
                <source srcSet="/thepoint/pos-1200.avif 1200w, /thepoint/pos-1800.avif 1800w, /thepoint/pos-full.avif 2400w" sizes="(max-width: 768px) 100vw, 55vw" type="image/avif" />
                <source srcSet="/thepoint/pos-1200.webp 1200w, /thepoint/pos-1800.webp 1800w, /thepoint/pos-full.webp 2400w" sizes="(max-width: 768px) 100vw, 55vw" type="image/webp" />
                <img 
                  src="/thepoint/pos.webp" 
                  alt="The Point - Sistema de Punto de Venta POS táctil y control de stock" 
                  width="1200" 
                  height="675" 
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
          </div>
        </figure>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <ThePointLightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        initialIndex={0} 
      />
    </section>
  );
}

