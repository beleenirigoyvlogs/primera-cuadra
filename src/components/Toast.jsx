import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  showToast: () => {},
  success: () => {},
  info: () => {},
  error: () => {}
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, type: 'info', duration: 3800, ...toast };
    
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [removeToast]);

  const success = useCallback((title, description = '') => {
    addToast({ type: 'success', title, description });
  }, [addToast]);

  const info = useCallback((title, description = '') => {
    addToast({ type: 'info', title, description });
  }, [addToast]);

  const error = useCallback((title, description = '') => {
    addToast({ type: 'error', title, description });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ showToast: addToast, success, info, error }}>
      {children}
      {/* Toast Render Viewport */}
      <div className="toast-viewport" role="region" aria-label="Notificaciones del sistema" tabIndex={-1}>
        {toasts.map((t) => (
          <div key={t.id} className={`toast-card toast-${t.type}`} role="alert">
            <div className="toast-icon-wrap">
              {t.type === 'success' && <CheckCircle2 size={18} className="toast-icon success" />}
              {t.type === 'error' && <AlertCircle size={18} className="toast-icon error" />}
              {t.type === 'info' && <Info size={18} className="toast-icon info" />}
            </div>
            <div className="toast-content">
              <div className="toast-title">{t.title}</div>
              {t.description && <div className="toast-desc">{t.description}</div>}
            </div>
            <button 
              className="toast-close-btn" 
              onClick={() => removeToast(t.id)}
              aria-label="Cerrar notificación"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
