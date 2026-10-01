# Konzept · Störfall-Labor „Störung im Betriebsablauf“

Stand: 01.10.2026 · Status: **umgesetzt** in `tools/stoerfall-labor.html` (Entscheidungen: Name ja, drei Störfälle, Protokoll zum Herunterladen, Best-Practice-Leitfaden statt Praxisfall)

## 1. Warum dieses Tool

Der Denkraum-Fahrplan zeigt: Im 🚨 Störraum („Was verändert sich“) haben die Fäden **RE, BA und Agil/PM keine einzige Haltestelle**. Sieben von acht Haufe-Seminaren enden deshalb mit der Umsetzung, obwohl Änderungen in ihren Inhalten ausdrücklich vorkommen, etwa „Anforderungen managen“ (31693, Modul 5) und „Business Change“ (34002).

Das Störfall-Labor schließt alle drei Lücken mit einem Tool und wird damit zum Umsteigepunkt zwischen RE, BA und PM. Bestand geprüft: Änderungsmanagement, Change Request und Lösungsbewertung kommen bisher nur als Erwähnung in Kompendien und Lernreisen vor, nicht als interaktive Übung.

**Kernbotschaft für Teilnehmende:** Eine Störung ist kein Versagen der früheren Räume, sondern der Moment, in dem sich eine Annahme als falsch herausstellt. Wer weiß, *in welchem Raum* die Annahme entstanden ist, weiß, wohin er zurückgehen muss.

**Bezug zum Fahrplan:** Der Name greift die U-Bahn-Metapher auf. Auf der Linie gibt es eine „Störung im Betriebsablauf“, und das Team muss entscheiden, ob es umleitet, wartet oder die Strecke neu plant.

## 2. Aufbau: drei Störfälle, sechs Stationen

Oben im Tool wird einer von drei Störfällen gewählt. Jeder nutzt eine bestehende Fallwelt, damit nichts Neues erfunden werden muss.

| Störfall | Fallwelt | Was passiert | Welche Annahme kippt | Schwerpunkt |
|---|---|---|---|---|
| **A · Der Test drei Wochen vor Go-live** | Hochschule Nordwest (klassisch, Verwaltung, keine KI) | Ein externer Barrierefreiheitstest zeigt: Das Widerspruchsformular der E-Akte ist mit Screenreader nicht bedienbar. | „Das Standard-Formularmodul des Herstellers ist barrierefrei.“ (aus dem Lösungsraum) | RE |
| **B · Das Gate sagt Nein** | NovaTrade Pulse (agil, Scrum, reguliert) | Das MiFID-II-Gate stoppt das Release: Bei der neuen Sparplan-Variante entfällt die Geeignetheitsprüfung vor dem Erstkauf. | „Der Sparplan ist nur eine Variante des Einzelkaufs.“ (aus dem Analyseraum) | PM / Agil |
| **C · Der Score kippt im Pilot** | Vantera / TalentMatch AI (Hochrisiko-KI) | Im Pilotbetrieb verschiebt sich die Score-Verteilung zulasten einer Bewerbergruppe. | „Historische Daten sind neutral.“ (aus dem Lösungsraum, wie im Denkräume-Navigator) | BA, mit KI-Bezug |

Die **sechs Stationen** sind für alle drei Störfälle gleich. Sie folgen den fünf Störraum-Fragen aus dem Denkräume-Navigator (Stakeholder, Constraint, Outcome, Priorität, Evidenz) und ergänzen einen Abschluss:

| # | Station | Leitfrage | Was die Teilnehmenden tun |
|---|---|---|---|
| 1 | **Signal** | Woran erkennt man eine echte Störung statt bloßem Rauschen? *(Evidenz)* | Drei Meldungen bewerten: echte Störung, Rauschen oder unklar. Nur eine ist die echte Störung. |
| 2 | **Betroffene** | Wer merkt es zuerst, wer trägt die Folgen? *(Stakeholder)* | Die festen Personas (Ela, Knut, Sarah, Petra, Herr Bachmeier) reagieren mit je einem Zitat. Aufgabe: einordnen, wer informiert, wer gefragt und wer entscheiden muss. |
| 3 | **Die falsche Annahme** | Welche Annahme aus einem früheren Raum war falsch? *(Constraint)* | Aus vier Annahmen die gekippte wählen und dem Raum zuordnen, in dem sie entstanden ist. Ein Mini-Fahrplan zeigt den Rücksprung. |
| 4 | **Auswirkung, dreifach** | Was ändert sich am angestrebten Ergebnis? *(Outcome)* | Drei Linsen zum Umschalten: **RE**: welche Anforderungen betroffen sind (Traceability, Baseline). **BA**: ob der Business Case noch trägt (Lösungsbewertung). **PM**: Termin, Budget, Risiko. |
| 5 | **Entscheiden** | Muss neu priorisiert werden, und was fällt raus? *(Priorität)* | Einen Change Request vervollständigen und eine Entscheidung treffen: annehmen, ablehnen oder zurückstellen. Jede Option hat begründete Folgen. |
| 6 | **Lernen** | Was nehmen wir in den nächsten Durchlauf mit? | Kurze Retrospektive: Welche Schleuse hätte die Störung früher gefangen? Der Zyklus schließt sich zurück zum 💡 Möglichkeitsraum. |

