/**
 * Dispatcher de notificaciones por email para Primera Cuadra
 * Soporta Web3Forms (recomendado, alta disponibilidad), FormSubmit (fallback) y enlace directo a Gmail.
 */

export const NOTIFICATION_EMAIL = 'primeracuadraweb@gmail.com';

/**
 * Obtener la clave de Web3Forms guardada localmente o por variable de entorno
 */
export function getWeb3FormsKey() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('pc_web3forms_key') || import.meta.env.VITE_WEB3FORMS_KEY || '';
  }
  return '';
}

/**
 * Guardar la clave de Web3Forms
 */
export function setWeb3FormsKey(key) {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.setItem('pc_web3forms_key', key.trim());
    } else {
      localStorage.removeItem('pc_web3forms_key');
    }
  }
}

/**
 * Despachar notificación de lead
 */
export async function dispatchLeadEmail(lead) {
  const web3Key = getWeb3FormsKey();
  const leadSubject = `🔥 Nueva Consulta: ${lead.businessName || lead.name || 'Cliente'} - Primera Cuadra`;

  // 1. Si existe clave de Web3Forms, enviar prioritariamente por Web3Forms
  if (web3Key) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: leadSubject,
          from_name: 'Primera Cuadra Web',
          Nombre: lead.name || 'No especificado',
          Negocio: lead.businessName || 'No especificado',
          Telefono_WhatsApp: lead.phone || 'No especificado',
          Servicio: lead.service || 'Interés general',
          Rubro: lead.rubro || 'No especificado',
          Ciudad: lead.city || 'No especificado',
          Mensaje: lead.message || 'Sin mensaje adicional',
          Origen: lead.sourceLabel || lead.sourceType || 'Web',
          Fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
        })
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success !== false) {
        return { success: true, provider: 'Web3Forms' };
      } else {
        console.warn('Web3Forms returned non-ok:', data);
      }
    } catch (err) {
      console.warn('Error enviando con Web3Forms:', err);
    }
  }

  // 2. Intentar FormSubmit como fallback
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: leadSubject,
        _template: 'table',
        _captcha: 'false',
        Nombre: lead.name || 'No especificado',
        Negocio: lead.businessName || 'No especificado',
        Telefono_WhatsApp: lead.phone || 'No especificado',
        Servicio: lead.service || 'Interés general',
        Mensaje: lead.message || 'Sin mensaje adicional',
        Fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
        Origen: lead.sourceLabel || lead.sourceType || 'Web'
      })
    });

    if (response.ok) {
      return { success: true, provider: 'FormSubmit' };
    } else {
      const errText = await response.text().catch(() => '');
      return { 
        success: false, 
        provider: 'FormSubmit', 
        error: `Error ${response.status} del servidor FormSubmit.co` 
      };
    }
  } catch (err) {
    return { 
      success: false, 
      provider: 'FormSubmit', 
      error: err.message || 'Error de conexión' 
    };
  }
}

/**
 * Enviar email de prueba a primeracuadraweb@gmail.com
 */
export async function sendTestEmail() {
  const web3Key = getWeb3FormsKey();

  if (web3Key) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: '✅ Conexión Exitosa - Primera Cuadra Web',
          from_name: 'Primera Cuadra Admin',
          Estado: 'Conexión verificada exitosamente mediante Web3Forms',
          Destinatario: NOTIFICATION_EMAIL,
          Fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
          Nota: 'El sistema de recepción de consultas está 100% activo y configurado.'
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        return { success: true, provider: 'Web3Forms' };
      }
      return { 
        success: false, 
        provider: 'Web3Forms', 
        error: data.message || `Error ${res.status}: Clave de Web3Forms inválida` 
      };
    } catch (e) {
      return { success: false, provider: 'Web3Forms', error: e.message };
    }
  }

  // Si no hay key, intentar FormSubmit
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: '✅ Conexión Exitosa - Primera Cuadra Web',
        _template: 'table',
        _captcha: 'false',
        Estado: 'Prueba de conexión',
        Destino: NOTIFICATION_EMAIL,
        Fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
      })
    });

    if (res.ok) {
      return { success: true, provider: 'FormSubmit' };
    } else {
      return { 
        success: false, 
        provider: 'FormSubmit', 
        error: `FormSubmit.co respondió con error ${res.status} (servidor temporalmente no disponible).` 
      };
    }
  } catch (e) {
    return { 
      success: false, 
      provider: 'FormSubmit', 
      error: 'FormSubmit.co no responde o está bloqueado por el navegador.' 
    };
  }
}

/**
 * Generar enlace directo para redactar en Gmail sin servidores
 */
export function getGmailComposeUrl(lead) {
  const subject = `[Primera Cuadra] Consulta: ${lead.businessName || lead.name || 'Cliente'}`;
  const body = `CONSULTA REGISTRADA EN PRIMERA CUADRA:
=================================================
Cliente: ${lead.name || 'No especificado'}
Negocio: ${lead.businessName || 'No especificado'}
Teléfono / WhatsApp: ${lead.phone || 'No especificado'}
Servicio de Interés: ${lead.service || 'No especificado'}
${lead.rubro ? `Rubro: ${lead.rubro}\n` : ''}${lead.city ? `Zona: ${lead.city}\n` : ''}
Fecha: ${new Date(lead.date || Date.now()).toLocaleString('es-AR')}

Mensaje del cliente:
"${lead.message || 'Sin mensaje adicional'}"
=================================================
Origen: ${lead.sourceLabel || lead.sourceType || 'Formulario Web'}`;

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(NOTIFICATION_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
