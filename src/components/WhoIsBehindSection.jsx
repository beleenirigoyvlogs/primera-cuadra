import React from 'react';
import { 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Heart,
  CheckCircle2
} from 'lucide-react';

export default function WhoIsBehindSection() {
  const whatsappNumber = '5491128779641';
  const whatsappMsg = encodeURIComponent(
    '¡Hola Belén! Vi la sección "Quién está detrás" en la web de Primera Cuadra y me gustaría conversar sobre la presencia digital de mi negocio.'
  );

  return (
    <section className="who-is-behind-section" id="quien-esta-detras">
      <div className="container">
        <div className="who-behind-card reveal">
          {/* Top Kicker Tag */}
          <div className="section-kicker-tag">
            <Heart size={14} className="text-purple-icon" />
            <span>TRANSPARENCIA Y TRATO DIRECTO</span>
          </div>

          <h2 className="who-behind-title">
            Quién está detrás de <span className="highlight-purple">Primera Cuadra</span>
          </h2>

          <div className="who-behind-grid">
            {/* Left Col: Photo / Profile Card */}
            <div className="who-profile-col">
              <div className="who-avatar-container">
                <div className="who-avatar-circle" aria-label="Iniciales de Belén Irigoy">
                  <span className="who-initials-text">BI</span>
                </div>

                <div className="who-profile-info">
                  <h3 className="who-founder-name">Belén Irigoy</h3>
                  <div className="who-founder-role">Fundadora de Primera Cuadra</div>
                  
                  <div className="who-badges-list">
                    <div className="who-meta-badge">
                      <MapPin size={14} />
                      <span>Tigre, Buenos Aires</span>
                    </div>
                    <div className="who-meta-badge">
                      <ShieldCheck size={14} />
                      <span>Atención directa conmigo</span>
                    </div>
                  </div>

                  <div className="who-profile-actions">
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hostinger-primary btn-who-wa"
                      data-gtm="whatsapp_who_behind"
                    >
                      <MessageCircle size={16} />
                      <span>Hablar con Belén</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Story in First Person Singular */}
            <div className="who-story-col">
              <div className="story-quote-mark" aria-hidden="true">“</div>

              <div className="who-story-body">
                <p className="story-paragraph highlight-lead">
                  Soy Belén, de Tigre y creé Primera Cuadra con una idea simple: que cualquier negocio, sea del rubro o del tamaño que sea, tenga una presencia en Internet a la altura de lo que hace.
                </p>

                <p className="story-paragraph">
                  Comercios, profesionales, emprendimientos y empresas trabajan todos los días para dar un buen servicio. Pero cuando alguien los busca en Google, muchas veces no los encuentra, o encuentra información incompleta. Y ese cliente termina eligiendo a otro.
                </p>

                <p className="story-paragraph">
                  Por eso armé una forma clara y a un precio justo de resolverlo: tu web, tu ficha de Google y tu WhatsApp ordenados y conectados, para que te encuentren, te conozcan y te contacten. Sin tecnicismos y con atención directa conmigo de principio a fin.
                </p>
              </div>

              {/* Guarantees Pillars */}
              <div className="who-commitments-grid">
                <div className="commitment-chip">
                  <CheckCircle2 size={16} className="text-purple-icon" />
                  <span>Atención 100% directa conmigo</span>
                </div>
                <div className="commitment-chip">
                  <CheckCircle2 size={16} className="text-purple-icon" />
                  <span>Sin tecnicismos ni complicaciones</span>
                </div>
                <div className="commitment-chip">
                  <CheckCircle2 size={16} className="text-purple-icon" />
                  <span>Precios claros de lanzamiento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
