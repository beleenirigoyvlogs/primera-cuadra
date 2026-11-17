import React from 'react';

export default function EarlyAdoptersV3() {
  return (
    <section className="pc-early-adopters" style={{ background: '#673DE6', color: '#FFFFFF' }}>
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(56px, 6vw, 72px) 24px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '32px 56px', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ flex: '999 1 520px', minWidth: 0 }}>
          <h2 
            style={{ 
              margin: 0, 
              fontFamily: "'Oswald', sans-serif", 
              fontWeight: 600, 
              fontSize: 'clamp(30px, 3.4vw, 46px)', 
              lineHeight: 1.05, 
              textTransform: 'uppercase',
              color: '#FFFFFF'
            }}
          >
            Busco mis primeros 5 negocios
          </h2>
          <p 
            style={{ 
              margin: '14px 0 0', 
              maxWidth: '640px', 
              fontSize: 'clamp(15px, 1.8vw, 17px)', 
              lineHeight: 1.6,
              color: '#FFFFFF',
              opacity: 1,
              fontWeight: 500
            }}
          >
            Primera Cuadra es un proyecto nuevo. Los primeros cinco acceden al precio de lanzamiento; a cambio, te pido tu opinión sincera y permiso para mostrar el trabajo terminado.
          </p>
        </div>

        <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '56px', fontWeight: 600, lineHeight: 1, color: '#FFFFFF' }}>
            5 <span style={{ fontSize: '20px', textTransform: 'uppercase', color: '#FFFFFF' }}>lugares libres</span>
          </div>
          <a 
            href="https://wa.me/5491128779641?text=%C2%A1Hola%20Bel%C3%A9n!%20Quiero%20uno%20de%20los%205%20lugares%20de%20lanzamiento%20de%20Primera%20Cuadra." 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              textDecoration: 'none', 
              background: '#FFFFFF', 
              color: '#4B25C4', 
              padding: '15px 26px', 
              borderRadius: '6px', 
              fontWeight: 600,
              fontSize: '15px'
            }}
          >
            Quiero un lugar
          </a>
        </div>
      </div>
    </section>
  );
}

