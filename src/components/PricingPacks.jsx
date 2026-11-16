import React from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Info,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackWhatsAppClick } from '../utils/gtm';

export default function PricingPacks({ niche }) {
  const whatsappNumber = '5491128779641';

  const handleSelectPack = (packName, price, msgText) => {
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.65 }
    });

    trackWhatsAppClick('pricing_card_button', packName);

    const encoded = encodeURIComponent(msgText);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="pricing-section-wrapper" id="precios">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center reveal">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>PRECIOS TRANSPARENTES • SIN COSTOS OCULTOS</span>
          </div>
          <h2 className="section-title">
            Elegí el plan ideal para tu negocio
          </h2>
          <p className="section-subtitle">
            Probá Primera Cuadra con total tranquilidad: 50% al iniciar y 50% contra entrega conforme, con atención directa de Belén Irigoy de principio a fin.
          </p>

          {/* User rule 8: "Esta página la diseñamos nosotros: así de rápida y clara va a ser la tuya." */}
          <div className="own-page-proof-pill">
            <Sparkles size={15} className="text-purple-icon" />
            <span>Esta página la diseñamos nosotros: así de rápida y clara va a ser la tuya.</span>
          </div>
        </div>

        {/* Single Launch Banner Above Grid (Item 3 Requirement) */}
        <div className="pricing-launch-banner-strip reveal">
          <Sparkles size={16} className="text-purple-accent" />
          <span>Precio de lanzamiento para los primeros 5 negocios • 50% al iniciar / 50% contra entrega</span>
        </div>

        {/* Pricing Cards Grid (Exact 3 Plans aligned) */}
        <div className="pricing-cards-grid reveal-group">
          {/* Card 1: Pack Express */}
          <div className="pricing-card-hostinger standard reveal">
            <div className="plan-card-header">
              <h3 className="plan-name">Express</h3>
              <p className="plan-desc">
                Para negocios que quieren aparecer en Google Maps y atender por WhatsApp ya, sin página web.
              </p>
            </div>

            <div className="price-tag-wrapper">
              <div className="price-main-row">
                <span className="currency-code">ARS</span>
                <span className="price-amount-bold">120.000</span>
                <span className="price-unit">/pago único</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-plan-hostinger"
              onClick={() => handleSelectPack('Express', 120000, '¡Hola Belén! Me interesa el Plan Express ($120.000) para mi negocio. ¿Cómo podemos empezar?')}
            >
              <span>Elegir plan Express</span>
              <ArrowRight size={15} />
            </button>

            <div className="plan-sub-guarantee">
              50% al iniciar ($60.000) y 50% contra entrega ($60.000).
            </div>

            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Ficha optimizada para búsquedas de tu zona</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Categoría exacta y palabras clave locales</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Servicios y tarifas de referencia cargados</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Novedades y fotos de tu negocio publicadas en Google</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Respuestas profesionales para opiniones de clientes</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>WhatsApp Business con catálogo de servicios</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Botón directo para consultar o reservar</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Entrega estimada en 48 horas desde que recibimos tu material</span>
              </li>
              <li className="plan-feature-item excluded">
                <X size={18} className="feature-x-icon" />
                <span>Página web propia con dominio</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Pack Solo Web */}
          <div className="pricing-card-hostinger standard reveal">
            <div className="plan-card-header">
              <h3 className="plan-name">Solo Web</h3>
              <p className="plan-desc">
                Tu página web profesional mobile-first con dominio a tu nombre, catálogo de servicios y WhatsApp directo.
              </p>
            </div>

            <div className="price-tag-wrapper">
              <div className="price-main-row">
                <span className="currency-code">ARS</span>
                <span className="price-amount-bold">150.000</span>
                <span className="price-unit">/pago único</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-plan-hostinger"
              onClick={() => handleSelectPack('Solo Web', 150000, '¡Hola Belén! Me interesa el Plan Solo Web ($150.000) para mi negocio. ¿Cómo podemos empezar?')}
            >
              <span>Elegir plan Solo Web</span>
              <ArrowRight size={15} />
            </button>

            <div className="plan-sub-guarantee">
              50% al iniciar ($75.000) y 50% contra entrega ($75.000).
            </div>

            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span><strong>Tu Página Web Propia</strong> mobile-first a medida</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span><strong>Dominio propio incluido</strong> a tu nombre (.com / .com.ar)</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Certificado SSL (candado de navegación segura)</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Lista de tarifas, servicios y fotos de trabajos</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Botón directo y flotante de WhatsApp en la web</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Velocidad de carga instantánea en celulares</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Entrega estimada en 4 días hábiles desde que recibimos tu material</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>100% de tu propiedad (sin mensualidades obligatorias)</span>
              </li>
              <li className="plan-feature-item excluded">
                <X size={18} className="feature-x-icon" />
                <span>Ficha de Google Maps optimizada</span>
              </li>
              <li className="plan-feature-item excluded">
                <X size={18} className="feature-x-icon" />
                <span>Configuración de WhatsApp Business con catálogo</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Pack Completo */}
          <div className="pricing-card-hostinger featured reveal">
            <div className="card-top-badge featured-badge">
              ✦ MÁS ELEGIDO
            </div>

            <div className="plan-card-header">
              <h3 className="plan-name">
                Completo + Web Propia
              </h3>
              <p className="plan-desc">
                La solución definitiva: tu propia página web profesional con dominio a tu nombre, Google Maps y WhatsApp integrados.
              </p>
            </div>

            <div className="price-tag-wrapper">
              <div className="price-main-row">
                <span className="currency-code">ARS</span>
                <span className="price-amount-bold">250.000</span>
                <span className="price-unit">/pago único</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-plan-hostinger btn-plan-featured"
              onClick={() => handleSelectPack('Completo + Web Propia', 250000, '¡Hola Belén! Me interesa el Plan Completo + Web Propia ($250.000) para mi negocio. ¿Cómo podemos empezar?')}
            >
              <span>Elegir plan Completo</span>
              <ArrowRight size={15} />
            </button>

            <div className="plan-sub-guarantee">
              50% al iniciar ($125.000) y 50% contra entrega ($125.000).
            </div>

            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span><strong>Tu Página Web Propia</strong> mobile-first a medida</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span><strong>Dominio propio incluido</strong> a tu nombre (.com / .com.ar)</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Tarifario, servicios, fotos y botón de WhatsApp</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Velocidad de carga instantánea optimizada</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Ficha optimizada para búsquedas de tu zona</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>WhatsApp Business oficial con catálogo completo</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Configuración de palabras clave locales y fotos en Google</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Entrega estimada en 4 días hábiles desde que recibimos tu material</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>100% de tu propiedad (sin mensualidades de alquiler)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Priority 3, Item 13: Honest explanation of ownership, renewals, and optional maintenance */}
        <div className="pricing-clarity-notice reveal">
          <div className="clarity-notice-header">
            <Info size={20} className="text-purple-icon" />
            <h4>Claridad total sobre la propiedad de tu web y costos futuros</h4>
          </div>
          <div className="clarity-notice-grid">
            <div className="clarity-item">
              <strong>100% de tu propiedad:</strong>
              <p>Tu página web y tu dominio son tuyos. No te cobramos alquileres forzados ni cuotas mensuales de permanencia.</p>
            </div>
            <div className="clarity-item">
              <strong>Renovación anual (a partir del 2° año):</strong>
              <p>El 1er año de dominio y hosting está incluido. Luego solo pagás la renovación anual a precio de costo (valores que se actualizan año a año; para el año 2026 el costo de renovación anual de dominio + hosting es de $8.500).</p>
            </div>
            <div className="clarity-item">
              <strong>Mantenimiento mensual opcional:</strong>
              <p>Si querés que nosotros nos ocupemos de actualizar fotos, precios o novedades mes a mes, podés contratar nuestro servicio de mantenimiento mensual por $50.000/mes (totalmente opcional, podés no contratarlo y tu web sigue funcionando igual).</p>
            </div>
          </div>
        </div>

        {/* Discreet link to Custom Development (POS / Software) */}
        <div className="pricing-custom-dev-note reveal">
          <p>
            ¿Tu comercio necesita un <strong>Sistema de Punto de Venta (POS)</strong> táctil con control de stock o una <strong>Aplicación Móvil</strong>?
          </p>
          <a href="/desarrollo-a-medida" className="btn-pos-link">
            <span>Ver desarrollo de software y sistemas a medida</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
