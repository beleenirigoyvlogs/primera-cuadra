import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Lock, 
  Unlock, 
  LogOut, 
  Eye, 
  Smartphone, 
  Monitor, 
  X, 
  Upload, 
  Video, 
  Sparkles, 
  ArrowLeft, 
  Filter, 
  Sun, 
  Moon, 
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  Layers,
  LayoutGrid
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { useTheme } from '../hooks/useTheme';
import { 
  TEMPLATES, 
  LN, 
  SN, 
  LD, 
  generateSiteHtml 
} from '../utils/templateEngine';

// ==========================================
// LAZY-LOADED TEMPLATE CARD COMPONENT
// ==========================================
function TemplateCard({ template, businessData, onSelect }) {
  const cardRef = useRef(null);
  const iframeRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [scale, setScale] = useState(0.24);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRendered(true);
            observer.unobserve(cardEl);
          }
        });
      },
      { rootMargin: '250px' }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  // Update scale when card resizes
  useEffect(() => {
    if (!cardRef.current) return;
    const updateScale = () => {
      const tw = cardRef.current?.querySelector('.card-tw');
      if (tw) {
        setScale(tw.clientWidth / 1280);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Populate iframe when rendered
  useEffect(() => {
    if (isRendered && iframeRef.current) {
      iframeRef.current.srcdoc = generateSiteHtml(template, businessData);
    }
  }, [isRendered, template, businessData]);

  return (
    <div 
      ref={cardRef} 
      className="showroom-card"
      onClick={() => onSelect(template.k)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(template.k); }}
      aria-label={`Ver plantilla ${template.n}`}
    >
      <div className="card-tw">
        {isRendered ? (
          <iframe 
            ref={iframeRef} 
            tabIndex={-1} 
            title={template.n}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '1280px',
              height: '840px',
              border: 0,
              transformOrigin: '0 0',
              transform: `scale(${scale})`,
              pointerEvents: 'none',
              background: '#fff'
            }}
          />
        ) : (
          <div className="card-tw-placeholder">
            <div className="shimmer-box" />
          </div>
        )}
      </div>
      <div className="card-info">
        <b>{template.n}</b>
        <span>{LD[template.li]}</span>
      </div>
    </div>
  );
}

