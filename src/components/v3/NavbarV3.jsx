import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function NavbarV3() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navBg = isDark ? '#121117' : '#F6F5F1';
  const navInk = isDark ? '#F4F2EC' : '#1B1B1B';
  const navLine = isDark ? '#2E2B36' : '#DAD6CD';
  const brandAccent = isDark ? '#A48BFF' : '#5B33D6';

  return (
    <header 
      style={{ 
        background: navBg, 
        borderBottom: `1px solid ${navLine}`,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}
    >
      <nav 
        aria-label="Principal" 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '12px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '12px' 
        }}
      >
        {/* Brand Logo */}
        <a 
          href="/#inicio" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            textDecoration: 'none', 
            color: navInk,
            flexShrink: 0
          }}
        >
          <svg width="34" height="34" viewBox="0 0 30 30" aria-hidden="true" style={{ flexShrink: 0 }}>
            <rect x="0" y="0" width="30" height="30" rx="5" fill="#141414" />
            <rect x="6" y="6" width="18" height="18" rx="1.5" fill="none" stroke="#F4F2EC" strokeWidth="2.2" />
            <rect x="6" y="6" width="8.5" height="8.5" rx="1" fill="#673DE6" />
          </svg>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '19px', fontWeight: 600, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Primera<span style={{ color: brandAccent }}>Cuadra</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div 
          className="pc-desktop-nav"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px', 
            fontFamily: "'Oswald', sans-serif", 
            fontSize: '15px', 
            textTransform: 'uppercase', 
            letterSpacing: '.02em', 
            color: navInk 
          }}
        >
          <a href="/#servicios" style={{ textDecoration: 'none', color: navInk }}>Diseño web</a>
          <a href="/#ejemplos" style={{ textDecoration: 'none', color: navInk }}>Portfolio</a>
          <a href="/#precios" style={{ textDecoration: 'none', color: navInk }}>Precios</a>
          <a href="/#sobre-mi" style={{ textDecoration: 'none', color: navInk }}>Sobre mí</a>
          
          {/* Theme Switcher Button */}
          <button 
            type="button" 
            onClick={toggleTheme} 
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '6px', 
              border: `1px solid ${navLine}`, 
              background: 'transparent', 
              color: navInk, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
              </svg>
            )}
          </button>

          {/* Desktop Contact CTA */}
          <a 
            href="https://wa.me/5491128779641" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              textDecoration: 'none', 
              background: '#673DE6', 
              color: '#FFFFFF', 
              padding: '10px 18px', 
              borderRadius: '6px', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12z" />
            </svg>
            Contacto
          </a>
        </div>

        {/* Mobile Navigation Controls */}
        <div 
          className="pc-mobile-nav" 
          style={{ 
            display: 'none', 
            alignItems: 'center', 
            gap: '8px' 
          }}
        >
          {/* Mobile Theme Toggle */}
          <button 
            type="button" 
            onClick={toggleTheme} 
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} 
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '6px', 
              border: `1px solid ${navLine}`, 
              background: 'transparent', 
              color: navInk, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isDark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
              </svg>
            )}
          </button>

          {/* Mobile WhatsApp Icon Button */}
          <a 
            href="https://wa.me/5491128779641" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Contactar por WhatsApp"
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '6px', 
              background: '#673DE6', 
              color: '#FFFFFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              textDecoration: 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12z" />
            </svg>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'} 
            aria-expanded={mobileMenuOpen}
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '6px', 
              border: `1px solid ${navLine}`, 
              background: 'transparent', 
              color: navInk, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              padding: 0
            }}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          style={{ 
            background: navBg, 
            borderTop: `1px solid ${navLine}`, 
            padding: '16px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '14px',
            fontFamily: "'Oswald', sans-serif", 
            fontSize: '16px', 
            textTransform: 'uppercase', 
            letterSpacing: '.02em'
          }}
        >
          <a 
            href="/#servicios" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Diseño web
          </a>
          <a 
            href="/#ejemplos" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Portfolio
          </a>
          <a 
            href="/#precios" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Precios
          </a>
          <a 
            href="/#sobre-mi" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Sobre mí
          </a>
        </div>
      )}
    </header>
  );
}

