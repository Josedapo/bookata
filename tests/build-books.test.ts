import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SECTIONS } from "@/lib/config";
import { diffGolden, ROOT } from "./helpers";

/*
 * scripts/build-books.py, run on a temporary copy, must rebuild the committed books.json and
 * sections.json (SECTIONS in config.ts) from the committed Excel. Needs a Python with openpyxl
 * (scripts/requirements.txt); BK_PYTHON points to it.
 */
const PYTHON = process.env.BK_PYTHON ?? path.join(os.homedir(), ".local/share/martin/venv-bookata/bin/python");

describe("build-books.py", () => {
  it("reproduces books.json and SECTIONS from the committed Excel", () => {
    if (!fs.existsSync(PYTHON)) {
      throw new Error(`No Python with openpyxl at ${PYTHON}: create it from scripts/requirements.txt or set BK_PYTHON.`);
    }
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bookata-books-"));
    try {
      fs.cpSync(path.join(ROOT, "scripts"), path.join(tmp, "scripts"), {
        recursive: true,
        filter: (src) => !src.includes(`${path.sep}out`),
      });
      // Only the resolved covers survive in the seed (the script keeps them by ISBN), so every
      // other field of the result has to come from the Excel.
      const committed = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "data", "books.json"), "utf8"));
      fs.mkdirSync(path.join(tmp, "src", "data"), { recursive: true });
      const seed = { books: committed.books.map((b: { isbn: string; coverUrl: string }) => ({ isbn: b.isbn, coverUrl: b.coverUrl })) };
      fs.writeFileSync(path.join(tmp, "src", "data", "books.json"), JSON.stringify(seed));
      const stdout = execFileSync(PYTHON, ["-B", path.join(tmp, "scripts", "build-books.py")], {
        encoding: "utf8",
        env: { ...process.env, PYTHONHASHSEED: "0" },
      });
      // Byte-for-byte: rerunning the script in the repo must leave git clean.
      for (const rel of ["src/data/books.json", "src/data/sections.json"]) {
        const built = fs.readFileSync(path.join(tmp, rel), "utf8");
        expect(built === fs.readFileSync(path.join(ROOT, rel), "utf8"), `${rel} differs from the committed file`).toBe(true);
      }
      expect(JSON.parse(fs.readFileSync(path.join(tmp, "src/data/sections.json"), "utf8"))).toEqual(SECTIONS);
      expect(diffGolden("build-books-stdout.json", { stdout: stdout.split("\n") })).toEqual([]);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
