import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import CustomDevelopmentPage from './pages/CustomDevelopmentPage';
import SimulatorPage from './pages/SimulatorPage';
import ShowroomPage from './pages/ShowroomPage';
import BusinessDemoSitePage from './pages/BusinessDemoSitePage';
import LocalLandingPage, { LOCAL_ZONES } from './pages/LocalLandingPage';
import NicheLandingPage from './pages/NicheLandingPage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPage from './pages/PrivacyPage';
import { RUBROS_DATA } from './data/rubrosData';
import { BLOG_POSTS } from './data/blogData';

export function render(url) {
  let appHtml = '';
  let meta = {
    title: 'Diseño de páginas web en Tigre, Zona Norte y CABA | Primera Cuadra',
    description: 'Diseño de páginas web para negocios, profesionales y empresas en Tigre, Zona Norte y CABA. Web propia, Google Maps y WhatsApp. Entrega en 4 días.',
    canonical: 'https://primeracuadra.com.ar/',
    ogImage: 'https://primeracuadra.com.ar/og-image.png'
  };

  const cleanUrl = url.split('?')[0].split('#')[0];

  if (cleanUrl === '/' || cleanUrl === '/index.html' || cleanUrl === '') {
    appHtml = renderToString(<App initialPath="/" />);
  } else if (cleanUrl === '/diseno-web-tigre') {
    appHtml = renderToString(<LocalLandingPage zoneKey="tigre" />);
    meta.title = LOCAL_ZONES.tigre.title;
    meta.description = LOCAL_ZONES.tigre.description;
    meta.canonical = 'https://primeracuadra.com.ar/diseno-web-tigre';
  } else if (cleanUrl === '/diseno-web-zona-norte') {
    appHtml = renderToString(<LocalLandingPage zoneKey="zona-norte" />);
    meta.title = LOCAL_ZONES['zona-norte'].title;
    meta.description = LOCAL_ZONES['zona-norte'].description;
    meta.canonical = 'https://primeracuadra.com.ar/diseno-web-zona-norte';
  } else if (cleanUrl === '/diseno-web-caba') {
    appHtml = renderToString(<LocalLandingPage zoneKey="caba" />);
    meta.title = LOCAL_ZONES.caba.title;
    meta.description = LOCAL_ZONES.caba.description;
    meta.canonical = 'https://primeracuadra.com.ar/diseno-web-caba';
  } else if (cleanUrl === '/pagina-web-para-peluquerias') {
    appHtml = renderToString(<NicheLandingPage rubroKey="peluquerias" />);
    meta.title = RUBROS_DATA.peluquerias.title;
    meta.description = RUBROS_DATA.peluquerias.metaDescription;
    meta.canonical = 'https://primeracuadra.com.ar/pagina-web-para-peluquerias';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/barberia/og-image.jpg';
  } else if (cleanUrl === '/pagina-web-para-talleres-mecanicos') {
    appHtml = renderToString(<NicheLandingPage rubroKey="talleres-mecanicos" />);
    meta.title = RUBROS_DATA['talleres-mecanicos'].title;
    meta.description = RUBROS_DATA['talleres-mecanicos'].metaDescription;
    meta.canonical = 'https://primeracuadra.com.ar/pagina-web-para-talleres-mecanicos';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/taller/og-image.jpg';
  } else if (cleanUrl === '/pagina-web-para-restaurantes') {
    appHtml = renderToString(<NicheLandingPage rubroKey="restaurantes" />);
    meta.title = RUBROS_DATA.restaurantes.title;
    meta.description = RUBROS_DATA.restaurantes.metaDescription;
    meta.canonical = 'https://primeracuadra.com.ar/pagina-web-para-restaurantes';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/parrilla/og-image.jpg';
  } else if (cleanUrl === '/pagina-web-para-consultorios') {
    appHtml = renderToString(<NicheLandingPage rubroKey="consultorios" />);
    meta.title = RUBROS_DATA.consultorios.title;
    meta.description = RUBROS_DATA.consultorios.metaDescription;
    meta.canonical = 'https://primeracuadra.com.ar/pagina-web-para-consultorios';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/dental/og-image.jpg';
  } else if (cleanUrl === '/blog' || cleanUrl === '/blog/') {
    appHtml = renderToString(<BlogIndexPage />);
    meta.title = 'Blog: consejos de diseño web y Google Maps | Primera Cuadra';
    meta.description = 'Artículos y guías prácticas sobre diseño de páginas web, posicionamiento en Google Maps e Instagram para negocios.';
    meta.canonical = 'https://primeracuadra.com.ar/blog';
  } else if (cleanUrl.startsWith('/blog/')) {
    const postSlug = cleanUrl.replace('/blog/', '').replace(/\/$/, '');
    const post = BLOG_POSTS[postSlug];
    if (post) {
      appHtml = renderToString(<BlogPostPage slug={postSlug} />);
      meta.title = post.title;
      meta.description = post.metaDescription;
      meta.canonical = `https://primeracuadra.com.ar/blog/${postSlug}`;
    } else {
      appHtml = renderToString(<NotFoundPage />);
      meta.title = 'Artículo no encontrado (404) | Primera Cuadra';
      meta.description = 'El artículo solicitado no existe.';
      meta.canonical = 'https://primeracuadra.com.ar/404';
    }
  } else if (cleanUrl === '/privacidad' || cleanUrl === '/privacidad/') {
    appHtml = renderToString(<PrivacyPage />);
    meta.title = 'Política de Privacidad | Primera Cuadra';
    meta.description = 'Política de privacidad y protección de datos personales de Primera Cuadra conforme a la Ley 25.326.';
    meta.canonical = 'https://primeracuadra.com.ar/privacidad';
  } else if (cleanUrl.startsWith('/desarrollo-a-medida')) {
    appHtml = renderToString(<CustomDevelopmentPage />);
    meta.title = 'Desarrollo a medida: apps y sistemas de venta | Primera Cuadra';
    meta.description = 'Programo sistemas de punto de venta (POS), control de stock y aplicaciones móviles pensados para tu negocio. Sin abonos mensuales y con presupuesto cerrado.';
    meta.canonical = 'https://primeracuadra.com.ar/desarrollo-a-medida';
  } else if (cleanUrl.startsWith('/simulador')) {
    appHtml = renderToString(<SimulatorPage />);
    meta.title = 'Simulador de Diseño Web | Primera Cuadra';
    meta.description = 'Probá en tiempo real cómo se vería tu negocio en una página web mobile-first, ficha de Google Maps y WhatsApp Business.';
    meta.canonical = 'https://primeracuadra.com.ar/simulador';
  } else if (cleanUrl === '/showroom-privado' || cleanUrl === '/showroom-privado/' || cleanUrl === '/panel-demos' || cleanUrl === '/panel-demos/') {
    appHtml = renderToString(<ShowroomPage />);
    meta.title = 'Showroom Privado | Primera Cuadra';
    meta.description = 'Catálogo interactivo de demostración de plantillas web.';
    meta.canonical = 'https://primeracuadra.com.ar/showroom-privado';
    meta.noIndex = true;
  } else if (cleanUrl.startsWith('/ejemplos/parrilla')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="parrilla" isProposal={false} />);
    meta.title = 'El Fogón de Tigre • Cortes a las brasas y pastas caseras';
    meta.description = 'Ejemplo navegable de página web para parrillas y bodegones diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/parrilla';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/parrilla/og-image.jpg';
  } else if (cleanUrl.startsWith('/ejemplos/barberia')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="barberia" isProposal={false} />);
    meta.title = 'Barber Studio 96 • Cortes clásicos y degradé moderno';
    meta.description = 'Ejemplo navegable de página web para barberías y salones diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/barberia';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/barberia/og-image.jpg';
  } else if (cleanUrl.startsWith('/ejemplos/taller')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="taller" isProposal={false} />);
    meta.title = 'Mecánica Integral Álvarez • Diagnóstico computarizado e inyección';
    meta.description = 'Ejemplo navegable de página web para talleres mecánicos diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/taller';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/taller/og-image.jpg';
  } else if (cleanUrl.startsWith('/ejemplos/dental')) {
    appHtml = renderToString(<BusinessDemoSitePage slug="dental" isProposal={false} />);
    meta.title = 'Centro Odontológico Delta • Odontología integral e implantes';
    meta.description = 'Ejemplo navegable de página web para consultorios odontológicos diseñado por Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/ejemplos/dental';
    meta.ogImage = 'https://primeracuadra.com.ar/demos/dental/og-image.jpg';
  } else {
    appHtml = renderToString(<NotFoundPage />);
    meta.title = 'Página no encontrada (404) | Primera Cuadra';
    meta.description = 'La página solicitada no fue encontrada en Primera Cuadra.';
    meta.canonical = 'https://primeracuadra.com.ar/404';
  }

  return { html: appHtml, meta };
}
