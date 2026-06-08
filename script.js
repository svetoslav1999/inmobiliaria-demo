// Gallery screenshots with categories
const SHOTS = [
  { file: "dashboard.png",         caption: "Dashboard principal",       cat: "crm" },
  { file: "dashboard-fhd.png",     caption: "Dashboard · Full HD",       cat: "crm" },
  { file: "analytics.png",         caption: "Analytics IA",              cat: "crm" },
  { file: "analytics-fhd.png",     caption: "Analytics · Full HD",       cat: "crm" },
  { file: "pipeline.png",          caption: "Pipeline CRM",              cat: "crm" },
  { file: "lead-scoring.png",      caption: "Lead Scoring IA",           cat: "crm" },
  { file: "crm-clients.png",       caption: "Clientes (CRM)",            cat: "crm" },
  { file: "properties.png",        caption: "Propiedades",               cat: "properties" },
  { file: "property-detail.png",   caption: "Ficha de inmueble",         cat: "properties" },
  { file: "properties-map.png",    caption: "Mapa interactivo",          cat: "properties" },
  { file: "properties-fhd.png",    caption: "Propiedades · Full HD",     cat: "properties" },
  { file: "ai-center.png",         caption: "Centro de IA",              cat: "ai" },
  { file: "staging.png",           caption: "Home Staging IA",           cat: "ai" },
  { file: "vision.png",            caption: "Visión IA",                 cat: "ai" },
  { file: "video-studio.png",      caption: "Video Studio IA",           cat: "ai" },
  { file: "anuncios.png",          caption: "Generador de anuncios",     cat: "ai" },
  { file: "automations.png",       caption: "Automatizaciones",          cat: "gestion" },
  { file: "visits.png",            caption: "Visitas",                   cat: "gestion" },
  { file: "contracts.png",         caption: "Contratos",                 cat: "gestion" },
  { file: "agents.png",            caption: "Agentes",                   cat: "gestion" },
  { file: "organization.png",      caption: "Organización",              cat: "gestion" },
  { file: "settings.png",          caption: "Configuración",             cat: "gestion" },
  { file: "calculators.png",       caption: "Calculadoras financieras",  cat: "gestion" },
  { file: "whatsapp.png",          caption: "WhatsApp Business IA",      cat: "gestion" },
  { file: "mobile-dashboard.png",  caption: "Móvil — Dashboard",        cat: "mobile" },
  { file: "mobile-analytics.png",  caption: "Móvil — Analytics",        cat: "mobile" },
  { file: "mobile-properties.png", caption: "Móvil — Propiedades",      cat: "mobile" },
  { file: "tablet-dashboard.png",  caption: "Tablet — Dashboard",       cat: "mobile" },
  { file: "tablet-properties.png", caption: "Tablet — Propiedades",     cat: "mobile" },
];

// Build gallery
const grid = document.getElementById("galleryGrid");
SHOTS.forEach(({ file, caption, cat }) => {
  const fig = document.createElement("figure");
  fig.className = "shot";
  fig.dataset.cat = cat;
  fig.innerHTML = `<img src="assets/screenshots/${file}" alt="${caption}" loading="lazy" />
    <figcaption>${caption}</figcaption>`;
  fig.addEventListener("click", () => openLightbox(`assets/screenshots/${file}`, caption));
  grid.appendChild(fig);
});

// Gallery filters
const filterBtns = document.querySelectorAll(".gf-btn");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    const shots = document.querySelectorAll(".shot");
    shots.forEach(shot => {
      const show = filter === "all" || shot.dataset.cat === filter;
      shot.classList.toggle("hidden", !show);
    });
  });
});

// Lightbox
const lb  = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCaption");

function openLightbox(src, caption) {
  lbImg.src = src;
  lbImg.alt = caption;
  lbCap.textContent = caption;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.hidden = true;
  lbImg.src = "";
  document.body.style.overflow = "";
}
document.getElementById("lbClose").addEventListener("click", closeLightbox);
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

// Nav scroll effect
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 10
    ? "0 8px 36px -16px rgba(0,0,0,.8)"
    : "none";
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById("navHamburger");
const navLinks  = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Screenshot frames open lightbox on click
document.querySelectorAll(".screenshot-frame img").forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

// Scroll reveal via IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -32px 0px",
});

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
