import React, { useState, useMemo } from 'react';
import { 
  FileCode2, 
  Copy, 
  MessageSquare, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Database, 
  WifiOff, 
  Printer, 
  ScrollText, 
  Layers, 
  Bot, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useToast } from './Toast';

const MODULES_CONFIG = [
  {
    id: 'offline_sync',
    title: 'Offline-First Sync Engine',
    category: 'Resiliencia & Datos',
    icon: WifiOff,
    desc: 'Almacenamiento local en IndexedDB con sincronización bidireccional automática cuando vuelve la conexión.',
    sprintImpact: 0.5,
    complexityPoints: 20
  },
  {
    id: 'multi_tenant',
    title: 'Multi-Tenant DB & Row-Level Security',
    category: 'Arquitectura & Seguridad',
    icon: Database,
    desc: 'Aislamiento estricto de datos con políticas RLS de PostgreSQL/SQLite y respaldos diarios cifrados.',
    sprintImpact: 0.5,
    complexityPoints: 25
  },
  {
    id: 'hardware_pos',
    title: 'Hardware Bridge (Impresoras ESC/POS & Scanners)',
    category: 'Integración Comercial',
    icon: Printer,
    desc: 'Control directo por WebUSB/Bluetooth de impresoras térmicas de 58/80mm y lectores de código de barras.',
    sprintImpact: 0.5,
    complexityPoints: 20
  },
  {
    id: 'audit_compliance',
    title: 'Audit Logging Inmutable & AFIP WebServices',
    category: 'Legal & Fiscal',
    icon: ScrollText,
    desc: 'Libro de transacciones inmodificable, trazabilidad de cobros y facturación electrónica homologada.',
    sprintImpact: 1.0,
    complexityPoints: 30
  },
  {
    id: 'edge_cdn',
    title: 'Edge Deployment Global & Caching HTTP/3',
    category: 'Performance',
    icon: Cpu,
    desc: 'Entrega desde nodos perimetrales en Buenos Aires, compresión Brotli y latencias sub-30ms.',
    sprintImpact: 0.5,
    complexityPoints: 15
  },
  {
    id: 'whatsapp_webhook',
    title: 'WhatsApp Business API Webhook Hub',
    category: 'Canales & Clientes',
    icon: Bot,
    desc: 'Disparo automatizado de comprobantes digitales, confirmación de turnos y alertas operativas directas.',
    sprintImpact: 0.5,
    complexityPoints: 20
  }
];

