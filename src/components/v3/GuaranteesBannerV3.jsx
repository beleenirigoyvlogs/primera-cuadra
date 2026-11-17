import React from 'react';

export default function GuaranteesBannerV3() {
  return (
    <section style={{ background: '#673DE6', color: '#FFFFFF' }}>
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '22px 24px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '16px 40px', 
          justifyContent: 'space-between', 
          fontFamily: "'Oswald', sans-serif", 
          fontSize: 'clamp(15px, 2vw, 18px)', 
          textTransform: 'uppercase', 
          letterSpacing: '.03em',
          boxSizing: 'border-box'
        }}
      >
        <span>Entrega en 4 días hábiles</span>
        <span>50% al empezar · 50% al aprobar</span>
        <span>La web es tuya, sin abonos</span>
        <span>Atención directa conmigo</span>
      </div>
    </section>
  );
}
