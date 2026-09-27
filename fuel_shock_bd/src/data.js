'use strict';

const C = require('./charts');
const WEEKLY = require('../content/coverage_weekly.json');

const DESC =
  'Everything r1_Fuel has built: the impact analysis, the full audit log, a 1,996-article bilingual news corpus, ' +
  'the discourse pipeline and its validation failures, and the data anyone can reuse without collecting anything.';

/* Validation of the v0 keyword frame classifier against a single-coder pass,
   restricted to Bangladesh-relevant articles (n = 113). Source:
   p4_discourse/out/validation_C_bd.csv */
const VALIDATION = [
  ['protest', 0.90, 1.00, 0.947, 'Usable'],
  ['fairness &amp; pay scale', 0.625, 0.833, 0.714, 'Borderline'],
  ['global market', 0.739, 0.68, 0.708, 'Borderline'],
  ['corruption / syndicate', 0.667, 0.50, 0.571, 'Not usable'],
  ['fiscal loss', 0.375, 0.706, 0.49, 'Not usable'],
  ['India', 0.333, 0.80, 0.471, 'Not usable'],
  ['government failure', 0.778, 0.233, 0.359, 'Not usable'],
  ['apology / empathy', 0.50, 0.125, 0.20, 'Not usable'],
];

function validationHTML() {
  return VALIDATION.map(([frame, p, r, f1, verdict]) => {
    const cls = verdict === 'Usable' ? 'ok' : verdict === 'Borderline' ? 'warn' : '';
    const w = Math.round(f1 * 100);
    return `<tr>
            <td><strong>${frame}</strong></td>
            <td class="num mono">${p.toFixed(2)}</td>
            <td class="num mono">${r.toFixed(2)}</td>
            <td class="num mono"><span style="display:inline-flex;align-items:center;gap:8px;justify-content:flex-end;">
              <span style="display:inline-block;width:64px;height:7px;background:var(--line);border-radius:4px;overflow:hidden;"><span style="display:block;width:${w}%;height:100%;background:${f1 >= 0.7 ? 'var(--accent)' : '#A5A39D'};"></span></span>
              <span style="font-weight:700;">${f1.toFixed(2)}</span></span></td>
            <td><span class="tag ${cls}">${verdict}</span></td>
          </tr>`;
  }).join('\n          ');
}

const REUSE = [
  ['BBS <strong>HIES 2022</strong> microdata', 'Baseline spending shares on fuel, transport and kerosene by decile and district', 'BBS request / World Bank Microdata Library'],
  ['BBS <strong>Labour Force Survey</strong> (quarterly)', 'Sector of employment, informality, wages', 'BBS'],
  ['BBS <strong>CPI</strong> (monthly, divisional)', 'Pass-through timing by item &mdash; the series that will show the October break', 'Public releases'],
  ['BPC price gazettes, <strong>BERC</strong> orders, Ministry of Finance duty data', 'Price and duty series, including the Tk 32.44/L diesel duty', 'Public'],
  ['<strong>BIGD / PPRC</strong> COVID-era phone panels', 'A proven design, and possibly a sampling frame to re-contact', 'Partnership'],
  ['<strong>SANEM</strong> household surveys', 'Recent welfare baselines, including the 2023 inflation-coping survey', 'Partnership'],
  ['<strong>ACLED</strong> and news archives', 'Protest event data, 2022&ndash;2026', 'Free registration'],
  ['DAE / BADC', 'Boro area targets versus actuals; irrigation equipment counts', 'Request'],
  ['<strong>Google Trends</strong>, Meta Content Library', 'Search and discussion signals', 'Public / application'],
  ['Night-lights (VIIRS)', 'A usable proxy for loadshedding by district', 'Free'],
];

