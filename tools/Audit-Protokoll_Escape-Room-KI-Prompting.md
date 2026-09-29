# Audit-Protokoll — Escape Room: KI-Prompting

Tool: `tools/escape-room-ki-prompting.html`
Geprüft nach: Qualitätskriterien-Checkliste (Siegel-Prüfung) v1.9 (K1–K21), Arbeitskopie im Repo.
Datum: 29.09.2026
Anlass: Michaela lud eine minifizierte/obfuskierte Verteilversion (`escape-room-ki-prompting_min`, „Pilot v1.0")
hoch mit der Bitte, das Tool in der Toolbox zu suchen, nach den Qualitätsregeln anzupassen und in die
Index-Datei zu hängen. Abgleich ergab: identische Spielinhalte wie die bereits im Repo liegende, lesbare
Quellfassung (die Upload-Datei ist ein Build mit obfuskiertem JS und ohne Zurück-Link/Crosslinks). Überarbeitet
wurde daher die Repo-Fassung; die obfuskierte Datei wurde nicht ins Repo übernommen.
Prüfmethode: statische Analyse (grep) + dynamische Verifikation per Playwright/Chromium (headless):
kompletter Durchlauf aller sieben Türen inkl. Fehlversuch, Hinweis und Sprachwechsel mitten im Spiel;
Beamer-Zyklus (fünf Klicks); Scroll-Test der Signatur; Viewports 1440/1366/390/375px.

## Änderungen in diesem Audit-Zyklus

- **K21:** Signatur von Header-Flussinhalt (Text „PromptSchule · Requirements Engineering", ohne sichtbare URL)
  auf `position:fixed; top:14px; right:28px` mit `Michaela Kühn · www.michaela-kuehn.com` umgestellt, kein
  static-Fallback; unter 640px nur kompakteres Padding.
- **K18:** Altes dreistufiges `zoom`-Muster (`data-beamer="1|2"`) auf das vierstufige Klassen-Muster
  (`beamer`/`beamer-xl`/`beamer-xxl`) migriert; Footer + Crosslinks ab Stufe 1 ausgeblendet; Größen über
  CSS-Variablen (Fließtext 16/22/28/34px, H1/H2 bis 64px, Sekundärtext 14/15/18/21px).
- **K20:** Vollständiger DE/EN-Umschalter ergänzt — Topbar, Hero, HUD, alle sieben Türen (Szenario, Aufgaben,
  Optionen, Begründungen, Hinweise), Feedback-Meldungen, Abschluss-Screen, Crosslinks, alle vier Footer-Boxen.
  Umschalten ohne Reload, Spielstand bleibt erhalten.
- **K19:** Systemprompt-Box enthielt nur einen Rahmensatz; jetzt vollständiger Master-Bau-Prompt (Rolle, Ziel,
  Struktur, Inhalt pro Tür, Design, Persona-Bezug, Sprache, Footer, Nicht-tun-Liste).
- **Footer-Standard / K13 / K16:** Handbuch nach PromptSchule-Methodik (RISEN, 5 Dimensionen, Lernhinweis,
  Nachbau-Tipp), Vortrags-Skript Schritt für Schritt (Klick-Hinweis + Sprechtext + Übergang, Regie-Hinweise),
  Normen-Register als Tabelle; Companion-Datei `Sprecher-Skript_Escape-Room-KI-Prompting.md` neu.
- **K8/K17:** IREB-Qualitätskriterien in Tür 3 von einer Mischliste („atomar, testbar, eindeutig, konsistent,
  verfolgbar") auf die Kriterien für Einzelanforderungen nach CPRE FL 3.3.0 korrigiert (adäquat, notwendig,
  eindeutig, vollständig, verständlich, prüfbar). EU-AI-Act-Status mit Daten inkl. Digital-Omnibus
  VO (EU) 2026/1744 ergänzt; R0–R3 explizit als Canvas-eigenes Raster, nicht als AI-Act-Klassen gekennzeichnet.
  Verweis auf nicht existierendes Tool „Prompt-Deklinator" durch „Prompt-Builder" ersetzt.
- **K5:** Alle Schriftgrößen < 14px (13px/12px bei Labels, Badges, Buttons) angehoben.
- **Bugfixes:** Nach falscher MC-Antwort war die Option gesperrt (`revealed` blockierte jede weitere Auswahl) —
  Tür war danach nicht mehr lösbar. Jetzt ist Neuwahl möglich. Sortier-Tür startet nie bereits gelöst.
  Abschlusszeit wird eingefroren statt bei jedem Re-Render neu berechnet.
- **Design-Tokens:** Radien 12px (Buttons/Optionen), 16px (Karten), 20px (Bühne), 999px (Pills); dezente Schatten.
- **Hero:** Topbar (Zurück-Link | DE/EN + Beamer) getrennt von Hero; H1 und Lead in voller Containerbreite
  (1132px bei 1440px Viewport, gleich breit wie HUD).

## Ergebnis K1–K21

| K | Kriterium | Ergebnis | Nachweis |
|---|---|---|---|
| K1 | Offlinefähigkeit | ✅ | 0 `fetch`/XHR, keine externen Ressourcen |
| K2 | Storage abgesichert | ✅ | beide `localStorage`-Zugriffe in try/catch |
| K3 | Touch | ✅ | kein HTML5-DnD; Sortieren per ▲/▼, Ziele ≥44px |
| K4 | Weißer Hintergrund | ✅ | `#FFFFFF` + dezentes Raster, `color-scheme: light` |
| K5 | Beamer-Lesbarkeit | ✅ | kleinster Wert 14px (Sekundärtext), Fließtext 16px |
| K6 | Kein Sliding-Panel | ✅ | Seitenleiste + Bühne dauerhaft sichtbar |
| K7 | UTF-8 | ✅ | keine `\u00`-Escapes |
| K8 | Keine generischen Werte | ✅ | Normen mit Fassung/Datum, Szenario-Werte konkret |
| K9 | Szenariotreue | ✅ | Hochschule Nordlicht; Ela = Projektleitung |
| K10 | Problem/Lösung | ✅ | keine als Anforderung gekennzeichneten Lösungsitems |
| K15 | Footer erreichbar | ✅ | kein `overflow:hidden` auf html/body |
| K17 | Normen-Aktualität | ✅ | Websuche 29.09.2026: CPRE FL 3.3.0 (01.04.2026); VO (EU) 2026/1744 in Kraft 27.07.2026 |
| K18 | Beamer vierstufig | ✅ | Klassen `''` → `beamer` → `+xl` → `+xxl` → `''`, Footer ab Stufe 1 `display:none` |
| K19 | Master-Bau-Prompt | ✅ | vollständig, DE + EN |
| K20 | Sprach-Toggle | ✅ | 0 sichtbare DE-Blöcke im EN-Modus, Durchlauf auf EN abgeschlossen |
| K21 | Signatur fixed | ✅ | nach Scroll ans Seitenende `top:14px`, auf 375px ohne Überlappung mit Topbar |
| K11 | Design-System | ⏸ offen | dauerhaft offen (keine Persona-Hex-Referenzdatei) |
| K12 | Validierungsnachweis | ✅ | dieses Protokoll |
| K13 | Vortrags-Skript | ✅ | 9 Schritte + Regie-Hinweise |
| K14 | Audit-Zeile | ✅ | `Zuletzt geprüft: 29.09.2026` |
| K16 | Companion-Datei | ✅ | `Sprecher-Skript_Escape-Room-KI-Prompting.md` |

**Siegel: ✅ Zertifiziert** (alle Muss-Kriterien bestanden; ⭐ nicht erreichbar, solange K11 offen ist).
