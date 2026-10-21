import html as _h

def esc(s): return _h.escape(s, quote=True)

class Raw(str): pass

def S(de, en=None, tag='span', cls=None):
    c = f' class="{cls}"' if cls else ''
    if en is None:
        return f'<{tag}{c}>{esc(de)}</{tag}>'
    return f'<{tag}{c} data-en="{esc(en)}">{esc(de)}</{tag}>'

def cell(x):
    if isinstance(x, Raw): return str(x)
    if isinstance(x, tuple): return S(x[0], x[1])
    return esc(x)

BD = {'F': ('Fall', 'Case', 'bd-f'), 'R': ('Abgeleitet', 'Derived', 'bd-r'), 'A': ('Annahme', 'Assumption', 'bd-a')}
def bd(kind, ref=''):
    de, en, c = BD[kind]
    r = f' · {esc(ref)}' if ref else ''
    return Raw(f'<span class="bd {c}">{S(de, en)}{r}</span>')

BDS = {'F': ('F', 'C', 'bd-f', 'Fall', 'Case'), 'R': ('R', 'D', 'bd-r', 'Abgeleitet', 'Derived'), 'A': ('A', 'A', 'bd-a', 'Annahme', 'Assumption')}
def bds(kind):
    de, en, c, lde, len_ = BDS[kind]
    return Raw(f'<span class="bd bd-s {c}" title="{esc(lde)} / {esc(len_)}">{S(de, en)}</span>')

def table(headers, rows, vis=5, cap=None, cls=''):
    out = ['<div class="tw">', f'<table class="tbl {cls}">']
    if cap: out.append(f'<caption>{cell(cap)}</caption>')
    out.append('<thead><tr>' + ''.join(f'<th>{cell(h)}</th>' for h in headers) + '</tr></thead>')
    def tr(r):
        if isinstance(r, tuple) and len(r) == 2 and isinstance(r[0], list): cells, fac = r
        else: cells, fac = r, ''
        f = f' data-f="{fac}"' if fac else ''
        return f'<tr{f}>' + ''.join(f'<td>{cell(c)}</td>' for c in cells) + '</tr>'
    out.append('<tbody>' + ''.join(tr(r) for r in rows[:vis]) + '</tbody>')
    more = rows[vis:]
    if more:
        out.append('<tbody class="more">' + ''.join(tr(r) for r in more) + '</tbody>')
    out.append('</table></div>')
    if more:
        n = len(rows)
        out.append('<div class="mrow"><button type="button" class="btn morebtn" aria-expanded="false">'
                   + S(f'Alle {n} Zeilen zeigen', f'Show all {n} rows', cls='lm')
                   + S('Weniger zeigen', 'Show less', cls='ll') + '</button></div>')
    return Raw(''.join(out))

def P(de, en, cls=None): return Raw(S(de, en, 'p', cls))
def H(level, de, en): return Raw(S(de, en, f'h{level}'))
def full(*blocks): return Raw('<div class="d-full">' + ''.join(str(b) for b in blocks) + '</div>')

def box(kind, de_title, en_title, *blocks):
    return Raw(f'<div class="box box-{kind}"><div class="bt">{S(de_title, en_title)}</div>' + ''.join(str(b) for b in blocks) + '</div>')

def bf(items):
    lis = ''.join(f'<li>{S(d, e)}</li>' for d, e in items)
    return Raw('<div class="box box-q"><div class="bt">' + S('Beispielfragen für dein nächstes Gespräch', 'Sample questions for your next conversation') + f'</div><ul>{lis}</ul></div>')

def disc(q, a, trainer=True):
    out = ['<div class="box box-d"><div class="bt">' + S('Zur Diskussion', 'For discussion') + '</div>' + S(q[0], q[1], 'p')]
    if trainer:
        out.append('<button type="button" class="btn ansbtn">' + S('Musterantwort anzeigen', 'Show model answer', cls='a1') + S('Musterantwort ausblenden', 'Hide model answer', cls='a2') + '</button>')
        out.append('<div class="ansbox" hidden>' + ''.join(S(x[0], x[1], 'p') for x in a) + '</div>')
    out.append('</div>')
    return Raw(''.join(out))

def abbr(de, en):
    return Raw('<p class="abbr">' + S('Kürzel in dieser Station: ' + de, 'Abbreviations in this station: ' + en) + '</p>')

_qid = [0]
def quiz(title, questions):
    _qid[0] += 1
    qid = f'qz{_qid[0]}'
    n = len(questions)
    o = [f'<div class="quiz" id="{qid}" data-n="{n}">',
         f'<div class="qhead"><b>{S(*title)}</b> <span class="qctr">{S("Frage", "Question")} <span class="qi">1</span> {S("von", "of")} {n}</span></div>']
    for i, q in enumerate(questions):
        okd = q['ok']; alt = q.get('alt')
        o.append(f'<div class="qq" data-i="{i}"' + (' hidden' if i else '') + '>')
        o.append(S(q['q'][0], q['q'][1], 'p', 'qtext'))
        o.append('<div class="opts">')
        for j, opt in enumerate(q['opts']):
            v = '1' if j == okd else ('2' if j == alt else '0')
            o.append(f'<button type="button" class="opt" data-ok="{v}">{S(*opt)}</button>')
        o.append('</div>')
        o.append('<div class="fb" hidden>')
        o.append('<p class="fbv"><span class="v1">' + S('✔ Richtig.', '✔ Correct.') + '</span><span class="v2">' + S('≈ Ebenfalls vertretbar.', '≈ Also acceptable.') + '</span><span class="v0">' + S('✘ Nicht ganz.', '✘ Not quite.') + '</span></p>')
        o.append('<p class="fbr"><b>' + S('Richtige Antwort', 'Correct answer') + ':</b> ' + S(*q['opts'][okd]) + '</p>')
        if alt is not None:
            o.append('<p class="fba"><b>' + S('Ebenfalls vertretbar', 'Also acceptable') + ':</b> ' + S(*q['opts'][alt]) + '</p>')
        o.append(S(q['expl'][0], q['expl'][1], 'p', 'fbe'))
        o.append('</div></div>')
    o.append('<div class="qsum" hidden>' + S('Geschafft: ', 'Done: ') + '<b class="qs">0</b> ' + S('von', 'of') + f' {n} ' + S('richtig beim ersten Versuch.', 'correct on the first try.') + '</div>')
    o.append('<div class="qnav"><button type="button" class="btn qprev" disabled>' + S('Zurück', 'Back') + '</button><button type="button" class="btn qnext" disabled>' + S('Weiter', 'Next') + '</button></div>')
    o.append('</div>')
    return Raw(''.join(o))
