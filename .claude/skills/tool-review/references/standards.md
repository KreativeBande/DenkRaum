# Standards & Frameworks — Requirements Engineering & Regulatorik
*Version 3.1 — Stand: Juli 2026*
*Kanonische Referenzdatei für alle RE-Trainingstools und den Master-Prompt.*
*Bei Verwendung in Trainingscases Status und Datum immer mit übernehmen.*

*Hinweis zur Synchronisierung: Anders als `master-prompt-zusammenarbeit.md` und `qualitaetskriterien-checkliste.md` gibt es für dieses Dokument keine einzelne, konsolidierte Notion-Seite — die Inhalte sind über einzelne Framework-Seiten in Notion verteilt. Diese Datei ist Michaelas letzter gesicherter Gesamtstand (v3.1). K17 (Aktualität referenzierter Normen/Frameworks) gilt trotzdem: Status/Version/Datum vor Verwendung in einem neuen Tool per gezielter Websuche gegenprüfen, nicht blind aus dieser Datei übernehmen — Regulatorik veraltet schnell.*

---

## IREB CPRE (Certified Professional for Requirements Engineering)

**Herausgeber:** IREB e.V.
**Zweck:** Prozess und Qualität im Requirements Engineering
**Prüfungsrelevanz:** Foundation Level, Advanced Level (RE@Agile, Elicitation, Modeling, Quality)

### RE-Prozess nach IREB
1. **Ermitteln** — Stakeholder-Interviews, Workshops, Beobachtung, Prototyping
2. **Analysieren** — Klassifizieren, Strukturieren, Widersprüche erkennen
3. **Dokumentieren** — Formale Artefakte erstellen
4. **Validieren** — Reviews, Walkthroughs, Checklisten
5. **Verwalten** — Versionierung, Traceability, Change Management

### Kernbegriffe IREB
- **Stakeholder** — Person oder Gruppe mit Einfluss auf oder Interesse an einem System
- **Anforderung** — Bedingung, die ein System oder Prozess erfüllen muss
- **Systemgrenze** — Trennung zwischen System und Umgebung
- **Kontext** — Alles außerhalb der Systemgrenze, das relevant ist
- **Anforderungsartefakt** — Dokument oder Modell, das Anforderungen beschreibt

---

## BABOK v3 (IIBA — Business Analysis Body of Knowledge)

**Herausgeber:** IIBA (International Institute of Business Analysis)
**Zweck:** Ganzheitliche Business Analyse, von Strategie bis Lösung
**Zertifizierungen:** ECBA, CCBA, CBAP, PMI-PBA

### Wissensgebiete (Knowledge Areas)
| Knowledge Area | Inhalt |
|---|---|
| Business Analysis Planning & Monitoring | Planung des BA-Prozesses |
| Elicitation & Collaboration | Anforderungsermittlung, Stakeholder-Einbindung |
| Requirements Life Cycle Management | Traceability, Änderungsmanagement |
| Strategy Analysis | Geschäftsbedarf, Ziele, Lückenanalyse |
| Requirements Analysis & Design Definition | Modellierung, Priorisierung |
| Solution Evaluation | Lösungsbewertung, Nutzenmessung |

### Anforderungstypen nach BABOK
- **Business Requirements** — Warum? Geschäftsziel, Nutzen
- **Stakeholder Requirements** — Wer braucht was?
- **Solution Requirements** — Was soll das System tun? (funktional + nicht-funktional)
- **Transition Requirements** — Was braucht es für die Einführung?

---

## IEEE 29148:2018

**Vollständiger Titel:** Systems and Software Engineering — Life Cycle Processes — Requirements Engineering
**Zweck:** Formale Anforderungsdokumentation, SRS-Struktur

### Qualitätskriterien nach IEEE 29148
| Kriterium | Bedeutung |
|---|---|
| Necessary | Ohne diese Anforderung ist das System unvollständig |
| Appropriate | Passt zum Abstraktionsniveau |
| Unambiguous | Nur eine Interpretation möglich |
| Complete | Vollständig, keine fehlenden Bedingungen |
| Singular | Beschreibt genau eine Sache |
| Feasible | Technisch und wirtschaftlich umsetzbar |
| Verifiable | Testbar durch Inspektion, Analyse, Test oder Demo |
| Correct | Stimmt mit Stakeholder-Bedarf überein |
| Conforming | Folgt den Dokumentationskonventionen |

