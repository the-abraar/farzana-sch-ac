'use strict';

/* Shared page chrome for the r1_Fuel research site. */

const SITE = {
  base: '/fuel_shock_bd/',
  origin: 'https://farzana.sch.ac',
  repo: 'https://github.com/the-abraar/FuelPriceHikeImpactResearch',
  contact: 'hello@blankframe.tech',
  updated: '21 September 2026',
};

const NAV = [
  { href: '/fuel_shock_bd/',             label: 'Overview',     id: 'home' },
  { href: '/fuel_shock_bd/findings/',    label: 'The analysis', id: 'findings' },
  { href: '/fuel_shock_bd/proposal/',    label: 'Research plan',id: 'proposal' },
  { href: '/fuel_shock_bd/collaborate/', label: 'Collaborate',  id: 'collaborate' },
  { href: '/fuel_shock_bd/support/',     label: 'Fund it',      id: 'support' },
  { href: '/fuel_shock_bd/data/',        label: 'Data & method',id: 'data' },
  { href: '/fuel_shock_bd/status/',      label: 'Status',       id: 'status' },
];

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E" +
  "%3Crect width='100' height='100' rx='24' fill='%23131313'/%3E" +
  "%3Crect x='28' y='28' width='44' height='44' fill='none' stroke='%23FF4A1F' stroke-width='7'/%3E%3C/svg%3E";

/** Depth-aware asset path so the stylesheet resolves from any route. */
function assetPath(depth) {
  return (depth ? '../'.repeat(depth) : './') + 'assets/site.css';
}

function nav(active, depth) {
  const links = NAV.map(
    (n) =>
      `      <a href="${n.href}"${n.id === active ? ' class="active" aria-current="page"' : ''}>${n.label}</a>`
  ).join('\n');
  return `<div class="nav-shell">
  <div class="nav-inner">
    <a class="nav-brand" href="/research/">
      <span class="mark" aria-hidden="true"></span>
      <span>r1_Fuel</span>
      <span class="sub">Farzana Reza Shifa &middot; Research</span>
    </a>
    <nav class="nav-links" aria-label="Sections">
${links}
    </nav>
  </div>
</div>`;
}

function footer() {
  return `<footer>
  <div class="wrap">
    <div class="fgrid">
      <div>
        <div style="font-family:'Inter Tight',sans-serif;font-weight:700;letter-spacing:-0.03em;color:var(--ink);font-size:17px;">r1_Fuel</div>
        <div class="small" style="margin-top:6px;">An open research programme on Bangladesh's 2026 fuel shock.</div>
        <div class="small" style="margin-top:6px;">Analysis dated ${SITE.updated}.</div>
      </div>
      <div class="flinks">
        <a href="/fuel_shock_bd/findings/">The analysis</a>
        <a href="/fuel_shock_bd/proposal/">Research plan</a>
        <a href="/fuel_shock_bd/collaborate/">Collaborate</a>
        <a href="/fuel_shock_bd/support/">Fund it</a>
        <a href="/fuel_shock_bd/data/">Data &amp; method</a>
        <a href="/fuel_shock_bd/data/log/">Audit log</a>
        <a href="${SITE.repo}">Source repo</a>
        <a href="mailto:${SITE.contact}?subject=r1_Fuel">Email</a>
        <a href="/">Farzana Reza Shifa</a>
        <a href="https://www.blankframe.tech/research/r1_Fuel/">Original: BlankFrame</a>
      </div>
    </div>
    <p class="fnote">
      Figures marked <span class="est">est.</span> are this project's own calculations from cited inputs, with the
      method shown inline; everything else is sourced and linked. Nothing here is peer-reviewed. Corrections are
      welcome and will be logged &mdash; open an issue on the
      <a href="${SITE.repo}">repository</a> or email
      <a href="mailto:${SITE.contact}?subject=r1_Fuel%20correction">${SITE.contact}</a>.
    </p>
  </div>
</footer>`;
}

/**
 * Wrap body content in the full document shell.
 * @param {{title:string, description:string, active:string, depth:number, body:string, ogTitle?:string}} o
 */
function page(o) {
  const depth = o.depth || 0;
  const canonical = SITE.origin + (o.path || SITE.base);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${o.title}</title>
<meta name="description" content="${o.description}">
<link rel="canonical" href="${canonical}">

<meta property="og:title" content="${o.ogTitle || o.title}">
<meta property="og:description" content="${o.description}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Farzana Reza Shifa — Research">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${o.ogTitle || o.title}">
<meta name="twitter:description" content="${o.description}">

<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${assetPath(depth)}">
</head>
<body>

${nav(o.active, depth)}

${o.body}

${footer()}

</body>
</html>
`;
}

module.exports = { SITE, NAV, page, nav, footer };
