import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloatingBtn from '../components/WhatsAppFloatingBtn';
import { Compass, Home, MessageSquare, ArrowLeft } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

export default function NotFoundPage() {
  const belenWhatsapp = '5491128779641';
  const wa404Msg = encodeURIComponent(
    '¡Hola Belén! Estaba navegando en Primera Cuadra y no encontré lo que buscaba. ¿Podrías ayudarme?'
  );

  useEffect(() => {
    document.title = 'Página no encontrada (404) | Primera Cuadra';
    let metaRobots = document.querySelector('meta[name="robots"]');
    const createdRobots = !metaRobots;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    const previousRobots = metaRobots.content;
    metaRobots.content = 'noindex, nofollow';

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      if (createdRobots) {
        metaRobots.remove();
      } else {
        metaRobots.content = previousRobots;
      }
    };
  }, []);

  return (
    <div className="not-found-page-root">
      <Navbar />

      <main className="not-found-main-content">
        <div className="container">
          <div className="not-found-card">
            <div className="not-found-icon-wrap">
              <Compass size={48} className="not-found-compass-icon" />
            </div>

            <span className="not-found-code-badge">ERROR 404</span>

            <h1 className="not-found-title">
              Página no encontrada
            </h1>

            <p className="not-found-desc">
              La dirección que ingresaste no existe, cambió de lugar o fue modificada.
              Podés regresar a la página principal o escribirme directamente si buscabas algo específico.
            </p>

            <div className="not-found-actions">
              <a href="/" className="btn-hostinger-primary">
                <Home size={17} />
                <span>Volver al inicio</span>
              </a>

              <a 
                href={`https://wa.me/${belenWhatsapp}?text=${wa404Msg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hostinger-outline"
                onClick={() => trackWhatsAppClick('404_page_wa', 'Boton_WhatsApp_404')}
              >
                <MessageSquare size={17} />
                <span>Escribirme por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingBtn />
    </div>
  );
}

