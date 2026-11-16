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
        'Me ocupo de crear y organizar la presencia digital de tu negocio. Según el proyecto, incluyo página web, dominio, optimización de tu presencia en Google, configuración de WhatsApp Business y catálogo de productos o servicios.',
        'Mi propuesta se adapta a las necesidades de cada negocio, para que no pagues por herramientas que no necesitás.'
      ]
    },
    {
      q: '¿Para qué rubros trabajás?',
      paragraphs: [
        'Trabajo con negocios, profesionales y empresas de prácticamente cualquier rubro: comercios, gastronomía, talleres, inmobiliarias, servicios, salud, profesionales y mucho más.',
        'La estructura, los textos y las funcionalidades se adaptan a cada proyecto.',
        'No necesitás adaptar tu negocio a una plantilla. Yo adapto la solución a tu negocio.'
      ]
    },
    {
      q: '¿Ya tengo Instagram o Facebook. Necesito una página web?',
      paragraphs: [
        'No es obligatorio, pero cumplen funciones diferentes.',
        'Las redes sociales ayudan a mostrar y comunicar tu negocio, mientras que una página web te permite tener un espacio propio donde presentar tus servicios, productos, información y formas de contacto de manera ordenada y profesional.',
        'Además, funciona como un punto central al que enviar a las personas desde Google, Instagram y WhatsApp.'
      ]
    },
    {
      q: '¿También trabajás con Google y WhatsApp Business?',
      paragraphs: [
        'Sí. Te ayudo a mejorar y organizar tu presencia en Google y configuro tu WhatsApp Business para que tus clientes tengan un canal de contacto claro.',
        'También puedo organizar tu catálogo de productos o servicios y conectar estos canales con tu página web.',
        'La idea es que Google, tu web y WhatsApp trabajen como parte de una misma presencia digital.'
      ]
    },
    {
      q: '¿Podés garantizar que mi negocio aparezca primero en Google?',
      paragraphs: [
        'No. La posición en Google no puede garantizarse, ya que depende de distintos factores del algoritmo y puede cambiar con el tiempo.',
        'Lo que sí hago es trabajar sobre los elementos de tu presencia digital que podemos optimizar: información del negocio, contenido, enlaces, estructura de la web y ficha local.',
        'Mi objetivo es construirte una presencia sólida y bien organizada, no prometerte una posición que no depende exclusivamente de mí.'
      ]
    },
    {
      q: '¿Cuánto tarda en estar lista mi página?',
      paragraphs: [
        'El tiempo depende del proyecto y de la cantidad de contenido necesario.',
        'En los planes estándar, mi entrega estimada es de 4 días hábiles desde que recibo tu material.',
        'Si el proyecto requiere funcionalidades especiales, te indico previamente el plazo estimado.'
      ]
    },
    {
      q: '¿Tengo que preparar yo todo el contenido?',
      paragraphs: [
        'Te pido la información y el material que tengas disponible: logo, fotos, productos, servicios, horarios o datos de contacto.',
        'Yo me encargo de organizarlo y adaptarlo a la estructura de la página.',
        'Si todavía no tenés todo preparado, lo vemos juntos y te oriento sobre qué necesitamos.'
      ]
    },
    {
      q: '¿La página funciona bien en celulares?',
      paragraphs: [
        'Sí. Diseño las páginas pensando especialmente en dispositivos móviles, ya que más del 80% de las consultas se realizan desde el teléfono.',
        'La información, botones, imágenes y formularios se adaptan a distintos tamaños de pantalla para ofrecer una navegación cómoda.'
      ]
    },
    {
      q: '¿Cuánto cuesta y cómo se paga?',
      paragraphs: [
        'Tengo precios de lanzamiento claros para los primeros 5 negocios: Pack Express ($120.000), Pack Solo Web ($150.000) y Pack Completo con Web Propia ($250.000).',
        'La condición de pago es 50% al iniciar / 50% contra entrega conforme una vez que revisás que todo funciona a la perfección.',
        'Acepto transferencia bancaria, Mercado Pago o efectivo.'
      ]
    },
    {
      q: '¿Qué pasa después del primer año?',
      paragraphs: [
        'Tu página web y tu dominio son 100% de tu propiedad. Durante el primer año el hosting y el dominio están incluidos en el precio del pack.',
        'A partir del segundo año, solo abonás la renovación anual del dominio y el hosting para que tu sitio continúe online (el valor de la renovación anual se informa al momento de contratar).',
        'No hay contratos de permanencia, ni alquileres forzados, ni sorpresas.',
        'Además, si querés que yo me ocupe de hacer cambios, subir fotos o actualizar novedades mes a mes, ofrezco un servicio de mantenimiento mensual opcional por $50.000/mes (totalmente a tu elección).'
      ]
    },
    {
      q: '¿Puedo ver cómo podría quedar mi negocio antes de decidir?',
      paragraphs: [
        'Sí. Te muestro una propuesta base gratis antes de que decidas para que tengas una idea concreta de cómo podría verse tu negocio online antes de avanzar.',
        'No necesitás imaginarlo: te lo muestro.'
      ]
    },
    {
      q: '¿Por qué se llama "Primera Cuadra"?',
      paragraphs: [
        'Porque en un negocio físico, estar en la primera cuadra significa estar donde más fácilmente te encuentran.',
        'Yo llevo esa idea a Internet: ayudo a que tu negocio tenga una presencia digital profesional, fácil de encontrar y simple de contactar.',
        'Google + Página Web + WhatsApp Business. Esa es tu Primera Cuadra digital.'
      ]
    },
    {
      q: '¿También desarrollás aplicaciones móviles o sistemas?',
      paragraphs: [
        'Contame tu proyecto y te digo si puedo ayudarte y con qué alcance.',
        'Desarrollo soluciones a medida según los requerimientos técnicos y comerciales de cada caso.'
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
