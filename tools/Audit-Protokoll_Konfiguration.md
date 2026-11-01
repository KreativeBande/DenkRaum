# Audit-Protokoll: Konfiguration · so arbeite ich mit Claude

Datum: 01.11.2026 · Datei: `tools/konfiguration.html` · Checkliste v2.1 (K1–K22, Z1–Z9)

**Ergebnis: ✅ Zertifiziert** (Kann-Kriterien K11 bis K13 nicht vollständig, daher kein ⭐)

Erstprüfung am selben Tag ergab ❌. Die Befunde sind in dieser Fassung behoben.

## Befunde und Korrekturen

- K5 Kontrast: weiße Schrift auf `#E8720C` (ca. 3,2:1) und `#2E8B57` (ca. 4,2:1) im Regal-SVG und in den Farbmarken. Korrigiert auf `#B8570A` und `#1F7043` (über 4,5:1).
- K21: Signatur überdeckte bei 390 px den Zurück-Link. Topbar bekommt unter 700 px oben 64 px Abstand.
- Schriftgrößen: alle geprüften Ansichten ohne Text unter 14 px.

## Geprüft ohne Befund

| Kriterium | Nachweis |
|---|---|
| K1 Offline | kein `fetch(`, keine externen Skripte oder Stile; nur `../register/zurueck.js` aus dem Repo |
| K2 Storage | keine Nutzung von `localStorage`/`sessionStorage` |
| K3 Drag and Drop | kein `draggable`/`dragstart` |
| K4 color-scheme | `color-scheme:light` in Meta und CSS |
| K15 Overflow | kein `overflow` auf `html`/`body`; `scrollWidth <= innerWidth` bei 1300 und 390 px, auch auf Englisch |
| K19 Systemprompt | Bau-Prompt mit Nicht-tun-Satz |
| K20 DE/EN | Umschalter ohne Reload; alle vier Footer-Boxen auf Englisch ohne deutsche Funktionswörter (Skript-Prüfung); keine Konsolenfehler |
| K21 Signatur | `position:fixed; top:14px; right:28px`; kein Fallback auf `static`; im unscrollten Zustand keine Überdeckung bei 1300 und 390 px |
| K22 Vertiefung | n/a (Karten-/Regal-Werkzeug ohne Fließtext-Kompendium) |

## Offen (Kann)

K11 Radien nach Design-System, K12, K13 nicht systematisch geprüft.

## Hinweis zur Methode

Die Prüfung der Signatur-Überdeckung im gescrollten Zustand meldet immer Treffer, weil Inhalt unter jedem fixierten Element durchläuft. Das ist kein Befund.
