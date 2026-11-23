import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Monitor,
  Smartphone,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Video,
  Sun,
  Moon,
  ExternalLink,
  Layers,
  Palette
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';
import { 
  TEMPLATES, 
  LN, 
  SN, 
  LD, 
  generateSiteHtml 
} from '../utils/templateEngine';

// Quick business presets for 1-click demonstration
const PRESETS = [
  {
    id: 'panaderia',
    icon: '🥖',
    label: 'Panadería / Confitería',
    data: {
      nm: 'Panadería La Esquina',
      rb: 'Panadería Artesanal & Confitería',
      zn: 'Tigre Centro, Buenos Aires',
      wa: '11 2345 6789',
      tg: 'Pan hecho todos los días, como en casa',
      ds: 'Hace más de 20 años horneando recetas tradicionales con masa madre e ingredientes de primera calidad para todo el barrio.',
      it: 'Pan artesanal de masa madre | Horneado fresco cada mañana\nFacturas de manteca | Docena y media docena surtida\nTortas artesanales por encargue | Con 48 hs de anticipación\nSandwiches de miga triples | Jamón cocido natural y queso',
      hr: 'Lunes a sábados de 7:30 a 20:30 h · Domingos de 8 a 13:30 h'
    }
  },
  {
    id: 'peluqueria',
    icon: '💈',
    label: 'Peluquería / Barbería',
    data: {
      nm: 'Studio Juanita & Barbería',
      rb: 'Peluquería de Diseño & Colorimetría',
      zn: 'Palermo Soho, CABA',
      wa: '11 4567 8901',
      tg: 'Estilismo personalizado y color de vanguardia',
      ds: 'Espacio dedicado al cuidado capilar, cortes modernos y tratamientos de nutrición profunda con primeras marcas internacionales.',
      it: 'Corte de diseño femenino y masculino | Incluye lavado y peinado\nColorimetría avanzada y balayage | Matiz y nutrición profunda\nTratamiento botox capilar reconstituyente | Brillo y antifrizz por 60 días\nPeinados y maquillaje para eventos | Asesoramiento previo',
      hr: 'Martes a sábados de 10:00 a 20:00 h'
    }
  },
  {
    id: 'gastronomia',
    icon: '🍕',
    label: 'Gastronomía / Pizzería',
    data: {
      nm: 'Don Antonio Pizzería',
      rb: 'Pizzería & Empanadas a la Leña',
      zn: 'San Isidro, Buenos Aires',
      wa: '11 5678 9012',
      tg: 'Masa fermentada 48 hs al horno de quebracho',
      ds: 'Auténtica pizza napolitana con salsa de tomates seleccionados, muzzarella hilada fresca y empanadas cortadas a cuchillo.',
      it: 'Pizza Margherita tradicional | Mozzarella fior di latte y albahaca fresca\nFugazzeta rellena con jamón | 1 kg de puro queso y cebollas caramelizadas\nEmpanadas de carne suave a cuchillo | Masa casera y horneadas al momento\nPostre clásico Tiramisú artesanal | Con café espresso y mascarpone',
      hr: 'Martes a domingos de 19:30 a 00:00 h'
    }
  },
  {
    id: 'taller',
    icon: '🔧',
    label: 'Taller Mecánico',
    data: {
      nm: 'Mecánica Integral Norte',
      rb: 'Taller Mecánico & Inyección Electrónica',
      zn: 'Vicente López, Buenos Aires',
      wa: '11 6789 0123',
      tg: 'Diagnóstico computarizado y mecánica de precisión',
      ds: 'Servicio técnico automotor multimarca con instrumental de escaneo oficial, repuestos originales y garantía escrita en cada trabajo.',
      it: 'Service de aceite, filtros y chequeo de 25 puntos | Repuestos originales\nDiagnóstico computarizado con scanner | Informe técnico detallado\nFrenos, tren delantero y suspensión | Repuestos homologados\nDistribución y mecánica general de motor | Presupuesto en el día sin cargo',
      hr: 'Lunes a viernes de 8:00 a 18:30 h'
    }
  },
  {
    id: 'salud',
    icon: '🩺',
    label: 'Consultorio / Salud',
    data: {
      nm: 'Centro Odontológico San Lucas',
      rb: 'Odontología Integral & Estética Dental',
      zn: 'Belgrano, CABA',
      wa: '11 7890 1234',
      tg: 'Cuidamos tu sonrisa con tecnología digital',
      ds: 'Atención odontológica integral para adultos y niños con equipamiento de última generación en un entorno cómodo y amigable.',
      it: 'Limpieza profunda con ultrasonido y pulido | Profilaxis express\nOrtodoncia invisible con alineadores | Planificación 3D digital\nImplantes dentales y prótesis fija | Cirugía mínimamente invasiva\nBlanqueamiento dental led en consultorio | Resultados en una sesión',
      hr: 'Lunes a viernes de 9:00 a 19:30 h'
    }
  }
];

