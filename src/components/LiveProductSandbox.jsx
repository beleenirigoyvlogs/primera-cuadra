import React, { useState, useMemo, useEffect } from 'react';
import { 
  Terminal, 
  BarChart3, 
  Zap, 
  ScanLine, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Printer, 
  X, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Wifi, 
  Activity, 
  Check,
  ChevronRight,
  Sparkles,
  Server,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from './Toast';

// Web Audio API beep generator
function playScanBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, audioCtx.currentTime); // High pitch POS beep
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch {
    // Fallback if audio context is blocked
  }
}

const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Alquiler Cuna Náutica 24ft', code: '7798412001', price: 92000, category: 'Náutica' },
  { id: 'p2', name: 'Service Pata Fuera de Borda', code: '7798412002', price: 48000, category: 'Taller' },
  { id: 'p3', name: 'Aceite Quicksilver 2T 4L', code: '7798412003', price: 18500, category: 'Repuestos' },
  { id: 'p4', name: 'Corte Clásico + Perfilado', code: '7798412004', price: 11000, category: 'Estética' },
  { id: 'p5', name: 'Consulta Diagnóstica / Turno', code: '7798412005', price: 25000, category: 'Servicios' },
  { id: 'p6', name: 'Escaneo Computarizado OBD2', code: '7798412006', price: 19500, category: 'Taller' },
  { id: 'p7', name: 'Filtro de Aceite Original', code: '7798412007', price: 8200, category: 'Repuestos' },
  { id: 'p8', name: 'Amortiguador Portón Hidráulico', code: '7798412008', price: 14200, category: 'Repuestos' }
];

