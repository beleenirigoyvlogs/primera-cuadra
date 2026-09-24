import React from 'react';
import { 
  MapPin, 
  Globe, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Users 
} from 'lucide-react';

export default function VisualJourneyFlow() {
  const steps = [
    {
      num: '01',
      phase: 'FASE 1: DESCUBRIMIENTO',
      title: 'Te encuentran en Google Maps',
      subtitle: 'Búsqueda por cercanía en tu zona',
      icon: MapPin,
      accent: 'pin',
      tag: 'Tráfico Calificado',
      stats: '82% busca desde el celular',
      bullets: [
        'Ficha 100% optimizada con tu categoría exacta',
        'Fotos reales de tu local y servicios clave',
        'Reseñas respondidas con palabras clave locales'
      ]
    },
    {
      num: '02',
      phase: 'FASE 2: CONFIANZA',
      title: 'Validan con tu Web Propia',
      subtitle: 'Tu vidriera digital con dominio propio',
      icon: Globe,
      accent: 'web',
      tag: 'Autoridad & Respaldo',
      stats: 'Entrega en 4 días hábiles',
      bullets: [
        'Dominio .com o .com.ar registrado a tu nombre',
        'Carga ultra rápida optimizada para celulares',
        'Lista de servicios, tarifas y fotos sin sorpresas'
      ]
    },
    {
      num: '03',
      phase: 'FASE 3: CONVERSIÓN',
      title: 'Te contactan por WhatsApp',
      subtitle: 'El mostrador donde cerrás la venta',
      icon: MessageSquare,
      accent: 'chat',
      tag: 'Cierre Inmediato',
      stats: 'Respuestas en segundos',
      bullets: [
        'Catálogo de servicios y precios pre-cargado',
        'Botón directo en la web sin agendar números',
        'Respuestas predeterminadas listas para usar'
      ]
    }
  ];

  return (
    <section className="visual-journey-section" id="como-funciona-el-tripode">
      <div className="container">
        {/* Section Header with generous spacing & clear hierarchy */}
        <div className="section-header-center">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>EL RECORRIDO DEL CLIENTE LOCAL</span>
          </div>
          <h2 className="section-title">
            De la búsqueda a la venta en <span className="highlight-purple">3 simples pasos</span>
          </h2>
          <p className="section-subtitle">
            Así es exactamente cómo tus futuros clientes pasan de buscar tu rubro en Google a escribirte por WhatsApp listos para comprar.
          </p>
        </div>

        {/* Visual Roadmap Grid with Connecting Flow */}
        <div className="journey-roadmap-wrapper">
          {/* Progress Connector Line (Desktop) */}
          <div className="journey-connector-line" aria-hidden="true"></div>

          <div className="journey-cards-grid">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={idx} className={`journey-step-card journey-${step.accent}`}>
                  {/* Top Phase & Step Indicator */}
                  <div className="journey-card-top">
                    <span className="journey-step-num">{step.num}</span>
                    <span className="journey-phase-badge">{step.phase}</span>
                  </div>

                  {/* Icon Box */}
                  <div className={`journey-icon-box ${step.accent}`}>
                    <IconComp size={28} />
                  </div>

                  {/* Headings */}
                  <h3 className="journey-card-title">{step.title}</h3>
                  <p className="journey-card-subtitle">{step.subtitle}</p>

                  {/* Metric Pill */}
                  <div className="journey-metric-pill">
                    <TrendingUp size={14} />
                    <span>{step.stats}</span>
                  </div>

                  {/* Checkpoints */}
                  <ul className="journey-checklist">
                    {step.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        <CheckCircle2 size={16} className="journey-check-icon" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Step Connector Arrow for mobile / visual cue */}
                  {idx < steps.length - 1 && (
                    <div className="journey-step-arrow-hint">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Quick Action */}
        <div className="journey-bottom-action">
          <div className="journey-bottom-summary">
            <Users size={20} className="journey-summary-icon" />
            <span>¿Querés ver cómo se adapta esto a tu rubro en tiempo real?</span>
          </div>
          <a href="#demostracion-en-vivo" className="btn-hostinger-secondary-pill">
            <span>Ver Simulador Interactivo</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
