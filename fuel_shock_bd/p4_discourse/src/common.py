"""Shared helpers for the P4 discourse pipeline: polite HTTP, fuel-relevance filter, event timeline."""
import hashlib
import json
import re
import time
import urllib.robotparser
from pathlib import Path
from urllib.parse import urlparse

import requests

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
CACHE = DATA / "cache"
OUT = ROOT / "out"
for d in (DATA, CACHE, OUT):
    d.mkdir(parents=True, exist_ok=True)

# Identify the crawler honestly as research traffic; sites can block or contact us.
UA = "FuelShockDiscourseResearch/0.1 (academic research crawler; contact: the.abraar.rar@gmail.com)"

# Collection windows (inclusive). 2022: record diesel hike of 5 Aug 2022. 2026: Apr/Jun/Sep hikes.
WINDOWS = {
    "2022": ("2022-07-20", "2022-09-15"),
    "2026": ("2026-03-01", "2026-09-21"),
}

# Dated events used for event-study windows. Sources: README.md / reseach_pass_1.md; 5 Aug 2022 is the
# 2022 record hike (diesel Tk 80 -> 114) named in research_proposals.md.
EVENTS = [
    ("2022-08-05", "hike_2022", "2022 record hike (diesel Tk 80 -> 114)"),
    ("2026-04-18", "hike_2026_apr", "Apr 2026 hike (diesel -> 115)"),
    ("2026-06-01", "hike_2026_jun", "Jun 2026 hike (petrol/octane +5)"),
    ("2026-09-05", "pm_apology", "PM public apology"),
    ("2026-09-19", "pay_scale", "National Pay Scale 2026 gazetted"),
    ("2026-09-21", "hike_2026_sep", "Sep 2026 hike (+Tk 20 all fuels)"),
]

# Fuel-relevance filter. Stems, not words: Bangla inflects heavily (তেলের, তেলে, ডিজেলের ...).
# Both spellings of জ্বালানি/জ্বালানী are listed because outlets differ.
FUEL_BN = [
    "জ্বালানি তেল", "জ্বালানী তেল", "জ্বালানি সংকট", "জ্বালানী সংকট", "জ্বালানির দাম", "জ্বালানীর দাম",
    "তেলের দাম", "তেলের মূল্য", "ডিজেল", "পেট্রল", "অকটেন", "কেরোসিন", "ফার্নেস", "বিপিসি",
    "জ্বালানি মূল্য", "জ্বালানী মূল্য", "জ্বালানি খাত", "জ্বালানি ভর্তুকি",
]
FUEL_EN = [
    r"fuel pric", r"fuel hike", r"fuel crisis", r"fuel subsid", r"diesel", r"petrol", r"octane",
    r"kerosene", r"\bBPC\b", r"oil pric", r"fuel oil", r"energy pric",
]
FUEL_RE_BN = re.compile("|".join(map(re.escape, FUEL_BN)))
FUEL_RE_EN = re.compile("|".join(FUEL_EN), re.I)
# Slug-level (URL) filter for English sitemaps (hyphen-separated).
FUEL_SLUG_EN = re.compile(r"fuel|diesel|petrol|octane|kerosene|oil-pric|bpc|energy-pric|lpg|fuel-oil", re.I)


# Site footers that get swept into <p> text (found via a spurious NMF topic on Samakal).
_FOOTER = re.compile(r"SAMAKAL ALL RIGHTS RESERVED.*", re.S)


def strip_boilerplate(text: str) -> str:
    return _FOOTER.sub("", text).rstrip()


def is_fuel_text(text: str) -> bool:
    return bool(FUEL_RE_BN.search(text) or FUEL_RE_EN.search(text))


class Polite:
    """requests wrapper: robots.txt aware, per-host rate limit, on-disk cache, bounded retries."""

    def __init__(self, min_delay=1.5):
        self.s = requests.Session()
        self.s.headers["User-Agent"] = UA
        self.min_delay = min_delay
        self._last = {}
        self._robots = {}
        self._delay = {}

    def _rp(self, url):
        host = urlparse(url).netloc
        if host not in self._robots:
            rp = urllib.robotparser.RobotFileParser()
            try:
                r = self.s.get(f"https://{host}/robots.txt", timeout=20)
                rp.parse(r.text.splitlines() if r.status_code == 200 else [])
            except requests.RequestException:
                rp.parse([])
            self._robots[host] = rp
            cd = rp.crawl_delay(UA) or rp.crawl_delay("*")
            self._delay[host] = max(self.min_delay, float(cd)) if cd else self.min_delay
        return self._robots[host], self._delay[host]

    def allowed(self, url):
        rp, _ = self._rp(url)
        return rp.can_fetch(UA, url)

    def get(self, url, params=None, cache=True, timeout=30):
        key = hashlib.sha1((url + json.dumps(params, sort_keys=True, default=str)).encode()).hexdigest()
        cp = CACHE / f"{key}.txt"
        if cache and cp.exists():
            return cp.read_text(encoding="utf-8")
        if not self.allowed(url):
            raise PermissionError(f"robots.txt disallows {url}")
        _, delay = self._rp(url)
        host = urlparse(url).netloc
        wait = self._last.get(host, 0) + delay - time.time()
        if wait > 0:
            time.sleep(wait)
        for attempt in range(3):
            try:
                r = self.s.get(url, params=params, timeout=timeout)
                self._last[host] = time.time()
                if r.status_code == 200:
                    r.encoding = "utf-8"
                    if cache:
                        cp.write_text(r.text, encoding="utf-8")
                    return r.text
                if r.status_code in (429, 503):
                    time.sleep(10 * (attempt + 1))
                    continue
                raise requests.HTTPError(f"{r.status_code} for {url}")
            except requests.RequestException:
                if attempt == 2:
                    raise
                time.sleep(3 * (attempt + 1))
        raise RuntimeError(f"failed: {url}")
