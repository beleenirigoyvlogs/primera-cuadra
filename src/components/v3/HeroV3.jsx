import React, { useState, useEffect, useRef } from 'react';
import { useMagneticButton } from '../../hooks/useMagneticButton';

export default function HeroV3({ 
  zoneKicker = 'Diseño web en Tigre, Zona Norte y CABA',
  zoneH1 = null,
  zoneIntro = 'Diseño tu página web profesional, la preparo para aparecer en Google y la conecto con tu ficha de Google Maps y tu WhatsApp. Trabajás directo conmigo, de principio a fin.'
}) {
  const words = ['comercios.', 'profesionales.', 'empresas.', 'emprendedores.'];
  const [typed, setTyped] = useState('comercios.');
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Hero Mini-Demo State (loop ~6s, max 3 repeats, pauses offscreen)
  const heroRef = useRef(null);
  const heroBtnRef = useMagneticButton(6);
  const [demoCycle, setDemoCycle] = useState(0);
  const [demoStep, setDemoStep] = useState(1); // 0: pin drop & typing, 1: cursor enters & message reveals, 2: click & ripple, 3: rest
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // IntersectionObserver for Hero visibility
  useEffect(() => {
    if (typeof window === 'undefined' || !heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Mini-Demo Timer Loop
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDemoCycle(3);
      setDemoStep(3);
      return;
    }

    if (demoCycle >= 3 || !isHeroVisible) return;

    // Timeline inside each 6s cycle (with gentle initial delay to keep hydration smooth)
    const startDelay = demoCycle === 0 ? 800 : 0;
    const t0 = setTimeout(() => {
      setDemoStep(0);
    }, startDelay);

    const t1 = setTimeout(() => {
      setDemoStep(1); // Message reveals, cursor moves in
    }, startDelay + 1100);

    const t2 = setTimeout(() => {
      setDemoStep(2); // Click + purple ripple
    }, startDelay + 2300);

    const t3 = setTimeout(() => {
      setDemoStep(3); // Cursor recedes, message stays
    }, startDelay + 3200);

    const tCycle = setTimeout(() => {
      setDemoCycle((c) => c + 1);
    }, startDelay + 6000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tCycle);
    };
  }, [demoCycle, isHeroVisible]);

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

    // Desktop 3D mouse tilt (max 8deg)
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      const ry = Math.max(-8, Math.min(8, nx * 8));
      const rx = Math.max(-8, Math.min(8, -ny * 8));
      setTilt({ rx, ry });
    };

    // Parallax on scroll for decorative circles
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      style={{ 
        background: '#18161E', 
        color: '#F4F2EC', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Decorative Background Shapes via SVG (Zero layout overflow) with subtle scroll parallax */}
      <svg 
        aria-hidden="true" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none', 
          overflow: 'hidden',
          transform: `translateY(${Math.min(scrollY * 0.15, 60)}px)`,
          transition: 'transform 0.1s linear'
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
                <span className="sr-only">
                  Diseño de páginas web para comercios, profesionales, empresas y emprendedores
                </span>
                <span aria-hidden="true">
                  <span style={{ display: 'block' }}>Diseño de páginas web</span>
                  <span style={{ display: 'inline-flex', alignItems: 'baseline', minHeight: '1.15em' }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0, color: '#A9A6B4', marginRight: '0.35ch' }}>
                      para
                    </span>
                    <span 
                      style={{ 
                        display: 'inline-block', 
                        minWidth: '15ch', 
                        textAlign: 'left', 
                        verticalAlign: 'baseline',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0, color: '#FFFFFF' }}>
                        {typed}
                      </span>
                      <span className="pc-caret" style={{ color: '#A48BFF' }} />
                    </span>
                  </span>
                </span>
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
              ref={heroBtnRef}
              href="https://wa.me/5491128779641" 
              target="_blank" 
              rel="noopener noreferrer" 
              data-wa="hero"
              className="pc-btn-sheen pc-btn-magnetic"
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
          {/* Phone Stage Wrapper with absolute anchor for floating sub-cards and 3D desktop tilt */}
          <div 
            className="pc-hero-phone-stage"
            style={{
              position: 'relative',
              width: '268px',
              maxWidth: '100%',
              minHeight: '530px',
              display: 'flex',
              justifyContent: 'center',
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.18s cubic-bezier(0.2, 0.7, 0.2, 1)'
            }}
          >
            {/* Desktop Brand Cursor for Mini Demo */}
            <div 
              className="pc-hero-demo-cursor"
              aria-hidden="true"
              style={{
                top: 0,
                left: 0,
                transform: demoStep === 0 
                  ? 'translate(225px, 280px)' 
                  : demoStep === 1 
                    ? 'translate(108px, 168px) scale(1)' 
                    : demoStep === 2 
                      ? 'translate(108px, 168px) scale(0.88)' 
                      : 'translate(180px, 240px)',
                opacity: (demoStep === 1 || demoStep === 2) && demoCycle < 3 ? 1 : 0,
                transition: demoStep === 0 
                  ? 'none' 
                  : demoStep === 2 
                    ? 'transform 0.12s ease' 
                    : 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease'
              }}
            >
              <svg width="28" height="34" viewBox="24 22 28 36" fill="none">
                <path 
                  d="M25 23l0 30 8-8 6 12 6-3-6-12h11z" 
                  fill="#673DE6" 
                  stroke="#FFFFFF" 
                  strokeWidth="2" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

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
                <div style={{ background: '#673DE6', color: '#FFFFFF', padding: '20px 14px', position: 'relative' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', opacity: .85 }}>
                    Tu rubro · Tu zona
                  </div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '21px', textTransform: 'uppercase', lineHeight: 1.1, marginTop: '6px' }}>
                    Lo que hacés, bien explicado
                  </div>
                  <div 
                    style={{ 
                      marginTop: '12px', 
                      display: 'inline-block', 
                      background: '#FFFFFF', 
                      color: '#4B25C4', 
                      fontWeight: 600, 
                      padding: '6px 12px', 
                      borderRadius: '4px', 
                      fontSize: '11px',
                      position: 'relative',
                      transform: demoStep === 2 && demoCycle < 3 ? 'scale(0.95)' : 'scale(1)',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    Consultar por WhatsApp
                    {/* Purple Click Ripple */}
                    {demoStep === 2 && demoCycle < 3 && (
                      <span 
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'rgba(103, 61, 230, 0.45)',
                          pointerEvents: 'none',
                          animation: 'pc-click-ripple 0.65s ease-out forwards'
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Phone content list */}
                <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#55524C' }}>
                    Servicios y precios
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', background: '#FFFFFF', borderRadius: '6px' }}>
                    <span>Servicio principal</span>
                    <b>$ 18.000</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', background: '#FFFFFF', borderRadius: '6px' }}>
                    <span>Otro servicio</span>
                    <b>$ 25.000</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', background: '#FFFFFF', borderRadius: '6px' }}>
                    <span>Combo</span>
                    <b>$ 38.000</b>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                <span 
                  style={{ 
                    display: 'inline-flex',
                    position: 'relative',
                    animation: demoStep === 0 && demoCycle < 3 ? 'pc-pin-drop 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#673DE6" strokeWidth="2.2" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {demoStep === 0 && demoCycle < 3 && (
                    <span 
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '14px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(103, 61, 230, 0.35)',
                        animation: 'pc-pin-ripple 0.75s ease-out forwards'
                      }}
                    />
                  )}
                </span>
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
                background: '#DCF5E3', 
                color: '#10301C', 
                borderRadius: '12px 12px 2px 12px', 
                padding: '12px 14px', 
                width: '200px', 
                maxWidth: '85%',
                boxShadow: '0 18px 40px rgba(0,0,0,.35)', 
                fontSize: '13px',
                zIndex: 3,
                minHeight: '62px'
              }}
            >
              <b style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#1E6B3A' }}>
                WhatsApp · nuevo mensaje
              </b>
              {demoStep === 0 && demoCycle < 3 ? (
                <div style={{ marginTop: '6px', fontSize: '12px', lineHeight: 1.35, display: 'flex', alignItems: 'center', gap: '6px', color: '#1E6B3A' }}>
                  <span>escribiendo</span>
                  <span className="pc-typing-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              ) : (
                <div style={{ marginTop: '4px', fontSize: '12px', lineHeight: 1.35, opacity: 1, transition: 'opacity 0.35s ease' }}>
                  ¡Hola! Vi tu web y quería consultar por un presupuesto.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
