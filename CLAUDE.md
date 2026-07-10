# DenkRaum

Sammlung eigenständiger HTML-Tools rund um Requirements Engineering und den kompetenten Umgang mit KI, für Michaela Kühn (www.michaela-kuehn.com).

## Struktur

- `index.html` — Landingpage mit Kachel-Links zu allen Tools, gruppiert in Rubriken (aktuell: "Requirements Engineering Tools", "KI Tools").
- `tools/` — alle Tools. Einzeldatei-Tools liegen direkt darin (z.B. `tools/fragenautomat.html`); Mehrdatei-Apps bekommen einen eigenen Unterordner (z.B. `tools/klarheits-sprint/`).

## Konventionen für jedes Tool

Jedes Tool bekommt im Header:

1. **Zurück-Link zur Startseite** — `<a href="../index.html">← Zurück zur Startseite</a>` (Pfad relativ zu `tools/`, ggf. `../../index.html` bei einer Ebene tiefer wie `klarheits-sprint/`).
2. **Signatur-Link** — `<a href="https://www.michaela-kuehn.com" target="_blank" rel="noopener noreferrer">Michaela Kühn</a>` (www.michaela-kuehn.**com**, nicht .de).
3. **Beamer-Modus-Button** — Button, der die Darstellung für Präsentationen aus größerer Entfernung hochzoomt. Über mehrere Klicks durch Stufen zyklen (normal → 1.35x → 1.75x), per `zoom` auf `html[data-beamer="1|2"]`, damit das Layout proportional mitfließt statt zu brechen. Muster:

```css
html[data-beamer="1"]{zoom:1.35}
html[data-beamer="2"]{zoom:1.75}
```

```js
var BEAMER_LABELS = ["🔍 Beamer-Modus", "🔍 Beamer: Groß", "🔍 Beamer: Sehr groß"];
function applyBeamerLevel(level){
  document.documentElement.setAttribute("data-beamer", String(level));
  var btn = document.getElementById("beamerToggle");
  btn.textContent = BEAMER_LABELS[level];
  btn.classList.toggle("active", level > 0);
}
```

Persistenz nach dem im jeweiligen Tool bereits verwendeten Muster (`localStorage` state-Objekt oder `sessionStorage` safeGet/safeSet) — kein neues Persistenz-Muster einführen, wenn eines schon existiert.

Wird ein neues Tool hinzugefügt (oder ein bestehendes ohne diese drei Elemente bearbeitet), diese Konventionen anwenden, ohne dass explizit danach gefragt wird. Neue Tools zusätzlich immer als Kachel auf `index.html` verlinken, in der thematisch passenden Rubrik.

## Vorsicht: Anführungszeichen

In diesem Repo trat wiederholt Korruption von geraden Anführungszeichen (`"`) zu typografischen Anführungszeichen (`"`/`"`) in `href`-Attributen auf, wenn Textänderungen über den normalen Editier-Weg liefen. Bei Änderungen an `href="..."`-Attributen das Ergebnis auf gerade ASCII-Anführungszeichen prüfen (z.B. `grep` nach `href=[""]` oder ein Python-Check auf `chr(34)`), bevor committet wird — typografische Anführungszeichen brechen den Link (Browser parst ihn dann als unquoted attribute value inklusive der Anführungszeichen-Glyphen).
