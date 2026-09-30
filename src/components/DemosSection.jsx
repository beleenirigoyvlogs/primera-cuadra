import React from 'react';
import { 
  Utensils, 
  Scissors, 
  Wrench, 
  ShoppingBag, 
  Globe, 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Anchor,
  Scale
} from 'lucide-react';

export default function DemosSection({ onSelectPreset }) {
  const demos = [
    {
      id: 'gastronomia',
      category: 'Gastronomía',
      icon: Utensils,
      demoName: 'Pizzería & Ristorante Roma',
      imageWebp: '/images/demos/demo-gastronomia.webp',
      imageJpg: '/images/demos/demo-gastronomia.jpg',
      image: '/images/demos/demo-gastronomia.jpg',
      width: 800,
      height: 533,
      description: 'Ideal para pizzerías, cafeterías, hamburgueserías, bares y restaurantes.',
      webItems: 'Menú digital, fotos de especialidades y reservas sin comisiones',
      googleItems: 'Ficha optimizada en Google Maps con horarios y fotos del local',
      waItems: 'Respuestas automáticas con la carta y pedidos directos',
      presetKey: 'gastronomia'
    },
    {
      id: 'barberia',
      category: 'Barbería & Estética',
      icon: Scissors,
      demoName: 'Studio & Barbería Urbana',
      imageWebp: '/images/demos/demo-barberia.webp',
      imageJpg: '/images/demos/demo-barberia.jpg',
      image: '/images/demos/demo-barberia.jpg',
      width: 800,
      height: 600,
      description: 'Pensado para peluquerías, salones de belleza, barberías y estética.',
      webItems: 'Catálogo de servicios (corte, color, tratamientos) con precios claros',
      googleItems: 'Perfil de Google con reseñas y botón directo para llegar al salón',
      waItems: 'Gestión ágil de turnos y consultas frecuentes por chat',
      presetKey: 'peluqueria'
    },
    {
      id: 'taller',
      category: 'Taller & Servicios',
      icon: Wrench,
      demoName: 'Taller Mecánico Especializado',
      imageWebp: '/images/demos/demo-taller.webp',
      imageJpg: '/images/demos/demo-taller.jpg',
      image: '/images/demos/demo-taller.jpg',
      width: 800,
      height: 600,
      description: 'Para talleres mecánicos, service técnico, colocación y profesionales de oficio.',
      webItems: 'Explicación clara de servicios, marcas atendidas y respaldo técnico',
      googleItems: 'Aparición destacada en búsquedas de auxilio y urgencias en la zona',
      waItems: 'Presupuestos rápidos con fotos del repuesto o vehículo',
      presetKey: 'mecanica'
    },
    {
      id: 'comercio',
      category: 'Comercio Local',
      icon: ShoppingBag,
      demoName: 'Tienda & Bazar de Diseño',
      imageWebp: '/images/demos/demo-comercio.webp',
      imageJpg: '/images/demos/demo-comercio.jpg',
      image: '/images/demos/demo-comercio.jpg',
      width: 800,
      height: 534,
      description: 'Para locales a la calle, indumentaria, ferreterías, mueblerías y bazares.',
      webItems: 'Vidriera online con productos destacados, promociones y formas de pago',
      googleItems: 'Ubicación exacta, fotos de vidriera y horarios de atención al público',
      waItems: 'Canal de WhatsApp para consultar talles, stock y envíos',
      presetKey: 'comercio'
    },
    {
      id: 'nautica',
      category: 'Náutica & Guarderías',
      icon: Anchor,
      demoName: 'Marina & Guardería Náutica Delta',
      imageWebp: '/images/demos/demo-nautica.webp',
      imageJpg: '/images/demos/demo-nautica.jpg',
      image: '/images/demos/demo-nautica.jpg',
      width: 800,
      height: 533,
      description: 'Para guarderías náuticas, astilleros, marinas y alquiler de embarcaciones.',
      webItems: 'Tarifario de cunas por eslora, bajadas con pluma y servicios fluviales',
      googleItems: 'Ficha en Google Maps con ubicación en río, fotos y accesos',
      waItems: 'Atención directa por WhatsApp para reservas de cuna y bajadas',
      presetKey: 'nautica'
    },
    {
      id: 'profesional',
      category: 'Servicios Profesionales',
      icon: Scale,
      demoName: 'Estudio Jurídico & Contable Morales',
      imageWebp: '/images/demos/demo-profesional.webp',
      imageJpg: '/images/demos/demo-profesional.jpg',
      image: '/images/demos/demo-profesional.jpg',
      width: 800,
      height: 534,
      description: 'Para estudios jurídicos, contadores, escribanías y consultoras.',
      webItems: 'Presentación de áreas de práctica, credenciales y agendamiento online',
      googleItems: 'Posicionamiento en búsquedas locales corporativas y asesoría',
      waItems: 'Canal directo para coordinar reuniones presenciales o virtuales',
      presetKey: 'profesional'
    }
  ];

  const handleDemoClick = (presetKey) => {
    if (onSelectPreset) {
      onSelectPreset(presetKey);
    }
    const el = document.getElementById('demostracion-en-vivo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="demos-section-wrapper" id="demos">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>EJEMPLOS ILUSTRATIVOS</span>
          </div>
          <h2 className="section-title">
            Así podría verse <span className="highlight-purple">tu negocio</span>
          </h2>
          <p className="section-subtitle">
            Cada rubro tiene necesidades distintas. Mirá cómo estructuramos la página web, Google y WhatsApp según la actividad de tu negocio.
          </p>
        </div>

        {/* Demos Cards Grid */}
        <div className="demos-cards-grid reveal-group">
          {demos.map((d) => {
            const IconComponent = d.icon;
            return (
              <div key={d.id} className="demo-industry-card reveal">
                {/* Image Wrap with Demo Badge */}
                <div className="demo-card-image-wrap">
                  <picture className="demo-card-picture">
                    <source srcSet={d.imageWebp} type="image/webp" />
                    <img 
                      src={d.imageJpg || d.image} 
                      alt={d.demoName} 
                      className="demo-card-img" 
                      loading="lazy"
                      width={d.width || 800}
                      height={d.height || 533}
                    />
                  </picture>
                  <div className="demo-overlay-gradient"></div>

                  <span className="demo-strict-badge">
                    DEMO ILUSTRATIVA
                  </span>

                  <div className="demo-category-pill">
                    <IconComponent size={14} />
                    <span>{d.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="demo-card-content">
                  <h3 className="demo-business-title">{d.demoName}</h3>
                  <p className="demo-business-desc">{d.description}</p>

                  <div className="demo-deliverables-list">
                    <div className="demo-deliverable-item">
                      <div className="demo-item-icon-box web">
                        <Globe size={14} />
                      </div>
                      <div className="demo-item-text">
                        <strong>Página Web:</strong> <span>{d.webItems}</span>
                      </div>
                    </div>

                    <div className="demo-deliverable-item">
                      <div className="demo-item-icon-box google">
                        <MapPin size={14} />
                      </div>
                      <div className="demo-item-text">
                        <strong>Google:</strong> <span>{d.googleItems}</span>
                      </div>
                    </div>

                    <div className="demo-deliverable-item">
                      <div className="demo-item-icon-box wa">
                        <MessageSquare size={14} />
                      </div>
                      <div className="demo-item-text">
                        <strong>WhatsApp Business:</strong> <span>{d.waItems}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    type="button" 
                    className="btn-demo-trigger"
                    onClick={() => handleDemoClick(d.presetKey)}
                  >
                    <span>Probar en el simulador</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Transparency Banner */}
        <div className="demos-transparency-note">
          <ShieldCheck size={18} className="text-brand-purple" />
          <p>
            <strong>Transparencia:</strong> Los ejemplos mostrados son maquetas de demostración creadas por Primera Cuadra para exhibir las capacidades del servicio en cada rubro. No representan clientes reales.
          </p>
        </div>
      </div>
    </section>
  );
}
