import React from 'react';
import { 
  Compass, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Globe, 
  MapPin, 
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { AGENCY_COMPARISON } from '../data/nicheData';

export default function StreetComparison({ niche }) {
  return (
    <section className="street-comp-section" id="filosofia-primera-cuadra">
      <div className="container">
        {/* Concept Header */}
        <div className="section-header-center">
          <div className="section-kicker-pill">
            <Compass size={14} />
            <span>EL CONCEPTO COMERCIAL DETRÁS DE PRIMERA CUADRA</span>
          </div>
          <h2 className="section-main-title">
            ¿Por qué tu negocio necesita estar en la <span className="text-gradient-ocean">Primera Cuadra</span>?
          </h2>
          <p className="section-main-desc">
            En cualquier centro comercial o ribera náutica, los locales de la primera cuadra concentran el 80% de las ventas porque la gente pasa por ahí. En internet, la Primera Cuadra es tener <strong>tu propia Página Web + Google Maps + WhatsApp Business</strong> perfectamente sincronizados.
          </p>
        </div>

        {/* 3 Pillars Cards Grid */}
        <div className="three-pillars-strip-agency">
          <div className="pillar-agency-card featured-web">
            <div className="pillar-agency-header">
              <div className="pillar-badge-num">PILAR 1</div>
              <div className="pillar-icon-box web">
                <Globe size={24} />
              </div>
            </div>
            <h3>Tu Página Web Propia</h3>
            <p>
              La base de tu reputación digital. Con dominio a tu nombre (.com o .com.ar), diseño responsive a medida de tu rubro, catálogo de servicios, tarifas y botón directo de consulta a WhatsApp.
            </p>
            <span className="pillar-benefit-tag">✓ Otorga respaldo formal y confianza</span>
          </div>

          <div className="pillar-agency-card">
            <div className="pillar-agency-header">
              <div className="pillar-badge-num">PILAR 2</div>
              <div className="pillar-icon-box pin">
                <MapPin size={24} />
              </div>
            </div>
            <h3>Ficha de Google Maps</h3>
            <p>
              La vidriera donde te descubren las personas que buscan tu servicio en tu zona con el celular. Ajustamos categorías de tu rubro, servicios, novedades SEO y respondemos todas las reseñas.
            </p>
            <span className="pillar-benefit-tag">✓ Captura clientes con intención de compra hoy</span>
          </div>

          <div className="pillar-agency-card">
            <div className="pillar-agency-header">
              <div className="pillar-badge-num">PILAR 3</div>
              <div className="pillar-icon-box chat">
                <MessageSquare size={24} />
              </div>
            </div>
            <h3>WhatsApp Business</h3>
            <p>
              El mostrador donde cerrás las ventas. Catálogo oficial con fotos y precios cargados, respuestas predeterminadas y botón directo de consulta para responder en segundos sin perder ventas.
            </p>
            <span className="pillar-benefit-tag">✓ Convierte consultas frías en clientes pagos</span>
          </div>
        </div>

        {/* Agency Comparison: Traditional vs Primera Cuadra */}
        <div className="agency-vs-traditional-box">
          <div className="vs-header">
            <Sparkles size={16} className="text-cyan" />
            <h3>¿Por qué hacer tu web con Primera Cuadra y no con una agencia tradicional?</h3>
          </div>

          {/* Desktop Table View */}
          <div className="vs-table-wrapper vs-desktop-table">
            <table className="vs-table">
              <thead>
                <tr>
                  <th>Aspecto clave</th>
                  <th className="th-trad">Agencia Web Tradicional</th>
                  <th className="th-primera">Primera Cuadra (Nuestra Propuesta)</th>
                </tr>
              </thead>
              <tbody>
                {AGENCY_COMPARISON.map((row, idx) => (
                  <tr key={idx}>
                    <td className="td-aspect"><strong>{row.aspect}</strong></td>
                    <td className="td-trad">
                      <div className="vs-row-content">
                        <XCircle size={16} className="text-danger" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="td-primera">
                      <div className="vs-row-content">
                        <CheckCircle2 size={16} className="text-emerald" />
                        <span><strong>{row.primeraCuadra}</strong></span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards View (Clean & Native for phones) */}
          <div className="vs-mobile-cards-list">
            {AGENCY_COMPARISON.map((row, idx) => (
              <div key={idx} className="vs-mobile-card-item">
                <div className="vs-card-aspect-header">
                  <span className="aspect-bullet"></span>
                  <h4>{row.aspect}</h4>
                </div>
                
                <div className="vs-card-comparison-body">
                  {/* Agencia Tradicional */}
                  <div className="vs-card-row trad-row">
                    <div className="vs-card-badge trad-badge">
                      <XCircle size={14} />
                      <span>Agencia Tradicional</span>
                    </div>
                    <p className="vs-card-desc trad-desc">{row.traditional}</p>
                  </div>

                  {/* Primera Cuadra */}
                  <div className="vs-card-row primera-row">
                    <div className="vs-card-badge primera-badge">
                      <CheckCircle2 size={14} />
                      <span>Primera Cuadra (Nosotros)</span>
                    </div>
                    <p className="vs-card-desc primera-desc">
                      <strong>{row.primeraCuadra}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
