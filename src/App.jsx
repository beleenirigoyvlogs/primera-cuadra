import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisualJourneyFlow from './components/VisualJourneyFlow';
import LiveProductSandbox from './components/LiveProductSandbox';
import TripodMockup from './components/TripodMockup';
import ArchitectureSpecBuilder from './components/ArchitectureSpecBuilder';
import TechStackExplorer from './components/TechStackExplorer';
import StreetComparison from './components/StreetComparison';
import ProcessSteps from './components/ProcessSteps';
import PricingPacks from './components/PricingPacks';
import OpportunityCalculator from './components/OpportunityCalculator';
import FacebookFeedSection from './components/FacebookFeedSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import WhatsAppFloatingBtn from './components/WhatsAppFloatingBtn';
import CommandMenu from './components/CommandMenu';
import { ToastProvider } from './components/Toast';
import { NICHES } from './data/nicheData';

export default function App() {
  // Default niche is 'nautica'
  const [currentNiche, setCurrentNiche] = useState('nautica');
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const niche = NICHES[currentNiche] || NICHES.nautica;

  // Handle initial hash navigation after mount
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  }, []);

  // Global keyboard listener for ⌘K / Ctrl+K and '/'
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
        return;
      }

      // '/' when not inside an input/textarea
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <div className="app-root">
        {/* Top Navigation with Command Menu search trigger */}
        <Navbar 
          onSelectNiche={setCurrentNiche} 
          onOpenCommandMenu={() => setCommandMenuOpen(true)}
        />

        <main>
          {/* Hero with interactive Niche Switcher */}
          <Hero niche={niche} onSelectNiche={setCurrentNiche} />

          {/* Visual Journey Roadmap: Google Maps -> Web Propia -> WhatsApp */}
          <VisualJourneyFlow />

          {/* NEW: Live Product Sandbox (POS Terminal, Reactive Analytics, CWV Latency Inspector) */}
          <LiveProductSandbox />

          {/* Live Simulation: Google Maps, WhatsApp Business, Web Propia */}
          <TripodMockup niche={niche} />

          {/* NEW: Interactive Architecture Spec Builder (RFC Scoping & WhatsApp Export) */}
          <ArchitectureSpecBuilder />

          {/* NEW: Tech Stack & System Architecture Explorer (Frontend, Edge, Data, Infra) */}
          <TechStackExplorer />

          {/* The Primera Cuadra Philosophy: Before vs After & Agency Comparison */}
          <StreetComparison niche={niche} />

          {/* 3 Simple Steps Process */}
          <ProcessSteps />

          {/* Pack Express $120.000 vs Solo Web $150.000 vs Pack Completo $250.000 */}
          <PricingPacks niche={niche} />

          {/* Interactive ROI & Lost Searches Calculator */}
          <OpportunityCalculator niche={niche} />

          {/* Live Facebook Community & Real-time Works */}
          <FacebookFeedSection />

          {/* Frequently Asked Questions Accordion */}
          <FAQSection niche={niche} />
        </main>

        {/* Footer */}
        <Footer niche={niche} onSelectNiche={setCurrentNiche} />

        {/* Persistent Floating WhatsApp CTA */}
        <WhatsAppFloatingBtn niche={niche} />

        {/* Interactive Command Menu (⌘K / /) */}
        <CommandMenu 
          isOpen={commandMenuOpen} 
          onClose={() => setCommandMenuOpen(false)} 
        />
      </div>
    </ToastProvider>
  );
}
