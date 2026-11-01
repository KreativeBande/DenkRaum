# Audit-Protokoll: Raum-Schleusen · Wann öffnet sich die Tür zwischen den Denkräumen?

Datum: 01.11.2026 · Datei: `tools/raum-schleusen.html` · Checkliste v2.1 (K1–K22, Z1–Z9)

**Ergebnis: ✅ Zertifiziert** (Kann-Kriterien K11 bis K13 nicht vollständig, daher kein ⭐)

Erstprüfung am selben Tag ergab ❌. Die Befunde sind in dieser Fassung behoben.

## Befunde und Korrekturen

- K5: Kürzel „Pflicht“ 12,96 px. Korrigiert auf 14 px.
- K18: Beamer-Fließtext 20/24/28 px, Überschriften nicht gestuft. Jetzt 22/28/34 px und Überschriften 44/54/64 px (mobil 34/40/44 px).
- K21: Signatur `top:8px; right:12px` kollidierte mit der Knopfleiste. Jetzt `top:14px; right:28px`, Seitenkopf mit 60 px Abstand.

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

## Nachtrag 01.11.2026 (Musterlösungen)

Elf Dokumente (Strategiepapier bis Kostenplan) haben Musterlösungen aus dem Fall Lindenfeld Lunch, je Feld mit Herkunft (Fall, Abgeleitet, Gedankenspiel). Geprüft: keine Konsolenfehler, alle 29 Dokumentkarten ohne leere Felder, „Musterlösung einfügen“ in der Vorlage, kein seitliches Scrollen bei 390 px (DE und EN). Siegel unverändert ✅.
