# Inhalte des Gateplans. Alles an einer Stelle, damit Matrix, Gate-Ansicht und Prüfungen dieselben Daten nutzen.

CASE_F = 'ba-re-case-lindenfeld-lunch.html'
PA_T = 'lindenfeld-projektauftrag-pflichtenheft.html'
PA_P = 'lindenfeld-projektauftrag-pflichtenheft-teilnehmende.html'
HUB_T = 'lindenfeld-gateplan.html'
HUB_P = 'lindenfeld-gateplan-teilnehmende.html'

# Gates: (code, DE, EN, Zeit DE, Zeit EN, Leitfrage DE, EN)
GATES = [
 ('G0', 'Entscheidung', 'Decision', 'vor Monat 0', 'before month 0', 'Lohnt sich das?', 'Is it worthwhile?'),
 ('G1', 'Projektauftrag', 'Project charter', 'Monat 0 (M0)', 'Month 0 (M0)', 'Dürfen wir starten, und mit welchem Rahmen?', 'May we start, and within which frame?'),
 ('G2', 'Anforderungsbasis', 'Requirements baseline', 'Monat 1 (M1)', 'Month 1 (M1)', 'Wissen wir, was gebraucht wird?', 'Do we know what is needed?'),
 ('G3', 'Pflichtenheft', 'Specification', 'Monat 2 (M2)', 'Month 2 (M2)', 'Wissen wir, wie wir es zusichern und prüfen?', 'Do we know how to assure and verify it?'),
 ('G4', 'Abnahme und Go-Live', 'Acceptance and go-live', 'M3 und M4 (Monat 5 bis 6)', 'M3 and M4 (month 5 to 6)', 'Ist es fertig, und darf es live gehen?', 'Is it done, and may it go live?'),
 ('G5', 'Check-in', 'Check-in', 'M5 (Monat 9)', 'M5 (month 9)', 'Wirkt es, und steuern wir nach?', 'Does it work, and do we adjust?'),
 ('G6', 'Stage Gate', 'Stage gate', 'M6 (Monat 12)', 'M6 (month 12)', 'Release 2: ja, später oder nein?', 'Release 2: yes, later or no?'),
]

# Linien: key, Buchstabe, Farbe, Filter, Name DE/EN, Hinweis DE/EN, Untertitel (Variante 1, 2)
LINES = [
 ('A', 'A', '#1F5FBF', 'a', 'Artefakte', 'Artifacts', 'Welche Dokumente und Backlogs entstehen, klassisch und agil.', 'Which documents and backlogs arise, classic and agile.'),
 ('K', 'K', '#0B6E6D', 'k', 'Kommunikation', 'Communication', 'Wie wird abgestimmt: Meilensteinplan und Berichte oder agile Events.', 'How alignment happens: milestone plan and reports or agile events.'),
 ('B', 'B', '#6B3FA0', 'b', 'Blickwinkel', 'Viewpoints', 'Welche Fragen BA und PM am selben Gate stellen.', 'Which questions BA and PM ask at the same gate.'),
 ('L', 'L', '#A24F00', 'l', 'Leitplanken', 'Guardrails', 'Recht, Regeln, Vereinbarungen und Normen, die einzuhalten sind.', 'Law, rules, agreements and standards that must be respected.'),
 ('C', 'Ä', '#A8221A', 'c', 'Änderung', 'Change', 'Wie Änderungen kontrolliert durch die Artefakte laufen.', 'How changes run in a controlled way through the artifacts.'),
 ('N', 'N', '#17703F', 'n', 'Nutzen', 'Benefit', 'Woran wir messen, dass es sich gelohnt hat.', 'How we measure that it was worthwhile.'),
]

# Zeilen der Matrix: (id, Linie, Filter, Label DE, EN, Untertitel DE, EN)
VARIANTS = [
 ('Aa', 'A', 'a', 'Artefakte klassisch', 'Artifacts classic', 'klassisch', 'classic'),
 ('Ab', 'A', 'a', 'Artefakte agil', 'Artifacts agile', 'agil', 'agile'),
 ('Ka', 'K', 'k', 'Kommunikation klassisch', 'Communication classic', 'klassisch (Meilensteinplan)', 'classic (milestone plan)'),
 ('Kb', 'K', 'k', 'Kommunikation agil', 'Communication agile', 'agil (Events)', 'agile (events)'),
 ('Ba', 'B', 'b', 'Blickwinkel BA', 'Viewpoint BA', 'BA', 'BA'),
 ('Bb', 'B', 'b', 'Blickwinkel PM', 'Viewpoint PM', 'PM', 'PM'),
 ('L', 'L', 'l', 'Leitplanken', 'Guardrails', '', ''),
 ('Ce', 'C', 'c', 'Änderung', 'Change', '', ''),
 ('N', 'N', 'n', 'Nutzen', 'Benefit', '', ''),
]

