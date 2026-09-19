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
  Monitor
} from 'lucide-react';

export default function Hero({ niche, onSelectNiche }) {
  const defaultWhatsappNumber = '5491128779641';
  const whatsappHeroMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Quisiera consultar por el servicio de creación de página web para mi negocio. ¿Podrían asesorarme?'
  );

  return (
    <section className="hero-section-wrapper">
      <div className="container hero-container">
        {/* Hostinger Kicker Pill */}
        <div className="hero-kicker-badge">
          <Sparkles size={14} />
          <span>DISEÑO WEB & PRESENCIA DIGITAL PARA CUALQUIER RUBRO</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Elegí la presencia web ideal <br className="hidden-mobile" />
          para <span className="highlight-purple">tu negocio</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Probá Primera Cuadra sin riesgos: 50% al iniciar y 50% contra entrega conforme en 4 días hábiles. Tu página web propia con dominio a tu nombre, Google Maps y WhatsApp Business listos para vender.
        </p>

        {/* CTAs Row */}
        <div className="hero-actions-row" style={{ marginTop: '36px' }}>
          <a href="#packs-precios" className="btn-hostinger-primary">
            <span>Elegí tu Plan ($120k / $150k / $250k)</span>
            <ArrowRight size={18} />
          </a>

          <a href="#demostracion-en-vivo" className="btn-hostinger-outline">
            <Monitor size={17} />
            <span>Ver Demostración en Vivo</span>
          </a>
        </div>

        {/* Trust Indicators Bar */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <div className="trust-icon-box">
              <Globe size={20} />
            </div>
            <div className="trust-copy">
              <strong>Web Propia en 4 Días</strong>
              <span>Dominio a tu nombre (.com o .com.ar)</span>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Zap size={20} />
            </div>
            <div className="trust-copy">
              <strong>Para Cualquier Rubro</strong>
              <span>Comercios, servicios, talleres y empresas</span>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <ShieldCheck size={20} />
            </div>
            <div className="trust-copy">
              <strong>Esquema Seguro 50/50</strong>
              <span>Saldo final recién contra entrega conforme</span>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <MapPin size={20} />
            </div>
            <div className="trust-copy">
              <strong>Google Maps & WhatsApp</strong>
              <span>Optimizados para recibir consultas ya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
