# Audit-Protokoll — Profile Engineering Lab

Tool: `tools/profile-engineering-lab.html`
Geprüft nach: Qualitätskriterien-Checkliste (Siegel-Prüfung) v1.7, korrespondierend mit
Master-Prompt v6.
Datum: 19.07.2026
Prüfmethode: statische Analyse (grep über die Datei) + dynamische Verifikation per
Playwright/Chromium (headless), da im Repo kein jsdom-Setup vorhanden ist. Playwright fährt
denselben Anwendungscode in einer echten Browser-Engine statt einer simulierten DOM-Umgebung
— strengerer, nicht schwächerer Nachweis als jsdom für DOM-Zustandslogik, prüft zusätzlich
tatsächliches CSS/Layout (das jsdom nicht rendert). Wo eine Abweichung von der beschriebenen
Prüfmethode vorliegt, ist das unten explizit vermerkt.

## Änderungshistorie

**19.07.2026, Nachtrag nach Michaelas Feedback:** Live-Prompt-Aufbau von einem
zusammenhängenden Fließtext mit farblicher Satz-Hervorhebung auf pro-Kategorie beschriftete
Blöcke umgestellt (macht sichtbar, welches Element aus dem Profil-Baukasten links im Prompt
gelandet ist). Die Box wird bei jedem Stufenwechsel vollständig neu gerendert statt Inhalte
anzuhängen, damit der Blick auf die aktuell gewählte Person fokussiert bleibt. Meter und
Ergebnis-Bereich sind jetzt Teil des rechten Panels statt eigener vollbreiter Abschnitte,
Abstände im gesamten Tool verkleinert (weniger Scrollen). Hervorhebungsfarbe für neu
hinzugekommene Kategorien von Grün auf Lila geändert (`--good:#6D28D9`,
`--good-soft:#EDE9FE`) — bewusste Abweichung von der sonst identischen Farbpalette des
Referenztools, siehe K11 unten. Alle betroffenen Kriterien unten erneut geprüft; Ergebnisse
sind bereits die aktualisierten.

---

