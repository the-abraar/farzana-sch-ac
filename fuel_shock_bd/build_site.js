#!/usr/bin/env node
'use strict';

/* ---------------------------------------------------------------------------
 * r1_Fuel site build.
 *
 *   node build_site.js
 *
 * Hand-authored pages live in src/*.js; the three long-form documents are
 * rendered from content/*.md. Output is plain static HTML — nothing in the
 * published site needs a build step or a CDN to run.
 * ------------------------------------------------------------------------- */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const { page, SITE } = require('./src/shell');
const home = require('./src/home');
const collaborate = require('./src/collaborate');
const support = require('./src/support');
const data = require('./src/data');
const status = require('./src/status');

const ROOT = __dirname;
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

function write(rel, html) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`  ${rel.padEnd(34)} ${(html.length / 1024).toFixed(1)} KB`);
}

/* --- Markdown ------------------------------------------------------------ */

/** Links between the source repo's files map onto site routes. */
const LINK_MAP = {
  'README.md': '/fuel_shock_bd/findings/',
  'research_proposals.md': '/fuel_shock_bd/proposal/',
  'research_collaborators.md': '/fuel_shock_bd/collaborate/',
  'reseach_pass_1.md': '/fuel_shock_bd/data/log/',
  '../research_proposals.md': '/fuel_shock_bd/proposal/',
  'Bangladesh_Fuel_Hike_Impact_2026.pdf': '/fuel_shock_bd/data/Bangladesh_Fuel_Hike_Impact_2026.pdf',
};

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);

/**
 * Render markdown to the site's prose HTML: heading anchors, scroll-wrapped
 * tables, rewritten repo-relative links, and `[est.]` turned into a marker.
 */
// The analysis writes approximations as `~$223mn`, `~Tk 1.2bn`, `~5%`. GFM reads a
// pair of those tildes as strikethrough and swallows everything between them, which
// silently mangles figures. Neutralise single tildes outside code, where they are
// always approximation signs and never markup. `~~` is left alone.
function escapeLooseTildes(md) {
  // Split on fenced blocks and inline code so code is passed through untouched.
  return md
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((chunk, i) => (i % 2 ? chunk : chunk.replace(/(?<!~)~(?!~)/g, '&#126;')))
    .join('');
}

