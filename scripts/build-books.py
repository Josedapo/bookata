#!/usr/bin/env python3
"""
Build src/data/books.json and the SECTIONS config from the curated Excel
(scripts/source/Bookata_def.xlsx). One sheet per age range; each sheet defines
its own ordered list of curated sections.

Outputs:
  - src/data/books.json          (Book[] + meta)
  - scripts/out/sections.json    (per-age SECTIONS, for config.ts)
  - stdout report                (counts, warnings)
"""
import json
import re
import unicodedata
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
XLSX = ROOT / "scripts" / "source" / "Bookata_def.xlsx"
BOOKS_OUT = ROOT / "src" / "data" / "books.json"
SECTIONS_OUT = ROOT / "scripts" / "out" / "sections.json"

GENRE_MAP = {
    "aventuras": "aventuras",
    "valores": "valores",
    "fantasia": "fantasia",
    "misterio": "misterio",
    "educativo": "educativo",
    "comic": "comic",
    "amor": "amor",
}

# Column indices (0-based) shared across all sheets
C_SECTION, C_TITLE, C_AUTHOR, C_ISBN, C_AGE, C_GENRE, C_SYN, C_AMAZON = range(8)

HOOK_MARKERS = [
    "¿Por qué les encanta?",
    "A los niños les encanta porque",
    "A los niños les encanta porque...",
]


def strip_accents(s: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn"
    )


def slugify(s: str) -> str:
    s = strip_accents(s).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def clean_isbn(raw: str) -> str:
    """Return the ISBN-13 digits (e.g. 'ISBN-13: 978-8479015619' -> '9788479015619').

    The label 'ISBN-13'/'ISBN-10' also contains digits, so prefer a 13-digit run
    that starts with the 978/979 EAN prefix before falling back.
    """
    digits = re.sub(r"\D", "", raw or "")
    m = (
        re.search(r"97[89]\d{10}", digits)
        or re.search(r"\d{13}", digits)
        or re.search(r"\d{10}", digits)
    )
    return m.group(0) if m else digits


def isbn13_to_isbn10(isbn13: str) -> str | None:
    if len(isbn13) != 13 or not isbn13.startswith("978"):
        return None
    core = isbn13[3:12]  # 9 digits
    total = sum(int(d) * (10 - i) for i, d in enumerate(core))
    check = (11 - (total % 11)) % 11
    return core + ("X" if check == 10 else str(check))


def cover_url(isbn13: str) -> str | None:
    isbn10 = isbn13_to_isbn10(isbn13)
    if not isbn10:
        return None
    return f"https://m.media-amazon.com/images/P/{isbn10}.01._SCLZZZZZZZ_SX300_.jpg"


def parse_ages(raw: str) -> list[str]:
    # "8-10 años, 10-12 años" -> ["8-10", "10-12"]
    found = re.findall(r"\d{1,2}-\d{1,2}", raw or "")
    seen, out = set(), []
    for a in found:
        if a not in seen:
            seen.add(a)
            out.append(a)
    return out


def parse_genres(raw: str) -> list[str]:
    out, seen = [], set()
    for part in re.split(r"[,/]", raw or ""):
        key = slugify(part).replace("-", "")  # "fantasía"->"fantasia"
        g = GENRE_MAP.get(key)
        if g and g not in seen:
            seen.add(g)
            out.append(g)
    return out


def extract_hook(syn: str) -> tuple[str, bool]:
    """Return (hook, found_marker). Hook = text after the 'why' marker."""
    if not syn:
        return "", False
    for marker in HOOK_MARKERS:
        idx = syn.find(marker)
        if idx != -1:
            tail = syn[idx + len(marker):].lstrip(" .\n\r\t")
            tail = tail.strip()
            if tail and tail[0].islower():
                tail = tail[0].upper() + tail[1:]
            return tail, True
    return syn.strip(), False


def section_label(raw: str) -> str:
    # first line only, collapse whitespace
    line = str(raw).split("\n")[0]
    return re.sub(r"\s+", " ", line).strip()


