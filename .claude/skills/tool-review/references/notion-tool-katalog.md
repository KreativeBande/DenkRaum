# Notion Tool-Katalog — Schema-Referenz

Data Source URL (für `notion-query-data-sources` und als `parent.data_source_id` bei
`notion-create-pages`, ohne das `collection://`-Präfix): `62d1feb5-d6ff-4c9c-815d-b74462e484f6`

Übergeordnete Datenbank: https://app.notion.com/p/5b5786fd6440416fb4c7a854eab42545

Stand: 18.07.2026. Bei Zweifel (z. B. neue Property, geänderte Select-Optionen) die Datenbank per
`notion-fetch` neu abrufen statt sich blind auf diese Tabelle zu verlassen — Notion-Schemata ändern
sich, diese Datei nicht automatisch mit.

## Properties

| Property | Typ | Hinweis |
|---|---|---|
| `Tool-Name` | title | Pflichtfeld, entspricht dem Tool-Titel |
| `Status` | select | `"Auditiert & zertifiziert"` \| `"In Arbeit"` \| `"Offene Punkte"` \| `"Geplant"` |
| `HTML-Datei` | text | Pfad relativ zum Repo-Root, z. B. `tools/requirements-to-code-explorer.html` |
| `Kurzbeschreibung` | text | 1–3 Sätze, was das Tool zeigt/tut |
| `Einsatzkontext` | multi_select | `"Workshop"` \| `"Seminar"` \| `"IT-Tage"` \| `"GPM-Konferenz"` \| `"Coaching"` |
| `Abgedeckte Standards` | multi_select | `"IREB"` \| `"IEEE 29148"` \| `"ISO 25010:2023"` \| `"ISO 27001:2022"` \| `"EU AI Act"` \| `"NIS2"` \| `"CADA"` \| `"EU-CSF"` \| `"BSI C3A"` \| `"BABOK"` \| `"PMBOK"` |
| `Version` | text | Frei, z. B. `"v1 (...)"`; hier kurz einordnen, woraus der Build entstanden ist |
| `Notizen` | text | Build-Kontext, PR-Link, Abgrenzung zu verwandten Einträgen |
| `Offene K-Kriterien` | text | z. B. `"K11 (Cross-Tool Hex-Konsistenz)"` — leer lassen, wenn nichts offen ist |
| `Sprecher-Skript` | checkbox | SQL-Werte `"__YES__"` / `"__NO__"` |
| `Letztes Audit` | date | SQL-Spalten: `date:Letztes Audit:start`, `date:Letztes Audit:end`, `date:Letztes Audit:is_datetime` (0 für reines Datum) |
| `Audit-Protokoll` | url | Optional, falls ein separates Audit-Dokument existiert |

## Beispiel: neuen Eintrag anlegen

```json
{
  "parent": {"type": "data_source_id", "data_source_id": "62d1feb5-d6ff-4c9c-815d-b74462e484f6"},
  "pages": [{
    "properties": {
      "Tool-Name": "…",
      "Status": "Auditiert & zertifiziert",
      "HTML-Datei": "tools/….html",
      "Kurzbeschreibung": "…",
      "Notizen": "… PR-Link …",
      "Sprecher-Skript": "__NO__",
      "date:Letztes Audit:start": "YYYY-MM-DD",
      "date:Letztes Audit:is_datetime": 0,
      "Abgedeckte Standards": ["ISO 25010:2023"],
      "Einsatzkontext": ["Workshop", "Seminar"]
    }
  }]
}
```

## Beispiel: nach ähnlichen/bestehenden Einträgen suchen

```sql
SELECT "Tool-Name", "Status", "HTML-Datei", "Version"
FROM "collection://62d1feb5-d6ff-4c9c-815d-b74462e484f6"
WHERE "Tool-Name" LIKE '%<Stichwort>%' OR "Version" LIKE '%<Stichwort>%'
```

Immer vor dem Anlegen eines neuen Eintrags kurz so suchen (Tool-Name-Stichworte, thematische
Nachbarschaft) — siehe SKILL.md Schritt 6 für den Umgang mit Grenzfällen.
