import sys, os, re, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import *
import lib
from hub_data import *
from zoom import ZOOM_CSS, ZOOM_JS

BASE = os.path.dirname(os.path.abspath(__file__))
EMB_DIR = os.path.abspath(os.environ.get('GP_SRC', os.path.join(BASE, 'out')))  # Ordner mit Case und Pflichtenheft (im Repo: tools/)
DST_DIR = os.path.abspath(os.environ.get('GP_OUT', os.path.join(BASE, 'out')))
CSS = open(os.path.join(BASE, 'base.css'), encoding='utf8').read()
JS = open(os.path.join(BASE, 'base.js'), encoding='utf8').read()
JS = JS.replace("'Lindenfeld Lunch: Project Charter and Functional Specification':'Lindenfeld Lunch: Projektauftrag und Pflichtenheft'",
                "'Lindenfeld Lunch: Gate Plan':'Lindenfeld Lunch: Gateplan'")
assert 'Gate Plan' in JS

COL = {l[0]: l[2] for l in LINES}
LET = {l[0]: l[1] for l in LINES}
LNAME = {l[0]: (l[4], l[5]) for l in LINES}
VAR = {v[0]: v for v in VARIANTS}

EXTRA_CSS = '''
.hdr .t{padding-right:330px}
.ldot{display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:28px;border-radius:999px;color:#fff;font-weight:700;font-size:15px;margin-right:8px;vertical-align:middle;flex:0 0 auto}
.lg{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin:12px 0}
.lg .li{border:1.5px solid var(--line);border-radius:12px;padding:8px 12px;display:flex;gap:8px;align-items:flex-start}
.lg .li b{display:block}
.gsel{min-height:44px;min-width:44px;padding:6px 14px;border-radius:10px;border:1.5px solid var(--line);background:#fff;color:var(--ink);font-size:16px;font-family:inherit;cursor:pointer}
.gsel.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.gbar{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 14px}
html.js .gate{display:none}
html.js .gate.on{display:block}
.gate>h3{margin-top:8px}
.leit{font-size:var(--fs-h4);font-weight:600;margin:0 0 6px}
a.go{display:inline-flex;align-items:center;min-height:44px;padding:6px 16px;border-radius:999px;border:1.5px solid var(--acc);background:var(--acc-soft);color:var(--acc);font-weight:600;text-decoration:none;margin:4px 8px 4px 0;font-size:16px;overflow-wrap:normal}
.golist{display:flex;flex-wrap:wrap;margin:6px 0 10px}
.gnavbar{display:flex;justify-content:space-between;gap:10px;margin:22px 0 6px;flex-wrap:wrap}
.mx{table-layout:fixed}
.mx th:first-child,.mx td:first-child{position:sticky;left:0;background:#fff;z-index:2;width:150px;min-width:150px}
.mx thead th:first-child{background:var(--soft)}
.mx th,.mx td{width:auto}
.mx td{font-size:max(var(--fs2),15px)}
.mx td .bd{margin-top:6px}
.mx td:first-child{font-size:max(var(--fs2),15px);font-weight:600}
.gjump{min-height:44px;width:100%;text-align:left;padding:6px 10px;border-radius:10px;border:1.5px solid var(--line);background:#fff;color:var(--ink);font-family:inherit;font-size:15px;cursor:pointer;line-height:1.3}
.gjump b{display:block}
.gp{cursor:pointer}
.gp:focus{outline:3px solid #1F5FBF;outline-offset:2px}
.svgw.wide{max-width:none;overflow-x:auto}
.svgw.wide svg{min-width:1070px}
main{max-width:none;width:auto;padding:16px 0}
.footer{max-width:none;width:95%;padding:0}
.mx{min-width:1000px !important;width:100%}
.filebar{position:sticky;top:44px;z-index:80;display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;padding:8px 2.5%;background:#fff;border-bottom:1px solid var(--line)}
.ftabs{display:flex;gap:6px;flex-wrap:wrap}
.ftab{min-height:44px;padding:6px 18px;border-radius:10px 10px 0 0;border:1.5px solid var(--line);border-bottom:3px solid var(--line);background:#fff;color:var(--ink-dim);font-size:17px;font-weight:600;font-family:inherit;cursor:pointer}
.ftab.on{background:var(--acc);color:#fff;border-color:var(--acc)}
.ctl2{display:flex;gap:8px;flex-wrap:wrap;margin-left:auto}
.layout{display:grid;grid-template-columns:250px minmax(0,1fr);gap:24px;width:95%;margin:0 auto;align-items:start}
.side{position:sticky;top:112px;max-height:calc(100vh - 124px);overflow-y:auto;padding:12px 0}
.side>[hidden]{display:none !important}
.side .tabs,.side .snvlist{display:flex;flex-direction:column;flex-wrap:nowrap;gap:6px;padding:0;border:0;overflow:visible}
.side .tab,.snv{min-height:44px;width:100%;text-align:left;padding:6px 14px;border-radius:10px;border:1.5px solid var(--line);background:#fff;color:var(--ink-dim);font-size:16px;font-family:inherit;cursor:pointer}
.snv.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.snv small{opacity:.8;font-size:14px;margin-left:6px}
.fr{width:100%;height:calc(100vh - 124px);min-height:560px;border:1.5px solid var(--line);border-radius:10px;background:#fff;display:block}
.fr[hidden]{display:none}
.fr.zoomfull{position:fixed;inset:0;width:100vw;height:100vh;min-height:0;z-index:1000;border:0;border-radius:0}
.content{min-width:0}
.lnbar{border:1.5px solid var(--line);border-radius:12px;margin:8px 0 12px}
@media (max-width:900px){.layout{grid-template-columns:minmax(0,1fr);gap:0}.side{position:static;max-height:none;overflow:visible;padding:8px 0}.side .tabs,.side .snvlist{flex-direction:row;overflow-x:auto}.side .tab,.snv{width:auto;white-space:nowrap;flex:0 0 auto}.ctl2{margin-left:0}.filebar{flex-wrap:nowrap;overflow-x:auto}.filebar>*{flex:0 0 auto}.fr{height:calc(100vh - 200px)}}

.svgw .s14w{font-size:15px;fill:#fff;font-weight:700}
.cell-ln{display:flex;align-items:center}
.gl-item{margin:0}
.srcs li{margin:6px 0}
.steps{margin:6px 0 6px 22px;padding:0}
.steps li{margin:6px 0}
'''
# Linienfilter: Zeilen ausblenden, gefaltete Zeilen dabei einblenden
for l in LINES:
    f = l[3]
    EXTRA_CSS += f'html[data-facet="{f}"] tr[data-ln]:not([data-ln~="{f}"]){{display:none}}\n'
EXTRA_CSS += 'html[data-facet] .tw.fx tbody.more{display:table-row-group !important}\n'
EXTRA_CSS += 'html[data-facet] .tw.fx + .mrow{display:none}\n'
EXTRA_CSS += '@media (max-width:640px){.gbar{flex-wrap:nowrap;overflow-x:auto}.gbar>*{flex:0 0 auto}}\n'

