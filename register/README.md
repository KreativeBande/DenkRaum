# Tool-Register

`register/tools.js` ist die **führende Quelle** für alle Angaben *über* die DenkRaum-Tools: wofür ein Tool gedacht ist, in welchen Seminaren es vorkommt, welche Fallwelt und Normen es nutzt und wie der Siegel-Stand ist. Startseite, Seminarseiten und der Notion-Tool-Katalog sollen sich nach diesem Register richten, nicht umgekehrt.

Seiten binden die Datei mit Versionsnummer ein (`register/tools.js?v=JJJJ-MM-TT-n`, derzeit in `index.html` und `fahrplan.html`). **Nach jeder Änderung am Register die Nummer in beiden Seiten hochzählen**, sonst zeigen Browser bis zu 10 Minuten (GitHub-Pages-Cache) die alte Fassung, und Seiten, die neue Felder erwarten, bleiben leer.

Die Datei ist bewusst eine Skript-Datei (`window.DENKRAUM_REGISTER = {...}`) und kein `.json`: So kann eine HTML-Seite sie per `<script src>` laden, auch offline als `file://` (K1).

Erstbefüllung am 01.10.2026 automatisch aus `index.html`, `kurse/`, dem Notion-Tool-Katalog und den Tool-Dateien. Alle Einträge stehen deshalb auf `"geprueft": false`, bis Michaela sie bestätigt hat.

## Felder pro Tool

| Feld | Inhalt |
|---|---|
| `id` | Kurzname, aus dem Dateinamen abgeleitet |
| `datei` | Pfad relativ zum Repo-Root |
| `titel`, `kurz` | Titel und Kurzbeschreibung wie auf der Startseite |
| `rubrik`, `bereich` | Rubrik und Unterrubrik auf der Startseite (`null`, wenn nicht verlinkt) |
| `aufStartseite` | ob das Tool auf `index.html` verlinkt ist |
| `kurztitel` | kurzer Name für Fahrplan und Chips |
| `zweck` | 1–2 aus: `Opener`, `Demonstrator`, `Übung`, `Spiel`, `Workshop-Canvas`, `Lernreise`, `Nachschlagewerk`, `Prüfungsvorbereitung`, `Fallwelt-Referenz`, `Über mich` |
| `denkraum` | `moeglichkeit`, `analyse`, `loesung`, `umsetzung`, `stoer` (Navigator-Fassung), `rundreise` (führt durch alle Räume) oder `basislager` (Nachschlagen, Fallwelten, Prüfung) |
| (Listen) | `denkraeume` (mit `name_en`, `leitfrage_en`), `faeden` (mit `name_en`), `seminare` (mit `kurz`, `kurz_en`): englische Fassungen für den Sprachumschalter im Fahrplan |
| `faeden` | Linien im Fahrplan: `re`, `ba`, `ki`, `pm` (mehrere = Umsteigepunkt, leer = keinem Faden zugeordnet) |
| `dauer` | typische Einsatzdauer im Seminar, z. B. `"15 min"`, `"Ganztag"`, `null` = noch offen |
| `haufeSeminare` | Seminarnummern aus `kurse/`, in denen das Tool verlinkt ist |
| `einsatzkontext` | wie Notion: `Workshop`, `Seminar`, `IT-Tage`, `GPM-Konferenz`, `Coaching` |
| `fallwelten` | genutzte Fallwelten (Vantera / TalentMatch AI, Hochschule Nordwest, NovaTrade Pulse, Velaris Clearing, Marmorkuchen …) |
| `themen` | Themen-Schlagworte, über die Tools mit ähnlichem Inhalt gefunden werden |
| `standards` | abgedeckte Normen/Frameworks (Werteliste wie Notion) |
| `siegel` | `status`, `letztesAudit`, `auditZeileImTool` (Datum der K14-Zeile im Tool), `offen` (offene K-Kriterien) |
| `beamer` | `4-stufig`, `3-stufig (alt)` oder `eigenes Muster` |
| `sprecherSkript` | ob eine Companion-Datei existiert (laut Notion) |
| `verwandt` | Tools aus dem Crosslink-Block des Tools |
| `geprueft` | `true`, sobald Michaela den Eintrag bestätigt hat |
| `notiz` | freie Anmerkung |

## Pflege-Regeln

1. **Neues Tool:** Eintrag im Register anlegen, im selben Pull Request wie das Tool.
2. **Vor dem Bau eines neuen Tools:** im Register nach `themen`, `zweck` und `fallwelten` suchen und Michaela vorhandene Tools zum selben Thema nennen. Sie entscheidet, ob ein bestehendes Tool erweitert oder ein neues gebaut wird.
3. **Seminarseite geändert:** `haufeSeminare` der betroffenen Tools nachziehen.
4. **Audit:** `siegel` im Register aktualisieren; Notion wird danach aus dem Register befüllt.
5. Bei Widerspruch zwischen Register und Notion gilt das Register (Ausnahme: der Prüfkatalog K1–K21 selbst bleibt in Notion kanonisch).
