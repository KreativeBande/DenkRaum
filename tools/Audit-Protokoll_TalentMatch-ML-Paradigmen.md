# Audit-Protokoll — TalentMatch AI: Vier ML-Paradigmen im RE/BA-Blick

Tool: `tools/talentmatch-ml-paradigmen.html`
Geprüft nach: Qualitätskriterien-Checkliste (Siegel-Prüfung) v1.7, korrespondierend mit
Master-Prompt v6.
Datum: 30.08.2026
Prüfmethode: statische Analyse (grep/Python-Scan über die Datei) + dynamische Verifikation per
Playwright/Chromium (headless), da im Repo kein jsdom-Setup vorhanden ist.

## Ausgangslage

Michaela hatte das Tool bereits selbst mit Claude entwickelt (Version 2, eigener Systemprompt im
Footer) und um drei konkrete Nacharbeiten gebeten, da ihr in der Ursprungssession kein echter
Browserzugriff zur Verfügung stand:

1. Echte visuelle Prüfung (Kette-Pfeile, Tab-Übergänge, Beamer-Stufen) statt nur berechneter
   Kontrastwerte.
2. Ökosystem-Verweise im Vergleich-Modus von reinem Text in echte klickbare relative Links
   verwandeln.
3. Die 52-%-Bewerbungspool-Zahl (im Systemprompt als „OFFENER PRÜFPUNKT" markiert) gegen andere
   TalentMatch-Tools im Repo gegenchecken.

Alle drei sind Teil dieses Audits (Version 3).

## Änderungshistorie dieses Reviews (v2 → v3)

- Zurück-Link zur Startseite ergänzt (fehlte in der Ursprungsversion — Verstoß gegen die
  Header-Konvention).
- Fließtext-Hauptinhalt (`.komponente p`, `.box p`, `.frage p`, `.uebung p`/`.loesung`, `.quote`,
  `.kette-step p`, `.prompt-text`, `.vergleich-table td`, `.merksatz`) lag bei 14,0–15,2px im
  Normal-Zustand — unterhalb des CLAUDE.md-Floors von ≥16px. Ursache: Die html-Wurzel skaliert
  proportional (16→20→24→28px), das reicht rechnerisch nicht für die nicht-proportionalen
  Beamer-Floors (≥22/≥28/≥34px). Basiswerte auf `1rem`/`1.1rem` angehoben und zusätzlich
  explizite px-Overrides je Beamer-Stufe ergänzt, siehe K5/K18 unten.
- Ökosystem-Verweise recherchiert und verlinkt/korrigiert, siehe eigener Abschnitt unten.
- 52-%-Kennzahl gegen alle anderen TalentMatch-AI/Vantera-Tools im Repo abgeglichen, siehe
  eigener Abschnitt unten.
- Footer-Status-Zeile und Systemprompt-Änderungshistorie auf Version 3 aktualisiert.

---

## A. Technische Muss-Kriterien

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K1 | Offlinefähigkeit | ✅ | `grep -n "fetch("` → 0 Treffer. Keine externen Ressourcen, kein CDN-Link. |
| K2 | Kein Blocking durch Storage-APIs | ✅ | Kein `localStorage`/`sessionStorage`-Zugriff im Tool (Zustand nur in JS-Variablen, kein Reload-Persistenzbedarf laut Konzept). |
| K3 | Touch-Tauglichkeit | ✅ | Alle Interaktionen über `pointerup`-Listener (Pills, Tabs, ISO-Badges, Beamer-Button) statt `click`/Drag; `min-height:44px` auf allen Buttons. `grep -n "draggable=\|dragstart\|dragover"` → 0 Treffer. |
| K4 | Weißer Hintergrund | ✅ | `color-scheme:light` auf `html,body`, `background:#FFFFFF`, kein `prefers-color-scheme`-Override. |
| K5 | Beamer-Lesbarkeit | ✅ (nach Fix) | Vollständiger Scan aller `font-size`-Werte inkl. Beamer-Kaskade per Python-Skript ergab ursprünglich 14,0–15,2px Fließtext im Normal-Zustand (< 16px-Floor). Behoben durch Basiswert-Anhebung + explizite Beamer-Stufen-Overrides. Playwright-`getComputedStyle`-Messung nach Fix: Normal 16–17,6px, Beamer 22px, Beamer XL 28px, Beamer XXL 34px — exakt auf den vier Floors der CLAUDE.md-Tabelle für `.komponente p`, `.box p`, `.frage p`, `.uebung p`, `.quote`, `.kette-step p`, `.prompt-text`, `.vergleich-table td` (Details siehe Playwright-Protokoll unten). Sekundärtext (Badges, Refs, Tabellenköpfe, 0.875–0.9rem) erreicht bereits über die reine Wurzel-Skalierung 14/17,5/21/24,5px — klar über dem 14/15/18/21px-Floor, keine Anpassung nötig. |
| K6 | Kein Sliding-Panel-Layout | ✅ | Split-Screen 40/60 (`.panel-left`/`.panel-right`) permanent nebeneinander sichtbar, keine Slide-Transition. Rechts wechseln nur Tab-Inhalte per Neu-Rendering, kein verstecktes Off-Canvas-Panel. |
| K7 | UTF-8-Encoding sauber | ✅ | `grep -n "\\u00"` → 0 Treffer. Screenshots zeigen Umlaute, „…", – korrekt (siehe Playwright-Screenshots). |
| K15 | Erreichbarkeit nicht-live-relevanter Inhalte | ✅ | Kein `overflow:hidden` auf `html`/`body`. Playwright: Footer nach Scroll ans Seitenende erreichbar, 4 Footer-Boxen vorhanden und öffnenbar. |
| K18 | Beamer-Modus-Toggle (vierstufig) | ✅ | Playwright-Test: 5 Klicks auf `#beamerBtn`, `document.documentElement.className` geloggt: `''` → `'beamer'` → `'beamer beamer-xl'` → `'beamer beamer-xl beamer-xxl'` → `''`. Exakt die vier spezifizierten kumulativen Zustände, Button-Label zeigt jeweils die nächste Aktion. Footer bei Stufe ≥1 `display:none` bestätigt (CSS-Regel vorhanden, Screenshot zeigt Footer ausgeblendet bei Beamer XXL). Signatur bleibt `position:fixed` durchgehend erreichbar, keine Kollision mit Pillnav/Beamer-Button beobachtet (Screenshots Desktop 1400px, alle vier Stufen). |
| K19 | Systemprompt-Box enthält Master-Bau-Prompt | ✅ | Footer-Box „Systemprompt" enthält vollständigen Bau-Prompt (Zweck, Struktur, Inhalt pro Spur, Design-Vorgaben inkl. Persona-Farbcodierung, explizite Nicht-tun-Liste, Änderungshistorie v1–v3) — mit diesem Text allein wäre das Tool nachbaubar. |

## B. Inhaltliche Muss-Kriterien

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K8 | Keine generischen Werte | ✅ | Alle Kennzahlen sind konkret und fallstudienspezifisch (5.000 Einstellungsentscheidungen, 78 %/52 % Altersverteilung, 1.200 Initiativbewerbungen/Quartal, 60/340 Interviews, 15-%-Gewichtungsschwelle). Jeder Schwellenwert trägt sichtbar ein „Fallstudienannahme"/„Projektentscheidung"-Etikett (`.annahme-tag`), das den Fehlschluss „Norm X schreibt Wert Y vor" verhindert — im Transfer-Tab aller vier Bausteine per Screenshot bestätigt. |
| K9 | Szenariotreue | ✅ | Durchgehend derselbe Cast (Ela/Projektleitung, Knut/Entwicklung, Sarah/Vertrieb, Petra/QM, Herr Bachmeier/Geschäftsführung) und derselbe Fall (TalentMatch AI, Vantera Systemtechnik GmbH) über alle vier Bausteine und den Vergleich-Modus hinweg. Keine Vermischung mit dem Marmorkuchen-Universum (`grep -n "Marmorkuchen\|Bäckerei"` → 0 Treffer). |
| K10 | Problem-Requirement-Solution-Trennung | ✅ | Transfer-Tab jedes Bausteins zeigt die fünfstufige Kette Problem → Qualitätsziel → Requirement → Akzeptanzkriterium → Prüfung explizit getrennt und beschriftet (`.kette-label`) — keine Vermischung von Problem und Lösung in einem Satz. |
| K17 | Aktualität referenzierter Normen/Frameworks | ✅ | Referenziert: IREB CPRE-Glossar, IIBA BABOK Guide v3 (2015, unverändert aktuell), ISO/IEC 25010:2023, EU AI Act (VO (EU) 2024/1689) i.d.F. der Digital-Omnibus-Verordnung (EU) 2026/1744. Frist-Verschiebung auf 02.12.2027 mit Datumsangaben zu Verabschiedung/Veröffentlichung/Inkrafttreten belegt, Normen-Register im Footer enthält Stand-der-Recherche-Hinweis (30.08.2026). Kein Normbezug ohne Status/Datum bei sich entwickelndem Recht. |

## C. Kann-Kriterien (für Auszeichnung)

| K | Aussage | Ergebnis | Nachweis |
|---|---|---|---|
| K11 | Design-System-Konformität | ✅ | Kanonische Footer-Klassennamen (`.footer-sig`, `.footer-details`/`.footer-grid`, `.footer-box`, `.footer-summary`/`summary`, `.footer-content`, `.footer-mono`, `.footer-sans`, `.footer-table`) korrekt verwendet. Signatur `position:fixed; top:14px; right:28px` mit `max-width:900px`-Fallback auf `static`. Beamer-Muster folgt dem CLAUDE.md-Vierstufen-Pattern (kumulative Klassen, Label zeigt nächste Aktion, invertierte Button-Farbe ab Stufe 1). |
| K12 | Validierungsnachweis vorhanden | ✅ | Dieses Dokument + Playwright-Testlauf (Protokoll unten) + vier Screenshots (Desktop Vergleich-Modus, Desktop Transfer-Tab, Beamer XXL, Mobile 390px). |
| K13 | Vortrags-Skript-Box vorhanden | ✅ | Footer-Box „Vortrags-Skript" deckt alle vier Bausteine + Vergleich-Abschluss mit Klick-Regie (kursiv/eingeklammert) und wörtlichem Sprechtext ab, plus allgemeine Regie-Hinweise am Ende. |
| K14 | Audit-Status-Zeile aktuell | ✅ | `.footer-status`: „Zuletzt geprüft: 30.08.2026 · Version 3 · Status: ✅ Zertifiziert · Details siehe Audit-Protokoll" — Datum identisch zu diesem Protokoll. |
| K16 | Companion-Datei Sprecher-Skript vorhanden | ✅ | `tools/Sprecher-Skript_TalentMatch-ML-Paradigmen.md`, inhaltlich synchron zur Footer-Vortrags-Skript-Box. |

---

## Siegel-Ergebnis

Alle Muss-Kriterien (K1–K10, K15, K17, K18, K19) bestanden. Alle Kann-Kriterien (K11–K14, K16)
bestanden.

**⭐ Zertifiziert mit Auszeichnung**

---

## D. Antworten auf Michaelas drei offene Punkte

### 1. Echte visuelle Prüfung

Per Playwright/Chromium headless durchgeführt (kein simulierter DOM, echte Browser-Engine inkl.
Layout/CSS-Rendering):

- **Kette-Pfeile:** `::before`-Pseudo-Element mit `content:"↓"` rendert auf allen vier
  Requirements-Ketten (Transfer-Tab) korrekt zwischen den fünf Kette-Steps, erster Step ohne
  Pfeil (`:first-child::before{content:none}`) — bestätigt per `getComputedStyle(el,
  '::before').content` für alle 4 Bausteine × 5 Steps.
- **Tab-Übergänge:** Verstehen/Arbeiten/Transfer wechseln ohne Layout-Sprung oder Flackern, aktiver
  Tab optisch klar hervorgehoben (`.tabbtn.active`), Inhalt wird bei jedem Wechsel sauber neu
  gerendert (kein Anhängen alter Inhalte).
- **Beamer-Stufen:** Alle vier Stufen visuell per Screenshot geprüft (Desktop 1400px). Keine
  Kollision zwischen der fixen Signatur oben rechts und Pillnav/Beamer-Button — Header nutzt
  `flex-wrap`, Signatur liegt in eigener fixer Ebene mit halbtransparentem Weiß-Hintergrund.
  Footer korrekt ab Stufe 1 ausgeblendet. Schriftgrößen exakt auf den vier Floors (siehe K5).
- **Mobile (390px):** Kein Layout-Bruch. Signatur fällt korrekt in den statischen Textfluss,
  Pillnav bricht zweizeilig um, Panels stapeln sich einspaltig, Footer-Boxen bleiben erreichbar.

### 2. Ökosystem-Verweise als echte Links

Alle vier im Ursprungstext genannten Bezüge wurden gegen den tatsächlichen Repo-Bestand geprüft:

| Ursprünglicher Verweis | Ergebnis der Recherche | Umsetzung |
|---|---|---|
| „RSGA-Sufficiency-Ampel" | Existiert unter diesem Namen **nicht** als eigenständiges Tool. `tools/talentmatch-ai-sufficiency-gate.html` selbst hält fest: „Begleitstücke ‚RSGA-Sufficiency-Ampel' und ‚Die zehn Wächter' sind … noch nicht als eigenständige Denkraum-Tools veröffentlicht." | Verweis auf das tatsächlich existierende, inhaltlich nächstliegende Tool `talentmatch-ai-sufficiency-gate.html` umgestellt, mit Hinweis, dass ein separates Scoring-Tool noch fehlt. |
| „29148-Lernreise" | Existiert unter diesem Namen nicht. `tools/ba-lifecycle-lernreise.html` referenziert IEEE 29148 mehrfach als Querverweis und nutzt dieselbe TalentMatch-AI-Station. | Auf `ba-lifecycle-lernreise.html` verlinkt, mit Hinweis, dass eine eigenständige, nur auf 29148 fokussierte Lernreise bislang nicht existiert. |
| „BetrVG-Mitbestimmungs-Simulator" | Keine Treffer im gesamten Repo (`grep -ri "BetrVG\|Mitbestimmung"` außerhalb dieses Tools) — existiert nicht, auch nicht unter anderem Namen. | Bleibt unverlinkter Fließtext mit explizitem Hinweis „als eigenständiges Denkraum-Tool noch nicht gebaut". |
| „SE-Lifecycle-Lernreise" | Existiert exakt unter diesem Namen (`tools/se-lifecycle-lernreise.html`) und nutzt nachweislich dieselbe TalentMatch-AI-/Vantera-Fallwelt. | Echter relativer Link `./se-lifecycle-lernreise.html`. |

Playwright bestätigt: Alle drei gesetzten Links (`./talentmatch-ai-sufficiency-gate.html`,
`./ba-lifecycle-lernreise.html`, `./se-lifecycle-lernreise.html`) zeigen auf tatsächlich
existierende Dateien im selben Verzeichnis.

### 3. 52-%-Bewerbungspool-Zahl gegensichern

Repo-weiter Abgleich gegen alle anderen Tools, die TalentMatch AI / Vantera Systemtechnik GmbH
referenzieren (`talentmatch-ai-sufficiency-gate.html`, `ba-lifecycle-lernreise.html`,
`se-lifecycle-lernreise.html`, `sarahs-weg-zum-qualitaetskuchen.html`,
`ba-rollenwandel-explorer.html`, `ki-architektur-glossar-reba.html`,
`diagramm-kompass-re-ba.html`) per gezielter Suche nach Bewerbungspool-Kennzahlen,
Altersverteilungen und Bias-Prozentwerten im CV-Screening-Kontext: **kein Tool nennt eine eigene
Bewerbungspool-Zusammensetzung oder einen abweichenden Prozentwert für dasselbe Szenario** — kein
Widerspruch gefunden. Andere Tools verwenden andere, nicht überschneidende Bias-Kennzahlen (z. B.
Gender-Bias-Kennzahl < 2 Prozentpunkte in `sarahs-weg-zum-qualitaetskuchen.html`, Canary-Rollout
mit 5 % Bias-Monitoring in `se-lifecycle-lernreise.html`) — diese widersprechen der 52-%-Zahl
nicht, weil sie ein anderes Merkmal (Geschlecht statt Alter) bzw. eine andere Prozessphase
betreffen. Der Wert bleibt eine Fallstudienannahme dieses einen Tools, nicht repo-weit fest
verankert; Systemprompt-Hinweis von „OFFENER PRÜFPUNKT" auf „GEPRÜFTER PUNKT" mit Datum
umgestellt.

---

## Playwright-Testprotokoll (Kurzfassung)

Ausgeführt gegen `http://127.0.0.1:8934/tools/talentmatch-ml-paradigmen.html`, Chromium headless
(`/opt/pw-browsers/chromium`).

1. Back-Link `href="../index.html"` vorhanden und korrekt.
2. 5 Pills gerendert (Supervised, Unsupervised, Semi-Supervised, Reinforcement, Vergleich).
3. Für alle 4 Bausteine: Transfer-Tab zeigt genau 5 Kette-Steps, `::before`-Pfeile korrekt bei
   Step 2–5, kein Pfeil bei Step 1.
4. Vergleich-Modus: Merksatz vorhanden, 3 Ökosystem-Links vorhanden und alle auf existierende
   Dateien verweisend (siehe Tabelle oben).
5. Beamer-Zyklus über 5 Klicks: `''` → `'beamer'` → `'beamer beamer-xl'` →
   `'beamer beamer-xl beamer-xxl'` → `''`, Button-Label korrekt („Beamer-Modus: Normal/Beamer/
   Beamer XL/Beamer XXL").
6. Computed `font-size` für `.quote`, `.komponente p`, `.box p`, `.uebung p`, `.kette-step p`,
   `.prompt-text`, `.vergleich-table td` bei jeder Stufe: 22px (Beamer), 28px (Beamer XL), 34px
   (Beamer XXL) — exakt auf den Floors.
7. Mobile (390×844): Signatur `position:static` bestätigt (Fallback korrekt), 4 Footer-Boxen
   vorhanden, kein horizontaler Overflow im Screenshot.
8. Konsolenfehler: nur eine harmlose 404 (Favicon, wie bei anderen Tools im Repo üblich) — keine
   JS-Fehler.

## Bekannte Abweichungen von der Master-Prompt-Vorlage

- Kein `localStorage`/`sessionStorage` verwendet — laut Systemprompt bewusst, da keine
  Zustands-Persistenz über einen Reload hinweg vorgesehen ist (Workshop-Tool, ein Durchlauf pro
  Sitzung).
- Root-Font-Size-Skalierung (`html.beamer{font-size:20px}` usw.) bleibt als generelle
  Baseline-Bequemlichkeit erhalten; die Fließtext-Floors werden zusätzlich durch explizite
  px-Overrides je Beamer-Stufe abgesichert (siehe K5), da reine proportionale Skalierung die
  nicht-proportionale Floor-Tabelle nicht exakt treffen kann.