EXTRA_JS = '''
(function(){
var R=document.documentElement;
var $=function(s,r){return (r||document).querySelector(s);},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v);}catch(e){return null;}}
var cur=0;
function showGate(n,noScroll){
 var gs=$$('.gate');if(!gs.length)return;if(n<0)n=0;if(n>=gs.length)n=gs.length-1;cur=n;
 gs.forEach(function(g,i){g.classList.toggle('on',i===n);});
 $$('.gsel').forEach(function(b){b.classList.toggle('on',parseInt(b.getAttribute('data-g'),10)===n);b.setAttribute('aria-pressed',parseInt(b.getAttribute('data-g'),10)===n?'true':'false');});
 ss('gate',String(n));if(!noScroll)window.scrollTo(0,0);
}
function goTab(i){var t=$('.tab[data-s="'+i+'"]');if(t)t.dispatchEvent(new Event('pointerup',{bubbles:true}));}
document.addEventListener('pointerup',function(e){
 var t=e.target;if(!t.closest)return;
 var b=t.closest('.gsel,.gjump,.gnav,.startgo,.gp');if(!b)return;
 if(b.classList.contains('gsel')){showGate(parseInt(b.getAttribute('data-g'),10));return;}
 if(b.classList.contains('gnav')){showGate(cur+parseInt(b.getAttribute('data-d'),10));return;}
 if(b.classList.contains('gjump')||b.classList.contains('gp')){var n=parseInt(b.getAttribute('data-g'),10);goTab(1);showGate(n);return;}
 if(b.classList.contains('startgo')){goTab(parseInt(b.getAttribute('data-s'),10));return;}
});
document.addEventListener('keydown',function(e){
 if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.classList&&e.target.classList.contains('gp')){e.preventDefault();e.target.dispatchEvent(new Event('pointerup',{bubbles:true}));}
});
var lay=$('.layout'),FR={c:$('#frC'),p:$('#frP')},LD={c:false,p:false},curS={c:'s-start',p:'st0'};
function curMark(k){var nv=$('#nav'+k.toUpperCase());if(!nv)return;$$('.snv',nv).forEach(function(b){b.classList.toggle('on',b.getAttribute('data-a')===curS[k]);});}
function sync(){
 var d={gp:'sync',lang:R.lang||'de',depth:R.getAttribute('data-depth')||'short',beamer:['beamer','beamer-xl','beamer-xxl'].filter(function(c){return R.classList.contains(c);}).length};
 ['c','p'].forEach(function(k){if(LD[k]&&FR[k].contentWindow)FR[k].contentWindow.postMessage(d,'*');});
}
var st=null;new MutationObserver(function(){clearTimeout(st);st=setTimeout(sync,80);}).observe(R,{attributes:true,attributeFilter:['lang','class','data-depth']});
['c','p'].forEach(function(k){FR[k].addEventListener('load',function(){if(LD[k])setTimeout(sync,150);});});
function setFile(f){
 lay.setAttribute('data-file',f);
 $$('.ftab').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-file')===f);});
 $('#navHub').hidden=(f!=='hub');$('#navC').hidden=(f!=='c');$('#navP').hidden=(f!=='p');
 $('main').hidden=(f!=='hub');FR.c.hidden=(f!=='c');FR.p.hidden=(f!=='p');
 window.scrollTo(0,0);
}
function openF(k,a){
 setFile(k);
 var id=(a||'').split(':')[0];
 if(!LD[k]){var u=URL.createObjectURL(new Blob([window.__EMB[k]],{type:'text/html'}));LD[k]=true;FR[k].src=u+(a?'#'+a:'');if(!a)id=(k==='c')?'s-start':'st0';}
 else if(a){FR[k].contentWindow.postMessage({gp:'goto',a:a},'*');}
 if(id)curS[k]=id;curMark(k);
}
window.addEventListener('message',function(e){var d=e.data;if(d&&d.gp==='zoomstate'){['c','p'].forEach(function(k){if(FR[k].contentWindow===e.source)FR[k].classList.toggle('zoomfull',!!d.on);});return;}if(d&&d.gp==='open'&&(d.k==='c'||d.k==='p')){openF(d.k,d.a||'');return;}if(!d||d.gp!=='cur')return;['c','p'].forEach(function(k){if(FR[k].contentWindow===e.source){curS[k]=d.id;curMark(k);}});});
document.addEventListener('pointerup',function(e){
 var t=e.target;if(!t.closest)return;
 var ft=t.closest('.ftab');if(ft){var f=ft.getAttribute('data-file');if(f==='hub')setFile('hub');else openF(f,'');return;}
 var sn=t.closest('.snv');if(sn){openF(sn.getAttribute('data-k'),sn.getAttribute('data-a'));return;}
 var a=t.closest('a.go');if(a){openF(a.getAttribute('data-k'),a.getAttribute('data-a')||'');}
});
document.addEventListener('click',function(e){var t=e.target;if(t.closest&&t.closest('a.go'))e.preventDefault();});
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.classList&&e.target.classList.contains('go')){e.preventDefault();openF(e.target.getAttribute('data-k'),e.target.getAttribute('data-a')||'');}});
var h=(location.hash||'').match(/^#g([0-6])$/);
var sg=ss('gate');
showGate(h?parseInt(h[1],10):(sg?parseInt(sg,10)||0:0),true);
if(h){goTab(1);window.scrollTo(0,0);}
})();
'''

def link(kind, anchor, de, en, trainer, gi=None):
    g = '' if gi is None else f' data-gate="{gi}"'
    a = f' data-a="{anchor}"' if anchor else ''
    return f'<a class="go" href="#" data-k="{kind}"{a}{g}>{S(de, en)}<span aria-hidden="true">&nbsp;→</span></a>'

def refs(txt):
    out_de, out_en = [], []
    for tok in [x.strip() for x in txt.split(',')]:
        if tok.startswith('PA ') or tok.startswith('OP-'):
            out_de.append(tok); out_en.append(tok)
        else:
            out_de.append('Fall ' + tok); out_en.append('Case ' + tok)
    return ', '.join(out_de), ', '.join(out_en)

def ref_cell(txt):
    d, e = refs(txt)
    return (d, e)

def mark_ln(tab):
    return Raw(re.sub(r' data-f="', ' data-ln="', str(tab)).replace('class="tw"', 'class="tw fx"'))

def line_label(v):
    vid, line, f, de, en, sde, sen = v
    return Raw(f'<span class="cell-ln"><span class="ldot" style="background:{COL[line]}" aria-hidden="true">{esc(LET[line])}</span>{S(de, en)}</span>')

def gate_lines_table(gi):
    rows = []
    for v in VARIANTS:
        c = CELLS[v[0]][gi]
        rows.append(([line_label(v), (c[0], c[1]), bds(c[2])], v[2]))
    t = table([('Linie und Variante', 'Line and variant'), ('Was am Gate passiert', 'What happens at the gate'), ('Herkunft', 'Origin')],
              rows, vis=5, cap=('Linien am Gate', 'Lines at the gate'), cls='nocap')
    return mark_ln(t)

def brief_table(gi):
    rows = []
    for asp, cont, kind, ref in BRIEF[gi]:
        rows.append([asp, cont, bds(kind), ref_cell(ref)])
    return table([('Aspekt', 'Aspect'), ('Inhalt', 'Content'), ('Herkunft', 'Origin'), ('Fundstelle', 'Where to find it')],
                 rows, vis=5, cap=('Das Gate in Kürze', 'The gate in brief'), cls='nocap')

