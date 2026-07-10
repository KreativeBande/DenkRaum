/*
 * Klarheits-Sprint – vom Rohsatz zur zertifizierten Anforderung
 * Michaela Kühn (www.michaela-kuehn.com)
 *
 * Alles hier ist regelbasierte Wortlisten-Heuristik, kein LLM, kein Backend.
 * Siehe Footer "Systemprompt" in index.html für die Erklärung an das Publikum.
 */

/* ---------------------------------------------------------------------
 * 1. Wortlisten
 * ------------------------------------------------------------------- */

const NEBEL_WORDS = {
  absicht: [
    "besser", "verbessern", "verbessert", "optimieren", "optimiert", "effizienter",
    "effizienz", "modernisieren", "weiterentwickeln", "stärken", "vereinfachen",
    "verschlanken", "zukunftssicher", "professionalisieren", "transformieren",
    "voranbringen", "attraktiver"
  ],
  stakeholder: [
    "alle", "jeder", "jedermann", "man", "die leute", "alle beteiligten",
    "alle mitarbeitenden", "alle mitarbeiter", "alle nutzer", "alle kunden",
    "irgendwer", "jeder nutzer", "alle stakeholder", "jede abteilung"
  ],
  loesung: [
    "app", "system", "tool", "plattform", "software", "dashboard", "portal",
    "anwendung", "lösung"
  ],
  qualitaet: [
    "schnell", "sicher", "benutzerfreundlich", "stabil", "robust", "zuverlässig",
    "performant", "intuitiv", "modern", "einfach", "flexibel", "skalierbar"
  ]
};

const MUSS_WORDS = ["muss", "müssen", "hat zu", "sind verpflichtet", "ist verpflichtet", "zwingend"];
const KANN_WORDS = ["kann", "können", "optional", "nice-to-have", "bei bedarf", "wünschenswert"];

// Signalwörter für die Score-Dimensionen (nicht Teil des Nebel-Highlightings)
const GOAL_VERBS = [
  "steigern", "steigert", "senken", "senkt", "reduzieren", "reduziert",
  "erhöhen", "erhöht", "verkürzen", "verkürzt", "verringern", "halbieren",
  "verdoppeln", "erreichen", "erzielen", "sinkt", "sinken"
];
const MEASURABLE_RE = /\d+\s?%|\bum\s+\d+|\b\d+([.,]\d+)?\s?(sekunden?|minuten?|tage?|€|euro)\b/i;
const DEADLINE_RE = /\bq[1-4]\b|\bquartal\b|\bbis\s+(zum|zur|ende)\b|\bende\s+(des\s+)?(jahres|quartals|monats)\b|\d{1,2}\.\d{1,2}\.(\d{2,4})?|\b20\d{2}\b/i;

const ROLE_WORDS = [
  "kunde", "kundin", "kunden", "endnutzer", "endnutzerin", "nutzer", "nutzerin",
  "supportteam", "vertriebsteam", "einkäufer", "projektleitung", "product owner",
  "auftraggeber", "fachbereich", "teamleitung", "kundenservice", "mitarbeitende im",
  "sachbearbeiter", "geschäftsführung", "lenkungsausschuss", "change-managerin",
  "informationssicherheitsbeauftragte"
];
const VALUE_CONNECTORS = ["damit", "sodass", "wodurch", "zugunsten von", "um zu"];

const CONCRETE_FUNCTION_WORDS = [
  "funktion", "feature", "schnittstelle", "api", "export", "import",
  "authentifizierung", "zwei-faktor", "freigabeprozess", "workflow", "formular",
  "benachrichtigung", "filter", "suche", "berichtsfunktion", "modul", "checkout",
  "ladezeit", "bearbeitungsschritte"
];

const SEQUENCE_WORDS = [
  "zuerst", "danach", "anschließend", "im ersten schritt", "phase 1", "phase 2",
  "vor der einführung", "nach der einführung", "meilenstein", "reihenfolge",
  "schrittweise", "pilotphase", "pilot", "rollout"
];

const RISK_WORDS = [
  "risiko", "risiken", "annahme", "angenommen", "vorausgesetzt", "sofern",
  "falls", "unter der bedingung", "abhängig von", "abhängigkeit",
  "vorbehaltlich", "unsicherheit", "offene frage"
];

/* ---------------------------------------------------------------------
 * 2. Nebel-Highlighting
 * ------------------------------------------------------------------- */

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildAlternation(words) {
  return words
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");
}

function buildHighlightRegex() {
  const groups = [
    ["absicht", NEBEL_WORDS.absicht],
    ["stakeholder", NEBEL_WORDS.stakeholder],
    ["loesung", NEBEL_WORDS.loesung],
    ["qualitaet", NEBEL_WORDS.qualitaet],
    ["muss", MUSS_WORDS],
    ["kann", KANN_WORDS]
  ];
  const pattern = groups
    .map(([name, words]) => `(?<${name}>\\b(?:${buildAlternation(words)})\\b)`)
    .join("|");
  return new RegExp(pattern, "giu");
}

