'use strict';

/* ---------------------------------------------------------------------------
 * Inline SVG charts for the r1_Fuel site. No runtime dependencies: every
 * figure is rendered to static markup at build time.
 *
 * Palette. These are single-series magnitude charts, so the encoding is one
 * hue (the house accent) against neutral ink. The one categorical pair the
 * site needs is #FF4A1F / #1B6FD4, which clears the lightness, chroma, CVD,
 * normal-vision and contrast checks in the dataviz validator against a white
 * surface. Part-of-whole splits use accent vs a hatched neutral rather than a
 * second hue, so nothing is carried by colour alone.
 * ------------------------------------------------------------------------- */

const INK = '#131313';
const INK_SOFT = '#2A2A28';
const MUTED = '#6F6E6A';
const FAINT = '#A5A39D';
const LINE = '#E6E4DE';
const ACCENT = '#FF4A1F';
const ALT = '#1B6FD4';
const SURFACE = '#FFFFFF';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Bar path with square baseline corners and 4px rounded data-end. */
function barPath(x, y, w, h, r = 4) {
  const rr = Math.max(0, Math.min(r, w, h / 2));
  if (w <= 0.5) return `M${x},${y} h0.5 v${h} h-0.5 Z`;
  return (
    `M${x},${y} H${x + w - rr} A${rr},${rr} 0 0 1 ${x + w},${y + rr} ` +
    `V${y + h - rr} A${rr},${rr} 0 0 1 ${x + w - rr},${y + h} H${x} Z`
  );
}

const HATCH = `<pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="7" height="7" fill="${LINE}"/>
      <line x1="0" y1="0" x2="0" y2="7" stroke="${FAINT}" stroke-width="1.6" opacity="0.55"/>
    </pattern>`;

/**
 * Horizontal bar chart, one series, every bar directly labelled.
 * rows: [{ label, sub, value, display, tip, dim }]
 */
function hbar(rows, opts = {}) {
  const {
    max = Math.max(...rows.map((r) => r.value)) * 1.02,
    labelW = 172,
    valueW = 108,
    barH = 22,
    rowH = 44,
    width = 760,
    caption = '',
    marker = null, // { value, label }
  } = opts;

  const x0 = labelW;
  const plotW = width - labelW - valueW;
  const height = rows.length * rowH + 16;
  const sx = (v) => (v / max) * plotW;

  let out = `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(caption)}" preserveAspectRatio="xMidYMid meet">
  <defs>${HATCH}</defs>
  <line x1="${x0}" y1="6" x2="${x0}" y2="${height - 10}" stroke="${LINE}" stroke-width="1"/>`;

  if (marker) {
    const mx = x0 + sx(marker.value);
    out += `
  <line x1="${mx.toFixed(1)}" y1="2" x2="${mx.toFixed(1)}" y2="${height - 22}" stroke="${FAINT}" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="${(mx + 6).toFixed(1)}" y="${height - 8}" font-family="Inter, sans-serif" font-size="11" fill="${MUTED}">${esc(marker.label)}</text>`;
  }

  rows.forEach((r, i) => {
    const y = 10 + i * rowH;
    const w = sx(r.value);
    const fill = r.dim ? 'url(#hatch)' : ACCENT;
    const stroke = r.dim ? `stroke="${FAINT}" stroke-width="1"` : '';
    out += `
  <text x="${x0 - 12}" y="${y + barH / 2 + 1}" text-anchor="end" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="13.5" font-weight="600" fill="${INK}">${esc(r.label)}</text>`;
    if (r.sub) {
      out += `
  <text x="${x0 - 12}" y="${y + barH / 2 + 15}" text-anchor="end" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="11.5" fill="${MUTED}">${esc(r.sub)}</text>`;
    }
    out += `
  <path d="${barPath(x0 + 1, y, w, barH)}" fill="${fill}" ${stroke}><title>${esc(r.tip || r.label + ': ' + r.display)}</title></path>
  <text x="${(x0 + w + 12).toFixed(1)}" y="${y + barH / 2 + 1}" dominant-baseline="middle" font-family="Inter Tight, Inter, sans-serif" font-size="14.5" font-weight="700" fill="${r.dim ? MUTED : INK}">${esc(r.display)}</text>`;
  });

  out += `\n</svg>`;
  return out;
}

