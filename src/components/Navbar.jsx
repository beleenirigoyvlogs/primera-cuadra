import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Menu, 
  X, 
  Globe, 
  MapPin, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const defaultWhatsappNumber = '5491128779641';
  const defaultMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Quisiera consultar sobre el diseño de página web y presencia digital para mi negocio.'
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Demos', href: '#demos' },
    { label: 'Precios', href: '#precios' },
    { label: 'Preguntas', href: '#preguntas' }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="container navbar-content">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/logo.jpg" alt="Logo Primera Cuadra" className="brand-logo-img" />
          <div className="brand-title-wrap">
            <span className="brand-title-main">Primera <span>Cuadra</span></span>
            <span className="brand-title-tag">Páginas Web & Presencia Digital</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="nav-link-item"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="header-right-actions">
          {/* Direct WhatsApp CTA Button */}
          <a 
            href={`https://wa.me/${defaultWhatsappNumber}?text=${defaultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-cta btn-nav-wa"
          >
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a 
            href={`https://wa.me/${defaultWhatsappNumber}?text=${defaultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              background: '#25d366', 
              color: '#ffffff', 
              padding: '12px', 
              borderRadius: '8px',
              fontWeight: 700,
              marginTop: '10px'
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageSquare size={18} />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}
