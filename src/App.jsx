import React, { useState, useEffect } from 'react';
import NavbarV3 from './components/v3/NavbarV3';
import HeroV3 from './components/v3/HeroV3';
import StaggeredStripV3 from './components/v3/StaggeredStripV3';
import GuaranteesBannerV3 from './components/v3/GuaranteesBannerV3';
import ServicesV3 from './components/v3/ServicesV3';
import PortfolioV3 from './components/v3/PortfolioV3';
import StepsV3 from './components/v3/StepsV3';
import FreeAuditV3 from './components/v3/FreeAuditV3';
import ThePointV3 from './components/v3/ThePointV3';
import EarlyAdoptersV3 from './components/v3/EarlyAdoptersV3';
import PricingV3 from './components/v3/PricingV3';
import AboutMeV3 from './components/v3/AboutMeV3';
import FAQV3 from './components/v3/FAQV3';
import FooterV3 from './components/v3/FooterV3';

import SimulatorPage from './pages/SimulatorPage';
import ShowroomPage from './pages/ShowroomPage';
import CustomDevelopmentPage from './pages/CustomDevelopmentPage';
import BusinessDemoSitePage from './pages/BusinessDemoSitePage';
import NotFoundPage from './pages/NotFoundPage';
import LocalLandingPage from './pages/LocalLandingPage';
import NicheLandingPage from './pages/NicheLandingPage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPage from './pages/PrivacyPage';
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

  // Scroll to hash target on route change or initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'admin') {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [currentPath]);

  // Ensure FAQPage JSON-LD is only active on the home page ('/')
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const faqScript = document.getElementById('schema-faq');
    if (faqScript) {
      if (currentPath !== '/') {
        faqScript.setAttribute('type', 'application/json-disabled');
      } else {
        faqScript.setAttribute('type', 'application/ld+json');
      }
    }
  }, [currentPath]);

  useEffect(() => {
    const updateRoute = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
      setExampleSlug(getExampleSlug());
      setProposalSlug(getProposalSlug());
    };

    const handleRouteChange = () => {
      if (
        typeof document !== 'undefined' &&
        document.startViewTransition &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        document.startViewTransition(() => {
          updateRoute();
        });
      } else {
        updateRoute();
      }
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

    // Handle routing and anchor scrolling
    const handleLinkClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (
        href.startsWith('http') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        href.startsWith('//') || 
        anchor.hasAttribute('download') || 
        anchor.getAttribute('target') === '_blank'
      ) return;

      // Check if it's a hash anchor link (e.g. /#servicios, #servicios, /blog#algo)
      if (href.includes('#')) {
        const [targetPath, hashId] = href.split('#');
        const cleanTargetPath = (targetPath || '/').toLowerCase();
        const currentPathname = (window.location.pathname || '/').toLowerCase();

        // If we are already on the target path (e.g. '/' or '')
        if (cleanTargetPath === currentPathname || (cleanTargetPath === '/' && (currentPathname === '' || currentPathname === '/'))) {
          e.preventDefault();
          if (hashId) {
            const targetEl = document.getElementById(hashId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
              window.history.pushState({}, '', href);
              return;
            }
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // If navigating from another page (e.g. /simulador -> /#servicios)
        e.preventDefault();
        window.history.pushState({}, '', href);
        updateRoute();
        setTimeout(() => {
          if (hashId) {
            const targetEl = document.getElementById(hashId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
              return;
            }
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 120);
        return;
      }

      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      if (href.startsWith('/')) {
        e.preventDefault();
        if (
          typeof document !== 'undefined' &&
          document.startViewTransition &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          document.startViewTransition(() => {
            window.history.pushState({}, '', href);
            updateRoute();
            window.scrollTo({ top: 0, behavior: 'instant' });
          });
        } else {
          window.history.pushState({}, '', href);
          updateRoute();
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleRouteChange);

    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    return () => {
      document.removeEventListener('click', handleLinkClick);
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

  // 4. Dedicated Route: Pages by Niche / Rubro
  if (currentPath === '/pagina-web-para-peluquerias' || currentPath === '/pagina-web-para-peluquerias/') {
    return <NicheLandingPage rubroKey="peluquerias" />;
  }
  if (currentPath === '/pagina-web-para-talleres-mecanicos' || currentPath === '/pagina-web-para-talleres-mecanicos/') {
    return <NicheLandingPage rubroKey="talleres-mecanicos" />;
  }
  if (currentPath === '/pagina-web-para-restaurantes' || currentPath === '/pagina-web-para-restaurantes/') {
    return <NicheLandingPage rubroKey="restaurantes" />;
  }
  if (currentPath === '/pagina-web-para-consultorios' || currentPath === '/pagina-web-para-consultorios/') {
    return <NicheLandingPage rubroKey="consultorios" />;
  }

  // 5. Dedicated Route: Blog
  if (currentPath === '/blog' || currentPath === '/blog/') {
    return <BlogIndexPage />;
  }
  if (currentPath.startsWith('/blog/')) {
    const postSlug = currentPath.replace('/blog/', '').replace(/\/$/, '');
    return <BlogPostPage slug={postSlug} />;
  }

  // 6. Dedicated Route: Privacy Policy
  if (currentPath === '/privacidad' || currentPath === '/privacidad/') {
    return <PrivacyPage />;
  }

  // 7. Dedicated Route: Full-Page Simulator
  if (currentPath.startsWith('/simulador')) {
    return <SimulatorPage />;
  }

  // 8. Dedicated Route: Custom Development (Apps Móviles & Sistemas POS)
  if (currentPath.startsWith('/desarrollo-a-medida')) {
    return <CustomDevelopmentPage />;
  }

  // 9. Hidden Route: Private Template Showroom / Panel Demos
  if (
    currentPath === '/showroom-privado' || 
    currentPath === '/showroom-privado/' || 
    currentPath === '/panel-demos' || 
    currentPath === '/panel-demos/'
  ) {
    return <ShowroomPage />;
  }

  // 10. Unknown Route: Not Found (404)
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
        <FreeAuditV3 />
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
