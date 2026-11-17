import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Phone, 
  ArrowRight, 
  ExternalLink,
  ChevronDown,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Utensils,
  Scissors,
  Wrench,
  Stethoscope,
  X,
  Menu
} from 'lucide-react';
import { getSiteDataBySlug } from '../data/demoSitesData';
import { PROPOSALS } from '../data/proposalData';
import { trackWhatsAppClick } from '../utils/gtm';
import BrandLogo from '../components/BrandLogo';

export default function BusinessDemoSitePage({ slug, isProposal = false }) {
  const belenWhatsapp = '5491128779641';
  
  // Resolve site data or proposal data
  const site = getSiteDataBySlug(slug);
  const proposalData = PROPOSALS[slug] || null;
  const isCustomProposal = isProposal || Boolean(proposalData);

  const businessName = proposalData?.businessName || site.businessName;
  const tagline = proposalData?.tagline || site.tagline;
  const rubroLabel = proposalData?.rubroLabel || site.rubroLabel;
  const address = proposalData?.address || site.address;
  const hours = proposalData?.hours || site.hours;
  const phone = proposalData?.phone || site.phone;
  const whatsappNumber = proposalData?.whatsapp || site.whatsapp;
  const validUntil = proposalData?.validUntil || '30 de Noviembre de 2026';
  const recommendedPlan = proposalData?.recommendedPlan || 'Completo + Web Propia';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Meta tag noindex & nofollow for demo sites & proposals
    let metaRobots = document.querySelector('meta[name="robots"]');
    const createdRobots = !metaRobots;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    const previousRobots = metaRobots.content;
    metaRobots.content = 'noindex, nofollow';

    // 2. Dynamic Title
    const previousTitle = document.title;
    document.title = isCustomProposal 
      ? `Propuesta de diseño para ${businessName} | Primera Cuadra`
      : `${businessName} • ${tagline}`;

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = previousTitle;
      if (createdRobots) {
        metaRobots.remove();
      } else {
        metaRobots.content = previousRobots;
      }
    };
  }, [businessName, tagline, isCustomProposal]);

  // Isolate standalone demo page from global site dark mode when demo theme is light
  useEffect(() => {
    const htmlEl = document.documentElement;
    const previouslyHadDark = htmlEl.classList.contains('dark');
    if (site.theme.isLight) {
      htmlEl.classList.remove('dark');
    } else {
      htmlEl.classList.add('dark');
    }

    return () => {
      if (previouslyHadDark) {
        htmlEl.classList.add('dark');
      } else {
        htmlEl.classList.remove('dark');
      }
    };
  }, [site.theme.isLight]);

  const belenCtaMsg = isCustomProposal
    ? encodeURIComponent(`¡Hola Belén! Vi la propuesta de diseño para "${businessName}" y me interesa avanzar con mi negocio.`)
    : encodeURIComponent(`Hola Belén, vi el ejemplo de ${rubroLabel.toLowerCase()} y quiero una para mi negocio.`);

  const businessDirectWaMsg = encodeURIComponent(
    site.whatsappMsg || `¡Hola ${businessName}! Me comunico desde su página web para hacer una consulta.`
  );

  const theme = site.theme;

  return (
    <div 
      className={`demo-site-standalone-root ${theme.isLight ? 'theme-light-mode' : 'theme-dark-mode'}`}
      style={{
        '--site-bg': theme.bg,
        '--site-card': theme.card,
        '--site-card-border': theme.cardBorder,
        '--site-primary': theme.primary,
        '--site-primary-hover': theme.primaryHover,
        '--site-accent': theme.accent,
        '--site-text': theme.text,
        '--site-text-muted': theme.textMuted,
        '--site-font-heading': theme.fontHeading,
        backgroundColor: theme.bg,
        color: theme.text,
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
      }}
    >
      {/* ===================================================================
          1. TOP STICKY BAR: PRIMERA CUADRA DISCLAIMER & CONVERSION ACTION
          =================================================================== */}
      <aside className="demo-top-guarantee-strip" role="banner">
        <div className="demo-strip-container">
          <div className="demo-strip-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrandLogo variant="blanco" height={20} />
            <span className="demo-strip-dot"></span>
            <span className="demo-strip-text">
              {isCustomProposal ? (
                <>
                  <strong>Propuesta exclusiva para {businessName}</strong> · Válida hasta {validUntil}
                </>
              ) : (
                <>
                  <strong>Ejemplo ficticio diseñado por Primera Cuadra</strong> · ¿Querés una así para tu negocio?
                </>
              )}
            </span>
          </div>

          <div className="demo-strip-actions">
            <a 
              href={`https://wa.me/${belenWhatsapp}?text=${belenCtaMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-demo-strip-cta"
              onClick={() => trackWhatsAppClick('demo_site_top_strip', rubroLabel)}
            >
              <MessageCircle size={15} />
              <span>{isCustomProposal ? 'Me interesa la propuesta' : 'Pedir la mía'}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* ===================================================================
          2. BUSINESS WEBSITE HEADER / NAVIGATION
          =================================================================== */}
      <header className="business-nav-header">
        <div className="business-nav-container">
          <a href="#inicio" className="business-brand-link">
            <span className="business-brand-name" style={{ fontFamily: theme.fontHeading, color: theme.text }}>
              {businessName}
            </span>
            <span className="business-brand-rubro" style={{ color: theme.primary }}>
              {rubroLabel}
            </span>
          </a>

          <nav className="business-desktop-nav">
            <a href="#servicios" className="b-nav-link" style={{ color: theme.textMuted }}>Servicios y Precios</a>
            <a href="#galeria" className="b-nav-link" style={{ color: theme.textMuted }}>Galería</a>
            <a href="#ubicacion" className="b-nav-link" style={{ color: theme.textMuted }}>Horarios & Ubicación</a>
          </nav>

          <div className="business-header-cta-wrap">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${businessDirectWaMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-business-header-wa"
              style={{ backgroundColor: theme.primary }}
            >
              <MessageCircle size={16} />
              <span>Contactar</span>
            </a>

            <button 
              type="button" 
              className="business-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="business-mobile-menu-dropdown" style={{ backgroundColor: theme.card, borderBottomColor: theme.cardBorder }}>
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)}>Servicios y Precios</a>
            <a href="#galeria" onClick={() => setMobileMenuOpen(false)}>Galería</a>
            <a href="#ubicacion" onClick={() => setMobileMenuOpen(false)}>Horarios & Ubicación</a>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${businessDirectWaMsg}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-mobile-wa-direct"
              style={{ backgroundColor: theme.primary }}
            >
              <MessageCircle size={16} />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        )}
      </header>

      <main>
        {/* ===================================================================
            3. HERO SECTION (Big photo, headline, tagline, WhatsApp CTA)
            =================================================================== */}
        <section 
          id="inicio"
          className="business-hero-section"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10, 10, 15, 0.92) 0%, rgba(10, 10, 15, 0.72) 100%), url(${site.heroImage})`
          }}
        >
          <div className="business-container">
            <div className="business-hero-content">
              <span 
                className="business-hero-badge"
                style={{ 
                  backgroundColor: theme.primary + '22', 
                  color: theme.primary,
                  borderColor: theme.primary + '55'
                }}
              >
                {site.heroBadge}
              </span>

              <h1 className="business-hero-title" style={{ fontFamily: theme.fontHeading }}>
                {businessName}
              </h1>

              <p className="business-hero-tagline">
                {tagline}
              </p>

              <p className="business-hero-desc">
                {site.heroDescription}
              </p>

              <div className="business-hero-actions">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${businessDirectWaMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-business-hero-primary"
                  style={{ backgroundColor: theme.primary }}
                >
                  <MessageCircle size={18} />
                  <span>Enviar mensaje por WhatsApp</span>
                </a>

                <a href="#servicios" className="btn-business-hero-secondary">
                  <span>Ver lista de servicios</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Fast metadata chips */}
              <div className="business-hero-chips">
                <div className="hero-chip-item">
                  <MapPin size={15} style={{ color: theme.primary }} />
                  <span>{address}</span>
                </div>
                <div className="hero-chip-item">
                  <Clock size={15} style={{ color: theme.primary }} />
                  <span>{hours}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. SERVICES / MENU SECTION WITH REALISTIC PRICES
            =================================================================== */}
        <section id="servicios" className="business-services-section">
          <div className="business-container">
            <div className="business-section-header">
              <span className="business-kicker" style={{ color: theme.primary }}>
                {site.rubro === 'parrilla' ? 'CARTA DE CORTES & ESPECIALIDADES' : 'SERVICIOS & TARIFAS DE REFERENCIA'}
              </span>
              <h2 className="business-section-title" style={{ fontFamily: theme.fontHeading, color: theme.isLight ? '#0f172a' : theme.text }}>
                {site.rubro === 'parrilla' ? 'Platos y Cortes Recomendados' : 'Servicios Destacados'}
              </h2>
              <p className="business-section-subtitle" style={{ color: theme.isLight ? '#334155' : theme.textMuted }}>
                Precios claros y actualizados. Atención personalizada con reserva previa o por orden de llegada.
              </p>
            </div>

            <div className="business-categories-stack">
              {site.menuCategories.map((cat, cIdx) => (
                <div key={cIdx} className="business-category-block">
                  <h3 className="business-category-title" style={{ color: theme.isLight ? '#0f172a' : theme.accent, borderBottomColor: theme.cardBorder }}>
                    {cat.category}
                  </h3>

                  <div className="business-items-grid">
                    {cat.items.map((item, iIdx) => (
                      <div 
                        key={iIdx} 
                        className="business-item-card"
                        style={{ 
                          backgroundColor: theme.card, 
                          borderColor: theme.cardBorder 
                        }}
                      >
                        <div className="item-card-top">
                          <h4 className="item-name" style={{ color: theme.isLight ? '#0f172a' : theme.text }}>{item.name}</h4>
                          <span className="item-price" style={{ color: theme.primary }}>
                            {item.price}
                          </span>
                        </div>
                        <p className="item-description" style={{ color: theme.isLight ? '#334155' : theme.textMuted }}>
                          {item.desc}
                        </p>
                        <div className="item-card-action">
                          <a 
                            href={`https://wa.me/${belenWhatsapp}?text=${encodeURIComponent(`Hola Belén, en el ejemplo de ${rubroLabel.toLowerCase()} toqué '${item.name}' y quiero una web así`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="item-wa-link"
                            style={{ color: theme.primary }}
                          >
                            <span>Consultar</span>
                            <ArrowRight size={13} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. PHOTO GALLERY (Real works / facilities, WebP, lazy loaded)
            =================================================================== */}
        <section id="galeria" className="business-gallery-section">
          <div className="business-container">
            <div className="business-section-header">
              <span className="business-kicker" style={{ color: theme.primary }}>
                GALERÍA VISUAL
              </span>
              <h2 className="business-section-title" style={{ fontFamily: theme.fontHeading, color: theme.text }}>
                {site.rubro === 'parrilla' ? 'Espacio & Cocina a las Brasas' : 'Trabajos Realizados & Instalaciones'}
              </h2>
              <p className="business-section-subtitle" style={{ color: theme.textMuted }}>
                Fotos de las instalaciones, equipamiento y la atención cotidiana.
              </p>
            </div>

            <div className="business-gallery-grid">
              {site.gallery.map((photo, pIdx) => (
                <div 
                  key={pIdx} 
                  className="gallery-item-card"
                  style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
                >
                  <div className="gallery-image-wrapper">
                    <img 
                      src={photo.url} 
                      alt={photo.caption} 
                      loading="lazy" 
                      className="gallery-img"
                    />
                  </div>
                  <div className="gallery-caption-bar" style={{ backgroundColor: theme.card }}>
                    <span className="gallery-caption-text" style={{ color: theme.isLight ? '#0f172a' : theme.text }}>{photo.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            6. LOCATION, HOURS & GOOGLE MAPS EMBED
            =================================================================== */}
        <section id="ubicacion" className="business-location-section">
          <div className="business-container">
            <div className="business-location-grid">
              {/* Location details card */}
              <div 
                className="location-info-card"
                style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}
              >
                <span className="business-kicker" style={{ color: theme.primary }}>
                  DÓNDE ESTAMOS
                </span>
                <h3 className="location-heading" style={{ fontFamily: theme.fontHeading, color: theme.isLight ? '#0f172a' : theme.text }}>
                  Vení a visitarnos
                </h3>

                <div className="location-data-list">
                  <div className="location-data-row">
                    <MapPin size={20} className="loc-icon" style={{ color: theme.primary }} />
                    <div>
                      <strong style={{ color: theme.isLight ? '#64748b' : theme.textMuted }}>Dirección:</strong>
                      <p style={{ color: theme.isLight ? '#0f172a' : theme.text }}>{address}</p>
                    </div>
                  </div>

                  <div className="location-data-row">
                    <Clock size={20} className="loc-icon" style={{ color: theme.primary }} />
                    <div>
                      <strong style={{ color: theme.isLight ? '#64748b' : theme.textMuted }}>Horarios de atención:</strong>
                      <p style={{ color: theme.isLight ? '#0f172a' : theme.text }}>{hours}</p>
                    </div>
                  </div>

                  <div className="location-data-row">
                    <Phone size={20} className="loc-icon" style={{ color: theme.primary }} />
                    <div>
                      <strong style={{ color: theme.isLight ? '#64748b' : theme.textMuted }}>Teléfono / WhatsApp:</strong>
                      <p style={{ color: theme.isLight ? '#0f172a' : theme.text }}>{phone}</p>
                    </div>
                  </div>
                </div>

                <div className="location-action-row">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${businessDirectWaMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-location-wa"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <MessageCircle size={18} />
                    <span>Escribir por WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Responsive Google Maps Embed */}
              <div 
                className="location-map-frame"
                style={{ borderColor: theme.cardBorder }}
              >
                <iframe 
                  title={`Ubicación en Google Maps de ${businessName}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery || address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '340px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            7. IF ACCESSED AS PROPOSAL: COMMERCIAL CONDITIONS CARD
            =================================================================== */}
        {isCustomProposal && (
          <section className="business-proposal-box-section">
            <div className="business-container">
              <div 
                className="business-proposal-card"
                style={{ backgroundColor: theme.card, borderColor: theme.primary }}
              >
                <div className="proposal-card-badge">
                  <ShieldCheck size={16} style={{ color: theme.primary }} />
                  <span>PLAN RECOMENDADO: {recommendedPlan}</span>
                </div>
                <h3 className="proposal-title" style={{ fontFamily: theme.fontHeading, color: theme.text }}>
                  Presupuesto & Condiciones para {businessName}
                </h3>
                <p className="proposal-summary" style={{ color: theme.textMuted }}>
                  Esta web de demostración refleja cómo se vería tu negocio online. Incluye tu dominio propio, ficha de Google Maps optimizada y WhatsApp Business integrado.
                </p>

                <div className="proposal-benefits-grid">
                  <div className="prop-benefit">
                    <CheckCircle2 size={16} style={{ color: theme.primary }} />
                    <span style={{ color: theme.text }}>50% al iniciar y 50% contra entrega conforme cuando la web esté lista</span>
                  </div>
                  <div className="prop-benefit">
                    <CheckCircle2 size={16} style={{ color: theme.primary }} />
                    <span style={{ color: theme.text }}>Entrega estimada en 4 días hábiles desde que recibo tus datos</span>
                  </div>
                  <div className="prop-benefit">
                    <CheckCircle2 size={16} style={{ color: theme.primary }} />
                    <span style={{ color: theme.text }}>Dominio propio y hosting incluido durante el primer año</span>
                  </div>
                  <div className="prop-benefit">
                    <CheckCircle2 size={16} style={{ color: theme.primary }} />
                    <span style={{ color: theme.text }}>Atención y diseño directo con Belén Irigoy</span>
                  </div>
                </div>

                <div className="proposal-cta-wrap">
                  <a 
                    href={`https://wa.me/${belenWhatsapp}?text=${belenCtaMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-proposal-accept"
                    style={{ backgroundColor: theme.primary }}
                    onClick={() => trackWhatsAppClick('proposal_accept_button', businessName)}
                  >
                    <MessageCircle size={18} />
                    <span>Avanzar con esta propuesta por WhatsApp</span>
                    <ArrowRight size={17} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ===================================================================
          8. BUSINESS FOOTER
          =================================================================== */}
      <footer className="business-footer" style={{ borderTopColor: theme.cardBorder }}>
        <div className="business-container business-footer-content">
          <div className="footer-brand-side">
            <span className="footer-name" style={{ fontFamily: theme.fontHeading, color: theme.text }}>{businessName}</span>
            <span className="footer-desc" style={{ color: theme.textMuted }}>{tagline}</span>
          </div>
          <div className="footer-links-side">
            <span style={{ color: theme.textMuted }}>{address}</span>
            <span style={{ color: theme.textMuted }}>Tel: {phone}</span>
          </div>
        </div>
        <div className="business-sub-footer">
          <div className="business-container">
            <p style={{ color: theme.textMuted }}>© 2026 {businessName} • Diseño web profesional por <a href="/" target="_blank" rel="noopener noreferrer">Primera Cuadra</a></p>
          </div>
        </div>
      </footer>

      {/* ===================================================================
          9. FLOATING WHATSAPP BUTTON (for this business demo)
          =================================================================== */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${businessDirectWaMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="business-floating-wa-btn"
        style={{ backgroundColor: '#25D366' }}
        aria-label={`Escribir a ${businessName} por WhatsApp`}
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

