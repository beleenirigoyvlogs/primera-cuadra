import React, { useState } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

export default function ThePointCaseStudySection() {
  const belenWhatsapp = '5491128779641';
  const whatsappCaseMsg = encodeURIComponent(
    'Hola Belén, estuve viendo el caso de estudio de The Point en Primera Cuadra y me gustaría consultar por un desarrollo de software a medida para mi negocio.'
  );

  const [activeScreenIdx, setActiveScreenIdx] = useState(0);

  const screens = [
    {
      id: 'pos',
      label: 'Punto de Venta (POS)',
      image: '/thepoint/pos.webp',
      caption: 'Botonera táctil con artículos populares y cobro rápido con cálculo de vuelto.'
    },
    {
      id: 'dashboard',
      label: 'Dashboard General',
      image: '/thepoint/dashboard.webp',
      caption: 'Panel general con evolución semanal de ventas, estado de caja y alertas.'
    },
    {
      id: 'stock',
      label: 'Inventario & Stock',
      image: '/thepoint/stock.webp',
      caption: 'Catálogo completo con cálculo automático de margen % y alertas de reposición.'
    },
    {
      id: 'caja',
      label: 'Caja Diaria',
      image: '/thepoint/caja.webp',
      caption: 'Apertura, arqueo y cierre discriminado por efectivo, QR y tarjetas.'
    },
    {
      id: 'reportes',
      label: 'Reportes Financieros',
      image: '/thepoint/reportes.webp',
      caption: 'Rentabilidad real diferenciando facturación bruta de ganancia neta comercial.'
    }
  ];

  const currentScreen = screens[activeScreenIdx];

  return (
    <section className="case-study-section" id="caso-the-point">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-left reveal">
          <div className="urban-section-badge">
            <span className="badge-bullet"></span>
            <span>CASO DE ESTUDIO REAL</span>
          </div>

          <h2 className="section-urban-title">
            The Point: Sistema de Punto de Venta & Control de Stock
          </h2>

          <p className="section-urban-subtitle">
            Un proyecto que diseñé y desarrollé de punta a punta para resolver la operación real de un kiosco comercial con delivery.
          </p>
        </div>

        {/* 5-Phase Case Study Architecture */}
        <div className="case-study-grid reveal-group">
          {/* Phase 1: Problema */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">1. EL PROBLEMA</div>
            <h3 className="case-step-title">Descontrol de stock y demoras en el mostrador</h3>
            <p className="case-step-text">
              Un negocio de alta rotación (kiosco 24 hs + delivery) no puede perder tiempo abriendo páginas lentas ni depender de si internet funciona.
              Había diferencias de caja, mercadería sin auditar y necesidad de cobrar en menos de 5 segundos.
            </p>
          </div>

          {/* Phase 2: Solución */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">2. LA SOLUCIÓN</div>
            <h3 className="case-step-title">Software de escritorio táctil y 100% offline</h3>
            <p className="case-step-text">
              Diseñé una interfaz táctil ergonómica con atajos de teclado (F2 cobrar, F3 escanear), lector de código de barras, base de datos local SQLite y panel de rentabilidad real que no confunde facturación con ganancia.
            </p>
          </div>

          {/* Phase 3: Tecnología */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">3. TECNOLOGÍA</div>
            <h3 className="case-step-title">Stack robusto y sin costos mensuales</h3>
            <ul className="case-tech-list">
              <li><strong>Electron & Node.js:</strong> Aplicación de escritorio multiplataforma nativa.</li>
              <li><strong>SQLite Persistente:</strong> Base de datos local ultra rápida que no requiere servidores externos.</li>
              <li><strong>React & CSS Modular:</strong> Interfaz oscura de alto contraste con tipografía legible en mostrador.</li>
            </ul>
          </div>

          {/* Phase 4: Aprendizajes */}
          <div className="case-step-card reveal">
            <div className="case-step-tag">4. APRENDIZAJES</div>
            <h3 className="case-step-title">Lo que funciona en la trinchera comercial</h3>
            <p className="case-step-text">
              La tecnología tiene que adaptarse al ritmo del comerciante, no al revés. La velocidad de respuesta de la pantalla y la claridad en los números son la diferencia entre una herramienta útil y una molestia.
            </p>
          </div>
        </div>

        {/* Interactive Screen Viewer */}
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

          <div className="case-viewer-viewport">
            <img 
              src={currentScreen.image} 
              alt={currentScreen.label} 
              className="case-screen-img"
              loading="lazy"
            />
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
            <p>Contame tu proyecto, lo evaluamos juntos y te digo con qué alcance y tecnología podemos resolverlo.</p>
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
    </section>
  );
}