# Zellen: CELLS[variant][gate] = (DE, EN, Herkunft F/R/A)
CELLS = {
'Aa': [
 ('Business Case nach Five Case Model mit Optionen A, B, C und Nichtstun', 'Business case (five case model) with options A, B, C and doing nothing', 'F'),
 ('Projektauftrag mit Zielen, Umfang, Meilensteinen, Budget und Risiken', 'Project charter with goals, scope, milestones, budget and risks', 'R'),
 ('Lastenheft als Anforderungsbasis: FR, BR, NFR und Rückverfolgungsmatrix', 'Requirements document as baseline: FR, BR, NFR and traceability matrix', 'F'),
 ('Pflichtenheft mit Realisierungsvorgaben, Parametern und Abnahmekriterien', 'Specification with realisation specifications, parameters and acceptance criteria', 'R'),
 ('Testprotokoll und Abnahmeprotokoll', 'Test log and acceptance protocol', 'R'),
 ('Statusbericht mit den Zwischenwerten der Ziele', 'Status report with the interim values of the goals', 'A'),
 ('Entscheidungsvorlage zum Stage Gate mit gemessenen Werten', 'Decision paper for the stage gate with measured values', 'R'),
],
'Ab': [
 ('Produktvision und erste Idee eines Product Goal', 'Product vision and a first idea of a product goal', 'A'),
 ('Product Goal und Story Map als Umriss des Product Backlog', 'Product goal and story map as outline of the product backlog', 'R'),
 ('Product Backlog mit Epics und Stories, Akzeptanzkriterien nach INVEST', 'Product backlog with epics and stories, acceptance criteria following INVEST', 'F'),
 ('Backlog mit Definition of Done, Architekturentscheidungen und Schnittstellen', 'Backlog with definition of done, architecture decisions and interfaces', 'R'),
 ('Increment, das die Definition of Done erfüllt', 'Increment that meets the definition of done', 'A'),
 ('Backlog neu geordnet nach Hebel auf die Key Results', 'Backlog reordered by leverage on the key results', 'F'),
 ('Product Backlog für Release 2, geordnet nach dem Ergebnis des Gates', 'Product backlog for release 2, ordered by the outcome of the gate', 'A'),
],
'Ka': [
 ('Entscheidungsvorlage an den Lenkungskreis', 'Decision paper to the steering group', 'F'),
 ('Kick-off und Meilensteinplan M0 bis M6', 'Kick-off and milestone plan M0 to M6', 'R'),
 ('Review der Anforderungsbasis mit Test, Datenschutz und Fachseite', 'Review of the requirements baseline with test, data protection and business side', 'R'),
 ('Freigabe-Review des Pflichtenhefts und Statusbericht an die Sponsorin', 'Approval review of the specification and status report to the sponsor', 'A'),
 ('Abnahmetermin und Abstimmung mit dem Betriebsrat vor Go-Live', 'Acceptance meeting and agreement with the works council before go-live', 'R'),
 ('Statusbericht und Abgleich mit dem Meilensteinplan', 'Status report and comparison with the milestone plan', 'A'),
 ('Stage-Gate-Sitzung, die Sponsorin entscheidet', 'Stage gate meeting, the sponsor decides', 'R'),
],
'Kb': [
 ('Interviews und Workshops mit Stakeholdern (Interviewfragen, Story Map)', 'Interviews and workshops with stakeholders (interview questions, story map)', 'F'),
 ('Refinement beginnt: Epics werden in Stories zerlegt', 'Refinement begins: epics are split into stories', 'A'),
 ('Refinement-Sitzungen: Stories mit Akzeptanzkriterien und Definition of Ready', 'Refinement sessions: stories with acceptance criteria and definition of ready', 'F'),
 ('Sprint Planning: Sprint-Ziel aus dem geordneten Backlog', 'Sprint planning: sprint goal from the ordered backlog', 'A'),
 ('Daily Scrum, Sprint Review mit Gästen und Sprint Retrospective', 'Daily scrum, sprint review with guests and sprint retrospective', 'A'),
 ('Sprint Review zeigt die Wirkung; OKR-Check-in mit dem Team', 'Sprint review shows the impact; OKR check-in with the team', 'F'),
 ('Review mit der Sponsorin; Product Goal für Release 2 neu bewertet', 'Review with the sponsor; product goal for release 2 reassessed', 'A'),
],
'Ba': [
 ('Welches Ziel stützt das, und was kostet Nichtstun?', 'Which goal does it support, and what does doing nothing cost?', 'F'),
 ('Stützt jede Funktion im Umfang ein Ziel, und was ist ausgeschlossen?', 'Does every feature in scope support a goal, and what is excluded?', 'R'),
 ('Sind Anforderungen eindeutig, prüfbar und bis zum Ziel rückverfolgbar?', 'Are requirements unambiguous, verifiable and traceable to a goal?', 'F'),
 ('Hat jede Anforderung eine Realisierungsvorgabe und einen Prüfweg?', 'Does every requirement have a realisation specification and a test method?', 'R'),
 ('Erfüllt das Ergebnis den Bedarf, und welche Lücke bleibt (etwa FR-14)?', 'Does the result meet the need, and which gap remains (e.g. FR-14)?', 'F'),
 ('Welche Wirkung zeigen die Key Results, und was erklärt Abweichungen?', 'What impact do the key results show, and what explains deviations?', 'F'),
 ('Stimmt der gemessene Nutzen mit dem Business Case überein?', 'Does the measured benefit match the business case?', 'F'),
],
'Bb': [
 ('Was kostet es (380.000 EUR plus 60.000 EUR Betrieb pro Jahr), und welches Risiko gibt es?', 'What does it cost (EUR 380,000 plus EUR 60,000 operations per year), and what is the risk?', 'F'),
 ('Wer leitet das Projekt, und welche Budgets und Termine gelten?', 'Who leads the project, and which budgets and dates apply?', 'A'),
 ('Ist der Termin M1 realistisch, und wer schätzt?', 'Is the M1 date realistic, and who estimates?', 'A'),
 ('Passt der Plan zum Budget, und wer trägt die offenen Risiken?', 'Does the plan fit the budget, and who carries the open risks?', 'R'),
 ('Sind Termin, Budget, Abnahme und Betriebsvereinbarung erreicht?', 'Are date, budget, acceptance and works agreement achieved?', 'R'),
 ('Wo steht der Plan, und welche Risiken sind neu?', 'Where does the plan stand, and which risks are new?', 'A'),
 ('Wie lautet die Entscheidungsvorlage, und wer entscheidet bis wann?', 'What is the decision paper, and who decides by when?', 'R'),
],
'L': [
 ('Leitplanken früh erkennen: Datenschutz, Mitbestimmung, Lebensmittelrecht, Zahlung', 'Recognise guardrails early: data protection, co-determination, food law, payment', 'F'),
 ('Betriebsrat und Datenschutz als Stakeholder im Auftrag; Leitplanke L-3 verankert', 'Works council and data protection as stakeholders in the charter; guardrail L-3 anchored', 'R'),
 ('DSGVO, § 87 BetrVG, LMIV und PCI DSS in den Anforderungen (FR-13, FR-16, NFR-03, NFR-04)', 'GDPR, § 87 BetrVG, LMIV and PCI DSS in the requirements (FR-13, FR-16, NFR-03, NFR-04)', 'F'),
 ('Rechtsgrundlagen als offene Punkte; NFR nach ISO/IEC 25010:2023', 'Legal bases as open points; NFR per ISO/IEC 25010:2023', 'R'),
 ('Betriebsvereinbarung und Datenschutz-Dokumentation vor Go-Live', 'Works agreement and data protection documentation before go-live', 'F'),
 ('Pulsbefragung zum Vertrauen in die App (KR3.1); Klärungsdauer von Beschwerden (KR3.2)', 'Pulse survey on trust in the app (KR3.1); time to resolve complaints (KR3.2)', 'F'),
 ('KR3.2 ist verpflichtend: über 5 Tage Klärungsdauer heißt Freigabe nur mit Auflage', 'KR3.2 is mandatory: over 5 days resolution time means approval only with a condition', 'F'),
],
'Ce': [
 ('Annahmen offen als Annahmen führen; GZ-2 als Hypothese', 'Keep assumptions openly as assumptions; GZ-2 as hypothesis', 'R'),
 ('Änderungen nur per Änderungsantrag; die Sponsorin entscheidet', 'Changes only via change request; the sponsor decides', 'R'),
 ('Basislinie v1.0 der Anforderungen mit Rückverfolgungsmatrix', 'Baseline v1.0 of the requirements with traceability matrix', 'F'),
 ('Regeln als Parameter (NFR-10) halten Änderungen klein', 'Rules as parameters (NFR-10) keep changes small', 'R'),
 ('CR-01: Vorlauf von 60 auf 90 Minuten, danach Basislinie v1.1', 'CR-01: lead time from 60 to 90 minutes, then baseline v1.1', 'F'),
 ('Nach dem Check-in ist ein zweiter Änderungsantrag möglich (KR1.3, BR-3)', 'After the check-in a second change request is possible (KR1.3, BR-3)', 'F'),
 ('Umfangsänderungen nur mit Entscheidung am Gate', 'Scope changes only with a decision at the gate', 'R'),
],
'N': [
 ('Harter und weicher Nutzen getrennt; Break-even bei 3,3 % Zeitverwertung', 'Hard and soft benefit separated; break-even at 3.3% time utilisation', 'F'),
 ('GZ-1 bis GZ-3 mit Ausgangswert, Zielwert und Frist', 'GZ-1 to GZ-3 with baseline, target and deadline', 'F'),
 ('Jede Anforderung führt über Epic und Story zu einem Ziel', 'Every requirement leads via epic and story to a goal', 'F'),
 ('Messweg für EM-1 und GZ in den Abnahmekriterien vorbereitet', 'Measurement path for EM-1 and GZ prepared in the acceptance criteria', 'A'),
 ('Ausgangswerte vor Go-Live festhalten: 33 % Abfall, 65 Minuten', 'Record baselines before go-live: 33% waste, 65 minutes', 'R'),
 ('Zwischenwerte der Key Results KR1.1 bis KR3.2', 'Interim values of the key results KR1.1 to KR3.2', 'F'),
 ('Ampel-Vorschlag: KR1.2 mindestens 0,70 (35 % Nutzung) und KR2.1 mindestens 0,50 (höchstens 26,5 % Abfall)', 'Traffic-light proposal: KR1.2 at least 0.70 (35% usage) and KR2.1 at least 0.50 (at most 26.5% waste)', 'F'),
],
}

