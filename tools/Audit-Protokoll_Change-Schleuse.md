# Audit-Protokoll: Change-Schleuse · Lindenfeld Lunch

Datum: 01.11.2026 · Datei: `tools/change-schleuse.html` · Checkliste v2.1 (K1–K22, Z1–Z9)

**Ergebnis: ✅ Zertifiziert** (Kann-Kriterien K11–K13 und Z6 nicht vollständig, daher kein ⭐)

Erstprüfung am selben Tag ergab ❌ (K5, K18, K22-Begründung, K17). Die Befunde sind in dieser Fassung behoben; die Tabelle zeigt den Stand nach der Korrektur.

## Muss-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K1 Offline | ✅ | kein `fetch(`, keine externen Skripte oder Stile; externe Links nur im Normen-Register |
| K2 Storage | ✅ | kein `localStorage`/`sessionStorage`; Historie nur als Markdown-Datei (Download/Einlesen) |
| K3 Drag and Drop | ✅ | kein `draggable`/`dragstart`/`dragover`; Board-Karten über Knöpfe verschoben |
| K4 color-scheme | ✅ | `color-scheme: light` (Meta und CSS), Hintergrund `#f6f4ef`, Karten weiß |
| K5 Schriftgrößen | ✅ (nach Fix) | vorher Kürzel-Knöpfe 12,96 px (0,9 em in 0,9 em). Alle 14 `font-size:.9em` auf `max(14px,.9em)`. Playwright, 12 Ansichten + Glossar, 1300 und 390 px: kleinste sichtbare Schrift 14 px. Kontrast `--dim` #4a5666 auf Weiß ca. 7:1 |
| K6 Kein Sliding-Panel | ✅ | Inhalte je Schritt offen; Info-Fenster zu Kürzeln nur ergänzend |
| K7 Unicode | ✅ | Umlaute, „“, ✔ ✘ ≈ ☀ → korrekt (Screenshot) |
| K8 Keine generischen Werte | ✅ | Zahlen aus dem Fall (BR-1 60 Minuten, GZ-1 bis GZ-4 …); CR-02 bis CR-06 und alle Werte in Schritt 10 als „Annahme“ markiert |
| K9 Szenariotreue | ✅ | acht Personen (Heike Brandl, Murat Kaplan, Nadine Koch, Gudrun Stahl, Tim Falkner, Ömer Yıldız, Lena Ostermann, Jonas Reiter) mit Rollen wie im Steckbrief |
| K10 Problem/Lösung | ✅ | Anforderungstexte aus Projektauftrag/Pflichtenheft übernommen; Schleuse ist Entscheidungsvorbereitung, keine Anforderung |
| K15 Overflow | ✅ | kein `overflow` auf `html`/`body`; Footer erreichbar |
| K17 Normen | ✅ (nach Fix) | 01.11.2026 online geprüft: IREB CPRE FL 3.3.0 (Übersetzungen ab 04/2026), ISO/IEC 25010:2023 (Ausgabe 2, aktuell, vorher „nicht neu geprüft“ und Link auf ISO-Startseite), ISO/IEC/IEEE 29148:2018 (aktuell, Überarbeitung als DIS 29148:2026 in Arbeit), PMBOK Guide 8 (PMI-Seite: 6 Prinzipien, 7 Leistungsbereiche), BABOK v3 (laut Tool am 31.10.2026 geprüft) |
| K18 Beamer | ✅ (nach Fix) | vierstufig, Label zeigt nächste Stufe, Footer ab Stufe 1 `display:none`. Fließtext vorher 20/24/28 px, jetzt 22/28/34 px; Schrittüberschrift vorher 29/35/41 px, jetzt 44/54/64 px; Sekundärtext ≥ 17,8/22,7/27,5 px. Seitliches Scrollen in XL/XXL (Metro-Leiste, H1) durch Silbentrennung behoben; 1300 und 390 px in allen Stufen ohne seitliches Scrollen |
| K19 Systemprompt | ✅ | vollständiger Bau-Prompt (Ablauf aller zwölf Ansichten, Daten, Schleusenlogik, Qualitätsstandards); „Nicht tun“-Liste ergänzt |
| K20 DE/EN | ✅ (Entscheidung) | Umschalter ohne Reload, Schritte, Glossar und alle vier Footer-Boxen umgeschaltet, keine deutschen Reste außer Namen und Fachbegriffen in Klammern. Inhalt der Schritte entsteht per JavaScript; ohne JS erscheint ein Hinweis. Michaela hat am 01.11.2026 entschieden, dass das für dieses Simulator-Tool genügt |
| K21 Signatur | ✅ | `position:fixed` oben rechts, Name fett und `www.michaela-kuehn.com`, kein `static`-Fallback; geprüft bei 1300 und 390 px und in allen Beamer-Stufen |
| K22 Vertiefung | n/a | Simulator; Begründung im Handbuch ergänzt („Warum es keinen Vertiefungs-Umschalter gibt“) |
| Z1 Einzelfrage-Stepper | ✅ | Bewertungs-Check und Schleuse: eine Frage je Ansicht, „Aussage 1 von 3“/„Frage x von n“, Zurück/Weiter, kein Auto-Weiter |
| Z2 Lösung nach Auswahl | ✅ | ✔/✘ mit richtiger Antwort und Erklärung; Schleuse ✔/≈ mit Fallsicht und Begründung; Sichtbarkeit per Bounding-Box geprüft (alle 6 Änderungen) |
| Z3 Antwortposition | ✅ | über alle 6 Änderungen: Bewertungs-Check Position 1/2/3 = 3/9/6, Schleuse 21/20/19; Reihenfolge fest (Rotation nach Frage und Änderung) |
| Z4 Einspaltig, kein seitliches Scrollen | ✅ | Navigation links, Inhalt einspaltig (max. 1200 px); `scrollWidth <= clientWidth` bei 1300 und 390 px |
| Z8 Glyphen | ✅ | Screenshot Schritt 3 |

