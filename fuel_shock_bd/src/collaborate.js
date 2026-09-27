'use strict';

const DESC =
  'r1_Fuel is looking for an institutional host, a qualitative lead, an agricultural economist and a Bangla NLP ' +
  'collaborator. Five open roles, what each one owns, and what is already built.';

/** People and institutions we propose to work with on adjacent questions.
 *  Public roles and public profile pages only — no email addresses are published
 *  here. The working contact list, with the caveats attached, lives in the repo. */
const LANDSCAPE = [
  ['Institutional hosts', [
    ['BIGD, BRAC University', 'Imran Matin (ED); Mirza M. Hassan (governance &amp; politics)', 'Ran the PPRC&ndash;BIGD 2022 inflation panel &mdash; the natural 2022-vs-2026 comparison &mdash; and leads the Family Card policy conversation.', 'https://bigd.bracu.ac.bd/'],
    ['SANEM', 'Selim Raihan (ED, also DU Economics); Sayema Haque Bidisha (Research Director, DU)', 'Raihan is already on record on this hike. SANEM&rsquo;s 2023 inflation-coping survey (90% changed food habits, 74% borrowed) is a ready comparison baseline. Bidisha brings gender and labour.', 'https://sanemnet.org/'],
    ['CPD', 'Fahmida Khatun; Nazneen Ahmed (ED); Mustafizur Rahman; Khondaker Golam Moazzem', 'Moazzem is the one researcher found who spans energy <em>and</em> RMG wages, and has argued for widening the Family Card.', 'https://cpd.org.bd/'],
    ['PPRC', 'Hossain Zillur Rahman', 'Co-led the 2022 inflation panel; urban poverty and social protection.', 'https://www.pprc-bd.org/'],
    ['BIDS', 'A. K. Enamul Haque (DG)', 'Environmental economics, and a route to Boro, irrigation and HIES data.', 'https://www.bids.org.bd/'],
  ]],
  ['Qualitative and ethnographic', [
    ['University of Dhaka, Sociology', 'Samina Luthfa', 'Social movements, environmental justice, female garment workers. Strong fit for the moral-economy and protest strand.', 'https://www.du.ac.bd/faculty/faculty_details/SOC/1101'],
    ['Jahangirnagar University, Anthropology', 'Hasan Ashraf; Mahmudul H. Sumon', 'Minimum-wage struggles in the garment export industry; social protection as technocratic fix; informal labour.', 'https://juniv.edu/'],
    ['BRAC University / NYU', 'Dina M. Siddiqi', 'Long-term ethnography of garment workers.', 'https://www.bracu.ac.bd/'],
  ]],
  ['Fuel protest, moral economy, energy justice', [
    ['SOAS', 'Naomi Hossain', 'The political sociology of fuel and food protest in Bangladesh; co-author of the 2022 <em>World Development</em> fuel-riots paper. The best single fit for P1&rsquo;s framing experiment, and a plausible UK lead on a UKRI bid.', 'https://www.soas.ac.uk/about/naomi-hossain'],
    ['The Policy Practice', 'Neil McCulloch', 'Lead author on fuel riots; <em>Ending Fossil Fuel Subsidies: The Politics of Saving the Planet</em> (2023).', 'https://thepolicypractice.com/neil-mcculloch'],
    ['UNU-WIDER / IDS Sussex', 'Patricia Justino', 'Conflict and social trust; co-author of the fuel-riots paper.', 'https://www.wider.unu.edu/expert/patricia-justino'],
    ['UC Santa Barbara', 'Paasha Mahdavi', '<em>Nature Climate Change</em> (2025): only about 30% of fuel subsidy reforms survive twelve months.', 'https://www.polsci.ucsb.edu/people/paasha-mahdavi'],
    ['Anglia Ruskin', 'Davide Natalini', 'Built the fuel-riots database.', 'https://www.aru.ac.uk/people/davide-natalini'],
  ]],
  ['E-rickshaws and informal electric mobility', [
    ['TU Eindhoven', 'Jonas van der Straeten', 'Currently running a project on the electrification of Bangladesh&rsquo;s three-wheelers &mdash; the only active one found. Natural co-investigator for P2.', 'https://www.tue.nl/en/research/researchers/jonas-van-der-straeten'],
    ['University of Amsterdam', 'Annemiek Prins', 'Rickshaw electrification and gender; <em>South Asia</em> 49(3), 2026.', 'https://www.uva.nl/en/profile/p/r/a.prins/a.prins.html'],
    ['University at Buffalo', 'Jaume Franquesa', 'Comparative work on informalised electric rickshaws in eastern India.', 'https://www.buffalo.edu/cas/anthropology/faculty/faculty_directory/franquesa-jaume.html'],
  ]],
  ['Transport, energy and macro', [
    ['BUET', 'Md. Shamsul Hoque', 'Transport and traffic; fare pass-through and e-rickshaw regulation.', 'https://ce.buet.ac.bd/profile-of-md-shamsul-hoque/'],
    ['IGC Bangladesh', 'Shadlee Rahman (Country Economist)', 'Gatekeeper for IGC small grants; wrote on the Gulf shock and the Bangladesh economy in April 2026.', 'https://www.theigc.org/people/shadlee-rahman'],
    ['Boston University', 'Benjamin K. Sovacool', 'Energy justice.', 'https://www.bu.edu/igs/profile/benjamin-sovacool/'],
    ['University of Manchester', 'Stefan Bouzarovski', 'Energy poverty theory and metrics.', 'https://research.manchester.ac.uk/en/persons/stefan.bouzarovski/'],
  ]],
];

