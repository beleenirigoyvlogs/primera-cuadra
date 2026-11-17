import React from 'react';

export default function FooterV3() {
  return (
    <footer style={{ background: '#121117', color: '#F4F2EC' }}>
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(56px, 7vw, 88px) 24px 48px',
          boxSizing: 'border-box'
        }}
      >
        {/* Call to Action Banner */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '28px', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingBottom: '52px', 
            borderBottom: '1px solid #2E2B36' 
          }}
        >
          <h2 
            style={{ 
              margin: 0, 
              flex: '999 1 500px', 
              fontFamily: "'Oswald', sans-serif", 
              fontWeight: 600, 
              fontSize: 'clamp(32px, 4.4vw, 60px)', 
              lineHeight: 1.05, 
              textTransform: 'uppercase' 
            }}
          >
            ¿Hablamos de <span style={{ color: '#A48BFF' }}>tu página web</span>?
          </h2>
          <a 
            href="https://wa.me/5491128779641?text=%C2%A1Hola%20Bel%C3%A9n!%20Quiero%20hablar%20sobre%20el%20dise%C3%B1o%20de%20mi%20p%C3%A1gina%20web." 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              textDecoration: 'none', 
              background: '#673DE6', 
              color: '#FFFFFF', 
              padding: '16px 28px', 
              borderRadius: '6px', 
              fontWeight: 600,
              fontSize: '16px',
              textAlign: 'center',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12z" />
            </svg>
            Escribime por WhatsApp
          </a>
        </div>

        {/* Local Landing Pages Links */}
        <div 
          style={{ 
            paddingTop: '28px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px 24px', 
            alignItems: 'center',
            fontSize: '14px', 
            color: '#A9A6B4' 
          }}
        >
          <span style={{ fontWeight: 600, color: '#F4F2EC' }}>Diseño web en:</span>
          <a href="/diseno-web-tigre" style={{ color: '#A48BFF', textDecoration: 'none' }}>Tigre</a>
          <span>·</span>
          <a href="/diseno-web-zona-norte" style={{ color: '#A48BFF', textDecoration: 'none' }}>Zona Norte</a>
          <span>·</span>
          <a href="/diseno-web-caba" style={{ color: '#A48BFF', textDecoration: 'none' }}>CABA</a>
          <span>·</span>
          <a href="/desarrollo-a-medida" style={{ color: '#CFCBD8', textDecoration: 'none' }}>Desarrollo a medida</a>
          <span>·</span>
          <a href="/simulador" style={{ color: '#CFCBD8', textDecoration: 'none' }}>Simulador</a>
        </div>

        {/* Copyright & Direct Contact */}
        <div 
          style={{ 
            paddingTop: '24px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '16px 36px', 
            justifyContent: 'space-between', 
            fontSize: '13px', 
            color: '#8E8B99',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginTop: '20px'
          }}
        >
          <span>Primera Cuadra · Diseño web en Tigre, Zona Norte y CABA</span>
          <span>11 2877-9641 · primeracuadraweb@gmail.com</span>
          <span>Esta web la diseñé y programé yo.</span>
        </div>
      </div>
    </footer>
  );
}

