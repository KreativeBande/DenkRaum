#!/usr/bin/env python3
"""Gibt jedem Eintrag in den Lindenfeld-Falldokumenten eine statische id (z. B. id="FR-06"), damit
Links wie ba-re-case-lindenfeld-lunch.html#US-06 direkt zur Stelle springen (genutzt u. a. von
tools/change-schleuse.html). Setzt dazu das Sprung-Skript anchor.js ein (Station/Reiter aktivieren,
eingeklappte Tabellen öffnen, scrollen, kurz hervorheben). Idempotent.

Aufruf (aus tools/gateplan-build):
    python3 anchor_build.py
Danach den Gateplan neu bauen (bettet Case und Pflichtenheft ein), siehe README.md.

Regeln:
- BA/RE-Case: dieselben „Heimat“-Stellen wie registerHomes() im Case (erste Tabellenzeile in der
  Heimat-Station bzw. Use-Case-/Story-Karte); die id sitzt auf der ersten Zelle bzw. der Kartenüberschrift,
  weil der Case zur Laufzeit id="ref-…" auf Zeile/Karte setzt.
- Projektauftrag/Pflichtenheft (beide Fassungen): erste Tabellenzeile, deren erste Zelle mit dem Kürzel
  beginnt; bevorzugt in der Station, die auch das Kürzel-Fenster (idx_data.json) ansteuert.
- Steckbrief: GZ-1 bis GZ-4 als Anker am Feld „Business-Ziel“, BC an der Überschrift des Business Case.
"""
import json, os, re
from html.parser import HTMLParser

B = os.path.dirname(os.path.abspath(__file__))
T = os.path.abspath(os.path.join(B, '..'))
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
TEXT_TAGS = {'td', 'th', 'h4', 'strong'}


class El:
    __slots__ = ('tag', 'attrs', 'start', 'parent', 'kids', 'text')

    def __init__(self, tag, attrs, start, parent):
        self.tag, self.attrs, self.start, self.parent = tag, attrs, start, parent
        self.kids, self.text = [], []

    def cls(self):
        return (self.attrs.get('class') or '').split()

    def up(self, pred):
        e = self.parent
        while e is not None:
            if pred(e):
                return e
            e = e.parent
        return None

    def txt(self):
        return re.sub(r'\s+', ' ', ''.join(self.text)).strip()


class P(HTMLParser):
    def __init__(self, src):
        super().__init__(convert_charrefs=True)
        self.lines = [0]
        for m in re.finditer('\n', src):
            self.lines.append(m.end())
        self.root = El('#root', {}, 0, None)
        self.stack = [self.root]
        self.all = []
        self.feed(src)
        self.close()

    def off(self):
        l, c = self.getpos()
        return self.lines[l - 1] + c

    def handle_starttag(self, tag, attrs):
        par = self.stack[-1]
        e = El(tag, dict(attrs), self.off(), par)
        par.kids.append(e)
        self.all.append(e)
        if tag not in VOID:
            self.stack.append(e)

    def handle_startendtag(self, tag, attrs):
        par = self.stack[-1]
        e = El(tag, dict(attrs), self.off(), par)
        par.kids.append(e)
        self.all.append(e)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        for e in self.stack:
            if e.tag in TEXT_TAGS:
                e.text.append(data)


def first_el_child(e):
    return e.parent is not None and e.parent.kids and e.parent.kids[0] is e


def set_ids(src, targets, fn):
    """targets: {id: El}; fügt id="…" in das Start-Tag ein (von hinten nach vorn)."""
    existing = set(re.findall(r'\sid="([^"]+)"', src))
    done, skipped = 0, []
    for i, e in sorted(targets.items(), key=lambda kv: -kv[1].start):
        cur = e.attrs.get('id')
        if cur == i:
            continue
        if cur or i in existing:
            skipped.append(i)
            continue
        m = re.compile(r'<' + e.tag + r'\b', re.I).match(src, e.start)
        assert m, (fn, i, src[e.start:e.start + 40])
        src = src[:m.end()] + ' id="' + i + '"' + src[m.end():]
        done += 1
    print(f'{fn}: {done} ids neu, {len(targets)} Einträge' + (f', übersprungen (id belegt): {skipped}' if skipped else ''))
    return src


