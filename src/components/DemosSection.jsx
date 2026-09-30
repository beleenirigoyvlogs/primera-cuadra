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
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
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
                  <img src={d.image} alt={d.demoName} className="demo-card-img" />
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
