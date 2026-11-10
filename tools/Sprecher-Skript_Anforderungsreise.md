# Sprecher-Skript: Anforderungs-Reise durch die Räume (Lindenfeld Lunch)

Companion-Datei zu `tools/anforderungsreise.html` (K16). Bei Abweichung gilt die Footer-Box „Vortrags-Skript“ im Tool.

## Schritt 1

*(Klick: Tool öffnen, Startansicht.)*

„Wir bleiben bei Lindenfeld Lunch. Die Cafeteria ist voll, wer mittags hingeht, ist 65 Minuten unterwegs, und ein Drittel des Essens landet im Müll. Heute verfolgen wir eine einzige Anforderung, vom ersten Satz eines Gastes bis zum Testfall.“

Übergang: „Ich nehme einen Wunsch, den wir alle kennen.“

## Schritt 2

*(Klick: Beispiel „Lieferung ins Büro“ laden, Horizontraum.)*

„Ein Gast sagt: Ich will mir das Essen ins Büro liefern lassen. Das ist noch eine Lösung, kein Problem. Wichtig ist die Frage darunter: Auf welches Ziel zahlt das ein? Hier GZ-3, die Mittagspause soll von 65 auf höchstens 50 Minuten sinken.“

Übergang: „Jetzt schauen wir, was wirklich dahintersteckt.“

## Schritt 3

*(Klick: Weiter in den Analyseraum.)*

„Das eigentliche Problem sind Anstehen und Laufwege. Und die Küche hat Grenzen: 60 Minuten Vorlauf, höchstens 24 Lieferungen je Zeitfenster. Diese Geschäftsregeln entscheiden später über unsere Testfälle.“

Übergang: „Wie lösen wir das?“

## Schritt 4

*(Klick: Weiter in den Lösungsraum.)*

„Zwei funktionale Anforderungen, zwei nicht-funktionale. Achtet auf die User Story unten: Sie entsteht aus Rolle, erster FA und Nutzen. Fehlt eines davon, bleibt sie leer.“

Übergang: „Woran merken wir, dass es funktioniert?“

## Schritt 5

*(Klick: Weiter in den Umsetzungsraum.)*

„Jetzt bekommt jede Anforderung eine Zahl: Vorlauf mindestens 60 Minuten, höchstens 24 Lieferungen, Bestellabschluss höchstens 3 Sekunden. Daraus entstehen die Given/When/Then-Sätze.“

Übergang: „Und wie prüfen wir das?“

## Schritt 6

*(Klick: Weiter in den Testraum.)*

„Bei Grenzen testen wir genau an der Grenze: 60 Minuten muss gehen, 59 nicht. Das ist der Grenzwerttest. Die Antwortzeit prüft ein Lasttest mit 210 gleichzeitigen Nutzenden.“

Übergang: „Schauen wir uns die ganze Reise an.“

## Schritt 7

*(Klick: Reise abschließen, Reise-Log.)*

„Von einem Satz an der Theke zu drei prüfbaren Testfällen. Jeder Testfall lässt sich bis zu GZ-3 zurückverfolgen. Jetzt seid ihr dran: Nehmt euch Allergene oder Lohnabzug vor, oder eine eigene Anforderung aus dem Fall.“

## Regie-Hinweise

Für die Vorführung etwa 15 Minuten einplanen, danach 20 Minuten Gruppenarbeit. Nicht mit den Testfällen anfangen: Die Gruppe soll selbst merken, dass Grenzwerte schon im Analyseraum als Geschäftsregeln auftauchen. Im Beamer-Modus wird das Layout einspaltig, die Leitfragen stehen dann über den Feldern.
