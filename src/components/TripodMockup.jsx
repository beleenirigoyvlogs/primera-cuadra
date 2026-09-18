import React, { useState, useEffect, useMemo } from 'react';
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
  Check
} from 'lucide-react';

// Comprehensive Rubro Templates with authentic, high-res photos & industry-specific catalogs
const RUBRO_TEMPLATES = {
  peluqueria: {
    id: 'peluqueria',
    label: '✂️ Peluquería / Barber',
    nameDefault: 'Juanita Peluquería & Studio',
    cityDefault: 'Palermo, Buenos Aires',
    categoryTag: 'Peluquería de Diseño & Salón de Belleza',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&auto=format&fit=crop&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1594824813575-b8a7c6f092fb?w=400&auto=format&fit=crop&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400&auto=format&fit=crop&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
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

export default function TripodMockup({ niche }) {
  const [brandName, setBrandName] = useState(niche.demoBusinessName || 'Juanita Peluquería');
  const [city, setCity] = useState('Palermo, Buenos Aires');
  const [rubroTag, setRubroTag] = useState(niche.categoryTag || 'Peluquería de Diseño');
  const [activeTab, setActiveTab] = useState('web'); // 'web' | 'google' | 'whatsapp'
  const [manualTemplateId, setManualTemplateId] = useState(null);
  const [hasUserCustomized, setHasUserCustomized] = useState(false);

  // Sync with global niche switcher (only if user hasn't typed a custom brand)
  useEffect(() => {
    if (!hasUserCustomized) {
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
    // If user explicitly picked a template chip, respect it
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

  const whatsappSimulatorMsg = encodeURIComponent(
    hasUserCustomized && brandName.trim()
      ? `¡Hola Primera Cuadra! Estuve probando el simulador en vivo para mi negocio "${brandName}" y me gustaría contratar el Pack Completo de $250.000 para tener la web lista en 4 días. ¿Cómo arrancamos?`
      : '¡Hola Primera Cuadra! Estuve viendo la demostración en vivo y me interesa contratar el Pack Completo de $250.000 para hacer la página web de mi negocio. ¿Cómo arrancamos?'
  );

  const handleApplyPreset = (key) => {
    const template = RUBRO_TEMPLATES[key];
    if (template) {
      setManualTemplateId(key);
      setBrandName(template.nameDefault);
      setRubroTag(template.categoryTag);
      setCity(template.cityDefault);
    }
  };

  return (
    <section className="container tripod-section" id="demostracion-en-vivo">
      {/* Section Header */}
      <div className="section-header-center">
        <div className="section-kicker-tag">
          <Sparkles size={14} />
          <span>SIMULADOR EN VIVO PARA TU MARCA</span>
        </div>
        <h2 className="section-title">
          Probá cómo se vería tu negocio en la <span className="highlight-purple">Primera Cuadra</span>
        </h2>
        <p className="section-subtitle">
          Escribí el nombre de tu marca, tu rubro y tu ciudad. La foto, los textos, el dominio y los servicios se adaptan automáticamente en tiempo real.
        </p>
      </div>

      {/* Simulator Control Card (Hostinger Clean Style) */}
      <div className="simulator-controls-card">
        <div className="sim-controls-top-row">
          <div className="sim-title-group">
            <div className="sim-icon-badge">
              <Edit3 size={18} />
            </div>
            <div>
              <strong>Simulador Interactivo de Marca:</strong>
              <span>Escribí tu negocio o tocá un rubro para ver su foto y catálogo real</span>
            </div>
          </div>

          {/* Quick Presets Cloud */}
          <div className="sim-presets-cloud">
            {Object.keys(RUBRO_TEMPLATES).map((key) => {
              const tmpl = RUBRO_TEMPLATES[key];
              const isSelected = currentTemplate.id === tmpl.id;
              return (
                <button
                  key={key}
                  type="button"
                  className={`sim-preset-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleApplyPreset(key)}
                >
                  {tmpl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs Form */}
        <div className="sim-inputs-grid">
          <div className="sim-input-group">
            <label htmlFor="sim-brand-input">
              <Building2 size={14} />
              <span>Nombre de tu marca o negocio</span>
            </label>
            <input 
              id="sim-brand-input"
              type="text" 
              className="sim-input-field"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
                setHasUserCustomized(true);
                setManualTemplateId(null); // allow auto-detection
              }}
              placeholder="Ej: Juanita Peluquería, Guardería Delta, etc."
            />
          </div>

          <div className="sim-input-group">
            <label htmlFor="sim-rubro-input">
              <Sparkles size={14} />
              <span>Rubro o Especialidad</span>
            </label>
            <input 
              id="sim-rubro-input"
              type="text" 
              className="sim-input-field"
              value={rubroTag}
              onChange={(e) => {
                setRubroTag(e.target.value);
                setManualTemplateId(null); // allow auto-detection
              }}
              placeholder="Ej: Peluquería, Náutica, Abogados, Taller..."
            />
          </div>

          <div className="sim-input-group">
            <label htmlFor="sim-city-input">
              <MapPin size={14} />
              <span>Ciudad o Zona de atención</span>
            </label>
            <input 
              id="sim-city-input"
              type="text" 
              className="sim-input-field"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Palermo, Tigre, San Isidro, Rosario, CABA..."
            />
          </div>
        </div>

        {/* Active Rubro Badge & Photo Status */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '0.82rem', color: '#6b7280' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ImageIcon size={15} color="#673de6" />
            <span>Foto temática activa: <strong style={{ color: '#18181b' }}>{currentTemplate.label}</strong> (se actualiza sola según lo que escribas)</span>
          </div>
          <span style={{ color: '#00b074', fontWeight: 700 }}>
            ✓ Fotos, servicios y catálogo 100% sincronizados
          </span>
        </div>
      </div>

      {/* 3 Screens Tabs Selector */}
      <div className="tripod-tabs-row" role="tablist" style={{ marginTop: '28px' }}>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'web'}
          className={`tripod-tab-btn ${activeTab === 'web' ? 'active' : ''}`}
          onClick={() => setActiveTab('web')}
        >
          <div className="tab-icon-wrap">
            <Globe size={20} />
          </div>
          <div className="tab-text">
            <strong>1. Tu Página Web Propia</strong>
            <span>https://www.{domain}</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'google'}
          className={`tripod-tab-btn ${activeTab === 'google' ? 'active' : ''}`}
          onClick={() => setActiveTab('google')}
        >
          <div className="tab-icon-wrap">
            <MapPin size={20} />
          </div>
          <div className="tab-text">
            <strong>2. Ficha de Google Maps</strong>
            <span>Puesto #1 para "{rubroTag} en {city}"</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'whatsapp'}
          className={`tripod-tab-btn ${activeTab === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setActiveTab('whatsapp')}
        >
          <div className="tab-icon-wrap">
            <MessageSquare size={20} />
          </div>
          <div className="tab-text">
            <strong>3. WhatsApp Business</strong>
            <span>Catálogo oficial con el nombre de tu marca</span>
          </div>
        </button>
      </div>

      {/* Viewport Frame */}
      <div className="mockup-viewport-container" style={{ marginTop: '20px' }}>
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
                <span style={{ color: '#673de6', fontWeight: 700 }}>https://www.{domain}</span>
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
                  <span>Consultar WhatsApp</span>
                </button>
              </div>

              {/* Web Hero Banner */}
              <div className="web-hero-banner">
                <img 
                  src={currentTemplate.coverImage} 
                  alt={brandName} 
                  className="web-hero-bg" 
                />
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
                <img 
                  src={currentTemplate.coverImage} 
                  alt={brandName} 
                  className="listing-hero-img" 
                />
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
                <img src={currentTemplate.avatarImage} alt="Logo" className="wa-avatar-img" />
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

      {/* Simulator Bottom Conversion Banner */}
      <div className="simulator-cta-banner">
        <div className="sim-cta-left">
          <div className="sim-cta-icon-box">
            <Zap size={24} />
          </div>
          <div>
            <strong>
              {hasUserCustomized && brandName.trim()
                ? `¿Te gustaría que tu negocio (${brandName}) tenga esta web lista en 4 días?`
                : '¿Te gustaría tener una página web profesional como esta para tu negocio?'}
            </strong>
            <p>
              Diseño profesional mobile-first con dominio {hasUserCustomized && brandName.trim() ? <strong>{domain}</strong> : 'propio a tu nombre'}, Ficha de Google Top 1 y WhatsApp Business por solo $250.000 (50% al iniciar y 50% contra entrega).
            </p>
          </div>
        </div>

        <a 
          href={`https://wa.me/${defaultWhatsappNumber}?text=${whatsappSimulatorMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-hostinger-primary"
          style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <span>
            {hasUserCustomized && brandName.trim()
              ? `Pedir la web de ${brandName}`
              : 'Solicitar mi Página Web ($250.000)'}
          </span>
          <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