# Gate in Kürze: je Gate vier Zeilen (Aspekt, DE, EN, Herkunft, Verweis)
BRIEF = [
 [ # G0
  (('Entscheidung', 'Decision'), ('Option A (nur Release 1) starten, mit Stage Gate nach 6 Monaten', 'Start option A (release 1 only), with a stage gate after 6 months'), 'F', '1'),
  (('Wer entscheidet', 'Who decides'), ('Lenkungskreis; Sponsorin Heike Brandl', 'Steering group; sponsor Heike Brandl'), 'F', '0b, 1'),
  (('Go-Kriterien', 'Go criteria'), ('Alle fünf Fälle bedacht, Nichtstun verglichen, Break-even von 3,3 % Zeitverwertung bekannt', 'All five cases considered, doing nothing compared, break-even of 3.3% time utilisation known'), 'F', '1'),
  (('Warnsignal', 'Warning sign'), ('Zeitverwertung nicht glaubhaft: bei 0 % ist jeder Kapitalwert negativ', 'Time utilisation not credible: at 0% every net present value is negative'), 'F', '1'),
 ],
 [ # G1
  (('Entscheidung', 'Decision'), ('Projekt mit 380.000 EUR Investition für Release 1 starten', 'Start the project with EUR 380,000 investment for release 1'), 'F', '1'),
  (('Wer entscheidet', 'Who decides'), ('Heike Brandl unterschreibt; die Projektleitung wird noch benannt (OP-05)', 'Heike Brandl signs; the project manager is still to be named (OP-05)'), 'A', 'OP-05'),
  (('Go-Kriterien', 'Go criteria'), ('Ziele messbar, Umfang mit Ausschlüssen, Zielkonflikt GZ-2 offen ausgewiesen (37.800 EUR)', 'Goals measurable, scope with exclusions, GZ-2 conflict stated openly (EUR 37,800)'), 'R', 'PA 1'),
  (('Warnsignal', 'Warning sign'), ('Projektleitung, GZ-1-Zwischenwert und Reserve noch offen (OP-04, OP-05, OP-11)', 'Project manager, GZ-1 interim value and contingency still open (OP-04, OP-05, OP-11)'), 'A', 'PA 4'),
 ],
 [ # G2
  (('Entscheidung', 'Decision'), ('Anforderungsbasis v1.0 ist Grundlage für Pflichtenheft und Test', 'Requirements baseline v1.0 is the basis for specification and test'), 'A', 'PA 1'),
  (('Wer entscheidet', 'Who decides'), ('Murat Kaplan (Fachseite) mit dem BA; Review mit Test und Datenschutz', 'Murat Kaplan (business side) with the BA; review with test and data protection'), 'A', 'PA 4'),
  (('Go-Kriterien', 'Go criteria'), ('Anforderungen eindeutig, prüfbar, vollständig; Release 1: 14 von 15 mit Story und Testfall', 'Requirements unambiguous, verifiable, complete; release 1: 14 of 15 with story and test case'), 'F', '7'),
  (('Warnsignal', 'Warning sign'), ('FR-14 ohne Story und Test; stille Gruppen nicht vergessen (Betriebsrat, Datenschutz, Entgeltabrechnung, Cafeteria-Personal, Betreiber des Firmen-Logins)', 'FR-14 without story and test; do not forget silent groups (works council, data protection, payroll, cafeteria staff, operator of the company login)'), 'F', '0b, 7'),
 ],
 [ # G3
  (('Entscheidung', 'Decision'), ('Pflichtenheft für Release 1 freigeben; Kaufen oder Bauen entscheiden (ADR-01)', 'Approve the specification for release 1; decide buy or build (ADR-01)'), 'A', 'PA 4'),
  (('Wer entscheidet', 'Who decides'), ('Heike Brandl, technisch Tim Falkner', 'Heike Brandl, technically Tim Falkner'), 'A', 'PA 4'),
  (('Go-Kriterien', 'Go criteria'), ('Jede Anforderung mit Realisierungsvorgabe und Prüfweg; Regeln als Parameter; offene Punkte mit Eigentümer', 'Every requirement with realisation specification and test method; rules as parameters; open points with owner'), 'R', 'PA 4, 5'),
  (('Warnsignal', 'Warning sign'), ('ADR-01, ADR-03 und ADR-04 offen; Zeitfenster-Frage OP-01 ungeklärt', 'ADR-01, ADR-03 and ADR-04 open; time window question OP-01 unresolved'), 'A', 'PA 4'),
 ],
 [ # G4
  (('Entscheidung', 'Decision'), ('Release 1 abnehmen und live schalten', 'Accept release 1 and go live'), 'A', 'PA 4'),
  (('Wer entscheidet', 'Who decides'), ('Abnahme durch Heike Brandl, Murat Kaplan, Tim Falkner und Lena Ostermann', 'Acceptance by Heike Brandl, Murat Kaplan, Tim Falkner and Lena Ostermann'), 'A', 'PA 4'),
  (('Go-Kriterien', 'Go criteria'), ('Testfälle ausgeführt, kein blockierender Fehler offen, Betriebsvereinbarung und Datenschutz-Dokumentation liegen vor', 'Test cases executed, no blocking defect open, works agreement and data protection documentation available'), 'R', '6, PA 4'),
  (('Warnsignal', 'Warning sign'), ('Betriebsvereinbarung fehlt, obwohl die Einführung der Mitbestimmung unterliegt (so im Fall)', 'Works agreement missing although the introduction is subject to co-determination (as in the case)'), 'F', '1, 2'),
 ],
 [ # G5
  (('Entscheidung', 'Decision'), ('Kurs halten oder nachsteuern; keine Freigabe', 'Keep course or adjust; no approval'), 'F', '9'),
  (('Wer entscheidet', 'Who decides'), ('Projektleitung und Cafeteria-Leitung steuern nach; die Sponsorin wird informiert', 'Project manager and cafeteria management adjust; the sponsor is informed'), 'A', '9'),
  (('Go-Kriterien', 'Go criteria'), ('Zwischenwerte der Key Results KR1.1 bis KR3.2 liegen im erwarteten Korridor', 'Interim values of key results KR1.1 to KR3.2 are within the expected corridor'), 'F', '9'),
  (('Warnsignal', 'Warning sign'), ('KR1.2 verfehlt: Hürden im Anmeldeweg suchen, Ömer Yıldız interviewen; KR1.3 verfehlt: zweiten Change Request erwägen', 'KR1.2 missed: look for hurdles in the login path, interview Ömer Yıldız; KR1.3 missed: consider a second change request'), 'F', '9'),
 ],
 [ # G6
  (('Entscheidung', 'Decision'), ('Release 2 freigeben, um ein Quartal vertagen oder nicht starten', 'Approve release 2, postpone by one quarter or do not start'), 'F', '9'),
  (('Wer entscheidet', 'Who decides'), ('Heike Brandl, auf Basis gemessener Werte', 'Heike Brandl, based on measured values'), 'F', '1, PA 1'),
  (('Go-Kriterien', 'Go criteria'), ('EM-1 und GZ-1-Zwischenwert erreicht. Ampel-Vorschlag: Grün bei KR1.2 mindestens 0,70 und KR2.1 mindestens 0,50', 'EM-1 and GZ-1 interim value reached. Traffic-light proposal: green at KR1.2 at least 0.70 and KR2.1 at least 0.50'), 'F', '1, 9'),
  (('Warnsignal', 'Warning sign'), ('Gelb oder Rot bei einem der beiden Key Results; die Ampel allein entscheidet nicht, Abweichungen begründet die Sponsorin schriftlich', 'Yellow or red on one of the two key results; the traffic light alone does not decide, the sponsor justifies deviations in writing'), 'F', '9'),
 ],
]

