import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Primera abierta por defecto
  const whatsappNumber = '5491128779641';

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappDoubtMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Estuve leyendo las preguntas frecuentes en la web y tengo algunas dudas sobre mi negocio. ¿Podrían asesorarme?'
  );

  const faqItems = [
    {
      q: '¿Qué incluye el servicio y cómo funciona?',
      paragraphs: [
        'Me ocupo personalmente de crear y organizar la presencia digital de tu negocio. Según el plan, incluyo tu página web mobile-first a medida, dominio propio (.com o .com.ar), optimización de tu ficha en Google Maps y configuración de WhatsApp Business con catálogo de servicios y tarifas.',
        'Todo conectado para que tus clientes te encuentren en Google, vean tus precios y te escriban directamente.'
      ]
    },
    {
      q: '¿Cuánto tarda en estar lista mi página?',
      paragraphs: [
        'En los planes estándar (Express, Solo Web y Completo), mi tiempo de entrega estimado es de 4 días hábiles (48 horas para Express) desde que recibo tu material básico.',
        'Cero demoras burocráticas: trabajo de forma directa con vos.'
      ]
    },
    {
      q: '¿Cuánto cuesta y cómo se paga?',
      paragraphs: [
        'Precios de lanzamiento transparentes para los primeros 5 negocios: Plan Express ($120.000), Solo Web ($150.000) y Completo ($250.000).',
        'La condición de pago es 50% al iniciar y 50% contra entrega conforme, una vez que revisás la web y confirmás que todo funciona a la perfección.',
        'Acepto transferencia bancaria, Mercado Pago o efectivo.'
      ]
    },
    {
      q: '¿Qué pasa después del primer año con el dominio y el hosting?',
      paragraphs: [
        'Tu página web y tu dominio son 100% de tu propiedad. Durante el primer año, tanto el hosting de alta velocidad como el dominio están incluidos en el costo del plan.',
        'A partir del segundo año, solo abonás la renovación anual básica de dominio y hosting para mantenerla online (el valor se informa al momento de contratar). Sin abonos mensuales obligatorios ni costos ocultos.'
      ]
    },
    {
      q: '¿Tengo que preparar yo todo el contenido y las fotos?',
      paragraphs: [
        'Me mandás lo que tengas a mano por WhatsApp: fotos del local o trabajos, lista de precios o servicios y datos de contacto.',
        'Yo me encargo de redactar los textos, estructurar las secciones y optimizar las imágenes para celular. Si no tenés fotos profesionales, te oriento y seleccionamos imágenes representativas de tu rubro.'
      ]
    },
    {
      q: '¿Podés garantizar que mi negocio aparezca primero en Google?',
      paragraphs: [
        'No. La posición exacta en Google depende de su algoritmo y nadie honesto puede garantizarte el puesto #1.',
        'Lo que sí hago es trabajar sobre los factores técnicos y comerciales que puedo optimizar: categoría exacta, palabras clave de tu zona, ficha verificada, fotos, reseñas y una web que cargue en menos de 1 segundo en celulares.'
      ]
    },
    {
      q: '¿Por qué se llama "Primera Cuadra"?',
      paragraphs: [
        'Porque en el comercio tradicional, estar en la primera cuadra significa estar donde la gente camina, mira las vidrieras y entra a comprar.',
        'Llevo esa misma ventaja a Internet: que tu negocio tenga su vidriera principal conectando Google, Web y WhatsApp.'
      ]
    }
  ];

  return (
    <section className="faq-section-wrapper" id="preguntas">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <HelpCircle size={14} />
            <span>RESPUESTAS CLARAS</span>
          </div>
          <h2 className="section-title">
            Preguntas frecuentes
          </h2>
          <p className="section-subtitle">
            Todo lo que necesitás saber antes de empezar.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list reveal">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? <Minus size={18} strokeWidth={2.4} /> : <Plus size={18} strokeWidth={2.4} />}
                  </span>
                </button>

                <div className={`faq-answer-collapse ${isOpen ? 'is-open' : ''}`}>
                  <div className="faq-answer-inner">
                    <div className="faq-answer-content">
                      {faq.paragraphs.map((pText, pIdx) => (
                        <p key={pIdx} className="faq-answer-paragraph">
                          {pText}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
