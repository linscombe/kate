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
  body.innerHTML = `
    <div class="modal-image-wrap">
      <div class="card-media photo" style="background:${gradientFor(photo.id)}">
        <span>${escapeHtml(photo.title)}</span>
      </div>
    </div>
    <div class="modal-body">
      <p class="card-meta">${escapeHtml(photo.category)} &middot; ${escapeHtml(photo.date)}</p>
      <h3>${escapeHtml(photo.title)}</h3>
      <p>${escapeHtml(photo.caption)}</p>
    </div>
  `;
  overlay.classList.add("open");
}

// Deterministic warm gradient per item so placeholders look varied
// without needing real images yet. Replace card-media backgrounds
// with real <img> tags once photos are added (see CONTENT_GUIDE.md).
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
