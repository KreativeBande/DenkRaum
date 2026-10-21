"""Teilnehmenden-Handout (PDF) zum Gateplan, erzeugt aus den Gateplan-Daten. Aufruf: python3 handout.py <ausgabe.pdf>"""
import sys, html, asyncio
import hub
from hub_data import GATES, LINES, VARIANTS, CELLS, BRIEF
esc = html.escape
COL, LET = hub.COL, hub.LET
KIND = {'F': 'Fall', 'R': 'Abgeleitet', 'A': 'Annahme'}
def badge(k): return f'<span class="b b{k}">{k}</span>'
CSS = '''
@page{size:A4;margin:14mm 12mm 16mm}
@page land{size:A4 landscape;margin:12mm 10mm 14mm}
*{box-sizing:border-box}body{font:11.5pt/1.4 "Inter","Helvetica Neue",Arial,sans-serif;color:#1F2A3A;margin:0}
h1{font-size:24pt;margin:0 0 4mm}h2{font-size:17pt;margin:0 0 2mm}h3{font-size:12pt;margin:5mm 0 2mm}
.pg{break-before:page}.pg:first-child{break-before:auto}.land{page:land}
.lead{font-size:12pt;margin:0 0 5mm}.sub{color:#4a5568;font-size:10pt}
svg{width:100%;height:auto}.s14w{fill:#fff;font:700 14px sans-serif}.s15{font:15px sans-serif;fill:#1F2A3A}.s16{font:700 16px sans-serif;fill:#1F2A3A}
table{border-collapse:collapse;width:100%;font-size:10pt}th,td{border:1px solid #cbd5e1;padding:1.5mm 2.5mm;text-align:left;vertical-align:top}th{background:#eef2f7}
tr{break-inside:avoid}
.b{display:inline-block;min-width:5mm;text-align:center;border-radius:99px;font-size:9pt;font-weight:700;padding:0 2mm}
.bF{background:#dcfce7;color:#166534}.bR{background:#dbeafe;color:#1e40af}.bA{background:#fef3c7;color:#92400e}
.ldot{display:inline-block;width:6mm;height:6mm;line-height:6mm;border-radius:50%;color:#fff;text-align:center;font-weight:700;font-size:9pt;margin-right:2mm}
.legend{display:grid;grid-template-columns:1fr 1fr;gap:2.5mm 6mm;margin:4mm 0}.legend div{border:1px solid #cbd5e1;border-radius:3mm;padding:2.5mm}
.gh{display:flex;align-items:baseline;gap:4mm;border-bottom:3px solid #1F2A3A;padding-bottom:2mm;margin-bottom:3mm}.gh .c{font-size:26pt;font-weight:800}.gh .q{margin-left:auto;font-style:italic}
.why{background:#eef6ff;border-left:1.5mm solid #1F5FBF;padding:3mm 4mm;font-size:12pt;margin-bottom:2mm}.think{margin-top:4mm;border:1px solid #cbd5e1;border-radius:3mm;padding:3mm 4mm;background:#fffbea}.how{border:1px solid #cbd5e1;border-radius:3mm;padding:3mm 5mm;margin-top:3mm}.how ol{margin:0 0 2mm;padding-left:5mm}.abbr{margin-top:4mm;font-size:9pt;color:#334155;border-top:1px solid #cbd5e1;padding-top:2mm}.notes{margin-top:3mm}.notes div{border-bottom:1px solid #94a3b8;height:7mm}
.mx{table-layout:fixed}.mx th,.mx td{font-size:7pt;line-height:1.25;padding:.8mm;overflow-wrap:anywhere;hyphens:auto}.mx th:first-child,.mx td:first-child{width:24mm}.mx .b{font-size:7pt;padding:0 1.2mm}.mx .ldot{width:5mm;height:5mm;line-height:5mm;font-size:8pt;margin-right:1mm}
dl{margin:0;font-size:9.5pt;line-height:1.3;columns:2;column-gap:8mm}dt,dd{break-inside:avoid}dt{font-weight:700;margin-top:2.5mm}dd{margin:0}
.src li{margin-bottom:1.5mm;font-size:9pt}a{color:#1F5FBF}
'''
def line_cell(v): return f'<span class="ldot" style="background:{COL[v[1]]}">{esc(LET[v[1]])}</span>{esc(v[3])}'
import re
WORUM = [
 'Bevor Geld ausgegeben wird, entscheiden die Verantwortlichen: Lohnt sich die Cafeteria-App überhaupt? Dafür werden Optionen miteinander und mit dem Nichtstun verglichen.',
 'Das Projekt bekommt sein Mandat: Ziele, Umfang, Budget und Termine stehen schwarz auf weiß, und eine Projektleitung wird benannt.',
 'Das Team legt fest, was gebraucht wird, so eindeutig und prüfbar, dass spätere Änderungen daran gemessen werden können.',
 'Jetzt steht fest, wie die Anforderungen umgesetzt und geprüft werden. Offene Entscheidungen bekommen eine verantwortliche Person und eine Frist.',
 'Ist die App fertig, und darf sie live gehen? Die Abnahme prüft gegen Kriterien, die vorher festgelegt wurden.',
 'Nach einigen Monaten im Betrieb zeigt der Check-in, ob die Ziele auf Kurs liegen. Es wird nachgesteuert, über Release 2 wird noch nicht entschieden.',
 'Die Sponsorin entscheidet mit Zahlen: Wird Release 2 gebaut, später oder gar nicht?']
