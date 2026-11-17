import React from 'react';

export default function GuaranteesBannerV3() {
  const items = [
    'Entrega en 4 días hábiles',
    '50% al empezar · 50% al aprobar',
    'La web es tuya, sin abonos',
    'Atención directa conmigo'
  ];

  return (
    <section 
      aria-label="Garantías de servicio"
      style={{ 
        background: '#673DE6', 
        color: '#FFFFFF', 
        overflow: 'hidden', 
        position: 'relative' 
      }}
    >
      <div 
        style={{ 
          padding: '22px 0', 
          width: '100%', 
          overflow: 'hidden', 
          boxSizing: 'border-box' 
        }}
      >
        <div className="pc-marquee-track" aria-hidden="false">
          {/* First loop of 4 items */}
          <div className="pc-marquee-group">
            {items.map((item, idx) => (
              <span key={`a-${idx}`} className="pc-marquee-item">
                <span>{item}</span>
                <span className="pc-marquee-sep" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
          {/* Second identical loop for seamless infinite marquee */}
          <div className="pc-marquee-group" aria-hidden="true">
            {items.map((item, idx) => (
              <span key={`b-${idx}`} className="pc-marquee-item">
                <span>{item}</span>
                <span className="pc-marquee-sep" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
