import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Globe,
  Monitor,
  CheckCircle2,
  Star,
  ExternalLink,
  CheckCheck,
  Phone
} from 'lucide-react';

export default function Hero() {
  const defaultWhatsappNumber = '5491128779641';
  const whatsappHeroMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Quiero mejorar la presencia digital de mi negocio con página web, Google y WhatsApp. ¿Podrían asesorarme?'
  );

  return (
    <section className="hero-section-wrapper" id="hero">
      <div className="container">
        <div className="hero-split-grid">
          {/* Left Column: Value Proposition & Conversion */}
          <div className="hero-text-col">
            <div className="hero-kicker-badge">
              <Sparkles size={14} />
              <span>PRESENCIA DIGITAL PARA COMERCIOS Y PROFESIONALES</span>
            </div>

            {/* Main Action-Oriented Headline (Cambio 1) */}
            <h1 className="hero-headline-result">
              <span>Que te encuentren.</span>
              <span>Que te conozcan.</span>
              <span className="highlight-purple">Que te contacten.</span>
            </h1>

            {/* Specific Subtitle */}
            <p className="hero-subtitle-result">
              Creemos la presencia digital de tu negocio con una página web profesional, Google optimizado y WhatsApp Business con catálogo.
            </p>

            {/* CTAs Row */}
            <div className="hero-cta-actions">
              <a 
                href={`https://wa.me/${defaultWhatsappNumber}?text=${whatsappHeroMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hostinger-primary hero-btn-main"
              >
                <span>QUIERO MEJORAR MI NEGOCIO</span>
                <ArrowRight size={18} />
              </a>

              <a href="#demos" className="btn-hostinger-outline hero-btn-demo">
                <Monitor size={17} />
                <span>VER DEMOSTRACIÓN</span>
              </a>
            </div>

            {/* Trust Indicators Bar: Solo los 3 elementos especificados */}
            <div className="hero-trust-guarantees">
              <div className="trust-pill-tag">
                <Clock size={16} className="text-purple-icon" />
                <span>Entrega en 4 días hábiles</span>
              </div>
              <div className="trust-pill-tag">
                <Zap size={16} className="text-purple-icon" />
                <span>50% al iniciar</span>
              </div>
              <div className="trust-pill-tag">
                <ShieldCheck size={16} className="text-purple-icon" />
                <span>50% contra entrega</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic 3-in-1 Connected Mockup */}
          <div className="hero-mockup-col">
            <div className="mockup-connected-canvas">
              {/* Floating Badge Google Maps Top */}
              <div className="mockup-floating-card card-google">
                <div className="mockup-google-header">
                  <div className="google-icon-circle">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <strong className="mockup-business-name">Tu Negocio Local</strong>
                    <div className="mockup-google-rating">
                      <span className="rating-num">4.9</span>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span className="rating-count">(124 reseñas)</span>
                    </div>
                  </div>
                </div>

                <div className="mockup-google-action-buttons">
                  <div className="google-mini-btn active">
                    <Globe size={13} />
                    <span>Sitio web</span>
                  </div>
                  <div className="google-mini-btn">
                    <MapPin size={13} />
                    <span>Cómo llegar</span>
                  </div>
                  <div className="google-mini-btn">
                    <Phone size={13} />
                    <span>Llamar</span>
                  </div>
                </div>
              </div>

              {/* Main Center Window: Professional Website */}
              <div className="mockup-browser-window">
                {/* Browser Top Bar */}
                <div className="browser-top-bar">
                  <div className="browser-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="browser-url-pill">
                    <Globe size={12} />
                    <span>tunegocio.com.ar</span>
                  </div>
                </div>

                {/* Website Preview Inside */}
                <div className="browser-screen-inner">
                  <div className="mini-web-header">
                    <div className="mini-web-brand">
                      <div className="mini-logo-box"></div>
                      <span>TU MARCA</span>
                    </div>
                    <div className="mini-web-nav">
                      <span>Servicios</span>
                      <span>Ubicación</span>
                      <span className="mini-btn-contact">Contactar</span>
                    </div>
                  </div>

                  <div className="mini-web-hero">
                    <div className="mini-web-badge">Abierto hoy • Atención inmediata</div>
                    <h4>Especialistas en tu zona con atención personalizada</h4>
                    <p>Servicios profesionales, catálogo de precios y garantía.</p>

                    <div className="mini-service-chips">
                      <div className="mini-chip">✓ Presupuesto en el acto</div>
                      <div className="mini-chip">✓ Fotos y trabajos reales</div>
                      <div className="mini-chip">✓ Ubicación exacta</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating WhatsApp Card Bottom Right */}
              <div className="mockup-floating-card card-whatsapp">
                <div className="mockup-wa-header">
                  <div className="wa-avatar-box">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="wa-name-row">
                      <strong>Tu Negocio</strong>
                      <span className="wa-verified-pill">Oficial</span>
                    </div>
                    <span className="wa-status-text">WhatsApp Business • En línea</span>
                  </div>
                </div>

                <div className="mockup-wa-body">
                  <div className="mockup-wa-bubble">
                    <p>¡Hola! Vi la web y quería consultar por sus servicios y catálogo.</p>
                    <span className="wa-time">11:42</span>
                  </div>

                  <div className="mockup-wa-catalog-pill">
                    <div className="catalog-icon-sq">
                      <Sparkles size={14} />
                    </div>
                    <div className="catalog-pill-info">
                      <strong>Catálogo de Servicios</strong>
                      <span>Ver precios y disponibilidad</span>
                    </div>
                    <CheckCheck size={14} color="#38bdf8" />
                  </div>
                </div>
              </div>

              {/* Central Connection Badge */}
              <div className="mockup-connection-ribbon">
                <div className="ribbon-flow">
                  <span>Google</span>
                  <span className="arrow-sep">→</span>
                  <span className="active-highlight">Web Propia</span>
                  <span className="arrow-sep">→</span>
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
