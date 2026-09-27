"""Build the fuel-discourse news corpus (P4).

Sources (all public news pages, robots.txt respected, rate-limited, cached):
  prothomalo  Bangla  search API (Quintype), date-bounded, full text in story cards
  samakal     Bangla  daily sitemaps, filtered on Bangla URL slug, article fetched
  dailystar   English yearly sitemaps, filtered on English URL slug, article fetched

Not automated here (see README): Facebook/YouTube (need Meta Content Library / YouTube API key),
Jugantor/Kaler Kantho/TBS (no usable discovery endpoint found yet), parliamentary debates.

Full article text goes to data/ (gitignored: it is copyrighted). Only metadata
(url, date, headline, frame flags) is written to out/ by analyze.py.

usage: python collect.py [--sources prothomalo samakal dailystar] [--windows 2022 2026] [--limit N]
"""
import argparse
import datetime as dt
import html
import json
import re
import sys
from urllib.parse import unquote

from bs4 import BeautifulSoup
from lxml import etree

from common import DATA, FUEL_RE_BN, FUEL_RE_EN, FUEL_SLUG_EN, WINDOWS, Polite, is_fuel_text, strip_boilerplate

_SINKS = {}


def emit(rec):
    """Append one record to data/corpus_<source>.jsonl immediately (crash-safe, parallel-safe per source)."""
    f = _SINKS.get(rec["source"])
    if f is None:
        f = _SINKS[rec["source"]] = (DATA / f"corpus_{rec['source']}.jsonl").open("a", encoding="utf-8")
    f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    f.flush()
    return rec
NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def daterange(a, b):
    d, end = dt.date.fromisoformat(a), dt.date.fromisoformat(b)
    while d <= end:
        yield d
        d += dt.timedelta(days=1)


def to_ms(day, end=False):
    t = dt.datetime.combine(day, dt.time(23, 59, 59) if end else dt.time(0, 0), tzinfo=dt.timezone.utc)
    return int(t.timestamp() * 1000)


def sitemap_urls(xml_text):
    root = etree.fromstring(xml_text.encode("utf-8"))
    for u in root.findall("s:url", NS):
        loc = u.findtext("s:loc", namespaces=NS)
        lm = u.findtext("s:lastmod", namespaces=NS)
        cap = " ".join(t.strip() for t in u.itertext() if t.strip())  # image captions ride along as text
        yield loc.strip(), (lm or "").strip(), cap


# ---------------------------------------------------------------- article extraction (generic HTML)
def extract_article(page):
    s = BeautifulSoup(page, "lxml")
    title = None
    m = s.find("meta", attrs={"property": "og:title"})
    if m and m.get("content"):
        title = html.unescape(m["content"]).strip()
    if not title and s.title:
        title = s.title.get_text(strip=True)
    date = None
    for j in s.find_all("script", type="application/ld+json"):
        try:
            d = json.loads(j.string or "")
        except (ValueError, TypeError):
            continue
        nodes = d.get("@graph", [d]) if isinstance(d, dict) else d
        for n in nodes if isinstance(nodes, list) else []:
            if isinstance(n, dict) and n.get("datePublished"):
                date = n["datePublished"]
                break
        if date:
            break
    if not date:
        for p in ("article:published_time", "og:published_time"):
            m = s.find("meta", attrs={"property": p}) or s.find("meta", attrs={"name": p})
            if m and m.get("content"):
                date = m["content"]
                break
    if not date:
        t = s.find("time", attrs={"datetime": True})
        date = t["datetime"] if t else None
    root = s.find("article") or s.find(attrs={"itemprop": "articleBody"}) or s.body or s
    paras = [p.get_text(" ", strip=True) for p in root.find_all("p")]
    text = strip_boilerplate("\n".join(p for p in paras if len(p) > 25))
    return title, (date or "")[:10], text


def make_rec(source, lang, url, date, title, text, window, summary=""):
    body = f"{title or ''} {summary} {text or ''}"
    hits = len(FUEL_RE_BN.findall(body)) + len(FUEL_RE_EN.findall(body))
    return {"id": f"{source}:{url}", "source": source, "lang": lang, "url": url, "date": date,
            "title": title or "", "summary": summary, "text": text or "", "window": window,
            "fuel_hits": hits, "fuel_in_title": bool(is_fuel_text(title or ""))}


# ---------------------------------------------------------------- Prothom Alo
PA_QUERIES = ["জ্বালানি তেলের দাম", "ডিজেল পেট্রল অকটেন দাম বৃদ্ধি", "বিপিসি লোকসান তেল", "কেরোসিনের দাম"]


def pa_text(item):
    parts = []
    for c in item.get("cards", []):
        for el in c.get("story-elements", []):
            if el.get("type") == "text" and el.get("text"):
                parts.append(BeautifulSoup(el["text"], "lxml").get_text(" ", strip=True))
    return "\n".join(parts)


