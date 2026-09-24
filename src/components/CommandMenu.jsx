import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  Terminal, 
  BarChart3, 
  Zap, 
  FileCode2, 
  Layers, 
  CreditCard, 
  Copy, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { useToast } from './Toast';

export default function CommandMenu({ isOpen, onClose, onSelectAction }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const toast = useToast();

  const commands = useMemo(() => [
    {
      id: 'pos',
      group: 'Sandboxes & Módulos en Vivo',
      title: 'POS Terminal Sandbox',
      subtitle: 'Simulador de cobro, lector de código de barras y ticket térmico',
      icon: Terminal,
      shortcut: 'P',
      action: () => {
        onClose();
        const el = document.getElementById('pos-sandbox');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        if (onSelectAction) onSelectAction('pos');
      }
    },
    {
      id: 'analytics',
      group: 'Sandboxes & Módulos en Vivo',
      title: 'Métricas & Telemetría en Tiempo Real',
      subtitle: 'Gráficos SVG reactivos y facturación por franjas 24h / 7d / 30d',
      icon: BarChart3,
      shortcut: 'A',
      action: () => {
        onClose();
        const el = document.getElementById('analytics-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        if (onSelectAction) onSelectAction('analytics');
      }
    },
    {
      id: 'cwv',
      group: 'Sandboxes & Módulos en Vivo',
      title: 'Inspector de Core Web Vitals & Latencia',
      subtitle: 'Simulación de TTFB, LCP y latencia en Edge Cache vs 4G vs 3G',
      icon: Zap,
      shortcut: 'L',
      action: () => {
        onClose();
        const el = document.getElementById('cwv-inspector');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        if (onSelectAction) onSelectAction('cwv');
      }
    },
    {
      id: 'spec',
      group: 'Ingeniería & Requerimientos',
      title: 'Architecture Spec Builder (RFC)',
      subtitle: 'Configurador de módulos enterprise: Offline-First, RLS y Hardware POS',
      icon: FileCode2,
      shortcut: 'S',
      action: () => {
        onClose();
        const el = document.getElementById('spec-builder');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'techstack',
      group: 'Ingeniería & Requerimientos',
      title: 'Tech Stack & System Explorer',
      subtitle: 'Desglose técnico de Frontend, Edge Runtimes, DB y Resiliencia',
      icon: Layers,
      shortcut: 'T',
      action: () => {
        onClose();
        const el = document.getElementById('tech-stack');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'simulator',
      group: 'Soluciones Principales',
      title: 'Simulador Trípode Digital (Maps + Web + WhatsApp)',
      subtitle: 'Demostración interactiva de presencia comercial en Tigre y Zona Norte',
      icon: Laptop,
      shortcut: 'D',
      action: () => {
        onClose();
        const el = document.getElementById('demostracion-en-vivo');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'pricing',
      group: 'Soluciones Principales',
      title: 'Packs & Tarifario Express',
      subtitle: 'Pack Express $120k, Solo Web $150k y Pack Completo $250k',
      icon: CreditCard,
      shortcut: '$$',
      action: () => {
        onClose();
        const el = document.getElementById('packs-precios');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'copy-link',
      group: 'Acciones Rápidas',
      title: 'Copiar enlace al portapapeles',
      subtitle: 'Compartir la web técnica de Primera Cuadra',
      icon: Copy,
      shortcut: '⌘C',
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Enlace copiado al portapapeles', 'Podés pegarlo y compartirlo directamente');
        onClose();
      }
    },
    {
      id: 'whatsapp-dev',
      group: 'Acciones Rápidas',
      title: 'Contactar a Ingeniería por WhatsApp',
      subtitle: 'Consultar factibilidad técnica de tu proyecto en tiempo real',
      icon: MessageSquare,
      shortcut: 'WA',
      action: () => {
        const msg = encodeURIComponent('Hola Primera Cuadra, estuve viendo la consola técnica y me gustaría evaluar un proyecto.');
        window.open(`https://wa.me/5491128779641?text=${msg}`, '_blank');
        onClose();
      }
    }
  ], [onClose, onSelectAction, toast]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((cmd) => 
      cmd.title.toLowerCase().includes(q) || 
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation inside command menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="cmd-input-wrap">
          <Search size={18} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Buscar módulos, telemetría, specs o acciones... (↑↓ para navegar)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="cmd-badge-esc">ESC</span>
        </div>

        {/* Results List */}
        <div className="cmd-list">
          {filteredCommands.length === 0 ? (
            <div className="cmd-empty">
              <span>No se encontraron resultados para "{query}"</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const IconComp = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  className={`cmd-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-icon">
                    <IconComp size={16} />
                  </div>
                  <div className="cmd-item-text">
                    <div className="cmd-item-title">{cmd.title}</div>
                    <div className="cmd-item-sub">{cmd.subtitle}</div>
                  </div>
                  <div className="cmd-item-meta">
                    <span className="cmd-shortcut">{cmd.shortcut}</span>
                    <ArrowRight size={14} className="cmd-arrow" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="cmd-footer">
          <div className="cmd-footer-hints">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navegar</span>
            <span><kbd>↵</kbd> Seleccionar</span>
            <span><kbd>ESC</kbd> Cerrar</span>
          </div>
          <div className="cmd-footer-branding">
            <Sparkles size={12} />
            <span>PRIMERA CUADRA · MONOCHROME ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