## A. Technische Muss-Kriterien

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K1 | Offlinefähigkeit | ✅ | `grep -n "fetch("` → 2 Treffer, beide in Fließtext der Systemprompt-Box (Beschreibung der Regel), 0 tatsächliche `fetch()`-Aufrufe im Code. |
| K2 | Kein Blocking durch Storage-APIs | ✅ | `safeGet`/`safeSet`-Wrapper (Zeilen ~437–438), beide `localStorage`-Zugriffe in `try/catch`. |
| K3 | Touch-Tauglichkeit | ✅ | `grep -n "draggable=\|dragstart\|dragover"` → 0 Treffer. Alle Interaktionen sind Klick-Buttons. |
| K4 | Weißer Hintergrund | ✅ | `color-scheme: light` auf `html,body` gesetzt; `--bg:#ffffff`, kein `prefers-color-scheme`-Override. |
| K5 | Beamer-Lesbarkeit | ✅ | Vollständiger Scan aller `font-size`-Werte: kleinster Wert 14px (Sekundärtext/Badges), Fließtext 14.5–18px. Ursprünglich 8 Werte unter 14px gefunden und vor Auslieferung auf 14px angehoben. Nach dem Prompt-Box-Redesign erneut per Playwright `getComputedStyle` über alle gerenderten Elemente geprüft (nicht nur statischer CSS-Grep) — kleinster gerenderter Wert weiterhin 14px. Kontrast `--ink-soft` (#5B6570) auf Weiß/`--card`: aus dem bereits produktiv genutzten Referenztool `prompt-engineering-academy.html` übernommen (identische Werte), dort nicht gesondert neu geprüft. |
| K6 | Kein Sliding-Panel-Layout | ✅ | Profil-Baukasten und Live-Prompt-Aufbau sind als permanentes 2-Spalten-Grid (`.shell`) gleichzeitig sichtbar, keine Slide-Transition zwischen ihnen. |
| K7 | UTF-8-Encoding sauber | ✅ | `grep -n "\\u00"` → 0 Treffer. Visuelle Stichprobe: Umlaute, „…", – korrekt dargestellt (siehe Screenshots). |
| K15 | Erreichbarkeit nicht-live-relevanter Inhalte | ✅ | Kein `overflow:hidden` auf `html`/`body`. Playwright-Test: `window.scrollTo(0, document.body.scrollHeight)` → Footer-Bounding-Box vorhanden, Footer erreichbar. |
| K18 | Beamer-Modus-Toggle (vierstufig) | ✅ | Playwright-Test: 5 Klicks auf `#beamerToggle`, `document.documentElement.className` nach jedem Klick geloggt: `''` → `'beamer'` → `'beamer beamer-xl'` → `'beamer beamer-xl beamer-xxl'` → `''` → `'beamer'`. Exakt die vier spezifizierten kumulativen Zustände, fünfter Klick zurück auf `''`. Footer bei Stufe ≥1 `display:none` bestätigt (`footer.isVisible() === false` bei aktivem Beamer-Level). **Fund während der Prüfung:** Erste Implementierung blendete versehentlich auch `.topbar` (inkl. des Toggle-Buttons selbst) bei Beamer-Stufe ≥1 aus — der Button hätte sich damit selbst unerreichbar gemacht und den Modus nicht mehr verlassen können. Vor Auslieferung behoben: nur Footer, Back-Link, Eyebrow, View-Buttons und Task-Box werden ausgeblendet, der Beamer-Button und der Titel bleiben durchgehend erreichbar. |
| K19 | Systemprompt-Box enthält Master-Bau-Prompt | ✅ | Footer-Box „🔧 Systemprompt" enthält vollständigen, eigenständigen Bau-Prompt (Leitfrage, Struktur beider Ansichten, Persona-Abweichung mit Begründung, Design-Vorgaben inkl. exakter Hex-Werte, Technik-Vorgaben, explizite Nicht-tun-Liste) — Sichtprüfung: mit diesem Text allein wäre das Tool nachbaubar, ohne Zusatzrecherche. |

## B. Inhaltliche Muss-Kriterien

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K8 | Keine generischen Werte | ✅ | Alle 5 Personas mit konkreten, spezifischen Profildaten (z. B. „CPRE Advanced Level, CCBA", „Projekt „Schadenmeldung digital"", „500 gleichzeitige Nutzer:innen, unter 2 Sekunden"), keine Platzhalter. Stufe 5 (Michaela) nutzt das reale, in `steckbrief.html` verifizierte Profil. Dieses Tool referenziert selbst keine datumsabhängige Regulatorik (im Gegensatz zu `eu-ai-act-framework.html`), daher kein Status/Datum-Zusatz nötig. |
| K9 | Szenariotreue | ✅ | `grep -n "Ela\|Knut\|Sarah\|Petra\|Bachmeier"` → 0 Treffer. Der feste RE-Personen-Cast wird bewusst **nicht** verwendet — Abweichung ist im Konzept-Dokument und in der Systemprompt-Box explizit begründet (Meta-Thema Prompt-/Profile Engineering statt RE-Fallszenario). Die 5 eigenen Personas (Max/Anna/Thomas/Sophie/Michaela) widersprechen sich untereinander nicht; Rollen bleiben über alle Stufen konsistent (z. B. Thomas bleibt durchgängig Business Analyst im Versicherungskontext). |
| K10 | Problem-Requirement-Solution-Trennung | n/a | Nicht einschlägig — das Tool enthält keine als „Anforderung" gekennzeichneten Items; Inhalt sind Profildaten und Prompt-Text, keine FA/NFA-Artefakte. |
| K17 | Aktualität referenzierter Normen/Frameworks | ✅ | Referenzierte Normen: IREB, BABOK (IIBA), PMBOK (PMI), ISO/IEC 25010:2023, ISO/IEC 27001:2022, ISO/IEC 29148, ISO/IEC 42001, EU AI Act — genannt ohne konkrete, datumsabhängige Einzelfrist. Gezielte Websuche in dieser Session bestätigt: ISO/IEC 27001:2022 aktiv (Übergangsfrist von 27001:2013 bereits am 31.10.2025 abgelaufen, 2022er-Fassung ist der geltende Stand). **Wichtiger Nebenbefund:** Bei der Recherche für K17 wurde festgestellt, dass die im separat gebauten Tool `eu-ai-act-framework.html` (heute früher in dieser Session erstellt, bereits gemergt) verwendete Frist „Hochrisiko-Pflichten ab 2. August 2026" durch den EU-„Digital Omnibus" auf den 2. Dezember 2027 (eigenständige Hochrisiko-Systeme nach Anhang III) bzw. 2. August 2028 (eingebettete Hochrisiko-Systeme nach Anhang I) verschoben wurde — von Rat (29.06.2026) und Parlament (16.06.2026) bereits formal angenommen, Veröffentlichung im EU-Amtsblatt steht nur noch aus. Dieses Tool selbst ist davon nicht betroffen, da es keine EU-AI-Act-Einzelfrist zitiert; der Fund wird als separater Fix für `eu-ai-act-framework.html` nachgereicht (siehe Notizen im PR). |

## C. Kann-Kriterien (für Auszeichnung)

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K11 | Design-System-Konformität | ✅ mit dokumentierter Abweichung | Basispalette weiterhin hexgenau aus `prompt-engineering-academy.html` übernommen (`--accent:#0B5E63`, `--ink:#1B1F23`, `--ink-soft:#5B6570`, `--line:#DEE3E6`, `--card:#F7F8F9`). Auf Michaelas ausdrücklichen Wunsch wurde die Hervorhebungsfarbe für "neu hinzugekommene Kategorie" von Grün (`--good:#2F7A4F`, ökosystemweiter Wert) auf Lila (`--good:#6D28D9`, `--good-soft:#EDE9FE`) geändert — bewusste, gewünschte Einzeltool-Abweichung, in der Systemprompt-Box explizit als solche gekennzeichnet, damit sie bei einem künftigen Cross-Tool-Hex-Abgleich nicht versehentlich als Inkonsistenz-Bug gewertet wird. Gherkin-/Flow-Box-/Accordion-Muster anderer Tools sind hier inhaltlich nicht einschlägig (kein RE-Szenario); die verwendeten `<details>`-Footer-Boxen folgen den kanonischen Footer-Klassennamen. |
| K12 | Validierungsnachweis vorhanden | ✅ | Dieses Dokument + Playwright-Testlauf (Protokoll unten). |
| K13 | Vortrags-Skript-Box vorhanden | ✅ | Dritte Footer-Box „🎤 Vortrags-Skript", deckt alle 5 Stufen + Übergang + Schluss mit Klick-Regie und Sprechtext ab, keine Konstruktionslogik (die steht im Handbuch) und kein roher Systemprompt-Text. |
| K14 | Audit-Status-Zeile aktuell | ✅ | `.footer-sig .audit-line`: „Zuletzt geprüft: 19.07.2026 · Status: ✅ Zertifiziert · Details siehe Audit-Protokoll" — Datum identisch zum Datum dieses Protokolls und der letzten inhaltlichen Änderung. |
| K16 | Companion-Datei Sprecher-Skript vorhanden | ✅ | `tools/Sprecher-Skript_Profile-Engineering-Lab.md`, inhaltlich synchron zur Footer-Vortrags-Skript-Box (gleiche Schritt-Gliederung, gleicher Sprechtext). |

---

## Siegel-Ergebnis

Alle Muss-Kriterien (K1–K10 (K10 n/a), K15, K17, K18, K19) bestanden. Alle Kann-Kriterien
(K11–K14, K16) bestanden.

**⭐ Zertifiziert mit Auszeichnung**

---

## D. Pflicht-Anhang: ISO/IEC 25010-Mapping (informativ, ohne Siegel-Einfluss)

| ISO 25010-Merkmal | Zugeordnete K-Nachweise | Zusatzprüfung | Einschätzung |
|---|---|---|---|
| Functional Suitability | K8, K9 (K10 n/a) | — | ✅ unauffällig |
| Performance Efficiency | — | Einzeldatei ~55 KB vor Gzip, kein spürbares Ladeverhalten zu erwarten | ✅ unauffällig |
| Compatibility | K1 | — | ✅ unauffällig |
| Interaction Capability | K3, K4, K5, K6 | — | ✅ unauffällig |
| Reliability | K1, K2 | — | ✅ unauffällig |
| Security | — | Keine personenbezogenen/sensiblen Daten verarbeitet (statische Demo-Personas, keine Nutzereingabe von Klardaten) | n/a |
| Maintainability | K7, K11 | Single-File ist bewusste Designentscheidung laut Master-Prompt, kein Mangel; klare Trennung von Daten (STAGES/CATEGORIES) und Rendering-Funktionen erleichtert Wartung | ✅ unauffällig |
| Flexibility | K1 | — | ✅ unauffällig |
| Safety | — | Kein irreversibler Aktionspfad ohne Rückfrage (Reset-Funktionen o. Ä. existieren in diesem Tool nicht, alle Aktionen sind non-destruktiv: Stufenwechsel, Kategorie-Klick, Ergebnis-Reveal) | n/a |

---

## Playwright-Testprotokoll (Kurzfassung)

Ausgeführt gegen `http://127.0.0.1:8936/tools/profile-engineering-lab.html`, Chromium
headless (`/opt/pw-browsers/chromium`).

1. 5 Stufen-Buttons, 12 Kategorie-Chips gerendert.
2. Stufe 1 (Max): 1 Kategorie „unlocked", Quality 20 %, Verständnis 8 % (1/12).
3. Aktive Kategorie „Identität" zeigt Inhalt; gesperrte Kategorie „Kompetenzen" zeigt
   Sperrhinweis.
4. „Ergebnis anzeigen" → Simulationsverzögerung → Ergebnistext erscheint.
5. Stufe 5 (Michaela): 12/12 Kategorien „unlocked", Quality 100 %, Verständnis 100 %.
6. Ergebnistext Stufe 5 enthält „Marmorkuchen" (Signature-Metapher korrekt eingesetzt,
   gegen `marmorkuchen-metapher`-Skill vorab geprüft).
