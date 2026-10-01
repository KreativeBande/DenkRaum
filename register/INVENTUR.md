# Tool-Inventur · Stand 01.10.2026

Grundlage: `register/tools.js` (82 Tools), abgeglichen mit Startseite, Seminarseiten und Notion-Tool-Katalog.
Pro Punkt steht ein Vorschlag. **Ihre Entscheidung** reicht als kurze Antwort, z. B. „A1 ja, C3 zusammenlegen“.

## A · Repo und Notion passen nicht zusammen

| # | Befund | Vorschlag |
|---|---|---|
| A1 | Notion-Eintrag **„Souveränitätswerkzeug“** (zertifiziert, GPM-Konferenz) hat keine Datei im Repo. „Souveränität“ taucht als Baustein in fünf Tools auf (u. a. Souveränitäts-Ticket im Denkräume-Navigator). | Klären: Lebt das Tool woanders, oder ist es in den Denkräume-Navigator aufgegangen? Dann Notion-Eintrag archivieren. |
| A2 | Notion-Eintrag **„Von der Anfrage zum Code“** steht auf „In Arbeit“, nie ins Repo gekommen. Der Requirements-to-Code Explorer deckt einen ähnlichen Weg ab. | Klären: noch geplant, oder durch den Explorer erledigt? |
| A3 | **AI4RE Quizzmaschine** und **KI-Risiko-Klassifikationsraum** sind im Repo, fehlen aber in Notion. | Nach Ihrer Entscheidung zu Punkt E aus dem Register nachtragen. |

## B · Siegel-Stand

- **11 Tools ohne Siegel-Prüfung:** Anforderungs-Reise, Adaptive Denkraum Engine, Fragenautomat, Klarheits-Sprint, KI Black-Box-Simulator, Prompt-Black-Box-Simulator, die drei älteren OKR-Tools (Kaskade, Board, Team-Board), AI4RE Quizzmaschine, KI-Risiko-Klassifikationsraum.
- **4 Tools mit „Offene Punkte“:** KI steuern mit Kompetenz (K11), Guardrails × Governance × Assurance (K18-Label, Audit ausstehend), KI-Werkbank (K14, K17), Claude-Feature-Navigator (Audit ausstehend).
- **31 Tools mit dem alten dreistufigen Beamer-Muster** (Nachrüstung laut CLAUDE.md erst beim nächsten inhaltlichen Update).

**Vorschlag:** Erst über C und D entscheiden. Was zusammengelegt oder in den Ruhestand geschickt wird, braucht kein Audit mehr. Die ungeprüften Tools, die in Seminaren stecken (Klarheits-Sprint, Fragenautomat, Anforderungs-Reise, OKR-Kaskade, OKR-Team-Board, OKR-Board, Adaptive Denkraum Engine, Prompt-Black-Box-Simulator), zuerst prüfen. Die zeigen Sie vor Publikum.

## C · Gruppen mit Mehrfachabdeckung

| # | Gruppe | Tools | Beobachtung | Vorschlag |
|---|---|---|---|---|
| C1 | **Prompt-Mechanik** | Prompt-Black-Box-Simulator · KI steuern mit Kompetenz · Wie KI durch Projekte denkt | Alle drei zeigen Tokenisierung und Wahrscheinlichkeiten an einem schwachen und einem guten Prompt. „KI steuern“ war der GPM-Vortrag. | **Zusammenlegen** zu einem Demonstrator. Die stärkste Überschneidung im Bestand. |
| C2 | **KI-Modelle** | KI-Modelllandschaft (Claude vs. ChatGPT) · LLM-Markt-Kompass (7 Anbieter) · KI-Werkbank · Claude-Feature-Navigator | Die Modelllandschaft ist inhaltlich eine Teilmenge des Markt-Kompasses. Modelldaten veralten schnell (K17), jedes Tool muss einzeln nachgepflegt werden. | Modelllandschaft **in den Markt-Kompass aufnehmen**. Werkbank und Feature-Navigator bleiben, weil sie andere Fragen beantworten. |
| C3 | **OKR** | OKR-Kaskade · OKR-Board (Reise durch alle Räume) · OKR-Team-Board · OKR LAB | Das OKR LAB enthält den Kaskaden-Pfad als 15-Stationen-Fall. Kaskade und Board sind ungeprüft. | Kaskade **behalten** als kurze Variante (10 Minuten statt Gruppenarbeit). OKR-Board **prüfen, ob noch gebraucht**: Team-Board und LAB decken es weitgehend ab. |
| C4 | **ISO 25010** | Kompendium · Banklabor · Digitale Studierendenakte · RE-Waschmaschine · Anforderungs-Board | Banklabor und Studierendenakte führen beide einen Fall durch alle neun Merkmale, einmal Bank, einmal Hochschule. | **Behalten**, aber Rollen festlegen: Kompendium = Nachschlagen, Banklabor = Vertiefung Untermerkmale, Studierendenakte = Hochschul-Kontext. Crosslinks entsprechend. |
| C5 | **RAG** | Vom Rateversuch zur belegten Antwort · Wie kommt die Antwort in den Chat? | Einsteiger-Erklärung und Architektur-Sicht. | **Behalten**, als Stufe 1 und Stufe 2 gegenseitig verlinken. |
| C6 | **KI Black-Box** | KI Black-Box-Simulator (Spam-Filter, Kredit-Score) · Prompt-Black-Box-Simulator | Gleicher Name, anderes Thema: das eine ist ML-Verhalten, das andere Prompting. | **Umbenennen**, damit sie nicht verwechselt werden. Zum Beispiel „ML-Verhalten testen“. |