function landscapeHTML() {
  return LANDSCAPE.map(([group, rows]) => `
    <h3 style="font-size:19px;margin:38px 0 14px;">${group}</h3>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th style="width:26%;">Institution</th><th style="width:24%;">People</th><th>Why they fit</th></tr></thead>
        <tbody>
          ${rows.map(([inst, people, why, url]) => `<tr>
            <td><a href="${url}" style="color:var(--accent);text-decoration:none;">${inst}</a></td>
            <td class="small">${people}</td>
            <td class="small muted">${why}</td>
          </tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>`).join('\n');
}

const ROLES = [
  {
    tag: 'Most urgent',
    hot: true,
    title: 'Institutional host / PI',
    own: 'Affiliation, IRB cover, and eligibility for the funders that matter.',
    body: `Almost every serious funder requires either a PhD-holding PI or an institutional host. That &mdash; not money
      &mdash; is the binding constraint right now, and it is the reason a fundable design is sitting unfielded. A host
      also usually brings the one thing that would compress the timeline most: <strong>an existing sampling frame</strong>
      that can be re-contacted instead of built from scratch.`,
    ask: 'A department or centre willing to host, plus a senior co-investigator.',
  },
  {
    tag: 'Co-lead',
    title: 'Qualitative / sociological lead',
    own: 'The interpretive core of P1, and P2 outright.',
    body: `The economics half of this is done. The half that matters &mdash; what people give up first, who inside the
      household absorbs it, whether the grievance is framed as class, sector, party or geography &mdash; needs somebody
      whose actual training is in it. Social movements, moral economy, gendered labour, or urban informality all fit.`,
    ask: 'Co-investigator on P1; lead on P2 if the e-rickshaw strand is your thing.',
  },
  {
    tag: 'Co-lead',
    title: 'Agricultural economist / agrarian sociologist',
    own: 'P3, the Boro strand — and it has a hard November deadline.',
    body: `This is the channel most likely to turn into a 2027 food-price and foreign-exchange problem, and almost
      nobody is watching it. Planting decisions get made in November at Tk 135 diesel against a frozen procurement
      price. If nobody is in the field by then, the decision that sets 2027 goes unmeasured and can only be
      reconstructed afterwards from what people remember.`,
    ask: 'Lead or co-lead P3; a route to DAE / BADC data would be worth as much.',
  },
  {
    tag: 'Technical',
    title: 'Bangla NLP / computational social scientist',
    own: 'P4 — where there is already a corpus, a pipeline and a known problem.',
    body: `1,996 articles are collected and a v0 frame classifier runs, but it is a keyword dictionary and it is
      <strong>not good enough</strong>: against a single-coder pass it scores F1 0.36 on government-failure framing and
      0.20 on apology/empathy. It needs a BanglaBERT-class model, a validated sentiment layer, and two human coders
      to get kappa above 0.7. The corpus is built; the hard part is open.`,
    ask: 'Model work, or simply two coders willing to work through the codebook.',
  },
  {
    tag: 'Field',
    title: 'Survey partner in Bangladesh',
    own: 'Fielding W0 within the window.',
    body: `A CATI-capable survey firm or research centre that can run a 15&ndash;20 minute bilingual instrument across
      1,500&ndash;2,500 households, stratified by the main earner&rsquo;s sector, with quotas that do not quietly
      exclude women and the poorest. Speed matters more than scale here: a smaller W0 fielded in October beats a
      larger one fielded in December, because the larger one is no longer a baseline.`,
    ask: 'A quote and an honest answer on the earliest realistic field date.',
  },
];

function rolesHTML() {
  return ROLES.map((r) => `
      <div class="card">
        <span class="tag ${r.hot ? 'accent' : ''}">${r.tag}</span>
        <h3 style="font-size:21px;margin-top:14px;">${r.title}</h3>
        <p class="small" style="margin-top:10px;color:var(--ink-soft);"><strong>You&rsquo;d own:</strong> ${r.own}</p>
        <p class="muted" style="font-size:14.5px;margin-top:10px;">${r.body}</p>
        <p class="small" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--line);color:var(--muted);"><strong style="color:var(--ink);">The ask:</strong> ${r.ask}</p>
      </div>`).join('\n');
}

function body() {
  return `
<header class="hero" style="padding-bottom:20px;">
  <div class="wrap">
    <div class="eyebrow"><span class="dot"></span> Collaborate</div>
    <h1 class="display">The economics half is done.<br><span class="serif">The half that matters isn&rsquo;t.</span></h1>
    <p class="lede">
      r1_Fuel has a documented impact analysis, five costed study designs, a built news corpus and a running pipeline.
      What it does not have is an institutional home, a qualitative lead, or anyone in a village in November. Those are
      the things that decide whether this becomes evidence or stays a website.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="mailto:hello@blankframe.tech?subject=r1_Fuel%20collaboration">Start a conversation</a>
      <a class="btn btn-ghost" href="/fuel_shock_bd/proposal/">Read the full designs</a>
      <a class="btn btn-ghost" href="https://github.com/the-abraar/FuelPriceHikeImpactResearch">Source repo</a>
    </div>
  </div>
</header>

<section>
  <div class="wrap">
    <div class="callout">
      <span class="k">The deadline is real, and it is not negotiable</span>
      BPC may run out of letter-of-credit funding in <strong>October</strong>, which makes a second hike or a duty cut
      near-certain. A baseline collected after that is not a baseline. <strong>W0 has to be in the field by around
      20 October</strong>; P3 has to be in villages in <strong>November</strong>, before planting. Everything else can slip.
      These two cannot.
    </div>
  </div>
</section>

<section style="padding-top:20px;">
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">Open roles</div>
      <h2>Five things that are genuinely open</h2>
      <p>Not &ldquo;get in touch if interested&rdquo; &mdash; these are specific, and each one unblocks something specific.</p>
    </div>
    <div class="grid g2">
      ${rolesHTML()}
    </div>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">What already exists</div>
      <h2>What you would be joining, not starting</h2>
    </div>
    <div class="grid g2">
      <div class="card">
        <h3 style="font-size:19px;">Built and public</h3>
        <ul class="check" style="margin-top:14px;">
          <li>A sourced impact analysis across inflation, fares, agriculture, industry, power and macro, with every derived figure marked and its method shown</li>
          <li>A full audit log &mdash; every search, every figure, its source, and every derivation behind the analysis</li>
          <li>Five costed study designs with sampling, instruments, analysis plans and ethics</li>
          <li>P4&rsquo;s corpus: <strong>1,996 articles</strong> across Prothom Alo, Samakal and The Daily Star, 2022 and 2026 windows, collected politely with robots.txt and crawl-delay respected</li>
          <li>A working pipeline &mdash; volume timeline, frame shares with Wilson intervals, exploratory NMF topics, a stratified coding sample and a validation script</li>
          <li>A mapped landscape of institutions, adjacent researchers and funder eligibility</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="font-size:19px;">Known to be missing or wrong</h3>
        <ul class="check" style="margin-top:14px;">
          <li class="off">No institutional host, no IRB, no PhD-holding PI &mdash; the binding constraint</li>
          <li class="off">P4&rsquo;s frame classifier is a keyword dictionary and fails on most frames (F1 0.36 government-failure, 0.20 apology/empathy). Only <em>protest</em> holds up, at 0.95</li>
          <li class="off">No human coding yet, so no kappa &mdash; the single Claude pass is a stand-in, not validation</li>
          <li class="off">No validated Bangla sentiment model</li>
          <li class="off">No Facebook or YouTube data; Meta Content Library needs an application, YouTube needs an API key</li>
          <li class="off">Protest &ldquo;events&rdquo; are a news-mention proxy, not ACLED event counts</li>
          <li class="off">Corpus skews to Prothom Alo and to Dhaka-centred, centrist outlets. It is not &ldquo;Bangla public discourse&rdquo;</li>
          <li class="off">Zero household data. That is the whole point.</li>
        </ul>
      </div>
    </div>
    <p class="small muted" style="margin-top:18px;max-width:760px;">
      The second list is longer than the first on purpose. A collaborator who finds out about these after joining has
      been badly treated; the point of publishing them is that you can price the work honestly before you say yes.
      Full detail on the <a href="/fuel_shock_bd/data/" style="color:var(--accent)">data and method page</a>.
    </p>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">The field</div>
      <h2>Proposed Collaborators on Adjacent Questions</h2>
      <p>
        Compiled by public search on 21 September 2026 from official institutional pages. Roles can go stale, so check
        a profile before acting on it. <strong>No email addresses are published here</strong> &mdash; if you want to
        reach someone on this list, their institutional page is linked, and that is the right channel.
      </p>
    </div>
    ${landscapeHTML()}
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <div class="sec-head">
      <div class="sec-kicker">How this works</div>
      <h2>Terms, in plain language</h2>
    </div>
    <div class="grid g3">
      <div class="card">
        <h3 style="font-size:18px;">Authorship</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          Whoever does the work is on the paper. A lead on P2 or P3 leads that paper. The existing analysis is
          groundwork, not a claim on anyone else&rsquo;s output.
        </p>
      </div>
      <div class="card">
        <h3 style="font-size:18px;">Data and code</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          Code and derived metadata are public. Article text stays unpublished for copyright, and anything
          identifying stays unpublished for ethics. De-identified survey microdata is intended for public release after
          the first papers.
        </p>
      </div>
      <div class="card">
        <h3 style="font-size:18px;">Ethics</h3>
        <p class="muted small" style="margin-top:10px;font-size:14.5px;">
          Consent in Bangla, recorded verbally for phone waves. The e-rickshaw and charging work touches illegal
          activity, so names are never stored alongside it, diaries are encrypted, and charging-point locations are
          never published. Partisanship is never stored alongside identifiers. Respondents get paid for their time.
        </p>
      </div>
    </div>

    <div class="card" style="margin-top:32px;">
      <h3 style="font-size:20px;">If you want to forward this to someone</h3>
      <p class="muted" style="font-size:15px;margin-top:10px;">
        Short works better than long. This is the template the project uses &mdash; reuse it, it is not precious.
      </p>
      <blockquote style="margin:20px 0 0;padding:18px 22px;background:rgba(19,19,19,0.03);border-left:3px solid var(--line);border-radius:0 12px 12px 0;font-size:15px;color:var(--ink-soft);">
        <strong>Subject:</strong> Rapid baseline on the 21 Sept fuel hike &mdash; seeking your advice / collaboration<br><br>
        Dear Professor [Name],<br><br>
        I&rsquo;m [name], an independent researcher in [city] studying how the 21 September fuel price hike, which came
        two days after the National Pay Scale gazette, affects households and informal workers. Because a further
        adjustment looks likely once BPC&rsquo;s October LC funding runs out, there is a 3&ndash;4 week window to
        collect a pre-shock baseline.<br><br>
        I&rsquo;ve drafted a short proposal for a 5-wave household phone panel stratified by public, formal-private and
        informal sector, with an embedded framing experiment on perceived fairness [attach 2-page summary + link].
        Your work on [specific paper] is directly relevant, particularly [one sentence].<br><br>
        Would you be open to a 20-minute call this week? I&rsquo;d value [feedback on the design / a possible
        institutional home / advice on data access / co-investigator involvement].<br><br>
        Best regards,<br>[Name, affiliation if any, phone, link]
      </blockquote>
      <p class="small muted" style="margin-top:16px;">
        Name one specific piece of their work. Attach two pages, not the repo. Make one concrete ask. Send on a weekday
        morning Dhaka time, and follow up once after five to seven days.
      </p>
      <div class="btn-row">
        <a class="btn btn-primary" href="mailto:hello@blankframe.tech?subject=r1_Fuel%20collaboration">Email the project</a>
        <a class="btn btn-ghost" href="/fuel_shock_bd/support/">If you fund rather than research</a>
      </div>
    </div>
  </div>
</section>
`;
}

module.exports = { body, DESC };
