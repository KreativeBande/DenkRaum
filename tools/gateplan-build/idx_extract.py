#!/usr/bin/env python3
"""Baut idx_data.json: Wörterbuch aller Kürzel (GZ, FR, OP, R, ADR, M ...) aus den Tabellen von
BA/RE-Case und Projektauftrag/Pflichtenheft (Titel DE/EN, Fundstelle).

Aufruf (aus tools/gateplan-build, Chromium unter /opt/pw-browsers/chromium):
    python3 idx_extract.py            # schreibt idx_data.json neben das Skript
Danach idx_build.py ausführen (setzt Wörterbuch und Modul in die Tools ein).
"""
import asyncio, json, os, re
from playwright.async_api import async_playwright

B = os.path.dirname(os.path.abspath(__file__))
T = os.path.abspath(os.path.join(B, '..'))

KINDS = {
 'GZ': ['Geschäftsziel', 'Business goal', 'Messbares Ziel des Auftraggebers aus der Vision.', 'Measurable goal of the sponsor from the Vision.'],
 'FE': ['Feature', 'Feature', 'Merkmal der Lösung aus der Vision.', 'Feature of the solution from the Vision.'],
 'BR': ['Geschäftsregel', 'Business rule', 'Regel der Organisation, die die Lösung einhalten muss.', 'Rule of the organisation that the solution must obey.'],
 'FR': ['Funktionale Anforderung', 'Functional requirement', 'Beschreibt, was das System tun soll.', 'Describes what the system shall do.'],
 'NFR': ['Nicht-funktionale Anforderung', 'Non-functional requirement', 'Beschreibt, wie gut das System etwas tun soll (Qualität nach ISO/IEC 25010).', 'Describes how well the system shall do it (quality per ISO/IEC 25010).'],
 'NT': ['Nicht-funktionaler Testfall', 'Non-functional test case', 'Prüft eine nicht-funktionale Anforderung, z. B. Last oder Verfügbarkeit.', 'Checks a non-functional requirement, e.g. load or availability.'],
 'UC': ['Use Case', 'Use case', 'Ablauf einer Interaktion mit Hauptablauf und Erweiterungen.', 'Flow of an interaction with main flow and extensions.'],
 'US': ['User Story', 'User story', 'Anforderung aus Sicht der Nutzenden mit Akzeptanzkriterien.', 'Requirement from the user view with acceptance criteria.'],
 'TF': ['Testfall', 'Test case', 'Prüft eine Anforderung mit Vorbedingung, Schritten und erwartetem Ergebnis.', 'Checks a requirement with precondition, steps and expected result.'],
 'E': ['Epic', 'Epic', 'Großer Nutzenblock, der in User Stories geschnitten wird.', 'Large block of value that is sliced into user stories.'],
 'KR': ['Key Result', 'Key result', 'Messbares Ergebnis unter einem Objective, mit Start, Ziel und Messung.', 'Measurable result under an objective, with start, target and measurement.'],
 'O': ['Objective', 'Objective', 'Ziel in Worten: wohin das Team will.', 'Goal in words: where the team wants to go.'],
 'CR': ['Change Request', 'Change request', 'Änderungsantrag mit Auswirkungsanalyse und Entscheidung.', 'Change request with impact analysis and decision.'],
 'EM': ['Erfolgsmaß', 'Success measure', 'Messgröße aus der Vision für das Stage Gate; EM-1 ist die Nutzungsquote und entspricht KR1.2.', 'Measure from the Vision for the stage gate; EM-1 is the usage rate and equals KR1.2.'],
 'OP': ['Offener Punkt', 'Open point', 'Bekannte ungeklärte Frage mit Eigentümer und Frist.', 'Known unresolved question with an owner and a due date.'],
 'R': ['Risiko', 'Risk', 'Eintrag im Risikoregister des Projektauftrags: Wahrscheinlichkeit mal Auswirkung, mit Maßnahme und Verantwortlichen.', 'Entry in the risk register of the project charter: probability times impact, with a measure and an owner.'],
 'ADR': ['Architekturentscheidung', 'Architecture decision record', 'Kurze Notiz zu einer Entscheidung mit Stand, Kriterien und Entscheider.', 'Short note on a decision with status, criteria and decision maker.'],
 'M': ['Meilenstein', 'Milestone', 'Termin im Projektauftrag, an dem ein vereinbartes Ergebnis vorliegen muss.', 'Date in the project charter by which an agreed result must exist.'],
}