function body() {
  return `
<header class="hero" style="padding-bottom:20px;">
  <div class="wrap">
    <div class="eyebrow"><span class="dot"></span> Data &amp; method</div>
    <h1 class="display">Everything, including<br><span class="serif">what doesn&rsquo;t work yet.</span></h1>
    <p class="lede">
      Every figure on this site traces to either a cited source or a derivation shown inline. Every derived number is
      marked <span class="est">est.</span> Every pipeline that produces a number here also has a section below
      explaining where it fails. That is not modesty &mdash; it is so that a collaborator can price the work honestly
      before joining, and a reader can tell a measurement from a guess.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/fuel_shock_bd/data/log/">The full audit log</a>
      <a class="btn btn-ghost" href="/fuel_shock_bd/data/Bangladesh_Fuel_Hike_Impact_2026.pdf">Illustrated PDF report</a>
      <a class="btn btn-ghost" href="https://github.com/the-abraar/FuelPriceHikeImpactResearch">Code &amp; outputs</a>
    </div>
  </div>
</header>

<section style="padding-top:12px;">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">What&rsquo;s published</div>
      <h2>Four artefacts, all public</h2>
    </div>
    <div class="grid g4">
      <div class="card">
        <span class="tag accent">Analysis</span>
        <h3 style="font-size:18px;margin-top:12px;">The impact analysis</h3>
        <p class="muted small" style="margin-top:10px;">Inflation, fares, agriculture, industry, power, macro and the distributional wedge, with policy levers ranked by effect per taka.</p>
        <p class="small" style="margin-top:12px;"><a href="/fuel_shock_bd/findings/" style="color:var(--accent);text-decoration:none;">Read &rarr;</a></p>
      </div>
      <div class="card">
        <span class="tag accent">Audit</span>
        <h3 style="font-size:18px;margin-top:12px;">Research pass 1</h3>
        <p class="muted small" style="margin-top:10px;">The working file: the originating question, every search run, every figure extracted with its source, and every derived calculation.</p>
        <p class="small" style="margin-top:12px;"><a href="/fuel_shock_bd/data/log/" style="color:var(--accent);text-decoration:none;">Read &rarr;</a></p>
      </div>
      <div class="card">
        <span class="tag accent">Corpus</span>
        <h3 style="font-size:18px;margin-top:12px;">P4 discourse corpus</h3>
        <p class="muted small" style="margin-top:10px;">1,996 fuel articles across three outlets and two shock windows, with frame flags, plus the pipeline that produced them.</p>
        <p class="small" style="margin-top:12px;"><a href="#p4" style="color:var(--accent);text-decoration:none;">Details &rarr;</a></p>
      </div>
      <div class="card">
        <span class="tag accent">Designs</span>
        <h3 style="font-size:18px;margin-top:12px;">Five study designs</h3>
        <p class="muted small" style="margin-top:10px;">Questions, sampling, instruments, analysis plans, budgets and ethics for P1 through P5.</p>
        <p class="small" style="margin-top:12px;"><a href="/fuel_shock_bd/proposal/" style="color:var(--accent);text-decoration:none;">Read &rarr;</a></p>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section id="conventions">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Conventions</div>
      <h2>How to read a number on this site</h2>
    </div>
    <div class="grid g3">
      <div class="card">
        <h3 style="font-size:18px;">Cited figures</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">Unmarked numbers are reported figures with a source link in the analysis. Prices, BPC balances, CPI prints, gazette values and quoted statements all sit here.</p>
      </div>
      <div class="card">
        <h3 style="font-size:18px;">Derived figures <span class="est">est.</span></h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">This project&rsquo;s own arithmetic from cited inputs, with the method shown inline. They are not sourced claims and should not be quoted as if they were. Work-time per litre, per-bigha irrigation cost, the CPI decomposition and the scenario probabilities are all of this kind.</p>
      </div>
      <div class="card">
        <h3 style="font-size:18px;">Internal cross-checks</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">Where possible a derivation is checked against an independent reported figure. Implied diesel throughput of ~12.2 million litres a day, derived from BPC&rsquo;s stated per-litre loss, reconciles with the government&rsquo;s own claimed ~Tk 10,000 crore annual saving &mdash; which is a reason to trust both.</p>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section id="p4">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">P4 &middot; Discourse corpus</div>
      <h2>1,996 articles, a working pipeline, and a classifier that isn&rsquo;t good enough</h2>
      <p>
        P4 needs no fieldwork, so it started immediately. The corpus and infrastructure are real. The frame classifier
        is a keyword dictionary, and the validation below is the reason its frame shares are presented as pipeline
        output rather than as findings.
      </p>
    </div>

    <div class="grid g4" style="margin-bottom:34px;">
      <div class="stat"><div class="val accent">1,996</div><div class="lbl">Articles collected</div><div class="note">20 Jul 2022 &ndash; 21 Sep 2026, all passing the fuel-relevance filter.</div></div>
      <div class="stat"><div class="val">1,476</div><div class="lbl">Bangla / 520 English</div><div class="note">Prothom Alo 1,092 &middot; Daily Star 520 &middot; Samakal 384.</div></div>
      <div class="stat"><div class="val">2</div><div class="lbl">Shock windows</div><div class="note">561 articles around the 2022 record hike; 1,435 across March&ndash;September 2026.</div></div>
      <div class="stat"><div class="val">186</div><div class="lbl">Coding sample</div><div class="note">Stratified by language and period, awaiting two human coders.</div></div>
    </div>

    <div class="loop-fig" style="margin-bottom:38px;">
      <div style="font-family:'Inter Tight',sans-serif;font-weight:700;font-size:17px;margin-bottom:4px;">Fuel coverage, articles per week</div>
      <div class="small muted" style="margin-bottom:20px;">The corpus itself, plotted. Hover any point for that week&rsquo;s count.</div>
      ${C.figCoverage(WEEKLY)}
      <p class="fig-cap">
        Two things worth noticing. <strong>2022 behaves the way you would expect</strong> &mdash; coverage spikes to 165
        articles in the week of the record hike, then decays over a month. <strong>2026 does not.</strong> Volume was
        already far higher through March and April, driven by the Hormuz shock and loadshedding rather than by any
        single price decision, and by September a Tk 20 hike arriving two days after the pay-scale gazette barely lifts
        it above the summer baseline. Whether that is fatigue, saturation or something about how the September
        decisions were covered is exactly the sort of question the frame classifier is supposed to answer &mdash; and
        currently cannot.
      </p>
    </div>

    <h3 style="font-size:21px;margin-bottom:8px;">How the classifier actually performs</h3>
    <p class="muted" style="max-width:740px;margin-bottom:22px;font-size:15px;">
      Measured against a single-coder pass over Bangladesh-relevant articles (n = 113). One frame is usable, two are
      borderline, and five are not. <strong>Government failure recovers only 23% of the cases it should</strong> &mdash;
      it misses opposition and criticism language almost entirely &mdash; and apology/empathy recovers 12%.
    </p>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Frame</th><th class="num">Precision</th><th class="num">Recall</th><th class="num">F1</th><th>Verdict</th></tr></thead>
        <tbody>
          ${validationHTML()}
        </tbody>
      </table>
    </div>
    <p class="small muted" style="margin-top:16px;max-width:760px;">
      And the comparison itself is weak: one coder, reading truncated text, who also helped design the dictionary and
      the codebook. It shows where the dictionary is weak; it certifies nothing. Getting to kappa above 0.7 needs two
      independent human coders, and getting the frames usable needs a BanglaBERT-class model.
    </p>

    <div class="grid g2" style="margin-top:36px;">
      <div class="card">
        <h3 style="font-size:19px;">How the corpus was collected</h3>
        <ul class="check" style="margin-top:14px;">
          <li><strong>Prothom Alo</strong> &mdash; public search API, four fuel queries by month chunk, full text in response, relevance-ranked to 200 per query-month then regex filtered</li>
          <li><strong>Samakal</strong> &mdash; daily sitemaps with a Bangla slug and caption filter</li>
          <li><strong>The Daily Star</strong> &mdash; yearly sitemaps with an English slug filter and <span class="mono">lastmod</span> inside the window</li>
          <li>Windows: 20 Jul &ndash; 15 Sep 2022 around the record hike; 1 Mar &ndash; 21 Sep 2026 across three hikes, the PM&rsquo;s 5 September apology and the 19 September pay-scale gazette</li>
          <li>Honest user agent, robots.txt and crawl-delay respected, at least 1.5 s between requests per host, responses cached</li>
          <li>Article text is copyrighted and stays unpublished. Only metadata and frame flags are committed</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="font-size:19px;">Where it is biased, stated plainly</h3>
        <ul class="check" style="margin-top:14px;">
          <li class="off">Three outlets, all Dhaka-centred and centrist or pro-establishment. This is <strong>not</strong> &ldquo;Bangla public discourse&rdquo;</li>
          <li class="off">Prothom Alo dominates by volume because its API returns full text while sitemap routes are lossier, so pooled Bangla shares are largely one outlet</li>
          <li class="off">Sitemap-based sources only recover articles whose slug or caption names a fuel term, and miss articles updated after the window</li>
          <li class="off">Presence is not stance: an article rebutting a claim still scores its frame</li>
          <li class="off">About 39% of the &ldquo;about fuel&rdquo; corpus is not about Bangladesh &mdash; wire market reports, other countries &mdash; which inflates the global-market frame unless filtered first</li>
          <li class="off">Period comparison is uncontrolled: eight weeks in 2022 against seven months of overlapping shocks in 2026. Differences are descriptive only</li>
          <li class="off">No Facebook, YouTube, parliamentary debates, Jugantor, Kaler Kantho or TBS yet</li>
          <li class="off">Protest is a news-mention proxy, not an ACLED event count</li>
        </ul>
      </div>
    </div>

    <div class="card" style="margin-top:24px;">
      <h3 style="font-size:19px;">Download the outputs</h3>
      <p class="muted small" style="margin-top:10px;font-size:14.5px;">
        Served straight off this site &mdash; no account, no request. Article text is not included in any of them.
      </p>
      <div class="table-wrap" style="margin-top:16px;">
        <table class="data">
          <thead><tr><th style="width:38%;">File</th><th>What it holds</th><th class="num">Size</th></tr></thead>
          <tbody>
            <tr><td class="small"><a href="/fuel_shock_bd/p4_discourse/out/articles_with_frames.csv" style="color:var(--accent);text-decoration:none;">articles_with_frames.csv</a></td><td class="small muted">All 1,996 articles: URL, date, source, language, window, headline and every frame flag with the terms that triggered it.</td><td class="num mono">972 KB</td></tr>
            <tr><td class="small"><a href="/fuel_shock_bd/p4_discourse/out/frame_shares_by_period.csv" style="color:var(--accent);text-decoration:none;">frame_shares_by_period.csv</a></td><td class="small muted">Frame shares by language and period with Wilson confidence intervals. Pipeline output, not findings &mdash; read the table above first.</td><td class="num mono">10 KB</td></tr>
            <tr><td class="small"><a href="/fuel_shock_bd/p4_discourse/out/validation_C_bd.csv" style="color:var(--accent);text-decoration:none;">validation_C_bd.csv</a></td><td class="small muted">The validation run behind the table above, restricted to Bangladesh-relevant articles.</td><td class="num mono">&lt;1 KB</td></tr>
            <tr><td class="small"><a href="/fuel_shock_bd/p4_discourse/out/topics_exploratory.md" style="color:var(--accent);text-decoration:none;">topics_exploratory.md</a></td><td class="small muted">Exploratory NMF topics. Genuinely exploratory &mdash; not interpreted anywhere.</td><td class="num mono">2 KB</td></tr>
            <tr><td class="small"><a href="/fuel_shock_bd/p4_discourse/codebook.md" style="color:var(--accent);text-decoration:none;">codebook.md</a></td><td class="small muted">Frame definitions and the coding protocol, for anyone willing to be one of the two human coders.</td><td class="num mono">3 KB</td></tr>
            <tr><td class="small"><a href="/fuel_shock_bd/p4_discourse/README.md" style="color:var(--accent);text-decoration:none;">p4_discourse/README.md</a></td><td class="small muted">The pipeline's own notes on collection, politeness, validation status and known limits.</td><td class="num mono">5 KB</td></tr>
          </tbody>
        </table>
      </div>
      <p class="small muted" style="margin-top:14px;">
        The pipeline&rsquo;s raw matplotlib figures are also on the server &mdash;
        <a href="/fuel_shock_bd/p4_discourse/out/volume_timeline.png" style="color:var(--accent);text-decoration:none;">volume_timeline.png</a> and
        <a href="/fuel_shock_bd/p4_discourse/out/frames_by_period.png" style="color:var(--accent);text-decoration:none;">frames_by_period.png</a>
        &mdash; with the per-outlet breakdown the chart above pools together.
      </p>
    </div>

    <div class="card" style="margin-top:24px;">
      <h3 style="font-size:19px;">Reproduce it</h3>
      <pre style="background:#16161A;color:#E8E6E1;padding:20px;border-radius:12px;overflow-x:auto;font-size:13px;line-height:1.6;margin:16px 0 0;"><code>uv venv .venv &amp;&amp; uv pip install requests lxml beautifulsoup4 pandas numpy scikit-learn matplotlib

cd p4_discourse/src
../../.venv/bin/python collect.py    # ~1 h, rate-limited; --sources / --windows / --limit
../../.venv/bin/python analyze.py    # tables and figures -> ../out/
../../.venv/bin/python validate.py --coders C --bd-only</code></pre>
      <p class="small muted" style="margin-top:14px;">
        Outputs: <span class="mono">volume_timeline.png</span>, <span class="mono">frames_by_period.png</span>,
        <span class="mono">frame_shares_by_period.csv</span> (with Wilson intervals),
        <span class="mono">topics_exploratory.md</span>, <span class="mono">articles_with_frames.csv</span> &mdash;
        URL, date, headline and frame flags, no article text.
      </p>
    </div>
  </div>
</section>

<hr class="rule">

<section id="reuse">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Reuse</div>
      <h2>Data you can work with without collecting anything</h2>
      <p>
        If you want to test something on this shock this week, these are the shortest routes in. Several of them also
        happen to be the partnership asks on the <a href="/fuel_shock_bd/collaborate/" style="color:var(--accent)">collaborate page</a>.
      </p>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th style="width:32%;">Source</th><th style="width:44%;">What it gives you</th><th>Access</th></tr></thead>
        <tbody>
          ${REUSE.map(([s, w, a]) => `<tr><td class="small">${s}</td><td class="small muted">${w}</td><td class="small">${a}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<hr class="rule">

<section id="cite">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Use it</div>
      <h2>Citing, correcting, reusing</h2>
    </div>
    <div class="grid g3">
      <div class="card">
        <h3 style="font-size:18px;">Cite it like this</h3>
        <div class="copy-field" style="margin-top:12px;display:block;line-height:1.7;">
          BlankFrame Research (2026). <em>r1_Fuel: Bangladesh Fuel Price Hike &mdash; Impact Analysis and Research
          Programme.</em> farzana.sch.ac/fuel_shock_bd/ (mirror of blankframe.tech/research/r1_Fuel/)
        </div>
        <p class="small muted" style="margin-top:12px;">It is not peer-reviewed. Cite it as a working analysis, and cite the underlying newspaper sources directly where you can.</p>
      </div>
      <div class="card">
        <h3 style="font-size:18px;">Corrections</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          A wrong number here is worth more to the project than agreement. Open an issue, or email with the figure and
          what you think it should be. Corrections are logged in public on the
          <a href="/fuel_shock_bd/status/" style="color:var(--accent);">status page</a>, not quietly patched.
        </p>
        <p class="small" style="margin-top:12px;"><a href="https://github.com/the-abraar/FuelPriceHikeImpactResearch/issues" style="color:var(--accent);text-decoration:none;">Open an issue &rarr;</a></p>
      </div>
      <div class="card">
        <h3 style="font-size:18px;">Known caveat worth repeating</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          Some outlets call 21 September the government&rsquo;s <em>second</em> hike of 2026. This analysis counts three
          since March, because the June change of Tk 5 applied only to petrol and octane. For diesel and kerosene it is
          the second. Word it accordingly if you quote the count.
        </p>
      </div>
    </div>
  </div>
</section>
`;
}

module.exports = { body, DESC };
