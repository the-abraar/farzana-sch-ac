'use strict';

const C = require('./charts');

const DESC =
  'On 21 September 2026 Bangladesh raised fuel prices by Tk 20 a litre. The economics are documented; the human ' +
  'cost is not. r1_Fuel is an open research programme to measure it — and the baseline has to be collected before late October.';

function stat(val, lbl, note, accent) {
  return `<div class="stat">
        <div class="val${accent ? ' accent' : ''}">${val}</div>
        <div class="lbl">${lbl}</div>
        <div class="note">${note}</div>
      </div>`;
}

function body() {
  return `
<header class="hero">
  <div class="wrap">
    <div class="eyebrow"><span class="dot"></span> Open research &middot; Bangladesh &middot; 2026</div>
    <h1 class="display">Tk 20 a litre, overnight.<br><span class="serif">The part nobody is measuring.</span></h1>
    <p class="lede">
      On 21 September 2026 Bangladesh raised diesel, petrol, octane and kerosene by Tk 20 a litre &mdash; the third
      move in five months. What that does to prices is now reasonably well documented, including
      <a href="/fuel_shock_bd/findings/" style="color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(255,74,31,.3)">here</a>.
      What nobody has captured is what it does to people: who cuts food first, whose daughter stops taking the bus,
      who gets blamed, and who quietly absorbs the shock on everyone else's behalf.
    </p>
    <p class="lede-sm">
      <strong>r1_Fuel</strong> is an open, independent research programme built to measure that &mdash; and the window
      to collect a pre-shock baseline closes in weeks, not months. Everything here is public: the analysis, the
      derivations, the code, the limitations.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/fuel_shock_bd/findings/">Read the analysis &rarr;</a>
      <a class="btn btn-ghost" href="/fuel_shock_bd/collaborate/">Work on it with me</a>
      <a class="btn btn-ghost" href="/fuel_shock_bd/support/">Fund a wave</a>
      <a class="btn btn-plain" href="#share">Share it</a>
    </div>
  </div>
</header>

<section style="padding-top:12px;">
  <div class="wrap">
    <div class="grid g4">
      ${stat('+35%', 'Diesel, since March', 'Tk 100 &rarr; Tk 135. Buses, trucks, irrigation pumps, generators, trawlers. This is the macro variable.', true)}
      ${stat('91.7%', 'Of a median month&rsquo;s income', 'What one 50-litre tank of octane now costs against a Tk 9,000 median monthly income. <span class="est">est.</span>')}
      ${stat('Tk 52', 'Still unclosed, per litre', 'BPC&rsquo;s own formula says diesel should be Tk 187. The Tk 20 hike closed 27.8% of the gap. <span class="est">est.</span>')}
      ${stat('~4 weeks', 'To collect a baseline', 'BPC may run out of letter-of-credit funding in October. After that, there is no &ldquo;before&rdquo; left to measure.')}
    </div>
  </div>
</section>

<hr class="rule">

<!-- ================= WHAT HAPPENED ================= -->
<section id="what-happened">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">01 &middot; What happened</div>
      <h2>Three hikes in five months, and the one nobody reports</h2>
      <p>
        The automatic pricing formula, introduced in March 2024, is supposed to adjust monthly. It was not applied
        between March and September 2026 while global prices doubled. Six months of suppressed adjustment were then
        released in a single Tk 20 move. The volatility people are experiencing is manufactured by the decision to
        freeze &mdash; not by the formula.
      </p>
    </div>

    <div class="loop-fig">
      <div style="font-family:'Inter Tight',sans-serif;font-weight:700;font-size:17px;margin-bottom:4px;">Price change since March 2026</div>
      <div class="small muted" style="margin-bottom:22px;">Per litre, retail. Hover any bar for the underlying prices.</div>
      ${C.figPriceLadder()}
      <p class="fig-cap">
        <strong>Furnace oil is the line that gets missed.</strong> It went Tk 70.10 &rarr; 94.69 &rarr; 113.54 between
        March and May &mdash; <strong>+62% in two months</strong> &mdash; and it is the fuel now carrying the power grid.
        That is the cost base underneath every loadshedding story, and underneath the next electricity tariff.
      </p>
    </div>

    <div class="callout">
      <span class="k">The driver</span>
      The Hormuz conflict. Strait throughput collapsed from 21.6 to 4.9 million barrels a day between Q4 2025 and Q2
      2026 &mdash; a 77% fall. Brent has traded $92&ndash;104 through September. QatarEnergy, which supplies roughly 60% of
      Bangladesh's LNG, declared force majeure, and the Moheshkhali FSRU fire on 21 July compounded it. Bangladesh
      imports essentially all of its liquid fuel, so the shock itself is imported. <strong>How it is distributed is
      entirely a domestic choice.</strong>
    </div>
  </div>
</section>

<hr class="rule">

<!-- ================= FIVE THINGS ================= -->
<section id="five-things">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">02 &middot; The analysis</div>
      <h2>Five things the headline number gets wrong</h2>
      <p>Each of these is worked through, with sources and derivations, in <a href="/fuel_shock_bd/findings/" style="color:var(--accent)">the full analysis</a>.</p>
    </div>

    <div class="grid g2" style="margin-bottom:20px;">
      <div class="card">
        <span class="tag accent">01</span>
        <h3 style="font-size:21px;margin-top:14px;">Octane is the headline. Diesel and kerosene are the economy.</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          The &ldquo;% of income per 50-litre tank&rdquo; index is useful for ranking countries and useless for predicting
          household distress here, because private car ownership in Bangladesh is a top-decile phenomenon. Almost nobody
          in the affected population buys 50 litres of octane. The transmission runs through
          <strong>diesel</strong> (bus fares, freight, irrigation, generators, trawlers), <strong>kerosene</strong>
          &mdash; the most regressive line in the gazette and the least commented on, burned by the poorest households for
          light during 7&ndash;10 hour rural outages &mdash; and <strong>furnace oil</strong>, which sets the electricity tariff.
        </p>
      </div>
      <div class="card">
        <span class="tag accent">02</span>
        <h3 style="font-size:21px;margin-top:14px;">This hike is roughly a quarter of the adjustment.</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          BPC asked for Tk 187 diesel and got Tk 135. The flat Tk 20 design <em>over-recovers</em> on petrol, octane and
          kerosene &mdash; taxing the motorcyclist and the kerosene user to partly cross-subsidise diesel &mdash; and still
          leaves diesel Tk 52 short. BPC's working capital was Tk 12,368 crore on 6 September against a stated need of
          Tk 15,000&ndash;20,000 crore, and it has already drained Tk 19,500 crore out of development project accounts.
          <strong>A second hike, or an equivalent duty cut, is near-certain before end-2026.</strong>
        </p>
      </div>
    </div>

    <div class="loop-fig" style="margin-bottom:20px;">
      <div style="font-family:'Inter Tight',sans-serif;font-weight:700;font-size:17px;margin-bottom:4px;">The diesel gap, per litre</div>
      <div class="small muted" style="margin-bottom:26px;">What has been added since March against what BPC's own formula says the price should be.</div>
      ${C.figDieselGap()}
      <p class="fig-cap">
        Anyone planning on Tk 135 diesel being the new normal through the Boro season is planning on the wrong number.
        The Tk 20 buys roughly <strong>Tk 700&ndash;750 crore a month</strong> of cash flow <span class="est">est.</span>
        against a loss run-rate near <strong>Tk 3,800 crore a month</strong>.
      </p>
    </div>

    <div class="grid g3" style="margin-bottom:20px;">
      <div class="card">
        <span class="tag accent">03</span>
        <h3 style="font-size:20px;margin-top:14px;">There is an unused lever sitting in the middle of it.</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          Duties and taxes on diesel were <strong>Tk 32.44 a litre</strong> in August &mdash; about 24% of the new pump
          price. The state collects Tk 32 at the revenue window while losing roughly Tk 69 at the BPC window: a net
          public-sector loss of about Tk 37 a litre <span class="est">est.</span> with a Tk 32 wedge inside it.
          Zeroing the diesel duty would close <strong>62% of the remaining gap</strong> <span class="est">est.</span>
          with no increase in the pump price at all. That it has not been done is a revenue-protection choice, and it
          is the most defensible thing to criticise about the design.
        </p>
      </div>
      <div class="card">
        <span class="tag accent">04</span>
        <h3 style="font-size:20px;margin-top:14px;">The food shock hasn&rsquo;t happened yet. It&rsquo;s a November decision.</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          About 70% of irrigation pumps run on diesel; Boro is around 55% of national rice output; peak irrigation is
          December to March, and planting is decided in November. The cost is already incurred; the price effect
          arrives in 2027. This hike adds roughly <strong>Tk 420 per bigha</strong>, the full move since March about
          <strong>Tk 840</strong> &mdash; some <strong>Tk 2,140 crore</strong> across the coming crop
          <span class="est">est.</span> Meanwhile the government held the Boro procurement price at the old level.
          Rising input cost against a fixed output price compresses margin, and margin decides acreage.
        </p>
      </div>
      <div class="card">
        <span class="tag accent">05</span>
        <h3 style="font-size:20px;margin-top:14px;">Two policies landed 48 hours apart.</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          The National Pay Scale was gazetted on 19 September; the hike took effect on the 21st. Roughly 33 lakh public
          employees and pensioners were indexed to inflation &mdash; the first award in eleven years. Roughly 7.5 crore
          private and informal workers were not. National wage growth is 8.05% against 8.26% inflation, so real wages
          were already negative <em>before</em> this hike. That is the honest form of the grievance, and it is also,
          for a researcher, an unusually clean natural split.
        </p>
      </div>
    </div>

    <div class="loop-fig">
      <div style="font-family:'Inter Tight',sans-serif;font-weight:700;font-size:17px;margin-bottom:4px;">Nominal change in basic pay since 2023</div>
      <div class="small muted" style="margin-bottom:22px;">Hatched bars mark groups with no wage-setting mechanism at all, not a value of zero growth by design.</div>
      ${C.figWedge()}
      <p class="fig-cap">
        The pay award did not cause the fuel hike &mdash; Hormuz did. It removed the fiscal cushion that would have let
        the state phase the shock more gently, and it did so in favour of about 2% of the population who are also the
        group most insulated from the consequences.
      </p>
    </div>
  </div>
</section>

<hr class="rule">

<!-- ================= THE LOOP ================= -->
<section id="the-loop">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">03 &middot; The mechanism</div>
      <h2>Autorickshaws flooding the roads and the lights going out are one problem, not two</h2>
      <p>
        The fuel hike tightens a loop that was already running. Reading it as two coincidental nuisances is what makes
        the standard policy response &mdash; crack down on the rickshaws &mdash; actively harmful.
      </p>
    </div>

    <div class="loop-fig">
      ${C.figLoop()}
      <p class="fig-cap">
        <strong>The operating-cost wedge that drives it.</strong> At Tk 165 a litre and about 15 km/l, a petrol
        three-wheeler costs roughly <strong>Tk 11 per km</strong> in fuel <span class="est">est.</span> A battery
        three-wheeler draws 4&ndash;9 kWh a day for 100+ km &mdash; about <strong>Tk 0.4&ndash;0.8 per km</strong>
        <span class="est">est.</span>, and for the 93% of Dhaka charging points that are unauthorised (48,136 against
        3,300 legal ones) the marginal cost to the operator is effectively zero. The wedge was already 15 to 1. This
        hike widened it by another 14%.
      </p>
    </div>

    <div class="grid g2" style="margin-top:20px;">
      <div class="card">
        <span class="tag warn">Second loop</span>
        <h3 style="font-size:20px;margin-top:14px;">Loadshedding pushes diesel demand up exactly when BPC cannot pay for it</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          Factories and shops fire up generators, diesel demand rises precisely when BPC cannot fund October letters of
          credit, physical shortage follows, and black-market premiums appear &mdash; diesel has been selling
          <strong>Tk 15&ndash;80 above the regulated price</strong> in rural markets. Tk 135 is a floor, not a ceiling,
          wherever supply is short. Which is exactly where the people with the least buying power are.
        </p>
      </div>
      <div class="card">
        <span class="tag ok">The part that cuts against the obvious reading</span>
        <h3 style="font-size:20px;margin-top:14px;">The e-rickshaw surge is the poor&rsquo;s hedge, not just a nuisance</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          It is the mechanism by which a household on Tk 12,000 a month keeps moving through a 38% petrol shock. Around
          21% of battery-rickshaw drivers are ex-farmers &mdash; and farm incomes are being squeezed by the same diesel
          shock. Suppressing the fleet without a substitute would transmit the oil shock to the informal poor far more
          completely than it currently does. <strong>The fix is metering and charging infrastructure, not
          prohibition</strong>: it converts 500 MW&ndash;1 GW of theft into billed revenue, makes the load visible to
          dispatch planning, and leaves the livelihood intact.
        </p>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<!-- ================= WHAT TO WATCH ================= -->
<section id="watch">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">04 &middot; What happens next</div>
      <h2>The calendar that decides how bad 2027 is</h2>
      <p>These are the dates a measurement programme has to be standing before, not after.</p>
    </div>

    <div class="grid g2">
      <div>
        <div class="tl">
          <div class="tl-item hot">
            <div class="tl-when">October 2026 &middot; now</div>
            <div class="tl-what">BPC letter-of-credit funding runs out</div>
            <div class="tl-why">Forces a cash injection, a duty cut, or another hike. August import spend was Tk 7,603 crore against Tk 2,741 crore a year earlier &mdash; up 177%.</div>
          </div>
          <div class="tl-item hot">
            <div class="tl-when">October&ndash;November 2026</div>
            <div class="tl-what">The first CPI prints with the hike in them</div>
            <div class="tl-why">Inflation had eased two months running. Expect that trend to break, with non-food leading. Projected path: <strong>9.5&ndash;10.5% by December&ndash;January</strong> <span class="est">est.</span></div>
          </div>
          <div class="tl-item">
            <div class="tl-when">October 2026</div>
            <div class="tl-what">Gazetted bus and launch fare revision</div>
            <div class="tl-why">Watch the gap between the gazette and what conductors actually charge. April's pass-through was 0.30 of the diesel move; realised fares ran far above it.</div>
          </div>
          <div class="tl-item">
            <div class="tl-when">24 November 2026</div>
            <div class="tl-what">LDC graduation</div>
            <div class="tl-why">A cost shock meets preference erosion. Buyers price forward and reallocate sourcing now, even though grace periods run to 2029.</div>
          </div>
        </div>
      </div>
      <div>
        <div class="tl">
          <div class="tl-item hot">
            <div class="tl-when">November&ndash;December 2026</div>
            <div class="tl-what">Boro planting decisions</div>
            <div class="tl-why">15 lakh shallow tube wells, 8.5 million diesel-irrigated acres. Acreage chosen here sets 2027 food prices, rice imports, forex demand &mdash; and the next fuel bill in taka.</div>
          </div>
          <div class="tl-item">
            <div class="tl-when">December 2026 &ndash; March 2027</div>
            <div class="tl-what">Peak irrigation into a funding-constrained BPC</div>
            <div class="tl-why">Grid loadshedding eases as cooling demand falls, then irrigation load brings it back. PDB is already seeking Tk 9,750 crore to clear dues before the season.</div>
          </div>
          <div class="tl-item">
            <div class="tl-when">April&ndash;June 2027</div>
            <div class="tl-what">The Boro harvest lands</div>
            <div class="tl-why">Where the whole chain becomes visible &mdash; or doesn't, if nobody measured the decision that produced it.</div>
          </div>
        </div>
        <div class="callout neutral" style="margin-top:8px;">
          <span class="k">Scenarios <span class="est">est.</span></span>
          <strong>Base (~55%)</strong> &mdash; Brent $95&ndash;110, a further Tk 10&ndash;20 or an equivalent duty cut by December, inflation peaking 9.5&ndash;10.5%.<br>
          <strong>Adverse (~30%)</strong> &mdash; Brent above $120, diesel to Tk 160&ndash;180, inflation 12%+, rationing, Boro contraction, serious unrest risk.<br>
          <strong>Relief (~15%)</strong> &mdash; Hormuz reopens, Brent falls to the $70s. But BPC's Tk 22,876 crore hole means relief passes through far more slowly than pain did. Expect that asymmetry, and expect people to notice it.
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="rule">

<!-- ================= THE GAP ================= -->
<section id="the-gap">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">05 &middot; Why this project exists</div>
      <h2>The economics says what the hike does to prices. It cannot say what it does to people.</h2>
      <p>
        How households cope, what they give up first, who inside the house absorbs the cut, whom they blame, and
        whether they think it is fair &mdash; none of that is in a CPI print. That is the gap r1_Fuel is built to fill.
      </p>
    </div>

    <div class="grid g3">
      <div class="card">
        <div class="tag accent">Reason 1</div>
        <h3 style="font-size:19px;margin-top:14px;">A natural experiment fell out of the calendar</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          Two policies, 48 hours apart, split the population cleanly by occupation: ~33 lakh public employees indexed,
          ~7.5 crore private and informal workers not. Relative deprivation is usually hard to identify. Here it was
          handed to us, dated and gazetted.
        </p>
      </div>
      <div class="card">
        <div class="tag accent">Reason 2</div>
        <h3 style="font-size:19px;margin-top:14px;">More is coming, which makes this a baseline moment</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          BPC cannot fund its October letters of credit, so another adjustment is near-certain, and Boro will pass
          irrigation costs through after that. Anything measured in the next few weeks is a genuine pre-shock baseline.
          <strong>That window closes fast.</strong>
        </p>
      </div>
      <div class="card">
        <div class="tag accent">Reason 3</div>
        <h3 style="font-size:19px;margin-top:14px;">Bangladesh&rsquo;s last shock was never properly studied</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          The 2022 hike (diesel +42.5%) produced protests, fare disputes and a lot of commentary &mdash; and very little
          systematic household-level sociology. 2026 can be done properly, and compared back to 2022 using panels that
          already exist.
        </p>
      </div>
    </div>

    <div style="margin-top:44px;">
      <h3 style="font-size:24px;margin-bottom:8px;">Five proposals, any of which can stand alone</h3>
      <p class="muted" style="margin-bottom:26px;max-width:680px;">
        P1 is the backbone the others can attach to. P4 needs no fieldwork and has already started.
        Full designs, sampling, instruments, analysis plans and ethics are in
        <a href="/fuel_shock_bd/proposal/" style="color:var(--accent)">the research plan</a>.
      </p>
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr><th style="width:56px;">#</th><th>Study</th><th>The question it answers</th><th class="num">Indicative cost</th><th>State</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono hi">P1</td>
              <td><strong>The Fuel Shock Panel</strong><div class="small muted">1,500&ndash;2,500 households, 5 phone waves to mid-2027</div></td>
              <td class="small">How coping, well-being and trust in the state move over the shock cycle &mdash; and how that path differs between public, formal-private and informal households. Carries an embedded framing experiment on perceived fairness.</td>
              <td class="num mono">$35&ndash;60k</td>
              <td><span class="tag warn">Needs a host + W0 by ~20 Oct</span></td>
            </tr>
            <tr>
              <td class="mono hi">P2</td>
              <td><strong>Charging the City</strong><div class="small muted">Ethnography, 4 sites, 60&ndash;80 life histories</div></td>
              <td class="small">How drivers, garage owners, charging-point operators and local power brokers govern an illegal energy economy &mdash; and how the hike redistributes risk along that chain.</td>
              <td class="num mono">$15&ndash;30k</td>
              <td><span class="tag">Scoping</span></td>
            </tr>
            <tr>
              <td class="mono hi">P3</td>
              <td><strong>Boro Decisions</strong><div class="small muted">6 villages, ~600 plots, pre-plant and post-harvest</div></td>
              <td class="small">How diesel cost, supply uncertainty and a frozen procurement price change how much Boro gets planted &mdash; and who in the agrarian hierarchy absorbs it.</td>
              <td class="num mono">$20&ndash;35k</td>
              <td><span class="tag warn">Must field in November</span></td>
            </tr>
            <tr>
              <td class="mono hi">P4</td>
              <td><strong>Who Gets the Blame?</strong><div class="small muted">Bangla + English news corpus, 2022 vs 2026</div></td>
              <td class="small">How responsibility and fairness are framed in public discourse, and which frames track offline protest.</td>
              <td class="num mono">$5&ndash;15k</td>
              <td><span class="tag ok">Corpus built &middot; 1,996 articles</span></td>
            </tr>
            <tr>
              <td class="mono hi">P5</td>
              <td><strong>Cash or Cheap Fuel?</strong><div class="small muted">Conjoint experiment, n&asymp;2,000</div></td>
              <td class="small">Whether people prefer universal cheap fuel or targeted cash, and how trust and perceived corruption shape that &mdash; directly informing the choice the government faces this quarter.</td>
              <td class="num mono">$8&ndash;15k</td>
              <td><span class="tag">Can embed in P1</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="small muted" style="margin-top:16px;">
        Costs are indicative and built from per-interview rates, not a target. The full breakdown and what each
        increment actually buys is on the <a href="/fuel_shock_bd/support/" style="color:var(--accent)">funding page</a>.
      </p>
    </div>
  </div>
</section>

<hr class="rule">

<!-- ================= THREE WAYS IN ================= -->
<section id="share">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">06 &middot; Three ways in</div>
      <h2>What would actually help</h2>
      <p>In rough order of how much difference it makes to whether W0 gets collected at all.</p>
    </div>

    <div class="grid g3">
      <div class="card">
        <div class="tag accent">If you research</div>
        <h3 style="font-size:21px;margin-top:14px;">Bring an institutional home</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          Almost every serious funder needs a PhD-holding PI or an institutional host, so that is the binding
          constraint &mdash; ahead of money. A sampling frame, IRB cover, or a senior co-investigator unblocks
          everything downstream. Sociologists, anthropologists and agricultural economists especially: the economics is
          the easy half.
        </p>
        <div class="btn-row" style="margin-top:20px;">
          <a class="btn btn-ghost" href="/fuel_shock_bd/collaborate/">What&rsquo;s open &rarr;</a>
        </div>
      </div>
      <div class="card">
        <div class="tag accent">If you fund</div>
        <h3 style="font-size:21px;margin-top:14px;">Buy the baseline wave</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          A single 15-minute CATI wave across 1,500 households costs about $9&ndash;12k. It is the one piece that cannot
          be bought later at any price, because after the next hike there is no &ldquo;before&rdquo; left to measure.
          Everything downstream &mdash; the panel, the papers, the policy briefs &mdash; is worth less without it.
        </p>
        <div class="btn-row" style="margin-top:20px;">
          <a class="btn btn-ghost" href="/fuel_shock_bd/support/">The funding case &rarr;</a>
        </div>
      </div>
      <div class="card">
        <div class="tag accent">If you just read this</div>
        <h3 style="font-size:21px;margin-top:14px;">Send it to one person who can act</h3>
        <p class="muted" style="font-size:15px;margin-top:12px;">
          A journalist covering the October CPI print. Someone at BIGD, SANEM, CPD or PPRC. A programme officer at a
          funder. A friend who farms. The single most useful thing a reader can do is get this in front of somebody
          deciding what to measure in the next three weeks.
        </p>
        <div class="copy-field" style="margin-top:20px;">
          <span>blankframe.tech/fuel_shock_bd/</span>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:32px;display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between;">
      <div style="flex:1 1 380px;">
        <h3 style="font-size:22px;">Or just reply to this with a correction.</h3>
        <p class="muted" style="margin-top:10px;margin-bottom:0;font-size:15px;">
          Every derived figure on this site is marked <span class="est">est.</span> and its method is shown. If one of
          them is wrong, that is worth more to the project than agreement. Corrections get logged in public.
        </p>
      </div>
      <div class="btn-row" style="margin-top:0;">
        <a class="btn btn-primary" href="mailto:hello@blankframe.tech?subject=r1_Fuel">Email the project</a>
        <a class="btn btn-ghost" href="https://github.com/the-abraar/FuelPriceHikeImpactResearch">Source &amp; issues</a>
      </div>
    </div>
  </div>
</section>
`;
}

module.exports = { body, DESC };