/* --- Figure 1 ------------------------------------------------------------ */
function figPriceLadder() {
  return hbar(
    [
      { label: 'Furnace oil', sub: 'the grid runs on it', value: 62.0, display: '+62%', tip: 'Furnace oil Tk 70.10 → 113.54 between March and May 2026: +62%' },
      { label: 'Kerosene', sub: 'Tk 112 → 155', value: 38.4, display: '+38.4%', tip: 'Kerosene Tk 112 → 155: +38.4% since March' },
      { label: 'Petrol', sub: 'Tk 116 → 160', value: 37.9, display: '+37.9%', tip: 'Petrol Tk 116 → 160: +37.9% since March' },
      { label: 'Octane', sub: 'Tk 120 → 165', value: 37.5, display: '+37.5%', tip: 'Octane Tk 120 → 165: +37.5% since March — the headline number' },
      { label: 'Diesel', sub: 'Tk 100 → 135', value: 35.0, display: '+35.0%', tip: 'Diesel Tk 100 → 135: +35% since March — the macro variable' },
    ],
    {
      max: 68,
      caption:
        'Price change since March 2026 by fuel. Furnace oil +62%, kerosene +38.4%, petrol +37.9%, octane +37.5%, diesel +35.0%.',
    }
  );
}

/* --- Figure 2 ------------------------------------------------------------ */
function figAffordability() {
  return hbar(
    [
      { label: 'Median income', sub: 'Tk 9,000/month', value: 91.7, display: '91.7%', tip: '50 litres of octane costs 91.7% of a median monthly income' },
      { label: 'RMG minimum wage', sub: 'Tk 12,500, set Dec 2023', value: 66.0, display: '66.0%', tip: '50 litres of octane costs 66% of the RMG minimum wage' },
      { label: 'Average gross salary', sub: 'Tk 18,000/month', value: 45.8, display: '45.8%', tip: '50 litres of octane costs 45.8% of the average gross monthly salary' },
      { label: 'New govt lowest basic', sub: 'Tk 20,000, fully phased', value: 41.3, display: '41.3%', tip: '50 litres of octane costs 41.3% of the new government lowest basic pay' },
    ],
    {
      max: 100,
      caption:
        'Cost of one 50-litre tank of octane as a share of monthly income: 91.7% at the median, 66% on the RMG minimum wage, 45.8% on the average salary, 41.3% on the new government lowest basic.',
      marker: { value: 35, label: 'top of the "severe stress" band' },
    }
  );
}

