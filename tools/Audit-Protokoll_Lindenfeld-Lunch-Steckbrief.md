# Audit-Protokoll — Fallwelt-Steckbrief Lindenfeld Lunch

Tool: `tools/lindenfeld-lunch-steckbrief.html`
Geprüft nach: Qualitätskriterien-Checkliste (Siegel-Prüfung) v1.9 (Arbeitskopie im Repo), K1–K21; K22 entfällt (kein Kompendium/Lernreise); Z1–Z9 entfallen (keine Übungen).
Datum: 17.10.2026
Anlass: Erstaudit nach Merge von PR #185 (Seite stand bis dahin im Register auf „Offene Punkte“, K17 offen).
Prüfmethode: statische Analyse (grep, Python-Skripte) plus dynamische Verifikation per Playwright/Chromium (headless) bei 1300, 1440, 900 und 375 px; Websuche bzw. Seitenabruf für jede genannte Norm.

## Nachprüfung 22.10.2026 (Änderung: Geschäftsziel GZ-4)

Anlass: Der Fall bekam das Ziel GZ-4 (Mittagsgäste von 640 auf 900 pro Tag binnen 12 Monaten); Business Case, Break-even und Lastwerte wurden neu gerechnet, der Steckbrief entsprechend angepasst (Fakten, Szenarienvergleich, Systemprompt, Vortrags-Skript samt Companion-Datei).

- K8: Zahlen gegen eine unabhängige Neuberechnung geprüft (Gästepfad 770, dann 900; Abfall- und Zeitnutzen folgen dem Pfad; Betriebskosten fix). Option A: Kapitalwert −17.454 / 546.096 / 1.391.421 EUR, Break-even 0,3 %; B: 3,1 %; C: 5,1 %. Dieselbe Rechnung reproduziert bei 640 Gästen die bisherigen Werte exakt (−134.732 / 273.449 / 885.722, 3,3 %).
- K1/K20/K21 per Playwright (1300 und 390 px): keine Seitenfehler, keine externen Requests, kein seitliches Scrollen, DE/EN umschaltbar, 0 deutsche Restwörter im englischen Modus.
- K16: `Sprecher-Skript_Lindenfeld-Lunch-Steckbrief.md` an die geänderte Footer-Box angeglichen.
- K14: Audit-Zeile und Register auf 22.10.2026 gesetzt.
- Nicht erneut geprüft wurden K17 (Normen unverändert, Stand 17.10.2026) und die übrigen Muss-Kriterien ohne Bezug zur Änderung; sie gelten aus dem Audit vom 17.10.2026.

Ergebnis unverändert: ✅ Zertifiziert.

---

## Änderungen in diesem Audit-Zyklus

- Normen-Register neu gefasst: Alle zehn Zeilen sind jetzt auf das beschränkt, was am 17.10.2026 per Abruf belegt wurde. Entfernt wurden Behauptungen, die sich nicht belegen ließen oder im Steckbrief gar nicht vorkommen (u. a. „14 Stoffe in Anhang II LMIV“, „DSGVO Art. 5, 6, 25, 30, 35 verwendet“).
- Audit-Status-Zeile (K14) in `.footer-sig` ergänzt, Prüfstatus-Spalte mit Datum und Grenzen der Prüfung.
- Register-Eintrag auf „Auditiert & zertifiziert“ gesetzt, Register-Version auf `2026-10-17-2`.

---

