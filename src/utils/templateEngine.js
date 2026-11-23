// Escaped HTML helper exactly as prototype
export const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
}[c]));

// ==========================================
// SOURCE TEMPLATE ENGINE (EXACT AS SIMULADOR.HTML)
// ==========================================
export const AB = `@keyframes mq{to{transform:translateX(-50%)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes kb{from{transform:scale(1)}to{transform:scale(1.18)}}@keyframes sw{from{transform:translateX(-120%)}to{transform:translateX(120%)}}@keyframes fl{50%{transform:translateY(-26px) rotate(8deg)}}@keyframes pg{to{width:100%}}@keyframes gm{to{background-position:0 60px}}@keyframes wv{to{background-position-x:-1200px}}@keyframes scan{from{top:0}to{top:100%}}
.hero2{position:relative;min-height:92vh;display:flex;align-items:flex-end;padding:14% 6% 7%;overflow:hidden}
.hero2 .bg{position:absolute;inset:0}.bgv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hc{position:relative;z-index:2;max-width:900px}.hc small{display:block;margin-bottom:16px;letter-spacing:.14em;text-transform:uppercase;font-size:.8rem}
.hc h1{font-size:clamp(2.4rem,7vw,5.6rem);line-height:1.02;margin-bottom:20px}.hc p{max-width:34em;margin-bottom:26px}
.mq{overflow:hidden;white-space:nowrap}.mq div{display:inline-block;animation:mq 30s linear infinite}.mq span{padding:0 1.2rem}.mq.b{display:none}
.rv{opacity:0;transform:translateY(46px);transition:opacity .9s,transform .9s}.rv.in{opacity:1;transform:none}
.pl{position:relative;aspect-ratio:16/9;overflow:hidden;cursor:pointer;background:#111;max-width:980px;margin:auto}.pl video{width:100%;height:100%;object-fit:cover;display:block}
.fk{position:absolute;inset:0;display:grid;place-items:center;color:#fff}
.fk::before{content:"";position:absolute;inset:-20%;background:repeating-linear-gradient(100deg,#2a2a2a 0 40px,#3a3a3a 40px 80px);animation:sw 4s linear infinite;animation-play-state:paused}
.pl.on .fk::before{animation-play-state:running}
.fk i{position:relative;width:76px;height:76px;border-radius:50%;background:#fff;transition:.3s}.fk i::after{content:"";position:absolute;left:30px;top:22px;border-left:24px solid #111;border-top:16px solid transparent;border-bottom:16px solid transparent}
.pl.on .fk i{opacity:0}.fk em{position:absolute;left:16px;bottom:22px;font-style:normal;font-size:.8rem}
.pb{position:absolute;left:0;right:0;bottom:0;height:5px;background:#fff3}.pb u{display:block;height:100%;width:0;background:#fff;animation:pg 30s linear infinite;animation-play-state:paused}.pl.on .pb u{animation-play-state:running}`;

export const SER = 'Georgia,"Times New Roman",serif';
export const SAN = '"Helvetica Neue",Helvetica,Arial,sans-serif';
export const MON = 'ui-monospace,Menlo,Consolas,monospace';
export const IMP = 'Impact,"Arial Black","Arial Narrow",sans-serif';
export const NAR = '"Arial Narrow","Franklin Gothic Medium",Arial,sans-serif';

export const K = (bg, fg, ac, ln, ln2, f, fh, tt, ls, hw, bw, r, sh, ctc, fs) => ({
  bg, fg, ac, ln, ln2, f, fh, tt, ls, hw, bw, r, sh, ctc, fs: fs || "normal"
});

