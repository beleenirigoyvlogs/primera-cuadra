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
      q: '¿Qué incluye el servicio de Primera Cuadra?',
      paragraphs: [
        'Nos ocupamos de crear y organizar la presencia digital de tu negocio. Según el proyecto, podemos incluir página web, dominio, optimización de tu presencia en Google, configuración de WhatsApp Business y catálogo de productos o servicios.',
        'La propuesta se adapta a las necesidades de cada negocio, para que no pagues por herramientas que no necesitás.'
      ]
    },
    {
      q: '¿Para qué rubros trabajan?',
      paragraphs: [
        'Trabajamos con negocios, profesionales y empresas de prácticamente cualquier rubro: comercios, gastronomía, talleres, inmobiliarias, servicios, salud, profesionales y mucho más.',
        'La estructura, los textos y las funcionalidades se adaptan a cada proyecto.',
        'No necesitás adaptar tu negocio a una plantilla. Nosotros adaptamos la solución a tu negocio.'
      ]
    },
    {
      q: '¿Ya tengo Instagram o Facebook. Necesito una página web?',
      paragraphs: [
        'No es obligatorio, pero cumplen funciones diferentes.',
        'Las redes sociales ayudan a mostrar y comunicar tu negocio, mientras que una página web te permite tener un espacio propio donde presentar tus servicios, productos, información y formas de contacto de manera ordenada y profesional.',
        'Además, puede funcionar como un punto central al que enviar a las personas desde Google, Instagram y WhatsApp.'
      ]
    },
    {
      q: '¿También trabajan con Google y WhatsApp Business?',
      paragraphs: [
        'Sí. Podemos ayudarte a mejorar y organizar tu presencia en Google y configurar tu WhatsApp Business para que los clientes tengan un canal de contacto claro.',
        'También podemos organizar un catálogo de productos o servicios y conectar estos canales con tu página web.',
        'La idea es que Google, tu web y WhatsApp trabajen como parte de una misma presencia digital.'
      ]
    },
    {
      q: '¿Pueden garantizar que mi negocio aparezca primero en Google?',
      paragraphs: [
        'No. La posición en Google no puede garantizarse, ya que depende de distintos factores y puede cambiar con el tiempo.',
        'Lo que sí hacemos es trabajar sobre los elementos de tu presencia digital que podemos optimizar: información del negocio, contenido, enlaces, estructura de la web y otros aspectos relevantes.',
        'Nuestro objetivo es construir una presencia sólida y bien organizada, no prometer una posición que no depende exclusivamente de nosotros.'
      ]
    },
    {
      q: '¿Cuánto tarda en estar lista mi página?',
      paragraphs: [
        'El tiempo depende del proyecto y de la cantidad de contenido y funcionalidades necesarias.',
        'En los proyectos incluidos en nuestros planes estándar, la entrega estimada es de 4 días hábiles, siempre que contemos con la información y el material necesario para comenzar.',
        'Si el proyecto requiere funcionalidades especiales, te indicamos previamente el plazo estimado.'
      ]
    },
    {
      q: '¿Tengo que preparar yo todo el contenido?',
      paragraphs: [
        'Te pedimos la información y el material que tengas disponible, como logo, fotos, productos, servicios, horarios o datos de contacto.',
        'Nosotros nos encargamos de organizarlo y adaptarlo a la estructura de la página.',
        'Si todavía no tenés todo preparado, lo vemos juntos y te indicamos qué necesitamos.'
      ]
    },
    {
      q: '¿La página funciona bien en celulares?',
      paragraphs: [
        'Sí. Diseñamos las páginas pensando especialmente en dispositivos móviles, ya que gran parte de las consultas de los clientes se realizan desde el teléfono.',
        'La información, botones, imágenes y formularios se adaptan a distintos tamaños de pantalla para ofrecer una navegación cómoda.'
      ]
    },
    {
      q: '¿Cuánto cuesta y cómo se paga?',
      paragraphs: [
        'El precio depende del tipo de página, las funcionalidades y los servicios que necesite tu negocio.',
        'Contamos con diferentes opciones para adaptarnos a distintos proyectos.',
        'Para comenzar, trabajamos con 50% al iniciar y 50% contra entrega, según las condiciones del proyecto.',
        'Si nos contás qué necesitás, podemos indicarte qué opción se adapta mejor a tu negocio.'
      ]
    },
    {
      q: '¿Puedo ver cómo podría quedar mi negocio antes de decidir?',
      paragraphs: [
        'Sí. Podemos mostrarte ejemplos y, según el caso, preparar una propuesta visual para que tengas una idea concreta de cómo podría verse tu negocio online antes de avanzar.',
        'No necesitás imaginarlo: podemos mostrártelo.'
      ]
    },
    {
      q: '¿Por qué se llama "Primera Cuadra"?',
      paragraphs: [
        'Porque en un negocio físico, estar en la primera cuadra significa estar donde más fácilmente te encuentran.',
        'Nosotros llevamos esa idea a Internet: ayudamos a que tu negocio tenga una presencia digital profesional, fácil de encontrar y simple de contactar.',
        'Google + Página Web + WhatsApp Business.',
        'Esa es tu Primera Cuadra digital.'
      ]
    }
  ];

  return (
    <section className="faq-section-wrapper" id="preguntas">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
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
        <div className="faq-accordion-list">
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

        {/* Bottom Elegant WhatsApp CTA */}
        <div className="faq-cta-banner">
          <div className="faq-cta-badge">
            <MessageCircle size={14} />
            <span>CONSULTA SIN COMPROMISO</span>
          </div>
          <h3 className="faq-cta-title">¿Todavía tenés dudas?</h3>
          <p className="faq-cta-desc">
            Contanos qué necesitás y te ayudamos a encontrar la opción adecuada para tu negocio.
          </p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappDoubtMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hostinger-primary faq-cta-btn"
          >
            <MessageCircle size={18} />
            <span>HABLAR POR WHATSAPP</span>
          </a>
        </div>
      </div>
    </section>
  );
}