## A. Technische Muss-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K1 Offlinefähigkeit | ✅ | `grep "fetch("`: 0 Treffer; Playwright: 0 externe Requests (nur `file:`) |
| K2 Storage | ✅ | `grep "sessionStorage\|localStorage"`: 0 Treffer (kein Storage genutzt) |
| K3 Touch | ✅ | `grep "draggable=\|dragstart\|dragover"`: 0 Treffer; nur click-Events |
| K4 Weißer Hintergrund | ✅ | `body` computed `rgb(255, 255, 255)`; `<meta name="color-scheme" content="light">` Zeile 6, `html{color-scheme:light}` Zeile 18 |
| K5 Beamer-Lesbarkeit | ✅ | Vollscan `font-size`: kleinster Wert 14 px (11×, nur Sekundärtext), Fließtext 16 px; Kontraste: Akzent #1e6b52 auf Weiß 6,40:1; Grau #5a5f6e auf Weiß 6,37:1, auf #f4f5fa 5,85:1; Weiß auf Hero #1a2138 15,93:1 (alle ≥ 4,5:1) |
| K6 Kein Sliding-Panel | ✅ | Zwei Tabs mit sofortigem Wechsel, keine Slide-Transition; beide Tabs per Klick erreichbar |
| K7 UTF-8 | ✅ | `grep '\\u00'`: 0 Treffer; Umlaute und Anführungszeichen im Screenshot korrekt |
| K15 Erreichbarkeit | ✅ | `html`/`body` `overflow-y: visible`; nach Scroll ans Ende ist der Footer vollständig sichtbar (Dokumenthöhe 2279 px bei 1300 px Breite) |
| K18 Beamer-Toggle | ✅ | Klickfolge: `beamer` → `beamer beamer-xl` → `beamer beamer-xl beamer-xxl` → `` → `beamer`; Footer ab Stufe 1 `display:none`, in Normalstufe `block` |
| K19 Systemprompt | ✅ | Box enthält vollständigen Master-Bau-Prompt (Auslöser, Struktur, Faktenbasis, Design, Nicht-tun) |
| K20 Sprach-Toggle | ✅ | 175 `data-i18n`-Schlüssel, 174 im Wörterbuch; fehlend nur `sigName` (Name bleibt identisch, wie im Vantera-Steckbrief); nach Umschalten auf EN bei geöffneten Footer-Boxen und beiden Tabs: 0 deutsche Funktionswörter, Rückschalten stellt DE wieder her |
| K21 Signatur fest | ✅ | `position:fixed`, `top:14px`, `right:28px` bei 1440, 900 und 375 px, nach Scrollen und in allen vier Beamer-Stufen; kein `position:static` |

## B. Inhaltliche Muss-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K8 Keine generischen Werte | ✅ | Zahlenabgleich gegen die Berechnung des Falls (`data.py`): Wareneinsatz 633.600, Abfall 209.088, Planeinsparung 82.368, Stretch 114.048, Betriebskosten 540.000, Investition A/B/C, Betrieb A, Kapitalwerte A (−134.732 / 273.449 / 885.722), Break-even 3,3 / 6,7 / 10,1 % stimmen exakt. Betrieb und Kapitalwerte von B und C stehen nicht im Steckbrief (Absicht), daher kein Abgleich nötig. Weitere Zahlen (1.150 Mitarbeitende, 640 Gäste, 220 Tage, 65 Minuten, 21 Testfälle) stammen aus demselben Datenmodul. |
| K9 Szenariotreue | ✅ | Neun Stakeholder entsprechen der Besetzung des Falls (Rolle und Interesse wie in Station 0); keine erfundenen Zitate. Die festen Personas Ela, Knut, Sarah, Petra und Herr Bachmeier gehören zur Fallwelt Vantera und kommen hier bewusst nicht vor. |
| K10 Problem-Requirement-Solution | ✅ (n/a) | Der Steckbrief enthält keine als „Anforderung“ gekennzeichneten Einzelitems, nur Fakten und Ziele |
| K17 Aktualität der Normen | ✅ | Siehe Tabelle unten; jede Nennung am 17.10.2026 per Abruf geprüft, Grenzen der Prüfung im Tool in der Spalte „Prüfstatus“ ausgewiesen |

### K17 — Normen-Stichprobenprotokoll (17.10.2026)

| Norm / Quelle | Wert im Tool | Quelle (abgerufen) | Ergebnis |
|---|---|---|---|
| ISO/IEC 25010:2023 | Edition 2, November 2023, Stufe 60.60; Vorgänger 2011 zurückgezogen | https://www.iso.org/standard/78176.html | ✅ |
| IREB CPRE Foundation Level Lehrplan | Version 3.3.0 | https://cpre.ireb.org/en/downloads-and-resources/downloads | ✅ Version; Datum 03.07.2026 stammt aus der Prüfung vom 13.10.2026 (Seite nennt kein Datum), so im Tool ausgewiesen |
| BABOK Guide v3 (IIBA) | v3 mit Errata, keine neuere Fassung genannt | https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/ | ✅ (Seite sagt nicht ausdrücklich „current“, im Tool so ausgewiesen) |
| HM Treasury, Five Case Model | aktualisiert 30.06.2026 | https://www.gov.uk/government/publications/guidance-on-developing-business-cases | ✅ |
| Google re:Work, OKR | Skala 0,0–1,0, Sweet Spot 60–70 %, drei bis fünf Objectives | https://rework.withgoogle.com/en/guides/set-goals-with-okrs | ✅ |
| WCAG 2.2 | W3C-Empfehlung 12.12.2024, Vorgänger 2.1 | https://www.w3.org/TR/WCAG22/ | ✅ |
| DSGVO (EU) 2016/679 | Verordnung vom 27.04.2016, Inkrafttreten 24.05.2016; keine Artikel zitiert | https://eur-lex.europa.eu/eli/reg/2016/679/oj | ✅ Titel und Datum; Geltungsstatus nicht gesondert geprüft (so ausgewiesen) |
| BetrVG § 87 Abs. 1 Nr. 6 | Wortlaut zitiert | https://www.gesetze-im-internet.de/betrvg/__87.html | ✅ Wortlaut; Seite nennt keinen Stand |
| LMIV (EU) Nr. 1169/2011 | Verordnung vom 25.10.2011, Inkrafttreten 12.12.2011 | https://eur-lex.europa.eu/eli/reg/2011/1169/oj | ✅ Titel und Daten; Inhalt von Anhang II nicht abgerufen und im Tool nicht behauptet |
| PCI DSS v4.0.1 | veröffentlicht 11.06.2024, Ablösung v4.0 zum 31.12.2024 angekündigt | https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1 | ✅; Websuche ergab keine neuere Fassung |

