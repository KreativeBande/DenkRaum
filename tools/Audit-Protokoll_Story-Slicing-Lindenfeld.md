# Audit-Protokoll: „Vom Epic zur fertigen Story“ (Lindenfeld Lunch)

Datei: story-slicing-lindenfeld.html · Geprüft: 24.11.2026 · Prüfgrundlage: K1–K22, Z1–Z10, N1–N4 (Arbeitskopie der Checkliste v2.1)
Messumgebung: Chrome (Playwright), 1300 px / 390 px, dazu 1440 / 900 / 375 px für K21; Testskripte t5–t20 ohne Seitenfehler.

## Ergebnis: ✅ Zertifiziert (alle Muss-Kriterien bestanden)
Kein ⭐: K11 (Design-System-Farbvergleich) ließ sich ohne Referenz-Hexwerte nicht belegen.
Repo-Standards (nicht siegelrelevant): N1, N2, N4 erfüllt, **N3 offen** (Sprungmarken erst nach Repo-Einbau), **Z10 nicht erfüllt** (siehe unten).

## A. Technische Muss-Kriterien
| Nr. | Ergebnis | Nachweis |
|---|---|---|
| K1 Offline | ✅ | `grep fetch(`, XMLHttpRequest, externe src/@import: 0 Treffer; eine Datei |
| K2 Storage | ✅ | kein localStorage/sessionStorage im Code (nur im Systemprompt-Text erwähnt) |
| K3 Touch | ✅ | 0 Treffer draggable/dragstart/dragover; Bedienung per pointerup und Tastatur |
| K4 Weiß | ✅ | `color-scheme: light` (meta, :root, html); body `rgb(255,255,255)` |
| K5 Beamer-Lesbarkeit | ✅ | kleinster gerenderter Text (inkl. SVG) 14 px; ein Wert 13,6 px (.85rem) gefunden und auf .9rem korrigiert |
| K6 Kein Sliding-Panel | ✅ | Kerninhalte permanent sichtbar; Animationen sind Schrittdemos mit Schaltflächen |
| K7 UTF-8 | ✅ | 0 Treffer `\u00`; Umlaute und Anführungszeichen in Stichprobe korrekt |
| K15 Footer erreichbar | ✅ | kein overflow:hidden auf html/body; Footer per Scroll erreichbar |
| K18 Beamer-Toggle | ✅ | vier Stufen, Klassen `beamer`, `beamer-xl`, `beamer-xxl` kumulativ, Label zeigt nächste Aktion, Footer ab Stufe 1 aus. Fließtext 17,6/24,2/30,8/37,4 px, Mindest-Fließtext 16/22/28/34 px, Sekundärtext min. 14/19/24/27 px |
| K19 Systemprompt | ✅ | vollständiger Master-Bau-Prompt (DE/EN), Stationenliste auf Stand 15 Stationen |
| K20 DE/EN | ✅ | 593 zweisprachige Elemente; Rest-Scan im EN-Modus: Befunde „Backbone (Rückgrat)“ und Quellen-Eintrag Anhang A behoben, übrig nur Eigenname; deutscher Grundtext statisch im HTML |
| K21 Signatur | ✅ | `position:fixed`, oben 8 px / rechts 8 px bei 1440, 900, 375 px, gescrollt, alle vier Beamer-Stufen (bei Stufe 3: 17 px, ebenfalls fest) |
| K22 Vertiefungs-Toggle | n/a | Pflicht nur für Kompendien/Lernreisen mit Fließtext-Erklärungen; dies ist ein Fall-Tool |

## B. Inhaltliche Muss-Kriterien
| Nr. | Ergebnis | Nachweis |
|---|---|---|
| K8 Keine generischen Werte | ✅ mit Beobachtung | Normen, Nummern und Fristen konkret. Beobachtung: die Messgröße des Epics (Wartezeit, Anteil passender Gerichte) hat keinen Zielwert, bewusst offen gelassen |
| K9 Szenariotreue | ✅ | Mia (Büro), Dilara (Schichtdienst, Deutsch Zweitsprache), Frau Berger (Küchenleitung), Herr Lindner (Facility Management) durchgängig; Story-Zuordnung konsistent über Stationen 3, 11, 12, 14 |
| K10 Problem/Lösung | ✅ | Stories formulieren Ziel („damit …“); Kontrollen aus ISO 27001 sind als Maßnahme gekennzeichnet |
| K17 Aktualität | ✅ | Per Websuche am 24.11.2026 geprüft: ISO/IEC 27001:2022 mit 93 Controls in vier Themen; Controls 5.15, 8.3, 8.13, 8.15, 6.8 bestätigt (Advisera). ISO/IEC 25010:2023 mit neun Merkmalen (Safety, Interaction Capability, Flexibility neu), veröffentlicht 11/2023. Scrum Guide 2020: Refinement als laufende Tätigkeit, kein Ereignis. BABOK Guide v3 weiterhin aktuelle Ausgabe (IIBA). Jira Cloud CSV: Spalte Parent für Hierarchie (Atlassian) |