# Links in die Einzeldateien: (Datei, Anker, Label DE, EN)
LINKS = [
 [('c', 's0', '0a Fall', '0a Case'), ('c', 's0b', '0b Stakeholder', '0b Stakeholders'), ('c', 's1', '1 Business Case', '1 Business case')],
 [('p', 'st1', 'Projektauftrag', 'Project charter'), ('p', 'st2', 'Auftrag prüfen', 'Check the charter'), ('c', 's0b', '0b Stakeholder', '0b Stakeholders')],
 [('c', 's2', '2 Anforderungen', '2 Requirements'), ('c', 's3', '3a Epics', '3a Epics'), ('c', 's3b', '3b Priorisieren', '3b Prioritising'), ('c', 's4', '4 Use Cases', '4 Use cases'), ('c', 's5', '5 Stories', '5 Stories'), ('c', 's7', '7 Rückverfolgung', '7 Traceability'), ('p', 'st3', 'Lasten- und Pflichtenheft', 'Requirements vs. specification')],
 [('p', 'st4', 'Pflichtenheft', 'Functional specification'), ('p', 'st5', 'Pflichtenheft prüfen', 'Check the specification'), ('c', 's2', '2 Anforderungen (NFR, Leitplanken)', '2 Requirements (NFR, guardrails)'), ('p', 'st6', 'BA-Facetten', 'BA facets')],
 [('c', 's6', '6 Tests', '6 Tests'), ('c', 's7', '7 Rückverfolgung', '7 Traceability'), ('c', 'sCR', '8 Change Request', '8 Change request'), ('p', 'st4', 'Pflichtenheft (Kapitel 8 Abnahme)', 'Specification (chapter 8 acceptance)')],
 [('c', 'sOKR', '9 OKR', '9 OKR'), ('c', 'sBoard', '10 Schreibtisch', '10 Desk'), ('c', 'sBacklog', '11 Backlog', '11 Backlog')],
 [('c', 's1', '1 Business Case (Stage Gate)', '1 Business case (stage gate)'), ('c', 'sOKR', '9 OKR (Stage Gate)', '9 OKR (stage gate)'), ('c', 'sBacklog', '11 Backlog', '11 Backlog'), ('c', 's8', '12 Lücken', '12 Gaps'), ('p', 'st1', 'Erfolgskriterien im Projektauftrag', 'Success criteria in the charter')],
]

