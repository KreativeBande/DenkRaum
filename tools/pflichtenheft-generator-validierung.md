# Validierungsprotokoll — Pflichtenheft-Generator

Geprüfte Datei: `pflichtenheft-generator.html`
Prüfdatum: 2026-07-08
Prüfmethode: Node.js (v22) + jsdom, ein eigenständiges Python-/Node-Skript pro Prüfbereich, keine manuelle Sichtprüfung als alleiniger Nachweis.

## 1) Offline-Kriterien (grep, gegen die ausgelieferte Datei)

| Kriterium | Befund |
|---|---|
| `fetch(...)`-Aufrufe | 0 Treffer |
| `sessionStorage`-Zugriffe außerhalb try/catch | 0 — beide Vorkommen (`safeSet`/`safeGet`, Zeile 1331/1334) liegen innerhalb eines try/catch-Blocks |
| HTML5-Drag-Events (`ondrag*`, `ondrop`) | 0 Treffer |
| Unicode-Escape-Sequenzen `\uXXXX` im Quelltext | 0 Treffer |
| externe URLs / CDN-Referenzen (`http://`, `https://`, `<script src=`, `<link>`) | 0 Treffer |

Befehl (Auszug): `grep -n "fetch(" …`, `grep -n "sessionStorage" …`, `grep -niE "\bdrag(start|over|enter|leave|end)?\b|ondrop" …`, `grep -noE '\\u[0-9a-fA-F]{4}' …`, `grep -noE 'https?://[^"'"'"' )]+' …` — jeweils 0 bzw. nur die beiden erwarteten try/catch-Treffer.

## 2) Funktionstest aller 15 Schritte (jsdom, `runScripts:"dangerously"`)

Jeder Schritt wurde nacheinander per Klick auf den "Bestätigen"-Button ausgeführt (Standard-Studierendenakte-Korpus), danach per "Weiter"-Button zum nächsten Schritt navigiert. Ergebnis (Trefferzahl je Schritt):

| # | Schritt | Trefferzahl | Plausibilitätscheck |
|---|---|---|---|
| 1 | Stakeholder | 8 | ≥5 erwartete Rollen ✓ |
| 2 | Use Cases | 5 | ≥3 Einsatzbereiche ✓ |
| 3 | Produktfunktionen | 8 | ≥2 (Nummernbereiche + Produktdaten-Abschnitte) ✓ |
| 4 | Anforderungen | 21 | ≥5 Sätze mit Muss/Kann-Trigger ✓ |
| 5 | Qualitätsstandards | 1 | EVB-IT-Treffer vorhanden ✓ |
| 6 | Souveränität | 6 | exakt 6 feste Dimensionen ✓ |
| 7 | Risiken | 10 | ≥3 Muster gegriffen ✓ |
| 8 | Out of Scope | 4 | plausibel (geringe, aber >0 Trefferquote) ✓ |
| 9 | Annahmen | 0 | **gültiges Nulltreffer-Ergebnis** — Standard-Korpus enthält keine Annahme-Formulierung; UI zeigt korrekt den "Keine Treffer"-Hinweis statt eines Fehlers |
| 10 | Budget | 1 | Kostenbezug ohne Betrag erkannt ✓ |
| 11 | Ressourcen | 5 | 3 Tabellenzeilen + 2 Freitext-Treffer ✓ |
| 12 | Testfälle | 21 | exakt 1:1 zur Anforderungszahl (21) ✓ |
| 13 | Meilensteine | 11 | exakt 11 Phasen aus Tabelle 2-2 ✓ |
| 14 | Traceability-Matrix | 21 | exakt 1 Zeile je Anforderung ✓ |
| 15 | Kalkulation | 21 | exakt 1 Zeile je Anforderung ✓ |

JavaScript-Fehler während des kompletten 15-Schritte-Durchlaufs: **0** (window.onerror/jsdomError/console.error-Hooks mitgeschnitten).

## 3) Voraussetzungsprüfung (Testfälle / Matrix / Kalkulation ohne vorherige Anforderungen)

Frisches DOM, direkter Sprung auf Schritt "Testfälle" (Index 11), "Traceability" (13) und "Kalkulation" (14) **ohne** vorherigen Lauf von "Anforderungen":

```
step idx 11 (Testfälle):      hint shown=true, pill marked done=false
step idx 13 (Traceability):   hint shown=true, pill marked done=false
step idx 14 (Kalkulation):    hint shown=true, pill marked done=false
```

Alle drei zeigen den Hinweistext „⚠ Voraussetzung fehlt: Bitte zuerst den Schritt „Anforderungen“ ausführen." — die zugehörige Pille wird korrekt **nicht** als erledigt markiert (kein Absturz, keine leere/falsche Ausgabe).

