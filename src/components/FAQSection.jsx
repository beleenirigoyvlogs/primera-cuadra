import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';
import { FAQS } from '../data/nicheData';

export default function FAQSection({ niche }) {
  const [openIndex, setOpenIndex] = useState(0); // First open by default
  const whatsappNumber = '5491128779641';

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappDoubtMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Tengo una consulta sobre el servicio de páginas web y presencia digital para mi negocio. ¿Me podrían asesorar?'
  );

  return (
    <section className="faq-section-wrapper" id="preguntas-frecuentes">
      <div className="container">
        <div className="section-header-center">
          <div className="section-kicker-tag">
            <HelpCircle size={14} />
            <span>RESPUESTAS CLARAS</span>
          </div>
          <h2 className="section-title">
            Preguntas frecuentes
          </h2>
          <p className="section-subtitle">
            Todo lo que necesitás saber antes de dar el paso para llevar tu negocio a la Primera Cuadra.
          </p>
        </div>

        {/* Accordion list */}
        <div className="faq-accordion-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="faq-item-card"
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'none', 
                      transition: 'transform 0.2s ease',
                      color: isOpen ? '#673de6' : '#9ca3af',
                      flexShrink: 0
                    }} 
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Banner (Hostinger style) */}
        <div className="faq-cta-banner">
          <strong>¿Tenés alguna duda específica sobre tu rubro?</strong>
          <p>Escribinos directamente por WhatsApp. Te responde una persona real al instante, sin intermediarios ni demoras.</p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappDoubtMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hostinger-primary"
            style={{ display: 'inline-flex', padding: '10px 22px', fontSize: '0.9rem' }}
          >
            <MessageCircle size={17} />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
