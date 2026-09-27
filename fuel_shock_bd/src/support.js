'use strict';

const DESC =
  'What funding r1_Fuel buys, at what price, and why the baseline wave is the one thing that cannot be bought later. ' +
  'Costed tiers from $200 to the full $11k programme, plus an honest account of what is still missing.';

const TIERS = [
  {
    amt: '~$200',
    name: 'Finish P4 properly',
    lead: 'Turns a built corpus into a publishable paper.',
    buys: [
      'Two human coders through the 186-article stratified sample, to a kappa above 0.7',
      'A BanglaBERT-class frame classifier replacing the keyword dictionary that currently scores F1 0.36 on government-failure framing',
      'A validated Bangla sentiment layer',
      'ACLED registration and a real protest-event series instead of the current news-mention proxy',
    ],
    out: 'One paper on how blame and fairness are framed across the 2022 and 2026 shocks, plus a public frame-share series that every other strand can cite.',
    tag: 'Cheapest real output',
    hot: false,
  },
  {
    amt: '~$900–1,200',
    name: 'Buy the baseline wave (P1 W0)',
    lead: 'The one purchase that expires.',
    buys: [
      'A 15&ndash;20 minute bilingual CATI instrument across 1,500 households, stratified by the main earner&rsquo;s sector',
      'Coverage across Dhaka, the RMG belt, a Boro district and a coastal district',
      'The embedded framing experiment on perceived fairness &mdash; the moral-economy test',
      'Respondent incentives, quotas that do not quietly exclude women and the poorest, and a small in-person top-up',
    ],
    out: 'A genuine pre-shock baseline. After the next hike, this measurement cannot be made at any price &mdash; there is no &ldquo;before&rdquo; left. Every later wave is worth more because this one exists, and worth much less if it does not.',
    tag: 'Highest urgency',
    hot: true,
  },
  {
    amt: '~$2,000–3,500',
    name: 'Put someone in the villages in November',
    lead: 'P3 — the channel nobody is watching.',
    buys: [
      'Pre-planting survey across 6 villages in Rangpur, Rajshahi and Mymensingh, around 600 plots, with a grid/solar-irrigation village as contrast',
      'Interviews with pump owners and water sellers on how they re-price water',
      'Focus groups with women in farming households on food and labour trade-offs',
      'A post-harvest round in May 2027, and DAE / BADC administrative data where accessible',
    ],
    out: 'The acreage response to Tk 135+ diesel against a frozen procurement price &mdash; which is to say, an early read on 2027 rice prices, rice imports and the foreign-exchange pressure that follows.',
    tag: 'Hard November deadline',
    hot: true,
  },
  {
    amt: '~$1,500–3,000',
    name: 'Fund the ethnography (P2)',
    lead: 'Where the shock is actually absorbed.',
    buys: [
      '4&ndash;6 months of participant observation at garages and charging points across four sites',
      '60&ndash;80 life-history interviews, sampled for ex-farmers, ex-RMG workers, returned migrants and the very rare women in the trade',
      'Eight weeks of driver daily diaries by WhatsApp voice note, with a stipend',
      'A structured survey of 400 drivers, and a ground-truth map against the reported 48,136 unauthorised charging points',
    ],
    out: 'An account of how an illegal energy economy is actually governed, and a policy note on metering and legalisation &mdash; the lever that converts 500 MW&ndash;1 GW of theft into billed revenue without destroying the livelihood underneath it.',
    tag: '',
    hot: false,
  },
  {
    amt: '~$3,500–6,000',
    name: 'The full panel (P1, five waves)',
    lead: 'Baseline through the Boro harvest.',
    buys: [
      'W0 now, W1 November, W2 January, W3 March, W4 June 2027 &mdash; after the harvest',
      '1,500&ndash;2,500 households held across all five waves',
      'Panel fixed effects and sector &times; wave difference-in-differences on the 19/21 September split',
      'A public dashboard refreshed after each wave, and policy briefs timed before the Boro and budget decisions',
    ],
    out: 'Two to three papers &mdash; coping and sacrifice ordering, relative deprivation, the moral economy of fuel pricing &mdash; and a de-identified public dataset. Nothing comparable exists for Bangladesh&rsquo;s 2022 shock.',
    tag: 'Flagship',
    hot: false,
  },
];

