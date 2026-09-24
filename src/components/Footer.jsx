import React from 'react';
import { 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Globe
} from 'lucide-react';

export default function Footer({ niche, onSelectNiche }) {
  const whatsappNumber = '5491128779641';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section-wrapper">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a href="#" className="brand-logo" style={{ marginBottom: '14px' }}>
              <img src="/logo.jpg" alt="Logo Primera Cuadra" className="brand-logo-img" />
              <div className="brand-title-wrap">
                <span className="brand-title-main">Primera <span>Cuadra</span></span>
                <span className="brand-title-tag">Páginas Web & Presencia</span>
              </div>
            </a>

            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6, marginBottom: '20px' }}>
              Diseñamos páginas web profesionales con dominio propio a tu nombre, catálogo de servicios y botón de WhatsApp, combinadas con Google Maps optimizado para que tu negocio domine su zona.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.76rem', background: '#f4f5f8', padding: '4px 10px', borderRadius: '9999px', fontWeight: 600, color: '#374151' }}>⚓ Náutica</span>
              <span style={{ fontSize: '0.76rem', background: '#f4f5f8', padding: '4px 10px', borderRadius: '9999px', fontWeight: 600, color: '#374151' }}>⚖️ Profesionales</span>
              <span style={{ fontSize: '0.76rem', background: '#f4f5f8', padding: '4px 10px', borderRadius: '9999px', fontWeight: 600, color: '#374151' }}>✂️ Peluquerías</span>
              <span style={{ fontSize: '0.76rem', background: '#f4f5f8', padding: '4px 10px', borderRadius: '9999px', fontWeight: 600, color: '#374151' }}>🏬 Comercios</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navegación</h4>
            <ul className="footer-col-links">
              <li><a href="#demostracion-en-vivo">Simulador en Vivo</a></li>
              <li><a href="#filosofia-comparativa">Comparativa & Metodología</a></li>
              <li><a href="#packs-precios">Packs & Tarifas</a></li>
              <li><a href="#comunidad-facebook">Facebook en Vivo</a></li>
              <li><a href="#calculadora-oportunidad">Calculadora de Retorno</a></li>
              <li><a href="#preguntas-frecuentes">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Deliverables summary */}
          <div>
            <h4 className="footer-col-title">Planes</h4>
            <ul className="footer-col-links">
              <li>
                <strong style={{ color: '#18181b', display: 'block' }}>PACK EXPRESS</strong>
                <span>$120.000 • Entrega en 48hs</span>
              </li>
              <li style={{ marginTop: '10px' }}>
                <strong style={{ color: '#18181b', display: 'block' }}>PACK SOLO WEB</strong>
                <span>$150.000 • Entrega en 4 días</span>
              </li>
              <li style={{ marginTop: '10px' }}>
                <strong style={{ color: '#673de6', display: 'block' }}>PACK COMPLETO CON WEB</strong>
                <span>$250.000 • Entrega en 4 días</span>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="footer-col-title">Contacto & Redes</h4>
            <p style={{ fontSize: '0.88rem', color: '#6b7280', marginBottom: '14px' }}>
              ¿Listo para llevar tu negocio a la Primera Cuadra?
            </p>
            
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola Primera Cuadra! Quisiera ponerme en contacto para conocer más sobre sus servicios.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hostinger-primary"
              style={{ padding: '10px 18px', fontSize: '0.88rem', width: '100%', justifyContent: 'center', marginBottom: '10px' }}
            >
              <MessageCircle size={16} />
              <span>Chatear por WhatsApp</span>
            </a>

            <a 
              href="https://www.facebook.com/profile.php?id=61594410424409"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                width: '100%', 
                padding: '9px 16px', 
                borderRadius: '8px', 
                background: '#eff6ff', 
                color: '#1877f2', 
                fontWeight: 700, 
                fontSize: '0.84rem', 
                textDecoration: 'none',
                border: '1px solid #dbeafe'
              }}
            >
              <span>Seguinos en Facebook</span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', fontSize: '0.8rem', color: '#6b7280' }}>
              <ShieldCheck size={16} color="#00b074" />
              <span>Garantía 50% inicio / 50% entrega</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {currentYear} Primera Cuadra. Todos los derechos reservados. Páginas web para cualquier rubro comercial.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#00b074', fontWeight: 700 }}>
            <CheckCircle2 size={15} />
            <span>Entrega garantizada en 48hs o 4 días hábiles</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
