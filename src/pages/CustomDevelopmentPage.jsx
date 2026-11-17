import React, { useState, useEffect } from 'react';
import NavbarV3 from '../components/v3/NavbarV3';
import FooterV3 from '../components/v3/FooterV3';
import ThePointLightbox from '../components/v3/ThePointLightbox';
import WhatsAppFloatingBtn from '../components/WhatsAppFloatingBtn';
import { useTheme } from '../hooks/useTheme';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { trackWhatsAppClick } from '../utils/gtm';
import { 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  Check, 
  ZoomIn, 
  ChevronRight,
  Store,
  Smartphone,
  Cpu,
  Layers,
  Boxes,
  ShieldCheck,
  Receipt
} from 'lucide-react';

export default function CustomDevelopmentPage() {
  const { isDark } = useTheme();
  useScrollReveal();

  const whatsappNumber = '5491128779641';
  const whatsappMsgGeneral = encodeURIComponent(
    '¡Hola Belén! Llegué desde la sección de Desarrollo a Medida en Primera Cuadra. Tengo una idea de sistema o app y me gustaría consultarte para evaluar el alcance.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Desarrollo a medida: apps y sistemas de venta | Primera Cuadra';
  }, []);

  // 7 Tabs for "The Point" real case study
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const thePointScreens = [
    {
      id: 'pos',
      tabLabel: 'POS',
      title: 'Punto de venta táctil y facturación rápida',
      subtitle: 'Botonera rápida con artículos populares, cobro ágil y lector de código de barras.',
      badge: '01 · Punto de Venta',
      base: '/thepoint/pos',
      bullets: [
        'Artículos populares táctiles para despachar rápido en mostrador',
        'Medios de pago combinados: efectivo con cálculo de vuelto, Mercado Pago QR y tarjetas',
        'Atajos de teclado y lector de código de barras para cobrar sin demoras'
      ]
    },
    {
      id: 'dashboard',
      tabLabel: 'Dashboard',
      title: 'Panel general y control operativo',
      subtitle: 'Tablero diario con ventas acumuladas, tickets emitidos, productos con mayor salida y alertas de stock.',
      badge: '02 · Panel General',
      base: '/thepoint/dashboard',
      bullets: [
        'Ventas acumuladas del día, tickets emitidos y resultado neto comercial',
        'Gráfico de evolución semanal de ventas y artículos más vendidos',
        'Monitoreo del estado de caja y avisos de stock bajo'
      ]
    },
    {
      id: 'stock',
      tabLabel: 'Stock',
      title: 'Productos y control de stock',
      subtitle: 'Inventario con código o SKU, costo, precio de venta, margen y avisos automáticos de reposición.',
      badge: '03 · Catálogo y Stock',
      base: '/thepoint/stock',
      bullets: [
        'Buscador rápido por nombre, código de barras o código interno',
        'Cálculo de rentabilidad por producto: costo, venta y margen de ganancia',
        'Importación masiva y exportación de listas a Excel o CSV'
      ]
    },
    {
      id: 'caja',
      tabLabel: 'Caja',
      title: 'Caja diaria y arqueo de turnos',
      subtitle: 'Apertura de turno, retiros de dinero, ingresos y arqueo de caja con historial de sesiones.',
      badge: '04 · Caja Diaria',
      base: '/thepoint/caja',
      bullets: [
        'Historial de sesiones con fondo inicial, total esperado y cálculo de diferencias',
        'Discriminación por medio de pago (efectivo, Mercado Pago, transferencias)',
        'Control de retiros y cierre seguro para evitar faltantes en el local'
      ]
    },
    {
      id: 'gastos',
      tabLabel: 'Gastos',
      title: 'Gastos operativos del negocio',
      subtitle: 'Registro de egresos por rubro para controlar los costos fijos y variables del local.',
      badge: '05 · Gastos Operativos',
      base: '/thepoint/gastos',
      bullets: [
        'Registro de egresos por rubro: alquiler, mercadería, fletes y servicios',
        'Impacto directo en el balance financiero y ganancia neta',
        'Historial de comprobantes y pagos a proveedores'
      ]
    },
    {
      id: 'reportes',
      tabLabel: 'Reportes',
      title: 'Reportes y rentabilidad neta',
      subtitle: 'Cálculo de ganancia neta deduciendo el costo de mercadería y gastos operativos.',
      badge: '06 · Reportes y Finanzas',
      base: '/thepoint/reportes',
      bullets: [
        'Facturación bruta frente a costo de mercadería y ganancia estimada',
        'Cobranzas discriminadas por medio de pago y ventas por categoría',
        'Filtros por día, semana, mes o fechas personalizadas'
      ]
    },
    {
      id: 'auditoria',
      tabLabel: 'Auditoría',
      title: 'Historial y auditoría de operaciones',
      subtitle: 'Registro cronológico de cada venta, arqueo, anulación, ajuste de stock y modificación de precios.',
      badge: '07 · Historial y Auditoría',
      base: '/thepoint/auditoria',
      bullets: [
        'Registro con fecha, hora exacta, módulo y acción realizada',
        'Trazabilidad de altas, bajas y modificaciones de precios',
        'Respaldo de operaciones para auditar movimientos del local'
      ]
    }
  ];

  const currentScreen = thePointScreens[activeScreenIdx];

  // Theme color tokens
  const bgLight = isDark ? '#1E1C24' : '#EFEDE8';
  const bgAlt = isDark ? '#19171F' : '#E5E2DB';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';

  const services = [
    {
      n: '01',
      title: 'Sistemas de venta y stock',
      summary: 'POS táctil, stock, caja, reportes, usuarios.',
      desc: 'Puntos de venta rápidos para mostrador, control de inventario con alertas de reposición, arqueos de caja por turno y balances para saber exactamente cuánto ingresa.'
    },
    {
      n: '02',
      title: 'Apps para Android e iOS',
      summary: 'Turnos, pedidos, avisos al celular, Mercado Pago.',
      desc: 'Aplicaciones móviles para que tus clientes reserven turnos, pidan productos o sigan el estado de sus pedidos desde el teléfono, con avisos directos y cobro integrado.'
    },
    {
      n: '03',
      title: 'Integraciones',
      summary: 'Mercado Pago, QR, facturación, lo que ya uses.',
      desc: 'Conecto tu sistema con lectores de código de barras, cobro por QR de Mercado Pago, impresoras térmicas de tickets y los programas que ya tengas en funcionamiento.'
    }
  ];

  const steps = [
    {
      n: '01',
      time: 'Paso 1',
      title: 'Charla por WhatsApp',
      desc: 'Me contás qué necesitás resolver y cómo trabaja tu negocio hoy: qué tareas te llevan más tiempo y qué funciones son indispensables para arrancar.'
    },
    {
      n: '02',
      time: 'Paso 2',
      title: 'Propuesta cerrada con precio y plazo',
      desc: 'Te paso una propuesta detallada con el alcance exacto de lo que voy a programar, el presupuesto total cerrado y la fecha cierta de entrega, sin costos ocultos.'
    },
    {
      n: '03',
      time: 'Paso 3',
      title: '50% al empezar, 50% al aprobar',
      desc: 'Empezamos a trabajar con el 50% de anticipo. El 50% restante lo abonás recién cuando probás el sistema, funciona como esperabas y te entrego los accesos.'
    }
  ];

  const marqueeItems = [
    'Punto de venta táctil',
    'Apps para Android e iOS',
    'Sin abonos mensuales',
    'Código propio para tu negocio',
    'Cobros con Mercado Pago y QR',
    '50% al empezar · 50% al aprobar'
  ];

  return (
    <div 
      className="primera-cuadra-v3-root custom-dev-page-v3"
      style={{ 
        width: '100%', 
        minHeight: '100vh', 
        fontFamily: "'Poppins', system-ui, sans-serif",
        background: bgLight,
        color: ink,
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <NavbarV3 />

      <main>
        {/* ===================================================================
            01 HERO: DESARROLLO A MEDIDA
            =================================================================== */}
        <section 
          id="hero"
          style={{ 
            background: '#18161E', 
            color: '#F4F2EC', 
            position: 'relative', 
            overflow: 'hidden' 
          }}
        >
          {/* Decorative SVG Shapes (Zero overflow) */}
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
              <pattern id="dev-hero-stripes" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(164,139,255,0.28)" strokeWidth="3" />
              </pattern>
            </defs>
            <circle cx="calc(100% + 80px)" cy="80" r="260" fill="#673DE6" />
            <circle cx="50%" cy="100%" r="140" fill="url(#dev-hero-stripes)" />
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
              opacity: 0.7
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
              padding: 'clamp(56px, 7vw, 96px) 24px clamp(56px, 7vw, 96px)',
              boxSizing: 'border-box'
            }}
          >
            {/* Back to Home Link */}
            <div style={{ marginBottom: '28px' }}>
              <a 
                href="/" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: '#B3AFA6', 
                  textDecoration: 'none', 
                  fontSize: '14px', 
                  fontFamily: "'Oswald', sans-serif", 
                  letterSpacing: '.06em', 
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#B3AFA6'}
              >
                <ArrowLeft size={16} />
                <span>Volver al inicio</span>
              </a>
            </div>

            <div className="pc-reveal-u" style={{ maxWidth: '820px' }}>
              <p 
                style={{ 
                  margin: 0, 
                  fontFamily: "'Oswald', sans-serif", 
                  fontSize: '15px', 
                  letterSpacing: '.14em', 
                  textTransform: 'uppercase', 
                  color: '#A48BFF' 
                }}
              >
                DESARROLLO A MEDIDA
              </p>

              <h1 
                style={{ 
                  margin: '12px 0 0', 
                  fontFamily: "'Oswald', sans-serif", 
                  fontWeight: 600, 
                  fontSize: 'clamp(38px, 5.2vw, 64px)', 
                  lineHeight: 1.05, 
                  textTransform: 'uppercase', 
                  letterSpacing: '-0.01em', 
                  color: '#FFFFFF' 
                }}
              >
                SISTEMAS Y APPS PARA TU NEGOCIO
              </h1>

              <p 
                style={{ 
                  margin: '22px 0 0', 
                  fontSize: 'clamp(16px, 1.9vw, 19px)', 
                  lineHeight: 1.6, 
                  color: '#CFCBD8',
                  maxWidth: '720px'
                }}
              >
                Además de páginas web, programo sistemas de venta y stock, y apps, pensados para cómo trabaja tu negocio.
              </p>

              <div 
                style={{ 
                  marginTop: '36px', 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '14px', 
                  alignItems: 'center' 
                }}
              >
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsgGeneral}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackWhatsAppClick('custom_dev_hero', 'Contame_tu_idea')}
                  style={{ 
                    textDecoration: 'none', 
                    background: '#673DE6', 
                    color: '#FFFFFF', 
                    padding: '15px 28px', 
                    borderRadius: '6px', 
                    fontWeight: 600, 
                    fontSize: '16px', 
                    textAlign: 'center', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px' 
                  }}
                >
                  <MessageSquare size={17} />
                  <span>Contame tu idea</span>
                </a>

                <a 
                  href="#caso-the-point" 
                  style={{ 
                    textDecoration: 'none', 
                    background: 'transparent', 
                    color: '#FFFFFF', 
                    padding: '15px 24px', 
                    borderRadius: '6px', 
                    fontWeight: 600, 
                    border: '2px solid rgba(255,255,255,.3)', 
                    fontSize: '16px', 
                    textAlign: 'center', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px' 
                  }}
                >
                  <span>Ver caso real The Point</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Banner */}
        <section 
          aria-label="Puntos clave del servicio" 
          style={{ background: '#673DE6', color: '#FFFFFF', overflow: 'hidden' }}
        >
          <div style={{ padding: '20px 0', width: '100%', overflow: 'hidden' }}>
            <div className="pc-marquee-track">
              <div className="pc-marquee-group">
                {marqueeItems.map((item, idx) => (
                  <span key={`a-${idx}`} className="pc-marquee-item">
                    <span>{item}</span>
                    <span className="pc-marquee-sep" aria-hidden="true">✦</span>
                  </span>
                ))}
              </div>
              <div className="pc-marquee-group" aria-hidden="true">
                {marqueeItems.map((item, idx) => (
                  <span key={`b-${idx}`} className="pc-marquee-item">
                    <span>{item}</span>
                    <span className="pc-marquee-sep" aria-hidden="true">✦</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            02 CASO REAL THE POINT (7 PESTAÑAS Y LIGHTBOX CON ZOOM)
            =================================================================== */}
        <section 
          id="caso-the-point" 
          style={{ 
            background: bgLight, 
            color: ink, 
            transition: 'background 0.3s ease, color 0.3s ease' 
          }}
        >
          <div 
            style={{ 
              maxWidth: '1240px', 
              margin: '0 auto', 
              padding: 'clamp(64px, 7vw, 96px) 24px',
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
                color: muted 
              }}
            >
              01 / Caso real
            </p>

            <h2 
              className="pc-reveal-u"
              style={{ 
                margin: '10px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(32px, 3.8vw, 50px)', 
                lineHeight: 1.08, 
                textTransform: 'uppercase' 
              }}
            >
              The Point: sistema de caja y stock
            </h2>

            <p 
              className="pc-reveal-u"
              style={{ 
                margin: '18px 0 0', 
                maxWidth: '780px', 
                color: muted, 
                fontSize: 'clamp(16px, 1.8vw, 17px)', 
                lineHeight: 1.6 
              }}
            >
              Lo diseñé y programé para un emprendimiento propio: punto de venta táctil, stock, caja diaria, reportes y respaldos. Funciona sin internet y sin abonos mensuales.
            </p>

            {/* Tech Chips */}
            <ul 
              className="pc-reveal-u"
              style={{ 
                margin: '24px 0 0', 
                padding: 0, 
                listStyle: 'none', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '10px' 
              }}
            >
              {['Electron', 'Node.js', 'React', 'SQLite', 'Tailwind CSS'].map((tech) => (
                <li 
                  key={tech} 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    padding: '6px 14px', 
                    border: `2px solid ${ink}`, 
                    borderRadius: '4px',
                    fontFamily: "'Oswald', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '.05em'
                  }}
                >
                  {tech}
                </li>
              ))}
            </ul>

            {/* Showcase Card */}
            <div 
              className="pc-reveal-u"
              style={{ 
                marginTop: '44px', 
                background: cardBg, 
                border: `1px solid ${line}`, 
                borderRadius: '8px', 
                overflow: 'hidden',
                boxShadow: isDark ? '0 16px 36px rgba(0,0,0,0.35)' : '0 12px 28px rgba(0,0,0,0.06)'
              }}
            >
              {/* 7 Tabs Bar */}
              <div 
                role="tablist" 
                aria-label="Módulos de The Point"
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '8px', 
                  padding: '16px 20px', 
                  borderBottom: `1px solid ${line}`, 
                  background: isDark ? '#1F1C26' : '#EBE8E1'
                }}
              >
                {thePointScreens.map((screen, sIdx) => {
                  const isActive = activeScreenIdx === sIdx;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveScreenIdx(sIdx)}
                      style={{
                        background: isActive ? '#673DE6' : 'transparent',
                        color: isActive ? '#FFFFFF' : ink,
                        border: isActive ? '1px solid #673DE6' : `1px solid ${line}`,
                        borderRadius: '4px',
                        padding: '8px 16px',
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {screen.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Split Content Body */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                  gap: '36px', 
                  padding: 'clamp(24px, 4vw, 36px)',
                  alignItems: 'center'
                }}
              >
                {/* Left Column: Screen Info */}
                <div>
                  <span 
                    style={{ 
                      fontFamily: "'Oswald', sans-serif", 
                      fontSize: '13px', 
                      fontWeight: 600, 
                      letterSpacing: '.12em', 
                      textTransform: 'uppercase', 
                      color: '#A48BFF',
                      display: 'inline-block',
                      marginBottom: '8px'
                    }}
                  >
                    {currentScreen.badge}
                  </span>

                  <h3 
                    style={{ 
                      margin: '0 0 10px', 
                      fontFamily: "'Oswald', sans-serif", 
                      fontSize: '24px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      lineHeight: 1.2 
                    }}
                  >
                    {currentScreen.title}
                  </h3>

                  <p style={{ margin: '0 0 20px', color: muted, fontSize: '15px', lineHeight: 1.6 }}>
                    {currentScreen.subtitle}
                  </p>

                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentScreen.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', lineHeight: 1.5 }}>
                        <span 
                          style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            width: '18px', 
                            height: '18px', 
                            borderRadius: '50%', 
                            background: '#673DE6', 
                            color: '#FFFFFF', 
                            flexShrink: 0, 
                            marginTop: '2px' 
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    style={{
                      marginTop: '28px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'transparent',
                      border: 'none',
                      color: isDark ? '#A48BFF' : '#5B33D6',
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '15px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.05em',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <ZoomIn size={16} />
                    <span>Ver en pantalla completa con zoom →</span>
                  </button>
                </div>

                {/* Right Column: Desktop Window Frame */}
                <div>
                  <div 
                    onClick={() => setIsLightboxOpen(true)}
                    title="Clic para ampliar en pantalla completa con zoom"
                    style={{
                      background: isDark ? '#1B1822' : '#E8E5DD',
                      borderRadius: '8px',
                      border: `1px solid ${line}`,
                      overflow: 'hidden',
                      boxShadow: '0 14px 32px rgba(0,0,0,0.2)',
                      cursor: 'zoom-in',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.2)';
                    }}
                  >
                    {/* Window Title Bar */}
                    <div 
                      style={{
                        padding: '10px 14px',
                        background: isDark ? '#14121A' : '#DCD8CE',
                        borderBottom: `1px solid ${line}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EAB308', display: 'inline-block' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                      </div>
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase', color: muted }}>
                        The Point — POS
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: muted, fontSize: '12px' }}>
                        <ZoomIn size={13} />
                        <span>Ampliar</span>
                      </div>
                    </div>

                    {/* Screenshot Preview */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', background: '#000000' }}>
                      <picture>
                        <source 
                          type="image/avif" 
                          srcSet={`${currentScreen.base}-1200.avif 1200w, ${currentScreen.base}-1800.avif 1800w, ${currentScreen.base}-full.avif 2400w`} 
                          sizes="(max-width: 768px) 100vw, 650px" 
                        />
                        <source 
                          type="image/webp" 
                          srcSet={`${currentScreen.base}-1200.webp 1200w, ${currentScreen.base}-1800.webp 1800w, ${currentScreen.base}-full.webp 2400w`} 
                          sizes="(max-width: 768px) 100vw, 650px" 
                        />
                        <img 
                          src={`${currentScreen.base}-1200.webp`} 
                          alt={`The Point - ${currentScreen.title}`} 
                          width="1200" 
                          height="750" 
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            03 QUÉ PUEDO HACER (SOLO 3 TARJETAS)
            =================================================================== */}
        <section 
          id="servicios-desarrollo" 
          style={{ 
            background: bgAlt, 
            color: ink, 
            transition: 'background 0.3s ease, color 0.3s ease' 
          }}
        >
          <div 
            style={{ 
              maxWidth: '1240px', 
              margin: '0 auto', 
              padding: 'clamp(64px, 7vw, 96px) 24px',
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
                color: muted 
              }}
            >
              02 / Qué puedo hacer
            </p>

            <h2 
              className="pc-reveal-u"
              style={{ 
                margin: '10px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(32px, 3.8vw, 50px)', 
                lineHeight: 1.08, 
                textTransform: 'uppercase' 
              }}
            >
              Qué puedo programar para tu negocio
            </h2>

            <p 
              className="pc-reveal-u"
              style={{ 
                margin: '18px 0 0', 
                maxWidth: '680px', 
                color: muted, 
                fontSize: 'clamp(16px, 1.8vw, 17px)', 
                lineHeight: 1.6 
              }}
            >
              Tres tipos de soluciones de software adaptadas a cómo trabaja tu comercio, local o empresa:
            </p>

            <div 
              style={{ 
                marginTop: '44px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '28px' 
              }}
            >
              {services.map((item, idx) => (
                <article 
                  key={item.n} 
                  className="pc-reveal-u"
                  style={{
                    background: cardBg,
                    border: `1px solid ${line}`,
                    borderRadius: '8px',
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    '--pc-delay': `${idx * 0.12}s`,
                    transitionDelay: `${idx * 0.12}s`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span 
                      style={{ 
                        fontFamily: "'Oswald', sans-serif", 
                        fontSize: '48px', 
                        fontWeight: 600, 
                        lineHeight: 1, 
                        color: ink 
                      }}
                    >
                      {item.n}
                    </span>
                    <span style={{ flex: 1, height: '5px', background: '#673DE6', maxWidth: '64px' }} />
                  </div>

                  <h3 
                    style={{ 
                      margin: '18px 0 8px', 
                      fontFamily: "'Oswald', sans-serif", 
                      fontSize: '24px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      lineHeight: 1.15 
                    }}
                  >
                    {item.title}
                  </h3>

                  <p 
                    style={{ 
                      margin: '0 0 14px', 
                      color: isDark ? '#A48BFF' : '#5B33D6', 
                      fontSize: '13px', 
                      fontWeight: 600, 
                      fontFamily: "'Oswald', sans-serif", 
                      letterSpacing: '.05em', 
                      textTransform: 'uppercase' 
                    }}
                  >
                    {item.summary}
                  </p>

                  <p style={{ margin: 0, color: muted, fontSize: '15px', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            04 CÓMO LO COTIZO (3 PASOS ESTILO STEPS DE LA HOME)
            =================================================================== */}
        <section 
          id="como-lo-cotizo" 
          style={{ 
            background: '#18161E', 
            color: '#F4F2EC' 
          }}
        >
          <div 
            style={{ 
              maxWidth: '1240px', 
              margin: '0 auto', 
              padding: 'clamp(64px, 7vw, 96px) 24px',
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
                color: '#A48BFF' 
              }}
            >
              03 / Forma de trabajo
            </p>

            <h2 
              className="pc-reveal-u"
              style={{ 
                margin: '10px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(32px, 3.8vw, 50px)', 
                lineHeight: 1.08, 
                textTransform: 'uppercase' 
              }}
            >
              Cómo cotizo tu proyecto
            </h2>

            <p 
              className="pc-reveal-u"
              style={{ 
                margin: '18px 0 0', 
                maxWidth: '680px', 
                color: '#B3AFA6', 
                fontSize: 'clamp(16px, 1.8vw, 17px)', 
                lineHeight: 1.6 
              }}
            >
              Sin reuniones eternas ni presupuestos que cambian a mitad de camino. Tres pasos transparentes:
            </p>

            <ol 
              style={{ 
                listStyle: 'none', 
                margin: '44px 0 0', 
                padding: 0, 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '40px 48px' 
              }}
            >
              {steps.map((st, idx) => (
                <li 
                  key={st.n} 
                  className="pc-reveal-u" 
                  style={{ 
                    borderTop: '1px solid #34313C', 
                    paddingTop: '28px',
                    '--pc-delay': `${idx * 0.12}s`,
                    transitionDelay: `${idx * 0.12}s`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
                    <span 
                      style={{ 
                        fontFamily: "'Oswald', sans-serif", 
                        fontSize: '60px', 
                        fontWeight: 600, 
                        lineHeight: 1, 
                        color: '#A48BFF' 
                      }}
                    >
                      {st.n}
                    </span>
                    <span 
                      style={{ 
                        fontFamily: "'Oswald', sans-serif", 
                        fontSize: '13px', 
                        letterSpacing: '.12em', 
                        textTransform: 'uppercase', 
                        color: '#B3AFA6' 
                      }}
                    >
                      {st.time}
                    </span>
                  </div>

                  <h3 
                    style={{ 
                      margin: '16px 0 10px', 
                      fontFamily: "'Oswald', sans-serif", 
                      fontSize: '22px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      lineHeight: 1.15 
                    }}
                  >
                    {st.title}
                  </h3>

                  <p style={{ margin: 0, color: '#B3AFA6', fontSize: '15px', lineHeight: 1.6 }}>
                    {st.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===================================================================
            05 CTA FINAL: ¿TENÉS UNA IDEA? CONTAMELA
            =================================================================== */}
        <section 
          id="contacto"
          style={{ 
            background: '#673DE6', 
            color: '#FFFFFF' 
          }}
        >
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
                ¿Tenés una idea? Contamela.
              </h2>
              <p 
                style={{ 
                  margin: '14px 0 0', 
                  maxWidth: '640px', 
                  fontSize: 'clamp(15px, 1.8vw, 17px)', 
                  lineHeight: 1.6, 
                  color: '#FFFFFF', 
                  fontWeight: 500 
                }}
              >
                Escribime por WhatsApp, contame qué tiene que hacer tu sistema o app y te digo con sinceridad si te conviene encararlo y cuánto te saldría.
              </p>
            </div>

            <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsgGeneral}`}
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackWhatsAppClick('custom_dev_cta_final', 'Escribime_por_WhatsApp')}
                style={{ 
                  textDecoration: 'none', 
                  background: '#FFFFFF', 
                  color: '#4B25C4', 
                  padding: '16px 28px', 
                  borderRadius: '6px', 
                  fontWeight: 600, 
                  fontSize: '15px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }}
              >
                <MessageSquare size={17} />
                <span>Escribime por WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
      <WhatsAppFloatingBtn />

      {/* Lightbox for The Point POS Screens */}
      <ThePointLightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        initialIndex={activeScreenIdx} 
      />
    </div>
  );
}
