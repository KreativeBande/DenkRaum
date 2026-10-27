# Audit-Protokoll — Zeit- und Konfliktkompendium

Tool: `tools/zeit-konflikt-kompendium.html`
Geprüft nach: Qualitätskriterien-Checkliste (Siegel-Prüfung) **v2.1** (Notion-Seite `391d6937-ee08-8183-9966-fd0e2e963de9`, am 27.10.2026 frisch abgerufen), K1–K22 und Z1–Z9 (das Tool hat Übungen).
Datum: 27.10.2026
Anlass: Erstaudit nach Merge von PR #217 (Tool war im Register ohne Siegel-Stand und in Notion auf „Offene Punkte“).
Prüfmethode: statische Analyse (grep, Python-Skripte) plus dynamische Prüfung mit Playwright/Chromium (headless) bei 1300, 1440, 900, 390 und 375 px; Websuche für versionierte Quellen.

**Ergebnis: ⭐ Zertifiziert mit Auszeichnung** (nach den unten aufgeführten Korrekturen).

---

## Änderungen in diesem Audit-Zyklus

- **K17:** Der Earned-Value-Verweis zeigte auf den *Practice Standard for Earned Value Management* (2. Aufl. 2011). Aktueller PMI-Standard ist *The Standard for Earned Value Management*, ANSI/PMI 19-006-2019. Er aktualisiert und erweitert den Practice Standard. Methodenkarte 8 und die Quellenliste sind umgestellt, das Normen-Register hat einen Zusatz.
- **K17/K8:** Im Normen-Register steht beim Mediationsgesetz jetzt die Fassung (21.07.2012, BGBl. I S. 1577, zuletzt geändert durch Art. 135 V. v. 31.08.2015, BGBl. I S. 1474) mit den einschlägigen Paragrafen (§ 1, § 2, § 4).
- **K19:** Der Systemprompt hat jetzt die Abschnitte DESIGN (Farbwerte, Radien, Topbar), PERSONA-BEZUG und NICHT TUN (DE und EN).
- **Handbuch:** Konstruktionslogik nach PromptSchule ergänzt: RISEN, die fünf Dimensionen als Tabelle, zentraler Lernhinweis, Nachbau-Tipp.
- **K13:** Das Vortrags-Skript hat jetzt pro Schritt einen Übergangssatz, einen neuen Schritt 6 „Fallübung“ und am Ende Regie-Hinweise.
- **K16:** `Sprecher-Skript_Zeit-Konflikt-Kompendium.md` an die Footer-Box angeglichen.
- **Z9:** In der Teilnehmendenansicht war die Rückmeldung im Entscheidungs-Training ausgeblendet (`html.teiln .fb{display:none}`). Die Regel ist entfernt: Feedback, richtige Antwort und Erklärung erscheinen jetzt auch dort nach der Auswahl. Die Trainer-Elemente (Systemprompt, Vortrags-Skript, „Alle auflösen“, Lösungen der Gruppenfragen) bleiben ausgeblendet.
- **Z6:** Abkürzungen ausgeschrieben: WIP (Work in Progress), RACI (Responsible, Accountable, Consulted, Informed), DSDM (Dynamic Systems Development Method), PERT (Program Evaluation and Review Technique), GFK (Gewaltfreie Kommunikation). Gilt für beide Sprachen.
- **Quellenhinweis** (Abschnitt „Originalwerke“) auf den Prüfstand vom 27.10.2026 umgeschrieben.
- **K14:** Audit-Status-Zeile in `.footer-sig` ergänzt. Register-Eintrag auf „Auditiert & zertifiziert“, Register-Version `2026-10-27-2`.

---