CASE_HOME = {'KR': 'sOKR', 'O': 'sOKR', 'CR': 'sCR', 'GZ': 's0', 'FE': 's0', 'BR': 's2', 'FR': 's2', 'NFR': 's2',
             'E': 's3', 'UC': 's4', 'US': 's5', 'TF': 's6', 'NT': 's6'}
CASE_RE = re.compile(r'^((?:GZ-\d|FE-\d|BR-\d|FR-\d\d|NFR-\d\d|UC-\d\d|US-\d\d|TF-\d\d|NT-\d\d|E[1-8]|KR\d\.\d|O[1-3]))(?:\s·|$)')


def case_targets(p):
    tg = {}
    for e in p.all:
        cand = (e.tag == 'td' and first_el_child(e)) or \
               (e.tag == 'strong' and e.up(lambda a: 'story-h' in a.cls())) or \
               (e.tag == 'h4' and e.up(lambda a: 'uc' in a.cls()))
        if not cand:
            continue
        m = CASE_RE.match(e.txt())
        if not m:
            continue
        i = m.group(1)
        sec = e.up(lambda a: a.tag == 'section' and 'station' in a.cls())
        if not sec or sec.attrs.get('id') != CASE_HOME[re.sub(r'[-0-9].*$', '', i)]:
            continue
        card = e.tag in ('h4', 'strong')
        if card or i not in tg:
            tg[i] = e
    for e in p.all:
        if e.tag == 'td' and e.txt() == 'CR-01' and e.up(lambda a: a.attrs.get('id') == 'sCR'):
            tg['CR-01'] = e
            break
    return tg


PH_RE = re.compile(r'^((?:OP|GZ|BR|FR|NFR|CR|EM|ADR|IF|R)-\d+|M[0-9])(?:\s+(.*))?$')


def ph_targets(p, pref):
    first, instation = {}, {}
    for e in p.all:
        if e.tag != 'tr':
            continue
        tds = [k for k in e.kids if k.tag == 'td']
        if not tds:
            continue
        m = PH_RE.match(tds[0].txt())
        if not m:
            continue
        i = m.group(1)
        if not (m.group(2) or (len(tds) > 1 and tds[1].txt())):
            continue
        st = e.up(lambda a: 'station' in a.cls())
        sid = st.attrs.get('id') if st else ''
        first.setdefault(i, e)
        if pref.get(i) and pref[i] == sid:
            instation.setdefault(i, e)
    return {i: instation.get(i, e) for i, e in first.items()}


def put_script(src):
    js = open(os.path.join(B, 'anchor.js'), encoding='utf-8').read().strip()
    src = re.sub(r'<script id="anchor-js">.*?</script>\n', '', src, flags=re.S)
    assert src.count('</body>') == 1
    return src.replace('</body>', '<script id="anchor-js">' + js + '</script>\n</body>', 1)


def steckbrief(src, fn):
    a = '<label data-i18n="k17">Business-Ziel</label>'
    anchors = ''.join('<span class="anc" id="GZ-%d"></span>' % n for n in range(1, 5))
    if 'id="GZ-1"' not in src:
        assert src.count(a) == 1, fn
        src = src.replace(a, anchors + a, 1)
    h = '<h2 data-i18n="k83">'
    if 'id="BC"' not in src:
        assert src.count(h) == 1, fn
        src = src.replace(h, '<h2 id="BC" data-i18n="k83">', 1)
    print(f'{fn}: GZ-1 bis GZ-4 und BC gesetzt')
    return src


def main():
    idx = json.load(open(os.path.join(B, 'idx_data.json'), encoding='utf-8'))['ids']
    pref = {i: e['p']['s'] for i, e in idx.items() if 'p' in e}
    for fn in ('ba-re-case-lindenfeld-lunch.html', 'lindenfeld-projektauftrag-pflichtenheft.html',
               'lindenfeld-projektauftrag-pflichtenheft-teilnehmende.html', 'lindenfeld-lunch-steckbrief.html'):
        path = os.path.join(T, fn)
        src = open(path, encoding='utf-8').read()
        if fn.startswith('ba-re-case'):
            src = set_ids(src, case_targets(P(src)), fn)
        elif 'pflichtenheft' in fn:
            src = set_ids(src, ph_targets(P(src), pref), fn)
        else:
            src = steckbrief(src, fn)
        src = put_script(src)
        open(path, 'w', encoding='utf-8').write(src)


if __name__ == '__main__':
    main()
