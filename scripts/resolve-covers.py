#!/usr/bin/env python3
"""
Resolve real Amazon covers for every book in src/data/books.json.

Deriving a cover from the ISBN-10 is unreliable (Amazon returns a 43-byte empty
GIF for many titles), so this resolves each affiliate link (amzn.to/...) to its
real ASIN and validates that the cover image actually exists (> 1 KB). Books that
can't be resolved keep coverUrl = null and fall back to the placeholder card.

Writes results incrementally so re-runs skip already-resolved books.

Usage:
  python3 scripts/resolve-covers.py          # only books without a valid cover
  python3 scripts/resolve-covers.py --all     # re-resolve everything
"""
import json
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BOOKS = ROOT / "src" / "data" / "books.json"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15"
COVER = "https://m.media-amazon.com/images/P/{code}.01._SCLZZZZZZZ_SX300_.jpg"
MIN_BYTES = 1000  # Amazon's empty placeholder is 43 bytes

FORCE = "--all" in sys.argv


def resolve_asin(amazon_url: str) -> str | None:
    try:
        out = subprocess.run(
            ["curl", "-sIL", "-A", UA, amazon_url],
            capture_output=True, text=True, timeout=25,
        ).stdout
    except Exception:
        return None
    locs = re.findall(r"(?i)^location:\s*(\S+)", out, re.MULTILINE)
    target = locs[-1] if locs else amazon_url
    m = re.search(r"/(?:dp|gp/product)/([A-Z0-9]{10})", target)
    return m.group(1) if m else None


def cover_bytes(code: str) -> int:
    try:
        out = subprocess.run(
            ["curl", "-sI", "-A", UA, COVER.format(code=code)],
            capture_output=True, text=True, timeout=25,
        ).stdout
    except Exception:
        return 0
    if not re.search(r"(?i)^HTTP.* 200", out, re.MULTILINE):
        return 0
    m = re.search(r"(?i)^content-length:\s*(\d+)", out, re.MULTILINE)
    return int(m.group(1)) if m else 0


def isbn13_to_isbn10(isbn13: str) -> str | None:
    if len(isbn13) != 13 or not isbn13.startswith("978"):
        return None
    core = isbn13[3:12]
    total = sum(int(d) * (10 - i) for i, d in enumerate(core))
    check = (11 - (total % 11)) % 11
    return core + ("X" if check == 10 else str(check))


def valid_cover(book: dict) -> bool:
    url = book.get("coverUrl") or ""
    m = re.search(r"/P/([A-Z0-9]{10})\.", url)
    return bool(m) and cover_bytes(m.group(1)) >= MIN_BYTES


def main() -> None:
    data = json.loads(BOOKS.read_text(encoding="utf-8"))
    books = data["books"]
    resolved = miss = skipped = 0

    for i, b in enumerate(books, 1):
        if not FORCE and b.get("coverUrl"):
            skipped += 1
            continue

        code = None
        # 1) real ASIN from affiliate link
        asin = resolve_asin(b.get("amazonUrl", "")) if b.get("amazonUrl") else None
        if asin and cover_bytes(asin) >= MIN_BYTES:
            code = asin
        else:
            # 2) fallback to ISBN-10 derived cover
            isbn10 = isbn13_to_isbn10(re.sub(r"\D", "", b.get("isbn", "")))
            if isbn10 and cover_bytes(isbn10) >= MIN_BYTES:
                code = isbn10

        if code:
            b["coverUrl"] = COVER.format(code=code)
            resolved += 1
            tag = "ASIN" if code == asin else "ISBN"
            print(f"[{i}/{len(books)}] OK  ({tag}) {b['title'][:50]}")
        else:
            b["coverUrl"] = None
            miss += 1
            print(f"[{i}/{len(books)}] MISS      {b['title'][:50]}")

        # write incrementally so interruptions don't lose progress
        if i % 10 == 0:
            BOOKS.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        time.sleep(0.2)

    BOOKS.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nResueltas: {resolved} | sin portada: {miss} | saltadas: {skipped}")


if __name__ == "__main__":
    main()