export default function SimulatorPage() {
  useScrollReveal();
  const { isDark, toggleTheme } = useTheme();
  const whatsappNumber = '5491128779641';

  // Business Data State (matching the exact schema)
  const [businessData, setBusinessData] = useState({
    nm: 'Panadería La Esquina',
    rb: 'Panadería Artesanal & Confitería',
    zn: 'Tigre Centro, Buenos Aires',
    wa: '11 2345 6789',
    tg: 'Pan hecho todos los días, como en casa',
    ds: 'Hace más de 20 años horneando recetas tradicionales con masa madre e ingredientes de primera calidad para todo el barrio.',
    it: 'Pan artesanal de masa madre | Horneado fresco cada mañana\nFacturas de manteca | Docena y media docena surtida\nTortas artesanales por encargue | Con 48 hs de anticipación\nSandwiches de miga triples | Jamón cocido natural y queso',
    hr: 'Lunes a sábados de 7:30 a 20:30 h · Domingos de 8 a 13:30 h',
    vu: ''
  });

  const [videoFileName, setVideoFileName] = useState('');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenDevice, setFullScreenDevice] = useState('desktop');
  const [filterStyle, setFilterStyle] = useState('all');

  const carouselRef = useRef(null);
  const iframeRef = useRef(null);
  const modalIframeRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Simulador de Diseño Web Interactivo | Primera Cuadra';
  }, []);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    if (filterStyle === 'all') return TEMPLATES;
    return TEMPLATES.filter((t) => t.s === parseInt(filterStyle, 10));
  }, [filterStyle]);

  const activeTemplate = TEMPLATES[selectedTemplateIndex] || TEMPLATES[0];

  // Video local upload handler
  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (businessData.vu && businessData.vu.startsWith('blob:')) {
        URL.revokeObjectURL(businessData.vu);
      }
      const blobUrl = URL.createObjectURL(file);
      setBusinessData((prev) => ({ ...prev, vu: blobUrl }));
      setVideoFileName(file.name);
    }
  };

  const handleRemoveVideo = (e) => {
    e.stopPropagation();
    if (businessData.vu && businessData.vu.startsWith('blob:')) {
      URL.revokeObjectURL(businessData.vu);
    }
    setBusinessData((prev) => ({ ...prev, vu: '' }));
    setVideoFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Update iframe contents whenever template or business data changes
  useEffect(() => {
    if (iframeRef.current && activeTemplate) {
      iframeRef.current.srcdoc = generateSiteHtml(activeTemplate, businessData);
    }
    if (modalIframeRef.current && activeTemplate && isFullScreen) {
      modalIframeRef.current.srcdoc = generateSiteHtml(activeTemplate, businessData);
    }
  }, [activeTemplate, businessData, isFullScreen]);

  // Carousel scrolling helpers
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // WhatsApp conversion message
  const whatsappCtaUrl = useMemo(() => {
    const text = encodeURIComponent(
      `¡Hola Primera Cuadra! Estuve probando el simulador en su web con mi negocio "${businessData.nm}" (${businessData.rb}) y me gustó la plantilla "${activeTemplate?.n}". ¿Podemos coordinar para hacerla?`
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }, [businessData.nm, businessData.rb, activeTemplate?.n, whatsappNumber]);

  return (
    <div className={`simulator-standalone-page ${isDark ? 'dark-mode' : 'light-mode'}`}>
      {/* ---------------------------------------------------- */}
      {/* 1. STANDALONE NAVBAR */}
      {/* ---------------------------------------------------- */}
      <header className="sim-standalone-navbar">
        <div className="container sim-navbar-inner">
          <div className="sim-navbar-brand-group">
            <a href="/" className="sim-btn-back-home" title="Volver a la página principal">
              <ArrowLeft size={16} />
              <span>Volver a la web</span>
            </a>
            <div className="sim-brand-separator" aria-hidden="true" />
            <a href="/" className="sim-brand-logo-link" aria-label="Primera Cuadra">
              <BrandLogo variant="auto" height={28} />
              <div className="sim-brand-text">
                <span className="sim-tool-tag" style={{ marginLeft: '10px' }}>
                  <Sparkles size={11} />
                  <span>SIMULADOR EN VIVO</span>
                </span>
              </div>
            </a>
          </div>

          <div className="sim-navbar-actions">
            <button 
              onClick={toggleTheme}
              className="sim-theme-toggle-btn"
              title="Cambiar tema claro / oscuro"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a 
              href={whatsappCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sim-navbar-wa"
            >
              <MessageSquare size={15} />
              <span>Consultar por WhatsApp</span>
            </a>
            <a href="/#precios" className="btn-sim-navbar-cta">
              <span>Ver Planes</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. HERO HEADER */}
      {/* ---------------------------------------------------- */}
      <section className="sim-standalone-hero">
        <div className="container">
          <div className="sim-hero-center">
            <div className="sim-kicker-badge">
              <Sparkles size={14} />
              <span>HERRAMIENTA INTERACTIVA OFICIAL</span>
            </div>
            <h1 className="sim-hero-title">
              Simulador de <span className="highlight-purple">Diseño Web</span>
            </h1>
            <p className="sim-hero-subtitle">
              Completá los datos de tu comercio y navegá nuestro carrusel de plantillas interactivas para elegir y visualizar tu página web en tiempo real antes de contratar.
            </p>

            <div className="sim-hero-trust-bar">
              <div className="sim-trust-item">
                <Clock size={15} className="text-purple-icon" />
                <span>Entrega estimada en 4 días hábiles</span>
              </div>
              <div className="sim-trust-item">
                <ShieldCheck size={15} className="text-purple-icon" />
                <span>50% al iniciar / 50% contra entrega</span>
              </div>
              <div className="sim-trust-item">
                <CheckCircle2 size={15} className="text-purple-icon" />
                <span>Dominio propio (.com / .com.ar) incluido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. MAIN UNIFIED SIMULATOR CORE */}
      {/* ---------------------------------------------------- */}
      <main className="sim-interactive-section">
        <div className="container">

          {/* Quick Preset Selector */}
          <div className="sim-presets-bar">
            <span className="sim-presets-title">Ejemplos rápidos con 1 clic:</span>
            <div className="sim-presets-scroll">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setBusinessData({ ...p.data, vu: businessData.vu })}
                  className="sim-preset-pill"
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sim-main-grid">

            {/* Left Column: Business Data Form */}
            <div className="sim-form-column">
              <div className="sim-card-box">
                <div className="sim-card-header">
                  <div className="sim-card-header-badge">
                    <Sparkles size={14} />
                    <span>Configuración en vivo</span>
                  </div>
                  <h2 className="sim-card-title">Datos del comercio</h2>
                  <p className="sim-card-desc">
                    Modificá cualquier campo y mirá cómo la plantilla se actualiza al instante.
                  </p>
                </div>

                <div className="sim-form-grid">
                  <div>
                    <label className="sim-label">Nombre del comercio</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Panadería La Esquina"
                      value={businessData.nm}
                      onChange={(e) => setBusinessData({ ...businessData, nm: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="sim-label">Rubro</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Panadería, Peluquería, Ferretería"
                      value={businessData.rb}
                      onChange={(e) => setBusinessData({ ...businessData, rb: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="sim-label">Zona / ciudad</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Tigre, Buenos Aires"
                      value={businessData.zn}
                      onChange={(e) => setBusinessData({ ...businessData, zn: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="sim-label">WhatsApp</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: 11 2345 6789"
                      value={businessData.wa}
                      onChange={(e) => setBusinessData({ ...businessData, wa: e.target.value })}
                    />
                  </div>

                  <div className="full-col">
                    <label className="sim-label">Frase principal (opcional)</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Pan hecho todos los días, como en casa"
                      value={businessData.tg}
                      onChange={(e) => setBusinessData({ ...businessData, tg: e.target.value })}
                    />
                  </div>

                  <div className="full-col">
                    <label className="sim-label">Descripción corta (opcional)</label>
                    <textarea 
                      className="sim-textarea"
                      rows={2}
                      placeholder="Ej: Hace más de 20 años horneando recetas tradicionales para el barrio."
                      value={businessData.ds}
                      onChange={(e) => setBusinessData({ ...businessData, ds: e.target.value })}
                    />
                  </div>

                  <div className="full-col">
                    <label className="sim-label">
                      Qué ofrecen — uno por línea, con detalle opcional después de “|”
                    </label>
                    <textarea 
                      className="sim-textarea"
                      rows={4}
                      placeholder="Pan artesanal | Masa madre, horneado fresco&#10;Facturas de manteca | Docena surtida&#10;Tortas por encargo | Con 48 hs de anticipación"
                      value={businessData.it}
                      onChange={(e) => setBusinessData({ ...businessData, it: e.target.value })}
                    />
                  </div>

                  <div className="full-col">
                    <label className="sim-label">Horario</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Lunes a sábados de 8 a 20 h"
                      value={businessData.hr}
                      onChange={(e) => setBusinessData({ ...businessData, hr: e.target.value })}
                    />
                  </div>

                  <div className="full-col">
                    <label className="sim-label">Video del comercio (opcional, para las webs animadas)</label>
                    <div className="sim-video-uploader" onClick={() => fileInputRef.current?.click()}>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="video/*" 
                        style={{ display: 'none' }}
                        onChange={handleVideoUpload}
                      />
                      <div className="sim-video-uploader-left">
                        <Video size={20} className="text-purple-icon" />
                        <div>
                          <div className="sim-video-name">
                            {videoFileName ? videoFileName : 'Subir un video desde tu dispositivo'}
                          </div>
                          <div className="sim-video-hint">
                            {videoFileName ? 'Video en memoria listo para la plantilla' : 'MP4, WebM o MOV (vive sólo en tu navegador)'}
                          </div>
                        </div>
                      </div>
                      {videoFileName ? (
                        <button type="button" onClick={handleRemoveVideo} className="sim-btn-remove-video">
                          Quitar
                        </button>
                      ) : (
                        <span className="sim-btn-upload-badge">
                          <Upload size={14} />
                          <span>Seleccionar</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Carousel + Interactive Live Preview */}
            <div className="sim-preview-column">

              {/* Template Carousel Container */}
              <div className="sim-carousel-wrapper">
                <div className="sim-carousel-top">
                  <div className="sim-carousel-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={16} className="text-purple-icon" />
                      <span className="sim-carousel-heading">Catálogo de 50 Plantillas Web</span>
                    </div>
                    <span className="sim-carousel-count">
                      Plantilla <strong>{selectedTemplateIndex + 1}</strong> de {TEMPLATES.length}
                    </span>
                  </div>

                  <div className="sim-carousel-arrows">
                    <button 
                      type="button" 
                      onClick={() => scrollCarousel('left')} 
                      className="sim-arrow-btn"
                      aria-label="Plantilla anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => scrollCarousel('right')} 
                      className="sim-arrow-btn"
                      aria-label="Siguiente plantilla"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Filter pills */}
                <div className="sim-filters-strip">
                  {[
                    { id: 'all', label: 'Todas las 50' },
                    { id: '1', label: 'Clásico' },
                    { id: '2', label: 'Moderno Oscuro' },
                    { id: '3', label: 'Cálido' },
                    { id: '4', label: 'Vibrante' },
                    { id: '5', label: 'Lujo' },
                    { id: '7', label: 'Tecnológico' },
                    { id: '9', label: 'Minimalista' },
                    { id: '10', label: 'Fresco' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilterStyle(f.id)}
                      className={`sim-filter-btn ${filterStyle === f.id ? 'active' : ''}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Horizontal Sliding Carousel Track */}
                <div ref={carouselRef} className="sim-carousel-track">
                  {filteredTemplates.map((tpl) => {
                    const globalIdx = TEMPLATES.findIndex((item) => item.k === tpl.k);
                    const isSelected = globalIdx === selectedTemplateIndex;

                    return (
                      <div
                        key={tpl.k}
                        onClick={() => setSelectedTemplateIndex(globalIdx)}
                        className={`sim-carousel-card ${isSelected ? 'selected' : ''}`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedTemplateIndex(globalIdx); }}
                      >
                        <div className="sim-carousel-card-inner">
                          <div className="sim-card-num-badge">#{tpl.k}</div>
                          <div className="sim-card-title-text">{tpl.n}</div>
                          <div className="sim-card-tags">
                            <span className="sim-tag-structure">{LN[tpl.l - 1]}</span>
                            <span className="sim-tag-style">{SN[tpl.s - 1]}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="sim-selected-badge">
                            <CheckCircle2 size={13} />
                            <span>Viendo en vivo</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Preview Window Frame */}
              <div className="sim-browser-frame">
                {/* Browser Topbar Header */}
                <div className="sim-browser-topbar">
                  <div className="sim-browser-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>

                  <div className="sim-browser-url-pill">
                    <span className="sim-browser-lock">🔒</span>
                    <span className="sim-browser-url-text">
                      https://{businessData.nm ? businessData.nm.toLowerCase().replace(/[^a-z0-9]/g, '') : 'tunegocio'}.primeracuadra.com.ar
                    </span>
                  </div>

                  <div className="sim-browser-controls">
                    <div className="sim-device-toggle">
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('desktop')}
                        className={`sim-dev-btn ${previewDevice === 'desktop' ? 'active' : ''}`}
                        title="Ver versión Escritorio"
                      >
                        <Monitor size={15} />
                        <span className="hide-mobile">Escritorio</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('mobile')}
                        className={`sim-dev-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
                        title="Ver versión Móvil (390 px)"
                      >
                        <Smartphone size={15} />
                        <span className="hide-mobile">Móvil</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFullScreen(true)}
                      className="sim-fullscreen-btn"
                      title="Abrir a pantalla completa"
                    >
                      <Maximize2 size={15} />
                      <span className="hide-mobile">Pantalla completa</span>
                    </button>
                  </div>
                </div>

                {/* Browser Stage Content */}
                <div className="sim-browser-stage">
                  <div className={`sim-browser-viewport ${previewDevice}`}>
                    <iframe 
                      ref={iframeRef}
                      title={`Previsualización plantilla ${activeTemplate?.n}`}
                      className="sim-iframe"
                    />
                  </div>
                </div>

                {/* Bottom Conversion Action Bar */}
                <div className="sim-browser-actionbar">
                  <div className="sim-actionbar-info">
                    <div className="sim-actionbar-name">{activeTemplate?.n}</div>
                    <div className="sim-actionbar-meta">
                      Estructura: <strong>{LN[activeTemplate?.l - 1]}</strong> · Estilo: <strong>{SN[activeTemplate?.s - 1]}</strong>
                    </div>
                  </div>

                  <a 
                    href={whatsappCtaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sim-btn-hire-whatsapp"
                  >
                    <MessageSquare size={16} />
                    <span>Quiero esta web para mi negocio</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ---------------------------------------------------- */}
      {/* 4. FULLSCREEN PREVIEW MODAL */}
      {/* ---------------------------------------------------- */}
      {isFullScreen && (
        <div className="sim-fullscreen-overlay">
          <div className="sim-fullscreen-header">
            <div className="sim-fullscreen-title-group">
              <BrandLogo variant="auto" height={22} />
              <div className="sim-fs-divider" />
              <span className="sim-fs-name">{activeTemplate?.n}</span>
              <span className="sim-fs-tag">{businessData.nm}</span>
            </div>

            <div className="sim-fullscreen-actions">
              <div className="sim-device-toggle">
                <button
                  type="button"
                  onClick={() => setFullScreenDevice('desktop')}
                  className={`sim-dev-btn ${fullScreenDevice === 'desktop' ? 'active' : ''}`}
                >
                  <Monitor size={15} />
                  <span>Escritorio</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFullScreenDevice('mobile')}
                  className={`sim-dev-btn ${fullScreenDevice === 'mobile' ? 'active' : ''}`}
                >
                  <Smartphone size={15} />
                  <span>Móvil (390 px)</span>
                </button>
              </div>

              <a 
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sim-btn-hire-whatsapp mini"
              >
                <MessageSquare size={14} />
                <span>Pedir esta web</span>
              </a>

              <button 
                type="button"
                onClick={() => setIsFullScreen(false)}
                className="sim-close-modal-btn"
                aria-label="Cerrar pantalla completa"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="sim-fullscreen-body">
            <div className={`sim-fullscreen-viewport ${fullScreenDevice}`}>
              <iframe 
                ref={modalIframeRef}
                title={`Pantalla completa ${activeTemplate?.n}`}
                className="sim-fullscreen-iframe"
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 5. BOTTOM CONVERSION BANNER */}
      {/* ---------------------------------------------------- */}
      <section className="sim-standalone-bottom-cta">
        <div className="container">
          <div className="sim-bottom-cta-card">
            <div className="sim-bottom-cta-info">
              <span className="sim-bottom-badge">¿TE GUSTÓ LO QUE VISTE?</span>
              <h2 className="sim-bottom-title">Hacé realidad la página web de tu negocio</h2>
              <p className="sim-bottom-desc">
                Desarrollo tu web profesional llave en mano con dominio propio, optimización para celulares y catálogo de WhatsApp. Sin alquileres forzados: la web y el dominio son 100% tuyos.
              </p>
            </div>
            <div className="sim-bottom-cta-actions">
              <a 
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hostinger-primary btn-sim-bottom-main"
              >
                <MessageSquare size={18} />
                <span>Quiero mi página web</span>
                <ArrowRight size={18} />
              </a>
              <a href="/" className="btn-sim-bottom-back">
                <ArrowLeft size={16} />
                <span>Volver al sitio principal</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer className="sim-standalone-footer">
        <div className="container sim-footer-inner">
          <p>© {new Date().getFullYear()} Primera Cuadra. Diseño web profesional para comercios y desarrollo a medida.</p>
          <div className="sim-footer-links">
            <a href="/">Inicio</a>
            <a href="/#servicios">Servicios</a>
            <a href="/#desarrollo-a-medida">Desarrollo a Medida</a>
            <a href="/#precios">Precios</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* Embedded Component Styles */}
      <style>{`
        .simulator-standalone-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #F9FAFB;
          color: #111827;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .simulator-standalone-page.dark-mode {
          background: #0D0C11;
          color: #F3F4F6;
        }

        .sim-theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(164, 139, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sim-theme-toggle-btn:hover {
          border-color: #7C3AED;
          color: #7C3AED;
          background: rgba(124, 58, 237, 0.1);
        }

        .sim-interactive-section {
          padding: 20px 0 60px;
          flex: 1;
        }

        .sim-presets-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(164, 139, 255, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }
        .dark-mode .sim-presets-bar {
          background: rgba(21, 19, 30, 0.7);
          border-color: rgba(164, 139, 255, 0.15);
        }
        .sim-presets-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #7C3AED;
          white-space: nowrap;
        }
        .sim-presets-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .sim-presets-scroll::-webkit-scrollbar { display: none; }
        .sim-preset-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 50px;
          border: 1px solid rgba(164, 139, 255, 0.25);
          background: rgba(124, 58, 237, 0.06);
          color: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .sim-preset-pill:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
          transform: translateY(-1px);
        }

        .sim-main-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .sim-main-grid {
            grid-template-columns: 1fr;
          }
        }

        .sim-card-box {
          background: #FFFFFF;
          border: 1px solid rgba(164, 139, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }
        .dark-mode .sim-card-box {
          background: #14131A;
          border-color: rgba(164, 139, 255, 0.15);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }
        .sim-card-header {
          margin-bottom: 20px;
        }
        .sim-card-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(124, 58, 237, 0.1);
          color: #7C3AED;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .sim-card-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 0 6px;
        }
        .sim-card-desc {
          font-size: 0.85rem;
          color: #6B7280;
          margin: 0;
        }
        .dark-mode .sim-card-desc {
          color: #9CA3AF;
        }

        .sim-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .sim-form-grid .full-col {
          grid-column: 1 / -1;
        }
        .sim-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 5px;
          color: #374151;
        }
        .dark-mode .sim-label {
          color: #D1D5DB;
        }
        .sim-input, .sim-textarea {
          width: 100%;
          padding: 9px 12px;
          border-radius: 8px;
          border: 1px solid rgba(164, 139, 255, 0.25);
          background: #F9FAFB;
          color: inherit;
          font-size: 0.88rem;
          font-family: inherit;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .dark-mode .sim-input, .dark-mode .sim-textarea {
          background: #1C1A24;
          border-color: rgba(255, 255, 255, 0.1);
        }
        .sim-input:focus, .sim-textarea:focus {
          outline: none;
          border-color: #7C3AED;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
        }

        .sim-video-uploader {
          border: 2px dashed rgba(164, 139, 255, 0.3);
          border-radius: 10px;
          padding: 12px 14px;
          background: rgba(124, 58, 237, 0.03);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          transition: all 0.2s ease;
        }
        .sim-video-uploader:hover {
          border-color: #7C3AED;
          background: rgba(124, 58, 237, 0.08);
        }
        .sim-video-uploader-left {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
        }
        .sim-video-name {
          font-size: 0.85rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sim-video-hint {
          font-size: 0.72rem;
          color: #6B7280;
        }
        .dark-mode .sim-video-hint { color: #9CA3AF; }
        .sim-btn-upload-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          border-radius: 6px;
          background: #7C3AED;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
        }
        .sim-btn-remove-video {
          padding: 4px 8px;
          border-radius: 4px;
          background: #EF4444;
          color: #FFFFFF;
          border: none;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* Carousel Styles */
        .sim-carousel-wrapper {
          background: #FFFFFF;
          border: 1px solid rgba(164, 139, 255, 0.2);
          border-radius: 16px;
          padding: 18px 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }
        .dark-mode .sim-carousel-wrapper {
          background: #14131A;
          border-color: rgba(164, 139, 255, 0.15);
        }
        .sim-carousel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .sim-carousel-heading {
          font-size: 1.05rem;
          font-weight: 800;
        }
        .sim-carousel-count {
          font-size: 0.85rem;
          color: #6B7280;
        }
        .dark-mode .sim-carousel-count { color: #9CA3AF; }
        .sim-carousel-arrows {
          display: flex;
          gap: 8px;
        }
        .sim-arrow-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(164, 139, 255, 0.25);
          background: rgba(124, 58, 237, 0.06);
          color: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sim-arrow-btn:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
        }

        .sim-filters-strip {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          margin-bottom: 14px;
          padding-bottom: 2px;
        }
        .sim-filters-strip::-webkit-scrollbar { display: none; }
        .sim-filter-btn {
          padding: 5px 12px;
          border-radius: 50px;
          border: 1px solid rgba(164, 139, 255, 0.2);
          background: transparent;
          color: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .sim-filter-btn.active, .sim-filter-btn:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
        }

        .sim-carousel-track {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 4px 2px 10px;
          scrollbar-width: thin;
        }
        .sim-carousel-card {
          flex: 0 0 220px;
          background: #F9FAFB;
          border: 2px solid rgba(164, 139, 255, 0.2);
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: all 0.2s ease;
          user-select: none;
        }
        .dark-mode .sim-carousel-card {
          background: #1C1A24;
          border-color: rgba(255, 255, 255, 0.08);
        }
        .sim-carousel-card:hover {
          border-color: #7C3AED;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.12);
        }
        .sim-carousel-card.selected {
          border-color: #7C3AED;
          background: rgba(124, 58, 237, 0.08);
          box-shadow: 0 0 0 2px #7C3AED, 0 8px 20px rgba(124, 58, 237, 0.2);
        }
        .sim-card-num-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: #7C3AED;
          margin-bottom: 4px;
        }
        .sim-card-title-text {
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1.25;
        }
        .sim-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .sim-tag-structure, .sim-tag-style {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(124, 58, 237, 0.1);
          color: #7C3AED;
        }
        .sim-selected-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #10B981;
          margin-top: 10px;
        }

        /* Browser Window Frame */
        .sim-browser-frame {
          background: #FFFFFF;
          border: 1px solid rgba(164, 139, 255, 0.25);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }
        .dark-mode .sim-browser-frame {
          background: #14131A;
          border-color: rgba(164, 139, 255, 0.2);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }
        .sim-browser-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #F3F4F6;
          border-bottom: 1px solid rgba(164, 139, 255, 0.15);
          gap: 12px;
        }
        .dark-mode .sim-browser-topbar {
          background: #1C1A24;
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }
        .sim-browser-dots {
          display: flex;
          gap: 6px;
        }
        .sim-browser-dots .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .sim-browser-dots .dot.red { background: #EF4444; }
        .sim-browser-dots .dot.yellow { background: #F59E0B; }
        .sim-browser-dots .dot.green { background: #10B981; }

        .sim-browser-url-pill {
          flex: 1;
          max-width: 440px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 6px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          font-size: 0.78rem;
          color: #4B5563;
          overflow: hidden;
        }
        .dark-mode .sim-browser-url-pill {
          background: #14131A;
          border-color: rgba(255, 255, 255, 0.08);
          color: #9CA3AF;
        }
        .sim-browser-url-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sim-browser-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sim-device-toggle {
          display: flex;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px;
        }
        .dark-mode .sim-device-toggle {
          background: rgba(255, 255, 255, 0.06);
        }
        .sim-dev-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: inherit;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .sim-dev-btn.active {
          background: #7C3AED;
          color: #FFFFFF;
          box-shadow: 0 1px 4px rgba(124, 58, 237, 0.3);
        }
        .sim-fullscreen-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid rgba(164, 139, 255, 0.25);
          background: rgba(124, 58, 237, 0.06);
          color: inherit;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .sim-fullscreen-btn:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
        }

        .sim-browser-stage {
          background: #E5E7EB;
          min-height: 620px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow: hidden;
        }
        .dark-mode .sim-browser-stage {
          background: #0B0A0E;
        }
        .sim-browser-viewport {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 620px;
          background: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        .sim-browser-viewport.desktop {
          width: 100%;
        }
        .sim-browser-viewport.mobile {
          width: 390px;
          height: 640px;
          border: 8px solid #1F2937;
          border-radius: 36px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }
        .sim-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .sim-browser-actionbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: #FFFFFF;
          border-top: 1px solid rgba(164, 139, 255, 0.15);
          gap: 16px;
          flex-wrap: wrap;
        }
        .dark-mode .sim-browser-actionbar {
          background: #14131A;
          border-top-color: rgba(255, 255, 255, 0.08);
        }
        .sim-actionbar-name {
          font-size: 1.05rem;
          font-weight: 800;
        }
        .sim-actionbar-meta {
          font-size: 0.82rem;
          color: #6B7280;
        }
        .dark-mode .sim-actionbar-meta { color: #9CA3AF; }
        .sim-btn-hire-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 50px;
          background: #25D366;
          color: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          transition: all 0.2s ease;
        }
        .sim-btn-hire-whatsapp:hover {
          background: #1EBE5D;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
        }

        /* Fullscreen Modal */
        .sim-fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background: #0D0C11;
          display: flex;
          flex-direction: column;
        }
        .sim-fullscreen-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: #14131A;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .sim-fullscreen-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sim-fs-divider {
          width: 1px;
          height: 18px;
          background: rgba(255, 255, 255, 0.15);
        }
        .sim-fs-name {
          font-weight: 800;
          font-size: 0.95rem;
          color: #F4F2EC;
        }
        .sim-fs-tag {
          font-size: 0.78rem;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(124, 58, 237, 0.2);
          color: #A48BFF;
          font-weight: 600;
        }
        .sim-fullscreen-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sim-close-modal-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .sim-close-modal-btn:hover {
          background: #EF4444;
          border-color: #EF4444;
        }
        .sim-fullscreen-body {
          flex: 1;
          background: #08070A;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          overflow: hidden;
        }
        .sim-fullscreen-viewport.desktop {
          width: 100%;
          height: 100%;
        }
        .sim-fullscreen-viewport.mobile {
          width: 390px;
          height: 94%;
          border: 8px solid #27272A;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }
        .sim-fullscreen-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        @media (max-width: 768px) {
          .hide-mobile { display: none; }
          .sim-presets-bar { flex-direction: column; align-items: flex-start; }
          .sim-browser-actionbar { flex-direction: column; align-items: stretch; }
          .sim-btn-hire-whatsapp { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
