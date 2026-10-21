# Footer-Texte des Hubs. Quelle für Footer-Boxen und Sprecher-Skript-Companion (K16).
SYSPROMPT = (
'Rolle: Du baust eine einzelne, vollständig offline lauffähige HTML-Startseite („Gateplan“) für das Seminar-Set „Lindenfeld Lunch“. Zielgruppe: Menschen, die gerade als Business Analyst:in, Requirements Engineer oder in der Projektleitung beginnen.\n\n'
'Eingabe: der Fall „BA/RE-Case: Lindenfeld Lunch“ und das Tool „Projektauftrag und Pflichtenheft“ (je eine eigenständige HTML-Datei). Erfinde keine Fallwerte. Jede Aussage trägt eine Herkunftsmarke: Fall (F), Abgeleitet (R) oder Annahme (A).\n\n'
'Struktur (sechs Stationen, einspaltig): Start mit horizontalem Metro-Plan · Gate für Gate (G0 bis G6, je Entscheidung, Entscheider, Kriterien, Warnsignal) · Netzplan (neun Zeilen mal sieben Gates) · Übung (Einzelfrage-Stepper) · Mappe mit Verweisen · Glossar und Quellen.\n'
'Linien: Artefakte, Kommunikation, Blickwinkel, Leitplanken, Änderung, Nutzen. Filter „Meine Linie“ blendet Zeilen anderer Linien aus. Tabellen zeigen 3 bis 5 Zeilen, der Rest klappt per Knopf auf.\n\n'
'Aufbau der Datei: Dateileiste oben (Gateplan, BA/RE-Case, Projektauftrag und Pflichtenheft), Inhaltsnavigation als Seitenleiste links, Inhalt auf 95 Prozent der Breite. Case und Pflichtenheft sind vollständig in die Datei eingebettet und werden per Blob-URL in einem iframe angezeigt. Tiefenverweise („a.go“) springen per Anker in die eingebetteten Teile; Sprache, Vertiefung und Beamer werden per postMessage an die Teile weitergegeben. Zurück zum Plan über die Dateileiste. Keine relativen Links zu Nachbardateien, kein fetch, kein CDN.\n\n'
'Design: weißer Hintergrund, color-scheme light, Schrift mindestens 16 px (sekundär 14 px), Touch-Ziele mindestens 44 px, nur pointerup-Ereignisse (Tastatur Enter/Leertaste löst ein synthetisches pointerup aus), sessionStorage nur in try/catch. Bilder im Text klein, per Klick im Vollbild (Anpassen, Originalgröße, Schließen).\n\n'
'Pflichtbausteine: Zurück-Link zur Startseite, Signatur oben rechts (position:fixed), Beamer-Schalter in vier kumulativen Stufen (Footer ab Stufe 1 ausgeblendet), Sprachschalter DE/EN ohne Neuladen, Vertiefungsschalter kurz oder ausführlich (Standard kurz, Beamer erzwingt kurz), Footer mit vier Boxen (Systemprompt, Handbuch, Vortrags-Skript, Normen-Register) nur in der Trainerversion.\n'
'Inhalt statisch im HTML, JavaScript tauscht nur Text vorhandener Elemente (data-en).\n\n'
'Persona: Die Sprache ist die einer erfahrenen Trainerin: klar, freundlich, ohne Fachjargon ohne Erklärung. Bewerte keine Einzelpersonen (Leitplanke L-3).\n\n'
'Nicht tun: Fallwerte erfinden, Annahmen unmarkiert lassen, Rechtsberatung geben, Zeitagenden einbauen, Produktnamen als Vorentscheidung nennen, Normen ungeprüft zitieren (Stand vor dem Einbau per Websuche prüfen).\n\n'
'Ausgabe: zwei Dateien, Trainerversion (mit Footer, „Alle auflösen“ und Musterantworten) und Teilnehmendenversion (ohne diese drei Dinge). Dazu die Companion-Datei Sprecher-Skript als Markdown, inhaltsgleich zur Footer-Box.')
SYSPROMPT_EN = (
'Role: You build a single, fully offline HTML start page (“Gate plan”) for the seminar set “Lindenfeld Lunch”. Audience: people just starting as business analysts, requirements engineers or in project management.\n\n'
'Input: the case “BA/RE Case: Lindenfeld Lunch” and the tool “Project Charter and Functional Specification” (one standalone HTML file each). Do not invent case values. Every statement carries an origin mark: case (C), derived (D) or assumption (A).\n\n'
'Structure (six stations, single column): start with a horizontal metro plan · gate by gate (G0 to G6, each with decision, decider, criteria, warning sign) · network plan (nine rows times seven gates) · exercise (one-question stepper) · folder with links · glossary and sources.\n'
'Lines: artifacts, communication, viewpoints, guardrails, change, benefit. The “My line” filter hides rows of other lines. Tables show 3 to 5 rows, the rest unfolds with a button.\n\n'
'File layout: file bar on top (gate plan, BA/RE case, project charter and specification), content navigation as a left sidebar, content at 95 percent width. Case and specification are fully embedded and shown via blob URL in an iframe. Deep links (“a.go”) jump by anchor into the embedded parts; language, depth and projector mode are passed on by postMessage. Back to the plan via the file bar. No relative links to neighbouring files, no fetch, no CDN.\n\n'
'Design: white background, color-scheme light, font at least 16 px (secondary 14 px), touch targets at least 44 px, pointerup events only (keyboard Enter/Space fires a synthetic pointerup), sessionStorage only in try/catch. Images small in the text, full screen on click (fit, original size, close).\n\n'
'Mandatory parts: back link to the home page, signature top right (position:fixed), projector switch in four cumulative levels (footer hidden from level 1), language switch DE/EN without reload, depth switch short or full (default short, projector forces short), footer with four boxes (system prompt, handbook, speaker script, standards register) in the trainer version only.\n'
'Content is static in the HTML; JavaScript only swaps the text of existing elements (data-en).\n\n'
'Persona: the voice of an experienced trainer: clear, friendly, no jargon without explanation. Do not rate individuals (guardrail L-3).\n\n'
'Do not: invent case values, leave assumptions unmarked, give legal advice, add time agendas, name products as a pre-decision, quote standards unchecked (check the current version by web search before use).\n\n'
'Output: two files, trainer version (with footer, “Reveal all” and model answers) and participant version (without these three). Plus the companion speaker script as Markdown, identical in content to the footer box.')

