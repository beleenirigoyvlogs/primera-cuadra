import React, { useState, useEffect } from 'react';
import NavbarV3 from './components/v3/NavbarV3';
import HeroV3 from './components/v3/HeroV3';
import StaggeredStripV3 from './components/v3/StaggeredStripV3';
import GuaranteesBannerV3 from './components/v3/GuaranteesBannerV3';
import ServicesV3 from './components/v3/ServicesV3';
import PortfolioV3 from './components/v3/PortfolioV3';
import StepsV3 from './components/v3/StepsV3';
import ThePointV3 from './components/v3/ThePointV3';
import EarlyAdoptersV3 from './components/v3/EarlyAdoptersV3';
import PricingV3 from './components/v3/PricingV3';
import AboutMeV3 from './components/v3/AboutMeV3';
import FAQV3 from './components/v3/FAQV3';
import FooterV3 from './components/v3/FooterV3';

import SimulatorPage from './pages/SimulatorPage';
import CustomDevelopmentPage from './pages/CustomDevelopmentPage';
import BusinessDemoSitePage from './pages/BusinessDemoSitePage';
import NotFoundPage from './pages/NotFoundPage';
import LocalLandingPage from './pages/LocalLandingPage';
import AdminLeadsModal from './components/AdminLeadsModal';

import { useScrollReveal } from './hooks/useScrollReveal';
import { recordPageView } from './utils/visitorTracker';

export default function App({ initialPath = null }) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Route resolvers
  const getPath = () => {
    if (initialPath) return initialPath;
    if (typeof window === 'undefined') return '/';
    return window.location.pathname.toLowerCase();
  };

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

  const [currentPath, setCurrentPath] = useState(getPath);
  const [exampleSlug, setExampleSlug] = useState(getExampleSlug);
  const [proposalSlug, setProposalSlug] = useState(getProposalSlug);

  useScrollReveal(currentPath);

  useEffect(() => {
    recordPageView();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
      setExampleSlug(getExampleSlug());
      setProposalSlug(getProposalSlug());
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
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

  // 3. Dedicated Route: Local SEO Landing Pages
  if (currentPath === '/diseno-web-tigre' || currentPath === '/diseno-web-tigre/') {
    return <LocalLandingPage zoneKey="tigre" />;
  }
  if (currentPath === '/diseno-web-zona-norte' || currentPath === '/diseno-web-zona-norte/') {
    return <LocalLandingPage zoneKey="zona-norte" />;
  }
  if (currentPath === '/diseno-web-caba' || currentPath === '/diseno-web-caba/') {
    return <LocalLandingPage zoneKey="caba" />;
  }

  // 4. Dedicated Route: Full-Page Simulator
  if (currentPath.startsWith('/simulador')) {
    return <SimulatorPage />;
  }

  // 5. Dedicated Route: Custom Development (Apps Móviles & Sistemas POS)
  if (currentPath.startsWith('/desarrollo-a-medida')) {
    return <CustomDevelopmentPage />;
  }

  // 6. Unknown Route: Not Found (404)
  const isHome = currentPath === '/' || currentPath === '/index.html' || currentPath === '' || currentPath.startsWith('/#');
  if (!isHome) {
    return <NotFoundPage />;
  }

  return (
    <div 
      className="primera-cuadra-v3-root" 
      style={{ 
        width: '100%', 
        minHeight: '100vh', 
        fontFamily: "'Poppins', system-ui, sans-serif",
        background: 'var(--pc-light)',
        color: 'var(--pc-ink)',
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <NavbarV3 />
      <main>
        <HeroV3 />
        <StaggeredStripV3 />
        <GuaranteesBannerV3 />
        <ServicesV3 />
        <PortfolioV3 />
        <StepsV3 />
        <ThePointV3 />
        <EarlyAdoptersV3 />
        <PricingV3 />
        <AboutMeV3 />
        <FAQV3 />
      </main>
      <FooterV3 />

      {/* Hidden Admin Modal accessible via Ctrl+Shift+A or #admin */}
      <AdminLeadsModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