export const SK = [
  K("#f4efe6", "#1a1a1a", "#8a2a1b", "#1a1a1a", "#1a1a1a14", SER, SER, "none", "-.02em", 400, "1px", "0", "none", "#f4efe6"),
  K("#ffffff", "#111", "#e30613", "#111", "#11111110", SAN, SAN, "none", "-.04em", 800, "3px", "0", "none", "#fff"),
  K("#0e0e0e", "#e9e9e9", "#c8f169", "#2c2c2c", "#ffffff12", SAN, SAN, "none", "-.03em", 300, "1px", "0", "none", "#0e0e0e"),
  K("#ffd400", "#000", "#e63946", "#000", "#00000022", NAR, IMP, "uppercase", "0", 400, "4px", "0", "6px 6px 0 #000", "#fff"),
  K("#efe2d0", "#3b2a20", "#b5532f", "#b5532f", "#b5532f22", SER, SER, "none", "0", 400, "2px", "28px", "none", "#fff6e8", "italic"),
  K("#14532d", "#f5f0dc", "#f0c04a", "#f0c04a88", "#f0c04a14", SER, SER, "uppercase", ".04em", 700, "2px", "0", "none", "#14532d"),
  K("#e8e6e1", "#1b1b1b", "#ff5a1f", "#1b1b1b", "#1b1b1b12", MON, MON, "none", "-.03em", 700, "1px", "0", "none", "#000"),
  K("#0b2545", "#eef4ff", "#ff7a59", "#3a5a8a", "#ffffff10", SAN, SER, "none", "-.01em", 700, "1px", "6px", "none", "#0b2545"),
  K("#ffffff", "#0a2a8a", "#0a2a8a", "#0a2a8a", "#0a2a8a12", NAR, NAR, "uppercase", ".02em", 800, "3px", "0", "none", "#fff"),
  K("#d8d8d4", "#111", "#111", "#111", "#00000010", NAR, NAR, "uppercase", ".01em", 700, "2px", "0", "none", "#d8d8d4"),
  K("#4a0f1f", "#f6e7d2", "#d9a441", "#d9a44199", "#d9a44114", SER, SER, "uppercase", ".08em", 400, "1px", "0", "none", "#4a0f1f"),
  K("#dff3e7", "#0c3b34", "#0f766e", "#0f766e", "#0f766e14", SAN, SAN, "none", "-.02em", 700, "2px", "22px", "none", "#fff")
];

export const SN = ["Papel", "Tinta", "Noche", "Amarillo", "Tierra", "Bosque", "Mono", "Marino", "Azulejo", "Concreto", "Vino", "Menta"];
export const LN = ["Dividida clásica", "Centrada", "Barra lateral", "Imagen total", "Tipografía gigante", "Mosaico", "Carrusel", "Texto fijo", "Revista", "Tarjeta móvil"];
export const LD = [
  "Texto a la izquierda, foto a la derecha, lista numerada.",
  "Todo centrado, servicios en tres columnas.",
  "Menú fijo a un costado, contenido a la derecha.",
  "Foto a pantalla completa con el texto encima.",
  "Título enorme, servicios como letreros gigantes.",
  "Servicios en mosaico de bloques de distinto tamaño.",
  "Servicios que se deslizan hacia el costado.",
  "Presentación fija mientras se baja por los servicios.",
  "Diseño de revista: foto alta, letra capital, dos columnas.",
  "Una sola columna angosta, como una tarjeta de celular."
];

