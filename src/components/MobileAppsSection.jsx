import React from 'react';
import { 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Rocket, 
  Globe2, 
  Check,
  Zap,
  Code2
} from 'lucide-react';

export default function MobileAppsSection() {
  const defaultWhatsappNumber = '5491128779641';
  const whatsappAppMsg = encodeURIComponent(
    'Hola, llegué desde Primera Cuadra y quiero consultar por el desarrollo de una aplicación móvil. Tengo una idea/proyecto que me gustaría presupuestar. ¿Podrían asesorarme y pasarme los valores?'
  );

  const benefits = [
    {
      title: 'Desarrollo para Android y iOS',
      desc: 'Tu aplicación lista y optimizada para las tiendas oficiales de Google Play y App Store.',
      icon: Smartphone,
      tag: 'Multiplataforma'
    },
    {
      title: 'Apps de cualquier tipo, idea o temática',
      desc: 'Creamos desde herramientas de utilidad y startups hasta apps de reservas, comunidades, gestión o entretenimiento.',
      icon: Rocket,
      tag: 'Cualquier Rubro'
    },
    {
      title: 'Diseño UX/UI moderno, intuitivo y atractivo',
      desc: 'Interfaces cuidadas al detalle para que la experiencia de uso sea fluida, rápida y disfrutable para tus usuarios.',
      icon: Layers,
      tag: 'Diseño Pro'
    },
    {
      title: 'Funcionalidades e integraciones avanzadas',
      desc: 'Autenticación de usuarios, bases de datos en la nube, notificaciones push, pasarelas de pago y APIs a medida.',
      icon: Cpu,
      tag: 'A Medida'
    },
    {
      title: 'Tecnología escalable preparada para crecer',
      desc: 'Estructura modular y código limpio que te permite lanzar una primera versión y seguir expandiéndola en el tiempo.',
      icon: Code2,
      tag: 'Escalable'
    }
  ];

  return (
    <section className="mobile-apps-section-wrapper" id="apps-moviles">
      {/* Background Decorative Ambient Glows */}
      <div className="apps-glow-radial" aria-hidden="true"></div>
      
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag apps-kicker">
            <Sparkles size={14} />
            <span>DESARROLLO DE SOFTWARE • APPS EN GENERAL</span>
          </div>

          <h2 className="section-title">
            Desarrollamos la app que{' '}
            <span className="highlight-purple">tenés en mente</span>
          </h2>

          <p className="section-subtitle">
            Damos vida a cualquier idea con aplicaciones móviles a medida para Android y iOS. Desarrollamos apps para todo tipo de proyectos: startups, utilidades, herramientas digitales, plataformas de gestión, servicios, comunidades o nuevas experiencias interactivas.
          </p>
        </div>

        {/* Split Grid: Left Information & Benefits, Right Interactive Phone Mockup */}
        <div className="apps-split-grid">
          {/* Left Column: Benefits & Consultation Actions */}
          <div className="apps-content-col reveal">
            {/* Platform Badges */}
            <div className="apps-platforms-pills" aria-label="Plataformas compatibles">
              <span className="platform-pill">
                <span className="pill-dot android"></span>
                <span>Android (Google Play)</span>
              </span>
              <span className="platform-pill">
                <span className="pill-dot ios"></span>
                <span>iOS (App Store)</span>
              </span>
              <span className="platform-pill highlight">
                <span>Cualquier idea o proyecto</span>
              </span>
              <span className="platform-pill highlight">
                <span>100% a medida</span>
              </span>
            </div>

            {/* List of Benefits */}
            <div className="apps-benefits-list">
              {benefits.map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={idx} className="apps-benefit-card">
                    <div className="benefit-icon-box">
                      <IconComponent size={20} />
                    </div>
                    <div className="benefit-text-wrap">
                      <div className="benefit-title-row">
                        <h3 className="benefit-title">{benefit.title}</h3>
                        <span className="benefit-tag">{benefit.tag}</span>
                      </div>
                      <p className="benefit-desc">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer & Transparency Box */}
            <div className="apps-disclaimer-box">
              <div className="disclaimer-header">
                <ShieldCheck size={16} className="disclaimer-icon" />
                <span className="disclaimer-title">Presupuesto personalizado y transparente</span>
              </div>
              <p className="disclaimer-text">
                Las funcionalidades, integraciones y características técnicas se definen de acuerdo con el alcance y los requisitos específicos de cada desarrollo. No publicamos tarifas fijas porque cada idea es única y presupuestamos a medida de lo que realmente necesitás.
              </p>
            </div>

            {/* CTA Conversion Action Area */}
            <div className="apps-cta-block">
              <a 
                href={`https://wa.me/${defaultWhatsappNumber}?text=${whatsappAppMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hostinger-primary btn-apps-action"
              >
                <MessageSquare size={18} />
                <span>Consultar por mi app</span>
                <ArrowRight size={18} />
              </a>

              <p className="apps-cta-note">
                Contanos tu idea y consultá los valores para tu proyecto.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Smartphone Mockup */}
          <div className="apps-mockup-col reveal">
            <div className="phone-device-container">
              {/* Floating Accents */}
              <div className="phone-floating-badge badge-top">
                <div className="badge-icon-wrap wa">
                  <Zap size={14} />
                </div>
                <div className="badge-content">
                  <span className="badge-title">Cualquier funcionalidad</span>
                  <span className="badge-sub">Lógica a medida y bases de datos</span>
                </div>
              </div>

              <div className="phone-floating-badge badge-bottom">
                <div className="badge-icon-wrap check">
                  <Check size={14} />
                </div>
                <div className="badge-content">
                  <span className="badge-title">Android & iOS Ready</span>
                  <span className="badge-sub">Desarrollo nativo o multiplataforma</span>
                </div>
              </div>

              {/* Physical Phone Frame */}
              <div className="phone-chassis">
                {/* Screen Bezel & Dynamic Island */}
                <div className="phone-notch">
                  <div className="camera-lens"></div>
                  <div className="speaker-slit"></div>
                </div>

                {/* Inner Screen Display */}
                <div className="phone-screen">
                  {/* Status Bar */}
                  <div className="screen-status-bar">
                    <span className="status-time">09:41</span>
                    <div className="status-icons">
                      <span className="signal-bars">●●●●</span>
                      <span className="wifi-icon">📶</span>
                      <span className="battery-icon">100%</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="screen-app-header">
                    <div className="app-profile-wrap">
                      <div className="app-avatar">APP</div>
                      <div className="app-header-text">
                        <span className="app-name">Tu App a Medida</span>
                        <span className="app-status-badge">
                          <span className="live-dot"></span> Proyecto Activo
                        </span>
                      </div>
                    </div>
                    <div className="app-header-action">
                      <Sparkles size={15} />
                    </div>
                  </div>

                  {/* Dynamic Promo Banner */}
                  <div className="screen-hero-banner">
                    <div className="banner-badge">TECNOLOGÍA A MEDIDA</div>
                    <h4 className="banner-title">Cualquier idea, cualquier rubro</h4>
                    <p className="banner-sub">Apps personalizadas para startups, proyectos y empresas.</p>
                  </div>

                  {/* Modular Functional Tiles */}
                  <div className="screen-quick-actions">
                    <div className="quick-action-tile active">
                      <Rocket size={17} />
                      <span>Startups</span>
                    </div>
                    <div className="quick-action-tile">
                      <Cpu size={17} />
                      <span>Sistemas</span>
                    </div>
                    <div className="quick-action-tile">
                      <Globe2 size={17} />
                      <span>Comunidad</span>
                    </div>
                  </div>

                  {/* Sample Module: Custom Feature Widget */}
                  <div className="screen-service-card">
                    <div className="service-card-top">
                      <span className="service-tag">Módulo a Medida</span>
                      <span className="service-state">En la Nube</span>
                    </div>
                    <h5 className="service-title">Gestión, pagos y usuarios</h5>
                    <p className="service-desc">Perfiles, sincronización en vivo, notificaciones y reportes.</p>
                    <div className="service-card-footer">
                      <span className="service-chip">Android & iOS</span>
                      <span className="service-btn-mock">Ver Demo</span>
                    </div>
                  </div>

                  {/* Sample Interactive Component */}
                  <div className="screen-catalog-item">
                    <div className="item-icon-box">
                      <Code2 size={16} />
                    </div>
                    <div className="item-details">
                      <span className="item-title">APIs & Base de Datos</span>
                      <span className="item-desc">Infraestructura rápida, segura y escalable</span>
                    </div>
                    <span className="item-add-btn">✓</span>
                  </div>

                  {/* Bottom Navigation Mockup */}
                  <div className="screen-bottom-nav">
                    <div className="nav-tab active">
                      <Smartphone size={14} />
                      <span>Inicio</span>
                    </div>
                    <div className="nav-tab">
                      <Layers size={14} />
                      <span>Módulos</span>
                    </div>
                    <div className="nav-tab">
                      <Rocket size={14} />
                      <span>Proyectos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