DEEP = [
 (('Der Business Case vergleicht Optionen nach dem Five Case Model (strategisch, wirtschaftlich, kommerziell, finanziell, Management) und nimmt Nichtstun als Vergleich auf.', 'The business case compares options using the five case model (strategic, economic, commercial, financial, management) and includes doing nothing as a comparison.')),
 (('Ein Projektauftrag (im PMBOK-Umfeld: Project Charter) autorisiert das Projekt formal und benennt Ziele, Umfang, Rahmen und Befugnisse. Quelle: Sekundärliteratur, siehe Quellen.', 'A project charter (in PMBOK usage) formally authorises the project and names goals, scope, frame and authority. Source: secondary literature, see sources.')),
 (('Eine Basislinie ist ein abgestimmter Stand, gegen den Änderungen gemessen werden. Gute Anforderungen sind nach ISO/IEC/IEEE 29148 unter anderem eindeutig, prüfbar, vollständig und rückverfolgbar.', 'A baseline is an agreed state against which changes are measured. Good requirements per ISO/IEC/IEEE 29148 are, among other things, unambiguous, verifiable, complete and traceable.')),
 (('Das Lastenheft beschreibt, was der Auftraggeber braucht, das Pflichtenheft, wie der Auftragnehmer es umsetzt (DIN 69901-5, VDI 2519; Sekundärquelle, siehe Quellen).', 'The requirements document describes what the client needs, the functional specification how the contractor implements it (DIN 69901-5, VDI 2519; secondary source, see sources).')),
 (('Abnahme prüft gegen vorher festgelegte Kriterien. Im agilen Pfad entsteht ein Increment, das die Definition of Done erfüllt (Scrum Guide 2020).', 'Acceptance checks against criteria set beforehand. In the agile path a increment arises that meets the definition of done (Scrum Guide 2020).')),
 (('Ein Check-in ist kein Freigabe-Gate. Er zeigt, ob die Key Results auf Kurs liegen, und löst Nachsteuern aus. Die Freigabe fällt erst am Stage Gate.', 'A check-in is not an approval gate. It shows whether the key results are on course and triggers adjustment. Approval only happens at the stage gate.')),
 (('Am Stage Gate entscheidet die Sponsorin mit Kriterien und Zahlen. Die Ampel ist im Fall ein Vorschlag (Planungsannahme) und entscheidet nicht allein.', 'At the stage gate the sponsor decides with criteria and figures. The traffic light is a proposal in the case (planning assumption) and does not decide alone.')),
]

def gate_section(gi, trainer):
    code, de, en, tde, ten, qde, qen = GATES[gi]
    o = [f'<div class="gate" id="gate{gi}" data-g="{gi}">']
    o.append(f'<h3>{S(code + " " + de, code + " " + en)}</h3>')
    o.append(f'<p class="note">{S(tde, ten)}</p>')
    o.append(f'<p class="leit">{S(qde, qen)}</p>')
    o.append(str(H(4, 'Das Gate in Kürze', 'The gate in brief')))
    o.append(str(brief_table(gi)))
    o.append(str(H(4, 'Alle Linien an diesem Gate', 'All lines at this gate')))
    o.append(str(gate_lines_table(gi)))
    o.append(str(full(box('w', 'Vertiefung', 'Deep dive', P(DEEP[gi][0][0], DEEP[gi][0][1])))))
    o.append(str(H(4, 'Weiter in den Einzeldateien', 'Continue in the individual files')))
    o.append('<div class="golist">' + ''.join(link(k, a, d, e, trainer, gi) for k, a, d, e in LINKS[gi]) + '</div>')
    q = GROUPQ[gi]
    o.append(str(disc(q[0], q[1], trainer)))
    prev = '<button type="button" class="btn gnav" data-d="-1"' + (' disabled' if gi == 0 else '') + '>' + S('Voriges Gate', 'Previous gate') + '</button>'
    nxt = '<button type="button" class="btn gnav" data-d="1"' + (' disabled' if gi == len(GATES) - 1 else '') + '>' + S('Nächstes Gate', 'Next gate') + '</button>'
    o.append(f'<div class="gnavbar">{prev}{nxt}</div>')
    o.append('</div>')
    return ''.join(o)

# ---------- SVG ----------
SVGL = [
 (('Entscheidung', ''), ('Decision', ''), 'vor Monat 0', 'before month 0'),
 (('Projektauftrag', ''), ('Project', 'charter'), 'Monat 0', 'Month 0'),
 (('Anforderungsbasis', ''), ('Requirements', 'baseline'), 'Monat 1', 'Month 1'),
 (('Pflichtenheft', ''), ('Specification', ''), 'Monat 2', 'Month 2'),
 (('Abnahme und', 'Go-Live'), ('Acceptance and', 'go-live'), 'M3, M4', 'M3, M4'),
 (('Check-in', ''), ('Check-in', ''), 'M5 (Monat 9)', 'M5 (month 9)'),
 (('Stage Gate', ''), ('Stage gate', ''), 'M6 (Monat 12)', 'M6 (month 12)'),
]
def svg(sfx=''):
    ly = [62 + 26 * i for i in range(6)]
    xs = [112 + 148 * i for i in range(7)]
    W, Ht = 1120, 340
    x0, x1 = 28, W - 28
    o = [f'<svg viewBox="0 0 {W} {Ht}" role="img" aria-labelledby="gpT{sfx} gpD{sfx}" xmlns="http://www.w3.org/2000/svg">']
    o.append(f'<title id="gpT{sfx}" data-en="Gate plan Lindenfeld Lunch: seven gates, six lines">Gateplan Lindenfeld Lunch: sieben Gates, sechs Linien</title>')
    o.append(f'<desc id="gpD{sfx}" data-en="Metro-style plan from left to right. Six horizontal lines A, K, B, L, Ä and N run through seven gates G0 to G6, which act as interchange stations.">Plan im Stil eines Metro-Plans von links nach rechts. Sechs waagerechte Linien A, K, B, L, Ä und N laufen durch sieben Gates G0 bis G6, die als Umsteigebahnhöfe dienen.</desc>')
    for i, l in enumerate(LINES):
        y = ly[i]
        o.append(f'<line x1="{x0}" y1="{y}" x2="{x1}" y2="{y}" stroke="{l[2]}" stroke-width="8" stroke-linecap="round"/>')
        for xx in (x0, x1):
            o.append(f'<circle cx="{xx}" cy="{y}" r="13" fill="{l[2]}" stroke="#fff" stroke-width="2"/><text x="{xx}" y="{y + 5}" text-anchor="middle" class="s14w">{esc(l[1])}</text>')
    for gi, g in enumerate(GATES):
        x = xs[gi]; L = SVGL[gi]
        o.append(f'<g class="gp" data-g="{gi}" role="button" tabindex="0" aria-label="{esc(g[0] + " " + g[1])}">')
        o.append(f'<rect x="{x - 72}" y="30" width="144" height="300" fill="#fff" fill-opacity="0"/>')
        o.append(f'<rect x="{x - 17}" y="{ly[0] - 17}" width="34" height="{ly[-1] - ly[0] + 34}" rx="17" fill="#fff" stroke="#1F2A3A" stroke-width="3"/>')
        for i, l in enumerate(LINES):
            o.append(f'<circle cx="{x}" cy="{ly[i]}" r="5" fill="#fff" stroke="{l[2]}" stroke-width="3"/>')
        o.append(f'<text x="{x}" y="244" text-anchor="middle" class="s16">{esc(g[0])}</text>')
        o.append(f'<text x="{x}" y="266" text-anchor="middle" class="s16" data-en="{esc(L[1][0])}">{esc(L[0][0])}</text>')
        o.append(f'<text x="{x}" y="286" text-anchor="middle" class="s16" data-en="{esc(L[1][1])}">{esc(L[0][1])}</text>')
        o.append(f'<text x="{x}" y="312" text-anchor="middle" class="s15" data-en="{esc(L[3])}">{esc(L[2])}</text>')
        o.append('</g>')
    o.append('</svg>')
    return ''.join(o)

