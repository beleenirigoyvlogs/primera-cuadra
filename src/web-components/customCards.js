/**
 * ============================================================================
 * WEB COMPONENTS - PRIMERA CUADRA
 * Componentes Web reutilizables con Shadow DOM, Slots y Eventos Personalizados
 * ============================================================================
 * 
 * Cumple con los estándares W3C de Custom Elements v1:
 * 1. Encapsulación de estilos con Shadow DOM (attachShadow({ mode: 'open' }))
 * 2. Distribución de contenido dinámico mediante Slots y Named Slots (<slot name="...">)
 * 3. Estilizado de contenido inyectado mediante pseudo-elemento ::slotted()
 * 4. Comunicación hacia el exterior mediante CustomEvent con bubbles: true y composed: true
 */

// ============================================================================
// 1. COMPONENTE: <demo-card>
// ============================================================================
export class DemoCard extends HTMLElement {
  static get observedAttributes() {
    return ['imagen', 'titulo', 'rubro', 'badge'];
  }

  constructor() {
    super();
    // 1. Encapsulación con Shadow DOM en modo abierto
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML !== '') {
      this.render();
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    // Escuchar clics en el slot de botón o dentro del componente
    const botonSlot = this.shadowRoot.querySelector('slot[name="boton"]');
    
    // Escuchar clic delegado en el shadow root
    this.shadowRoot.addEventListener('click', (e) => {
      this.handleCardAction(e);
    });

    if (botonSlot) {
      botonSlot.addEventListener('click', (e) => {
        this.handleCardAction(e);
      });
    }
  }

  handleCardAction(e) {
    const titulo = this.getAttribute('titulo') || 'Demostración';
    const rubro = this.getAttribute('rubro') || 'General';
    const imagen = this.getAttribute('imagen') || '';
    const badge = this.getAttribute('badge') || '';

    // Disparar Evento Personalizado hacia el exterior del Shadow DOM
    const event = new CustomEvent('demo-seleccionada', {
      detail: {
        titulo,
        rubro,
        imagen,
        badge,
        timestamp: new Date().toISOString()
      },
      bubbles: true,   // Permite que el evento suba por el árbol DOM
      composed: true   // Permite que el evento cruce la frontera del Shadow DOM hacia el Light DOM / React
    });

    this.dispatchEvent(event);
  }

  render() {
    const imagen = this.getAttribute('imagen') || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';
    const titulo = this.getAttribute('titulo') || 'Demostración de Rubro';
    const rubro = this.getAttribute('rubro') || 'Comercio';
    const badge = this.getAttribute('badge') || 'DEMO ILUSTRATIVA';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-body, system-ui, -apple-system, sans-serif);
          box-sizing: border-box;
          color: var(--text-dark, #18181b);
        }

        *, *::before, *::after {
          box-sizing: inherit;
        }

        .card-container {
          background: var(--bg-card, #ffffff);
          border: 1px solid var(--border-light, rgba(255, 255, 255, 0.12));
          border-radius: var(--radius-xl, 20px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-card, 0 10px 30px -10px rgba(0,0,0,0.1));
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
          height: 100%;
        }

        .card-container:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover, 0 20px 40px -12px rgba(103, 61, 230, 0.2));
          border-color: var(--brand-purple, #673de6);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #1e1b2e;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          display: block;
        }

