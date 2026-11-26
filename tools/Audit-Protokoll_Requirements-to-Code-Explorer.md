# Audit-Protokoll: Requirements-to-Code Explorer

Datum: 10.11.2026 · Datei: `tools/requirements-to-code-explorer.html` · Checkliste v2.1 (K1–K22, Z1–Z9) · Repo-Standards N1–N4

**Ergebnis: ⭐ Zertifiziert mit Auszeichnung**

Die Erstprüfung am selben Tag ergab ❌ (K5, K14, K15, K16, K18, K19, K20 nicht erfüllt). Die Befunde sind in dieser Fassung behoben.

## Befunde und Korrekturen

- K15: `body{overflow:hidden}` mit festem 100vh-Raster. Seite scrollt jetzt normal, die Leiste läuft auf breiten Bildschirmen mit (`position:sticky`), der Footer ist erreichbar.
- K18: dreistufiges `zoom`-Muster (`data-beamer`). Jetzt vierstufig mit den Klassen `beamer`/`beamer-xl`/`beamer-xxl`: Fließtext 22/28/34 px, Panel-Überschriften 44/54/64 px, Sekundärtext 15/18/21 px, Footer ab Stufe 1 ausgeblendet. Ab XL stehen die Stufen-Buttons als Raster über dem Inhalt.
- K5: Werte von 9,5 bis 13,5 px (Kürzel in Codezeilen, Tags, Untertitel, Terminal-Titel). Kleinster berechneter Wert jetzt 14 px (Sekundärtext), Fließtext mindestens 16 px.
- K19, K13: Footer hatte keine Aufklapp-Boxen. Jetzt Systemprompt (Master-Bau-Prompt mit Nicht-tun-Liste), Handbuch (RISEN, fünf Dimensionen, Lernhinweis, Nachbau-Tipp), Vortrags-Skript (neun Schritte plus Regie), Normen-Register und Glossar.
- K20: kein Sprachumschalter. Jetzt DE/EN über `data-i18n-en` an allen sichtbaren Elementen einschließlich der fünf Footer-Boxen und der Textteile im Code; deutscher Text steht statisch im HTML.
- K14: keine Audit-Zeile. Jetzt in `.footer-sig`.
- K16: Companion-Datei `Sprecher-Skript_Requirements-to-Code-Explorer.md` angelegt.
- K21: Signatur war ein einzelner Link. Jetzt Name fett, darunter Website-Link, `position:fixed` auf jeder Breite.
- K8: „Referenzbedingungen“ ohne Wert. Jetzt 50 Mbit/s Upload-Bandbreite und bis zu 50 gleichzeitige Uploads; Browser-Kompatibilität auf „zwei aktuellste Hauptversionen“ konkretisiert.
- K9/Konsistenz: Kennungen passten nicht zusammen (Stufe 6 `REL-01`, Tabelle `NFA-REL-01`; Tabelle `SEC-LOG-01` ohne Quelle; `NFA-PERF-01` einmal 5 s, einmal 20 MB). Jetzt durchgehend dieselben Kennungen, SEC-02 bis SEC-04 bis in Code und Tabelle verfolgt (`verify_checksum()` ergänzt).
- K10: SEC-02 nannte den Hashwert als Lösung. Jetzt lösungsneutral („bitgenau“), Hash erst in Stufe 8/9. SEC-03 als „⚖ Norm schreibt Mittel vor · Anhang A 8.7“ gekennzeichnet.
- K17: ISO 25010 Merkmal 6/9 sprachlich getrennt (Sicherheit/Security, Betriebssicherheit/Safety), englische Begriffe der Fassung 2011 in den Zuordnungskarten ersetzt. SEC-Karten verweisen auf ISO/IEC 27001:2022 Anhang A 5.15, 8.7, 8.15, 8.24.
- Crosslink-Block stand im Panel 9 und war nur dort sichtbar. Jetzt direkt vor dem Footer.

## Geprüft ohne Befund

| Kriterium | Nachweis |
|---|---|
| K1 Offline | kein `fetch(`, keine externen Skripte, Stile oder Webfonts; nur `../register/zurueck.js` aus dem Repo |
| K2 Storage | alle `sessionStorage`-Zugriffe in `safeGet`/`safeSet` mit `try/catch` |
| K3 Touch | kein `draggable`/`dragstart`; alle Bedienelemente Buttons mit mindestens 44 px Höhe |
| K4 Hell | `color-scheme:light` in Meta und CSS, Hintergrund `#f6f8fb` |
| K6 | ein Panel je Stufe, keine Slide-Animation, Stufenliste immer sichtbar |
| K7 | kein `\u00`-Escape, Umlaute und „ “ im Screenshot korrekt |
| K15 | `scrollWidth <= clientWidth` bei 1300 und 390 px in allen neun Stufen, allen Beamer-Stufen und mit geöffneten Footer-Boxen |
| K17 | Websuche 10.11.2026: ISO/IEC 25010:2023 (Edition 2, 2023-11) gültig; ISO/IEC 27001:2022 mit Amd 1:2024 gültig, keine neuere Fassung. IREB CPRE FL v3.3.0 laut Repo-Prüfung 02.10.2026 |
| K18 | Klassen und Labels zyklisch (Beamer → Beamer XL → Beamer XXL → Normal), Footer `display:none` ab Stufe 1, Schriftgrößen per `getComputedStyle` gemessen |
| K20 | nach Umschalten auf EN keine deutschen Textknoten außer Signatur-Name und Sprungmarken aus `zurueck.js` (die Sprache beim Laden übernehmen); Rückschalten stellt den deutschen Text wieder her |
| K21 | `position:fixed; top:14px; right:28px`, unter 640 px `top:6px; right:10px`, kein `static`-Fallback |
| K22 | entfällt: Explorer/Demonstrator ohne Fließtext-Kompendium, im Handbuch begründet |
| Z1–Z9 | entfallen: keine Übung mit Antwortoptionen |
| K11 | Radien 4/8/12/16/24/999 px nach Design-System, Pill-Buttons für Meta-Controls |
| K12 | dieses Protokoll; Playwright-Lauf (Chromium) am 10.11.2026 ohne Konsolenfehler |

## Repo-Standards (getrennt ausgewiesen)

- N1: Navigation (Stufen) links in der Seitenleiste.
- N2: keine Raumfarben verwendet; Rundreise ohne Raumfarbe, Akzent `#2e6db4`.
- N3: `zurueck.js` eingebunden, genau ein `.dr-sprung` oben in der Leiste.
- N4: keine veralteten Raumnamen.