function tiersHTML() {
  return TIERS.map((t) => `
    <div class="card" style="${t.hot ? 'border-color:rgba(255,74,31,0.45);' : ''}">
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:baseline;justify-content:space-between;">
        <div class="mono" style="font-size:22px;font-weight:700;color:${t.hot ? 'var(--accent)' : 'var(--ink)'};letter-spacing:-0.02em;">${t.amt}</div>
        ${t.tag ? `<span class="tag ${t.hot ? 'accent' : ''}">${t.tag}</span>` : ''}
      </div>
      <h3 style="font-size:22px;margin-top:14px;">${t.name}</h3>
      <p class="small" style="margin-top:6px;color:var(--ink-soft);font-style:italic;font-family:'Instrument Serif',Georgia,serif;font-size:17px;">${t.lead}</p>
      <ul class="check" style="margin-top:16px;">
        ${t.buys.map((b) => `<li style="font-size:14.5px;">${b}</li>`).join('\n        ')}
      </ul>
      <p class="small" style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line);color:var(--muted);">
        <strong style="color:var(--ink);">What comes out:</strong> ${t.out}
      </p>
    </div>`).join('\n');
}

function body() {
  return `
<header class="hero" style="padding-bottom:20px;">
  <div class="wrap">
    <div class="eyebrow"><span class="dot"></span> Funding</div>
    <h1 class="display">$1,200 buys a measurement<br><span class="serif">that expires in October.</span></h1>
    <p class="lede">
      Bangladesh has just put a 35&ndash;38% fuel shock through an economy where real wages were already negative, and
      is about to put a second one through before the year ends. What that does to prices will be in the CPI print.
      What it does to households &mdash; what they stop eating, whose schooling stops, who they blame, whether they
      think it was fair &mdash; will not be recorded anywhere unless somebody records it now.
    </p>
    <p class="lede-sm">
      This page is the honest version: what each amount buys, what it returns, what is already built, and what is still
      missing. If something here does not add up, that is worth telling me.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="mailto:hello@blankframe.tech?subject=r1_Fuel%20funding">Talk about funding</a>
      <a class="btn btn-ghost" href="/fuel_shock_bd/proposal/">The full designs</a>
      <a class="btn btn-ghost" href="/fuel_shock_bd/findings/">The analysis behind it</a>
    </div>
  </div>
</header>

<section style="padding-top:12px;">
  <div class="wrap">
    <div class="grid g4">
      <div class="stat"><div class="val accent">$11k</div><div class="lbl">The whole programme</div><div class="note">Five studies, eighteen months, through the 2027 Boro harvest.</div></div>
      <div class="stat"><div class="val">$12k</div><div class="lbl">The critical path</div><div class="note">The baseline wave. Everything else can be bought later; this cannot.</div></div>
      <div class="stat"><div class="val">~4 wks</div><div class="lbl">Before it expires</div><div class="note">W0 must field by roughly 20 October, ahead of the BPC funding cliff.</div></div>
      <div class="stat"><div class="val">$0</div><div class="lbl">Raised so far</div><div class="note">Everything published to date was built unfunded. The analysis, corpus and designs are done.</div></div>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">The case</div>
      <h2>Why this is worth funding, in four sentences</h2>
    </div>
    <div class="grid g2">
      <div class="card">
        <h3 style="font-size:19px;">The evidence gap is specific, not general</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          Fuel subsidy reform fails politically about 70% of the time &mdash; only around 30% of reforms survive twelve
          months, on Mahdavi, Ross and Simoni&rsquo;s 2025 count. The literature explains that mostly through
          <em>perceived fairness</em>, but almost all of the household-level evidence comes from Nigeria, Iran,
          Indonesia and Ecuador. Bangladesh, with 170 million people and a live reform in progress, is close to absent
          from it. Its own 2022 shock produced protests, fare disputes and commentary &mdash; and almost no systematic
          household sociology.
        </p>
      </div>
      <div class="card">
        <h3 style="font-size:19px;">The identification is a gift of timing</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          The pay scale was gazetted 19 September; the hike took effect on the 21st. That splits the population by
          occupation two days apart: ~33 lakh public employees indexed to inflation, ~7.5 crore private and informal
          workers not. Relative deprivation is normally very hard to identify cleanly. Here it arrived dated and
          gazetted, and it is <strong>currently unclaimed</strong>.
        </p>
      </div>
      <div class="card">
        <h3 style="font-size:19px;">The policy window is open right now</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          The government has to choose in the next quarter between another hike, a duty cut, and targeted compensation
          through the Family Card rail. P5 answers the exact question on that table &mdash; whether people prefer
          universal cheap fuel or targeted cash, and what makes them accept either. Evidence delivered in December is
          usable. Evidence delivered in 2028 is history.
        </p>
      </div>
      <div class="card">
        <h3 style="font-size:19px;">The unit costs are small and the leverage is not</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          A completed phone interview costs $4&ndash;6. A discourse paper costs a few thousand dollars because the
          corpus is already built. This is not an expensive programme; it is a cheap one with a hard deadline, which is
          an unusual combination and the reason a small, fast funder can matter more here than a large, slow one.
        </p>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">What money buys</div>
      <h2>Costed, in the order urgency actually runs</h2>
      <p>
        Costs are built up from per-interview and per-day rates, not set as a target. Where a range is given, the low
        end is a smaller sample, not worse work.
      </p>
    </div>
    <div class="grid g2">
      ${tiersHTML()}
      <div class="card" style="background:var(--ink);color:#E8E6E1;border-color:var(--ink);">
        <div class="mono" style="font-size:22px;font-weight:700;color:#FF7A55;letter-spacing:-0.02em;">~$8,000–15,000</div>
        <h3 style="font-size:22px;margin-top:14px;color:#fff;">P5 — Cash or cheap fuel?</h3>
        <p style="font-size:15px;margin-top:12px;color:#BDBAB4;">
          A conjoint experiment, n&asymp;2,000, varying fuel price, compensation size, targeting rule, delivery channel
          and who pays. Small if embedded in a P1 wave. It answers the question the government is actually deciding
          this quarter, and it adds Bangladesh to an international literature &mdash; Iran 2010, Indonesia, Nigeria
          2023 &mdash; that currently explains why fuel subsidy reform fails without much South Asian evidence in it.
        </p>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Due diligence</div>
      <h2>What is already de-risked, and what is not</h2>
      <p>The second column is the one worth reading.</p>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th style="width:24%;">Risk a funder would ask about</th><th style="width:38%;">Where it stands</th><th>Honest residual</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Is the analysis any good?</strong></td>
            <td class="small">Published in full, with a complete audit log behind it: every search, every figure, its source, and every derivation. Derived numbers are marked <span class="est">est.</span> and cross-checked against each other &mdash; the implied diesel throughput reconciles with the government&rsquo;s own claimed annual saving.</td>
            <td class="small muted">Not peer-reviewed. Built rapidly, by one person, in the days around the hike.</td>
          </tr>
          <tr>
            <td><strong>Can the team actually execute?</strong></td>
            <td class="small">P4 is evidence rather than assertion: a 1,996-article bilingual corpus was collected, a pipeline built, an exploratory analysis run and a validation harness written &mdash; unfunded, inside a week.</td>
            <td class="small muted">No track record of running field survey operations. That is precisely why a survey partner and an institutional host are the first asks.</td>
          </tr>
          <tr>
            <td><strong>Is the design fundable elsewhere later?</strong></td>
            <td class="small">P1 is built to standard panel specifications: FIES food insecurity, sector stratification, an embedded randomised framing arm, panel fixed effects. It maps directly onto IGC, ESRC and WIDER expectations.</td>
            <td class="small muted">Most of those funders require a PhD-holding PI or an eligible institution, and their cycles are slower than October.</td>
          </tr>
          <tr>
            <td><strong>Will anything come out of it?</strong></td>
            <td class="small">P4 can publish on its own. P1 W0 alone supports a descriptive brief. Each study is designed to stand alone rather than depend on the rest of the programme being funded.</td>
            <td class="small muted">The panel&rsquo;s value compounds with waves; a single wave is a good brief, not a good paper.</td>
          </tr>
          <tr>
            <td><strong>Where would the money sit?</strong></td>
            <td class="small">The intended route is an institutional host &mdash; BIGD, SANEM, CPD or a university department &mdash; holding and disbursing funds under its own financial controls, with the survey firm contracted directly.</td>
            <td class="small muted"><strong>No host is secured yet.</strong> Until one is, the realistic instruments are commissioned work or a partner&rsquo;s internal funds, not a grant.</td>
          </tr>
          <tr>
            <td><strong>Ethics and safety?</strong></td>
            <td class="small">Written into every design: Bangla consent, verbal consent recorded on phone waves, no names stored alongside illegal activity, encrypted diaries, no published charging-point locations, no partisanship stored with identifiers, respondents paid.</td>
            <td class="small muted">No IRB approval yet, because IRB comes with the host. Fieldwork does not start before it.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">The funder landscape</div>
      <h2>Where the institutional money is, and why it is slower than the deadline</h2>
      <p>
        Surveyed 21 September 2026. Every entry was checked against the programme&rsquo;s own page; none of the calls
        had a confirmed open deadline in late 2026.
      </p>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Programme</th><th class="num">Size</th><th>Eligibility</th><th>Fit</th></tr></thead>
        <tbody>
          <tr><td><a href="https://www.theigc.org/funding/call-for-proposals" style="color:var(--accent);text-decoration:none;">IGC</a> <span class="small muted">Bangladesh is a partner country</span></td><td class="num mono">£20&ndash;30k small<br>up to £125k full</td><td class="small">PI must hold or be pursuing a PhD; small grants run through the country team</td><td class="small muted">Strong fit for P1 and P5, gated on the PI requirement</td></tr>
          <tr><td><a href="https://www.icimod.org/sandee/" style="color:var(--accent);text-decoration:none;">SANDEE (ICIMOD)</a></td><td class="num mono">$20&ndash;30k</td><td class="small">Must be employed at a university or research institute</td><td class="small muted">Good fit for P3 &mdash; diesel versus solar irrigation is squarely environmental economics</td></tr>
          <tr><td><a href="https://wennergren.org/program/post-phd-research-grant/" style="color:var(--accent);text-decoration:none;">Wenner-Gren Post-PhD</a></td><td class="num mono">up to $25k</td><td class="small">Independent scholars eligible; needs an anthropology PhD or equivalent appointment</td><td class="small muted">The natural home for P2, and unusually open to non-institutional applicants</td></tr>
          <tr><td><a href="https://www.ukri.org/publications/project-co-lead-international-policy-guidance/" style="color:var(--accent);text-decoration:none;">ESRC / UKRI</a> <span class="small muted">via international co-lead</span></td><td class="num mono">scheme-dependent</td><td class="small">Needs a UK-based lead and a Bangladesh co-lead at an eligible organisation</td><td class="small muted">Viable if a UK collaborator co-leads; slow relative to the window</td></tr>
          <tr><td><a href="https://bangladesh.fes.de/" style="color:var(--accent);text-decoration:none;">FES Bangladesh</a></td><td class="num mono">commissioned</td><td class="small">Concept note; has commissioned CPD and RAPID on RMG wages</td><td class="small muted"><strong>The most realistic route inside four weeks</strong>, alongside a partner&rsquo;s internal funds</td></tr>
          <tr><td><a href="https://www.gdn.int/opportunities" style="color:var(--accent);text-decoration:none;">GDN awards</a></td><td class="num mono">$10&ndash;30k</td><td class="small">Researchers from low- and middle-income countries</td><td class="small muted">2026 theme fits poorly; worth watching the 2027 theme</td></tr>
        </tbody>
      </table>
    </div>

    <div class="callout" style="margin-top:32px;">
      <span class="k">The blunt version</span>
      Almost every serious funder needs a PhD-holding PI or an institutional host, and every cycle runs slower than
      October. So the honest sequence is: <strong>host first, grant second</strong>. What closes the gap in the
      meantime is commissioned work, a partner&rsquo;s internal funds, or a single individual or foundation deciding
      that a $1,200 baseline is worth more collected than argued about. If that is you, one email changes what gets
      measured.
    </div>

    <div class="card" style="margin-top:32px;display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between;">
      <div style="flex:1 1 380px;">
        <h3 style="font-size:22px;">Ask anything before committing anything</h3>
        <p class="muted" style="margin-top:10px;margin-bottom:0;font-size:15px;">
          Happy to walk through the instrument, the cost build-up, the sampling, or the parts that are weakest. The
          designs, the corpus and the derivations are all public already &mdash; there is nothing to reveal in a call
          that is not already on this site.
        </p>
      </div>
      <div class="btn-row" style="margin-top:0;">
        <a class="btn btn-primary" href="mailto:hello@blankframe.tech?subject=r1_Fuel%20funding">Email the project</a>
        <a class="btn btn-ghost" href="/fuel_shock_bd/data/">Data &amp; method</a>
      </div>
    </div>
  </div>
</section>
`;
}

module.exports = { body, DESC };
