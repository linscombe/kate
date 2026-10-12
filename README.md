# Portfolio Site

A simple static portfolio (plain HTML/CSS/JS, no build step, no frameworks)
for short films and photography. Deployed on Cloudflare Pages at
https://kate.linscombes.com.

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

## Deploying

The live site is **https://kate.linscombes.com**, served by Cloudflare Pages
from the `main` branch of `github.com/linscombe/kate`.

Push to `main` and Cloudflare Pages rebuilds and redeploys automatically.
There is no build command and no output directory to configure — the repo
root is published as-is.

```bash
git add .
git commit -m "Add new work"
git push
```

A deploy usually goes live within a minute. You can watch it, roll back to a
previous deploy, or read build logs in the Cloudflare dashboard under
**Workers & Pages → the project → Deployments**.

GitHub Pages is no longer used. The empty `.nojekyll` file is a leftover from
that setup; it is inert under Cloudflare Pages and harmless to keep.

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
