import React from 'react';
import { 
  MessageSquareCheck, 
  Settings, 
  Rocket, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      number: '01',
      icon: MessageSquareCheck,
      title: 'Relevamiento express por WhatsApp',
      duration: '15 min',
      color: 'cyan',
      description: 'Sin reuniones pesadas ni trámites complejos. Te mando 4 preguntas puntuales por WhatsApp para que me pases tus fotos, lista de servicios, precios de referencia y dirección.',
      bulletList: [
        'Fotos de tu local, productos o trabajos',
        'Lista de servicios y tarifas actuales',
        'Cero tecnicismos: yo me ocupo de todo'
      ]
    },
    {
      number: '02',
      icon: Settings,
      title: 'Optimización y configuración pro',
      duration: '48 h a 4 días',
      color: 'amber',
      description: 'Configuro tu presencia en Google con la categoría correspondiente, fotos y servicios, desarrollo tu página web profesional y dejo tu WhatsApp Business con catálogo listo para recibir consultas.',
      bulletList: [
        'Ficha optimizada para búsquedas de tu zona en Google Maps',
        'Carga de catálogo con precios y botón de contacto en WhatsApp',
        'En Pack Completo: diseño de tu web y registro de dominio'
      ]
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Entrega llave en mano y lanzamiento',
      duration: 'Puesta en marcha',
      color: 'emerald',
      description: 'Te entrego los accesos completos y te muestro cómo funciona cada canal. Tu negocio queda formalmente en la Primera Cuadra digital.',
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
            ¿Cómo trabajo? <span className="text-gradient-ocean">3 simples pasos</span> sin vueltas
          </h2>
          <p className="section-main-desc">
            Sé que tu tiempo vale oro atendiendo tu negocio. Mi proceso está diseñado para no quitarte más de 15 minutos.
          </p>
        </div>

        <div className="process-steps-grid reveal-group">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className={`process-step-card color-${step.color} reveal`}>
                <div className="step-card-header">
                  <span className="step-watermark">{step.number}</span>
                  <div className={`step-icon-wrapper ${step.color}`}>
                    <IconComponent size={24} />
                  </div>
                </div>

                <h3 className="step-card-title">{step.title}</h3>

                <div className="step-badge-time">
                  <Clock size={13} />
                  <span>{step.duration}</span>
                </div>

                <p className="step-card-desc">{step.description}</p>

                <ul className="step-bullet-list">
                  {step.bulletList.map((item, bIdx) => (
                    <li key={bIdx}>
                      <CheckCircle2 size={16} className={`text-${step.color}`} />
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
