# DenkRaum

Sammlung eigenständiger HTML-Tools rund um Requirements Engineering und den kompetenten Umgang mit KI, für Michaela Kühn (www.michaela-kuehn.com).

## Struktur

- `index.html` — Landingpage mit Kachel-Links zu allen Tools, gruppiert in Rubriken (aktuell: "Requirements Engineering Tools", "KI Tools").
- `tools/` — alle Tools. Einzeldatei-Tools liegen direkt darin (z.B. `tools/fragenautomat.html`); Mehrdatei-Apps bekommen einen eigenen Unterordner (z.B. `tools/klarheits-sprint/`).

## Qualitätsstandard (K1–K19)

Der vollständige, verbindliche Prüfkatalog für alle Tools ist die Notion-Seite **„Qualitätskriterien-Checkliste (Siegel-Prüfung)"** (`391d6937-ee08-8183-9966-fd0e2e963de9`), abgeleitet aus dem **„Master-Prompt: Zusammenarbeit bei RE-Trainingstools"** (ebenfalls Notion). Beide sind kanonisch — dieses Dokument hier ist die Arbeitskopie mit den für den Alltag relevanten Bau-Mustern. **Bei Diskrepanz zwischen diesem Dokument und Notion gilt immer Notion.** Vor größeren Audits oder bei Unsicherheit die Notion-Seite frisch abrufen, statt sich allein auf dieses Dokument zu verlassen — die Checkliste entwickelt sich weiter (aktuell Version 1.7, K1–K19).

Kurzfassung der Siegel-Logik: ❌ Nicht zertifiziert, wenn mindestens ein Muss-Kriterium (K1–K10, K15, K17, K18, K19) fehlschlägt · ✅ Zertifiziert, wenn alle Muss-Kriterien bestehen · ⭐ Zertifiziert mit Auszeichnung, wenn zusätzlich alle Kann-Kriterien (K11–K14, K16) bestehen.

## Design-System: Struktur-Tokens (Radius, Schatten, Buttons)

Referenzimplementierung weiterhin `tools/steckbrief.html`. Diese Tokens gelten für die *Form* von Karten/Boxen/Buttons — **nicht** für Farben: Die Farbpalette bleibt pro Tool eigenständig und thematisch passend (z. B. dunkles Blueprint-Grid bei `stakeholder-memory.html`, warme Werkstatt-Töne im `priorisierungslabor.html`, die vier Themenfarben in `fallstudie-qualitaetssystem.html`). Ziel ist ein wiedererkennbarer, weicher Griff über alle Tools hinweg — keine Vereinheitlichung der Farbwelt, das würde die inhaltliche Unterscheidbarkeit der Tools zerstören.

Radius-Skala (nach Bauteil-Gewicht, an `tools/steckbrief.html` abgelesen):

| Radius | Verwendung |
|---|---|
| 4px | kleine Akzent-/Zitat-Boxen (z. B. farbiger linker Rand + Hervorhebung) |
| 8px | Code-/Mono-Boxen |
| 12px | Buttons, Auswahl-Optionen, Chips |
| 16px | Karten/Panels — Standardfall für die meisten Content-Boxen |
| 20–28px | herausgehobene Hero-/Hauptkarte, falls das Tool eine solche hat |
| 999px (voller Pill) | Beamer-Button, Badges, Status-Pills — bereits bestehende Konvention |

Schatten: Karten/Panels bekommen einen dezenten Schatten statt hart am Hintergrund zu kleben, z. B. `box-shadow:0 6px 16px rgba(0,0,0,.03)` für normale Karten bis `0 16px 34px rgba(0,0,0,.08)` für die Hero-/Hauptkarte. Wert an die `--ink`-Farbe des jeweiligen Tools anpassen (`rgba(<ink-rgb>,.03–.08)`), nicht stur `rgba(0,0,0,…)` kopieren, wenn das Tool eine eigene dunkle Grundfarbe hat.

Buttons: Primär-/Sekundär-Aktionsbuttons 12px Radius; Meta-Controls (Beamer-Button, Badges, Status-Pills) voller Pill (999px) — deckt sich mit dem bereits bestehenden Beamer-Button-Muster oben.