function renderMarkdown(rawMd) {
  const md = escapeLooseTildes(rawMd);
  const renderer = new marked.Renderer();
  const headings = [];

  renderer.heading = function (tok) {
    const depth = tok.depth;
    const text = this.parser.parseInline(tok.tokens);
    const id = slug(text);
    if (depth === 2) headings.push({ id, text });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  renderer.table = function (tok) {
    const html = marked.Renderer.prototype.table.call(this, tok);
    return `<div class="tbl">${html}</div>\n`;
  };

  renderer.link = function (tok) {
    let href = tok.href || '';
    for (const [from, to] of Object.entries(LINK_MAP)) {
      if (href === from || href.endsWith('/' + from)) { href = to; break; }
    }
    const text = this.parser.parseInline(tok.tokens);
    const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${ext}>${text}</a>`;
  };

  let html = marked.parse(md, { renderer, mangle: false, headerIds: false });

  // `[est.]` is the analysis's marker for a figure derived here rather than cited.
  html = html.replace(/\[est\.\]/g, '<span class="est">est.</span>');

  return { html, headings };
}

function tocHTML(headings) {
  if (headings.length < 3) return '';
  return `<nav class="toc" aria-label="Contents">
  <div class="t">On this page</div>
  <ol>
${headings.map((h) => `    <li><a href="#${h.id}">${h.text.replace(/^\d+\.\s*/, '')}</a></li>`).join('\n')}
  </ol>
</nav>`;
}

/**
 * A long-form document page: headline block, contents, then the prose.
 * The markdown's own leading H1 is dropped in favour of the page header.
 */
function docPage(o) {
  const src = o.pre ? o.pre(read(o.src)) : read(o.src);
  const { html, headings } = renderMarkdown(src);
  const bodyHTML = html.replace(/^<h1[^>]*>[\s\S]*?<\/h1>\s*/, '');

  const body = `
<div class="read">
  <header class="doc-head">
    <div class="kicker">${o.kicker}</div>
    <h1>${o.h1}</h1>
    <p class="meta">${o.meta}</p>
    ${o.actions || ''}
  </header>
  ${tocHTML(headings)}
  <article class="prose">
${bodyHTML}
  </article>
  ${o.after || ''}
</div>`;

  return page({
    title: o.title,
    description: o.description,
    ogTitle: o.ogTitle,
    active: o.active,
    depth: o.depth,
    path: o.path,
    body,
  });
}

const actions = (links) =>
  `<div class="btn-row">${links
    .map((l, i) => `<a class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}" href="${l.href}">${l.label}</a>`)
    .join('')}</div>`;

const nextBlock = (title, text, links) => `
  <div class="card" style="margin-top:56px;">
    <h3 style="font-size:21px;">${title}</h3>
    <p class="muted" style="font-size:15px;margin-top:10px;">${text}</p>
    ${actions(links)}
  </div>`;

/* --- Build --------------------------------------------------------------- */

console.log('\nBuilding r1_Fuel site…\n');

write(
  'index.html',
  page({
    title: 'r1_Fuel — Bangladesh’s 2026 fuel shock, and the part nobody is measuring',
    ogTitle: 'Tk 20 a litre, overnight. The part nobody is measuring.',
    description: home.DESC,
    active: 'home',
    depth: 0,
    path: '/fuel_shock_bd/',
    body: home.body(),
  })
);

write(
  'findings/index.html',
  docPage({
    src: 'content/analysis.md',
    // The front matter (event, date, convention, file list) is carried by the
    // page header and the action buttons, so drop it from the prose.
    pre: (md) => md.replace(/^# [^\n]*\n[\s\S]*?\n---\n/, '# Bangladesh Fuel Price Hike\n\n'),
    active: 'findings',
    depth: 1,
    path: '/fuel_shock_bd/findings/',
    kicker: 'The analysis · 21 September 2026',
    h1: 'Bangladesh Fuel Price Hike — Impact Analysis',
    meta:
      'Retail diesel, petrol, octane and kerosene raised by Tk 20 a litre, effective 00:00 on 21 September 2026. ' +
      'Reported figures are cited; numbers marked <span class="est">est.</span> are this project’s own ' +
      'calculations from cited inputs, with the method shown inline.',
    actions: actions([
      { href: '/fuel_shock_bd/data/log/', label: 'The audit log behind this' },
      { href: '/fuel_shock_bd/data/Bangladesh_Fuel_Hike_Impact_2026.pdf', label: 'Illustrated PDF' },
      { href: '/fuel_shock_bd/proposal/', label: 'What to do about it' },
    ]),
    after: nextBlock(
      'This says what the hike does to prices. It cannot say what it does to people.',
      'That gap — how households cope, what they give up first, whom they blame, whether they think it was fair — is what the research programme is built to measure, and the baseline has to be collected before late October.',
      [
        { href: '/fuel_shock_bd/proposal/', label: 'The research plan' },
        { href: '/fuel_shock_bd/collaborate/', label: 'Collaborate' },
        { href: '/fuel_shock_bd/support/', label: 'Fund it' },
      ]
    ),
    title: 'The analysis — Bangladesh Fuel Price Hike, September 2026 · r1_Fuel',
    description:
      'Sourced impact analysis of Bangladesh’s 21 September 2026 fuel hike: inflation, transport fares, the Boro ' +
      'irrigation shock, RMG and LDC graduation, the power feedback loop, macro, and the pay-scale wedge.',
  })
);

write(
  'proposal/index.html',
  docPage({
    src: 'content/proposals.md',
    active: 'proposal',
    depth: 1,
    path: '/fuel_shock_bd/proposal/',
    kicker: 'Research plan · drafted 21 September 2026',
    h1: 'The Social Life of a Fuel Shock',
    meta:
      'Open research questions and five costed study designs. P1 is the backbone the others attach to; each can also ' +
      'stand alone. Sampling, instruments, analysis plans, budgets and ethics are all here.',
    actions: actions([
      { href: '/fuel_shock_bd/collaborate/', label: 'Five roles that are open' },
      { href: '/fuel_shock_bd/support/', label: 'What each study costs' },
      { href: '/fuel_shock_bd/findings/', label: 'The analysis behind it' },
    ]),
    after: nextBlock(
      'None of this happens without a host, a lead, or a survey partner.',
      'The binding constraint is not money — it is that almost every funder needs a PhD-holding PI or an institutional host. If you can supply one, or want to lead a strand, that is the conversation worth having this week.',
      [
        { href: '/fuel_shock_bd/collaborate/', label: 'Collaborate' },
        { href: '/fuel_shock_bd/support/', label: 'Fund a wave' },
      ]
    ),
    title: 'Research plan — five studies on the social life of a fuel shock · r1_Fuel',
    description:
      'Open research questions and five costed designs on Bangladesh’s 2026 fuel shock: a rapid household phone ' +
      'panel, an e-rickshaw ethnography, a Boro irrigation survey, computational discourse analysis, and a conjoint ' +
      'experiment on compensation.',
  })
);

write(
  'data/log/index.html',
  docPage({
    src: 'content/audit_log.md',
    active: 'data',
    depth: 2,
    path: '/fuel_shock_bd/data/log/',
    kicker: 'Audit log · research pass 1',
    h1: 'Every search, every figure, every derivation',
    meta:
      'The working file behind the analysis: the originating question, every search run, every figure extracted with ' +
      'its source, and every derived calculation. Published so that any number on this site can be traced back or ' +
      'shown to be wrong.',
    actions: actions([
      { href: '/fuel_shock_bd/findings/', label: 'The analysis it produced' },
      { href: '/fuel_shock_bd/data/', label: 'Data &amp; method' },
    ]),
    title: 'Audit log — research pass 1 · r1_Fuel',
    description:
      'The complete audit trail behind the r1_Fuel impact analysis: every search, every extracted figure with its ' +
      'source, and every derived calculation.',
  })
);

write(
  'collaborate/index.html',
  page({
    title: 'Collaborate — five open roles on r1_Fuel',
    ogTitle: 'The economics half is done. The half that matters isn’t.',
    description: collaborate.DESC,
    active: 'collaborate',
    depth: 1,
    path: '/fuel_shock_bd/collaborate/',
    body: collaborate.body(),
  })
);

write(
  'support/index.html',
  page({
    title: 'Fund it — what $12,000 buys before the window closes · r1_Fuel',
    ogTitle: '$12,000 buys a measurement that expires in October.',
    description: support.DESC,
    active: 'support',
    depth: 1,
    path: '/fuel_shock_bd/support/',
    body: support.body(),
  })
);

write(
  'data/index.html',
  page({
    title: 'Data &amp; method — including what doesn’t work yet · r1_Fuel',
    ogTitle: 'Everything, including what doesn’t work yet.',
    description: data.DESC,
    active: 'data',
    depth: 1,
    path: '/fuel_shock_bd/data/',
    body: data.body(),
  })
);

write(
  'status/index.html',
  page({
    title: 'Status — what is done, what is blocked · r1_Fuel',
    ogTitle: 'Phase 1: baseline and outreach.',
    description: status.DESC,
    active: 'status',
    depth: 1,
    path: '/fuel_shock_bd/status/',
    body: status.body(),
  })
);

console.log(`\nDone. ${SITE.origin}${SITE.base}\n`);
