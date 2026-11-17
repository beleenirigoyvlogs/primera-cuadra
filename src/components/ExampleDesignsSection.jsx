import React from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Eye, 
  Utensils, 
  Scissors, 
  Wrench, 
  Stethoscope,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { DEMO_SITES } from '../data/demoSitesData';

const RUBRO_ICONS = {
  parrilla: Utensils,
  barberia: Scissors,
  taller: Wrench,
  dental: Stethoscope
};

export default function ExampleDesignsSection() {
  const demos = [
    DEMO_SITES.parrilla,
    DEMO_SITES.barberia,
    DEMO_SITES.taller,
    DEMO_SITES.dental
  ];

  return (
    <section className="example-designs-section-wrapper" id="disenos-ejemplo">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <Sparkles size={14} className="text-purple-icon" />
            <span>DISEÑOS DE EJEMPLO</span>
          </div>

          <h2 className="section-title">
            Así se va a <span className="highlight-purple">ver tu negocio</span>
          </h2>

          <p className="section-subtitle">
            Webs completas que diseñé para que pruebes la navegación, velocidad y presentación antes de decidirte.
          </p>

          <div className="honest-samples-pill">
            <Eye size={15} />
            <span>Ejemplos ficticios navegables · Se abren en pestaña nueva</span>
          </div>
        </div>

        {/* 4 Demos Grid */}
        <div className="example-demos-grid reveal-group">
          {demos.map((demo) => {
            const IconComp = RUBRO_ICONS[demo.slug] || Utensils;
            const primaryService = demo.menuCategories?.[0]?.items?.[0];
            const secondaryService = demo.menuCategories?.[0]?.items?.[1];

            return (
              <div key={demo.slug} className="demo-showcase-card reveal">
                {/* Card Top Bar: Icon on Left, Pill Badge on Right */}
                <div className="demo-card-top-bar">
                  <div 
                    className="demo-rubro-icon-circle" 
                    style={{ backgroundColor: `${demo.theme.primary}18`, color: demo.theme.primary }}
                  >
                    <IconComp size={20} />
                  </div>
                  <span className="demo-corner-badge">Ejemplo ficticio</span>
                </div>

                {/* Card Headings: full width below top bar, zero chance of overlap */}
                <div className="demo-card-headings">
                  <span className="demo-rubro-tag">{demo.rubroLabel}</span>
                  <h3 className="demo-business-title">{demo.businessName}</h3>
                </div>

                <p className="demo-tagline-text">{demo.tagline}</p>

                {/* Phone Frame Mockup */}
                <a 
                  href={`/ejemplos/${demo.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="phone-mockup-link-wrapper"
                  aria-label={`Ver web de ejemplo de ${demo.businessName}`}
                >
                  <div className="phone-mockup-frame">
                    {/* Speaker / Notch Pill */}
                    <div className="phone-mockup-notch">
                      <span className="phone-notch-speaker"></span>
                      <span className="phone-notch-camera"></span>
                    </div>

                    {/* Phone Screen Mockup */}
                    <div 
                      className="phone-screen-viewport"
                      style={{
                        backgroundColor: demo.theme.bg,
                        color: demo.theme.text,
                        borderColor: demo.theme.cardBorder
                      }}
                    >
                      {/* Mini Site Header */}
                      <div className="phone-mini-site-header">
                        <span 
                          className="phone-mini-brand-name"
                          style={{ fontFamily: demo.theme.fontHeading }}
                        >
                          {demo.businessName}
                        </span>
                        <span 
                          className="phone-mini-brand-pill"
                          style={{ backgroundColor: `${demo.theme.primary}25`, color: demo.theme.primary }}
                        >
                          Abierto
                        </span>
                      </div>

                      {/* Mini Hero Cover */}
                      <div className="phone-mini-hero-image-wrap">
                        <img 
                          src={demo.heroImage} 
                          alt={demo.businessName}
                          className="phone-mini-hero-img"
                          loading="lazy"
                        />
                        <div 
                          className="phone-mini-hero-overlay"
                          style={{
                            background: `linear-gradient(to top, ${demo.theme.bg} 100%, transparent 0%)`
                          }}
                        >
                          <span 
                            className="phone-mini-badge"
                            style={{ 
                              backgroundColor: `${demo.theme.primary}20`,
                              color: demo.theme.primary,
                              borderColor: `${demo.theme.primary}50`
                            }}
                          >
                            {demo.rubroLabel}
                          </span>
                          <p className="phone-mini-hero-desc">{demo.tagline}</p>
                        </div>
                      </div>

                      {/* Mini Services Teaser */}
                      <div className="phone-mini-services-box">
                        <span className="phone-mini-services-title">Servicios & Precios:</span>
                        {primaryService && (
                          <div className="phone-mini-service-row">
                            <span className="phone-mini-s-name">{primaryService.name}</span>
                            <span 
                              className="phone-mini-s-price"
                              style={{ color: demo.theme.primary }}
                            >
                              {primaryService.price}
                            </span>
                          </div>
                        )}
                        {secondaryService && (
                          <div className="phone-mini-service-row">
                            <span className="phone-mini-s-name">{secondaryService.name}</span>
                            <span 
                              className="phone-mini-s-price"
                              style={{ color: demo.theme.primary }}
                            >
                              {secondaryService.price}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Mini WhatsApp Action Bar */}
                      <div className="phone-mini-wa-bar">
                        <div className="phone-mini-wa-button">
                          <MessageCircle size={12} />
                          <span>Pedir turno / Consultar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Card CTA: Direct Link to Standalone Website */}
                <div className="demo-card-actions">
                  <a 
                    href={`/ejemplos/${demo.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hostinger-primary btn-view-full-demo"
                  >
                    <span>Ver web de ejemplo</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