### SRS-Struktur (System Requirements Specification)
1. Einführung (Zweck, Umfang, Definitionen)
2. Systemüberblick
3. Anforderungen (funktional, nicht-funktional, Constraints)
4. Traceability-Matrix
5. Anhang

---

## ISO/IEC 25010:2023 — Qualitätsmodell (SQuaRE, Edition 2)

**Status:** In Kraft seit November 2023 — **ersetzt ISO/IEC 25010:2011.**
**Achtung:** Ältere Quellen zitieren noch die 2011er-Fassung (8 Merkmale). Bei Neuerstellung immer Edition 2023 (9 Merkmale) verwenden und „:2023" mit angeben.

### Product Quality Model — 9 Hauptmerkmale (Edition 2023)

| Merkmal | Untermerkmale (Auswahl) | Änderung ggü. 2011 |
|---|---|---|
| Functional Suitability | Completeness, Correctness, Appropriateness | unverändert |
| Performance Efficiency | Time Behaviour, Resource Utilisation, Capacity | unverändert |
| Compatibility | Co-existence, Interoperability | unverändert |
| **Interaction Capability** | Appropriateness Recognisability, Learnability, Operability, User Error Protection, Accessibility, User Engagement, Inclusivity, Self-Descriptiveness | umbenannt von „Usability"; User Engagement, Inclusivity, Self-Descriptiveness neu |
| Reliability | Faultlessness, Availability, Fault Tolerance, Recoverability | „Maturity" → „Faultlessness" |
| Security | Confidentiality, Integrity, Non-repudiation, Authenticity, Accountability, Resistance | Resistance neu |
| Maintainability | Modularity, Reusability, Analysability, Modifiability, Testability | unverändert |
| **Flexibility** | Adaptability, Scalability, Installability, Replaceability | umbenannt von „Portability"; Scalability neu |
| **Safety** | Operational Constraint, Risk Identification, Fail Safe, Hazard Warning, Safe Integration | komplett neu in 2023 |

### Marmorkuchen-Brücke zu ISO 25010:2023
*„Der Marmorkuchen muss saftig sein (Reliability), schnell serviert werden (Performance Efficiency), von allen gegessen werden können (Interaction Capability), das Rezept darf nicht gestohlen werden (Security) — und er darf niemanden mit Nussallergie gefährden (Safety)."*

---

## ISO/IEC 27001:2022 — ISMS

**Status:** In Kraft — aktuelle Fassung 2022, ersetzt 2013er-Fassung.
**Zweck:** Anforderungen an Aufbau, Umsetzung und kontinuierliche Verbesserung eines Informationssicherheits-Managementsystems. Referenznorm für Security-NFRs im RE.

### Kernstruktur (High Level Structure)
| Kapitel | Inhalt |
|---|---|
| 4 Kontext der Organisation | Scope, interessierte Parteien |
| 5 Führung | Verantwortung des Top-Managements, Politik |
| 6 Planung | Risikobeurteilung, Risikobehandlung, Ziele |
| 7 Unterstützung | Ressourcen, Kompetenz, Bewusstsein, Kommunikation |
| 8 Betrieb | Umsetzung der Risikobehandlung |
| 9 Bewertung der Leistung | Monitoring, internes Audit, Managementbewertung |
| 10 Verbesserung | Korrekturmaßnahmen, kontinuierliche Verbesserung |

### Bezug zu NIS2
Ein ISMS nach ISO 27001 deckt ca. 70–80 % der NIS2-Anforderungen ab. Die verbleibenden 20–30 % sind NIS2-spezifisch (BSI-Registrierung, gestuftes Meldeverfahren, Geschäftsleitungspflichten). **Nicht als austauschbar behandeln — Schnittmenge und Lücke explizit benennen.**

---

## Regulatorik — Stand Juli 2026

> ⚠️ Status und Datum immer mit in Trainingscases übernehmen. Regulatorik veraltet schnell — unmarkierte Momentaufnahmen sind K8-Fails.

