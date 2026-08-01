# DenkRaum

Sammlung eigenständiger HTML-Tools rund um Requirements Engineering und den kompetenten Umgang mit KI, für Michaela Kühn (www.michaela-kuehn.com).

## Struktur

- `index.html` — Landingpage mit Kachel-Links zu allen Tools, gruppiert in Rubriken (aktuell: "Requirements Engineering Tools", "KI Tools").
- `tools/` — alle Tools. Einzeldatei-Tools liegen direkt darin (z.B. `tools/fragenautomat.html`); Mehrdatei-Apps bekommen einen eigenen Unterordner (z.B. `tools/klarheits-sprint/`).

## Qualitätsstandard (K1–K19)

Der vollständige, verbindliche Prüfkatalog für alle Tools ist die Notion-Seite **„Qualitätskriterien-Checkliste (Siegel-Prüfung)"** (`391d6937-ee08-8183-9966-fd0e2e963de9`), abgeleitet aus dem **„Master-Prompt: Zusammenarbeit bei RE-Trainingstools"** (ebenfalls Notion). Beide sind kanonisch — dieses Dokument hier ist die Arbeitskopie mit den für den Alltag relevanten Bau-Mustern. **Bei Diskrepanz zwischen diesem Dokument und Notion gilt immer Notion.** Vor größeren Audits oder bei Unsicherheit die Notion-Seite frisch abrufen, statt sich allein auf dieses Dokument zu verlassen — die Checkliste entwickelt sich weiter (aktuell Version 1.7, K1–K19).

Kurzfassung der Siegel-Logik: ❌ Nicht zertifiziert, wenn mindestens ein Muss-Kriterium (K1–K10, K15, K17, K18, K19) fehlschlägt · ✅ Zertifiziert, wenn alle Muss-Kriterien bestehen · ⭐ Zertifiziert mit Auszeichnung, wenn zusätzlich alle Kann-Kriterien (K11–K14, K16) bestehen.

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

H1, Lead-Absatz und Hervorhebungs-Boxen im Hero-Bereich dürfen nicht durch ein unnötig enges `max-width` eingeengt werden, wenn dadurch neben dem Text auffällig viel unbenutzter Weißraum entsteht (sichtbar v. a. ab ≥1280px Viewport-Breite). Richtwert: `max-width` nicht deutlich unter der Breite anderer Hauptinhalts-Elemente des Tools (z. B. Stage-/Panel-Bereiche), es sei denn ein bewusster Lesbarkeits-Grund rechtfertigt es explizit. Vor Auslieferung auf einem breiten Viewport kurz gegenprüfen.

### "NEU"-Badge auf index.html

Das `new-badge`-Element markiert ausschließlich Tools, die am selben Tag gebaut oder gemergt wurden — keine wochen- oder projektbezogene Interpretation. Bei jedem neuen Tool-Merge: zuerst bestehende `NEU`-Badges auf Kacheln entfernen, die nicht mehr vom aktuellen Tag stammen, dann den Badge für das neue Tool setzen. Badges bleiben nie über den Bau-Tag hinaus stehen.

## Footer-Standard

Jedes Tool bekommt im Footer drei strikt inhaltlich getrennte Aufklapp-Boxen (`<details>`), kein Impressum:

1. **Systemprompt** (Monospace, ≥14px) — enthält **immer den wiederverwendbaren Master-Bau-Prompt** für dieses Tool: Struktur/Layout, Inhalt pro Spur/Modus, Design-Vorgaben, Persona-Bezug, explizite Nicht-tun-Liste — geschrieben so, dass eine interessierte Person damit ein vergleichbares Tool selbst entwickeln könnte (K19, **Muss-Kriterium**). Reine Bauanleitung, keine didaktische Aufbereitung. Falls das Tool zusätzlich einen echten Laufzeit-Prompt verwendet (z. B. Online-Modus mit echtem KI-Aufruf), wird dieser als separater, klar abgegrenzter Abschnitt ergänzt, ohne den Master-Bau-Prompt zu ersetzen.
2. **Handbuch** (Sans-Serif, ≥16px) — didaktische Konstruktionslogik nach PromptSchule-Methodik: Framework (RTF/CO-STAR/RISEN/TRACE/PACT/APE), 5 Dimensionen (Rolle/Aufgabe/Kontext/Format/Eingrenzung), zentraler Lernhinweis, Nachbau-Tipp. Zielgruppe: Trainerin als Entwicklerin, keine Vortragsinhalte.
3. **Vortrags-Skript** (Sans-Serif, ≥16px, Klick-Hinweise kursiv/eingeklammert) — Sprechtext für den Live-Vortrag, Schritt für Schritt entlang der Tool-States: Klick-/Regieanweisung + wörtlicher Sprechtext + Übergangssatz je Schritt, am Ende allgemeine Regie-Hinweise (Timing, was nicht zuerst gesagt werden soll).

Kanonische CSS-Klassennamen (verbindlich): `.footer-sig`, `.footer-details`, `.footer-box`, `.footer-summary`, `.footer-content`, `.footer-mono` (Systemprompt-Box), `.footer-sans` (Handbuch/Vortrags-Skript), `.footer-table`. Anordnung der drei Boxen (nebeneinander oder gestapelt) ist Tool-Entscheidung; Pflicht-Fallback unter 900px Breite: immer gestapelt.

`.footer-sig` beginnt immer mit Name + Website-Link, gefolgt von den im Tool tatsächlich referenzierten Normen/Standards, danach optional die Audit-Status-Zeile.

### Companion-Datei Sprecher-Skript (K16)

Bei jeder Erstellung oder inhaltlichen Änderung der Vortrags-Skript-Box wird automatisch — ohne separate Aufforderung — zusätzlich eine eigenständige Datei `Sprecher-Skript_<Toolname>.md` mitgeliefert (gleiche Schritt-Gliederung, identischer Inhalt, inkl. Klick-Hinweisen und Regie-Hinweisen am Ende). Bei Diskrepanz gilt die Footer-Box als Quelle; die `.md` wird bei der nächsten Änderung synchronisiert.

### Audit-Status-Zeile (K14)

Einzeilige Statusnotiz direkt in `.footer-sig` — nicht als eigene Box, nicht mit vollem Audit-Report-Inhalt:

```
Zuletzt geprüft: TT.MM.JJJJ · Status: ✅ Zertifiziert / ⭐ Zertifiziert mit Auszeichnung / ❌ Nicht zertifiziert · Details siehe Audit-Protokoll
```

Klein, gedeckte Farbe (`--muted`), kein eigener Rahmen. **Verfalls-Disziplin**: bei jeder inhaltlichen Änderung der Datei entweder aktualisieren oder entfernen — eine veraltete Zeile ist selbst ein Qualitätsmangel (K8-Prinzip: keine veralteten/generischen Werte). Kein konkreter Dateipfad zum Audit-Protokoll im HTML, nur der Hinweis, dass eines existiert.

## Vorsicht: Anführungszeichen

In diesem Repo trat wiederholt Korruption von geraden Anführungszeichen (`"`) zu typografischen Anführungszeichen (`"`/`"`) in `href`-Attributen auf, wenn Textänderungen über den normalen Editier-Weg liefen. Bei Änderungen an `href="..."`-Attributen das Ergebnis auf gerade ASCII-Anführungszeichen prüfen (z.B. `grep` nach `href=[""]` oder ein Python-Check auf `chr(34)`), bevor committet wird — typografische Anführungszeichen brechen den Link (Browser parst ihn dann als unquoted attribute value inklusive der Anführungszeichen-Glyphen).
