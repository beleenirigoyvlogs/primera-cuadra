import React from 'react';
import { 
  Anchor, 
  Scissors, 
  Wrench, 
  HeartPulse, 
  Briefcase, 
  Coffee, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { RUBROS } from '../data/nicheData';

export default function CategoryCardsGrid({ currentNiche, onSelectNiche }) {
  const categoryCards = [
    {
      id: 'nautica',
      name: 'Náuticas, Guarderías & Astilleros',
      badge: '⚓ NÁUTICA & RÍO',
      icon: Anchor,
      color: 'blue',
      demandTag: 'Alta demanda en Tigre, San Fernando & Nordelta',
      problem: 'Quien busca amarra o bajada en Google termina eligiendo la guardería que muestra fotos de sus cunas y precios claros.',
      solution: 'Web con plano de marina, bajada con pluma, tarifario por pie y botón de consulta de cunas directo a WhatsApp.',
      tags: ['Cunas techadas', 'Tarifario descargable', 'Plano con Google Maps'],
      metric: '4.600 búsquedas/mes'
    },
    {
      id: 'peluqueria',
      name: 'Peluquerías, Barberías & Estética',
      badge: '✂️ BARBERÍAS & ESTÉTICA',
      icon: Scissors,
      color: 'purple',
      demandTag: 'Más de 7.000 búsquedas mensuales de cercanía',
      problem: 'Perdés horas respondiendo "¿cuánto sale el corte?" y pasando turnos de a uno por mensajes sueltos de Instagram.',
      solution: 'Lookbook de fotos con tus transformaciones reales, lista de precios transparente y reserva de turnos por WhatsApp.',
      tags: ['Reserva de turnos', 'Lookbook estilo feed', 'Catálogo con precios'],
      metric: '7.200 búsquedas/mes'
    },
    {
      id: 'comercio',
      name: 'Talleres Mecánicos, Detailing & Repuestos',
      badge: '🚗 TALLERES & COMERCIOS',
      icon: Wrench,
      color: 'amber',
      demandTag: 'Urgencias mecánicas y servicios programados',
      problem: 'Quien tiene una falla o necesita un service busca en Maps y va directo al taller mejor ubicado con mapa y teléfono listo.',
      solution: 'Ficha en Maps verificada, ubicación exacta para Waze y botón para enviar fotos y pedir presupuesto express.',
      tags: ['Diagnóstico computarizado', 'Mapa directo en Maps', 'Presupuesto express'],
      metric: '5.400 búsquedas/mes'
    },
    {
      id: 'salud_estetica',
      name: 'Clínicas Médicas, Odontología & Consultorios',
      badge: '🩺 SALUD & ODONTOLOGÍA',
      icon: HeartPulse,
      color: 'rose',
      demandTag: 'Decisiones basadas 100% en confianza médica',
      problem: 'Un paciente que evalúa ortodoncia o implantes descarta consultorios sin web formal o sin cartilla clara de obras sociales.',
      solution: 'Web que transmite respaldo clínico, matrícula médica, listado de obras sociales aceptadas y asignación de turnos.',
      tags: ['Cartilla de prepagas', 'Fotos de consultorio', 'Turnos organizados'],
      metric: '4.900 búsquedas/mes'
    },
    {
      id: 'profesional',
      name: 'Estudios Jurídicos, Contables & Consultoras',
      badge: '⚖️ SERVICIOS PROFESIONALES',
      icon: Briefcase,
      color: 'cyan',
      demandTag: 'Clientes corporativos y consultas calificadas',
      problem: 'Presentarse sin dominio propio (.com o .com.ar) o con redes informales resta credibilidad ante empresas y clientes grandes.',
      solution: 'Web institucional con áreas de práctica, trayectoria de los socios, formulario confidencial y agenda para videollamada.',
      tags: ['Dominio propio .com.ar', 'Áreas de especialidad', 'Consulta confidencial'],
      metric: '3.800 búsquedas/mes'
    },
    {
      id: 'gastronomia',
      name: 'Gastronomía, Bares & Cafeterías',
      badge: '☕ GASTRONOMÍA & CAFÉ',
      icon: Coffee,
      color: 'emerald',
      demandTag: 'Búsqueda de menú y ambiente desde el celular',
      problem: 'Los comensales odian descargar archivos PDF de 25MB para ver la carta o no saber si hay que hacer reserva previa.',
      solution: 'Menú digital ultra rápido con fotos HD de platos, ubicación, botón de reserva de mesa y pedidos directos.',
      tags: ['Menú digital sin PDF', 'Reserva de mesa', 'Fotos de platos en HD'],
      metric: '8.500 búsquedas/mes'
    }
  ];

  const handleSelectCard = (rubroId) => {
    onSelectNiche(rubroId);
    const demoEl = document.getElementById('demostracion-en-vivo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="category-cards-section" id="rubros-cards">
      <div className="container">
        {/* Header with high contrast and visual hierarchy */}
        <div className="section-header-center">
          <div className="section-kicker-tag">
            <Sparkles size={14} />
            <span>SOLUCIONES ESPECÍFICAS PARA CADA INDUSTRIA</span>
          </div>
          <h2 className="section-title">
            Tu negocio no es genérico, <br className="hidden-mobile" />
            <span className="highlight-purple">tu presencia web tampoco</span>
          </h2>
          <p className="section-subtitle">
            Diseñamos cada web resolviendo las necesidades reales del rubro. Hacé clic en tu categoría para probar el simulador en vivo con tus servicios:
          </p>
        </div>

        {/* 6-Card Category Showcase Grid */}
        <div className="category-showcase-grid">
          {categoryCards.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = currentNiche === cat.id;

            return (
              <div 
                key={cat.id} 
                className={`category-niche-card color-${cat.color} ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelectCard(cat.id)}
              >
                {/* Top Row: Icon & Status Badge */}
                <div className="category-card-topbar">
                  <div className={`category-icon-box ${cat.color}`}>
                    <IconComponent size={24} />
                  </div>
                  
                  {isSelected ? (
                    <span className="category-active-pill">
                      <Check size={13} />
                      <span>Activo en simulador</span>
                    </span>
                  ) : (
                    <span className="category-demand-badge">
                      <Flame size={12} />
                      <span>{cat.metric}</span>
                    </span>
                  )}
                </div>

                {/* Badge Category Tag */}
                <span className="category-rubro-badge">{cat.badge}</span>

                {/* Title */}
                <h3 className="category-card-title">{cat.name}</h3>

                {/* Problem vs Solution blocks */}
                <div className="category-contrast-box">
                  <div className="category-problem-line">
                    <span className="contrast-dot problem"></span>
                    <p><strong>El problema:</strong> {cat.problem}</p>
                  </div>
                  <div className="category-solution-line">
                    <span className="contrast-dot solution"></span>
                    <p><strong>Lo que te resolvemos:</strong> {cat.solution}</p>
                  </div>
                </div>

                {/* Tag Pills */}
                <div className="category-tags-list">
                  {cat.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="category-tag-chip">
                      <CheckCircle2 size={12} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Interactive CTA */}
                <div className="category-card-cta">
                  <span className="cta-link-text">
                    {isSelected ? 'Ver simulador abajo' : 'Probar este rubro en vivo'}
                  </span>
                  <ArrowRight size={16} className="cta-arrow" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
