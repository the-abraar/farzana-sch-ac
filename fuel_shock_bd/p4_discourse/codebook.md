# P4 Frame Codebook (v0.1)

Used by two independent human coders on `out/coding_sample.csv`, and as the specification the dictionary
classifier in `src/frames.py` approximates. **Target: Cohen's kappa ≥ 0.7 per frame** (research_proposals.md, P4).
Frames with kappa < 0.7 get their definition revised and are re-coded before any share is reported.

## Unit and rule

- **Unit:** one article (headline + summary + body excerpt in the sheet; open the URL if the excerpt is too short).
- **Code 1** if the article contains at least one **substantive statement**, of a sentence or more, that fits the
  frame below. The voice does not matter: the author, a minister, an opposition leader, an expert or a
  quoted citizen all count. **Endorsement does not matter**: an article that reports a claim, or that
  rebuts it, still invokes the frame.
- **Code 0** for passing mentions with no attribution or evaluation (a dateline, "Iran" in an unrelated
  sentence, "India" as a price comparison with no causal claim).
- Frames are **not exclusive**; code each independently. Blank is not allowed: every frame gets 0 or 1.
- Code **only what the text says**. Do not infer the outlet's political line from its name.

## Frames

| Frame | Code 1 when the article... | Typical markers (not exhaustive) | Watch out for |
|---|---|---|---|
| `global_market` | explains or justifies the price by world markets, the Gulf/Hormuz war, the exchange rate, LC/dollar availability or import costs | "international market", Brent, Hormuz, dollar crisis | Pure market reporting with no link to the domestic price is 0 |
| `govt_failure` | attributes the shock to government incompetence, mismanagement, bad policy or an unresponsive state, or calls the hike anti-people | "failure", "anti-people", mismanagement | Opposition slogans count (any voice) |
| `corruption_syndicate` | blames corruption, syndicates, hoarders, profiteers, pump-level cheating or black-market rings | syndicate, hoarder, black market, illegal stockpiling | **A neutral fuel *stock* (মজুত) or a legal reserve is 0.** Enforcement raids report the frame if they blame hoarders |
| `india` | ties the situation to India: cross-border smuggling, Indian supply or pipeline, Adani, price parity with India as a cause | smuggling across the border, pipeline, Adani | A bare price comparison with India and no causal claim is 0 |
| `fairness_payscale` | judges the hike fair or unfair, or discusses who bears the burden: the poor vs. the rich, the pay scale or government employees vs. the rest, the middle class, day labourers | pay scale, discrimination, "ordinary people", unjustified | "Public suffering" alone is *not* enough; there must be a comparison or a fairness judgement |
| `apology_empathy` | shows the state or its officials apologising, empathising, asking for patience, or calling the burden "tolerable" or "forced" | apology, tolerable, no other option, bear with us | A journalist merely describing hardship is 0 (the empathy has to come from the state) |
| `fiscal_loss` *(added)* | justifies the hike by BPC losses, subsidy burden or the pricing formula | BPC loss, subsidy, deficit, automatic pricing | Same voice rule |
| `protest` *(added)* | reports any protest, rally, strike, road blockade or human chain about fuel/transport prices | procession, hartal, blockade, rally | Planned or threatened protests count as 1; label with a note if unclear |

## Process

1. Both coders read this codebook and code the same **20-article pilot**; discuss and revise.
2. Code the full sample independently (~176 rows), **classifier flags hidden** (they are not in the sheet).
3. `python src/validate.py` prints kappa per frame plus classifier precision/recall vs. consensus; disagreements
   are adjudicated by discussion.
4. Only frames that pass kappa ≥ 0.7 *and* where the classifier reaches a usable F1 (decide the bar in
   advance; suggestion: ≥ 0.7) are reported as shares. Others stay exploratory, or the dictionary is
   replaced with a supervised model trained on the adjudicated labels.
