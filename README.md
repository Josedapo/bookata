# Bookata

Curated children's and young adult book recommendations by age and reader type, live at
[bookata.es](https://bookata.es). Next.js 16 (App Router, fully static), TypeScript, Tailwind CSS 4.
Every recommendation links to Amazon through an affiliate link.

Project context, product rules and live state live in the workspace file `../CLAUDE.md`, outside
this repo.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Development server. Shares `.next/` with the build: rebuild before `npm start`. |
| `npm run build` | Production build (275 static pages plus sitemap, robots, llms.txt, search index). |
| `npm start` | Serves the last build. |
| `npm run lint` | ESLint (`eslint .`, flat config in `eslint.config.mjs`). |
| `npm test` | Safety net, about 30 s. See below. |
| `npm run test:update` | Re-pins the goldens after an approved output change. |

Pushing `main` deploys production on Vercel.

## Data pipeline

The catalogue is curated in `scripts/source/Bookata_def.xlsx`. The Python scripts need
`pip install -r scripts/requirements.txt` in a virtualenv.

1. `python scripts/build-books.py` writes `src/data/books.json` and `src/data/sections.json` from
   the Excel. It keeps covers already resolved, by ISBN. Never edit either file by hand.
2. `python scripts/resolve-covers.py` resolves Amazon covers for new books only (network: follows
   each amzn.to link). Covers must stay on `m.media-amazon.com`: it is the only host allowed in
   `images.remotePatterns` (`next.config.ts`); any other host answers 400 from the optimizer.
3. `python scripts/build-hero.py`, then `python scripts/build-og.py`, after adding books: hero
   backdrop (network: downloads the catalogue covers) and default share image.

## Safety net

`npm test` (vitest) builds the site offline from a clean `.next` (Google Fonts served from
`tests/fixtures/fonts`, clock frozen) and compares it with `tests/golden/`: SHA-256 of every page,
RSC payload and route body; a per-page content extract (title, meta, links, headings, JSON-LD,
anchors, image targets, visible text); the data functions over all books; `build-books.py`
rebuilding both data files byte for byte; and a Playwright smoke on `next start` with every
external request blocked (key pages, cover host, consent: no gtag.js before Aceptar).

It needs Playwright with Chromium (`BK_PLAYWRIGHT`, default `~/.claude/agents/dieter/node_modules`)
and a Python with openpyxl (`BK_PYTHON`, default `~/.local/share/martin/venv-bookata/bin/python`).
