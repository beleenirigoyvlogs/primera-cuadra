import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisualJourneyFlow from './components/VisualJourneyFlow';
import TripodMockup from './components/TripodMockup';
import StreetComparison from './components/StreetComparison';
import ProcessSteps from './components/ProcessSteps';
import PricingPacks from './components/PricingPacks';
import OpportunityCalculator from './components/OpportunityCalculator';
import FacebookFeedSection from './components/FacebookFeedSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import WhatsAppFloatingBtn from './components/WhatsAppFloatingBtn';
import { NICHES } from './data/nicheData';

export default function App() {
  // Default niche is 'nautica'
  const [currentNiche, setCurrentNiche] = useState('nautica');
  const niche = NICHES[currentNiche] || NICHES.nautica;

  return (
    <div className="app-root">
      {/* Top Navigation with Mega-Menu and niche selection */}
      <Navbar onSelectNiche={setCurrentNiche} />

      <main>
        {/* Hero with interactive Niche Switcher */}
        <Hero niche={niche} onSelectNiche={setCurrentNiche} />

        {/* Visual Journey Roadmap: Google Maps -> Web Propia -> WhatsApp */}
        <VisualJourneyFlow />

        {/* Live Simulation: Google Maps, WhatsApp Business, Web Propia */}
        <TripodMockup niche={niche} />

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
    </div>
  );
}
