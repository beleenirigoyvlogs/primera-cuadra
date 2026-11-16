import React, { useState } from 'react';
import { 
  Sparkles, 
  Globe, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  Eye, 
  Check, 
  Phone, 
  Clock, 
  Utensils, 
  Scissors, 
  Wrench, 
  Stethoscope,
  X,
  ArrowRight
} from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

/**
 * PLANTILLA DE DEMOS DUPLICABLE:
 * Para crear una nueva propuesta personalizada para un cliente real,
 * simplemente copiá uno de estos objetos, cambiá los datos y listo.
 */
export const EXAMPLE_DEMOS = [
  {
    id: 'demo-restaurante',
    rubroKey: 'restaurante',
    rubroLabel: 'Gastronomía & Restaurante',
    icon: Utensils,
    businessName: 'La Esquina Parrilla & Restó',
    tagline: 'Carnes a las brasas, pastas caseras y carta de vinos',
    city: 'Tigre, Buenos Aires',
    sampleDomain: 'ejemplo-parrilla.primeracuadra.com.ar',
    accentColor: '#ea580c',
    heroBadge: 'Abierto hoy mediodía y noche',
    services: [
      { name: 'Menú Ejecutivo Almuerzo', price: '$8.500', desc: 'Plato principal, bebida y café de lunes a viernes.' },
      { name: 'Parrillada Completa (2 personas)', price: '$28.000', desc: 'Asado de tira, vacío, achuras y papas fritas.' },
      { name: 'Pastas Caseras con Salsa a Elección', price: '$9.200', desc: 'Sorrentinos de jamón y queso con salsa cuatro quesos.' }
    ],
    features: [
      'Menú digital visual con fotos y precios actualizados',
      'Botón de "Reservar Mesa" directo a WhatsApp',
      'Ubicación en Google Maps y horarios de cocina en vivo'
    ],
    waMessage: '¡Hola! Vi la carta en la web y quería consultar por una reserva de mesa.'
  },
  {
    id: 'demo-peluqueria',
    rubroKey: 'peluqueria',
    rubroLabel: 'Peluquería & Barbería',
    icon: Scissors,
    businessName: 'Studio Urbano Hair & Barber',
    tagline: 'Cortes de diseño, colorimetría y tratamientos capilares',
    city: 'San Isidro, Buenos Aires',
    sampleDomain: 'ejemplo-barberia.primeracuadra.com.ar',
    accentColor: '#7c3aed',
    heroBadge: 'Atención con turno previo',
    services: [
      { name: 'Corte Degradé + Barba con Toalla', price: '$14.000', desc: 'Incluye lavado, perfilado con navaja y producto de peinado.' },
      { name: 'Colorimetría / Balayage + Nutrición', price: '$38.000', desc: 'Decoloración cuidada, matiz y baño de luz intenso.' },
      { name: 'Botox Capilar Antifrizz', price: '$22.000', desc: 'Eliminación del frizz y brillo prolongado por 60 días.' }
    ],
    features: [
      'Lookbook de cortes y transformaciones para mostrar tu estilo',
      'Botón "Pedir Turno" con día y servicio pre-cargado a WhatsApp',
      'Ficha en Google Maps para captar vecinos de la zona'
    ],
    waMessage: '¡Hola! Vi sus trabajos en la web y me gustaría reservar un turno.'
  },
  {
    id: 'demo-mecanico',
    rubroKey: 'mecanico',
    rubroLabel: 'Taller Mecánico & Servicios',
    icon: Wrench,
    businessName: 'Taller San Martín Mecánica Integral',
    tagline: 'Mecánica general, frenos, inyección electrónica y distribución',
    city: 'Vicente López, Buenos Aires',
    sampleDomain: 'ejemplo-taller.primeracuadra.com.ar',
    accentColor: '#2563eb',
    heroBadge: 'Diagnóstico en el día',
    services: [
      { name: 'Service Completo Aceite + 4 Filtros', price: '$95.000', desc: 'Aceite sintético y revisión de 20 puntos de seguridad.' },
      { name: 'Diagnóstico Computarizado OBD2', price: '$25.000', desc: 'Escaneo de fallas electrónicas, sensores y borrado de check engine.' },
      { name: 'Cambio de Kit Distribución y Bomba', price: 'A consultar', desc: 'Repuestos de primera calidad con garantía escrita.' }
    ],
    features: [
      'Listado de servicios y marcas que atiende el taller',
      'Botón "Pedir Presupuesto" para enviar foto o consulta mecánica',
      'Mapa interactivo con indicaciones directas por Google Maps y Waze'
    ],
    waMessage: '¡Hola! Quería consultar un presupuesto mecánico para mi auto.'
  },
  {
    id: 'demo-consultorio',
    rubroKey: 'consultorio',
    rubroLabel: 'Salud & Odontología',
    icon: Stethoscope,
    businessName: 'Centro Dental del Parque',
    tagline: 'Odontología integral, implantes y ortodoncia invisible',
    city: 'Martínez, Buenos Aires',
    sampleDomain: 'ejemplo-dental.primeracuadra.com.ar',
    accentColor: '#059669',
    heroBadge: 'Atención adultos y niños',
    services: [
      { name: 'Consulta Diagnóstica + Limpieza Ultrasonido', price: '$28.000', desc: 'Evaluación bucal completa y plan preventivo.' },
      { name: 'Blanqueamiento Dental Láser LED', price: '$90.000', desc: 'Aclarado de hasta 3 tonos en una sola sesión de 45 minutos.' },
      { name: 'Ortodoncia Alineadores Invisibles', price: 'A evaluar', desc: 'Placas transparentes con controles mensuales programados.' }
    ],
    features: [
      'Presentación de especialidades médicas y equipo profesional',
      'Listado de coberturas y formas de pago aceptadas',
      'Botón de asignación de turnos express por WhatsApp'
    ],
    waMessage: '¡Hola! Quisiera consultar disponibilidad de turnos odontológicos.'
  }
];