ABBR = [(r'GZ-?\d*', 'GZ', 'Geschäftsziel'), (r'OP-\d+', 'OP', 'offener Punkt (noch nicht entschiedene Frage)'), (r'ADR-\d+', 'ADR', 'Architekturentscheidung'),
 (r'\bNFR-\d+', 'NFR', 'nicht-funktionale Anforderung (wie gut etwas sein muss)'), (r'\bFR-\d+', 'FR', 'funktionale Anforderung (was das System tun soll)'),
 (r'\bBR-\d+', 'BR', 'Geschäftsregel'), (r'\bKR\d', 'KR', 'Key Result (messbares Ergebnis)'), (r'\bEM-\d+', 'EM', 'Erfolgsmetrik'), (r'\bL-\d', 'L', 'Leitplanke (Grenze, die einzuhalten ist)'),
 (r'CR-\d+', 'CR', 'Änderungsantrag (Change Request)'), (r'\bBA\b', 'BA', 'Business Analyse'), (r'\bPM\b', 'PM', 'Projektmanagement'), (r'BetrVG', 'BetrVG', 'Betriebsverfassungsgesetz'),
 (r'DSGVO', 'DSGVO', 'Datenschutz-Grundverordnung'), (r'LMIV', 'LMIV', 'Lebensmittelinformationsverordnung'), (r'PCI', 'PCI DSS', 'Sicherheitsstandard für Zahlungskarten'),
 (r'INVEST', 'INVEST', 'Merkmale guter User Stories'), (r'\bM\d\b', 'M0 bis M6', 'Meilensteine (Monat 0 bis Monat 6 und später)'), (r'Release', 'Release', 'Ausbaustufe des Produkts'),
 (r'Lenkungskreis', 'Lenkungskreis', 'Entscheidungsgremium des Projekts'), (r'Stage Gate', 'Stage Gate', 'Gate, an dem über die nächste Stufe entschieden wird')]
def abbr_for(text):
    out = []
    for pat, k, ex in ABBR:
        if re.search(pat, text): out.append(f'<b>{esc(k)}</b> = {esc(ex)}')
    return out
SHOW = ['Aa', 'Ab', 'Ba', 'Bb']
def page_plan():
    o = ['<section class="pg"><h1>Lindenfeld Lunch: Gateplan</h1>']
    o.append('<p class="lead">Ein Gate ist ein Umsteigebahnhof: Hier wird entschieden, ob das Projekt weiterfährt. Die sechs Linien zeigen, was dabei zusammenkommt.</p>')
    o.append(hub.svg('h'))
    o.append('<div class="legend">' + ''.join(f'<div><span class="ldot" style="background:{l[2]}">{esc(l[1])}</span><b>{esc(l[4])}</b><br><span class="sub">{esc(l[6])}</span></div>' for l in LINES) + '</div>')
    o.append('<div class="how"><h3 style="margin-top:0">So liest du dieses Blatt</h3><ol><li>Jedes Gate hat eine eigene Seite. Oben steht, <b>worum es geht</b>, dann die Entscheidung in Kürze.</li><li>Darunter siehst du vier Linien: wie das Gate aussieht, klassisch und agil, und wie die Business Analyse (BA) und das Projektmanagement (PM) darauf schauen.</li><li>Notiere unten, <b>was dich betrifft</b>. Die Kürzel, die auf der Seite vorkommen, stehen ganz unten.</li></ol>')
    o.append('<p><b>Beispiel:</b> Zeile „Entscheidung“ bei G0 heißt: An diesem Gate wird entschieden, ob Option A gestartet wird. Der Buchstabe daneben zeigt die Herkunft: ' + badge('F') + ' steht so im Fall · ' + badge('R') + ' abgeleitet (Rechnung oder Regel) · ' + badge('A') + ' Annahme, noch zu prüfen.</p></div>')
    o.append('<p class="sub">Fiktiver Trainingsfall. Alle Zahlen sind Planungsannahmen. Keine Rechtsberatung. Die vollständige Tabelle mit allen neun Linien steht im Anhang.</p></section>')
    return ''.join(o)
