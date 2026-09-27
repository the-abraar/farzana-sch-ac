'use strict';

const DESC =
  'Where r1_Fuel actually stands: what is done, what is blocked, the two deadlines that cannot slip, and a public ' +
  'changelog including corrections.';

const CHANGELOG = [
  ['21 Sep 2026', 'Public site published — overview, analysis, research plan, collaboration, funding, data and method.', 'done'],
  ['21 Sep 2026', 'P4 corpus rebuilt on the full source set; Samakal footer boilerplate stripped and outputs refreshed.', 'done'],
  ['21 Sep 2026', 'Single-coder validation pass run against the v0 keyword classifier. Result: only the protest frame is usable.', 'done'],
  ['21 Sep 2026', 'Five research proposals drafted with sampling, instruments, budgets and ethics. Collaborator and funder landscape mapped.', 'done'],
  ['21 Sep 2026', 'Impact analysis and illustrated PDF report published, with the full audit log behind them.', 'done'],
];

function body() {
  return `
<header class="hero" style="padding-bottom:20px;">
  <div class="wrap">
    <div class="eyebrow"><span class="dot"></span> Status &middot; updated 21 September 2026</div>
    <h1 class="display">Phase 1:<br><span class="serif">baseline and outreach.</span></h1>
    <p class="lede">
      The analysis is done and public. The designs are done and costed. Nothing has been collected from a household
      yet, and that is the only thing that matters right now.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/fuel_shock_bd/collaborate/">Unblock something</a>
      <a class="btn btn-ghost" href="/fuel_shock_bd/support/">Fund a wave</a>
    </div>
  </div>
</header>

<section style="padding-top:12px;">
  <div class="wrap">
    <div class="grid g4">
      <div class="stat"><div class="val accent">2</div><div class="lbl">Hard deadlines</div><div class="note">W0 by ~20 October. P3 in villages in November. Neither can slip without losing the measurement.</div></div>
      <div class="stat"><div class="val">1</div><div class="lbl">Binding constraint</div><div class="note">An institutional host. It gates IRB, most funders, and the sampling frame.</div></div>
      <div class="stat"><div class="val">4 / 8</div><div class="lbl">Phase 1 milestones done</div><div class="note">Everything that could be done unfunded and alone is done.</div></div>
      <div class="stat"><div class="val">0</div><div class="lbl">Households surveyed</div><div class="note">The entire point of the programme, and entirely ahead of us.</div></div>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Phase 1 &middot; in progress</div>
      <h2>Baseline data collection and proposal outreach</h2>
    </div>
    <div class="grid g2">
      <div class="card">
        <h3 style="font-size:19px;">Done</h3>
        <ul class="check" style="margin-top:14px;">
          <li>Impact analysis across inflation, fares, agriculture, industry, power and macro</li>
          <li>Full audit trail: every search, figure, source and derivation</li>
          <li>Illustrated PDF report</li>
          <li>Five research proposals with designs, budgets and ethics</li>
          <li>Collaborator and funder landscape mapped and flagged for verification</li>
          <li>P4 corpus collected &mdash; 1,996 articles, three outlets, two windows</li>
          <li>P4 pipeline: volume, frame shares with Wilson intervals, exploratory topics</li>
          <li>Single-coder validation pass, showing exactly where the classifier fails</li>
          <li>Public site with the analysis, designs, data and limitations</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="font-size:19px;">Not done</h3>
        <ul class="check" style="margin-top:14px;">
          <li class="off">Outreach emails sent to the identified partners</li>
          <li class="off">Institutional host secured &mdash; <strong>the blocker</strong></li>
          <li class="off">IRB or local ethics approval</li>
          <li class="off">P1 W0 questionnaire finalised, bilingual, piloted with 30 respondents</li>
          <li class="off">Survey partner contracted and W0 fielded</li>
          <li class="off">Two human coders through the P4 sample for a real kappa</li>
          <li class="off">BanglaBERT-class frame classifier and a validated sentiment layer</li>
          <li class="off">ACLED registration and a real protest-event series</li>
          <li class="off">P3 sites scoped ahead of November planting</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Critical path</div>
      <h2>What has to happen, and by when</h2>
      <p>Dates are set by the shock, not by preference. Anything after them measures a different thing.</p>
    </div>
    <div class="grid g2">
      <div>
        <div class="tl">
          <div class="tl-item hot">
            <div class="tl-when">This week</div>
            <div class="tl-what">Outreach to hosts and co-investigators</div>
            <div class="tl-why">Ask each partner for a sampling frame, an affiliation or host, and quick feedback on the W0 design. Start P4&rsquo;s human coding in parallel &mdash; it needs no permission from anyone.</div>
          </div>
          <div class="tl-item hot">
            <div class="tl-when">By ~5 October</div>
            <div class="tl-what">W0 instrument finalised and ethics cleared</div>
            <div class="tl-why">Bilingual, piloted with 30 respondents, IRB through a host institution or a local ethics board. Fieldwork does not start before approval.</div>
          </div>
          <div class="tl-item hot">
            <div class="tl-when">By ~20 October</div>
            <div class="tl-what">W0 fieldwork complete</div>
            <div class="tl-why">Ahead of the October BPC letter-of-credit cliff and whatever price or duty decision follows it. <strong>If W0 slips into November, P1 loses its baseline</strong> &mdash; that is the whole design.</div>
          </div>
        </div>
      </div>
      <div>
        <div class="tl">
          <div class="tl-item hot">
            <div class="tl-when">November</div>
            <div class="tl-what">P3 in the field before planting</div>
            <div class="tl-why">Boro acreage is decided in November&ndash;December. A survey after planting measures regret, not decision-making. P2 scoping runs alongside, in two or three pilot sites.</div>
          </div>
          <div class="tl-item">
            <div class="tl-when">November &rarr; June 2027</div>
            <div class="tl-what">Panel waves W1 through W4</div>
            <div class="tl-why">November, January, March, then June after the Boro harvest &mdash; capturing the October cliff, LDC graduation, peak irrigation and the harvest in one dataset.</div>
          </div>
          <div class="tl-item">
            <div class="tl-when">Rolling</div>
            <div class="tl-what">Public dashboard and policy briefs</div>
            <div class="tl-why">Refreshed after each wave, and timed before the Boro and budget decisions rather than after them. Evidence delivered late is history.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Later phases</div>
      <h2>After the baseline</h2>
    </div>
    <div class="grid g3">
      <div class="card">
        <span class="tag">Phase 2</span>
        <h3 style="font-size:19px;margin-top:12px;">Field collection</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">Panel waves across sectors and regions, the Boro survey, and the e-rickshaw ethnography and diaries running in parallel.</p>
      </div>
      <div class="card">
        <span class="tag">Phase 3</span>
        <h3 style="font-size:19px;margin-top:12px;">Analysis and comparison</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">Panel fixed effects, sector &times; wave difference-in-differences, the framing experiment, and a genuine 2022-versus-2026 comparison using the PPRC&ndash;BIGD panels.</p>
      </div>
      <div class="card">
        <span class="tag">Phase 4</span>
        <h3 style="font-size:19px;margin-top:12px;">Publication and release</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">Papers, policy briefs timed to real decisions, and a de-identified public dataset so the next shock does not start from nothing again.</p>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Changelog</div>
      <h2>What has changed, including corrections</h2>
      <p>Corrections are logged here rather than quietly patched. If a number on this site is wrong, this is where it gets recorded.</p>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th style="width:140px;">Date</th><th>Change</th></tr></thead>
        <tbody>
          ${CHANGELOG.map(([d, t]) => `<tr><td class="small mono muted">${d}</td><td class="small">${t}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>
    <div class="callout neutral" style="margin-top:28px;">
      <span class="k">One standing caveat</span>
      Some outlets describe 21 September as the government&rsquo;s <em>second</em> fuel hike of 2026. This analysis
      counts three since March, because the June change of Tk 5 applied only to petrol and octane &mdash; for diesel
      and kerosene it is the second. Both counts are defensible; they are counting different things.
    </div>
  </div>
</section>
`;
}

module.exports = { body, DESC };
