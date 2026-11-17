import React, { useEffect } from 'react';
import NavbarV3 from '../components/v3/NavbarV3';
import FooterV3 from '../components/v3/FooterV3';
import FreeAuditV3 from '../components/v3/FreeAuditV3';
import WhatsAppFloatingBtn from '../components/WhatsAppFloatingBtn';
import { useTheme } from '../hooks/useTheme';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BLOG_POSTS } from '../data/blogData';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';

export default function BlogIndexPage() {
  const { isDark } = useTheme();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog: consejos de diseño web y Google Maps | Primera Cuadra';
  }, []);

  const bgLight = isDark ? '#1E1C24' : '#EFEDE8';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';

  const postsList = Object.values(BLOG_POSTS);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Blog de Primera Cuadra',
    'description': 'Artículos y guías prácticas sobre diseño de páginas web, posicionamiento en Google Maps e Instagram para negocios.',
    'url': 'https://primeracuadra.com.ar/blog'
  };

  return (
    <div 
      className="primera-cuadra-v3-root blog-index-page"
      style={{ 
        width: '100%', 
        minHeight: '100vh', 
        fontFamily: "'Poppins', system-ui, sans-serif",
        background: bgLight,
        color: ink,
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <NavbarV3 />

      <main>
        {/* Hero */}
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
              <pattern id="blog-stripes" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(164,139,255,0.28)" strokeWidth="3" />
              </pattern>
            </defs>
            <circle cx="calc(100% + 80px)" cy="80" r="260" fill="#673DE6" />
            <circle cx="50%" cy="100%" r="140" fill="url(#blog-stripes)" />
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
              BLOG
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
              CONSEJOS Y GUÍAS DE DISEÑO WEB
            </h1>

            <p 
              className="pc-reveal-u"
              style={{ 
                margin: '20px 0 0', 
                fontSize: 'clamp(16px, 1.9vw, 19px)', 
                lineHeight: 1.6, 
                color: '#CFCBD8',
                maxWidth: '720px'
              }}
            >
              Respuestas directas y sin vueltas sobre costos, Google Maps y presencia digital para tu negocio.
            </p>
          </div>
        </section>

        {/* Blog Posts Cards Grid */}
        <section 
          style={{ 
            maxWidth: '1240px', 
            margin: '0 auto', 
            padding: 'clamp(64px, 7vw, 96px) 24px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '32px' 
            }}
          >
            {postsList.map((post, idx) => (
              <article 
                key={post.slug}
                className="pc-reveal-u"
                style={{
                  background: cardBg,
                  border: `1px solid ${line}`,
                  borderRadius: '8px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  boxShadow: isDark ? '0 12px 30px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.06)',
                  borderTop: '5px solid #673DE6',
                  '--pc-delay': `${idx * 0.12}s`,
                  transitionDelay: `${idx * 0.12}s`
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: muted, marginBottom: '14px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={13} />
                      {post.date}
                    </span>
                    <span>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={13} />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 
                    style={{ 
                      margin: '0 0 14px', 
                      fontFamily: "'Oswald', sans-serif", 
                      fontSize: '24px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      lineHeight: 1.2 
                    }}
                  >
                    <a 
                      href={`/blog/${post.slug}`} 
                      style={{ color: ink, textDecoration: 'none' }}
                    >
                      {post.h1}
                    </a>
                  </h2>

                  <p style={{ margin: 0, color: muted, fontSize: '15px', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </div>

                <a 
                  href={`/blog/${post.slug}`} 
                  style={{ 
                    color: isDark ? '#A48BFF' : '#5B33D6', 
                    fontFamily: "'Oswald', sans-serif", 
                    fontSize: '15px', 
                    fontWeight: 600, 
                    textTransform: 'uppercase', 
                    letterSpacing: '.05em', 
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Leer artículo</span>
                  <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Free Audit */}
        <FreeAuditV3 />
      </main>

      <FooterV3 />
      <WhatsAppFloatingBtn />
    </div>
  );
}