def collect_prothomalo(http, win_name, a, b, limit, per_query=200):
    seen, out = set(), []
    # month-sized chunks keep each query's relevance-ranked head focused on that period
    d = dt.date.fromisoformat(a)
    end = dt.date.fromisoformat(b)
    chunks = []
    while d <= end:
        nxt = min(end, (d.replace(day=1) + dt.timedelta(days=32)).replace(day=1) - dt.timedelta(days=1))
        chunks.append((d, nxt))
        d = nxt + dt.timedelta(days=1)
    for (ca, cb) in chunks:
        for q in PA_QUERIES:
            for off in range(0, per_query, 50):
                params = {"q": q, "limit": 50, "offset": off,
                          "published-after": to_ms(ca), "published-before": to_ms(cb, end=True)}
                try:
                    raw = http.get("https://www.prothomalo.com/api/v1/advanced-search", params=params)
                except Exception as e:  # noqa: BLE001
                    print(f"  [pa] {q} {ca} off={off}: {e}", file=sys.stderr)
                    break
                items = json.loads(raw).get("items", [])
                if not items:
                    break
                for it in items:
                    cid = it["story-content-id"]
                    if cid in seen:
                        continue
                    seen.add(cid)
                    text = pa_text(it)
                    head = it.get("headline") or ""
                    if not is_fuel_text(head + " " + (it.get("summary") or "") + " " + text[:3000]):
                        continue
                    date = dt.datetime.fromtimestamp(it["first-published-at"] / 1000, dt.timezone.utc).astimezone(
                        dt.timezone(dt.timedelta(hours=6))).strftime("%Y-%m-%d")
                    out.append(emit(make_rec("prothomalo", "bn", it["url"], date, head, text, win_name, it.get("summary") or "")))
                if len(items) < 50:
                    break
        print(f"  [pa {win_name}] {ca}..{cb}: kept so far {len(out)} (seen {len(seen)})", flush=True)
        if limit and len(out) >= limit:
            break
    return out[:limit] if limit else out


# ---------------------------------------------------------------- Samakal
def collect_samakal(http, win_name, a, b, limit):
    out = []
    for day in daterange(a, b):
        url = f"https://samakal.com/sitemap/sitemap-daily-{day.isoformat()}.xml"
        try:
            xml = http.get(url)
        except Exception as e:  # noqa: BLE001
            print(f"  [samakal] {day}: {e}", file=sys.stderr)
            continue
        try:
            entries = list(sitemap_urls(xml))
        except etree.XMLSyntaxError:
            continue
        for loc, lm, cap in entries:
            if not FUEL_RE_BN.search(unquote(loc) + " " + cap):
                continue
            try:
                title, date, text = extract_article(http.get(loc))
            except Exception as e:  # noqa: BLE001
                print(f"  [samakal] {loc[:80]}: {e}", file=sys.stderr)
                continue
            if not is_fuel_text((title or "") + " " + text[:3000]):
                continue
            out.append(emit(make_rec("samakal", "bn", loc, date or day.isoformat(), title, text, win_name)))
        if day.day == 1 or day.isoformat() == b:
            print(f"  [samakal {win_name}] through {day}: kept {len(out)}", flush=True)
        if limit and len(out) >= limit:
            break
    return out[:limit] if limit else out


# ---------------------------------------------------------------- Daily Star
def collect_dailystar(http, win_name, a, b, limit):
    out = []
    idx = http.get("https://www.thedailystar.net/sitemap.xml")
    root = etree.fromstring(idx.encode("utf-8"))
    year_a, year_b = a[:4], b[:4]
    maps = [e.text.strip() for e in root.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
            if re.search(r"/sitemaps/(\d{4})/", e.text) and year_a <= re.search(r"/sitemaps/(\d{4})/", e.text).group(1) <= year_b]
    for sm in maps:
        try:
            entries = list(sitemap_urls(http.get(sm)))
        except Exception as e:  # noqa: BLE001
            print(f"  [dailystar] {sm}: {e}", file=sys.stderr)
            continue
        cands = [(loc, lm) for loc, lm, _ in entries if a <= lm[:10] <= b and FUEL_SLUG_EN.search(loc.rsplit("/", 1)[-1])]
        print(f"  [dailystar {win_name}] {sm.rsplit('/', 1)[-1]}: {len(cands)} candidate URLs", flush=True)
        for loc, lm in cands:
            try:
                title, date, text = extract_article(http.get(loc))
            except Exception as e:  # noqa: BLE001
                print(f"  [dailystar] {loc[:80]}: {e}", file=sys.stderr)
                continue
            if not is_fuel_text((title or "") + " " + text[:3000]):
                continue
            out.append(emit(make_rec("dailystar", "en", loc, date or lm[:10], title, text, win_name)))
            if limit and len(out) >= limit:
                return out
    return out


ADAPTERS = {"prothomalo": collect_prothomalo, "samakal": collect_samakal, "dailystar": collect_dailystar}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sources", nargs="+", default=list(ADAPTERS))
    ap.add_argument("--windows", nargs="+", default=list(WINDOWS))
    ap.add_argument("--limit", type=int, default=0, help="max records per source/window (0 = no cap)")
    ap.add_argument("--from", dest="frm", help="override window start (YYYY-MM-DD)")
    ap.add_argument("--to", dest="to", help="override window end")
    args = ap.parse_args()

    http = Polite(min_delay=1.5)
    for src in args.sources:  # fresh output per run; the HTTP cache makes re-fetching free
        (DATA / f"corpus_{src}.jsonl").write_text("", encoding="utf-8")
    for src in args.sources:
        for w in args.windows:
            a, b = WINDOWS[w]
            a, b = args.frm or a, args.to or b
            print(f"== {src} / {w}: {a}..{b}", flush=True)
            recs = ADAPTERS[src](http, w, a, b, args.limit)
            print(f"== {src}/{w}: {len(recs)} fuel articles", flush=True)


if __name__ == "__main__":
    main()
