import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import BrandLogo from '../BrandLogo';
import { InstagramIcon, TikTokIcon } from './FooterV3';

export default function NavbarV3() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (window.scrollY > 0) {
      updateProgress();
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = isDark ? '#121117' : '#F6F5F1';
  const navInk = isDark ? '#F4F2EC' : '#1B1B1B';
  const navLine = isDark ? '#2E2B36' : '#DAD6CD';
  const brandAccent = isDark ? '#A48BFF' : '#5B33D6';

  const handleNavClick = (e, sectionId) => {
    if (typeof window === 'undefined') return;
    const isHome = window.location.pathname === '/' || window.location.pathname === '';
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', `/#${sectionId}`);
      }
    }
  };

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
          aria-label="Primera Cuadra - Inicio"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            flexShrink: 0
          }}
        >
          <BrandLogo variant="auto" />
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
          <a href="/#servicios" onClick={(e) => handleNavClick(e, 'servicios')} style={{ textDecoration: 'none', color: navInk }}>Diseño web</a>
          <a href="/#ejemplos" onClick={(e) => handleNavClick(e, 'ejemplos')} style={{ textDecoration: 'none', color: navInk }}>Portfolio</a>
          <a href="/#precios" onClick={(e) => handleNavClick(e, 'precios')} style={{ textDecoration: 'none', color: navInk }}>Precios</a>
          <a href="/blog" style={{ textDecoration: 'none', color: navInk }}>Blog</a>
          <a href="/#sobre-mi" onClick={(e) => handleNavClick(e, 'sobre-mi')} style={{ textDecoration: 'none', color: navInk }}>Sobre mí</a>
          
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
            data-wa="navbar"
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
            data-wa="navbar-mobile"
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
            onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, 'servicios'); }} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Diseño web
          </a>
          <a 
            href="/#ejemplos" 
            onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, 'ejemplos'); }} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Portfolio
          </a>
          <a 
            href="/#precios" 
            onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, 'precios'); }} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Precios
          </a>
          <a 
            href="/blog" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Blog
          </a>
          <a 
            href="/#sobre-mi" 
            onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, 'sobre-mi'); }} 
            style={{ textDecoration: 'none', color: navInk, padding: '6px 0' }}
          >
            Sobre mí
          </a>
          <div style={{ display: 'flex', gap: '16px', paddingTop: '12px', marginTop: '6px', borderTop: `1px solid ${navLine}` }}>
            <a 
              href="https://www.instagram.com/primeracuadraweb/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram @primeracuadraweb"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: brandAccent, textDecoration: 'none', fontSize: '14px', textTransform: 'none', fontWeight: 600 }}
            >
              <InstagramIcon size={17} /> Instagram
            </a>
            <a 
              href="https://www.tiktok.com/@primeracuadraweb" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok @primeracuadraweb"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: brandAccent, textDecoration: 'none', fontSize: '14px', textTransform: 'none', fontWeight: 600 }}
            >
              <TikTokIcon size={17} /> TikTok
            </a>
          </div>
          <div style={{ paddingTop: '8px' }}>
            <a 
              href="/admin" 
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.location.href = '/#admin';
                window.dispatchEvent(new Event('pc-open-admin'));
              }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '7px', 
                color: '#8E8B99', 
                textDecoration: 'none', 
                fontSize: '12px', 
                textTransform: 'none', 
                fontWeight: 500,
                opacity: 0.8
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Acceso Administración</span>
            </a>
          </div>
        </div>
      )}

      {/* 2px purple scroll progress bar */}
      <div className="pc-scroll-progress-bar" aria-hidden="true" />
    </header>
  );
}

