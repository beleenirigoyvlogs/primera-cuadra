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
  Lock
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

  const thePointScreens = [
    {
      id: 'pos',
      tabLabel: 'Punto de Venta Táctil',
      title: 'Mostrador & Cobro Rápido',
      subtitle: 'Catálogo táctil con categorías, buscador instantáneo y carrito en vivo.',
      badge: 'Pantalla de Ventas',
      bullets: [
        'Grilla de artículos frecuentes con fotos y precios',
        'Cálculo de vuelto automático y múltiples medios de pago (Efectivo, QR / Mercado Pago, Débito)',
        'Ticket digital y compatibilidad con impresora térmica'
      ],
      mockupData: {
        headerTitle: 'The Point • Caja Mostrador',
        categoryPill: 'Golosinas & Kiosco',
        items: [
          { name: 'Alfajor Triple Chocolate', price: '$1.400', stock: '24 un.' },
          { name: 'Gaseosa 500ml Cola', price: '$2.100', stock: '18 un.' },
          { name: 'Chicles Menta Extra (caja)', price: '$900', stock: '32 un.' },
          { name: 'Cigarrillos Box 20', price: '$3.800', stock: '12 un.' }
        ],
        cartTotal: '$8.200',
        paymentMethod: 'Mercado Pago QR'
      }
    },
    {
      id: 'stock',
      tabLabel: 'Control de Stock',
      title: 'Inventario & Alertas en Tiempo Real',
      subtitle: 'Seguimiento exacto de mercadería, precios de costo y reposición.',
      badge: 'Módulo de Inventario',
      bullets: [
        'Alertas visuales automáticas cuando un producto llega al stock mínimo',
        'Registro ágil de ingreso de mercadería de distribuidores',
        'Actualización masiva de precios por porcentaje o rubro'
      ],
      mockupData: {
        headerTitle: 'The Point • Stock & Depósito',
        categoryPill: 'Alertas de Reposición',
        items: [
          { name: 'Yerba Mate Suave 500g', price: 'Stock: 3 (Crítico)', stock: 'Mín: 10' },
          { name: 'Galletitas Rellenas Vainilla', price: 'Stock: 6 (Bajo)', stock: 'Mín: 15' },
          { name: 'Agua Mineral s/ Gas 500ml', price: 'Stock: 48 (Óptimo)', stock: 'Mín: 24' },
          { name: 'Caramelos Surtidos x bolsa', price: 'Stock: 4 (Bajo)', stock: 'Mín: 8' }
        ],
        cartTotal: '14 productos críticos',
        paymentMethod: 'Alerta automática'
      }
    },
    {
      id: 'caja',
      tabLabel: 'Arqueo de Caja',
      title: 'Cierre Diario & Balances',
      subtitle: 'Resumen discriminado de ventas por método de pago sin diferencias.',
      badge: 'Cierre de Turno',
      bullets: [
        'Registro de apertura de caja, retiros parciales y fondo fijo',
        'Discriminación de ingresos: Efectivo, Transferencias, Tarjetas y Apps',
        'Reporte de ventas diario exportable con horario de cierre'
      ],
      mockupData: {
        headerTitle: 'The Point • Balance de Turno',
        categoryPill: 'Turno Tarde - Caja 01',
        items: [
          { name: 'Ventas en Efectivo en Caja', price: '$184.500', stock: '38 tickets' },
          { name: 'Cobros con QR / Transferencias', price: '$126.800', stock: '26 tickets' },
          { name: 'Tarjetas de Débito / Crédito', price: '$74.200', stock: '14 tickets' },
          { name: 'Retiros para proveedores (-)', price: '-$45.000', stock: 'Comprobante #102' }
        ],
        cartTotal: 'Total Neto: $340.500',
        paymentMethod: 'Caja Cuadrada OK'
      }
    },
    {
      id: 'roles',
      tabLabel: 'Usuarios & Roles',
      title: 'Permisos & Seguridad',
      subtitle: 'Cuentas diferenciadas para administradores y cajeros.',
      badge: 'Control de Acceso',
      bullets: [
        'Rol Cajero/Vendedor: solo despacho de ventas y cobro en mostrador',
        'Rol Administrador/Dueño: acceso a costos, márgenes, balances y stock',
        'Registro con fecha y hora de cada anulación o movimiento de caja'
      ],
      mockupData: {
        headerTitle: 'The Point • Seguridad y Roles',
        categoryPill: 'Permisos de Personal',
        items: [
          { name: 'Belén (Administradora)', price: 'Acceso Total', stock: 'Activo' },
          { name: 'Cajero Turno Mañana', price: 'Solo Ventas', stock: 'En mostrador' },
          { name: 'Cajero Turno Tarde', price: 'Solo Ventas', stock: 'En mostrador' },
          { name: 'Supervisor de Depósito', price: 'Stock e Ingresos', stock: 'Sin ventas' }
        ],
        cartTotal: '4 usuarios asignados',
        paymentMethod: 'PIN de acceso'
      }
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
              <div className="the-point-tabs-bar" role="tablist">
                {thePointScreens.map((screen, sIdx) => (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={activeScreenIdx === sIdx}
                    className={`the-point-tab-btn ${activeScreenIdx === sIdx ? 'active' : ''}`}
                    onClick={() => setActiveScreenIdx(sIdx)}
                  >
                    <span>{sIdx + 1}. {screen.tabLabel}</span>
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
                        <span>React Native</span>
                      </span>
                      <span className="stack-chip">
                        <Database size={13} />
                        <span>Firebase Firestore</span>
                      </span>
                      <span className="stack-chip">
                        <Printer size={13} />
                        <span>Impresión Térmica</span>
                      </span>
                      <span className="stack-chip">
                        <ShieldCheck size={13} />
                        <span>Node.js</span>
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

                {/* Right Side: Realistic Device UI Mockup */}
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
                      Pantalla {activeScreenIdx + 1} de {thePointScreens.length}
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

                  {/* Device Chassis Frame */}
                  <div className="pos-device-tablet-frame">
                    <div className="tablet-screen-header">
                      <div className="tablet-brand-wrap">
                        <div className="tablet-logo-pill">TP</div>
                        <span className="tablet-header-title">{currentScreen.mockupData.headerTitle}</span>
                      </div>
                      <span className="tablet-category-tag">{currentScreen.mockupData.categoryPill}</span>
                    </div>

                    {/* Virtual Tablet Screen Rows */}
                    <div className="tablet-screen-content">
                      <div className="tablet-items-grid">
                        {currentScreen.mockupData.items.map((it, itIdx) => (
                          <div key={itIdx} className="tablet-item-row">
                            <div className="t-item-info">
                              <span className="t-item-name">{it.name}</span>
                              <span className="t-item-stock">{it.stock}</span>
                            </div>
                            <span className="t-item-price">{it.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Mockup Action Bar */}
                      <div className="tablet-screen-footer-bar">
                        <div className="tablet-total-info">
                          <span className="t-total-label">Estado / Total:</span>
                          <strong className="t-total-val">{currentScreen.mockupData.cartTotal}</strong>
                        </div>
                        <div className="tablet-payment-pill">
                          <ShoppingBag size={13} />
                          <span>{currentScreen.mockupData.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
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
    </div>
  );
}
