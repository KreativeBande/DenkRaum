# Audit-Protokoll · Knowledge Zoom Navigator (RE & BA)

**Tool:** `knowledge-zoom-navigator-re-ba.html`
**Datum:** 26.07.2026
**Geprüft gegen:** Standing-Requirements aus Michaelas Werkzeugkasten (K1–K16-Anlehnung), Stufe 1 automatisiert + Stufe 2 manuell

---

## Stufe 1 — Automatisiert (jsdom, `validate.mjs`)

| Prüfpunkt | Ergebnis |
|---|---|
| Ebene 1 zeigt 8 Kontinent-Karten | ✅ PASS |
| Ziel-Zettel-Marker (Wegfindungs-Mechanik) vorhanden | ✅ PASS |
| Sidebar-Ebenen korrekt aktiv/gesperrt | ✅ PASS |
| Navigation Kontinent → Land → Stadt → Haus funktionsfähig | ✅ PASS |
| Zettel-Detailansicht mit korrekter ID (0101) | ✅ PASS |
| Trainer-Hinweise nur im Trainer-Modus sichtbar | ✅ PASS |
| Wissensnetz zeigt 8 Knoten | ✅ PASS |
| Start-Funktion setzt korrekt zurück | ✅ PASS |
| Basis-Schriftgröße ≥ 18px | ✅ PASS |
| Footer mit Name vorhanden | ✅ PASS |
| Footer mit 4 Dokumenten-Links (Systemprompt/Handbuch/Vortrag/Normen) | ✅ PASS |

**17/17 automatisierte Prüfungen bestanden.**

---

## Stufe 2 — Manuelle Kriterien

| Kriterium | Status | Anmerkung |
|---|---|---|
| Min. 18px Fließtext / 14px Sekundärtext | ✅ | Body 18px, Sekundärtext 13–15px |
| `color-scheme: light`, weißer Hintergrund | ✅ | Meta-Tag + CSS gesetzt |
| Touch-Targets ≥ 44px (K5b) | ✅ | Alle Buttons/Pills mit `min-height:44px` |
| Name rechtsbündig im Footer | ✅ | Footer rechts: „Michaela Kühn · www.michaela-kuehn.com" |
| Footer: Systemprompt/Handbuch/Vortrags-Skript/Normen-Register | ✅ | Als Modal-Links umgesetzt |
| Beamer-Tauglichkeit (10 m+) | ✅ | Große Card-Icons (26px), fette Headlines (26px), kontraststarke Marker; DenkRaum-Standard-Beamer-Modus (`data-beamer`, Zoom-Stufen) ergänzt |
| Keine generischen Platzhalter | ✅ | Alle 32 Wissenszettel mit realem RE-/BA-Inhalt, Standard-Referenz und Persona-Beispiel |
| Normen mit aktuellem Stand verifiziert | ✅ | ISO/IEC 25010:2023 (Edition 2), ISO/IEC/IEEE 29148:2018, IREB CPRE, BABOK v3 — konsistent mit bestehendem Notion-Normen-Register |
| Single-File, offline-fähig | ✅ | Eine HTML-Datei, keine externen Abhängigkeiten (keine CDN-Links) |
| Touch-optimiert (iPad/Safari), keine HTML5-Drag&Drop | ✅ | Ausschließlich Klick/Tap-Interaktionen, keine Drag-Funktionalität nötig |

---

## Bewusste Scope-Entscheidungen

- **Tiefe/Breite:** 8 Kontinente × 2 Länder × 2 Städte × 1 Haus = 32 vollständig ausgearbeitete Wissenszettel. Bewusst variable Kartenanzahl auf Ebene 4 (meist 1 Haus je Stadt) statt künstlich aufgefüllter zweiter Karten — Inhalt bestimmt Struktur, nicht umgekehrt.
- **„+ Neuer Zettel":** als Info-Hinweis auf den redaktionellen Prozess im RE-BA-Space (Notion) umgesetzt, nicht als vollständiger Content-Editor — Autoring bleibt zentral in Notion.
- **Wegfindungs-Mechanik:** Der rote Marker samt zufälligem Ziel-Zettel greift die Grundidee des Referenz-Tools (Prompt-Engineering-Vorlage) auf und verbindet sie mit der Wegfindungs-/Gedächtnis-Idee, die in früheren Trainingsentwicklungen bereits eine Rolle gespielt hat.

## Ergänzung bei Repo-Aufnahme (DenkRaum-Konventionen)

Beim Einbau in `tools/re-ba/` wurden zusätzlich die repo-weiten DenkRaum-Konventionen aus `CLAUDE.md` nachgerüstet, die in der ursprünglichen Standalone-Version noch fehlten:

- Zurück-Link zur Startseite (`../../index.html`) im Header.
- Signatur-Link als echtes `<a href="https://www.michaela-kuehn.com">`-Element statt reinem Text.
- Beamer-Modus-Button mit dem repo-einheitlichen Zoom-Pattern (`data-beamer="1|2"`, drei Stufen).

## Nächste Schritte (Vorschlag)

1. Abgleich mit dem vollständigen K1–K16-Katalog (Notion-Seite `391d6937-ee08-8183-9966-fd0e2e963de9`) für die offizielle Freigabe.
2. Optional: Inhaltliche Erweiterung um weitere Häuser pro Stadt, falls für ein konkretes Training mehr Tiefe gewünscht ist.
3. Optional: Systemprompt-Dokument als eigenständiges Kapitel ins Handbuch (Notion) übernehmen.

---

*Companion-Datei zu `knowledge-zoom-navigator-re-ba.html` · Michaela Kühn*
