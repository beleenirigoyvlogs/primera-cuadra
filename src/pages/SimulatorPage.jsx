import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, MessageSquare, ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import TripodMockup from '../components/TripodMockup';

export default function SimulatorPage() {
  const whatsappNumber = '5491128779641';
  const whatsappMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Estuve probando el simulador de presencia digital en su página y me gustaría consultar por el desarrollo de mi web y Google Maps. ¿Podemos coordinar?'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Simulador Interactivo en Vivo | Primera Cuadra';
  }, []);

  return (
    <div className="simulator-standalone-page">
      {/* Standalone Navigation Bar */}
      <header className="sim-standalone-navbar">
        <div className="container sim-navbar-inner">
          <div className="sim-navbar-brand-group">
            <a href="/" className="sim-btn-back-home" title="Volver a la página principal">
              <ArrowLeft size={16} />
              <span>Volver a la web</span>
            </a>
            <div className="sim-brand-separator" aria-hidden="true"></div>
            <a href="/" className="sim-brand-logo-link">
              <picture className="brand-logo-picture">
                <source srcSet="/logo.webp" type="image/webp" />
                <img 
                  src="/logo.jpg" 
                  alt="Logo Primera Cuadra" 
                  className="brand-logo-img" 
                  loading="eager"
                  width="38"
                  height="38"
                />
              </picture>
              <div className="sim-brand-text">
                <span className="brand-name">PRIMERA CUADRA</span>
                <span className="sim-tool-tag">
                  <Sparkles size={11} />
                  <span>SIMULADOR EN VIVO</span>
                </span>
              </div>
            </a>
          </div>

          <div className="sim-navbar-actions">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sim-navbar-wa"
            >
              <MessageSquare size={15} />
              <span>Consultar por WhatsApp</span>
            </a>
            <a href="/#precios" className="btn-sim-navbar-cta">
              <span>Ver Planes</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Intro Header for the Standalone Tool */}
      <section className="sim-standalone-hero">
        <div className="container">
          <div className="sim-hero-center">
            <div className="sim-kicker-badge">
              <Sparkles size={14} />
              <span>HERRAMIENTA INTERACTIVA INDEPENDIENTE</span>
            </div>
            <h1 className="sim-hero-title">
              Simulador de <span className="highlight-purple">Presencia Digital</span>
            </h1>
            <p className="sim-hero-subtitle">
              Escribí el nombre y rubro de tu negocio a continuación. Podés previsualizar en tiempo real tu <strong>Página Web mobile-first</strong>, tu <strong>Ficha de Google Maps</strong> y tu <strong>WhatsApp Business</strong> antes de contratar.
            </p>

            <div className="sim-hero-trust-bar">
              <div className="sim-trust-item">
                <Clock size={15} className="text-purple-icon" />
                <span>Entrega en 4 días hábiles</span>
              </div>
              <div className="sim-trust-item">
                <ShieldCheck size={15} className="text-purple-icon" />
                <span>50% inicio / 50% entrega conforme</span>
              </div>
              <div className="sim-trust-item">
                <CheckCircle2 size={15} className="text-purple-icon" />
                <span>Dominio propio (.com / .com.ar) incluido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Tripod Simulation Core */}
      <main className="sim-standalone-main">
        <TripodMockup />
      </main>

      {/* Bottom Conversion Banner */}
      <section className="sim-standalone-bottom-cta">
        <div className="container">
          <div className="sim-bottom-cta-card">
            <div className="sim-bottom-cta-info">
              <span className="sim-bottom-badge">¿TE GUSTÓ LO QUE VISTE?</span>
              <h2 className="sim-bottom-title">Hacé realidad la presencia digital de tu negocio</h2>
              <p className="sim-bottom-desc">
                Desarrollamos tu web profesional, configuramos tu Google Maps Top 3 y tu catálogo de WhatsApp oficial llave en mano. Sin alquileres mensuales abusivos: la web y el dominio son 100% de tu propiedad.
              </p>
            </div>
            <div className="sim-bottom-cta-actions">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hostinger-primary btn-sim-bottom-main"
              >
                <MessageSquare size={18} />
                <span>Quiero mi presencia digital</span>
                <ArrowRight size={18} />
              </a>
              <a href="/" className="btn-sim-bottom-back">
                <ArrowLeft size={16} />
                <span>Volver al sitio principal</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Standalone Footer */}
      <footer className="sim-standalone-footer">
        <div className="container sim-footer-inner">
          <p>© {new Date().getFullYear()} Primera Cuadra. Presencia digital profesional para comercios y desarrollo de apps.</p>
          <div className="sim-footer-links">
            <a href="/">Inicio</a>
            <a href="/#servicios">Servicios</a>
            <a href="/#apps-moviles">Apps Móviles</a>
            <a href="/#precios">Precios</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
