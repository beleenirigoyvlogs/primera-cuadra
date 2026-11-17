import React from 'react';

export default function StepsV3() {
  const steps = [
    { 
      n: '01', 
      time: '15 minutos', 
      title: 'Me contás tu negocio', 
      text: 'Te mando cuatro preguntas por WhatsApp y me pasás fotos, servicios, precios y dirección.' 
    },
    { 
      n: '02', 
      time: '48 h a 4 días', 
      title: 'Diseño y armo todo', 
      text: 'Diseño tu web, la optimizo para Google y configuro tu ficha de Maps y tu WhatsApp Business.' 
    },
    { 
      n: '03', 
      time: 'Entrega', 
      title: 'Lo revisamos juntos', 
      text: 'Te muestro cómo funciona todo, te entrego los accesos y pagás el resto cuando estás conforme.' 
    }
  ];

  return (
    <section id="pasos" style={{ background: '#18161E', color: '#F4F2EC' }}>
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: 'clamp(64px, 7vw, 96px) 24px',
          boxSizing: 'border-box'
        }}
      >
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
          Método de trabajo
        </p>
        <h2 
          className="pc-reveal-u"
          style={{ 
            margin: '10px 0 0', 
            fontFamily: "'Oswald', sans-serif", 
            fontWeight: 600, 
            fontSize: 'clamp(34px, 4vw, 54px)', 
            lineHeight: 1.05, 
            textTransform: 'uppercase' 
          }}
        >
          Tu web lista en tres pasos
        </h2>

        <ol 
          style={{ 
            listStyle: 'none', 
            margin: '44px 0 0', 
            padding: 0, 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '40px 48px' 
          }}
        >
          {steps.map((p, idx) => (
            <li 
              key={p.n} 
              className="pc-reveal-u" 
              style={{ 
                borderTop: '1px solid #34313C', 
                paddingTop: '28px',
                '--pc-delay': `${idx * 0.12}s`,
                transitionDelay: `${idx * 0.12}s`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
                <span 
                  style={{ 
                    fontFamily: "'Oswald', sans-serif", 
                    fontSize: '64px', 
                    fontWeight: 600, 
                    lineHeight: 1, 
                    color: '#A48BFF' 
                  }}
                >
                  {p.n}
                </span>
                <span style={{ fontSize: '14px', color: '#A9A6B4' }}>
                  {p.time}
                </span>
              </div>
              <h3 
                style={{ 
                  margin: '18px 0 10px', 
                  fontFamily: "'Oswald', sans-serif", 
                  fontSize: '26px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase' 
                }}
              >
                {p.title}
              </h3>
              <p style={{ margin: 0, color: '#CFCBD8', fontSize: '15px', lineHeight: 1.6 }}>
                {p.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

