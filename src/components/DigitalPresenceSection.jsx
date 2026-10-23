import React from 'react';
import { 
  Globe, 
  MapPin, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

export default function DigitalPresenceSection() {
  const defaultWhatsappNumber = '5491128779641';
  const whatsappAppsMsg = encodeURIComponent(
    'Hola, llegué desde Primera Cuadra y quiero consultar por el desarrollo de una aplicación móvil para mi negocio. ¿Podrían asesorarme y pasarme los valores?'
  );

  const cards = [
    {
      num: '01',
      title: 'Página Web',
      text: 'Una web profesional adaptada a tu negocio.',
      icon: Globe,
      accent: 'web',
      features: [
        'Dominio propio (.com o .com.ar)',
        'Diseño responsive adaptado a celulares',
        'Secciones claras para tus servicios o productos'
      ]
    },
    {
      num: '02',
      title: 'Google',
      text: 'Una presencia de Google completa y actualizada.',
      icon: MapPin,
      accent: 'google',
      features: [
        'Ficha en Google Maps optimizada',
        'Fotos de calidad, horarios y ubicación',
        'Canal directo hacia tu página web'
      ]
    },
    {
      num: '03',
      title: 'WhatsApp Business',
      text: 'Un canal directo de contacto con catálogo de productos o servicios.',
      icon: MessageSquare,
      accent: 'whatsapp',
      features: [
        'Catálogo digital configurado y organizado',
        'Respuestas rápidas para tus clientes',
        'Botón de contacto en tu página web sin intermediarios'
      ]
    },
    {
      num: '04',
      title: 'Desarrollo de aplicaciones móviles',
      text: 'Creamos apps a medida para llevar tu negocio al celular.',
      icon: Smartphone,
      accent: 'apps',
      features: [
        'Apps a medida para Android y iOS',
        'Turnos, catálogos o reservas según tu proyecto',
        'Presupuesto personalizado para tu negocio'
      ],
      isAppCard: true
    }
  ];

  return (
    <section className="digital-presence-section" id="servicios">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>SOLUCIÓN INTEGRAL</span>
          </div>
          <h2 className="section-title">
            Una presencia digital <span className="highlight-purple">completa</span>
          </h2>
          <p className="section-subtitle">
            No necesitás contratar múltiples proveedores distintos. Primera Cuadra integra tu página web, tu ficha de Google, tu WhatsApp Business y el desarrollo de tu aplicación móvil en soluciones coordinadas para tu negocio.
          </p>

          {/* Visual Connection Ribbon between the elements */}
          <div className="presence-flow-connector reveal" aria-label="Flujo de conexión: Google a Web, WhatsApp y Apps">
            <div className="connector-node">
              <MapPin size={16} className="text-google-color" />
              <span>Google</span>
            </div>
            <div className="connector-arrow">→</div>
            <div className="connector-node active-web-node">
              <Globe size={16} className="text-brand-purple" />
              <span>Página Web</span>
            </div>
            <div className="connector-arrow">→</div>
            <div className="connector-node">
              <MessageSquare size={16} className="text-wa-color" />
              <span>WhatsApp Business</span>
            </div>
            <div className="connector-arrow">→</div>
            <div className="connector-node">
              <Smartphone size={16} className="text-apps-color" />
              <span>Apps Móviles</span>
            </div>
          </div>
        </div>

        {/* Pillars Cards Grid */}
        <div className="presence-cards-grid reveal-group">
          {cards.map((c, idx) => {
            const IconComponent = c.icon;
            return (
              <div key={idx} className={`presence-feature-card card-${c.accent} ${c.isAppCard ? 'card-app-highlight' : ''} reveal`}>
                <div className="presence-card-header">
                  <span className="presence-num">{c.num}</span>
                  <div className={`presence-icon-sq ${c.accent}`}>
                    <IconComponent size={24} />
                  </div>
                </div>

                <h3 className="presence-card-title">{c.title}</h3>
                <p className="presence-card-desc">{c.text}</p>

                <ul className="presence-bullets">
                  {c.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <CheckCircle2 size={16} className="presence-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {c.isAppCard && (
                  <div className="presence-card-footer-action">
                    <a 
                      href={`https://wa.me/${defaultWhatsappNumber}?text=${whatsappAppsMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-presence-card-wa"
                    >
                      <MessageSquare size={15} />
                      <span>Consultar por WhatsApp</span>
                    </a>
                    <a href="#apps-moviles" className="presence-card-more-link">
                      <span>Ver detalles de apps</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
