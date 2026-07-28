document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("photo-grid");
  if (!grid) return;

  fetch("data/photography.json")
    .then((res) => res.json())
    .then((photos) => {
      const sorted = sortByDateDesc(photos);
      if (sorted.length === 0) {
        grid.innerHTML = '<p class="empty-state">New photos coming soon.</p>';
        return;
      }
      grid.innerHTML = sorted.map(photoCard).join("");
      grid.querySelectorAll("[data-photo-id]").forEach((el) => {
        el.addEventListener("click", () => {
          const photo = sorted.find((p) => String(p.id) === el.dataset.photoId);
          openImageModal(photo);
        });
      });
    })
    .catch(() => {
      grid.innerHTML = '<p class="empty-state">Could not load photography right now.</p>';
    });
});

function photoCard(photo) {
  return `
    <div class="card" data-photo-id="${photo.id}">
      <div class="card-media photo" style="background:${gradientFor(photo.id)}">
        <span>${escapeHtml(photo.title)}</span>
      </div>
      <div class="card-body">
        <p class="card-meta">${escapeHtml(photo.category)} &middot; ${escapeHtml(photo.date)}</p>
        <h3>${escapeHtml(photo.title)}</h3>
      </div>
    </div>
  `;
}
