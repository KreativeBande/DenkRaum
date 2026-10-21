"""Erzeugt Sprecher-Skript_<Toolname>.md aus der Footer-Box „Vortrags-Skript“ (K16). Aufruf: python3 skript_md.py <html> <md> <Titel>"""
import re,sys,html
def conv(fn,out,title):
    s=open(fn,encoding='utf8').read().split('window.__EMB')[0]
    i=s.index('Vortrags-Skript</span>'); i=s.index('<div class="footer-content',i); j=s.index('</details>',i)
    t=s[i:j]
    t=re.sub(r'<span data-en="[^"]*">','<span>',t)
    t=re.sub(r'<table.*?</table>',lambda m: tbl(m.group(0)),t,flags=re.S)
    t=re.sub(r'<em>(.*?)</em>',r'*\1*',t); t=re.sub(r'<strong>(.*?)</strong>',r'**\1**',t)
    t=re.sub(r'<li[^>]*>','- ',t); t=re.sub(r'</(p|li|h\d|ul|div)>','\n\n',t); t=re.sub(r'<br\s*/?>','\n',t)
    t=re.sub(r'<(?!/?TBL)[^>]+>','',t)
    t=html.unescape(t); t=re.sub(r'\n{3,}','\n\n',t).strip()
    open(out,'w',encoding='utf8').write(f'# Sprecher-Skript: {title}\n\nSynchron zur Footer-Box „Vortrags-Skript“ im Tool. Bei Abweichung gilt die Footer-Box.\n\n{t}\n')
def tbl(h):
    rows=[[re.sub(r'<[^>]+>','',c).strip() for c in re.findall(r'<t[hd][^>]*>(.*?)</t[hd]>',r,flags=re.S)] for r in re.findall(r'<tr[^>]*>(.*?)</tr>',h,flags=re.S)]
    rows=[r for r in rows if r]
    if not rows: return ''
    o='\n\n| '+' | '.join(rows[0])+' |\n|'+'---|'*len(rows[0])+'\n'
    for r in rows[1:]: o+='| '+' | '.join(r)+' |\n'
    return o+'\n'
if __name__=='__main__': conv(*sys.argv[1:4])
