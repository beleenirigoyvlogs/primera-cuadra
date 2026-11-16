import React from 'react';
import { 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  MapPin,
  Globe,
  Phone,
  Lock
} from 'lucide-react';

function FacebookIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color} 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function Footer({ niche, onSelectNiche, onOpenAdmin }) {
  const whatsappNumber = '5491128779641';
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61594410424409';
  const currentYear = new Date().getFullYear();

  const defaultWhatsappMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Quisiera ponerme en contacto para conocer más sobre sus servicios y armar mi presencia digital.'
  );

  return (
    <footer className="footer-section-wrapper" id="footer-primera-cuadra">
      {/* Background Decorative Accents */}
      <div className="footer-glow-top" aria-hidden="true"></div>
      <div className="footer-dots-pattern" aria-hidden="true"></div>

      <div className="container footer-container">
        {/* ==================================================================
            BLOQUE DESTACADO (Franja superior de cierre comercial)
            ================================================================== */}
        <div className="footer-highlight-card">
          <div className="footer-highlight-inner">
            <div className="footer-highlight-text">
              <div className="footer-highlight-kicker">
                <Sparkles size={15} />
                <span>TU PRESENCIA EN LA PRIMERA CUADRA</span>
              </div>
              <h3 className="footer-highlight-title">
                ¿Listo para llevar tu negocio a Internet?
              </h3>
              <p className="footer-highlight-subtitle">
                Tu Primera Cuadra digital empieza acá.
              </p>
            </div>

            <div className="footer-highlight-actions">
              <a 
                href="#contacto" 
                className="btn-hostinger-primary footer-highlight-btn"
              >
                <span>QUIERO MEJORAR MI NEGOCIO</span>
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* ==================================================================
            ESTRUCTURA PRINCIPAL (4 COLUMNAS)
            ================================================================== */}
        <div className="footer-main-grid">
          {/* COLUMNA 1: MARCA */}
          <div className="footer-col footer-col-brand">
            <a href="#" className="footer-brand-header" aria-label="Ir al inicio de Primera Cuadra">
              <picture className="footer-brand-logo-picture">
                <source srcSet="/logo.webp" type="image/webp" />
                <img 
                  src="/logo.jpg" 
                  alt="Logo Primera Cuadra" 
                  className="footer-brand-logo-img" 
                  width="48"
                  height="48"
                  loading="lazy"
                />
              </picture>
              <div className="footer-brand-title-wrap">
                <span className="footer-brand-name">Primera <span>Cuadra</span></span>
                <span className="footer-brand-subtitle">Páginas Web & Presencia</span>
              </div>
            </a>

            <p className="footer-brand-tagline">
              Presencia digital para negocios.
            </p>

            <p className="footer-brand-desc">
              Creemos páginas web y conectamos Google y WhatsApp para que tu negocio tenga una presencia digital profesional.
            </p>

            <div className="footer-brand-cta-wrap">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${defaultWhatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-footer-wa-action"
              >
                <MessageCircle size={16} />
                <span>HABLAR POR WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: SERVICIOS */}
          <div className="footer-col">
            <h4 className="footer-col-title">Servicios</h4>
            <ul className="footer-col-links">
              <li>
                <a href="#servicios" className="footer-link">
                  <span>Páginas Web</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="footer-link">
                  <span>Ficha de Google Maps</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="footer-link">
                  <span>WhatsApp Business con Catálogo</span>
                </a>
              </li>
              <li>
                <a href="#precios" className="footer-link">
                  <span>Packs & Precios de Lanzamiento</span>
                </a>
              </li>
              <li>
                <a href="/desarrollo-a-medida" className="footer-link">
                  <span>Desarrollo a medida (Apps & POS)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: INFORMACIÓN */}
          <div className="footer-col">
            <h4 className="footer-col-title">Primera Cuadra</h4>
            <ul className="footer-col-links">
              <li>
                <a href="#quien-esta-detras" className="footer-link">
                  <span>Quién está detrás</span>
                </a>
              </li>
              <li>
                <a href="#disenos-ejemplo" className="footer-link">
                  <span>Diseños de ejemplo</span>
                </a>
              </li>
              <li>
                <a href="#primeros-clientes" className="footer-link">
                  <span>Programa primeros clientes</span>
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="footer-link">
                  <span>Cómo funciona</span>
                </a>
              </li>
              <li>
                <a href="#preguntas" className="footer-link">
                  <span>Preguntas frecuentes</span>
                </a>
              </li>
              <li>
                <a href="/simulador" className="footer-link">
                  <span>Simulador interactivo</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Contacto & Ubicación</h4>
            <p className="footer-contact-desc">
              Atención directa y personalizada con Belén Irigoy para que tu negocio tenga su presencia digital.
            </p>

            <div className="footer-contact-channels">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${defaultWhatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
                data-gtm="whatsapp_footer"
              >
                <div className="footer-channel-icon wa">
                  <MessageCircle size={16} />
                </div>
                <div className="footer-channel-text">
                  <span className="channel-label">WhatsApp</span>
                  <strong className="channel-val">11 2877-9641</strong>
                </div>
              </a>

              <a 
                href="mailto:Primeracuadraweb@gmail.com" 
                className="footer-contact-item"
              >
                <div className="footer-channel-icon">
                  <Globe size={16} />
                </div>
                <div className="footer-channel-text">
                  <span className="channel-label">Email</span>
                  <strong className="channel-val">Primeracuadraweb@gmail.com</strong>
                </div>
              </a>

              <div className="footer-contact-item">
                <div className="footer-channel-icon">
                  <MapPin size={16} />
                </div>
                <div className="footer-channel-text">
                  <span className="channel-label">Zona de trabajo</span>
                  <strong className="channel-val">Tigre y Zona Norte (Atención remota a todo el país)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            FRASE DE MARCA (Cierre elegante antes del copyright)
            ================================================================== */}
        <div className="footer-brand-phrase-divider">
          <p className="footer-brand-phrase">
            Tu Primera Cuadra digital empieza acá.
          </p>
        </div>

        {/* ==================================================================
            COPYRIGHT & CONFIANZA
            ================================================================== */}
        <div className="footer-bottom-bar">
          <p className="footer-copy-text">
            © {currentYear} Primera Cuadra. Todos los derechos reservados.
          </p>
          <div className="footer-bottom-trust">
            <CheckCircle2 size={15} className="text-emerald" />
            <span>Páginas web profesionales para negocios locales</span>
            <button 
              type="button" 
              onClick={onOpenAdmin} 
              className="footer-admin-discreet-btn"
              title="Acceso restringido para el equipo de Primera Cuadra"
              aria-label="Panel de gestión de consultas"
            >
              <Lock size={11} />
              <span>Gestión</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

