/**
 * Catalog of Full Demonstration Websites by Industry
 * Each example is an autonomous, complete website demo with its own color palette,
 * typography, services/menu with prices, photo gallery, location, and WhatsApp actions.
 */

export const DEMO_SITES = {
  parrilla: {
    slug: 'parrilla',
    businessName: 'El Fogón de Tigre',
    tagline: 'Cortes a las brasas, pastas caseras y tradición ribereña',
    rubro: 'parrilla',
    rubroLabel: 'Parrilla & Bodegón',
    theme: {
      isLight: false,
      bg: '#140c0a',
      card: '#20120f',
      cardBorder: 'rgba(234, 88, 12, 0.22)',
      primary: '#ea580c',
      primaryHover: '#c2410c',
      accent: '#fed7aa',
      text: '#fef3c7',
      textMuted: '#a8998d',
      fontHeading: "'Outfit', Georgia, serif"
    },
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80',
    heroBadge: 'FUEGOS A LA LEÑA & COCINA DE AUTOR',
    heroDescription: 'Disfrutá de los mejores cortes seleccionados al quebracho colorado, empanadas cortadas a cuchillo y pastas artesanales amasadas en el día.',
    phone: '11 4455-6677',
    whatsapp: '5491144556677',
    whatsappMsg: '¡Hola El Fogón de Tigre! Quisiera consultar disponibilidad para reservar una mesa.',
    address: 'Av. Cazón 1240, Tigre Centro',
    hours: 'Mar a Dom de 12:00 a 16:00 y 20:00 a 00:30 hs (Lunes cerrado)',
    mapQuery: 'Av.+Cazon+1240,+Tigre,+Buenos+Aires',
    menuCategories: [
      {
        category: 'Cortes a las Brasas',
        items: [
          { name: 'Ojo de Bife al Quebracho (500g)', price: '$18.500', desc: 'Madurado 21 días, acompañado de papas rústicas al romero.' },
          { name: 'Asado de Tira Bandera Especial', price: '$17.200', desc: 'Corte tradicional de costilla tierna dorada a fuego lento.' },
          { name: 'Vacío del Fina Brasa (600g)', price: '$19.000', desc: 'Cocción lenta durante 3 horas con chimichurri casero.' },
          { name: 'Parrillada Completa p/ 2 personas', price: '$34.000', desc: 'Asado, vacío, chorizo criollo, morcilla, chinchulín y papas fritas.' }
        ]
      },
      {
        category: 'Entradas & Minutas',
        items: [
          { name: 'Empanadas de Lomo al Disco (2 un.)', price: '$4.200', desc: 'Masa casera horneada, lomo cortado a cuchillo y aceitunas.' },
          { name: 'Provoleta Rellena El Fogón', price: '$8.900', desc: 'Tomates secos hidratados, rúcula selvática y oliva extra virgen.' },
          { name: 'Mollejas crocantes al limón', price: '$12.500', desc: 'Doradas a la brasa con toque de manteca y perejil fresco.' }
        ]
      },
      {
        category: 'Pastas Caseras & Postres',
        items: [
          { name: 'Raviolones de Calabaza y Almendras', price: '$13.800', desc: 'Con salsa de manteca tostada, salvia y queso parmesano.' },
          { name: 'Flan Mixto Casero de 8 Huevos', price: '$5.500', desc: 'Receta de campo con dulce de leche colonial y crema montada.' },
          { name: 'Panqueque con Dulce de Leche Quemado', price: '$6.000', desc: 'Flambeado al ron con crocante de azúcar morena.' }
        ]
      }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80', caption: 'Parrilla a la leña encendida' },
      { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80', caption: 'Cortes premium en mesa' },
      { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80', caption: 'Salón principal cálido' },
      { url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80', caption: 'Hamburguesas y minutas' },
      { url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80', caption: 'Postres caseros' },
      { url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80', caption: 'Cava de vinos seleccionados' }
    ]
  },

  barberia: {
    slug: 'barberia',
    businessName: 'Barber Studio 96',
    tagline: 'Cortes clásicos, degrade moderno y cuidado de barba en Zona Norte',
    rubro: 'barberia',
    rubroLabel: 'Barbería Urbana',
    theme: {
      isLight: false,
      bg: '#0a0a0c',
      card: '#16161a',
      cardBorder: 'rgba(234, 179, 8, 0.22)',
      primary: '#eab308',
      primaryHover: '#ca8a04',
      accent: '#fefce8',
      text: '#fafaf9',
      textMuted: '#a1a1aa',
      fontHeading: "'Syne', -apple-system, sans-serif"
    },
    heroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=80',
    heroBadge: 'PRECISIÓN & ESTILO URBANO',
    heroDescription: 'Un espacio pensado para tu cuidado personal: sillones clásicos, música seleccionada, bebidas de cortesía y especialistas en degradé a navaja.',
    phone: '11 3322-1100',
    whatsapp: '5491133221100',
    whatsappMsg: '¡Hola Barber Studio 96! Me gustaría consultar turnos disponibles para esta semana.',
    address: 'Av. del Libertador 18200, San Isidro',
    hours: 'Lun a Sáb de 10:00 a 20:30 hs (Domingos cerrado)',
    mapQuery: 'Av.+del+Libertador+18200,+San+Isidro,+Buenos+Aires',
    menuCategories: [
      {
        category: 'Servicios de Barbería & Peluquería',
        items: [
          { name: 'Corte Degradé / Fade Pro', price: '$11.000', desc: 'Skin fade, low fade o taper a navaja y tijera con peinado final.' },
          { name: 'Corte Clásico Tradicional', price: '$9.500', desc: 'Tijera y peine, contorno prolijo con navajín y lavado previo.' },
          { name: 'Ritual de Barba con Toalla Caliente', price: '$8.500', desc: 'Vapor de ozono, aceites esenciales, afeitado a navaja y bálsamo.' },
          { name: 'Combo Completo Corte + Barba', price: '$17.500', desc: 'El servicio integral con toalla caliente, perfilado y mascarilla.' },
          { name: 'Perfilado de Cejas con Navaja', price: '$3.500', desc: 'Limpieza y definición exacta respetando tu anatomía.' },
          { name: 'Tratamiento de Hidratación Capilar', price: '$7.000', desc: 'Ampolla revitalizante con masaje capilar desestresante.' }
        ]
      }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'Sillones clásicos y puesto' },
      { url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Fade degradé a navaja' },
      { url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Cuidado y perfilado de barba' },
      { url: 'https://images.unsplash.com/photo-1517832606589-7157460866ac?w=800&auto=format&fit=crop&q=80', caption: 'Herramientas esterilizadas' },
      { url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80', caption: 'Ambiente exclusivo' },
      { url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80', caption: 'Pomadas y productos de styling' }
    ]
  },

  taller: {
    slug: 'taller',
    businessName: 'Mecánica Integral Álvarez',
    tagline: 'Diagnóstico computarizado, inyección electrónica, frenos y tren delantero',
    rubro: 'taller',
    rubroLabel: 'Taller Mecánico & Diagnóstico',
    theme: {
      isLight: false,
      bg: '#0b0f19',
      card: '#151e30',
      cardBorder: 'rgba(245, 158, 11, 0.25)',
      primary: '#f59e0b',
      primaryHover: '#d97706',
      accent: '#38bdf8',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      fontHeading: "'Outfit', sans-serif"
    },
    heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600&auto=format&fit=crop&q=80',
    heroBadge: 'TECNOLOGÍA & TRANSPARENCIA MECÁNICA',
    heroDescription: 'Más de 20 años en Tigre brindando servicio mecánico de precisión con instrumental de diagnóstico electrónico multimarca y repuestos originales.',
    phone: '11 5566-7788',
    whatsapp: '5491155667788',
    whatsappMsg: '¡Hola Mecánica Álvarez! Quisiera pedir un presupuesto o turno para revisar mi vehículo.',
    address: 'Av. Italia 850, Tigre',
    hours: 'Lun a Vie de 08:00 a 18:30 hs (Sábados de 08:30 a 13:00 hs)',
    mapQuery: 'Av.+Italia+850,+Tigre,+Buenos+Aires',
    menuCategories: [
      {
        category: 'Servicios de Mantenimiento y Reparación',
        items: [
          { name: 'Diagnóstico Computarizado & Escaneo', price: '$22.000', desc: 'Detección de códigos de falla OBD2, sensores y borrado de check engine.' },
          { name: 'Service Completo Aceite Sintético y 4 Filtros', price: '$85.000', desc: 'Aceite 5W30/5W40 homologado + filtros de aceite, aire, nafta y cabina.' },
          { name: 'Frenos Delanteros y Traseros', price: '$55.000+', desc: 'Cambio de pastillas blandas sin chillido, rectificación y purgado de líquido.' },
          { name: 'Tren Delantero, Bujes y Amortiguadores', price: '$65.000+', desc: 'Revisión en fosa de rótulas, extremos, cazoletas y alineación láser.' },
          { name: 'Limpieza de Inyectores por Ultrasonido', price: '$38.000', desc: 'Prueba en banco de inyección, recambio de microfiltros y o-rings.' },
          { name: 'Distribución Completa con Bomba de Agua', price: 'A cotizar', desc: 'Correa o cadena original, tensores y refrigerante orgánico nuevo.' }
        ]
      }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80', caption: 'Elevadores y boxes de trabajo' },
      { url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80', caption: 'Mecánica de motor pesada' },
      { url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80', caption: 'Escaneo y diagnóstico electrónico' },
      { url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop&q=80', caption: 'Frenos y tren rodante' },
      { url: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&auto=format&fit=crop&q=80', caption: 'Repuestos originales homologados' },
      { url: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=800&auto=format&fit=crop&q=80', caption: 'Control final en pista' }
    ]
  },

  dental: {
    slug: 'dental',
    businessName: 'Centro Odontológico Delta',
    tagline: 'Odontología integral, implantes, ortodoncia invisible y blanqueamiento',
    rubro: 'dental',
    rubroLabel: 'Consultorio Dental & Estética',
    theme: {
      isLight: true,
      bg: '#f8fafc',
      card: '#ffffff',
      cardBorder: 'rgba(2, 132, 199, 0.16)',
      primary: '#0284c7',
      primaryHover: '#0369a1',
      accent: '#0d9488',
      text: '#0f172a',
      textMuted: '#475569',
      fontHeading: "'Plus Jakarta Sans', sans-serif"
    },
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&auto=format&fit=crop&q=80',
    heroBadge: 'ATENCIÓN MÉDICA CÁLIDA & SIN DOLOR',
    heroDescription: 'Cuidamos la salud y estética de tu sonrisa con equipamiento de última generación, odontología digital y especialistas certificados.',
    phone: '11 6677-8899',
    whatsapp: '5491166778899',
    whatsappMsg: '¡Hola Centro Odontológico Delta! Quisiera consultar por un turno de evaluación diagnóstica.',
    address: 'Av. Liniers 1420, Piso 1, Tigre',
    hours: 'Lun a Vie de 09:00 a 19:30 hs (Sábados de 09:00 a 13:00 hs)',
    mapQuery: 'Av.+Liniers+1420,+Tigre,+Buenos+Aires',
    menuCategories: [
      {
        category: 'Tratamientos Odontológicos',
        items: [
          { name: 'Limpieza con Ultrasonido y Profilaxis', price: '$28.000', desc: 'Eliminación suave de placa bacteriana, sarro y pulido dental completo.' },
          { name: 'Blanqueamiento Dental Láser en 1 Sesión', price: '$95.000', desc: 'Aclarado visible de varios tonos en 60 minutos con gel de pH neutro.' },
          { name: 'Consulta Diagnóstica con Cámara Intraoral', price: '$15.000', desc: 'Evaluación integral en pantalla HD y confección de plan de tratamiento.' },
          { name: 'Ortodoncia Invisible con Alineadores', price: 'A evaluar', desc: 'Planificación 3D digital para alinear tu sonrisa sin brackets metálicos.' },
          { name: 'Implante Dental de Titanio Homologado', price: 'A evaluar', desc: 'Cirugía guiada mínimamente invasiva con corona de porcelana estética.' },
          { name: 'Placa de Relajación Miorrelajante p/ Bruxismo', price: '$45.000', desc: 'Acrílico rígido confeccionado a medida para proteger tus dientes de noche.' }
        ]
      }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80', caption: 'Sillón odontológico moderno' },
      { url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80', caption: 'Blanqueamiento y estética dental' },
      { url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&auto=format&fit=crop&q=80', caption: 'Diagnóstico radiográfico digital' },
      { url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=80', caption: 'Instrumental esterilizado en autoclave' },
      { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80', caption: 'Atención personalizada y cálida' },
      { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80', caption: 'Recepción y sala de espera' }
    ]
  }
};

/**
 * Helper to resolve either a demo slug ('parrilla', 'barberia') or proposal slug
 */
export function getSiteDataBySlug(slug) {
  if (!slug) return DEMO_SITES.parrilla;
  const clean = slug.toLowerCase().trim();

  // Direct matches
  if (DEMO_SITES[clean]) return DEMO_SITES[clean];

  // Alias matches
  if (clean.includes('parrilla') || clean.includes('fogon')) return DEMO_SITES.parrilla;
  if (clean.includes('barber') || clean.includes('corte')) return DEMO_SITES.barberia;
  if (clean.includes('taller') || clean.includes('mecanic')) return DEMO_SITES.taller;
  if (clean.includes('dental') || clean.includes('odontolog') || clean.includes('diente')) return DEMO_SITES.dental;

  return DEMO_SITES.parrilla;
}

