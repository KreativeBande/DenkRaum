/*
 * DenkRaum Tool-Register — führende Quelle für alle Angaben ÜBER die Tools.
 * Pflege-Regeln und Feldbeschreibung: register/README.md
 * Als Skript-Datei (nicht .json), damit sie auch offline per file:// lädt.
 */
window.DENKRAUM_REGISTER = {
  "stand": "2026-10-01",
  "denkraeume": [
    {
      "id": "moeglichkeit",
      "icon": "💡",
      "name": "Möglichkeitsraum",
      "leitfrage": "Impuls wahrnehmen"
    },
    {
      "id": "analyse",
      "icon": "🔍",
      "name": "Analyseraum",
      "leitfrage": "Warum verstehen"
    },
    {
      "id": "loesung",
      "icon": "🎯",
      "name": "Lösungsraum",
      "leitfrage": "Was definieren"
    },
    {
      "id": "umsetzung",
      "icon": "⚙️",
      "name": "Umsetzungsraum",
      "leitfrage": "Wie realisieren"
    },
    {
      "id": "stoer",
      "icon": "🚨",
      "name": "Störraum",
      "leitfrage": "Was verändert sich"
    },
    {
      "id": "rundreise",
      "icon": "🔄",
      "name": "Rundreise",
      "leitfrage": "Führt durch alle fünf Räume"
    },
    {
      "id": "basislager",
      "icon": "🏕️",
      "name": "Basislager",
      "leitfrage": "Nachschlagen, Fallwelten, Prüfungsvorbereitung"
    }
  ],
  "faeden": [
    {
      "id": "re",
      "name": "Requirements Engineering"
    },
    {
      "id": "ba",
      "name": "Business-Analyse"
    },
    {
      "id": "ki",
      "name": "KI & Prompting"
    },
    {
      "id": "pm",
      "name": "Agil & Projektmanagement"
    }
  ],
  "seminare": [
    {
      "nr": "9368",
      "kurz": "RE · Moderne Anforderungsanalyse",
      "titel": "Requirements Engineering: Moderne Anforderungsanalyse für die IT",
      "datei": "kurse/requirements-engineering-it.html"
    },
    {
      "nr": "31693",
      "kurz": "RE · Projekte erfolgreich starten",
      "titel": "Requirements Engineering: Projekte erfolgreich starten",
      "datei": "kurse/requirements-engineering-projekte-starten.html"
    },
    {
      "nr": "3744",
      "kurz": "Agile Business Analyst:in",
      "titel": "Der:Die Agile Business Analyst:in",
      "datei": "kurse/agile-business-analyst.html"
    },
    {
      "nr": "41851",
      "kurz": "KI-Prompting in RE & BA",
      "titel": "KI-Prompting im Requirements Engineering und in der Business Analyse",
      "datei": "kurse/ki-prompting-re-ba.html"
    },
    {
      "nr": "34000",
      "kurz": "Agile Projekte aufsetzen",
      "titel": "Agile Projekte richtig aufsetzen und steuern",
      "datei": "kurse/agile-projekte-aufsetzen.html"
    },
    {
      "nr": "3525",
      "kurz": "Agiles PM für Fortgeschrittene",
      "titel": "Agiles Projektmanagement für Fortgeschrittene",
      "datei": "kurse/agiles-pm-fortgeschrittene.html"
    },
    {
      "nr": "2929",
      "kurz": "Hybrides PM II",
      "titel": "Hybrides Projektmanagement II",
      "datei": "kurse/hybrides-projektmanagement-2.html"
    },
    {
      "nr": "34002",
      "kurz": "OKR · Agiles Teammanagement",
      "titel": "Objectives and Key Results: Agiles Teammanagement",
      "datei": "kurse/okr-agiles-teammanagement.html"
    }
  ],
  "tools": [
    {
      "id": "agile-project-maturity-navigator",
      "datei": "tools/agile-project-maturity-navigator.html",
      "titel": "Agile Project Maturity Navigator",
      "kurztitel": "Agile Maturity Navigator",
      "kurz": "Growth Wheel × Reifegrad: Ein interaktives 4-Sektoren-Rad (Menschen, Kultur, Prozess, Organisation + „Kenne dich selbst\") zeigt, wo ein Projekt wirken muss; sechs Reifegradspuren mit je fünf Stufen zeigen, wie souverän es dort bereits handelt. Zusätzlich: 12 Praxisprobleme mit direkter Diagnose zur passenden Spur.",
      "rubrik": "Agiles Arbeiten & Projektmanagement",
      "bereich": "Agilität",
      "aufStartseite": true,
      "zweck": [
        "Workshop-Canvas",
        "Demonstrator"
      ],
      "denkraum": "analyse",
      "faeden": [
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "3525",
        "2929",
        "34002"
      ],
      "einsatzkontext": [
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [],
      "standards": [
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-31",
        "auditZeileImTool": "31.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/okr-kaskade.html",
        "tools/pmp-eco-kombitool.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ai-engineering-studio",
      "datei": "tools/ai-engineering-studio.html",
      "titel": "AI Engineering Studio",
      "kurztitel": "AI Engineering Studio",
      "kurz": "Sieben Module vom Unterschied zwischen GPT, Agent und Multi-Agent-System bis zur Live-Simulation eines Requirements Agent: Agentenrollen bauen, Workflows verketten, Werkzeuge zuschalten, Freigabepunkte setzen, Governance-Leitplanken klären — durchgehend am Fall der digitalen Studierendenakte.",
      "rubrik": "KI Tools",
      "bereich": "KI-Systeme bauen & steuern",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Hochschule Nordwest"
      ],
      "themen": [
        "KI-Governance"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-02",
        "auditZeileImTool": "03.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/cpmai-prozess-board.html",
        "tools/vom-prompt-zum-agenten.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ai-governance-framework",
      "datei": "tools/ai-governance-framework.html",
      "titel": "AI Governance Framework",
      "kurztitel": "AI Governance Framework",
      "kurz": "Workshop-Canvas mit zwölf Bausteinen, um für ein Unternehmen einen eigenen Governance-Rahmen für KI-Systeme zu skizzieren — von Geltungsbereich und Rollen über die Risikoklassifikation nach EU AI Act bis zu Human Oversight, Monitoring und Schulung. Optional vier bekannte Szenarien wählbar, die Feld für Feld ein Beispiel einblenden. Jedes Feld mit Leitfrage, Eingaben bleiben im Browser gespeichert.",
      "rubrik": "KI Tools",
      "bereich": "Governance, Recht & Sicherheit",
      "aufStartseite": true,
      "zweck": [
        "Workshop-Canvas"
      ],
      "denkraum": "stoer",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Governance"
      ],
      "standards": [
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-19",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/eu-ai-act-framework.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ai4re-quizzmaschine",
      "datei": "tools/ai4re-quizzmaschine.html",
      "titel": "AI4RE Quizzmaschine",
      "kurztitel": "AI4RE Quizzmaschine",
      "kurz": "Lernsimulator zur IREB AI4RE Micro-Credential Prüfungsvorbereitung: Cockpit mit Fortschritt pro Wissensgebiet, Lernmodus mit Sofort-Erklärung, zeitlimitierter Prüfungsmodus, Szenario-Trainer, Terminologie-Karten und eine persönliche Fehlerliste — über AI Basics, LLMs, Prompting, Risiken und RE Use Cases hinweg.",
      "rubrik": "KI Tools",
      "bereich": "KI-Systeme bauen & steuern",
      "aufStartseite": true,
      "zweck": [
        "Prüfungsvorbereitung"
      ],
      "denkraum": "basislager",
      "faeden": [
        "ki",
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "Prompting",
        "KI-Modelle",
        "Prüfungsvorbereitung"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": "09.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": null,
      "verwandt": [
        "tools/cpmai-prozess-board.html",
        "tools/vom-prompt-zum-agenten.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "anforderungsboard-iso",
      "datei": "tools/anforderungsboard-iso.html",
      "titel": "Anforderungs-Board · ISO 25010 & ISO 27001",
      "kurztitel": "Anforderungs-Board ISO",
      "kurz": "Klassifiziert 17 Anforderungskarten aus einem Kundenportal-Fall live nach FA, NFR (ISO/IEC 25010:2023), ISMS-Maßnahme (ISO/IEC 27001:2022 Anhang A) oder Normvorgabe — inklusive einer bewussten Falle (Norm vs. risikobasierte Maßnahme) und Live-Dashboard.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "ISO & Compliance",
      "aufStartseite": true,
      "zweck": [
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "9368",
        "31693"
      ],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "ISO 25010"
      ],
      "standards": [
        "ISO 25010:2023",
        "ISO 27001:2022"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-13",
        "auditZeileImTool": "03.08.2026",
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/fa-nfa-rollen-spuren.html",
        "tools/iso-25010-kompendium.html",
        "tools/re-waschmaschine.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "anforderungsreise",
      "datei": "tools/anforderungsreise.html",
      "titel": "Anforderungs-Reise durch die Räume",
      "kurztitel": "Anforderungs-Reise",
      "kurz": "Ein Demo-Tool, das eine einzelne Anforderung vom Möglichkeitsraum bis in den Testraum wandern lässt: Idee → Problem → Lösung mit FA/NFA und User Story → Meßkriterien/Parameter → Testfälle — am Ende steht ein exportierbares Reise-Log.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Anforderungen erheben & schärfen",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator",
        "Lernreise"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "9368",
        "31693"
      ],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/denkraum_v3_adaptive_engine.html",
        "tools/iso-25010-kompendium.html",
        "tools/user-story-puzzle.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ba-lifecycle-lernreise",
      "datei": "tools/ba-lifecycle-lernreise.html",
      "titel": "🧭 BA-Lifecycle-Lernreise",
      "kurztitel": "BA-Lifecycle-Lernreise",
      "kurz": "Die sechs Wissensbereiche des BABOK® Guide v3 als Stationenweg — dieselbe Struktur, drei völlig unterschiedliche Fälle (Hochrisiko-KI-Recruiting, Verwaltungsdigitalisierung, agiler Börsenhandel). Je Station fünf Artefakte (eines je BABOK-Teilaufgabe), Klassisch-vs.-Agil-Vergleich, Dokumenten-Glossar und Traceability-Faden über alle sechs Stationen.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Business-Analyse",
      "aufStartseite": true,
      "zweck": [
        "Lernreise"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "2929"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Hochschule Nordwest",
        "NovaTrade Pulse"
      ],
      "themen": [
        "Lebenszyklus"
      ],
      "standards": [
        "BABOK",
        "IREB",
        "PMBOK",
        "IEEE 29148",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-22",
        "auditZeileImTool": "22.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/ba-steckbrief-business-case.html",
        "tools/babok-kompendium.html",
        "tools/hochschule-nordwest-steckbrief.html",
        "tools/novatrade-pulse-steckbrief.html",
        "tools/priorisierungslabor.html",
        "tools/talentmatch-ai-sufficiency-gate.html",
        "tools/user-story-puzzle.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ba-rollenwandel-explorer",
      "datei": "tools/ba-rollenwandel-explorer.html",
      "titel": "BA-Rollenwandel-Explorer",
      "kurztitel": "BA-Rollenwandel-Explorer",
      "kurz": "Vom Anforderungssammler zum Value Architect: die neue Rolle des Business Analysts nach IREB & IIBA (2026) entlang eines 6-Stufen-Modells (WARUM → WARUM GENAU → WAS → WIE → STÖRUNGEN → WIRKUNG), erfahrbar am Fallbeispiel Talent Match AI / Vantera Systemtechnik GmbH mit Ela, Knut, Petra und Herrn Bachmeier — jede Stufe zusätzlich mit realen Artefakten aus dem internen RE/BA-Trainingsprojekt TMAI vertieft.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Business-Analyse",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "KI-Modelle"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-09",
        "auditZeileImTool": "09.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ba-lifecycle-lernreise.html",
        "tools/ba-steckbrief-business-case.html",
        "tools/babok-kompendium.html",
        "tools/fallstudie-qualitaetssystem.html",
        "tools/ki-architektur-glossar-reba.html",
        "tools/priorisierungslabor.html",
        "tools/re-ba/knowledge-zoom-navigator-re-ba.html",
        "tools/talentmatch-ml-paradigmen.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ba-steckbrief-business-case",
      "datei": "tools/ba-steckbrief-business-case.html",
      "titel": "BA-Steckbrief & Business Case",
      "kurztitel": "BA-Steckbrief & Business Case",
      "kurz": "Zwei Reiter: ein ausfüllbarer Selbstreflexions-Steckbrief zu unterschiedlichen BA-Rollentypen (IT/Systemanalyse, Agile, Fachbereich, Regulatory/Risk) mit Musterlösung, plus ein quantifizierter Vorher/Nachher-Business-Case zum Wertbeitrag des BA — am Fallbeispiel Velaris Clearing AG (fiktives Clearinghaus, EMIR/REMIT-Kontext).",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Business-Analyse",
      "aufStartseite": true,
      "zweck": [
        "Übung"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Velaris Clearing"
      ],
      "themen": [],
      "standards": [
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-01",
        "auditZeileImTool": "01.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-lifecycle-lernreise.html",
        "tools/ba-rollenwandel-explorer.html",
        "tools/babok-kompendium.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "babok-kompendium",
      "datei": "tools/babok-kompendium.html",
      "titel": "BABOK® Kompendium",
      "kurztitel": "BABOK® Kompendium",
      "kurz": "Nachschlagewerk zu den Kernaussagen des BABOK® Guide v3 (IIBA): sechs Wissensbereiche mit allen 30 Tasks (optional mit Input/Techniken/Output je Task), das BACCM-Kernkonzeptmodell, die vierstufige Anforderungsklassifikation inkl. Marmorkuchen-Prinzip, elf Stakeholder-Rollen, sechs Kompetenzkategorien, fünf Perspektiven und das 50-Techniken-Register — mit vollständigem Sprachumschalter Deutsch/Englisch.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Business-Analyse",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "basislager",
      "faeden": [
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "GPM-Konferenz"
      ],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [
        "Stakeholder"
      ],
      "standards": [
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-03",
        "auditZeileImTool": "03.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ba-lifecycle-lernreise.html",
        "tools/ba-rollenwandel-explorer.html",
        "tools/ba-steckbrief-business-case.html",
        "tools/ireb-kompendium.html",
        "tools/user-story-puzzle.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "bpmn-anwenderkompendium",
      "datei": "tools/bpmn-anwenderkompendium.html",
      "titel": "BPMN 2.0 in der Praxis",
      "kurztitel": "BPMN 2.0 in der Praxis",
      "kurz": "Anwender-Leitfaden zu BPMN 2.0.2 (ISO/IEC 19510): 7 Stationen zu Diagrammwahl, Scope/Detailtiefe, Modellierungsregeln, Pool/Swimlane, weiteren Artefakten, der Verortung von BPMN im Methodenkontext (PMP/PMBOK, BABOK, IREB, IPMA, LEAN, PM², PRINCE2, Scrum) und — neu — einem bebilderten Diagrammverzeichnis mit 14 Prozessdarstellungsformen als Inline-SVG-Skizze samt Typische-Tools-Angabe, inklusive EPK/EPC. Mit optionalem Vertiefungs-Toggle (kurz/voll) pro Station und verankert im Fallbeispiel TalentMatch AI.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "Prozessmodellierung",
        "KI-Modelle"
      ],
      "standards": [
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-23",
        "auditZeileImTool": "23.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/babok-kompendium.html",
        "tools/ireb-kompendium.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "chatbox-workflow-opener",
      "datei": "tools/chatbox-workflow-opener.html",
      "titel": "Von der Chatbox zum Workflow · Opener",
      "kurztitel": "Chatbox → Workflow (Opener)",
      "kurz": "Workshop-Einstieg: Basic Use (Prompt → Antwort → Schließen) im Kontrast zum Full Workflow mit sechs Stationen (Denken, Erinnern, Verbinden, Recherchieren, Bauen, Ausführen) — jede Station anklickbar mit Funktionsbeschreibung und RE/BA-Bezug.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Opener"
      ],
      "denkraum": "moeglichkeit",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-19",
        "auditZeileImTool": "19.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ai-engineering-studio.html",
        "tools/vom-prompt-zum-agenten.html",
        "tools/vom-rateversuch-zur-belegten-antwort.html",
        "tools/vom-tool-chaos-zum-mcp-handshake.html",
        "tools/zettelkasten-prompt-engineering-re.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "claude-feature-navigator",
      "datei": "tools/claude-feature-navigator.html",
      "titel": "Claude-Feature-Navigator",
      "kurztitel": "Claude-Feature-Navigator",
      "kurz": "Sechs Bausteine des Claude-Ökosystems (Chat, Projects, Artifacts, Skills, Claude Code, Cowork) als Split-Screen-Navigator mit Analogie, typischem Einsatz, Anfänger-Fehler und RE/BA-Bezug, plus Szenario-Finder. Dazu ein zweites Modul: Begriffslexikon mit 40 Fachbegriffen rund um Claude, agentische KI und MCP, nach Kategorie und Volltext filterbar.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "moeglichkeit",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Modelle"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Offene Punkte",
        "letztesAudit": null,
        "auditZeileImTool": "19.08.2026",
        "offen": "Formelles Audit steht aus."
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/chatbox-workflow-opener.html",
        "tools/ki-einsatzmuster-explorer.html",
        "tools/vom-prompt-zum-agenten.html",
        "tools/vom-tool-chaos-zum-mcp-handshake.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "cpmai-prozess-board",
      "datei": "tools/cpmai-prozess-board.html",
      "titel": "CPMAI-Prozess-Board",
      "kurztitel": "CPMAI-Prozess-Board",
      "kurz": "PMI-CPMAI™-Prüfungsvorbereitung: 21 Aufgaben-Karten rund um einen XYZ-Company-Chatbot per Drag-and-Drop den sechs CPMAI-Phasen zuordnen — von Business Understanding bis Model Operationalization, plus einer Querschnitts-Zone „Governance & Ethik\", die in jeder Phase gilt.",
      "rubrik": "KI Tools",
      "bereich": "KI-Systeme bauen & steuern",
      "aufStartseite": true,
      "zweck": [
        "Prüfungsvorbereitung",
        "Übung"
      ],
      "denkraum": "basislager",
      "faeden": [
        "pm",
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Governance",
        "Prüfungsvorbereitung"
      ],
      "standards": [
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-01",
        "auditZeileImTool": "01.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ai-engineering-studio.html",
        "tools/ai4re-quizzmaschine.html",
        "tools/vom-prompt-zum-agenten.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "denkraeume-navigator",
      "datei": "tools/denkraeume-navigator.html",
      "titel": "Denkräume-Navigator",
      "kurztitel": "Denkräume-Navigator",
      "kurz": "Workshop-Moderationswerkzeug für Full-Day-Trainings: führt bewusst durch alle fünf Denkräume, mit fünf SCOPE-Dimensionen pro Raum und vier HALT-Fragen an jeder der vier Schleusen dazwischen. Entscheidungen wandern als Governance-Spur ins Souveränitäts-Ticket — per vorbefülltem Fallbeispiel oder live mit der Gruppe.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Anforderungen erheben & schärfen",
      "aufStartseite": true,
      "zweck": [
        "Workshop-Canvas",
        "Demonstrator"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "re",
        "ba"
      ],
      "dauer": "Ganztag",
      "haufeSeminare": [
        "3744"
      ],
      "einsatzkontext": [
        "Workshop",
        "IT-Tage"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "KI-Governance"
      ],
      "standards": [
        "IREB",
        "ISO 25010:2023",
        "BABOK",
        "EU-CSF",
        "BSI C3A"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-22",
        "auditZeileImTool": "21.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/denkraum_v3_adaptive_engine.html",
        "tools/okr-denkraum-check.html",
        "tools/talentmatch-ai-sufficiency-gate.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "denkraum_v3_adaptive_engine",
      "datei": "tools/denkraum_v3_adaptive_engine.html",
      "titel": "Adaptive Denkraum Engine",
      "kurztitel": "Adaptive Denkraum Engine",
      "kurz": "Eine interaktive Denkraum-App mit adaptiver Engine, die aus einer Problemstellung automatisch das passende Level, Denkmuster und die relevanten Räume ableitet. Am Ende steht ein klares Canvas mit Übersetzung, Werkzeugen, Normen und Handlungsempfehlungen.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Anforderungen erheben & schärfen",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator",
        "Workshop-Canvas"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "31693"
      ],
      "einsatzkontext": [],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/anforderungsreise.html",
        "tools/fragenautomat.html",
        "tools/klarheits-sprint/index.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "der-eisberg-des-promptens",
      "datei": "tools/der-eisberg-des-promptens.html",
      "titel": "Der Eisberg des Promptens",
      "kurztitel": "Eisberg des Promptens",
      "kurz": "Drei Ebenen der KI-Steuerung als anklickbarer Split-Screen: von der sichtbaren Oberfläche (Frage tippen, Beispiel geben) über die Ebene, auf der IREB-Qualitätsmerkmale den eigentlichen Unterschied machen, bis zum Tiefenkörper aus wiederholbaren, governten Prozessen. Opener für Modul 2/3 der Prompt-Schule.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Opener"
      ],
      "denkraum": "moeglichkeit",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851",
        "9368"
      ],
      "einsatzkontext": [
        "Seminar",
        "Workshop"
      ],
      "fallwelten": [],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-20",
        "auditZeileImTool": "20.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "diagramm-kompass-re-ba",
      "datei": "tools/diagramm-kompass-re-ba.html",
      "titel": "Diagramm-Kompass für RE/BA",
      "kurztitel": "Diagramm-Kompass",
      "kurz": "12 Diagrammtypen (Bar Plot bis Bubble Chart), zugeordnet zu konkreten RE/BA-Fragen aus dem Projektalltag — mit Framework-Bezug zu IREB, BABOK® und PMBOK® sowie Beispielen aus der TalentMatch-AI-Fallstudie, filterbar nach fünf Phasen von Erhebung bis Tracking.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ba",
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "9368"
      ],
      "einsatzkontext": [],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "Prozessmodellierung"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-24",
        "auditZeileImTool": "24.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/iso-25010-kompendium.html",
        "tools/ki-architektur-glossar-reba.html",
        "tools/priorisierungslabor.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ebike-anforderungssimulator",
      "datei": "tools/ebike-anforderungssimulator.html",
      "titel": "Anforderungssimulator: E-Bike-Beschaffung",
      "kurztitel": "E-Bike-Anforderungssimulator",
      "kurz": "Fünf Fachbereiche einer Kommune bringen Anforderungen zu einer E-Bike-Flotten-Beschaffung ein — jede Auswahl (inkl. nicht abwählbarer Norm-Mittel ⚖) wirkt live auf einen Schwellenwert-Rechner, der zeigt, wann das Vergabeverfahren von national (UVgO) zu EU-weit (GWB/VgV) kippt. Mit automatisch abgeleitetem Leistungsverzeichnis und editierbarer Wertungsmatrix.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Anforderungen erheben & schärfen",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator",
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [],
      "standards": [
        "IREB",
        "ISO 25010:2023"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-20",
        "auditZeileImTool": "20.07.2026",
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/anforderungsboard-iso.html",
        "tools/pflichtenheft-generator.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ein-fall-35-blickwinkel",
      "datei": "tools/ein-fall-35-blickwinkel.html",
      "titel": "Ein Fall, 35 Blickwinkel",
      "kurztitel": "Ein Fall, 35 Blickwinkel",
      "kurz": "Begleit-Tool zum Prozessmodellierungs-Kompendium: ein einziges, einfaches Fallbeispiel (Einführung eines digitalen Reklamationsportals) läuft durch alle 35 Diagrammarten hindurch — als Live-SVG statt fester Bildgrafik, damit auch die Diagrammbeschriftungen vollständig zweisprachig sind. Jede Ansicht benennt explizit, was sie in den Vordergrund stellt und was sie ausblendet — zeigt, dass nicht die Notation entscheidet, was „wahr\" ist, sondern die Frage, die gerade beantwortet werden soll.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "IT-Tage"
      ],
      "fallwelten": [],
      "themen": [
        "Prozessmodellierung"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-24",
        "auditZeileImTool": "24.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/bpmn-anwenderkompendium.html",
        "tools/prozessmodellierung-diagramm-kompendium.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "escape-room-ki-prompting",
      "datei": "tools/escape-room-ki-prompting.html",
      "titel": "Escape Room: KI-Prompting",
      "kurztitel": "Escape Room KI-Prompting",
      "kurz": "Sieben Türen, ein Systemprompt: von der Rolle über Kontext, Aufgabe, Format und Kriterien bis zur Risikoklassifikation nach dem Prompt-Governance-Canvas — spielerisch zur freigabereifen Systemprompt-Vorlage für die Hochschule Nordlicht. Mit Punkte-HUD, Hinweis-System, vierstufigem Beamer-Modus und vollständigem Sprachumschalter Deutsch/Englisch.",
      "rubrik": "Übungen",
      "bereich": "Spiele",
      "aufStartseite": true,
      "zweck": [
        "Spiel",
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Hochschule Nordlicht"
      ],
      "themen": [
        "KI-Governance",
        "Prompting"
      ],
      "standards": [
        "IREB",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-29",
        "auditZeileImTool": "29.09.2026",
        "offen": "K11 (Cross-Tool Hex-Konsistenz)"
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/prompt-builder.html",
        "tools/prompt-engineering-academy.html",
        "tools/prompt-injection-demo.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "eu-ai-act-framework",
      "datei": "tools/eu-ai-act-framework.html",
      "titel": "EU AI Act Framework",
      "kurztitel": "EU AI Act Framework",
      "kurz": "Workshop-Canvas mit zwölf Bausteinen, um ein konkretes KI-System durch die rechtlichen Pflichten des EU AI Act zu führen — Rolle in der Wertschöpfungskette, Verbotene-Praktiken-Check, Risikoklassifikation, Hochrisiko-Pflichten (Art. 9–15), Konformitätsbewertung/CE-Kennzeichnung, GPAI-Pflichten, Zeitplan und Sanktionsrisiko. Vier bekannte Szenarien mit Beispielantworten einzeln einblendbar.",
      "rubrik": "KI Tools",
      "bereich": "Governance, Recht & Sicherheit",
      "aufStartseite": true,
      "zweck": [
        "Workshop-Canvas"
      ],
      "denkraum": "stoer",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Governance"
      ],
      "standards": [
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-19",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ai-governance-framework.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "excel-lab-re-ba",
      "datei": "tools/excel-lab-re-ba.html",
      "titel": "Excel Lab für Requirements Engineering & Business Analyse",
      "kurztitel": "Excel Lab RE & BA",
      "kurz": "24 kuratierte Excel-Funktionen (Lookup, Logik, Text, Statistik, Datum, Priorisierung/Dynamic Arrays) mit Live-Beispiel am Fallbeispiel Vantera Connect — jede Funktion mit Syntax, RE/BA-Anwendungsfall und Bezug zu IREB, BABOK oder PMBOK. Selbstlern-Modus zum Filtern/Suchen, Workshop-Modus als linearer Stepper.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk",
        "Übung"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ba",
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-26",
        "auditZeileImTool": "26.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/diagramm-kompass-re-ba.html",
        "tools/iso-25010-kompendium.html",
        "tools/priorisierungslabor.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "fa-nfa-rollen-spuren",
      "datei": "tools/fa-nfa-rollen-spuren.html",
      "titel": "FA → NFA / Rollen: Die Spuren einer Anforderung",
      "kurztitel": "FA → NFA / Rollen-Spuren",
      "kurz": "Eine funktionale Anforderung, zwei Betrachtungsmodi: Normen-Spuren zerlegt sie in nicht-funktionale Anforderungen über sechs Rechts- und Qualitätsspuren, Rollen-Spuren zeigt, wie Team-, Organisations- und Entscheidungsrollen dieselbe Anforderung unterschiedlich lesen. Zwei Szenarien von Marmorkuchen bis Bürgeramt-KI-Chatbot.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "FA/NFA, User Stories & Traceability",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3525",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "IT-Tage",
        "GPM-Konferenz"
      ],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [],
      "standards": [
        "IREB",
        "ISO 27001:2022",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-13",
        "auditZeileImTool": "03.08.2026",
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/anforderungsboard-iso.html",
        "tools/iso-25010-kompendium.html",
        "tools/re-waschmaschine.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "fallstudie-qualitaetssystem",
      "datei": "tools/fallstudie-qualitaetssystem.html",
      "titel": "Fallstudie: Von der Idee zum Qualitätssystem",
      "kurztitel": "Fallstudie Qualitätssystem",
      "kurz": "Sieben reale Stationen zeigen, wie aus einzelnen Trainingswerkzeugen ein belastbares Qualitätssystem (K1–K19) entstanden ist — inklusive eines echten Fehlers und der Frage, die daraus ein neues Kriterium machte. Mit Petra-Coaching-Fragen, Standard-Bezügen (IREB, BABOK, ISO 25010) und abschließender Transfer-Übung aufs eigene Projekt.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Fallstudie",
      "aufStartseite": true,
      "zweck": [
        "Lernreise"
      ],
      "denkraum": "basislager",
      "faeden": [],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "ISO 25010"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "ISO 25010:2023",
        "BSI C3A"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-01",
        "auditZeileImTool": "01.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/iso-25010-kompendium.html",
        "tools/klarheits-sprint/index.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "fragenautomat",
      "datei": "tools/fragenautomat.html",
      "titel": "Fragenautomat",
      "kurztitel": "Fragenautomat",
      "kurz": "Extrahiert schrittweise, regelbasiert Klärungsfragen aus einem Lastenheft — nach den vier Nebel-Typen des Denkraum-Modells, kombiniert mit der klassischen Lastenheft-Gliederung. Eigenes Lastenheft hochladen oder Beispieltext nutzen.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Anforderungen erheben & schärfen",
      "aufStartseite": true,
      "zweck": [
        "Übung"
      ],
      "denkraum": "analyse",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851",
        "9368",
        "31693"
      ],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "KI-Modelle"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/denkraum_v3_adaptive_engine.html",
        "tools/klarheits-sprint/index.html",
        "tools/pflichtenheft-generator.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "guardrails-governance-assurance",
      "datei": "tools/guardrails-governance-assurance.html",
      "titel": "Guardrails × Governance × Assurance",
      "kurztitel": "Guardrails × Governance",
      "kurz": "Ganztages-Workshop am Fall TalentMatch AI: vom Bedrohungsmodell (OWASP LLM Top 10 und Agentic Top 10, Ausgabe 2026) über sieben Guardrail-Kategorien (hart oder weich) und die Guardrails der Anbieter im Vergleich bis zu Governance (Inventar, Risikoklassen nach KI-VO, RACI, Kill Switch, Model Card) und Assurance (Tests, Fairness, Vorfallarbeit). Die Traceability-Werkstatt verbindet alles zur Kette Risiko → Anforderung → Kontrolle → Nachweis. Sieben Übungen, Deutsch/Englisch.",
      "rubrik": "KI Tools",
      "bereich": "Governance, Recht & Sicherheit",
      "aufStartseite": true,
      "zweck": [
        "Workshop-Canvas"
      ],
      "denkraum": "stoer",
      "faeden": [
        "ki"
      ],
      "dauer": "Ganztag",
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "KI-Governance",
        "KI-Modelle"
      ],
      "standards": [
        "EU AI Act",
        "ISO 25010:2023",
        "IEEE 29148",
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Offene Punkte",
        "letztesAudit": "2026-10-01",
        "auditZeileImTool": null,
        "offen": "K18 (Beamer-Button-Label zeigt aktuellen Zustand statt nächster Aktion); formales Siegel-Audit K1–K21 steht noch aus"
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "hochschule-nordwest-steckbrief",
      "datei": "tools/hochschule-nordwest-steckbrief.html",
      "titel": "Fallwelt-Steckbrief — Hochschule Nordwest / Digitale Studierendenakte",
      "kurztitel": "Fallwelt Hochschule Nordwest",
      "kurz": "Referenzseite (kein Übungstool) für die zweite feste Denkraum-Fallwelt: Prüfungsamt-Digitalisierung ohne KI als Kontrastfall zu Vantera/TalentMatch AI — 50-Jahres-Aufbewahrungsfrist, VwVfG/BITV/WCAG-Rahmen, Personas Kanzlerin Dr. Feldmann und Herr Öztürk, plus Business Case zur rechtzeitig korrigierten Aufbewahrungsfrist-Anforderung.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Business-Analyse",
      "aufStartseite": true,
      "zweck": [
        "Fallwelt-Referenz"
      ],
      "denkraum": "basislager",
      "faeden": [],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Hochschule Nordwest",
        "Velaris Clearing",
        "Hochschule NOVA"
      ],
      "themen": [
        "Fallwelt"
      ],
      "standards": [
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-23",
        "auditZeileImTool": "23.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-lifecycle-lernreise.html",
        "tools/se-lifecycle-lernreise.html",
        "tools/stakeholder-management-kompendium-fachbuch.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ipma-icb4-kompendium",
      "datei": "tools/ipma-icb4-kompendium.html",
      "titel": "ICB4-Kompendium — Die Kernaussagen des Projektmanagements nach IPMA",
      "kurztitel": "ICB4-Kompendium",
      "kurz": "Nachschlagewerk zu allen 29 Kompetenzelementen der IPMA Individual Competence Baseline 4.0 in den drei gleichrangigen Bereichen Perspective, People und Practice — mit Stempelpass, Mini-Quiz je Station, Vertiefungs-Toggle und vollständigem Sprachumschalter Deutsch/Englisch, verankert im Fallbeispiel TalentMatch AI.",
      "rubrik": "Agiles Arbeiten & Projektmanagement",
      "bereich": "Projektmanagement",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk",
        "Prüfungsvorbereitung"
      ],
      "denkraum": "basislager",
      "faeden": [
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "2929"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [],
      "standards": [
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-13",
        "auditZeileImTool": "13.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/babok-kompendium.html",
        "tools/pmp-eco-kombitool.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ireb-kompendium",
      "datei": "tools/ireb-kompendium.html",
      "titel": "IREB CPRE Foundation Level Kompendium",
      "kurztitel": "IREB CPRE Kompendium",
      "kurz": "Nachschlagewerk zu den Kernaussagen des aktuellen IREB CPRE Foundation Level Lehrplans (v3.3.0): alle sieben Lerneinheiten mit Original-Kapiteltiteln, Kognitionsstufen und Dauer, Stempel-Pass mit Mini-Quiz je Einheit, verankert im Fallbeispiel TalentMatch AI (Hochrisiko-KI-Recruiting nach EU AI Act) — plus Anhang mit EARS-Satzschablonen, User-Story- und Use-Case-Vorlagen und einer BABOK-Brücken-Box in LE6.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk",
        "Prüfungsvorbereitung"
      ],
      "denkraum": "basislager",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "KI-Governance"
      ],
      "standards": [
        "IREB",
        "EU AI Act",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-02",
        "auditZeileImTool": "02.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/babok-kompendium.html",
        "tools/iso-25010-kompendium.html",
        "tools/klarheits-sprint/index.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "iso-25010-banklabor",
      "datei": "tools/iso-25010-banklabor.html",
      "titel": "ISO-25010-Banklabor",
      "kurztitel": "ISO-25010-Banklabor",
      "kurz": "Ein einziger Fall — die SEPA-Überweisung einer Privatkundin — durch alle neun ISO/IEC-25010:2023-Merkmale und deren 40 Untermerkmale geführt: je Untermerkmal eine konkrete Anforderung, ein prüfbarer Baselinewert, ein Gherkin-Akzeptanzkriterium und ein ausführbarer Testfall zum Durchklicken.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "ISO & Compliance",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "ISO 25010"
      ],
      "standards": [
        "ISO 25010:2023"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-28",
        "auditZeileImTool": "28.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/anforderungsboard-iso.html",
        "tools/iso-25010-kompendium.html",
        "tools/requirements-to-code-explorer.html",
        "tools/studierendenakte-qualitaet.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "iso-25010-kompendium",
      "datei": "tools/iso-25010-kompendium.html",
      "titel": "ISO/IEC 25010:2023 Kompendium",
      "kurztitel": "ISO 25010 Kompendium",
      "kurz": "Nachschlagewerk zu allen neun Qualitätsmerkmalen der aktuellen Edition (SQuaRE) — und zugleich Demonstrator: FA wählen, durch die neun Merkmale klicken und live sehen, wie daraus konkrete NFAs und User Stories mit Akzeptanzkriterium entstehen. Mit Vergleichstabelle 2011 → 2023.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "ISO & Compliance",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk",
        "Demonstrator"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "9368"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "ISO 25010"
      ],
      "standards": [
        "ISO 25010:2023"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-12",
        "auditZeileImTool": "12.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/anforderungsboard-iso.html",
        "tools/fa-nfa-rollen-spuren.html",
        "tools/klarheits-sprint/index.html",
        "tools/re-waschmaschine.html",
        "tools/requirements-to-code-explorer.html",
        "tools/user-story-puzzle.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-architektur-glossar-reba",
      "datei": "tools/ki-architektur-glossar-reba.html",
      "titel": "Begriffslexikon: KI-Architektur für RE/BA",
      "kurztitel": "Begriffslexikon KI-Architektur",
      "kurz": "10 LLM-Grundkonzepte (Embeddings, RAG, Guardrails, Evals u.a.) als Klick-Lexikon in Anforderungs- und Business-Analyse-Sprache übersetzt — am Fallbeispiel TalentMatch AI, mit Persona-Zitat und Normbezug pro Begriff.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "basislager",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "RAG",
        "KI-Governance",
        "KI-Modelle"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "EU AI Act",
        "ISO 25010:2023"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-21",
        "auditZeileImTool": "21.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/re-ba/knowledge-zoom-navigator-re-ba.html",
        "tools/talentmatch-ml-paradigmen.html",
        "tools/vantera-talentmatch-steckbrief.html",
        "tools/vom-rateversuch-zur-belegten-antwort.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-black-box-simulator",
      "datei": "tools/ki-black-box-simulator.html",
      "titel": "KI Black-Box-Simulator",
      "kurztitel": "KI Black-Box-Simulator (ML)",
      "kurz": "Macht eine fiktive KI (Spam-Filter, Kredit-Score, Bewerbungs-Filter) nur über Ein- und Ausgabe erfahrbar. Erst nach eigenen Testreihen und einer Hypothese wird die Black Box geöffnet und mit der tatsächlichen — teils verzerrten — Entscheidungslogik verglichen.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "Prompt-Mechanik"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ki-prompt-blackbox-simulator.html",
        "tools/vom-rateversuch-zur-belegten-antwort.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-einsatzmuster-explorer",
      "datei": "tools/ki-einsatzmuster-explorer.html",
      "titel": "KI-Einsatzmuster-Explorer",
      "kurztitel": "KI-Einsatzmuster-Explorer",
      "kurz": "10 interne Anthropic-Teams im Vergleich – vom Data-Infrastructure-Team bis Legal – übersetzt in Denkraum-Zonen (Sammeln/Strukturieren/Spezifizieren), Autonomiegrad (1–5) und konkreten RE/BA/PM-Transfer nach IREB, BABOK und PMBOK. Split-Screen mit Zonen-Filter, jeder Fall mit Kernmuster, Transfer-Satz und Trainings-Tipp.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "moeglichkeit",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-11",
        "auditZeileImTool": "11.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ki-prompt-blackbox-simulator.html",
        "tools/vom-rateversuch-zur-belegten-antwort.html",
        "tools/vom-tool-chaos-zum-mcp-handshake.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-modelllandschaft-vergleich",
      "datei": "tools/ki-modelllandschaft-vergleich.html",
      "titel": "KI-Modelllandschaft im Vergleich: Claude vs. ChatGPT",
      "kurztitel": "KI-Modelllandschaft",
      "kurz": "Nachschlagewerk für Workshops: Claude- und ChatGPT-Modellfamilie Seite an Seite — verifizierte Kennzahlen (Kontextfenster, Preise, Wissensstand), Strukturvergleich Rolle für Rolle und eine Entscheidungshilfe für vier typische Aufgaben. Mit vollständigem Sprachumschalter Deutsch/Englisch.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "moeglichkeit",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Modelle"
      ],
      "standards": [],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-12",
        "auditZeileImTool": "12.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/claude-feature-navigator.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-prompt-blackbox-simulator",
      "datei": "tools/ki-prompt-blackbox-simulator.html",
      "titel": "Prompt-Black-Box-Simulator",
      "kurztitel": "Prompt-Black-Box-Simulator",
      "kurz": "Zeigt live, wie ein Prompt Tokenisierung, Kontextgewichtung und Wahrscheinlichkeiten durchläuft. Macht anhand von Qualitätshebeln (Rolle, Kontext, Constraints, Output-Format, Prüfauftrag) sichtbar, wie RE-Denken die Antwortqualität einer KI steuerbar macht.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "Prompt-Mechanik",
        "Prompting"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ki-black-box-simulator.html",
        "tools/ki-einsatzmuster-explorer.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-risiko-klassifikationsraum",
      "datei": "tools/ki-risiko-klassifikationsraum.html",
      "titel": "KI-Risiko-Klassifikationsraum",
      "kurztitel": "KI-Risiko-Klassifikationsraum",
      "kurz": "28 kuratierte KI-Risikofelder in fünf Kategorien (Daten, Modell, Agent, Sicherheit/Betrieb, Governance), jedes mit Normbezug inkl. Status und Datum. Sammeln (zehn Persona-Szenarien einzeln zuordnen), Strukturieren (filterbare Referenz-Übersicht mit Detailpanel) und Spezifizieren (Risiken auf ein Kundenservice-Agent-Szenario anwenden, mit Persona-Reaktionen).",
      "rubrik": "KI Tools",
      "bereich": "Governance, Recht & Sicherheit",
      "aufStartseite": true,
      "zweck": [
        "Workshop-Canvas"
      ],
      "denkraum": "stoer",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "KI-Governance",
        "KI-Modelle"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": "19.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": null,
      "verwandt": [
        "tools/vom-prompt-zum-agenten.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-steuern-mit-kompetenz",
      "datei": "tools/ki-steuern-mit-kompetenz.html",
      "titel": "Mit Kompetenz KI steuern, nicht hoffen",
      "kurztitel": "KI steuern mit Kompetenz",
      "kurz": "Live-Demonstrator für den Vortrag bei GPM Karlsruhe (AI4RE): führt einen schwachen und einen guten Prompt Schritt für Schritt durch Tokenisierung, Wahrscheinlichkeiten und Antwortgenerierung, erklärt die Websuche eines LLM und verankert jeden Schritt in ISO/IEC 25010:2023, ISO 27001, DSGVO und dem EU AI Act.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "GPM-Konferenz",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "ISO 25010",
        "Prompt-Mechanik",
        "KI-Governance",
        "Prompting",
        "KI-Modelle"
      ],
      "standards": [
        "EU AI Act"
      ],
      "siegel": {
        "status": "Offene Punkte",
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "K11 (Cross-Tool Hex-Konsistenz)"
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/profile-engineering-lab.html",
        "tools/prompt-builder.html",
        "tools/prompt-engineering-academy.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "ki-werkbank",
      "datei": "tools/ki-werkbank.html",
      "titel": "KI-Werkbank · Token, Prompt, Datenschutz",
      "kurztitel": "KI-Werkbank",
      "kurz": "ChatGPT, Claude, Copilot und Gemini im Praxisvergleich, elf Stationen: Token-Labor, Kontextfenster-Simulator, Prompt-Umbau in vier Verpackungen, Upload-Nadeltest, Ergebnisprüfung, Datenschutz-Ampel mit Anonymisierer, Art. 4 KI-VO, Vergleichsbogen und Checkliste. Jede Aussage mit Beleg-Abzeichen, am Fall TalentMatch AI, Deutsch/Englisch.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator",
        "Übung"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Seminar",
        "Workshop"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Marmorkuchen"
      ],
      "themen": [
        "Prompting",
        "KI-Modelle"
      ],
      "standards": [
        "EU AI Act",
        "IREB",
        "BABOK",
        "PMBOK",
        "ISO 25010:2023"
      ],
      "siegel": {
        "status": "Offene Punkte",
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Formales Siegel-Audit ausstehend; K14 Audit-Status-Zeile fehlt; K17 Rechtsstände nicht gegen Primärquelle verifiziert"
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "klarheits-sprint",
      "datei": "tools/klarheits-sprint/index.html",
      "titel": "Klarheits-Sprint",
      "kurztitel": "Klarheits-Sprint",
      "kurz": "Vom Rohsatz zur zertifizierten Anforderung — ein Live-Trainingstool für die Bühne, das einen vagen Anforderungssatz in vier Stationen zu einer IREB-/ISO-konformen Anforderung schärft.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Anforderungen erheben & schärfen",
      "aufStartseite": true,
      "zweck": [
        "Übung",
        "Demonstrator"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851",
        "9368",
        "31693"
      ],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "eigenes Muster",
      "sprecherSkript": false,
      "verwandt": [
        "tools/iso-25010-kompendium.html",
        "tools/pflichtenheft-generator.html",
        "tools/re-waschmaschine.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "llm-markt-kompass",
      "datei": "tools/llm-markt-kompass.html",
      "titel": "LLM-Markt-Kompass",
      "kurztitel": "LLM-Markt-Kompass",
      "kurz": "Sieben Anbieter (Claude, GPT, Gemini, Grok, Llama, Mistral, DeepSeek/Qwen/Phi) im Überblick — Stärken/Schwächen als SWOT-Karten, Direktvergleich zweier Modelle mit synchronisierten Kriterienzeilen, Vergleichstabelle und ein Einsatzleitfaden für RE, BA und PM. Mit vollständigem Sprachumschalter Deutsch/Englisch.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "moeglichkeit",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Modelle"
      ],
      "standards": [],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-13",
        "auditZeileImTool": "12.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "notebooklm-masterprompt-bibliothek",
      "datei": "tools/notebooklm-masterprompt-bibliothek.html",
      "titel": "NotebookLM-Masterprompt-Bibliothek",
      "kurztitel": "NotebookLM-Masterprompts",
      "kurz": "Rund 60 einsatzbereite Masterprompts für NotebookLM – kuratiert aus mehreren Quellen (Studium, Recherche, Content-Repurposing, Personas u.a.), durchsuchbar und mit Framework-Badge (RTF/CO-STAR/RISEN/TRACE/PACT/APE). Eigene Kategorie für IREB-Gap-Analyse, INVEST-Check und weitere RE/BA/PM-Adaptionen.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-21",
        "auditZeileImTool": "21.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/prompt-builder.html",
        "tools/promptschule-trainingsleitfaden.html",
        "tools/zettelkasten-prompt-engineering-re.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "novatrade-pulse-steckbrief",
      "datei": "tools/novatrade-pulse-steckbrief.html",
      "titel": "Fallwelt-Steckbrief — NovaTrade Systems GmbH / NovaTrade Pulse",
      "kurztitel": "Fallwelt NovaTrade Pulse",
      "kurz": "Referenzseite (kein Übungstool) für die dritte feste Denkraum-Fallwelt: reguliertes FinTech mit agiler Entwicklung unter MiFID-II-/WpHG-Compliance-Gate — Bruchteilsaktien-Handel, Personas mit unveränderten NovaTrade-Rollen, plus Business Case zur REQ-033-Dokumentation (2 Tage statt 3 Wochen Wiedererschließung bei späterer Erweiterung).",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Business-Analyse",
      "aufStartseite": true,
      "zweck": [
        "Fallwelt-Referenz"
      ],
      "denkraum": "basislager",
      "faeden": [],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Hochschule Nordwest",
        "NovaTrade Pulse",
        "Velaris Clearing"
      ],
      "themen": [
        "Fallwelt"
      ],
      "standards": [
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-24",
        "auditZeileImTool": "23.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-lifecycle-lernreise.html",
        "tools/sarahs-weg-zum-qualitaetskuchen.html",
        "tools/se-lifecycle-lernreise.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "okr-denkraum-check",
      "datei": "tools/okr-denkraum-check.html",
      "titel": "OKR-Board: Die Reise durch alle Räume",
      "kurztitel": "OKR-Board: Reise durch die Räume",
      "kurz": "Führt die komplette Kette von der Vision bis zum letzten ToDo als Board mit Tickets durch die 5 Denkräume — wie ein Product Backlog. Jedes Ticket zeigt Owner, Herkunft und Ziel, sodass die Nachverfolgung von ganz oben bis zum eigenen Schreibtisch sichtbar wird.",
      "rubrik": "Agiles Arbeiten & Projektmanagement",
      "bereich": "OKR",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "34000",
        "34002"
      ],
      "einsatzkontext": [],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [
        "OKR"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/okr-kaskade.html",
        "tools/okr-team-board.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "okr-kaskade",
      "datei": "tools/okr-kaskade.html",
      "titel": "OKR-Kaskade: Von der Vision zum ToDo",
      "kurztitel": "OKR-Kaskade",
      "kurz": "Spielt den kompletten Anforderungspfad einmal durch: Vision → Mission (Rooftop Shot & Moonshot) → Strategie → Initiative → OKRs auf drei Ebenen (Unternehmen, Team, Individuum) → User Story → ToDos. Drei fertige Beispiel-Durchläufe zum Umschalten.",
      "rubrik": "Agiles Arbeiten & Projektmanagement",
      "bereich": "OKR",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "41851",
        "34002"
      ],
      "einsatzkontext": [],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [
        "OKR"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/okr-denkraum-check.html",
        "tools/okr-team-board.html",
        "tools/priorisierungslabor.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "okr-lab-strategie-wirkung",
      "datei": "tools/okr-lab-strategie-wirkung.html",
      "titel": "🧪 OKR LAB – Von Strategie zu Wirkung",
      "kurztitel": "OKR LAB",
      "kurz": "Drei Live-Facilitation-Pfade durch OKR: der 15-Stationen-Hauptcase CALVERA (Vision → Mission → Strategie → Initiative → drei OKR-Ebenen → User Story → ToDo), ein Stand-alone-Team-OKR-Pfad und ein OKR-trifft-Agile-Transferpfad. One-Screen-pro-Station-Design mit Team-Modus, Vertiefungspanel, Ereignis-Zwischenfällen und vollständigem Sprachumschalter Deutsch/Englisch.",
      "rubrik": "Übungen",
      "bereich": "Simulationen & Labore",
      "aufStartseite": true,
      "zweck": [
        "Workshop-Canvas",
        "Lernreise"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "34000",
        "2929",
        "34002"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "CALVERA"
      ],
      "themen": [
        "OKR"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-07",
        "auditZeileImTool": "07.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/okr-denkraum-check.html",
        "tools/okr-kaskade.html",
        "tools/okr-team-board.html",
        "tools/priorisierungslabor.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "okr-team-board",
      "datei": "tools/okr-team-board.html",
      "titel": "OKR-Team-Board: Aufgaben, die aufs Ziel einzahlen",
      "kurztitel": "OKR-Team-Board",
      "kurz": "Ein Projekt-Objective, drei Key Results, ein Team (Ela, Knut, Sarah, Petra, Herr Bachmeier). Aufgaben als erledigt markieren aktualisiert live die Fortschrittsbalken von Key Result und Objective sowie eine Team-Performance-Übersicht pro Person.",
      "rubrik": "Agiles Arbeiten & Projektmanagement",
      "bereich": "OKR",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "34000",
        "3525",
        "34002"
      ],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "OKR"
      ],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Noch nicht gegen K1-K19-Checkliste geprüft."
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/okr-denkraum-check.html",
        "tools/okr-kaskade.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "pflichtenheft-generator",
      "datei": "tools/pflichtenheft-generator.html",
      "titel": "Pflichtenheft-Generator",
      "kurztitel": "Pflichtenheft-Generator",
      "kurz": "Leitet aus einer echten Ausschreibung (Vergabeunterlage) in 15 transparenten, regelbasierten Schritten ein vorläufiges Pflichtenheft ab — jede Extraktionsregel wird vor der Anwendung gezeigt und bestätigt, jedes Ergebnis bleibt mit Zitat und Fundstelle belegt.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Anforderungen erheben & schärfen",
      "aufStartseite": true,
      "zweck": [
        "Übung",
        "Demonstrator"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Hochschule Nordwest"
      ],
      "themen": [],
      "standards": [
        "IREB",
        "IEEE 29148",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "K11 (Cross-Tool Hex-Konsistenz)"
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": true,
      "verwandt": [
        "tools/anforderungsboard-iso.html",
        "tools/klarheits-sprint/index.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "pmp-eco-kombitool",
      "datei": "tools/pmp-eco-kombitool.html",
      "titel": "🎯 PMP ECO — Kombi-Tool",
      "kurztitel": "PMP ECO Kombi-Tool",
      "kurz": "26 ECO-Tasks aus drei Perspektiven zugleich: Domänen-Referenz (People/Process/Business Environment), Lifecycle entlang der fünf Prozessgruppen und eine Roadmap-Matrix Domäne × Phase mit Klick-Detailpanel. Ein Datensatz, gemeinsame Such-/Filterleiste, PMI-ECO-2026-Gewichtung (33/41/26 %).",
      "rubrik": "Agiles Arbeiten & Projektmanagement",
      "bereich": "Projektmanagement",
      "aufStartseite": true,
      "zweck": [
        "Prüfungsvorbereitung",
        "Nachschlagewerk"
      ],
      "denkraum": "basislager",
      "faeden": [
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3525",
        "2929"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Lebenszyklus",
        "Prüfungsvorbereitung"
      ],
      "standards": [
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-24",
        "auditZeileImTool": "24.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/agile-project-maturity-navigator.html",
        "tools/okr-kaskade.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "priorisierungslabor",
      "datei": "tools/priorisierungslabor.html",
      "titel": "🧭 Priorisierungslabor",
      "kurztitel": "Priorisierungslabor",
      "kurz": "Artefakt-Kette und passende Priorisierungsmethoden spielbar gemacht: von Business Case bis Gherkin acht Ebenen durchspielen, dazu eigene Werkzeuge für MoSCoW, Wert-Aufwand, Kano, WSJF, RICE, Story-Point-Poker und Stakeholder-Konfliktfälle — mit Ela, Knut, Sarah, Petra & Herrn Bachmeier.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Priorisierung",
      "aufStartseite": true,
      "zweck": [
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ba",
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "3525",
        "2929",
        "34002",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "IT-Tage"
      ],
      "fallwelten": [],
      "themen": [
        "Stakeholder"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": null,
        "auditZeileImTool": "03.08.2026",
        "offen": "K11 (Cross-Tool Hex-Konsistenz)"
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/okr-kaskade.html",
        "tools/user-story-puzzle.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "profile-engineering-lab",
      "datei": "tools/profile-engineering-lab.html",
      "titel": "Profile Engineering Lab",
      "kurztitel": "Profile Engineering Lab",
      "kurz": "Fünf Personen, dieselbe Aufgabe (LinkedIn-Beitrag), fünf völlig unterschiedliche Ergebnisse: Live-Demonstration, wie Promptqualität mit Profiltiefe wächst — vom bloßen Namen bis zum vollständig profilierten Zielbild. Profil-Baukasten links, wachsender Prompt rechts, plus Finalseite mit vollständigem Masterprompt in zwölf Kapiteln und Wirkungs-Tabelle.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator",
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK",
        "ISO 25010:2023",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-19",
        "auditZeileImTool": "19.07.2026",
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ki-steuern-mit-kompetenz.html",
        "tools/prompt-builder.html",
        "tools/prompt-engineering-academy.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "prompt-builder-auslieferung",
      "datei": "tools/prompt-builder-auslieferung.html",
      "titel": "Prompt-Builder · Auslieferungsversion",
      "kurztitel": "Prompt-Builder (Teilnehmende)",
      "kurz": "",
      "rubrik": null,
      "bereich": null,
      "aufStartseite": false,
      "zweck": [
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "IREB"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-11",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [],
      "geprueft": false,
      "notiz": "Teilnehmenden-Version des Prompt-Builders, bewusst nicht auf der Startseite."
    },
    {
      "id": "prompt-builder",
      "datei": "tools/prompt-builder.html",
      "titel": "Prompt-Builder",
      "kurztitel": "Prompt-Builder",
      "kurz": "Fünf-Bausteine-Wizard nach dem Prompt-Governance-Canvas: Rolle → Kontext → Aufgabe → Format → Kriterien. Jeder Baustein mit Leitfrage und Beispielen, rechts wächst live die Prompt-Blaupause zum Kopieren. Inklusive kompakter, wasserzeichenversehener Auslieferungsversion für Teilnehmer:innen.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Governance",
        "Prompting"
      ],
      "standards": [
        "IREB"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-11",
        "auditZeileImTool": "11.08.2026",
        "offen": "K11 (Cross-Tool Hex-Konsistenz)"
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ki-steuern-mit-kompetenz.html",
        "tools/profile-engineering-lab.html",
        "tools/prompt-engineering-academy.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "prompt-engineering-academy",
      "datei": "tools/prompt-engineering-academy.html",
      "titel": "Prompt Engineering Academy · 12 Missionen",
      "kurztitel": "Prompt Engineering Academy",
      "kurz": "Ein vollständiger 2-Tages-Kurs als interaktives Training: 12 Missionen von der Funktionsweise generativer KI über Rolle, Kontext, Qualitätsziele und Leitplanken bis zur Engineering-Challenge, dazu ein Anhang mit Strukturbefehlen, Megaprompt-Bibliothek, Praxis-Mustern aus Anthropics eigener Prompt-Bibliothek, Checkliste, Glossar und Fahrplan. Drei austauschbare Unternehmensszenarien, erfüllt die Nachweispflicht zur KI-Kompetenz nach Art. 4 KI-VO.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Lernreise",
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ki"
      ],
      "dauer": "2 Tage",
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "IREB",
        "ISO 25010:2023",
        "EU AI Act",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-19",
        "auditZeileImTool": "11.08.2026",
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/profile-engineering-lab.html",
        "tools/prompt-builder.html",
        "tools/zettelkasten-prompt-engineering-re.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "prompt-injection-demo",
      "datei": "tools/prompt-injection-demo.html",
      "titel": "Prompt-Injection-Demo",
      "kurztitel": "Prompt-Injection-Demo",
      "kurz": "Zeigt an drei Szenarien (E-Mail-Assistent, Support-Bot, Bewerbungs-Screening), wie sich Anweisungen in Dokumenten verstecken lassen, die eine KI ungefiltert übernimmt — erst selbst die versteckte Anweisung aufspüren, dann ungeschützte und geschützte KI-Antwort vergleichen, dazu ein Baukasten für eigene Versuche. Rein regelbasierte Simulation, kein echter KI-Aufruf.",
      "rubrik": "KI Tools",
      "bereich": "Governance, Recht & Sicherheit",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator",
        "Übung"
      ],
      "denkraum": "stoer",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "KI-Governance",
        "Prompting"
      ],
      "standards": [
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-27",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/escape-room-ki-prompting.html",
        "tools/prompt-builder.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "promptschule-trainingsleitfaden",
      "datei": "tools/promptschule-trainingsleitfaden.html",
      "titel": "PromptSchule · Trainingsleitfaden",
      "kurztitel": "PromptSchule Leitfaden",
      "kurz": "Sechs-Tab-Einsteigerkurs für KI-Prompting: KI-Grundlagen mit Bibliothekar-Analogie, sechs Frameworks (RTF, CO-STAR, RISEN, TRACE, PACT, APE) zum Durchklicken, 10 progressive Übungen mit Lösungsvorschlag, die 5 Goldregeln des Prompting und eine 15-teilige, kopierfertige Prompt-Bibliothek für den Arbeitsalltag.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Lernreise",
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Prompting"
      ],
      "standards": [],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-19",
        "auditZeileImTool": "19.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ki-prompt-blackbox-simulator.html",
        "tools/prompt-builder.html",
        "tools/prompt-engineering-academy.html",
        "tools/zettelkasten-prompt-engineering-re.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "prozessmodellierung-diagramm-kompendium",
      "datei": "tools/prozessmodellierung-diagramm-kompendium.html",
      "titel": "Prozessmodellierungs- und Diagramm-Kompendium",
      "kurztitel": "Prozessmodellierungs-Kompendium",
      "kurz": "35 Profile zu Prozessmodellierungs- und Diagrammarten mit integrierten Beispieldiagrammen — von Unternehmensprozessmodell über BPMN, EPK, SIPOC, Wertstromanalyse und Makigami bis zu Managementansätzen (PRINCE2, PM², IPMA ICB4, Lean, Agile) und vier Varianten von Story Mapping als Prozess. Auswahlhilfe nach Frage statt nach Diagrammtyp, je Profil 14 Kriterien (Zweck, Zielgruppe, Owner, Qualität, Risiken u.a.), universeller Qualitäts-Check und Kompaktglossar.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "9368"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "IT-Tage"
      ],
      "fallwelten": [],
      "themen": [
        "Prozessmodellierung"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-24",
        "auditZeileImTool": "23.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/babok-kompendium.html",
        "tools/bpmn-anwenderkompendium.html",
        "tools/ein-fall-35-blickwinkel.html",
        "tools/ipma-icb4-kompendium.html",
        "tools/ireb-kompendium.html",
        "tools/story-mapping-kundenperspektiven.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "re-ba-knowledge-zoom-navigator-re-ba",
      "datei": "tools/re-ba/knowledge-zoom-navigator-re-ba.html",
      "titel": "Knowledge Zoom Navigator · RE & BA",
      "kurztitel": "Knowledge Zoom Navigator",
      "kurz": "Wissenslandkarte mit fünf Zoom-Ebenen (Welt → Kontinent → Land → Stadt → Haus): 32 Wissenszettel zu Requirements Engineering und Business Analyse, ein roter Marker führt als Wegfindungs-Übung zu einem zufälligen Ziel-Zettel. Mit Trainer-Modus und Wissensnetz-Übersicht.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk",
        "Demonstrator"
      ],
      "denkraum": "basislager",
      "faeden": [
        "re",
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-26",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/re-ba/zettelkasten-reba.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "re-ba-zettelkasten-reba",
      "datei": "tools/re-ba/zettelkasten-reba.html",
      "titel": "Zettelkasten · RE & BA",
      "kurztitel": "Zettelkasten RE & BA",
      "kurz": "Fortsetzung des Knowledge Zoom Navigators als vernetzter Zettelkasten: Dateien-Browser nach Wissensbereich, interaktiver Beziehungsgraph und Kartenansicht mit Tag-Filtern. Eigene Zettel und Verknüpfungen lassen sich anlegen, exportieren und importieren.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk",
        "Demonstrator"
      ],
      "denkraum": "basislager",
      "faeden": [
        "re",
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "Coaching"
      ],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [
        "Zettelkasten"
      ],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-26",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/re-ba/knowledge-zoom-navigator-re-ba.html",
        "tools/zettelkasten-marmorkuchen-technik.html",
        "tools/zettelkasten-prompt-engineering-re.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "re-kompendium",
      "datei": "tools/re-kompendium.html",
      "titel": "RE-Kompendium — IREB, BABOK v3 & ISO/IEC/IEEE 29148 im Vergleich",
      "kurztitel": "RE-Kompendium",
      "kurz": "Zehn Kapitel Split-Screen-Nachschlagewerk, das die drei Standards nebeneinander statt nacheinander erklärt — von Grundlagen und Anforderungsarten über Elicitation, Analyse, Spezifikation und Qualitätskriterien bis zum Normen-Mapping (wo sich IREB/BABOK/29148 NICHT decken) und einer Dokumentenketten-Vorlage mit Klick-Karussell. Fallbeispiel TalentMatch AI, Kurz-/Vollversion je Kapitel.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "basislager",
      "faeden": [
        "re",
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [],
      "standards": [
        "IREB",
        "IEEE 29148",
        "BABOK",
        "ISO 25010:2023",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-16",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/bpmn-anwenderkompendium.html",
        "tools/ireb-kompendium.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "re-szenensammlung",
      "datei": "tools/re-szenensammlung.html",
      "titel": "RE-Szenensammlung — Eine Anforderung, drei Rollen",
      "kurztitel": "RE-Szenensammlung",
      "kurz": "Sechs firmenneutrale Alltagsszenen (Statusübersicht, Rechnungsfreigabe, Suchfeld, Rückfragen, Formular, Onboarding), jede als Stopp-für-Stopp-Reise vom ersten unscharfen Satz bis zur passenden Lösung — Szene 1 komplett bis zu Code/Test, die übrigen mit eigenem Schwerpunkt (Zielkonflikt, Elicitation-Technik, vergessener Stakeholder, Anforderungsqualität, Spezifikationsformat).",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "FA/NFA, User Stories & Traceability",
      "aufStartseite": true,
      "zweck": [
        "Lernreise"
      ],
      "denkraum": "analyse",
      "faeden": [
        "re",
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Stakeholder"
      ],
      "standards": [
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-16",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "re-waschmaschine",
      "datei": "tools/re-waschmaschine.html",
      "titel": "RE-Waschmaschine",
      "kurztitel": "RE-Waschmaschine",
      "kurz": "Wäscht eine funktionale Anforderung durch: leitet nicht-funktionale Anforderungen nach ISO/IEC 25010:2023 und Sicherheitsmaßnahmen nach ISO/IEC 27001:2022 Anhang A ab, deckt blinde Flecken auf und zeigt vereinfacht, wie eine KI den Satz tokenisiert.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "ISO & Compliance",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "9368"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "ISO 25010"
      ],
      "standards": [
        "ISO 25010:2023",
        "ISO 27001:2022",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-13",
        "auditZeileImTool": "03.08.2026",
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/anforderungsboard-iso.html",
        "tools/fa-nfa-rollen-spuren.html",
        "tools/iso-25010-kompendium.html",
        "tools/requirements-to-code-explorer.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "requirements-to-code-explorer",
      "datei": "tools/requirements-to-code-explorer.html",
      "titel": "Requirements-to-Code Explorer",
      "kurztitel": "Requirements-to-Code Explorer",
      "kurz": "Eine einzelne Anforderung wandert in 9 Stufen vom unscharfen Wunsch über Stakeholder-Kontext, ISO 25010 und ISO 27001 bis zur messbaren Gesamtanforderung, Gherkin-Akzeptanzkriterien und der Entwicklerübergabe. Die letzte Stufe zeigt HTML, JavaScript und Python im Terminal-Look mit farbcodierten Codezeilen und Traceability-Tabelle bis zum Test.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "FA/NFA, User Stories & Traceability",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "ISO 25010",
        "Stakeholder"
      ],
      "standards": [
        "ISO 25010:2023",
        "ISO 27001:2022"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-18",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/iso-25010-kompendium.html",
        "tools/re-waschmaschine.html",
        "tools/user-story-puzzle.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "sarahs-weg-zum-qualitaetskuchen",
      "datei": "tools/sarahs-weg-zum-qualitaetskuchen.html",
      "titel": "🎂 Sarahs Weg zum Qualitätskuchen",
      "kurztitel": "Sarahs Weg zum Qualitätskuchen",
      "kurz": "Zweitägiges Erzähltool: Sarah durchläuft ein reales RE-Projekt von der vagen Anfrage bis zum vollständigen Anforderungsdatensatz (Tag 1) und übersetzt „gut\" in die neun Merkmale der ISO/IEC 25010:2023 samt Qualität-in-Nutzung nach ISO/IEC 25019:2023 (Tag 2). Vier austauschbare Szenarien (Bäckerei, Studienakte, TalentMatch AI, NovaTrade Pulse) mit Quiz, Reflexionsaufgaben und interaktivem 9-Merkmale-Grid.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Fallstudie",
      "aufStartseite": true,
      "zweck": [
        "Lernreise"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": "2 Tage",
      "haufeSeminare": [
        "2929",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "NovaTrade Pulse",
        "Marmorkuchen"
      ],
      "themen": [
        "ISO 25010"
      ],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-23",
        "auditZeileImTool": "23.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/fallstudie-qualitaetssystem.html",
        "tools/iso-25010-kompendium.html",
        "tools/novatrade-pulse-steckbrief.html",
        "tools/priorisierungslabor.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "se-lifecycle-lernreise",
      "datei": "tools/se-lifecycle-lernreise.html",
      "titel": "🧭 SE-Lifecycle-Lernreise",
      "kurztitel": "SE-Lifecycle-Lernreise",
      "kurz": "Elf Wissensbereiche des SWEBOK® Guide V4.0a als Stationenweg — dieselbe Struktur wie die BA-Lifecycle-Lernreise, aber für Software Engineering statt Business-Analyse, inklusive drei neuer Kapitel (Architecture, Operations, Security). Drei Fälle (Hochrisiko-KI-Recruiting, agiles FinTech, klassische Verwaltungsdigitalisierung), je Station fünf Artefakte, Klassisch-vs.-Agil-Vergleich, ISO/IEC-25010:2023-Mapping und Traceability-Faden über alle elf Stationen.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Software Engineering",
      "aufStartseite": true,
      "zweck": [
        "Lernreise"
      ],
      "denkraum": "rundreise",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "2929"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Hochschule Nordwest",
        "NovaTrade Pulse"
      ],
      "themen": [
        "ISO 25010",
        "Lebenszyklus"
      ],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "EU AI Act",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-23",
        "auditZeileImTool": "23.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-lifecycle-lernreise.html",
        "tools/hochschule-nordwest-steckbrief.html",
        "tools/iso-25010-kompendium.html",
        "tools/novatrade-pulse-steckbrief.html",
        "tools/sarahs-weg-zum-qualitaetskuchen.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "stakeholder-management-kompendium-fachbuch",
      "datei": "tools/stakeholder-management-kompendium-fachbuch.html",
      "titel": "Stakeholder Management Kompendium",
      "kurztitel": "Stakeholder-Kompendium",
      "kurz": "Interaktives Fachbuch in 16 Kapiteln von Grundlagen über Identifikation, Analyse-Matrizen (Mendelow, Salience Model) und Interessen bis Governance, Ethik und Konfliktarbeit — mit Lesen/Trainieren-Modus, Volltextsuche, Merkliste, Lernfortschritt und vollständigem Sprachumschalter Deutsch/Englisch. Durchgängiges Fallbeispiel Hochschule Nordwest.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ba",
        "re",
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "3525",
        "2929",
        "34002",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Hochschule Nordwest"
      ],
      "themen": [
        "Stakeholder",
        "KI-Governance"
      ],
      "standards": [
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-04",
        "auditZeileImTool": "04.09.2026",
        "offen": "K18 (Beamer-Schriftgrößen unter Floor, Label-Konvention); kein formales Audit-Protokoll gegen v1.9"
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/babok-kompendium.html",
        "tools/hochschule-nordwest-steckbrief.html",
        "tools/ireb-kompendium.html",
        "tools/priorisierungslabor.html",
        "tools/stakeholder-memory.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "stakeholder-memory",
      "datei": "tools/stakeholder-memory.html",
      "titel": "Stakeholder Memory",
      "kurztitel": "Stakeholder Memory",
      "kurz": "Memory-Spiel zum Nebel-Typ Stakeholder: sechs Personas (Herr Bachmeier, Ela, Knut, Sarah, Petra, Meike) gegen ihre Zitate matchen — jedes Match öffnet eine Detailkarte mit echtem Bedürfnis, Macht-Interesse-Einordnung und Nebel-Typ. Grundlagen-Modus mit Quadrant-Hinweis, Profi-Modus ohne, plus Debrief-Recap am Ende.",
      "rubrik": "Übungen",
      "bereich": "Spiele",
      "aufStartseite": true,
      "zweck": [
        "Spiel"
      ],
      "denkraum": "analyse",
      "faeden": [
        "re",
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "3525",
        "34002",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Stakeholder"
      ],
      "standards": [
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-29",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/priorisierungslabor.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "steckbrief",
      "datei": "tools/steckbrief.html",
      "titel": "Steckbrief · Michaela Kühn",
      "kurztitel": "Steckbrief Michaela Kühn",
      "kurz": "Kompetenzprofil und Positionierung: Requirements Engineering, Business-Analyse und KI-gestützte Anforderungsarbeit in zwölf Bausteinen — von der Anforderungsdeklination bis zur Entscheidungsarchitektur.",
      "rubrik": "Über mich",
      "bereich": null,
      "aufStartseite": true,
      "zweck": [
        "Über mich"
      ],
      "denkraum": "basislager",
      "faeden": [],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [],
      "standards": [],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": null,
      "verwandt": [
        "tools/prompt-engineering-academy.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "stoerfall-labor",
      "datei": "tools/stoerfall-labor.html",
      "titel": "Störfall-Labor · Störung im Betriebsablauf",
      "kurztitel": "Störfall-Labor",
      "kurz": "Mitten im Projekt kippt eine Annahme: drei Störfälle aus bekannten Fallwelten (Hochschule Nordwest, NovaTrade, Vantera) in sechs Stationen bearbeiten, vom Signal bis zum Änderungsantrag und zur Lehre für die Schleusen. Mit Best-Practice-Regeln und Protokoll zum Herunterladen.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Priorisierung & Änderungen",
      "aufStartseite": true,
      "zweck": [
        "Übung",
        "Workshop-Canvas"
      ],
      "denkraum": "stoer",
      "faeden": [
        "re",
        "ba",
        "pm"
      ],
      "dauer": "45–60 min (Kurzfassung 15 min)",
      "haufeSeminare": [
        "9368",
        "31693",
        "34000",
        "3525",
        "2929",
        "34002",
        "3744"
      ],
      "einsatzkontext": [
        "Seminar",
        "Workshop"
      ],
      "fallwelten": [
        "Hochschule Nordwest",
        "NovaTrade Pulse",
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "Änderungsmanagement",
        "Störraum",
        "Stakeholder",
        "KI-Governance"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK",
        "EU AI Act"
      ],
      "siegel": {
        "status": null,
        "letztesAudit": null,
        "auditZeileImTool": null,
        "offen": "Formales Siegel-Audit steht aus; Selbstprüfung beim Bau (01.10.2026): Muss-Kriterien erfüllt, Z9 Teilnehmenden-Version fehlt (Kann)."
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/denkraeume-navigator.html",
        "tools/requirements-to-code-explorer.html",
        "tools/priorisierungslabor.html",
        "tools/stakeholder-management-kompendium-fachbuch.html"
      ],
      "geprueft": false,
      "notiz": "Gebaut nach konzepte/stoerfall-labor.md, schließt die Störraum-Lücke im Fahrplan auf RE, BA und Agil/PM."
    },
    {
      "id": "story-mapping-kundenperspektiven",
      "datei": "tools/story-mapping-kundenperspektiven.html",
      "titel": "🗺️ Story Mapping — Kundenperspektiven",
      "kurztitel": "Story Mapping",
      "kurz": "Vier Kundenperspektiven (Einkäufer, Servicetechniker, Geschäftsführung, Neukunde) über dieselbe Backbone-Kundenreise eines B2B-Kundenportals — mit Release-Slicing (MVP/Release 2/Backlog), Drag-and-Drop-Priorisierung und Vergleichsmodus, der zeigt, wie dieselbe Aktivität für unterschiedliche Rollen gegensätzliche Priorität hat.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "FA/NFA, User Stories & Traceability",
      "aufStartseite": true,
      "zweck": [
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "ba",
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "3525",
        "2929",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [],
      "standards": [
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-03",
        "auditZeileImTool": "03.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/requirements-to-code-explorer.html",
        "tools/user-story-puzzle.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "studierendenakte-qualitaet",
      "datei": "tools/studierendenakte-qualitaet.html",
      "titel": "Digitale Studierendenakte — Qualität systematisch denken",
      "kurztitel": "Digitale Studierendenakte",
      "kurz": "Zehn-Kapitel-Nachschlagewerk entlang eines einzigen durchgängigen Falls (Hochschule NOVA, fehlzugeordneter Anerkennungsbescheid): alle neun ISO/IEC-25010:2023-Merkmale, ISO 25019/25012, elf Projektrollen mit Konfliktmatrix und zwei vollständig klickbar rückverfolgbare Artefaktketten von Hochschulziel bis Abnahmeentscheidung — plus Exkurs zu klassischem, agilem und use-case-basiertem Anforderungsweg.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "ISO & Compliance",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Hochschule Nordwest",
        "Hochschule NOVA"
      ],
      "themen": [
        "ISO 25010"
      ],
      "standards": [
        "ISO 25010:2023",
        "IREB",
        "BABOK",
        "PMBOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-27",
        "auditZeileImTool": "26.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ba-lifecycle-lernreise.html",
        "tools/fallstudie-qualitaetssystem.html",
        "tools/iso-25010-kompendium.html",
        "tools/sarahs-weg-zum-qualitaetskuchen.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "talentmatch-ai-sufficiency-gate",
      "datei": "tools/talentmatch-ai-sufficiency-gate.html",
      "titel": "TalentMatch AI vor dem Sufficiency-Gate",
      "kurztitel": "TalentMatch Sufficiency-Gate",
      "kurz": "Die Vantera-Fallstudie trifft RSGA (Requirements-Sufficiency-Gated Automation, IEEE RE 2026): vierstufige Szenario-Simulation mit bewusstem Aha-Moment, was ein Recruiting-Prompt ohne Vollständigkeits-Gate an Diskriminierungs-, Datenschutz- und Bußgeldrisiko auslösen würde — und wie der nachgebesserte, gegatete Prompt aussieht.",
      "rubrik": "KI Tools",
      "bereich": "Governance, Recht & Sicherheit",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator",
        "Lernreise"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki",
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "IREB",
        "BABOK",
        "PMBOK",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-21",
        "auditZeileImTool": "21.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/ki-architektur-glossar-reba.html",
        "tools/ki-risiko-klassifikationsraum.html",
        "tools/talentmatch-ml-paradigmen.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "talentmatch-ml-paradigmen",
      "datei": "tools/talentmatch-ml-paradigmen.html",
      "titel": "TalentMatch AI — Vier ML-Paradigmen im RE/BA-Blick",
      "kurztitel": "TalentMatch ML-Paradigmen",
      "kurz": "Supervised, Unsupervised, Semi-Supervised und Reinforcement Learning nicht als ML-Erklärung, sondern als vier RE/BA-Analyseaufgaben an einem Fall (Vantera Systemtechnik GmbH): je Baustein Verstehen → Arbeiten → Transfer mit ISO-25010-Badges, Requirements-Kette und Prompt-Beispiel, plus Synthese-Vergleich aller vier Paradigmen.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Wissen & Nachschlagen",
      "aufStartseite": true,
      "zweck": [
        "Lernreise"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ki",
        "ba"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "ISO 25010",
        "Prompting"
      ],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "EU AI Act",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-30",
        "auditZeileImTool": "30.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/ki-architektur-glossar-reba.html",
        "tools/talentmatch-ai-sufficiency-gate.html",
        "tools/vantera-talentmatch-steckbrief.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "user-story-puzzle",
      "datei": "tools/user-story-puzzle.html",
      "titel": "User Story Puzzle",
      "kurztitel": "User Story Puzzle",
      "kurz": "Erkunde zuerst ein anklickbares Beispiel-Backlog mit drei fertigen User Stories, dann baue selbst aus einzelnen Bausteinen korrekte User Stories zusammen — fünf Level von der Grundformel über INVEST-konforme Formulierung und Gherkin-Akzeptanzkriterien bis zu Business Value und MoSCoW-Priorität, mit fachlich begründeten Distraktoren nach IREB, INVEST und BABOK v3.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "FA/NFA, User Stories & Traceability",
      "aufStartseite": true,
      "zweck": [
        "Spiel",
        "Übung"
      ],
      "denkraum": "loesung",
      "faeden": [
        "re",
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "3744",
        "34000",
        "3525",
        "9368",
        "31693"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [],
      "standards": [
        "IREB",
        "BABOK",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-11",
        "auditZeileImTool": "11.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/babok-kompendium.html",
        "tools/iso-25010-kompendium.html",
        "tools/requirements-to-code-explorer.html",
        "tools/story-mapping-kundenperspektiven.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "vantera-talentmatch-steckbrief",
      "datei": "tools/vantera-talentmatch-steckbrief.html",
      "titel": "Fallwelt-Steckbrief — Vantera Systemtechnik GmbH / TalentMatch AI",
      "kurztitel": "Fallwelt Vantera / TalentMatch AI",
      "kurz": "Referenzseite (kein Übungstool) für die meistgenutzte Denkraum-Fallwelt: feste Fakten zu Unternehmen, Personas und Prozess (Maschinenbau, 340 Mitarbeitende, Hochrisiko-KI nach EU AI Act Anhang III Nr. 4) für konsistente neue Tools, plus Business Case zum Wert früher RE-Einbindung — mit realem EU-AI-Act-Bußgeldrahmen statt Trainingszahlen.",
      "rubrik": "Requirements & Business-Analyse",
      "bereich": "Business-Analyse",
      "aufStartseite": true,
      "zweck": [
        "Fallwelt-Referenz"
      ],
      "denkraum": "basislager",
      "faeden": [],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI",
        "Velaris Clearing"
      ],
      "themen": [
        "Fallwelt",
        "KI-Governance"
      ],
      "standards": [
        "EU AI Act",
        "IREB",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-09-23",
        "auditZeileImTool": "23.09.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ba-rollenwandel-explorer.html",
        "tools/bpmn-anwenderkompendium.html",
        "tools/ireb-kompendium.html",
        "tools/re-kompendium.html",
        "tools/talentmatch-ai-sufficiency-gate.html",
        "tools/talentmatch-ml-paradigmen.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "vom-prompt-zum-agenten",
      "datei": "tools/vom-prompt-zum-agenten.html",
      "titel": "Vom Prompt zum Agenten",
      "kurztitel": "Vom Prompt zum Agenten",
      "kurz": "Die vier Eskalationsstufen der KI-Steuerung — Prompt, Context, Loop und Graph Engineering — jede Stufe löst eine Grenze der vorherigen, mit RE/BA-Transfer (IREB, BABOK, INVEST), Vantera-Connect-Beispielen und Persona-Reaktionen. Stufe 5 ordnet LLM, RAG, Generative AI und Agentic AI zueinander ein.",
      "rubrik": "KI Tools",
      "bereich": "KI-Systeme bauen & steuern",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "GPM-Konferenz"
      ],
      "fallwelten": [
        "Vantera / TalentMatch AI"
      ],
      "themen": [
        "RAG",
        "Prompting",
        "KI-Modelle"
      ],
      "standards": [
        "IREB",
        "EU AI Act",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-09",
        "auditZeileImTool": "09.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ai-engineering-studio.html",
        "tools/cpmai-prozess-board.html",
        "tools/ki-risiko-klassifikationsraum.html",
        "tools/vantera-talentmatch-steckbrief.html",
        "tools/vom-rateversuch-zur-belegten-antwort.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "vom-rateversuch-zur-belegten-antwort",
      "datei": "tools/vom-rateversuch-zur-belegten-antwort.html",
      "titel": "Vom Rateversuch zur belegten Antwort · RAG im Denkraum-Modell",
      "kurztitel": "RAG: Vom Rateversuch zur Antwort",
      "kurz": "Drei Zonen, drei Tabs: von der stillen Wissenslücke eines Sprachmodells über den Retriever als Bibliothekar (Chunking, Embedding, Similarity Search) bis zum fünfstufigen RAG-Zyklus, der aus einer Vermutung eine quellenbelegte Antwort macht.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "RAG",
        "KI-Modelle"
      ],
      "standards": [],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-27",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ki-black-box-simulator.html",
        "tools/ki-einsatzmuster-explorer.html",
        "tools/vom-tool-chaos-zum-mcp-handshake.html",
        "tools/wie-kommt-die-antwort-in-den-chat.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "vom-tool-chaos-zum-mcp-handshake",
      "datei": "tools/vom-tool-chaos-zum-mcp-handshake.html",
      "titel": "Vom Tool-Chaos zum MCP-Handshake",
      "kurztitel": "MCP-Handshake",
      "kurz": "Drei Zonen als Tabs: vom N×M-Werkzeug-Wirrwarr ohne gemeinsamen Standard über das strukturierende MCP-Server-Schema (Host, Client, Server, Resources/Tools/Prompts) bis zum Schritt-für-Schritt nachvollziehbaren Handshake (Initialize → Bestätigung → Discovery → Aufruf).",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar"
      ],
      "fallwelten": [],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "IREB"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-26",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": true,
      "verwandt": [
        "tools/ki-einsatzmuster-explorer.html",
        "tools/vom-rateversuch-zur-belegten-antwort.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "wie-ki-durch-projekte-denkt",
      "datei": "tools/wie-ki-durch-projekte-denkt.html",
      "titel": "Wie KI durch Projekte denkt",
      "kurztitel": "Wie KI durch Projekte denkt",
      "kurz": "Ein Projekt, elf Schritte: von der jungfräulichen KI-Instanz über Kontextualisierung, das STAKE-Framework, Attention und Temperatur bis zur fertigen Antwort. Zeigt an vier Projektwelten (ERP, KI-Pilot, Agile Transformation, Blank-Fall), dass Prompt Engineering derselben Denkstruktur folgt wie Requirements Engineering.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "analyse",
      "faeden": [
        "ki",
        "pm"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851"
      ],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "Prompting"
      ],
      "standards": [
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-13",
        "auditZeileImTool": "03.08.2026",
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ki-steuern-mit-kompetenz.html",
        "tools/profile-engineering-lab.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "wie-kommt-die-antwort-in-den-chat",
      "datei": "tools/wie-kommt-die-antwort-in-den-chat.html",
      "titel": "Wie kommt die Antwort in den Chat? – Die RAG-Reise",
      "kurztitel": "RAG-Reise in den Chat",
      "kurz": "Acht anklickbare Stationen einer RAG-Production-Architektur im \"Sendung mit der Maus\"-Stil — von Indexing- und Query-Pipeline über Retrieval-/Answer-Quality bis zu Observability und Safety & Operations. Jede Station einmal als Alltagsbild, einmal fachlich korrekt, plus RE/BA-Anschluss.",
      "rubrik": "KI Tools",
      "bereich": "Grundlagen & Funktionsweise",
      "aufStartseite": true,
      "zweck": [
        "Demonstrator"
      ],
      "denkraum": "umsetzung",
      "faeden": [
        "ki"
      ],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [],
      "fallwelten": [],
      "themen": [
        "RAG"
      ],
      "standards": [
        "IREB",
        "ISO 25010:2023",
        "BABOK"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-08-21",
        "auditZeileImTool": "21.08.2026",
        "offen": null
      },
      "beamer": "4-stufig",
      "sprecherSkript": false,
      "verwandt": [
        "tools/ki-einsatzmuster-explorer.html",
        "tools/vom-rateversuch-zur-belegten-antwort.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "zettelkasten-marmorkuchen-technik",
      "datei": "tools/zettelkasten-marmorkuchen-technik.html",
      "titel": "Zettelkasten · Marmorkuchen erklärt die Zettelkasten-Technik",
      "kurztitel": "Zettelkasten Marmorkuchen",
      "kurz": "Erklärt die Zettelkasten-Technik selbst — atomare Notiz, Verknüpfung mit Verb, Notiztypen, Emergenz — anhand eines durchgehenden Marmorkuchen-Beispiels mit Sarah, Herrn Bachmeier, Ela, Knut und Petra. Im Graph beobachtbar: aus vielen Einzelverknüpfungen entsteht ein Netz, kein Baum.",
      "rubrik": "Didaktik Tools",
      "bereich": null,
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "basislager",
      "faeden": [],
      "dauer": null,
      "haufeSeminare": [],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "Coaching"
      ],
      "fallwelten": [
        "Marmorkuchen"
      ],
      "themen": [
        "Zettelkasten"
      ],
      "standards": [
        "IREB",
        "ISO 25010:2023"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-27",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": true,
      "verwandt": [
        "tools/re-ba/zettelkasten-reba.html",
        "tools/zettelkasten-prompt-engineering-re.html"
      ],
      "geprueft": false,
      "notiz": ""
    },
    {
      "id": "zettelkasten-prompt-engineering-re",
      "datei": "tools/zettelkasten-prompt-engineering-re.html",
      "titel": "Zettelkasten: Prompt Engineering ist Requirements Engineering für KI-Systeme",
      "kurztitel": "Zettelkasten PE ist RE",
      "kurz": "Vernetzter Zettelkasten mit kuratierter Konzept-Karte: links Requirements Engineering, rechts Prompt Engineering, in der Mitte die gemeinsamen Prinzipien als Brücke — plus die Risiken (Missverständnisse, Halluzinationen), die beide Seiten gefährden. Mit Tag-Filtern, Volltextsuche und eigenen Zetteln.",
      "rubrik": "KI Tools",
      "bereich": "Prompt Engineering & Anwendung",
      "aufStartseite": true,
      "zweck": [
        "Nachschlagewerk"
      ],
      "denkraum": "basislager",
      "faeden": [
        "ki",
        "re"
      ],
      "dauer": null,
      "haufeSeminare": [
        "41851",
        "9368"
      ],
      "einsatzkontext": [
        "Workshop",
        "Seminar",
        "GPM-Konferenz"
      ],
      "fallwelten": [],
      "themen": [
        "Zettelkasten",
        "Prompting"
      ],
      "standards": [
        "IREB",
        "IEEE 29148",
        "ISO 25010:2023",
        "BABOK",
        "EU AI Act"
      ],
      "siegel": {
        "status": "Auditiert & zertifiziert",
        "letztesAudit": "2026-07-26",
        "auditZeileImTool": null,
        "offen": null
      },
      "beamer": "3-stufig (alt)",
      "sprecherSkript": false,
      "verwandt": [
        "tools/prompt-builder.html",
        "tools/prompt-engineering-academy.html",
        "tools/re-ba/zettelkasten-reba.html"
      ],
      "geprueft": false,
      "notiz": ""
    }
  ]
};