## Kann-Kriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K11 Design-System | ❌ | Knöpfe 8 px Radius statt 12 px, Karten 10 px statt 16 px |
| K12 Validierungsnachweis | ✅ | dieses Protokoll (Playwright-Läufe vom 01.11.2026) und `tests/change-schleuse-anker.test.js` |
| K13 Vortrags-Skript | ❌ | fünf Stichpunkte für zwölf Schritte; wörtlicher Sprechtext, Übergangssätze und Regie-Hinweise fehlen |
| K14 Audit-Zeile | ✅ | „Zuletzt geprüft: 01.11.2026 · Status: ✅ Zertifiziert“ in `.footer-sig` |
| K16 Sprecher-Skript | ✅ | `tools/Sprecher-Skript_Change-Schleuse.md`, synchron zur Footer-Box |
| Z5 Keine Zeitagenda | ✅ | keine Uhrzeiten außer Falldaten (Lieferfenster 11:30 bis 13:30) |
| Z6 Abkürzungen | ≈ | Glossar und anklickbare Kürzel; CR wird nicht je Abschnitt ausgeschrieben |
| Z7 Grafiken | ✅ | Inline-SVG (Linienplan, Ablauf), Beschriftung ≥ 14 px, Marker-ID `ar1` einmalig |
| Z9 Teilnehmenden-Ansicht | ✅ | Schalter „Teilnehmende“ blendet Trainer-Knopf und Footer aus, Lösung bleibt sichtbar |

Nicht auf einem echten iPad-WebKit getestet (Chromium/Playwright).

## ISO/IEC 25010-Mapping (Abschnitt D)

| Merkmal | Bezug |
|---|---|
| Funktionale Eignung | Auswirkung deterministisch aus dem Verknüpfungsgraphen; Übungen mit Lösung (Z1–Z3) |
| Interaktionsfähigkeit | Schriftgrößen, Beamer-Stufen, Touch-Ziele ≥ 44 px, Sprachumschalter |
| Kompatibilität | Einzeldatei; Sprung-Links in die Lindenfeld-Dokumente per `#ID` |
| Zuverlässigkeit | offline, ohne Speicher; braucht JavaScript (Hinweis bei abgeschaltetem JS) |
| Wartbarkeit | Bau-Prompt im Footer, Register-Eintrag, Anker-Test |
| Portabilität | läuft als `file://` und auf GitHub Pages |