export const CB = `@keyframes gp{to{background-position:56px 56px}}@keyframes dr{to{background-position:31px 0}}
*{box-sizing:border-box;margin:0}a{color:inherit;text-decoration:none}
body{background:var(--bg);color:var(--fg);font:17px/1.55 var(--f)}
h1,h2,.lg,li b{font-family:var(--fh);text-transform:var(--tt);letter-spacing:var(--ls)}
.h{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:20px 6%;flex-wrap:wrap}.h nav a{margin-left:20px;font-size:.9rem}
.lg{font-weight:800;font-size:1.25rem;color:var(--ac)}
.hero{position:relative;overflow:hidden;padding:6%}.hero>*:not(.bgm){position:relative;z-index:1}
.hero small{display:block;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ac);margin-bottom:16px}
.hero h1{font-size:clamp(2.2rem,6vw,4.6rem);line-height:1.03;margin-bottom:18px;font-weight:var(--hw);font-style:var(--fs)}
.hero p{max-width:34em;margin-bottom:24px;opacity:.85}
.cta{display:inline-block;padding:.8rem 1.5rem;background:var(--ac);color:var(--ctc);font-weight:700;border:var(--bw) solid var(--ln);border-radius:var(--r);box-shadow:var(--sh)}
.ph{background:repeating-linear-gradient(135deg,var(--ln2) 0 10px,transparent 10px 20px);border:var(--bw) solid var(--ln);border-radius:var(--r);min-height:320px;display:flex;align-items:flex-end;padding:12px;font-size:.75rem;opacity:.9}
.sv{padding:5% 6%}.sv h2{font-size:.85rem;margin-bottom:22px;text-transform:uppercase;letter-spacing:.14em;color:var(--ac);font-family:var(--f)}
.sv ol{list-style:none;padding:0;counter-reset:n}
.sv li{counter-increment:n;padding:18px 0;border-top:var(--bw) solid var(--ln);display:flex;gap:16px;align-items:baseline}
.sv li::before{content:counter(n,decimal-leading-zero);color:var(--ac);font-size:.85rem;min-width:2.2em}
.sv li b{font-size:1.3rem;font-weight:var(--hw)}.sv li span{margin-left:auto;text-align:right;max-width:46%;opacity:.75;font-size:.95rem}
.mq{padding:16px 0;border-block:var(--bw) solid var(--ln);font:var(--hw) 2.3rem var(--fh);text-transform:var(--tt);color:var(--ac)}.mq span:nth-child(even){color:var(--fg)}
.pl{border:var(--bw) solid var(--ln);border-radius:var(--r)}
.ct{padding:5% 6%;display:grid;grid-template-columns:1fr 1fr;gap:5%}.ct p{margin-bottom:10px}.ct h2{font-size:.85rem;text-transform:uppercase;letter-spacing:.14em;color:var(--ac);grid-column:1/-1}
footer{padding:24px 6%;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:.85rem;border-top:var(--bw) solid var(--ln)}
.bgm{position:absolute;inset:0;z-index:0!important;pointer-events:none}
.m1{background-image:linear-gradient(var(--ln2) 1px,transparent 1px),linear-gradient(90deg,var(--ln2) 1px,transparent 1px);background-size:56px 56px;animation:gp 4s linear infinite}
.m2{background-image:repeating-linear-gradient(45deg,var(--ln2) 0 2px,transparent 2px 22px);background-size:31px 31px;animation:dr 3s linear infinite}
.m3::before{content:"";position:absolute;right:6%;top:12%;width:340px;height:340px;border-radius:50%;border:var(--bw) solid var(--ac);animation:fl 9s ease-in-out infinite}
.m3::after{content:"";position:absolute;right:16%;top:44%;width:110px;height:110px;border-radius:50%;background:var(--ac);opacity:.18;animation:fl 6s ease-in-out infinite reverse}
@media(max-width:760px){body.l2{display:block}.l2 .h{position:static;height:auto;flex-direction:row}.l7 main{display:block}.l7 .hero{height:auto;position:relative}.hero,.ct{grid-template-columns:1fr!important}.hero{padding:26px 6%!important}.hero h1{font-size:clamp(1.85rem,7.5vw,2.8rem)!important;line-height:1.1!important}.l4 .hero h1{font-size:clamp(2.2rem,8.5vw,3.6rem)!important}.ph{min-height:190px!important}.l6 .hero .ph,.l8 .hero .ph{min-height:190px!important}.l1 .sv ol{grid-template-columns:1fr!important}.l5 .sv ol{grid-template-columns:1fr 1fr!important}.l8 .sv ol{columns:1!important}.h nav{display:none!important}.sv{padding:26px 6%!important}.sv li{flex-direction:column!important;align-items:flex-start!important;gap:6px!important;padding:14px 0!important}.sv li span{margin-left:0!important;text-align:left!important;max-width:100%!important;opacity:.85!important;font-size:.9rem!important}.sv li b{font-size:1.15rem!important}.ct{grid-template-columns:1fr!important;padding:24px 6%!important}footer{padding:18px 6%!important;flex-direction:column;text-align:center;gap:6px}}`;