Umsetzung: Bestehende Tools werden schrittweise nachgezogen (nicht als Ad-hoc-Blitzumbau bei jeder Kleinigkeit), aber aktiv im Rahmen von Design-Audits — nicht erst warten, bis ohnehin ein inhaltliches Update ansteht.

## Konventionen für jedes Tool

Jedes Tool bekommt im Header:

1. **Zurück-Link zur Startseite** — `<a href="../index.html">← Zurück zur Startseite</a>` (Pfad relativ zu `tools/`, ggf. `../../index.html` bei einer Ebene tiefer wie `klarheits-sprint/`).
2. **Signatur** — Name + Website-Link, fix positioniert oben rechts im Viewport (`position:fixed; top:14px; right:28px;`), unabhängig von Modus/Scroll-Zustand der Live-Ansicht. Name fett, Link darunter in Akzentfarbe: `<strong>Michaela Kühn</strong> · <a href="https://www.michaela-kuehn.com">www.michaela-kuehn.com</a>` (www.michaela-kuehn.**com**, nicht .de). Positionierung muss Kollisionen mit dynamischen Panel-Titeln ausschließen. Unter 900px Breite: Fallback auf `position:static`, rechtsbündig.
3. **Beamer-Modus-Button (K18, vierstufig)** — Normal → Beamer → Beamer XL → Beamer XXL, danach zurück auf Normal. Kumulative CSS-Klassen auf `<html>` (`beamer`, `beamer-xl`, `beamer-xxl`), reine Größensteigerung, kein inhaltlicher Modus-Wechsel. Button oben rechts neben dem Reset-Button, gleiche Pill-Stilistik; Label zeigt immer die *nächste* Aktion; aktiver Zustand (Stufe 1–3) über invertierte Button-Farbe. **Footer ab Stufe 1 `display:none`.** Kanonisches Muster (Selektoren wie `.nfa-text`/`.p-name`/`.tr-name` sind Beispiele aus der Referenzimplementierung — pro Tool auf die eigenen Haupttext-/Überschrift-/Sekundärtext-Elemente übertragen, Größen-Floors dabei einhalten):

```css
.beamer-btn{
  background:transparent;border:1.5px solid var(--line);
  color:var(--ink-dim);font-size:15px;padding:10px 20px;
  border-radius:999px;cursor:pointer;
}
html.beamer .beamer-btn,
html.beamer-xl .beamer-btn,
html.beamer-xxl .beamer-btn{ background:var(--ink); color:#fff; border-color:var(--ink); }

html.beamer{ --ink-dim:#3D4A5C; }
html.beamer .nfa-text{ font-size:22px; }
html.beamer .panel-head .p-name{ font-size:44px; }
html.beamer .tr-name{ font-size:26px; }
html.beamer .nfa-ref, html.beamer .norm-badge, html.beamer .warn-badge{ font-size:15px; }
html.beamer .footer{ display:none; }

html.beamer-xl .nfa-text{ font-size:28px; }
html.beamer-xl .panel-head .p-name{ font-size:54px; }
html.beamer-xl .tr-name{ font-size:32px; }
html.beamer-xl .nfa-ref, html.beamer-xl .norm-badge, html.beamer-xl .warn-badge{ font-size:18px; }

html.beamer-xxl .nfa-text{ font-size:34px; }
html.beamer-xxl .panel-head .p-name{ font-size:64px; }
html.beamer-xxl .tr-name{ font-size:38px; }
html.beamer-xxl .nfa-ref, html.beamer-xxl .norm-badge, html.beamer-xxl .warn-badge{ font-size:21px; }
```

```js
const BEAMER_LEVELS = [
  { classes: [],                                    label: '☀ Beamer' },
  { classes: ['beamer'],                             label: '☀ Beamer XL' },
  { classes: ['beamer', 'beamer-xl'],                label: '☀ Beamer XXL' },
  { classes: ['beamer', 'beamer-xl', 'beamer-xxl'],  label: '☀ Normal' }
];
let beamerLevel = 0;
document.getElementById('beamerBtn').addEventListener('click', function(){
  beamerLevel = (beamerLevel + 1) % 4;
  document.documentElement.classList.remove('beamer', 'beamer-xl', 'beamer-xxl');
  BEAMER_LEVELS[beamerLevel].classes.forEach(c => document.documentElement.classList.add(c));
  this.textContent = BEAMER_LEVELS[beamerLevel].label;
});
```

