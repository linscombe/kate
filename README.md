# Portfolio Site

A simple static portfolio (plain HTML/CSS/JS, no build step, no frameworks)
for short films and photography. Built to host on GitHub Pages.

To add new work each month, see [CONTENT_GUIDE.md](CONTENT_GUIDE.md) —
you only need to edit files in `data/`.

## Previewing locally

Because the film/photo grids load `data/*.json` with `fetch()`, opening
`index.html` directly by double-clicking it won't work (browsers block
`fetch` on `file://` pages). Run a tiny local server instead from this
folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio` or
   `<your-username>.github.io`).
2. From this folder:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

3. On GitHub: go to the repo's **Settings → Pages**, set **Source** to
   "Deploy from a branch", branch `main`, folder `/ (root)`, then save.
4. Your site will be live in a minute or two at:
   - `https://<your-username>.github.io/<repo-name>/` (project repo), or
   - `https://<your-username>.github.io/` (if the repo is named
     `<your-username>.github.io`)

Every time you (or Claude) push new commits to `main`, GitHub Pages
rebuilds automatically — no build step to run yourself.

## File structure

```
index.html          Homepage (hero + featured work)
films.html           Short films grid
photography.html     Photography grid
about.html           Bio, goals, resume link, contact
social.html          Social platform links
css/style.css        All styling
js/main.js           Shared nav + modal behavior
js/films.js          Renders films.html grid from data/films.json
js/photography.js    Renders photography.html grid from data/photography.json
js/featured.js       Renders homepage featured strip
data/films.json      Film project entries — edit to add new films
data/photography.json  Photo entries — edit to add new photos
CONTENT_GUIDE.md     How to add new work each month
```