### EU AI Act (Verordnung (EU) 2024/1689)
**Status:** In Kraft seit August 2024, gestaffeltes Anwendungsdatum:
- Verbotene Praktiken: seit Februar 2025
- General-Purpose-AI-Pflichten: seit August 2025
- Hochrisiko-Systeme (Anhang III): ab August 2026

**RE-Bezug:** Hochrisiko-Einstufung erzeugt NFRs — Risikomanagement, Dokumentationspflicht, menschliche Aufsicht. Systeme mit begrenztem Risiko (limited risk): Transparenzpflicht (Art. 50).

### NIS2 — deutsche Umsetzung: NIS2UmsuCG
**Status:** In Kraft in Deutschland seit 6. Dezember 2025. Keine Übergangsfrist.

**Kernpflichten:**
- Risikomanagement: §30 BSIG-neu
- Meldepflicht erheblicher Vorfälle binnen 24 Std. Frühwarnung / 72 Std. Erstbewertung: §32
- Persönliche Haftung der Geschäftsleitung: §38
- Bußgelder: bis 10 Mio. € / 2 % Jahresumsatz: §65

### CADA — Cloud and AI Development Act
**Status: Verordnungsvorschlag, 3. Juni 2026 — kein geltendes Recht.** Immer als „Entwurf/geplant" kennzeichnen.
**Modell:** Vier Assurance Levels (1–4) für Cloud-/KI-Dienste an die öffentliche Hand.

### EU Cloud Sovereignty Framework (CSF)
**Status:** Angewandt (nicht bindend für Dritte) — EU-Kommission (DG IT), Version 1.2.1, Oktober 2025.
**Modell:** SOV-1 bis SOV-8, SEAL-Stufen 0–4.
**Klarstellung:** SOV-Bezeichnungen gehören zum EU-CSF — **nicht zu CADA**. Immer das korrekte Rahmenwerk benennen.

### BSI C3A — Criteria enabling Cloud Computing Autonomy
**Status:** Veröffentlicht 27. April 2026 — nicht bindend, kein Gesetz.
**Struktur:** SOV-1 Strategisch bis SOV-6 Technologisch. Setzt BSI C5-Konformität voraus.
**Wichtig:** Immer C5 oder C3A explizit nennen — „BSI" allein ist zu unspezifisch.

---

## Agile Ergänzungen

### Scrum-Artefakte mit RE-Relevanz
- **Product Backlog** — geordnete Liste aller Anforderungen
- **Sprint Backlog** — ausgewählte Anforderungen für einen Sprint
- **Definition of Done** — Qualitätskriterien für „fertig"
- **Definition of Ready** — Wann ist eine Story sprint-fähig?

### BDD / Gherkin
```
Gegeben [Ausgangszustand]
Wenn [Aktion]
Dann [Erwartetes Ergebnis]
```
Einsatz: Akzeptanzkriterien, die gleichzeitig als Tests dienen.

### SAFe-Ergänzung
- Epic → Feature → User Story → Task (Hierarchie)
- **Enabler** — technische Anforderungen ohne direkten Geschäftswert
- **PI Planning** — Anforderungsplanung über mehrere Teams

---

## PMBOK 8 (PMI — Project Management Institute)

**Ausgabe:** 8. Edition — Digital: November 2025, Paperback: Januar 2026.
**Status:** Aktuell gültig — PMP-Prüfungsupdate auf PMBOK 8 seit 9. Juli 2026 in Kraft.
**Zweck:** Globaler PM-Standard; für RE-Training relevant als Rahmen für Anforderungsmanagement im Projektkontext und Brücke zur PMI-PBA-Zertifizierung.

### Struktur PMBOK 8 — das Wichtigste
| Element | Inhalt |
|---|---|
| 6 Prinzipien | Vereinfacht ggü. 12 Prinzipien in v7; klarer, handlungsorientierter |
| 7 Performance-Domänen | Governance (neu, ersetzt Integration), Finance (neu, ersetzt Cost) — Quality, Communications, Procurement nicht mehr als eigenständige Domänen |
| 5 Focus Areas | Initiating, Planning, Executing, Monitoring & Controlling, Closing — bewusste Anlehnung an klassische Prozessgruppen, aber nicht-prescriptiv |
| 40 Prozesse | Nicht verpflichtend — Auswahl nach Projektbedarf |

