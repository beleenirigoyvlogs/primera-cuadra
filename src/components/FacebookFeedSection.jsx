import React, { useState } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ThumbsUp, 
  MessageCircle, 
  ShieldCheck,
  Radio
} from 'lucide-react';

function FacebookIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function FacebookFeedSection() {
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61594410424409';
  const encodedFbUrl = encodeURIComponent(facebookUrl);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Official Meta Facebook Page Plugin iframe URL
  const fbPluginIframeSrc = `https://www.facebook.com/plugins/page.php?href=${encodedFbUrl}&tabs=timeline&width=460&height=580&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;

  return (
    <section className="facebook-feed-section" id="comunidad-facebook">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-kicker-tag" style={{ background: '#eff6ff', color: '#1877f2', borderColor: '#bfdbfe' }}>
            <FacebookIcon size={14} />
            <span>NOVEDADES & TRABAJOS EN VIVO</span>
          </div>
          <h2 className="section-title">
            Seguinos en Facebook para ver nuestros <span className="highlight-purple">últimos trabajos</span>
          </h2>
          <p className="section-subtitle">
            Mirá las últimas páginas web entregadas, casos de éxito de comercios locales y consejos de posicionamiento en tiempo real directamente desde nuestra página oficial.
          </p>
        </div>

        {/* 2-Column Social Showcase Layout */}
        <div className="facebook-showcase-container">
          {/* Left Column: Brand Social Identity & Trust */}
          <div className="facebook-brand-card">
            <div className="fb-profile-header">
              <div className="fb-avatar-box">
                <img src="/logo.jpg" alt="Primera Cuadra" className="fb-avatar-img" />
                <div className="fb-badge-icon">
                  <FacebookIcon size={13} color="#ffffff" />
                </div>
              </div>
              <div className="fb-profile-text">
                <div className="fb-profile-title-row">
                  <h3>Primera Cuadra</h3>
                  <span className="fb-verified-badge" title="Página Oficial">✓</span>
                </div>
                <p className="fb-handle">@primeracuadra.web</p>
                <div className="fb-live-indicator">
                  <span className="live-pulsing-dot"></span>
                  <span>Publicaciones en vivo</span>
                </div>
              </div>
            </div>

            <p className="fb-brand-intro">
              En nuestra comunidad de Facebook compartimos el detrás de escena de cada web entregada en 4 días, tips para sumar reseñas en Google Maps y lanzamientos exclusivos para negocios locales.
            </p>

            <ul className="fb-benefits-list">
              <li>
                <div className="fb-benefit-icon-box">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <strong>Fotos reales de webs entregadas</strong>
                  <p>Mirá los diseños terminados para náuticas, barberías, talleres y clínicas.</p>
                </div>
              </li>
              <li>
                <div className="fb-benefit-icon-box">
                  <ThumbsUp size={16} />
                </div>
                <div>
                  <strong>Casos de éxito y testimonios</strong>
                  <p>Comercios que ya reciben consultas diarias de Google y WhatsApp.</p>
                </div>
              </li>
              <li>
                <div className="fb-benefit-icon-box">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Atención y mensajes directos</strong>
                  <p>Podés consultarnos tus dudas también por Messenger o dejar tu reseña.</p>
                </div>
              </li>
            </ul>

            <div className="fb-actions-group">
              <a 
                href={facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-facebook-official"
              >
                <FacebookIcon size={18} />
                <span>Ir a Nuestra Página de Facebook</span>
                <ExternalLink size={16} />
              </a>

              <p className="fb-note-text">
                * Las publicaciones se sincronizan automáticamente con Meta en tiempo real.
              </p>
            </div>
          </div>

          {/* Right Column: Live Embedded Facebook Feed */}
          <div className="facebook-widget-frame">
            <div className="widget-topbar">
              <div className="widget-topbar-left">
                <span className="window-dot red"></span>
                <span className="window-dot yellow"></span>
                <span className="window-dot green"></span>
                <span className="widget-topbar-title">Muro Oficial • Facebook Feed</span>
              </div>
              <div className="widget-topbar-status">
                <Radio size={13} className="text-emerald animate-pulse" />
                <span>En vivo</span>
              </div>
            </div>

            <div className="widget-iframe-container">
              <iframe
                title="Feed de Facebook Primera Cuadra"
                src={fbPluginIframeSrc}
                width="100%"
                height="560"
                style={{ border: 'none', overflow: 'hidden', borderRadius: '0 0 16px 16px' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
