import React from 'react';
import { 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export default function FinalCtaSection() {
  const defaultWhatsappNumber = '5491128779641';
  const whatsappFinalMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Quiero mejorar la presencia digital de mi negocio. Hago [contanos tu actividad aquí] y me gustaría ver cómo podría verse online.'
  );

  return (
    <section className="final-cta-section-wrapper" id="contacto">
      <div className="container">
        <div className="final-cta-card">
          <div className="final-cta-kicker">
            <Sparkles size={15} />
            <span>EL SIGUIENTE PASO</span>
          </div>

          <h2 className="final-cta-title">
            ¿Querés mejorar la presencia digital <br className="hidden-mobile" />
            <span className="highlight-purple-light">de tu negocio</span>?
          </h2>

          <p className="final-cta-text">
            Contanos qué hacés y te mostramos cómo podría verse tu negocio online.
          </p>

          <div className="final-cta-button-wrap">
            <a 
              href={`https://wa.me/${defaultWhatsappNumber}?text=${whatsappFinalMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-final-whatsapp-action"
            >
              <MessageSquare size={20} />
              <span>QUIERO HABLAR POR WHATSAPP</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="final-cta-trust-items">
            <div className="final-trust-chip">
              <CheckCircle2 size={15} className="trust-check" />
              <span>Asesoramiento sin cargo</span>
            </div>
            <div className="final-trust-chip">
              <CheckCircle2 size={15} className="trust-check" />
              <span>Sin compromisos</span>
            </div>
            <div className="final-trust-chip">
              <CheckCircle2 size={15} className="trust-check" />
              <span>Respuesta rápida en el día</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