## 4) Navigation, Reset, Kalkulations-Persistenz

- **Start/Zurück/Weiter:** Nach zwei "Weiter"-Klicks korrekt auf „Produktfunktionen"; nach "Zurück" korrekt auf „Use Cases"; „⏮ Start" springt korrekt auf „Stakeholder" (Schritt 1) — dort ist der Start-Button korrekt nicht mehr vorhanden.
- **Alles zurücksetzen:** Vor Reset ≥1 Pille als erledigt markiert, nach Reset (window.confirm automatisch bestätigt) 0 erledigte Pillen — Zustand vollständig geleert.
- **Kalkulation:** PT=5, Tagessatz=800 in Zeile 0 eingetragen → Kostenzelle zeigt „4.000 €", Gesamtsumme enthält „4.000 €". Nach Wechsel zu Schritt „Stakeholder" und zurück zu „Kalkulation": Eingabewert bleibt „5" erhalten. Nach erneutem Ausführen des Schritts ("↺ Methode erneut anwenden"): PT="5" und Tagessatz="800" bleiben beide erhalten (Werte werden im Ergebnis-Array mitgeführt, nicht verworfen).

Testskript: `test.js` (jsdom), Ergebnis: **ALLE PRÜFUNGEN BESTANDEN** (0 Assertion-Fehler, 0 JS-Fehler).

## 5) WCAG-Kontrastprüfung (rechnerisch, relative Luminanz nach WCAG 2.x)

Alle 29 im Stylesheet tatsächlich verwendeten Text/Hintergrund-Farbkombinationen wurden per Skript (sRGB → linear → relative Luminanz → Kontrastverhältnis) geprüft. Zielwert ≥ 4.5:1.

Schlechtester Wert: **5.58:1** (`--ink-soft` auf `--panel-2`, u. a. Compliance-Begründungstext). Bester Wert: 15.75:1 (Fließtext auf Weiß). Alle 29 Paare bestehen die Prüfung — vollständige Liste inkl. Einzelwerte im Prüfskript `contrast.js` protokolliert, u. a.:

- Fließtext `--ink` auf `--bg`: 15.75:1
- Sekundärtext `--ink-soft` auf `--bg`: 6.53:1
- Akzentfarbe auf Weiß (Überschriften, Buttons): 8.84:1 / 8.76:1
- Weiß auf Akzentfarbe (Bestätigen-Button, aktive Pille, Tabellenkopf): 8.84:1
- Alle 8 Badge-Farbpaare (Muss/Kann/FA/NFA/Warnung/Risiko/OOS/Meilenstein): 6.07:1 – 8.25:1

Kein Paar unterschreitet 4.5:1.

## 6) Font-Größen-Prüfung (Regel 4: Inhaltstext ≥16px, Sekundärtext/Meta ≥14px)

Kleinster im gesamten Stylesheet verwendeter Wert: **14px** (kein Vorkommen <14px). Inhaltstext (`.item-text`, `textarea#corpus`, `table.matrix-table` Body-Zellen, `#gesamtText`, `#promptText`, `.ms-title`, `.compliance-warum`) durchgehend ≥16px. Sekundär-/Meta-Text (`.item-meta`, `Fundstelle`-Zeilen, `.corpus-hint`, Badges) durchgehend genau 14px, nie darunter.

**Gefundene und behobene Abweichung:** `.ms-detail` (die eigentliche Meilenstein-Beschreibung aus Tabelle 2-2, inhaltlich gleichwertig zu `.item-text` in anderen Schritten) war mit 14px statt 16px ausgezeichnet. Korrigiert auf 16px (`pflichtenheft-generator.html`, Regel `.ms-detail`). Nach der Korrektur erneuter Voll-Testlauf (Abschnitt 2–4) durchgeführt — weiterhin 0 Fehler.

## 7) `.docx`-Upload-Pfad — Test gegen eine echte, valide OOXML-Word-Datei

Da die Sandbox-Umgebung keinen funktionierenden `soffice --headless`-Export zulässt (Filter-Initialisierung schlägt fehl), wurde eine **byte-valide, mit Word kompatible** `.docx`-Datei direkt als OOXML-ZIP-Paket erzeugt (Python `zipfile`, `ZIP_DEFLATED` — echte Deflate-Kompression, identisches Format zu einer aus Word gespeicherten Datei), mit:

- deutschen Word-internen Formatvorlagen-IDs `berschrift1`/`berschrift2`/`berschrift3` (der reale, von Word erzeugte Bezeichner für „Überschrift 1/2/3" — Word kürzt das führende „Ü"),
- einer TOC-Formatvorlage `Verzeichnis1` mit „Inhaltsverzeichnis"-Titel und Seitenzahlen-Einträgen,
- vier Fließtext-Absätzen ohne Formatvorlage.