export default function ArchitectureSpecBuilder() {
  const toast = useToast();
  const [selectedModules, setSelectedModules] = useState([
    'offline_sync',
    'hardware_pos',
    'edge_cdn',
    'whatsapp_webhook'
  ]);
  const [businessName, setBusinessName] = useState('Mi Negocio / Comercio');
  const [businessNiche, setBusinessNiche] = useState('Náutica & Comercios de Zona Norte');

  const toggleModule = (id) => {
    setSelectedModules((prev) => {
      if (prev.includes(id)) {
        return prev.filter((m) => m !== id);
      }
      return [...prev, id];
    });
  };

  const scoping = useMemo(() => {
    const totalPoints = selectedModules.reduce((acc, mId) => {
      const found = MODULES_CONFIG.find((c) => c.id === mId);
      return acc + (found?.complexityPoints || 0);
    }, 0);

    const totalWeeks = Math.max(1, Math.ceil(
      selectedModules.reduce((acc, mId) => {
        const found = MODULES_CONFIG.find((c) => c.id === mId);
        return acc + (found?.sprintImpact || 0);
      }, 0.5)
    ));

    let tier = 'STANDARD SPEED';
    let sla = '99.90%';
    if (totalPoints > 80) {
      tier = 'ENTERPRISE RESILIENT';
      sla = '99.99%';
    } else if (totalPoints > 40) {
      tier = 'PROFESSIONAL SCALE';
      sla = '99.95%';
    }

    return {
      totalPoints,
      estimatedSprints: `${totalWeeks} a ${totalWeeks + 1} Semanas`,
      tier,
      sla
    };
  }, [selectedModules]);

  // Generate Markdown RFC
  const rfcText = useMemo(() => {
    const activeModDetails = MODULES_CONFIG
      .filter((m) => selectedModules.includes(m.id))
      .map((m) => `- [x] **${m.title}** (${m.category}): ${m.desc}`)
      .join('\n');

    return `### RFC: ESPECIFICACIÓN TÉCNICA DE PRODUCCIÓN
**Empresa / Proyecto:** ${businessName}
**Actividad:** ${businessNiche}
**Fecha:** ${new Date().toLocaleDateString('es-AR')}
**Arquitectura Clasificada:** ${scoping.tier}
**SLA Proyectado:** ${scoping.sla}
**Plazo de Implementación Estimado:** ${scoping.estimatedSprints}

#### Módulos de Producción Seleccionados:
${activeModDetails || '- Ningún módulo específico seleccionado'}

#### Consideraciones de Infraestructura:
- Stack: React 19 Core + Vite Edge Bundle + SQLite/PostgreSQL RLS
- Protocolo de Red: HTTP/3 con Brotli Compression & Zero-Downtime Purge
- Licenciamiento: Dominio propio registrado a nombre del cliente + código transferido.
---
*Generado mediante el Architecture Spec Builder de Primera Cuadra*`;
  }, [businessName, businessNiche, selectedModules, scoping]);

  const handleCopyRFC = () => {
    navigator.clipboard.writeText(rfcText);
    toast.success('RFC copiado al portapapeles', 'Podés pegarlo en un documento o enviarlo por correo');
  };

  const handleSendToWhatsApp = () => {
    const intro = `¡Hola Primera Cuadra! Estuve configurando la arquitectura técnica para *${businessName}*:\n\n`;
    const fullMessage = encodeURIComponent(intro + rfcText);
    window.open(`https://wa.me/5491128779641?text=${fullMessage}`, '_blank');
    toast.success('Abriendo WhatsApp Técnico', 'Enviando especificación a nuestros ingenieros');
  };

  return (
    <section className="spec-builder-section" id="spec-builder">
      <div className="container">
        {/* Header */}
        <div className="spec-header">
          <div className="spec-kicker">
            <Sparkles size={14} />
            <span className="font-mono">PRODUCTION SCOPING ENGINE · NO GENERIC TEMPLATES</span>
          </div>
          <h2 className="spec-title">
            Architecture Spec Builder <br className="hidden-mobile" />
            <span>Diseñá la especificación técnica de tu sistema</span>
          </h2>
          <p className="spec-desc">
            Reemplazamos calculadoras genéricas por alcances de ingeniería real. 
            Elegí las capacidades necesarias para tu comercio y generá un RFC listo para producción.
          </p>
        </div>

        {/* Builder Interactive Shell */}
        <div className="spec-shell-grid">
          {/* Left Column: Configurator & Modules */}
          <div className="spec-config-panel">
            {/* Meta fields */}
            <div className="spec-meta-inputs">
              <div className="spec-input-group">
                <label className="font-mono">NOMBRE DEL COMERCIO / PROYECTO</label>
                <input 
                  type="text" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej: Guardería Náutica San Fernando"
                  className="spec-input"
                />
              </div>

              <div className="spec-input-group">
                <label className="font-mono">RUBRO / ACTIVIDAD</label>
                <input 
                  type="text" 
                  value={businessNiche} 
                  onChange={(e) => setBusinessNiche(e.target.value)}
                  placeholder="Ej: Taller Mecánico Especializado"
                  className="spec-input"
                />
              </div>
            </div>

            {/* Modules Check-grid */}
            <div className="spec-modules-list">
              <div className="modules-header-label font-mono">
                MÓDULOS ARQUITECTÓNICOS DISPONIBLES ({selectedModules.length}/{MODULES_CONFIG.length})
              </div>

              {MODULES_CONFIG.map((mod) => {
                const IconC = mod.icon;
                const isChecked = selectedModules.includes(mod.id);

                return (
                  <div 
                    key={mod.id} 
                    className={`spec-module-card ${isChecked ? 'is-checked' : ''}`}
                    onClick={() => toggleModule(mod.id)}
                  >
                    <div className="module-check-box">
                      {isChecked && <Check size={14} />}
                    </div>
                    <div className="module-icon-wrap">
                      <IconC size={18} />
                    </div>
                    <div className="module-info">
                      <div className="module-topline">
                        <span className="module-title">{mod.title}</span>
                        <span className="module-category font-mono">{mod.category}</span>
                      </div>
                      <p className="module-desc">{mod.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic RFC Preview & Export */}
          <div className="spec-rfc-panel">
            <div className="rfc-score-cards font-mono">
              <div className="score-card">
                <span className="score-lbl">PERFIL DE SISTEMA</span>
                <span className="score-val highlight">{scoping.tier}</span>
              </div>
              <div className="score-card">
                <span className="score-lbl">SLA PROYECTADO</span>
                <span className="score-val">{scoping.sla}</span>
              </div>
              <div className="score-card">
                <span className="score-lbl">ESTIMACIÓN DE SPRINTS</span>
                <span className="score-val">{scoping.estimatedSprints}</span>
              </div>
            </div>

            {/* Terminal Code Preview */}
            <div className="rfc-code-preview font-mono">
              <div className="rfc-preview-topbar">
                <div className="rfc-file-tag">
                  <FileCode2 size={14} />
                  <span>ARCHITECTURE_SPEC_RFC.md</span>
                </div>
                <span className="rfc-tag-live">GENERADO EN TIEMPO REAL</span>
              </div>
              <pre className="rfc-code-content">
                <code>{rfcText}</code>
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="spec-actions-grid">
              <button 
                className="btn-copy-rfc"
                onClick={handleCopyRFC}
              >
                <Copy size={16} />
                <span>Copiar RFC al Portapapeles</span>
              </button>

              <button 
                className="btn-send-rfc-wa"
                onClick={handleSendToWhatsApp}
              >
                <MessageSquare size={16} />
                <span>Enviar Especificación a WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
