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
      title: 'Relevamiento Express por WhatsApp',
      duration: '15 minutos de tu tiempo',
      color: 'cyan',
      description: 'Sin reuniones pesadas ni trámites complejos. Te mandamos 4 preguntas puntuales por WhatsApp para que nos pases tus fotos, lista de servicios, precios de referencia y dirección.',
      bulletList: [
        'Fotos de tus instalaciones o embarcaciones',
        'Lista de servicios y tarifas actuales',
        'Cero tecnicismos: nosotros nos ocupamos de todo'
      ]
    },
    {
      number: '02',
      icon: Settings,
      title: 'Optimización y Configuración Pro',
      duration: '48hs (Express) / 4 días (Completo)',
      color: 'amber',
      description: 'Entramos a la cancha a trabajar. Optimizamos al 100% tu Ficha de Google con la categoría exacta, cargamos servicios, redactamos novedades SEO y dejamos tu WhatsApp Business con catálogo listo.',
      bulletList: [
        'Configuración de Google Maps y respuestas a reseñas',
        'Carga de catálogo con precios y botón de reserva en WhatsApp',
        'En Pack Completo: programación de tu web y registro de dominio'
      ]
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Entrega Llave en Mano y Lanzamiento',
      duration: 'Listo para recibir consultas',
      color: 'emerald',
      description: 'Te entregamos los accesos completos y te mostramos cómo funciona cada canal. Tu negocio queda formalmente en la Primera Cuadra digital de tu rubro.',
      bulletList: [
        'Verificación de funcionamiento en vivo con vos',
        'Pago del 50% saldo únicamente tras tu conformidad',
        'Soporte directo para dudas post-lanzamiento'
      ]
    }
  ];

  return (
    <section className="process-section-wrapper" id="como-funciona">
      <div className="container">
        <div className="section-header-center">
          <div className="section-kicker-pill">
            <Sparkles size={14} />
            <span>METODOLOGÍA SIMPLE Y ÁGIL</span>
          </div>
          <h2 className="section-main-title">
            ¿Cómo trabajamos? <span className="text-gradient-ocean">3 simples pasos</span> sin vueltas
          </h2>
          <p className="section-main-desc">
            Sabemos que tu tiempo vale oro atendiendo tu negocio. Nuestro proceso está diseñado para no quitarte más de 15 minutos.
          </p>
        </div>

        <div className="process-steps-grid">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className={`process-step-card color-${step.color}`}>
                <div className="step-card-header">
                  <span className="step-watermark">{step.number}</span>
                  <div className={`step-icon-wrapper ${step.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="step-badge-time">
                    <Clock size={13} />
                    <span>{step.duration}</span>
                  </div>
                </div>

                <h3 className="step-card-title">{step.title}</h3>
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

        {/* Bottom Banner */}
        <div className="process-guarantee-banner">
          <div className="banner-left">
            <ShieldCheck size={28} className="banner-icon" />
            <div>
              <strong>Garantía de Satisfacción 50/50</strong>
              <p>El 50% se abona al comenzar y el saldo restante recién contra entrega una vez que revisás que todo está perfecto.</p>
            </div>
          </div>

          <a href="#packs-precios" className="banner-btn">
            <span>Ver Tarifas</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