export const LC = [
  `.l0 .hero{display:grid;grid-template-columns:1.15fr .85fr;gap:5%;align-items:center}`,
  `.l1 .hero{text-align:center}.l1 .hero p{margin-inline:auto}.l1 .hero .ph{margin-top:40px;min-height:240px}.l1 .sv ol{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.l1 .sv li{flex-direction:column;border:var(--bw) solid var(--ln);padding:20px;border-radius:var(--r)}.l1 .sv li::before{display:none}.l1 .sv li span{max-width:100%;margin:0;text-align:left}.l1 .h{justify-content:center;flex-direction:column}`,
  `@media(min-width:761px){body.l2{display:grid;grid-template-columns:270px minmax(0,1fr)}.l2 main{min-width:0;overflow-x:hidden}.l2 .h{position:sticky;top:0;height:100vh;flex-direction:column;align-items:flex-start;justify-content:flex-start;border-right:var(--bw) solid var(--ln);padding:30px 24px;flex-wrap:nowrap}.l2 .h nav{display:flex;flex-direction:column;gap:12px;margin-top:20px}.l2 .h nav a{margin:0}.l2 .hero .ph{margin-top:30px;min-height:240px}}@media(max-width:760px){body.l2{display:block!important;width:100%!important;overflow-x:hidden!important}.l2 .h{position:static!important;height:auto!important;width:100%!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;border-right:none!important;border-bottom:var(--bw) solid var(--ln)!important;padding:16px 6%!important;flex-wrap:wrap!important}.l2 .h nav{display:none!important}.l2 main{display:block!important;width:100%!important;min-width:0!important}.l2 .hero .ph{min-height:190px!important;margin-top:20px}}`,
  `.l3 .hero{min-height:90vh;display:flex;align-items:flex-end;color:var(--bg)}.l3 .ph{position:absolute!important;inset:0;z-index:0;border:0;border-radius:0;min-height:0;background:var(--fg);color:var(--bg);animation:kb 20s ease-in-out infinite alternate}.l3 .hero small{color:var(--bg);opacity:.8}.l3 .hero .ph::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,#ffffff22 50%,transparent 70%);animation:sw 7s linear infinite}.l3 .hx{z-index:2}.l3 .bgm{display:none}`,
  `.l4 .hero h1{font-size:clamp(3.4rem,13vw,11rem);line-height:.9;letter-spacing:-.05em}.l4 .hero .ph{min-height:110px;margin-top:28px}.l4 .sv li{padding:22px 0;transition:.3s}.l4 .sv li b{font-size:clamp(1.8rem,5vw,3.6rem)}.l4 .sv li:hover{padding-left:22px;color:var(--ac)}`,
  `.l5 .hero .ph{min-height:130px;margin-top:30px}.l5 .sv ol{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:150px;gap:12px}.l5 .sv li{border:var(--bw) solid var(--ln);border-radius:var(--r);padding:16px;flex-direction:column;justify-content:space-between;align-items:flex-start}.l5 .sv li:nth-child(odd){background:var(--ln2)}.l5 .sv li:nth-child(1){grid-column:span 2;grid-row:span 2}.l5 .sv li:nth-child(4n){grid-column:span 2}.l5 .sv li span{max-width:100%;margin:0;text-align:left}`,
  `.l6 .hero{display:grid;grid-template-columns:.8fr 1.2fr;gap:5%;align-items:center}.l6 .hero .ph{order:-1;min-height:400px}.l6 .sv ol{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:12px}.l6 .sv li{flex:0 0 300px;min-height:240px;scroll-snap-align:start;flex-direction:column;border:var(--bw) solid var(--ln);border-radius:var(--r);padding:20px;justify-content:space-between}.l6 .sv li span{max-width:100%;margin:0;text-align:left}`,
  `@media(min-width:761px){.l7 main{display:grid;grid-template-columns:1fr 1fr}.l7 .hero{grid-row:1/span 5;position:sticky;top:0;align-self:start;height:100vh;display:flex;flex-direction:column;justify-content:center}.l7 .hero .ph{min-height:180px}.l7 main>*:not(.hero){grid-column:2}.l7 .mq{display:none}.l7 .ct{grid-template-columns:1fr}}@media(max-width:760px){.l7 main{display:block!important;width:100%!important}.l7 .hero{position:static!important;height:auto!important;min-height:auto!important;align-self:auto!important;padding:26px 6%!important}.l7 main>*:not(.hero){grid-column:auto!important}.l7 .ct{grid-template-columns:1fr!important}}`,
  `.l8 .hero{display:grid;grid-template-columns:.7fr 1.3fr;gap:4%;align-items:start}.l8 .hero .ph{order:-1;min-height:520px}.l8 .hero h1{font-size:clamp(2.6rem,7vw,5.6rem)}.l8 .hero p::first-letter{font-size:3.4em;float:left;line-height:.8;padding-right:8px;color:var(--ac);font-family:var(--fh)}.l8 .sv ol{columns:2;column-gap:5%}.l8 .sv li{break-inside:avoid}`,
  `body.l9{background:var(--ln2)}.l9 .h,.l9 main{max-width:520px;margin:0 auto;background:var(--bg)}.l9 .h{justify-content:center;text-align:center;padding-top:30px}.l9 .h nav{display:none}.l9 main{min-height:100vh;border-inline:var(--bw) solid var(--ln)}.l9 .hero{text-align:center;padding:20px 24px}.l9 .hero .ph{min-height:180px;margin-bottom:24px}.l9 .hero h1{font-size:2.3rem}.l9 .cta{display:block;text-align:center}.l9 .sv{padding:20px 24px}.l9 .sv li{border:var(--bw) solid var(--ln);border-radius:var(--r);padding:14px 16px;margin-bottom:10px}.l9 .sv li::before{display:none}.l9 .sv li span{max-width:40%}.l9 .ct{grid-template-columns:1fr;padding:20px 24px}.l9 .mq{font-size:1.5rem}`
];

