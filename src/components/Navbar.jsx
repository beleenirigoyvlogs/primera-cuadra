import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Sparkles, 
  ChevronDown, 
  Globe, 
  MessageSquare, 
  Menu, 
  X, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  ShoppingBag, 
  Briefcase, 
  Anchor, 
  Smartphone,
  ShieldCheck,
  Zap,
  Flame,
  ArrowRight,
  Search,
  Terminal,
  FileCode2
} from 'lucide-react';

export default function Navbar({ onSelectNiche, onOpenCommandMenu }) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('web');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const defaultWhatsappNumber = '5491128779641';
  const defaultMsg = encodeURIComponent('¡Hola Primera Cuadra! Estuve viendo la web y me gustaría recibir información sobre los packs de diseño web para mi negocio.');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: 'web', name: 'Desarrollo Web Propio', icon: Globe },
    { id: 'maps', name: 'Google Maps Top 3', icon: MapPin },
    { id: 'whatsapp', name: 'WhatsApp Business', icon: MessageSquare },
    { id: 'nautica', name: 'Náuticas & Guarderías', icon: Anchor },
    { id: 'profesional', name: 'Estudios & Profesionales', icon: Briefcase },
    { id: 'comercios', name: 'Comercios & Peluquerías', icon: ShoppingBag }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="container navbar-content">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={() => setMegaMenuOpen(false)}>
          <img src="/logo.jpg" alt="Logo Primera Cuadra" className="brand-logo-img" />
          <div className="brand-title-wrap">
            <span className="brand-title-main">Primera <span>Cuadra</span></span>
            <span className="brand-title-tag">Páginas Web & Presencia Digital</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links">
          {/* Rubros & Servicios dropdown toggle button */}
          <button 
            type="button" 
            className={`nav-item-btn ${megaMenuOpen ? 'active' : ''}`}
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
          >
            <span>Rubros y Servicios</span>
            <ChevronDown size={15} style={{ transform: megaMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          <a href="#pos-sandbox" className="nav-link-item" onClick={() => setMegaMenuOpen(false)}>
            Sandbox POS
          </a>

          <a href="#spec-builder" className="nav-link-item" onClick={() => setMegaMenuOpen(false)}>
            Spec RFC
          </a>

          <a href="#tech-stack" className="nav-link-item" onClick={() => setMegaMenuOpen(false)}>
            Arquitectura
          </a>

          <a href="#demostracion-en-vivo" className="nav-link-item" onClick={() => setMegaMenuOpen(false)}>
            Simulador
          </a>

          <a href="#packs-precios" className="nav-link-item nav-link-pill-tag" onClick={() => setMegaMenuOpen(false)}>
            Packs & Precios
          </a>
        </nav>

        {/* Right Controls: Command Palette Trigger & WhatsApp CTA */}
        <div className="navbar-right-box">
          <button 
            type="button" 
            className="btn-cmd-trigger"
            onClick={onOpenCommandMenu}
            title="Abrir Command Menu (Ctrl+K o /)"
          >
            <Search size={14} />
            <span className="hidden-mobile">Buscar</span>
            <span className="kbd-shortcut font-mono">⌘K</span>
          </button>

          <div className="pill-agent-badge hidden-mobile">
            <Zap size={13} className="text-purple" />
            <span>Entrega 4 Días</span>
          </div>

          <div className="pill-country-tag hidden-mobile-tag">
            <span>🇦🇷 AR</span>
          </div>

          <a 
            href={`https://wa.me/${defaultWhatsappNumber}?text=${defaultMsg}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-nav-cta"
            aria-label="Consultar por WhatsApp"
          >
            <MessageSquare size={16} />
            <span className="btn-nav-cta-text">WhatsApp</span>
            <ArrowUpRight size={14} className="nav-arrow-icon" />
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Hostinger Mega Menu Overlay Panel (Screenshot 2) */}
      {megaMenuOpen && (
        <div className="mega-menu-overlay-panel">
          <div className="mega-menu-card-inner">
            {/* Left Sidebar */}
            <div className="mega-menu-sidebar">
              <div className="mega-menu-kicker">Servicios & Rubros</div>
              <div className="mega-sidebar-list">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`mega-cat-item ${activeCategory === cat.id ? 'active' : ''}`}
                      onMouseEnter={() => setActiveCategory(cat.id)}
                      onClick={() => {
                        if (onSelectNiche && (cat.id === 'nautica' || cat.id === 'profesional')) {
                          onSelectNiche(cat.id);
                        }
                      }}
                    >
                      <Icon size={16} />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle Services Grid */}
            <div className="mega-menu-middle">
              <div className="mega-menu-kicker">Soluciones Integradas</div>
              <div className="mega-services-grid">
                <a href="#demostracion-en-vivo" className="mega-service-card" onClick={() => setMegaMenuOpen(false)}>
                  <div className="service-card-icon">
                    <Globe size={18} />
                  </div>
                  <div className="service-card-text">
                    <strong>Página Web Mobile-First</strong>
                    <p>Diseñada a medida, rápida y con botón de reserva directa.</p>
                  </div>
                </a>

                <a href="#packs-precios" className="mega-service-card" onClick={() => setMegaMenuOpen(false)}>
                  <div className="service-card-icon">
                    <Zap size={18} />
                  </div>
                  <div className="service-card-text">
                    <strong>Dominio Propio Incluido</strong>
                    <p>Tu nombre .com o .com.ar registrado 100% a tu nombre.</p>
                  </div>
                </a>

                <a href="#demostracion-en-vivo" className="mega-service-card" onClick={() => setMegaMenuOpen(false)}>
                  <div className="service-card-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="service-card-text">
                    <strong>Google Maps Top 3</strong>
                    <p>Categoría exacta, fotos de calidad y palabras clave de cercanía.</p>
                  </div>
                </a>

                <a href="#demostracion-en-vivo" className="mega-service-card" onClick={() => setMegaMenuOpen(false)}>
                  <div className="service-card-icon">
                    <MessageSquare size={18} />
                  </div>
                  <div className="service-card-text">
                    <strong>WhatsApp Business Oficial</strong>
                    <p>Catálogo de servicios, precios actualizados y respuesta rápida.</p>
                  </div>
                </a>

                <a href="#como-funciona" className="mega-service-card" onClick={() => setMegaMenuOpen(false)}>
                  <div className="service-card-icon">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="service-card-text">
                    <strong>Garantía 50/50</strong>
                    <p>50% al iniciar y el saldo recién contra entrega conforme.</p>
                  </div>
                </a>

                <a href="#packs-precios" className="mega-service-card" onClick={() => setMegaMenuOpen(false)}>
                  <div className="service-card-icon">
                    <Flame size={18} />
                  </div>
                  <div className="service-card-text">
                    <strong>Pack Express (48hs)</strong>
                    <p>Google Maps + WhatsApp por $120.000 si no necesitás web.</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Promotional Purple Card (Hostinger style) */}
            <div className="mega-promo-card">
              <div>
                <div className="promo-badge-top">
                  <span className="promo-tag-pill">LANZAMIENTO RÁPIDO</span>
                  <ArrowUpRight size={18} />
                </div>

                <div className="promo-visual-box">
                  <span>⇄</span>
                  <span>tu-negocio.com.ar</span>
                </div>

                <div className="promo-text">
                  <strong>Traé tu negocio a la Primera Cuadra</strong>
                  <p>Tu web profesional lista para vender en 4 días hábiles, sin contratos de permanencia.</p>
                </div>
              </div>

              <a 
                href={`https://wa.me/${defaultWhatsappNumber}?text=${defaultMsg}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-promo-action"
                onClick={() => setMegaMenuOpen(false)}
              >
                Comenzar ahora
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)}>¿Cómo funciona?</a>
          <a href="#demostracion-en-vivo" onClick={() => setMobileMenuOpen(false)}>Demostración en Vivo</a>
          <a href="#packs-precios" onClick={() => setMobileMenuOpen(false)}>Packs & Precios</a>
          <a href="#calculadora-oportunidad" onClick={() => setMobileMenuOpen(false)}>Calculadora de Retorno</a>
          <a href="#preguntas-frecuentes" onClick={() => setMobileMenuOpen(false)}>Preguntas Frecuentes</a>
          <a 
            href={`https://wa.me/${defaultWhatsappNumber}?text=${defaultMsg}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-nav-cta"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageSquare size={16} />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}
