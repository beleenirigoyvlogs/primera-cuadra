import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import CustomDevelopmentPage from './pages/CustomDevelopmentPage';
import SimulatorPage from './pages/SimulatorPage';
import BusinessDemoSitePage from './pages/BusinessDemoSitePage';

export function render(url) {
  let appHtml = '';
  let meta = {
    title: 'Páginas web, Google Maps y WhatsApp para comercios | Primera Cuadra',
    description: 'Páginas web profesionales, Google Maps y WhatsApp Business para comercios locales. Que te encuentren, te conozcan y te contacten.',
    canonical: 'https://primeracuadra.com.ar/',
    ogImage: 'https://primeracuadra.com.ar/og-image.png'
  };

  const cleanUrl = url.split('?')[0].split('#')[0];

  if (cleanUrl === '/' || cleanUrl === '/index.html' || cleanUrl === '') {
    appHtml = renderToString(<App />);
  } else if (cleanUrl.startsWith('/desarrollo-a-medida')) {
    appHtml = renderToString(<CustomDevelopmentPage />);
    meta.title = 'Desarrollo a medida: apps y sistemas de venta | Primera Cuadra';
    meta.description = 'Desarrollo de aplicaciones móviles y sistemas de punto de venta (POS) con inventario y facturación local.';
    meta.canonical = 'https://primeracuadra.com.ar/desarrollo-a-medida';
  } else if (cleanUrl.startsWith('/simulador')) {
    appHtml = renderToString(<SimulatorPage />);
    meta.title = 'Simulador de Presencia Digital | Primera Cuadra';
    meta.description = 'Probá en tiempo real cómo se vería tu negocio en una página web mobile-first, ficha de Google Maps y WhatsApp Business.';
    meta.canonical = 'https://primeracuadra.com.ar/simulador';
  } else if (cleanUrl.startsWith('/ejemplos/parrilla')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="parrilla" isProposal={false} />);
    meta.title = 'El Fogón de Tigre • Cortes a las brasas y pastas caseras';
    meta.description = 'Ejemplo navegable de página web para parrillas y bodegones diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/parrilla';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/parrilla/hero.webp';
  } else if (cleanUrl.startsWith('/ejemplos/barberia')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="barberia" isProposal={false} />);
    meta.title = 'Barber Studio 96 • Cortes clásicos y degradé moderno';
    meta.description = 'Ejemplo navegable de página web para barberías y salones diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/barberia';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/barberia/hero.webp';
  } else if (cleanUrl.startsWith('/ejemplos/taller')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="taller" isProposal={false} />);
    meta.title = 'Mecánica Integral Álvarez • Diagnóstico computarizado e inyección';
    meta.description = 'Ejemplo navegable de página web para talleres mecánicos diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/taller';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/taller/hero.webp';
  } else if (cleanUrl.startsWith('/ejemplos/dental')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="dental" isProposal={false} />);
    meta.title = 'Centro Odontológico Delta • Odontología integral e implantes';
    meta.description = 'Ejemplo navegable de página web para consultorios odontológicos diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/dental';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/dental/hero.webp';
  } else {
    appHtml = renderToString(<NotFoundPage />);
    meta.title = 'Página no encontrada (404) | Primera Cuadra';
    meta.description = 'La página solicitada no fue encontrada en Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/404';
  }

  return { html: appHtml, meta };
}

