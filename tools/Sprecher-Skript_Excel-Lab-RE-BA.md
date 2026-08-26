# Sprecher-Skript · Excel Lab für Requirements Engineering & Business Analyse

*(Vor Beginn den Modus auf „Workshop" stellen und den Beamer-Modus mindestens auf Stufe 1 setzen. Nicht mit der Formel-Syntax einsteigen — erst den RE/BA-Anwendungsfall erzählen, dann die Formel zeigen.)*

## 🔎 Lookup & Reference

*(Divider-Folie zeigen.)*
„Traceability ist die Königsdisziplin im RE — VLOOKUP & Co. sind ihr Excel-Rückgrat."

1. **VLOOKUP.** *(Dropdown wechseln, Ergebnis zeigen lassen.)*
   „Ich habe hier meine Anforderungsliste. Ich wähle eine ID — und VLOOKUP holt mir automatisch den Titel dazu. Genau das macht ihr jeden Tag in der Traceability-Matrix, nur meist per Hand."

2. **HLOOKUP.** *(Prioritätsstufe wechseln, Punktwert zeigen.)*
   „VLOOKUP kennt ihr — aber manchmal liegen Daten nicht untereinander, sondern nebeneinander, wie hier unsere MoSCoW-Bewertungstabelle. Dafür gibt es HLOOKUP."

3. **INDEX + MATCH.** *(ID UND Attribut wechseln.)*
   „Jetzt wird es flexibler: INDEX und MATCH zusammen können, was VLOOKUP nicht kann — auch nach links suchen und jede beliebige Spalte zurückgeben."

4. **XLOOKUP.** *(Titel wählen, Fallback demonstrieren.)*
   „Wer neueres Excel hat: XLOOKUP ist der moderne Nachfolger von VLOOKUP — sucht in beide Richtungen und hat einen eingebauten Fallback-Text, kein #NV mehr."

Übergang: „Traceability ist die eine Hälfte — die andere ist: Wann ist eine Anforderung eigentlich erfüllt? Dafür brauchen wir Logik."

## ⚖️ Logische Funktionen

*(Divider-Folie zeigen.)*
„Jedes Akzeptanzkriterium ist am Ende eine WENN-Bedingung."

5. **IF.** *(Anforderung wechseln.)*
   „Die einfachste und wichtigste logische Funktion: WENN. Ist das Akzeptanzkriterium erfüllt — ja oder nein? Ein Klick, eine klare Aussage."

6. **IFS.** *(Anforderung durchklicken.)*
   „Mit IFS baue ich mir eine Ampel ohne verschachtelte WENNs — vier Status, vier Farben, eine Formel."

7. **AND (UND).** *(Anforderung wechseln, Ergebnis beobachten.)*
   „Manchmal reicht eine Bedingung nicht. UND sagt mir: nur wenn beide Bedingungen gleichzeitig stimmen, ist die Anforderung wirklich review-bereit."

8. **IFERROR.** *(Ungültige ID eingeben.)*
   „Was passiert, wenn ich eine ID eingebe, die es gar nicht gibt? Ohne IFERROR: hässlicher #NV-Fehler. Mit IFERROR: eine verständliche Meldung."

Übergang: „Bevor wir zählen und rechnen können, müssen unsere Daten überhaupt sauber sein — das ist Textarbeit."

## ✂️ Text-Funktionen

*(Divider-Folie zeigen.)*
„Saubere Stakeholder-Daten entstehen selten sauber — sie werden sauber gemacht."

9. **TEXTJOIN.** *(Anforderung wechseln.)*
   „Für die Sprint-Review-Agenda baue ich mir aus mehreren Zellen einen lesbaren Satz — TEXTJOIN mit einem Trennzeichen meiner Wahl."

10. **LEFT / MID / RIGHT.** *(ID wechseln.)*
    „Unsere Anforderungs-IDs folgen einem festen Muster. Mit LINKS, TEIL und RECHTS zerlege ich sie in ihre Bestandteile — praktisch für automatische Prüfungen."

11. **TRIM + PROPER (GLÄTTEN + GROSS2).** *(Rohtext eintippen lassen.)*
    „Interview-Notizen sind selten sauber. GLÄTTEN entfernt überflüssige Leerzeichen, GROSS2 sorgt für einheitliche Schreibweise."

12. **SUBSTITUTE (WECHSELN).** *(Stakeholder wechseln.)*
    „Meine Lastenheft-Vorlage hat Platzhalter in eckigen Klammern. WECHSELN ersetzt sie automatisch durch den echten Stakeholder-Namen."

Übergang: „Jetzt haben wir saubere Daten — Zeit, sie für das Reporting an die Geschäftsführung auszuwerten."

## 📊 Statistik-Funktionen

*(Divider-Folie zeigen.)*
„Ohne Zählen und Summieren kein Status-Reporting an die Geschäftsführung."

13. **COUNTIF (ZÄHLENWENN).** *(Statusfilter wechseln.)*
    „Wie viele Anforderungen sind gerade offen? ZÄHLENWENN mit einer Bedingung — fertig."

14. **COUNTIFS (ZÄHLENWENNS).** *(Kombination durchspielen.)*
    „Jetzt zwei Bedingungen gleichzeitig: Wie viele MUSS-Anforderungen sind NICHT erledigt? Das braucht ZÄHLENWENNS."

15. **SUMIF (SUMMEWENN).** *(Person wechseln.)*
    „Wie viele Personentage sind schon verplant — pro Person? SUMMEWENN summiert nur die passenden Zeilen."

16. **AVERAGEIFS (MITTELWERTWENNS).** *(MoSCoW-Stufe wechseln.)*
    „Für neue Schätzungen nehme ich den Durchschnittsaufwand vergleichbarer, bereits bewerteter Anforderungen als Referenz — MITTELWERTWENNS macht das automatisch."

Übergang: „Zahlen ohne Termine sind nur die halbe Wahrheit — weiter zur Terminplanung."

## 📅 Datum & Zeit

*(Divider-Folie zeigen.)*
„Terminplanung ist nie Kalendertage — immer Arbeitstage."

17. **TODAY (HEUTE).** *(Deadline wechseln.)*
    „HEUTE() ist eine flüchtige Funktion — sie aktualisiert sich bei jeder Neuberechnung. Kombiniert mit einer Subtraktion sehe ich sofort: wie viele Tage bleiben noch?"

18. **NETWORKDAYS (NETTOARBEITSTAGE).** *(Deadline wechseln.)*
    „Für die Kapazitätsplanung zählen nicht Kalendertage, sondern Arbeitstage. NETTOARBEITSTAGE zieht Wochenenden und unsere Feiertagsliste automatisch ab."

19. **WORKDAY (ARBEITSTAG).** *(Aufwand ändern.)*
    „Umgekehrter Fall: Ich kenne den Aufwand in Personentagen und will wissen, an welchem Datum ich realistisch fertig bin. ARBEITSTAG rechnet Wochenenden und Feiertage weg."

20. **DATEDIF.** *(Anforderung wechseln.)*
    „Wie lange lief eine Anforderung tatsächlich? DATEDIF rechnet mir die Differenz zwischen Start und Deadline in Tagen — oder normalisiert in Monaten und Tagen."

Übergang: „Und zum Schluss: Wie bringen wir das alles in eine Reihenfolge fürs Backlog?"

## 🧮 Priorisierung & Filter

*(Divider-Folie zeigen.)*
„MoSCoW ist nur so gut wie die Formel, die daraus einen Sprint-Plan macht."

21. **ROUND (RUNDEN).** *(Wert eintippen.)*
    „Aus dem Planning Poker kommen krumme Zahlen. RUNDEN glättet auf realistische halbe Personentage."

22. **RANK (RANG).** *(Sortierkriterium wechseln.)*
    „Für die Backlog-Reihenfolge lasse ich mir alle Anforderungen nach Aufwand ranken — RANG gibt mir sofort die Platzierung."

23. **UNIQUE (EINDEUTIG).**
    „Wer sitzt eigentlich alles im Review? EINDEUTIG filtert Duplikate aus der Stakeholder-Spalte automatisch heraus — eine Formel statt manueller Bereinigung."

24. **FILTER.** *(Bedingungen an-/abwählen.)*
    „Und zum Schluss die wohl mächtigste neue Funktion: FILTER zeigt mir live nur die Zeilen, die meine Bedingungen erfüllen — hier: MUSS und noch OFFEN, meine Sprint-Kandidaten."

---

**Allgemeine Regie-Hinweise:** Nicht mit einer Funktionsliste schließen, sondern mit der Kernbotschaft: „Ihr müsst nicht alle 101 Funktionen können — diese 24 lösen 80 % eurer RE/BA-Excel-Alltagsfragen." Am Ende jeder Kategorie kurz zusammenfassen, dann erst „Weiter" klicken — die nächste Formel nicht vorab ankündigen, das nimmt die Spannung. Timing: ca. 20–25 Minuten für den vollständigen Durchlauf aller 24 Funktionen plus sechs Kategorie-Folien; bei knapperer Zeit eine Kategorie (z. B. Text-Funktionen) als Selbststudium auslagern statt jede Funktion zu kürzen. Bei Beamer-Projektion über 8 m Entfernung vorab auf „Beamer XL" schalten.
