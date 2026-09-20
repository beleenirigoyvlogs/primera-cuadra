import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Zap,
  Boxes,
  Store,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PACKS } from '../data/nicheData';

export default function PricingPacks({ niche }) {
  const whatsappNumber = '5491128779641';
  const [selectedPlanMode, setSelectedPlanMode] = useState('pago-unico');

  const handleSelectPack = (pack) => {
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.65 }
    });

    const msg = pack.whatsappMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${msg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const packExpress = PACKS.find(p => p.id === 'pack-express') || PACKS[0];
  const packSoloWeb = PACKS.find(p => p.id === 'pack-solo-web') || PACKS[1];
  const packCompleto = PACKS.find(p => p.id === 'pack-completo') || PACKS[2];
  const packComercioPOS = PACKS.find(p => p.id === 'pack-comercio-pos') || PACKS[3];

  return (
    <section className="pricing-section-wrapper" id="packs-precios">
      <div className="container">
        {/* Hostinger Section Header */}
        <div className="section-header-center">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>PRECIOS TRANSPARENTES • SIN COSTOS OCULTOS</span>
          </div>
          <h2 className="section-title">
            Elegí el plan ideal para vos
          </h2>
          <p className="section-subtitle">
            Probá Primera Cuadra sin riesgos, con esquema 50% al iniciar y 50% contra entrega conforme y soporte directo por WhatsApp siempre que necesites ayuda.
          </p>

          {/* Condition Dropdown Pill (Hostinger style) */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f1f3f7', border: '1px solid #e5e7eb', padding: '8px 18px', borderRadius: '9999px', marginTop: '20px', fontSize: '0.88rem', fontWeight: 700, color: '#18181b' }}>
            <span>Esquema de Pago Seguro: 50% inicio / 50% entrega</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Pricing Cards Grid (Exact Hostinger style) */}
        <div className="pricing-cards-grid">
          {/* Card 1: Pack Express (Standard White Card) */}
          <div className="pricing-card-hostinger standard">
            <div className="card-top-badge">
              48hs entrega • 60% off
            </div>

            <h3 className="plan-name">Express</h3>
            <p className="plan-desc">
              Para negocios que quieren aparecer en Google Maps y atender por WhatsApp ya, sin página web.
            </p>

            <div className="price-tag-wrapper">
              <span className="price-strikethrough">ARS 180.000</span>
              <div className="price-main-row">
                <span className="currency-code">ARS</span>
                <span className="price-amount-bold">120.000</span>
                <span className="price-unit">/pago único</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-plan-hostinger"
              onClick={() => handleSelectPack(packExpress)}
            >
              Elegir plan
            </button>

            <div className="plan-sub-guarantee">
              Iniciás con {packExpress.initialPayment} y el saldo de {packExpress.finalPayment} recién contra entrega en 48 horas.
            </div>

            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Ficha de Google Maps optimizada</span>
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
                <span>Novedades y fotos publicadas en Google</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Reseñas respondidas profesionalmente</span>
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
                <span>Entrega express garantizada en 48 horas</span>
              </li>
              <li className="plan-feature-item excluded">
                <X size={18} className="feature-x-icon" />
                <span>Página web propia con dominio</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Pack Solo Web (Standard White Card with Web emphasis) */}
          <div className="pricing-card-hostinger standard">
            <div className="card-top-badge" style={{ background: '#ede9fe', color: '#673de6' }}>
              Dominio gratis • 4 días
            </div>

            <h3 className="plan-name">Solo Web Propia</h3>
            <p className="plan-desc">
              Tu página web profesional mobile-first con dominio a tu nombre, catálogo de servicios y WhatsApp directo.
            </p>

            <div className="price-tag-wrapper">
              <span className="price-strikethrough">ARS 240.000</span>
              <div className="price-main-row">
                <span className="currency-code">ARS</span>
                <span className="price-amount-bold">150.000</span>
                <span className="price-unit">/pago único</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-plan-hostinger"
              onClick={() => handleSelectPack(packSoloWeb)}
            >
              Elegir plan
            </button>

            <div className="plan-sub-guarantee">
              Iniciás con {packSoloWeb.initialPayment} y el saldo de {packSoloWeb.finalPayment} recién cuando la web está lista y aprobada.
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
                <span>Certificado SSL (candado seguro https)</span>
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
                <span><strong>Entrega garantizada en 4 días hábiles</strong></span>
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

          {/* Card 3: Pack Completo (FEATURED DARK NIGHT PURPLE CARD - Screenshot 1) */}
          <div className="pricing-card-hostinger featured">
            <div className="card-top-badge">
              Oferta especial • 4 días entrega
            </div>

            <h3 className="plan-name">
              <span>✦</span> Completo + Web Propia
            </h3>
            <p className="plan-desc">
              La solución definitiva: tu propia página web profesional con dominio a tu nombre, Google Maps y WhatsApp integrados.
            </p>

            <div className="price-tag-wrapper">
              <span className="price-strikethrough">ARS 390.000</span>
              <div className="price-main-row">
                <span className="currency-code">ARS</span>
                <span className="price-amount-bold">250.000</span>
                <span className="price-unit">/pago único</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-plan-hostinger"
              onClick={() => handleSelectPack(packCompleto)}
            >
              Elegir plan
            </button>

            <div className="plan-sub-guarantee">
              Iniciás con {packCompleto.initialPayment} y el saldo de {packCompleto.finalPayment} recién cuando la web está lista y aprobada.
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
                <span>Ficha de Google Maps Top 3 optimizada</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>WhatsApp Business oficial con catálogo completo</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Reseñas respondidas y novedades SEO publicadas</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span><strong>Entrega llave en mano en 4 días hábiles</strong></span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>100% de tu propiedad (cero mensualidades de alquiler)</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Pack Comercio & POS Total (Special High-Value Tier) */}
          <div className="pricing-card-hostinger standard pos-pack-card">
            <div className="card-top-badge pos-badge">
              ⚡ POS + Stock + Web • 7 días
            </div>

            <h3 className="plan-name">
              <span>🏪</span> Comercio & POS Total
            </h3>
            <p className="plan-desc">
              Presencia digital completa más tu Sistema de Punto de Venta (POS) con control de stock, empleados y clientes.
            </p>

            <div className="price-tag-wrapper">
              <span className="price-strikethrough">ARS 580.000</span>
              <div className="price-main-row">
                <span className="currency-code">ARS</span>
                <span className="price-amount-bold">390.000</span>
                <span className="price-unit">/pago único</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-plan-hostinger btn-plan-pos"
              onClick={() => handleSelectPack(packComercioPOS)}
            >
              Elegir plan
            </button>

            <div className="plan-sub-guarantee">
              Iniciás con {packComercioPOS.initialPayment} y el saldo de {packComercioPOS.finalPayment} recién contra entrega y capacitación.
            </div>

            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon text-emerald" />
                <span><strong>Sistema POS de Punto de Venta</strong> táctil para PC / Tablet</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon text-emerald" />
                <span><strong>Control de Stock e Inventario</strong> en tiempo real</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon text-emerald" />
                <span><strong>Gestión de Empleados</strong> con roles y permisos</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon text-emerald" />
                <span><strong>Base de Clientes & CRM</strong> e historial de compras</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon text-emerald" />
                <span>Arqueo de caja diaria, cierres y balance de ventas</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span><strong>Tu Página Web Propia</strong> con dominio incluido</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>Ficha de Google Maps Top 3 optimizada</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>WhatsApp Business con catálogo cargado</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span><strong>Capacitación inicial incluida</strong> para tu equipo</span>
              </li>
              <li className="plan-feature-item">
                <Check size={18} className="feature-check-icon" />
                <span>100% de tu propiedad (cero alquileres mensuales)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* POS Standalone Callout Banner */}
        <div className="pos-standalone-banner">
          <div className="pos-banner-left">
            <div className="pos-badge-pill">
              <Boxes size={15} />
              <span>SISTEMA DE GESTIÓN A MEDIDA</span>
            </div>
            <h4 className="pos-banner-title">¿Buscás únicamente el Software de Punto de Venta (POS) y Stock para tu local?</h4>
            <p className="pos-banner-desc">
              Desarrollamos el sistema a la medida exacta de tu negocio: facturación express, control de stock con alertas de reposición, gestión de empleados por turno y cuenta corriente de clientes. Sin pagar abonos mensuales abusivos.
            </p>
          </div>
          <div className="pos-banner-right">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola Primera Cuadra! Me interesa consultar por el desarrollo de un Sistema de Punto de Venta (POS) y control de stock para mi comercio. ¿Podemos coordinar?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pos-cta"
            >
              <span>Consultar por Sistema POS a medida</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