# ---------- Stationen ----------
def st_start(trainer):
    o = ['<section class="station on" id="st0">']
    o.append(f'<h2><span class="num">0</span>{S("Start: der Gateplan", "Start: the gate plan")}</h2>')
    o.append(P('Ein Gate ist ein Umsteigebahnhof: Hier wird entschieden, ob das Projekt weiterfährt. Die Linien zeigen, was dabei jeweils zusammenkommt. Du kommst von jeder Einzeldatei hierher zurück.',
               'A gate is an interchange station: here it is decided whether the project continues. The lines show what comes together each time. From every individual file you return here.', 'sub'))
    o.append(str(abbr('PA = Projektauftrag-und-Pflichtenheft-Tool · OP = offener Punkt · EM = Erfolgsmaß · GZ = Geschäftsziel · KR = Key Result · FR/NFR = funktionale/nicht-funktionale Anforderung · BA = Business Analyse · PM = Projektmanagement',
                      'PA = project charter and specification tool · OP = open point · EM = success measure · GZ = business goal · KR = key result · FR/NFR = functional/non-functional requirement · BA = business analysis · PM = project management')))
    o.append(f'<div class="svgw wide">{svg()}</div>')
    o.append(P('Tippe auf ein Gate im Plan oder gehe mit dem Knopf unten los.', 'Tap a gate in the plan or start with the button below.', 'note'))
    o.append('<div class="lg">' + ''.join(
        f'<div class="li"><span class="ldot" style="background:{l[2]}" aria-hidden="true">{esc(l[1])}</span><span><b>{S(l[4], l[5])}</b>{S(l[6], l[7])}</span></div>' for l in LINES) + '</div>')
    o.append('<p><button type="button" class="btn startgo on" data-s="1">' + S('Gate für Gate starten', 'Start gate by gate') + '</button> <button type="button" class="btn startgo" data-s="2">' + S('Netzplan öffnen', 'Open the network plan') + '</button></p>')
    o.append(str(box('q', 'So nutzt du den Plan', 'How to use the plan',
        Raw('<ol class="steps"><li>' + S('Wähle ein Gate und lies „Das Gate in Kürze“.', 'Choose a gate and read “The gate in brief”.') + '</li><li>' + S('Schau, was die sechs Linien am Gate bedeuten, und filtere mit „Meine Linie“.', 'See what the six lines mean at the gate and filter with “My line”.') + '</li><li>' + S('Öffne über die Knöpfe die passende Station in Case oder Pflichtenheft-Tool und komm mit „← Gateplan“ zurück.', 'Use the buttons to open the matching station in the case or the specification tool and return with “← Gate plan”.') + '</li><li>' + S('Prüfe dich in der Übung.', 'Test yourself in the exercise.') + '</li></ol>'))))
    o.append(str(box('w', 'Herkunft der Aussagen', 'Origin of statements',
        P('Jede Aussage trägt eine Herkunft: F = steht im Fall, R = abgeleitet (Rechnung oder Regel), A = Annahme, die zu validieren ist. Im Englischen: C = case, D = derived, A = assumption.',
          'Every statement carries an origin: C = in the case, D = derived (calculation or rule), A = assumption to be validated. In German: F = Fall, R = abgeleitet, A = Annahme.'),
        Raw('<p>' + str(bds('F')) + ' ' + str(bds('R')) + ' ' + str(bds('A')) + '</p>'))))
    o.append(str(full(box('w', 'Vertiefung: Warum Gates?', 'Deep dive: why gates?',
        P('Ein Gate bündelt Entscheidungen an festen Punkten. Der Scrum Guide 2020 kennt keine Gates; er verlangt aber Transparenz und Überprüfung in Sprint Review und Sprint Retrospective. Der Gateplan legt deshalb beide Sichtweisen auf dieselbe Zeitachse.',
          'A gate bundles decisions at fixed points. The Scrum Guide 2020 knows no gates; it does require transparency and inspection in the sprint review and sprint retrospective. The gate plan therefore puts both views on the same timeline.'),
        P('Hinweis: Refinement ist im Scrum Guide 2020 eine fortlaufende Tätigkeit und kein eigenes Event. In der Linie „Kommunikation agil“ stehen deshalb Events und Tätigkeiten.',
          'Note: In the Scrum Guide 2020 refinement is an ongoing activity, not a separate event. The line “Communication agile” therefore lists events and activities.')))))
    o.append(P('Beamer: Nutze „Gate für Gate“, der Netzplan ist für Bildschirm und Papier gedacht.', 'Projector: use “Gate by gate”; the network plan is meant for screen and paper.', 'note'))
    o.append('</section>')
    return ''.join(o)

def linebar():
    chips = [('', 'Alle', 'All')] + [(l[3], l[4], l[5]) for l in LINES]
    return Raw('<div class="fbar lnbar"><span class="fl">' + S('Meine Linie:', 'My line:') + '</span>' + ''.join(
        f'<button type="button" class="chip{" on" if not c[0] else ""}" data-f="{c[0]}">{S(c[1], c[2])}</button>' for c in chips) + '</div>')

def st_gates(trainer):
    o = ['<section class="station" id="st1">']
    o.append(f'<h2><span class="num">1</span>{S("Gate für Gate", "Gate by gate")}</h2>')
    o.append(P('Wähle ein Gate. Du siehst die Entscheidung, die Kriterien und was die sechs Linien dort bedeuten.', 'Choose a gate. You see the decision, the criteria and what the six lines mean there.', 'sub'))
    o.append(linebar())
    o.append('<div class="gbar" role="group" aria-label="Gates">' + ''.join(f'<button type="button" class="gsel" data-g="{i}" aria-pressed="false">{S(g[0] + " " + g[1], g[0] + " " + g[2])}</button>' for i, g in enumerate(GATES)) + '</div>')
    for gi in range(len(GATES)):
        o.append(gate_section(gi, trainer))
    o.append('</section>')
    return ''.join(o)