const HIGHLIGHT_REGEX = buildHighlightRegex();

function escapeHtml(s) {
  return (s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Baut HTML mit <span class="nebel-xxx"> um erkannte Nebelwörter.
// Gibt zusätzlich die Trefferzahl pro Kategorie zurück.
function highlightNebel(text) {
  const counts = { absicht: 0, stakeholder: 0, loesung: 0, qualitaet: 0, muss: 0, kann: 0 };
  if (!text) return { html: "", counts };

  let html = "";
  let lastIndex = 0;
  const re = new RegExp(HIGHLIGHT_REGEX.source, HIGHLIGHT_REGEX.flags);
  let m;
  while ((m = re.exec(text)) !== null) {
    const cat = Object.keys(counts).find((k) => m.groups[k] !== undefined);
    html += escapeHtml(text.slice(lastIndex, m.index));
    html += `<span class="nebel-${cat}">${escapeHtml(m[0])}</span>`;
    counts[cat]++;
    lastIndex = re.lastIndex;
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  html += escapeHtml(text.slice(lastIndex));
  return { html, counts };
}

/* ---------------------------------------------------------------------
 * 3. Klarheits-Score (5 Dimensionen à 20 Punkte)
 * ------------------------------------------------------------------- */

function hasAny(text, list) {
  return list.some((w) => text.includes(w));
}

function clampScore(n) {
  return Math.max(0, Math.min(20, Math.round(n)));
}

function analyzeDimensions(rawText) {
  const t = (rawText || "").toLowerCase();

  const intent = clampScore(
    (hasAny(t, GOAL_VERBS) ? 8 : 0) +
    (MEASURABLE_RE.test(t) ? 7 : 0) +
    (DEADLINE_RE.test(t) ? 5 : 0)
  );

  const wert = clampScore(
    (hasAny(t, ROLE_WORDS) ? 10 : 0) +
    (hasAny(t, VALUE_CONNECTORS) ? 6 : 0) +
    (hasAny(t, NEBEL_WORDS.stakeholder) ? -4 : 4)
  );

  const loesung = clampScore(
    (hasAny(t, CONCRETE_FUNCTION_WORDS) ? 15 : 0) +
    (hasAny(t, NEBEL_WORDS.loesung) && !hasAny(t, CONCRETE_FUNCTION_WORDS) ? 2 : 5)
  );

  const pfad = clampScore(
    (hasAny(t, SEQUENCE_WORDS) ? 12 : 0) +
    (DEADLINE_RE.test(t) ? 8 : 0)
  );

  const stoer = clampScore(
    RISK_WORDS.reduce((acc, w) => acc + (t.includes(w) ? 7 : 0), 0)
  );

  return { intent, wert, loesung, pfad, stoer };
}

function scoreStatus(overall) {
  if (overall >= 70) return { icon: "✅", label: "hoch" };
  if (overall >= 40) return { icon: "⚠️", label: "mittel" };
  return { icon: "❌", label: "niedrig" };
}

function scoreText(rawText) {
  const dims = analyzeDimensions(rawText);
  const overall = dims.intent + dims.wert + dims.loesung + dims.pfad + dims.stoer;
  return { dims, overall, status: scoreStatus(overall) };
}

const DIMENSION_META = {
  intent: {
    label: "Intent-Kern",
    question: "Ist das Ziel messbar benannt?",
    tip: "Formuliere ein messbares Ziel: eine Kennzahl, einen Prozentwert oder ein Datum, an dem der Erfolg sichtbar wird."
  },
  wert: {
    label: "Werttreiber",
    question: "Wird der Nutzen für wen klar?",
    tip: "Benenne konkret, wer profitiert – keine Sammelbegriffe wie „alle“ oder „die Nutzer“, sondern eine echte Rolle."
  },
  loesung: {
    label: "Lösungsbausteine",
    question: "Steckt schon eine konkrete Funktion drin?",
    tip: "Beschreibe die konkrete Funktion oder den Baustein, nicht nur den Lösungscontainer (System, Tool, App, Plattform)."
  },
  pfad: {
    label: "Umsetzungspfad",
    question: "Ist Reihenfolge/Zeitpunkt erkennbar?",
    tip: "Ergänze Reihenfolge oder Zeitpunkt: Was passiert zuerst, was folgt danach, bis wann?"
  },
  stoer: {
    label: "Störstellen",
    question: "Sind Risiken/Annahmen benannt?",
    tip: "Benenne mindestens eine Annahme oder ein Risiko, das die Umsetzung gefährden könnte."
  }
};

function topHebel(dims) {
  return Object.entries(dims)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([key, value]) => ({ key, value, ...DIMENSION_META[key] }));
}

/* ---------------------------------------------------------------------
 * 4. Beispiel-Bausteine (9 Publikumskontexte)
 * ------------------------------------------------------------------- */

const EXAMPLES = [
  {
    id: "klassiker",
    context: "Klassiker",
    text: "Wir brauchen eine App, die das Ganze einfacher macht.",
    regie: "Der Einstiegsklassiker – jede:r im Publikum kennt diesen Satz aus dem eigenen Projektalltag.",
    muster: {
      s: "Sachbearbeiter:innen im Kundenservice",
      t: "die Bearbeitung von Rückerstattungsanträgen von aktuell 8 auf 3 Arbeitsschritte reduziert wird",
      a: "die Kundenservice-Mitarbeitenden, die täglich Anträge bearbeiten",
      k: "durchschnittliche Bearbeitungszeit sinkt auf unter 5 Minuten pro Antrag",
      e: "nur der bestehende Rückerstattungsprozess, keine neuen Zahlungsarten"
    }
  },
  {
    id: "ausschreibung",
    context: "Ausschreibung",
    text: "Der Auftragnehmer muss ein System liefern, das performant, sicher und benutzerfreundlich ist.",
    regie: "Typischer Lastenheft-Satz – zeigt, wie Qualitätsnebel in Ausschreibungen Standard ist.",
    muster: {
      s: "die vergebende Fachabteilung laut Lastenheft",
      t: "das Zielsystem Anfragen in unter 2 Sekunden beantwortet und eine Zwei-Faktor-Authentifizierung nutzt",
      a: "alle registrierten Fachanwender:innen der Abteilung",
      k: "Antwortzeit ≤ 2 Sekunden bei 200 gleichzeitigen Nutzer:innen, erfolgreiche Penetrationstest-Abnahme",
      e: "ohne mobile Anwendung, nur Desktop-Browser gemäß Lastenheft Abschnitt 4"
    }
  },
  {
    id: "vorstand",
    context: "Vorstand",
    text: "Wir müssen die Effizienz steigern und moderner werden.",
    regie: "Vorstands-Sprech in Reinform – reiner Absichtsnebel, guter Opener für die Intent-Kern-Diskussion.",
    muster: {
      s: "die Geschäftsführung im Rahmen der Digitalstrategie",
      t: "der manuelle Freigabeprozess für Bestellungen automatisiert wird",
      a: "die Einkaufsabteilung, die Freigaben aktuell per E-Mail koordiniert",
      k: "Durchlaufzeit einer Bestellfreigabe sinkt von 3 Tagen auf 4 Stunden",
      e: "betrifft nur Bestellungen unter 10.000 €, keine Investitionsanträge"
    }
  },
  {
    id: "audit",
    context: "Audit",
    text: "Alle Mitarbeitenden müssen sich an die neuen Richtlinien halten, damit wir sicherer werden.",
    regie: "Passt zur ISO/IEC 27001-Perspektive der Waschmaschine – Audit-Publikum erkennt sich sofort wieder.",
    muster: {
      s: "die Informationssicherheitsbeauftragte gemäß ISO/IEC 27001",
      t: "verbindliche Schulungen zur Passwortrichtlinie für alle Zugriffsberechtigten eingeführt werden",
      a: "Mitarbeitende mit Zugriff auf Kundendaten (ca. 120 Personen)",
      k: "100 % Teilnahmequote dokumentiert, Passwort-Audit zeigt keine Richtlinienverstöße",
      e: "betrifft nur interne Systeme, keine Kundenportale"
    }
  },
  {
    id: "halloffame",
    context: "Hall of Fame",
    text: "Das System soll schnell und zukunftssicher sein.",
    regie: "Running Gag der „Hall of Fame schlechtester Anforderungssätze“ – für den Lacher zwischendurch.",
    muster: {
      s: "die Produktverantwortliche für die Kernplattform",
      t: "die Ladezeit der Startseite auf unter 1 Sekunde reduziert wird",
      a: "alle täglich aktiven Nutzer:innen der Plattform (ø 40.000/Tag)",
      k: "95 % aller Seitenaufrufe laden in unter 1 Sekunde, gemessen über 30 Tage",
      e: "betrifft nur die Startseite, nicht das Backend-Adminsystem"
    }
  },
  {
    id: "oscar",
    context: "Oscar-Beispiel",
    text: "Wir wollen die beste Plattform der Branche bauen – ein Meilenstein für alle.",
    regie: "Bewusst overdramatisch formuliert – „und die Nominierung geht an…“ sorgt für Bühnen-Humor.",
    muster: {
      s: "die Geschäftsleitung als Auftraggeberin der Markteinführung",
      t: "eine Vergleichsstudie mit den drei Hauptwettbewerbern in Ladezeit, Funktionsumfang und Kundenzufriedenheit gewonnen wird",
      a: "Neukund:innen in der Evaluierungsphase vor Vertragsabschluss",
      k: "Platz 1 in mindestens 2 von 3 Vergleichskriterien laut unabhängiger Marktstudie bis Q4",
      e: "bezieht sich nur auf den Vergleich mit den drei benannten Wettbewerbern"
    }
  },
  {
    id: "lenkungsausschuss",
    context: "Lenkungsausschuss",
    text: "Das Projekt soll bis Ende des Jahres abgeschlossen sein und den Anforderungen aller Stakeholder genügen.",
    regie: "Zeigt: ein Datum macht einen Satz noch nicht klar, solange „alle Stakeholder“ ungeklärt bleibt.",
    muster: {
      s: "der Lenkungsausschuss als Auftraggeber des Projekts",
      t: "die drei priorisierten Kernanforderungen aus dem Anforderungsworkshop bis zum 31.12. umgesetzt werden",
      a: "die im Workshop benannten Stakeholder-Gruppen (Vertrieb, IT, Kundenservice)",
      k: "Abnahmeprotokoll aller drei Kernanforderungen liegt bis 15.12. unterschrieben vor",
      e: "weitere, nicht priorisierte Anforderungen werden in Phase 2 behandelt"
    }
  },
  {
    id: "productowner",
    context: "Product Owner",
    text: "Als Product Owner will ich, dass die Plattform besser wird, damit die Kunden zufriedener sind.",
    regie: "Schon in User-Story-Form, aber immer noch nebelig – guter Übergang zur STAKE-Station.",
    muster: {
      s: "der Product Owner des Kundenportals",
      t: "der Checkout-Prozess von 6 auf 3 Schritte verkürzt wird",
      a: "Kund:innen, die im letzten Quartal den Checkout abgebrochen haben (Abbruchquote 34 %)",
      k: "Abbruchquote sinkt innerhalb von 8 Wochen nach Rollout auf unter 20 %",
      e: "betrifft nur den Checkout-Flow, nicht die Produktsuche"
    }
  },
  {
    id: "changemanagement",
    context: "Change Management",
    text: "Wir müssen die Organisation transformieren, damit alle mit den neuen Prozessen zurechtkommen.",
    regie: "Absichtsnebel und Stakeholder-Nebel kombiniert – passend für Change-Kontext-Publikum.",
    muster: {
      s: "die Change-Managerin im Rahmen der Prozessumstellung",
      t: "ein Schulungs- und Kommunikationsplan für die drei betroffenen Abteilungen eingeführt wird",
      a: "Mitarbeitende der Abteilungen Einkauf, Logistik und Buchhaltung (ca. 60 Personen)",
      k: "Akzeptanz-Umfrage nach 6 Wochen zeigt ≥ 80 % Zustimmung, Supportanfragen sinken um 50 %",
      e: "betrifft nur die drei genannten Abteilungen, nicht externe Partner"
    }
  }
];

const GENERIC_MUSTER = {
  s: "die konkrete Rolle, die diese Anforderung stellt (z. B. eine Abteilung oder ein:e Verantwortliche:r)",
  t: "die eigentliche Aufgabe mit einer messbaren Veränderung (Zahl, Zeit oder Anteil)",
  a: "die Gruppe, die vom Ergebnis tatsächlich profitiert",
  k: "das Kriterium, an dem sich Erfolg objektiv ablesen lässt",
  e: "das, was ausdrücklich NICHT Teil dieser Anforderung ist"
};

/* ---------------------------------------------------------------------
 * 5. ISO/IEC 25010:2023 & ISO/IEC 27001:2022 Annex A – Wortlisten & Programme
 * ------------------------------------------------------------------- */

const ISO25010 = [
  { key: "functional", label: "Functional Suitability", de: "Funktionale Eignung", words: ["funktion", "aufgabe", "funktionsumfang", "checkout", "prozess", "workflow", "kernprozess"] },
  { key: "performance", label: "Performance Efficiency", de: "Leistungseffizienz", words: ["sekunde", "sekunden", "ladezeit", "antwortzeit", "durchsatz", "performant", "schnell", "latenz"] },
  { key: "compatibility", label: "Compatibility", de: "Kompatibilität", words: ["kompatibel", "schnittstelle", "api", "bestehenden systemen", "integration", "browser"] },
  { key: "interaction", label: "Interaction Capability", de: "Interaktionsfähigkeit", words: ["benutzerfreundlich", "bedienung", "intuitiv", "verständlich", "zugänglich", "barrierefrei", "interaktionsmuster"] },
  { key: "reliability", label: "Reliability", de: "Zuverlässigkeit", words: ["zuverlässig", "verfügbarkeit", "ausfallsicher", "stabil", "fehlerrate", "wiederherstellung"] },
  { key: "security", label: "Security", de: "Sicherheit", words: ["sicher", "authentifizierung", "verschlüssel", "zugriffsschutz", "penetrationstest", "autorisierung", "autorisiert"] },
  { key: "maintainability", label: "Maintainability", de: "Wartbarkeit", words: ["wartbar", "dokumentiert", "testbar", "modul", "erweiterbar", "wartung"] },
  { key: "flexibility", label: "Flexibility", de: "Flexibilität", words: ["flexibel", "skalierbar", "konfigurierbar", "anpassbar", "portabel"] },
  { key: "safety", label: "Safety", de: "Gefahrenfreiheit", words: ["gefahr", "gefährdung", "schaden vermeiden", "notfall", "personenschutz", "sicherheitsrisiko", "unfallverhütung"] }
];

const ISO27001 = [
  { key: "a5", label: "A.5 Organisatorisch", words: ["richtlinie", "organisation", "verantwortlichkeit", "rolle", "prozess", "governance", "freigabeprozess", "geregelt"] },
  { key: "a6", label: "A.6 Personenbezogen", words: ["schulung", "mitarbeitende", "personal", "bewusstsein", "training", "kompetenz"] },
  { key: "a7", label: "A.7 Physisch", words: ["zutritt", "gebäude", "serverraum", "physisch", "gelände", "hardware-schutz"] },
  { key: "a8", label: "A.8 Technologisch", words: ["verschlüsselung", "zugriffskontrolle", "firewall", "backup", "systemhärtung", "log", "protokolliert"] }
];

function checkCoverage(text, list) {
  const t = (text || "").toLowerCase();
  return list.map((item) => ({ ...item, covered: item.words.some((w) => t.includes(w)) }));
}

const WASCHPROGRAMME = {
  schnell: {
    label: "Schnellwäsche (30°)",
    color: "schnell",
    additions: [
      { targets: ["interaction"], std: "iso25010", text: "Die Bedienung folgt etablierten Interaktionsmustern und ist für die genannte Zielgruppe ohne Schulung verständlich." },
      { targets: ["compatibility"], std: "iso25010", text: "Die Lösung ist kompatibel mit den bestehenden Systemen und lässt sich über eine definierte Schnittstelle integrieren." }
    ]
  },
  fein: {
    label: "Feinwäsche (40°)",
    color: "fein",
    additions: [
      { targets: ["functional"], std: "iso25010", text: "Der beschriebene Funktionsumfang deckt den vollständigen Kernprozess ohne Medienbrüche ab." },
      { targets: ["reliability"], std: "iso25010", text: "Die Lösung ist auf eine Verfügbarkeit von mindestens 99,5 % ausgelegt und erholt sich automatisiert von Fehlern." },
      { targets: ["performance"], std: "iso25010", text: "Die Antwortzeit liegt unter 2 Sekunden bei üblicher Systemlast." },
      { targets: ["maintainability"], std: "iso25010", text: "Die Komponenten sind modular aufgebaut, dokumentiert und automatisiert testbar." },
      { targets: ["flexibility"], std: "iso25010", text: "Die Lösung ist konfigurierbar und lässt sich an veränderte Rahmenbedingungen anpassen." }
    ]
  },
  koch: {
    label: "Kochwäsche (60°)",
    color: "koch",
    additions: [
      { targets: ["security"], std: "iso25010", text: "Der Zugriff erfolgt ausschließlich über eine autorisierte, verschlüsselte Verbindung mit Zwei-Faktor-Authentifizierung." },
      { targets: ["safety"], std: "iso25010", text: "Mögliche Gefährdungen für Personen wurden identifiziert und durch geeignete Schutzmaßnahmen ausgeschlossen." },
      { targets: ["a5"], std: "iso27001", text: "Verantwortlichkeiten und Freigabeprozesse sind organisatorisch klar geregelt und dokumentiert." },
      { targets: ["a6"], std: "iso27001", text: "Betroffene Mitarbeitende erhalten vor Einführung eine verpflichtende Schulung." },
      { targets: ["a7"], std: "iso27001", text: "Der physische Zugriff auf die zugrunde liegende Infrastruktur ist auf autorisiertes Personal beschränkt." },
      { targets: ["a8"], std: "iso27001", text: "Zugriffskontrollen, Verschlüsselung und Backups sind technisch implementiert und protokolliert." },
      { targets: ["risk"], std: "extra", text: "Risiko: Sollte eine der genannten Annahmen nicht zutreffen, ist der Zeitplan gefährdet – dies wird im Risikoregister beobachtet." },
      { targets: ["pfad"], std: "extra", text: "Die Umsetzung erfolgt in einem ersten Schritt als Pilot, gefolgt vom vollständigen Rollout." }
    ]
  }
};

/* ---------------------------------------------------------------------
 * 6. Gauge (Sichtweiten-Instrument)
 * ------------------------------------------------------------------- */

function scoreToMeters(score) {
  const minM = 30, maxM = 10000;
  const ratio = Math.max(0, Math.min(100, score)) / 100;
  return Math.round(minM + ratio * (maxM - minM));
}

function formatMeters(m) {
  if (m >= 1000) return (m / 1000).toFixed(1).replace(".0", "") + " km";
  return m + " m";
}

/* ---------------------------------------------------------------------
 * 7. Globaler State
 * ------------------------------------------------------------------- */

const state = {
  currentStep: 1,
  rohsatz: "",
  activeExampleId: null,
  stake: { s: "", t: "", a: "", k: "", e: "" },
  requireView: false,
  washRun: { schnell: false, fein: false, koch: false },
  washAdditions: [], // { std, key, text, program }
  beamerMode: false,
  gesamtbildOpen: false,
  liveScore: 0
};

/* ---------------------------------------------------------------------
 * 8. Rendering
 * ------------------------------------------------------------------- */

const el = {};

function qs(id) { return document.getElementById(id); }

function cacheEls() {
  [
    "fogRoot", "beamerToggle", "gesamtbildToggle", "stepNav",
    "exampleGrid", "regieNote", "rohsatzInput", "rohsatzHighlight",
    "scoreValue", "scoreStatus", "gaugeNeedle", "gaugeReadout", "dimensionBars", "hebelList",
    "stakeS", "stakeT", "stakeA", "stakeK", "stakeE", "stakePreview",
    "requireToggle", "requireView", "musterBtn",
    "washInputText", "iso25010Grid", "iso27001Grid", "washLoading",
    "vorherNachher", "certBadge",
    "gesamtbildOverlay", "gesamtbildContent"
  ].forEach((id) => (el[id] = qs(id)));
  el.washButtons = document.querySelectorAll(".wasch-btn");
}

function currentFinalText() {
  const composed = composeStakeSentence();
  const additions = state.washAdditions.map((a) => a.text).join(" ");
  return `${composed} ${additions}`.trim();
}

function updateAtmosphere(score) {
  state.liveScore = score;
  const clarity = Math.max(0, Math.min(100, score)) / 100;
  document.documentElement.style.setProperty("--fog-clarity", clarity.toFixed(3));
}

function renderStepNav() {
  const steps = [1, 2, 3, 4];
  el.stepNav.innerHTML = steps
    .map((n) => {
      let cls = "pill";
      if (n === state.currentStep) cls += " current";
      else if (n < state.currentStep) cls += " done";
      const labels = { 1: "Rohsatz", 2: "Nebel-Check", 3: "STAKE-Schärfung", 4: "Waschmaschine" };
      return `<button class="${cls}" data-goto="${n}"><span class="pill-num">${n}</span>${labels[n]}</button>`;
    })
    .join("");
}

function renderSteps() {
  document.querySelectorAll(".step").forEach((sec) => {
    sec.classList.toggle("active", Number(sec.dataset.step) === state.currentStep);
  });
}

function renderExampleGrid() {
  el.exampleGrid.innerHTML = EXAMPLES.map(
    (ex) => `<button class="example-btn${ex.id === state.activeExampleId ? " active" : ""}" data-example="${ex.id}">
      <span class="example-context">${ex.context}</span>
      <span class="example-text">${escapeHtml(ex.text)}</span>
    </button>`
  ).join("");
}

function renderRegie() {
  const ex = EXAMPLES.find((e) => e.id === state.activeExampleId);
  el.regieNote.innerHTML = ex
    ? `<strong>Regie-Notiz:</strong> ${escapeHtml(ex.regie)}`
    : `<strong>Regie-Notiz:</strong> Freier Text – oder wähle oben einen vorbereiteten Baustein.`;
}

function renderHighlight() {
  const { html } = highlightNebel(state.rohsatz);
  el.rohsatzHighlight.innerHTML = html + "​";
}

function renderScoreStation() {
  const { dims, overall, status } = scoreText(state.rohsatz);
  el.scoreValue.textContent = overall;
  el.scoreStatus.innerHTML = `<span class="status-icon">${status.icon}</span> ${status.label}`;
  el.scoreStatus.className = "score-status status-" + status.label;

  const meters = scoreToMeters(overall);
  const angle = -90 + (overall / 100) * 180;
  el.gaugeNeedle.setAttribute("transform", `rotate(${angle} 100 100)`);
  el.gaugeReadout.textContent = formatMeters(meters);

  el.dimensionBars.innerHTML = Object.entries(dims)
    .map(([key, value]) => {
      const meta = DIMENSION_META[key];
      const pct = Math.round((value / 20) * 100);
      return `<div class="dim-row">
        <div class="dim-head"><span class="dim-label">${meta.label}</span><span class="dim-value">${value}/20</span></div>
        <div class="dim-track"><div class="dim-fill" style="width:${pct}%"></div></div>
        <div class="dim-question">${meta.question}</div>
      </div>`;
    })
    .join("");

  el.hebelList.innerHTML = topHebel(dims)
    .map((h) => `<li><strong>${h.label}</strong> (${h.value}/20) – ${h.tip}</li>`)
    .join("");
}

function requireFields() {
  const s = state.stake;
  return [
    { label: "Role", value: s.s || "…" },
    { label: "Expected Outcome", value: s.t || "…" },
    { label: "Quality Criteria", value: s.k || "…" },
    { label: "Users & Stakeholders", value: s.a || "…" },
    { label: "Inputs & Context", value: "abgeleitet aus dem Rohsatz-Kontext dieser Station" },
    { label: "Restrictions", value: s.e || "…" },
    { label: "Evaluation", value: s.k ? `Wird erfüllt, wenn: ${s.k}` : "…" }
  ];
}

function composeStakeSentence() {
  const s = state.stake;
  return `Als ${s.s || "…"} soll sichergestellt werden, dass ${s.t || "…"} – zugunsten von ${s.a || "…"}. ` +
    `Kriterium für Erfolg: ${s.k || "…"}. Eingrenzung: ${s.e || "…"}.`;
}

function renderStakeStation() {
  ["s", "t", "a", "e", "k"].forEach((k) => {
    const input = el["stake" + k.toUpperCase()];
    if (input.value !== state.stake[k]) input.value = state.stake[k];
  });
  el.stakePreview.textContent = composeStakeSentence();

  el.requireView.classList.toggle("visible", state.requireView);
  el.requireToggle.textContent = state.requireView ? "REQUIRE-Ansicht ausblenden" : "REQUIRE-Ansicht einblenden";
  if (state.requireView) {
    el.requireView.innerHTML = requireFields()
      .map((f) => `<div class="require-row"><span class="require-label">${f.label}</span><span class="require-value">${escapeHtml(f.value)}</span></div>`)
      .join("");
  }

  const previewScore = scoreText(composeStakeSentence()).overall;
  updateAtmosphere(previewScore);
}

function renderWashStation() {
  const finalText = currentFinalText();
  el.washInputText.textContent = composeStakeSentence();

  const iso25010Status = checkCoverage(finalText, ISO25010);
  const iso27001Status = checkCoverage(finalText, ISO27001);

  el.iso25010Grid.innerHTML = iso25010Status
    .map((c) => `<div class="iso-chip ${c.covered ? "covered" : "blindspot"}"><span class="iso-de">${c.de}</span><span class="iso-en">${c.label}</span><span class="iso-state">${c.covered ? "abgedeckt" : "blind spot"}</span></div>`)
    .join("");
  el.iso27001Grid.innerHTML = iso27001Status
    .map((c) => `<div class="iso-chip ${c.covered ? "covered" : "blindspot"}"><span class="iso-de">${c.label}</span><span class="iso-state">${c.covered ? "abgedeckt" : "blind spot"}</span></div>`)
    .join("");

  el.washButtons.forEach((btn) => {
    const prog = btn.dataset.program;
    btn.classList.toggle("done", state.washRun[prog]);
  });

  const additionsHtml = state.washAdditions
    .map((a) => `<span class="wash-tag wash-${a.program}">${escapeHtml(a.text)}</span>`)
    .join(" ");

  const coveredCount25010 = iso25010Status.filter((c) => c.covered).length;
  const coveredCount27001 = iso27001Status.filter((c) => c.covered).length;
  const fullCoverage = coveredCount25010 === ISO25010.length && coveredCount27001 === ISO27001.length;
  const finalScoreObj = scoreText(finalText);

  let badge = { icon: "🔧", label: "Nachschärfen nötig", cls: "badge-fix" };
  if (fullCoverage && finalScoreObj.overall >= 80) {
    badge = { icon: "🏆", label: "Zertifiziert mit Auszeichnung", cls: "badge-gold" };
  } else if (finalScoreObj.overall >= 70 && coveredCount25010 >= 3) {
    badge = { icon: "✅", label: "Zertifiziert", cls: "badge-cert" };
  }

  el.certBadge.className = "cert-badge " + badge.cls;
  el.certBadge.innerHTML = `<span class="cert-icon">${badge.icon}</span><span class="cert-label">${badge.label}</span><span class="cert-score">Finaler Klarheits-Score: ${finalScoreObj.overall}/100</span>`;

  el.vorherNachher.innerHTML = `
    <div class="vn-col">
      <h4>Vorher (Rohsatz)</h4>
      <p>${escapeHtml(state.rohsatz || "…")}</p>
    </div>
    <div class="vn-col">
      <h4>Nachher (zertifizierte Fassung)</h4>
      <p>${escapeHtml(composeStakeSentence())} ${additionsHtml}</p>
    </div>
  `;

  updateAtmosphere(finalScoreObj.overall);
}

function renderAll() {
  renderStepNav();
  renderSteps();
  renderExampleGrid();
  renderRegie();
  renderHighlight();
  renderScoreStation();
  renderStakeStation();
  renderWashStation();
}

/* ---------------------------------------------------------------------
 * 9. Gesamtbild
 * ------------------------------------------------------------------- */

function renderGesamtbild() {
  const { overall: rohScore, status } = scoreText(state.rohsatz);
  const finalScoreObj = scoreText(currentFinalText());
  el.gesamtbildContent.innerHTML = `
    <div class="gb-block">
      <span class="gb-kicker">1 · Rohsatz</span>
      <p class="gb-text">${escapeHtml(state.rohsatz || "(kein Text)")}</p>
    </div>
    <div class="gb-block">
      <span class="gb-kicker">2 · Nebel-Check</span>
      <p>Klarheits-Score: <strong>${rohScore}/100</strong> ${status.icon} ${status.label}</p>
    </div>
    <div class="gb-block">
      <span class="gb-kicker">3 · STAKE-Schärfung</span>
      <p class="gb-text">${escapeHtml(composeStakeSentence())}</p>
    </div>
    <div class="gb-block">
      <span class="gb-kicker">4 · Waschmaschine</span>
      <p>Finaler Klarheits-Score: <strong>${finalScoreObj.overall}/100</strong></p>
      <p class="gb-text">${escapeHtml(currentFinalText())}</p>
    </div>
  `;
}

function toggleGesamtbild(force) {
  state.gesamtbildOpen = force !== undefined ? force : !state.gesamtbildOpen;
  if (state.gesamtbildOpen) renderGesamtbild();
  el.gesamtbildOverlay.classList.toggle("visible", state.gesamtbildOpen);
}

/* ---------------------------------------------------------------------
 * 10. Navigation
 * ------------------------------------------------------------------- */

function goToStep(n) {
  state.currentStep = Math.max(1, Math.min(4, n));
  renderStepNav();
  renderSteps();
}

/* ---------------------------------------------------------------------
 * 11. Event Wiring
 * ------------------------------------------------------------------- */

function wireEvents() {
  el.stepNav.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-goto]");
    if (btn) goToStep(Number(btn.dataset.goto));
  });

  el.exampleGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-example]");
    if (!btn) return;
    const ex = EXAMPLES.find((x) => x.id === btn.dataset.example);
    state.activeExampleId = ex.id;
    state.rohsatz = ex.text;
    el.rohsatzInput.value = ex.text;
    renderExampleGrid();
    renderRegie();
    renderHighlight();
    renderScoreStation();
    updateAtmosphere(scoreText(state.rohsatz).overall);
  });

  el.rohsatzInput.addEventListener("input", () => {
    state.rohsatz = el.rohsatzInput.value;
    state.activeExampleId = null;
    renderExampleGrid();
    renderRegie();
    renderHighlight();
    renderScoreStation();
    updateAtmosphere(scoreText(state.rohsatz).overall);
  });

  el.rohsatzInput.addEventListener("scroll", () => {
    el.rohsatzHighlight.scrollTop = el.rohsatzInput.scrollTop;
    el.rohsatzHighlight.scrollLeft = el.rohsatzInput.scrollLeft;
  });

  ["s", "t", "a", "k", "e"].forEach((k) => {
    el["stake" + k.toUpperCase()].addEventListener("input", (e) => {
      state.stake[k] = e.target.value;
      renderStakeStation();
      renderWashStation();
    });
  });

  el.requireToggle.addEventListener("click", () => {
    state.requireView = !state.requireView;
    renderStakeStation();
  });

  el.musterBtn.addEventListener("click", () => {
    const ex = EXAMPLES.find((x) => x.id === state.activeExampleId);
    const muster = ex ? ex.muster : GENERIC_MUSTER;
    state.stake = { s: muster.s, t: muster.t, a: muster.a, k: muster.k, e: muster.e };
    renderStakeStation();
    renderWashStation();
  });

  el.washButtons.forEach((btn) => {
    btn.addEventListener("click", () => runWaschprogramm(btn.dataset.program));
  });

  el.beamerToggle.addEventListener("click", () => {
    state.beamerMode = !state.beamerMode;
    document.body.classList.toggle("beamer-mode", state.beamerMode);
    el.beamerToggle.classList.toggle("active", state.beamerMode);
  });

  el.gesamtbildToggle.addEventListener("click", () => toggleGesamtbild());
  el.gesamtbildOverlay.addEventListener("click", (e) => {
    if (e.target === el.gesamtbildOverlay) toggleGesamtbild(false);
  });

  document.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "textarea" || tag === "input") return;

    if (["1", "2", "3", "4"].includes(e.key)) goToStep(Number(e.key));
    else if (e.key === "ArrowRight") goToStep(state.currentStep + 1);
    else if (e.key === "ArrowLeft") goToStep(state.currentStep - 1);
    else if (e.key.toLowerCase() === "g") toggleGesamtbild();
    else if (e.key === "Escape" && state.gesamtbildOpen) toggleGesamtbild(false);
  });
}

