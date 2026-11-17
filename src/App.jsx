import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechnicalProofBadge from './components/TechnicalProofBadge';
import BusinessSituationsSection from './components/BusinessSituationsSection';
import ProcessSteps from './components/ProcessSteps';
import ExampleDesignsSection from './components/ExampleDesignsSection';
import ThePointCaseStudySection from './components/ThePointCaseStudySection';
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
import { trackWhatsAppClick } from './utils/gtm';
import { MessageCircle } from 'lucide-react';

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
        {/* 1. Hero with Urban Storefront, Signage & Integrated Live Simulator */}
        <Hero />

        {/* 2. Technical Proof Badge: Live metrics from Performance API */}
        <TechnicalProofBadge />

        {/* 3. ¿Tu negocio está en alguna de estas situaciones? */}
        <BusinessSituationsSection />

        {/* 4. ¿Cómo trabajamos? 3 simples pasos con ritmo editorial de 8px */}
        <ProcessSteps />

        {/* 5. Diseños de ejemplo (4 webs ficticias navegables en marco de celular) */}
        <ExampleDesignsSection />

        {/* 6. Programa de Primeros Clientes (Lanzamiento 5 cupos) */}
        <EarlyAdoptersSection />

        {/* 7. Precios Transparentes (3 planes consolidados) */}
        <PricingPacks niche={niche} />

        {/* 7. Caso de Estudio Real: The Point (POS & Stock en 5 fases) */}
        <ThePointCaseStudySection />

        {/* 8. Quién está detrás de Primera Cuadra (Belén Irigoy, Tigre) */}
        <WhoIsBehindSection />

        {/* 9. Preguntas frecuentes (7 vitales) */}
        <FAQSection niche={niche} />

        {/* 10. Sección unificada de Contacto (Formulario + WhatsApp directo) */}
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
          onClick={() => trackWhatsAppClick('mobile_sticky_bar', 'Escribime_por_WhatsApp')}
        >
          <MessageCircle size={20} />
          <span>Escribime por WhatsApp</span>
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