def mx_table():
    o = ['<div class="tw fx"><table class="tbl mx nocap"><caption>' + S('Netzplan: Linien und Gates', 'Network plan: lines and gates') + '</caption><thead><tr>']
    o.append('<th scope="col">' + S('Linie / Gate', 'Line / gate') + '</th>')
    for gi, g in enumerate(GATES):
        o.append(f'<th scope="col"><button type="button" class="gjump" data-g="{gi}"><b>{S(g[0], g[0])}</b>{S(g[1].replace('Anforderungsbasis', 'Anforderungs\u00adbasis'), g[2])}</button></th>')
    o.append('</tr></thead>')
    def tr(v):
        row = [f'<tr data-ln="{v[2]}"><td>{line_label(v)}</td>']
        for gi in range(len(GATES)):
            c = CELLS[v[0]][gi]
            row.append(f'<td>{S(c[0], c[1])}<br>{bds(c[2])}</td>')
        row.append('</tr>')
        return ''.join(row)
    o.append('<tbody>' + ''.join(tr(v) for v in VARIANTS[:5]) + '</tbody>')
    o.append('<tbody class="more">' + ''.join(tr(v) for v in VARIANTS[5:]) + '</tbody>')
    o.append('</table></div>')
    o.append('<div class="mrow"><button type="button" class="btn morebtn" aria-expanded="false">' + S('Alle 9 Zeilen zeigen', 'Show all 9 rows', cls='lm') + S('Weniger zeigen', 'Show less', cls='ll') + '</button></div>')
    return ''.join(o)

def st_net(trainer):
    o = ['<section class="station" id="st2">']
    o.append(f'<h2><span class="num">2</span>{S("Netzplan", "Network plan")}</h2>')
    o.append(P('Neun Zeilen, sieben Gates: so siehst du auf einen Blick, was an welchem Gate in welcher Linie passiert. Tippe auf ein Gate in der Kopfzeile, um es im Detail zu öffnen.',
               'Nine rows, seven gates: see at a glance what happens at which gate in which line. Tap a gate in the header row to open it in detail.', 'sub'))
    o.append(linebar())
    o.append(P('Mit „Meine Linie“ blendest du alle anderen Zeilen aus. Auf dem Telefon wischst du seitlich.', 'With “My line” you hide all other rows. On a phone, swipe sideways.', 'note'))
    o.append(f'<div class="svgw wide">{svg("n")}</div>')
    o.append(mx_table())
    o.append(str(disc(('Welche zwei Zeilen hängen am stärksten zusammen, und warum?', 'Which two rows are most closely linked, and why?'),
                      [('Zum Beispiel „Artefakte klassisch“ und „Änderung“: Jede Änderung (CR-01) läuft durch die Artefakte, bis eine neue Basislinie entsteht. Ebenso „Nutzen“ und „Blickwinkel BA“: Beide fragen am Ende, ob der gemessene Nutzen zum Business Case passt.',
                        'For example “Artifacts classic” and “Change”: every change (CR-01) runs through the artifacts until a new baseline arises. Likewise “Benefit” and “Viewpoint BA”: both finally ask whether the measured benefit matches the business case.')], trainer)))
    o.append('</section>')
    return ''.join(o)

def st_quiz():
    qs = [
     dict(q=('Was macht ein Gate zu einem Gate und nicht zu einer gewöhnlichen Besprechung?', 'What makes a gate a gate and not an ordinary meeting?'),
          opts=[('Es sind mehr Personen eingeladen.', 'More people are invited.'), ('Es gibt ein Protokoll.', 'There are minutes.'),
                ('Es endet mit einer Entscheidung nach vorher festgelegten Kriterien.', 'It ends with a decision based on criteria set beforehand.'),
                ('Es findet immer am Monatsende statt.', 'It always takes place at the end of the month.')], ok=2,
          expl=('Ein Gate ist ein Entscheidungspunkt: weiter, anpassen oder stoppen, gemessen an Kriterien, die vorher bekannt sind.', 'A gate is a decision point: continue, adjust or stop, measured against criteria known beforehand.')),
     dict(q=('Welche Linie fragt: „Woran messen wir, dass sich der Aufwand gelohnt hat?“', 'Which line asks: “How do we measure that the effort was worthwhile?”'),
          opts=[('Nutzen (N)', 'Benefit (N)'), ('Änderung (Ä)', 'Change (C)'), ('Leitplanken (L)', 'Guardrails (L)'), ('Kommunikation (K)', 'Communication (K)')], ok=0,
          expl=('Die Linie Nutzen führt von Break-even und Geschäftszielen über die Key Results bis zu den gemessenen Werten am Stage Gate.', 'The benefit line leads from break-even and business goals via the key results to the measured values at the stage gate.')),
     dict(q=('Welche Aussage zum Scrum Guide 2020 stimmt?', 'Which statement about the Scrum Guide 2020 is correct?'),
          opts=[('Er schreibt Stage Gates zwischen den Sprints vor.', 'It prescribes stage gates between sprints.'), ('Refinement ist eines der fünf Events.', 'Refinement is one of the five events.'),
                ('Das Daily Scrum ist ein Statusbericht an die Sponsorin.', 'The daily scrum is a status report to the sponsor.'),
                ('Jedes Artefakt hat eine Verpflichtung: Product Goal, Sprint Goal, Definition of Done.', 'Each artifact has a commitment: product goal, sprint goal, definition of done.')], ok=3,
          expl=('Product Backlog, Sprint Backlog und Increment haben je eine Verpflichtung. Refinement ist eine Tätigkeit, kein Event, und das Daily Scrum dient dem Team.', 'Product backlog, sprint backlog and increment each have a commitment. Refinement is an activity, not an event, and the daily scrum serves the team.')),
     dict(q=('Am Gate G2 hat FR-14 weder Story noch Testfall. Was ist die beste Reaktion?', 'At gate G2 FR-14 has neither story nor test case. What is the best reaction?'),
          opts=[('FR-14 stillschweigend streichen.', 'Silently delete FR-14.'), ('Als offenen Punkt mit Eigentümer führen und Story samt Test ergänzen oder bewusst zurückstellen.', 'Keep it as an open point with an owner and add story and test or consciously postpone.'),
                ('Das Gate bestehen und den Test erst nach dem Go-Live schreiben.', 'Pass the gate and write the test only after go-live.'), ('Das Gate verschieben, bis alles perfekt ist.', 'Postpone the gate until everything is perfect.')], ok=1,
          expl=('Eine Lücke sichtbar zu machen ist besser als sie zu verstecken. So steht es im Pflichtenheft als offener Punkt OP-07.', 'Making a gap visible beats hiding it. This is how it appears in the specification as open point OP-07.')),
     dict(q=('Wer entscheidet am Stage Gate G6 über Release 2?', 'Who decides about release 2 at stage gate G6?'),
          opts=[('Tim Falkner allein, weil er baut.', 'Tim Falkner alone, because he builds.'), ('Das Team per Abstimmung.', 'The team by vote.'),
                ('Die Sponsorin Heike Brandl, auf Basis gemessener Werte; Abweichungen von der Ampel begründet sie schriftlich.', 'The sponsor Heike Brandl, based on measured values; she justifies deviations from the traffic light in writing.'),
                ('Die Ampel entscheidet automatisch.', 'The traffic light decides automatically.')], ok=2,
          expl=('Im Fall entscheidet die Sponsorin. Die Ampel ist ein Vorschlag und entscheidet nicht allein.', 'In the case the sponsor decides. The traffic light is a proposal and does not decide alone.')),
     dict(q=('CR-01 erhöht den Vorlauf von 60 auf 90 Minuten. Was geschieht danach mit den Artefakten?', 'CR-01 raises the lead time from 60 to 90 minutes. What happens to the artifacts afterwards?'),
          opts=[('Nur der Code wird angepasst.', 'Only the code is adapted.'), ('Alle betroffenen Artefakte werden geändert, und es entsteht die Basislinie v1.1.', 'All affected artifacts are changed and baseline v1.1 arises.'),
                ('Die Änderung wird im Chat vermerkt.', 'The change is noted in chat.'), ('Die Rückverfolgungsmatrix wird gelöscht.', 'The traceability matrix is deleted.')], ok=1,
          expl=('Im Fall findet die Auswirkungsanalyse sieben betroffene Artefakte, die gemeinsam in der Basislinie v1.1 geändert werden.', 'In the case the impact analysis finds seven affected artifacts, which are changed together in baseline v1.1.')),
    ]
    return qs

