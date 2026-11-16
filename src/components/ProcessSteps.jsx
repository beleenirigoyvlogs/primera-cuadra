import React from 'react';
import { 
  MessageSquareCheck, 
  Settings, 
  Rocket, 
  Sparkles, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      number: '01',
      icon: MessageSquareCheck,
      title: 'Relevamiento express por WhatsApp',
      duration: '15 min',
      description: 'Sin reuniones pesadas ni trámites complejos. Te mando 4 preguntas puntuales por WhatsApp para que me pases tus fotos, servicios y dirección.',
      bulletList: [
        'Fotos de tu local, productos o trabajos',
        'Lista de servicios y tarifas actuales',
        'Cero tecnicismos: yo me ocupo de todo'
      ]
    },
    {
      number: '02',
      icon: Settings,
      title: 'Configuración y puesta a punto',
      duration: '48 h a 4 días',
      description: 'Configuro tu presencia en Google Maps, desarrollo tu página web y dejo tu WhatsApp Business con catálogo listo para recibir consultas.',
      bulletList: [
        'Ficha optimizada para búsquedas de tu zona en Google Maps',
        'Catálogo con precios y botón de contacto en WhatsApp',
        'En Plan Completo: diseño de tu web y registro de dominio'
      ]
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Entrega llave en mano y lanzamiento',
      duration: 'Puesta en marcha',
      description: 'Te entrego los accesos completos y te muestro cómo funciona cada canal. Tu negocio queda listo para recibir nuevos clientes.',
      bulletList: [
        'Verificación de funcionamiento en vivo con vos',
        'Entrega formal con todos tus accesos y claves',
        'Soporte directo para dudas post-lanzamiento'
      ]
    }
  ];

  return (
    <section className="process-section-wrapper" id="como-funciona">
      <div className="container">
        <div className="section-header-center reveal">
          <div className="section-kicker-pill">
            <Sparkles size={14} />
            <span>METODOLOGÍA SIMPLE Y ÁGIL</span>
          </div>
          <h2 className="section-main-title">
            ¿Cómo trabajo? <span className="highlight-purple">3 simples pasos</span> sin vueltas
          </h2>
          <p className="section-main-desc">
            Sé que tu tiempo vale oro atendiendo tu negocio. Mi proceso está pensado para no quitarte más de 15 minutos.
          </p>
        </div>

        <div className="process-steps-grid reveal-group">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="process-step-card reveal">
                {/* 1. Header: number watermark and brand purple icon (bottom margin: 16px) */}
                <div className="step-card-header">
                  <span className="step-watermark">{step.number}</span>
                  <div className="step-icon-wrapper">
                    <IconComponent size={22} />
                  </div>
                </div>

                {/* 2. Card Title (bottom margin: 12px) */}
                <h3 className="step-card-title">{step.title}</h3>

                {/* 3. Duration badge pill (fit-content, bottom margin: 16px) */}
                <div className="step-badge-time">
                  <Clock size={12} />
                  <span>{step.duration}</span>
                </div>

                {/* 4. Body Description (bottom margin: 24px) */}
                <p className="step-card-desc">{step.description}</p>

                {/* 5. Fixed Divider (bottom margin: 20px) */}
                <div className="step-card-divider" />

                {/* 6. Checklist (all icons in unified brand purple) */}
                <ul className="step-bullet-list">
                  {step.bulletList.map((item, bIdx) => (
                    <li key={bIdx}>
                      <CheckCircle2 size={16} className="step-check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
