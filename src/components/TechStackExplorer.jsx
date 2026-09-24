import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Server, 
  Database, 
  ShieldCheck, 
  Code2, 
  Zap, 
  Globe2, 
  Lock, 
  Wifi, 
  Smartphone,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const STACK_DATA = {
  frontend: {
    category: 'Frontend & UI Performance',
    badge: 'ZERO-RUNTIME HYDRATION',
    icon: Cpu,
    headline: 'Arquitectura SPA ultraligera compilada al extremo',
    businessAdvantage: 'Tu cliente abre la página en 0.5 segundos desde cualquier celular. El 80% de los rebotes ocurren cuando una web tarda más de 3 segundos; nosotros eliminamos esa pérdida por completo.',
    techDetails: [
      {
        tech: 'React 19 Core',
        role: 'Component Engine',
        benefit: 'Nuevos hooks de compilación y streaming asíncrono para interactividad sin fricción.'
      },
      {
        tech: 'Vite 8 Edge Compiler',
        role: 'Bundling & Tree-shaking',
        benefit: 'Módulos ES6 nativos con bundles minificados de menos de 50KB en producción.'
      },
      {
        tech: 'Zero-Runtime CSS Tokens',
        role: 'Styling & Design System',
        benefit: 'Variables CSS nativas sin librerías pesadas que demoren el renderizado inicial.'
      },
      {
        tech: 'Lucide Icon System',
        role: 'Iconography',
        benefit: 'Vectores SVG ultra-optimizados inyectados directamente en el DOM.'
      }
    ],
    codeSnippet: `// Compilación Edge optimizada para First Paint sub-second
export default function StorefrontRuntime() {
  const { data, isPending } = useOptimisticCatalog();
  return <VirtualGrid items={data} prefetch="on-viewport-intersect" />;
}`
  },
  backend: {
    category: 'Edge Compute & Webhooks',
    badge: '0ms COLD STARTS',
    icon: Server,
    headline: 'Microservicios en Edge con escalabilidad sin límites',
    businessAdvantage: 'No pagás servidores dedicados caros que quedan ociosos a la noche. El sistema responde desde servidores distribuidos a milisegundos de tu cliente y escala gratis si hay una campaña masiva.',
    techDetails: [
      {
        tech: 'Cloudflare Workers / Edge',
        role: 'Edge Serverless Runtimes',
        benefit: 'Código ejecutado en más de 300 puntos de presencia globales, incluyendo Buenos Aires.'
      },
      {
        tech: 'Node.js Microservices',
        role: 'Transactional Logic',
        benefit: 'Control estricto de carritos, reservas, turnos y validaciones antifraude.'
      },
      {
        tech: 'Asynchronous Webhook Engine',
        role: 'Integration Hub',
        benefit: 'Despacho instantáneo de notificaciones a WhatsApp Business, pasarelas de pago y CRM.'
      }
    ],
    codeSnippet: `// Handler perimetral con respuesta HTTP/3 en <30ms
export default {
  async fetch(req, env) {
    const cache = await caches.open('edge:catalog');
    return cache.match(req) ?? handleEdgeCompute(req, env);
  }
};`
  },
  data: {
    category: 'Persistencia & Resiliencia',
    badge: 'OFFLINE-FIRST CAPABLE',
    icon: Database,
    headline: 'Bases de datos con sincronización offline local-first',
    businessAdvantage: 'Si se corta la conexión a internet en el local o en el río, tu personal sigue cobrando y registrando turnos en el sistema. Al regresar la red, se sincroniza todo solo sin duplicar datos.',
    techDetails: [
      {
        tech: 'IndexedDB Local Cache',
        role: 'Client-side Persistence',
        benefit: 'Catálogo completo, precios y cola de pedidos almacenados en el navegador del dispositivo.'
      },
      {
        tech: 'PostgreSQL & Row-Level Security',
        role: 'Central Relational Store',
        benefit: 'Políticas de seguridad a nivel de fila (RLS) para aislamiento total entre comercios.'
      },
      {
        tech: 'Transactional Queue Sync',
        role: 'Conflict Resolution',
        benefit: 'Mecanismo de resolución cronológica para conciliar transacciones fuera de línea.'
      }
    ],
    codeSnippet: `// Transacción garantizada con persistencia dual
async function recordSale(ticket) {
  await localStore.orders.put(ticket);
  navigator.serviceWorker.ready.then(sw => sw.sync.register('sync-sales'));
}`
  },
  infra: {
    category: 'Infraestructura & Hardware',
    badge: '99.99% BUSINESS UPTIME',
    icon: ShieldCheck,
    headline: 'Conectividad hardware POS y seguridad perimetral',
    businessAdvantage: 'Conectá impresoras térmicas de tickets y pistolas lectoras de código de barras directamente por USB o Bluetooth sin instalar drivers pesados ni configuraciones complejas.',
    techDetails: [
      {
        tech: 'WebUSB & WebBluetooth',
        role: 'Hardware Bridge',
        benefit: 'Impresión térmica ESC/POS de 58mm y 80mm directo desde Google Chrome / Edge.'
      },
      {
        tech: 'Tier-1 DDoS Shielding',
        role: 'Network Defense',
        benefit: 'Protección perimetral ante ataques volumétricos y escaneos automáticos maliciosos.'
      },
      {
        tech: 'SSL & DNS Anycast Global',
        role: 'Trust & Encryption',
        benefit: 'Certificados TLS 1.3 renovados automáticamente con enrutamiento de latencia mínima.'
      }
    ],
    codeSnippet: `// Conexión WebUSB directa a impresora térmica ESC/POS
const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x04b8 }] });
await device.open();
await device.transferOut(1, escPosCommandBytes);`
  }
};