Keine Dublette, sondern gewollte Reihen: Zettelkästen (4), BA-/SE-Lifecycle-Lernreise, Prozessmodellierung (4), Fallwelt-Steckbriefe (3), KI-Governance-Canvases (4).

## D · Tools ohne Haufe-Seminar (32)

Das heißt nicht „überflüssig“, nur: Ihr Einsatzort steht noch nirgends. Bitte pro Gruppe sagen, wo Sie sie einsetzen.

| # | Gruppe | Tools | Vorschlag |
|---|---|---|---|
| D1 | **Könnte direkt in ein Haufe-Seminar** | Von der Chatbox zum Workflow (Opener) · KI Black-Box-Simulator · Excel Lab RE & BA | Opener auf die Seite **41851** (KI-Prompting) als Einstieg, Excel Lab auf **3744** (Agile BA) und **9368** (RE). |
| D2 | **KI-Architektur** | AI Engineering Studio · Vom Tool-Chaos zum MCP-Handshake · Begriffslexikon KI-Architektur · beide RAG-Tools · KI-Einsatzmuster-Explorer · TalentMatch ML-Paradigmen · TalentMatch Sufficiency-Gate · Profile Engineering Lab | Einsatzort benennen (PromptSchule? GPM? eigener Workshop?). Kein Haufe-Seminar deckt KI-Architektur ab. |
| D3 | **KI-Modelle** | KI-Modelllandschaft · LLM-Markt-Kompass · Claude-Feature-Navigator · KI steuern mit Kompetenz | siehe C1/C2 |
| D4 | **KI-Governance** | AI Governance Framework · EU AI Act Framework · Guardrails × Governance × Assurance · KI-Risiko-Klassifikationsraum | Einsatzort benennen. Kandidat für ein eigenes Seminarangebot. |
| D5 | **Prüfungsvorbereitung** | AI4RE Quizzmaschine · CPMAI-Prozess-Board | Einsatzort benennen (IREB AI4RE, PMI-CPMAI). |
| D6 | **ISO-Vertiefung** | ISO-25010-Banklabor · Digitale Studierendenakte | siehe C4. Banklabor ggf. auf **9368** als Vertiefung. |
| D7 | **Wissensnetz** | Knowledge Zoom Navigator · Zettelkasten RE & BA · Zettelkasten Marmorkuchen | Als Nachbereitung auf **9368** und **31693** verlinken? |
| D8 | **Referenz / Meta** | drei Fallwelt-Steckbriefe · Fallstudie Qualitätssystem · Steckbrief Michaela Kühn | Bleiben ohne Seminar, das ist ihre Rolle. |


## E · Was ich danach mache

1. Ihre Entscheidungen ins Register übernehmen (`geprueft: true`, Zweck/Dauer korrigieren).
2. Zusammenlegungen und Umbenennungen als eigene Pull Requests, je Tool einer.
3. Notion aus dem Register nachziehen (A1–A3 und Siegel-Stand).
4. Danach das Trainerinnen-Cockpit bauen, gespeist aus dem Register.
