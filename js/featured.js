// Homepage "Featured Work" strip: pulls the most recent film + most
// recent photos so the homepage updates itself as data files grow.
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;

  Promise.all([
    fetch("data/films.json").then((res) => res.json()).catch(() => []),
    fetch("data/photography.json").then((res) => res.json()).catch(() => []),
  ]).then(([films, photos]) => {
    const items = [
      ...sortByDateDesc(films).slice(0, 2).map((f) => ({ type: "film", data: f })),
      ...sortByDateDesc(photos).slice(0, 2).map((p) => ({ type: "photo", data: p })),
    ].sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

    if (items.length === 0) {
      grid.innerHTML = '<p class="empty-state">New work coming soon.</p>';
      return;
    }

    grid.innerHTML = items.map(featuredCard).join("");
    grid.querySelectorAll("[data-featured]").forEach((el, i) => {
      el.addEventListener("click", () => {
        const item = items[i];
        if (item.type === "film") {
          openVideoModal(item.data);
        } else {
          openImageModal(item.data);
        }
      });
    });
  });
});

function featuredCard(item) {
  const d = item.data;
  const isFilm = item.type === "film";
  return `
    <div class="card" data-featured>
      ${mediaMarkup(d, `card-media ${isFilm ? "" : "photo"}`)}
      <div class="card-body">
        <p class="card-meta">${isFilm ? "Short Film" : "Photography"} &middot; ${escapeHtml(d.year || d.date)}</p>
        <h3>${escapeHtml(d.title)}</h3>
        <p>${escapeHtml(d.logline || d.caption || "")}</p>
      </div>
    </div>
  `;
}