**Ergebnis zum Mitnehmen:** ein ausgefülltes **Störfall-Protokoll** (Signal, Betroffene, Annahme, Auswirkung, Change Request, Entscheidung, Lesson Learned), druckbar und als Text kopierbar.

## 3. Didaktik und Einsatz

- **Übungsform:** Einzelfrage-Stepper, Lösung erst nach der Auswahl, mit Begründung für jede Option, auch für die falschen. Die Position der richtigen Antwort wechselt.
- **Dauer:** volle Fassung ca. 45 bis 60 Minuten als Gruppenarbeit mit einem Störfall. Kurzfassung ca. 15 Minuten nur mit den Stationen 1, 3 und 5, z. B. als Abschluss eines Seminartags.
- **Live oder Gruppe:** Vorne im Beamer-Modus moderiert, oder Kleingruppen mit je einem anderen Störfall, die sich am Ende vergleichen: „Gleiche Stationen, ganz andere Entscheidung.“
- **Zielgruppe:** Teilnehmende ohne Vorwissen zu Änderungsmanagement. Fachbegriffe werden beim ersten Auftreten erklärt; eine Glossar-Box im Footer ist sinnvoll.

## 4. Normen und Frameworks (vor dem Bau gegen Primärquellen prüfen, K17)

| Quelle | Bezug im Tool |
|---|---|
| IREB CPRE Foundation Level | Anforderungsmanagement: Versionen, Baselines, Änderungsmanagement, Traceability (Station 4 RE, Station 5) |
| BABOK® Guide v3 | Requirements Life Cycle Management (Änderungen bewerten); Solution Evaluation (Station 4 BA) |
| PMBOK® Guide, aktuelle Ausgabe | Änderungen, Risiko, Stakeholder (Station 4 PM, Station 5) |
| ISO/IEC/IEEE 29148 | Eigenschaften guter Anforderungen nach einer Änderung (Station 4 RE) |
| BITV 2.0 / EN 301 549 | nur Störfall A |
| MiFID II / WpHG | nur Störfall B (Geeignetheitsprüfung) |
| EU AI Act | nur Störfall C (Hochrisiko, Überwachung nach dem Inverkehrbringen) |

## 5. Bau-Rahmen

- Einzeldatei `tools/stoerfall-labor.html`, offline lauffähig
- Topbar mit Zurück-Link, Signatur und vierstufigem Beamer-Modus
- Vier Footer-Boxen (Systemprompt, Handbuch, Vortrags-Skript, Normen-Register), dazu `Sprecher-Skript_Stoerfall-Labor.md`
- **Eigene Farbwelt:** „Leitstand“ mit Warnorange und Signalrot auf ruhigem Grau, passend zum Störraum und unterscheidbar von den anderen Tools
- **Register-Eintrag:** `denkraum: stoer`, `faeden: re, ba, pm` (Störfall C zusätzlich KI), `zweck: Übung, Workshop-Canvas`
- **Kacheln auf den Seminarseiten:**
  - 31693 (Modul 5)
  - 9368 (Block „Prüfen, priorisieren, verwalten“)
  - 34000 (Spielregeln, Leitplanken, Showstopper)
  - 3525
  - 2929 (Methodenmix)
  - 34002 (Business Change)
  - 3744 (Business Case)
- **Startseite:** Kachel in der Rubrik „Requirements & Business-Analyse“
- **Fahrplan:** schließt die 🚨-Lücke auf drei Fäden; der Fahrplan zeigt das automatisch

## 6. Nicht tun

- Keine neue Fallwelt und keine neuen Personas erfinden
- Störungen nicht als Schuldfrage inszenieren; Ziel ist Rücksprung und Lernen, nicht Fehlersuche bei Personen
- Kein Change-Management-Lehrbuch: höchstens ein Absatz Theorie pro Station, der Rest ist Handeln am Fall
- Keine Rechtsberatung zu BITV, MiFID II oder EU AI Act, nur der Bezug, der im Fall gebraucht wird

## 7. Offene Fragen an Michaela

1. **Name:** „Störfall-Labor · Störung im Betriebsablauf“ oder lieber etwas anderes?
2. **Drei Störfälle** zum Umschalten, oder für den Anfang nur einer? Empfehlung: alle drei. Gleiche Stationen mit unterschiedlichen Fällen sind die eigentliche Lernerfahrung.
3. **Störfall-Protokoll** nur zum Drucken und Kopieren, oder auch als Datei zum Herunterladen?
4. Gibt es einen **echten Störfall aus Ihrer Praxis**, den Sie lieber anonymisiert einbauen würden? Echte Fälle wirken im Seminar stärker als konstruierte.
