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
**Prüfmethode:** Für jede Persona-Aussage im Tool: Entspricht sie der etablierten Rolle (Ela = Projektleitung, Knut = Entwicklung, Sarah = Vertrieb, Petra = QM, Herr Bachmeier = Geschäftsführung)? Für jede Fachaussage: Konsistent mit dem Szenario-Rahmen (z. B. Marmorkuchen vs. Bürgeramt nicht vermischt)?
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

## Siegel-Logik

| Ergebnis | Bedingung |
|---|---|
| ❌ Nicht zertifiziert | Mindestens ein Muss-Kriterium (K1–K10, K15, K17, K18, K19) nicht bestanden |
| ✅ Zertifiziert | Alle Muss-Kriterien (K1–K10, K15, K17, K18, K19) bestanden |
| ⭐ Zertifiziert mit Auszeichnung | Alle Muss-Kriterien + alle Kann-Kriterien (K11–K14, K16) bestanden |

Jede Prüfung wird protokolliert als: **Tool → Datum → Kriterium → Ergebnis → Nachweis (Fundstelle/Messwert)**. Kein Kriterium gilt als „bestanden", ohne dass der konkrete Nachweis (Zeile, Messwert, Screenshot) dokumentiert ist — sonst ist es selbst wieder generisches Bla.

**Abschnitt D (ISO 25010) ist in jedem Prüfprotokoll Pflicht, unabhängig vom Siegel-Ergebnis.** Ein Protokoll ohne Abschnitt D ist unvollständig — auch wenn A–C vollständig bestanden wurden.

---

*Version 1.7 — Juli 2026 (Stand Notion, synchronisiert 30.07.2026). Änderungshistorie v1.7: K19 (Systemprompt-Box) von Kann- zu Muss-Kriterium hochgestuft und von Abschnitt C nach Abschnitt A verschoben — die Box muss jetzt immer den vollständigen, wiederverwendbaren Master-Bau-Prompt enthalten (Struktur/Inhalt/Design/Nicht-tun), nicht mehr nur einen minimalen Rahmensatz. Siegel-Logik-Tabelle entsprechend aktualisiert (K19 aus der ⭐-Zeile in die ✅-Zeile verschoben). Korrespondiert mit Master-Prompt v6.*
*Änderungshistorie v1.6: K17 ergänzt (Aktualität referenzierter Normen/Frameworks, Abschnitt B, Muss-Kriterium); K18 ergänzt (Beamer-Modus-Toggle, vierstufig, Abschnitt A, Muss-Kriterium — löst eine Kollision auf, bei der eine lokale Master-Prompt-Version den Beamer-Toggle fälschlich „K15" nannte); K19 ergänzt (Systemprompt-Box vermittelt Nachbau-Prompt-Idee, Abschnitt C, Kann-Kriterium); Siegel-Logik-Tabelle korrigiert — K16 fehlte bisher in der ⭐-Zeile trotz Kann-Kriterium-Status, jetzt inkl. K16 und K19.*
*Frühere Historie: Version 1.4 — seit Ersterstellung auf Version 1.0 (kein Statuszusatz bei K8, kein Abschnitt D, keine K13/K14) — v1.1 (K8-Statuspflicht bei Regulatorik), v1.2 (Abschnitt D ISO/IEC 25010), v1.3/1.4 (K13 Vortrags-Skript-Box, K14 Audit-Status-Zeile), v1.5 (K15 Erreichbarkeit nicht-live-relevanter Inhalte, K5-Prüfmethode verschärft, K4-Prüfmethode um `color-scheme: light` ergänzt, Abschnitt-D-Terminologie auf ISO/IEC 25010:2023 korrigiert).*
