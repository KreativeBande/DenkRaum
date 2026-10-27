# Qualitätskriterien-Checkliste (Siegel-Prüfung)

*Synchronisierte Arbeitskopie der kanonischen Notion-Seite (ID `391d6937-ee08-8183-9966-fd0e2e963de9`). Bei Diskrepanz gilt Notion — vor größeren Audits dort frisch abrufen statt sich allein auf diese Datei zu verlassen.*

Abgeleitet aus dem Master-Prompt „Zusammenarbeit bei RE-Trainingstools" (`master-prompt-zusammenarbeit.md`). Jedes Kriterium ist atomar, testbar und mit einer konkreten Prüfmethode hinterlegt — analog zu IREB-Qualitätskriterien für Anforderungen.

**Muss-Kriterien**: Alle müssen erfüllt sein → Voraussetzung für „Zertifiziert".
**Kann-Kriterien**: Zusätzlich erfüllt → „Zertifiziert mit Auszeichnung".

---

## A. Technische Muss-Kriterien

### K1 — Offlinefähigkeit
**Aussage:** Das Tool lädt und funktioniert vollständig ohne Netzwerkverbindung.
**Prüfmethode:**
1. `grep -n "fetch(" datei.html` — jeder Treffer muss auf eine lokale Ressource oder gar nichts (kein externer Host) zeigen.
2. Datei über `file://` im Safari auf iPad öffnen, WLAN deaktivieren, alle Interaktionen durchklicken.
**Bestanden, wenn:** 0 externe `fetch()`/`XMLHttpRequest`-Aufrufe UND alle Kernfunktionen im Flugmodus nutzbar.

### K2 — Kein Blocking durch sessionStorage/localStorage
**Aussage:** Zugriffe auf Storage-APIs werfen keine unbehandelten Fehler in restriktiven WebView-Kontexten.
**Prüfmethode:** `grep -n "sessionStorage\|localStorage"` — jeder Fund muss in einem `try/catch`-Block liegen.
**Bestanden, wenn:** 100 % der Storage-Zugriffe abgesichert.

### K3 — Touch-Tauglichkeit
**Aussage:** Alle interaktiven Elemente sind per Touch bedienbar, kein HTML5-Drag-and-Drop.
**Prüfmethode:** `grep -n "draggable=\|dragstart\|dragover"` — sollte keine Treffer liefern (stattdessen `pointerdown`/`pointermove`/`pointerup`). Manueller Test: jede Drag-Interaktion auf iPad mit Finger ausführen.
**Bestanden, wenn:** 0 HTML5-DnD-Events UND alle Drag-Interaktionen auf iPad funktionsfähig.

### K4 — Weißer Hintergrund
**Aussage:** Die Grundfläche des Tools ist durchgehend hell/weiß, kein Dark Theme aktiv oder zuschaltbar.
**Prüfmethode:** Computed `background-color` von `<body>` und Hauptcontainer im Browser-Inspector auslesen. Zusätzlich `grep -n "color-scheme" datei.html` — muss `light` auf `html`/`body` gesetzt sein, um iOS/macOS-Dark-Mode-Interferenz bei Formularelementen/Scrollbars zu verhindern.
**Bestanden, wenn:** Wert ist Weiß oder ein sehr helles Neutral (kein `prefers-color-scheme: dark`-Override, der die Fläche abdunkelt) UND `color-scheme: light` ist gesetzt.

### K5 — Beamer-Lesbarkeit
**Aussage:** Fließtext ist aus min. 3 m Entfernung auf einer projizierten Fläche lesbar.
**Prüfmethode:** Vollständiger Scan **aller** `font-size`-Deklarationen im Stylesheet — `grep -oE "font-size:\s*[0-9]+(\.[0-9]+)?px" datei.html | sort | uniq -c` — und jeden gefundenen Wert einzeln gegen den Schwellenwert prüfen, nicht nur den Fließtext des Hauptinhalts stichprobenhaft (Badges, Chevrons, Tabellen-Zellen etc. zählen mit). Kontrastverhältnis Text/Hintergrund ≥ 4.5:1 (WCAG AA, per Contrast-Checker gemessen).
**Bestanden, wenn:** Kein gefundener Wert liegt unter 16px (Fließtext) bzw. 14px (Sekundärtext, inkl. Badges/Icons/Tabellen); Kontrast erfüllt.

