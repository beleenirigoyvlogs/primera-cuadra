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
import { useTheme } from '../hooks/useTheme';
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
    description: 'Diseño de páginas web para comercios, profesionales y empresas en Tigre. Ficha de Google Maps y WhatsApp directo. Entrega en 4 días hábiles.',
    intro: 'Diseño páginas web para comercios, profesionales y emprendimientos de Tigre y sus alrededores. Construyo tu sitio para que aparezca en Google cuando los vecinos buscan tus servicios, integrado con Google Maps y con contacto directo a tu WhatsApp.',
    locality: 'Tigre',
    region: 'Buenos Aires',
    focusKicker: 'Foco local • Partido de Tigre',
    focusTitle: 'Diseño web en Tigre: presencia digital para los negocios de la zona',
    focusNarrative: (
      <>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          Tigre combina polos comerciales consolidados, una intensa actividad turística y una extensa red de servicios vecinales. Mi trabajo abarca proyectos en Tigre Centro, Rincón de Milberg, Benavídez, Don Torcuato, General Pacheco, El Talar, Troncos del Talar, Dique Luján y la primera sección de islas del Delta.
        </p>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          En esta zona conviven locales gastronómicos sobre los paseos costeros y el Puerto de Frutos, guarderías náuticas, astilleros, talleres mecánicos, carpinterías, comercios sobre avenidas comerciales como Cazón, Crisólogo Larralde o Santa María, y prestadores de servicios vinculados tanto a los cascos urbanos como a las urbanizaciones y barrios cerrados de Benavídez, Rincón y Pacheco.
        </p>
        <p style={{ margin: 0 }}>
          Una presencia digital eficaz en Tigre requiere que quien busque tus productos o servicios desde el celular encuentre en segundos tu ubicación exacta, tus horarios actualizados, tu catálogo de servicios y un botón directo para consultar por WhatsApp sin dar vueltas ni lidiar con sitios lentos o desactualizados.
        </p>
      </>
    ),
    focusHighlights: [
      {
        title: 'Comercios y talleres de avenida',
        desc: 'Fácil localización en Google Maps y llamada directa para clientes de paso o vecinos de la zona.'
      },
      {
        title: 'Náutica, turismo y Delta',
        desc: 'Información clara de servicios, catálogo visual y contacto directo para coordinar reservas o presupuestos.'
      },
      {
        title: 'Servicios para el hogar y profesionales',
        desc: 'Presencia seria para arquitectos, electricistas, consultorios y proveedores que trabajan con barrios residenciales.'
      }
    ],
    faqs: [
      {
        q: '¿Atendés o te reunís de forma presencial en Tigre?',
        a: 'Sí. Vivo y trabajo en Tigre, por lo que podemos coordinar un encuentro en tu local, consultorio o en un café de la zona si el proyecto lo requiere, o resolver todo por WhatsApp y videollamada para que avances a tu ritmo sin frenar tu jornada de trabajo.'
      },
      {
        q: '¿Mi negocio en Tigre va a salir en Google Maps?',
        a: 'Sí. Como parte del servicio optimizo o creo tu perfil en Google Maps (Google Perfil de Negocio) con la dirección de tu local o tu radio de atención en Tigre, tus horarios y fotos, para que aparezcas cuando busquen en el mapa local.'
      },
      {
        q: '¿Hacés páginas para actividades náuticas, cabañas o turismo en el Delta?',
        a: 'Sí. Desarrollo sitios pensados para la dinámica de prestadores turísticos, alquiler de lanchas, guarderías náuticas y complejos de cabañas, facilitando que los clientes vean fotos, consulten disponibilidad y confirmen reservas directamente por WhatsApp.'
      }
    ]
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
    intro: 'Desarrollo páginas web rápidas y profesionales para empresas, consultorios y negocios de Vicente López, San Isidro, San Fernando y Tigre. Una web pensada para competir en el corredor norte y transformar visitas en conversaciones por WhatsApp.',
    locality: 'Zona Norte',
    region: 'Buenos Aires',
    focusKicker: 'Foco regional • Corredor Zona Norte',
    focusTitle: 'Diseño web en Zona Norte: tecnología y posicionamiento en el corredor norte',
    focusNarrative: (
      <>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          El corredor norte del Gran Buenos Aires se caracteriza por un mercado altamente competitivo, donde conviven centros urbanos tradicionales y un fuerte tejido comercial y corporativo. Cubro proyectos a lo largo de Vicente López (Olivos, Florida, La Lucila, Carapachay), San Isidro (Martínez, Acassuso, Boulogne, Beccar), San Fernando (Victoria, Virreyes) y Tigre.
        </p>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          En esta región predomina una marcada concentración de estudios profesionales contables y jurídicos sobre avenidas como Del Libertador o Maipú, centros médicos, clínicas odontológicas y centros de estética, colegios y academias, gastronómicos consolidados en polos de San Isidro y Vicente López, y empresas de servicios corporativos e industriales radicadas en los parques y accesos a la Panamericana.
        </p>
        <p style={{ margin: 0 }}>
          En un entorno donde los clientes comparan minuciosamente varias alternativas antes de decidir, una página web moderna, veloz en teléfonos inteligentes y con textos que transmiten solvencia técnica es indispensable para no perder consultas frente a competidores directos de tu mismo corredor o avenida.
        </p>
      </>
    ),
    focusHighlights: [
      {
        title: 'Estudios y consultorios profesionales',
        desc: 'Diseño sobrio y de alta credibilidad que presenta especialidades, equipo y accesos a consultas privadas.'
      },
      {
        title: 'Polos comerciales y gastronómicos',
        desc: 'Menús legibles en móviles, geolocalización precisa y botón ágil para reservas y consultas inmediatas.'
      },
      {
        title: 'Empresas y servicios en Panamericana',
        desc: 'Estructura institucional clara para empresas B2B, distribuidores y prestadores corporativos de la zona.'
      }
    ],
    faqs: [
      {
        q: '¿Trabajás con negocios y profesionales de toda Zona Norte?',
        a: 'Sí, brindo servicios a lo largo de Vicente López, San Isidro, San Fernando y Tigre. Nos comunicamos fluidamente por WhatsApp o videollamada para avanzar sin demoras en cada etapa de tu sitio web.'
      },
      {
        q: '¿Cómo ayuda una web a competir en Google frente a otros negocios de Zona Norte?',
        a: 'Estructuro el código y los textos con buenas prácticas de SEO local para términos de búsqueda del corredor norte (por ejemplo, "consultorio en San Isidro" o "electricista en Olivos"), asegurando velocidad de carga y ficha de Google Maps optimizada.'
      },
      {
        q: '¿Puedo vincular la web a mi sistema de turnos o catálogo online?',
        a: 'Totalmente. Si utilizás una plataforma externa de turnos, catálogo de productos o reserva de citas médicas, la integramos con accesos directos visibles para que tus pacientes o clientes reserven en un toque.'
      }
    ]
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
    intro: 'Creo sitios web modernos y ultrarrápidos para comercios, profesionales y proyectos en la Ciudad Autónoma de Buenos Aires. Tu propuesta clara, posicionamiento en búsquedas locales de Capital y contacto directo a WhatsApp.',
    locality: 'Ciudad Autónoma de Buenos Aires',
    region: 'CABA',
    focusKicker: 'Foco urbano • Ciudad de Buenos Aires',
    focusTitle: 'Diseño web en CABA: velocidad y conversión para el mercado de Capital Federal',
    focusNarrative: (
      <>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          La Ciudad Autónoma de Buenos Aires concentra el mercado comercial más dinámico, denso y exigente del país. Mi servicio cubre proyectos en barrios como Palermo, Belgrano, Colegiales, Villa Urquiza, Caballito, Almagro, Recoleta, Villa Crespo, Microcentro, San Telmo, Flores, Parque Chas, Devoto y Núñez.
        </p>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          En Capital Federal encontramos una inmensa variedad de cafeterías de especialidad, restaurantes de autor, consultorios médicos particulares, estudios jurídicos y notariales, agencias de servicios, showrooms de diseño e indumentaria, y comercios minoristas distribuidos en los grandes ejes comerciales como Santa Fe, Cabildo, Rivadavia y Corrientes.
        </p>
        <p style={{ margin: 0 }}>
          En la dinámica porteña, la velocidad es determinante: los usuarios buscan desde el celular en plena vía pública o en medio de la jornada laboral y abandonan cualquier página que tarde más de dos segundos en abrir. Diseño webs ligeras que van directo al grano, destacan tu diferencial y abren una línea de consulta por WhatsApp en un toque.
        </p>
      </>
    ),
    focusHighlights: [
      {
        title: 'Comercios en avenidas y centros urbanos',
        desc: 'Información directa de horarios, medios de pago y ubicación exacta para clientes que circulan por el barrio.'
      },
      {
        title: 'Gastronomía y cafeterías de especialidad',
        desc: 'Presentación estética de cartas y propuestas, optimizadas para verse impecables en celulares.'
      },
      {
        title: 'Consultorías, agencias y estudios',
        desc: 'Posicionamiento de servicios especializados con llamadas a la acción claras para solicitar presupuestos.'
      }
    ],
    faqs: [
      {
        q: '¿Trabajás con negocios de Capital Federal aunque estés radicada en Tigre?',
        a: 'Sí, trabajo habitualmente con clientes de CABA. Todo el proceso está pensado para ser ágil: coordinamos por WhatsApp, videollamada o correo, con entregas en 4 días hábiles y comunicación constante sin necesidad de traslados.'
      },
      {
        q: '¿Por qué es clave que la web cargue rápido para usuarios de CABA?',
        a: 'En Capital la oferta es masiva y la paciencia del usuario es mínima. Un sitio liviano reduce el rebote, mejora el puntaje en Google para búsquedas móviles locales y asegura que quien te busque no se vaya con la competencia.'
      },
      {
        q: '¿Se puede enfocar la página en un barrio específico de la Ciudad?',
        a: 'Sí. Configuramos los encabezados, la ficha de Google Maps y las palabras clave con el barrio donde se ubica tu local o donde prestás servicios (por ejemplo, Belgrano, Caballito o Palermo), atrayendo consultas de cercanía.'
      }
    ]
  }
};