def st_quizst():
    o = ['<section class="station" id="st3">']
    o.append(f'<h2><span class="num">3</span>{S("Übung", "Exercise")}</h2>')
    o.append(P('Sechs Fragen, jeweils eine nach der anderen. Nach deiner Wahl siehst du sofort die richtige Antwort und die Erklärung.', 'Six questions, one at a time. After your choice you immediately see the correct answer and the explanation.', 'sub'))
    o.append(str(quiz(('Gateplan-Übung', 'Gate plan exercise'), st_quiz())))
    o.append('</section>')
    return ''.join(o)

def case_row(a, d, e, gates, trainer):
    return [Raw(link('c', a, d, e, trainer)), gates]

def st_map(trainer):
    o = ['<section class="station" id="st4">']
    o.append(f'<h2><span class="num">4</span>{S("Mappe", "Folder")}</h2>')
    o.append(P('Alle Teile im Überblick. Die Teile öffnen sich direkt hier in der Seite; „← Gateplan“ bringt dich zurück.', 'All parts at a glance. The parts open right here in the page; “← Gate plan” takes you back.', 'sub'))
    rows = [[Raw(link('c', '', 'BA/RE-Case Lindenfeld Lunch', 'BA/RE case Lindenfeld Lunch', trainer)), ('Der ganze Fall in 12 Stationen', 'The whole case in 12 stations')],
            [Raw(link('p', '', 'Projektauftrag und Pflichtenheft', 'Project charter and specification', trainer)), ('Zwei abgeleitete Dokumente für Release 1', 'Two derived documents for release 1')],
            [Raw('<a href="Handout_Lindenfeld-Gateplan.pdf" download>' + S('Handout als PDF', 'Handout as PDF') + '<span aria-hidden="true">&nbsp;↓</span></a>'), ('Zehn Seiten zum Mitnehmen für Teilnehmende, ohne Musterantworten', 'Ten pages to take away for participants, without model answers')]]
    o.append(str(table([('Datei', 'File'), ('Wofür', 'Purpose')], rows, vis=5, cap=('Dateien', 'Files'), cls='nocap')))
    o.append(str(H(4, 'Stationen im Case', 'Stations in the case')))
    rows = [case_row(a, d, e, g, trainer) for a, d, e, g in CASE_ST]
    rows = [[r[0], (r[1], r[1])] for r in rows]
    o.append(str(table([('Station öffnen', 'Open station'), ('Gates', 'Gates')], rows, vis=5, cap=('Case-Stationen', 'Case stations'), cls='nocap')))
    o.append(str(H(4, 'Stationen im Pflichtenheft-Tool', 'Stations in the specification tool')))
    rows = [[Raw(link('p', a, d, e, trainer)), (g, g)] for a, d, e, g in PA_ST]
    o.append(str(table([('Station öffnen', 'Open station'), ('Gates', 'Gates')], rows, vis=5, cap=('Stationen Pflichtenheft', 'Specification stations'), cls='nocap')))
    o.append('</section>')
    return ''.join(o)

GLOSS = [
 ('Abnahme', 'Acceptance', 'Förmliche Prüfung gegen vorher festgelegte Kriterien, mit Entscheidung.', 'Formal check against criteria set beforehand, with a decision.'),
 ('Akzeptanzkriterien', 'Acceptance criteria', 'Bedingungen, unter denen eine Story als erfüllt gilt (Gegeben, Wenn, Dann).', 'Conditions under which a story counts as met (given, when, then).'),
 ('Annahme', 'Assumption', 'Aussage, die nicht belegt ist und validiert werden muss.', 'Statement that is not proven and must be validated.'),
 ('Basislinie', 'Baseline', 'Abgestimmter Stand, gegen den Änderungen gemessen werden.', 'Agreed state against which changes are measured.'),
 ('Business Case', 'Business case', 'Begründung einer Investition mit Optionen, Nutzen und Kosten.', 'Justification of an investment with options, benefits and costs.'),
 ('Check-in', 'Check-in', 'Zwischenprüfung der Key Results; steuert nach, gibt aber nichts frei.', 'Interim check of the key results; adjusts but approves nothing.'),
 ('Definition of Done', 'Definition of done', 'Gemeinsame Qualitätsvereinbarung für ein Increment (Scrum Guide 2020).', 'Shared quality agreement for an increment (Scrum Guide 2020).'),
 ('Epic', 'Epic', 'Große Anforderung, die in Stories zerlegt wird.', 'Large requirement that is split into stories.'),
 ('Gate', 'Gate', 'Entscheidungspunkt mit festen Kriterien: weiter, anpassen oder stoppen.', 'Decision point with fixed criteria: continue, adjust or stop.'),
 ('Increment', 'Increment', 'Nutzbares Ergebnis eines Sprints, das die Definition of Done erfüllt.', 'Usable result of a sprint that meets the definition of done.'),
 ('Key Result', 'Key result', 'Messbares Ergebnis, das zeigt, ob ein Objective erreicht wird.', 'Measurable result that shows whether an objective is reached.'),
 ('Lastenheft', 'Requirements document', 'Beschreibt, was der Auftraggeber braucht (Anforderungsbasis).', 'Describes what the client needs (requirements baseline).'),
 ('Leitplanke', 'Guardrail', 'Rechtliche oder vereinbarte Grenze, die einzuhalten ist, etwa Datenschutz oder Mitbestimmung.', 'Legal or agreed limit that must be respected, such as data protection or co-determination.'),
 ('Meilenstein', 'Milestone', 'Wichtiger Punkt im Plan, etwa M0 bis M6.', 'Important point in the plan, such as M0 to M6.'),
 ('OKR', 'OKR', 'Objectives and Key Results: Ziele mit messbaren Ergebnissen.', 'Objectives and key results: goals with measurable outcomes.'),
 ('Pflichtenheft', 'Functional specification', 'Beschreibt, wie der Auftragnehmer die Anforderungen umsetzt und prüft.', 'Describes how the contractor implements and verifies the requirements.'),
 ('Product Backlog', 'Product backlog', 'Geordnete Liste dessen, was für das Produkt gebraucht wird (Scrum Guide 2020).', 'Ordered list of what is needed for the product (Scrum Guide 2020).'),
 ('Product Goal', 'Product goal', 'Langfristiges Ziel des Produkts; Verpflichtung des Product Backlog.', 'Long-term goal of the product; commitment of the product backlog.'),
 ('Projektauftrag', 'Project charter', 'Autorisiert das Projekt und legt Ziele, Umfang, Rahmen und Befugnisse fest.', 'Authorises the project and sets goals, scope, frame and authority.'),
 ('Rückverfolgbarkeit', 'Traceability', 'Verknüpfung von Ziel, Anforderung, Story und Testfall.', 'Link between goal, requirement, story and test case.'),
 ('Sprint Goal', 'Sprint goal', 'Ziel des Sprints; Verpflichtung des Sprint Backlog.', 'Goal of the sprint; commitment of the sprint backlog.'),
 ('Stage Gate', 'Stage gate', 'Gate, an dem über die nächste Stufe entschieden wird, hier Release 2.', 'Gate at which the next stage is decided, here release 2.'),
]
SRC = [
 ('Scrum Guide 2020', 'https://scrumguides.org/scrum-guide.html', 'Events, Artefakte und Verpflichtungen im Scrum.', 'Events, artifacts and commitments in Scrum.'),
 ('ISO/IEC/IEEE 29148:2018, Requirements engineering', 'https://www.iso.org/standard/72089.html', 'Eigenschaften guter Anforderungen. Veröffentlicht, Überarbeitung angekündigt; geprüft am 21.10.2026.', 'Characteristics of good requirements. Published, revision announced; checked on 21 October 2026.'),
 ('ISO/IEC 25010:2023, Product quality model', 'https://www.iso.org/standard/78176.html', 'Qualitätsmerkmale für nicht-funktionale Anforderungen; geprüft am 21.10.2026.', 'Quality characteristics for non-functional requirements; checked on 21 October 2026.'),
 ('Lexware: Pflichtenheft (Sekundärquelle zu DIN 69901-5 und VDI 2519)', 'https://www.lexware.de/wissen/unternehmerlexikon/pflichtenheft/', 'Abgrenzung Lastenheft und Pflichtenheft; Sekundärquelle, Norm im Original prüfen.', 'Distinction between requirements document and specification; secondary source, check the original standard.'),
 ('Wikipedia: Project charter (Sekundärquelle zum PMBOK)', 'https://en.wikipedia.org/wiki/Project_charter', 'Zweck eines Projektauftrags; Sekundärquelle.', 'Purpose of a project charter; secondary source.'),
 ('BABOK Guide v3 und IREB', 'https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/', 'Grundlage der Facetten und Techniken; Abschnitt je nach Thema im Original prüfen.', 'Basis of facets and techniques; check the section in the original per topic.'),
]