Rechtsaussagen (DSGVO, BetrVG, WCAG, LMIV, PCI DSS) sind im Tool ausdrücklich als Fallaussagen gekennzeichnet; es wird keine Rechtsberatung gegeben und keine Einstufung nach EU AI Act behauptet.

## C. Kann-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K11 Design-System-Konformität | ⚠ offen | Dauerhaft offen, solange keine Referenzdatei mit Persona-Hexcodes vorliegt (wie bei den übrigen Tools); eigene Akzentfarbe Grün bewusst gewählt |
| K12 Validierungsnachweis | ✅ | Dieses Protokoll mit Playwright-Läufen vom 17.10.2026, jünger als die letzte inhaltliche Änderung |
| K13 Vortrags-Skript-Box | ✅ | Box vorhanden, deckt beide Tabs und die Gruppenfragen ab, mit Klick-Hinweisen und Regie |
| K14 Audit-Status-Zeile | ✅ | `.footer-sig`: „Zuletzt geprüft: 17.10.2026 · Status: ✅ Zertifiziert · Details siehe Audit-Protokoll“ |
| K16 Companion-Datei | ✅ | `tools/Sprecher-Skript_Lindenfeld-Lunch-Steckbrief.md`, Inhalt per Skript mit der Footer-Box verglichen: identisch |

## Siegel-Ergebnis

✅ **Zertifiziert.** Alle Muss-Kriterien (K1–K10, K15, K17–K21) bestanden. Kein Auszeichnungs-Siegel (⭐), da K11 offen bleibt.

---

## D. Pflicht-Anhang: ISO/IEC 25010-Mapping (informativ, ohne Siegel-Einfluss)

| ISO-25010-Merkmal | Zugeordnete Nachweise | Einschätzung |
|---|---|---|
| Functional Suitability | K8, K9, K10 | ✅ Zahlen stimmen mit der Fallberechnung überein |
| Performance Efficiency | Dateigröße rund 58 KB, kein externer Request | ✅ unauffällig |
| Compatibility | K1 | ✅ |
| Interaction Capability | K3, K4, K5, K6 | ✅ |
| Reliability | K1, K2 | ✅ |
| Security | Kurzcheck | n/a: keine personenbezogenen Daten verarbeitet, keine Eingabefelder |
| Maintainability | K7, K11 | ⚠ K11 offen; Single-File ist bewusste Designentscheidung. Hinweis: Das Wörterbuch (`i18n`) wurde aus einem Generator erzeugt, der nicht im Repo liegt; Änderungen erfolgen direkt in der Datei. |
| Flexibility | K1 | ✅ |
| Safety | Kurzcheck | n/a: keine irreversiblen Aktionen im Tool |

## Playwright-Testprotokoll (Kurzfassung)

- 1300 und 390 px: keine Seitenfehler, kein seitliches Scrollen (`scrollWidth` gleich `clientWidth`).
- Tabs, DE/EN-Umschaltung, vier Beamer-Stufen: wie oben belegt.
- Neun Personenkarten, zwei Tabs, Crosslink-Block mit sechs Einträgen vor dem Footer, fünf Footer-Boxen (Systemprompt, Handbuch, Vortrags-Skript, Normen-Register, Glossar).

## Bekannte Abweichungen

- Fünfte Footer-Box „Glossar“ ist optional (CLAUDE.md), Footer-Grid daher mit fünf Spalten.
- Crosslinks auf den Fall BA/RE-Case Lindenfeld Lunch und den Durchlauf-Fahrplan fehlen, weil beide noch nicht im Repo liegen.
