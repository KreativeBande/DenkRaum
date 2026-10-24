# Audit-Protokoll: Lindenfeld Lunch als Comic

Datum: 24.10.2026 · Datei: `tools/lindenfeld-comic.html` · Ergebnis: ✅ Zertifiziert (Kann-Kriterien nicht vollständig, daher kein ⭐)

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| K1 Offline | ✅ | kein `fetch(`, keine externen Ressourcen, Bilder als Base64 eingebettet |
| K2 Storage | ✅ | kein `localStorage`/`sessionStorage` |
| K3 Drag and Drop | ✅ | kein `draggable`/`dragstart` |
| K4 color-scheme | ✅ | `color-scheme: light` (Meta und CSS) |
| K5 Schriftgrößen | ✅ | alle `font-size`-Werte ≥ 14 px (Fließtext 16 px) |
| K7 Unicode | ✅ | keine `\u00`-Escapes |
| K15 Overflow | ✅ | kein `overflow` auf `html`/`body`; 1300 und 390 px ohne seitliches Scrollen (Playwright) |
| K17 Normen | ✅ | IREB v3.3.0 und ISTQB v4.0.1 am 24.10.2026 online geprüft; BABOK v3 und Use Case 3.0 nur aus Projektdateien (im Normen-Register so vermerkt) |
| K18 Beamer | ✅ | vierstufig (`beamer`, `beamer-xl`, `beamer-xxl`), Footer ab Stufe 1 ausgeblendet |
| K19 Systemprompt | ✅ | vollständiger Bau-Prompt mit Struktur, Inhalt, Design, Nicht-tun-Liste |
| K20 DE/EN | ✅ | `data-en`-Spans, deutscher Grundtext ohne JS lesbar, Alt-Texte beider Sprachen |
| K21 Signatur | ✅ | `position:fixed`, Name und Link `www.michaela-kuehn.com`, kein `static`-Fallback |
| K16 Sprecher-Skript | ✅ | `Sprecher-Skript_Lindenfeld-Comic.md` |
| K22 Vertiefung | n/a | kein Kompendium |
| Z4 einspaltig | ✅ | Bildfluss untereinander, `scrollWidth <= clientWidth` bei 1300 und 390 px |
| Z1–Z3, Z9 | n/a | keine Übungen |
| Z8 Glyphen | ✅ | nur ☀ und → |

Inhaltliche Prüfung: Zahlen und IDs der Bildunterschriften gegen den Case geprüft. Bekannte Abweichungen im Bild sind in den Unterschriften benannt (GZ-4, E3 bei FR-14, Kantinenleiter, Story-Aufteilung). Zwei angelieferte Bilder (Drei Brillen, Anforderungs-Lupe) nicht eingebaut, weil sie 150 statt 210 gleichzeitige Nutzende nennen (NFR-01).

Offen: K11–K14 nicht vollständig (Kann). Nicht auf einem echten iPad-WebKit getestet; Beamer und Navigation auf dem iPad mit Edge von Michaela bestätigt (Gateplan, 24.10.2026).

## ISO/IEC 25010-Mapping (Abschnitt D)

| Merkmal | Bezug |
|---|---|
| Interaktionsfähigkeit | Navigation, Zoom, Sprach- und Beamer-Schalter, Rücksprung zum Case |
| Kompatibilität | Einzeldatei, eingebettet im Gateplan |
| Zuverlässigkeit | läuft offline, Bilder ohne Netz |
| Wartbarkeit | Bauskript, Register-Eintrag |
| Funktionale Eignung | Tafeln entsprechen den Stationen des Case |
