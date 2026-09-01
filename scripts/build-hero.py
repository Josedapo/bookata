#!/usr/bin/env python3
"""
Build the home hero backdrop as a wall of real catalogue covers.

Why this exists: the previous hero used `banner-cabecera.png` (1536x470). In a
hero roughly 1440x700 the image had to be upscaled ~1.5x by object-cover, which
read as soft. This composes a 2880x1440 source from the covers Bookata already
has, so the hero is downscaled on every screen instead of upscaled.

Only books already in books.json are used. No artwork is invented.

Usage:  python3 scripts/build-hero.py
"""
import io
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
BOOKS = ROOT / "src" / "data" / "books.json"
OUT = ROOT / "public" / "images" / "brand" / "hero-portadas.jpg"

W, H = 2880, 1440
COL_W = 340
GAP = 26
PITCH = COL_W + GAP
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15"


def stable_hash(text: str) -> int:
    h = 2166136261
    for ch in text:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def fetch(url: str) -> Image.Image | None:
    try:
        raw = subprocess.run(
            ["curl", "-sL", "-A", UA, url], capture_output=True, timeout=40
        ).stdout
        if len(raw) < 1000:
            return None
        return Image.open(io.BytesIO(raw)).convert("RGB")
    except Exception:
        return None


def main() -> None:
    books = json.load(open(BOOKS, encoding="utf-8"))["books"]

    # Spread the selection across every age range so the wall reads as the whole
    # catalogue rather than one shelf.
    by_age: dict[str, list] = {}
    for b in books:
        if b.get("coverUrl"):
            by_age.setdefault(b["ageRange"][0], []).append(b)
    for age in by_age:
        by_age[age].sort(key=lambda b: stable_hash(b["id"]))

    picked, i = [], 0
    ages = sorted(by_age)
    while len(picked) < 60:
        added = False
        for age in ages:
            if i < len(by_age[age]):
                picked.append(by_age[age][i])
                added = True
        if not added:
            break
        i += 1

    print(f"descargando {len(picked)} portadas…")
    covers = []
    for b in picked:
        img = fetch(b["coverUrl"])
        if img:
            covers.append(img)
    print(f"descargadas: {len(covers)}")
    if not covers:
        raise SystemExit("no se pudo descargar ninguna portada")

    canvas = Image.new("RGB", (W, H), (11, 16, 48))
    n_cols = W // PITCH + 2
    idx = 0
    for col in range(n_cols):
        x = col * PITCH
        # Stagger each column so rows never line up into a grid.
        y = -((col * 137) % 320) - 120
        while y < H:
            cover = covers[idx % len(covers)]
            idx += 1
            ratio = COL_W / cover.width
            h = max(1, int(cover.height * ratio))
            canvas.paste(cover.resize((COL_W, h), Image.LANCZOS), (x, y))
            y += h + GAP

    # The wall is a backdrop, not content: 60 bright covers behind a headline
    # need taming at the source. Desaturating and darkening here means the CSS
    # scrims only have to handle local contrast, not rescue the whole image.
    canvas = ImageEnhance.Color(canvas).enhance(0.82)
    canvas = ImageEnhance.Brightness(canvas).enhance(0.72)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"escrito {OUT.relative_to(ROOT)}  {OUT.stat().st_size / 1024:.0f} KB  {W}x{H}")


if __name__ == "__main__":
    main()