// ==========================================
// MAIN SHOWROOM PAGE COMPONENT
// ==========================================
export default function ShowroomPage() {
  const { isDark, toggleTheme } = useTheme();

  // Authentication State
  const [authStatus, setAuthStatus] = useState('checking'); // 'checking' | 'unauthenticated' | 'authenticated'
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeUser, setActiveUser] = useState('');

  // Step: 'form' | 'gallery'
  const [step, setStep] = useState('form');

  // Business Data State
  const [businessData, setBusinessData] = useState({
    nm: '',
    rb: '',
    zn: '',
    wa: '',
    tg: '',
    ds: '',
    it: 'Pan artesanal | Masa madre, horneado a la mañana\nFacturas | Docena y media docena\nTortas por encargue | Con 48 hs de anticipación',
    hr: '',
    vid: '',
    vidFileName: ''
  });

  // Filter State
  const [structureFilter, setStructureFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');

  // Full Screen Preview Modal State
  const [previewIndex, setPreviewIndex] = useState(null);
  const [realAppModalOpen, setRealAppModalOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // 1. Initial Auth Check on Mount
  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const res = await fetch('/api/demo-auth', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setActiveUser(data.user || 'admin');
            setAuthStatus('authenticated');
          }
          return;
        }
      } catch (err) {
        // Fallback
      }
      if (isMounted) {
        setAuthStatus('unauthenticated');
      }
    }

    checkAuth();
    return () => { isMounted = false; };
  }, []);

  // Update Page Title and Meta Robots
  useEffect(() => {
    document.title = 'Showroom Privado · Primera Cuadra';
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, nofollow';
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e?.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/demo-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput
        })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        data = { error: `Error del servidor (código ${res.status}).` };
      }

      if (res.ok && data.success) {
        setActiveUser(data.user || usernameInput.trim());
        setAuthStatus('authenticated');
        setAuthError('');
      } else {
        setAuthError(data.error || 'Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setAuthError('Error de red o conexión con el servidor.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/demo-auth?action=logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {}
    setAuthStatus('unauthenticated');
    setUsernameInput('');
    setPasswordInput('');
    setStep('form');
  };

  // Handle Video File Upload
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setBusinessData(prev => ({
        ...prev,
        vid: objectUrl,
        vidFileName: file.name
      }));
    }
  };

  const removeVideo = () => {
    setBusinessData(prev => ({
      ...prev,
      vid: '',
      vidFileName: ''
    }));
  };

  // Filtered Templates List
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(t => {
      const matchLayout = structureFilter === '' || t.li === Number(structureFilter);
      const matchStyle = styleFilter === '' || t.si === Number(styleFilter);
      return matchLayout && matchStyle;
    });
  }, [structureFilter, styleFilter]);

  // Selected Template for Modal Preview
  const selectedTemplate = previewIndex !== null ? TEMPLATES[previewIndex] : null;

  // Colors & Theme Tokens aligned with Primera Cuadra
  const themeBg = isDark ? '#121117' : '#F6F5F1';
  const themeCard = isDark ? '#1F1C17' : '#FFFFFF';
  const themeInk = isDark ? '#ECE8DF' : '#1D1B17';
  const themeMuted = isDark ? '#A39D90' : '#6F6A60';
  const themeBorder = isDark ? '#2E2B36' : '#DEDAD0';
  const themeAccent = isDark ? '#A78BFA' : '#6D28D9';
  const themeAccentHover = isDark ? '#BCA5FF' : '#5B21B6';

  return (
    <div 
      className="showroom-root"
      style={{
        minHeight: '100vh',
        background: themeBg,
        color: themeInk,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        transition: 'background 0.25s ease, color 0.25s ease'
      }}
    >
      <style>{`
        .showroom-root * { box-sizing: border-box; }
        .showroom-btn {
          background: ${themeAccent};
          color: #ffffff;
          border: 0;
          padding: 0.75rem 1.4rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease, transform 0.1s ease;
        }
        .showroom-btn:hover {
          background: ${themeAccentHover};
        }
        .showroom-btn:active {
          transform: scale(0.98);
        }
        .showroom-btn.secondary {
          background: transparent;
          color: ${themeInk};
          border: 1px solid ${themeBorder};
        }
        .showroom-btn.secondary:hover {
          background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
        }
        .showroom-input, .showroom-select, .showroom-textarea {
          width: 100%;
          padding: 0.7rem 0.85rem;
          border: 1px solid ${themeBorder};
          border-radius: 8px;
          background: ${themeCard};
          color: ${themeInk};
          font: inherit;
          margin-bottom: 12px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .showroom-input:focus, .showroom-select:focus, .showroom-textarea:focus {
          border-color: ${themeAccent};
          box-shadow: 0 0 0 3px ${isDark ? 'rgba(167, 139, 250, 0.2)' : 'rgba(109, 40, 217, 0.15)'};
        }
        .showroom-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 500;
          color: ${themeMuted};
          margin-bottom: 5px;
        }
        .showroom-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 24px 20px 60px;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 16px;
          max-width: 760px;
        }
        .form-grid-2 .full-width {
          grid-column: 1 / -1;
        }
        @media (max-width: 680px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }
        .showroom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 18px;
        }
        .showroom-card {
          background: ${themeCard};
          border: 1px solid ${themeBorder};
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .showroom-card:hover {
          transform: translateY(-3px);
          border-color: ${themeAccent};
          box-shadow: 0 10px 24px ${isDark ? 'rgba(0,0,0,0.45)' : 'rgba(109,40,217,0.08)'};
        }
        .card-tw {
          height: 210px;
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid ${themeBorder};
          background: ${isDark ? '#0A0A0C' : '#EFEFEF'};
        }
        .card-tw-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .shimmer-box {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}, transparent);
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .card-info {
          padding: 14px 16px;
        }
        .card-info b {
          display: block;
          font-size: 0.95rem;
          margin-bottom: 4px;
          color: ${themeInk};
        }
        .card-info span {
          display: block;
          color: ${themeMuted};
          font-size: 0.83rem;
          line-height: 1.4;
        }
        .showroom-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid ${themeBorder};
          gap: 14px;
          flex-wrap: wrap;
        }
        .showroom-modal {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 12, 0.88);
          backdrop-filter: blur(8px);
          z-index: 99999;
          padding: 14px;
          display: flex;
          flex-direction: column;
        }
        .showroom-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          color: #ffffff;
          margin-bottom: 12px;
          padding: 4px 6px;
          flex-wrap: wrap;
        }
        .showroom-stage {
          flex: 1;
          display: flex;
          justify-content: center;
          min-height: 0;
          position: relative;
        }
        .preview-iframe {
          border: 0;
          background: #ffffff;
          border-radius: 10px;
          height: 100%;
          width: 100%;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .preview-iframe.mobile-mode {
          width: 390px;
          border: 8px solid #222;
          border-radius: 36px;
        }

        /* Real Apps Featured Card */
        .real-app-card {
          background: ${isDark ? 'linear-gradient(135deg, #0F2438 0%, #16324F 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f7f5ff 100%)'};
          border: 1.5px solid ${themeAccent};
          border-radius: 16px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 280px 1fr;
          box-shadow: 0 12px 28px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(109,40,217,0.1)'};
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-bottom: 30px;
        }
        .real-app-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px ${isDark ? 'rgba(0,240,181,0.2)' : 'rgba(109,40,217,0.18)'};
        }
        .real-app-img-wrap {
          height: 100%;
          min-height: 180px;
          background: #07131D;
          overflow: hidden;
          position: relative;
        }
        .real-app-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .real-app-content {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 720px) {
          .real-app-card {
            grid-template-columns: 1fr;
          }
          .real-app-img-wrap {
            height: 170px;
          }
        }
      `}</style>

      {/* ---------------------------------------------------- */}
      {/* 1. CHECKING AUTH STATUS */}
      {/* ---------------------------------------------------- */}
      {authStatus === 'checking' && (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
          <div style={{ textAlign: 'center', color: themeMuted }}>
            <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 12px', color: themeAccent }} />
            <p style={{ fontSize: '0.9rem' }}>Verificando credenciales del servidor...</p>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. LOGIN SCREEN (UNAUTHENTICATED) */}
      {/* ---------------------------------------------------- */}
      {authStatus === 'unauthenticated' && (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '20px' }}>
          <div 
            style={{
              background: themeCard,
              border: `1px solid ${themeBorder}`,
              borderRadius: '16px',
              padding: '32px 28px',
              width: '100%',
              maxWidth: '380px',
              boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.6)' : '0 12px 32px rgba(109,40,217,0.07)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
              <BrandLogo variant="auto" height={28} />
              <button 
                onClick={toggleTheme} 
                className="showroom-btn secondary" 
                style={{ padding: '6px 10px', borderRadius: '50px' }}
                title="Cambiar tema claro / oscuro"
                aria-label="Cambiar tema"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Lock size={18} style={{ color: themeAccent }} />
                <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Primera Cuadra</h1>
              </div>
              <p style={{ color: themeMuted, fontSize: '0.88rem', margin: 0 }}>
                Simulador de plantillas · administrador
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '14px' }}>
                <label className="showroom-label" htmlFor="user-input">Usuario</label>
                <input 
                  id="user-input"
                  type="text" 
                  className="showroom-input" 
                  placeholder="Usuario"
                  autoComplete="username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  disabled={isLoggingIn}
                  required
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label className="showroom-label" htmlFor="pass-input">Contraseña</label>
                <input 
                  id="pass-input"
                  type="password" 
                  className="showroom-input" 
                  placeholder="Contraseña"
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  disabled={isLoggingIn}
                  required
                />
              </div>

              {authError && (
                <div 
                  style={{ 
                    color: '#e11d48', 
                    fontSize: '0.83rem', 
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    lineHeight: 1.4
                  }}
                >
                  <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{authError}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="showroom-btn" 
                style={{ width: '100%', padding: '0.8rem' }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Validando...</span>
                  </>
                ) : (
                  <>
                    <Unlock size={16} />
                    <span>Ingresar</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. AUTHENTICATED WORKFLOW */}
      {/* ---------------------------------------------------- */}
      {authStatus === 'authenticated' && (
        <div className="showroom-container">
          {/* Top Navigation Bar */}
          <header className="showroom-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <BrandLogo variant="auto" height={28} />
              <div style={{ height: '18px', width: '1px', background: themeBorder }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={15} style={{ color: themeAccent }} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Simulador de plantillas · administrador</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={toggleTheme} 
                className="showroom-btn secondary" 
                style={{ padding: '8px 12px', borderRadius: '8px' }}
                title="Cambiar tema claro / oscuro"
                aria-label="Cambiar tema"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <button 
                onClick={handleLogout} 
                className="showroom-btn secondary"
                title="Cerrar sesión segura"
              >
                <LogOut size={15} />
                <span>Salir</span>
              </button>
            </div>
          </header>

          {/* STEP 1: BUSINESS DATA FORM */}
          {step === 'form' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 6px' }}>
                  Datos del comercio
                </h2>
                <p style={{ color: themeMuted, fontSize: '0.9rem', margin: 0 }}>
                  Cargá la información del cliente para generar las 50 plantillas personalizadas en tiempo real.
                </p>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="showroom-label">Nombre del comercio</label>
                  <input 
                    className="showroom-input" 
                    placeholder="Ej: Panadería La Esquina"
                    value={businessData.nm}
                    onChange={(e) => setBusinessData({ ...businessData, nm: e.target.value })}
                  />
                </div>

                <div>
                  <label className="showroom-label">Rubro</label>
                  <input 
                    className="showroom-input" 
                    placeholder="Ej: Panadería, Peluquería, Ferretería"
                    value={businessData.rb}
                    onChange={(e) => setBusinessData({ ...businessData, rb: e.target.value })}
                  />
                </div>

                <div>
                  <label className="showroom-label">Zona / ciudad</label>
                  <input 
                    className="showroom-input" 
                    placeholder="Ej: Tigre, Buenos Aires"
                    value={businessData.zn}
                    onChange={(e) => setBusinessData({ ...businessData, zn: e.target.value })}
                  />
                </div>

                <div>
                  <label className="showroom-label">WhatsApp</label>
                  <input 
                    className="showroom-input" 
                    placeholder="Ej: 11 2345 6789"
                    inputMode="tel"
                    value={businessData.wa}
                    onChange={(e) => setBusinessData({ ...businessData, wa: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label className="showroom-label">Frase principal (opcional)</label>
                  <input 
                    className="showroom-input" 
                    placeholder="Ej: Pan hecho todos los días, como en casa"
                    value={businessData.tg}
                    onChange={(e) => setBusinessData({ ...businessData, tg: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label className="showroom-label">Descripción corta (opcional)</label>
                  <textarea 
                    className="showroom-textarea" 
                    rows={2} 
                    placeholder="Ej: Hace 20 años horneando para el barrio."
                    value={businessData.ds}
                    onChange={(e) => setBusinessData({ ...businessData, ds: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label className="showroom-label">
                    Qué ofrecen — uno por línea, con detalle opcional después de “|”
                  </label>
                  <textarea 
                    className="showroom-textarea" 
                    rows={4} 
                    placeholder="Pan artesanal | Masa madre, horneado a la mañana&#10;Facturas | Docena y media docena&#10;Tortas por encargue | Con 48 hs de anticipación"
                    value={businessData.it}
                    onChange={(e) => setBusinessData({ ...businessData, it: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label className="showroom-label">Horario</label>
                  <input 
                    className="showroom-input" 
                    placeholder="Ej: Lunes a sábados de 8 a 20 h"
                    value={businessData.hr}
                    onChange={(e) => setBusinessData({ ...businessData, hr: e.target.value })}
                  />
                </div>

                <div className="full-width" style={{ marginBottom: '20px' }}>
                  <label className="showroom-label">Video del comercio (opcional, para las webs animadas)</label>
                  <div 
                    style={{
                      border: `2px dashed ${themeBorder}`,
                      borderRadius: '10px',
                      padding: '16px',
                      background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Video size={24} style={{ color: themeAccent }} />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                          {businessData.vidFileName || 'Ningún video cargado (se usará el reproductor de muestra)'}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: themeMuted }}>
                          Formatos MP4, WebM o MOV desde tu dispositivo
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {businessData.vid && (
                        <button 
                          type="button" 
                          onClick={removeVideo}
                          className="showroom-btn secondary"
                          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                        >
                          Quitar
                        </button>
                      )}
                      <label 
                        className="showroom-btn secondary"
                        style={{ padding: '6px 14px', fontSize: '0.82rem', margin: 0, cursor: 'pointer' }}
                      >
                        <Upload size={14} />
                        <span>{businessData.vid ? 'Cambiar video' : 'Seleccionar video'}</span>
                        <input 
                          type="file" 
                          accept="video/*" 
                          style={{ display: 'none' }}
                          onChange={handleVideoChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="button"
                className="showroom-btn" 
                style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                onClick={() => {
                  setStep('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Eye size={18} />
                <span>Ver plantillas con estos datos</span>
              </button>
            </div>
          )}

          {/* STEP 2: TEMPLATE GALLERY & REAL APPS */}
          {step === 'gallery' && (
            <div>
              {/* Top Action Bar */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '24px',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0 0 4px' }}>
                    {businessData.nm || 'Tu comercio'} · Catálogo de soluciones
                  </h2>
                  <p style={{ color: themeMuted, fontSize: '0.86rem', margin: 0 }}>
                    50 plantillas web personalizadas + Sistemas y aplicaciones a medida
                  </p>
                </div>

                <button 
                  onClick={() => setStep('form')} 
                  className="showroom-btn secondary"
                >
                  <ArrowLeft size={16} />
                  <span>Editar datos</span>
                </button>
              </div>

              {/* SECTION: REAL APPS (THE POINT KIOSCO) */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <ShoppingBag size={18} style={{ color: '#00F0B5' }} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                    Ejemplos Reales Desarrollados
                  </h3>
                  <span 
                    style={{ 
                      fontSize: '0.72rem', 
                      background: 'rgba(0, 240, 181, 0.15)', 
                      color: '#00F0B5', 
                      border: '1px solid rgba(0, 240, 181, 0.4)',
                      padding: '2px 8px', 
                      borderRadius: '50px',
                      fontWeight: 700
                    }}
                  >
                    DEMO EN VIVO
                  </span>
                </div>

                <div 
                  className="real-app-card"
                  onClick={() => {
                    setRealAppModalOpen(true);
                    setPreviewIndex(null);
                    setPreviewDevice('desktop');
                  }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setRealAppModalOpen(true);
                      setPreviewDevice('desktop');
                    }
                  }}
                >
                  <div className="real-app-img-wrap">
                    <img 
                      src="/thepoint/thepoint-pos.webp" 
                      alt="The Point Kiosco POS" 
                      className="real-app-img"
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(7,19,29,0.85) 0%, transparent 60%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '12px'
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', color: '#00F0B5', fontWeight: 800, letterSpacing: '0.5px' }}>
                        PC • TOUCH • MÓVIL
                      </span>
                    </div>
                  </div>

                  <div className="real-app-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span 
                        style={{ 
                          fontSize: '0.68rem', 
                          fontWeight: 800, 
                          color: '#FF2A54', 
                          background: 'rgba(255, 42, 84, 0.12)', 
                          border: '1px solid rgba(255, 42, 84, 0.3)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}
                      >
                        SISTEMA POS A MEDIDA
                      </span>
                      <span style={{ fontSize: '0.75rem', color: themeMuted }}>Sin abonos mensuales</span>
                    </div>

                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px', color: isDark ? '#fff' : '#111' }}>
                      The Point Kiosco & Delivery
                    </h4>

                    <p style={{ fontSize: '0.88rem', color: themeMuted, margin: '0 0 16px', lineHeight: 1.45 }}>
                      Terminal táctil de facturación ultra rápida, control de stock en tiempo real con alertas de vencimiento, arqueo de caja diaria y libreta de cuentas corrientes (fiados).
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button 
                        type="button"
                        className="showroom-btn"
                        style={{ 
                          padding: '0.55rem 1.1rem', 
                          fontSize: '0.85rem',
                          background: '#FF2A54'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setRealAppModalOpen(true);
                          setPreviewDevice('desktop');
                        }}
                      >
                        <Eye size={15} />
                        <span>Abrir Demostración Interactiva</span>
                      </button>
                      <span style={{ fontSize: '0.78rem', color: themeMuted }}>
                        Versión Escritorio y Celular
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: 50 TEMPLATES GALLERY */}
              <div style={{ borderTop: `1px solid ${themeBorder}`, paddingTop: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LayoutGrid size={18} style={{ color: themeAccent }} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                      Plantillas Web Disponibles
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: themeMuted }}>
                      ({filteredTemplates.length} de {TEMPLATES.length})
                    </span>
                  </div>
                </div>

                {/* Filter Bar */}
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    marginBottom: '22px',
                    padding: '12px 16px',
                    background: themeCard,
                    border: `1px solid ${themeBorder}`,
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: themeMuted, fontSize: '0.85rem' }}>
                    <Filter size={15} />
                    <span style={{ fontWeight: 600 }}>Filtrar por:</span>
                  </div>

                  <select 
                    className="showroom-select"
                    style={{ width: 'auto', margin: 0, padding: '0.5rem 0.8rem', fontSize: '0.88rem' }}
                    value={structureFilter}
                    onChange={(e) => setStructureFilter(e.target.value)}
                    aria-label="Filtrar por estructura"
                  >
                    <option value="">Todas las estructuras ({LN.length})</option>
                    {LN.map((name, idx) => (
                      <option key={idx} value={idx}>{name}</option>
                    ))}
                  </select>

                  <select 
                    className="showroom-select"
                    style={{ width: 'auto', margin: 0, padding: '0.5rem 0.8rem', fontSize: '0.88rem' }}
                    value={styleFilter}
                    onChange={(e) => setStyleFilter(e.target.value)}
                    aria-label="Filtrar por estilo"
                  >
                    <option value="">Todos los estilos ({SN.length})</option>
                    {SN.map((name, idx) => (
                      <option key={idx} value={idx}>{name}</option>
                    ))}
                  </select>

                  {(structureFilter !== '' || styleFilter !== '') && (
                    <button 
                      onClick={() => { setStructureFilter(''); setStyleFilter(''); }}
                      className="showroom-btn secondary"
                      style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>

                {/* Grid of 50 Cards */}
                <div className="showroom-grid">
                  {filteredTemplates.map((template) => (
                    <TemplateCard 
                      key={template.k}
                      template={template}
                      businessData={businessData}
                      onSelect={(k) => {
                        setPreviewIndex(k);
                        setRealAppModalOpen(false);
                        setPreviewDevice('desktop');
                      }}
                    />
                  ))}
                </div>

                {filteredTemplates.length === 0 && (
                  <div 
                    style={{ 
                      textAlign: 'center', 
                      padding: '60px 20px', 
                      color: themeMuted,
                      background: themeCard,
                      border: `1px solid ${themeBorder}`,
                      borderRadius: '12px'
                    }}
                  >
                    <p style={{ margin: '0 0 12px', fontSize: '1rem' }}>No hay plantillas que coincidan con los filtros seleccionados.</p>
                    <button 
                      onClick={() => { setStructureFilter(''); setStyleFilter(''); }}
                      className="showroom-btn secondary"
                    >
                      Restablecer filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* 4. FULL-SCREEN MODAL PREVIEW (TEMPLATES OR REAL APP)  */}
          {/* ---------------------------------------------------- */}
          {(selectedTemplate || realAppModalOpen) && (
            <div className="showroom-modal" role="dialog" aria-modal="true">
              <div className="showroom-modal-header">
                <div>
                  <b style={{ fontSize: '1.05rem', color: '#fff', display: 'block' }}>
                    {realAppModalOpen 
                      ? 'The Point Kiosco & Delivery · Sistema POS a Medida' 
                      : selectedTemplate?.n}
                  </b>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                    {realAppModalOpen 
                      ? 'Demostración interactiva en vivo con datos de ejemplo (100% aislada en navegador)' 
                      : LD[selectedTemplate?.li]}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button 
                    onClick={() => setPreviewDevice('desktop')}
                    className="showroom-btn secondary"
                    style={{ 
                      color: '#fff', 
                      borderColor: previewDevice === 'desktop' ? themeAccent : '#555',
                      background: previewDevice === 'desktop' ? 'rgba(109, 40, 217, 0.4)' : 'transparent',
                      padding: '0.45rem 0.9rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Monitor size={15} />
                    <span>Escritorio</span>
                  </button>

                  <button 
                    onClick={() => setPreviewDevice('mobile')}
                    className="showroom-btn secondary"
                    style={{ 
                      color: '#fff', 
                      borderColor: previewDevice === 'mobile' ? themeAccent : '#555',
                      background: previewDevice === 'mobile' ? 'rgba(109, 40, 217, 0.4)' : 'transparent',
                      padding: '0.45rem 0.9rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Smartphone size={15} />
                    <span>Móvil</span>
                  </button>

                  <button 
                    onClick={() => {
                      setPreviewIndex(null);
                      setRealAppModalOpen(false);
                    }}
                    className="showroom-btn"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                  >
                    <X size={16} />
                    <span>Cerrar</span>
                  </button>
                </div>
              </div>

              <div className="showroom-stage">
                {realAppModalOpen ? (
                  <iframe 
                    key={`thepoint-${previewDevice}`}
                    title="Demostración The Point Kiosco"
                    className={`preview-iframe ${previewDevice === 'mobile' ? 'mobile-mode' : ''}`}
                    src="/demos/the-point-kiosco/index.html"
                  />
                ) : (
                  <iframe 
                    key={`${selectedTemplate.k}-${previewDevice}`}
                    title="Vista previa completa de plantilla"
                    className={`preview-iframe ${previewDevice === 'mobile' ? 'mobile-mode' : ''}`}
                    srcDoc={generateSiteHtml(selectedTemplate, businessData)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
