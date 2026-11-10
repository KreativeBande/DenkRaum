# Sprecher-Skript: Requirements-to-Code Explorer

Companion-Datei zur Footer-Box „Vortrags-Skript“ in `tools/requirements-to-code-explorer.html`. Bei Abweichung gilt die Footer-Box. Stand: 10.11.2026.

## Stufe 1 · Ausgangsanforderung
*(Stufe 1 zeigen, Rohsatz vorlesen)*

„So erreichen uns viele Anforderungen: Das System soll Dokumente hochladen können. Alle nicken. Und trotzdem weiß niemand, was genau gebaut werden soll. Was fehlt hier noch?“

Übergang: „Bevor wir präzisieren, fragen wir, wer das überhaupt braucht.“

## Stufe 2 · Stakeholder und Kontext
*(Weiter klicken, auf die drei Karten zeigen, dann auf den Kontextsatz)*

„Wer, wozu, wann. Mit diesen drei Fragen bekommt der Satz eine Person, einen Zweck und eine Situation. Achten Sie auf das Ende: damit das Team mit der aktuellen Fassung arbeiten kann. Das ist der Nutzen, den wir später messen.“

Übergang: „Jetzt schreiben wir auf, was das System tun muss.“

## Stufe 3 · Funktionale Anforderung
*(FA-01 zeigen, danach die vier Ablaufkästen)*

„FA-01 beschreibt Verhalten, keine Technik. Kein Wort über Server oder Datenbanken. Auswählen, prüfen, übertragen, bereitstellen: Das ist von außen beobachtbar.“

Übergang: „Was heißt hier gut? Dafür setzen wir neun Brillen auf.“

## Stufe 4 · ISO/IEC 25010
*(Zwei bis drei Merkmale aufklappen, Gruppe wählen lassen, welche)*

„Die Norm gibt uns keine Anforderungen, sie gibt uns Fragen. Welche dieser neun hätten Sie vergessen? Meist ist es die Betriebssicherheit: Ein Upload darf keine bestehende Fassung überschreiben.“

Übergang: „Die Sicherheit verdient einen genaueren Blick.“

## Stufe 5 · ISO/IEC 27001
*(Kette von links nach rechts lesen, dann die vier SEC-Karten)*

„Sicherheitsanforderungen entstehen aus Risiken, nicht aus dem Bauchgefühl. Das Etikett unter jeder Karte zeigt die Maßnahme im Anhang A. Bei SEC-03 schreibt die Norm das Mittel selbst vor, deshalb sagen wir das offen.“

Übergang: „Jetzt legen wir alles zusammen.“

## Stufe 6 · Gesamtanforderung
*(Durch die Karten scrollen, auf die Kennungen zeigen)*

„Sieben Kennungen, jede mit einer Zahl, die man prüfen kann: 20 MB, 5 Sekunden, 50 gleichzeitige Uploads. Merken Sie sich diese Kennungen, wir begegnen ihnen im Code wieder.“

Übergang: „Woran merken wir, dass es fertig ist?“

## Stufe 7 · Akzeptanzkriterien
*(Szenario 1 laut vorlesen, danach Szenario 2)*

„Angenommen, wenn, dann. Die Fachseite kann das lesen, der Test kann es automatisieren. Das zweite Szenario ist das wichtigere: Es zeigt, was nicht passieren darf.“

Übergang: „Was macht die Entwicklung damit?“

## Stufe 8 · Entwicklerübergabe
*(Vier Karten zeigen, dann Entscheidung 1 von der Gruppe beantworten lassen)*

„Erst hier taucht Technik auf: Quarantäne, Hashprüfung, Virenscanner. Das sind Entscheidungen des Teams, nicht der Anforderung. Welche Prüfung muss auf dem Server stattfinden?“

Übergang: „Jetzt schauen wir in den Code.“

## Stufe 9 · Code und Traceability
*(Tabs HTML, JavaScript, Python durchschalten, danach die Traceability-Tabelle zeigen)*

„Jede Zeile hat eine Farbe und ein Kürzel. Verfolgen Sie mit mir SEC-03: Karte in Stufe 5, Zeile scan_for_malware(), Test mit der EICAR-Datei. Das ist Traceability: vom Satz bis zum Nachweis.“

Übergang: Verweis auf die RE-Waschmaschine für eigene Anforderungen.

## Regie-Hinweise

Voller Durchlauf etwa 30 Minuten, Kurzfassung (Stufen 1, 6, 9) etwa 10 Minuten. Nicht mit den Normen beginnen, sondern mit dem Rohsatz, und die Gruppe die Lücken finden lassen. Den Code nicht zuerst zeigen; er wirkt erst, wenn die Kennungen aus Stufe 6 bekannt sind. Der Beamer-Button vergrößert in drei Stufen; ab Stufe XL stehen die Stufen über dem Inhalt.
