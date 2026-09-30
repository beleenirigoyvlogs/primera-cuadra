import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  Building2, 
  User, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Send, 
  AlertCircle,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function AdminLeadsModal({ isOpen, onClose }) {
  const DEFAULT_PIN = '1234';
  const NOTIFICATION_EMAIL = 'primeracuadraweb@gmail.com';

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('pc_admin_auth') === 'true';
  });

  const [leads, setLeads] = useState([]);
  const [filterType, setFilterType] = useState('all'); // all, contact, simulator, new
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState(null); // 'success', 'error'

  // Load leads from localStorage
  const loadLeads = () => {
    try {
      const contactLeads = JSON.parse(localStorage.getItem('pc_contact_leads') || '[]').map(l => ({
        ...l,
        id: l.id || `contact_${l.submittedAt || Date.now()}_${Math.random()}`,
        sourceType: 'contact',
        sourceLabel: 'Formulario Web',
        date: l.submittedAt || l.createdAt || new Date().toISOString(),
        status: l.status || 'nuevo'
      }));

      const simulatorLeads = JSON.parse(localStorage.getItem('pc_simulator_leads') || '[]').map(l => ({
        ...l,
        id: l.id || `sim_${l.createdAt || Date.now()}_${Math.random()}`,
        sourceType: 'simulator',
        sourceLabel: 'Simulador 3-en-1',
        phone: l.whatsapp || l.phone,
        service: l.rubro ? `Pack ${l.rubro} (${l.city})` : (l.service || 'Demostración'),
        date: l.createdAt || l.submittedAt || new Date().toISOString(),
        status: l.status || 'nuevo'
      }));

      // Combine and sort by date descending
      const combined = [...contactLeads, ...simulatorLeads].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setLeads(combined);
    } catch (e) {
      console.error('Error reading leads from storage:', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  // Listen to new lead events in real-time
  useEffect(() => {
    const handleNewLead = () => {
      loadLeads();
    };
    window.addEventListener('pc-new-lead', handleNewLead);
    return () => window.removeEventListener('pc-new-lead', handleNewLead);
  }, []);

  // Handle PIN authentication
  const handlePinSubmit = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('pc_admin_pin') || DEFAULT_PIN;
    if (pinInput.trim() === storedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pc_admin_auth', 'true');
      setPinError(false);
      setPinInput('');
      loadLeads();
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pc_admin_auth');
    onClose();
  };

  // Update lead status
  const handleStatusChange = (leadId, newStatus) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);

    const contactOnly = updated.filter(l => l.sourceType === 'contact');
    const simOnly = updated.filter(l => l.sourceType === 'simulator');

    localStorage.setItem('pc_contact_leads', JSON.stringify(contactOnly));
    localStorage.setItem('pc_simulator_leads', JSON.stringify(simOnly));
  };

  // Delete lead
  const handleDeleteLead = (leadId) => {
    if (!window.confirm('¿Seguro que deseás eliminar esta consulta de la lista?')) return;
    const updated = leads.filter(l => l.id !== leadId);
    setLeads(updated);

    const contactOnly = updated.filter(l => l.sourceType === 'contact');
    const simOnly = updated.filter(l => l.sourceType === 'simulator');

    localStorage.setItem('pc_contact_leads', JSON.stringify(contactOnly));
    localStorage.setItem('pc_simulator_leads', JSON.stringify(simOnly));
  };

  // Clear all leads
  const handleClearAll = () => {
    if (!window.confirm('¿Estás seguro de que deseás BORRAR TODAS las consultas guardadas? Esta acción no se puede deshacer.')) return;
    localStorage.removeItem('pc_contact_leads');
    localStorage.removeItem('pc_simulator_leads');
    setLeads([]);
  };

  // Create sample lead for testing
  const handleCreateSampleLead = () => {
    const sample = {
      id: `sample_${Date.now()}`,
      name: 'Carlos Benítez',
      businessName: 'Ferretería & Pinturería El Triángulo',
      phone: '11 5566-7788',
      service: 'Todo lo anterior (Web + Google + WhatsApp)',
      message: 'Hola! Quiero renovar la ficha de Google y armar una web con catálogo de herramientas.',
      submittedAt: new Date().toISOString(),
      status: 'nuevo'
    };
    const current = JSON.parse(localStorage.getItem('pc_contact_leads') || '[]');
    current.unshift(sample);
    localStorage.setItem('pc_contact_leads', JSON.stringify(current));
    loadLeads();
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No hay consultas registradas para exportar.');
      return;
    }

    const headers = ['Fecha', 'Origen', 'Nombre', 'Negocio', 'WhatsApp', 'Servicio', 'Mensaje', 'Estado'];
    const rows = leads.map(l => [
      `"${new Date(l.date).toLocaleString('es-AR')}"`,
      `"${l.sourceLabel || l.sourceType}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.businessName || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status || 'nuevo'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `consultas_primera_cuadra_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Test Email to primeracuadraweb@gmail.com
  const handleSendTestEmail = async () => {
    setIsSendingTestEmail(true);
    setTestEmailStatus(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: '✅ Prueba de Conexión de Email - Primera Cuadra',
          _template: 'table',
          _captcha: 'false',
          Estado: 'Conexión verificada exitosamente',
          Destino: NOTIFICATION_EMAIL,
          Fecha_Prueba: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
          Nota: 'Si recibiste este correo, significa que el sistema de recepción de consultas de Primera Cuadra está funcionando perfectamente.'
        })
      });

      if (response.ok) {
        setTestEmailStatus('success');
      } else {
        setTestEmailStatus('error');
      }
    } catch (err) {
      console.error('Error sending test email:', err);
      setTestEmailStatus('error');
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  // Open direct WhatsApp chat with the lead
  const openWhatsApp = (lead) => {
    const rawPhone = (lead.phone || '').replace(/\D/g, '');
    let cleanPhone = rawPhone;
    if (cleanPhone.startsWith('15')) {
      cleanPhone = '11' + cleanPhone.slice(2);
    }
    if (cleanPhone.length === 10) {
      cleanPhone = '549' + cleanPhone;
    } else if (cleanPhone.startsWith('54') && !cleanPhone.startsWith('549')) {
      cleanPhone = '549' + cleanPhone.slice(2);
    }

    const message = encodeURIComponent(
      `¡Hola ${lead.name || ''}! Te escribo desde Primera Cuadra por la consulta que nos dejaste sobre "${lead.businessName || 'tu negocio'}". ¿Cómo estás?`
    );

    window.open(`https://wa.me/${cleanPhone || '5491128779641'}?text=${message}`, '_blank');
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      // Type filter
      if (filterType === 'contact' && l.sourceType !== 'contact') return false;
      if (filterType === 'simulator' && l.sourceType !== 'simulator') return false;
      if (filterType === 'new' && l.status !== 'nuevo') return false;

      // Status filter
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = (l.name || '').toLowerCase().includes(query);
        const bizMatch = (l.businessName || '').toLowerCase().includes(query);
        const phoneMatch = (l.phone || '').toLowerCase().includes(query);
        const serviceMatch = (l.service || '').toLowerCase().includes(query);
        if (!nameMatch && !bizMatch && !phoneMatch && !serviceMatch) return false;
      }

      return true;
    });
  }, [leads, filterType, statusFilter, searchQuery]);

  // Counts
  const newCount = leads.filter(l => l.status === 'nuevo').length;
  const contactCount = leads.filter(l => l.sourceType === 'contact').length;
  const simCount = leads.filter(l => l.sourceType === 'simulator').length;

  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-container" onClick={e => e.stopPropagation()}>
        
        {/* ====================================================================
            VIEW 1: PIN AUTHENTICATION REQUIRED
            ==================================================================== */}
        {!isAuthenticated ? (
          <div className="admin-auth-card">
            <div className="admin-auth-icon-circle">
              <Lock size={28} className="text-purple-accent" />
            </div>

            <h3 className="admin-auth-title">Acceso de Administración</h3>
            <p className="admin-auth-desc">
              Ingresá el PIN de seguridad para consultar las consultas recibidas de la web.
            </p>

            <form onSubmit={handlePinSubmit} className="admin-auth-form">
              <div className="admin-pin-input-group">
                <input 
                  type="password" 
                  maxLength={6}
                  placeholder="PIN (por defecto 1234)"
                  value={pinInput}
                  onChange={e => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  autoFocus
                  className={`admin-pin-field ${pinError ? 'error' : ''}`}
                />
              </div>

              {pinError && (
                <div className="admin-pin-error-msg">
                  <AlertCircle size={15} />
                  <span>PIN incorrecto. Intentá con <strong>1234</strong>.</span>
                </div>
              )}

              <div className="admin-auth-actions">
                <button type="submit" className="btn-admin-primary">
                  <Unlock size={17} />
                  <span>Ingresar al Panel</span>
                </button>
                <button type="button" onClick={onClose} className="btn-admin-cancel">
                  Cancelar
                </button>
              </div>

              <div className="admin-auth-hint">
                <span>PIN inicial de fábrica: <code>1234</code></span>
              </div>
            </form>
          </div>
        ) : (
          /* ====================================================================
              VIEW 2: FULL ADMIN DASHBOARD
              ==================================================================== */
          <div className="admin-dashboard-layout">
            {/* Top Bar Header */}
            <div className="admin-dashboard-header">
              <div className="admin-header-title-row">
                <div className="admin-badge-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h2 className="admin-panel-heading">Panel de Consultas & Leads</h2>
                  <div className="admin-email-tag">
                    <Mail size={13} />
                    <span>Conectado a: <strong>{NOTIFICATION_EMAIL}</strong></span>
                    <span className="email-status-dot" title="Notificaciones activas">● Activo</span>
                  </div>
                </div>
              </div>

              <div className="admin-header-controls">
                <button 
                  type="button" 
                  onClick={handleSendTestEmail} 
                  disabled={isSendingTestEmail}
                  className="btn-admin-header-action"
                  title="Enviar correo de prueba a primeracuadraweb@gmail.com"
                >
                  <Send size={14} />
                  <span>{isSendingTestEmail ? 'Enviando...' : 'Probar Email'}</span>
                </button>

                <button 
                  type="button" 
                  onClick={handleExportCSV} 
                  className="btn-admin-header-action"
                  title="Descargar lista de contactos en formato Excel/CSV"
                >
                  <Download size={14} />
                  <span>Exportar CSV</span>
                </button>

                <button 
                  type="button" 
                  onClick={handleLogout} 
                  className="btn-admin-logout"
                  title="Cerrar sesión"
                >
                  Salir
                </button>

                <button 
                  type="button" 
                  onClick={onClose} 
                  className="btn-admin-close" 
                  aria-label="Cerrar panel"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Test Email Alert Notification Banner */}
            {testEmailStatus === 'success' && (
              <div className="admin-alert-banner success">
                <CheckCircle2 size={16} />
                <span>
                  ¡Correo de prueba enviado con éxito a <strong>{NOTIFICATION_EMAIL}</strong>! 
                  Revisá tu bandeja de entrada (o Spam en el primer envío).
                </span>
                <button type="button" onClick={() => setTestEmailStatus(null)} className="alert-close-btn">×</button>
              </div>
            )}

            {testEmailStatus === 'error' && (
              <div className="admin-alert-banner error">
                <AlertCircle size={16} />
                <span>
                  Ocurrió un error al despachar el correo de prueba. Verificá tu conexión a Internet.
                </span>
                <button type="button" onClick={() => setTestEmailStatus(null)} className="alert-close-btn">×</button>
              </div>
            )}

            {/* Metrics Counters Bar */}
            <div className="admin-metrics-bar">
              <div 
                className={`metric-chip ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                <span className="metric-number">{leads.length}</span>
                <span className="metric-label">Total Consultas</span>
              </div>

              <div 
                className={`metric-chip alert ${filterType === 'new' ? 'active' : ''}`}
                onClick={() => setFilterType('new')}
              >
                <span className="metric-number">{newCount}</span>
                <span className="metric-label">Nuevas sin atender</span>
              </div>

              <div 
                className={`metric-chip ${filterType === 'contact' ? 'active' : ''}`}
                onClick={() => setFilterType('contact')}
              >
                <span className="metric-number">{contactCount}</span>
                <span className="metric-label">Formulario Web</span>
              </div>

              <div 
                className={`metric-chip ${filterType === 'simulator' ? 'active' : ''}`}
                onClick={() => setFilterType('simulator')}
              >
                <span className="metric-number">{simCount}</span>
                <span className="metric-label">Simulador 3-en-1</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="admin-toolbar">
              <div className="admin-search-box">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Buscar por cliente, negocio, teléfono o servicio..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="search-clear-btn">
                    ×
                  </button>
                )}
              </div>

              <div className="admin-filter-selectors">
                <select 
                  value={statusFilter} 
                  onChange={e => setStatusFilter(e.target.value)}
                  className="admin-select-filter"
                >
                  <option value="all">Todos los estados</option>
                  <option value="nuevo">🟡 Nuevos</option>
                  <option value="contactado">🟢 Contactados</option>
                  <option value="negociacion">🔵 En Negociación</option>
                  <option value="cerrado">🟣 Cerrados</option>
                </select>

                <button 
                  type="button" 
                  onClick={loadLeads} 
                  className="btn-admin-refresh" 
                  title="Recargar consultas"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>

            {/* Leads List Body */}
            <div className="admin-leads-list-scroll">
              {filteredLeads.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="empty-icon-wrap">
                    <MessageSquare size={34} />
                  </div>
                  <h4>No se encontraron consultas</h4>
                  <p>
                    {leads.length === 0 
                      ? 'Aún no recibiste consultas o se borraron las anteriores. Podés enviar una prueba desde el formulario o generar un ejemplo.'
                      : 'Ninguna consulta coincide con el filtro o búsqueda actual.'}
                  </p>
                  {leads.length === 0 && (
                    <button type="button" onClick={handleCreateSampleLead} className="btn-admin-primary sm">
                      <Sparkles size={15} />
                      <span>Generar consulta de ejemplo</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="admin-leads-grid">
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className={`admin-lead-card status-${lead.status || 'nuevo'}`}>
                      {/* Top Header of Card */}
                      <div className="lead-card-header">
                        <div className="lead-source-tag">
                          <span className={`source-pill ${lead.sourceType}`}>
                            {lead.sourceLabel}
                          </span>
                          <span className="lead-time">
                            <Clock size={12} />
                            {new Date(lead.date).toLocaleString('es-AR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>

                        {/* Status Select */}
                        <div className="lead-status-wrapper">
                          <select 
                            value={lead.status || 'nuevo'} 
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`lead-status-select ${lead.status || 'nuevo'}`}
                          >
                            <option value="nuevo">🟡 Nuevo</option>
                            <option value="contactado">🟢 Contactado</option>
                            <option value="negociacion">🔵 En negociación</option>
                            <option value="cerrado">🟣 Cerrado</option>
                          </select>
                        </div>
                      </div>

                      {/* Main Client Info */}
                      <div className="lead-card-body">
                        <div className="lead-client-row">
                          <div className="client-avatar-sq">
                            <User size={18} />
                          </div>
                          <div>
                            <h4 className="client-name">{lead.name || 'Sin nombre especificado'}</h4>
                            <div className="client-business">
                              <Building2 size={13} />
                              <span>{lead.businessName || 'Negocio no especificado'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Contact & Service */}
                        <div className="lead-details-table">
                          <div className="detail-row">
                            <span className="detail-label">Teléfono / WA:</span>
                            <strong className="detail-val">{lead.phone || 'No indicado'}</strong>
                          </div>

                          <div className="detail-row">
                            <span className="detail-label">Servicio:</span>
                            <span className="detail-badge-service">{lead.service || 'Interés general'}</span>
                          </div>

                          {lead.rubro && (
                            <div className="detail-row">
                              <span className="detail-label">Rubro & Ciudad:</span>
                              <span className="detail-val">{lead.rubro} • {lead.city || ''}</span>
                            </div>
                          )}

                          {lead.message && (
                            <div className="detail-message-box">
                              <span className="message-label">Mensaje del cliente:</span>
                              <p className="message-content">"{lead.message}"</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions of Card */}
                      <div className="lead-card-actions">
                        <button 
                          type="button" 
                          onClick={() => openWhatsApp(lead)} 
                          className="btn-lead-wa"
                          title="Contactar al cliente por WhatsApp de inmediato"
                        >
                          <MessageSquare size={15} />
                          <span>Contactar por WhatsApp</span>
                        </button>

                        <button 
                          type="button" 
                          onClick={() => handleDeleteLead(lead.id)} 
                          className="btn-lead-delete" 
                          title="Eliminar consulta"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Footer Info */}
            <div className="admin-dashboard-footer">
              <div className="footer-info-text">
                <span>Las consultas quedan registradas localmente en el navegador y se envían copia a <strong>{NOTIFICATION_EMAIL}</strong>.</span>
              </div>
              {leads.length > 0 && (
                <button type="button" onClick={handleClearAll} className="btn-admin-clear-all">
                  <Trash2 size={13} />
                  <span>Borrar historial completo</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