7. Prompt-Fließtext bei Stufe 5 enthält „Michaela Kühn", wächst kumulativ über alle Stufen.
8. Beamer-4-Stufen-Test bestanden (siehe K18 oben), inkl. Bugfix vor Auslieferung.
9. Reload persistiert zuletzt gewählte Beamer-Stufe (`localStorage`).
10. Masterprompt-Finalseite: 12 Kapitel-Karten, 12 Tabellenzeilen, **alle 12 Kapitelinhalte
    eindeutig verschieden** (initial waren Kapitel 9/11 sowie 3/12 versehentlich inhaltsgleich,
    da zwei Kapitel auf dieselben Profil-Felder verwiesen — vor Auslieferung durch zwei
    eigenständige Profil-Felder `pruefung`/`selbstkontrolle` behoben und erneut verifiziert).
11. Signatur-Position Desktop: `top:14px`, rechtsbündig (fixed) bestätigt.
12. Signatur-CSS-Position < 900px: `static` bestätigt (Mobile-Fallback korrekt).
13. Footer nach Scroll ans Seitenende erreichbar (Bounding-Box vorhanden).
14. Keine Konsolenfehler außer einer harmlosen 404 (Favicon).
15. Mobile-Screenshot (390px) geprüft: Chips brechen zweispaltig um, Stufen-Buttons stapeln
    sich, Signatur fällt in den normalen Textfluss — kein Layout-Bruch.

