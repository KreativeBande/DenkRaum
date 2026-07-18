---
name: tool-review
description: >
  End-to-end workflow for reviewing, optimizing, or newly building a DenkRaum HTML training tool:
  apply the CLAUDE.md conventions, verify the result actually works, open a GitHub pull request
  (never merge it — that's the user's job), and once it's merged, update the Notion Tool-Katalog.
  Use this whenever Michaela asks to review, check, optimize, improve, or build a tool for the
  DenkRaum repo — phrases like "Tool X prüfen", "Tool optimieren", "neues Tool bauen", "schau dir
  dieses Tool an", "kannst du das verbessern" — or when she hands over an HTML file or pasted markup
  for a training tool, even if she doesn't mention GitHub, PR, or Notion explicitly. Publishing
  through those systems is part of what "fertig" means for a DenkRaum tool, not an optional extra.
---

# DenkRaum Tool-Review-Workflow

Dieser Skill bündelt den Ablauf, den Michaela für jedes Tool erwartet: prüfen/bauen → verifizieren →
auf GitHub zum Mergen bereitstellen → nach dem Merge Notion aktualisieren. Sie klickt den Merge-Button
selbst; alles davor und danach läuft eigenständig.

Repo-Konventionen (Back-Link, Signatur-Link, Beamer-Modus-Pattern, Anführungszeichen-Falle) stehen in
`CLAUDE.md` im Repo-Root — hier nicht duplizieren, dort nachschlagen.

## 0. Bevor es losgeht

- Repo: `KreativeBande/DenkRaum` (GitHub MCP-Tools, `owner=KreativeBande`, `repo=DenkRaum`).
- Branch: Falls die Session bereits einen designierten Branch vorgibt (steht dann im System-Prompt),
  darauf weiterarbeiten. Sonst einen sprechenden Branch anlegen (`claude/<kurz-slug>`), nie direkt auf
  `main` committen.
- Notion: Tool-Katalog-Datenbank, Data Source `collection://62d1feb5-d6ff-4c9c-815d-b74462e484f6`.
  Schema/Property-Optionen stehen in `references/notion-tool-katalog.md` — dort nachschlagen statt die
  Datenbank für jede Session neu zu fetchen (nur bei Zweifel/Schema-Änderung neu abrufen).

## 1. Review & Optimierung

Ob das Tool schon im Repo liegt oder frisch hochgeladen/eingefügt wurde: erst lesen, dann urteilen,
dann ändern.

- CLAUDE.md-Konventionen anwenden: Zurück-Link, Signatur-Link, Beamer-Modus (exaktes Zoom-Pattern aus
  CLAUDE.md, nicht die älteren klassenbasierten Varianten aus früheren Tools kopieren).
- Inhaltlich/strukturell mitdenken, nicht nur Konventionen abhaken — Michaela erwartet eine echte
  Einschätzung ("macht das Sinn, ist das noch optimierbar"), keine reine Checkliste.
- Kleine, eindeutige Verbesserungen einfach umsetzen. Bei architektonisch relevanten oder mehrdeutigen
  Entscheidungen (z. B. spürbarer Stilbruch, unklare Kategorie-Zuordnung, große Strukturänderung)
  vorher mit `AskUserQuestion` nachfragen statt zu raten — sie hat explizit gesagt, dass sie manche
  Entscheidungen selbst treffen will.
- **Anführungszeichen-Check ist Pflicht, kein Nice-to-have**: Vor jedem Commit alle `href`-Attribute auf
  gerade ASCII-Anführungszeichen prüfen (z. B. Python-Scan auf `chr(8216)/chr(8217)/chr(8220)/chr(8221)`
  in `href=...`-Werten). Dieser Bug ist im Repo mehrfach aufgetreten und bricht Links lautlos.

## 2. Verifikation vor "fertig"

Nicht behaupten, dass etwas funktioniert, ohne es gesehen zu haben. Ein schneller Playwright-Smoke-Test
reicht meist:

- Seite lädt ohne Konsolenfehler.
- Kern-Interaktionen greifen (Schritt-Navigation, Tab-Wechsel, Beamer-Toggle inkl. `data-beamer`-Attribut).
- Mobile-Breite (~390px) grob prüfen — dieses Repo hat wiederholt Footer/Layout-Probleme bei schmalen
  Viewports gehabt.
