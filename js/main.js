// Shared behavior: mobile nav toggle + modal helpers.
// Page-specific rendering (films.js / photography.js / featured.js) calls
// openVideoModal / openImageModal defined here.

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  setupModal();
});

function setupModal() {
  const overlay = document.getElementById("modal-overlay");
  if (!overlay) return;
  const closeBtn = overlay.querySelector(".modal-close");
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  const body = document.getElementById("modal-body");
  overlay.classList.remove("open");
  body.innerHTML = "";
}

function openVideoModal(film) {
  const overlay = document.getElementById("modal-overlay");
  const body = document.getElementById("modal-body");
  body.innerHTML = `
    <div class="modal-video">
      <iframe src="${film.embedUrl}" title="${escapeHtml(film.title)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div class="modal-body">
      <p class="card-meta">${escapeHtml(film.year)} &middot; ${escapeHtml(film.role)}</p>
      <h3>${escapeHtml(film.title)}</h3>
      <p>${escapeHtml(film.description)}</p>
    </div>
  `;
  overlay.classList.add("open");
}

function openImageModal(photo) {
  const overlay = document.getElementById("modal-overlay");
  const body = document.getElementById("modal-body");
  // Grid cards force a uniform crop for a tidy layout, but the popup
  // should show the real photo uncropped at its natural aspect ratio.
  const media = photo.image
    ? `<img class="modal-photo" src="${photo.image}" alt="${escapeHtml(photo.title)}">`
    : mediaMarkup(photo, "card-media photo");
  body.innerHTML = `
    <div class="modal-image-wrap">
      ${media}
    </div>
    <div class="modal-body">
      <p class="card-meta">${escapeHtml(photo.category)} &middot; ${escapeHtml(photo.date)}</p>
      <h3>${escapeHtml(photo.title)}</h3>
      <p>${escapeHtml(photo.caption)}</p>
    </div>
  `;
  overlay.classList.add("open");
}

// Renders a real photo when item.image is set, otherwise falls back to
// the warm gradient placeholder (see CONTENT_GUIDE.md for adding images).
function mediaMarkup(item, className) {
  if (item.image) {
    return `<div class="${className}" style="background-image:url('${item.image}')"></div>`;
  }
  return `<div class="${className}" style="background:${gradientFor(item.id)}"><span>${escapeHtml(item.title)}</span></div>`;
}

// Deterministic warm gradient per item so placeholders look varied
// without needing real images yet.
function gradientFor(id) {
  const palettes = [
    "linear-gradient(160deg,#d9c9b8,#a8583e)",
    "linear-gradient(160deg,#c9ab8f,#6f4a3a)",
    "linear-gradient(160deg,#e4d4c0,#8a4531)",
    "linear-gradient(160deg,#b98a6b,#3f2e26)",
  ];
  let hash = 0;
  for (let i = 0; i < String(id).length; i++) {
    hash = (hash + String(id).charCodeAt(i)) % palettes.length;
  }
  return palettes[hash];
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
}
