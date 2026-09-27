"""P4 analysis: volume, frame shares, 2022-vs-2026 comparison, exploratory topics, human-coding sample.

Reads data/corpus_*.jsonl (built by collect.py). Writes tables + figures to out/.
Frame shares here come from the v0 dictionary classifier and are UNVALIDATED (see frames.py / validate.py).
"""
import json
import re

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
import pandas as pd  # noqa: E402
from sklearn.decomposition import NMF  # noqa: E402
from sklearn.feature_extraction.text import TfidfVectorizer  # noqa: E402

from common import DATA, EVENTS, OUT, WINDOWS, strip_boilerplate  # noqa: E402
from frames import FRAME_ORDER, classify  # noqa: E402

BLAME = ["global_market", "govt_failure", "corruption_syndicate", "india", "fairness_payscale", "apology_empathy"]
EXTRA = ["fiscal_loss", "protest"]
SRC_LABEL = {"prothomalo": "Prothom Alo (bn)", "samakal": "Samakal (bn)", "dailystar": "The Daily Star (en)"}


def load():
    rows = []
    for p in sorted(DATA.glob("corpus_*.jsonl")):
        for line in p.read_text(encoding="utf-8").splitlines():
            if line.strip():
                rows.append(json.loads(line))
    df = pd.DataFrame(rows).drop_duplicates("id")
    df["text"] = df["text"].map(strip_boilerplate)
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df = df.dropna(subset=["date"])
    # keep only articles inside a declared window (extractor dates can drift) and truly about fuel
    keep = pd.Series(False, index=df.index)
    for name, (a, b) in WINDOWS.items():
        keep |= (df["date"] >= a) & (df["date"] <= b)
    df = df[keep].copy()
    df["about_fuel"] = df["fuel_in_title"] | (df["fuel_hits"] >= 3)
    return df


def add_frames(df):
    res = df.apply(lambda r: pd.Series(classify(r["title"], r["summary"], r["text"])), axis=1)
    return pd.concat([df, res], axis=1)


def period_label(d):
    d = pd.Timestamp(d)
    if d.year == 2022:
        return "2022 pre-hike (20 Jul-4 Aug)" if d < pd.Timestamp("2022-08-05") else "2022 post-hike (5 Aug-15 Sep)"
    if d < pd.Timestamp("2026-04-18"):
        return "2026 pre-April (1 Mar-17 Apr)"
    if d < pd.Timestamp("2026-06-01"):
        return "2026 after Apr hike (18 Apr-31 May)"
    if d < pd.Timestamp("2026-09-05"):
        return "2026 after Jun hike (1 Jun-4 Sep)"
    return "2026 Sep run-up (5-21 Sep)"


PERIOD_ORDER = ["2022 pre-hike (20 Jul-4 Aug)", "2022 post-hike (5 Aug-15 Sep)", "2026 pre-April (1 Mar-17 Apr)",
                "2026 after Apr hike (18 Apr-31 May)", "2026 after Jun hike (1 Jun-4 Sep)", "2026 Sep run-up (5-21 Sep)"]


def wilson(k, n, z=1.96):
    if n == 0:
        return (np.nan, np.nan)
    p = k / n
    den = 1 + z * z / n
    c = (p + z * z / (2 * n)) / den
    h = z * np.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / den
    return (c - h, c + h)


def volume_fig(df):
    fig, axes = plt.subplots(1, 2, figsize=(13, 4.2), gridspec_kw={"width_ratios": [1, 2.6]})
    for ax, yr in zip(axes, ["2022", "2026"]):
        a, b = WINDOWS[yr]
        sub = df[(df["date"] >= a) & (df["date"] <= b)]
        for src, g in sub.groupby("source"):
            s = g.groupby(g["date"].dt.to_period("W").dt.start_time).size()
            ax.plot(s.index, s.values, marker="o", ms=3, label=SRC_LABEL.get(src, src))
        for d, key, lab in EVENTS:
            d = pd.Timestamp(d)
            if pd.Timestamp(a) <= d <= pd.Timestamp(b):
                ax.axvline(d, color="k", ls=":", lw=0.9)
                ax.text(d, ax.get_ylim()[1] * 0.97, " " + key.replace("_", " "), rotation=90, va="top", fontsize=7)
        ax.set_title(f"{yr}: fuel-related articles per week")
        ax.tick_params(axis="x", rotation=30, labelsize=8)
    axes[0].legend(fontsize=8)
    fig.tight_layout()
    fig.savefig(OUT / "volume_timeline.png", dpi=150)
    plt.close(fig)


def frame_tables(df):
    df = df.copy()
    df["period"] = df["date"].map(period_label)
    rows = []
    for lang, gl in df.groupby("lang"):
        for per, gp in gl.groupby("period"):
            n = len(gp)
            for f in FRAME_ORDER:
                k = int(gp[f].sum())
                lo, hi = wilson(k, n)
                rows.append({"lang": lang, "period": per, "frame": f, "n_articles": n, "n_with_frame": k,
                             "share": k / n if n else np.nan, "ci_lo": lo, "ci_hi": hi})
    t = pd.DataFrame(rows)
    t["period"] = pd.Categorical(t["period"], PERIOD_ORDER, ordered=True)
    t = t.sort_values(["lang", "frame", "period"])
    t.to_csv(OUT / "frame_shares_by_period.csv", index=False)
    return t


