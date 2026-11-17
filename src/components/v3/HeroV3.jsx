import React, { useState, useEffect } from 'react';

export default function HeroV3({ 
  zoneKicker = 'Diseño web en Tigre, Zona Norte y CABA',
  zoneH1 = null,
  zoneIntro = 'Diseño tu página web profesional, la preparo para aparecer en Google y la conecto con tu ficha de Google Maps y tu WhatsApp. Trabajás directo conmigo, de principio a fin.'
}) {
  const words = ['comercios.', 'profesionales.', 'empresas.', 'emprendedores.'];
  const [typed, setTyped] = useState('comercios.');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let w = 0;
    let i = words[0].length;
    let del = true;
    let pause = 14;

    const timer = setInterval(() => {
      if (pause > 0) {
        pause--;
        return;
      }
      const word = words[w];
      if (del) {
        i--;
        if (i <= 0) {
          del = false;
          w = (w + 1) % words.length;
        }
      } else {
        i++;
        if (i >= words[w].length) {
          del = true;
          pause = 22;
        }
      }
      setTyped(words[w].slice(0, Math.max(i, 0)));
    }, 85);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="inicio" 
      style={{ 
        background: '#18161E', 
        color: '#F4F2EC', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Decorative Background Shapes via SVG (Zero layout overflow) */}
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
          <pattern id="hero-stripes" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(164,139,255,0.32)" strokeWidth="3" />
          </pattern>
        </defs>
        {/* Purple circle: right -160px, top -180px, 520x520 -> center at (100% + 100px, 80px), r=260 */}
        <circle cx="calc(100% + 100px)" cy="80" r="260" fill="#673DE6" />
        {/* Striped circle: left 46%, bottom -150px, 300x300 -> center at (55%, 100%), r=150 */}
        <circle cx="55%" cy="100%" r="150" fill="url(#hero-stripes)" />
      </svg>

      {/* Dot Grid */}
      <div 
        aria-hidden="true" 
        style={{ 
          position: 'absolute', 
          left: '24px', 
          top: '48px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 8px)', 
          gap: '14px',
          pointerEvents: 'none',
          opacity: 0.8
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A48BFF' }} />
      </div>

      <div 
        style={{ 
          position: 'relative', 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(64px, 8vw, 112px) 24px clamp(56px, 7vw, 104px)', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '48px', 
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Left Column */}
        <div 
          className="pc-in-left" 
          style={{ 
            flex: '999 1 540px', 
            minWidth: 0,
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          <p 
            style={{ 
              margin: '0 0 20px', 
              fontFamily: "'Oswald', sans-serif", 
              fontSize: '15px', 
              letterSpacing: '.14em', 
              textTransform: 'uppercase', 
              color: '#A48BFF',
              wordBreak: 'break-word'
            }}
          >
            {zoneKicker}
          </p>

          <h1 
            style={{ 
              margin: 0, 
              fontFamily: "'Poppins', sans-serif", 
              fontWeight: 700, 
              fontSize: 'clamp(34px, 5.2vw, 76px)', 
              lineHeight: 1.05, 
              letterSpacing: '-0.03em',
              wordBreak: 'break-word'
            }}
          >
            {zoneH1 ? (
              zoneH1
            ) : (
              <>
                Diseño de páginas web<br />
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0, color: '#A9A6B4' }}>
                  para{' '}
                </span>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0, color: '#FFFFFF' }} aria-live="off">
                  {typed}
                </span>
                <span className="pc-caret" aria-hidden="true" style={{ color: '#A48BFF' }} />
                <span className="sr-only">para comercios, profesionales, empresas y emprendedores.</span>
              </>
            )}
          </h1>

          <p 
            style={{ 
              margin: '24px 0 0', 
              maxWidth: '560px', 
              fontSize: 'clamp(16px, 2vw, 18px)', 
              lineHeight: 1.6,
              color: '#CFCBD8',
              wordBreak: 'break-word'
            }}
          >
            {zoneIntro}
          </p>

          <div 
            style={{ 
              marginTop: '36px', 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '14px' 
            }}
          >
            <a 
              href="https://wa.me/5491128779641" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                textDecoration: 'none', 
                background: '#673DE6', 
                color: '#FFFFFF', 
                padding: '15px 26px', 
                borderRadius: '6px', 
                fontWeight: 600,
                fontSize: '16px',
                textAlign: 'center',
                flexGrow: 0
              }}
            >
              Pedir presupuesto sin costo
            </a>
            <a 
              href="#ejemplos" 
              style={{ 
                textDecoration: 'none', 
                border: '2px solid #F4F2EC', 
                color: '#F4F2EC', 
                padding: '13px 24px', 
                borderRadius: '6px', 
                fontWeight: 600,
                fontSize: '16px',
                textAlign: 'center',
                flexGrow: 0
              }}
            >
              Ver portfolio
            </a>
          </div>
        </div>

        {/* Right Column: Floating Phone Mockup & Floating Sub-Cards */}
        <div 
          className="pc-in-right pc-hero-phone-container" 
          style={{ 
            flex: '1 1 360px', 
            minWidth: 0, 
            maxWidth: '100%',
            display: 'flex', 
            justifyContent: 'center', 
            position: 'relative', 
            minHeight: '540px',
            boxSizing: 'border-box'
          }}
        >
          {/* Main Floating Phone */}
          <div 
            className="pc-float" 
            style={{ 
              width: '268px', 
              maxWidth: '85vw',
              height: '530px', 
              borderRadius: '40px', 
              background: '#0E0D12', 
              padding: '10px', 
              boxShadow: '0 40px 80px rgba(0,0,0,.45)', 
              border: '1px solid #2E2B36',
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '31px', 
                overflow: 'hidden', 
                background: '#F7F6F2', 
                color: '#1B1B1B', 
                display: 'flex', 
                flexDirection: 'column', 
                fontSize: '12px', 
                lineHeight: 1.4 
              }}
            >
              {/* Speaker notch */}
              <div style={{ height: '26px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ width: '70px', height: '6px', borderRadius: '99px', background: '#18161E' }} />
              </div>

              {/* Phone app header */}
              <div style={{ padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E3E0D9' }}>
                <b style={{ fontSize: '13px' }}>Tu negocio</b>
                <span style={{ fontSize: '10px', color: '#55524C' }}>Menú</span>
              </div>

              {/* Phone hero card */}
              <div style={{ background: '#673DE6', color: '#FFFFFF', padding: '20px 14px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', opacity: .85 }}>
                  Tu rubro · Tu zona
                </div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '21px', textTransform: 'uppercase', lineHeight: 1.1, marginTop: '6px' }}>
                  Lo que hacés, bien explicado
                </div>
                <div style={{ marginTop: '12px', display: 'inline-block', background: '#FFFFFF', color: '#4B25C4', fontWeight: 600, padding: '6px 12px', borderRadius: '4px', fontSize: '11px' }}>
                  Consultar por WhatsApp
                </div>
              </div>

              {/* Phone content list */}
              <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#55524C' }}>
                  Servicios y precios
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', background: '#FFFFFF', borderRadius: '6px' }}>
                  <span>Servicio principal</span>
                  <b>$ —</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', background: '#FFFFFF', borderRadius: '6px' }}>
                  <span>Otro servicio</span>
                  <b>$ —</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', background: '#FFFFFF', borderRadius: '6px' }}>
                  <span>Combo</span>
                  <b>$ —</b>
                </div>
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#55524C', marginTop: '4px' }}>
                  Dónde estamos
                </div>
                <div 
                  style={{ 
                    height: '56px', 
                    borderRadius: '6px', 
                    background: 'repeating-linear-gradient(0deg, #E6E3DC 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, #E6E3DC 0 1px, #EFEDE8 1px 16px)', 
                    position: 'relative' 
                  }}
                >
                  <span 
                    style={{ 
                      position: 'absolute', 
                      left: '50%', 
                      top: '38%', 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50% 50% 50% 0', 
                      transform: 'rotate(-45deg)', 
                      background: '#673DE6' 
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card: Google Maps */}
          <div 
            className="pc-float-b pc-subcard-maps" 
            style={{ 
              position: 'absolute', 
              left: 'clamp(-10px, 2vw, 10px)', 
              top: '60px', 
              background: '#F7F6F2', 
              color: '#1B1B1B', 
              borderRadius: '10px', 
              padding: '12px 14px', 
              width: '190px', 
              maxWidth: '85%',
              boxShadow: '0 18px 40px rgba(0,0,0,.35)', 
              fontSize: '13px',
              zIndex: 3
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#673DE6" strokeWidth="2.2" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <b>Google Maps</b>
            </div>
            <div style={{ marginTop: '6px', color: '#55524C', fontSize: '12px', lineHeight: 1.35 }}>
              Tu ficha completa: horarios, fotos y cómo llegar.
            </div>
          </div>

          {/* Floating Card: WhatsApp Message */}
          <div 
            className="pc-float-c pc-subcard-wa" 
            style={{ 
              position: 'absolute', 
              right: 'clamp(-10px, 2vw, 10px)', 
              bottom: '60px', 
              background: '#DCF5E3', 
              color: '#10301C', 
              borderRadius: '12px 12px 2px 12px', 
              padding: '12px 14px', 
              width: '200px', 
              maxWidth: '85%',
              boxShadow: '0 18px 40px rgba(0,0,0,.35)', 
              fontSize: '13px',
              zIndex: 3
            }}
          >
            <b style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#1E6B3A' }}>
              WhatsApp · nuevo mensaje
            </b>
            <div style={{ marginTop: '4px', fontSize: '12px', lineHeight: 1.35 }}>
              ¡Hola! Vi tu web y quería consultar por un presupuesto.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
