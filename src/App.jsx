import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisualJourneyFlow from './components/VisualJourneyFlow';
import DigitalPresenceSection from './components/DigitalPresenceSection';
import BusinessSituationsSection from './components/BusinessSituationsSection';
import TripodMockup from './components/TripodMockup';
import DemosSection from './components/DemosSection';
import ProcessSteps from './components/ProcessSteps';
import PricingPacks from './components/PricingPacks';
import OpportunityCalculator from './components/OpportunityCalculator';
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

export default function App() {
  useScrollReveal();
  useMouseParallaxDots();
  const [currentNiche, setCurrentNiche] = useState('peluqueria');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const niche = NICHES[currentNiche] || NICHES.peluqueria;

  // Track page visit on mount
  useEffect(() => {
    recordPageView();
  }, []);

  // Shortcuts: Ctrl+Shift+A, Alt+A or #admin in URL
  useEffect(() => {
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
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const handleSelectPreset = (nicheKey) => {
    if (NICHES[nicheKey]) {
      setCurrentNiche(nicheKey);
    }
  };

  return (
    <div className="app-root">
      {/* 1. Top Navigation with reduced 6 items */}
      <Navbar />

      <main>
        {/* 2. Hero with Action-Oriented Headline, CTAs, Trust Badges & 3-in-1 Mockup */}
        <Hero />

        {/* 3. Customer Journey: Así te encuentra un nuevo cliente (Te busca -> Te conoce -> Te contacta) */}
        <VisualJourneyFlow />

        {/* 4. Complete Digital Presence: Una presencia digital completa (01 Web -> 02 Google -> 03 WhatsApp) */}
        <DigitalPresenceSection />

        {/* 5. Business Situations: ¿Tu negocio está en alguna de estas situaciones? */}
        <BusinessSituationsSection />

        {/* 6. Live Interactive Simulator: ¿Querés ver cómo podría quedar tu negocio? */}
        <TripodMockup niche={niche} />

        {/* 7. Industry Demos: Así podría verse tu negocio (Gastronomía, Barbería, Taller, Comercio) */}
        <DemosSection onSelectPreset={handleSelectPreset} />

        {/* 8. Process Methodology: ¿Cómo trabajamos? 3 simples pasos */}
        <ProcessSteps />

        {/* 9. Interactive Opportunity Calculator */}
        <OpportunityCalculator niche={niche} />

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
