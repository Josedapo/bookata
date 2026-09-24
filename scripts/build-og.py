#!/usr/bin/env python3
"""
Build the default Open Graph share image, public/images/brand/og-default.jpg
(1200x630), from existing brand assets only: a crop of the hero cover wall
(hero-portadas.jpg), darkened, with the unmodified imagotype and logo PNGs
scaled and centred on top. Book pages share their own cover instead.

Re-run after rebuilding the hero:  python3 scripts/build-og.py
"""
from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "public" / "images" / "brand"
OUT = BRAND / "og-default.jpg"
W, H = 1200, 630
INK = (11, 16, 48)

wall = Image.open(BRAND / "hero-portadas.jpg").convert("RGB")
# Cover-crop the 2:1 wall to 1200x630 (1.905:1).
scale = max(W / wall.width, H / wall.height)
wall = wall.resize((round(wall.width * scale), round(wall.height * scale)), Image.LANCZOS)
left, top = (wall.width - W) // 2, (wall.height - H) // 2
wall = wall.crop((left, top, left + W, top + H))
wall = ImageEnhance.Brightness(wall).enhance(0.55)

# Ink panel behind the brand so the logo reads on any cover mix.
canvas = Image.blend(wall, Image.new("RGB", (W, H), INK), 0.45)

imagotype = Image.open(BRAND / "imagotype.png").convert("RGBA")
logo = Image.open(BRAND / "logo.png").convert("RGBA")
ih = 200
imagotype = imagotype.resize((round(imagotype.width * ih / imagotype.height), ih), Image.LANCZOS)
lh = 120
logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)

gap = 40
total_w = imagotype.width + gap + logo.width
x = (W - total_w) // 2
canvas.paste(imagotype, (x, (H - ih) // 2), imagotype)
canvas.paste(logo, (x + imagotype.width + gap, (H - lh) // 2), logo)

canvas.save(OUT, "JPEG", quality=85, optimize=True, progressive=True)
print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