function LocalFocusSection({ zone }) {
  const { isDark } = useTheme();
  const bg = isDark ? '#1E1C24' : '#EFEDE8';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const border = isDark ? '#34313C' : '#D4CFC4';
  const shadow = isDark ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.08)';

  return (
    <section 
      style={{ 
        background: bg, 
        color: ink, 
        padding: 'clamp(56px, 7vw, 96px) 24px',
        borderBottom: `1px solid ${border}`,
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        <p 
          style={{ 
            margin: 0, 
            fontFamily: "'Oswald', sans-serif", 
            fontSize: '15px', 
            letterSpacing: '.14em', 
            textTransform: 'uppercase', 
            color: muted 
          }}
        >
          {zone.focusKicker}
        </p>
        <h2 
          style={{ 
            margin: '10px 0 0', 
            fontFamily: "'Oswald', sans-serif", 
            fontWeight: 600, 
            fontSize: 'clamp(32px, 3.8vw, 50px)', 
            lineHeight: 1.1, 
            textTransform: 'uppercase' 
          }}
        >
          {zone.focusTitle}
        </h2>

        <div 
          style={{ 
            marginTop: '36px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '36px',
            alignItems: 'start'
          }}
        >
          {/* Main narrative text */}
          <div style={{ fontSize: '16px', lineHeight: 1.7, color: ink }}>
            {zone.focusNarrative}
          </div>

          {/* Cards highlighting key commercial dynamics of this zone */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {zone.focusHighlights.map((h, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: cardBg, 
                  borderLeft: '4px solid #673DE6', 
                  borderRadius: '6px', 
                  padding: '18px 20px',
                  boxShadow: `0 8px 20px ${shadow}`
                }}
              >
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', textTransform: 'uppercase', fontWeight: 600, color: ink }}>
                  {h.title}
                </div>
                <div style={{ marginTop: '6px', fontSize: '14px', lineHeight: 1.5, color: muted }}>
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
      <LocalFocusSection zone={zone} />
      <ServicesV3 />
      <PortfolioV3 />
      <StepsV3 />
      <ThePointV3 />
      <EarlyAdoptersV3 />
      <PricingV3 />
      <AboutMeV3 />
      <FAQV3 extraFaqs={zone.faqs} />
      <FooterV3 />
    </div>
  );
}
