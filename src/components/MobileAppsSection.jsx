import React from 'react';
import { 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  Layers, 
  Calendar, 
  ShoppingBag, 
  Bell, 
  TrendingUp,
  Cpu,
  Check
} from 'lucide-react';

export default function MobileAppsSection() {
  const defaultWhatsappNumber = '5491128779641';
  const whatsappAppMsg = encodeURIComponent(
    'Hola, llegué desde Primera Cuadra y quiero consultar por el desarrollo de una aplicación móvil para mi negocio. ¿Podrían asesorarme y pasarme los valores?'
  );

  const benefits = [
    {
      title: 'Aplicaciones móviles para Android y iOS',
      desc: 'Llegá a todos tus clientes con desarrollos adaptados a las plataformas móviles líderes del mercado.',
      icon: Smartphone,
      tag: 'Multiplataforma'
    },
    {
      title: 'Diseño moderno, intuitivo y adaptado a tus usuarios',
      desc: 'Interfaces visuales atractivas y de fácil navegación que reflejan fielmente la identidad de tu negocio.',
      icon: Layers,
      tag: 'UX / UI'
    },
    {
      title: 'Funcionalidades personalizadas según tu proyecto',
      desc: 'Desarrollamos soluciones a la medida exacta de tus procesos comerciales y requerimientos específicos.',
      icon: Cpu,
      tag: 'A medida'
    },
    {
      title: 'Integración de catálogos, reservas, turnos y servicios',
      desc: 'Posibilidad de incorporar herramientas clave de gestión, atención al cliente y venta directa.',
      icon: ShoppingBag,
      tag: 'Integraciones'
    },
    {
      title: 'Soluciones escalables que acompañan tu crecimiento',
      desc: 'Estructura tecnológica sólida, preparada para incorporar nuevas opciones a medida que tu negocio evolucione.',
      icon: TrendingUp,
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
            <span>NUEVO SERVICIO • TECNOLOGÍA A MEDIDA</span>
          </div>

          <h2 className="section-title">
            Tu negocio también puede{' '}
            <span className="highlight-purple">tener su propia app</span>
          </h2>

          <p className="section-subtitle">
            Damos vida a tus ideas con aplicaciones móviles diseñadas para tu negocio. Desarrollamos soluciones a medida para que puedas ofrecer servicios, gestionar turnos, vender productos, conectar con tus clientes o crear nuevas experiencias digitales.
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
                Las funcionalidades, integraciones y características técnicas se definen de acuerdo con el alcance y los requisitos específicos de cada desarrollo. No publicamos tarifas fijas porque cada proyecto es único y presupuestamos a medida de lo que realmente necesitás.
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
                  <Bell size={14} />
                </div>
                <div className="badge-content">
                  <span className="badge-title">Notificaciones activas</span>
                  <span className="badge-sub">Turnos y promociones en vivo</span>
                </div>
              </div>

              <div className="phone-floating-badge badge-bottom">
                <div className="badge-icon-wrap check">
                  <Check size={14} />
                </div>
                <div className="badge-content">
                  <span className="badge-title">Para Android & iOS</span>
                  <span className="badge-sub">Descarga directa en tiendas</span>
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
                      <div className="app-avatar">PC</div>
                      <div className="app-header-text">
                        <span className="app-name">Tu Negocio App</span>
                        <span className="app-status-badge">
                          <span className="live-dot"></span> Abierto hoy
                        </span>
                      </div>
                    </div>
                    <div className="app-header-action">
                      <Bell size={16} />
                    </div>
                  </div>

                  {/* Dynamic Promo Banner */}
                  <div className="screen-hero-banner">
                    <div className="banner-badge">APP EXCLUSIVA</div>
                    <h4 className="banner-title">Reservá tu turno o comprá online</h4>
                    <p className="banner-sub">Rápido, simple y directo desde tu celular.</p>
                  </div>

                  {/* Quick Action Tiles */}
                  <div className="screen-quick-actions">
                    <div className="quick-action-tile active">
                      <Calendar size={18} />
                      <span>Turnos</span>
                    </div>
                    <div className="quick-action-tile">
                      <ShoppingBag size={18} />
                      <span>Catálogo</span>
                    </div>
                    <div className="quick-action-tile">
                      <MessageSquare size={18} />
                      <span>Contacto</span>
                    </div>
                  </div>

                  {/* Sample Module: Active Reservation / Service */}
                  <div className="screen-service-card">
                    <div className="service-card-top">
                      <span className="service-tag">Turnos Online</span>
                      <span className="service-state">Disponible</span>
                    </div>
                    <h5 className="service-title">Gestión de citas & servicios</h5>
                    <p className="service-desc">Seleccioná fecha, profesional o servicio en 3 toques.</p>
                    <div className="service-card-footer">
                      <span className="service-chip">Lunes a Sábado</span>
                      <span className="service-btn-mock">Reservar</span>
                    </div>
                  </div>

                  {/* Sample Mini Catalog Item */}
                  <div className="screen-catalog-item">
                    <div className="item-icon-box">
                      <ShoppingBag size={16} />
                    </div>
                    <div className="item-details">
                      <span className="item-title">Catálogo de productos</span>
                      <span className="item-desc">Actualizaciones y pedidos en tiempo real</span>
                    </div>
                    <span className="item-add-btn">+</span>
                  </div>

                  {/* Bottom Navigation Mockup */}
                  <div className="screen-bottom-nav">
                    <div className="nav-tab active">
                      <Smartphone size={14} />
                      <span>Inicio</span>
                    </div>
                    <div className="nav-tab">
                      <Calendar size={14} />
                      <span>Turnos</span>
                    </div>
                    <div className="nav-tab">
                      <ShoppingBag size={14} />
                      <span>Catálogo</span>
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