Größentabelle (kumulativ, jede Stufe überschreibt die vorherige): Fließtext/Hauptinhalt ≥16px Normal / ≥22px Beamer / ≥28px Beamer XL / ≥34px Beamer XXL. Panel-Überschriften: — / ≥44px / ≥54px / ≥64px. Sekundärtext (Codes, Refs, Badges): ≥14px / ≥15px / ≥18px / ≥21px. `--ink-dim` ab Stufe 1 auf einen Wert mit Kontrast ≥5:1 setzen (Referenz: `#3D4A5C`).

**Migrationshinweis:** Bestehende Tools mit dem älteren dreistufigen `zoom`-Muster (`data-beamer="1|2"`) werden nicht pauschal umgebaut, sondern beim nächsten inhaltlichen Update auf das vierstufige Klassen-Muster nachgerüstet — kein Sofort-Rollout über den gesamten Bestand nötig.

Persistenz nach dem im jeweiligen Tool bereits verwendeten Muster (`localStorage` state-Objekt oder `sessionStorage` safeGet/safeSet) — kein neues Persistenz-Muster einführen, wenn eines schon existiert.

Wird ein neues Tool hinzugefügt (oder ein bestehendes ohne diese drei Elemente bearbeitet), diese Konventionen anwenden, ohne dass explizit danach gefragt wird. Neue Tools zusätzlich immer als Kachel auf `index.html` verlinken, in der thematisch passenden Rubrik.

### Hero-/Einleitungstext-Breite

**Referenzimplementierung: `tools/steckbrief.html`.** Bei Zweifel, wie ein Hero-Bereich aufgebaut sein soll, dort nachsehen statt neu zu improvisieren.

Struktur (verbindlich für jedes Tool mit einem klassischen Hero-Bereich, d.h. H1 + mehrsätziger Einleitungsabsatz — nicht für kompakte Sticky-Utility-Header ohne Fließtext-Intro):

1. **Topbar** (eigene Zeile, oberhalb der Hero-Karte/des Hero-Bereichs): Zurück-Link links, Signatur + Beamer-Modus-Button rechts. Diese Zeile enthält ausschließlich Navigation/Meta-Controls, nie die Überschrift oder den Einleitungstext.
2. **Hero darunter**: Eyebrow (optional), H1, Lead-Absatz — ohne jeden konkurrierenden Flex-/Grid-Nachbarn in derselben Zeile und ohne `max-width`. Beide füllen die volle verfügbare Breite des Hauptinhalts-Containers (`.wrap`/`.app`/`.container` o. ä.) aus, genau wie die übrigen Hauptinhalts-Bereiche des Tools (Panels, Karten, Boards) weiter unten.

Anti-Pattern (so nicht):

```
Von der ersten Idee zum Qualitätssystem
[H1 bricht nach ~500px um, obwohl 1100px+ Platz da wären]

Diese Fallstudie ist keine Erfindung. Sie zeigt sieben reale
Stationen ...
[Lead-Absatz genauso schmal, rechts daneben nur Leerraum]
```

Ebenfalls Anti-Pattern, auch ohne `max-width`: H1/Lead-Absatz stehen als Flex-Item neben einem Beamer-Button oder einer nicht `position:fixed` gesetzten Signatur in derselben Zeile — das Textelement schrumpft dann auf seine Inhaltsbreite (Shrink-to-fit), statt die Zeile zu füllen, auch ganz ohne explizite Breitenangabe.