### K6 — Kein Sliding-Panel-Layout
**Aussage:** Zentrale Inhalte sind permanent sichtbar (Split-Screen), nicht hinter Ein-/Ausblend-Animationen versteckt.
**Prüfmethode:** Visuelle Inspektion — wird eine Kerninformation nur durch Klick/Wisch sichtbar, die für das Verständnis der aktuellen Ansicht nötig ist?
**Bestanden, wenn:** Keine Kerninformation ist ausschließlich über eine Slide-Transition erreichbar.

### K7 — UTF-8-Encoding sauber
**Aussage:** Keine kaputten Umlaute/Sonderzeichen durch Unicode-Escape-Fehler.
**Prüfmethode:** `grep -n "\\u00"` in der Datei — sollte keine Treffer für deutsche Umlaute liefern. Visuelle Stichprobe: ä, ö, ü, ß, „", – korrekt dargestellt.
**Bestanden, wenn:** 0 fehlerhafte Escape-Sequenzen.

### K15 — Erreichbarkeit nicht-live-relevanter Inhalte
**Aussage:** Inhalte außerhalb der Live-Ansicht (z. B. Footer mit Systemprompt/Handbuch/Vortrags-Skript) dürfen bei festen Split-Screen-Layouts (`height:100vh`) nicht durch `overflow:hidden` auf `html`/`body` unerreichbar werden.
**Prüfmethode:** `grep -n "overflow" datei.html` auf `html,body`-Selektoren prüfen. Manueller Test: Datei im Browser öffnen, bis ans Seitenende scrollen — sind alle Footer-Inhalte tatsächlich erreichbar?
**Bestanden, wenn:** `html`/`body` erlauben vertikales Scrollen (z. B. `overflow-y:auto`) UND der komplette Footer ist per Scroll erreichbar. *(Nummerierung bewusst nicht lückenlos an K1–K14 angehängt, sondern hier in Abschnitt A eingeordnet, um bestehende Audit-Protokolle mit K1–K14 nicht zu invalidieren.)*

