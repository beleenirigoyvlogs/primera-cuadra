import React from 'react';
import { 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Search,
  Send,
  MapPin,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

export default function VisualJourneyFlow() {
  const steps = [
    {
      num: '01',
      title: 'Te busca',
      channel: 'Google',
      description: 'Encuentra tu negocio cuando busca un producto o servicio en tu zona.',
      icon: Search,
      accent: 'google',
      tag: 'Búsqueda Local',
      bullets: [
        'Aparece en Google Maps cuando buscan en tu localidad',
        'Información actualizada de dirección, fotos y horarios',
        'Perfil verificado y optimizado para generar confianza'
      ]
    },
    {
      num: '02',
      title: 'Te conoce',
      channel: 'Tu página web',
      description: 'Conoce tus servicios, productos, ubicación e información.',
      icon: Globe,
      accent: 'web',
      tag: 'Tu Vidriera Digital',
      bullets: [
        'Página web propia con dominio a tu nombre (.com o .com.ar)',
        'Diseño rápido, claro y optimizado para ver desde el celular',
        'Detalle de tus productos, servicios, precios y propuestas'
      ]
    },
    {
      num: '03',
      title: 'Te contacta',
      channel: 'WhatsApp',
      description: 'Consulta, pide información o solicita un presupuesto.',
      icon: Send,
      accent: 'wa',
      tag: 'Contacto Directo',
      bullets: [
        'Botón directo a WhatsApp para consultar sin trámites',
        'Catálogo organizado con fotos, precios y disponibilidad',
        'Respuestas ágiles para atender a la persona en el momento'
      ]
    }
  ];

  return (
    <section className="visual-journey-section" id="como-funciona">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>EL RECORRIDO DEL CLIENTE</span>
          </div>
          <h2 className="section-title">
            Así te encuentra un <span className="highlight-purple">nuevo cliente</span>
          </h2>
          <p className="section-subtitle">
            Conectamos los tres canales esenciales para que una persona interesada en tus productos o servicios te encuentre, te conozca y te escriba directamente.
          </p>
        </div>

        {/* Visual Roadmap Grid with Connecting Flow */}
        <div className="journey-roadmap-wrapper">
          {/* Progress Connector Line (Desktop) */}
          <div className="journey-connector-line" aria-hidden="true"></div>

          <div className="journey-cards-grid">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div className={`journey-step-card card-${step.accent}`}>
                    {/* Top Phase & Step Indicator */}
                    <div className="journey-card-top">
                      <span className="journey-step-num">{step.num}</span>
                      <span className={`journey-phase-badge badge-${step.accent}`}>
                        {step.channel}
                      </span>
                    </div>

                    {/* Icon Box */}
                    <div className={`journey-icon-box icon-${step.accent}`}>
                      <IconComp size={24} />
                    </div>

                    {/* Step Title & Channel Subtitle */}
                    <div className="journey-text-group">
                      <h3 className="journey-step-title">{step.title}</h3>
                      <div className="journey-channel-badge">{step.channel}</div>
                      <p className="journey-step-desc">{step.description}</p>
                    </div>

                    {/* Bullet Points */}
                    <div className="journey-bullets-box">
                      {step.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="journey-bullet-item">
                          <CheckCircle2 size={16} className={`bullet-check check-${step.accent}`} />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card Bottom Tag */}
                    <div className="journey-card-footer">
                      <span className="journey-footer-tag">{step.tag}</span>
                    </div>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="journey-step-flow-arrow" aria-hidden="true">
                      <div className="arrow-circle">
                        <ArrowDown size={15} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