Ausnahme nur bei einer bewussten, im Tool erkennbaren Layout-Entscheidung mit echtem funktionalem Inhalt daneben (z. B. ein interaktives Score-Dial-Widget in einem zweispaltigen Hero) — nicht bei Navigation/Meta-Controls (Zurück-Link, Signatur, Beamer-Button), die immer in die Topbar gehören. Vor Auslieferung auf einem breiten Viewport (≥1280px) gegenprüfen: Wirkt neben Überschrift oder Einleitung auffällig viel ungenutzter Weißraum, ist das ein Fehler, kein Stil.

### "NEU"-Badge auf index.html

Das `new-badge`-Element markiert ausschließlich Tools, die am selben Tag gebaut oder gemergt wurden — keine wochen- oder projektbezogene Interpretation. Bei jedem neuen Tool-Merge: zuerst bestehende `NEU`-Badges auf Kacheln entfernen, die nicht mehr vom aktuellen Tag stammen, dann den Badge für das neue Tool setzen. Badges bleiben nie über den Bau-Tag hinaus stehen.

### Crosslink-Block "Verwandte Tools" (optional, Format entschieden, Rollout offen)

Referenzimplementierung: `tools/iso-25010-kompendium.html`. Ein kurzer, klar begrenzter Absatz mit Liste, direkt **vor** dem `<footer>` (nicht darin, nicht in einer `<details>`-Box) — bleibt also ohne Aufklappen sichtbar:

```html
<div class="crosslink">
  Verwandte Denkraum-Tools zu diesem Thema:
  <ul>
    <li><a href="./anderes-tool.html">Tool-Name</a> — ein Satz, was das andere Tool zeigt und wie es sich vom aktuellen Tool unterscheidet.</li>
  </ul>
</div>
```

**`<div>`, nicht `<p>`:** Ein `<ul>` ist Block-Inhalt — steckt es in einem `<p>`, schließt der Browser das `<p>` beim Parsen automatisch vor dem `<ul>` (HTML5 end-tag-omission-Regel). Die Liste landet dann als Geschwisterelement außerhalb von `.crosslink`, `.crosslink a`/`.crosslink li` greifen nicht mehr — sichtbar bricht nichts, aber Verlinkungsfarbe und Listenabstand fallen lautlos auf Browser-Default zurück. Betrifft nur diese listenbasierte Variante; der ältere einzeilige `.crosslink`-Stil ohne `<ul>` (z. B. `tools/steckbrief.html`, `tools/eu-ai-act-framework.html`) bleibt als `<p>` unverändert korrekt.

```css
.crosslink{margin-top:20px;font-size:14px;color:var(--ink-dim);}
.crosslink a{color:var(--accent);font-weight:700;text-decoration:none;}
.crosslink a:hover{text-decoration:underline;}
.crosslink ul{margin:8px 0 0;padding-left:20px;}
.crosslink li{margin-bottom:4px;}
```

**Kuratieren, nicht auflisten:** Nur Tools verlinken, zu denen eine echte inhaltliche Verwandtschaft besteht (gleiche Norm, gleiches Artefakt, gleicher Fall) — kein generisches „siehe auch alle Tools". Üblich sind 2–5 Einträge. Jeder Eintrag bekommt einen Differenzierungssatz, der sagt, *was am verlinkten Tool anders ist* (Umfang, Tiefe, Blickwinkel), nicht nur eine Wiederholung der Kachel-Beschreibung von `index.html` — sonst bleibt unklar, warum man wechseln sollte. Pfade relativ zu `tools/` (ggf. `../` bei einer Ebene tiefer wie `klarheits-sprint/`).

**Status:** Format und Platzierung sind entschieden. Rollout ist **kein** K-Kriterium und **kein** Pflichtbaustein für jedes neue oder bestehende Tool — Einführung pro Tool im Einzelfall, wo eine echte Verwandtschaft besteht. Bei einem neuen Tool aus einem thematischen Cluster (z. B. FA/NFA/User-Story/ISO-Tools) mitdenken, ob es sich anbietet, ohne den gesamten Bestand automatisch nachzuziehen.

## Footer-Standard

Jedes Tool bekommt im Footer vier strikt inhaltlich getrennte Aufklapp-Boxen (`<details>`), kein Impressum:

