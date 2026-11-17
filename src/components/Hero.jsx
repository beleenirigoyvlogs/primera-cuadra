import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Globe, 
  Star, 
  CheckCircle2,
  ExternalLink,
  Phone,
  Scissors,
  Utensils,
  Wrench,
  Stethoscope,
  ChevronRight,
  Store,
  Navigation
} from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

const RUBROS = {
  barberia: {
    id: 'barberia',
    label: 'Barbería & Salón',
    icon: Scissors,
    nameDefault: 'Roma Barber Studio',
    tagline: 'Cortes clásicos, degradé a navaja y perfilado',
    category: 'Barbería Urbana & Estilo',
    address: 'Av. Libertador 1450, Tigre',
    hours: 'Abierto · Cierra 20:30 hs',
    rating: '4.9',
    reviews: '128',
    services: [
      { name: 'Corte Degradé / Fade Pro', price: '$11.000', desc: 'Degradé con navaja, tijera y peinado con producto mate.' },
      { name: 'Ritual de Barba con Toalla Caliente', price: '$8.500', desc: 'Perfilado al detalle, toalla caliente y aceites esenciales.' },
      { name: 'Combo Completo Corte + Barba', price: '$17.500', desc: 'Lavado, corte, perfilado de barba y peinado final.' }
    ],
    cover: '/demos/barberia/hero.webp',
    color: '#eab308'
  },
  parrilla: {
    id: 'parrilla',
    label: 'Gastronomía & Parrilla',
    icon: Utensils,
    nameDefault: 'El Fogón de Tigre',
    tagline: 'Cortes a las brasas y pastas caseras',
    category: 'Parrilla & Bodegón Ribereño',
    address: 'Paseo Victorica 820, Tigre',
    hours: 'Abierto · Cierra 00:30 hs',
    rating: '4.9',
    reviews: '240',
    services: [
      { name: 'Ojo de Bife al Quebracho (500g)', price: '$18.500', desc: 'Corte premium a la parrilla con papas rústicas o ensalada.' },
      { name: 'Parrillada Completa p/ 2 pers.', price: '$34.000', desc: 'Asado, vacío, achuras crocantes y provoleta de campo.' },
      { name: 'Empanadas de Lomo al Disco', price: '$4.200', desc: 'Relleno de lomo cortado a cuchillo con verdeo.' }
    ],
    cover: '/demos/parrilla/hero.webp',
    color: '#ea580c'
  },
  taller: {
    id: 'taller',
    label: 'Taller Mecánico',
    icon: Wrench,
    nameDefault: 'Mecánica Álvarez',
    tagline: 'Diagnóstico computarizado e inyección',
    category: 'Taller Mecánico & Electrónica',
    address: 'Av. Cazón 950, Tigre',
    hours: 'Abierto · Cierra 18:30 hs',
    rating: '4.8',
    reviews: '96',
    services: [
      { name: 'Diagnóstico & Escaneo OBD2', price: '$22.000', desc: 'Chequeo computarizado de inyección, sensores y reporte de fallas.' },
      { name: 'Service Aceite Sintético y 4 Filtros', price: '$85.000', desc: 'Aceite sintético homologado, filtros de aire, aceite, habitáculo y nafta.' },
      { name: 'Frenos y Rectificación', price: '$55.000', desc: 'Pastillas nuevas, rectificación de discos y purgado de líquido.' }
    ],
    cover: '/demos/taller/hero.webp',
    color: '#f59e0b'
  },
  dental: {
    id: 'dental',
    label: 'Salud & Odontología',
    icon: Stethoscope,
    nameDefault: 'Centro Odontológico Delta',
    tagline: 'Odontología integral, implantes y ortodoncia',
    category: 'Consultorio Dental & Estética',
    address: 'Av. Italia 1120, Tigre',
    hours: 'Abierto · Cierra 19:30 hs',
    rating: '5.0',
    reviews: '84',
    services: [
      { name: 'Limpieza Ultrasonido y Profilaxis', price: '$28.000', desc: 'Remoción suave de sarro, placa bacteriana y pulido dental.' },
      { name: 'Blanqueamiento Dental Láser', price: '$95.000', desc: 'Aclarado visible de varios tonos en 1 sesión de 60 minutos.' },
      { name: 'Consulta Diagnóstica Cámara HD', price: '$15.000', desc: 'Revisión integral con cámara intraoral y plan de tratamiento.' }
    ],
    cover: '/demos/dental/hero.webp',
    color: '#0284c7'
  },
  otro: {
    id: 'otro',
    label: 'Otro rubro',
    icon: Store,
    nameDefault: 'Mi Comercio Local',
    tagline: 'Atención personalizada, calidad y confianza',
    category: 'Comercio & Servicios',
    address: 'Av. Principal 500, Tigre',
    hours: 'Abierto · Cierra 20:00 hs',
    rating: '4.9',
    reviews: '75',
    services: [
      { name: 'Asesoramiento y Presupuesto', price: 'Sin cargo', desc: 'Evaluación rápida de lo que necesitás y respuesta en el día.' },
      { name: 'Servicio Estándar de Mostrador', price: '$15.000', desc: 'Atención personalizada para particulares y comercios.' },
      { name: 'Servicio Integral Especializado', price: '$35.000', desc: 'Solución completa con insumos de calidad y garantía.' }
    ],
    cover: '/demos/parrilla/hero.webp',
    color: '#8b5cf6'
  }
};

