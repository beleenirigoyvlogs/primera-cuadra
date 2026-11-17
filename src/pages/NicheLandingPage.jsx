import React, { useEffect } from 'react';
import NavbarV3 from '../components/v3/NavbarV3';
import FooterV3 from '../components/v3/FooterV3';
import FreeAuditV3 from '../components/v3/FreeAuditV3';
import WhatsAppFloatingBtn from '../components/WhatsAppFloatingBtn';
import { useTheme } from '../hooks/useTheme';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { RUBROS_DATA } from '../data/rubrosData';
import { ArrowLeft, ArrowRight, Check, MessageSquare, ExternalLink } from 'lucide-react';

export default function NicheLandingPage({ rubroKey }) {
  const { isDark } = useTheme();
  useScrollReveal();

  const data = RUBROS_DATA[rubroKey];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data?.title) {
      document.title = data.title;
    }
  }, [data]);

  if (!data) return null;

  const bgLight = isDark ? '#1E1C24' : '#EFEDE8';
  const bgAlt = isDark ? '#19171F' : '#E5E2DB';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';

  const whatsappMsg = encodeURIComponent(
    `¡Hola Belén! Vi la página de diseño web para ${data.kicker.toLowerCase()} y me gustaría consultar por mi negocio.`
  );

  const plansResumed = [
    {
      name: 'Express',
      price: '$120.000',
      desc: 'Google Maps + WhatsApp Business sin página web. Entrega en 48 h.',
      rec: false
    },
    {
      name: 'Solo web',
      price: '$150.000',
      desc: 'Tu web propia a medida con dominio .com.ar. Entrega en 4 días hábiles.',
      rec: false
    },
    {
      name: 'Completo',
      price: '$220.000',
      desc: 'Web a medida + Google Maps + WhatsApp Business. Ahorrás $50.000.',
      rec: true
    }
  ];

  // Schema Service + BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        'name': data.title,
        'description': data.metaDescription,
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Primera Cuadra',
          'url': 'https://primeracuadra.com.ar',
          'telephone': '+5491128779641'
        },
        'areaServed': [
          'Tigre',
          'Zona Norte',
          'Ciudad Autónoma de Buenos Aires'
        ],
        'offers': {
          '@type': 'Offer',
          'price': '120000',
          'priceCurrency': 'ARS'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Inicio',
            'item': 'https://primeracuadra.com.ar/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': data.h1,
            'item': `https://primeracuadra.com.ar/${data.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div 
      className="primera-cuadra-v3-root niche-page"
      style={{ 
        width: '100%', 
        minHeight: '100vh', 
        fontFamily: "'Poppins', system-ui, sans-serif",
        background: bgLight,
        color: ink,
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      {/* Dynamic JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <NavbarV3 />

      <main>
        {/* ===================================================================
            01 HERO
            =================================================================== */}
        <section 
          style={{ 
            background: '#18161E', 
            color: '#F4F2EC', 
            position: 'relative', 
            overflow: 'hidden',
            padding: 'clamp(56px, 7vw, 96px) 24px clamp(48px, 6vw, 84px)'
          }}
        >
          {/* Decorative SVG Shapes */}
          <svg 
            aria-hidden="true" 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none', 
              overflow: 'hidden'
            }}
          >
            <defs>
              <pattern id="niche-stripes" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(164,139,255,0.28)" strokeWidth="3" />
              </pattern>
            </defs>
            <circle cx="calc(100% + 80px)" cy="80" r="260" fill="#673DE6" />
            <circle cx="50%" cy="100%" r="140" fill="url(#niche-stripes)" />
          </svg>

          <div 
            style={{ 
              position: 'relative', 
              maxWidth: '1240px', 
              margin: '0 auto', 
              boxSizing: 'border-box' 
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <a 
                href="/" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: '#B3AFA6', 
                  textDecoration: 'none', 
                  fontSize: '14px', 
                  fontFamily: "'Oswald', sans-serif", 
                  letterSpacing: '.06em', 
                  textTransform: 'uppercase' 
                }}
              >
                <ArrowLeft size={16} />
                <span>Volver al inicio</span>
              </a>
            </div>

            <p 
              className="pc-reveal-l"
              style={{ 
                margin: 0, 
                fontFamily: "'Oswald', sans-serif", 
                fontSize: '15px', 
                letterSpacing: '.14em', 
                textTransform: 'uppercase', 
                color: '#A48BFF' 
              }}
            >
              {data.kicker}
            </p>

            <h1 
              className="pc-reveal-u"
              style={{ 
                margin: '12px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(34px, 5vw, 64px)', 
                lineHeight: 1.05, 
                textTransform: 'uppercase', 
                letterSpacing: '-0.01em', 
                color: '#FFFFFF' 
              }}
            >
              {data.h1}
            </h1>

            <p 
              className="pc-reveal-u"
              style={{ 
                margin: '20px 0 0', 
                fontSize: 'clamp(17px, 2vw, 20px)', 
                lineHeight: 1.5, 
                color: '#E4E0D7',
                maxWidth: '680px',
                fontWeight: 500
              }}
            >
              {data.bajada}
            </p>

            <div 
              style={{ 
                marginTop: '36px', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '14px', 
                alignItems: 'center' 
              }}
            >
              <a 
                href={`https://wa.me/5491128779641?text=${whatsappMsg}`}
                target="_blank" 
                rel="noopener noreferrer" 
                data-wa={data.waLocation}
                style={{ 
                  textDecoration: 'none', 
                  background: '#673DE6', 
                  color: '#FFFFFF', 
                  padding: '15px 28px', 
                  borderRadius: '6px', 
                  fontWeight: 600, 
                  fontSize: '16px', 
                  textAlign: 'center', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}
              >
                <MessageSquare size={17} />
                <span>Consultar por WhatsApp</span>
              </a>

              <a 
                href={data.exampleHref}
                style={{ 
                  textDecoration: 'none', 
                  background: 'transparent', 
                  color: '#FFFFFF', 
                  padding: '15px 24px', 
                  borderRadius: '6px', 
                  fontWeight: 600, 
                  border: '2px solid rgba(255,255,255,.3)', 
                  fontSize: '16px', 
                  textAlign: 'center', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}
              >
                <span>Ver ejemplo interactivo</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================================
            02 CAPTURA GRANDE DEL EJEMPLO Y QUÉ TIENE LA WEB
            =================================================================== */}
        <section 
          style={{ 
            background: bgLight, 
            color: ink, 
            padding: 'clamp(64px, 7vw, 96px) 24px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{ 
              maxWidth: '1240px', 
              margin: '0 auto', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '48px',
              alignItems: 'center'
            }}
          >
            {/* Left: Interactive Example Preview */}
            <div className="pc-reveal-l">
              <a 
                href={data.exampleHref}
                title={`Ver web de ejemplo completa: ${data.exampleName}`}
                style={{ 
                  textDecoration: 'none', 
                  display: 'block',
                  background: cardBg,
                  borderRadius: '8px',
                  border: `1px solid ${line}`,
                  overflow: 'hidden',
                  boxShadow: isDark ? '0 16px 36px rgba(0,0,0,0.35)' : '0 12px 28px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 20px 42px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDark ? '0 16px 36px rgba(0,0,0,0.35)' : '0 12px 28px rgba(0,0,0,0.08)';
                }}
              >
                {/* Browser bar mock */}
                <div 
                  style={{
                    padding: '10px 14px',
                    background: isDark ? '#14121A' : '#DCD8CE',
                    borderBottom: `1px solid ${line}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EAB308', display: 'inline-block' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                  </div>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase', color: muted }}>
                    {data.exampleName}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#673DE6', fontSize: '12px', fontWeight: 600 }}>
                    <span>Ver demo</span>
                    <ExternalLink size={13} />
                  </div>
                </div>

                <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                  <img 
                    src={data.exampleImage} 
                    alt={`Captura de ejemplo: ${data.exampleName}`} 
                    width="800" 
                    height="600" 
                    loading="lazy" 
                    decoding="async" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </a>
            </div>

            {/* Right: Qué tiene la web */}
            <div className="pc-reveal-r">
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
                CONTENIDO A MEDIDA
              </p>

              <h2 
                style={{ 
                  margin: '10px 0 0', 
                  fontFamily: "'Oswald', sans-serif", 
                  fontWeight: 600, 
                  fontSize: 'clamp(28px, 3.6vw, 44px)', 
                  lineHeight: 1.1, 
                  textTransform: 'uppercase' 
                }}
              >
                QUÉ TIENE LA WEB
              </h2>

              <ul 
                style={{ 
                  margin: '26px 0 0', 
                  padding: 0, 
                  listStyle: 'none', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '14px' 
                }}
              >
                {data.queTiene.map((item, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px', 
                      fontSize: '16px', 
                      lineHeight: 1.5 
                    }}
                  >
                    <span 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: '22px', 
                        height: '22px', 
                        borderRadius: '50%', 
                        background: '#673DE6', 
                        color: '#FFFFFF', 
                        flexShrink: 0, 
                        marginTop: '2px' 
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===================================================================
            03 EL PÁRRAFO DE TEXTO (EDITORIAL)
            =================================================================== */}
        <section 
          style={{ 
            background: bgAlt, 
            color: ink, 
            padding: 'clamp(56px, 7vw, 84px) 24px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{ 
              maxWidth: '840px', 
              margin: '0 auto', 
              boxSizing: 'border-box' 
            }}
          >
            <div 
              className="pc-reveal-u"
              style={{ 
                background: cardBg, 
                border: `1px solid ${line}`, 
                borderRadius: '8px', 
                padding: 'clamp(32px, 5vw, 48px)',
                boxShadow: isDark ? '0 12px 30px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.05)'
              }}
            >
              <p 
                style={{ 
                  margin: 0, 
                  fontFamily: "'Oswald', sans-serif", 
                  fontSize: '15px', 
                  letterSpacing: '.14em', 
                  textTransform: 'uppercase', 
                  color: isDark ? '#A48BFF' : '#5B33D6',
                  marginBottom: '14px'
                }}
              >
                CÓMO TRABAJA
              </p>
              <p 
                style={{ 
                  margin: 0, 
                  fontSize: 'clamp(16px, 1.8vw, 18px)', 
                  lineHeight: 1.7, 
                  color: ink 
                }}
              >
                {data.texto}
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            04 BLOQUE DE PRECIOS RESUMIDO
            =================================================================== */}
        <section 
          style={{ 
            background: bgLight, 
            color: ink, 
            padding: 'clamp(64px, 7vw, 96px) 24px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{ 
              maxWidth: '1240px', 
              margin: '0 auto', 
              boxSizing: 'border-box' 
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
              <p 
                className="pc-reveal-l"
                style={{ 
                  margin: 0, 
                  fontFamily: "'Oswald', sans-serif", 
                  fontSize: '15px', 
                  letterSpacing: '.14em', 
                  textTransform: 'uppercase', 
                  color: muted 
                }}
              >
                PRECIOS DE LANZAMIENTO
              </p>
              <h2 
                className="pc-reveal-u"
                style={{ 
                  margin: '10px 0 0', 
                  fontFamily: "'Oswald', sans-serif", 
                  fontWeight: 600, 
                  fontSize: 'clamp(30px, 3.8vw, 48px)', 
                  lineHeight: 1.1, 
                  textTransform: 'uppercase' 
                }}
              >
                PLANES DE DISEÑO WEB
              </h2>
            </div>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px' 
              }}
            >
              {plansResumed.map((pl, idx) => (
                <div 
                  key={pl.name}
                  className="pc-reveal-u"
                  style={{ 
                    background: pl.rec ? '#18161E' : cardBg, 
                    color: pl.rec ? '#F4F2EC' : ink, 
                    borderRadius: '8px', 
                    padding: '28px 24px', 
                    border: `1px solid ${pl.rec ? '#34313C' : line}`,
                    borderTop: '5px solid #673DE6',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    '--pc-delay': `${idx * 0.12}s`,
                    transitionDelay: `${idx * 0.12}s`
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 600, textTransform: 'uppercase' }}>
                        {pl.name}
                      </h3>
                      {pl.rec && (
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', background: '#673DE6', color: '#FFFFFF', borderRadius: '4px', padding: '3px 8px' }}>
                          Recomendado
                        </span>
                      )}
                    </div>
                    <div style={{ marginTop: '14px', fontFamily: "'Oswald', sans-serif", fontSize: '42px', fontWeight: 600, lineHeight: 1 }}>
                      {pl.price}
                    </div>
                    <p style={{ margin: '10px 0 0', fontSize: '14px', opacity: 0.85, lineHeight: 1.5 }}>
                      {pl.desc}
                    </p>
                  </div>

                  <a 
                    href="/#precios" 
                    style={{ 
                      marginTop: '8px', 
                      color: pl.rec ? '#A48BFF' : '#5B33D6', 
                      fontFamily: "'Oswald', sans-serif", 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      letterSpacing: '.05em', 
                      textDecoration: 'none' 
                    }}
                  >
                    Ver detalles del plan →
                  </a>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <a 
                href="/#precios" 
                style={{ 
                  color: isDark ? '#A48BFF' : '#5B33D6', 
                  fontFamily: "'Oswald', sans-serif", 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '.05em', 
                  textDecoration: 'none' 
                }}
              >
                Ver tabla comparativa completa en Precios →
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================================
            05 REVISIÓN GRATIS DE GOOGLE (CTA)
            =================================================================== */}
        <FreeAuditV3 />
      </main>

      <FooterV3 />
      <WhatsAppFloatingBtn />
    </div>
  );
}