- Chromium liegt vor unter `/opt/pw-browsers/chromium` (`PLAYWRIGHT_BROWSERS_PATH` ist gesetzt) — nicht
  `playwright install` ausführen.

Screenshots aus dem Scratchpad sind ein guter Nachweis, den man auch Michaela zeigen kann, falls sie
mitentscheiden will (Schritt 1).

## 3. Branch + Commit: Tool und index.html zusammen

- Tool-Datei UND die `index.html`-Kachel **im selben Commit/PR** ändern, nie als Folge-PR. Neue Tools
  bekommen eine neue Kachel in der thematisch passenden Rubrik; bearbeitete Tools behalten ihre
  bestehende Kachel (nur Text/Beschreibung anpassen, falls sich das Tool inhaltlich verschoben hat).
- Commit-Message auf Deutsch oder Englisch, kurz, beschreibt das "Warum", nicht nur das "Was".
- Push mit `git push -u origin <branch>`.

## 4. Pull Request öffnen — nie mergen

- PR von `<branch>` nach `main` öffnen (oder bestehenden PR auf dem Branch aktualisieren, falls schon
  einer offen ist). PR-Template im Repo suchen (`.github/pull_request_template.md` o.ä.) und falls
  vorhanden als Gliederung nutzen; aktuell hat DenkRaum keins.
- **Nie mergen, nie force-pushen auf main.** Der Merge-Klick ist laut Michaela ausdrücklich ihr Schritt —
  das ist kein Sicherheitsgimmick, sondern ihre bewusste Qualitätskontrolle.

## 5. PR beobachten

- `subscribe_pr_activity` auf den PR setzen, damit Review-Kommentare/CI-Fehler automatisch reinkommen.
- Zusätzlich einen Check-in in ~60 Minuten planen (`send_later` bzw. `create_trigger`), weil Merge-Events
  nicht zuverlässig per Webhook ankommen. Beim Check-in: PR-Status/Mergeability prüfen; wenn nichts neu
  ist, still neu einplanen statt Michaela zu stören.
- Kommentare/CI-Fehler wie im System-Prompt beschrieben behandeln: kleine, eindeutige Fixes direkt
  pushen; bei Unklarheit nachfragen; Duplikate/Nicht-Actionable stillschweigend überspringen.

## 6. Nach bestätigtem Merge: Notion aktualisieren

Merge-Bestätigung kommt entweder per Webhook-Event, über den geplanten Check-in, oder weil Michaela es
direkt sagt ("gemerged", o.ä.) — alle drei zählen.

- **Neues Tool:** neuen Eintrag im Tool-Katalog anlegen (`notion-create-pages`, Parent =
  `data_source_id: 62d1feb5-d6ff-4c9c-815d-b74462e484f6`). Property-Namen/-Optionen siehe
  `references/notion-tool-katalog.md`. Status i. d. R. `"Auditiert & zertifiziert"`, `HTML-Datei` mit dem
  echten Pfad (`tools/<name>.html`), `Notizen` mit PR-Link und kurzer Einordnung.
- **Bearbeitetes Tool:** bestehenden Eintrag suchen (`notion-query-data-sources`, SQL über die Data
  Source) und aktualisieren statt Duplikat anzulegen.
- **Bei Unklarheit: nachfragen, nicht raten.** Es gab in diesem Projekt bereits einen echten Fall, in dem
  eine hochgeladene Tool-Datei fast mit einem separaten, umfangreicheren, noch nicht gebauten
  Notion-Konzept ("Von der Anfrage zum Code") verwechselt worden wäre. Vor dem Anlegen/Ändern eines
  Eintrags kurz im Tool-Katalog nach ähnlichen Titeln/Versionen suchen; wenn ein bestehender Eintrag
  inhaltlich zum neuen Build passen *könnte*, aber Details abweichen (anderer Funktionsumfang, anderer
  geplanter Dateiname, Status "In Arbeit" mit eigenen Notizen), das Michaela zeigen und fragen, statt
  den Eintrag einfach zu überschreiben oder blind einen neuen anzulegen.

## 7. Aufräumen

- `unsubscribe_pr_activity` für den PR aufrufen.
- Offene Check-in-Trigger (`delete_trigger`) entfernen, falls noch einer läuft.
- Kurze Zusammenfassung an Michaela: was live ist, wo (Live-URL + `tools/<name>.html`), was in Notion
  aktualisiert wurde.
