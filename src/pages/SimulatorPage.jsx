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
  Check,
  Layers,
  Edit3
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';
import { 
  TEMPLATES, 
  LN, 
  SN, 
  generateSiteHtml 
} from '../utils/templateEngine';

// Thumbnail card for carousel with live iframe preview
function CarouselCard({ template, businessData, isSelected, onSelect }) {
  const cardRef = useRef(null);
  const iframeRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRendered(true);
            observer.unobserve(cardEl);
          }
        });
      },
      { rootMargin: '300px' }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isRendered && iframeRef.current) {
      iframeRef.current.srcdoc = generateSiteHtml(template, businessData);
    }
  }, [isRendered, template, businessData]);

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(template.k)}
      className={`sim-carousel-card ${isSelected ? 'selected' : ''}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(template.k); }}
    >
      <div className="sim-thumb-window">
        {isRendered ? (
          <iframe 
            ref={iframeRef} 
            tabIndex={-1} 
            title={template.n} 
            className="sim-thumb-iframe"
          />
        ) : (
          <div className="sim-thumb-placeholder">
            <span>#{template.k + 1}</span>
          </div>
        )}
        {isSelected && (
          <div className="sim-active-overlay">
            <Check size={14} />
            <span>Seleccionada</span>
          </div>
        )}
      </div>

      <div className="sim-thumb-meta">
        <div className="sim-thumb-title">{template.n}</div>
        <div className="sim-thumb-tags">
          <span>{LN[template.li]}</span>
          <span>{SN[template.si]}</span>
        </div>
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  useScrollReveal();
  const { isDark, toggleTheme } = useTheme();
  const whatsappNumber = '5491128779641';

  // Check URL to determine if we are in '/simulador/modelos' or '/simulador'
  const isModelsPath = typeof window !== 'undefined' 
    ? (window.location.pathname.includes('/modelos') || window.location.pathname.includes('/plantillas') || window.location.search.includes('modelos'))
    : false;

  const [view, setView] = useState(isModelsPath ? 'models' : 'form'); // 'form' | 'models'

  // Business Data State (empty by default, placeholders guide the user)
  const [businessData, setBusinessData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('pc_sim_data');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      nm: '',
      rb: '',
      zn: '',
      wa: '',
      tg: '',
      ds: '',
      it: '',
      hr: '',
      vu: ''
    };
  });

  const [videoFileName, setVideoFileName] = useState('');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  // Helper to detect if viewing on mobile
  const isMobileScreen = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const [previewDevice, setPreviewDevice] = useState(() => {
    return isMobileScreen() ? 'mobile' : 'desktop';
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenDevice, setFullScreenDevice] = useState(() => {
    return isMobileScreen() ? 'mobile' : 'desktop';
  });
  const [filterStyle, setFilterStyle] = useState('all');

  const carouselRef = useRef(null);
  const mainIframeRef = useRef(null);
  const modalIframeRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync route and title & ensure mobile default
  useEffect(() => {
    window.scrollTo(0, 0);
    if (view === 'models') {
      document.title = 'Modelos de Plantillas Web | Primera Cuadra';
    } else {
      document.title = 'Simulador de Diseño Web | Primera Cuadra';
    }
    if (typeof window !== 'undefined' && isMobileScreen()) {
      setPreviewDevice('mobile');
      setFullScreenDevice('mobile');
    }
  }, [view]);

  // Persist business data changes in session
  const updateBusinessData = (nextData) => {
    setBusinessData(nextData);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('pc_sim_data', JSON.stringify(nextData));
      } catch (e) {}
    }
  };

  // Switch to models view
  const goToModels = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/simulador/modelos');
      if (isMobileScreen()) {
        setPreviewDevice('mobile');
        setFullScreenDevice('mobile');
      }
    }
    setView('models');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch back to form view
  const goToForm = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/simulador');
    }
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter templates
  const filteredTemplates = useMemo(() => {
    if (filterStyle === 'all') return TEMPLATES;
    return TEMPLATES.filter((t) => t.si === parseInt(filterStyle, 10));
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
      updateBusinessData({ ...businessData, vu: blobUrl });
      setVideoFileName(file.name);
    }
  };

  const handleRemoveVideo = (e) => {
    e.stopPropagation();
    if (businessData.vu && businessData.vu.startsWith('blob:')) {
      URL.revokeObjectURL(businessData.vu);
    }
    updateBusinessData({ ...businessData, vu: '' });
    setVideoFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Update live iframe content
  useEffect(() => {
    if (mainIframeRef.current && activeTemplate) {
      mainIframeRef.current.srcdoc = generateSiteHtml(activeTemplate, businessData);
    }
    if (modalIframeRef.current && activeTemplate && isFullScreen) {
      modalIframeRef.current.srcdoc = generateSiteHtml(activeTemplate, businessData);
    }
  }, [activeTemplate, businessData, isFullScreen, view]);

  // Carousel scrolling
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // WhatsApp conversion message
  const whatsappCtaUrl = useMemo(() => {
    const bizName = businessData.nm || 'mi comercio';
    const bizRubro = businessData.rb ? ` (${businessData.rb})` : '';
    const text = encodeURIComponent(
      `¡Hola Primera Cuadra! Estuve viendo las plantillas web en su simulador con mi negocio "${bizName}"${bizRubro} y me gustó el modelo "${activeTemplate?.n}". ¿Podemos coordinar para desarrollarlo?`
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
            {view === 'models' ? (
              <button 
                type="button" 
                onClick={goToForm} 
                className="sim-btn-back-home" 
                title="Volver a editar los datos del comercio"
              >
                <Edit3 size={15} />
                <span>Editar datos</span>
              </button>
            ) : (
              <a href="/" className="sim-btn-back-home" title="Volver a la página principal">
                <ArrowLeft size={16} />
                <span>Volver a la web</span>
              </a>
            )}

            <div className="sim-brand-separator" aria-hidden="true" />

            <a href="/" className="sim-brand-logo-link" aria-label="Primera Cuadra">
              <BrandLogo variant="auto" height={28} />
              <div className="sim-brand-text">
                <span className="sim-tool-tag" style={{ marginLeft: '10px' }}>
                  <Sparkles size={11} />
                  <span>{view === 'models' ? 'MODELOS DE PLANTILLAS' : 'SIMULADOR EN VIVO'}</span>
                </span>
              </div>
            </a>
          </div>

          <div className="sim-navbar-actions">
            {view === 'form' && (
              <button 
                type="button" 
                onClick={goToModels}
                className="sim-nav-btn-models"
              >
                <span>Ver modelos</span>
                <ArrowRight size={14} />
              </button>
            )}

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
      {/* VIEW A: FORM VIEW (/simulador) */}
      {/* ---------------------------------------------------- */}
      {view === 'form' && (
        <>
          {/* Hero Header */}
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
                  Completá los datos de tu comercio si querés ver cómo queda tu información, o pasá directamente a ver los modelos. <strong>No es obligatorio completar ningún campo</strong> para ver las plantillas.
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

          {/* Form Section */}
          <section className="sim-form-section">
            <div className="container" style={{ maxWidth: '820px' }}>
              <div className="sim-card-box">
                <div className="sim-card-header">
                  <h2 className="sim-card-title">Datos del comercio</h2>
                  <p className="sim-card-desc">
                    Podés escribir tus datos o dejarlos vacíos para ver las plantillas con información de muestra.
                  </p>
                </div>

                <div className="sim-f2-grid">
                  <div className="sim-field">
                    <label className="sim-label">Nombre del comercio</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Panadería La Esquina"
                      value={businessData.nm}
                      onChange={(e) => updateBusinessData({ ...businessData, nm: e.target.value })}
                    />
                  </div>

                  <div className="sim-field">
                    <label className="sim-label">Rubro</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Panadería, Peluquería, Ferretería"
                      value={businessData.rb}
                      onChange={(e) => updateBusinessData({ ...businessData, rb: e.target.value })}
                    />
                  </div>

                  <div className="sim-field">
                    <label className="sim-label">Zona / ciudad</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Tigre, Buenos Aires"
                      value={businessData.zn}
                      onChange={(e) => updateBusinessData({ ...businessData, zn: e.target.value })}
                    />
                  </div>

                  <div className="sim-field">
                    <label className="sim-label">WhatsApp</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: 11 2345 6789"
                      value={businessData.wa}
                      onChange={(e) => updateBusinessData({ ...businessData, wa: e.target.value })}
                    />
                  </div>

                  <div className="sim-field full">
                    <label className="sim-label">Frase principal (opcional)</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Pan hecho todos los días, como en casa"
                      value={businessData.tg}
                      onChange={(e) => updateBusinessData({ ...businessData, tg: e.target.value })}
                    />
                  </div>

                  <div className="sim-field full">
                    <label className="sim-label">Descripción corta (opcional)</label>
                    <textarea 
                      className="sim-textarea"
                      rows={2}
                      placeholder="Ej: Hace 20 años horneando para el barrio."
                      value={businessData.ds}
                      onChange={(e) => updateBusinessData({ ...businessData, ds: e.target.value })}
                    />
                  </div>

                  <div className="sim-field full">
                    <label className="sim-label">
                      Qué ofrecen — uno por línea, con detalle opcional después de “|”
                    </label>
                    <textarea 
                      className="sim-textarea"
                      rows={4}
                      placeholder="Pan artesanal | Masa madre, horneado a la mañana&#10;Facturas | Docena y media docena&#10;Tortas por encargue | Con 48 hs de anticipación"
                      value={businessData.it}
                      onChange={(e) => updateBusinessData({ ...businessData, it: e.target.value })}
                    />
                  </div>

                  <div className="sim-field full">
                    <label className="sim-label">Horario</label>
                    <input 
                      type="text"
                      className="sim-input"
                      placeholder="Ej: Lunes a sábados de 8 a 20 h"
                      value={businessData.hr}
                      onChange={(e) => updateBusinessData({ ...businessData, hr: e.target.value })}
                    />
                  </div>

                  <div className="sim-field full">
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
                        <Video size={18} className="text-purple-icon" />
                        <div>
                          <div className="sim-video-name">
                            {videoFileName ? videoFileName : 'Subir un video desde tu dispositivo'}
                          </div>
                          <div className="sim-video-hint">
                            {videoFileName ? 'Video en memoria listo' : 'MP4, WebM o MOV (vive solo en tu navegador)'}
                          </div>
                        </div>
                      </div>
                      {videoFileName ? (
                        <button type="button" onClick={handleRemoveVideo} className="sim-btn-remove-video">
                          Quitar
                        </button>
                      ) : (
                        <span className="sim-btn-upload-badge">
                          <Upload size={13} />
                          <span>Seleccionar</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button (Imagen 2) */}
                <div style={{ marginTop: '28px', textAlign: 'center' }}>
                  <button 
                    type="button" 
                    onClick={goToModels} 
                    className="sim-btn-primary-models"
                  >
                    <span>Elegí tu plantilla</span>
                    <ArrowRight size={18} />
                  </button>
                  <p style={{ margin: '10px 0 0', fontSize: '0.85rem', color: '#6B7280' }}>
                    No es obligatorio completar los campos. Podés entrar directo y ver todos los modelos disponibles.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* VIEW B: FULLSCREEN CAROUSEL & SHOWCASE (Imagen 3) */}
      {/* ---------------------------------------------------- */}
      {view === 'models' && (
        <section className="sim-models-fullscreen-section">
          <div className="container" style={{ maxWidth: '1320px' }}>

            {/* Top Carousel Bar */}
            <div className="sim-section-header">
              <div className="sim-header-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} className="text-purple-icon" />
                  <h2 className="sim-section-title">Elegí tu plantilla en el carrusel</h2>
                </div>
                <span className="sim-section-subtitle">
                  Mostrando plantilla <strong>#{activeTemplate.k + 1}: {activeTemplate.n}</strong>
                  {businessData.nm && ` · Personalizada para ${businessData.nm}`}
                </span>
              </div>

              {/* Carousel navigation arrows */}
              <div className="sim-carousel-nav-arrows">
                <button 
                  type="button" 
                  onClick={() => scrollCarousel('left')} 
                  className="sim-nav-arrow"
                  aria-label="Plantilla anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  type="button" 
                  onClick={() => scrollCarousel('right')} 
                  className="sim-nav-arrow"
                  aria-label="Siguiente plantilla"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Style Filters */}
            <div className="sim-filters-bar">
              {[
                { id: 'all', label: 'Todas las 50' },
                { id: '0', label: 'Papel' },
                { id: '1', label: 'Tinta' },
                { id: '2', label: 'Noche' },
                { id: '3', label: 'Amarillo' },
                { id: '4', label: 'Tierra' },
                { id: '5', label: 'Bosque' },
                { id: '6', label: 'Mono' },
                { id: '7', label: 'Marino' },
                { id: '8', label: 'Azulejo' },
                { id: '9', label: 'Concreto' },
                { id: '10', label: 'Vino' },
                { id: '11', label: 'Menta' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterStyle(f.id)}
                  className={`sim-filter-chip ${filterStyle === f.id ? 'active' : ''}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Visual Carousel Track with live thumbnails */}
            <div ref={carouselRef} className="sim-carousel-container">
              {filteredTemplates.map((tpl) => (
                <CarouselCard
                  key={tpl.k}
                  template={tpl}
                  businessData={businessData}
                  isSelected={tpl.k === activeTemplate.k}
                  onSelect={(k) => setSelectedTemplateIndex(k)}
                />
              ))}
            </div>

            {/* Main Stage Showcase Viewer */}
            <div className="sim-stage-window">
              {/* Window Browser Header */}
              <div className="sim-stage-topbar">
                <div className="sim-stage-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>

                <div className="sim-stage-url">
                  <span style={{ fontSize: '12px' }}>🔒</span>
                  <span>
                    https://{businessData.nm ? businessData.nm.toLowerCase().replace(/[^a-z0-9]/g, '') : 'tunegocio'}.primeracuadra.com.ar
                  </span>
                </div>

                <div className="sim-stage-controls">
                  <div className="sim-device-switcher">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`sim-device-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
                      title="Vista Móvil (formato celular)"
                    >
                      <Smartphone size={14} />
                      <span>Móvil</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`sim-device-btn ${previewDevice === 'desktop' ? 'active' : ''}`}
                      title="Vista Web (diseño de escritorio con zoom out)"
                    >
                      <Monitor size={14} />
                      <span>Web</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFullScreen(true)}
                    className="sim-btn-expand"
                    title="Pantalla completa"
                  >
                    <Maximize2 size={15} />
                    <span className="hide-mobile">Pantalla completa</span>
                  </button>
                </div>
              </div>

              {/* Iframe Viewport */}
              <div className={`sim-stage-viewport-wrap ${previewDevice}`}>
                {previewDevice === 'desktop' && (
                  <div className="sim-desktop-hint-badge hide-desktop">
                    <span>🖥️ Vista web a escala · Fondo oscuro</span>
                  </div>
                )}
                <div className={`sim-stage-viewport ${previewDevice}`}>
                  <iframe 
                    ref={mainIframeRef}
                    title={`Previsualización en vivo ${activeTemplate.n}`}
                    className="sim-main-iframe"
                  />
                </div>
              </div>

              {/* Bottom Conversion Action Bar */}
              <div className="sim-stage-bottom-bar">
                <div className="sim-stage-bottom-info">
                  <span className="sim-stage-current-name">{activeTemplate.n}</span>
                  <span className="sim-stage-current-meta">
                    Estructura: <strong>{LN[activeTemplate.li]}</strong> · Estilo: <strong>{SN[activeTemplate.si]}</strong>
                  </span>
                </div>

                <a 
                  href={whatsappCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sim-cta-whatsapp-btn"
                >
                  <MessageSquare size={17} />
                  <span>Quiero esta plantilla para mi negocio</span>
                  <ArrowRight size={17} />
                </a>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* FULLSCREEN POPUP MODAL */}
      {/* ---------------------------------------------------- */}
      {isFullScreen && (
        <div className="sim-fullscreen-overlay">
          <div className="sim-fullscreen-header">
            <div className="sim-fullscreen-title-group">
              <BrandLogo variant="auto" height={22} />
              <div className="sim-fs-divider" />
              <span className="sim-fs-name">{activeTemplate.n}</span>
              {businessData.nm && <span className="sim-fs-tag">{businessData.nm}</span>}
            </div>

            <div className="sim-fullscreen-actions">
              <div className="sim-device-switcher">
                <button
                  type="button"
                  onClick={() => setFullScreenDevice('mobile')}
                  className={`sim-device-btn ${fullScreenDevice === 'mobile' ? 'active' : ''}`}
                >
                  <Smartphone size={14} />
                  <span>Móvil</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFullScreenDevice('desktop')}
                  className={`sim-device-btn ${fullScreenDevice === 'desktop' ? 'active' : ''}`}
                >
                  <Monitor size={14} />
                  <span>Web</span>
                </button>
              </div>

              <a 
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sim-cta-whatsapp-btn mini"
              >
                <MessageSquare size={15} />
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
                title={`Pantalla completa ${activeTemplate.n}`}
                className="sim-fullscreen-iframe"
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* BOTTOM CONVERSION BANNER */}
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
      {/* FOOTER */}
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

      {/* Scoped CSS Styles */}
      <style>{`
        .simulator-standalone-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #F8F9FA;
          color: #111827;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .simulator-standalone-page.dark-mode {
          background: #0E0D13;
          color: #F4F2EC;
        }

        .hide-desktop { display: none; }
        @media (max-width: 768px) {
          .hide-desktop { display: block !important; }
        }
        .sim-nav-btn-models {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(164, 139, 255, 0.3);
          background: rgba(124, 58, 237, 0.1);
          color: #7C3AED;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .dark-mode .sim-nav-btn-models {
          color: #A48BFF;
          border-color: rgba(164, 139, 255, 0.25);
          background: rgba(124, 58, 237, 0.15);
        }
        .sim-nav-btn-models:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
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

        /* Form Section */
        .sim-form-section {
          padding: 10px 20px 48px;
        }

        .sim-card-box {
          background: #FFFFFF;
          border: 1px solid rgba(164, 139, 255, 0.22);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
        }
        .dark-mode .sim-card-box {
          background: #14131A;
          border-color: rgba(164, 139, 255, 0.18);
          box-shadow: 0 4px 28px rgba(0, 0, 0, 0.4);
        }
        .sim-card-header {
          margin-bottom: 24px;
          text-align: left;
        }
        .sim-card-title {
          font-size: 1.45rem;
          font-weight: 800;
          margin: 0 0 6px;
        }
        .sim-card-desc {
          font-size: 0.88rem;
          color: #6B7280;
          margin: 0;
        }
        .dark-mode .sim-card-desc { color: #9CA3AF; }

        .sim-f2-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 16px;
          box-sizing: border-box;
          width: 100%;
        }
        @media (max-width: 640px) {
          .sim-f2-grid { grid-template-columns: 1fr; }
        }
        .sim-field {
          display: flex;
          flex-direction: column;
          min-width: 0;
          max-width: 100%;
        }
        .sim-field.full {
          grid-column: 1 / -1;
        }
        .sim-label {
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: #374151;
        }
        .dark-mode .sim-label { color: #D1D5DB; }

        .sim-input, .sim-textarea {
          width: 100%;
          max-width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid rgba(164, 139, 255, 0.25);
          background: #F9FAFB;
          color: inherit;
          font-size: 0.9rem;
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
        .sim-input::placeholder, .sim-textarea::placeholder {
          color: rgba(107, 114, 128, 0.65);
          opacity: 1;
        }
        .dark-mode .sim-input::placeholder, .dark-mode .sim-textarea::placeholder {
          color: rgba(244, 242, 236, 0.35);
          opacity: 1;
        }

        .sim-video-uploader {
          border: 2px dashed rgba(164, 139, 255, 0.3);
          border-radius: 10px;
          padding: 12px 16px;
          background: rgba(124, 58, 237, 0.03);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
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
          gap: 5px;
          padding: 6px 12px;
          border-radius: 6px;
          background: #7C3AED;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 700;
          white-space: nowrap;
        }
        .sim-btn-remove-video {
          padding: 5px 10px;
          border-radius: 4px;
          background: #EF4444;
          color: #FFFFFF;
          border: none;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* Big CTA Button (Imagen 2) */
        .sim-btn-primary-models {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 38px;
          border-radius: 50px;
          background: #673DE6;
          color: #FFFFFF;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(103, 61, 230, 0.4);
          transition: all 0.25s ease;
        }
        .sim-btn-primary-models:hover {
          background: #5428D8;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(103, 61, 230, 0.5);
        }

        /* Models Fullscreen Section (Imagen 3) */
        .sim-models-fullscreen-section {
          padding: 18px 20px 60px;
          flex: 1;
        }
        .sim-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sim-section-title {
          font-size: 1.35rem;
          font-weight: 800;
          margin: 0;
        }
        .sim-section-subtitle {
          font-size: 0.88rem;
          color: #6B7280;
          margin-top: 2px;
          display: block;
        }
        .dark-mode .sim-section-subtitle { color: #9CA3AF; }

        .sim-carousel-nav-arrows {
          display: flex;
          gap: 8px;
        }
        .sim-nav-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: 1px solid rgba(164, 139, 255, 0.25);
          background: rgba(124, 58, 237, 0.08);
          color: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sim-nav-arrow:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
        }

        .sim-filters-bar {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          margin-bottom: 16px;
          padding-bottom: 4px;
        }
        .sim-filters-bar::-webkit-scrollbar { display: none; }
        .sim-filter-chip {
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid rgba(164, 139, 255, 0.2);
          background: transparent;
          color: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .sim-filter-chip.active, .sim-filter-chip:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
        }

        /* Carousel Track with live thumbnails */
        .sim-carousel-container {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 6px 2px 18px;
          scrollbar-width: thin;
        }
        .sim-carousel-card {
          flex: 0 0 250px;
          width: 250px;
          background: #FFFFFF;
          border: 2px solid rgba(164, 139, 255, 0.2);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all 0.25s ease;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
        }
        .dark-mode .sim-carousel-card {
          background: #15131E;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
        }
        .sim-carousel-card:hover {
          border-color: #7C3AED;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.16);
        }
        .sim-carousel-card.selected {
          border-color: #7C3AED;
          box-shadow: 0 0 0 2px #7C3AED, 0 10px 28px rgba(124, 58, 237, 0.28);
        }

        .sim-thumb-window {
          height: 155px;
          width: 100%;
          position: relative;
          overflow: hidden;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(164, 139, 255, 0.15);
        }
        .sim-thumb-iframe {
          position: absolute;
          left: 0;
          top: 0;
          width: 1250px;
          height: 775px;
          border: 0;
          transform: scale(0.2);
          transform-origin: 0 0;
          pointer-events: none;
          background: #FFFFFF;
        }
        .sim-thumb-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #9CA3AF;
          background: #F3F4F6;
        }
        .dark-mode .sim-thumb-placeholder { background: #1F1C28; color: #6B7280; }
        .sim-active-overlay {
          position: absolute;
          top: 8px;
          right: 8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 4px;
          background: #10B981;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        }

        .sim-thumb-meta {
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sim-thumb-title {
          font-size: 0.88rem;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sim-thumb-tags {
          display: flex;
          gap: 6px;
          font-size: 0.72rem;
          color: #7C3AED;
          font-weight: 600;
        }

        /* Large Showcase Stage */
        .sim-stage-window {
          margin-top: 24px;
          background: #FFFFFF;
          border: 1px solid rgba(164, 139, 255, 0.25);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.07);
        }
        .dark-mode .sim-stage-window {
          background: #14131A;
          border-color: rgba(164, 139, 255, 0.2);
          box-shadow: 0 12px 42px rgba(0, 0, 0, 0.5);
        }
        .sim-stage-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #F3F4F6;
          border-bottom: 1px solid rgba(164, 139, 255, 0.15);
          gap: 12px;
        }
        .dark-mode .sim-stage-topbar {
          background: #1C1A24;
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }
        .sim-stage-dots {
          display: flex;
          gap: 6px;
        }
        .sim-stage-dots .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .sim-stage-dots .dot.red { background: #EF4444; }
        .sim-stage-dots .dot.yellow { background: #F59E0B; }
        .sim-stage-dots .dot.green { background: #10B981; }

        .sim-stage-url {
          flex: 1;
          max-width: 440px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 6px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          font-size: 0.8rem;
          color: #4B5563;
          overflow: hidden;
        }
        .dark-mode .sim-stage-url {
          background: #14131A;
          border-color: rgba(255, 255, 255, 0.08);
          color: #9CA3AF;
        }

        .sim-stage-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sim-device-switcher {
          display: flex;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px;
        }
        .dark-mode .sim-device-switcher {
          background: rgba(255, 255, 255, 0.06);
        }
        .sim-device-btn {
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
        .sim-device-btn.active {
          background: #7C3AED;
          color: #FFFFFF;
          box-shadow: 0 1px 4px rgba(124, 58, 237, 0.3);
        }
        .sim-btn-expand {
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
        .sim-btn-expand:hover {
          background: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
        }

        .sim-stage-viewport-wrap {
          background: #E5E7EB;
          min-height: 680px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow: hidden;
        }
        .dark-mode .sim-stage-viewport-wrap {
          background: #0B0A0E;
        }
        .sim-stage-viewport {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 680px;
          background: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        .sim-stage-viewport.desktop {
          width: 100%;
        }
        .sim-stage-viewport.mobile {
          width: 390px;
          height: 690px;
          border: 8px solid #1F2937;
          border-radius: 36px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }
        .sim-main-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .sim-stage-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 22px;
          background: #FFFFFF;
          border-top: 1px solid rgba(164, 139, 255, 0.15);
          gap: 16px;
          flex-wrap: wrap;
        }
        .dark-mode .sim-stage-bottom-bar {
          background: #14131A;
          border-top-color: rgba(255, 255, 255, 0.08);
        }
        .sim-stage-current-name {
          font-size: 1.1rem;
          font-weight: 800;
          display: block;
        }
        .sim-stage-current-meta {
          font-size: 0.85rem;
          color: #6B7280;
        }
        .dark-mode .sim-stage-current-meta { color: #9CA3AF; }

        .sim-cta-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 50px;
          background: #25D366;
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          transition: all 0.2s ease;
        }
        .sim-cta-whatsapp-btn:hover {
          background: #1EBE5D;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(37, 211, 102, 0.45);
        }
        .sim-cta-whatsapp-btn.mini {
          padding: 7px 14px;
          font-size: 0.82rem;
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

        /* ---------------- Mobile Responsive Optimization ---------------- */
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .sim-tool-tag { display: none !important; }
          .sim-brand-separator { display: none !important; }
          .sim-btn-back-home span { display: none !important; }
          .btn-sim-navbar-wa span { display: none !important; }
          .btn-sim-navbar-cta { display: none !important; }
          .sim-brand-text { display: none !important; }

          .sim-standalone-navbar {
            width: 100%;
            overflow-x: hidden;
          }
          .sim-navbar-inner {
            padding: 8px 12px;
            gap: 6px;
            justify-content: space-between;
          }
          .sim-navbar-brand-group {
            gap: 6px;
            flex-shrink: 1;
            min-width: 0;
          }
          .sim-btn-back-home {
            padding: 7px 10px;
            border-radius: 8px;
            flex-shrink: 0;
          }
          .sim-brand-logo-link {
            gap: 4px;
            flex-shrink: 1;
            min-width: 0;
            overflow: hidden;
          }
          .sim-brand-logo-link .pc-brand-logo {
            height: 22px !important;
            width: auto !important;
            max-width: 145px;
          }

          .sim-navbar-actions {
            gap: 6px;
            flex-shrink: 0;
          }
          .sim-nav-btn-models {
            padding: 6px 10px;
            font-size: 0.8rem;
          }
          .btn-sim-navbar-wa {
            padding: 7px 10px;
            flex-shrink: 0;
          }

          /* Form View Mobile */
          .sim-standalone-hero {
            padding: 24px 14px 16px;
          }
          .sim-hero-title {
            font-size: clamp(1.75rem, 6vw, 2.2rem);
          }
          .sim-hero-subtitle {
            font-size: 0.92rem;
            line-height: 1.5;
            margin-bottom: 18px;
          }
          .sim-hero-trust-bar {
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          .sim-trust-item {
            width: 100%;
            max-width: 320px;
            justify-content: center;
            font-size: 0.76rem;
            padding: 6px 12px;
          }
          .sim-form-section {
            padding: 8px 12px 36px;
          }
          .sim-card-box {
            padding: 20px 14px;
          }
          .sim-card-title {
            font-size: 1.25rem;
          }
          .sim-card-desc {
            font-size: 0.82rem;
          }
          .sim-f2-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 12px;
            width: 100%;
          }
          .sim-field {
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .sim-input, .sim-textarea {
            padding: 10px 12px;
            font-size: 0.88rem;
          }
          .sim-btn-primary-models {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
            font-size: 1.05rem;
          }

          /* Models View Mobile */
          .sim-models-fullscreen-section {
            padding: 12px 10px 40px;
          }
          .sim-section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .sim-section-title {
            font-size: 1.2rem;
          }
          .sim-section-subtitle {
            font-size: 0.8rem;
          }
          .sim-carousel-card {
            flex: 0 0 205px;
            width: 205px;
          }
          .sim-thumb-window {
            height: 125px;
          }
          .sim-thumb-meta {
            padding: 8px 10px;
          }
          .sim-thumb-title {
            font-size: 0.82rem;
          }

          /* Live Stage Window */
          .sim-stage-window {
            margin-top: 14px;
            border-radius: 12px;
          }
          .sim-stage-topbar {
            padding: 8px 10px;
            gap: 8px;
            flex-wrap: wrap;
          }
          .sim-stage-url {
            order: 3;
            width: 100%;
            max-width: 100%;
            font-size: 0.72rem;
            padding: 4px 8px;
          }
          .sim-stage-viewport-wrap {
            min-height: 480px;
            padding: 8px 6px;
          }
          .sim-device-switcher {
            display: flex;
            gap: 2px;
          }
          .sim-device-btn span {
            display: inline-block !important;
            font-size: 0.76rem;
          }

          /* STAGE VIEWPORT IN MOBILE MODE (1:1 Native Phone Format) */
          .sim-stage-viewport-wrap {
            padding: 10px 8px !important;
            min-height: 540px !important;
            background: #0E0D13 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
          }
          .sim-stage-viewport.mobile {
            width: 100% !important;
            max-width: 390px !important;
            height: 540px !important;
            border: 2px solid rgba(164, 139, 255, 0.35) !important;
            border-radius: 16px !important;
            background: #FFFFFF !important;
            overflow: hidden !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
          }
          .sim-stage-viewport.mobile .sim-main-iframe {
            width: 100% !important;
            height: 100% !important;
            transform: none !important;
            display: block;
          }

          /* STAGE VIEWPORT IN DESKTOP MODE ON MOBILE:
             "Si lo quieren ver en diseño web, que se muestre con menos zoom fondo negro en formato vertical no agrandado" */
          .sim-stage-viewport-wrap.desktop {
            background: #000000 !important;
            padding: 12px 6px !important;
          }
          .sim-desktop-hint-badge {
            margin-bottom: 8px;
            padding: 3px 10px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.12);
            color: #E2E8F0;
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.02em;
          }
          .sim-stage-viewport.desktop {
            width: 100% !important;
            max-width: 390px !important;
            height: 520px !important;
            background: #000000 !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 14px !important;
            overflow: hidden !important;
            position: relative !important;
            display: flex !important;
            align-items: flex-start !important;
            justify-content: center !important;
            box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85) !important;
          }
          .sim-stage-viewport.desktop .sim-main-iframe {
            position: absolute !important;
            top: 0 !important;
            left: 50% !important;
            width: 1050px !important;
            height: 1750px !important;
            transform-origin: top center !important;
            transform: translateX(-50%) scale(0.31) !important;
            border: none !important;
            background: #FFFFFF !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
          }
          .sim-stage-bottom-bar {
            flex-direction: column;
            align-items: stretch;
            padding: 14px 16px;
            gap: 12px;
          }
          .sim-cta-whatsapp-btn {
            justify-content: center;
            width: 100%;
          }

          /* Footer on Mobile */
          .sim-footer-inner {
            flex-direction: column !important;
            text-align: center !important;
            gap: 12px !important;
            padding: 24px 16px !important;
          }
          .sim-footer-links {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 10px 14px !important;
            max-width: 100% !important;
          }
          .sim-footer-links a {
            font-size: 0.82rem !important;
          }

          /* Fullscreen Modal on Mobile */
          .sim-fullscreen-body {
            padding: 0 !important;
            background: #000000 !important;
          }
          .sim-fullscreen-viewport.mobile {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            border-radius: 0 !important;
            background: #FFFFFF !important;
          }
          .sim-fullscreen-viewport.mobile .sim-fullscreen-iframe {
            width: 100% !important;
            height: 100% !important;
            transform: none !important;
          }

          .sim-fullscreen-viewport.desktop {
            width: 100% !important;
            height: 100% !important;
            background: #000000 !important;
            border: none !important;
            border-radius: 0 !important;
            display: flex !important;
            align-items: flex-start !important;
            justify-content: center !important;
            overflow: hidden !important;
            position: relative !important;
          }
          .sim-fullscreen-viewport.desktop .sim-fullscreen-iframe {
            position: absolute !important;
            top: 10px !important;
            left: 50% !important;
            width: 1050px !important;
            height: 2400px !important;
            transform-origin: top center !important;
            transform: translateX(-50%) scale(0.33) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 8px !important;
            background: #FFFFFF !important;
          }
        }
      `}</style>
    </div>
  );
}