export default function LiveProductSandbox({ initialTab = 'pos' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const toast = useToast();

  // POS State
  const [cart, setCart] = useState([
    { ...SAMPLE_PRODUCTS[0], qty: 1 },
    { ...SAMPLE_PRODUCTS[2], qty: 2 }
  ]);
  const [applyTax, setApplyTax] = useState(true);
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [receiptModal, setReceiptModal] = useState(null);
  const [selectedPayMethod, setSelectedPayMethod] = useState('qr');

  // Analytics State
  const [timeframe, setTimeframe] = useState('7d');

  // Latency / CWV Inspector State
  const [networkProfile, setNetworkProfile] = useState('edge'); // 'edge', '4g', '3g'

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return applyDiscount ? subtotal * 0.1 : 0;
  }, [subtotal, applyDiscount]);

  const taxAmount = useMemo(() => {
    const taxable = subtotal - discountAmount;
    return applyTax ? taxable * 0.21 : 0;
  }, [subtotal, discountAmount, applyTax]);

  const total = useMemo(() => {
    return subtotal - discountAmount + taxAmount;
  }, [subtotal, discountAmount, taxAmount]);

  // POS Handlers
  const handleAddToCart = (product) => {
    playScanBeep();
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success(`+1 ${product.name}`, 'Agregado al ticket de venta');
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) => {
      return prev
        .map((p) => {
          if (p.id === id) {
            const newQty = p.qty + delta;
            return newQty > 0 ? { ...p, qty: newQty } : null;
          }
          return p;
        })
        .filter(Boolean);
    });
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    const randomProduct = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)];
    
    setTimeout(() => {
      setIsScanning(false);
      handleAddToCart(randomProduct);
    }, 700);
  };

  const handleProcessCheckout = () => {
    if (cart.length === 0) {
      toast.error('Ticket vacío', 'Agregá al menos un ítem para facturar');
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    const receipt = {
      orderId: `PC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString('es-AR'),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      paymentMethod: selectedPayMethod === 'qr' ? 'Transferencia QR Interoperable' : selectedPayMethod === 'card' ? 'Tarjeta Débito/Crédito' : 'Efectivo Contado'
    };

    setReceiptModal(receipt);
    toast.success('Cobro completado con éxito', `Comprobante ${receipt.orderId} emitido`);
  };

  // Analytics Dynamic Data
  const analyticsData = useMemo(() => {
    if (timeframe === '24h') {
      return {
        revenue: '$ 1.840.500',
        orders: 42,
        avgTicket: '$ 43.821',
        conversion: '4.8%',
        chartPoints: [18, 24, 32, 28, 45, 62, 58, 72, 85, 94, 88, 96],
        labels: ['02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h']
      };
    }
    if (timeframe === '7d') {
      return {
        revenue: '$ 14.620.000',
        orders: 318,
        avgTicket: '$ 45.974',
        conversion: '5.2%',
        chartPoints: [45, 52, 68, 62, 79, 91, 98],
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
      };
    }
    return {
      revenue: '$ 58.940.000',
      orders: 1284,
      avgTicket: '$ 45.903',
      conversion: '5.4%',
      chartPoints: [28, 36, 42, 49, 58, 65, 71, 78, 84, 91, 95, 99],
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12']
    };
  }, [timeframe]);

  // CWV Latency Profiles
  const cwvMetrics = useMemo(() => {
    if (networkProfile === 'edge') {
      return {
        ttfb: '22 ms',
        fcp: '0.34 s',
        lcp: '0.52 s',
        inp: '11 ms',
        cls: '0.000',
        cacheHit: '99.4%',
        rating: 'PASS TIER-1',
        statusColor: '#10b981',
        desc: 'Edge CDN Caching global con compresión Brotli y HTTP/3 nativo.'
      };
    }
    if (networkProfile === '4g') {
      return {
        ttfb: '68 ms',
        fcp: '0.62 s',
        lcp: '0.88 s',
        inp: '18 ms',
        cls: '0.000',
        cacheHit: '94.2%',
        rating: 'OPTIMAL',
        statusColor: '#38bdf8',
        desc: 'Conexión móvil 4G estándar en AMBA. Bundle JavaScript < 48kb.'
      };
    }
    return {
      ttfb: '380 ms',
      fcp: '1.42 s',
      lcp: '1.85 s',
      inp: '42 ms',
      cls: '0.001',
      cacheHit: '89.1%',
      rating: 'RESILIENT',
      statusColor: '#f59e0b',
      desc: 'Simulación conexión lenta en isla / navegación en río abierta.'
    };
  }, [networkProfile]);

  return (
    <section className="sandbox-section" id="pos-sandbox">
      <div className="container">
        {/* Section Header */}
        <div className="sandbox-header">
          <div className="sandbox-kicker">
            <span className="kicker-pulse"></span>
            <span className="font-mono">LIVE PRODUCT SANDBOX · MONOCHROME ENGINE</span>
          </div>
          <h2 className="sandbox-title">
            Probá el ecosistema comercial <br className="hidden-mobile" />
            <span>en tiempo de ejecución real</span>
          </h2>
          <p className="sandbox-desc">
            Sin maquetas estáticas. Interactuá directamente con nuestro punto de venta offline-first, 
            el panel de analíticas reactivas y el inspector de latencia Core Web Vitals.
          </p>

          {/* Tab Selector Buttons */}
          <div className="sandbox-tabs">
            <button
              className={`sandbox-tab-btn ${activeTab === 'pos' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('pos')}
            >
              <Terminal size={16} />
              <span>Terminal POS & Checkout</span>
              <span className="tab-pill-mono font-mono">OFFLINE-FIRST</span>
            </button>

            <button
              className={`sandbox-tab-btn ${activeTab === 'analytics' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 size={16} />
              <span>Métricas & Telemetría</span>
              <span className="tab-pill-mono font-mono">LIVE SVG</span>
            </button>

            <button
              className={`sandbox-tab-btn ${activeTab === 'cwv' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('cwv')}
            >
              <Zap size={16} />
              <span>Core Web Vitals & Latencia</span>
              <span className="tab-pill-mono font-mono">0.5s LCP</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE POS TERMINAL */}
        {activeTab === 'pos' && (
          <div className="pos-sandbox-grid">
            {/* Catalog Column */}
            <div className="pos-catalog-panel">
              <div className="panel-topbar">
                <div>
                  <h3 className="panel-title">Catálogo Rápido de Salón</h3>
                  <p className="panel-sub font-mono">Seleccioná ítems o simulá escaneo por código de barras</p>
                </div>
                <button 
                  className={`btn-scan-barcode ${isScanning ? 'scanning' : ''}`}
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                >
                  <ScanLine size={16} />
                  <span>{isScanning ? 'Escaneando...' : 'Escanear Código'}</span>
                </button>
              </div>

              {isScanning && (
                <div className="barcode-laser-overlay">
                  <div className="laser-beam"></div>
                  <div className="laser-text font-mono">SCANNING EAN-13 BARCODE...</div>
                </div>
              )}

              <div className="pos-products-grid">
                {SAMPLE_PRODUCTS.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="pos-product-card"
                    onClick={() => handleAddToCart(prod)}
                  >
                    <div className="pos-prod-category font-mono">{prod.category}</div>
                    <div className="pos-prod-name">{prod.name}</div>
                    <div className="pos-prod-footer">
                      <span className="pos-prod-price font-mono">
                        ${prod.price.toLocaleString('es-AR')}
                      </span>
                      <span className="pos-add-chip">
                        <Plus size={14} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart & Checkout Panel */}
            <div className="pos-ticket-panel">
              <div className="ticket-topbar">
                <div className="ticket-header-title">
                  <span className="status-live-dot"></span>
                  <span className="font-mono">TICKET DE VENTA #001</span>
                </div>
                <button 
                  className="btn-clear-cart"
                  onClick={() => setCart([])}
                  disabled={cart.length === 0}
                  title="Vaciar ticket"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Cart List */}
              <div className="ticket-items-list">
                {cart.length === 0 ? (
                  <div className="ticket-empty">
                    <ScanLine size={32} />
                    <p>El ticket está vacío</p>
                    <span className="font-mono">Toca un producto o escaneá para cargar</span>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="ticket-item-row">
                      <div className="ticket-item-info">
                        <div className="ticket-item-name">{item.name}</div>
                        <div className="ticket-item-unit font-mono">
                          ${item.price.toLocaleString('es-AR')} c/u
                        </div>
                      </div>
                      <div className="ticket-item-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => handleUpdateQty(item.id, -1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-val font-mono">{item.qty}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => handleUpdateQty(item.id, 1)}
                        >
                          <Plus size={12} />
                        </button>
                        <div className="ticket-item-subtotal font-mono">
                          ${(item.price * item.qty).toLocaleString('es-AR')}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Toggles: Tax & Discount */}
              <div className="ticket-toggles">
                <label className="toggle-label">
                  <input 
                    type="checkbox" 
                    checked={applyTax} 
                    onChange={(e) => setApplyTax(e.target.checked)} 
                  />
                  <span>IVA 21% (Discriminar)</span>
                </label>

                <label className="toggle-label">
                  <input 
                    type="checkbox" 
                    checked={applyDiscount} 
                    onChange={(e) => setApplyDiscount(e.target.checked)} 
                  />
                  <span>10% Desc. Contado / QR</span>
                </label>
              </div>

              {/* Calculations Box */}
              <div className="ticket-summary-box font-mono">
                <div className="summary-line">
                  <span>Subtotal Neto:</span>
                  <span>${subtotal.toLocaleString('es-AR')}</span>
                </div>
                {applyDiscount && (
                  <div className="summary-line discount">
                    <span>Descuento 10%:</span>
                    <span>-${discountAmount.toLocaleString('es-AR')}</span>
                  </div>
                )}
                {applyTax && (
                  <div className="summary-line">
                    <span>IVA (21%):</span>
                    <span>+${taxAmount.toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="summary-line total-line">
                  <span>TOTAL A COBRAR:</span>
                  <span className="total-highlight">${total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pay-methods-grid">
                <button 
                  className={`pay-btn ${selectedPayMethod === 'qr' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayMethod('qr')}
                >
                  <QrCode size={16} />
                  <span>Transferencia QR</span>
                </button>
                <button 
                  className={`pay-btn ${selectedPayMethod === 'cash' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayMethod('cash')}
                >
                  <Banknote size={16} />
                  <span>Efectivo</span>
                </button>
                <button 
                  className={`pay-btn ${selectedPayMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayMethod('card')}
                >
                  <CreditCard size={16} />
                  <span>Tarjeta</span>
                </button>
              </div>

              {/* Action Button */}
              <button 
                className="btn-checkout-terminal"
                onClick={handleProcessCheckout}
                disabled={cart.length === 0}
              >
                <span>Cobrar ${total.toLocaleString('es-AR')}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DYNAMIC ANALYTICS DASHBOARD */}
        {activeTab === 'analytics' && (
          <div className="analytics-panel" id="analytics-dashboard">
            <div className="analytics-topbar">
              <div>
                <h3 className="panel-title">Telemetría de Ventas & Conversión</h3>
                <p className="panel-sub font-mono">Métricas computadas en Edge sin demoras de base de datos</p>
              </div>
              <div className="timeframe-pills font-mono">
                <button 
                  className={timeframe === '24h' ? 'active' : ''}
                  onClick={() => setTimeframe('24h')}
                >
                  24 HORAS
                </button>
                <button 
                  className={timeframe === '7d' ? 'active' : ''}
                  onClick={() => setTimeframe('7d')}
                >
                  7 DÍAS
                </button>
                <button 
                  className={timeframe === '30d' ? 'active' : ''}
                  onClick={() => setTimeframe('30d')}
                >
                  30 DÍAS
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <span className="kpi-label font-mono">FACTURACIÓN BRUTA</span>
                <div className="kpi-value font-mono">{analyticsData.revenue}</div>
                <div className="kpi-meta positive font-mono">
                  <TrendingUp size={14} />
                  <span>+18.4% vs período anterior</span>
                </div>
              </div>

              <div className="kpi-card">
                <span className="kpi-label font-mono">TRANSACCIONES COMPLETADAS</span>
                <div className="kpi-value font-mono">{analyticsData.orders}</div>
                <div className="kpi-meta positive font-mono">
                  <CheckCircle2 size={14} />
                  <span>100% liquidadas sin disputas</span>
                </div>
              </div>

              <div className="kpi-card">
                <span className="kpi-label font-mono">TICKET PROMEDIO</span>
                <div className="kpi-value font-mono">{analyticsData.avgTicket}</div>
                <div className="kpi-meta font-mono">
                  <Activity size={14} />
                  <span>Consistente en la zona</span>
                </div>
              </div>

              <div className="kpi-card">
                <span className="kpi-label font-mono">TASA DE CONVERSIÓN WEB</span>
                <div className="kpi-value font-mono">{analyticsData.conversion}</div>
                <div className="kpi-meta positive font-mono">
                  <Zap size={14} />
                  <span>x3 superior a webs lentas</span>
                </div>
              </div>
            </div>

            {/* SVG Reactive Chart */}
            <div className="chart-container-box">
              <div className="chart-header">
                <div className="chart-title font-mono">
                  <span>CURVA DE FACTURACIÓN EN TIEMPO REAL ({timeframe.toUpperCase()})</span>
                </div>
                <div className="chart-badge font-mono">TELEMETRÍA EN VIVO</div>
              </div>

              <div className="svg-chart-wrapper">
                <svg viewBox="0 0 700 220" className="reactive-svg-chart" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="700" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="110" x2="700" y2="110" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="170" x2="700" y2="170" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                  {/* Area Polygon */}
                  <polygon 
                    points={`
                      0,200 
                      ${analyticsData.chartPoints.map((pt, idx) => {
                        const x = (idx / (analyticsData.chartPoints.length - 1)) * 700;
                        const y = 200 - (pt / 100) * 160;
                        return `${x},${y}`;
                      }).join(' ')} 
                      700,200
                    `}
                    fill="url(#chartGradient)"
                  />

                  {/* Stroke Polyline */}
                  <polyline
                    points={analyticsData.chartPoints.map((pt, idx) => {
                      const x = (idx / (analyticsData.chartPoints.length - 1)) * 700;
                      const y = 200 - (pt / 100) * 160;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Point circles */}
                  {analyticsData.chartPoints.map((pt, idx) => {
                    const x = (idx / (analyticsData.chartPoints.length - 1)) * 700;
                    const y = 200 - (pt / 100) * 160;
                    return (
                      <circle 
                        key={idx} 
                        cx={x} 
                        cy={y} 
                        r="4" 
                        fill="#09090b" 
                        stroke="#ffffff" 
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Chart Labels */}
              <div className="chart-x-labels font-mono">
                {analyticsData.labels.map((lbl, idx) => (
                  <span key={idx}>{lbl}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CORE WEB VITALS & LATENCY INSPECTOR */}
        {activeTab === 'cwv' && (
          <div className="cwv-panel" id="cwv-inspector">
            <div className="cwv-topbar">
              <div>
                <h3 className="panel-title">Inspector de Latencia & Core Web Vitals</h3>
                <p className="panel-sub font-mono">Telemetría real de entrega en el navegador del usuario</p>
              </div>

              {/* Network profile selector */}
              <div className="network-selector-pills font-mono">
                <button
                  className={networkProfile === 'edge' ? 'active' : ''}
                  onClick={() => setNetworkProfile('edge')}
                >
                  <Wifi size={14} />
                  <span>EDGE CACHE (8ms)</span>
                </button>
                <button
                  className={networkProfile === '4g' ? 'active' : ''}
                  onClick={() => setNetworkProfile('4g')}
                >
                  <Cpu size={14} />
                  <span>RED 4G (85ms)</span>
                </button>
                <button
                  className={networkProfile === '3g' ? 'active' : ''}
                  onClick={() => setNetworkProfile('3g')}
                >
                  <Server size={14} />
                  <span>SLOW 3G (1250ms)</span>
                </button>
              </div>
            </div>

            {/* CWV Metrics Scorecards */}
            <div className="cwv-grid">
              <div className="cwv-card">
                <div className="cwv-card-top">
                  <span className="cwv-metric-tag font-mono">LCP</span>
                  <span className="cwv-badge font-mono" style={{ color: cwvMetrics.statusColor }}>{cwvMetrics.rating}</span>
                </div>
                <div className="cwv-metric-val font-mono">{cwvMetrics.lcp}</div>
                <div className="cwv-metric-title">Largest Contentful Paint</div>
                <p className="cwv-metric-desc">Tiempo hasta renderizar el contenido principal. Objetivo Google: &lt; 2.5s.</p>
              </div>

              <div className="cwv-card">
                <div className="cwv-card-top">
                  <span className="cwv-metric-tag font-mono">INP</span>
                  <span className="cwv-badge font-mono" style={{ color: cwvMetrics.statusColor }}>EXCELENTE</span>
                </div>
                <div className="cwv-metric-val font-mono">{cwvMetrics.inp}</div>
                <div className="cwv-metric-title">Interaction to Next Paint</div>
                <p className="cwv-metric-desc">Respuesta táctil instantánea al tocar o hacer clic. Objetivo Google: &lt; 200ms.</p>
              </div>

              <div className="cwv-card">
                <div className="cwv-card-top">
                  <span className="cwv-metric-tag font-mono">CLS</span>
                  <span className="cwv-badge font-mono" style={{ color: cwvMetrics.statusColor }}>ZERO SHIFT</span>
                </div>
                <div className="cwv-metric-val font-mono">{cwvMetrics.cls}</div>
                <div className="cwv-metric-title">Cumulative Layout Shift</div>
                <p className="cwv-metric-desc">Estabilidad visual absoluta; los elementos nunca saltan al cargar fuentes o imágenes.</p>
              </div>

              <div className="cwv-card">
                <div className="cwv-card-top">
                  <span className="cwv-metric-tag font-mono">TTFB</span>
                  <span className="cwv-badge font-mono" style={{ color: cwvMetrics.statusColor }}>FAST CACHE</span>
                </div>
                <div className="cwv-metric-val font-mono">{cwvMetrics.ttfb}</div>
                <div className="cwv-metric-title">Time to First Byte</div>
                <p className="cwv-metric-desc">Primer byte entregado desde servidores perimetrales cercanos a Buenos Aires.</p>
              </div>
            </div>

            {/* Benchmarking Comparison */}
            <div className="benchmark-box">
              <h4 className="benchmark-title font-mono">COMPARATIVA DE VELOCIDAD REAL EN CELULARES</h4>
              
              <div className="benchmark-bar-row">
                <div className="bar-meta font-mono">
                  <span>PRIMERA CUADRA (Edge Compiled)</span>
                  <span className="bar-time highlight">0.52s (Carga Instantánea)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill primary" style={{ width: '14%' }}></div>
                </div>
              </div>

              <div className="benchmark-bar-row">
                <div className="bar-meta font-mono">
                  <span>Sitio Web Tradicional (WordPress + Elementor)</span>
                  <span className="bar-time">3.94s (Pérdida de rebote)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill legacy" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div className="benchmark-bar-row">
                <div className="bar-meta font-mono">
                  <span>Constructores No-Code (Wix / Tiendanube básica)</span>
                  <span className="bar-time">2.85s (Scripts pesados)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill legacy" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>

            {/* Terminal Headers breakdown */}
            <div className="telemetry-terminal font-mono">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">HTTP/3 TELEMETRY INSPECTOR · 200 OK</span>
              </div>
              <div className="terminal-body">
                <div>&gt; GET /api/v1/storefront HTTP/3</div>
                <div>&gt; Host: primeracuadra.com.ar</div>
                <div>&lt; HTTP/3 200 OK</div>
                <div>&lt; cf-cache-status: {cwvMetrics.cacheHit === '99.4%' ? 'HIT' : 'DYNAMIC_REVALIDATE'}</div>
                <div>&lt; content-encoding: br</div>
                <div>&lt; x-response-time: {cwvMetrics.ttfb}</div>
                <div>&lt; server: cloudflare-edge-workers</div>
                <div className="terminal-highlight">&lt; alt-svc: h3=":443"; ma=86400</div>
              </div>
            </div>
          </div>
        )}

        {/* THERMAL RECEIPT MODAL */}
        {receiptModal && (
          <div className="receipt-modal-backdrop" onClick={() => setReceiptModal(null)}>
            <div className="receipt-modal-card font-mono" onClick={(e) => e.stopPropagation()}>
              <button className="receipt-close-btn" onClick={() => setReceiptModal(null)}>
                <X size={16} />
              </button>

              <div className="receipt-header">
                <div className="receipt-brand">PRIMERA CUADRA</div>
                <div className="receipt-sub">PUNTO DE VENTA FISCAL OFFLINE-FIRST</div>
                <div className="receipt-divider">================================</div>
                <div className="receipt-line">COMPROBANTE: {receiptModal.orderId}</div>
                <div className="receipt-line">FECHA: {receiptModal.date}</div>
                <div className="receipt-line">MEDIO DE PAGO: {receiptModal.paymentMethod}</div>
                <div className="receipt-divider">--------------------------------</div>
              </div>

              <div className="receipt-items">
                {receiptModal.items.map((it) => (
                  <div key={it.id} className="receipt-item-row">
                    <div className="r-item-main">
                      <span>{it.qty}x {it.name}</span>
                    </div>
                    <div className="r-item-price">
                      ${(it.price * it.qty).toLocaleString('es-AR')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="receipt-divider">--------------------------------</div>
              
              <div className="receipt-totals">
                <div className="r-total-line">
                  <span>SUBTOTAL:</span>
                  <span>${receiptModal.subtotal.toLocaleString('es-AR')}</span>
                </div>
                {receiptModal.discount > 0 && (
                  <div className="r-total-line">
                    <span>DESCUENTO:</span>
                    <span>-${receiptModal.discount.toLocaleString('es-AR')}</span>
                  </div>
                )}
                {receiptModal.tax > 0 && (
                  <div className="r-total-line">
                    <span>IVA (21%):</span>
                    <span>+${receiptModal.tax.toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="receipt-divider">================================</div>
                <div className="r-total-line grand-total">
                  <span>TOTAL PAGADO:</span>
                  <span>${receiptModal.total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Barcode simulation */}
              <div className="receipt-barcode-box">
                <div className="barcode-bars"></div>
                <div className="barcode-digits font-mono">0112877964100192026</div>
              </div>

              <div className="receipt-footer-text">
                ¡GRACIAS POR SU COMPRA!
                <br />
                SISTEMA OPERANDO BAJO MOTOR PRIMERA CUADRA
              </div>

              <div className="receipt-actions">
                <button 
                  className="btn-print-receipt"
                  onClick={() => {
                    window.print();
                  }}
                >
                  <Printer size={15} />
                  <span>Imprimir Ticket Térmico</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