def frame_fig(t):
    langs = [l for l in ["bn", "en"] if l in set(t["lang"])]
    fig, axes = plt.subplots(1, len(langs), figsize=(6.5 * len(langs), 4.6), squeeze=False)
    for ax, lang in zip(axes[0], langs):
        sub = t[(t["lang"] == lang) & t["frame"].isin(BLAME)]
        pers = [p for p in PERIOD_ORDER if p in set(sub["period"].astype(str))]
        x = np.arange(len(BLAME))
        w = 0.8 / max(1, len(pers))
        for i, p in enumerate(pers):
            s = sub[sub["period"].astype(str) == p].set_index("frame").reindex(BLAME)
            err = [np.clip((s["share"] - s["ci_lo"]).values, 0, None), np.clip((s["ci_hi"] - s["share"]).values, 0, None)]
            ax.bar(x + i * w, s["share"].values * 100, w, yerr=np.array(err) * 100, capsize=1.5,
                   label=f"{p} (n={int(s['n_articles'].iloc[0])})")
        ax.set_xticks(x + 0.4 - w / 2)
        ax.set_xticklabels([b.replace("_", "\n") for b in BLAME], fontsize=8)
        ax.set_ylabel("% of fuel articles carrying frame (v0 dictionary)")
        ax.set_title({"bn": "Bangla press", "en": "English press (Daily Star)"}[lang])
        ax.legend(fontsize=6.5)
    fig.suptitle("Blame/fairness frames by period - UNVALIDATED dictionary baseline, 95% Wilson CIs", fontsize=10)
    fig.tight_layout()
    fig.savefig(OUT / "frames_by_period.png", dpi=150)
    plt.close(fig)


def topics(df, k=8, top=10):
    lines = []
    for lang, g in df[df["about_fuel"]].groupby("lang"):
        docs = (g["title"] + " " + g["summary"] + " " + g["text"]).tolist()
        if len(docs) < 40:
            continue
        tok = r"[ঀ-৿]{3,}" if lang == "bn" else r"[a-zA-Z]{4,}"
        vec = TfidfVectorizer(token_pattern=tok, max_df=0.4, min_df=5, lowercase=(lang == "en"),
                              stop_words="english" if lang == "en" else None, max_features=6000)
        X = vec.fit_transform(docs)
        m = NMF(n_components=k, random_state=0, init="nndsvda", max_iter=400).fit(X)
        terms = np.array(vec.get_feature_names_out())
        W = m.transform(X)
        lines.append(f"## {lang}: NMF topics (k={k}, n={len(docs)} docs) - exploratory, unlabelled\n")
        for i, comp in enumerate(m.components_):
            share = float((W.argmax(1) == i).mean())
            lines.append(f"- T{i} ({share:.0%} of docs): " + ", ".join(terms[comp.argsort()[::-1][:top]]))
        lines.append("")
    (OUT / "topics_exploratory.md").write_text("\n".join(lines), encoding="utf-8")


def coding_sample(df, n=200, seed=7):
    """Stratified by language x period, blank columns for two human coders. Frame flags are HIDDEN so coders
    are not anchored on the classifier."""
    path = OUT / "coding_sample.csv"
    if path.exists():  # never clobber a sample coders may already be working on
        prev = pd.read_csv(path, dtype=str, keep_default_na=False)
        if prev[[c for c in prev.columns if c[:2] in ("A_", "B_", "C_")]].ne("").any().any():
            print("coding_sample.csv already has human codes - left untouched")
            return len(prev)
    d = df[df["about_fuel"]].copy()
    d["period"] = d["date"].map(period_label)
    per_cell = max(1, n // max(1, d.groupby(["lang", "period"]).ngroups))
    s = pd.concat([g.sample(min(len(g), per_cell), random_state=seed) for _, g in d.groupby(["lang", "period"])])
    s = s.sample(frac=1, random_state=seed)
    out = s[["id", "lang", "date", "source", "url", "title", "summary"]].copy()
    out["text_excerpt"] = s["text"].str.slice(0, 700)
    for coder in ("A", "B"):
        for f in FRAME_ORDER:
            out[f"{coder}_{f}"] = ""
    out.to_csv(path, index=False, encoding="utf-8-sig")
    return len(out)


def main():
    df = add_frames(load())
    print(f"articles in windows: {len(df)}; about fuel: {int(df['about_fuel'].sum())}")
    print(df.groupby(["source", "lang"]).size().to_string())
    core = df[df["about_fuel"]]
    volume_fig(core)
    t = frame_tables(core)
    frame_fig(t)
    topics(df)
    n = coding_sample(df)
    core.drop(columns=["text", "summary"]).to_csv(OUT / "articles_with_frames.csv", index=False, encoding="utf-8-sig")
    print(f"coding sample rows: {n}")
    piv = t.pivot_table(index=["lang", "frame"], columns="period", values="share", observed=True)
    print((piv * 100).round(1).to_string())
    print(t.groupby(["lang", "period"], observed=True)["n_articles"].first().to_string())


if __name__ == "__main__":
    main()