### Nachtrag: Prompt-Box-Redesign (19.07.2026)

16. Stufe 1 (Max): genau 1 Prompt-Block, mit Klasse `.new` (alles ist neu bei der ersten
    Person).
17. Stufe 2 (Anna): genau 5 Prompt-Blöcke, davon 4 mit `.new` (Kompetenzen, Branchen,
    Standards, Methoden) — Identität korrekt nicht mehr als „neu" markiert.
18. Stufe 5 (Michaela): genau 12 Prompt-Blöcke, davon 2 mit `.new` (Ausgabeformat,
    Qualitätsprüfung) — Labels stimmen mit den Kategorie-Chips links überein.
19. Rücksprung von Stufe 5 zu Stufe 1: genau 1 Block, keine Reste aus Stufe 5 — Box wird bei
    jedem Klick vollständig neu aufgebaut statt angehängt (Kern der gewünschten Änderung).
20. Berechnete Hintergrundfarbe eines `.new`-Blocks: `rgb(237, 233, 254)` = `#EDE9FE`
    (Lila, wie gewünscht — nicht mehr Grün).
21. `getComputedStyle().fontSize` über **alle** gerenderten Elemente der Seite (nicht nur
    CSS-Deklarationen) gesammelt: kleinster Wert weiterhin 14px — keine Regression durch die
    verkleinerten Abstände.
22. `document.body.scrollHeight` bei Stufe 1: 1103px (nahe am 1000px-Viewport, kaum Scrollen
    nötig) — vor dem Redesign lag der Vollbild-Screenshot bei ca. 2137px unabhängig von der
    Stufe. Bei Stufe 5 (alle 12 Kategorien befüllt) bleibt mit 2070px weiterhin Scrollen
    nötig — das ist der inhaltlich dichteste Fall (alle 12 Kategorien plus Meter plus
    Ergebnis) und lässt sich ohne Informationsverlust nicht weiter verdichten.
23. Meter und Ergebnis-Bereich funktionieren unverändert, jetzt verschachtelt im rechten
    Panel statt als eigene vollbreite Abschnitte.

## Bekannte Abweichungen von der Master-Prompt-Vorlage

- Jsdom explizit nicht verwendet (nicht im Repo installiert) — Playwright/Chromium
  stattdessen, siehe Hinweis am Dateianfang.
- K5-Kontrastwert für `--ink-soft` nicht neu mit einem dedizierten Contrast-Checker
  gemessen, sondern aus dem bereits produktiven Referenztool übernommen.
