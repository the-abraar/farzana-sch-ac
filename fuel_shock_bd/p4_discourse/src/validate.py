"""Validate the v0 frame classifier against human coding (proposal target: inter-coder kappa >= 0.7).

Workflow: two human coders fill A_<frame> / B_<frame> (0/1) in out/coding_sample.csv, independently, using
../codebook.md and WITHOUT seeing classifier output. Then:  python validate.py            (A vs B + classifier)

Other modes:
  python validate.py --coders C          single-coder mode: classifier vs coder C only (C = Claude's pass;
                                         NOT human validation, no kappa possible)
  python validate.py --coders A B --bd-only   restrict to rows the coders marked C_bd_relevant == 1 (needs column)

Prints per frame: coder agreement (Cohen's kappa, two-coder mode only), and classifier precision/recall/F1
against the consensus (rows where both coders agree; disagreements are counted, not silently dropped).
"""
import argparse
import json

import pandas as pd

from common import DATA, OUT
from frames import FRAME_ORDER, classify


def kappa(a, b):
    a, b = pd.Series(a).astype(int), pd.Series(b).astype(int)
    po = (a == b).mean()
    pe = a.mean() * b.mean() + (1 - a.mean()) * (1 - b.mean())
    return float("nan") if pe == 1 else (po - pe) / (1 - pe)


def prf(pred, gold):
    tp = int(((pred == 1) & (gold == 1)).sum()); fp = int(((pred == 1) & (gold == 0)).sum())
    fn = int(((pred == 0) & (gold == 1)).sum())
    p = tp / (tp + fp) if tp + fp else float("nan"); r = tp / (tp + fn) if tp + fn else float("nan")
    f1 = 2 * p * r / (p + r) if p == p and r == r and p + r else float("nan")
    return tp, fp, fn, p, r, f1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--coders", nargs="+", default=["A", "B"], choices=["A", "B", "C"])
    ap.add_argument("--bd-only", action="store_true", help="only rows with C_bd_relevant == 1")
    args = ap.parse_args()
    coders = args.coders

    cs = pd.read_csv(OUT / "coding_sample.csv", dtype=str, keep_default_na=False)
    ok = pd.Series(True, index=cs.index)
    for c in coders:
        ok &= (cs[[f"{c}_{f}" for f in FRAME_ORDER]] != "").all(axis=1)
    coded = cs[ok]
    if args.bd_only:
        coded = coded[coded["C_bd_relevant"] == "1"]
    if coded.empty:
        raise SystemExit(f"No rows coded by {coders} yet - nothing to validate.")
    recs = {}
    for p in DATA.glob("corpus_*.jsonl"):
        for line in p.read_text(encoding="utf-8").splitlines():
            r = json.loads(line)
            recs[r["id"]] = r
    flags = pd.DataFrame([classify(recs[i]["title"], recs[i]["summary"], recs[i]["text"]) for i in coded["id"]],
                         index=coded.index)

    rows = []
    for f in FRAME_ORDER:
        g = {c: coded[f"{c}_{f}"].astype(int) for c in coders}
        if len(coders) == 2:
            a, b = g[coders[0]], g[coders[1]]
            agree = a == b
            gold, k = a[agree], round(kappa(a, b), 3)
        else:
            gold, k = g[coders[0]], None
        tp, fp, fn, p, r, f1 = prf(flags.loc[gold.index, f], gold)
        rows.append({"frame": f, "n_rows": len(coded), "n_gold": len(gold), "kappa_AB": k,
                     "gold_prevalence": round(gold.mean(), 3), "clf_prevalence": round(flags.loc[gold.index, f].mean(), 3),
                     "tp": tp, "fp": fp, "fn": fn, "precision": round(p, 3), "recall": round(r, 3), "f1": round(f1, 3)})
    t = pd.DataFrame(rows)
    tag = "".join(coders) + ("_bd" if args.bd_only else "")
    t.to_csv(OUT / f"validation_{tag}.csv", index=False)
    print(t.to_string(index=False))
    if len(coders) == 2:
        print("\nframes with kappa < 0.7 need codebook revision before any frame share is reported:",
              list(t.loc[t.kappa_AB < 0.7, "frame"]))
    else:
        print(f"\nSingle-coder ({coders[0]}) run: classifier-vs-coder only. Not human validation; no inter-coder kappa.")


if __name__ == "__main__":
    main()