# Gruppenfragen je Gate: (Frage DE, EN, [Antwort-Absätze (DE, EN)])
GROUPQ = [
 (('Option B wirkt attraktiver, weil sie mehr Funktionen bringt. Warum startet der Fall trotzdem mit Option A?', 'Option B looks more attractive because it delivers more features. Why does the case start with option A anyway?'),
  [('Option A hat die niedrigste Schwelle: Break-even bei 3,3 % Zeitverwertung gegenüber 6,7 % bei Option B. Release 2 hängt an gemessenen Ergebnissen, und die 290.000 EUR Zusatzinvestition werden erst nach dem Stage Gate entschieden.', 'Option A has the lowest threshold: break-even at 3.3% time utilisation versus 6.7% for option B. Release 2 depends on measured results, and the EUR 290,000 additional investment is decided only after the stage gate.'),
   ('Beispielfrage an die Sponsorin: Welche Zeitverwertung halten Sie für realistisch, und wer misst sie?', 'Sample question to the sponsor: Which time utilisation do you consider realistic, and who measures it?')]),
 (('Warum steht der Zielkonflikt bei GZ-2 im Projektauftrag und nicht in einer Fußnote?', 'Why is the GZ-2 goal conflict in the project charter and not in a footnote?'),
  [('Weil die Sponsorin nur entscheiden kann, was sie sieht: Option A erreicht 8 % statt 15 %, das sind 37.800 EUR im Jahr weniger. GZ-2 wird als Hypothese geführt und am Stage Gate entschieden.', 'Because the sponsor can only decide what she sees: option A achieves 8% instead of 15%, which is EUR 37,800 per year less. GZ-2 is treated as a hypothesis and decided at the stage gate.'),
   ('Beispielfrage: Welche Maßnahme außerhalb der Software soll die übrigen 7 Prozentpunkte bringen, und wer verantwortet sie?', 'Sample question: Which measure outside the software should deliver the remaining 7 percentage points, and who is responsible?')]),
 (('FR-14 (Gruppenbestellung) hat weder Story noch Testfall. Darf das Gate trotzdem passiert werden?', 'FR-14 (group order) has neither story nor test case. May the gate still be passed?'),
  [('Ja, aber nicht stillschweigend: FR-14 ist eine Should-Anforderung. Sie steht als offener Punkt (OP-07) im Pflichtenheft und wird ergänzt oder bewusst zurückgestellt.', 'Yes, but not silently: FR-14 is a should requirement. It is listed as an open point (OP-07) in the specification and is either added or consciously postponed.'),
   ('Beispielfrage: Wer braucht die Gruppenbestellung zuerst, und welches Ziel stützt sie?', 'Sample question: Who needs the group order first, and which goal does it support?')]),
 (('Tim Falkner sagt: „Das Pflichtenheft schreibe ich nach dem Bau.“ Was entgegnest du am Gate G3?', 'Tim Falkner says: “I will write the specification after the build.” What do you reply at gate G3?'),
  [('Ein Pflichtenheft nach dem Bau beschreibt, was gebaut wurde, nicht, was zugesichert war. Dann kann die Abnahme nichts mehr prüfen. Das Gate G3 verlangt es vorher.', 'A specification after the build describes what was built, not what was assured. Then acceptance can no longer check anything. Gate G3 demands it beforehand.'),
   ('Beispielfrage: Woran erkennt Lena Ostermann, dass FR-06 erfüllt ist, wenn es nur den Code gibt?', 'Sample question: How does Lena Ostermann know that FR-06 is met if there is only code?')]),
 (('Kurz vor dem Go-Live liegt die Betriebsvereinbarung nicht vor. Was tust du?', 'Shortly before go-live the works agreement is not available. What do you do?'),
  [('Du empfiehlst, den Go-Live nicht freizugeben, und klärst mit Sponsorin und Betriebsrat einen neuen Termin. Im Fall berührt die Einführung die Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG. Keine Rechtsberatung: Das klärst du mit Betriebsrat und Rechtsabteilung.', 'You recommend not releasing the go-live and agree a new date with sponsor and works council. In the case the introduction touches co-determination under § 87(1) no. 6 BetrVG. No legal advice: clarify this with the works council and the legal department.'),
   ('Beispielfrage an Sabine Wörner: Was braucht der Betriebsrat, um der Vereinbarung zustimmen zu können?', 'Sample question to Sabine Wörner: What does the works council need in order to agree to the agreement?')]),
 (('Beim Check-in liegt die Nutzungsquote erst bei 30 % statt bei 50 %. Was ist der erste Schritt?', 'At the check-in the usage rate is only 30% instead of 50%. What is the first step?'),
  [('Laut Fall: Hürden im Anmeldeweg und in der Bedienung suchen und Ömer Yıldız interviewen, der nur zwei Tage pro Woche vor Ort ist und den Smartphone-Zugang braucht. Erst Ursache, dann Funktion.', 'According to the case: look for hurdles in the login path and in operation and interview Ömer Yıldız, who is on site only two days a week and needs smartphone access. Cause first, then feature.'),
   ('Beispielfrage: Beschreiben Sie Ihre letzte Bestellung vom Anfang bis zum Essen. Wo haben Sie gezögert?', 'Sample question: Describe your last order from start to meal. Where did you hesitate?')]),
 (('EM-1 ist erreicht, der GZ-1-Zwischenwert nicht. Wird Release 2 freigegeben?', 'EM-1 is reached, the GZ-1 interim value is not. Is release 2 approved?'),
  [('Nein, nicht automatisch: Release 2 wird nur freigegeben, wenn EM-1 und der GZ-1-Zwischenwert erreicht sind. Der Ampel-Vorschlag im Fall: Gelb heißt erst Ursache klären und die Entscheidung um ein Quartal vertagen, Rot heißt kein Release 2 (Lösung ändern, nicht das Ziel). Die Sponsorin entscheidet und begründet Abweichungen schriftlich.', 'No, not automatically: release 2 is approved only if EM-1 and the GZ-1 interim value are reached. The traffic-light proposal in the case: yellow means clarify the cause first and postpone the decision by one quarter, red means no release 2 (change the solution, not the goal). The sponsor decides and justifies deviations in writing.'),
   ('Beispielfrage: Welche Ursache sehen Sie für die Abfallquote, und was haben wir noch nicht probiert?', 'Sample question: What cause do you see for the waste rate, and what have we not tried yet?')]),
]