HANDBOOK = [
('Zweck: Der Gateplan ist die Startseite, an die man im Seminar immer wieder zurückkommt. Er verbindet den Fall „Lindenfeld Lunch“ und das Tool „Projektauftrag und Pflichtenheft“ entlang von sieben Entscheidungspunkten (G0 bis G6) und sechs Linien.',
 'Purpose: the gate plan is the start page you keep coming back to in the seminar. It joins the case “Lindenfeld Lunch” and the tool “Project Charter and Functional Specification” along seven decision points (G0 to G6) and six lines.'),
('Methode: Ein Gate ist ein Umsteigebahnhof. Jede Entscheidung wird gleich gefragt (Was steht an? Wer entscheidet? Welche Kriterien? Welches Warnsignal?). Die Linien machen sichtbar, was in der eigenen Rolle dazukommt. Gruppenfragen folgen dem Muster Frage, Gruppe antwortet, Musterantwort.',
 'Method: a gate is an interchange station. Every decision is asked the same way (what is due? who decides? which criteria? which warning sign?). The lines show what your own role adds. Group questions follow the pattern question, group answers, model answer.'),
('Bedienung: Oben wählst du die Datei (Gateplan, Case, Projektauftrag), links den Abschnitt. Die Verweise in den Gates springen direkt an die Stelle im Case oder im Tool; die Dateileiste führt zurück. Alles steckt in dieser einen Datei und läuft offline.',
 'Use: pick the file at the top (gate plan, case, charter) and the section on the left. The links in the gates jump straight to the place in the case or the tool; the file bar leads back. Everything is in this one file and runs offline.'),
('Gruppenfragen: erst die Gruppe antworten lassen, dann die Musterantwort zeigen. „Alle auflösen“ zeigt alle auf einmal. Die Teilnehmendenversion hat weder Musterantworten noch Footer.',
 'Group questions: let the group answer first, then show the model answer. “Reveal all” shows them all at once. The participant version has neither model answers nor footer.'),
('Beamer: vier Stufen, Bilder per Klick im Vollbild; die Vertiefung ist im Beamer-Modus aus.',
 'Projector: four levels, images full screen on click; depth is off in projector mode.'),
('Pflege: Case und Pflichtenheft sind in den Gateplan eingebettet. Ändert sich eine der beiden Dateien, muss der Gateplan neu gebaut werden (Bauskripte im Ordner tools/gateplan-build/).',
 'Maintenance: case and specification are embedded in the gate plan. If one of the two files changes, the gate plan has to be rebuilt (build scripts in the folder tools/gateplan-build/).'),
('Grenzen: Der Fall ist fiktiv, alle Werte sind Planungsannahmen. Keine Rechtsberatung.',
 'Limits: the case is fictional, all values are planning assumptions. No legal advice.'),
]

