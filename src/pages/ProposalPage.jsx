import React, { useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { PROPOSALS } from '../data/proposalData';

export default function ProposalPage({ slug }) {
  const belenWhatsapp = '5491128779641';
  const proposal = PROPOSALS[slug] || PROPOSALS['parrilla-el-fogon'];
  const isFallback = !PROPOSALS[slug];

  useEffect(() => {
    // 1. Meta tag noindex & nofollow for proposals
    let metaRobots = document.querySelector('meta[name="robots"]');
    const createdRobots = !metaRobots;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    const previousRobots = metaRobots.content;
    metaRobots.content = 'noindex, nofollow';

    // 2. Dynamic Document Title
    const previousTitle = document.title;
    document.title = `Propuesta de diseño para ${proposal.businessName} | Primera Cuadra`;

    // 3. Track proposal view in dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'proposal_view',
        proposal_slug: slug,
        proposal_business: proposal.businessName,
        proposal_rubro: proposal.rubro
      });
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = previousTitle;
      if (createdRobots) {
        metaRobots.remove();
      } else {
        metaRobots.content = previousRobots;
      }
    };
  }, [slug, proposal]);

  const interestMsg = encodeURIComponent(
    `¡Hola Belén! Vi la propuesta de diseño para "${proposal.businessName}" en Primera Cuadra y me interesa avanzar. ¿Podemos coordinar los detalles?`
  );

  const handleInterestClick = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        button_origin: 'proposal_sticky_me_interesa',
        proposal_slug: slug,
        proposal_business: proposal.businessName
      });
    }
  };

  return (
    <div className="proposal-page-root">
      {/* 1. Fixed Top Announcement & Action Bar */}
      <header className="proposal-sticky-header">
        <div className="proposal-header-container">
          <div className="proposal-header-info">
            <a href="/" className="proposal-back-link" title="Volver al sitio principal">
              <ArrowLeft size={16} />
              <span>Primera Cuadra</span>
            </a>
            <div className="proposal-badge-pill">
              <Sparkles size={13} className="text-purple-accent" />
              <span>Propuesta de diseño exclusiva</span>
            </div>
            <h1 className="proposal-header-title">
              {proposal.businessName}
            </h1>
            <span className="proposal-header-rubro">({proposal.rubroLabel})</span>
          </div>

          <div className="proposal-header-actions">
            <div className="proposal-validity-tag">
              <Calendar size={13} />
              <span>Válida hasta: <strong>{proposal.validUntil}</strong></span>
            </div>
            <a 
              href={`https://wa.me/${belenWhatsapp}?text=${interestMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-proposal-interest"
              onClick={handleInterestClick}
            >
              <MessageSquare size={16} />
              <span>¡Me interesa la propuesta!</span>
            </a>
          </div>
        </div>
      </header>

      {/* Notice if slug not found */}
      {isFallback && (
        <div className="proposal-notice-bar">
          <div className="container">
            <AlertCircle size={16} />
            <span>Mostrando propuesta de demostración (slug "{slug}" no encontrado en catálogo).</span>
          </div>
        </div>
      )}

      {/* 2. Personalized Proposal Briefing Card */}
      <section className="proposal-hero-section">
        <div className="container">
          <div className="proposal-intro-card">
            <div className="proposal-kicker">
              <span>PREPARADA POR BELÉN IRIGOY • PRIMERA CUADRA</span>
            </div>
            <h2 className="proposal-main-heading">
              Cómo se vería la presencia digital de <span className="highlight-purple">{proposal.businessName}</span>
            </h2>
            <p className="proposal-summary-text">
              {proposal.description}
            </p>

            <div className="proposal-client-metadata">
              <div className="metadata-item">
                <MapPin size={15} className="meta-icon" />
                <span><strong>Ubicación:</strong> {proposal.address}</span>
              </div>
              <div className="metadata-item">
                <Phone size={15} className="meta-icon" />
                <span><strong>WhatsApp de contacto:</strong> {proposal.phone}</span>
              </div>
              <div className="metadata-item">
                <Clock size={15} className="meta-icon" />
                <span><strong>Horarios:</strong> {proposal.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Web & Mobile Preview Mockup */}
      <section className="proposal-preview-section">
        <div className="container">
          <div className="proposal-mockup-frame">
            {/* Mockup Browser Top Bar */}
            <div className="mockup-browser-chrome">
              <div className="mockup-window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="mockup-url-bar">
                <span className="url-protocol">https://</span>
                <span className="url-domain">ejemplo-{proposal.slug}.primeracuadra.com.ar</span>
              </div>
              <div className="mockup-window-tag">Diseño de ejemplo – negocio ficticio</div>
            </div>

            {/* Mockup Website Rendered Inside */}
            <div className="mockup-website-viewport">
              {/* Demo Site Header */}
              <div className="demo-site-nav" style={{ borderBottomColor: proposal.primaryColor + '30' }}>
                <div className="demo-site-brand">
                  <span className="demo-brand-name">{proposal.businessName}</span>
                  <span className="demo-brand-sub">{proposal.rubroLabel}</span>
                </div>
                <div className="demo-site-actions">
                  <a 
                    href={`https://wa.me/${proposal.whatsapp}?text=${encodeURIComponent(`Hola ${proposal.businessName}, me comunico desde la web para hacer una consulta.`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="demo-site-wa-btn"
                    style={{ backgroundColor: proposal.primaryColor }}
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Demo Site Hero */}
              <div 
                className="demo-site-hero" 
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(15, 23, 0.7)), url(${proposal.heroImage})`
                }}
              >
                <div className="demo-site-hero-content">
                  <span className="demo-site-badge" style={{ backgroundColor: proposal.primaryColor + '25', color: proposal.primaryColor }}>
                    {proposal.rubroLabel} en tu zona
                  </span>
                  <h3 className="demo-site-title">{proposal.businessName}</h3>
                  <p className="demo-site-tagline">{proposal.tagline}</p>
                  <div className="demo-site-cta-row">
                    <a 
                      href={`https://wa.me/${belenWhatsapp}?text=${interestMsg}`} 
                      className="demo-btn-primary" 
                      style={{ backgroundColor: proposal.primaryColor }}
                      onClick={handleInterestClick}
                    >
                      <MessageSquare size={16} />
                      <span>Contactar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Demo Featured Items / Services */}
              <div className="demo-site-services-grid">
                <h4 className="demo-section-title">Servicios y Precios de Referencia</h4>
                <div className="demo-items-grid">
                  {proposal.featuredItems.map((item, idx) => (
                    <div key={idx} className="demo-item-card">
                      <div className="demo-item-header">
                        <span className="demo-item-name">{item.name}</span>
                        <span className="demo-item-price" style={{ color: proposal.primaryColor }}>{item.price}</span>
                      </div>
                      <p className="demo-item-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Google Maps & Info Strip */}
              <div className="demo-site-footer-strip">
                <div className="demo-strip-col">
                  <strong>Dirección:</strong>
                  <span>{proposal.address}</span>
                </div>
                <div className="demo-strip-col">
                  <strong>Horarios de atención:</strong>
                  <span>{proposal.hours}</span>
                </div>
                <div className="demo-strip-col">
                  <strong>Ficha Google Maps:</strong>
                  <span className="demo-maps-status">Optimizada con fotos y reseñas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Proposal Commercial Conditions & Close */}
      <section className="proposal-commercial-section">
        <div className="container">
          <div className="proposal-commercial-card">
            <div className="commercial-card-header">
              <div className="commercial-kicker">
                <ShieldCheck size={18} className="text-purple-icon" />
                <span>PLAN RECOMENDADO PARA ESTE PROYECTO</span>
              </div>
              <h3 className="commercial-title">Plan: {proposal.recommendedPlan}</h3>
              <p className="commercial-desc">
                Diseñado para que {proposal.businessName} empiece a captar nuevos clientes con la mejor imagen profesional.
              </p>
            </div>

            <div className="commercial-benefits-list">
              {proposal.benefits.map((benefit, idx) => (
                <div key={idx} className="commercial-benefit-item">
                  <CheckCircle2 size={18} className="text-green-icon" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="commercial-guarantee-box">
              <div className="guarantee-line">
                <strong>Condición de pago:</strong> 50% al iniciar y 50% contra entrega conforme cuando la web esté terminada y aprobada por vos.
              </div>
              <div className="guarantee-line">
                <strong>Tiempo de entrega:</strong> 4 días hábiles desde que recibo las fotos y datos de tu negocio.
              </div>
            </div>

            <div className="commercial-action-footer">
              <a 
                href={`https://wa.me/${belenWhatsapp}?text=${interestMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hostinger-primary btn-accept-proposal"
                onClick={handleInterestClick}
              >
                <MessageSquare size={18} />
                <span>Avanzar con esta propuesta por WhatsApp</span>
                <ChevronRight size={18} />
              </a>
              <span className="commercial-direct-contact">
                Atención directa con Belén Irigoy • Sin intermediarios ni tecnicismos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="proposal-footer">
        <div className="container">
          <p>© 2026 Primera Cuadra • Tigre, Buenos Aires, Argentina • <a href="/">Ir a la página principal</a></p>
        </div>
      </footer>
    </div>
  );
}

