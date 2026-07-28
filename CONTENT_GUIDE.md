# How to add new work (monthly updates)

You do not need to touch any HTML or CSS to add a new project. Just edit
the two files in `data/` — the site reads them automatically.

## Adding a new short film

Open [`data/films.json`](data/films.json) and add a new object to the array
(copy an existing one and change the values):

```json
{
  "id": "f4",
  "title": "My New Film",
  "year": "2026",
  "date": "2026-07",
  "role": "Director",
  "logline": "One punchy sentence.",
  "description": "A few sentences with more detail, credits, or festival info.",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID"
}
```

Rules:
- `id` must be unique — just increment the number (f4, f5, f6...).
- `date` uses `YYYY-MM` format — this controls sort order (newest first) on
  both the Films page and the homepage "Featured Work" strip.
- `embedUrl` must be an **embed** URL, not a normal share link:
  - YouTube: `https://www.youtube.com/embed/VIDEO_ID` (VIDEO_ID is the part
    after `v=` or `youtu.be/` in the normal link)
  - Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
  - If a film is private/unlisted, that's fine — unlisted YouTube/Vimeo
    videos still work in an embed.

## Adding a new photo

Open [`data/photography.json`](data/photography.json) and add a new object:

```json
{ "id": "p7", "title": "Photo Title", "category": "Portrait", "date": "2026-07", "caption": "A sentence of context." }
```

Same rules: unique `id`, `date` as `YYYY-MM`.

### Using real images instead of the color placeholders

Right now every card shows a colored gradient instead of a real photo/thumbnail.
To use a real image:

1. Add the image file to an `images/` folder (create it if needed), e.g.
   `images/photo-01.jpg`. Keep files reasonably small (under ~1–2MB each,
   resize to roughly 2000px on the long edge) so the site stays fast.
2. Add an `"image": "images/photo-01.jpg"` field to that item's JSON entry.
3. Ask Claude to swap the gradient `<div class="card-media">` for an
   `<img>` tag wherever `image` is present — this only needs to be done
   once per page (`js/photography.js`, `js/films.js`, `js/featured.js`),
   not per project.

## Editing text elsewhere

- **Homepage intro / tagline**: edit the `<section class="hero">` block in
  [`index.html`](index.html).
- **About page bio, goals, resume link**: edit [`about.html`](about.html).
- **Social links**: edit [`social.html`](social.html) — replace the
  `REPLACE_ME` placeholders with real usernames/URLs.
- **Name in the nav/footer**: it currently says "Kate Linscombe" in the
  header and footer of every page — find/replace if that's ever wrong.

## The simplest workflow

Each month, just tell Claude something like:

> "Add a new film called [Title], embed link [url], here's the description: ..."

or

> "Add these 5 new photos: [titles/captions]"

and Claude can make the JSON edits directly — no need to understand the
file format yourself.
