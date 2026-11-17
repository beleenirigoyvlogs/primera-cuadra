import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BusinessSituationsSection from './components/BusinessSituationsSection';
import DigitalPresenceSection from './components/DigitalPresenceSection';
import ProcessSteps from './components/ProcessSteps';
import ExampleDesignsSection from './components/ExampleDesignsSection';
import WhoIsBehindSection from './components/WhoIsBehindSection';
import EarlyAdoptersSection from './components/EarlyAdoptersSection';
import PricingPacks from './components/PricingPacks';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloatingBtn from './components/WhatsAppFloatingBtn';
import AdminLeadsModal from './components/AdminLeadsModal';
import SimulatorPage from './pages/SimulatorPage';
import CustomDevelopmentPage from './pages/CustomDevelopmentPage';
import BusinessDemoSitePage from './pages/BusinessDemoSitePage';
import NotFoundPage from './pages/NotFoundPage';
import { NICHES } from './data/nicheData';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useMouseParallaxDots } from './hooks/useMouseParallaxDots';
import { recordPageView } from './utils/visitorTracker';
import { trackWhatsAppClick, trackSimulatorOpen } from './utils/gtm';
import { Sparkles, Eye, ExternalLink, MessageCircle } from 'lucide-react';

export default function App() {
  useScrollReveal();
  useMouseParallaxDots();
  const [currentNiche, setCurrentNiche] = useState('peluqueria');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const niche = NICHES[currentNiche] || NICHES.peluqueria;

  // Route resolvers
  const getExampleSlug = () => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.startsWith('/ejemplos/')) {
      const parts = path.split('/ejemplos/')[1].split('/')[0];
      return parts || null;
    }
    if (hash.startsWith('#ejemplos/')) {
      const parts = hash.split('#ejemplos/')[1].split('/')[0];
      return parts || null;
    }
    return null;
  };

  const getProposalSlug = () => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.startsWith('/propuesta/')) {
      const parts = path.split('/propuesta/')[1].split('/')[0];
      return parts || null;
    }
    if (hash.startsWith('#propuesta/')) {
      const parts = hash.split('#propuesta/')[1].split('/')[0];
      return parts || null;
    }
    return null;
  };

  const isSimulatorRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/simulador' || path === '/simulador/' || path.startsWith('/simulador') || hash === '#simulador';
  };

  const isCustomDevRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/desarrollo-a-medida' || path === '/desarrollo-a-medida/' || path.startsWith('/desarrollo-a-medida') || hash === '#desarrollo-a-medida';
  };

  const isHomeRoute = () => {
    if (typeof window === 'undefined') return true;
    const path = window.location.pathname.toLowerCase();
    return path === '/' || path === '/index.html' || path === '' || path.startsWith('/#');
  };

  const [exampleSlug, setExampleSlug] = useState(getExampleSlug);
  const [proposalSlug, setProposalSlug] = useState(getProposalSlug);
  const [isSimulatorPage, setIsSimulatorPage] = useState(isSimulatorRoute);
  const [isCustomDevPage, setIsCustomDevPage] = useState(isCustomDevRoute);
  const [isHomePage, setIsHomePage] = useState(isHomeRoute);

  // Track page visit on mount
  useEffect(() => {
    recordPageView();
  }, []);

  // Shortcuts: Ctrl+Shift+A, Alt+A or #admin in URL; handle routing
  useEffect(() => {
    const handleRouteChange = () => {
      setExampleSlug(getExampleSlug());
      setProposalSlug(getProposalSlug());
      setIsSimulatorPage(isSimulatorRoute());
      setIsCustomDevPage(isCustomDevRoute());
      setIsHomePage(isHomeRoute());
    };
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
      handleRouteChange();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleRouteChange);

    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // 1. Dedicated Route: Full Demo Website by Industry (/ejemplos/:slug)
  if (exampleSlug) {
    return <BusinessDemoSitePage slug={exampleSlug} isProposal={false} />;
  }

  // 2. Dedicated Route: Personalized Commercial Proposal (/propuesta/:slug)
  if (proposalSlug) {
    return <BusinessDemoSitePage slug={proposalSlug} isProposal={true} />;
  }

  // 3. Dedicated Route: Full-Page Simulator
  if (isSimulatorPage) {
    return <SimulatorPage />;
  }

  // 4. Dedicated Route: Custom Development (Apps Móviles & Sistemas POS)
  if (isCustomDevPage) {
    return <CustomDevelopmentPage />;
  }

  // 5. Unknown Route: Not Found (404)
  if (!isHomePage) {
    return <NotFoundPage />;
  }

  const defaultWhatsappNumber = '5491128779641';
  const stickyMobileMsg = encodeURIComponent(
    '¡Hola Belén! Quiero consultar para mejorar la presencia digital de mi negocio en Primera Cuadra.'
  );

  return (
    <div className="app-root">
      {/* Top Navigation */}
      <Navbar />

      <main>
        {/* 1. Hero with Action-Oriented Headline, CTAs & 3-in-1 Mockup */}
        <Hero />

        {/* 2. ¿Tu negocio está en alguna de estas situaciones? */}
        <BusinessSituationsSection />

        {/* 3. Servicios Profesionales (3): Web Propia, Google Maps y WhatsApp */}
        <DigitalPresenceSection />

        {/* 4. ¿Cómo trabajamos? 3 simples pasos */}
        <ProcessSteps />

        {/* 5. Diseños de ejemplo (4 demos ficticias) */}
        <ExampleDesignsSection />

        {/* 6. Simulador interactivo en vivo (única sección de llamado) */}
        <section className="simulator-callout-section" id="demostracion-en-vivo">
          <div className="container">
            <div className="simulator-callout-card reveal">
              <div className="callout-content-left">
                <div className="callout-kicker-tag">
                  <Sparkles size={14} />
                  <span>SIMULADOR INTERACTIVO EN VIVO</span>
                </div>
                <h2 className="callout-heading">
                  ¿Querés ver cómo podría <span className="highlight-purple">quedar tu negocio</span>?
                </h2>
                <p className="callout-description">
                  Probá el simulador interactivo para previsualizar tu página web, ficha de Google Maps y WhatsApp Business con el nombre y rubro de tu empresa.
                </p>
              </div>
              <div className="callout-action-right">
                <a 
                  href="/simulador" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-hostinger-primary btn-launch-simulator"
                  onClick={() => trackSimulatorOpen('home_callout_button')}
                >
                  <Eye size={17} />
                  <span>ABRIR SIMULADOR EN VIVO</span>
                  <ExternalLink size={16} />
                </a>
                <span className="callout-footnote">Se abre en una pestaña aparte, fuera de la web</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Quién está detrás de Primera Cuadra (Belén Irigoy, Tigre) */}
        <WhoIsBehindSection />

        {/* 8. Programa de Primeros Clientes: 5 lugares con precio de lanzamiento */}
        <EarlyAdoptersSection />

        {/* 9. Precios: 3 Planes Transparentes */}
        <PricingPacks niche={niche} />

        {/* 10. Preguntas frecuentes */}
        <FAQSection niche={niche} />

        {/* 11. Sección unificada de Contacto (El siguiente paso + dudas + formulario + WhatsApp) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        niche={niche} 
        onSelectNiche={setCurrentNiche} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Persistent Floating WhatsApp Action Button (desktop) */}
      <WhatsAppFloatingBtn niche={niche} />

      {/* Mobile Sticky WhatsApp Action Bar (Clean and prominent on mobile screens) */}
      <div className="mobile-sticky-wa-bar">
        <a 
          href={`https://wa.me/${defaultWhatsappNumber}?text=${stickyMobileMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-mobile-sticky-wa"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar', 'Escribinos_por_WhatsApp')}
        >
          <MessageCircle size={20} />
          <span>Escribinos por WhatsApp</span>
        </a>
      </div>

      {/* Hidden Admin Leads Panel Modal */}
      <AdminLeadsModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