def st_gloss():
    o = ['<section class="station" id="st5">']
    o.append(f'<h2><span class="num">5</span>{S("Glossar und Quellen", "Glossary and sources")}</h2>')
    o.append(P('Alphabetisch geordnet. Gate-Codes G0 bis G6 stehen oben im Plan.', 'In alphabetical order. The gate codes G0 to G6 are in the plan at the top.', 'sub'))
    o.append('<dl class="gl" id="gl">')
    for d, e, dd, de in GLOSS:
        o.append(f'<div class="gl-item" data-k-de="{esc(d)}" data-k-en="{esc(e)}"><dt>{S(d, e)}</dt><dd>{S(dd, de)}</dd></div>')
    o.append('</dl>')
    o.append(str(H(3, 'Quellen', 'Sources')))
    o.append('<ul class="srcs">' + ''.join(f'<li><a href="{u}">{esc(t)}</a><br>{S(a, b)}</li>' for t, u, a, b in SRC) + '</ul>')
    o.append(P('Fiktiver Trainingsfall. Keine Rechtsberatung. Normen am 21.10.2026 geprüft; vor dem Einsatz im Seminar erneut prüfen.', 'Fictional training case. No legal advice. Standards checked on 21 October 2026; check again before using in a seminar.', 'note'))
    o.append('</section>')
    return ''.join(o)

SYSPROMPT = ('Rolle: Du baust eine einzelne, vollständig offline lauffähige HTML-Startseite (Gateplan) für das Seminar-Set „Lindenfeld Lunch“.\n\n'
 'Eingabe: der Fall „BA/RE-Case: Lindenfeld Lunch“ und das Tool „Projektauftrag und Pflichtenheft“. Erfinde keine Fallwerte. Jede Aussage trägt eine Herkunft: Fall, Abgeleitet oder Annahme.\n\n'
 'Struktur (sechs Stationen): Start mit Metro-Plan · Gate für Gate (G0 bis G6) · Netzplan (neun Zeilen mal sieben Gates) · Übung · Mappe mit Verweisen · Glossar und Quellen.\n'
 'Linien: Artefakte, Kommunikation, Blickwinkel, Leitplanken, Änderung, Nutzen. Filter „Meine Linie“. Tabellen zeigen 3 bis 5 Zeilen, der Rest klappt auf.\n'
 'Verweise: relative Links mit Anker in Case und Pflichtenheft; in den Einzeldateien führt „← Gateplan“ zurück. Alle Dateien liegen in einem Ordner.\n'
 'Pflichtbausteine: Signatur oben rechts, Beamer-Schalter in vier Stufen, Sprachschalter DE/EN, Vertiefungsschalter, Footer mit vier Boxen (nur Trainerversion).\n'
 'Nicht tun: Fallwerte erfinden, Annahmen unmarkiert lassen, Rechtsberatung geben, Zeitpläne einbauen.\n'
 'Ausgabe: zwei Dateien, Trainerversion und Teilnehmendenversion (ohne Footer, ohne „Alle auflösen“, ohne Musterantworten).')
SYSPROMPT_EN = ('Role: You build a single, fully offline HTML start page (gate plan) for the seminar set “Lindenfeld Lunch”.\n\n'
 'Input: the case “BA/RE Case: Lindenfeld Lunch” and the tool “Project Charter and Functional Specification”. Do not invent case values. Every statement carries an origin: case, derived or assumption.\n\n'
 'Structure (six stations): start with metro plan · gate by gate (G0 to G6) · network plan (nine rows times seven gates) · exercise · folder with links · glossary and sources.\n'
 'Lines: artifacts, communication, viewpoints, guardrails, change, benefit. Filter “My line”. Tables show 3 to 5 rows, the rest unfolds.\n'
 'Links: relative links with anchors into case and specification; in the individual files “← Gate plan” leads back. All files sit in one folder.\n'
 'Mandatory blocks: signature top right, beamer toggle in four levels, language toggle DE/EN, depth toggle, footer with four boxes (trainer version only).\n'
 'Do not: invent case values, leave assumptions unmarked, give legal advice, build time schedules.\n'
 'Output: two files, trainer version and participant version (without footer, without “reveal all”, without model answers).')

from footer_text import SYSPROMPT, SYSPROMPT_EN, HANDBOOK, SCRIPT, REGIE

