// Galería de capturas (datos de demostración)
const SHOTS = [
  ["analytics.png", "Analytics IA"],
  ["pipeline.png", "Pipeline CRM"],
  ["lead-scoring.png", "Lead Scoring IA"],
  ["properties.png", "Propiedades"],
  ["property-detail.png", "Ficha de inmueble"],
  ["properties-map.png", "Mapa interactivo"],
  ["crm-clients.png", "Clientes (CRM)"],
  ["staging.png", "Home Staging IA"],
  ["video-studio.png", "Video Studio IA"],
  ["anuncios.png", "Generador de anuncios"],
  ["automations.png", "Automatizaciones"],
  ["whatsapp.png", "WhatsApp Business"],
  ["calculators.png", "Calculadoras"],
  ["visits.png", "Visitas"],
  ["agents.png", "Agentes"],
  ["mobile-dashboard.png", "Móvil — Dashboard"],
];

const grid = document.getElementById("galleryGrid");
SHOTS.forEach(([file, caption]) => {
  const fig = document.createElement("figure");
  fig.className = "shot";
  fig.innerHTML = `<img src="assets/screenshots/${file}" alt="${caption}" loading="lazy" />
    <figcaption>${caption}</figcaption>`;
  fig.addEventListener("click", () => openLightbox(`assets/screenshots/${file}`, caption));
  grid.appendChild(fig);
});

// Lightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCaption");
function openLightbox(src, caption) {
  lbImg.src = src; lbImg.alt = caption; lbCap.textContent = caption;
  lb.hidden = false; document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.hidden = true; lbImg.src = ""; document.body.style.overflow = "";
}
document.getElementById("lbClose").addEventListener("click", closeLightbox);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

// Nav shadow on scroll
const nav = document.getElementById("nav");
addEventListener("scroll", () => {
  nav.style.boxShadow = scrollY > 10 ? "0 8px 24px -16px rgba(0,0,0,.8)" : "none";
});
