import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function OpportunityCalculator({ niche }) {
  // Initialize slider states based on the selected niche
  const [searches, setSearches] = useState(niche.typicalMonthlySearches || 4000);
  const [ticket, setTicket] = useState(niche.averageTicket || 100000);

  // Update defaults if niche changes
  useEffect(() => {
    setSearches(niche.typicalMonthlySearches || 4000);
    setTicket(niche.averageTicket || 100000);
  }, [niche]);

  // Calculations
  // ~70% of people only click the top 3 on Google Maps
  const lostClicks = Math.round(searches * 0.65);
  // Conservative conversion rate: ~2% of searchers become paying clients
  const potentialClients = Math.max(1, Math.round(lostClicks * 0.02));
  // Total potential revenue
  const monthlyRevenue = potentialClients * ticket;
  // Pack Completo cost is $250,000
  const clientsToPayFullPack = Math.max(1, Math.ceil(250000 / ticket));
  // Pack Express cost is $120,000
  const clientsToPayExpressPack = Math.max(1, Math.ceil(120000 / ticket));

  const formatMoney = (val) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="calculator-section-wrapper" id="calculadora-oportunidad">
      <div className="container">
        <div className="section-header-center">
          <div className="section-kicker-pill">
            <Calculator size={14} />
            <span>CALCULADORA DE RETORNO Y OPORTUNIDAD</span>
          </div>
          <h2 className="section-main-title">
            ¿Cuánta plata estás regalando por <span className="text-gradient-ocean">no estar en la primera cuadra</span>?
          </h2>
          <p className="section-main-desc">
            Cuando alguien busca en Google Maps "{niche.categoryTag || niche.rubroName}" cerca de su ubicación, tiene la intención de contratar ya. Mirá los números en tu zona:
          </p>
        </div>

        <div className="calculator-card-container">
          {/* Left Column: Sliders */}
          <div className="calc-sliders-col">
            <h3 className="calc-col-title">Ajustá los números de tu negocio</h3>

            {/* Slider 1: Searches */}
            <div className="calc-input-group">
              <div className="calc-label-row">
                <label htmlFor="searches-range">
                  Búsquedas mensuales estimadas en tu zona
                </label>
                <span className="calc-value-display">
                  {searches.toLocaleString('es-AR')} búsquedas
                </span>
              </div>
              <input
                id="searches-range"
                type="range"
                min="500"
                max="15000"
                step="250"
                value={searches}
                onChange={(e) => setSearches(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>500 búsquedas</span>
                <span>15.000 búsquedas</span>
              </div>
            </div>

            {/* Slider 2: Ticket */}
            <div className="calc-input-group">
              <div className="calc-label-row">
                <label htmlFor="ticket-range">
                  Ticket o ganancia promedio por cliente
                </label>
                <span className="calc-value-display">
                  {formatMoney(ticket)}
                </span>
              </div>
              <input
                id="ticket-range"
                type="range"
                min="5000"
                max="400000"
                step="5000"
                value={ticket}
                onChange={(e) => setTicket(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>$5.000</span>
                <span>$400.000</span>
              </div>
            </div>

            {/* Explanatory note */}
            <div className="calc-insight-note">
              <AlertCircle size={18} className="note-icon" />
              <p>
                <strong>Dato verificado de Google:</strong> El 76% de las personas que hacen una búsqueda local en su celular visitan el negocio en las siguientes 24 horas.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Results Card */}
          <div className="calc-results-col">
            <div className="results-badge">
              <Sparkles size={14} />
              <span>PROYECCIÓN ESTIMADA DE CAPTACIÓN</span>
            </div>

            <div className="results-highlight-box">
              <div className="res-subtitle">Clientes nuevos captables por mes</div>
              <div className="res-big-number">
                +{potentialClients} <span className="res-unit">clientes / mes</span>
              </div>
              <p className="res-caption">
                personas listas para contratar en tu zona
              </p>
            </div>

            <div className="results-metrics-grid">
              <div className="metric-box">
                <div className="metric-label">Facturación mensual recuperable</div>
                <div className="metric-value text-gradient-gold">
                  {formatMoney(monthlyRevenue)}
                </div>
                <div className="metric-sub">por mes que hoy va a otros</div>
              </div>

              <div className="metric-box">
                <div className="metric-label">Recupero del Pack Completo</div>
                <div className="metric-value text-gradient-ocean">
                  Solo {clientsToPayFullPack} {clientsToPayFullPack === 1 ? 'cliente' : 'clientes'}
                </div>
                <div className="metric-sub">amortizás los $250.000</div>
              </div>
            </div>

            {/* Quick Math verdict */}
            <div className="results-verdict-box">
              <CheckCircle2 size={18} className="text-emerald" />
              <p>
                Con el <strong>Pack Express ($120.000)</strong> necesitás solo <strong>{clientsToPayExpressPack} {clientsToPayExpressPack === 1 ? 'cliente' : 'clientes'}</strong> para pagar el servicio completo de por vida.
              </p>
            </div>

            <a href="#packs-precios" className="btn-calc-cta">
              <span>Empezar a Capturar Clientes Ahora</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