def footer():
    boxes = []
    def box_(t_de, t_en, body):
        return f'<details class="footer-box"><summary class="footer-summary">{S(t_de, t_en)}</summary><div class="footer-content footer-sans">{body}</div></details>'
    boxes.append(box_('Systemprompt', 'System prompt', f'<div class="footer-mono" data-en="{esc(SYSPROMPT_EN)}">{esc(SYSPROMPT)}</div>'))
    hb = '<ul>' + ''.join(f'<li>{S(a, b)}</li>' for a, b in HANDBOOK) + '</ul>'
    boxes.append(box_('Handbuch', 'Handbook', hb))
    TEN = {'Start': 'Start', 'Gate für Gate': 'Gate by gate', 'Tiefe': 'Depth', 'Netzplan und Linienfilter': 'Network plan and line filter', 'Übung': 'Exercise', 'Abschluss': 'Closing'}
    sk = ''.join('<p><strong>' + S(x[0] + ':', TEN[x[0]] + ':') + '</strong> <em>' + S(x[1], x[4]) + '</em> ' + S('„' + x[2] + '“', '“' + x[5] + '”') + (' ' + S(x[3], x[6]) if x[3] else '') + '</p>' for x in SCRIPT)
    sk += '<p><em>' + S(REGIE[0], REGIE[1]) + '</em></p>'
    boxes.append(box_('Vortrags-Skript', 'Speaker script', sk))
    reg = ('<table><thead><tr><th>' + S('Norm oder Quelle', 'Standard or source') + '</th><th>' + S('Stand', 'Status') + '</th><th>' + S('Geprüft', 'Checked') + '</th></tr></thead><tbody>'
           '<tr><td>ISO/IEC/IEEE 29148:2018</td><td>' + S('veröffentlicht, Überarbeitung angekündigt', 'published, revision announced') + '</td><td>21.10.2026</td></tr>'
           '<tr><td>ISO/IEC 25010:2023</td><td>' + S('veröffentlicht', 'published') + '</td><td>21.10.2026</td></tr>'
           '<tr><td>Scrum Guide 2020</td><td>' + S('aktuelle Fassung', 'current version') + '</td><td>21.10.2026</td></tr>'
           '<tr><td>DIN 69901-5, VDI 2519</td><td>' + S('nur über Sekundärquelle geprüft', 'checked via secondary source only') + '</td><td>21.10.2026</td></tr>'
           '<tr><td>PMBOK (Project Charter)</td><td>' + S('nur über Sekundärquelle geprüft', 'checked via secondary source only') + '</td><td>21.10.2026</td></tr>'
           '</tbody></table>')
    boxes.append(box_('Normen-Register', 'Standards register', reg))
    return ('<footer class="footer"><p class="footer-sig">' + S('Fiktiver Trainingsfall. Keine Rechtsberatung. Michaela Kühn · www.michaela-kuehn.com', 'Fictional training case. No legal advice. Michaela Kühn · www.michaela-kuehn.com') + '</p>' + ''.join(boxes) + '</footer>')

def page(trainer):
    lib._qid[0] = 0
    tabs = [('Start', 'Start'), ('Gate für Gate', 'Gate by gate'), ('Netzplan', 'Network plan'), ('Übung', 'Exercise'), ('Mappe', 'Folder'), ('Glossar und Quellen', 'Glossary and sources')]
    chips = [('', 'Alle', 'All')] + [(l[3], l[4], l[5]) for l in LINES]
    h = ['<!DOCTYPE html>\n<html lang="de" data-depth="short">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<meta name="color-scheme" content="light">\n'
         '<title>Lindenfeld Lunch · Gateplan</title>\n<script>document.documentElement.className+=\' js\';</script>\n<style>\n' + CSS + EXTRA_CSS + ZOOM_CSS + '</style>\n</head>\n<body>\n']
    h.append('<div class="hdr"><span class="t">' + S('Lindenfeld Lunch · Gateplan', 'Lindenfeld Lunch · Gate plan') + '</span></div>\n')
    h.append('<a class="sig" href="https://www.michaela-kuehn.com">Michaela Kühn · www.michaela-kuehn.com</a>\n')
    ftabs = [('hub', 'Gateplan', 'Gate plan'), ('c', 'BA/RE-Case', 'BA/RE case'), ('p', 'Projektauftrag und Pflichtenheft', 'Project charter and specification')]
    h.append('<div class="filebar"><div class="ftabs" role="tablist">' + ''.join(
        f'<button type="button" class="ftab{" on" if f[0] == "hub" else ""}" data-file="{f[0]}" role="tab">{S(f[1], f[2])}</button>' for f in ftabs) + '</div>'
        '<div class="ctl2"><button type="button" class="btn" id="langBtn">EN</button><button type="button" class="btn" id="depthBtn">Vertiefung: Kurz</button><button type="button" class="btn beamer-btn" id="beamerBtn">☀ Beamer</button>'
        + ('<button type="button" class="btn" id="revealAll">' + S('Alle auflösen', 'Reveal all answers') + '</button>' if trainer else '') + '</div></div>\n')
    nav_c = ''.join(f'<button type="button" class="snv" data-k="c" data-a="{a}">{S(d, e)}</button>' for a, d, e, g in CASE_ST)
    nav_p = ''.join(f'<button type="button" class="snv" data-k="p" data-a="{a}">{S(d, e)}</button>' for a, d, e, g in PA_ST)
    h.append('<div class="layout" data-file="hub"><nav class="side" aria-label="Inhalte">'
             '<div class="tabs" id="navHub" role="tablist">' + ''.join(f'<button type="button" class="tab{" on" if i == 0 else ""}" data-s="{i}" role="tab">{S(a, b)}</button>' for i, (a, b) in enumerate(tabs)) + '</div>'
             f'<div class="snvlist" id="navC" hidden>{nav_c}</div><div class="snvlist" id="navP" hidden>{nav_p}</div></nav>'
             '<div class="content">\n<main>\n' + st_start(trainer) + '\n' + st_gates(trainer) + '\n' + st_net(trainer) + '\n' + st_quizst() + '\n' + st_map(trainer) + '\n' + st_gloss() + '\n</main>\n'
             '<iframe id="frC" class="fr" hidden title="BA/RE-Case"></iframe><iframe id="frP" class="fr" hidden title="Projektauftrag und Pflichtenheft"></iframe></div></div>\n')
    if trainer:
        h.append(footer() + '\n')
    emb = {'c': open(os.path.join(EMB_DIR, CASE_F), encoding='utf8').read(), 'p': open(os.path.join(EMB_DIR, PA_T if trainer else PA_P), encoding='utf8').read()}
    h.append('<script>window.__EMB=' + json.dumps(emb, ensure_ascii=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029') + ';</script>\n')
    h.append('<script>' + JS + '</script>\n<script>' + EXTRA_JS + '</script>\n' + ZOOM_JS + '</body>\n</html>\n')
    return ''.join(h)

if __name__ == '__main__':
    out = DST_DIR
    os.makedirs(out, exist_ok=True)
    for tr, name in ((True, HUB_T), (False, HUB_P)):
        t = page(tr)
        open(os.path.join(out, name), 'w', encoding='utf8').write(t)
        print(name, len(t))