export const MB = `@media(max-width:760px){body{overflow-x:hidden!important;width:100%!important}body.l2{display:block!important;width:100%!important}.l2 .h{position:static!important;height:auto!important;width:100%!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;border-right:none!important;border-bottom:var(--bw) solid var(--ln)!important;padding:16px 6%!important;flex-wrap:wrap!important}.l2 .h nav{display:none!important}.l2 main{display:block!important;width:100%!important;min-width:0!important}.l2 .hero .ph{min-height:190px!important;margin-top:20px}.l7 main{display:block!important;width:100%!important}.l7 .hero{position:static!important;height:auto!important;min-height:auto!important;align-self:auto!important;padding:26px 6%!important}.l7 main>*:not(.hero){grid-column:auto!important}.l7 .ct{grid-template-columns:1fr!important}.hero,.ct{grid-template-columns:1fr!important}.hero{padding:26px 6%!important}.hero h1{font-size:clamp(1.85rem,7.5vw,2.8rem)!important;line-height:1.1!important}.l4 .hero h1{font-size:clamp(2.2rem,8.5vw,3.6rem)!important}.ph{min-height:190px!important}.l6 .hero .ph,.l8 .hero .ph{min-height:190px!important}.l1 .sv ol{grid-template-columns:1fr!important}.l5 .sv ol{grid-template-columns:1fr!important;grid-auto-rows:auto!important}.l5 .sv li{grid-column:auto!important;grid-row:auto!important}.l8 .sv ol{columns:1!important}.h nav{display:none!important}.sv{padding:26px 6%!important}.sv li{flex-direction:column!important;align-items:flex-start!important;gap:6px!important;padding:14px 0!important}.sv li span{margin-left:0!important;text-align:left!important;max-width:100%!important;opacity:.85!important;font-size:.9rem!important}.sv li b{font-size:1.15rem!important}.ct{grid-template-columns:1fr!important;padding:24px 6%!important}footer{padding:18px 6%!important;flex-direction:column;text-align:center;gap:6px}}`;

// Generate exactly 50 unique combinations (10 layouts x 5 styles)
export const TEMPLATES = [];
for (let li = 0; li < 10; li++) {
  for (let k = 0; k < 5; k++) {
    const si = (li * 5 + k) % 12;
    TEMPLATES.push({
      k: TEMPLATES.length,
      li,
      si,
      n: `${TEMPLATES.length + 1}. ${LN[li]} · ${SN[si]}`
    });
  }
}