### Entwicklungslinie im Überblick
| Edition | Kernlogik | RE-Bezug |
|---|---|---|
| PMBOK 6 (2017) | 5 Prozessgruppen, 10 Wissensgebiete, prescriptiv | „Requirements Management Plan" als Prozess |
| PMBOK 7 (2021) | 12 Prinzipien, 8 Domänen, prinzipienbasiert | Stakeholder- und Team-Prinzipien tragen RE-Verantwortung |
| **PMBOK 8 (2025)** | **6 Prinzipien, 7 Domänen, 5 Focus Areas, 40 Prozesse** | **Strukturierter Rahmen + Prinzipienflexibilität kombiniert** |

> ⚠️ Trainingsmaterialien auf Basis PMBOK 6 (Prozessgruppen) oder PMBOK 7 (12 Prinzipien) entsprechen nicht mehr dem aktuellen Standard. Edition immer angeben.

### Neue Schwerpunkte PMBOK 8 — RE-relevant
- **AI-Integration** — KI als Projektkontext, nicht nur Werkzeug
- **Sustainability** — Nachhaltigkeitsanforderungen als NFR-Kategorie
- **Business Environment** — Domänengewicht: 8 % → 26 % (strategische Anforderungsverankerung)
- **Value Delivery** — Anforderungen aus Nutzenperspektive, nicht Outputperspektive

### Zertifizierungskontext
- **PMI-PBA** (Professional in Business Analysis) — Schnittstelle PMBOK ↔ BABOK
- **PMP** — Prüfung seit 9. Juli 2026 auf PMBOK 8 ausgerichtet
- **Zielgruppe in Trainings:** IT-Tage-Publikum kennt PMI häufiger; GPM-Publikum primär IPMA/ICB4 — PMBOK dort als Vergleichsfolie

---

## IPMA / ICB4 — Individual Competence Baseline

**Herausgeber:** IPMA (International Project Management Association)
**Deutsche Mitgliedsorganisation:** GPM — Gesellschaft für Projektmanagement
**Ausgabe:** ICB4, 2015 (aktuell gültig)
**Zweck:** Kompetenzrahmen für Projektmanagement-Individuen — kein Prozess-Framework, sondern Kompetenzbeschreibung. Grundlage der IPMA-Zertifizierungen.
**Relevanz für Michaelas Trainings:** GPM-Publikum arbeitet primär im IPMA/ICB4-Ökosystem — hier liegt die stärkste Überschneidung mit dem Trainingsalltag.

### Drei Kompetenzbereiche (ICB4)

| Bereich | Inhalt | RE-Relevanz |
|---|---|---|
| **Perspective** (Kontext) | Strategie, Governance, Compliance, Macht & Interessen, Kultur & Werte | Regulatorische Rahmenbedingungen als NFR-Quelle; Stakeholder-Kontext |
| **People** (Verhalten) | Kommunikation, Stakeholder-Einbindung, Führung, Teamarbeit, Verhandlung | Anforderungsermittlung, Konflikte zwischen Stakeholdern |
| **Practice** (Fachlich) | Requirements & Objectives, Scope, Time, Quality, Finance, Risk, Change | **Direkte RE-Überschneidung**: Requirements & Objectives = Anforderungsmanagement |

### ICB4-Zertifizierungsstufen (IPMA / GPM)
| Level | Bezeichnung | Profil |
|---|---|---|
| D | Certified Project Management Associate | Grundlagenwissen, kein Projekterfahrungs-Nachweis |
| C | Certified Project Manager | Leitung kleinerer Projekte |
| B | Senior Project Manager | Leitung komplexer Projekte |
| A | Project Director | Leitung von Programmen/Portfolios |

### ICB4 vs. PMBOK vs. IREB — Positionierung
- **ICB4:** Kompetenzrahmen für Individuen — *Wer kann was?*
- **PMBOK:** Wissensstandard für Prozesse und Prinzipien — *Was wird getan?*
- **IREB:** Fachstandard für Requirements Engineering — *Wie werden Anforderungen ermittelt, dokumentiert, validiert?*
- Im Training: ICB4-Kontext hilft zu erklären, warum RE-Kompetenzen (Elicitation, Analysis, Documentation) in der IPMA-Welt unter „Practice: Requirements & Objectives" fallen.

