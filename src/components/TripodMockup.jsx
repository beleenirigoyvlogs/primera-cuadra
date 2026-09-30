import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Globe, 
  MapPin, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  Phone, 
  Clock, 
  Bookmark, 
  Sparkles, 
  ShieldCheck, 
  Navigation, 
  ExternalLink, 
  CheckCheck, 
  Edit3, 
  ArrowRight, 
  Zap, 
  Building2,
  Image as ImageIcon,
  Check,
  Eye,
  Info,
  X,
  Loader2,
  MessageCircle,
  Send
} from 'lucide-react';

// Comprehensive Rubro Templates with authentic, high-res photos & industry-specific catalogs
const RUBRO_TEMPLATES = {
  peluqueria: {
    id: 'peluqueria',
    label: '✂️ Peluquería / Barber',
    nameDefault: 'Juanita Peluquería & Studio',
    cityDefault: 'Palermo, Buenos Aires',
    categoryTag: 'Peluquería de Diseño & Salón de Belleza',
    coverImageWebp: '/images/mockups/peluqueria-cover.webp',
    coverImageJpg: '/images/mockups/peluqueria-cover.jpg',
    coverImage: '/images/mockups/peluqueria-cover.jpg',
    avatarImageWebp: '/images/mockups/peluqueria-avatar.webp',
    avatarImageJpg: '/images/mockups/peluqueria-avatar.jpg',
    avatarImage: '/images/mockups/peluqueria-avatar.jpg',
    keywords: ['peluqueria', 'peluquería', 'barberia', 'barbería', 'barber', 'salon', 'salón', 'corte', 'peinado', 'color', 'mechas', 'balayage', 'estetica', 'estética', 'manicuria', 'uñas', 'juanita', 'belleza'],
    services: [
      'Corte de diseño femenino y masculino',
      'Colorimetría avanzada, balayage y mechas',
      'Tratamientos capilares, botox y keratina',
      'Peinados para eventos y maquillaje'
    ],
    catalog: [
      { name: 'Corte + Lavado con Masaje + Brushing', price: '$18.000', desc: 'Atención personalizada y productos de primera línea.' },
      { name: 'Balayage / Mechas + Baño de Luz', price: '$45.000', desc: 'Decoloración cuidada, matiz y nutrición profunda.' },
      { name: 'Tratamiento Botox Capilar Reconstituyente', price: '$26.000', desc: 'Eliminación total del frizz y brillo extremo por 60 días.' }
    ]
  },
  nautica: {
    id: 'nautica',
    label: '⚓ Náutica & Guarderías',
    nameDefault: 'Guardería Náutica Delta',
    cityDefault: 'Tigre & San Fernando',
    categoryTag: 'Guardería Náutica & Alquiler de Embarcaciones',
    coverImageWebp: '/images/mockups/nautica-cover.webp',
    coverImageJpg: '/images/mockups/nautica-cover.jpg',
    coverImage: '/images/mockups/nautica-cover.jpg',
    avatarImageWebp: '/images/mockups/nautica-avatar.webp',
    avatarImageJpg: '/images/mockups/nautica-avatar.jpg',
    avatarImage: '/images/mockups/nautica-avatar.jpg',
    keywords: ['nautica', 'náutica', 'lancha', 'barco', 'bote', 'velero', 'guarderia', 'guardería', 'astillero', 'rio', 'delta', 'marina', 'cuna', 'embarcacion', 'delta'],
    services: [
      'Cunas techadas para lanchas y motos de agua',
      'Bajada y botado con pluma hidráulica',
      'Alquiler de embarcaciones para pesca y paseo',
      'Mantenimiento de pata, motor y casco'
    ],
    catalog: [
      { name: 'Cuna Mensual Techada Lancha (hasta 21 pies)', price: '$195.000 / mes', desc: 'Bajadas ilimitadas, seguridad 24hs y agua dulce.' },
      { name: 'Alquiler Tracker con Timonel (Día Completo)', price: '$160.000', desc: 'Capacidad 7 tripulantes, habilitado por Prefectura.' },
      { name: 'Lavado de Casco, Pulido y Antifouling', price: '$90.000', desc: 'Desengrase de pata y protección UV para navegación.' }
    ]
  },
  profesional: {
    id: 'profesional',
    label: '⚖️ Estudios & Abogados',
    nameDefault: 'Estudio Morales & Asociados',
    cityDefault: 'CABA & Centro',
    categoryTag: 'Estudio Jurídico & Asesoría Corporativa',
    coverImageWebp: '/images/mockups/profesional-cover.webp',
    coverImageJpg: '/images/mockups/profesional-cover.jpg',
    coverImage: '/images/mockups/profesional-cover.jpg',
    avatarImageWebp: '/images/mockups/profesional-avatar.webp',
    avatarImageJpg: '/images/mockups/profesional-avatar.jpg',
    avatarImage: '/images/mockups/profesional-avatar.jpg',
    keywords: ['abogado', 'abogados', 'juridico', 'jurídico', 'derecho', 'estudio', 'contador', 'contable', 'escribania', 'escribanía', 'leyes', 'consultora', 'asociados'],
    services: [
      'Asesoramiento laboral y societario para empresas',
      'Sucesiones, contratos y derecho civil express',
      'Auditoría contable y planificación tributaria',
      'Consultas presenciales y virtuales por videollamada'
    ],
    catalog: [
      { name: 'Consulta Inicial Diagnóstico Jurídico (Presencial/Meet)', price: '$45.000', desc: 'Revisión exhaustiva de documentación y estrategia legal.' },
      { name: 'Abono Mensual Asesoría PyME / Empresas', price: '$220.000 / mes', desc: 'Redacción de contratos, cartas documento y soporte ilimitado.' },
      { name: 'Gestión Integral de Sucesión Express', price: 'A convenir', desc: 'Tramitación judicial acelerada en fueros civil y comercial.' }
    ]
  },
  mecanica: {
    id: 'mecanica',
    label: '🚗 Talleres & Mecánica',
    nameDefault: 'Taller Mecánico San Martín',
    cityDefault: 'San Martín, Bs As',
    categoryTag: 'Taller Mecánico Especializado & Servicios',
    coverImageWebp: '/images/mockups/mecanica-cover.webp',
    coverImageJpg: '/images/mockups/mecanica-cover.jpg',
    coverImage: '/images/mockups/mecanica-cover.jpg',
    avatarImageWebp: '/images/mockups/mecanica-avatar.webp',
    avatarImageJpg: '/images/mockups/mecanica-avatar.jpg',
    avatarImage: '/images/mockups/mecanica-avatar.jpg',
    keywords: ['taller', 'mecanico', 'mecánico', 'mecanica', 'mecánica', 'auto', 'autos', 'chapa', 'pintura', 'frenos', 'inyeccion', 'inyección', 'gomeria', 'gomería', 'repuestos', 'motor'],
    services: [
      'Service oficial de aceite sintético y 4 filtros',
      'Diagnóstico computarizado OBD2 con informe',
      'Alineación 3D, balanceo y frenos ABS',
      'Distribución, embrague y tren delantero'
    ],
    catalog: [
      { name: 'Service Completo Aceite 5W30 + 4 Filtros', price: '$110.000', desc: 'Revisión técnica preventiva de 25 puntos de seguridad.' },
      { name: 'Diagnóstico Computarizado Check Engine', price: '$30.000', desc: 'Escaneo completo de módulos y borrado de fallas en el día.' },
      { name: 'Kit Distribución + Bomba de Agua', price: '$210.000', desc: 'Repuestos de primera línea y garantía escrita de 1 año.' }
    ]
  },
  salud: {
    id: 'salud',
    label: '🩺 Salud & Odontología',
    nameDefault: 'Centro Odontológico Belgrano',
    cityDefault: 'Belgrano, CABA',
    categoryTag: 'Clínica Odontológica & Consultorios Médicos',
    coverImageWebp: '/images/mockups/salud-cover.webp',
    coverImageJpg: '/images/mockups/salud-cover.jpg',
    coverImage: '/images/mockups/salud-cover.jpg',
    avatarImageWebp: '/images/mockups/salud-avatar.webp',
    avatarImageJpg: '/images/mockups/salud-avatar.jpg',
    avatarImage: '/images/mockups/salud-avatar.jpg',
    keywords: ['odontolog', 'odontólogo', 'odontologa', 'dental', 'diente', 'dentista', 'clinica', 'clínica', 'medico', 'médico', 'salud', 'consultorio', 'kinesiolog', 'kinesiología', 'pediatra'],
    services: [
      'Ortodoncia invisible y brackets estéticos',
      'Implantes dentales y rehabilitación oral',
      'Blanqueamiento dental LED en 1 sesión',
      'Urgencias odontológicas y odontopediatría'
    ],
    catalog: [
      { name: 'Consulta Diagnóstica + Panorámica Digital', price: '$35.000', desc: 'Evaluación bucal integral y plan de tratamiento personalizado.' },
      { name: 'Blanqueamiento Dental Láser / LED', price: '$120.000', desc: 'Aclarado de hasta 4 tonos en una sola sesión de 45 minutos.' },
      { name: 'Plan de Ortodoncia Alineadores Invisibles', price: 'A convenir', desc: 'Placas transparentes removibles con seguimiento mensual.' }
    ]
  },
  gastronomia: {
    id: 'gastronomia',
    label: '🍕 Gastronomía & Bares',
    nameDefault: 'Pizzería & Ristorante Roma',
    cityDefault: 'Recoleta, Buenos Aires',
    categoryTag: 'Restaurante, Bar & Cafetería de Especialidad',
    coverImageWebp: '/images/mockups/gastronomia-cover.webp',
    coverImageJpg: '/images/mockups/gastronomia-cover.jpg',
    coverImage: '/images/mockups/gastronomia-cover.jpg',
    avatarImageWebp: '/images/mockups/gastronomia-avatar.webp',
    avatarImageJpg: '/images/mockups/gastronomia-avatar.jpg',
    avatarImage: '/images/mockups/gastronomia-avatar.jpg',
    keywords: ['resto', 'restaurante', 'bar', 'cafe', 'café', 'cafeteria', 'cafetería', 'pizza', 'pizzeria', 'pizzería', 'hamburguesa', 'burger', 'comida', 'parrilla', 'panaderia', 'cerveceria', 'gourmet'],
    services: [
      'Almuerzos y cenas ejecutivas con menú del día',
      'Pizzas a la piedra y pastas artesanales',
      'Cafetería de especialidad y pastelería',
      'Eventos privados, reservas y delivery directo'
    ],
    catalog: [
      { name: 'Menú Ejecutivo Almuerzo (Plato + Bebida + Postre)', price: '$14.500', desc: 'Opciones gourmet variadas con elaboración fresca del día.' },
      { name: 'Pizza Especial de la Casa a la Piedra', price: '$22.000', desc: 'Masa madre de 48hs de fermentación con queso de campo.' },
      { name: 'Reserva de Mesa para Eventos / Cumpleaños', price: 'Sin cargo', desc: 'Coordinación directa de menú especial por WhatsApp.' }
    ]
  },
  comercio: {
    id: 'comercio',
    label: '🏬 Comercios & Locales',
    nameDefault: 'Tienda & Bazar San Isidro',
    cityDefault: 'San Isidro, Buenos Aires',
    categoryTag: 'Comercio Local, Tienda & Distribución',
    coverImageWebp: '/images/mockups/comercio-cover.webp',
    coverImageJpg: '/images/mockups/comercio-cover.jpg',
    coverImage: '/images/mockups/comercio-cover.jpg',
    avatarImageWebp: '/images/mockups/comercio-avatar.webp',
    avatarImageJpg: '/images/mockups/comercio-avatar.jpg',
    avatarImage: '/images/mockups/comercio-avatar.jpg',
    keywords: ['tienda', 'local', 'comercio', 'ropa', 'indumentaria', 'zapateria', 'ferreteria', 'bazar', 'muebleria', 'libreria', 'electronica', 'calzado', 'negocio'],
    services: [
      'Venta minorista y mayorista con stock permanente',
      'Catálogo online de productos con precios claros',
      'Envíos en el día y retiro express en el local',
      'Cuotas sin interés y promociones bancarias'
    ],
    catalog: [
      { name: 'Artículo Destacado de Temporada', price: '$35.000', desc: 'Calidad superior, garantía oficial y entrega inmediata.' },
      { name: 'Pack Promocional Ahorro Local', price: '$55.000', desc: 'Paquete de 3 artículos seleccionados con 20% de descuento.' },
      { name: 'Asesoramiento y Pedido Directo por WhatsApp', price: 'A medida', desc: 'Consultá stock y talles con atención al instante.' }
    ]
  },
  fitness: {
    id: 'fitness',
    label: '🏋️ Gimnasios & Fitness',
    nameDefault: 'Club Fitness & Cross Training',
    cityDefault: 'Vicente López, Bs As',
    categoryTag: 'Gimnasio, Entrenamiento & Crossfit',
    coverImageWebp: '/images/mockups/fitness-cover.webp',
    coverImageJpg: '/images/mockups/fitness-cover.jpg',
    coverImage: '/images/mockups/fitness-cover.jpg',
    avatarImageWebp: '/images/mockups/fitness-avatar.webp',
    avatarImageJpg: '/images/mockups/fitness-avatar.jpg',
    avatarImage: '/images/mockups/fitness-avatar.jpg',
    keywords: ['gym', 'gimnasio', 'fitness', 'crossfit', 'entrenamiento', 'personal trainer', 'boxeo', 'yoga', 'pilates', 'pesas'],
    services: [
      'Sala de musculación y equipamiento de última generación',
      'Clases grupales: Funcional, Spinning y Crossfit',
      'Planes de entrenamiento y seguimiento personalizado',
      'Pase libre mensual sin matrícula de inscripción'
    ],
    catalog: [
      { name: 'Abono Mensual Pase Libre Musculación + Clases', price: '$32.000 / mes', desc: 'Acceso ilimitado en todas las franjas horarias.' },
      { name: 'Plan Trimestral con Descuento Promocional', price: '$78.000', desc: 'Ahorro de $18.000 abonando 3 meses juntos.' },
      { name: 'Pase de Prueba para Conocer el Gimnasio', price: 'Bonificado', desc: 'Vení a entrenar un día coordinando por WhatsApp.' }
    ]
  }
};

