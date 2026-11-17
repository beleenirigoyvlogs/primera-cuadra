import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  X, 
  ExternalLink, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

export default function ThePointCaseStudySection() {
  const belenWhatsapp = '5491128779641';
  const whatsappCaseMsg = encodeURIComponent(
    'Hola Belén, estuve viendo el caso de estudio de The Point en Primera Cuadra y me gustaría consultar por un desarrollo de software a medida para mi negocio.'
  );

  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const screens = [
    {
      id: 'pos',
      label: 'POS Mostrador',
      title: 'Punto de Venta Táctil & Facturación Rápida',
      caption: 'Botonera táctil con artículos populares, atajos de teclado F2/F3 y cobro rápido con cálculo de vuelto.',
      base: '/thepoint/pos',
      origWidth: 1916,
      origHeight: 1004
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      title: 'Panel General & Control Operativo en Tiempo Real',
      caption: 'Tablero operativo con evolución semanal de ventas, estado de caja por turnos y centro de alertas activas.',
      base: '/thepoint/dashboard',
      origWidth: 1915,
      origHeight: 1011
    },
    {
      id: 'stock',
      label: 'Stock & Precios',
      title: 'Catálogo de Productos & Control de Stock',
      caption: 'Inventario con código SKU, costo, precio de venta, cálculo automático de margen % y alertas de reposición.',
      base: '/thepoint/stock',
      origWidth: 1917,
      origHeight: 1011
    },
    {
      id: 'caja',
      label: 'Caja Diaria',
      title: 'Control de Caja Diaria & Arqueo de Turnos',
      caption: 'Apertura de turno, retiros, ingresos y arqueo de caja discriminado por efectivo, QR y tarjetas.',
      base: '/thepoint/caja',
      origWidth: 1919,
      origHeight: 1009
    },
    {
      id: 'reportes',
      label: 'Reportes',
      title: 'Reportes Financieros & Rentabilidad Comercial Real',
      caption: 'Cálculos transparentes de rentabilidad diferenciando facturación bruta de ganancia neta comercial.',
      base: '/thepoint/reportes',
      origWidth: 1919,
      origHeight: 1003
    }
  ];

  const currentScreen = screens[activeScreenIdx];

  // Manage body scroll & keyboard shortcuts when lightbox is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isLightboxOpen) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
      setIsZoomed(false);
    }

    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setIsZoomed(false);
        setActiveScreenIdx((prev) => (prev > 0 ? prev - 1 : screens.length - 1));
      } else if (e.key === 'ArrowRight') {
        setIsZoomed(false);
        setActiveScreenIdx((prev) => (prev < screens.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('lightbox-open');
    };
  }, [isLightboxOpen, screens.length]);

  return (
    <section className="case-study-section" id="caso-the-point">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-left reveal">
          <div className="urban-section-badge">
            <span className="badge-bullet"></span>
            <span>PROYECTO PROPIO EN DESARROLLO</span>
          </div>

          <h2 className="section-urban-title">
            The Point Kiosco • Sistema POS & Control de Stock
          </h2>

          <p className="section-urban-subtitle">
            Lo diseñé y desarrollé completo para un emprendimiento propio de kiosco y delivery que está por abrir sus puertas.
          </p>
        </div>

        {/* 4-Phase Architecture: Real & Honest */}
        <div className="case-study-grid reveal-group">
          {/* Phase 1: Desafío */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">1. EL DESAFÍO</div>
            <h3 className="case-step-title">Velocidad de mostrador y operación offline</h3>
            <p className="case-step-text">
              Un negocio de alta rotación necesita cobrar en segundos, escanear artículos y cuadrar turnos de caja sin depender de si internet se corta ni atarse a alquileres mensuales obligatorios.
            </p>
          </div>

          {/* Phase 2: Solución */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">2. LA SOLUCIÓN</div>
            <h3 className="case-step-title">Software de escritorio táctil y autónomo</h3>
            <p className="case-step-text">
              Diseñé una interfaz ergonómica con atajos de teclado (F2 cobrar, F3 escanear), lector de código de barras, catálogo con cálculo de margen comercial y arqueo de caja por turnos.
            </p>
          </div>

          {/* Phase 3: Tecnología */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">3. TECNOLOGÍA</div>
            <h3 className="case-step-title">Stack robusto sin abonos obligatorios</h3>
            <ul className="case-tech-list">
              <li><strong>Electron & Node.js:</strong> Aplicación de escritorio multiplataforma nativa.</li>
              <li><strong>SQLite Persistente:</strong> Base de datos local ultra rápida que no requiere servidores externos.</li>
              <li><strong>React & CSS Modular:</strong> Interfaz oscura de alto contraste con botones táctiles legibles en mostrador.</li>
            </ul>
          </div>

          {/* Phase 4: Enfoque */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">4. ENFOQUE PRÁCTICO</div>
            <h3 className="case-step-title">Adaptado al ritmo del comerciante</h3>
            <p className="case-step-text">
              Desarrollar este sistema para un proyecto propio me permitió diseñar cada pantalla pensando en el uso diario: rapidez de respuesta, cálculo exacto de vuelto y reportes simples.
            </p>
          </div>
        </div>

        {/* Interactive Screen Viewer in Desktop Window Frame */}
        <div className="case-showcase-box reveal">
          <div className="case-viewer-top-bar">
            <div className="viewer-tabs-pills">
              {screens.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`viewer-pill-btn ${activeScreenIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveScreenIdx(idx)}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            <div className="viewer-nav-arrows">
              <button 
                type="button"
                className="btn-arrow"
                onClick={() => setActiveScreenIdx(prev => prev > 0 ? prev - 1 : screens.length - 1)}
                aria-label="Captura anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="viewer-counter">{activeScreenIdx + 1} / {screens.length}</span>
              <button 
                type="button"
                className="btn-arrow"
                onClick={() => setActiveScreenIdx(prev => prev < screens.length - 1 ? prev + 1 : 0)}
                aria-label="Captura siguiente"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Realistic Desktop App Window Frame */}
          <div className="thepoint-desktop-window">
            <div className="thepoint-window-titlebar">
              <div className="window-dots-group">
                <span className="w-dot w-dot-close" aria-hidden="true"></span>
                <span className="w-dot w-dot-minimize" aria-hidden="true"></span>
                <span className="w-dot w-dot-maximize" aria-hidden="true"></span>
              </div>
              <div className="window-title-label">
                <span>The Point — POS</span>
              </div>
              <div className="window-hd-badge">
                <span>1080p HD</span>
              </div>
            </div>

            {/* Viewport with responsive <picture> srcset */}
            <div 
              className="thepoint-window-viewport"
              onClick={() => setIsLightboxOpen(true)}
              title="Clic para ver en pantalla completa con zoom"
            >
              <picture>
                <source 
                  type="image/avif" 
                  srcSet={`
                    ${currentScreen.base}-1200.avif 1200w,
                    ${currentScreen.base}-1800.avif 1800w,
                    ${currentScreen.base}-full.avif ${currentScreen.origWidth}w
                  `}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                />
                <source 
                  type="image/webp" 
                  srcSet={`
                    ${currentScreen.base}-1200.webp 1200w,
                    ${currentScreen.base}-1800.webp 1800w,
                    ${currentScreen.base}-full.webp ${currentScreen.origWidth}w
                  `}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                />
                <img 
                  src={`${currentScreen.base}-1200.webp`} 
                  alt={`Captura real de pantalla: ${currentScreen.title}`}
                  width={currentScreen.origWidth}
                  height={currentScreen.origHeight}
                  loading="lazy"
                  className="thepoint-screen-img"
                />
              </picture>

              <div className="thepoint-zoom-overlay">
                <Maximize2 size={15} />
                <span>Clic para ver en pantalla completa</span>
              </div>
            </div>

            {/* Caption & Navigation Link */}
            <div className="case-screen-caption-bar">
              <span className="caption-text">{currentScreen.caption}</span>
              <a 
                href="/desarrollo-a-medida" 
                className="caption-link"
              >
                <span>Conocé todos los módulos</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* CTA to consult bespoke software */}
        <div className="case-study-cta-box reveal">
          <div className="cta-text-side">
            <h4>¿Tenés en mente un sistema o app propia para tu negocio?</h4>
            <p>Contame tu proyecto, lo evaluamos juntos y te digo con qué alcance y tecnología puedo resolverlo.</p>
          </div>
          <a 
            href={`https://wa.me/${belenWhatsapp}?text=${whatsappCaseMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hostinger-primary"
            onClick={() => trackWhatsAppClick('the_point_case_cta', 'Consultar_Desarrollo_ThePoint')}
          >
            <span>Consultar por software a medida</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal with Zoom & Keyboard Navigation */}
      {isLightboxOpen && (
        <div 
          className="thepoint-lightbox-overlay" 
          onClick={() => { setIsLightboxOpen(false); setIsZoomed(false); }}
          role="dialog"
          aria-modal="true"
          aria-label="Visor a pantalla completa de The Point"
        >
          {/* Lightbox Top Control Bar */}
          <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-title-info">
              <span className="lightbox-counter">
                {activeScreenIdx + 1} / {screens.length}
              </span>
              <span className="lightbox-screen-title">{currentScreen.title}</span>
            </div>

            <div className="lightbox-actions-group">
              <button
                type="button"
                className={`btn-lightbox-action ${isZoomed ? 'active' : ''}`}
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? "Restablecer tamaño (Z)" : "Ampliar al 100% (Z)"}
                aria-label={isZoomed ? "Restablecer zoom" : "Ampliar zoom"}
              >
                {isZoomed ? <ZoomOut size={17} /> : <ZoomIn size={17} />}
                <span>{isZoomed ? 'Ajustar a pantalla' : 'Zoom 100%'}</span>
              </button>

              <button
                type="button"
                className="btn-lightbox-close"
                onClick={() => { setIsLightboxOpen(false); setIsZoomed(false); }}
                title="Cerrar (Esc)"
                aria-label="Cerrar visor"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Left / Right Arrow Navigation */}
          <button
            type="button"
            className="btn-lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
              setActiveScreenIdx((prev) => (prev > 0 ? prev - 1 : screens.length - 1));
            }}
            aria-label="Captura anterior"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            className="btn-lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
              setActiveScreenIdx((prev) => (prev < screens.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Captura siguiente"
          >
            <ChevronRight size={28} />
          </button>

          {/* Lightbox Image Stage */}
          <div 
            className={`lightbox-image-stage ${isZoomed ? 'zoomed' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            <picture>
              <source type="image/avif" srcSet={`${currentScreen.base}-full.avif`} />
              <source type="image/webp" srcSet={`${currentScreen.base}-full.webp`} />
              <img
                src={`${currentScreen.base}-full.webp`}
                alt={currentScreen.title}
                className={`lightbox-full-img ${isZoomed ? 'is-zoomed' : ''}`}
                loading="eager"
              />
            </picture>
          </div>

          {/* Lightbox Bottom Info Bar */}
          <div className="lightbox-bottom-caption" onClick={(e) => e.stopPropagation()}>
            <p className="lightbox-caption-text">{currentScreen.caption}</p>
            <span className="lightbox-hint-text">
              Hacé clic en la imagen o presioná <strong>Z</strong> para hacer zoom · Flechas <strong>← →</strong> para cambiar de captura · <strong>Esc</strong> para salir
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
