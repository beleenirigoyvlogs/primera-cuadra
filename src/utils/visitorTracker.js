/**
 * Sistema de Tracking y Estadísticas de Visitas para Primera Cuadra
 * Registra visitas reales, sesiones únicas, dispositivos, fuentes y métricas diarias.
 */

const STORAGE_KEY = 'pc_site_analytics_v1';
const SESSION_KEY = 'pc_active_session_token';
const VISITOR_ID_KEY = 'pc_unique_visitor_uuid';

/**
 * Obtener fecha formateada YYYY-MM-DD
 */
function getTodayKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Estructura inicial de analítica
 */
function getDefaultAnalytics() {
  const today = getTodayKey();
  return {
    totalVisits: 0,
    totalPageviews: 0,
    uniqueVisitors: 0,
    dailyVisits: {
      [today]: 0
    },
    deviceBreakdown: {
      mobile: 0,
      desktop: 0
    },
    sources: {
      direct: 0,
      whatsapp: 0,
      instagram: 0,
      google: 0,
      other: 0
    },
    firstTrackedAt: new Date().toISOString(),
    lastVisitAt: new Date().toISOString()
  };
}

/**
 * Cargar estadísticas guardadas
 */
export function getStoredAnalytics() {
  if (typeof window === 'undefined') return getDefaultAnalytics();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultAnalytics();
    const data = JSON.parse(raw);
    return {
      ...getDefaultAnalytics(),
      ...data,
      dailyVisits: { ...data.dailyVisits }
    };
  } catch (e) {
    return getDefaultAnalytics();
  }
}

/**
 * Guardar analítica
 */
function saveAnalytics(data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('pc_analytics_update', { detail: data }));
  } catch (e) {
    console.warn('No se pudo guardar la analítica local:', e);
  }
}

/**
 * Registrar una vista de página (invocado al cargar App.jsx)
 */
export function recordPageView() {
  if (typeof window === 'undefined') return;

  try {
    const analytics = getStoredAnalytics();
    const today = getTodayKey();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Detectar Referrer / Fuente
    const referrer = document.referrer ? document.referrer.toLowerCase() : '';
    let source = 'direct';
    if (referrer.includes('whatsapp') || referrer.includes('wa.me')) {
      source = 'whatsapp';
    } else if (referrer.includes('instagram')) {
      source = 'instagram';
    } else if (referrer.includes('google')) {
      source = 'google';
    } else if (referrer.length > 0 && !referrer.includes(window.location.hostname)) {
      source = 'other';
    }

    // 1. Siempre incrementa vistas totales de página
    analytics.totalPageviews = (analytics.totalPageviews || 0) + 1;
    analytics.lastVisitAt = new Date().toISOString();

    // 2. Verificar si es un visitante único nuevo en este navegador
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
      analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
    }

    // 3. Verificar si es una sesión activa o una nueva visita
    const hasActiveSession = sessionStorage.getItem(SESSION_KEY);
    if (!hasActiveSession) {
      // Es una nueva visita / sesión
      sessionStorage.setItem(SESSION_KEY, Date.now().toString());
      analytics.totalVisits = (analytics.totalVisits || 0) + 1;

      // Incrementar día actual
      analytics.dailyVisits[today] = (analytics.dailyVisits[today] || 0) + 1;

      // Dispositivos
      if (isMobile) {
        analytics.deviceBreakdown.mobile = (analytics.deviceBreakdown.mobile || 0) + 1;
      } else {
        analytics.deviceBreakdown.desktop = (analytics.deviceBreakdown.desktop || 0) + 1;
      }

      // Fuentes
      if (!analytics.sources) analytics.sources = { direct: 0, whatsapp: 0, instagram: 0, google: 0, other: 0 };
      analytics.sources[source] = (analytics.sources[source] || 0) + 1;
    }

    saveAnalytics(analytics);
  } catch (err) {
    console.warn('Error registrando analítica:', err);
  }
}

/**
 * Obtener resumen consolidado para mostrar en el Dashboard del Admin
 */
export function getVisitorDashboardStats() {
  const analytics = getStoredAnalytics();
  const today = getTodayKey();
  
  // Calcular últimos 7 días
  const last7Days = [];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    const dayName = dayNames[d.getDay()];
    
    last7Days.push({
      date: dateKey,
      dayLabel: i === 0 ? 'Hoy' : dayName,
      fullDate: `${day}/${month}`,
      visits: analytics.dailyVisits[dateKey] || 0
    });
  }

  // Porcentaje de dispositivos
  const totalDevs = (analytics.deviceBreakdown.mobile || 0) + (analytics.deviceBreakdown.desktop || 0);
  const mobilePct = totalDevs > 0 ? Math.round((analytics.deviceBreakdown.mobile / totalDevs) * 100) : 70;
  const desktopPct = totalDevs > 0 ? Math.round((analytics.deviceBreakdown.desktop / totalDevs) * 100) : 30;

  // Total Leads recibidos en la web
  let totalLeadsCount = 0;
  if (typeof window !== 'undefined') {
    try {
      const contactLeads = JSON.parse(localStorage.getItem('pc_contact_leads') || '[]');
      const simLeads = JSON.parse(localStorage.getItem('pc_simulator_leads') || '[]');
      totalLeadsCount = contactLeads.length + simLeads.length;
    } catch (e) {}
  }

  // Tasa de conversión: (Consultas / Visitas) * 100
  const visitsForCalc = Math.max(analytics.totalVisits, 1);
  const conversionRate = totalLeadsCount > 0 
    ? ((totalLeadsCount / visitsForCalc) * 100).toFixed(1)
    : '0.0';

  return {
    totalVisits: analytics.totalVisits || 1, // Mínimo 1 de la sesión actual
    totalPageviews: analytics.totalPageviews || 1,
    uniqueVisitors: analytics.uniqueVisitors || 1,
    todayVisits: analytics.dailyVisits[today] || 1,
    mobilePct,
    desktopPct,
    conversionRate,
    totalLeadsCount,
    last7Days,
    sources: analytics.sources || { direct: 1, whatsapp: 0, instagram: 0, google: 0, other: 0 },
    lastVisitAt: analytics.lastVisitAt
  };
}

/**
 * Reiniciar métricas (opcional desde el panel)
 */
export function resetVisitorStats() {
  if (typeof window === 'undefined') return;
  const initial = getDefaultAnalytics();
  initial.totalVisits = 1;
  initial.totalPageviews = 1;
  initial.uniqueVisitors = 1;
  initial.dailyVisits[getTodayKey()] = 1;
  saveAnalytics(initial);
}
