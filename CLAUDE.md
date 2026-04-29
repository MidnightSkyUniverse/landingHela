# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Hela** — B2B SaaS landing page for algorithmic scheduling software targeting waste management, construction, and healthcare companies in Poland. Primary language: Polish (`/`). English version at `/en/`. No analytics, no cookie banner, no booking system. CTA is a visible email address.

Domain: `algority.pl`
Placeholder email: `kontakt@helaapp.pl` — update before going live.

## Stack

Same pipeline as `landingNexi` and `landingAli` sibling projects:
- **Pug** — HTML templating
- **SCSS + Bootstrap 5** — styling
- **Custom Node.js build scripts** (`scripts/`) — no webpack/vite
- **BrowserSync** — dev server
- **Netlify** — hosting (`netlify.toml` configured)

## Commands

```bash
npm start          # full build + dev server at localhost:3000
npm run build      # production build → dist/
npm run build:pug  # compile Pug only
npm run build:scss # compile SCSS only
npm run clean      # delete dist/
```

## Architecture

### i18n — two separate HTML files (NOT JS-based switching)

| File | Output | Language |
|------|--------|----------|
| `src/pug/index.pug` | `dist/index.html` | Polish (primary) |
| `src/pug/en/index.pug` | `dist/en/index.html` | English |

Both extend `src/pug/layouts/base.pug`. Variables (title, description, lang, canonical, rootPath) are set in a `block vars` at the top of each page file — this is required by Pug's extending model.

**`rootPath`** — critical variable. Set to `''` in `index.pug` and `'../'` in `en/index.pug`. All asset paths (CSS, JS, images) use `rootPath + 'css/styles.css'` etc. to work from both URL depths.

### Pug layout system

```
src/pug/
  layouts/base.pug          ← HTML shell, head, nav, footer
  includes/
    navbar.pug
    footer.pug
    css.pug                 ← Google Fonts + styles.css (uses rootPath)
    scripts.pug             ← scripts.js (uses rootPath)
  index.pug                 ← Polish page
  en/
    index.pug               ← English page
```

Includes in `layouts/base.pug` use the `basedir` set to `src/` so paths are `includes/navbar.pug` etc.

### SCSS structure

```
src/scss/
  styles.scss               ← entry point
  _variables.scss           ← brand colors, Bootstrap overrides
  _global.scss
  _utilities.scss
  components/
    _navbar.scss
    _hero.scss
    _schedule.scss          ← the harmonogram CSS visualization
    _sections.scss          ← problem, industries, contact sections
    _footer.scss
```

### The schedule visualization (`.sched`)

Pure CSS Grid. 13 columns: `60px repeat(12, 1fr)`. 12 time slots = 2 hours each, covering 06:00–06:00 (24h). Each shift block uses `grid-column: X/Y` for placement and `--d` CSS custom property for staggered animation delay. Three block types: `--a` (amber), `--b` (violet), `--c` (teal).

This is a placeholder until a real screenshot/graphic is available. The `.sched` block in the hero can be replaced with an `<img>` or `<picture>` element when the graphic is ready.

### SEO / GEO

- `public/robots.txt` — allows all bots including GPTBot, ClaudeBot, PerplexityBot
- `public/sitemap.xml` — both PL and EN URLs with `hreflang` annotations
- `public/llms.txt` — bilingual description for LLM crawlers
- JSON-LD `SoftwareApplication` schema in `base.pug`
- `hreflang` alternate links in `<head>` (both pages point to each other)
- Meta tags are per-language (each page has its own title, description, og:locale)