---

## SWEBOK v4 — Software Engineering Body of Knowledge

**Herausgeber:** IEEE Computer Society
**Ausgabe:** v4, 2024 (ersetzt v3 von 2014)
**Zweck:** Wissensordnungsrahmen für Software Engineering — kein Methoden-Framework, sondern Strukturierungsinstrument für Wissensgebiete.
**Positionierung im Training:** Akademisch/formal; gut für IT-Tage-Publikum mit Ingenieurhintergrund; für GPM-Publikum als Randvermerk, nicht als Hauptreferenz.

### Relevantes Wissensgebiet: Software Requirements
Das SWEBOK-Kapitel „Software Requirements" beschreibt dieselben RE-Aktivitäten wie IREB, aber aus IEEE-Perspektive — direkter Anschluss an IEEE 29148, das SWEBOK explizit referenziert.

| SWEBOK-Unterthema | RE-Entsprechung |
|---|---|
| Requirements Fundamentals | Anforderungsarten, Eigenschaften |
| Requirements Elicitation | Ermittlungstechniken (IREB: Erhebung) |
| Requirements Analysis | Klassifikation, Modellierung |
| Requirements Specification | SRS nach IEEE 29148 |
| Requirements Validation | Reviews, Prototyping |
| Requirements Management | Traceability, Change Management |

### Nutzwert für Michaelas Trainings
- Akademische Legitimation bei technischem Publikum
- Brücke zwischen IREB-Praxis und IEEE-Formalismus
- Argumentation: „IREB ist die Praxis, SWEBOK ist der Ordnungsrahmen, IEEE 29148 ist die Spezifikation"

---

## Anhang: Tool-Design-Standards

*Technische Implementierungsvorgaben für interaktive HTML-Trainingstools — ergänzend zu den inhaltlichen RE/BA-Standards. Identisch zum kanonischen Muster in CLAUDE.md (Repo-Root) und `master-prompt-zusammenarbeit.md`.*

---

### Beamer-Modus-Toggle (vierstufig)

**Zweck:** Lesbarkeit bei Beamerprojektion in gestaffelten Abständen (~5 m bis ~13 m, z. B. große Konferenzsäle, IT-Tage, GPM-Tagungen).

**Implementierungsprinzip:** Kumulative CSS-Klassen `beamer`, `beamer-xl`, `beamer-xxl` auf `<html>`, per Klick durchlaufen (reine Größensteigerung, keine inhaltlichen Modus-Wechsel) — kein Reload, kein Neubau der Seite. Alle Overrides leben in abgegrenzten `html.beamer` / `html.beamer-xl` / `html.beamer-xxl`-Blöcken, in dieser Reihenfolge deklariert (spätere Regel gewinnt bei gleicher Spezifität).

#### Zyklus

| Stufe | Klassen auf `<html>` | Button-Label (zeigt nächste Aktion) | Ziel-Betrachtungsabstand |
|---|---|---|---|
| 0 — Normal | *(keine)* | `☀ Beamer` | bis ~5 m |
| 1 — Beamer | `beamer` | `☀ Beamer XL` | ~7 m |
| 2 — Beamer XL | `beamer beamer-xl` | `☀ Beamer XXL` | ~10 m |
| 3 — Beamer XXL | `beamer beamer-xl beamer-xxl` | `☀ Normal` | ~13 m |

Nach dem vierten Klick zurück auf Stufe 0.

#### Größentabelle (kumulativ)

| Element | Normal | Beamer | Beamer XL | Beamer XXL |
|---|---|---|---|---|
| Fließtext / Hauptinhalt | ≥ 16 px | ≥ 22 px | ≥ 28 px | ≥ 34 px |
| Panel-Überschriften | — | ≥ 44 px | ≥ 54 px | ≥ 64 px |
| Track-Namen | — | ≥ 26 px | ≥ 32 px | ≥ 38 px |
| Sekundärtexte (Codes, Refs, Badges) | ≥ 14 px | ≥ 15 px | ≥ 18 px | ≥ 21 px |
| `--ink-dim` | Standard | ≤ #3D4A5C (Kontrast ≥ 5:1) | ≤ #3D4A5C | ≤ #3D4A5C |

