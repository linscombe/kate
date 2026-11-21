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
  - Unlisted YouTube/Vimeo videos work fine in an embed. **Private ones do
    not** — they show "This video is unavailable" on the site.
- Instead of `embedUrl`, a film can use `"videoUrl": "video/name.mp4"` to play
  a file kept in this repo. Only worth it for something short: Cloudflare
  Pages won't serve a file over 25MB, and anything committed stays in git
  history for good. Embeds are the better default.
- If YouTube refuses to play a film in an embed — usually a copyright claim
  on its music — add `"watchUrl": "https://www.youtube.com/watch?v=VIDEO_ID"`.
  The card then opens the film on YouTube in a new tab and shows a small
  "Watch on YouTube" line, instead of a player that errors. Leave `embedUrl`
  in place: once the claim is resolved, delete the `watchUrl` line and the
  in-page player comes back.

## Adding a new photo

Open [`data/photography.json`](data/photography.json) and add a new object:

```json
{ "id": "p7", "title": "Photo Title", "category": "Portrait", "date": "2026-07", "caption": "A sentence of context." }
```

Same rules: unique `id`, `date` as `YYYY-MM`.

### Using real images instead of the color placeholders

A card shows a real image when its entry has an `"image"` field, and falls
back to a colored gradient when it doesn't. The code side is already wired up
on every page, so this is just two steps:

1. Add the image file to `images/`, e.g. `images/photo-01.jpg`. Keep files
   reasonably small (under ~1–2MB each, resize to roughly 2000px on the long
   edge) so the site stays fast.
2. Add an `"image": "images/photo-01.jpg"` field to that item's JSON entry.

For a film, `"image"` is the thumbnail on the card — a still pulled from the
film works well. The video itself still comes from `embedUrl`.

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
