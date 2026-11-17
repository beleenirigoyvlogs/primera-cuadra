/**
 * Centralized Google Tag Manager (GTM) & Analytics Utility
 * Pushes standard events to window.dataLayer and triggers custom DOM events.
 */

export function pushGtmEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if not yet initialized
  window.dataLayer = window.dataLayer || [];

  const eventObject = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload
  };

  window.dataLayer.push(eventObject);

  // Trigger gtag event if gtag is loaded
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  // Custom DOM event for internal reactive monitoring
  window.dispatchEvent(new CustomEvent('pc-analytics-event', {
    detail: { event: eventName, ...payload }
  }));

  if (import.meta.env?.DEV) {
    console.log(`[GTM Event] ${eventName}:`, payload);
  }
}

/**
 * Pre-configured helpers for core conversion events
 */
export const trackWhatsAppClick = (buttonOrigin, packOrDetails = '') => {
  pushGtmEvent('whatsapp_click', {
    button_origin: buttonOrigin,
    wa_location: buttonOrigin,
    pack_name: packOrDetails
  });
};

let isWaTrackingInit = false;
export function initWhatsAppTracking() {
  if (typeof window === 'undefined' || isWaTrackingInit) return;
  isWaTrackingInit = true;

  document.addEventListener('click', (e) => {
    const el = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
    if (el) {
      const waLocation = el.getAttribute('data-wa') || 'general';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_click',
        wa_location: waLocation,
        page_path: window.location.pathname
      });
    }
  }, { passive: true });
}

export const trackContactFormSubmit = (formData) => {
  pushGtmEvent('contact_form_submit', {
    service_requested: formData.service || 'No especificado',
    business_name: formData.businessName || '',
    has_message: Boolean(formData.message)
  });
};

export const trackSimulatorOpen = (source = 'home_callout') => {
  pushGtmEvent('simulator_open', {
    source_location: source
  });
};

