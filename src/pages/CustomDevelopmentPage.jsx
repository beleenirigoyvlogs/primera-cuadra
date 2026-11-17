import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Boxes, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Store, 
  QrCode, 
  Users, 
  Receipt,
  CheckCircle2,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Printer,
  ShoppingBag,
  Bell,
  Lock,
  ZoomIn,
  X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloatingBtn from '../components/WhatsAppFloatingBtn';
import { trackWhatsAppClick } from '../utils/gtm';

export default function CustomDevelopmentPage() {
  const whatsappNumber = '5491128779641';
  const whatsappMsgGeneral = encodeURIComponent(
    '¡Hola Belén! Llegué desde la sección de Desarrollo a Medida en Primera Cuadra. Tengo un proyecto/idea de software y me gustaría consultarte para evaluar el alcance.'
  );
  const whatsappMsgThePoint = encodeURIComponent(
    'Hola Belén, vi tu proyecto de app y quiero consultarte'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Desarrollo a medida: apps y sistemas de venta | Primera Cuadra';
  }, []);

  // Tabs for "The Point Kiosco" real project interactive carousel
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [zoomedImg, setZoomedImg] = useState(null);

  const thePointScreens = [
    {
      id: 'pos',
      tabLabel: 'POS',
      title: 'Punto de Venta Táctil & Facturación Rápida',
      subtitle: 'Botonera rápida optimizada para mostrador con artículos populares, cobro ágil y lector de código de barras (F3).',
      badge: 'Operaciones Diarias • POS',
      image: '/thepoint/pos.webp',
      bullets: [
        'Artículos populares táctiles (aguas, gaseosas, vinos, alfajores, cigarrillos, golosinas)',
        'Múltiples medios de pago: Efectivo con cálculo de vuelto, Mercado Pago / QR, Transferencia, Débito y Crédito',
        'Cobro y confirmación con atajos de teclado (F2 vender, F3 escanear) para despachar sin demoras'
      ]
    },
    {
      id: 'dashboard',
      tabLabel: 'Dashboard',
      title: 'Panel General & Control en Tiempo Real',
      subtitle: 'Tablero operativo con evolución semanal de ventas, productos más vendidos, alertas de stock y estado de caja.',
      badge: 'Dashboard Operativo',
      image: '/thepoint/dashboard.webp',
      bullets: [
        'Ventas acumuladas de hoy, tickets emitidos y resultado neto comercial',
        'Gráfico de evolución semanal de ventas y ranking histórico de artículos con mayor salida',
        'Monitoreo del estado de caja y centro de alertas activas'
      ]
    },
    {
      id: 'stock',
      tabLabel: 'Stock',
      title: 'Catálogo de Productos & Control de Stock',
      subtitle: 'Inventario con código/SKU, costo, precio de venta, remarcación/margen % y alertas automáticas de reposición.',
      badge: 'Catálogo & Inventario',
      image: '/thepoint/stock.webp',
      bullets: [
        'Buscador instantáneo por nombre, código de barras o SKU',
        'Cálculo automático de rentabilidad (costo vs. venta vs. porcentaje de margen neto)',
        'Importación masiva y exportación de listas completas a Excel / CSV'
      ]
    },
    {
      id: 'caja',
      tabLabel: 'Caja',
      title: 'Control de Caja Diaria & Flujo de Dinero',
      subtitle: 'Apertura de turno, retiros de dinero, ingresos y arqueo de caja con historial de sesiones.',
      badge: 'Tesorería & Caja',
      image: '/thepoint/caja.webp',
      bullets: [
        'Historial de sesiones con fondo inicial, total esperado vs. contado y cálculo de diferencias',
        'Registro discriminado por medio de pago (Efectivo, Mercado Pago, etc.)',
        'Control seguro para evitar faltantes y cuadrar turnos con exactitud'
      ]
    },
    {
      id: 'reportes',
      tabLabel: 'Reportes',
      title: 'Reportes de Rendimiento & Rentabilidad Real',
      subtitle: 'Cálculos transparentes sin confundir facturación bruta con ganancia neta comercial.',
      badge: 'Auditoría Financiera',
      image: '/thepoint/reportes.webp',
      bullets: [
        'Facturación bruta vs. Costo de mercadería vendida vs. Ganancia bruta estimada y resultado neto',
        'Cobranzas discriminadas por medio de pago y ventas por categoría de producto',
        'Filtros por Hoy, Últimos 7 días, Este mes o Fechas personalizadas con exportación a CSV'
      ]
    },
    {
      id: 'auditoria',
      tabLabel: 'Auditoría',
      title: 'Historial & Auditoría Inmutable de Operaciones',
      subtitle: 'Registro cronológico inmutable de cada venta, arqueo, anulación, ajuste de stock y modificación de precios.',
      badge: 'Seguridad & Control',
      image: '/thepoint/auditoria.webp',
      bullets: [
        'Registro con fecha, hora exacta, módulo, descripción del suceso y usuario responsable',
        'Trazabilidad total de altas, bajas y modificaciones de precios',
        'Seguridad ante discrepancias y control antifraude en el local'
      ]
    },
    {
      id: 'backups',
      tabLabel: 'Respaldos',
      title: 'Base de Datos Local Persistente & Respaldos',
      subtitle: 'Operación 100% independiente de internet con protección de datos y respaldos en un clic.',
      badge: 'Infraestructura & Protección',
      image: '/thepoint/backups.webp',
      bullets: [
        'Almacenamiento local SQLite ultra rápido que nunca se cuelga ni depende de la conexión a internet',
        'Creación de respaldos inmediatos (.sqlite) para guardar en pendrive o carpeta externa',
        'Restauración de emergencia en caso de cambio o renovación de la computadora del local'
      ]
    }
  ];

  const currentScreen = thePointScreens[activeScreenIdx];

  const posFeatures = [
    {
      title: 'Sistema POS táctil para PC, Tablet o Celular',
      desc: 'Interfaz ágil diseñada para despachar ventas rápido en mostrador sin complicaciones técnicas.',
      icon: Store
    },
    {
      title: 'Control de Stock e Inventario en tiempo real',
      desc: 'Entrada y salida de mercadería, alertas automáticas de reposición y control de mermas.',
      icon: Boxes
    },
    {
      title: 'Catálogo digital interactivo con QR para mostrador',
      desc: 'Código QR listo para exhibir e imprimir: tus clientes escanean en el local y ven tus productos actualizados.',
      icon: QrCode
    },
    {
      title: 'Gestión de Empleados, Turnos y Permisos',
      desc: 'Roles diferenciados para cajeros, vendedores y administradores, con registro de operaciones.',
      icon: Users
    },
    {
      title: 'Arqueo de caja diaria y balances de ventas',
      desc: 'Cierres de turno automáticos, reportes descargables y control de métodos de pago (efectivo, transferencias, tarjetas).',
      icon: Receipt
    },
    {
      title: 'Software 100% tuyo sin abonos mensuales obligatorios',
      desc: 'Desarrollo propio adaptado a tu negocio, sin ataduras a alquileres mensuales obligatorios.',
      icon: ShieldCheck
    }
  ];

  const appCapabilities = [
    {
      title: 'Desarrollo para Android y iOS',
      desc: 'Tu aplicación optimizada y lista para las tiendas oficiales de Google Play y App Store.',
      icon: Smartphone,
      tag: 'Multiplataforma'
    },
    {
      title: 'Diseño UX/UI moderno y fluido',
      desc: 'Interfaces pensadas para que tus clientes o equipo usen la herramienta con naturalidad desde el primer segundo.',
      icon: Layers,
      tag: 'Diseño Intuitivo'
    },
    {
      title: 'Autenticación y perfiles seguros',
      desc: 'Inicio de sesión con email, teléfono o Google, y almacenamiento seguro de datos de usuario.',
      icon: Lock,
      tag: 'Seguridad'
    },
    {
      title: 'Notificaciones push y mensajes en vivo',
      desc: 'Avisos directos al celular para recordar turnos, pedidos listos, promociones o novedades.',
      icon: Bell,
      tag: 'Notificaciones'
    },
    {
      title: 'Base de datos en la nube y sincronización',
      desc: 'Información centralizada y respaldada en tiempo real para que accedas desde cualquier dispositivo.',
      icon: Database,
      tag: 'Cloud & Offline'
    },
    {
      title: 'Integración con pasarelas de pago y APIs',
      desc: 'Conexión con Mercado Pago, facturación electrónica o sistemas que tu negocio ya utilice.',
      icon: Cpu,
      tag: 'Integraciones'
    }
  ];

  return (
    <div className="app-root custom-dev-page">
      {/* 1. Official Global Navbar */}
      <Navbar />

      <main>
        {/* ===================================================================
            HERO: TITLES WITH STANDARD COLOR TOKENS (LIGHT & DARK COMPLIANT)
            =================================================================== */}
        <section className="custom-dev-hero-section">
          <div className="container">
            {/* Back link */}
            <div className="back-home-wrap">
              <a href="/" className="btn-back-home-link" title="Volver al inicio de Primera Cuadra">
                <ArrowLeft size={16} />
                <span>Volver al inicio</span>
              </a>
            </div>

            <div className="custom-dev-hero-center reveal">
              <div className="section-kicker-pill">
                <Sparkles size={14} />
                <span>DESARROLLO DE SOFTWARE A MEDIDA</span>
              </div>

              <h1 className="custom-dev-main-title">
                Desarrollo de software y <span className="highlight-purple">soluciones a medida</span>
              </h1>

              <p className="custom-dev-main-subtitle">
                Además de las páginas web y presencia digital para comercios, desarrollo <strong>aplicaciones móviles para Android y iOS</strong> y <strong>sistemas de punto de venta (POS) con control de stock</strong> adaptados a lo que realmente necesita tu negocio.
              </p>

              {/* Badges / Chips in single line */}
              <div className="custom-dev-pills-row">
                <span className="dev-pill-tag">
                  <Smartphone size={14} />
                  <span>Apps Android & iOS</span>
                </span>
                <span className="dev-pill-tag">
                  <Boxes size={14} />
                  <span>Sistemas POS & Stock</span>
                </span>
                <span className="dev-pill-tag">
                  <ShieldCheck size={14} />
                  <span>Sin abonos mensuales obligatorios</span>
                </span>
              </div>

              {/* Hero CTA action: single line button */}
              <div className="custom-dev-hero-cta">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsgGeneral}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hostinger-primary btn-hero-single-line"
                  onClick={() => trackWhatsAppClick('custom_dev_hero_button', 'Consulta_general')}
                >
                  <MessageSquare size={17} />
                  <span>Contame tu idea de proyecto</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CASO REAL: UN PROYECTO QUE YA DESARROLLÉ ("The Point Kiosco")
            =================================================================== */}
        <section className="the-point-showcase-section" id="caso-real">
          <div className="container">
            <div className="section-header-center reveal">
              <div className="section-kicker-pill case-kicker">
                <Store size={14} />
                <span>UN PROYECTO QUE YA DESARROLLÉ</span>
              </div>

              <h2 className="section-title">
                The Point Kiosco • <span className="highlight-purple">Sistema POS & Stock</span>
              </h2>

              <p className="honest-declaration-line">
                Lo diseñé y desarrollé completo para un emprendimiento propio que está por lanzarse.
              </p>
            </div>

            {/* Showcase Main Layout */}
            <div className="the-point-card-box reveal">
              {/* Top Selector Tabs */}
              <div className="the-point-tabs-bar" role="tablist" aria-label="Módulos del sistema The Point">
                {thePointScreens.map((screen, sIdx) => (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={activeScreenIdx === sIdx}
                    className={`the-point-tab-btn ${activeScreenIdx === sIdx ? 'active' : ''}`}
                    onClick={() => setActiveScreenIdx(sIdx)}
                  >
                    <span>{screen.tabLabel}</span>
                  </button>
                ))}
              </div>

              {/* Split Content: Left Details, Right Device Frame */}
              <div className="the-point-split-body">
                {/* Left Side: Real Screen Features & Stack */}
                <div className="the-point-info-col">
                  <div className="screen-badge-label">
                    <span>{currentScreen.badge}</span>
                  </div>

                  <h3 className="the-point-screen-title">{currentScreen.title}</h3>
                  <p className="the-point-screen-desc">{currentScreen.subtitle}</p>

                  <ul className="the-point-bullets-list">
                    {currentScreen.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        <CheckCircle2 size={16} className="step-check-icon" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Chips */}
                  <div className="the-point-stack-box">
                    <span className="stack-label">Tecnologías usadas:</span>
                    <div className="stack-chips-list">
                      <span className="stack-chip">
                        <Code2 size={13} />
                        <span>Electron & Node.js</span>
                      </span>
                      <span className="stack-chip">
                        <Code2 size={13} />
                        <span>React</span>
                      </span>
                      <span className="stack-chip">
                        <Database size={13} />
                        <span>SQLite Local Persistente</span>
                      </span>
                      <span className="stack-chip">
                        <Printer size={13} />
                        <span>Impresión Térmica & Escáner F3</span>
                      </span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Callout */}
                  <div className="the-point-wa-action">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMsgThePoint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hostinger-primary btn-the-point-wa"
                      onClick={() => trackWhatsAppClick('the_point_showcase_button', currentScreen.title)}
                    >
                      <MessageSquare size={16} />
                      <span>¿Querés algo así para tu negocio? Contame tu idea</span>
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>

                {/* Right Side: Realistic Software Window Frame with Real Screenshots */}
                <div className="the-point-mockup-col">
                  {/* Navigation arrows for carousel */}
                  <div className="mockup-carousel-controls">
                    <button
                      type="button"
                      className="btn-carousel-nav"
                      onClick={() => setActiveScreenIdx((prev) => (prev > 0 ? prev - 1 : thePointScreens.length - 1))}
                      aria-label="Pantalla anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="carousel-step-counter">
                      Módulo {activeScreenIdx + 1} de {thePointScreens.length}: <strong>{currentScreen.tabLabel}</strong>
                    </span>
                    <button
                      type="button"
                      className="btn-carousel-nav"
                      onClick={() => setActiveScreenIdx((prev) => (prev < thePointScreens.length - 1 ? prev + 1 : 0))}
                      aria-label="Siguiente pantalla"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Real App Window Frame */}
                  <div className="pos-app-window-frame">
                    <div className="pos-app-window-header">
                      <div className="window-dots-row">
                        <span className="w-dot w-dot-red"></span>
                        <span className="w-dot w-dot-yellow"></span>
                        <span className="w-dot w-dot-green"></span>
                      </div>
                      <div className="window-title-bar">
                        <span className="window-app-name">THE POINT KIOSCO • POS v1.0</span>
                      </div>
                      <span className="window-real-badge">Captura real del sistema</span>
                    </div>

                    <div 
                      className="pos-app-screenshot-viewport" 
                      onClick={() => setZoomedImg(currentScreen.image)}
                      title="Clic para ampliar imagen"
                    >
                      <img 
                        src={currentScreen.image} 
                        alt={`Captura real del sistema: ${currentScreen.title}`} 
                        className="the-point-screenshot-img"
                        loading="lazy"
                      />
                      <div className="screenshot-zoom-overlay">
                        <ZoomIn size={15} />
                        <span>Clic para ampliar</span>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="the-point-thumbnails-row">
                    {thePointScreens.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`the-point-thumb-btn ${activeScreenIdx === idx ? 'active' : ''}`}
                        onClick={() => setActiveScreenIdx(idx)}
                        aria-label={`Ver captura de ${s.tabLabel}`}
                        title={s.tabLabel}
                      >
                        <img src={s.image} alt={s.tabLabel} className="thumb-preview-img" />
                        <span className="thumb-caption">{s.tabLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: APPS MÓVILES PARA ANDROID & IOS
            =================================================================== */}
        <section className="custom-dev-apps-section" id="apps-moviles">
          <div className="container">
            <div className="section-header-center reveal">
              <div className="section-kicker-pill">
                <Smartphone size={14} />
                <span>DESARROLLO DE SOFTWARE • APPS MÓVILES</span>
              </div>

              <h2 className="section-title">
                Desarrollo la app que <span className="highlight-purple">tenés en mente</span>
              </h2>

              <p className="section-subtitle">
                Doy vida a tu proyecto con aplicaciones para Android y iOS. Según el alcance de lo que quieras armar, puedo incluir:
              </p>
            </div>

            {/* Capabilities 6 Grid */}
            <div className="dev-cards-grid reveal-group">
              {appCapabilities.map((cap, cIdx) => {
                const IconComp = cap.icon;
                return (
                  <div key={cIdx} className="dev-feature-card reveal">
                    <div className="dev-card-top-row">
                      <div className="dev-icon-circle">
                        <IconComp size={20} />
                      </div>
                      <span className="dev-card-tag">{cap.tag}</span>
                    </div>

                    <h3 className="dev-card-title">{cap.title}</h3>
                    <p className="dev-card-desc">{cap.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: SISTEMAS POS & CONTROL DE STOCK
            =================================================================== */}
        <section className="custom-dev-pos-section" id="sistemas-pos">
          <div className="container">
            <div className="section-header-center reveal">
              <div className="section-kicker-pill">
                <Boxes size={14} />
                <span>GESTIÓN COMERCIAL & MOSTRADOR</span>
              </div>

              <h2 className="section-title">
                Sistemas POS & <span className="highlight-purple">Control de Stock</span>
              </h2>

              <p className="section-subtitle">
                Software pensado para agilizar la atención en tu local, tener el inventario al día y controlar tu caja sin depender de sistemas lentos ni pagar alquileres mensuales obligatorios.
              </p>
            </div>

            <div className="dev-cards-grid reveal-group">
              {posFeatures.map((feat, fIdx) => {
                const IconComp = feat.icon;
                return (
                  <div key={fIdx} className="dev-feature-card reveal">
                    <div className="dev-card-top-row">
                      <div className="dev-icon-circle">
                        <IconComp size={20} />
                      </div>
                    </div>

                    <h3 className="dev-card-title">{feat.title}</h3>
                    <p className="dev-card-desc">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Presupuesto a medida reassurance card */}
            <div className="dev-quote-reassurance-card reveal">
              <div className="reassurance-content-left">
                <div className="reassurance-icon-box">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h3 className="reassurance-title">¿Cómo presupuesto un desarrollo a medida?</h3>
                  <p className="reassurance-desc">
                    Lo evaluamos juntos: según las pantallas, funciones, bases de datos y dispositivos que necesites, te armo una propuesta transparente y cerrada antes de empezar, sin costos ocultos ni mensualidades forzadas.
                  </p>
                </div>
              </div>

              <div className="reassurance-action-right">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsgGeneral}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hostinger-primary btn-quote-action"
                  onClick={() => trackWhatsAppClick('custom_dev_quote_box', 'Presupuesto_medida')}
                >
                  <MessageSquare size={17} />
                  <span>Consultame tu proyecto</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Official Global Footer */}
      <Footer />

      {/* 5. Official WhatsApp Floating Button */}
      <WhatsAppFloatingBtn />

      {/* 6. Fullscreen Zoom Lightbox Modal */}
      {zoomedImg && (
        <div className="screenshot-lightbox-overlay" onClick={() => setZoomedImg(null)}>
          <div className="screenshot-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="btn-close-lightbox"
              onClick={() => setZoomedImg(null)}
              aria-label="Cerrar imagen"
            >
              <X size={20} />
            </button>
            <img src={zoomedImg} alt="Captura ampliada en alta resolución" className="lightbox-full-img" />
          </div>
        </div>
      )}
    </div>
  );
}