/* --- Figure 3: the diesel gap -------------------------------------------- */
function figDieselGap() {
  const W = 760;
  const H = 200;
  const x0 = 24;
  const plotW = W - 48;
  const total = 187; // BPC's formula-implied price
  const sx = (v) => (v / total) * plotW;
  const yBar = 78;
  const h = 44;

  const segs = [
    { from: 0,   to: 100, value: 'Tk 100',  label: 'March price',        kind: 'base' },
    { from: 100, to: 115, value: '+15',     label: 'April + June hikes', kind: 'prior' },
    { from: 115, to: 135, value: '+20',     label: '21 September hike',  kind: 'now' },
    { from: 135, to: 187, value: 'Tk 52',   label: 'still unclosed',     kind: 'gap' },
  ];

  const fillFor = { base: '#D9D6CF', prior: '#FFB39C', now: ACCENT, gap: 'url(#hatch)' };
  const inkFor = { base: INK_SOFT, prior: INK_SOFT, now: '#FFFFFF', gap: INK_SOFT };

  let out = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Diesel price bar: Tk 100 in March, plus Tk 15 across the April and June hikes, plus Tk 20 on 21 September, reaching Tk 135 — against BPC's formula-implied Tk 187, leaving a Tk 52 gap still unclosed." preserveAspectRatio="xMidYMid meet">
  <defs>${HATCH}</defs>`;

  // Reference ticks, staggered onto two rows so the labels cannot collide.
  const x100 = x0;
  const x135 = x0 + sx(135);
  const x187 = x0 + sx(187);
  out += `
  <text x="${x100}" y="26" text-anchor="start" font-family="Inter, sans-serif" font-size="12" fill="${MUTED}">Tk 100 in March</text>
  <text x="${W - 24}" y="26" text-anchor="end" font-family="Inter, sans-serif" font-size="12" fill="${MUTED}">Tk 187 &#8212; BPC&#8217;s own formula price</text>
  <line x1="${x187}" y1="32" x2="${x187}" y2="${yBar}" stroke="${FAINT}" stroke-width="1"/>
  <line x1="${x135.toFixed(1)}" y1="56" x2="${x135.toFixed(1)}" y2="${yBar}" stroke="${ACCENT}" stroke-width="2"/>
  <text x="${(x135 - 8).toFixed(1)}" y="52" text-anchor="end" font-family="Inter Tight, Inter, sans-serif" font-size="13" font-weight="700" fill="${ACCENT}">Tk 135 &#8212; what you pay today</text>`;

  // Segments, with the value set inside each one.
  segs.forEach((s) => {
    const x = x0 + sx(s.from);
    const w = sx(s.to - s.from) - 2; // 2px surface gap between segments
    const isEnd = s.kind === 'gap';
    const d = isEnd ? barPath(x, yBar, w, h) : `M${x},${yBar} h${w} v${h} h${-w} Z`;
    out += `
  <path d="${d}" fill="${fillFor[s.kind]}"${isEnd ? ` stroke="${FAINT}" stroke-width="1"` : ''}><title>${esc(s.label)} — ${esc(s.value)}</title></path>
  <text x="${(x + w / 2).toFixed(1)}" y="${yBar + h / 2 + 1}" text-anchor="middle" dominant-baseline="middle" font-family="Inter Tight, Inter, sans-serif" font-size="14" font-weight="700" fill="${inkFor[s.kind]}">${esc(s.value)}</text>`;
  });

  // Legend row beneath the bar — keeps the narrow segments readable.
  const legendY = yBar + h + 34;
  let lx = x0;
  segs.forEach((s) => {
    const swatch = s.kind === 'gap' ? 'url(#hatch)' : fillFor[s.kind];
    out += `
  <rect x="${lx}" y="${legendY - 9}" width="11" height="11" rx="2.5" fill="${swatch}"${s.kind === 'gap' ? ` stroke="${FAINT}" stroke-width="1"` : ''}/>
  <text x="${lx + 17}" y="${legendY}" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="12.5" fill="${MUTED}">${esc(s.label)}</text>`;
    lx += 17 + s.label.length * 6.6 + 30;
  });

  out += `\n</svg>`;
  return out;
}

