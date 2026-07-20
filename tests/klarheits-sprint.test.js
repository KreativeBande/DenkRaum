const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const {
  escapeRegExp,
  highlightNebel,
  analyzeDimensions,
  scoreText,
  scoreStatus,
  topHebel,
  checkCoverage,
  scoreToMeters,
  formatMeters,
  ISO25010
} = require("../tools/klarheits-sprint/app.js");

describe("escapeRegExp", () => {
  test("escapes every regex-special character so the result matches literally", () => {
    const special = ".*+?^${}()|[]\\";
    const escaped = escapeRegExp(special);
    const re = new RegExp(`^${escaped}$`);
    assert.match(special, re);
  });

  test("leaves plain words untouched", () => {
    assert.equal(escapeRegExp("Kundenservice"), "Kundenservice");
  });
});

describe("highlightNebel", () => {
  test("returns empty html and zeroed counts for empty input", () => {
    const { html, counts } = highlightNebel("");
    assert.equal(html, "");
    assert.deepEqual(counts, { absicht: 0, stakeholder: 0, loesung: 0, qualitaet: 0, muss: 0, kann: 0 });
  });

  test("detects one hit per category and wraps it in the right span", () => {
    const { html, counts } = highlightNebel("Wir wollen das System verbessern für alle.");
    assert.equal(counts.absicht, 1); // "verbessern"
    assert.equal(counts.loesung, 1); // "System"
    assert.equal(counts.stakeholder, 1); // "alle"
    assert.equal(counts.qualitaet, 0);
    assert.match(html, /<span class="nebel-absicht">verbessern<\/span>/);
    assert.match(html, /<span class="nebel-loesung">System<\/span>/);
    assert.match(html, /<span class="nebel-stakeholder">alle<\/span>/);
  });

  test("counts overlapping word-list hits separately (kann vs. optional)", () => {
    const { counts } = highlightNebel("Das kann optional sein.");
    assert.equal(counts.kann, 2);
  });

  test("HTML-escapes surrounding text while still highlighting", () => {
    const { html } = highlightNebel("Preis < 5 € & mehr, das muss stimmen.");
    assert.match(html, /&lt;/);
    assert.match(html, /&amp;/);
    assert.match(html, /<span class="nebel-muss">muss<\/span>/);
  });
});

describe("analyzeDimensions", () => {
  test("empty text scores 0 on intent/pfad/stoer, but wert and loesung have non-zero baselines", () => {
    const dims = analyzeDimensions("");
    assert.equal(dims.intent, 0);
    assert.equal(dims.pfad, 0);
    assert.equal(dims.stoer, 0);
    // Absence of a stakeholder-fog word is rewarded with +4, even with no role word either —
    // a non-obvious edge case in analyzeDimensions' wert formula worth pinning down.
    assert.equal(dims.wert, 4);
    // No solution-container word at all still yields the "else" branch (5), not 0 —
    // same story for loesung.
    assert.equal(dims.loesung, 5);
  });

  test("intent maxes out at 20 when goal verb, metric and deadline are all present", () => {
    const dims = analyzeDimensions("Wir steigern den Umsatz um 20% bis Q4.");
    assert.equal(dims.intent, 20);
  });

  test("wert maxes out at 20 with a role, a value connector and no stakeholder-fog word", () => {
    const dims = analyzeDimensions("Das wird umgesetzt, damit die Kundin profitiert.");
    assert.equal(dims.wert, 20);
  });

  test("wert is penalized when a stakeholder-fog word is present", () => {
    const dims = analyzeDimensions("Das hilft allen.");
    // no role word, no value connector, but "allen" is a stakeholder-fog word -> -4, clamped to 0
    assert.equal(dims.wert, 0);
  });

  test("loesung reaches 20 for a concrete function word, and only 2 for a bare solution container", () => {
    const concrete = analyzeDimensions("Wir bauen eine Exportfunktion.");
    assert.equal(concrete.loesung, 20);

    const vague = analyzeDimensions("Wir brauchen ein System.");
    assert.equal(vague.loesung, 2);
  });

  test("pfad maxes out at 20 with a sequence word and a deadline", () => {
    const dims = analyzeDimensions("Zuerst analysieren wir, dann folgt Q1.");
    assert.equal(dims.pfad, 20);
  });

  test("stoer accumulates 7 points per distinct risk word and clamps at 20", () => {
    const dims = analyzeDimensions("Risiko: unter der Annahme, dass Unsicherheit bleibt.");
    assert.equal(dims.stoer, 20); // 3 hits * 7 = 21, clamped to 20
  });
});

describe("scoreStatus", () => {
  test("boundaries between niedrig/mittel/hoch sit exactly at 40 and 70", () => {
    assert.deepEqual(scoreStatus(39), { icon: "❌", label: "niedrig" });
    assert.deepEqual(scoreStatus(40), { icon: "⚠️", label: "mittel" });
    assert.deepEqual(scoreStatus(69), { icon: "⚠️", label: "mittel" });
    assert.deepEqual(scoreStatus(70), { icon: "✅", label: "hoch" });
  });
});

describe("scoreText", () => {
  test("overall is the sum of the five dimensions and drives the status label", () => {
    const { dims, overall, status } = scoreText("Wir brauchen eine App, die das Ganze einfacher macht.");
    const sum = dims.intent + dims.wert + dims.loesung + dims.pfad + dims.stoer;
    assert.equal(overall, sum);
    assert.deepEqual(status, scoreStatus(overall));
  });
});

describe("topHebel", () => {
  test("returns the three lowest-scoring dimensions, ascending, with their metadata", () => {
    const dims = { intent: 5, wert: 20, loesung: 0, pfad: 10, stoer: 20 };
    const result = topHebel(dims);
    assert.deepEqual(result.map((h) => h.key), ["loesung", "intent", "pfad"]);
    assert.deepEqual(result.map((h) => h.value), [0, 5, 10]);
    for (const h of result) {
      assert.ok(h.label);
      assert.ok(h.question);
      assert.ok(h.tip);
    }
  });
});

describe("checkCoverage", () => {
  test("marks an ISO 25010 category as covered only when one of its words appears", () => {
    const result = checkCoverage("Die Antwortzeit liegt unter 2 Sekunden.", ISO25010);
    const performance = result.find((c) => c.key === "performance");
    const security = result.find((c) => c.key === "security");
    assert.equal(performance.covered, true);
    assert.equal(security.covered, false);
  });

  test("is case-insensitive", () => {
    const result = checkCoverage("SICHERHEIT hat oberste Priorität.", ISO25010);
    // "sicher" is a substring of "SICHERHEIT" lower-cased, so this should match
    assert.equal(result.find((c) => c.key === "security").covered, true);
  });
});

describe("scoreToMeters / formatMeters", () => {
  test("scoreToMeters maps 0 -> 30m and 100 -> 10000m linearly, clamping out-of-range input", () => {
    assert.equal(scoreToMeters(0), 30);
    assert.equal(scoreToMeters(100), 10000);
    assert.equal(scoreToMeters(-50), 30);
    assert.equal(scoreToMeters(150), 10000);
    assert.equal(scoreToMeters(50), 5015);
  });

  test("formatMeters stays in meters below 1000 and switches to km above", () => {
    assert.equal(formatMeters(999), "999 m");
    assert.equal(formatMeters(1500), "1.5 km");
    assert.equal(formatMeters(5015), "5 km"); // trailing ".0" is stripped
    assert.equal(formatMeters(10000), "10 km");
  });
});
