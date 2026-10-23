import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisualJourneyFlow from './components/VisualJourneyFlow';
import DigitalPresenceSection from './components/DigitalPresenceSection';
import BusinessSituationsSection from './components/BusinessSituationsSection';
import SimulatorPage from './pages/SimulatorPage';
import ProcessSteps from './components/ProcessSteps';
import MobileAppsSection from './components/MobileAppsSection';
import PricingPacks from './components/PricingPacks';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';
import WhatsAppFloatingBtn from './components/WhatsAppFloatingBtn';
import AdminLeadsModal from './components/AdminLeadsModal';
import { NICHES } from './data/nicheData';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useMouseParallaxDots } from './hooks/useMouseParallaxDots';
import { recordPageView } from './utils/visitorTracker';
import { Sparkles, Eye, ExternalLink } from 'lucide-react';

export default function App() {
  useScrollReveal();
  useMouseParallaxDots();
  const [currentNiche, setCurrentNiche] = useState('peluqueria');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const niche = NICHES[currentNiche] || NICHES.peluqueria;

  const isSimulatorRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/simulador' || path === '/simulador/' || path.startsWith('/simulador') || hash === '#simulador';
  };

  const [isSimulatorPage, setIsSimulatorPage] = useState(isSimulatorRoute);

  // Track page visit on mount
  useEffect(() => {
    recordPageView();
  }, []);

  // Shortcuts: Ctrl+Shift+A, Alt+A or #admin in URL; handle /simulador routing
  useEffect(() => {
    const handleRouteChange = () => {
      setIsSimulatorPage(isSimulatorRoute());
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

  // If visiting the standalone simulator route, render the separate full-page simulator
  if (isSimulatorPage) {
    return <SimulatorPage />;
  }

  return (
    <div className="app-root">
      {/* 1. Top Navigation with reduced 6 items */}
      <Navbar />

      <main>
        {/* 2. Hero with Action-Oriented Headline, CTAs, Trust Badges & 3-in-1 Mockup */}
        <Hero />

        {/* 2. Servicios Profesionales: Qué hacemos y qué ofrecemos */}
        <DigitalPresenceSection />

        {/* 3. Customer Journey: Así te encuentra un nuevo cliente (Te busca -> Te conoce -> Te contacta) */}
        <VisualJourneyFlow />

        {/* 5. Business Situations: ¿Tu negocio está en alguna de estas situaciones? */}
        <BusinessSituationsSection />

        {/* 6. Live Interactive Simulator Callout - Compact Card */}
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
                  Probá nuestro simulador interactivo para previsualizar tu página web, ficha de Google Maps y WhatsApp Business con el nombre y rubro de tu empresa.
                </p>
              </div>
              <div className="callout-action-right">
                <a 
                  href="/simulador" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-hostinger-primary btn-launch-simulator"
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

        {/* 7. Process Methodology: ¿Cómo trabajamos? 3 simples pasos */}
        <ProcessSteps />

        {/* 9. Mobile App Development Section: Tu negocio también puede tener su propia app */}
        <MobileAppsSection />

        {/* 10. Pricing Section: Packs & Precios transparentes */}
        <PricingPacks niche={niche} />

        {/* 11. Frequently Asked Questions */}
        <FAQSection niche={niche} />

        {/* 12. Contact Form: ¿Querés mejorar la presencia digital de tu negocio? */}
        <ContactSection />

        {/* 13. Final High-Impact CTA */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer 
        niche={niche} 
        onSelectNiche={setCurrentNiche} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Persistent Floating WhatsApp Action Button */}
      <WhatsAppFloatingBtn niche={niche} />

      {/* Hidden Admin Leads Panel Modal */}
      <AdminLeadsModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