/* --- Figure 4: the reinforcing loop -------------------------------------- */
function figLoop() {
  const W = 760;
  const H = 440;
  const nodes = [
    { id: 'hike', x: 380, y: 40,  w: 218, h: 50, t: ['Fuel hike'], sub: 'diesel +17.4%, petrol +14.3%', hot: true },
    { id: 'swap', x: 606, y: 138, w: 262, h: 58, t: ['Liquid-fuel 3-wheelers', 'become uneconomic'], sub: 'riders switch to battery' },
    { id: 'load', x: 606, y: 274, w: 262, h: 58, t: ['E-rickshaw charging load', 'grows'], sub: '500 MW – 1 GW, 93% unmetered' },
    { id: 'shed', x: 380, y: 384, w: 248, h: 50, t: ['Deeper loadshedding'], sub: '7–10 hrs rural, 3,500 MW short' },
    { id: 'fo',   x: 154, y: 274, w: 262, h: 58, t: ['PDB burns furnace oil', 'and diesel to cover peak'], sub: 'Tk 113.54/L, ~Tk 1.2bn/day' },
    { id: 'def',  x: 154, y: 138, w: 262, h: 58, t: ['BPC and PDB deficits', 'widen'], sub: 'Tk 22,876 cr accumulated' },
  ];

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const order = ['hike', 'swap', 'load', 'shed', 'fo', 'def', 'hike'];
  const cx = W / 2, cy = 218;

  /** Where a ray leaving a node's centre crosses its box, plus a little air. */
  function edge(n, tx, ty, pad = 9) {
    const dx = tx - n.x, dy = ty - n.y;
    if (!dx && !dy) return [n.x, n.y];
    const sxr = Math.abs(dx) > 1e-6 ? (n.w / 2 + pad) / Math.abs(dx) : Infinity;
    const syr = Math.abs(dy) > 1e-6 ? (n.h / 2 + pad) / Math.abs(dy) : Infinity;
    const t = Math.min(sxr, syr);
    return [n.x + dx * t, n.y + dy * t];
  }

  let out = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="A reinforcing loop: a fuel hike makes liquid-fuel three-wheelers uneconomic, riders switch to battery rickshaws, unmetered charging load grows, loadshedding deepens, the power board burns expensive furnace oil and diesel to cover peak, BPC and PDB deficits widen, and pressure builds for the next hike." preserveAspectRatio="xMidYMid meet">
  <defs>
    <marker id="arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M0,1 L9,5 L0,9 z" fill="${FAINT}"/>
    </marker>
  </defs>`;

  for (let i = 0; i < order.length - 1; i++) {
    const a = byId[order[i]];
    const b = byId[order[i + 1]];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = mx - cx, dy = my - cy;
    const len = Math.hypot(dx, dy) || 1;
    const ctrlX = mx + (dx / len) * 34;
    const ctrlY = my + (dy / len) * 34;
    const [ax, ay] = edge(a, ctrlX, ctrlY);
    const [bx, by] = edge(b, ctrlX, ctrlY);
    out += `
  <path d="M${ax.toFixed(1)},${ay.toFixed(1)} Q${ctrlX.toFixed(0)},${ctrlY.toFixed(0)} ${bx.toFixed(1)},${by.toFixed(1)}" fill="none" stroke="${FAINT}" stroke-width="1.6" stroke-dasharray="4 4" marker-end="url(#arw)" opacity="0.9"/>`;
  }

  out += `
  <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" font-family="Instrument Serif, Georgia, serif" font-style="italic" font-size="21" fill="${FAINT}">a reinforcing loop</text>`;

  nodes.forEach((n) => {
    const x = n.x - n.w / 2;
    const y = n.y - n.h / 2;
    out += `
  <rect x="${x}" y="${y}" width="${n.w}" height="${n.h}" rx="12" fill="${SURFACE}" stroke="${n.hot ? ACCENT : LINE}" stroke-width="${n.hot ? 2 : 1.4}"/>`;
    const lines = n.t;
    const baseY = n.sub ? n.y - (lines.length - 1) * 7.5 - 5 : n.y + 1;
    lines.forEach((ln, i) => {
      out += `
  <text x="${n.x}" y="${baseY + i * 15}" text-anchor="middle" dominant-baseline="middle" font-family="Inter Tight, Inter, sans-serif" font-size="13" font-weight="700" fill="${n.hot ? ACCENT : INK}">${esc(ln)}</text>`;
    });
    if (n.sub) {
      out += `
  <text x="${n.x}" y="${baseY + lines.length * 15 + 2}" text-anchor="middle" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="11" fill="${MUTED}">${esc(n.sub)}</text>`;
    }
  });

  out += `\n</svg>`;
  return out;
}

/* --- Figure 5: the wedge -------------------------------------------------- */
function figWedge() {
  return hbar(
    [
      { label: 'Govt grades 11–20', sub: '~33 lakh people, incl. pensioners', value: 142, display: '+142%', tip: 'Government pay scale 2026: basic pay up to +142% for grades 11–20, phased over three years' },
      { label: 'Govt grades 1–10', sub: 'first pay award in 11 years', value: 100, display: '+100%', tip: 'Government pay scale 2026: basic pay up to +100% for grades 1–10' },
      { label: 'RMG minimum wage', sub: '~4 million garment workers', value: 0, display: 'Tk 0', tip: 'The RMG minimum wage has not been reset since December 2023', dim: true },
      { label: 'Informal workers', sub: '~85% of all employment', value: 0, display: 'no mechanism', tip: 'About 85% of Bangladeshi employment sits outside any wage-setting mechanism at all', dim: true },
    ],
    {
      max: 150,
      valueW: 140,
      caption:
        'Nominal change in basic pay since 2023: up to +142% for government grades 11–20 and +100% for grades 1–10, against no reset at all for the RMG minimum wage or informal workers.',
    }
  );
}

module.exports = { figPriceLadder, figAffordability, figDieselGap, figLoop, figWedge, hbar, ACCENT, ALT };

/* --- Figure 6: P4 coverage volume ----------------------------------------
 * Weekly article counts from p4_discourse/out/articles_with_frames.csv, drawn
 * in the site's own style rather than embedding the pipeline's matplotlib PNG.
 * One series (total volume), so no categorical palette is needed.
 * ----------------------------------------------------------------------- */
