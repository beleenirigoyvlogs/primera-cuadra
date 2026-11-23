import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import SectionCornerStamp from './SectionCornerStamp';
import MaskRevealH2 from './MaskRevealH2';

export default function PricingV3() {
  const { isDark } = useTheme();

  const lightBg = isDark ? '#1E1C24' : '#EFEDE8';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';
  const shadow = isDark ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.08)';

  const plans = [
    {
      name: 'Express',
      desc: 'Para aparecer en Google Maps y atender por WhatsApp, sin página web.',
      price: '$120.000',
      split: '$60.000 al empezar · $60.000 al aprobar',
      items: [
        'Ficha de Google Maps completa',
        'WhatsApp Business con catálogo',
        'Botón para consultar o reservar',
        'Entrega en 48 horas'
      ],
      rec: false,
      bg: cardBg,
      fg: ink,
      line: line,
      check: '#673DE6'
    },
    {
      name: 'Solo web',
      desc: 'Tu página web profesional con dominio propio y WhatsApp directo.',
      price: '$150.000',
      split: '$75.000 al empezar · $75.000 al aprobar',
      items: [
        'Diseño web a medida, para celular',
        'Dominio .com.ar a tu nombre',
        'Optimizada para Google',
        'Entrega en 4 días hábiles'
      ],
      rec: false,
      bg: cardBg,
      fg: ink,
      line: line,
      check: '#673DE6'
    },
    {
      name: 'Completo',
      desc: 'Página web, Google Maps y WhatsApp Business, todo conectado.',
      price: '$220.000',
      split: '$110.000 al empezar · $110.000 al aprobar',
      savings: 'Ahorrás $50.000 frente a contratar Express + Solo web por separado',
      items: [
        'Todo lo del plan Solo web',
        'Ficha de Google Maps completa',
        'WhatsApp Business con catálogo',
        'Entrega en 4 días hábiles'
      ],
      rec: true,
      bg: '#18161E',
      fg: '#F4F2EC',
      line: '#34313C',
      check: '#A48BFF'
    }
  ];

  return (
    <section 
      id="precios" 
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
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <SectionCornerStamp stroke={isDark ? '#A48BFF' : '#673DE6'} size={16} />
          <span>Precios</span>
        </p>
        <MaskRevealH2 
          text="Planes de diseño web"
          style={{ 
            margin: '10px 0 0', 
            fontFamily: "'Oswald', sans-serif", 
            fontWeight: 600, 
            fontSize: 'clamp(34px, 4vw, 54px)', 
            lineHeight: 1.05, 
            textTransform: 'uppercase',
            color: ink
          }}
        />
        <p 
          className="pc-reveal-u"
          style={{ 
            margin: '16px 0 0', 
            maxWidth: '680px', 
            fontSize: '16px',
            lineHeight: 1.6,
            color: muted 
          }}
        >
          Pago único, precio de lanzamiento para los primeros cinco negocios. Después pasan a $200.000, $250.000 y $400.000.
        </p>

        <div 
          style={{ 
            marginTop: '44px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px', 
            alignItems: 'stretch' 
          }}
        >
          {plans.map((pl, idx) => {
            const isCompleto = pl.name === 'Completo';
            const cardContent = (
              <article 
                key={pl.name}
                className={`pc-reveal-u pc-card-hover ${isCompleto ? 'pc-plan-completo-card' : ''}`}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  background: pl.bg, 
                  color: pl.fg, 
                  borderRadius: '8px', 
                  padding: '34px 28px', 
                  boxShadow: `0 12px 30px ${shadow}`, 
                  borderTop: isCompleto ? 'none' : '6px solid #673DE6',
                  '--pc-delay': `${idx * 0.12}s`,
                  transitionDelay: `${idx * 0.12}s`,
                  boxSizing: 'border-box',
                  height: '100%'
                }}
              >
                {/* Header with Title and Recommended Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', minHeight: '30px' }}>
                  <h3 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 600, textTransform: 'uppercase' }}>
                    {pl.name}
                  </h3>
                  {pl.rec && (
                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', background: '#673DE6', color: '#FFFFFF', borderRadius: '4px', padding: '4px 10px' }}>
                      Recomendado
                    </span>
                  )}
                </div>

              {/* Description */}
              <p style={{ margin: '10px 0 0', fontSize: '15px', opacity: .85, minHeight: '48px', lineHeight: 1.5 }}>
                {pl.desc}
              </p>

              {/* Price & Split */}
              <div style={{ marginTop: '22px', fontFamily: "'Oswald', sans-serif", fontSize: '52px', fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {pl.price}
              </div>
              <div style={{ marginTop: '6px', fontSize: '14px', opacity: .8 }}>
                {pl.split}
              </div>
              {pl.savings && (
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#A48BFF', fontWeight: 500, lineHeight: 1.4 }}>
                  {pl.savings}
                </div>
              )}

              {/* Items List */}
              <ul style={{ margin: '26px 0 0', padding: '22px 0 0', listStyle: 'none', borderTop: `1px solid ${pl.line}`, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', flex: 1 }}>
                {pl.items.map((it, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pl.check} strokeWidth="3" aria-hidden="true" style={{ flexShrink: 0, marginTop: '4px' }}>
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <a 
                href={`https://wa.me/5491128779641?text=${encodeURIComponent(`¡Hola Belén! Me interesa contratar el plan ${pl.name} de Primera Cuadra.`)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                data-wa={pl.name === 'Express' ? 'precios-express' : pl.name === 'Solo web' ? 'precios-solo-web' : 'precios-completo'}
                style={{ 
                  marginTop: '28px', 
                  textAlign: 'center', 
                  textDecoration: 'none', 
                  padding: '14px 20px', 
                  borderRadius: '6px', 
                  fontWeight: 600, 
                  background: '#673DE6', 
                  color: '#FFFFFF',
                  fontSize: '15px'
                }}
              >
                Elegir {pl.name}
              </a>
            </article>
          );

          if (isCompleto) {
            return (
              <div key={pl.name} className="pc-plan-completo-wrap">
                {cardContent}
              </div>
            );
          }
          return cardContent;
        })}
        </div>

        {/* Link to Free Audit */}
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <a 
            href="#revision" 
            style={{ 
              color: isDark ? '#A48BFF' : '#5B33D6', 
              textDecoration: 'none', 
              fontSize: '15px', 
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ¿No sabés qué plan necesitás? Pedí la revisión gratis →
          </a>
        </div>

        <p style={{ margin: '26px 0 0', fontSize: '14px', color: muted, maxWidth: '780px', lineHeight: 1.6 }}>
          <strong>Incluido el primer año:</strong> dominio .com.ar y hosting. <strong>Desde el segundo año:</strong> renovación aproximada de $10.000 por año, que pagás directo a tu nombre. <strong>Mantenimiento mensual opcional:</strong> $50.000 por mes. Incluye cambios de textos, precios y fotos, y revisión de que todo funcione. Transferencia, Mercado Pago o efectivo.
        </p>
      </div>
    </section>
  );
}