#### Verhalten

- Footer: `display: none` ab Stufe 1 (Beamer) aufwärts (nicht präsentationsrelevant)
- Button-Label zeigt immer die *nächste* Aktion, nicht den aktuellen Zustand
- Button-Stil aktiv (Stufe 1–3): invertierte Farbe (`background: var(--ink); color: #fff`)
- Positionierung: oben rechts neben Reset-Button, gleicher Pill-Button-Stil

#### Kanonisches CSS-Muster

```css
.beamer-btn {
  background: transparent; border: 1.5px solid var(--line);
  color: var(--ink-dim); font-size: 15px; padding: 10px 20px;
  border-radius: 999px; cursor: pointer;
}
html.beamer .beamer-btn,
html.beamer-xl .beamer-btn,
html.beamer-xxl .beamer-btn { background: var(--ink); color: #fff; border-color: var(--ink); }

html.beamer { --ink-dim: #3D4A5C; }
html.beamer .nfa-text { font-size: 22px; }
html.beamer .panel-head .p-name { font-size: 44px; }
html.beamer .tr-name { font-size: 26px; }
html.beamer .nfa-ref, html.beamer .norm-badge,
html.beamer .warn-badge { font-size: 15px; }
html.beamer .footer { display: none; }

html.beamer-xl .nfa-text { font-size: 28px; }
html.beamer-xl .panel-head .p-name { font-size: 54px; }
html.beamer-xl .tr-name { font-size: 32px; }
html.beamer-xl .nfa-ref, html.beamer-xl .norm-badge,
html.beamer-xl .warn-badge { font-size: 18px; }

html.beamer-xxl .nfa-text { font-size: 34px; }
html.beamer-xxl .panel-head .p-name { font-size: 64px; }
html.beamer-xxl .tr-name { font-size: 38px; }
html.beamer-xxl .nfa-ref, html.beamer-xxl .norm-badge,
html.beamer-xxl .warn-badge { font-size: 21px; }
```

#### Kanonisches JS-Muster

```javascript
const BEAMER_LEVELS = [
  { classes: [],                                    label: '☀ Beamer' },
  { classes: ['beamer'],                            label: '☀ Beamer XL' },
  { classes: ['beamer', 'beamer-xl'],               label: '☀ Beamer XXL' },
  { classes: ['beamer', 'beamer-xl', 'beamer-xxl'], label: '☀ Normal' }
];
let beamerLevel = 0;
document.getElementById('beamerBtn').addEventListener('click', function(){
  beamerLevel = (beamerLevel + 1) % 4;
  document.documentElement.classList.remove('beamer', 'beamer-xl', 'beamer-xxl');
  BEAMER_LEVELS[beamerLevel].classes.forEach(c => document.documentElement.classList.add(c));
  this.textContent = BEAMER_LEVELS[beamerLevel].label;
});
```

#### HTML-Snippet (Button)

```html
<button class="beamer-btn" id="beamerBtn">☀ Beamer</button>
```

*Gilt ab sofort als Pflichtbaustein für alle neuen Tools (K18 — eigene Kriteriumsnummer, löst die frühere Kollision mit K15 „Erreichbarkeit nicht-live-relevanter Inhalte" auf). Bestehende Tools mit dem alten binären Toggle werden beim nächsten inhaltlichen Update auf das vierstufige Modell nachgerüstet.*

---

*Versionshistorie: v3.1 Juli 2026 — Beamer-Modus-Toggle von binär auf vierstufig erweitert (Normal → Beamer → Beamer XL → Beamer XXL), Kriteriumsnummer auf K18 korrigiert.*
*v3 Juli 2026 — Anhang Tool-Design-Standards ergänzt (Beamer-Modus-Toggle, kanonische CSS/JS/HTML-Muster).*
*v2 Juli 2026 — PMBOK 8 (Nov. 2025), IPMA/ICB4, SWEBOK v4 ergänzt; ISO 25010:2023 korrekt; Regulatorik (EU AI Act, NIS2, CADA, EU-CSF, BSI C3A) vollständig.*
*v1 Juli 2026 — Erstversion.*
