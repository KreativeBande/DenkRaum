const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const TOOLS = path.join(__dirname, "..", "tools");
const html = fs.readFileSync(path.join(TOOLS, "change-schleuse.html"), "utf8");
const line = html.split("\n").find((l) => l.startsWith("var D={"));
const D = JSON.parse(line.replace(/^var D=/, "").replace(/;\s*$/, ""));

test("jedes verlinkte Kürzel hat im Falldokument eine id", () => {
  const cache = {};
  const missing = [];
  for (const [id, type] of D.nodes) {
    const file = D.docfile[D.typeDoc[type]];
    cache[file] = cache[file] || fs.readFileSync(path.join(TOOLS, file), "utf8");
    if (!cache[file].includes(` id="${id}"`)) missing.push(`${file}#${id}`);
  }
  assert.deepEqual(missing, []);
});

test("Falldokumente haben das Sprung-Skript und keine doppelten Eintrags-ids", () => {
  for (const file of new Set(Object.values(D.docfile))) {
    const src = fs.readFileSync(path.join(TOOLS, file), "utf8");
    assert.ok(src.includes('<script id="anchor-js">'), file);
    const ids = [...src.matchAll(/\sid="([A-Z]{1,3}-\d+|E\d|M\d|BC)"/g)].map((m) => m[1]);
    const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
    assert.deepEqual(dup, [], file);
  }
});

test("Change-Schleuse: Zurück-Link und Signatur nach Konvention", () => {
  assert.ok(html.includes('href="../index.html"'));
  assert.ok(html.includes('<a class="sig" href="https://www.michaela-kuehn.com"'));
});
