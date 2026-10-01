# Sprecher-Skript: Guardrails × Governance × Assurance

Companion-Datei zu `tools/guardrails-governance-assurance.html` (K16). Quelle ist die Footer-Box „Vortrags-Skript“ im Tool; bei Abweichungen gilt die Footer-Box.

## 09:00–09:30 · Einstieg und Landkarte

**Klick:** *(Pille „Einstieg“ → Kernthese lesen lassen → drei Ebenen einblenden (Vertiefung: kurz).)*

**Sprechtext:** Ein KI-System fällt selten an der Stelle aus, an der wir gesucht haben. Deshalb ordnen wir den Tag entlang einer Kette: Risiko, Anforderung, Kontrolle, Nachweis. Drei Ebenen tragen sie: Governance entscheidet, Guardrails erzwingen, Assurance belegt. Heute bauen wir die Kette für einen echten Fall: TalentMatch AI bei Vantera Systemtechnik.

**Übergang:** Bevor wir Maßnahmen bauen, schauen wir, was schiefgehen kann – anhand von sieben Vorfällen.

**Regie:** Beamer-Stufe 1 einschalten, sobald der Raum voll ist. Personas kurz vorstellen (Ela, Knut, Sarah, Petra, Herr Bachmeier).

**Stille-Anker:** „Was von diesen drei Ebenen fehlt in eurer Organisation am ehesten – und woran merkt man das?“

## 09:30–10:30 · Block 1 · Bedrohungsmodell (OWASP, MITRE ATLAS)

**Klick:** *(Tabellen LLM/ASI zeigen → Übung 1 Vorfall für Vorfall anklicken lassen → Lösung erst nach Gruppenabstimmung.)*

**Sprechtext:** Die OWASP-Listen geben uns eine gemeinsame Sprache. Wichtig: Sie sind Risikokataloge, keine Anforderungen. Ein Vorfall wird erst zur Anforderung, wenn wir ihn auf unser System beziehen. Ordnet jetzt die sieben Vorfälle zu.

**Übergang:** Wir haben Risiken benannt. Jetzt die Frage: Wo im Datenweg setzen wir an?

**Regie:** Bei Streit über die Zuordnung nicht auflösen, sondern die Begründung einfordern; mehrere Antworten können vertretbar sein (gelbe Rückmeldung).

**Stille-Anker:** „Welcher dieser Vorfälle hätte bei uns am längsten unbemerkt bleiben können?“

## 10:45–12:00 · Block 2 · Guardrails: sieben Kategorien

**Klick:** *(Defense in Depth zeigen → Kategorie-Explorer durchklicken → Übung 2 (Vorfall → Kategorie) → Übung 3 (hart/weich).)*

**Sprechtext:** Sieben Kategorien entlang der Verarbeitungskette. Der wichtigste Unterschied steckt quer dazu: hart erzwungen oder nur wahrscheinlich wirksam. Ein Prompt, der „bitte nicht“ sagt, ist ein weiches Guardrail. Ein Berechtigungsfilter im Code ist ein hartes.

**Übergang:** Nach Pause und Mittag: Wer entscheidet, was erlaubt ist – und wer haftet?

**Regie:** Kategorie-Explorer live nutzen, nicht vorlesen. Bei Übung 3 Zweiergruppen bilden lassen.

**Stille-Anker:** „Welche eurer heutigen Maßnahmen wäre nach eurer Einschätzung nur weich – und wer weiß das außer euch?“

## ca. 20 Min. am Ende von Block 2 · Block 2b · Guardrails der Anbieter im Vergleich

**Klick:** *(Drei-Ringe-Bild zeigen → Vergleichstabelle Zeile für Zeile → Zuordnung zu den sieben Kategorien → Selbstauskunft von Claude → Übung 7 mit Weiter.)*