// Analytics event dispatcher
const trackSimulatorEvent = (eventName, data = {}) => {
  try {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...data
    };
    if (typeof window !== 'undefined') {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
      }
      window.dispatchEvent(new CustomEvent('pc_analytics', { detail: payload }));
    }
  } catch (err) {
    // Non-blocking telemetry
  }
};

export default function TripodMockup({ niche }) {
  const [brandName, setBrandName] = useState(niche?.demoBusinessName || 'Juanita Peluquería');
  const [city, setCity] = useState('Palermo, Buenos Aires');
  const [rubroTag, setRubroTag] = useState(niche?.categoryTag || 'Peluquería de Diseño');
  const [activeTab, setActiveTab] = useState('web'); // 'web' | 'google' | 'whatsapp'
  const [manualTemplateId, setManualTemplateId] = useState(null);
  const [hasUserCustomized, setHasUserCustomized] = useState(false);

  // Conversion & Flow state
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isAnimatingResult, setIsAnimatingResult] = useState(false);
  const [hasStartedSimulator, setHasStartedSimulator] = useState(false);
  
  // Post-Demo Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [postDemoForm, setPostDemoForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    improve: 'Página Web'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resultRef = useRef(null);

  // Track simulator view once on mount
  useEffect(() => {
    trackSimulatorEvent('simulator_view');
  }, []);

  // Sync with global niche switcher (only if user hasn't typed a custom brand)
  useEffect(() => {
    if (!hasUserCustomized && niche) {
      if (niche.id === 'nautica') {
        setBrandName('Guardería Náutica Delta');
        setRubroTag('Guardería Náutica & Alquiler de Lanchas');
        setCity('Tigre & San Fernando');
        setManualTemplateId('nautica');
      } else if (niche.id === 'profesional') {
        setBrandName('Estudio Morales & Asociados');
        setRubroTag('Estudio Jurídico & Asesoría Corporativa');
        setCity('Centro, CABA');
        setManualTemplateId('profesional');
      } else if (niche.id === 'peluqueria') {
        setBrandName('Juanita Peluquería & Studio');
        setRubroTag('Peluquería de Diseño & Estética');
        setCity('Palermo, Buenos Aires');
        setManualTemplateId('peluqueria');
      } else if (niche.id === 'comercio') {
        setBrandName('Taller Mecánico San Martín');
        setRubroTag('Taller Mecánico Especializado');
        setCity('San Martín, Buenos Aires');
        setManualTemplateId('mecanica');
      } else if (niche.id === 'salud') {
        setBrandName('Centro Odontológico Belgrano');
        setRubroTag('Clínica Odontológica & Estética');
        setCity('Belgrano, CABA');
        setManualTemplateId('salud');
      }
    }
  }, [niche, hasUserCustomized]);

  // Intelligent Automatic Photo & Template Detection based on user input
  const currentTemplate = useMemo(() => {
    if (manualTemplateId && RUBRO_TEMPLATES[manualTemplateId]) {
      return RUBRO_TEMPLATES[manualTemplateId];
    }

    const text = `${brandName} ${rubroTag}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    for (const key of Object.keys(RUBRO_TEMPLATES)) {
      const template = RUBRO_TEMPLATES[key];
      if (template.keywords.some(kw => text.includes(kw))) {
        return template;
      }
    }

    return RUBRO_TEMPLATES.peluqueria; // fallback default
  }, [brandName, rubroTag, manualTemplateId]);

  // Clean web domain slug from brand name
  const getDomainSlug = (name) => {
    if (!name) return 'tu-marca.com.ar';
    const clean = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
    return clean ? `${clean}.com.ar` : 'tu-marca.com.ar';
  };

  const domain = getDomainSlug(brandName);
  const defaultWhatsappNumber = '5491128779641';

  const getWhatsappUrl = (customMessage) => {
    const defaultText = brandName.trim()
      ? `¡Hola Primera Cuadra! Estuve viendo el simulador de presencia digital para mi negocio "${brandName}" (${rubroTag} en ${city}). Me gustaría recibir una propuesta comercial y ver cómo podemos arrancar.`
      : '¡Hola Primera Cuadra! Estuve probando el simulador de presencia digital y me gustaría recibir una propuesta comercial para mi negocio.';
    const text = customMessage || defaultText;
    return `https://wa.me/${defaultWhatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleApplyPreset = (key) => {
    const template = RUBRO_TEMPLATES[key];
    if (template) {
      setManualTemplateId(key);
      setBrandName(template.nameDefault);
      setRubroTag(template.categoryTag);
      setCity(template.cityDefault);
      handleFieldInteraction();
    }
  };

  const handleFieldInteraction = () => {
    if (!hasStartedSimulator) {
      setHasStartedSimulator(true);
      trackSimulatorEvent('simulator_start', { brandName, rubroTag, city });
    }
  };

  // Main Generation Handler
  const handleGenerateDemo = () => {
    setHasGenerated(true);
    setIsAnimatingResult(true);

    trackSimulatorEvent('simulator_generate', {
      brandName,
      rubroTag,
      city,
      domain,
      template: currentTemplate.id
    });

    trackSimulatorEvent('simulator_result_view', {
      brandName,
      activeTab,
      domain
    });

    setTimeout(() => {
      setIsAnimatingResult(false);
    }, 600);

    if (resultRef.current) {
      const topOffset = resultRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Open Lead Proposal Modal
  const handleOpenProposalModal = () => {
    setIsModalOpen(true);
    trackSimulatorEvent('simulator_cta_click', {
      action: 'quiero_hacerlo_realidad',
      brandName,
      rubroTag,
      city
    });
  };

  // Close Lead Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isSubmitted) {
      // Reset state for subsequent interaction
      setTimeout(() => {
        setIsSubmitted(false);
        setPostDemoForm({
          name: '',
          whatsapp: '',
          email: '',
          improve: 'Página Web'
        });
      }, 300);
    }
  };

  // Modal Form Submission
  const handlePostDemoSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!postDemoForm.name.trim()) {
      errors.name = 'Por favor ingresá tu nombre.';
    }
    if (!postDemoForm.whatsapp.trim()) {
      errors.whatsapp = 'Por favor ingresá tu WhatsApp.';
    } else if (postDemoForm.whatsapp.replace(/\D/g, '').length < 8) {
      errors.whatsapp = 'Ingresá un número de WhatsApp válido (ej. 11 1234-5678).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const leadPayload = {
      id: `sim_lead_${Date.now()}`,
      name: postDemoForm.name.trim(),
      whatsapp: postDemoForm.whatsapp.trim(),
      email: postDemoForm.email.trim(),
      improve: postDemoForm.improve,
      businessName: brandName.trim() || 'No especificado',
      rubro: rubroTag.trim() || 'No especificado',
      city: city.trim() || 'No especificado',
      domain: domain,
      createdAt: new Date().toISOString(),
      source: 'simulador_post_demo'
    };

    // Store in localStorage
    try {
      const existingLeads = JSON.parse(localStorage.getItem('pc_simulator_leads') || '[]');
      existingLeads.unshift(leadPayload);
      localStorage.setItem('pc_simulator_leads', JSON.stringify(existingLeads));
    } catch (err) {
      // Storage failed silently
    }

    trackSimulatorEvent('simulator_form_submit', leadPayload);

    // Simulated network transition
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section className="container tripod-section" id="demostracion-en-vivo">
      {/* Section Header */}
      <div className="section-header-center reveal">
        <div className="section-kicker-tag">
          <Sparkles size={14} />
          <span>SIMULADOR INTERACTIVO</span>
        </div>
        <h2 className="section-title">
          ¿Querés ver cómo podría <span className="highlight-purple">quedar tu negocio</span>?
        </h2>
        <p className="section-subtitle">
          Completá algunos datos y generá una vista previa de cómo podría verse tu Primera Cuadra digital.
        </p>
      </div>

      {/* Simulator Control Card (Universal Customizer) */}
      <div className="simulator-controls-card reveal">
        <div className="sim-controls-top-row">
          <div className="sim-title-group">
            <div className="sim-icon-badge">
              <Sparkles size={18} />
            </div>
            <div>
              <strong>Simulador en Vivo para Cualquier Rubro</strong>
              <span>Escribí tu negocio para previsualizar tu Web, Google Maps y WhatsApp oficial</span>
            </div>
          </div>

          {/* Discreet reference template selector */}
          <div className="sim-example-selector-wrap">
            <label htmlFor="sim-template-select" className="sim-example-label">
              <span>Plantilla de referencia:</span>
            </label>
            <select
              id="sim-template-select"
              className="sim-example-select"
              value={manualTemplateId || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleApplyPreset(e.target.value);
                } else {
                  setManualTemplateId(null);
                }
              }}
            >
              <option value="">-- Cargar ejemplo de prueba --</option>
              {Object.keys(RUBRO_TEMPLATES).map((key) => {
                const tmpl = RUBRO_TEMPLATES[key];
                return (
                  <option key={key} value={key}>
                    {tmpl.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Inputs Form */}
        <div className="sim-inputs-grid">
          <div className="sim-input-group">
            <label htmlFor="sim-brand-input">
              <Building2 size={14} />
              <span>Nombre de tu negocio</span>
            </label>
            <input 
              id="sim-brand-input"
              type="text" 
              className="sim-input-field"
              value={brandName}
              onFocus={handleFieldInteraction}
              onChange={(e) => {
                setBrandName(e.target.value);
                setHasUserCustomized(true);
                setManualTemplateId(null);
                handleFieldInteraction();
              }}
              placeholder="Ej: Veterinaria Huellas, Taller San Martín, Estudio Rossi..."
            />
          </div>

          <div className="sim-input-group">
            <label htmlFor="sim-rubro-input">
              <Sparkles size={14} />
              <span>Rubro o actividad</span>
            </label>
            <input 
              id="sim-rubro-input"
              type="text" 
              className="sim-input-field"
              value={rubroTag}
              onFocus={handleFieldInteraction}
              onChange={(e) => {
                setRubroTag(e.target.value);
                setManualTemplateId(null);
                handleFieldInteraction();
              }}
              placeholder="Ej: Veterinaria, Inmobiliaria, Carpintería, Estudio..."
            />
          </div>

          <div className="sim-input-group">
            <label htmlFor="sim-city-input">
              <MapPin size={14} />
              <span>Ciudad o zona</span>
            </label>
            <input 
              id="sim-city-input"
              type="text" 
              className="sim-input-field"
              value={city}
              onFocus={handleFieldInteraction}
              onChange={(e) => {
                setCity(e.target.value);
                handleFieldInteraction();
              }}
              placeholder="Ej: Nordelta, Tigre, San Isidro, CABA, Pilar..."
            />
          </div>
        </div>

        {/* Reassurance Strip & Clarification Note */}
        <div className="sim-reassurance-strip">
          <div className="sim-reassurance-left">
            <CheckCircle2 size={16} className="text-emerald" />
            <span><strong>Sin límites de rubro:</strong> Diseñamos y adaptamos la web al 100% de lo que vos ofrecés.</span>
          </div>
          <div className="sim-reassurance-right">
            <Globe size={14} className="text-purple" />
            <span>Dominio sugerido: <strong>{domain}</strong></span>
          </div>
        </div>

        {/* Small disclaimer requested */}
        <p className="sim-disclaimer-footnote">
          Es una demostración. No modifica ninguna información real de tu negocio.
        </p>

        {/* Main Result-Oriented Simulator CTA Button */}
        <div className="sim-generate-btn-container">
          <button 
            type="button" 
            className="btn-hostinger-primary sim-btn-generate"
            onClick={handleGenerateDemo}
          >
            <Eye size={18} />
            <span>VER CÓMO PODRÍA QUEDAR</span>
          </button>
        </div>
      </div>

      {/* RESULT SECTION (Focal Point of the Simulator) */}
      <div 
        ref={resultRef} 
        id="resultado-simulador" 
        className={`sim-result-container ${isAnimatingResult ? 'sim-result-focus-anim' : ''}`}
      >
        {/* Prominent Demo Identity Header */}
        <div className="sim-result-header-card">
          <div className="sim-result-badge-wrap">
            <span className="sim-badge-demo-tag">
              <Sparkles size={13} />
              DEMO / VISTA PREVIA
            </span>
            <span className="sim-badge-domain-pill">
              <Globe size={13} />
              www.{domain}
            </span>
          </div>

          <div className="sim-result-brand-summary">
            <h3 className="sim-result-title">{brandName || 'Tu Negocio'}</h3>
            <div className="sim-result-meta-row">
              <span className="sim-meta-chip rubro">
                <Building2 size={13} />
                {rubroTag || 'Servicios Generales'}
              </span>
              <span className="sim-meta-chip location">
                <MapPin size={13} />
                {city || 'Argentina'}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Screens Tabs Selector */}
        <div className="tripod-tabs-row" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'web'}
            className={`tripod-tab-btn ${activeTab === 'web' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('web');
              trackSimulatorEvent('simulator_result_view', { tab: 'web', brandName });
            }}
          >
            <div className="tab-icon-wrap">
              <Globe size={20} />
            </div>
            <div className="tab-text">
              <strong>1. <span className="tab-label-hide-mobile">Tu Página </span>Web<span className="tab-label-hide-mobile"> Propia</span></strong>
              <span className="tab-sub-url">https://www.{domain}</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'google'}
            className={`tripod-tab-btn ${activeTab === 'google' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('google');
              trackSimulatorEvent('simulator_result_view', { tab: 'google', brandName });
            }}
          >
            <div className="tab-icon-wrap">
              <MapPin size={20} />
            </div>
            <div className="tab-text">
              <strong>2. <span className="tab-label-hide-mobile">Ficha de </span>Google Maps</strong>
              <span className="tab-sub-url">Puesto #1 para "{rubroTag} en {city}"</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'whatsapp'}
            className={`tripod-tab-btn ${activeTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('whatsapp');
              trackSimulatorEvent('simulator_result_view', { tab: 'whatsapp', brandName });
            }}
          >
            <div className="tab-icon-wrap">
              <MessageSquare size={20} />
            </div>
            <div className="tab-text">
              <strong>3. WhatsApp<span className="tab-label-hide-mobile"> Business</span></strong>
              <span className="tab-sub-url">Catálogo oficial con el nombre de tu marca</span>
            </div>
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="mockup-viewport-container reveal">
          {/* TAB 1: WEBPAGE WITH DOMAIN (FLAGSHIP) */}
          {activeTab === 'web' && (
            <div className="web-mockup-wrapper">
              {/* Safari Browser Chrome */}
              <div className="browser-bar">
                <div className="browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="browser-url-bar">
                  <span style={{ fontSize: '0.82rem' }}>🔒</span>
                  <span className="browser-url-text" style={{ color: '#673de6', fontWeight: 700 }}>https://www.{domain}</span>
                </div>
                <div className="browser-ssl-badge">
                  <ShieldCheck size={14} />
                  <span>Dominio registrado a tu nombre</span>
                </div>
              </div>

              <div className="web-preview-body">
                {/* Web Mini Navigation */}
                <div className="web-inner-navbar">
                  <div className="web-inner-brand">
                    <Globe size={18} color="#673de6" />
                    <strong>{brandName}</strong>
                  </div>
                  <div className="web-inner-links">
                    <span>Inicio</span>
                    <span>Servicios</span>
                    <span>Tarifas</span>
                    <span>Contacto</span>
                  </div>
                  <button type="button" className="btn-inner-wa">
                    <MessageSquare size={13} />
                    <span><span className="tab-label-hide-mobile">Consultar </span>WhatsApp</span>
                  </button>
                </div>

                {/* Web Hero Banner */}
                <div className="web-hero-banner">
                  <picture className="web-hero-picture">
                    <source srcSet={currentTemplate.coverImageWebp} type="image/webp" />
                    <img 
                      src={currentTemplate.coverImageJpg || currentTemplate.coverImage} 
                      alt={brandName} 
                      className="web-hero-bg" 
                      loading="lazy"
                      width="1200"
                      height="800"
                    />
                  </picture>
                  <div className="web-hero-overlay">
                    <span className="web-pill-tag">{rubroTag.toUpperCase()} • {city.toUpperCase()}</span>
                    <h4>Bienvenido a {brandName}</h4>
                    <p>
                      Ofrecemos el mejor servicio de {rubroTag.toLowerCase()} en {city}. Atención personalizada, calidad garantizada y respuesta inmediata.
                    </p>
                    <div className="web-cta-row">
                      <button type="button" className="btn-web-cta">
                        <MessageSquare size={15} />
                        <span>Escribir a {brandName} por WhatsApp</span>
                      </button>
                      <span className="web-free-badge">✓ Carga ultra rápida en celulares</span>
                    </div>
                  </div>
                </div>

                {/* Web Deliverables Grid */}
                <div className="web-highlights-grid">
                  <div className="web-highlight-card">
                    <CheckCircle2 size={16} color="#00b074" />
                    <span>Dominio oficial <strong>{domain}</strong> 100% tuyo</span>
                  </div>
                  <div className="web-highlight-card">
                    <CheckCircle2 size={16} color="#00b074" />
                    <span>Servicios y tarifas oficiales de <strong>{brandName}</strong></span>
                  </div>
                  <div className="web-highlight-card">
                    <CheckCircle2 size={16} color="#00b074" />
                    <span>Botón directo para reservar consultas por WhatsApp</span>
                  </div>
                  <div className="web-highlight-card">
                    <CheckCircle2 size={16} color="#00b074" />
                    <span>Ubicación y mapa de Google para llegar en <strong>{city}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE MAPS */}
          {activeTab === 'google' && (
            <div className="google-mockup-wrapper">
              {/* Google Search Bar Mock */}
              <div className="google-search-bar">
                <span className="google-g-logo">G</span>
                <div className="search-text-group">
                  <span className="search-query">{rubroTag} en {city}</span>
                  <span className="search-geo">Cerca de mi ubicación actual</span>
                </div>
                <span className="search-badge-rank">
                  <CheckCircle2 size={13} />
                  Puesto #1 en el Mapa
                </span>
              </div>

              {/* Google Local Card */}
              <div className="google-listing-card">
                {/* Photo Wrap */}
                <div className="listing-hero-photo-wrap">
                  <picture className="listing-hero-picture">
                    <source srcSet={currentTemplate.coverImageWebp} type="image/webp" />
                    <img 
                      src={currentTemplate.coverImageJpg || currentTemplate.coverImage} 
                      alt={brandName} 
                      className="listing-hero-img" 
                      loading="lazy"
                      width="1200"
                      height="800"
                    />
                  </picture>
                  <div className="listing-open-badge">
                    <span>● Abierto ahora · Horario actualizado</span>
                  </div>
                  <div className="listing-verified-chip">
                    <ShieldCheck size={14} color="#673de6" />
                    <span>Perfil Verificado de {brandName}</span>
                  </div>
                </div>

                {/* Details Col */}
                <div className="listing-details-col">
                  <div className="listing-header-title">
                    <h3>{brandName}</h3>
                    <span className="listing-category">{rubroTag} • {city}</span>
                  </div>

                  <div className="listing-rating-row">
                    <span className="rating-number">4.9</span>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#facc15" color="#facc15" />
                      ))}
                    </div>
                    <span className="reviews-count">(Reseñas de clientes de {city} respondidas)</span>
                  </div>

                  {/* Google Quick Action Buttons */}
                  <div className="listing-actions-row">
                    <button type="button" className="btn-g-action primary">
                      <Phone size={14} />
                      <span>Llamar</span>
                    </button>
                    <button type="button" className="btn-g-action">
                      <Navigation size={14} />
                      <span>Cómo llegar</span>
                    </button>
                    <button type="button" className="btn-g-action">
                      <ExternalLink size={14} />
                      <span>{domain}</span>
                    </button>
                    <button type="button" className="btn-g-action">
                      <Bookmark size={14} />
                      <span>Guardar</span>
                    </button>
                  </div>

                  {/* Services Chips from detected Template */}
                  <div className="listing-services-loaded">
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#18181b', marginBottom: '8px' }}>
                      Servicios cargados en tu perfil de Google:
                    </h4>
                    <div className="services-chips-cloud">
                      {currentTemplate.services.map((srv, idx) => (
                        <span key={idx} className="service-chip">
                          <CheckCircle2 size={12} color="#00b074" />
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sample Review */}
                  <div className="listing-sample-review">
                    <div className="review-top-meta">
                      <div className="review-stars-mini">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="#facc15" color="#facc15" />
                        ))}
                      </div>
                      <span className="review-author">Cliente verificado en {city}</span>
                    </div>
                    <p className="review-comment">
                      "Excelente atención de {brandName}. Los encontré en Google buscando {rubroTag.toLowerCase()}, entré a su web {domain} y les escribí directo por WhatsApp. Muy recomendables."
                    </p>
                    <div className="owner-response-pill">
                      <strong>Respuesta de {brandName} (optimizada por Primera Cuadra):</strong>
                      <span>¡Muchas gracias por elegirnos en {city}! Es un placer darte la mejor atención.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WHATSAPP BUSINESS */}
          {activeTab === 'whatsapp' && (
            <div className="wa-mockup-wrapper">
              <div className="wa-phone-frame">
                {/* Dynamic Island */}
                <div className="phone-island">
                  <div className="island-camera"></div>
                </div>

                {/* WhatsApp Header */}
                <div className="wa-top-header">
                  <picture className="wa-avatar-picture">
                    <source srcSet={currentTemplate.avatarImageWebp} type="image/webp" />
                    <img 
                      src={currentTemplate.avatarImageJpg || currentTemplate.avatarImage} 
                      alt="Logo" 
                      className="wa-avatar-img" 
                      loading="lazy"
                      width="40"
                      height="40"
                    />
                  </picture>
                  <div className="wa-user-info">
                    <div className="wa-name-row">
                      <strong>{brandName}</strong>
                      <span className="wa-verified-icon" title="Cuenta Comercial Verificada">
                        <CheckCircle2 size={15} fill="#25d366" color="#075e54" />
                      </span>
                    </div>
                    <span className="wa-biz-badge">Cuenta comercial oficial • En línea</span>
                  </div>
                  <div className="wa-call-icons">
                    <Phone size={17} />
                  </div>
                </div>

                {/* Chat Canvas */}
                <div className="wa-chat-canvas">
                  <div className="wa-date-pill">HOY</div>

                  {/* Client incoming */}
                  <div className="wa-msg incoming">
                    <p>Hola! Vi la página web de <strong>{brandName}</strong> ({domain}) y quería consultar tarifas para {city}.</p>
                    <span className="wa-msg-time">14:22</span>
                  </div>

                  {/* Business outgoing */}
                  <div className="wa-msg outgoing">
                    <p>¡Hola! Bienvenido a <strong>{brandName}</strong>. Sí, con gusto. Te comparto nuestra lista oficial de servicios y tarifas:</p>
                    <span className="wa-msg-time">
                      14:23 <CheckCheck size={14} color="#38bdf8" />
                    </span>
                  </div>

                  {/* Catalog Card from detected Template */}
                  <div className="wa-catalog-bubble">
                    <div className="catalog-header-meta">
                      <Sparkles size={14} color="#673de6" />
                      <span>CATÁLOGO OFICIAL • {brandName.toUpperCase()}</span>
                    </div>
                    {currentTemplate.catalog.map((item, idx) => (
                      <div key={idx} className="wa-catalog-item">
                        <div className="wa-item-info">
                          <span className="wa-item-name">{item.name}</span>
                          <span className="wa-item-desc">{item.desc}</span>
                          <span className="wa-item-price">{item.price}</span>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="wa-btn-consult">
                      <MessageSquare size={14} />
                      <span>Consultar por este servicio</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* EXPLICACIÓN DEL RESULTADO (Flujo visual claro) */}
        <div className="sim-flow-explanation-card">
          <div className="sim-flow-header">
            <Sparkles size={16} className="text-purple" />
            <h4 className="sim-flow-title">Así podría funcionar tu presencia digital</h4>
          </div>

          <div className="sim-flow-steps-row">
            <div className="sim-flow-step-box">
              <div className="sim-step-icon google">
                <MapPin size={18} />
              </div>
              <div className="sim-step-info">
                <strong>📍 GOOGLE</strong>
                <span>Te encuentran fácil</span>
              </div>
            </div>

            <div className="sim-flow-arrow" aria-hidden="true">
              <span className="arrow-sym">↓</span>
            </div>

            <div className="sim-flow-step-box">
              <div className="sim-step-icon web">
                <Globe size={18} />
              </div>
              <div className="sim-step-info">
                <strong>🌐 PÁGINA WEB</strong>
                <span>Conocen tu negocio</span>
              </div>
            </div>

            <div className="sim-flow-arrow" aria-hidden="true">
              <span className="arrow-sym">↓</span>
            </div>

            <div className="sim-flow-step-box">
              <div className="sim-step-icon wa">
                <MessageSquare size={18} />
              </div>
              <div className="sim-step-info">
                <strong>💬 WHATSAPP</strong>
                <span>Te contactan directo</span>
              </div>
            </div>
          </div>

          <p className="sim-flow-description-text">
            Tu cliente te encuentra en Google, conoce tu negocio en tu web y puede contactarte directamente por WhatsApp.
          </p>
        </div>

        {/* TRES BENEFICIOS */}
        <div className="sim-benefits-grid">
          <div className="sim-benefit-card">
            <div className="sim-benefit-icon-box">
              <Globe size={22} />
            </div>
            <h5 className="sim-benefit-title">WEB PROPIA</h5>
            <p className="sim-benefit-text">Tu negocio presentado de forma profesional.</p>
          </div>

          <div className="sim-benefit-card">
            <div className="sim-benefit-icon-box">
              <MapPin size={22} />
            </div>
            <h5 className="sim-benefit-title">GOOGLE</h5>
            <p className="sim-benefit-text">Información clara para que puedan encontrarte.</p>
          </div>

          <div className="sim-benefit-card">
            <div className="sim-benefit-icon-box">
              <MessageSquare size={22} />
            </div>
            <h5 className="sim-benefit-title">WHATSAPP</h5>
            <p className="sim-benefit-text">Un canal directo para recibir consultas.</p>
          </div>
        </div>

        {/* CTA DE CONVERSIÓN DESTACADO */}
        <div className="sim-conversion-highlight-card">
          <div className="sim-conversion-inner">
            <div className="sim-conversion-text">
              <div className="sim-conversion-kicker">
                <Zap size={15} />
                <span>PROPUESTA PERSONALIZADA</span>
              </div>
              <h3 className="sim-conversion-title">¿Te gustaría tener esto para tu negocio?</h3>
              <p className="sim-conversion-subtitle">
                Podemos adaptar esta propuesta a tu marca, productos, servicios y forma de trabajar.
              </p>
            </div>

            <div className="sim-conversion-actions">
              <button 
                type="button" 
                className="btn-hostinger-primary sim-btn-cta-main"
                onClick={handleOpenProposalModal}
              >
                <Sparkles size={17} />
                <span>QUIERO HACERLO REALIDAD</span>
              </button>

              <a 
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sim-btn-cta-whatsapp"
                onClick={() => trackSimulatorEvent('whatsapp_click', { source: 'simulador_cta_secundario', brand: brandName })}
              >
                <MessageCircle size={18} />
                <span>HABLAR POR WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO POST-DEMO (MODAL ACCESIBLE Y ELEGANTE) */}
      {isModalOpen && (
        <div 
          className="sim-modal-overlay" 
          onClick={handleCloseModal}
          role="presentation"
        >
          <div 
            className="sim-modal-dialog" 
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="sim-modal-title"
          >
            <button 
              type="button" 
              className="sim-modal-close-btn" 
              onClick={handleCloseModal}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handlePostDemoSubmit} className="sim-modal-form" noValidate>
                <div className="sim-modal-header">
                  <div className="sim-modal-badge">
                    <Sparkles size={18} />
                  </div>
                  <h3 id="sim-modal-title" className="sim-modal-title">Contanos cómo podemos ayudarte</h3>
                  <p className="sim-modal-subtitle">
                    Te preparamos una propuesta adaptada a <strong>{brandName || 'tu negocio'}</strong> sin ningún compromiso.
                  </p>
                </div>

                <div className="sim-modal-fields-group">
                  {/* Nombre */}
                  <div className="sim-modal-field">
                    <label htmlFor="post-demo-name">Nombre *</label>
                    <input 
                      id="post-demo-name"
                      type="text" 
                      className={`sim-modal-input ${formErrors.name ? 'has-error' : ''}`}
                      placeholder="Tu nombre y apellido"
                      value={postDemoForm.name}
                      onChange={(e) => {
                        setPostDemoForm({ ...postDemoForm, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                        if (!hasStartedForm) {
                          setHasStartedForm(true);
                          trackSimulatorEvent('simulator_form_start');
                        }
                      }}
                    />
                    {formErrors.name && (
                      <span className="sim-modal-error-msg">{formErrors.name}</span>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div className="sim-modal-field">
                    <label htmlFor="post-demo-whatsapp">WhatsApp *</label>
                    <input 
                      id="post-demo-whatsapp"
                      type="tel" 
                      className={`sim-modal-input ${formErrors.whatsapp ? 'has-error' : ''}`}
                      placeholder="11 1234-5678"
                      value={postDemoForm.whatsapp}
                      onChange={(e) => {
                        setPostDemoForm({ ...postDemoForm, whatsapp: e.target.value });
                        if (formErrors.whatsapp) setFormErrors({ ...formErrors, whatsapp: '' });
                        if (!hasStartedForm) {
                          setHasStartedForm(true);
                          trackSimulatorEvent('simulator_form_start');
                        }
                      }}
                    />
                    {formErrors.whatsapp && (
                      <span className="sim-modal-error-msg">{formErrors.whatsapp}</span>
                    )}
                  </div>

                  {/* Email (opcional) */}
                  <div className="sim-modal-field">
                    <label htmlFor="post-demo-email">Email (opcional)</label>
                    <input 
                      id="post-demo-email"
                      type="email" 
                      className="sim-modal-input"
                      placeholder="tu@email.com (opcional)"
                      value={postDemoForm.email}
                      onChange={(e) => {
                        setPostDemoForm({ ...postDemoForm, email: e.target.value });
                      }}
                    />
                  </div>

                  {/* ¿Qué te gustaría mejorar? */}
                  <div className="sim-modal-field">
                    <label className="sim-label-question">¿Qué te gustaría mejorar?</label>
                    <div className="sim-improve-options-grid" role="radiogroup">
                      {[
                        'Página Web',
                        'Google',
                        'WhatsApp Business',
                        'Catálogo',
                        'Todo',
                        'No estoy seguro'
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          role="radio"
                          aria-checked={postDemoForm.improve === opt}
                          className={`sim-improve-chip ${postDemoForm.improve === opt ? 'selected' : ''}`}
                          onClick={() => setPostDemoForm({ ...postDemoForm, improve: opt })}
                        >
                          {postDemoForm.improve === opt && <Check size={14} />}
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sim-modal-footer">
                  <button 
                    type="submit" 
                    className="btn-hostinger-primary sim-btn-modal-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="sim-spinner" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        <span>QUIERO RECIBIR UNA PROPUESTA</span>
                      </>
                    )}
                  </button>
                  <span className="sim-modal-security-note">
                    🔒 No compartimos tus datos con nadie. Respuesta rápida por WhatsApp.
                  </span>
                </div>
              </form>
            ) : (
              /* Mensaje de Éxito */
              <div className="sim-modal-success-wrap">
                <div className="sim-success-icon-badge">
                  <CheckCircle2 size={46} color="#10b981" />
                </div>
                <h3 className="sim-success-title">¡Listo! Recibimos tu consulta.</h3>
                <p className="sim-success-message">
                  Vamos a revisar la información de tu negocio y te contactaremos para mostrarte las opciones disponibles.
                </p>

                <div className="sim-success-divider"></div>

                <p className="sim-success-alt-prompt">
                  Si preferís resolver dudas al instante, podés escribirnos directo:
                </p>

                <a 
                  href={getWhatsappUrl(`¡Hola Primera Cuadra! Acabo de enviar una consulta en el simulador para "${brandName}". Mi nombre es ${postDemoForm.name}. Me gustaría conocer las opciones disponibles.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sim-btn-cta-whatsapp sim-success-wa-btn"
                  onClick={() => trackSimulatorEvent('whatsapp_click', { source: 'simulador_modal_exito', brand: brandName })}
                >
                  <MessageCircle size={18} />
                  <span>HABLAR POR WHATSAPP</span>
                </a>

                <button 
                  type="button" 
                  className="sim-btn-close-modal-link"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