def main() -> None:
    wb = openpyxl.load_workbook(XLSX, data_only=True)

    # age range per sheet, in sheet order
    sheet_age = {
        "3 a 5": "3-5",
        "6 a 8": "6-8",
        "8 a 10": "8-10",
        "10 a 12": "10-12",
        "12 a 14": "12-14",
        "14 a 16": "14-16",
    }

    sections = []  # SectionInfo list
    section_index = {}  # (age, label) -> section id
    books_by_isbn = {}  # isbn13 -> book dict (for dedup/merge)
    order_out = []  # preserve first-seen order of books
    warnings = []

    for ws in wb.worksheets:
        age = sheet_age.get(ws.title.strip())
        if not age:
            warnings.append(f"Hoja desconocida saltada: {ws.title}")
            continue
        current_section_id = None
        sec_order = 0
        for r in list(ws.iter_rows(values_only=True))[1:]:
            # new section marker in col A
            if r[C_SECTION] and str(r[C_SECTION]).strip():
                label = section_label(r[C_SECTION])
                sec_id = f"{age}--{slugify(label)}"
                if (age, label) not in section_index:
                    section_index[(age, label)] = sec_id
                    sections.append({
                        "id": sec_id,
                        "label": label,
                        "slug": slugify(label),
                        "ageRange": age,
                        "order": sec_order,
                    })
                    sec_order += 1
                current_section_id = section_index[(age, label)]

            title = str(r[C_TITLE]).strip() if r[C_TITLE] else ""
            if not title:
                continue

            isbn13 = clean_isbn(str(r[C_ISBN] or ""))
            ages = parse_ages(str(r[C_AGE] or "")) or [age]
            genres = parse_genres(str(r[C_GENRE] or ""))
            hook, found = extract_hook(str(r[C_SYN] or ""))
            if not found:
                warnings.append(f"[hook sin marcador] {title}")
            amazon = str(r[C_AMAZON]).strip() if r[C_AMAZON] else ""

            key = isbn13 or slugify(title)
            if key in books_by_isbn:
                # merge: union ageRange + sections
                b = books_by_isbn[key]
                for a in ages:
                    if a not in b["ageRange"]:
                        b["ageRange"].append(a)
                if current_section_id and current_section_id not in b["sections"]:
                    b["sections"].append(current_section_id)
                for g in genres:
                    if g not in b["genres"]:
                        b["genres"].append(g)
                continue

            slug = slugify(re.sub(r"\(.*?\)", "", title))
            book = {
                "id": slug,
                "title": title,
                "author": str(r[C_AUTHOR]).strip() if r[C_AUTHOR] else "",
                "isbn": isbn13,
                "ageRange": ages,
                "genres": genres,
                "sections": [current_section_id] if current_section_id else [],
                "hook": hook,
                "amazonUrl": amazon,
                "coverUrl": cover_url(isbn13),
                "slug": slug,
            }
            books_by_isbn[key] = book
            order_out.append(key)

    books = [books_by_isbn[k] for k in order_out]

    # ensure unique slugs
    seen_slugs = {}
    for b in books:
        s = b["slug"]
        if s in seen_slugs:
            seen_slugs[s] += 1
            b["slug"] = b["id"] = f"{s}-{seen_slugs[s]}"
            warnings.append(f"[slug duplicado] {b['title']} -> {b['slug']}")
        else:
            seen_slugs[s] = 1

    data = {
        "meta": {"lastUpdated": "2026-07-17", "totalBooks": len(books)},
        "books": books,
    }
    BOOKS_OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    SECTIONS_OUT.parent.mkdir(parents=True, exist_ok=True)
    SECTIONS_OUT.write_text(json.dumps(sections, ensure_ascii=False, indent=2), encoding="utf-8")

    # report
    print(f"Libros únicos: {len(books)}")
    from collections import Counter
    ac = Counter()
    for b in books:
        for a in b["ageRange"]:
            ac[a] += 1
    print("Por franja (un libro puede contar en varias):")
    for a in ["3-5", "6-8", "8-10", "10-12", "12-14", "14-16"]:
        print(f"  {a}: {ac[a]}")
    print(f"Secciones totales: {len(sections)}")
    no_cover = [b['title'] for b in books if not b['coverUrl']]
    no_genre = [b['title'] for b in books if not b['genres']]
    no_amazon = [b['title'] for b in books if not b['amazonUrl']]
    print(f"Sin portada (ISBN no 978): {len(no_cover)}")
    for t in no_cover: print("   -", t)
    print(f"Sin género: {len(no_genre)}")
    for t in no_genre: print("   -", t)
    print(f"Sin link Amazon: {len(no_amazon)}")
    for t in no_amazon: print("   -", t)
    print(f"\nAvisos ({len(warnings)}):")
    for w in warnings:
        print("   ", w)


if __name__ == "__main__":
    main()
