import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Gift,
  Award
} from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

export default function EarlyAdoptersSection() {
  const whatsappNumber = '5491128779641';
  const whatsappMsg = encodeURIComponent(
    '¡Hola Belén! Quiero sumarme al Programa de primeros clientes de Primera Cuadra para acceder al precio de lanzamiento a cambio de mi testimonio y permiso para mostrar el trabajo terminado. ¿Quedan cupos disponibles?'
  );

  return (
    <section className="early-adopters-section-wrapper" id="primeros-clientes">
      <div className="container">
        <div className="early-adopters-card reveal">
          <div className="early-card-badge">
            <Sparkles size={14} />
            <span>LANZAMIENTO EXCLUSIVO • SOLO 5 LUGARES</span>
          </div>

          <div className="early-split-layout">
            {/* Left Column: Description & Proposition in 1st Person Singular */}
            <div className="early-text-col">
              <h2 className="early-title">
                Programa de <span className="highlight-purple">Primeros Clientes</span>
              </h2>

              <p className="early-description">
                Primera Cuadra es mi nuevo proyecto y quiero que mis primeros trabajos hablen por mí. Por eso abro <strong>5 lugares exclusivos con precio de lanzamiento</strong> para negocios, comercios y profesionales que quieran dar el salto digital hoy.
              </p>

              <div className="early-exchange-box">
                <div className="exchange-item give">
                  <div className="exchange-icon give">
                    <Gift size={20} />
                  </div>
                  <div>
                    <strong>Lo que recibís:</strong>
                    <p>Precio promocional de lanzamiento en cualquiera de mis packs, entrega ágil y atención 100% personalizada conmigo en cada detalle.</p>
                  </div>
                </div>

                <div className="exchange-item ask">
                  <div className="exchange-icon ask">
                    <Award size={20} />
                  </div>
                  <div>
                    <strong>Lo que te pido a cambio:</strong>
                    <p>Tu testimonio sincero una vez entregado el trabajo y tu permiso para mostrar tu página web y ficha de Google como caso de éxito en mi portfolio.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Spots Counter & CTA */}
            <div className="early-action-col">
              <div className="early-spots-box">
                <span className="spots-kicker">CUPOS DISPONIBLES</span>
                <div className="spots-count-display">
                  <span className="spots-num">5</span>
                  <span className="spots-total">/ 5 lugares</span>
                </div>
                <p className="spots-note">
                  Cupo limitado para garantizarte dedicación total en tu proyecto.
                </p>

                <div className="spots-progress-bar">
                  <div className="spots-progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span className="spots-status-text">Inscripciones abiertas</span>

                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hostinger-primary btn-early-cta"
                  data-gtm="whatsapp_early_adopters"
                  onClick={() => trackWhatsAppClick('early_adopters_cta', 'Programa_Primeros_Clientes')}
                >
                  <MessageSquare size={18} />
                  <span>POSTULARME POR WHATSAPP</span>
                  <ArrowRight size={17} />
                </a>

                <span className="early-helper-text">
                  Escribime y contame de qué es tu negocio para reservar tu lugar.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