# Vortrags-Skript: (Titel, Klick/Regie, Sprechtext, Übergang) je Schritt
SCRIPT = [
('Start',
 'Klick: Reiter „Start“, Metro-Plan zeigen.',
 'Ein Gate ist ein Umsteigebahnhof. Hier entscheiden wir, ob das Projekt weiterfährt. Die sechs Linien zeigen, was dabei zusammenkommt: Artefakte, Kommunikation, Blickwinkel, Leitplanken, Änderung und Nutzen.',
 'Übergang: Wir fahren Gate für Gate.',
 'Click: tab “Start”, show the metro plan.',
 'A gate is an interchange station. Here we decide whether the project continues. The six lines show what comes together: artifacts, communication, viewpoints, guardrails, change and benefit.',
 'Transition: we ride gate by gate.'),
('Gate für Gate',
 'Klick: „Gate für Gate starten“, Gate 0 öffnen; je Gate Entscheidung und Kriterien vorlesen.',
 'Welche Entscheidung steht an? Wer entscheidet? Welche Kriterien gelten? Welches Warnsignal sehen wir? Und was bedeutet das in deiner Linie?',
 'Übergang: Jetzt suchen wir uns eine Linie und gehen in den Fall.',
 'Click: “Start gate by gate”, open gate 0; read the decision and criteria at each gate.',
 'Which decision is due? Who decides? Which criteria apply? Which warning sign do we see? And what does it mean in your line?',
 'Transition: now we pick a line and go into the case.'),
('Tiefe',
 'Klick: einen Verweis im Gate antippen (öffnet Case oder Projektauftrag an der Stelle), danach in der Dateileiste „Gateplan“ zurück.',
 'Wir schauen nicht alles an, sondern genau die Stelle, an der das Gate sie braucht. Danach kommen wir zum Plan zurück.',
 'Übergang: Und wie hängt alles zusammen? Dafür der Netzplan.',
 'Click: tap a link in the gate (opens case or charter at the spot), then “Gate plan” in the file bar to return.',
 'We do not look at everything, only at the spot the gate needs. Then we come back to the plan.',
 'Transition: and how does it all fit together? For that, the network plan.'),
('Netzplan und Linienfilter',
 'Klick: Reiter „Netzplan“, Filter „Meine Linie“ wählen.',
 'Neun Zeilen, sieben Gates. Wähle die Linie deiner Rolle: Was brauchst du an jedem Gate, und was lieferst du?',
 'Übergang: Prüfen wir, was hängen geblieben ist.',
 'Click: tab “Network plan”, choose the filter “My line”.',
 'Nine rows, seven gates. Choose the line of your role: what do you need at each gate, and what do you deliver?',
 'Transition: let us check what stuck.'),
('Übung',
 'Klick: Reiter „Übung“; Frage für Frage, die Gruppe stimmt ab, bevor du antwortest. Gruppenfragen: erst Gruppe, dann Musterantwort (oder „Alle auflösen“).',
 'Welche Antwort passt? Warum die anderen nicht? Wer hat anders gedacht?',
 'Übergang: Zum Schluss ein Blick in die Mappe und die Quellen.',
 'Click: tab “Exercise”; question by question, the group votes before you answer. Group questions: group first, then model answer (or “Reveal all”).',
 'Which answer fits? Why not the others? Who thought differently?',
 'Transition: finally a look at the folder and the sources.'),
('Abschluss',
 'Klick: Reiter „Mappe“ bzw. „Glossar und Quellen“.',
 'Welches Gate fühlt sich für deine Rolle am wichtigsten an, und was würdest du dort fragen?',
 '',
 'Click: tab “Folder” or “Glossary and sources”.',
 'Which gate feels most important for your role, and what would you ask there?',
 ''),
]
REGIE = ('Regie: Nicht mit dem Netzplan beginnen, zuerst die Gates erzählen. Zahlen und Fristen sind Planungsannahmen, das ausdrücklich sagen. Rechtliche Begriffe nur als Fallaussage nennen. Im Beamer-Modus ist der Footer ausgeblendet und die Vertiefung aus. Zeitplan: bewusst nicht vorgegeben.',
         'Direction: do not start with the network plan, tell the gates first. Figures and deadlines are planning assumptions, say so explicitly. Mention legal terms only as case statements. In projector mode the footer and the deep dive are hidden. Timing: deliberately not prescribed.')
