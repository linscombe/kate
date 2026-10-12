# CLAUDE.md

## This is a PUBLIC repository

`github.com/linscombe/kate` is public. Everything committed here is visible to anyone
on the internet, and git history keeps it visible even after a later deletion.

**Never write anything sensitive into this repo** — not in source, data files, config,
comments, commit messages, or image metadata. That includes:

- API keys, tokens, passwords, secrets, private URLs or webhooks
- Personal contact details: home address, phone numbers, private email addresses
- Dates of birth, government IDs, financial details
- School name, workplace, or anything else that pins down a minor's location or routine
- Private photos, or photos whose EXIF data carries GPS coordinates

If something sensitive is needed for the site to work, stop and ask Jason instead of
committing it. If something sensitive has already been committed, say so plainly — it
needs history rewriting and credential rotation, not just a follow-up commit.

## Site

Static site (plain HTML/CSS/JS, no build step) for Kate Linscombe's portfolio.

Live at **https://kate.linscombes.com**, served by Cloudflare Pages from `main`.
Pushing to `main` deploys automatically; there is no build command and the repo root is
published as-is. GitHub Pages is no longer used, and `.nojekyll` is an inert leftover.

Content lives in `data/*.json`; see `CONTENT_GUIDE.md` for how entries are added.
