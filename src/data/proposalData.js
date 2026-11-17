/**
 * Proposal Data Catalog for Personalized Commercial Proposals
 * 
 * To create a new proposal in < 20 minutes:
 * 1. Add a new entry to the PROPOSALS dictionary using the business slug as key (e.g. 'parrilla-don-julio').
 * 2. Fill in the businessName, rubro, phone, address, and select a template archetype ('gastronomia' | 'barberia' | 'taller' | 'salud').
 * 3. Add their key services/pricing highlights and customize the accent color if desired.
 * 4. Send the client the link: https://primeracuadra.com.ar/propuesta/parrilla-don-julio
 */

export const PROPOSALS = {
  // Demo Proposal 1: Gastronomía
  'parrilla-el-fogon': {
    slug: 'parrilla-el-fogon',
    businessName: 'Parrilla El Fogón de Tigre',
    tagline: 'Cortes a las brasas, pastas caseras y tradición ribereña',
    rubro: 'gastronomia',
    rubroLabel: 'Gastronomía & Parrilla',
    contactPerson: 'Carlos',
    phone: '11 XXXX-XXXX (tu número)',
    whatsapp: '5491128779641',
    address: 'Av. Ejemplo 1234, Tigre Centro',
    hours: 'Mar a Dom de 12:00 a 16:00 y 20:00 a 00:30 hs',
    validUntil: '30 de Noviembre de 2026',
    primaryColor: '#F59E0B',
    accentColor: '#B45309',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
    description: 'Propuesta de presencia digital integral para destacar en Google Maps cuando busquen "dónde comer en Tigre", recibir reservas directas a WhatsApp y presentar la carta digitalizada sin pagar comisiones de delivery.',
    featuredItems: [
      { name: 'Ojo de bife al quebracho con papas rústicas', price: '$18.500', desc: 'Corte premium de 500g madurado 21 días con hierbas serranas' },
      { name: 'Parrillada completa para compartir (2 a 3 personas)', price: '$34.000', desc: 'Asado de tira, vacío, colita de cuadril, chorizo, morcilla y chinchulín' },
      { name: 'Raviolones caseros de verdura y lomo al disco', price: '$14.200', desc: 'Masa casera fresca con estofado de cocción lenta durante 4 horas' },
      { name: 'Flan mixto casero con dulce de leche colonial', price: '$5.500', desc: 'Receta familiar tradicional horneada a baño maría con crema fresca' }
    ],
    recommendedPlan: 'Completo + Web Propia',
    benefits: [
      'Menú digital con fotos reales para enviar por WhatsApp o ver escaneando QR en mesas',
      'Ficha en Google Maps optimizada para aparecer primero a turistas y vecinos de Tigre',
      'Botón de reservas directas a WhatsApp con mensaje automático armado',
      'Dominio propio www.elfogondetigre.com.ar con entrega lista en 4 días'
    ]
  },

  // Demo Proposal 2: Barbería & Estética
  'barberia-norte': {
    slug: 'barberia-norte',
    businessName: 'Barbería & Studio Norte',
    tagline: 'Cortes clásicos, degrade moderno y cuidado de barba en Zona Norte',
    rubro: 'barberia',
    rubroLabel: 'Barbería & Estética Masculina',
    contactPerson: 'Agustín',
    phone: '11 XXXX-XXXX (tu número)',
    whatsapp: '5491128779641',
    address: 'Av. Ejemplo 5678, San Isidro',
    hours: 'Lun a Sáb de 10:00 a 20:00 hs',
    validUntil: '30 de Noviembre de 2026',
    primaryColor: '#06B6D4',
    accentColor: '#0E7490',
    heroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80',
    description: 'Propuesta digital para ordenar turnos por WhatsApp, exhibir galería de cortes en alta resolución y ganar clientes en Google Maps que buscan barbería cerca.',
    featuredItems: [
      { name: 'Corte Clásico / Fade Degradé a tijera y máquina', price: '$11.000', desc: 'Incluye lavado previo, peinado con pomada mate y toalla aromatizada' },
      { name: 'Ritual de Barba con toalla caliente y navaja', price: '$8.500', desc: 'Perfilado al milímetro, vaporizador de ozono y aceites naturales' },
      { name: 'Combo Completo Corte + Barba + Exfoliación facial', price: '$17.500', desc: 'La experiencia de barbería integral para ocasiones especiales' },
      { name: 'Diseño de Cejas y perfilado con navajín descartable', price: '$3.500', desc: 'Limpieza y definición prolija respetando la forma natural' }
    ],
    recommendedPlan: 'Solo Web Propia',
    benefits: [
      'Agendamiento de turnos por WhatsApp con datos pre-cargados (nombre, servicio, horario)',
      'Galería visual estilo Instagram para mostrar los mejores fades y barbas',
      'Ficha en Google Maps con opiniones destacadas y botón "Cómo llegar"',
      'Web ultra liviana que abre en menos de 1 segundo en cualquier celular'
    ]
  },

  // Demo Proposal 3: Taller Mecánico
  'taller-mecanico-alvarez': {
    slug: 'taller-mecanico-alvarez',
    businessName: 'Mecánica Integral Álvarez',
    tagline: 'Diagnóstico computarizado, inyección electrónica, frenos y tren delantero',
    rubro: 'taller',
    rubroLabel: 'Taller Mecánico & Inyección',
    contactPerson: 'Martín Álvarez',
    phone: '11 XXXX-XXXX (tu número)',
    whatsapp: '5491128779641',
    address: 'Av. Ejemplo 850, Tigre',
    hours: 'Lun a Vie de 08:00 a 18:30 hs',
    validUntil: '30 de Noviembre de 2026',
    primaryColor: '#3B82F6',
    accentColor: '#1D4ED8',
    heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&auto=format&fit=crop&q=80',
    description: 'Propuesta para transmitir máxima confianza y orden técnico: cotizaciones rápidas por WhatsApp, lista clara de servicios y posicionamiento local en Google Maps.',
    featuredItems: [
      { name: 'Escaneo computarizado de motor y borrado de fallas', price: '$22.000', desc: 'Diagnóstico en el acto con scanner multimarca de última generación' },
      { name: 'Service integral de aceite sintético y los 4 filtros', price: '$85.000', desc: 'Aceite sintético homologado + filtros de aire, aceite, combustible y habitáculo' },
      { name: 'Reparación de Tren Delantero y amortiguación', price: '$65.000+', desc: 'Reemplazo de bujes, extremos, rótulas y chequeo de cremallera' },
      { name: 'Frenos completos: cambio de pastillas y rectificación', price: '$55.000+', desc: 'Pastillas blandas sin chillido y purgado de circuito con líquido DOT4' }
    ],
    recommendedPlan: 'Completo + Web Propia',
    benefits: [
      'Formulario rápido de presupuesto por WhatsApp: el cliente indica marca, modelo y falla',
      'Ubicación destacada en Google Maps para emergencias mecánicas y grúas de la zona',
      'Certificados de confianza, fotos reales del taller y repuestos originales explicados',
      'Trato directo y sin intermediarios'
    ]
  },

  // Demo Proposal 4: Consultorio Odontológico
  'odontologia-delta': {
    slug: 'odontologia-delta',
    businessName: 'Centro Odontológico Delta',
    tagline: 'Odontología integral, implantes, ortodoncia invisible y blanqueamiento',
    rubro: 'salud',
    rubroLabel: 'Consultorio Dental & Estética',
    contactPerson: 'Dra. Mariana Gómez',
    phone: '11 XXXX-XXXX (tu número)',
    whatsapp: '5491128779641',
    address: 'Av. Ejemplo 1420, Piso 1, Tigre',
    hours: 'Lun a Vie de 09:00 a 19:30 hs',
    validUntil: '30 de Noviembre de 2026',
    primaryColor: '#10B981',
    accentColor: '#047857',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80',
    description: 'Propuesta enfocada en profesionalismo y calidez: turnos ordenados por WhatsApp, explicación clara de tratamientos y ficha en Google Maps para captar pacientes de cercanía.',
    featuredItems: [
      { name: 'Limpieza con ultrasonido y profilaxis dental', price: '$28.000', desc: 'Eliminación suave de placa bacteriana y manchas superficiales sin dolor' },
      { name: 'Blanqueamiento dental láser en consultorio', price: '$95.000', desc: 'Resultados visibles en 1 sesión de 60 minutos con gel de pH neutro' },
      { name: 'Consulta diagnóstica inicial con cámara intraoral', price: '$15.000', desc: 'Evaluación integral con fotos de alta resolución y plan de tratamiento' },
      { name: 'Ortodoncia invisible con alineadores transparentes', price: 'A evaluar', desc: 'Planificación digital 3D para alinear tu sonrisa de forma imperceptible' }
    ],
    recommendedPlan: 'Completo + Web Propia',
    benefits: [
      'Agendamiento y triaje de urgencias directas a WhatsApp Business',
      'Página limpia con fotos de la clínica y credenciales de los profesionales',
      'Ficha en Google Maps con opiniones reales y enlace directo al consultorio',
      'Dominio propio seguro con candado SSL https'
    ]
  }
};

