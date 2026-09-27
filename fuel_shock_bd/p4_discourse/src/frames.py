"""Frame dictionaries + v0 classifier for P4.

This is a *transparent baseline*, not a validated measure. Each frame is a list of Bangla and English
substrings (Bangla inflects, so substrings rather than whole words). Presence rule: >=1 hit in
headline+summary, or >=2 hits in the body. Precision/recall are UNKNOWN until validate.py is run against
a human-coded sample (see out/coding_sample.csv); do not report frame shares as findings before that.

Frames follow research_proposals.md (P4); two extras are added and labelled:
  fiscal_loss  - justification by BPC losses / subsidy burden (a distinct attribution from world prices)
  protest      - reports of protest/strike activity (a marker for the outcome side, not a blame frame)
"""
import re

FRAMES = {
    # blame/justification located in the world market, war, exchange rate
    "global_market": [
        "আন্তর্জাতিক বাজার", "আন্তর্জাতিক বাজারে", "বিশ্ববাজার", "বৈশ্বিক", "হরমুজ", "ইরান", "যুদ্ধ", "ব্রেন্ট",
        "ডলার সংকট", "ডলারের দাম", "আমদানি ব্যয়", "আমদানি খরচ", "এলসি", "এল/সি",
        "international market", "global market", "world market", "hormuz", "brent", "war in", "iran",
        "import cost", "exchange rate", "dollar crisis", "geopolitical",
    ],
    # blame located in government competence / policy choices (incl. opposition attack lines)
    "govt_failure": [
        "সরকারের ব্যর্থতা", "ব্যর্থ", "অদক্ষতা", "অব্যবস্থাপনা", "অযোগ্য", "সরকারের কারণে", "জনদুর্ভোগ",
        "গণবিরোধী", "জনবিরোধী", "জনগণের ওপর চাপ", "চাপিয়ে দ", "পদত্যাগ", "অপশাসন", "কুশাসন",
        "failure", "mismanagement", "incompeten", "anti-people", "burden on the people", "burden on people",
        "misgovern", "resign",
    ],
    # blame located in corruption, syndicates, hoarders, profiteering, smuggling rings
    "corruption_syndicate": [
        "সিন্ডিকেট", "দুর্নীতি", "লুটপাট", "মজুতদার", "অবৈধ মজুত", "অতি মুনাফা", "মুনাফাখোর", "কালোবাজার",
        "চাঁদাবাজি", "কারসাজি", "অনিয়ম", "সিস্টেম লস",
        "syndicate", "corruption", "hoard", "profiteer", "black market", "black-market", "irregularit",
        "cartel", "looting", "extortion",
    ],
    # blame/explanation located in India: smuggling across border, Indian supply, Adani, cross-border price parity
    "india": [
        "ভারতে পাচার", "ভারতে চোরাচালান", "সীমান্ত দিয়ে", "পাচার", "চোরাচালান", "আদানি", "আদানী",
        "ভারত থেকে", "ভারতীয়", "ভারতের সঙ্গে", "ভারতের চেয়ে", "নুমালীগড়", "পাইপলাইন",
        "smuggl", "across the border", "adani", "india", "indian diesel", "numaligarh", "pipeline",
    ],
    # fairness / relative deprivation: pay scale, inequality, who bears the burden
    "fairness_payscale": [
        "বেতন কাঠামো", "পে স্কেল", "পে-স্কেল", "জাতীয় বেতন", "সরকারি কর্মচারী", "সরকারি চাকরিজীবী",
        "বৈষম্য", "ধনী", "গরিব", "নিম্নআয়ের", "নিম্ন আয়ের", "মধ্যবিত্ত", "খেটে খাওয়া", "দিনমজুর", "ন্যায্য", "অন্যায্য", "অযৌক্তিক",
        "pay scale", "pay-scale", "national pay", "civil servant", "government employee", "inequality",
        "unfair", "unjust", "fairness", "low-income", "middle class", "irrational", "unjustified",
    ],
    # apology / empathy / reassurance framing from the state
    "apology_empathy": [
        "ক্ষমা চ", "দুঃখিত", "দুঃখ প্রকাশ", "সহনীয়", "সহনশীল", "ধৈর্য", "সংযত", "সহানুভূতি",
        "বাধ্য হয়ে", "উপায় ছিল না", "বিকল্প ছিল না",
        "apolog", "tolerable", "sympath", "forced to", "no other option", "no choice", "bear with",
        "we understand",
    ],
    # --- additions (not in the original six) ---
    "fiscal_loss": [
        "লোকসান", "ভর্তুকি", "ক্ষতি পুষিয়ে", "ঘাটতি", "সমন্বয়", "স্বয়ংক্রিয় মূল্য",
        "loss", "subsid", "deficit", "adjustment", "automatic pricing", "cost recovery",
    ],
    "protest": [
        "বিক্ষোভ", "মিছিল", "হরতাল", "অবরোধ", "প্রতিবাদ", "ধর্মঘট", "সমাবেশ", "মানববন্ধন", "বিক্ষুব্ধ", "ঘেরাও",
        "protest", "hartal", "strike", "demonstrat", "rally", "blockade", "human chain", "unrest", "riot",
    ],
}
FRAME_ORDER = list(FRAMES)
_RES = {k: re.compile("|".join(re.escape(t) for t in v), re.I) for k, v in FRAMES.items()}

# Known ambiguities to test in validation (not fixed by eyeballing shares):
#  - English "india", "loss", "war in", "strike", "rally" can be incidental; Bangla "ভারত*", "লোকসান", "সমন্বয়",
#    "ধনী", "গরিব", "ব্যর্থ" likewise. Removed already on linguistic grounds: "মজুত" (= stock/reserve, neutral
#    supply reporting), "অপচয়", "কষ্ট" (hardship, not apology), "সাময়িক" ("temporary").
#  - Presence != stance: an article quoting a minister blaming the world market and one contesting that claim
#    both score global_market. Stance/attribution needs the human-coded layer or a supervised model.


def classify(title, summary, body):
    head = f"{title or ''} {summary or ''}"
    out = {}
    for k, rx in _RES.items():
        h = len(rx.findall(head))
        b = len(rx.findall(body or ""))
        out[k] = int(h >= 1 or b >= 2)
        out[k + "_hits"] = h + b
    return out