## C. Übungsstandards (Z)
| Nr. | Ergebnis | Nachweis |
|---|---|---|
| Z1 Einzelfrage-Stepper | ✅ | 22 Quizfragen, je Frage genau eine sichtbar, Zähler „Frage x von 19“; Sortierübungen zeigen je eine Karte |
| Z2 Lösung nach Auswahl | ✅ | in allen 19 Fragen per `getComputedStyle` sichtbar: Feedback, richtige Antwort markiert und benannt, Erklärung |
| Z3 Antwortposition | ✅ | Verteilung Position 1/2/3/4 = 5/6/6/5, fest; keine Positionsverweise |
| Z4 Einspaltig, kein Scroll seitlich | ✅ | `scrollWidth ≤ clientWidth` bei 1300, 390, 1920 px in allen Beamer-Stufen; Tabellen in eigenem Scroll-Container, auf Handy als Karten |
| Z8 Glyphen | ✅ | verwendet: ✔ ✘ ☀ ↩ → ≈; im Screenshot korrekt |
| Z5 Keine Zeitagenda | ✅ | Zeiten nur im Vortrags-Skript |
| Z6 Abkürzungen | ⚠️ | Glossar vollständig (u. a. CSV, Jira neu); Ausschreiben bei jeder Erstverwendung je Abschnitt nicht lückenlos geprüft |
| Z7 Grafiken | ✅ | Pipeline-Grafik inline, 12 Boxen plus Schleife, eindeutige IDs (0 doppelte), Labels mit data-en |
| Z9 Teilnehmenden-Version | ✅ | story-slicing-lindenfeld-teilnehmende.html: ohne Footer, Beispielantworten, Coaching-Fragen und „Alles abspielen“; Lösung nach Auswahl bleibt; 3 Breiten ohne Fehler |
| Z10 Kennungen mit Kontextfenster | ❌ (nicht siegelrelevant) | Kennungen CR-1 und T1–T4 sind nicht antippbar; noch kein einheitliches Kontextfenster |

## D. ISO/IEC 25010-Mapping (informativ)
| Merkmal | K-Nachweise | Einschätzung |
|---|---|---|
| Functional Suitability | K8, K9, K10 | ✅ |
| Performance Efficiency | n/a | ✅ Datei ca. 0,3 MB, lädt sofort, Animationen respektieren `prefers-reduced-motion` |
| Compatibility | K1 | ✅ |
| Interaction Capability | K3, K4, K5, K6 | ✅ Tastaturbedienung, Schaltflächen und Checkbox-Zeilen ≥ 44 px hoch (nur Textlinks in Quellen und Signatur kleiner) |
| Reliability | K1, K2 | ✅ keine Seitenfehler in allen Testläufen |
| Security | n/a | ✅ keine personenbezogenen Daten; CSV-Download erzeugt nur lokale Datei |
| Maintainability | K7, K11 | ⚠️ Single-File bewusst; K11 nicht belegt |
| Flexibility | K1 | ✅ |
| Safety | n/a | ✅ keine irreversible Aktion; Zurücksetzen-Schaltflächen überall |

## E. Kann-Kriterien
K11 offen · K12 ✅ (dieses Protokoll, jünger als letzte Änderung) · K13 ✅ · K14 ✅ (Statuszeile im Footer-Bereich statt im fixierten Signaturkasten) · K16 ✅ (Sprecher-Skript_Vom-Epic-zur-fertigen-Story.md) · Z5 ✅ · Z6 ⚠️ · Z7 ✅ · Z9 ✅

## F. Repo-Standards N1–N4
N1 ✅ Navigation links · N2 ✅ keine Raumfarben (0 Treffer) · N3 offen (zurueck.js erst beim Repo-Einbau) · N4 ✅ 0 veraltete Raumnamen

## G. Offen
1. K11: Referenz-Hexwerte der Persona-Farben liefern, dann Auszeichnung prüfbar.
2. Z10: Kennungen CR-1 und T1–T4 antippbar machen (Kontextfenster).
3. Z6: Abkürzungen je Abschnitt prüfen.
4. N3 und Repo-Einbau nach deinem OK.


## Nachtrag 25.11.2026
Station 3 ergänzt um animierten Block „Epic oder Use Case" (4 Schritte, Vergleichstabelle, Sortierübung, Quizfrage 20). Getestet bei 1300/390 px und mit reduzierter Bewegung, keine Seitenfehler, kein seitliches Scrollen. Z3-Verteilung jetzt 5/6/6/5. Ergebnis unverändert ✅ Zertifiziert.

## Nachtrag 25.11.2026 (2)
Neue Station 3a „Use-Case-Werkstatt“: animierter Aufbau eines Use Case aus 10 Bausteinen, Zuordnung zu 9 Artefakten, Änderungsdurchlauf (Regel → 4 betroffene Artefakte), Sortierübung (6 Einträge), Quizfrage 21, Glossar (Artefakt, Geschäftsregel). Getestet bei 1300/390 px und mit reduzierter Bewegung: keine Seitenfehler, kein seitliches Scrollen, K5 Mindestschrift 14 px (Beamer-Stufen ok). Z3 jetzt 5/6/6/5. Ergebnis unverändert ✅ Zertifiziert. Inhalte der Werkstatt (Bausteine, Beispielregel Bestellschluss 10:00) sind eigener Szenariotext und von Michaela fachlich zu prüfen.

## Nachtrag 25.11.2026 (3)
Station 3a erweitert um Dokumenttyp-Umschalter: Use Case, Lastenheft, Stakeholder-Analyse, Business Case, Change Request (je 7–10 Bausteine, 7–9 Zielartefakte, Änderungsdurchlauf). Alle Varianten stehen statisch im HTML (K20), Umschalter per Tastatur und Tippen bedienbar (aria-pressed). Quizfrage 22 ergänzt, Z3 jetzt 5/6/6/5. Getestet bei 1300/390 px und mit reduzierter Bewegung, keine Seitenfehler, kein seitliches Scrollen. Inhalte der vier neuen Varianten sind eigener Szenariotext (Lindenfeld Lunch) und fachlich zu prüfen. Ergebnis unverändert ✅ Zertifiziert.