1. **Systemprompt** (Monospace, ≥14px) — enthält **immer den wiederverwendbaren Master-Bau-Prompt** für dieses Tool: Struktur/Layout, Inhalt pro Spur/Modus, Design-Vorgaben, Persona-Bezug, explizite Nicht-tun-Liste — geschrieben so, dass eine interessierte Person damit ein vergleichbares Tool selbst entwickeln könnte (K19, **Muss-Kriterium**). Reine Bauanleitung, keine didaktische Aufbereitung. Falls das Tool zusätzlich einen echten Laufzeit-Prompt verwendet (z. B. Online-Modus mit echtem KI-Aufruf), wird dieser als separater, klar abgegrenzter Abschnitt ergänzt, ohne den Master-Bau-Prompt zu ersetzen.
2. **Handbuch** (Sans-Serif, ≥16px) — didaktische Konstruktionslogik nach PromptSchule-Methodik: Framework (RTF/CO-STAR/RISEN/TRACE/PACT/APE), 5 Dimensionen (Rolle/Aufgabe/Kontext/Format/Eingrenzung), zentraler Lernhinweis, Nachbau-Tipp. Zielgruppe: Trainerin als Entwicklerin, keine Vortragsinhalte.
3. **Vortrags-Skript** (Sans-Serif, ≥16px, Klick-Hinweise kursiv/eingeklammert) — Sprechtext für den Live-Vortrag, Schritt für Schritt entlang der Tool-States: Klick-/Regieanweisung + wörtlicher Sprechtext + Übergangssatz je Schritt, am Ende allgemeine Regie-Hinweise (Timing, was nicht zuerst gesagt werden soll).
4. **Normen-Register** (Sans-Serif, ≥16px) — Tabelle der im Tool tatsächlich referenzierten Normen/Frameworks/Quellen (Spalten: Framework/Quelle, Fassung/Status, Bezug im Tool), plus ein kurzer Hinweis, den Stand vor Einsatz in neuen Materialien zu prüfen (K17-Bezug). Ergänzt die einzeilige Kurzfassung in `.footer-sig`, ersetzt sie nicht. War bereits vor dieser Dokumentation in mehreren Tools gelebte Praxis (u. a. `tools/cpmai-prozess-board.html`); hier nachträglich als verbindlicher vierter Baustein festgehalten (Korrektur 03.08.2026).

Kanonische CSS-Klassennamen (verbindlich): `.footer-sig`, `.footer-details`, `.footer-box`, `.footer-summary`, `.footer-content`, `.footer-mono` (Systemprompt-Box), `.footer-sans` (Handbuch/Vortrags-Skript/Normen-Register), `.footer-table` (Tabellen in Handbuch/Normen-Register). Anordnung der vier Boxen (nebeneinander oder gestapelt) ist Tool-Entscheidung; Pflicht-Fallback unter 900px Breite: immer gestapelt.

`.footer-sig` beginnt immer mit Name + Website-Link, gefolgt von den im Tool tatsächlich referenzierten Normen/Standards, danach optional die Audit-Status-Zeile.

### Companion-Datei Sprecher-Skript (K16)

Bei jeder Erstellung oder inhaltlichen Änderung der Vortrags-Skript-Box wird automatisch — ohne separate Aufforderung — zusätzlich eine eigenständige Datei `Sprecher-Skript_<Toolname>.md` mitgeliefert (gleiche Schritt-Gliederung, identischer Inhalt, inkl. Klick-Hinweisen und Regie-Hinweisen am Ende). Bei Diskrepanz gilt die Footer-Box als Quelle; die `.md` wird bei der nächsten Änderung synchronisiert.

### Glossar: optionale fünfte Footer-Box (Format festgelegt, Rollout weiterhin offen)

Korrektur (03.08.2026): Der Punkt hieß ursprünglich „Normenregister & Glossar" und ging davon aus, dass es noch kein Normenregister gäbe. Das war falsch — 15 Tools hatten zu diesem Zeitpunkt bereits eine vierte Footer-Box „Normen-Register", nur undokumentiert. Der Footer-Standard oben ist entsprechend korrigiert (vier Boxen statt drei); dieser Teil ist damit erledigt.

