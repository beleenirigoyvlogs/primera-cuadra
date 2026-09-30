import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Check, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  Building2, 
  User, 
  Phone, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { dispatchLeadEmail } from '../utils/emailDispatcher';

export default function ContactSection() {
  const whatsappNumber = '5491128779641';
  const sectionRef = useRef(null);
  const formStartedRef = useRef(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    service: 'Todo lo anterior',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const serviceOptions = [
    'Página Web',
    'Google',
    'WhatsApp Business',
    'Catálogo',
    'Todo lo anterior',
    'No estoy seguro'
  ];

  // =========================================================================
  // Analytics & Conversion Tracking Helper
  // =========================================================================
  const trackEvent = (eventName, data = {}) => {
    if (typeof window === 'undefined') return;

    // Standard Google Tag Manager (dataLayer)
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...data });
    }

    // Google Analytics 4 (gtag)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, data);
    }

    // Custom DOM Event for any analytics listeners
    window.dispatchEvent(new CustomEvent('pc-analytics', { 
      detail: { event: eventName, data } 
    }));

    if (import.meta.env?.DEV) {
      console.log(`[Analytics Event] ${eventName}:`, data);
    }
  };

  // Track form_view when section scrolls into viewport
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('form_view', { section: 'contact_form' });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger form_start on first user interaction
  const handleInteractionStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent('form_start', { section: 'contact_form' });
    }
  };

  // Change handlers
  const handleChange = (field, value) => {
    handleInteractionStart();
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingresá tu nombre';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Por favor ingresá el nombre de tu negocio';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor ingresá tu WhatsApp o teléfono';
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = 'Ingresá un número de contacto válido';
    }
    if (!formData.service) {
      newErrors.service = 'Por favor seleccioná una opción';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * =========================================================================
       * BACKEND INTEGRATION POINT:
       * Currently the web application runs without a custom server backend.
       * 
       * When ready to connect an API, webhook or service (e.g. EmailJS, Formspree, 
       * Google Sheets Webhook, or your REST endpoint), simply call it here:
       * 
       * await fetch('https://your-api-endpoint.com/api/leads', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify(formData)
       * });
       * =========================================================================
       */

      // Save lead to localStorage for local testing & persistence
      const currentLeads = JSON.parse(localStorage.getItem('pc_contact_leads') || '[]');
      const newLead = {
        ...formData,
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'nuevo'
      };
      currentLeads.unshift(newLead);
      localStorage.setItem('pc_contact_leads', JSON.stringify(currentLeads));

      // Dispatch event for real-time admin sync
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pc-new-lead', { detail: newLead }));
      }

      // Send automated email notification to primeracuadraweb@gmail.com
      dispatchLeadEmail({
        ...newLead,
        sourceLabel: 'Formulario Web'
      }).catch(err => console.warn('Email dispatch notice:', err));

      // Realistic feedback delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Trigger analytics
      trackEvent('form_submit', {
        service_requested: formData.service,
        business_name: formData.businessName
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-filled WhatsApp message for direct chat or post-submit
  const getWhatsAppMessage = () => {
    if (formData.name && formData.businessName) {
      return encodeURIComponent(
        `¡Hola Primera Cuadra! Soy ${formData.name} de "${formData.businessName}". Les escribo desde el formulario web porque me interesa asesoramiento para: ${formData.service}.`
      );
    }
    return encodeURIComponent(
      '¡Hola Primera Cuadra! Me gustaría recibir asesoramiento para la presencia digital de mi negocio.'
    );
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      origin: isSuccess ? 'contact_form_success' : 'contact_form_sidebar',
      service_requested: formData.service
    });
  };

  return (
    <section 
      className="contact-section-wrapper reveal" 
      id="contacto"
      ref={sectionRef}
      data-analytics-section="contact_form"
    >
      <div className="container">
        <div className="contact-grid-layout">
          {/* ===============================================================
              LEFT COLUMN: Title, Value Proposition & Benefits
              =============================================================== */}
          <div className="contact-info-col">
            <div className="section-kicker-pill contact-pill">
              <Sparkles size={14} />
              <span>ASESORAMIENTO SIN COMPROMISO</span>
            </div>

            <h2 className="contact-main-title">
              ¿Querés mejorar la presencia digital de tu negocio?
            </h2>

            <p className="contact-main-subtitle">
              Contanos brevemente qué necesitás y te contactamos para mostrarte qué podemos hacer.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="contact-benefits-list">
              <div className="contact-benefit-item">
                <div className="benefit-icon-circle">
                  <Check size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong>Atención personalizada</strong>
                  <span>Te escuchamos, entendemos tu rubro y tus tiempos.</span>
                </div>
              </div>

              <div className="contact-benefit-item">
                <div className="benefit-icon-circle">
                  <Check size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong>Propuesta adaptada a tu negocio</strong>
                  <span>Sin herramientas de más ni costos extras ocultos.</span>
                </div>
              </div>

              <div className="contact-benefit-item">
                <div className="benefit-icon-circle">
                  <Check size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong>Sin compromiso inicial</strong>
                  <span>Primero te mostramos la mejor opción para vos.</span>
                </div>
              </div>

              <div className="contact-benefit-item">
                <div className="benefit-icon-circle">
                  <Check size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong>Web + Google + WhatsApp</strong>
                  <span>Los tres canales conectados para generar consultas reales.</span>
                </div>
              </div>
            </div>

            {/* Immediate WhatsApp Alternative Box */}
            <div className="contact-direct-wa-box">
              <div className="direct-wa-header">
                <Clock size={16} className="text-brand-purple" />
                <span>¿Preferís una respuesta inmediata?</span>
              </div>
              <p className="direct-wa-desc">
                Si no querés esperar a que te llamemos, escribinos directo por WhatsApp y te respondemos en el día.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact-wa-link"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle size={18} />
                <span>Escribir por WhatsApp ahora</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: High-Conversion Modern Form Card
              =============================================================== */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              {isSuccess ? (
                /* ================= SUCCESS STATE ================= */
                <div className="contact-success-box">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={44} strokeWidth={2.2} />
                  </div>
                  <h3 className="success-headline">¡Consulta recibida con éxito!</h3>
                  <p className="success-message">
                    ¡Gracias! Recibimos tu consulta. Nos vamos a contactar para conocer tu negocio y mostrarte las opciones que podemos ofrecerte.
                  </p>

                  <div className="success-divider"></div>

                  <div className="success-wa-prompt">
                    <p className="success-wa-question">¿Preferís hablar directamente?</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-success-wa-action"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle size={20} />
                      <span>HABLAR POR WHATSAPP</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    className="btn-reset-form"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        businessName: '',
                        phone: '',
                        service: 'Todo lo anterior',
                        message: ''
                      });
                      formStartedRef.current = false;
                    }}
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                /* ================= FORM STATE ================= */
                <form 
                  onSubmit={handleSubmit} 
                  className="contact-actual-form" 
                  noValidate
                  data-analytics-form="lead_form"
                >
                  <div className="form-card-header">
                    <h3 className="form-card-title">Dejanos tus datos</h3>
                    <p className="form-card-subtitle">
                      Completalo en menos de 1 minuto y nos contactamos con vos.
                    </p>
                  </div>

                  {/* Field 1: Nombre */}
                  <div className="form-field-group">
                    <label htmlFor="lead-name" className="form-label">
                      <span>Tu nombre</span>
                      <span className="required-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={18} className="input-adornment-icon" />
                      <input
                        id="lead-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onFocus={handleInteractionStart}
                        placeholder="Tu nombre"
                        className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                      />
                    </div>
                    {errors.name && <span className="field-error-msg">{errors.name}</span>}
                  </div>

                  {/* Field 2: Nombre del negocio */}
                  <div className="form-field-group">
                    <label htmlFor="lead-business" className="form-label">
                      <span>Nombre del negocio</span>
                      <span className="required-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Building2 size={18} className="input-adornment-icon" />
                      <input
                        id="lead-business"
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleChange('businessName', e.target.value)}
                        onFocus={handleInteractionStart}
                        placeholder="Ej. Barbería Central"
                        className={`form-input ${errors.businessName ? 'is-invalid' : ''}`}
                      />
                    </div>
                    {errors.businessName && (
                      <span className="field-error-msg">{errors.businessName}</span>
                    )}
                  </div>

                  {/* Field 3: WhatsApp / Teléfono */}
                  <div className="form-field-group">
                    <label htmlFor="lead-phone" className="form-label">
                      <span>WhatsApp / Teléfono</span>
                      <span className="required-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Phone size={18} className="input-adornment-icon" />
                      <input
                        id="lead-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onFocus={handleInteractionStart}
                        placeholder="11 1234-5678"
                        className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                      />
                    </div>
                    {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                  </div>

                  {/* Field 4: ¿Qué necesitás? (Interactive Selector Chips) */}
                  <div className="form-field-group">
                    <label className="form-label">
                      <span>¿Qué necesitás?</span>
                      <span className="required-star">*</span>
                    </label>
                    <div className="service-chips-selector">
                      {serviceOptions.map((opt) => {
                        const isSelected = formData.service === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={`service-chip-btn ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => handleChange('service', opt)}
                          >
                            <span className="chip-indicator"></span>
                            <span className="chip-text">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.service && (
                      <span className="field-error-msg">{errors.service}</span>
                    )}
                  </div>

                  {/* Field 5: Mensaje (Opcional) */}
                  <div className="form-field-group">
                    <label htmlFor="lead-message" className="form-label">
                      <span>Mensaje</span>
                      <span className="optional-tag">(opcional)</span>
                    </label>
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onFocus={handleInteractionStart}
                      placeholder="Contanos brevemente qué necesitás o qué te gustaría mejorar..."
                      className="form-textarea"
                    ></textarea>
                  </div>

                  {/* Main Action Button */}
                  <button
                    type="submit"
                    className="btn-submit-lead"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="spinner-icon animate-spin" />
                        <span>ENVIANDO CONSULTA...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>QUIERO RECIBIR ASESORAMIENTO</span>
                      </>
                    )}
                  </button>

                  {/* Clarification footnote */}
                  <p className="form-helper-footnote">
                    ¿No sabés exactamente qué necesitás? No hay problema. Contanos sobre tu negocio y te orientamos.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
