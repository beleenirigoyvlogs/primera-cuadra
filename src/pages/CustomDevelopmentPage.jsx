import React, { useEffect } from 'react';
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
  FileCheck
} from 'lucide-react';
import MobileAppsSection from '../components/MobileAppsSection';

export default function CustomDevelopmentPage() {
  const whatsappNumber = '5491128779641';
  const whatsappMsg = encodeURIComponent(
    '¡Hola Belen! Llegué desde la sección de Desarrollo a Medida en Primera Cuadra. Tengo un proyecto/idea de software (App móvil / Sistema POS) y me gustaría consultarte para evaluar el alcance y presupuesto.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Desarrollo a Medida: Apps Móviles & Sistemas POS | Primera Cuadra';
  }, []);

  const posFeatures = [
    {
      title: 'Sistema POS táctil para PC, Tablet o Celular',
      desc: 'Interfaz ágil diseñada para despachar ventas rápido en mostrador sin complicaciones.',
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
      title: 'Software 100% tuyo sin abonos obligatorios',
      desc: 'Desarrollo adaptado a tu negocio, sin ataduras a alquileres mensuales abusivos.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="custom-dev-page-wrapper">
      {/* Navigation Top Bar */}
      <header className="custom-dev-navbar">
        <div className="container custom-dev-nav-inner">
          <div className="nav-brand-group">
            <a href="/" className="btn-back-home" title="Volver al inicio de Primera Cuadra">
              <ArrowLeft size={16} />
              <span>Volver a la web</span>
            </a>
            <div className="nav-brand-sep" aria-hidden="true"></div>
            <a href="/" className="nav-brand-link">
              <picture className="brand-logo-picture">
                <source srcSet="/logo.webp" type="image/webp" />
                <img 
                  src="/logo.jpg" 
                  alt="Logo Primera Cuadra" 
                  className="brand-logo-img" 
                  width="36"
                  height="36"
                />
              </picture>
              <span className="brand-name-text">Primera Cuadra</span>
            </a>
          </div>

          <div className="nav-cta-actions">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hostinger-primary btn-nav-consult"
            >
              <MessageSquare size={15} />
              <span>Consultanos tu proyecto</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="custom-dev-hero">
        <div className="container">
          <div className="custom-dev-hero-content">
            <div className="section-kicker-tag">
              <Sparkles size={14} />
              <span>SOFTWARE PERSONALIZADO • SIN PRECIOS FIJOS</span>
            </div>

            <h1 className="custom-dev-hero-title">
              Desarrollo de Software y <span className="highlight-purple">Soluciones a Medida</span>
            </h1>

            <p className="custom-dev-hero-subtitle">
              Además de nuestras páginas web y presencia digital para comercios, desarrollamos <strong>Aplicaciones Móviles para Android y iOS</strong> y <strong>Sistemas de Punto de Venta (POS) con Control de Stock</strong> adaptados a las necesidades particulares de cada empresa o proyecto.
            </p>

            <div className="custom-dev-hero-pills">
              <span className="hero-pill-badge">
                <Smartphone size={14} />
                <span>Apps Android & iOS</span>
              </span>
              <span className="hero-pill-badge">
                <Boxes size={14} />
                <span>Sistemas POS & Stock</span>
              </span>
              <span className="hero-pill-badge">
                <FileCheck size={14} />
                <span>Presupuesto a medida según alcance</span>
              </span>
            </div>

            <div className="custom-dev-hero-actions">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hostinger-primary btn-hero-project-consult"
              >
                <MessageSquare size={18} />
                <span>Consultanos tu proyecto</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Mobile Apps Section */}
      <main className="custom-dev-main-body">
        <MobileAppsSection />

        {/* Section 2: Standalone POS and Inventory Section */}
        <section className="pos-custom-section-wrapper" id="sistemas-pos">
          <div className="container">
            <div className="section-header-center">
              <div className="section-kicker-tag">
                <Boxes size={14} />
                <span>GESTIÓN COMERCIAL & MOSTRADOR</span>
              </div>
              <h2 className="section-title">
                Sistemas de Punto de Venta (POS) & <span className="highlight-purple">Control de Stock</span>
              </h2>
              <p className="section-subtitle">
                Software pensado para que agilices la atención en tu local, lleves el inventario al día y tengas el control de tu caja sin depender de sistemas lentos o abonos mensuales abusivos.
              </p>
            </div>

            <div className="pos-features-grid">
              {posFeatures.map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div key={idx} className="pos-feature-card">
                    <div className="pos-feature-icon-circle">
                      <IconComp size={22} />
                    </div>
                    <h3 className="pos-feature-title">{feat.title}</h3>
                    <p className="pos-feature-desc">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Custom Quote Reassurance Notice */}
            <div className="custom-quote-banner">
              <div className="quote-banner-left">
                <ShieldCheck size={28} className="quote-icon" />
                <div>
                  <h4>¿Cómo se presupuestan las apps y sistemas a medida?</h4>
                  <p>
                    Cada desarrollo es único: evaluamos juntos las pantallas, roles, bases de datos y dispositivos necesarios para armarte una propuesta clara y cerrada según el alcance de tu proyecto, sin sorpresas ni mensualidades forzadas.
                  </p>
                </div>
              </div>

              <div className="quote-banner-right">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hostinger-primary btn-quote-cta"
                >
                  <MessageSquare size={17} />
                  <span>Consultanos tu proyecto</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Custom Development Dedicated Footer */}
      <footer className="custom-dev-footer">
        <div className="container custom-dev-footer-inner">
          <p>© {new Date().getFullYear()} Primera Cuadra. Presencia digital y desarrollo de software a medida.</p>
          <div className="custom-dev-footer-links">
            <a href="/">Volver a Inicio</a>
            <a href="/#servicios">Servicios Web</a>
            <a href="/#precios">Planes Web</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