function runWaschprogramm(program) {
  const btn = Array.from(el.washButtons).find((b) => b.dataset.program === program);
  btn.classList.add("running");
  btn.disabled = true;

  setTimeout(() => {
    const finalText = currentFinalText();
    const isoFlat = [...ISO25010, ...ISO27001];
    const coveredKeys = new Set(checkCoverage(finalText, isoFlat).filter((c) => c.covered).map((c) => c.key));
    const hasSequence = hasAny(finalText.toLowerCase(), SEQUENCE_WORDS);
    const hasRisk = hasAny(finalText.toLowerCase(), RISK_WORDS);

    const program_def = WASCHPROGRAMME[program];
    program_def.additions.forEach((add) => {
      const alreadyAdded = state.washAdditions.some((a) => a.text === add.text);
      if (alreadyAdded) return;
      if (add.targets.includes("risk") && hasRisk) return;
      if (add.targets.includes("pfad") && hasSequence) return;
      if (add.std !== "extra") {
        const stillMissing = add.targets.some((t) => !coveredKeys.has(t));
        if (!stillMissing) return;
      }
      state.washAdditions.push({ text: add.text, program });
    });

    state.washRun[program] = true;
    btn.classList.remove("running");
    btn.disabled = false;
    renderWashStation();
  }, 1100);
}

/* ---------------------------------------------------------------------
 * 12. Init
 * ------------------------------------------------------------------- */

function init() {
  cacheEls();
  wireEvents();
  updateAtmosphere(0);
  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