CASE_JS = r"""(function(){
 function titleOf(h){var t='';
  if(h.classList.contains('kcard')){var k=h.querySelector('.kt');t=k?k.textContent:'';}
  else if(h.classList.contains('uc')){var h4=h.querySelector('h4');t=h4?h4.textContent.replace(/^[^·]*·\s*/,''):'';}
  else if(h.classList.contains('story')){var sh=h.querySelector('.story-h');t=sh&&sh.nextElementSibling?sh.nextElementSibling.textContent:'';}
  else if(h.tagName==='TR'){var c=h.querySelectorAll('td');t=c.length>1?c[1].textContent:'';}
  t=t.replace(/\s+/g,' ').trim();return t.length>170?t.slice(0,167)+'…':t;}
 var out={};
 document.querySelectorAll('[id^="ref-"]').forEach(function(e){var id=e.id.slice(4);
  if(/^[MTLG]\d$/.test(id)||/^(?:L|GR)-/.test(id))return;
  out[id]={t:titleOf(e),s:(e.closest('section.station')||{}).id||''};});
 return out;})()"""

PH_JS = r"""(function(){
 var re=/^((?:OP|GZ|BR|FR|NFR|CR|EM|ADR|R)-\d+|M[0-9])(?:\s+(.*))?$/;
 function txt(c){return c.textContent.replace(/\s+/g,' ').trim();}
 var out={};
 document.querySelectorAll('tr').forEach(function(tr){
  var cs=tr.querySelectorAll('td');if(!cs.length)return;
  var f=txt(cs[0]),m=f.match(re);if(!m)return;
  var id=m[1],t=m[2]||'';
  if(!t&&cs.length>1){t=txt(cs[1]);if(/^NFR-/.test(id)&&cs.length>2){t=t+': '+txt(cs[2]);}}
  if(!t)return;
  if(t.length>190)t=t.slice(0,187)+'…';
  var st=(tr.closest('.station')||{}).id||'';
  if(!out[id])out[id]={t:t,s:st};
 });
 return out;})()"""


async def grab(pg, js):
    return await pg.evaluate(js)


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/opt/pw-browsers/chromium', args=['--no-sandbox'])
        res = {}
        for key, f, js in (('c', 'ba-re-case-lindenfeld-lunch.html', CASE_JS),
                           ('p', 'lindenfeld-projektauftrag-pflichtenheft.html', PH_JS)):
            pg = await b.new_page(viewport={'width': 1300, 'height': 900})
            await pg.goto('file://' + os.path.join(T, f))
            await pg.wait_for_timeout(900)
            de = await grab(pg, js)
            await pg.click('#langBtn')
            await pg.wait_for_timeout(500)
            en = await grab(pg, js)
            res[key] = (de, en)
            await pg.close()
        await b.close()

    ids = {}
    for key in ('c', 'p'):
        de, en = res[key]
        for i, v in de.items():
            kind = re.sub(r'[\d.\-].*$', '', i)
            if kind == 'M' and key == 'c':
                continue
            e = ids.setdefault(i, {'k': kind})
            e[key] = {'s': v['s'], 'd': v['t'], 'e': en.get(i, {}).get('t', v['t'])}
    # EM-1 ist im Case das Key Result KR1.2
    if 'KR1.2' in ids and 'EM-1' in ids and 'c' not in ids['EM-1']:
        ids['EM-1']['c'] = dict(ids['KR1.2']['c'], r='KR1.2')
    # Anker im Case: Ziel-ID nur, wenn als CSS-Selektor tauglich (kein Punkt)
    for i, e in ids.items():
        if 'c' in e:
            e['c']['r'] = e['c'].get('r') or i
    out = {'kinds': KINDS, 'ids': dict(sorted(ids.items()))}
    open(os.path.join(B, 'idx_data.json'), 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1))
    from collections import Counter
    print(len(ids), 'Kürzel;', dict(Counter(e['k'] for e in ids.values())))
    print('nur Pflichtenheft:', sorted(i for i, e in ids.items() if 'c' not in e and 'p' in e)[:40])


asyncio.run(main())