# Stationsverzeichnis: (Datei, Anker, Label DE, EN, Gates)
CASE_ST = [
 ('s-start', 'Start', 'Start', '–'),
 ('s0', '0a Fall', '0a Case', 'G0'),
 ('s0b', '0b Stakeholder', '0b Stakeholders', 'G0, G1'),
 ('s1', '1 Business Case', '1 Business case', 'G0, G6'),
 ('s2', '2 Anforderungen', '2 Requirements', 'G2, G3'),
 ('s3', '3a Epics', '3a Epics', 'G2'),
 ('s3b', '3b Priorisieren', '3b Prioritising', 'G2'),
 ('s4', '4 Use Cases', '4 Use cases', 'G2'),
 ('s5', '5 Stories', '5 Stories', 'G2'),
 ('s6', '6 Tests', '6 Tests', 'G4'),
 ('s7', '7 Rückverfolgung', '7 Traceability', 'G2, G4'),
 ('sCR', '8 Change Request', '8 Change request', 'G4, G5'),
 ('sOKR', '9 OKR', '9 OKR', 'G5, G6'),
 ('sBoard', '10 Schreibtisch', '10 Desk', 'G5'),
 ('sBacklog', '11 Backlog', '11 Backlog', 'G5, G6'),
 ('s8', '12 Lücken', '12 Gaps', 'G6'),
]
PA_ST = [
 ('st0', 'Start', 'Start', '–'),
 ('st1', 'Projektauftrag', 'Project charter', 'G1, G6'),
 ('st2', 'Auftrag prüfen', 'Check the charter', 'G1'),
 ('st3', 'Lasten- und Pflichtenheft', 'Requirements vs. specification', 'G2, G3'),
 ('st4', 'Pflichtenheft', 'Functional specification', 'G3, G4'),
 ('st5', 'Pflichtenheft prüfen', 'Check the specification', 'G3'),
 ('st6', 'BA-Facetten', 'BA facets', 'G3'),
 ('st7', 'Glossar und Quellen', 'Glossary and sources', '–'),
]