**Sprechtext:** Ein Teil des Schutzes steckt im Modell, ein anderer sitzt drumherum. Bei offenen Gewichten fehlt das Drumherum von Haus aus. Schaut auf drei Dinge: wo der Filter im Datenweg sitzt, was er nicht sieht und wer die Schwelle gesetzt hat. Alle Angaben stammen aus öffentlichen Anbieter-Dokumenten mit Stand 01.10.2026; die Wirksamkeit haben wir nicht geprüft.

**Übergang:** Nach Pause und Mittag: Wer entscheidet, was erlaubt ist – und wer haftet?

**Regie:** Nicht jede Zeile vorlesen; zwei Anbieter wählen, die das Publikum nutzt. Die Selbstauskunft von Claude ausdrücklich als solche kennzeichnen, keine Anbieterquelle.

**Stille-Anker:** „Wer in eurem Haus hat zuletzt in die Konfiguration des Anbieterfilters geschaut?“

## 13:00–14:00 · Block 3 · Governance

**Klick:** *(Inventar → Risikoklassen-Tabelle → RACI → Aufsichts-Routing → Übung 4.)*

**Sprechtext:** Governance beantwortet drei Fragen: Was haben wir, wie riskant ist es, wer entscheidet. Ohne Inventar keine Risikoklasse, ohne Risikoklasse keine Pflicht. TalentMatch ist Annex III Nr. 4, also Hochrisiko. Die Fristen haben sich durch das Digital Omnibus verschoben; prüft den Stand vor jedem Einsatz.

**Übergang:** Governance legt fest, was gelten soll. Jetzt: woran sehen wir, dass es gilt?

**Regie:** Rechtsstand mit Datum 30.09.2026 nennen; keine Rechtsberatung, das ausdrücklich sagen.

**Stille-Anker:** „Wer in eurer Organisation darf ein KI-System abschalten – und wann wurde das geübt?“

## 14:00–15:00 · Block 4 · Assurance

**Klick:** *(Schutzziele-Tabelle → Kennzahlen → Vorfallschritte → Übung 5 (acht Aussagen).)*

**Sprechtext:** Assurance ist der Beleg, dass Kontrollen wirken. Ein Test, der nie fehlschlägt, ist kein guter Test. Gute Kennzahlen haben eine Schwelle und eine Konsequenz.

**Übergang:** Jetzt verbinden wir alles zu einer Kette.

**Regie:** Übung 5 zügig, als Warm-up für die Werkstatt.

**Stille-Anker:** „Welche Kennzahl würdet ihr am Montag als erste erheben – und wer reagiert, wenn sie kippt?“

## 15:15–16:15 · Block 5 · Traceability-Werkstatt

**Klick:** *(Vorlage zeigen → Übung 6 (neun Fragen zu drei Ketten) mit Weiter durchgehen → Gruppen füllen eine eigene Kette aus.)*

**Sprechtext:** Risiko, Anforderung, Kontrolle, Nachweis. Wenn ein Glied fehlt, ist die Kette nicht tragfähig. Die Anforderung beschreibt das Problem, nicht die Lösung; wo eine Norm ein Mittel vorschreibt, steht das Abzeichen „Norm schreibt Mittel vor“.

**Übergang:** Zum Abschluss: fünf Fragen für Montag.

**Regie:** Gruppenarbeit ca. 20 Minuten, dann zwei Ergebnisse im Plenum. Ergebnis ist eine vollständige Kette pro Gruppe.

**Stille-Anker:** „Welches Glied eurer Kette wäre bei einem Audit morgen das schwächste?“

## 16:15–16:45 · Abschluss · Transfer

**Klick:** *(Montagsfragen zeigen; jede Person wählt eine.)*

**Sprechtext:** Fangt klein an: ein System, ein Risiko, eine vollständige Kette. Ein Datum, ein Owner.

**Übergang:** Fragen, Feedback, Kontakt.

**Regie:** Beamer-Stufe zurück auf aus; Quellen im Nachgang bereitstellen.

**Stille-Anker:** „Was macht ihr am Montag als Erstes – mit Datum und Owner?“
