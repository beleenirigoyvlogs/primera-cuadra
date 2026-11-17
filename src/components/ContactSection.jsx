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
  Clock, 
  ShieldCheck, 
  MapPin,
  ChevronDown
} from 'lucide-react';
import { dispatchLeadEmail } from '../utils/emailDispatcher';
import { pushGtmEvent, trackContactFormSubmit, trackWhatsAppClick } from '../utils/gtm';

export default function ContactSection() {
  const whatsappNumber = '5491128779641';
  const sectionRef = useRef(null);
  const formStartedRef = useRef(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    service: 'Todo lo anterior (Web + Google + WhatsApp)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const serviceOptions = [
    'Todo lo anterior (Web + Google + WhatsApp)',
    'Página Web Propia con dominio',
    'Ficha optimizada de Google Maps',
    'WhatsApp Business configurado',
    'Programa de Primeros Clientes (Precio Lanzamiento)',
    'Desarrollo a medida / Sistema POS',
    'Todavía tengo dudas / Asesoramiento'
  ];

  // Track form_view when section scrolls into viewport
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            pushGtmEvent('form_view', { section: 'contact_form' });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInteractionStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      pushGtmEvent('form_start', { section: 'contact_form' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, ingresá tu nombre';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Por favor, ingresá el nombre de tu negocio';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor, ingresá tu teléfono o WhatsApp';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Ingresá un teléfono válido (mínimo 8 dígitos)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Save lead to localStorage
      const currentLeads = JSON.parse(localStorage.getItem('pc_contact_leads') || '[]');
      const newLead = {
        ...formData,
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'nuevo'
      };
      currentLeads.unshift(newLead);
      localStorage.setItem('pc_contact_leads', JSON.stringify(currentLeads));

      // 2. Dispatch event for real-time admin sync
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pc-new-lead', { detail: newLead }));
      }

      // 3. Dispatch automated notification email
      dispatchLeadEmail({
        ...newLead,
        sourceLabel: 'Formulario Unificado de Contacto'
      }).catch(err => console.warn('Email dispatch notice:', err));

      // 4. Analytics & GTM
      trackContactFormSubmit(formData);

      await new Promise(resolve => setTimeout(resolve, 600));
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDirectWhatsAppMsg = () => {
    return encodeURIComponent(
      '¡Hola Belén! Tengo dudas y me gustaría conversar sobre las opciones de presencia digital para mi negocio.'
    );
  };

  const getPostSubmitWhatsAppMsg = () => {
    return encodeURIComponent(
      `¡Hola Belén! Acabo de enviar el formulario desde la web de Primera Cuadra. Soy ${formData.name} de "${formData.businessName}" y me interesa: ${formData.service}.`
    );
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
              <span>ASESORAMIENTO DIRECTO</span>
            </div>

            <h2 className="contact-main-title">
              ¿Querés mejorar la presencia digital de tu negocio?
            </h2>

            <p className="contact-main-subtitle">
              Contame qué hacés y te muestro cómo podría verse tu negocio online. Atención directa y personalizada conmigo de principio a fin, sin tecnicismos ni letra chica.
            </p>

            {/* Trust Checklist */}
            <div className="contact-benefits-list">
              <div className="contact-benefit-item">
                <div className="benefit-icon-circle">
                  <Check size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong>Atención directa con Belén Irigoy</strong>
                  <span>Desde Tigre, para negocios, profesionales y empresas de todo el país.</span>
                </div>
              </div>

              <div className="contact-benefit-item">
                <div className="benefit-icon-circle">
                  <Check size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong>Presupuesto claro y precio justo</strong>
                  <span>Sin herramientas de más ni costos de mantenimiento forzados.</span>
                </div>
              </div>

              <div className="contact-benefit-item">
                <div className="benefit-icon-circle">
                  <Check size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong>Propuesta previa sin costo</strong>
                  <span>Te muestro una propuesta base gratis antes de que decidas.</span>
                </div>
              </div>
            </div>

            {/* Immediate WhatsApp Alternative Box */}
            <div className="contact-direct-wa-box">
              <div className="direct-wa-header">
                <Clock size={16} className="text-brand-purple" />
                <span>¿Preferís una respuesta rápida?</span>
              </div>
              <p className="direct-wa-desc">
                Escribime directo por WhatsApp para consultar dudas o contarme sobre tu comercio. Respondo en el día.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${getDirectWhatsAppMsg()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact-wa-link"
                onClick={() => trackWhatsAppClick('contact_sidebar_direct', 'Dudas_o_inicio')}
              >
                <MessageCircle size={18} />
                <span>Escribir a Belén por WhatsApp</span>
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
                    ¡Muchas gracias, <strong>{formData.name}</strong>! Recibí los datos de <strong>{formData.businessName}</strong>. Me voy a poner en contacto con vos a la brevedad para asesorarte.
                  </p>

                  <div className="success-divider"></div>

                  <div className="success-wa-prompt">
                    <p className="success-wa-question">¿Querés que lo veamos ya mismo?</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${getPostSubmitWhatsAppMsg()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-success-wa-action"
                      onClick={() => trackWhatsAppClick('contact_form_success_button', formData.service)}
                    >
                      <MessageCircle size={20} />
                      <span>ABRIR CHAT DE WHATSAPP CON BELÉN</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* ================= FORM STATE ================= */
                <form 
                  onSubmit={handleSubmit} 
                  noValidate
                  onFocus={handleInteractionStart}
                  className="contact-actual-form"
                >
                  <div className="form-card-header">
                    <h3 className="form-title">Dejame tu consulta</h3>
                    <p className="form-subtitle">Completá este formulario breve y te contacto.</p>
                  </div>

                  {/* Field: Name */}
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      <span>Tu nombre</span>
                      <span className="required-star">*</span>
                    </label>
                    <div className={`input-with-icon ${errors.name ? 'has-error' : ''}`}>
                      <User size={18} className="input-adornment-icon" />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej: Marcelo Gómez"
                        className="form-input"
                        autoComplete="name"
                      />
                    </div>
                    {errors.name && <span className="field-error-msg">{errors.name}</span>}
                  </div>

                  {/* Field: Business Name */}
                  <div className="form-group">
                    <label htmlFor="contact-business" className="form-label">
                      <span>Nombre de tu negocio o actividad</span>
                      <span className="required-star">*</span>
                    </label>
                    <div className={`input-with-icon ${errors.businessName ? 'has-error' : ''}`}>
                      <Building2 size={18} className="input-adornment-icon" />
                      <input
                        id="contact-business"
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Ej: Taller Mecánico Gómez / Barbería Tigre"
                        className="form-input"
                        autoComplete="organization"
                      />
                    </div>
                    {errors.businessName && <span className="field-error-msg">{errors.businessName}</span>}
                  </div>

                  {/* Field: Phone / WhatsApp */}
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">
                      <span>Teléfono o WhatsApp de contacto</span>
                      <span className="required-star">*</span>
                    </label>
                    <div className={`input-with-icon ${errors.phone ? 'has-error' : ''}`}>
                      <Phone size={18} className="input-adornment-icon" />
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej: 11 2345-6789"
                        className="form-input"
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                  </div>

                  {/* Field: Service of Interest */}
                  <div className="form-group">
                    <label htmlFor="contact-service" className="form-label">
                      <span>¿Qué estás buscando para tu negocio?</span>
                    </label>
                    <div className="select-wrapper">
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="form-select"
                      >
                        {serviceOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="select-custom-arrow" />
                    </div>
                  </div>

                  {/* Field: Optional Message */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      <span>¿Querés contarme algo más?</span>
                      <span className="optional-tag">(opcional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Contame si ya tenés fotos, redes o si estás empezando desde cero..."
                      rows="3"
                      className="form-textarea"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-hostinger-primary btn-submit-form"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner-icon animate-spin" />
                        <span>Enviando consulta...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Enviar consulta</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="form-privacy-note">
                    Tus datos se usan únicamente para responderte. Cero spam.
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
