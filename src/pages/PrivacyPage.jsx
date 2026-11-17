import React, { useEffect } from 'react';
import NavbarV3 from '../components/v3/NavbarV3';
import FooterV3, { CONTACT_EMAIL } from '../components/v3/FooterV3';
import WhatsAppFloatingBtn from '../components/WhatsAppFloatingBtn';
import { useTheme } from '../hooks/useTheme';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const { isDark } = useTheme();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Política de Privacidad | Primera Cuadra';
  }, []);

  const bgLight = isDark ? '#1E1C24' : '#EFEDE8';
  const cardBg = isDark ? '#26232E' : '#F6F5F1';
  const ink = isDark ? '#F1EEE7' : '#1B1B1B';
  const muted = isDark ? '#B3AFA6' : '#55524C';
  const line = isDark ? '#34313C' : '#D4CFC4';

  return (
    <div 
      className="primera-cuadra-v3-root privacy-page"
      style={{ 
        width: '100%', 
        minHeight: '100vh', 
        fontFamily: "'Poppins', system-ui, sans-serif",
        background: bgLight,
        color: ink,
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <NavbarV3 />

      <main>
        {/* Header Section */}
        <section 
          style={{ 
            background: '#18161E', 
            color: '#F4F2EC', 
            padding: 'clamp(48px, 6vw, 80px) 24px', 
            position: 'relative', 
            overflow: 'hidden' 
          }}
        >
          <div 
            style={{ 
              maxWidth: '840px', 
              margin: '0 auto', 
              boxSizing: 'border-box' 
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <a 
                href="/" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: '#B3AFA6', 
                  textDecoration: 'none', 
                  fontSize: '14px', 
                  fontFamily: "'Oswald', sans-serif", 
                  letterSpacing: '.06em', 
                  textTransform: 'uppercase' 
                }}
              >
                <ArrowLeft size={16} />
                <span>Volver al inicio</span>
              </a>
            </div>

            <p 
              className="pc-reveal-l"
              style={{ 
                margin: 0, 
                fontFamily: "'Oswald', sans-serif", 
                fontSize: '15px', 
                letterSpacing: '.14em', 
                textTransform: 'uppercase', 
                color: '#A48BFF' 
              }}
            >
              LEGAL
            </p>

            <h1 
              className="pc-reveal-u"
              style={{ 
                margin: '12px 0 0', 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 600, 
                fontSize: 'clamp(32px, 4.5vw, 56px)', 
                lineHeight: 1.05, 
                textTransform: 'uppercase',
                color: '#FFFFFF'
              }}
            >
              POLÍTICA DE PRIVACIDAD
            </h1>

            <p 
              className="pc-reveal-u"
              style={{ 
                margin: '16px 0 0', 
                fontSize: '14px', 
                color: '#B3AFA6' 
              }}
            >
              Última actualización: 17 de noviembre de 2026.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section 
          style={{ 
            maxWidth: '840px', 
            margin: '0 auto', 
            padding: 'clamp(48px, 6vw, 72px) 24px',
            boxSizing: 'border-box',
            lineHeight: 1.7,
            fontSize: '16px'
          }}
        >
          <div 
            className="pc-reveal-u"
            style={{ 
              background: cardBg, 
              border: `1px solid ${line}`, 
              borderRadius: '8px', 
              padding: 'clamp(28px, 5vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}
          >
            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 12px' }}>
                Quién es responsable de tus datos
              </h2>
              <p style={{ margin: 0, color: muted }}>
                Belén Irigoy, titular de Primera Cuadra, con domicilio en Tigre, provincia de Buenos Aires. Contacto: {CONTACT_EMAIL} [COMPLETAR: mail con dominio, ej. hola@primeracuadra.com.ar].
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 12px' }}>
                Qué datos se recopilan
              </h2>
              <ul style={{ margin: 0, paddingLeft: '20px', color: muted, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <strong style={{ color: ink }}>Los que vos me mandás por WhatsApp o por mail:</strong> nombre, teléfono, datos de tu negocio y lo que quieras contarme. Los uso solo para responderte, armarte una propuesta y, si trabajamos juntos, hacer tu proyecto.
                </li>
                <li>
                  <strong style={{ color: ink }}>Datos de navegación anónimos:</strong> esta web usa Google Tag Manager y herramientas de medición de Google, que usan cookies para saber cuántas personas visitan la web, desde qué dispositivo y qué secciones miran. Estos datos no te identifican personalmente.
                </li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 12px' }}>
                Qué no hago con tus datos
              </h2>
              <p style={{ margin: 0, color: muted }}>
                No los vendo, no los cedo a terceros y no te agrego a listas de difusión sin tu permiso.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 12px' }}>
                Tus derechos
              </h2>
              <p style={{ margin: '0 0 12px', color: muted }}>
                Podés pedirme en cualquier momento que te muestre, corrija o borre los datos que tengo tuyos, escribiendo al mail de contacto. Lo hago sin costo.
              </p>
              <p style={{ margin: 0, color: muted, fontSize: '15px' }}>
                De acuerdo con la Ley 25.326 de Protección de los Datos Personales, tenés derecho a acceder a tus datos en forma gratuita a intervalos no inferiores a seis meses, salvo que acredites un interés legítimo. La Agencia de Acceso a la Información Pública, órgano de control de esa ley, atiende las denuncias y reclamos relacionados con el incumplimiento de las normas sobre protección de datos personales.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 12px' }}>
                Cookies
              </h2>
              <p style={{ margin: 0, color: muted }}>
                Podés bloquear o borrar las cookies desde la configuración de tu navegador. La web va a seguir funcionando igual.
              </p>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
      <WhatsAppFloatingBtn />
    </div>
  );
}