def page_gate(gi):
    g = GATES[gi]; txt = []
    o = [f'<section class="pg"><div class="gh"><span class="c">{esc(g[0])}</span><span><b style="font-size:16pt">{esc(g[1])}</b><br><span class="sub">{esc(g[3])}</span></span><span class="q">{esc(g[5])}</span></div>']
    o.append(f'<div class="why"><b>Worum geht es?</b> {esc(WORUM[gi])}</div>')
    o.append('<h3>Das Gate in Kürze</h3><table><tr><th style="width:30mm">Frage</th><th>Antwort im Fall</th><th style="width:16mm">Herkunft</th></tr>')
    for asp, cont, kind, ref in BRIEF[gi]:
        txt.append(cont[0]); o.append(f'<tr><td><b>{esc(asp[0])}</b></td><td>{esc(cont[0])}</td><td>{badge(kind)}</td></tr>')
    o.append('</table><h3>So sieht das Gate in vier Linien aus</h3><table><tr><th style="width:42mm">Linie</th><th>Was am Gate passiert</th><th style="width:16mm">Herkunft</th></tr>')
    for v in VARIANTS:
        if v[0] not in SHOW: continue
        c = CELLS[v[0]][gi]; txt.append(c[0])
        o.append(f'<tr><td>{line_cell(v)}</td><td>{esc(c[0])}</td><td>{badge(c[2])}</td></tr>')
    q = hub.GROUPQ[gi]; txt += [q[0][0], q[1][-1][0]]
    o.append(f'</table><div class="think"><b>Denkfrage:</b> {esc(q[0][0])}<br><b>Eine Frage, die du stellen könntest:</b> {esc(q[1][-1][0].split(": ", 1)[-1])}</div>')
    o.append('<div class="notes"><b>Meine Notizen: Was betrifft mich an diesem Gate?</b><div></div><div></div></div>')
    ab = abbr_for(' '.join(txt) + ' ' + g[1])
    if ab: o.append('<div class="abbr"><b>Kürzel auf dieser Seite:</b> ' + ' · '.join(ab) + '</div>')
    o.append('</section>')
    return ''.join(o)
def page_net():
    o = ['<section class="pg land"><h2 style="margin-bottom:1mm">Anhang: Netzplan mit allen Linien und Gates</h2><table class="mx"><tr><th>Linie</th>']
    o.append(''.join(f'<th>{esc(g[0])}<br>{esc(g[1])}</th>' for g in GATES) + '</tr>')
    for v in VARIANTS:
        o.append(f'<tr><td>{line_cell(v)}</td>' + ''.join(f'<td>{esc(CELLS[v[0]][gi][0])} {badge(CELLS[v[0]][gi][2])}</td>' for gi in range(len(GATES))) + '</tr>')
    o.append('</table></section>')
    return ''.join(o)
def page_gloss():
    o = ['<section class="pg"><h2>Glossar</h2><dl>']
    for d, e, dd, de in hub.GLOSS: o.append(f'<dt>{esc(d)}</dt><dd>{esc(dd)}</dd>')
    o.append('</dl><h3>Quellen</h3><ul class="src">')
    for t, u, a, b in hub.SRC: o.append(f'<li><a href="{esc(u)}">{esc(t)}</a><br>{esc(a)}</li>')
    o.append('</ul><p class="sub">Normen am 21.10.2026 geprüft; vor dem Einsatz erneut prüfen.</p></section>')
    return ''.join(o)
def build():
    return '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>Lindenfeld Lunch: Gateplan (Handout)</title><style>' + CSS + '</style></head><body>' + page_plan() + ''.join(page_gate(i) for i in range(len(GATES))) + page_gloss() + page_net() + '</body></html>'
async def pdf(out):
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page()
        await pg.set_content(build()); await pg.emulate_media(media='print')
        await pg.pdf(path=out, format='A4', print_background=True, prefer_css_page_size=True, display_header_footer=True, header_template='<span></span>',
            footer_template='<div style="width:100%;font:8pt sans-serif;color:#4a5568;padding:0 12mm;display:flex;justify-content:space-between"><span>Michaela Kühn · www.michaela-kuehn.com · Fiktiver Trainingsfall</span><span>Seite <span class="pageNumber"></span> von <span class="totalPages"></span></span></div>',
            margin={'top': '14mm', 'bottom': '16mm', 'left': '12mm', 'right': '12mm'})
        await br.close()
if __name__ == '__main__':
    out = sys.argv[1]; open(out.replace('.pdf', '.html'), 'w', encoding='utf8').write(build()); asyncio.run(pdf(out))