        .card-container:hover .card-img {
          transform: scale(1.05);
        }

        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
        }

        .badge-pill {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(15, 14, 23, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #a78bfa;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid rgba(167, 139, 250, 0.3);
        }

        .rubro-tag {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: rgba(255, 255, 255, 0.95);
          color: #1e133d;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .content-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .title {
          font-family: var(--font-heading, inherit);
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 10px 0;
          color: var(--text-title, inherit);
          line-height: 1.3;
        }

        /* ====================================================================
           ESTILOS PARA CONTENIDO INYECTADO DESDE EL EXTERIOR (::slotted)
           ==================================================================== */
        
        /* Slot de Descripción */
        ::slotted([slot="descripcion"]) {
          font-size: 0.92rem;
          color: var(--text-muted, #64748b);
          line-height: 1.55;
          margin: 0 0 18px 0;
        }

        /* Slot de Beneficios */
        .benefits-slot-wrapper {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          margin-bottom: 20px;
        }

        ::slotted([slot="beneficios"]) {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        ::slotted(li) {
          font-size: 0.86rem;
          line-height: 1.4;
          color: var(--text-body, inherit);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Slot de Botón */
        .action-slot-wrapper {
          margin-top: 10px;
        }

        ::slotted([slot="boton"]),
        ::slotted(button) {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          background: var(--brand-purple, #673de6);
          color: #ffffff;
          border: none;
          border-radius: var(--radius-md, 10px);
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        ::slotted([slot="boton"]:hover),
        ::slotted(button:hover) {
          background: var(--brand-purple-hover, #5025d1);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px var(--brand-purple-glow, rgba(103, 61, 230, 0.4));
        }
      </style>

      <div class="card-container">
        <div class="image-wrapper">
          <img src="${imagen}" alt="${titulo}" class="card-img" />
          <div class="overlay-gradient"></div>
          <span class="badge-pill">${badge}</span>
          <span class="rubro-tag">${rubro}</span>
        </div>

        <div class="content-body">
          <h3 class="title">${titulo}</h3>

          <!-- Slot con nombre: descripcion -->
          <slot name="descripcion">
            <p>Descripción predeterminada del rubro y alcance del servicio digital.</p>
          </slot>

          <!-- Slot con nombre: beneficios -->
          <div class="benefits-slot-wrapper">
            <slot name="beneficios">
              <ul>
                <li>✓ Página Web optimizada para celulares</li>
                <li>✓ Presencia verificada en Google Maps</li>
                <li>✓ Canal de WhatsApp directo</li>
              </ul>
            </slot>
          </div>

          <!-- Slot con nombre: boton -->
          <div class="action-slot-wrapper">
            <slot name="boton">
              <button type="button">Probar en el simulador →</button>
            </slot>
          </div>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// 2. COMPONENTE: <precio-plan>
// ============================================================================
export class PrecioPlan extends HTMLElement {
  static get observedAttributes() {
    return ['nombre', 'precio', 'periodo', 'badge', 'destacado'];
  }

  constructor() {
    super();
    // Encapsulación con Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML !== '') {
      this.render();
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const botonSlot = this.shadowRoot.querySelector('slot[name="boton"]');
    
    this.shadowRoot.addEventListener('click', (e) => {
      this.handlePlanAction(e);
    });

    if (botonSlot) {
      botonSlot.addEventListener('click', (e) => {
        this.handlePlanAction(e);
      });
    }
  }

  handlePlanAction(e) {
    const nombre = this.getAttribute('nombre') || 'Plan';
    const precio = this.getAttribute('precio') || '$0';
    const periodo = this.getAttribute('periodo') || 'único';
    const badge = this.getAttribute('badge') || '';

    // Disparar Evento Personalizado hacia el exterior
    const event = new CustomEvent('plan-elegido', {
      detail: {
        plan: nombre,
        precio,
        periodo,
        badge,
        timestamp: new Date().toISOString()
      },
      bubbles: true,   // Sube por el árbol DOM
      composed: true   // Cruza la frontera del Shadow DOM
    });

    this.dispatchEvent(event);
  }

  render() {
    const nombre = this.getAttribute('nombre') || 'Pack Digital';
    const precio = this.getAttribute('precio') || '$150.000';
    const periodo = this.getAttribute('periodo') || 'Pago único';
    const badge = this.getAttribute('badge') || '';
    const esDestacado = this.hasAttribute('destacado') && this.getAttribute('destacado') !== 'false';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-body, system-ui, -apple-system, sans-serif);
          box-sizing: border-box;
          color: var(--text-dark, #18181b);
        }

        *, *::before, *::after {
          box-sizing: inherit;
        }

        .plan-card {
          background: var(--bg-card, #ffffff);
          border: 1.5px solid ${esDestacado ? 'var(--brand-purple, #673de6)' : 'var(--border-light, rgba(255, 255, 255, 0.12))'};
          border-radius: var(--radius-xl, 22px);
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: ${esDestacado ? '0 12px 36px var(--brand-purple-glow, rgba(103, 61, 230, 0.25))' : 'var(--shadow-card, 0 10px 25px -10px rgba(0,0,0,0.08))'};
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          height: 100%;
        }

        .plan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -12px rgba(103, 61, 230, 0.3);
          border-color: var(--brand-purple, #673de6);
        }

        .featured-ribbon {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #673de6 0%, #8b5cf6 100%);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 16px;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(103, 61, 230, 0.4);
          white-space: nowrap;
        }

        .plan-header {
          margin-bottom: 24px;
          text-align: left;
        }

        .plan-badge {
          display: inline-block;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--brand-purple, #673de6);
          background: var(--brand-purple-soft, rgba(103, 61, 230, 0.1));
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .plan-title {
          font-family: var(--font-heading, inherit);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-title, inherit);
          margin: 0 0 12px 0;
        }

        .price-container {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-top: 8px;
        }

        .price-amount {
          font-family: var(--font-heading, inherit);
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--text-title, inherit);
          line-height: 1;
        }

        .price-period {
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
          font-weight: 600;
        }

        /* ====================================================================
           ESTILOS ::slotted() PARA CARACTERÍSTICAS Y BOTÓN
           ==================================================================== */
        .features-wrapper {
          margin-top: 16px;
          margin-bottom: 28px;
          flex: 1;
          border-top: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          padding-top: 20px;
        }

        ::slotted([slot="caracteristicas"]) {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        ::slotted(li) {
          font-size: 0.88rem;
          line-height: 1.45;
          color: var(--text-body, inherit);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .action-wrapper {
          margin-top: auto;
        }

        ::slotted([slot="boton"]),
        ::slotted(button),
        ::slotted(a) {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          background: ${esDestacado ? 'linear-gradient(135deg, #673de6 0%, #5025d1 100%)' : 'var(--brand-purple, #673de6)'};
          color: #ffffff;
          border: none;
          border-radius: var(--radius-md, 12px);
          font-size: 0.96rem;
          font-weight: 800;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: ${esDestacado ? '0 6px 20px rgba(103, 61, 230, 0.35)' : 'none'};
          font-family: inherit;
        }

        ::slotted([slot="boton"]:hover),
        ::slotted(button:hover),
        ::slotted(a:hover) {
          background: var(--brand-purple-hover, #5025d1);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--brand-purple-glow, rgba(103, 61, 230, 0.5));
        }
      </style>

      <div class="plan-card">
        ${esDestacado ? '<span class="featured-ribbon">⭐ MÁS ELEGIDO</span>' : ''}

        <div class="plan-header">
          ${badge ? `<span class="plan-badge">${badge}</span>` : ''}
          <h3 class="plan-title">${nombre}</h3>

          <div class="price-container">
            <span class="price-amount">${precio}</span>
            <span class="price-period">/ ${periodo}</span>
          </div>
        </div>

        <!-- Slot con nombre: caracteristicas -->
        <div class="features-wrapper">
          <slot name="caracteristicas">
            <ul>
              <li>✓ Configuración inicial completa</li>
              <li>✓ Entrega en tiempo récord</li>
              <li>✓ Soporte personalizado post-lanzamiento</li>
            </ul>
          </slot>
        </div>

        <!-- Slot con nombre: boton -->
        <div class="action-wrapper">
          <slot name="boton">
            <button type="button">Elegir este Plan →</button>
          </slot>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// REGISTRO DE CUSTOM ELEMENTS
// ============================================================================
if (typeof window !== 'undefined' && window.customElements) {
  if (!customElements.get('demo-card')) {
    customElements.define('demo-card', DemoCard);
  }
  if (!customElements.get('precio-plan')) {
    customElements.define('precio-plan', PrecioPlan);
  }
}
