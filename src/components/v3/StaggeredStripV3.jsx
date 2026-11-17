import React from 'react';

export default function StaggeredStripV3() {
  const items = [
    { n: '01', t: 'Diseño web', delay: '.2s' },
    { n: '02', t: 'Posicionamiento en Google', delay: '.35s' },
    { n: '03', t: 'Google Maps', delay: '.5s' },
    { n: '04', t: 'WhatsApp Business', delay: '.65s' }
  ];

  return (
    <section style={{ background: '#121117', color: '#F4F2EC' }}>
      <ol 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '40px 24px', 
          listStyle: 'none', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '28px',
          boxSizing: 'border-box'
        }}
      >
        {items.map((h) => (
          <li key={h.n} className="pc-in-right" style={{ animationDelay: h.delay }}>
            <div style={{ width: '44px', height: '5px', background: '#673DE6', marginBottom: '14px' }} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '42px', fontWeight: 600, lineHeight: 1, color: '#A48BFF' }}>
                {h.n}
              </span>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1.15 }}>
                {h.t}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