export default function Hero() {
  const belenWhatsapp = '5491128779641';
  const [selectedRubro, setSelectedRubro] = useState('barberia');
  const [businessName, setBusinessName] = useState('Roma Barber Studio');
  const [activeDeviceTab, setActiveDeviceTab] = useState('web'); // 'web' | 'google' | 'whatsapp'

  const currentRubro = RUBROS[selectedRubro] || RUBROS.barberia;
  const activeName = businessName.trim() || currentRubro.nameDefault;

  // Domain normalization: accents stripped, lowercase, alphanumeric only
  const cleanDomainName = activeName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const activeDomain = cleanDomainName ? `${cleanDomainName}.com.ar` : 'tunegocio.com.ar';

  const heroWaMsg = encodeURIComponent(
    `¡Hola Belén! Estuve probando el simulador en la web para "${activeName}" (${currentRubro.label}) y quiero que armemos mi presencia digital.`
  );

  const handleRubroChange = (key) => {
    setSelectedRubro(key);
    setBusinessName(RUBROS[key].nameDefault);
  };

  return (
    <section className="hero-urban-section" id="hero">
      <div className="container">
        {/* Urban Street Signage Top Kicker */}
        <div className="street-sign-kicker">
          <span className="street-plate-badge">
            <span className="street-plate-number">N° 100</span>
            <span className="street-plate-name">PRIMERA CUADRA</span>
          </span>
          <span className="street-kicker-desc">Presencia digital para comercios, profesionales y empresas</span>
        </div>

        <div className="hero-urban-grid">
          {/* Left Column: Value Proposition & Interactive Customizer */}
          <div className="hero-urban-content">
            <h1 className="hero-urban-title">
              Que tu negocio esté en la <em>primera cuadra</em> de Internet.
            </h1>

            <p className="hero-urban-subtitle">
              Diseño tu página web profesional, optimizo tu ficha en Google Maps y configuro tu WhatsApp Business.
              Una vidriera digital clara, sin tecnicismos y lista en 4 días para que te encuentren y te contacten.
            </p>

            {/* Interactive Simulator Box directly inside Hero */}
            <div className="hero-live-customizer-box">
              <div className="customizer-header-row">
                <span className="customizer-label">
                  <Sparkles size={14} className="text-purple-accent" />
                  <span>Probá cómo se vería tu negocio en vivo:</span>
                </span>
              </div>

              {/* Business Name Input */}
              <div className="customizer-input-wrap">
                <input 
                  type="text" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Escribí el nombre de tu local o negocio..."
                  className="customizer-input"
                  aria-label="Nombre de tu negocio para la simulación"
                  maxLength={40}
                />
              </div>

              {/* Rubro Chips Selector */}
              <div className="customizer-rubros-selector">
                <span className="selector-mini-label">Elegí tu rubro:</span>
                <div className="rubros-chips-row">
                  {Object.keys(RUBROS).map((key) => {
                    const r = RUBROS[key];
                    const IconComp = r.icon;
                    const isSelected = selectedRubro === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`rubro-chip-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleRubroChange(key)}
                      >
                        <IconComp size={14} />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Action Bar */}
              <div className="hero-urban-cta-row">
                <a 
                  href={`https://wa.me/${belenWhatsapp}?text=${heroWaMsg}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-hostinger-primary hero-btn-cta"
                  onClick={() => trackWhatsAppClick('hero_urban_cta', activeName)}
                >
                  <span>Pedir propuesta para mi negocio</span>
                  <ArrowRight size={17} />
                </a>

                <a href="#disenos-ejemplo" className="btn-hostinger-outline hero-btn-examples">
                  <span>Ver webs completas</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="hero-urban-trust-strip">
              <div className="trust-item">
                <Clock size={15} />
                <span>Entrega estimada en 4 días</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={15} />
                <span>50% al iniciar / 50% contra entrega</span>
              </div>
              <div className="trust-item">
                <Zap size={15} />
                <span>Sin costos ocultos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Urban Storefront & Interactive Connected Phone */}
          <div className="hero-urban-mockup-col">
            {/* Storefront Ambient Glow & Signage */}
            <div className="urban-storefront-facade">
              {/* Awning (Toldo de Vidriera Urbana) */}
              <div className="storefront-awning" aria-hidden="true">
                <div className="awning-stripes"></div>
                <div className="awning-valance"></div>
              </div>

              {/* Neon Sign with Typed Business Name */}
              <div className="storefront-neon-sign">
                <span className="neon-light-bullet"></span>
                <span className="neon-business-title">{activeName}</span>
                <span className="neon-status-tag">VIDRIERA DIGITAL ABIERTA</span>
              </div>

              {/* Interactive Phone Device Frame */}
              <div className="urban-device-frame">
                {/* Speaker Notch */}
                <div className="device-top-notch">
                  <span className="notch-speaker"></span>
                  <span className="notch-camera"></span>
                </div>

                {/* Device Interactive Tabs */}
                <div className="device-channel-tabs" role="tablist">
                  <button 
                    type="button"
                    role="tab"
                    aria-selected={activeDeviceTab === 'web'}
                    className={`device-tab-btn ${activeDeviceTab === 'web' ? 'active' : ''}`}
                    onClick={() => setActiveDeviceTab('web')}
                  >
                    <Globe size={13} />
                    <span>1. Web Propia</span>
                  </button>

                  <button 
                    type="button"
                    role="tab"
                    aria-selected={activeDeviceTab === 'google'}
                    className={`device-tab-btn ${activeDeviceTab === 'google' ? 'active' : ''}`}
                    onClick={() => setActiveDeviceTab('google')}
                  >
                    <MapPin size={13} />
                    <span>2. Google Maps</span>
                  </button>

                  <button 
                    type="button"
                    role="tab"
                    aria-selected={activeDeviceTab === 'whatsapp'}
                    className={`device-tab-btn ${activeDeviceTab === 'whatsapp' ? 'active' : ''}`}
                    onClick={() => setActiveDeviceTab('whatsapp')}
                  >
                    <MessageSquare size={13} />
                    <span>3. WhatsApp</span>
                  </button>
                </div>

                {/* Screen Viewport with Real Scroll */}
                <div className="device-screen-scroll-viewport">
                  {/* TAB 1: WEB PROPIA */}
                  {activeDeviceTab === 'web' && (
                    <div className="sim-screen-view sim-view-web">
                      <div className="screen-browser-bar">
                        <span className="browser-dot green"></span>
                        <span className="browser-url-text">https://{activeDomain}</span>
                      </div>

                      <div className="sim-web-hero-cover" style={{ backgroundImage: `url(${currentRubro.cover})` }}>
                        <div className="sim-web-hero-tint">
                          <span className="sim-web-badge">{currentRubro.category}</span>
                          <h2 className="sim-web-name">{activeName}</h2>
                          <p className="sim-web-tagline">{currentRubro.tagline}</p>
                        </div>
                      </div>

                      <div className="sim-web-body">
                        <div className="sim-web-section-heading">
                          <span>Servicios & Tarifas</span>
                        </div>

                        <div className="sim-web-services-list">
                          {currentRubro.services.map((item, idx) => (
                            <div key={idx} className="sim-web-service-row">
                              <div className="sim-service-info">
                                <strong>{item.name}</strong>
                                <span>{item.desc}</span>
                              </div>
                              <span className="sim-service-price">{item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="sim-web-footer-action">
                          <div className="sim-web-wa-btn">
                            <MessageSquare size={14} />
                            <span>Contactar por WhatsApp</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: GOOGLE MAPS */}
                  {activeDeviceTab === 'google' && (
                    <div className="sim-screen-view sim-view-google">
                      <div className="google-search-mockup-header">
                        <span className="google-logo-g">G</span>
                        <span className="google-query-input">{activeName} {currentRubro.label}</span>
                      </div>

                      <div className="google-profile-card">
                        <div className="google-profile-photo" style={{ backgroundImage: `url(${currentRubro.cover})` }}>
                          <span className="google-verified-pill">Verificado</span>
                        </div>

                        <div className="google-profile-details">
                          <h3 className="google-business-title">{activeName}</h3>
                          <div className="google-rating-row">
                            <span className="rating-score">{currentRubro.rating}</span>
                            <div className="stars-row">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={11} fill="#eab308" color="#eab308" />
                              ))}
                            </div>
                            <span className="reviews-count">({currentRubro.reviews})</span>
                            <span className="google-sample-tag">Ejemplo</span>
                          </div>

                          <span className="google-category-tag">{currentRubro.category}</span>
                          
                          <div className="google-data-row">
                            <MapPin size={12} className="text-muted" />
                            <span>{currentRubro.address}</span>
                          </div>

                          <div className="google-data-row">
                            <Clock size={12} className="text-muted" />
                            <span className="status-open">{currentRubro.hours}</span>
                          </div>

                          <div className="google-action-buttons">
                            <div className="g-btn">
                              <Navigation size={12} />
                              <span>Cómo llegar</span>
                            </div>
                            <div className="g-btn">
                              <Globe size={12} />
                              <span>Sitio Web</span>
                            </div>
                            <div className="g-btn g-btn-call">
                              <Phone size={12} />
                              <span>Llamar</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: WHATSAPP BUSINESS */}
                  {activeDeviceTab === 'whatsapp' && (
                    <div className="sim-screen-view sim-view-whatsapp">
                      <div className="wa-top-header">
                        <div className="wa-header-avatar" style={{ backgroundImage: `url(${currentRubro.cover})` }}></div>
                        <div className="wa-header-info">
                          <span className="wa-contact-name">{activeName}</span>
                          <span className="wa-account-type">Cuenta de empresa oficial</span>
                        </div>
                      </div>

                      <div className="wa-chat-canvas">
                        <div className="wa-date-chip">HOY</div>

                        <div className="wa-chat-bubble incoming">
                          <p>
                            ¡Hola! Bienvenido/a a <strong>{activeName}</strong> 👋
                          </p>
                          <p>
                            Te comparto nuestra lista oficial de servicios y tarifas. ¿En qué te puedo ayudar hoy?
                          </p>
                          <span className="wa-time-stamp">10:42 hs</span>
                        </div>

                        <div className="wa-catalog-teaser">
                          <div className="wa-catalog-header">
                            <Store size={13} />
                            <span>Catálogo de servicios</span>
                          </div>
                          {currentRubro.services.slice(0, 2).map((s, idx) => (
                            <div key={idx} className="wa-catalog-item">
                              <span>{s.name}</span>
                              <strong>{s.price}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
