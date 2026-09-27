# r1_Fuel — research site

Public site for the **Bangladesh 2026 fuel shock** research programme, served at
<https://farzana.sch.ac/fuel_shock_bd/>.

Research source of truth: <https://github.com/the-abraar/FuelPriceHikeImpactResearch>.
This directory is the published surface of that work, not a second copy of it.

## Routes

| Route | Page | Source |
|---|---|---|
| `/fuel_shock_bd/` | Overview — the shock, the five things the headline misses, the loop, the calendar, the programme | `src/home.js` |
| `/fuel_shock_bd/findings/` | The full impact analysis | `content/analysis.md` |
| `/fuel_shock_bd/proposal/` | Research questions and the five study designs | `content/proposals.md` |
| `/fuel_shock_bd/collaborate/` | Five open roles, the field, terms and ethics | `src/collaborate.js` |
| `/fuel_shock_bd/support/` | Costed funding tiers, due diligence, funder landscape | `src/support.js` |
| `/fuel_shock_bd/data/` | What is built, conventions, P4 corpus and its validation failures | `src/data.js` |
| `/fuel_shock_bd/data/log/` | The full audit trail | `content/audit_log.md` |
| `/fuel_shock_bd/status/` | Phase, critical path, public changelog | `src/status.js` |

## Build

```bash
npm install          # marked, the only dependency
node build_site.js   # writes the static HTML in place
```

Output is plain static HTML. Nothing in the published site needs a build step,
a framework or a CDN at run time; the only external requests a visitor makes are
Google Fonts and the GoatCounter tag.

- `assets/site.css` — the whole design system, built on the BlankFrame tokens
  (warm paper `#F2F1ED`, ink `#131313`, accent `#FF4A1F`, Inter Tight / Inter /
  Instrument Serif).
- `src/shell.js` — head, nav, footer, per-page metadata.
- `src/charts.js` — every figure, rendered to inline SVG at build time. Single-series
  magnitude charts use the house accent against neutral ink; the one categorical pair
  available is `#FF4A1F` / `#1B6FD4`, which clears the lightness, chroma, CVD,
  normal-vision and contrast checks.
- `content/*.md` — copies of the research repo's markdown. Re-sync with:

```bash
SRC=../../../FuelPriceHikeImpactResearch
cp "$SRC/README.md"               content/analysis.md
cp "$SRC/research_proposals.md"   content/proposals.md
cp "$SRC/reseach_pass_1.md"       content/audit_log.md
rsync -a --delete --exclude data --exclude __pycache__ \
      --exclude 'out/coding_sample.csv' "$SRC/p4_discourse/" p4_discourse/
node build_site.js
```

## Conventions that must hold

- **No personal email addresses in published HTML.** The collaborator list in the
  research repo carries contact details gathered from institutional pages; the site
  links the institutional profile instead. Do not republish the addresses here.
- **Derived figures carry the `est.` marker** and their method is shown. Anything
  unmarked must be traceable to a cited source.
- **Limitations are published alongside the outputs.** The data page states where
  the corpus is biased and where the classifier fails; that is deliberate and should
  survive edits.
- Every page carries the GoatCounter tag, and `/fuel_shock_bd/` is registered in
  `visit-count/`, `stats/` and `analytics/` per the repository rules in `AGENTS.md`.
