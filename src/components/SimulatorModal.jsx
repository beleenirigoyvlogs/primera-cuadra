import React, { useEffect } from 'react';
import { X, Sparkles, ArrowLeft } from 'lucide-react';
import TripodMockup from './TripodMockup';

export default function SimulatorModal({ isOpen, onClose, niche, onSelectPreset }) {
  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="simulator-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="simulator-modal-title"
    >
      {/* Top Floating Control Bar */}
      <div className="simulator-modal-topbar">
        <div className="modal-topbar-left">
          <button 
            type="button" 
            className="btn-modal-back"
            onClick={onClose}
            aria-label="Cerrar y volver a la página principal"
          >
            <ArrowLeft size={16} />
            <span>Volver a la web</span>
          </button>
          <div className="modal-topbar-brand">
            <Sparkles size={16} className="text-brand-purple" />
            <strong id="simulator-modal-title">Simulador Interactivo</strong>
            <span className="modal-badge-live">EN VIVO</span>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-modal-close"
          onClick={onClose}
          aria-label="Cerrar ventana del simulador"
        >
          <X size={20} />
          <span className="close-text">Cerrar</span>
        </button>
      </div>

      {/* Main Modal Scroll Area */}
      <div className="simulator-modal-content">
        <div className="simulator-modal-inner">
          <TripodMockup niche={niche} />
        </div>
      </div>
    </div>
  );
}
