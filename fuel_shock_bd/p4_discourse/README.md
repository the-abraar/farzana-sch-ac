# P4 — Who Gets the Blame? (computational discourse analysis)

Implements the corpus + pipeline for **P4** in [`../research_proposals.md`](../research_proposals.md).
Status: **corpus collection and v0 pipeline built; frame classifier NOT validated against humans.** A single-coder
pass by Claude exists (below); it is a stand-in, not the two-human validation the codebook requires.

## Run

```bash
cd p4_discourse/src
../../.venv/bin/python collect.py                 # ~1 h, rate-limited; add --sources / --windows / --limit
../../.venv/bin/python analyze.py                 # tables + figures -> ../out/
# after two coders fill out/coding_sample.csv (see ../codebook.md):
../../.venv/bin/python validate.py
```

(`uv venv .venv && uv pip install requests lxml beautifulsoup4 pandas numpy scikit-learn matplotlib`)

## What is collected

| Source | Language | Discovery | Notes |
|---|---|---|---|
| Prothom Alo | bn | public search API (`published-after/before`), 4 fuel queries × month chunks | full text in API response; relevance-ranked, top 200 per query/month, then regex-filtered |
| Samakal | bn | daily sitemaps, Bangla URL-slug/caption filter | recall limited to articles whose slug/caption names a fuel term |
| The Daily Star | en | yearly sitemaps, English slug filter, `lastmod` in window | same slug-recall limit; articles updated after the window are missed |

Windows: **2022** = 20 Jul–15 Sep 2022 (record hike 5 Aug); **2026** = 1 Mar–21 Sep 2026 (hikes 18 Apr, 1 Jun,
21 Sep; PM apology 5 Sep; pay scale 19 Sep). Dated in `src/common.py`.

Politeness: honest User-Agent, robots.txt checked (including crawl-delay), ≥1.5 s per host, responses cached.
**Article text is copyrighted and is kept in `data/` (gitignored).** Only metadata (`out/`) is committed.

## Not covered (yet)

- **Facebook / YouTube**: Meta Content Library needs an application; YouTube needs a Data API key. Not scraped.
- **Parliamentary debates**, **Jugantor / Kaler Kantho / TBS**: no usable discovery endpoint found yet (TBS sitemap returned
  empty; Jugantor has no robots.txt/sitemap route tried). Note TBS requests a 10 s crawl delay.
- **Protest event data**: ACLED needs free registration; until then the `protest` flag is a *news-mention* proxy, not an event count.
- **Sentiment**: no validated Bangla sentiment model set up. Needs BanglaBERT-class model + validation.
- **Coverage bias**: three outlets, mostly Dhaka-centred, mostly pro-establishment or centrist. Not "Bangla public discourse".

## Validation status

`out/coding_sample.csv` (186 articles, stratified language × period; gitignored, contains excerpts) has:
- `A_*`, `B_*`: **blank, reserved for two human coders** (needed for kappa ≥ 0.7).
- `C_*`: Claude's independent single pass, read from headline + summary + first ~1,100 chars (Bangla) / ~1,400 (English)
  of each article, **not the full text**, applied literally per `codebook.md`. `C_bd_relevant` = 1 if the article is about
  Bangladesh's fuel/energy situation. Text-free copy: `out/claude_codes.csv`.

`python src/validate.py --coders C` (and `--bd-only`) compares the dictionary classifier against that pass
(`out/validation_C.csv`, `out/validation_C_bd.csv`). Against Claude's codes the dictionary is **not usable for most
frames** (F1, Bangladesh-relevant rows only): protest 0.95 (only frame that holds up), fairness 0.71, global_market 0.71,
corruption 0.57, india 0.47, fiscal_loss 0.49, govt_failure 0.36 (recall 23%: misses opposition/criticism language),
apology_empathy 0.20 (recall 12%). About **39% of the "about fuel" corpus is not about Bangladesh** (wire market reports,
other countries), which inflates `global_market`; restrict to Bangladesh-relevant articles before reporting any share.

Caveats on this pass: one coder, reading truncated text, who also helped design the dictionary and codebook; borderline
calls (pure market reports = 0; rebuttals count; foreign articles coded by content) are judgement, and at least one call
was revised mid-pass for consistency. It shows *where the dictionary is weak*; it does not certify anything.

## Known limitations of the v0 numbers

1. The frame classifier is a keyword dictionary. **Its precision and recall are unknown** until `validate.py` is run.
   Frame shares are shown for pipeline testing, not as findings.
2. Presence ≠ stance (an article rebutting a claim scores the frame). See `codebook.md`.
3. Prothom Alo dominates the corpus by volume (API gives full text; sitemap routes are slower/lossier), so pooled
   Bangla shares are mostly Prothom Alo. Analyses are per language, and source-level splits should be added.
4. Period comparisons are uncontrolled: 2022 covers 8 weeks, 2026 seven months of overlapping shocks (Hormuz war,
   load-shedding, three hikes). 2022-vs-2026 differences are descriptive.

## Files

- `src/common.py` polite HTTP, windows, events, fuel filter · `src/collect.py` corpus · `src/frames.py` dictionaries
- `src/analyze.py` volume, frame shares (Wilson CIs), exploratory NMF topics, coding sample · `src/validate.py`
- `codebook.md` frame definitions and coding protocol
- `out/` `volume_timeline.png`, `frames_by_period.png`, `frame_shares_by_period.csv`, `topics_exploratory.md`,
  `coding_sample.csv`, `articles_with_frames.csv` (url, date, headline, frame flags; no article text)