// Generates complete HTML code for an iframe preview
export function generateSiteHtml(t, d) {
  const nm = esc(d.nm) || "Nombre del comercio";
  const rb = esc(d.rb) || "Comercio";
  const zn = esc(d.zn);
  const tel = (d.wa || "").replace(/\D/g, "");
  const link = tel ? `https://wa.me/54${tel.replace(/^0|^54/, "")}` : "#";
  const tg = esc(d.tg) || `${rb}${zn ? " en " + zn : ""}`;
  const ds = esc(d.ds) || "Atención personalizada, trato directo y trabajo bien hecho.";
  let its = (d.it || "").split("\n").map(x => x.trim()).filter(Boolean).map(x => x.split("|").map(y => esc(y.trim())));
  if (!its.length) {
    its = [
      ["Primer servicio", "Descripción breve"],
      ["Segundo servicio", "Descripción breve"],
      ["Tercer servicio", "Descripción breve"],
      ["Cuarto servicio", "Descripción breve"]
    ];
  }
  const vars = Object.entries(SK[t.si]).map(([k, v]) => `--${k}:${v}`).join(";");
  const w = [nm, ...its.map(i => i[0]), rb].map(x => `<span>${x}</span>`).join("");
  const tr = w.repeat(3);
  const mq = (t.li + t.si) % 3 === 0 && t.li !== 7 ? `<div class="mq"><div>${tr + tr}</div></div>` : "";
  
  // Custom video handling:
  // If uploaded video is available:
  // In Structure 3 ("Imagen total"), use video as background in .ph
  // In other structures, display video inside the "Conocenos" section
  const heroPh = (t.li === 3 && d.vid)
    ? `<div class="ph" style="padding:0;overflow:hidden;background:#000"><video src="${d.vid}" autoplay muted loop playsinline class="bgv" style="opacity:0.75;object-fit:cover"></video></div>`
    : `<div class="ph">Foto: frente del local</div>`;

  const pl = d.vid || (t.li + t.si) % 2 === 1
    ? `<section class="sv" id="vs"><h2>Conocenos</h2>${
        d.vid
          ? `<div class="pl rv"><video src="${d.vid}" controls playsinline></video></div>`
          : `<div class="pl rv"><div class="fk"><i></i><em>Acá va el video de ${nm}</em></div><div class="pb"><u></u></div></div>`
      }</section>`
    : "";

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{${vars}}${AB}${CB}${LC[t.li]}${MB}</style></head><body class="l${t.li}">
<header class="h"><a class="lg" href="#">${nm}</a><nav><a href="#sv">Qué ofrecemos</a><a href="#ct">Contacto</a></nav></header><main>
<section class="hero"><div class="bgm m${(t.li * 3 + t.si) % 4}"></div><div class="hx"><small>${rb}${zn ? " · " + zn : ""}</small><h1>${tg}</h1><p>${ds}</p><a class="cta" href="${link}" target="_blank">Escribinos por WhatsApp</a></div>${heroPh}</section>
${mq}<section class="sv" id="sv"><h2>Qué ofrecemos</h2><ol>${its.map(i => `<li class="rv"><b>${i[0]}</b>${i[1] ? `<span>${i[1]}</span>` : ""}</li>`).join("")}</ol></section>${pl}
<section class="ct" id="ct"><h2>Dónde estamos</h2><div>${zn ? `<p><b>Zona</b><br>${zn}</p>` : ""}${d.hr ? `<p><b>Horario</b><br>${esc(d.hr)}</p>` : ""}${d.wa ? `<p><b>WhatsApp</b><br>${esc(d.wa)}</p>` : ""}</div><div><a class="cta" href="${link}" target="_blank">Hablanos ahora</a></div></section>
<footer><span>${nm}</span><span>${rb}${zn ? " · " + zn : ""}</span></footer></main>
<script>
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in')}),{threshold:.1});document.querySelectorAll('.rv').forEach(e=>io.observe(e));
const p=document.querySelector('.pl .fk');if(p)p.parentNode.onclick=()=>p.parentNode.classList.toggle('on');
<\/script></body></html>`;
}