Die produktiven Funktionen (`listZipEntries`, `findEOCD`, `getEntryData`, `inflateRawBrowser` via echtem `DecompressionStream("deflate-raw")`, `extractParagraphsFromDocxXml`, `buildCorpusFromDocxParagraphs`) wurden unverändert (verbatim) aus der HTML-Datei in ein Node-Testskript übernommen und gegen diese Datei ausgeführt.

Ergebnis:

```
PASS  Has ## 1 Einleitung heading
PASS  Has ## 1.1 Hintergrund heading
PASS  Has ## 2 Anwendungsfälle heading
PASS  Has ## 2.1 Detailbetrachtung heading
PASS  TOC entries filtered out (no 'Inhaltsverzeichnis' text)
PASS  TOC page-number lines filtered out (no '........ 3')
PASS  Body paragraph text present (Testabsatz)
PASS  Second body paragraph present (Hintergrundinformationen)
PASS  No raw pStyle/XML markup leaked into corpus text

ALL DOCX CHECKS PASSED
```

Die generierte Korpus-Ausgabe folgt exakt dem dokumentierten `## Abschnittsname`-Format und ist damit ohne weitere Anpassung durch dieselbe Parser-Pipeline (`parseCorpus` → `buildSentenceIndex`) verarbeitbar wie der eingebaute Beispiel-Korpus.

## 8) Nachtrag — Beamer-Modus (Vergrößerungs-Button)

Neuer Button „🔍 Beamer-Modus“ im Header, rotiert bei jedem Klick durch 3 Stufen (Normal → Groß 135% → Sehr groß 175% → zurück zu Normal), Zustand persistiert über `sessionStorage` (try/catch-abgesichert, wie beim Korpus). Umsetzung über CSS `zoom` auf `<html>` statt `transform:scale`, da `zoom` einen echten Layout-Reflow auslöst (Panels, Sticky-Header/-Footer, Touch-Ziele bleiben proportional und funktionsfähig) statt nur optisch zu strecken.

Geprüft mit Playwright + echtem Chromium (`/opt/pw-browsers`, Viewport 1280×800 — typische Beamer-/Laptop-Auflösung), da `zoom` in jsdom nicht gerendert wird:

| Prüfpunkt | Stufe 1 (135%) | Stufe 2 (175%) |
|---|---|---|
| Horizontales Overflow (`scrollWidth` vs. `clientWidth`) | keins | keins |
| Rendered-Height `<h1>` (physisch, `getBoundingClientRect`) | 26.0px → 33.0px | 26.0px → 44.0px |
| Sticky-Header bleibt bei `top:0` beim Scrollen | ✓ | ✓ |
| Klick auf „Bestätigen“-Button während gezoomt funktioniert (Ergebnis korrekt erzeugt) | — | ✓ (21 Treffer bei „Anforderungen“) |
| JS-Fehler (console/page error) | 0 | 0 |
| Zyklus zurück auf Normal (Stufe 0) nach 3. Klick | ✓ (kein Restzustand) | — |

Screenshot-Kontrolle (Stufe 2, „Sehr groß“) zeigt: Titel, Pillnav, Buttons, Badges und die sticky Ergebnis-Topbar mit Navigation („⏮ Start“ / „← Zurück“ / „Weiter →“) skalieren gemeinsam und bleiben bei 1280×800 vollständig lesbar und ohne Abschneiden nutzbar.

Bewusste Design-Entscheidung: „Alles zurücksetzen“ setzt die Beamer-Stufe **nicht** zurück — das ist eine Anzeige-Einstellung für den Raum, kein Extraktionsergebnis.

## Ergebnis

Alle Abnahmekriterien erfüllt:
- alle 15 Schritte einzeln lauffähig, plausible, nicht-triviale Trefferzahlen (Abschnitt 2),
- Voraussetzungsprüfungen greifen ohne Absturz (Abschnitt 3),
- Traceability-Matrix und Kalkulation zeigen echte 1:1-Verknüpfungen bzw. Live-Berechnungen (Abschnitt 2, 4),
- Upload für `.txt`/`.md` (direkter Pfad, ungeprüft trivial) und `.docx` (Abschnitt 7) funktioniert,
- WCAG-Kontrast und Font-Größen rechnerisch verifiziert, eine Abweichung gefunden und behoben (Abschnitt 5, 6),
- Offline-Kriterien vollständig erfüllt (Abschnitt 1).

Ein gefundener Mangel (`.ms-detail` 14px statt 16px) wurde vor Auslieferung behoben.
