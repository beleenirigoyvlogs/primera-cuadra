import React from 'react';
import BrandLogo from '../BrandLogo';

// Constante de configuración de redes sociales
export const SOCIAL_LINKS = {
  instagram: '',
  facebook: 'https://www.facebook.com/profile.php?id=61594410424409',
  googleMaps: ''
};

export const CONTACT_EMAIL = 'primeracuadraweb@gmail.com';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const MapPinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function FooterV3() {
  const socialItems = [
    {
      name: 'Instagram',
      url: SOCIAL_LINKS.instagram,
      icon: InstagramIcon,
      label: 'Seguinos en Instagram'
    },
    {
      name: 'Facebook',
      url: SOCIAL_LINKS.facebook,
      icon: FacebookIcon,
      label: 'Seguime en Facebook'
    },
    {
      name: 'Google Maps',
      url: SOCIAL_LINKS.googleMaps,
      icon: MapPinIcon,
      label: 'Ver perfil en Google Maps'
    }
  ].filter(item => Boolean(item.url && item.url.trim()));

  return (
    <footer style={{ background: '#121117', color: '#F4F2EC' }}>
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(36px, 4.5vw, 56px) 24px 36px',
          boxSizing: 'border-box'
        }}
      >
        {/* Call to Action Banner */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '28px', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingBottom: '52px', 
            borderBottom: '1px solid #2E2B36' 
          }}
        >
          <h2 
            style={{ 
              margin: 0, 
              flex: '999 1 500px', 
              fontFamily: "'Oswald', sans-serif", 
              fontWeight: 600, 
              fontSize: 'clamp(32px, 4.4vw, 60px)', 
              lineHeight: 1.05, 
              textTransform: 'uppercase' 
            }}
          >
            ¿Hablamos de <span style={{ color: '#A48BFF' }}>tu página web</span>?
          </h2>
          <a 
            href="https://wa.me/5491128779641?text=%C2%A1Hola%20Bel%C3%A9n!%20Quiero%20hablar%20sobre%20el%20dise%C3%B1o%20de%20mi%20p%C3%A1gina%20web." 
            target="_blank" 
            rel="noopener noreferrer" 
            data-wa="cta-final"
            style={{ 
              textDecoration: 'none', 
              background: '#673DE6', 
              color: '#FFFFFF', 
              padding: '16px 28px', 
              borderRadius: '6px', 
              fontWeight: 600, 
              fontSize: '16px', 
              textAlign: 'center', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12z" />
            </svg>
            Escribime por WhatsApp
          </a>
        </div>

        {/* Local Landing Pages Links */}
        <div 
          style={{ 
            paddingTop: '28px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px 24px', 
            alignItems: 'center',
            fontSize: '14px', 
            color: '#A9A6B4' 
          }}
        >
          <span style={{ fontWeight: 600, color: '#F4F2EC' }}>Diseño web en:</span>
          <a href="/diseno-web-tigre" style={{ color: '#A48BFF', textDecoration: 'none' }}>Tigre</a>
          <span>·</span>
          <a href="/diseno-web-zona-norte" style={{ color: '#A48BFF', textDecoration: 'none' }}>Zona Norte</a>
          <span>·</span>
          <a href="/diseno-web-caba" style={{ color: '#A48BFF', textDecoration: 'none' }}>CABA</a>
          <span>·</span>
          <a href="/desarrollo-a-medida" style={{ color: '#CFCBD8', textDecoration: 'none' }}>Desarrollo a medida</a>
          <span>·</span>
          <a href="/simulador" style={{ color: '#CFCBD8', textDecoration: 'none' }}>Simulador</a>
          <span>·</span>
          <a href="/blog" style={{ color: '#CFCBD8', textDecoration: 'none' }}>Blog</a>
          <span>·</span>
          <a href="/privacidad" style={{ color: '#8E8B99', textDecoration: 'none' }}>Privacidad</a>
        </div>

        {/* Pages by Niche / Rubro */}
        <div 
          style={{ 
            paddingTop: '16px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '10px 20px', 
            alignItems: 'center',
            fontSize: '14px', 
            color: '#A9A6B4' 
          }}
        >
          <span style={{ fontWeight: 600, color: '#F4F2EC' }}>Por rubro:</span>
          <a href="/pagina-web-para-peluquerias" style={{ color: '#A48BFF', textDecoration: 'none' }}>Peluquerías y barberías</a>
          <span>·</span>
          <a href="/pagina-web-para-talleres-mecanicos" style={{ color: '#A48BFF', textDecoration: 'none' }}>Talleres mecánicos</a>
          <span>·</span>
          <a href="/pagina-web-para-restaurantes" style={{ color: '#A48BFF', textDecoration: 'none' }}>Restaurantes y parrillas</a>
          <span>·</span>
          <a href="/pagina-web-para-consultorios" style={{ color: '#A48BFF', textDecoration: 'none' }}>Consultorios y salud</a>
        </div>

        {/* Social Icons Row (shown only if configured) */}
        {socialItems.length > 0 && (
          <div 
            style={{ 
              paddingTop: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '14px' 
            }}
          >
            <span style={{ fontSize: '13px', color: '#8E8B99', marginRight: '4px' }}>Redes:</span>
            {socialItems.map(item => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid #34313C',
                    background: '#18161E',
                    color: '#A48BFF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#673DE6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#34313C';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>
        )}

        {/* Copyright & Direct Contact */}
        <div 
          style={{ 
            paddingTop: '24px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '16px 36px', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: '13px', 
            color: '#8E8B99',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginTop: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <BrandLogo variant="oscuro" height={26} />
            <span>Primera Cuadra · Diseño web en Tigre, Zona Norte y CABA</span>
          </div>
          <span>11 2877-9641 · {CONTACT_EMAIL}</span>
          <span>Esta web la diseñé y programé yo.</span>
        </div>
      </div>
    </footer>
  );
}