## A. Technische Muss-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K1 Offlinefähigkeit | ✅ | `grep "fetch(\|XMLHttpRequest\|<script src\|<link \|@import"`: 0 Treffer; Playwright: 0 Requests außer `file:` |
| K2 Storage | ✅ | Einzige Storage-Stelle ist die Hilfsfunktion `ss()`, durchgehend in `try/catch` |
| K3 Touch | ✅ | `grep "draggable=\|dragstart\|dragover"`: 0 Treffer; Ereignisse über die Hilfsfunktion `on()` (pointerup/Tastatur) |
| K4 Weißer Hintergrund | ✅ | `body` `#FFFFFF`; `<meta name="color-scheme" content="light">`, `:root`/`html{color-scheme:light}`; kein `prefers-color-scheme`-Override |
| K5 Beamer-Lesbarkeit | ✅ | Gerenderte Schriftgrößen aller sichtbaren Textknoten (inkl. SVG, skaliert über `getScreenCTM`): kleinster Wert 14 px (Sekundärtext), Fließtext 17 px, 0 Knoten unter 14 px. Kontrast-Scan aller Textelemente gegen ihren Hintergrund: 0 Paare unter 4,5:1 |
| K6 Kein Sliding-Panel | ✅ | Einspaltige Seite, keine Slide-Transitionen; Lösungen und Details per Klick sofort sichtbar |
| K7 UTF-8 | ✅ | `grep '\\u00'`: 0 Treffer; Umlaute und typografische Zeichen im Screenshot korrekt |
| K15 Footer erreichbar | ✅ | `html{overflow-y:auto}`, `body{overflow-y:auto}`; bei 1300 px bis ans Ende gescrollt: Footer-Unterkante 842 px bei 900 px Viewport |
| K18 Beamer vierstufig | ✅ | Klassen nach Klick 1–4: `beamer` / `beamer beamer-xl` / `beamer beamer-xl beamer-xxl` / leer; Fließtext 22/28/34 px, h2 44/54/64 px, Sekundärtext 15/18/21 px; `--ink-dim` ab Stufe 1 `#3D4A5C`; Footer ab Stufe 1 `display:none`; Label zeigt jeweils die nächste Stufe |
| K19 Master-Bau-Prompt | ✅ | Systemprompt enthält ROLLE, AUFGABE, STRUKTUR, Kartenaufbau, QUALITÄTSREGELN, DESIGN, PERSONA-BEZUG, NICHT TUN (nach Ergänzung), DE und EN |
| K20 Sprach-Toggle | ✅ | Umschaltung ohne Reload; im englischen Modus mit allen Footer-Boxen offen: 6 Textknoten mit deutschem Muster, alle Eigennamen oder URLs (Michaela Kühn, Störfall-Labor, getabstract.com/de/…) |
| K21 Signatur fixiert | ✅ | Bei 1440, 900 und 375 px in allen vier Beamer-Stufen nach Scroll: `position:fixed`, oben rechts (14/28 px, mobil 8/12 px), `elementFromPoint` trifft die Signatur (nicht überdeckt); kein `position:static` |
| K22 Vertiefungs-Toggle | ✅ | 21 Paare `depth-short`/`depth-full`; Start: 21 kurz sichtbar, 0 ausführlich; nach Umschalten 0/21; Zustand übersteht Reload (sessionStorage); Beamer Stufe 1 erzwingt Kurzfassung, nach Stufe 4 → Normal kehrt „Ausführlich“ zurück |

## B. Inhaltliche Muss-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K8 Keine generischen Werte | ✅ | Alle Zahlen sind konkret und als Beispielwert gekennzeichnet. Rechnungen nachgerechnet: Little’s Law 12 WIP ÷ 3 pro Woche = 4 Wochen; SPI 80/100 = 0,8; CPI 80/90 ≈ 0,89; PERT (O + 4M + P)/6. Fever-Chart-Ampel ist im Tool ausdrücklich als vereinfachte Regel gekennzeichnet |
| K9 Szenariotreue | ✅ | Keine Personas und keine Fallwelt (bewusst firmenneutral); Szenen nennen nur Rollen (Projektleitung, Teammitglied, Sponsor, Vertrieb); keine Widersprüche zwischen Szenen, Training und Fallübung gefunden |
| K10 Problem/Lösung | ✅ n/a | Das Tool enthält keine als Anforderung gekennzeichneten Items |
| K17 Aktualität | ✅ | Mediationsgesetz: Fassung vom 21.07.2012, zuletzt geändert 31.08.2015, per Websuche keine spätere Änderung (gesetze-im-internet.de, buzer.de). EVM: auf ANSI/PMI 19-006-2019 umgestellt (pmi.org-Shop, webstore.ansi.org). Übrige Verweise sind Fachliteratur ohne Versionsstand; Urheber und Jahreszahlen fachlich geprüft (Glasl, Thomas-Kilmann, Karpman 1968, Schulz von Thun, Fisher/Ury, Rosenberg, Rogers/Farson 1957, Gordon, Moore, Goldratt 1997, Little 1961, Malcolm u. a. 1959, Flyvbjerg 2006, Klein 2007, Reinertsen 2009) |

Grenze der Prüfung: Die Hosts gesetze-im-internet.de und pmi.org ließen sich aus der Prüfumgebung nicht direkt abrufen; die Angaben stammen aus der Websuche. Den Eintrag zur Responsibility Assignment Matrix im PMI-Lexikon (Methode 20) konnte ich nicht öffnen. Das Tool sagt das offen, und die Aussage zu RACI (vier Rollen, eine verantwortliche Person je Entscheidung) stimmt mit den Sekundärquellen überein.