export default function ExampleDesignsSection() {
  const [selectedDemo, setSelectedDemo] = useState(EXAMPLE_DEMOS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPreview = (demo) => {
    setSelectedDemo(demo);
    setIsModalOpen(true);
  };

  return (
    <section className="example-designs-section-wrapper" id="disenos-ejemplo">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <Sparkles size={14} className="text-purple-icon" />
            <span>DISEÑOS DE EJEMPLO</span>
          </div>

          <h2 className="section-title">
            Así se va a <span className="highlight-purple">ver tu negocio</span>
          </h2>

          <p className="section-subtitle">
            Propuestas modelo para que evalúes la calidad, velocidad y claridad de nuestro trabajo antes de contratar.
          </p>

          <div className="honest-samples-pill">
            <Eye size={15} />
            <span>Maquetas de ejemplo sobre comercios y marcas ficticias</span>
          </div>
        </div>

        {/* 4 Demos Grid */}
        <div className="example-demos-grid reveal-group">
          {EXAMPLE_DEMOS.map((demo) => {
            const IconComp = demo.icon;
            return (
              <div key={demo.id} className="demo-showcase-card reveal">
                {/* Discrete Corner Tag */}
                <span className="demo-corner-badge">Ejemplo ficticio</span>

                {/* Card Top Rubro & Icon */}
                <div className="demo-card-top">
                  <div className="demo-rubro-icon-circle" style={{ backgroundColor: `${demo.accentColor}18`, color: demo.accentColor }}>
                    <IconComp size={22} />
                  </div>
                  <div>
                    <span className="demo-rubro-tag">{demo.rubroLabel}</span>
                    <h3 className="demo-business-title">{demo.businessName}</h3>
                  </div>
                </div>

                <p className="demo-tagline-text">{demo.tagline}</p>

                {/* Mini Preview Mockup Screen */}
                <div className="demo-screen-preview">
                  <div className="demo-screen-browser-bar">
                    <div className="demo-browser-dots">
                      <span className="b-dot"></span>
                      <span className="b-dot"></span>
                      <span className="b-dot"></span>
                    </div>
                    <span className="demo-browser-url">{demo.sampleDomain}</span>
                  </div>

                  <div className="demo-screen-content">
                    <div className="demo-mini-hero">
                      <span className="demo-mini-badge" style={{ color: demo.accentColor, borderColor: `${demo.accentColor}40` }}>
                        {demo.heroBadge}
                      </span>
                      <strong className="demo-mini-headline">{demo.businessName}</strong>
                      <span className="demo-mini-loc">📍 {demo.city}</span>
                    </div>

                    <div className="demo-mini-services">
                      <span className="demo-services-label">Servicios destacados:</span>
                      {demo.services.slice(0, 2).map((s, sIdx) => (
                        <div key={sIdx} className="demo-service-row">
                          <span className="s-name">{s.name}</span>
                          <span className="s-price">{s.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features Included List */}
                <ul className="demo-features-checklist">
                  {demo.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <Check size={15} className="demo-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Action Buttons */}
                <div className="demo-card-actions">
                  <button 
                    type="button" 
                    className="btn-demo-inspect"
                    onClick={() => openPreview(demo)}
                  >
                    <Eye size={16} />
                    <span>Ver propuesta en detalle</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Detailed Preview of the selected Fictitious Business */}
      {isModalOpen && selectedDemo && (
        <div className="demo-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="demo-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="modal-title-group">
                <span className="modal-disclaimer-pill">Ejemplo ficticio</span>
                <h3>{selectedDemo.businessName}</h3>
                <span className="modal-domain">https://{selectedDemo.sampleDomain}</span>
              </div>
              <button 
                type="button" 
                className="btn-modal-close" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar vista previa"
              >
                <X size={20} />
              </button>
            </div>

            <div className="demo-modal-body">
              <div className="demo-modal-banner" style={{ background: `linear-gradient(135deg, ${selectedDemo.accentColor}15, rgba(103, 61, 230, 0.08))` }}>
                <span className="modal-rubro-pill">{selectedDemo.rubroLabel}</span>
                <h4>{selectedDemo.tagline}</h4>
                <p>📍 {selectedDemo.city} • ⏰ {selectedDemo.heroBadge}</p>
              </div>

              <div className="demo-modal-services-section">
                <h5>Catálogo de servicios y precios de muestra</h5>
                <div className="modal-services-list">
                  {selectedDemo.services.map((serv, idx) => (
                    <div key={idx} className="modal-service-card">
                      <div className="modal-service-main">
                        <strong>{serv.name}</strong>
                        <p>{serv.desc}</p>
                      </div>
                      <div className="modal-service-price">{serv.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="demo-modal-connected-channels">
                <div className="modal-channel-pill">
                  <MapPin size={16} />
                  <span>Ficha de Google Maps con horarios y ubicación</span>
                </div>
                <div className="modal-channel-pill">
                  <MessageSquare size={16} />
                  <span>WhatsApp Business con catálogo de servicios cargado</span>
                </div>
                <div className="modal-channel-pill">
                  <Globe size={16} />
                  <span>Página web responsive con carga instantánea en celulares</span>
                </div>
              </div>
            </div>

            <div className="demo-modal-footer">
              <span className="modal-footer-note">
                Así de clara y ordenada puede quedar la web de tu negocio.
              </span>
              <a 
                href={`https://wa.me/5491128779641?text=${encodeURIComponent(`¡Hola Belén! Estuve viendo el diseño de ejemplo para "${selectedDemo.rubroLabel}" en Primera Cuadra y me gustaría tener una propuesta similar para mi negocio.`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-hostinger-primary"
                data-gtm="whatsapp_example_demo"
                onClick={() => trackWhatsAppClick('example_modal_cta', selectedDemo.rubroLabel)}
              >
                <MessageSquare size={16} />
                <span>Quiero una web así</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

