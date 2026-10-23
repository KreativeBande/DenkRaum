#!/usr/bin/env python3
"""Setzt das Kürzel-Klickfenster (idx.css, idx.js + Wörterbuch idx_data.json) in Pflichtenheft (beide Varianten)
und Steckbrief ein. Idempotent. Danach hub.py/repo.py neu laufen lassen (Gateplan bettet das Pflichtenheft ein)."""
import json, os, re
B = os.path.dirname(os.path.abspath(__file__)); T = os.path.abspath(os.path.join(B, '..'))
d = json.load(open(os.path.join(B, 'idx_data.json'), encoding='utf-8'))
# schlank: Case-Zielverweis nur wenn abweichend; Pflichtenheft/Case-Felder kurz
data = json.dumps(d, ensure_ascii=False, separators=(',', ':'))
css = open(os.path.join(B, 'idx.css'), encoding='utf-8').read().strip()
js = open(os.path.join(B, 'idx.js'), encoding='utf-8').read().replace('__DATA__', data.replace('</', '<\\/'))
BACK = open(os.path.join(B, 'idxback.js'), encoding='utf-8').read()
BLOCK_BACK = '<script id="idxback-js">' + BACK + '</script>\n'
BLOCK_CSS = '<style id="idx-css">\n' + css + '\n</style>\n'
BLOCK_JS = '<script id="idx-js">' + js + '</script>\n'
files = ['ba-re-case-lindenfeld-lunch.html', 'lindenfeld-projektauftrag-pflichtenheft.html', 'lindenfeld-projektauftrag-pflichtenheft-teilnehmende.html', 'lindenfeld-lunch-steckbrief.html']
for fn in files:
    p = os.path.join(T, fn); h = open(p, encoding='utf-8').read()
    h = re.sub(r'<style id="idx-css">.*?</style>\n', '', h, flags=re.S)
    h = re.sub(r'<script id="idx-js">.*?</script>\n', '', h, flags=re.S)
    h = re.sub(r'<script id="idxback-js">.*?</script>\n', '', h, flags=re.S)
    assert h.count('</head>') == 1 and h.count('</body>') == 1, fn
    if fn.startswith('ba-re-case'):
        h = h.replace('</body>', BLOCK_BACK + '</body>', 1)
        open(p, 'w', encoding='utf-8').write(h); print(fn, len(h)); continue
    h = h.replace('</head>', BLOCK_CSS + '</head>', 1)
    h = h.replace('</body>', BLOCK_BACK + BLOCK_JS + '</body>', 1)
    if 'pflichtenheft' in fn:
        a = "var hm=(location.hash||'').match(/^#st([0-7])$/);"
        b = "var hm=(location.hash||'').match(/^#st([0-7])(?::([\\w.-]+))?$/);"
        if a in h: h = h.replace(a, b, 1)
        assert b in h, fn
        a2 = "show(hm?parseInt(hm[1],10):(sn?parseInt(sn,10)||0:0));"
        b2 = "show(hm?parseInt(hm[1],10):(sn?parseInt(sn,10)||0:0));if(hm&&hm[2]){setTimeout(function(){if(window.__idx)window.__idx.reveal('st'+hm[1],hm[2]);},60);}"
        if a2 in h and b2 not in h: h = h.replace(a2, b2, 1)
        assert b2 in h, fn
        a3 = "var mm=(d.a||'').match(/^st([0-7])$/);if(mm){var t=document.querySelector('.tab[data-s=\"'+mm[1]+'\"]');if(t)t.dispatchEvent(new Event('pointerup',{bubbles:true}));window.scrollTo(0,0);}"
        b3 = "var mm=(d.a||'').match(/^st([0-7])(?::([\\w.-]+))?$/);if(mm){var t=document.querySelector('.tab[data-s=\"'+mm[1]+'\"]');if(t)t.dispatchEvent(new Event('pointerup',{bubbles:true}));window.scrollTo(0,0);if(mm[2]&&window.__idx)window.__idx.reveal('st'+mm[1],mm[2]);}"
        if a3 in h: h = h.replace(a3, b3, 1)
        assert b3 in h, fn
    open(p, 'w', encoding='utf-8').write(h)
    print(fn, len(h))
