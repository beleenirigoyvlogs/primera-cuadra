import React, { useEffect } from 'react';
import NavbarV3 from '../components/v3/NavbarV3';
import HeroV3 from '../components/v3/HeroV3';
import StaggeredStripV3 from '../components/v3/StaggeredStripV3';
import GuaranteesBannerV3 from '../components/v3/GuaranteesBannerV3';
import ServicesV3 from '../components/v3/ServicesV3';
import PortfolioV3 from '../components/v3/PortfolioV3';
import StepsV3 from '../components/v3/StepsV3';
import ThePointV3 from '../components/v3/ThePointV3';
import EarlyAdoptersV3 from '../components/v3/EarlyAdoptersV3';
import PricingV3 from '../components/v3/PricingV3';
import AboutMeV3 from '../components/v3/AboutMeV3';
import FAQV3 from '../components/v3/FAQV3';
import FooterV3 from '../components/v3/FooterV3';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const LOCAL_ZONES = {
  tigre: {
    slug: 'diseno-web-tigre',
    name: 'Tigre',
    h1: (
      <>
        Diseño de páginas web<br />
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: 'uppercase', color: '#FFFFFF' }}>
          en Tigre
        </span>
      </>
    ),
    kicker: 'Diseño web en Tigre, Rincón, Benavídez y Don Torcuato',
    title: 'Diseño de páginas web en Tigre | Primera Cuadra',
    description: 'Diseño de páginas web para negocios, profesionales y empresas en Tigre. Ficha de Google Maps y WhatsApp. Entrega en 4 días hábiles.',
    intro: 'Diseño páginas web pensadas para comercios, profesionales y empresas de Tigre, Rincón de Milberg, Benavídez y Don Torcuato. Tu web lista para aparecer en Google cuando buscan lo que hacés en la zona, conectada con Google Maps y tu WhatsApp directo.',
    locality: 'Tigre',
    region: 'Buenos Aires'
  },
  'zona-norte': {
    slug: 'diseno-web-zona-norte',
    name: 'Zona Norte',
    h1: (
      <>
        Diseño de páginas web<br />
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: 'uppercase', color: '#FFFFFF' }}>
          en Zona Norte
        </span>
      </>
    ),
    kicker: 'Diseño web en Vicente López, San Isidro, San Fernando y Tigre',
    title: 'Diseño de páginas web en Zona Norte | Primera Cuadra',
    description: 'Diseño de páginas web profesionales en Zona Norte: Vicente López, San Isidro, San Fernando y Tigre. Google Maps y WhatsApp directo.',
    intro: 'Diseño tu página web profesional para que tu negocio o servicio en Zona Norte destaque en Google frente a la competencia de la zona. Diseño a medida, optimización para celulares, Google Maps y WhatsApp Business.',
    locality: 'Zona Norte',
    region: 'Buenos Aires'
  },
  caba: {
    slug: 'diseno-web-caba',
    name: 'CABA',
    h1: (
      <>
        Diseño de páginas web<br />
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: 'uppercase', color: '#FFFFFF' }}>
          en CABA
        </span>
      </>
    ),
    kicker: 'Diseño web en Ciudad Autónoma de Buenos Aires',
    title: 'Diseño de páginas web en CABA y Capital Federal | Primera Cuadra',
    description: 'Diseño de páginas web para negocios, estudios y emprendedores en CABA / Capital Federal. Google Maps y WhatsApp directo. Entrega en 4 días.',
    intro: 'Desarrollo páginas web de alto impacto y carga ultrarrápida para negocios y profesionales en la Ciudad de Buenos Aires. Tu web preparada para posicionar en búsquedas locales y convertir visitas en consultas directas de WhatsApp.',
    locality: 'Ciudad Autónoma de Buenos Aires',
    region: 'CABA'
  }
};

export default function LocalLandingPage({ zoneKey = 'tigre' }) {
  useScrollReveal();
  const zone = LOCAL_ZONES[zoneKey] || LOCAL_ZONES.tigre;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = zone.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', zone.description);
    }
  }, [zone]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <NavbarV3 />
      <HeroV3 
        zoneKicker={zone.kicker}
        zoneH1={zone.h1}
        zoneIntro={zone.intro}
      />
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
      <FooterV3 />
    </div>
  );
}