**Standort entschieden (03.08.2026):** Ein Glossar gehört, wenn es eingeführt wird, als eigene Footer-Box ins jeweilige Tool selbst — analog zum Normen-Register, nicht auf eine zentrale `index.html`-Seite. Begründung: K1 (Offlinefähigkeit) verlangt, dass jedes Tool für sich allein funktioniert, auch als lokal geöffnete Datei ohne Zugriff auf `index.html` (z. B. `file://` auf einem iPad im Seminar) — ein rein zentrales Glossar wäre in diesem Fall unerreichbar. Eine zentrale Übersichtsseite kann langfristig ergänzend dazukommen (Konsolidierung/Querverweis über mehrere Tools hinweg), aber nie als Ersatz für die Tool-lokale Box.

**Format festgelegt (03.08.2026), Referenzimplementierung `tools/story-mapping-kundenperspektiven.html`:** Optionale **fünfte** Footer-Box „📖 Glossar" (`.footer-box`/`.footer-summary`/`.footer-content.footer-sans` wie die anderen vier), Inhalt als Definitionsliste statt Tabelle:

```html
<dl class="footer-glossary">
  <dt>Begriff</dt>
  <dd>Kurzerklärung, bezogen auf die Verwendung in diesem Tool.</dd>
</dl>
```

```css
.footer-glossary{ margin:0; }
.footer-glossary dt{ font-weight:700; color:var(--ink); font-size:15px; margin-top:12px; }
.footer-glossary dt:first-child{ margin-top:0; }
.footer-glossary dd{ margin:2px 0 0; color:var(--ink-soft); font-size:14px; line-height:1.5; }
```

Nur Begriffe, die im jeweiligen Tool tatsächlich vorkommen (kein allgemeines Fach-Lexikon) — kein Ersatz für Handbuch/Normen-Register, sondern kurze Vokabel-Klärung für Teilnehmende. `.footer-details`-Grid bei fünf Boxen auf `repeat(5,1fr)` (≥901px) statt `repeat(4,1fr)`.

**Weiterhin offen:** Ob/wann ein Glossar für ein Tool verbindlich wird — aktuell **optional**, kein Muss-Kriterium. Nur einführen, wenn ein Tool tatsächlich erklärungsbedürftige Begriffe verwendet, nicht als Pflichtbaustein bei jedem neuen Tool ergänzen.

**Status: Standort und Format entschieden. Rollout/Pflicht weiterhin offen — Einführung pro Tool im Einzelfall, kein automatischer Rollout über den Bestand.**

### Audit-Status-Zeile (K14)

Einzeilige Statusnotiz direkt in `.footer-sig` — nicht als eigene Box, nicht mit vollem Audit-Report-Inhalt:

```
Zuletzt geprüft: TT.MM.JJJJ · Status: ✅ Zertifiziert / ⭐ Zertifiziert mit Auszeichnung / ❌ Nicht zertifiziert · Details siehe Audit-Protokoll
```

Klein, gedeckte Farbe (`--muted`), kein eigener Rahmen. **Verfalls-Disziplin**: bei jeder inhaltlichen Änderung der Datei entweder aktualisieren oder entfernen — eine veraltete Zeile ist selbst ein Qualitätsmangel (K8-Prinzip: keine veralteten/generischen Werte). Kein konkreter Dateipfad zum Audit-Protokoll im HTML, nur der Hinweis, dass eines existiert.

## Vorsicht: Anführungszeichen

In diesem Repo trat wiederholt Korruption von geraden Anführungszeichen (`"`) zu typografischen Anführungszeichen (`"`/`"`) in `href`-Attributen auf, wenn Textänderungen über den normalen Editier-Weg liefen. Bei Änderungen an `href="..."`-Attributen das Ergebnis auf gerade ASCII-Anführungszeichen prüfen (z.B. `grep` nach `href=[""]` oder ein Python-Check auf `chr(34)`), bevor committet wird — typografische Anführungszeichen brechen den Link (Browser parst ihn dann als unquoted attribute value inklusive der Anführungszeichen-Glyphen).
