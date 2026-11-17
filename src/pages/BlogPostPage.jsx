import React, { useEffect } from 'react';
import NavbarV3 from '../components/v3/NavbarV3';
import FooterV3 from '../components/v3/FooterV3';
import FreeAuditV3 from '../components/v3/FreeAuditV3';
import WhatsAppFloatingBtn from '../components/WhatsAppFloatingBtn';
import { useTheme } from '../hooks/useTheme';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BLOG_POSTS } from '../data/blogData';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';

export default function BlogPostPage({ slug }) {
  const { isDark } = useTheme();
  useScrollReveal();

  const post = BLOG_POSTS[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post?.title) {
      document.title = post.title;
    }
  }, [post]);

  if (!post) return null;

  const bgLight = isDark ? '#1E1C24' : '#EFEDE8';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';

  // Other two posts for bottom recommendation
  const otherPosts = Object.values(BLOG_POSTS).filter(p => p.slug !== slug);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.h1,
    'description': post.metaDescription,
    'datePublished': '2026-11-17T09:00:00-03:00',
    'dateModified': '2026-11-17T09:00:00-03:00',
    'author': {
      '@type': 'Person',
      'name': 'Belén Irigoy'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Primera Cuadra',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://primeracuadra.com.ar/brand/icono-512.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://primeracuadra.com.ar/blog/${slug}`
    }
  };

  return (
    <div 
      className="primera-cuadra-v3-root blog-post-page"
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
        {/* Header / Meta */}
        <section 
          style={{ 
            background: '#18161E', 
            color: '#F4F2EC', 
            padding: 'clamp(48px, 6vw, 84px) 24px', 
            position: 'relative', 
            overflow: 'hidden' 
          }}
        >
          <div 
            style={{ 
              maxWidth: '720px', 
              margin: '0 auto', 
              boxSizing: 'border-box' 
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <a 
                href="/blog" 
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
                <span>Volver al blog</span>
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
              ARTÍCULO
            </p>

            <h1 
              className="pc-reveal-u"
              style={{ 
                margin: '12px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(32px, 4.5vw, 54px)', 
                lineHeight: 1.08, 
                textTransform: 'uppercase', 
                letterSpacing: '-0.01em', 
                color: '#FFFFFF' 
              }}
            >
              {post.h1}
            </h1>

            {/* Author, Date and Reading Time */}
            <div 
              className="pc-reveal-u"
              style={{ 
                marginTop: '22px', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '16px 24px', 
                fontSize: '14px', 
                color: '#CFCBD8',
                borderTop: '1px solid #34313C',
                paddingTop: '16px'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#A48BFF" />
                {post.author}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="#A48BFF" />
                {post.date}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} color="#A48BFF" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article 
          style={{ 
            maxWidth: '720px', 
            margin: '0 auto', 
            padding: 'clamp(48px, 6vw, 84px) 24px',
            boxSizing: 'border-box',
            lineHeight: 1.75,
            fontSize: '17px'
          }}
        >
          <div 
            className="pc-reveal-u"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px' 
            }}
          >
            {post.content.map((block, bIdx) => {
              if (block.type === 'lead') {
                return (
                  <p 
                    key={bIdx} 
                    style={{ 
                      fontSize: '19px', 
                      lineHeight: 1.6, 
                      fontWeight: 500, 
                      margin: 0, 
                      color: ink 
                    }}
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'h2') {
                return (
                  <h2 
                    key={bIdx} 
                    style={{ 
                      fontFamily: "'Oswald', sans-serif", 
                      fontSize: '26px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      margin: '20px 0 0', 
                      color: ink 
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul 
                    key={bIdx} 
                    style={{ 
                      margin: 0, 
                      paddingLeft: '22px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px',
                      color: ink
                    }}
                  >
                    {block.items.map((item, iIdx) => (
                      <li key={iIdx} style={{ lineHeight: 1.65 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={bIdx} style={{ margin: 0, color: ink, lineHeight: 1.75 }}>
                  {block.text}
                </p>
              );
            })}

            {/* Optional link to pricing for Article 1 */}
            {post.hasPricingLink && (
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${line}` }}>
                <a 
                  href="/#precios" 
                  style={{ 
                    color: isDark ? '#A48BFF' : '#5B33D6', 
                    fontFamily: "'Oswald', sans-serif", 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    textTransform: 'uppercase', 
                    letterSpacing: '.05em', 
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Ver planes y precios</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            )}
          </div>

          {/* Links to Other Two Articles */}
          <div 
            style={{ 
              marginTop: '56px', 
              paddingTop: '40px', 
              borderTop: `2px solid ${line}` 
            }}
          >
            <h3 
              style={{ 
                margin: '0 0 24px', 
                fontFamily: "'Oswald', sans-serif", 
                fontSize: '20px', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                color: muted 
              }}
            >
              Seguí leyendo
            </h3>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '20px' 
              }}
            >
              {otherPosts.map(op => (
                <a 
                  key={op.slug}
                  href={`/blog/${op.slug}`}
                  style={{ 
                    textDecoration: 'none', 
                    background: cardBg, 
                    border: `1px solid ${line}`, 
                    borderRadius: '8px', 
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    color: ink,
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#673DE6'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = line}
                >
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1.25 }}>
                    {op.h1}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#A48BFF' : '#5B33D6' }}>
                    Leer artículo →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </article>

        {/* CTA Free Audit */}
        <FreeAuditV3 />
      </main>

      <FooterV3 />
      <WhatsAppFloatingBtn />
    </div>
  );
}
