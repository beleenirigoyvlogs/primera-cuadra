import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const MODULES = [
  { id: 'pos', name: '1. Punto de Venta (POS)', src: '/thepoint/pos-full.webp', desc: 'Facturación rápida, lectura de código de barras y medios de pago combinados.' },
  { id: 'dashboard', name: '2. Panel General', src: '/thepoint/dashboard-full.webp', desc: 'Control operativo en tiempo real, KPIs diarios y alertas de reposición.' },
  { id: 'stock', name: '3. Productos & Stock', src: '/thepoint/stock-full.webp', desc: 'Catálogo con costo, precio de venta, margen comercial y alertas de faltantes.' },
  { id: 'caja', name: '4. Caja Diaria & Arqueo', src: '/thepoint/caja-full.webp', desc: 'Apertura y cierre de turnos, arqueo de valores e historial de sesiones.' },
  { id: 'gastos', name: '5. Gastos Operativos', src: '/thepoint/gastos-full.webp', desc: 'Registro de egresos por rubro: alquiler, fletes, packaging y servicios.' },
  { id: 'reportes', name: '6. Reportes & Rentabilidad', src: '/thepoint/reportes-full.webp', desc: 'Rentabilidad real neta deduciendo costo de mercadería y gastos.' },
  { id: 'auditoria', name: '7. Historial & Auditoría', src: '/thepoint/auditoria-full.webp', desc: 'Log cronológico inmutable de cada venta, retiro de caja o edición de producto.' }
];

export default function ThePointLightbox({ isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setScale(1);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const currentModule = MODULES[currentIndex];

  const nextSlide = () => {
    setScale(1);
    setCurrentIndex((prev) => (prev + 1) % MODULES.length);
  };

  const prevSlide = () => {
    setScale(1);
    setCurrentIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.75));
  const resetZoom = () => setScale(1);

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-label="Visor The Point POS en alta resolución"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(10, 8, 16, 0.96)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Poppins', sans-serif",
        color: '#F4F2EC'
      }}
    >
      {/* Top Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid #26232E',
          backgroundColor: '#121117'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 600, textTransform: 'uppercase', color: '#A48BFF' }}>
            The Point POS
          </span>
          <span style={{ fontSize: '13px', color: '#B3AFA6' }}>
            {currentModule.name} ({currentIndex + 1} de {MODULES.length})
          </span>
        </div>

        {/* Zoom Controls & Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            type="button" 
            onClick={zoomOut} 
            title="Reducir zoom" 
            style={{ background: '#26232E', border: '1px solid #34313C', color: '#F1EEE7', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
          >
            <ZoomOut size={16} />
          </button>
          <button 
            type="button" 
            onClick={resetZoom} 
            title="Restablecer zoom" 
            style={{ background: '#26232E', border: '1px solid #34313C', color: '#F1EEE7', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
          >
            {Math.round(scale * 100)}%
          </button>
          <button 
            type="button" 
            onClick={zoomIn} 
            title="Aumentar zoom" 
            style={{ background: '#26232E', border: '1px solid #34313C', color: '#F1EEE7', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
          >
            <ZoomIn size={16} />
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            title="Cerrar visor" 
            style={{ background: '#673DE6', border: 'none', color: '#FFFFFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px', marginLeft: '8px' }}
          >
            <X size={16} />
            <span>Cerrar</span>
          </button>
        </div>
      </div>

      {/* Module Selector Pills (Scrollable horizontally without overlapping) */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          padding: '10px 20px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          backgroundColor: '#18161E',
          borderBottom: '1px solid #26232E',
          flexShrink: 0
        }}
      >
        {MODULES.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => { setScale(1); setCurrentIndex(idx); }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: idx === currentIndex ? '1px solid #673DE6' : '1px solid #34313C',
              backgroundColor: idx === currentIndex ? '#673DE6' : '#26232E',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: idx === currentIndex ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Image Viewer Area */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'auto',
          padding: '16px'
        }}
      >
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Módulo anterior"
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(38, 35, 46, 0.85)',
            border: '1px solid #34313C',
            color: '#FFFFFF',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${scale})`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <img 
            src={currentModule.src} 
            alt={currentModule.name} 
            style={{ 
              maxWidth: '92vw', 
              maxHeight: '75vh', 
              borderRadius: '8px', 
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)', 
              objectFit: 'contain' 
            }} 
          />
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Módulo siguiente"
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(38, 35, 46, 0.85)',
            border: '1px solid #34313C',
            color: '#FFFFFF',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div 
        style={{
          padding: '12px 20px',
          borderTop: '1px solid #26232E',
          backgroundColor: '#121117',
          textAlign: 'center',
          fontSize: '13px',
          color: '#B3AFA6'
        }}
      >
        <span style={{ color: '#F1EEE7', fontWeight: 600 }}>{currentModule.name}: </span>
        {currentModule.desc}
      </div>
    </div>
  );
}

