document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("films-grid");
  if (!grid) return;

  fetch("data/films.json")
    .then((res) => res.json())
    .then((films) => {
      const sorted = sortByDateDesc(films);
      if (sorted.length === 0) {
        grid.innerHTML = '<p class="empty-state">New work coming soon.</p>';
        return;
      }
      grid.innerHTML = sorted.map(filmCard).join("");
      grid.querySelectorAll("[data-film-id]").forEach((el) => {
        el.addEventListener("click", () => {
          const film = sorted.find((f) => String(f.id) === el.dataset.filmId);
          openVideoModal(film);
        });
      });
    })
    .catch(() => {
      grid.innerHTML = '<p class="empty-state">Could not load films right now.</p>';
    });
});

function filmCard(film) {
  return `
    <div class="card" data-film-id="${film.id}">
      <div class="card-media" style="background:${gradientFor(film.id)}">
        <span>${escapeHtml(film.title)}</span>
      </div>
      <div class="card-body">
        <p class="card-meta">${escapeHtml(film.year)} &middot; ${escapeHtml(film.role)}</p>
        <h3>${escapeHtml(film.title)}</h3>
        <p>${escapeHtml(film.logline)}</p>
      </div>
    </div>
  `;
}
