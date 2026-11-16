import React from 'react';
import { 
  Globe, 
  MapPin, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

export default function DigitalPresenceSection() {
  const whatsappNumber = '5491128779641';

  const services = [
    {
      num: '01',
      title: 'Páginas Web Profesionales',
      kicker: 'MOBILE-FIRST & DOMINIO PROPIO',
      icon: Globe,
      accent: 'web',
      desc: 'Diseñamos tu página web a medida, moderna, ultra rápida y pensada para convertir visitas en consultas directas de clientes.',
      features: [
        'Dominio propio incluido a tu nombre (.com o .com.ar)',
        'Diseño responsive mobile-first optimizado para celulares',
        'Hosting cloud de alta velocidad con certificado de seguridad SSL',
        'Secciones a medida: Servicios, Fotos, Tarifas y Quiénes Somos',
        'Botón flotante de WhatsApp oficial para recibir consultas al instante',
        '100% de tu propiedad (sin alquileres forzados; renovación anual transparente de hosting y dominio)'
      ],
      ctaText: 'Consultar por Página Web',
      waMsg: encodeURIComponent('¡Hola Belén! Me interesa consultar por el servicio de Diseño y Desarrollo de Página Web profesional para mi negocio.'),
      link: '#precios'
    },
    {
      num: '02',
      title: 'Posicionamiento en Google Maps',
      kicker: 'Ficha optimizada para búsquedas de tu zona',
      icon: MapPin,
      accent: 'google',
      desc: 'Optimizamos tu ficha oficial de empresa en Google y Google Maps para que aparezcas de forma profesional y clara cuando los clientes de tu zona busquen lo que ofrecés.',
      features: [
        'Ficha en Google Maps 100% verificada, configurada y optimizada',
        'Carga de fotos de calidad, horarios de atención y teléfono de contacto',
        'Ubicación exacta sincronizada para Google Maps y Waze',
        'Categorización estratégica y palabras clave de tu localidad',
        'Gestión de respuestas a opiniones para transmitir máxima confianza',
        'Canal directo hacia tu página web y botón de llamada telefónica'
      ],
      ctaText: 'Consultar por Google Maps',
      waMsg: encodeURIComponent('¡Hola Belén! Me interesa consultar por el servicio de Ficha optimizada para búsquedas de tu zona en Google Maps para mi comercio.'),
      link: '#precios'
    },
    {
      num: '03',
      title: 'WhatsApp Business con Catálogo',
      kicker: 'CANAL DE VENTAS OFICIAL',
      icon: MessageSquare,
      accent: 'whatsapp',
      desc: 'Transformamos tu canal de WhatsApp en una herramienta formal de ventas con catálogo cargado, mensajes automáticos y atención ágil.',
      features: [
        'Perfil de empresa oficial configurado con logo, dirección y horarios',
        'Catálogo digital interactivo con fotos, descripciones y precios claros',
        'Mensajes de bienvenida automáticos y respuestas rápidas guardadas',
        'Enlaces directos para enviar productos específicos en el chat',
        'Botón de contacto directo sincronizado en tu web sin intermediarios',
        'Organización de conversaciones con etiquetas personalizadas'
      ],
      ctaText: 'Consultar por WhatsApp Business',
      waMsg: encodeURIComponent('¡Hola Belén! Me interesa consultar por el servicio de configuración de WhatsApp Business oficial con catálogo para mi comercio.'),
      link: '#precios'
    }
  ];

  return (
    <section className="digital-presence-section services-portfolio-section" id="servicios">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>NUESTROS SERVICIOS PROFESIONALES</span>
          </div>
          <h2 className="section-title">
            Servicios a medida para <span className="highlight-purple">impulsar tu negocio</span>
          </h2>
          <p className="section-subtitle">
            Ofrecemos servicios individuales y soluciones integradas de diseño web, ficha optimizada para búsquedas de tu zona y configuración de canales directos para que consigas más clientes.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="services-showcase-grid reveal-group">
          {services.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div 
                key={idx} 
                className={`service-showcase-card card-accent-${s.accent} reveal`}
              >
                {/* Top Badge & Number */}
                <div className="service-card-header">
                  <div className={`service-icon-box ${s.accent}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="service-header-meta">
                    <span className="service-kicker-pill">{s.kicker}</span>
                    <span className="service-index-num">{s.num}</span>
                  </div>
                </div>

                {/* Service Title & Core Description */}
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>

                {/* Deliverables / Feature Checklist */}
                <div className="service-features-wrapper">
                  <span className="service-features-label">¿Qué incluye este servicio?</span>
                  <ul className="service-bullets-list">
                    {s.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <CheckCircle2 size={16} className={`service-check-icon ${s.accent}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Card Action Footer */}
                <div className="service-card-footer">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${s.waMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-service-action btn-service-${s.accent}`}
                    onClick={() => trackWhatsAppClick('service_card_btn', s.title)}
                  >
                    <MessageSquare size={16} />
                    <span>{s.ctaText}</span>
                    <ArrowRight size={15} />
                  </a>

                  {s.link && (
                    <a href={s.link} className="service-secondary-link">
                      <span>Ver planes y valores</span>
                      <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Discreet link to Custom Development (Apps & POS) */}
        <div className="custom-dev-discrete-callout reveal">
          <p>
            ¿Buscás soluciones avanzadas como <strong>Aplicaciones Móviles para iOS/Android</strong> o <strong>Sistemas POS con Control de Stock</strong> para tu local?
          </p>
          <a href="/desarrollo-a-medida" className="btn-custom-dev-link">
            <span>Conocé nuestros desarrollos a medida</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Bottom Integration Notice */}
        <div className="services-bottom-combo-banner reveal">
          <div className="combo-banner-content">
            <div className="combo-badge">
              <Zap size={14} />
              <span>PAQUETES INTEGRALES DISPONIBLES</span>
            </div>
            <h4 className="combo-title">¿Querés tu Web + Google Maps + WhatsApp todo junto en un solo paquete?</h4>
            <p className="combo-desc">
              En lugar de contratar servicios por separado, nuestros <strong>Packs Llave en Mano</strong> combinan todo el ecosistema con precio de lanzamiento para los primeros 5 negocios y entrega estimada en 4 días hábiles desde que recibimos tu material.
            </p>
          </div>
          <div className="combo-banner-action">
            <a href="#precios" className="btn-hostinger-primary btn-combo-cta">
              <span>VER PACKS Y PRECIOS</span>
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