## C. Kann-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K11 Design-System | ✅ | Keine Persona-Farben im Tool. Struktur-Tokens laut CLAUDE.md eingehalten: Karten 16 px Radius mit Schatten `rgba(27,36,48,.03)`, Optionen 12 px, Meta-Controls und Chips als Pill. Der übergreifende Hex-Abgleich bleibt laut Checkliste offen (keine Referenzdatei) |
| K12 Validierungsnachweis | ✅ | Dieses Protokoll mit den Playwright-Ergebnissen, jünger als die letzte inhaltliche Änderung |
| K13 Vortrags-Skript | ✅ | Sieben Schritte entlang der Tool-Abschnitte, jeweils Klick-Hinweis, Sprechtext und Übergang; zwei Moderationsleitfäden (90 min, 4 h); Regie-Hinweise; keine Framework-Logik und kein Prompt-Wortlaut |
| K14 Audit-Zeile | ✅ | `.footer-sig`: „Zuletzt geprüft: 27.10.2026 · Status: ⭐ Zertifiziert mit Auszeichnung · Details siehe Audit-Protokoll“ |
| K16 Companion-Datei | ✅ | `tools/Sprecher-Skript_Zeit-Konflikt-Kompendium.md` aus der Footer-Box neu erzeugt, gleiche Gliederung (7 Schritte, 2 Leitfäden, Regie-Hinweise) |

## E. Übungs-, Layout- und Grafikstandards

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| Z1 Einzelfrage-Stepper (Muss) | ✅ | 6 Fragen, genau 1 sichtbar; Zurück/Weiter (`#prevBtn`/`#nextBtn`), Zähler „Frage n von 6“; nach Auswahl bleibt dieselbe Frage stehen |
| Z2 Lösung nach Auswahl (Muss) | ✅ | Für alle 6 Fragen geprüft (sichtbar per `getComputedStyle`): Feedback ✔/≈/✘, „Richtige Antwort“, „Ebenfalls vertretbar“ und „Erklärung“; auch in der Teilnehmendenansicht |
| Z3 Antwortposition (Muss) | ✅ | Position der richtigen Antwort: 2, 2, 3, 2, 3, 1; feste Reihenfolge, keine Verweise auf Positionen |
| Z4 Einspaltig (Muss) | ✅ | Einspaltig, main max. 1200 px; `scrollWidth = clientWidth` bei 1300, 1440, 900, 390 und 375 px (auch mit allen Footer-Boxen offen) |
| Z5 Keine Zeitagenda (Kann) | ✅ | 0 Uhrzeiten im Hauptinhalt; die Leitfäden stehen nur im Vortrags-Skript |
| Z6 Abkürzungen (Kann) | ✅ | Nach Ergänzung je Abschnitt und Sprache ausgeschrieben (WIP, RACI, DSDM, PERT, GFK, WSJF, TKI, EV/PV/AC/SPI/CPI); Glossar am Ende; Quellen verlinkt. PMI und IPMA gelten als Organisationsnamen |
| Z7 Grafiken (Kann) | ✅ | Inline-SVG je Methode, offline, DE/EN-Beschriftung, keine doppelten IDs (auch keine Marker-IDs), gerenderte Beschriftung ≥ 14 px |
| Z8 Glyph-Check (Muss) | ✅ | Verwendete Sonderzeichen ← ☀ ↑ ✔ ≈ ✘; im Screenshot korrekt dargestellt, jeweils mit Text daneben |
| Z9 Teilnehmenden-Version (Kann) | ✅ | Umschalter „Teilnehmendenansicht“: Systemprompt, Vortrags-Skript, „Alle auflösen“ und Lösungen der Gruppenfragen ausgeblendet; die Lösung nach Auswahl im Training bleibt (nach Korrektur). Beide Ansichten getestet |

## D. ISO/IEC 25010:2023-Mapping (informativ)

| Merkmal | K-Nachweise | Zusatzbefund | Einschätzung |
|---|---|---|---|
| Functional Suitability | K8, K9, K10 | — | ✅ unauffällig |
| Performance Efficiency | — | Eine Datei mit rund 312 KB, keine externen Ressourcen, lädt lokal sofort | ✅ unauffällig |
| Compatibility | K1 | — | ✅ unauffällig |
| Interaction Capability | K3, K4, K5, K6 | Touch-Ziele mindestens 44 px | ✅ unauffällig |
| Reliability | K1, K2 | 0 Konsolenfehler in allen Läufen | ✅ unauffällig |
| Security | — | Verarbeitet keine personenbezogenen Daten; Notizen bleiben im sessionStorage des Browsers | ✅ n/a |
| Maintainability | K7, K11 | Single-File; Texte zweisprachig über `data-en`, UI-Texte in einem Objekt je Sprache | ✅ unauffällig |
| Flexibility | K1 | — | ✅ unauffällig |
| Safety | — | „Zurücksetzen“ löscht Notizen und Fall-Eingaben ohne Rückfrage, Folgen auf die Sitzung begrenzt | ⚠️ Beobachtung (keine Siegelwirkung) |

## Siegel

Alle Muss-Kriterien (K1–K10, K15, K17–K22, Z1–Z4, Z8) bestanden, alle Kann-Kriterien (K11–K14, K16, Z5–Z7, Z9) bestanden → **⭐ Zertifiziert mit Auszeichnung**.

Hinweis: Die Arbeitskopie `.claude/skills/tool-review/references/qualitaetskriterien-checkliste.md` und CLAUDE.md stehen noch auf v1.9 (K1–K21). Für dieses Audit gilt die Notion-Fassung v2.1.
