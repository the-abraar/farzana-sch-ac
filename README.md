# farzana.sch.ac

Static personal/academic site for Farzana Reza Shifa. No build step, no dependencies
beyond Google Fonts — plain HTML per route.

## Routes

| Route | Page |
|---|---|
| `/` | Profile — sociologist, field researcher, founder |
| `/research/` | Research hub |
| `/research/panchagarh-honey/` | Field study: migratory litchi-honey apiarists, Panchagarh |
| `/fuel_shock_bd/` | Mirror of the `r1_Fuel` research programme (Bangladesh's 2026 fuel shock) |
| `/terracotta-tales/` | Terracotta Tales venture showcase |
| `/card.html` | Digital business card |

This is a sibling site to [blankframe.tech/shifa](https://www.blankframe.tech/shifa/) —
that site leads with the entrepreneurship/founder story for a business audience; this
one leads with the sociology/research work for an academic audience. Content overlaps
by design; `/research/panchagarh-honey/` and `/terracotta-tales/` are the same field
work and venture, republished here.

`/fuel_shock_bd/` is a mirror of `blankframe.tech/research/r1_Fuel/` (source of truth:
<https://github.com/the-abraar/FuelPriceHikeImpactResearch>). It has its own build step —
see `fuel_shock_bd/README.md`.

## Deploy with GitHub Pages

1. Push this directory to a new repo's `main` branch.
2. Repo Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Settings → Pages → Custom domain: `farzana.sch.ac` (matches the `CNAME` file already
   in this repo).
4. At the registrar (Hostever), point DNS at GitHub Pages:

   | Type | Host | Value |
   |---|---|---|
   | CNAME | `www` | `<github-username>.github.io.` |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

5. Enable **Enforce HTTPS** once the certificate issues.