function figCoverage(weekly) {
  const W = 760, H = 300;
  const top = 62, plotH = 166, base = top + plotH;
  const yMax = 200;
  const sy = (v) => base - (v / yMax) * plotH;

  const panels = [
    { key: 'w2022', title: '2022', x: 46, w: 150, events: [['2022-08-05', 'record hike']] },
    {
      key: 'w2026', title: '2026', x: 262, w: 470,
      events: [['2026-04-18', 'Apr hike'], ['2026-06-01', 'Jun hike'], ['2026-09-21', 'Sep hike + pay scale']],
    },
  ];

  let out = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Weekly counts of fuel-related articles. In 2022 coverage peaks at 165 articles in the week of the record hike and decays over the following month. In 2026 coverage runs far higher through March and April, peaking at 189 in early April, then settles to 15–30 a week through the summer before lifting again in September." preserveAspectRatio="xMidYMid meet">`;

  // Shared gridlines and y labels.
  for (let v = 0; v <= yMax; v += 50) {
    const y = sy(v);
    out += `
  <line x1="46" y1="${y.toFixed(1)}" x2="${W - 28}" y2="${y.toFixed(1)}" stroke="${LINE}" stroke-width="1"/>
  <text x="40" y="${(y + 4).toFixed(1)}" text-anchor="end" font-family="Inter, sans-serif" font-size="11" fill="${FAINT}">${v}</text>`;
  }

  panels.forEach((p) => {
    const pts = weekly[p.key];
    const n = pts.length;
    const sx = (i) => p.x + (n === 1 ? p.w / 2 : (i / (n - 1)) * p.w);
    const idxOf = (iso) => {
      let best = 0, bestD = Infinity;
      pts.forEach(([d], i) => {
        const diff = Math.abs(Date.parse(d) - Date.parse(iso));
        if (diff < bestD) { bestD = diff; best = i; }
      });
      return best;
    };

    out += `
  <text x="${p.x}" y="26" font-family="Inter Tight, Inter, sans-serif" font-size="14" font-weight="700" fill="${INK}">${p.title}</text>
  <text x="${p.x + 44}" y="26" font-family="Inter, sans-serif" font-size="12" fill="${MUTED}">${n} weeks &middot; ${pts.reduce((a, b) => a + b[1], 0).toLocaleString('en')} articles</text>`;

    // Event markers, drawn under the series.
    p.events.forEach(([iso, label]) => {
      const x = sx(idxOf(iso));
      const anchor = x > p.x + p.w - 70 ? 'end' : 'middle';
      out += `
  <line x1="${x.toFixed(1)}" y1="${top - 6}" x2="${x.toFixed(1)}" y2="${base}" stroke="${ACCENT}" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/>
  <text x="${x.toFixed(1)}" y="${top - 11}" text-anchor="${anchor}" font-family="Inter, sans-serif" font-size="10.5" font-weight="600" fill="${ACCENT}">${esc(label)}</text>`;
    });

    const line = pts.map(([, v], i) => `${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' L');
    out += `
  <path d="M${p.x},${base} L${line} L${(p.x + p.w).toFixed(1)},${base} Z" fill="${ACCENT}" opacity="0.10"/>
  <path d="M${line}" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;

    pts.forEach(([d, v], i) => {
      out += `
  <circle cx="${sx(i).toFixed(1)}" cy="${sy(v).toFixed(1)}" r="3" fill="${SURFACE}" stroke="${ACCENT}" stroke-width="1.6"><title>Week of ${d}: ${v} articles</title></circle>`;
    });

    // X labels: first and last week of each panel.
    const fmt = (iso) => {
      const dt = new Date(iso + 'T00:00:00Z');
      return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    };
    out += `
  <line x1="${p.x}" y1="${base}" x2="${(p.x + p.w).toFixed(1)}" y2="${base}" stroke="${INK}" stroke-width="1"/>
  <text x="${p.x}" y="${base + 18}" text-anchor="start" font-family="Inter, sans-serif" font-size="11" fill="${MUTED}">${fmt(pts[0][0])}</text>
  <text x="${(p.x + p.w).toFixed(1)}" y="${base + 18}" text-anchor="end" font-family="Inter, sans-serif" font-size="11" fill="${MUTED}">${fmt(pts[n - 1][0])}</text>`;
  });

  out += `
  <text x="46" y="${H - 8}" font-family="Inter, sans-serif" font-size="11" fill="${FAINT}">Articles per week, all three outlets pooled. Edge weeks are partial: the 2026 series ends on 21 September, a single day.</text>
</svg>`;
  return out;
}

module.exports.figCoverage = figCoverage;