export default function TechStackExplorer() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const current = STACK_DATA[activeCategory];
  const CurrentIcon = current.icon;

  return (
    <section className="tech-stack-section" id="tech-stack">
      <div className="container">
        {/* Header */}
        <div className="tech-header">
          <div className="tech-kicker">
            <Sparkles size={14} />
            <span className="font-mono">SYSTEM ARCHITECTURE · NO COMPROMISES</span>
          </div>
          <h2 className="tech-title">
            Arquitectura de ingeniería <br className="hidden-mobile" />
            <span>diseñada para generar rentabilidad</span>
          </h2>
          <p className="tech-desc">
            No usamos plantillas de WordPress ni constructores que se rompen con las actualizaciones. 
            Construimos sobre la infraestructura moderna que utilizan las principales empresas de software del mundo.
          </p>

          {/* Category Toggle Pills */}
          <div className="tech-nav-pills font-mono">
            <button
              className={`tech-pill ${activeCategory === 'frontend' ? 'is-active' : ''}`}
              onClick={() => setActiveCategory('frontend')}
            >
              <Cpu size={15} />
              <span>FRONTEND & UI</span>
            </button>
            <button
              className={`tech-pill ${activeCategory === 'backend' ? 'is-active' : ''}`}
              onClick={() => setActiveCategory('backend')}
            >
              <Server size={15} />
              <span>EDGE & BACKEND</span>
            </button>
            <button
              className={`tech-pill ${activeCategory === 'data' ? 'is-active' : ''}`}
              onClick={() => setActiveCategory('data')}
            >
              <Database size={15} />
              <span>DATOS & OFFLINE</span>
            </button>
            <button
              className={`tech-pill ${activeCategory === 'infra' ? 'is-active' : ''}`}
              onClick={() => setActiveCategory('infra')}
            >
              <ShieldCheck size={15} />
              <span>INFRA & HARDWARE</span>
            </button>
          </div>
        </div>

        {/* Active Detail Showcase */}
        <div className="tech-showcase-card">
          <div className="tech-showcase-grid">
            {/* Left: Business Advantage & Capabilities */}
            <div className="tech-left-col">
              <div className="tech-badge-row">
                <span className="tech-category-tag font-mono">{current.category}</span>
                <span className="tech-spec-pill font-mono">{current.badge}</span>
              </div>

              <h3 className="tech-headline">{current.headline}</h3>

              {/* Highlighted Business Value */}
              <div className="tech-business-box">
                <div className="biz-box-kicker font-mono">¿QUÉ SIGNIFICA PARA TU NEGOCIO?</div>
                <p className="biz-box-text">{current.businessAdvantage}</p>
              </div>

              {/* Tech details breakdown */}
              <div className="tech-spec-items">
                {current.techDetails.map((td, idx) => (
                  <div key={idx} className="spec-tech-row">
                    <div className="spec-tech-header">
                      <span className="spec-tech-name font-mono">{td.tech}</span>
                      <span className="spec-tech-role font-mono">{td.role}</span>
                    </div>
                    <p className="spec-tech-benefit">{td.benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Snippet & Topology */}
            <div className="tech-right-col">
              <div className="tech-code-terminal font-mono">
                <div className="terminal-header-bar">
                  <div className="terminal-traffic-lights">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="terminal-label">ARCHITECTURE_PREVIEW.ts</span>
                </div>
                <pre className="terminal-code-body">
                  <code>{current.codeSnippet}</code>
                </pre>
              </div>

              {/* Guarantee Banner */}
              <div className="tech-uptime-guarantee">
                <div className="uptime-icon">
                  <CurrentIcon size={24} />
                </div>
                <div className="uptime-info">
                  <div className="uptime-title font-mono">SLA 99.99% GARANTIZADO</div>
                  <div className="uptime-desc">
                    Propiedad 100% transferida al cliente: dominio, código y bases de datos a tu nombre sin dependencias cautivas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
