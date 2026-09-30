import React from 'react';
import { 
  HelpCircle, 
  ArrowRight, 
  MessageSquare, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  Smartphone,
  MapPin,
  ListOrdered,
  Briefcase,
  Users
} from 'lucide-react';

export default function BusinessSituationsSection() {
  const defaultWhatsappNumber = '5491128779641';
  const whatsappConsultMsg = encodeURIComponent(
    '¡Hola Primera Cuadra! Estuve leyendo las situaciones en la web y me siento identificado con mi negocio. Me gustaría consultar cómo podrían ayudarme a mejorar mi presencia digital.'
  );

  const situations = [
    {
      icon: Smartphone,
      text: 'Tengo Instagram, pero no tengo página web.',
      detail: 'Tu perfil en redes atrae gente, pero cuando un cliente busca en Google o necesita ver precios y formalidad, no encuentra una página web oficial.'
    },
    {
      icon: MapPin,
      text: 'Mi negocio aparece en Google, pero mi información está incompleta.',
      detail: 'Tenés una ficha automática o desactualizada, sin fotos de calidad, sin horarios correctos y sin enlace a tu propia web.'
    },
    {
      icon: MessageSquare,
      text: 'Mis clientes me preguntan constantemente por WhatsApp.',
      detail: 'Respondés los mismos precios, horarios y dudas todo el día a mano porque tu negocio no tiene la información ordenada en un solo lugar.'
    },
    {
      icon: ListOrdered,
      text: 'Tengo productos o servicios pero no tengo un catálogo organizado.',
      detail: 'Mandás fotos sueltas o PDFs pesados en vez de tener un catálogo digital interactivo y fácil de ver desde cualquier teléfono.'
    },
    {
      icon: Briefcase,
      text: 'Quiero que mi negocio se vea más profesional.',
      detail: 'Buscás transmitir la misma calidad, confianza y respaldo en internet que ofrecés todos los días cuando atendés a tus clientes en persona.'
    },
    {
      icon: Users,
      text: 'Dependo solo del boca en boca para conseguir clientes nuevos.',
      detail: 'El boca en boca es valioso, pero cuando un cliente potencial busca lo que hacés en tu zona en Google, termina contratando a la competencia si no te encuentra.'
    }
  ];

  return (
    <section className="situations-section-wrapper" id="situaciones">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <HelpCircle size={14} />
            <span>DIAGNÓSTICO RÁPIDO</span>
          </div>
          <h2 className="section-title">
            ¿Tu negocio está en alguna de <span className="highlight-purple">estas situaciones</span>?
          </h2>
          <p className="section-subtitle">
            Muchos comercios y profesionales arrancan con lo que tienen a mano, pero llega un momento en que necesitan ordenar su presencia digital para seguir creciendo.
          </p>
        </div>

        {/* Situations Grid */}
        <div className="situations-cards-grid reveal-group">
          {situations.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="situation-card reveal">
                <div className="situation-card-header">
                  <div className="situation-icon-box">
                    <IconComponent size={20} />
                  </div>
                  <span className="situation-check-badge">Común</span>
                </div>
                <h3 className="situation-card-title">“{item.text}”</h3>
                <p className="situation-card-detail">{item.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Closing Resolution Box */}
        <div className="situations-resolution-box reveal">
          <div className="resolution-text-group">
            <div className="resolution-badge">
              <Sparkles size={16} />
              <span>LA SOLUCIÓN</span>
            </div>
            <h3 className="resolution-title">Primera Cuadra puede ayudarte.</h3>
            <p className="resolution-desc">
              Nos encargamos de diseñar tu página web, optimizar tu ficha de Google y ordenar tu WhatsApp Business para que tengas una presencia digital seria, clara y lista para recibir consultas.
            </p>
          </div>

          <a 
            href={`https://wa.me/${defaultWhatsappNumber}?text=${whatsappConsultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hostinger-primary resolution-cta-btn"
          >
            <span>QUIERO CONSULTAR</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
