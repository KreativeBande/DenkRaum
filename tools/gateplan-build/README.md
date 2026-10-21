# Gateplan: Bauskripte

Der Gateplan (`tools/lindenfeld-gateplan.html` und `...-teilnehmende.html`) bettet den BA/RE-Case und das Tool „Projektauftrag und Pflichtenheft“ vollständig ein. Ändert sich eine dieser Dateien in `tools/`, muss der Gateplan neu gebaut werden.

Aus dem Repo-Wurzelordner:

```
cd tools/gateplan-build
GP_SRC=.. GP_OUT=.. python3 hub.py                      # baut beide Gateplan-Dateien
GP_OUT=.. python3 repo.py lindenfeld-gateplan.html lindenfeld-gateplan-teilnehmende.html   # Zurück-Link zur Startseite
python3 skript_md.py ../lindenfeld-gateplan.html ../Sprecher-Skript_Lindenfeld-Gateplan.md "Lindenfeld Lunch Gateplan"
```

Wichtig: `repo.py` hat die Zurück-Links in Case und Pflichtenheft bereits eingebaut (idempotent). Neue Fassungen dieser beiden Dateien brauchen ebenfalls den Zurück-Link und die Verweis-Skripte (Rückkehr zum Gateplan, `html.emb`-Modus, Zoom), sonst funktionieren die Tiefenverweise nicht.

- `hub_data.py`: Inhalte (Gates, Linien, Zellen, Gruppenfragen, Stationen des Case und des Tools)
- `hub.py`: baut die Seite; `footer_text.py`: Systemprompt, Handbuch, Vortrags-Skript (Quelle für die Companion-Datei)
- `lib.py`, `base.css`, `base.js`, `zoom.py`: gemeinsame Bausteine (Schalter, Tabellen, Quiz, Bild-Zoom)
- `test_hub.py`, `test_zoom.py`: Playwright-Prüfungen (Chromium unter `/opt/pw-browsers/chromium`), `GP_OUT=..` setzen
