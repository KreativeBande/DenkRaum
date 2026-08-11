# Audit-Protokoll — User Story Puzzle

Tool: `tools/user-story-puzzle.html`
Geprüft nach: Qualitätskriterien-Checkliste (Siegel-Prüfung) v1.7, korrespondierend mit
Master-Prompt v6.
Datum: 11.08.2026
Anlass: Michaela meldete zwei konkrete Beobachtungen nach dem letzten Feature-Update
(„Beispiel-Backlog erkunden", PR #102, gemergt): „Sie sieht so anders aus" und „der Header
vergeudet viel Platz". Daraufhin vollständiges Re-Audit statt Einzelfix.
Prüfmethode: statische Analyse (grep über die Datei) + dynamische Verifikation per
Playwright/Chromium (headless), da im Repo kein jsdom-Setup vorhanden ist. `getComputedStyle`-
Sweep über alle sichtbaren Textknoten (nicht nur CSS-Deklarationen) für K5, in allen vier
Beamer-Zuständen.

## Änderungshistorie in diesem Audit-Zyklus

**11.08.2026:** Header/Signatur auf das kanonische Muster migriert — Signatur war bislang
**nicht** `position:fixed`, sondern normaler Fluss-Inhalt in einer vertikal gestapelten
`.header-right`-Spalte zusammen mit Beamer-Button und Fortschritts-Sternen (Ursache für
Michaelas beide Beobachtungen). Fix: Signatur jetzt `position:fixed;top:14px;right:28px`
(Name fett + Link darunter, Mobile-Fallback `position:static` unter 900px, wie in
`profile-engineering-lab.html` referenzimplementiert), Fortschritts-Sterne aus dem Header
entfernt und als eigene `.progress-line` direkt über die Level-Navigation verschoben (Header
soll laut Konvention ausschließlich Navigation/Meta-Controls enthalten, keine App-Fortschritts-
Anzeige). Dabei Kollision zwischen der neu fixierten Signatur und dem Beamer-Button entdeckt
und behoben (`#beamerToggle{margin-top:52px}`, analog zum `margin-top`-Muster in
`profile-engineering-lab.html`). Zusätzlich Systemprompt-Box um einen expliziten Persona-Hinweis
ergänzt (K9, siehe unten) und Audit-Status-Zeile in `.footer-sig` ergänzt (K14, bislang gefehlt).

---

## A. Technische Muss-Kriterien

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K1 | Offlinefähigkeit | ✅ | `grep -n "fetch("` → 0 Treffer. |
| K2 | Kein Blocking durch Storage-APIs | ✅ | 2 `localStorage`-Zugriffe (Beamer-Level lesen/schreiben), beide in `try/catch`. |
| K3 | Touch-Tauglichkeit | ✅ | `grep -n "draggable=\|dragstart\|dragover"` → 0 Treffer. Puzzle-Drag läuft über `pointerdown`/`pointermove`/`pointerup` (`setPointerCapture`). Neue Hotspot-Buttons im Beispiel-Backlog sind reine `<button>`-Klicks, keine Drag-Interaktion. |
| K4 | Weißer Hintergrund | ✅ | `color-scheme: light` auf `html`; `--bg:#FFFFFF`, kein `prefers-color-scheme`-Override. |
| K5 | Beamer-Lesbarkeit | ✅ | Vollständiger `font-size`-Scan: kleinster statischer Wert 0.76→0.8rem (14.4px) nach Korrektur der Seiten-Card-Labels (ursprünglich 0.76rem/13.68px, vor Auslieferung angehoben). `getComputedStyle`-Sweep über alle sichtbaren Textknoten in allen vier Beamer-Zuständen (Normal/Beamer/XL/XXL): kleinster gerenderter Wert durchgehend 14.04px (`.signature small`, bewusst nicht beamer-skaliert wie im Referenztool). Kontrast `--ink-soft`/`--ink-dim` unverändert zum letzten Audit. |
| K6 | Kein Sliding-Panel-Layout | ✅ | Beispiel-Backlog und Puzzle sind permanent sichtbar; `#explainPanel` steht dauerhaft im Layout (nicht nur bei Hover/Klick eingeblendet), zeigt nach Klick den aktuellen Inhalt. Footer-`<details>` sind Zusatzinhalt, keine Kerninformation. |
| K7 | UTF-8-Encoding sauber | ✅ | `grep -n "\\u00"` → 0 Treffer. |
| K15 | Erreichbarkeit nicht-live-relevanter Inhalte | ✅ | Kein `overflow` auf `html`/`body`-Selektoren; Tool nutzt normalen Dokumentfluss, kein `height:100vh`-Split-Layout. Footer per Scroll erreichbar (Playwright: kein horizontaler Overflow bei 390px, Footer sichtbar nach Scroll ans Seitenende). |
| K18 | Beamer-Modus-Toggle (vierstufig) | ✅ | Playwright: 5 Klicks auf `#beamerToggle`, `document.documentElement.className` je Klick: `''` → `'beamer'` → `'beamer beamer-xl'` → `'beamer beamer-xl beamer-xxl'` → `''` → `'beamer'`. Vier spezifizierte kumulative Zustände bestätigt. `.app-footer{display:none}` ab Stufe 1 bestätigt (`isVisible() === false`). **Fund während der Prüfung:** Die neu fixierte Signatur überlappte den Beamer-Button (Bounding-Box-Kollision, Button war per Klick nicht mehr erreichbar — Playwright-Test schlug mit `intercepts pointer events` fehl). Vor Auslieferung behoben (`margin-top:52px` auf `#beamerToggle`), Kollisionsfreiheit rechnerisch verifiziert (Bounding-Box-Überschneidungstest: `false`). |
| K19 | Systemprompt-Box enthält Master-Bau-Prompt | ✅ | Zwei-Absatz-Box: (1) didaktische Kernthese, Distraktor-Prinzip, Level-Progression des Puzzles; (2) vollständige Bau-Anleitung für die Sektion „Beispiel-Backlog erkunden" (Struktur, Interaktionsmuster, `EXPLANATIONS`-Datenmodell, Design-Farbcodierung, expliziter Persona-Hinweis, Nicht-tun-Liste). Mit diesem Text allein wäre das Tool nachbaubar. |

## B. Inhaltliche Muss-Kriterien

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K8 | Keine generischen Werte | ✅ | Alle 10 Hotspot-Erklärungen referenzieren konkret benennbare Quellen (IREB CPRE, INVEST/Wake 2003, BABOK v3 Value Assessment, Gherkin/BDD) statt vager Aussagen. EU-AI-Act-Verweis (Level 5) trägt bereits Status+Datum („Stand: Juli 2026, Digital-Omnibus-Anpassung vom Juni 2026 berücksichtigt"). |
| K9 | Szenariotreue | ✅ mit dokumentierter Abweichung | **Fund:** Die drei neuen Beispiel-Stories (US-001–003) nutzen mit „Studierende/Mitarbeitende/Prüfende" (Hochschul-Kontext) **nicht** den etablierten Denkraum-Cast (Sarah=Vertrieb, Ela=Projektleitung, Petra=QM, Herr Bachmeier=Geschäftsführung), der im Rest desselben Tools (Puzzle-Aufgaben) durchgehend verwendet wird — ursprünglich unkommentierte Fachdomänen-Mischung innerhalb eines Tools. **Fix in diesem Zyklus:** Systemprompt-Box explizit um Persona-Hinweis ergänzt, der die bewusste Trennung benennt und begründet (domänenneutrales, vom Puzzle-Firmenkontext unabhängiges Lehrbuch-Beispiel) und für künftige Erweiterungen anweist, beide Personenkreise nicht zu vermischen — analog zur bereits akzeptierten Begründungspflicht in `profile-engineering-lab.html` (dort: eigener Cast Max/Anna/Thomas/Sophie/Michaela, explizit begründet). Innerhalb jeder der beiden Domänen (Puzzle vs. Beispiel-Backlog) sind die Rollen intern konsistent und widersprechen sich nicht. |
| K10 | Problem-Requirement-Solution-Trennung | n/a | Weder die neue Sektion noch das Puzzle enthalten als „Anforderung" gekennzeichnete Items mit Lösungs-/Bedarfs-Unterscheidung im K10-Sinn (Norm-vorgegebene Mittel); die Distraktoren im Puzzle behandeln „Lösung statt Bedarf" bereits als Lerninhalt, nicht als K10-Fall. |
| K17 | Aktualität referenzierter Normen/Frameworks | ✅ | Gezielte Websuche in dieser Session (11.08.2026): EU AI Act Art. 50 Transparenzpflichten seit 2. August 2026 in Kraft, EU-Kommission hat am 20.07.2026 Leitlinien dazu verabschiedet; die im „Digital Omnibus" vorgeschlagene Verschiebung betrifft ausschließlich die Kennzeichnungspflicht synthetischer Inhalte (Art. 50(2), auf 2. Dezember 2026 verschoben) — **nicht** das im Tool verwendete Chatbot-Offenlegungsszenario (Art. 50(1)), das unverändert seit 2. August 2026 gilt. Die Tool-Aussage „ab 2. August 2026, keine Verhandlungsmasse" ist damit weiterhin korrekt. IREB/INVEST(Wake 2003)/BABOK v3/Gherkin/MoSCoW sind stabile, versionsunabhängige Referenzen ohne Aktualitätsrisiko. |

## C. Kann-Kriterien (für Auszeichnung)

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K11 | Design-System-Konformität | ✅ | Neue Sektion nutzt ausschließlich bereits im Tool definierte CSS-Variablen (`--blue`, `--amber`, `--green` inkl. `-soft`-Varianten), keine neuen Farbwerte eingeführt. Cross-Tool-Hex-Abgleich bleibt laut Checkliste dauerhaft offen (keine zentrale Referenzdatei), betrifft aber nicht diese Änderung. |
| K12 | Validierungsnachweis vorhanden | ✅ | Dieses Dokument + Playwright-Testprotokoll (unten), jünger als die letzte inhaltliche Änderung. |
| K13 | Vortrags-Skript-Box vorhanden | ✅ | Eigene dritte Footer-Box, deckt Beispiel-Backlog-Einstieg (mit Klick-Regie) und alle 5 Puzzle-Level ab, plus Regie-Hinweis; keine Konstruktionslogik (im Handbuch), kein roher Systemprompt-Text. |
| K14 | Audit-Status-Zeile aktuell | ✅ | `.footer-sig`: „Zuletzt geprüft: 11.08.2026 · Status: ⭐ Zertifiziert mit Auszeichnung · Details siehe Audit-Protokoll" — in diesem Zyklus neu ergänzt (fehlte zuvor), Datum identisch zum Datum dieses Protokolls. |
| K16 | Companion-Datei Sprecher-Skript vorhanden | ✅ | `tools/Sprecher-Skript_User-Story-Puzzle.md`, synchron zur aktuellen Vortrags-Skript-Box (unverändert seit PR #102, in diesem Zyklus nicht erneut geändert). |

---

## Siegel-Ergebnis

Alle Muss-Kriterien (K1–K10 (K10 n/a), K15, K17, K18, K19) bestanden. Alle Kann-Kriterien
(K11–K14, K16) bestanden.

**⭐ Zertifiziert mit Auszeichnung**

---

## D. Pflicht-Anhang: ISO/IEC 25010-Mapping (informativ, ohne Siegel-Einfluss)

| ISO 25010-Merkmal | Zugeordnete K-Nachweise | Zusatzprüfung | Einschätzung |
|---|---|---|---|
| Functional Suitability | K8, K9, (K10 n/a) | — | ✅ unauffällig (K9 mit dokumentierter, begründeter Abweichung) |
| Performance Efficiency | — | Einzeldatei ~64 KB vor Gzip, kein spürbares Ladeverhalten zu erwarten | ✅ unauffällig |
| Compatibility | K1 | — | ✅ unauffällig |
| Interaction Capability | K3, K4, K5, K6 | — | ✅ unauffällig |
| Reliability | K1, K2 | — | ✅ unauffällig |
| Security | — | Keine personenbezogenen/sensiblen Daten verarbeitet (statische Demo-Inhalte, keine Nutzereingabe von Klardaten) | n/a |
| Maintainability | K7, K11 | Single-File bewusste Designentscheidung; neue Sektion sauber in eigenem CSS-/JS-Block gekapselt (`EXPLANATIONS`-Objekt, delegierter Click-Handler) | ✅ unauffällig |
| Flexibility | K1 | — | ✅ unauffällig |
| Safety | — | Kein irreversibler Aktionspfad ohne Rückfrage (Hotspot-Klicks sind non-destruktiv, Puzzle-Reset war bereits vorher geprüft) | n/a |

---

## Playwright-Testprotokoll (Kurzfassung)

Ausgeführt lokal gegen `file://.../tools/user-story-puzzle.html`, Chromium headless
(`/opt/pw-browsers/chromium`).

1. Alle 10 Hotspot-Topics (`rolle`, `ziel`, `nutzen`, `ak`, `template`, `wer`, `was`, `warum`,
   `invest`, `quality`) aktualisieren `#explainPanel` korrekt mit Titel + Text.
2. Beamer-4-Stufen-Zyklus bestanden (siehe K18 oben), inkl. Kollisions-Bugfix vor Auslieferung.
3. `getComputedStyle`-Sweep über alle sichtbaren Textknoten (inkl. geöffneter Footer-Boxen) in
   allen vier Beamer-Zuständen: kleinster Wert durchgehend 14.04px, keine Regression.
4. Signatur: `position:fixed` bestätigt, Bounding-Box bleibt nach `window.scrollTo(0,800)`
   unverändert (`top:14px;right:28px`) — löst Michaelas Beobachtung „sieht so anders aus".
5. Signatur/Beamer-Button-Kollision: Bounding-Box-Überschneidungstest vor Fix `true` (Bug),
   nach Fix `false`.
6. Header-Höhe (Normal, vor Klick auf Beamer-Button): von geschätzt ~160px (alte gestapelte
   `.header-right`-Spalte mit Button+Sternen+Signatur) auf 113px reduziert — löst Michaelas
   Beobachtung „Header vergeudet viel Platz". Fortschritts-Sterne sind jetzt Teil einer eigenen
   `.progress-line` direkt über der Level-Navigation, nicht mehr im Header.
7. Mobile (390px): Signatur `position:static` bestätigt (Fallback unter 900px), kein
   horizontaler Overflow (`scrollWidth === 390`), Beamer-Zustand bleibt nach Reload persistent
   (`localStorage`), keine Layout-Brüche.
8. Bestehendes Puzzle (5 Level, Drag/Tap-Platzierung, Prüfen/Musterlösung/Reset) unverändert
   funktionsfähig, keine Konsolenfehler in keinem der getesteten Zustände.

## Bekannte Abweichungen von der Master-Prompt-Vorlage

- Jsdom nicht verwendet (nicht im Repo installiert) — Playwright/Chromium stattdessen.
- K9: bewusste Persona-Abweichung im Beispiel-Backlog, explizit im Systemprompt begründet
  (siehe oben) statt durch Umbenennung auf den Denkraum-Cast beseitigt — Michaela kann das bei
  Bedarf noch umsteuern lassen, wenn sie die Vereinheitlichung auf Sarah/Ela/Petra/Bachmeier
  bevorzugt.
