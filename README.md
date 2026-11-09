# farzana.sch.ac

Static personal/academic site for Farzana Reza Shifa. No build step, no dependencies
beyond Google Fonts — plain HTML per route.

## Routes

| Route | Page |
|---|---|
| `/` | Profile — sociologist, field researcher, founder |
| `/research/` | Research hub |
| `/research/panchagarh-honey/` | Field study: migratory litchi-honey apiarists, Panchagarh |
| `/fuel_shock_bd/` | Link-only stubs that send visitors to `blankframe.tech/research/r1_Fuel/` |
| `/terracotta-tales/` | Terracotta Tales venture showcase |
| `/card.html` | Digital business card |

This is a sibling site to [blankframe.tech/shifa](https://www.blankframe.tech/shifa/) —
that site leads with the entrepreneurship/founder story for a business audience; this
one leads with the sociology/research work for an academic audience. Content overlaps
by design; `/research/panchagarh-honey/` and `/terracotta-tales/` are the same field
work and venture, republished here.

`/fuel_shock_bd/` used to be a full mirror of `blankframe.tech/research/r1_Fuel/`. Since
8 November 2026 the programme is published in one place only: `fuel_shock_bd/` holds small
link pages (overview, findings, proposal, collaborate, support, data, status) that point to the
same route on blankframe.tech, and the old PDF and CSV downloads are gone. Edit the research
site in the `landing-page` repo (`research/r1_Fuel/`), not here.

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