### K18 — Beamer-Modus-Toggle (vierstufig)
**Aussage:** Das Tool bietet einen Button, der die Darstellung in vier Stufen vergrößert (Normal → Beamer → Beamer XL → Beamer XXL) und danach wieder auf Normal zurückspringt — reine Größensteigerung, keine inhaltlichen Modus-Wechsel.
**Prüfmethode:**
1. `grep -n "beamerBtn\|BEAMER_LEVELS"` — Button und Zyklus-Array müssen vorhanden sein.
2. jsdom-Test: vier Klicks simulieren, `className` von `<html>` nach jedem Klick prüfen — vier unterschiedliche, kumulative Zustände (`''`, `beamer`, `beamer beamer-xl`, `beamer beamer-xl beamer-xxl`), fünfter Klick wieder `''`.
3. Größentabelle je Stufe gegenprüfen (siehe `standards.md`-Anhang „Beamer-Modus-Toggle").
4. Footer muss ab Stufe 1 `display:none` sein.
**Bestanden, wenn:** Alle vier Zustände korrekt, Größentabelle eingehalten, Footer ab Stufe 1 ausgeblendet. *(Löst die frühere Kollision auf, bei der eine lokale Master-Prompt-Version den Beamer-Toggle fälschlich als „K15" bezeichnete — K15 bleibt „Erreichbarkeit nicht-live-relevanter Inhalte", der Beamer-Toggle bekommt hiermit die eigene Nummer K18.)*

### K19 — Systemprompt-Box enthält Master-Bau-Prompt
**Aussage:** Die Systemprompt-Box im Footer enthält immer den wiederverwendbaren Master-Bau-Prompt für dieses Tool (Struktur/Inhalt pro Spur/Design/Persona-Bezug/Nicht-tun) — nicht nur einen rohen, kontextlosen Beleg oder einen minimalen Rahmensatz.
**Prüfmethode:** Sichtprüfung: Enthält die Box eine vollständige, eigenständig nutzbare Bauanleitung, mit der eine interessierte Person ein vergleichbares Tool von Grund auf entwickeln könnte (Struktur, Inhalt pro Spur/Modus, Design-Vorgaben, Nicht-tun-Liste)? Falls das Tool zusätzlich einen echten Laufzeit-Prompt verwendet: ist dieser als separater, klar abgegrenzter Abschnitt ergänzt, ohne den Master-Bau-Prompt zu ersetzen?
**Bestanden, wenn:** Vollständiger Master-Bau-Prompt vorhanden und ohne Zusatzrecherche nachbaubar; Abgrenzung zu Handbuch (keine Framework-Analyse dort) gewahrt. *(Hochgestuft von Kann- zu Muss-Kriterium, MP v4.3 → v6 — zuvor genügte ein minimaler Rahmensatz.)*

### K20 — Sprach-Toggle (Deutsch/Englisch)
**Aussage:** Das Tool bietet einen Umschalter, der die komplette sichtbare Textoberfläche — Header, Buttons, Tabelleninhalte, Persona-Aussagen (Namen bleiben laut K9 unverändert) und alle vier Footer-Boxen (Systemprompt/Handbuch/Vortrags-Skript/Normen-Register) — zwischen Deutsch und Englisch umschaltet, ohne Neuladen und ohne externen Übersetzungsdienst (K1-Offlinepflicht bleibt gewahrt).
**Prüfmethode:**
1. Sichtprüfung/Grep: Umschalt-Mechanismus vorhanden (z. B. Sprach-Button + zweisprachige Textquellen im Code)?
2. Manueller Test: Jeden sichtbaren Textbereich einzeln umschalten — Header, Buttons, Tabellen, alle vier Footer-Boxen. Keine gemischt-sprachigen Reste, kein Text bleibt beim Umschalten in der alten Sprache hängen.
3. Persona-Namen (Ela, Lars, Sarah, Petra, Herr Bachmeier) bleiben in beiden Sprachen identisch — nur Fließtext/Rollenbezeichnungen werden übersetzt.
**Bestanden, wenn:** 100 % der sichtbaren Texte inkl. aller vier Footer-Boxen in beiden Sprachen vollständig und korrekt vorhanden, Umschaltung ohne Reload funktioniert, keine gemischtsprachigen Reste. *(Neu ab v1.8, September 2026 — verpflichtendes Muss-Kriterium für alle künftigen Tools.)*

### K21 — Signatur fest verankert
**Aussage:** Die Signatur (Name + Website-Link) ist auf jeder Bildschirmgröße und in jedem Modus/Scroll-Zustand per `position:fixed` oben rechts im Viewport verankert — keine Ausnahme für schmale Viewports, kein Rückfall auf `position:static`.
**Prüfmethode:**
1. `grep -n "position:fixed\|position:static" datei.html` im Kontext des Signatur-Selektors (z. B. `.signature`) — `position:fixed` darf durch keine `@media`-Regel auf `position:static` zurückfallen.
2. Manueller Test: Browser bei ca. 1440px, 900px und 375px Breite öffnen, Seite scrollen und alle vier Beamer-Stufen durchklicken — Signatur bleibt in jedem Fall an fester Position oben rechts, bewegt sich nicht mit dem Inhalt und wird nicht überdeckt.
**Bestanden, wenn:** `position:fixed` gilt uneingeschränkt über alle Breakpoints und Modi hinweg; kein `position:static`-Fallback vorhanden. *(Neu ab v1.9, September 2026 — verpflichtendes Muss-Kriterium für alle künftigen Tools; löst den bisherigen, in CLAUDE.md/Master-Prompt dokumentierten Fallback auf `position:static` unter 900px Breite ab, der ab sofort nicht mehr zulässig ist.)*

### K22 — Vertiefungs-Toggle (Kurz/Ausführlich)
**Aussage:** Das Tool bietet für alle inhaltlichen Kernabsätze (Fließtext-Erklärungen in Kompendien/Lernreisen) einen Umschalter zwischen einer kurzen Fassung (1–2 Sätze) und einer ausführlichen Fassung (Herkunft/Mechanismus/Beispiel/Kontext), ohne Neuladen. Beide Fassungen liegen vollständig statisch im HTML vor — keine reine Laufzeit-Generierung (analog zur K20-Anforderung an den Sprach-Toggle). Standard-Zustand beim Laden: **Kurzfassung** (Teilnehmende sehen zuerst die knappe Version); die Trainerin schaltet für eigene Vorbereitung/Vertiefung auf Ausführlich um.
**Prüfmethode:**
1. `grep -c "depth-full\|depth-short"` — beide Klassen müssen vorhanden sein und in gleicher Anzahl auftreten (jeder Kernabsatz hat genau ein Paar).
2. Manueller Test: Umschalten prüfen — Kurzfassung ersetzt Ausführlich-Fassung vollständig, keine Vermischung, kein Rest der jeweils anderen Fassung sichtbar.
3. Persistenz: Zustand bleibt innerhalb der Sitzung erhalten (`sessionStorage` mit `try/catch`, K2-konform).
4. Beamer-Interaktion: Im Beamer-Modus (K18, Stufe 1 aufwärts) wird automatisch auf die Kurzfassung umgeschaltet, damit Präsentationsfolien knapp bleiben — unabhängig vom zuvor gewählten Zustand.
**Bestanden, wenn:** Beide Fassungen für alle inhaltlichen Kernabsätze vorhanden, Standard-Zustand ist Kurzfassung, Umschaltung vollständig und ohne Reload, Zustand session-persistent, Beamer-Modus erzwingt Kurzfassung. *(Neu ab v2.0, September 2026 — verpflichtendes Muss-Kriterium für alle künftigen Kompendium-/Lernreise-Tools mit Fließtext-Erklärungen. Für reine Explorer-/Puzzle-/Simulator-Tools ohne längere Erklärabsätze entfällt das Kriterium — im Handbuch-Teil begründen, warum nicht einschlägig, analog zur IREB/BABOK/PMBOK-Bezugspflicht.)*

---

## B. Inhaltliche Muss-Kriterien

### K8 — Keine generischen Werte
**Aussage:** Jede Zahl, Frist, Norm-Referenz oder Anforderung im Tool ist konkret und nachprüfbar, nicht platzhalterhaft.
**Prüfmethode:** Für jedes im Tool verwendete Datenelement (Anforderung, NFA, Schwellenwert, Normzitat) einzeln prüfen:
- Gibt es eine konkrete Zahl/Frist/Artikel-Referenz? (nicht „angemessene Zeit", „ausreichend sicher")
- Ist die Quelle nennbar (z. B. „DSGVO Art. 32", „ISO/IEC 27001:2022", „NIS2UmsuCG §30")?
- Bei sich noch entwickelnder Regulatorik (z. B. CADA, EU AI Act, EU Cloud Sovereignty Framework, BSI C3A): Ist der Status (in Kraft/Vorschlag/Entwurf) mit Datum angegeben? Sind unterschiedliche Rahmenwerke sauber getrennt und nicht unter einem Namen vermischt (z. B. CADA-Assurance-Level ≠ EU-CSF-SOV-Ziele)?
**Bestanden, wenn:** 100 % der Datenelemente bestehen alle Teilfragen (bei Regulatorik-Verweisen inkl. Status/Datum). Stichprobenprotokoll führen: Element → Wert → Quelle → Status/Datum (falls Regulatorik) → OK/Fail.

### K9 — Szenariotreue
**Aussage:** Alle Inhalte bleiben innerhalb des definierten Szenarios (Personas, Fachdomäne, Kontext) und widersprechen sich nicht.
**Prüfmethode:** Für jede Persona-Aussage im Tool: Entspricht sie der etablierten Rolle (Ela = Projektleitung, Lars = Entwicklung, Sarah = Vertrieb, Petra = QM, Herr Bachmeier = Geschäftsführung)? Für jede Fachaussage: Konsistent mit dem Szenario-Rahmen (z. B. Marmorkuchen vs. Bürgeramt nicht vermischt)?
**Bestanden, wenn:** 0 Rollen- oder Szenario-Widersprüche gefunden.

### K10 — Problem-Requirement-Solution-Trennung
**Aussage:** Als „Anforderung" gekennzeichnete Items beschreiben Ziel/Problem, nicht Lösung — außer sie sind explizit als normvorgegebenes Mittel gekennzeichnet.
**Prüfmethode:** Jedes Anforderungsitem klassifizieren: Lösungsorientiert ohne Kennzeichnung? → Fail. Lösungsorientiert MIT Badge „⚖ Norm schreibt Mittel vor" plus Normverweis? → OK.
**Bestanden, wenn:** 0 unmarkierte lösungsorientierte Formulierungen.

### K17 — Aktualität referenzierter Normen/Frameworks
**Aussage:** Jede im Tool genannte ISO-/Framework-Version und jeder Regulatorik-Verweis ist gegen den tatsächlich aktuellen Stand geprüft, nicht aus dem Trainingswissen der KI übernommen.
**Prüfmethode:** Für jede Norm-/Framework-Nennung: gezielte Websuche zum aktuellen Stand (Version, Status: aktiv/zurückgezogen/in Überarbeitung, Datum). Ergebnis mit dem im Tool gezeigten Wert abgleichen.
**Bestanden, wenn:** 100 % der Normen-/Framework-Nennungen stimmen mit dem per Websuche verifizierten aktuellen Stand überein.

---

## C. Kann-Kriterien (für Auszeichnung)

### K11 — Design-System-Konformität
**Aussage:** Persona-Farbcodierung, Pill-Buttons, Badge-Muster sind konsistent mit den anderen Tools im Ökosystem.
**Prüfmethode:** Farbwerte der Personas per Inspector mit Referenztool vergleichen (Hex-Werte).
**Bestanden, wenn:** Farbabweichung 0 (identische Hex-Codes über alle Tools).
*Dauerhaft offen, solange keine Referenzdatei mit Persona-Hexcodes vorliegt.*

### K12 — Validierungsnachweis vorhanden
**Aussage:** Es existiert ein Testprotokoll (z. B. jsdom-Skript oder manuelles Klickprotokoll), das alle Zustände abdeckt.
**Prüfmethode:** Nachweisdokument einsehen.
**Bestanden, wenn:** Protokoll vorhanden und Datum jünger als letzte inhaltliche Änderung der Datei.

### K13 — Vortrags-Skript-Box vorhanden
**Aussage:** Der Footer enthält eine dritte, von Systemprompt und Handbuch getrennte Aufklapp-Box „Vortrags-Skript" mit Sprechtext für den Live-Vortrag — nicht nur Konstruktionslogik.
**Prüfmethode:**
1. `grep -n "Vortrags-Skript"` bzw. Sichtprüfung: existiert eine dritte `<details>`-Box neben Systemprompt und Handbuch?
2. Inhaltsprüfung: Deckt die Box jeden Schritt/State des Tools mit Klick-Hinweis + Sprechtext ab (nicht nur eine allgemeine Zusammenfassung)?
3. Abgrenzungsprüfung: Enthält die Box *keine* Framework-Konstruktionslogik (die gehört ins Handbuch) und *keinen* rohen Systemprompt-Wortlaut (die gehört in die Systemprompt-Box)?
**Bestanden, wenn:** Box vorhanden, alle Schritte abgedeckt, inhaltlich trennscharf zu Handbuch/Systemprompt.

### K14 — Audit-Status-Zeile aktuell
**Aussage:** Die Footer-Signatur enthält eine einzeilige Statusnotiz (Format `Zuletzt geprüft: TT.MM.JJJJ · Status: …`) — getrennt von den drei Aufklapp-Boxen, ohne den vollen Audit-Report zu duplizieren — und diese Notiz ist nicht veraltet.
**Prüfmethode:**
1. Sichtprüfung `.footer-sig`: Ist eine Statuszeile mit Datum und Ergebnis (✅/⭐/❌) vorhanden?
2. Abgrenzungsprüfung: Enthält die Zeile *nur* Datum + Status + Verweis auf „Audit-Protokoll", *keine* Kriterien-Details, keine Tabelle, keinen vollen Report?
3. Aktualitäts-Check: Liegt das Datum der Statuszeile nach dem Datum der letzten inhaltlichen Änderung der Datei? Wenn die Datei seither geändert wurde, ohne die Zeile zu aktualisieren oder zu entfernen → Fail (siehe Verfalls-Disziplin im Master-Prompt).
**Bestanden, wenn:** Zeile vorhanden, inhaltlich schlank (keine Report-Duplizierung), Datum nicht älter als letzte inhaltliche Änderung.

### K16 — Companion-Datei Sprecher-Skript vorhanden
**Aussage:** Bei jeder Erstellung oder inhaltlichen Änderung der Vortrags-Skript-Box existiert eine synchron gehaltene `Sprecher-Skript_<Toolname>.md` (siehe Master-Prompt, Companion-Datei-Regel).
**Prüfmethode:** Abgleich Dateiname vs. Tool-Name. Stichprobe: Deckt sich der Inhalt der `.md` mit der aktuellen Footer-Box (gleiche Schritt-Gliederung, gleicher Sprechtext)?
**Bestanden, wenn:** Datei existiert, Inhalt synchron zur Footer-Box, nicht älter als deren letzte inhaltliche Änderung.

---

## D. Pflicht-Anhang: ISO/IEC 25010-Mapping (informativ, ohne Siegel-Einfluss)

**Regel:** Jede Tool-Prüfung nach diesem Dokument MUSS diesen Anhang enthalten — unabhängig vom Ergebnis der Muss-/Kann-Kriterien (A–C). Der Anhang beeinflusst die Siegel-Vergabe **nicht**. Er dient der Rückverfolgbarkeit zu ISO/IEC 25010:2023 und ordnet die bereits erhobenen K-Befunde den neun Qualitätsmerkmalen zu, statt sie doppelt zu prüfen.

**Prüfmethode:** Für jedes Merkmal werden die zugeordneten K-Nachweise referenziert (kein neuer Test). Nur wo kein K-Kriterium existiert, erfolgt eine kurze ergänzende Einschätzung.

| ISO 25010-Merkmal | Zugeordnete K-Kriterien | Zusätzliche Prüfung (falls kein K-Kriterium zutrifft) |
|---|---|---|
| Functional Suitability | K8, K9, K10 | — |
| Performance Efficiency | — | Dateigröße/Ladeverhalten grob einschätzen (keine harte Schwelle, rein informativ) |
| Compatibility | K1 | — |
| Interaction Capability (vorm. Usability, ISO/IEC 25010:2023) | K3, K4, K5, K6 | — |
| Reliability | K1, K2 | — |
| Security | — | Kurzcheck: Werden personenbezogene/sensible Daten verarbeitet? Falls nein → n/a |
| Maintainability | K7, K11 | Code-Struktur grob sichten (Single-File ist bewusste Designentscheidung laut Master-Prompt, kein automatischer Mangel) |
| Flexibility (vorm. Portability) | K1 | — |
| Safety (neu 2023) | — | Kurzcheck: Kann eine Fehlbedienung im Tool zu einer irreversiblen, folgenreichen Aktion führen, ohne Warnung/Rückfrage? Falls nein → n/a |

**Protokollformat je Merkmal:** Merkmal → referenzierte K-Nachweise → ggf. Zusatzbefund → Einschätzung (✅ unauffällig / ⚠️ Beobachtung / ❌ Mangel) — **rein informativ, dokumentiert, aber ohne Rückwirkung auf ❌/✅/⭐.**

---

## E. Übungs-, Layout- und Grafikstandards (Z1–Z9)

**Geltungsbereich:** Tools mit Übungen, Quizfragen oder Grafiken. Entstanden im Workshop-Tool „Guardrails × Governance × Assurance" (01.10.2026). Prüfung im Browser (Playwright/Chromium oder jsdom mit berechneten Styles), nicht nur per Grep. **Muss** bei Tools mit Übungen: Z1–Z4, Z8. **Kann** (für Auszeichnung): Z5–Z7, Z9.

### Z1 — Einzelfrage-Stepper (Muss)
**Aussage:** Pro Übung ist genau eine Frage sichtbar. Navigation nur über Zurück/Weiter plus Zähler („Frage 3 von 9"). Kein automatisches Weiterspringen nach der Antwort. Auch lange Übungen sind eine Übung (z. B. neun Fragen), nicht mehrere Einzelblöcke.
**Bestanden, wenn:** Im Browser ist je Übung exakt eine Frage sichtbar, Zurück/Weiter und Zähler funktionieren, nach einer Antwort bleibt dieselbe Frage stehen.

### Z2 — Lösung nach Auswahl (Muss)
**Aussage:** Nach der Auswahl einer Option erscheinen sofort (a) Feedback ✔ / ≈ / ✘, (b) die richtige Antwort ausdrücklich benannt, (c) bei mehreren vertretbaren Antworten „Ebenfalls vertretbar", (d) die Erklärung.
**Prüfmethode:** Sichtbarkeit per `getComputedStyle` (display/visibility) prüfen — ein Selektor wie `.fb span{display:none}` kann den Text unbemerkt verstecken; ein reiner Textinhalts-Test im DOM reicht nicht.
**Bestanden, wenn:** Alle vier Elemente nach Auswahl sichtbar sind, in jeder Übung.

### Z3 — Antwortposition (Muss)
**Aussage:** Die richtige Antwort steht nicht systematisch an erster Stelle.
**Prüfmethode:** Skript über alle Fragen: Position der Option mit `data-ok="1"` zählen. Reihenfolge fest und reproduzierbar (nicht zufällig pro Aufruf, damit das Sprecher-Skript passt). Keine Optionen, die auf ihre Position verweisen („Option A", „alle genannten").
**Bestanden, wenn:** Position 1 dominiert nicht, Verteilung breit gestreut.

### Z4 — Einspaltiges Layout in Vortragsreihenfolge (Muss)
**Aussage:** Keine Zwei-Spalten-Layouts, in denen Fließtext nur in einer schmalen Spalte steht. Inhalte stehen untereinander in der Reihenfolge des Vortrags und lassen sich nach und nach zeigen. Seitenbreite voll nutzen (main ca. 1200 px).
**Prüfmethode:** Bei 1300 px und 390 px: `scrollWidth <= clientWidth` (kein seitliches Scrollen), lange URLs mit `overflow-wrap:anywhere`.
**Bestanden, wenn:** Einspaltig, kein seitliches Scrollen auf beiden Breiten.

### Z5 — Keine Zeitagenda im Tool (Kann)
**Aussage:** Uhrzeiten und Zeitpläne gehören ins Sprecher-Skript, nicht ins Tool.

### Z6 — Abkürzungen und Links (Kann)
**Aussage:** Jede Abkürzung wird bei Erstverwendung je Abschnitt und je Sprache ausgeschrieben, ein Glossar steht am Ende. Normen und Quellen sind verlinkt, wo sinnvoll.

### Z7 — Grafiken (Kann)
**Aussage:** Wo ein Bild die Erklärung trägt (Modelle, Ketten, Ebenen), steht eine Inline-SVG-Grafik direkt in der Erklärung. Offline (kein externes Bild), DE/EN-Labels per `data-i18n-en`, eindeutige Marker- und Gradient-IDs je Grafik (sonst fehlen Pfeilspitzen in versteckten Abschnitten), Beschriftung im Rendering ≥ 14 px.

### Z8 — Glyph-Check (Muss)
**Aussage:** Sonderzeichen werden im Screenshot geprüft. Wird ein Zeichen fehlerhaft dargestellt (z. B. ◐), wird es durch Text oder ein gängiges Zeichen ersetzt. Keine seltenen Symbole als alleinige Bedeutungsträger.

### Z9 — Teilnehmenden-Version (Kann)
**Aussage:** Bei Workshop-Tools zusätzlich eine Variante ohne Trainer-Elemente (Footer, „Alle auflösen", Antwortimpulse für Gruppenfragen). Die Lösung nach Auswahl bleibt erhalten. Beide Varianten werden getestet.

*(Neu ab v2.1, Oktober 2026. Hinweis: K12 gilt auch für Z-Kriterien — das Testprotokoll muss die Z-Befunde enthalten.)*

---

## Offene Punkte (Backlog, kein Siegel-Einfluss)

**Wichtig:** Dieser Abschnitt enthält Diskussionspunkte/Ideen, keine Kriterien. Nichts hier wirkt sich auf ❌/✅/⭐ aus, solange es nicht explizit zu einem K-Kriterium ausformuliert und in die Änderungshistorie aufgenommen wird.

- **Erledigt (03.08.2026):** Normen-Register ist vierte Pflicht-Box im Footer-Standard. K13 bleibt unverändert gültig, da sie nur das Vorhandensein der Vortrags-Skript-Box prüft.
- **Glossar als optionale fünfte Footer-Box:** Standort und Format entschieden (Referenz `tools/story-mapping-kundenperspektiven.html`, `<dl class="footer-glossary">`), Pflicht weiterhin offen; kein K-Kriterium.
- **Meta-Anhänge A1, A2, … als optionale Footer-Boxen:** Format entschieden (Referenz `tools/fallstudie-qualitaetssystem.html`), nur wenn der Tool-Inhalt selbst das Meta-Thema behandelt; kein K-Kriterium.

---

## Siegel-Logik

| Ergebnis | Bedingung |
|---|---|
| ❌ Nicht zertifiziert | Mindestens ein Muss-Kriterium (K1–K10, K15, K17, K18, K19, K20, K21, K22; bei Tools mit Übungen zusätzlich Z1–Z4, Z8) nicht bestanden |
| ✅ Zertifiziert | Alle Muss-Kriterien (K1–K10, K15, K17, K18, K19, K20, K21, K22; bei Tools mit Übungen zusätzlich Z1–Z4, Z8) bestanden |
| ⭐ Zertifiziert mit Auszeichnung | Alle Muss-Kriterien + alle Kann-Kriterien (K11–K14, K16; bei Tools mit Übungen zusätzlich Z5–Z7, Z9) bestanden |

Jede Prüfung wird protokolliert als: **Tool → Datum → Kriterium → Ergebnis → Nachweis (Fundstelle/Messwert)**. Kein Kriterium gilt als „bestanden", ohne dass der konkrete Nachweis (Zeile, Messwert, Screenshot) dokumentiert ist — sonst ist es selbst wieder generisches Bla.

**Abschnitt D (ISO 25010) ist in jedem Prüfprotokoll Pflicht, unabhängig vom Siegel-Ergebnis.** Ein Protokoll ohne Abschnitt D ist unvollständig — auch wenn A–C vollständig bestanden wurden.

---

*Version 2.1 — Oktober 2026 (Stand Notion, synchronisiert 27.10.2026). Änderungshistorie v2.1: Neuer Abschnitt E ergänzt (Übungs-, Layout- und Grafikstandards Z1–Z9): Z1–Z4 und Z8 Muss-Kriterien für Tools mit Übungen, Z5–Z7 und Z9 Kann-Kriterien. Siegel-Logik-Tabelle entsprechend aktualisiert. Entstanden im Workshop-Tool „Guardrails × Governance × Assurance". Auf Wunsch von Michaela.*
*Änderungshistorie v2.0 (September 2026): K22 ergänzt (Vertiefungs-Toggle Kurz/Ausführlich, Abschnitt A, Muss-Kriterium für Kompendium-/Lernreise-Tools) — Standard-Zustand ist die Kurzfassung, Beamer-Modus erzwingt automatisch Kurzfassung. Siegel-Logik-Tabelle entsprechend aktualisiert. Nach Referenzimplementierung in `stakeholder-management-kompendium-fachbuch.html` und `iso-22989-kompendium.html`.*
*Version 1.9 — September 2026. Änderungshistorie v1.9: K21 ergänzt (Signatur fest verankert, Abschnitt A, Muss-Kriterium) — die Signatur muss ab sofort auf jeder Bildschirmgröße per `position:fixed` verankert sein; der bisherige Fallback auf `position:static` unter 900px Breite ist nicht mehr zulässig. Siegel-Logik-Tabelle entsprechend aktualisiert (K21 in ❌/✅-Zeilen ergänzt). Auf Wunsch von Michaela.*
*Änderungshistorie v1.8: K20 ergänzt (Sprach-Toggle Deutsch/Englisch, Abschnitt A, Muss-Kriterium) — jedes Tool muss ab sofort einen vollständigen DE/EN-Umschalter für alle sichtbaren Texte inkl. aller vier Footer-Boxen bieten, ohne Reload und ohne externen Übersetzungsdienst. Siegel-Logik-Tabelle entsprechend aktualisiert (K20 in ❌/✅-Zeilen ergänzt).*
*Version 1.7 — Juli 2026. Änderungshistorie v1.7: K19 (Systemprompt-Box) von Kann- zu Muss-Kriterium hochgestuft und von Abschnitt C nach Abschnitt A verschoben — die Box muss jetzt immer den vollständigen, wiederverwendbaren Master-Bau-Prompt enthalten (Struktur/Inhalt/Design/Nicht-tun), nicht mehr nur einen minimalen Rahmensatz. Siegel-Logik-Tabelle entsprechend aktualisiert (K19 aus der ⭐-Zeile in die ✅-Zeile verschoben). Korrespondiert mit Master-Prompt v6.*
*Änderungshistorie v1.6: K17 ergänzt (Aktualität referenzierter Normen/Frameworks, Abschnitt B, Muss-Kriterium); K18 ergänzt (Beamer-Modus-Toggle, vierstufig, Abschnitt A, Muss-Kriterium — löst eine Kollision auf, bei der eine lokale Master-Prompt-Version den Beamer-Toggle fälschlich „K15" nannte); K19 ergänzt (Systemprompt-Box vermittelt Nachbau-Prompt-Idee, Abschnitt C, Kann-Kriterium); Siegel-Logik-Tabelle korrigiert — K16 fehlte bisher in der ⭐-Zeile trotz Kann-Kriterium-Status, jetzt inkl. K16 und K19.*
*Frühere Historie: Version 1.4 — seit Ersterstellung auf Version 1.0 (kein Statuszusatz bei K8, kein Abschnitt D, keine K13/K14) — v1.1 (K8-Statuspflicht bei Regulatorik), v1.2 (Abschnitt D ISO/IEC 25010), v1.3/1.4 (K13 Vortrags-Skript-Box, K14 Audit-Status-Zeile), v1.5 (K15 Erreichbarkeit nicht-live-relevanter Inhalte, K5-Prüfmethode verschärft, K4-Prüfmethode um `color-scheme: light` ergänzt, Abschnitt-D-Terminologie auf ISO/IEC 25010:2023 korrigiert).*
