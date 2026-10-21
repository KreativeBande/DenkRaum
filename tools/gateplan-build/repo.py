import re,sys,os
B=os.path.dirname(os.path.abspath(__file__))
LINK='<a class="repoback" href="../index.html" data-en="← Back to home page">← Zurück zur Startseite</a>'
CSS='<style id="repoback-css">.repoback{margin-right:16px;color:#0b5c8a;font-weight:700;text-decoration:none;white-space:nowrap;font-size:15px;min-height:44px;display:inline-flex;align-items:center}.repoback:hover{text-decoration:underline}html.emb .repoback{display:none !important}@media (max-width:640px){.repoback{margin-right:8px;font-size:14px;white-space:normal;max-width:105px;line-height:1.15}.sig{white-space:normal;max-width:215px;line-height:1.2;text-align:right}}</style>\n'
def add(fn):
    p=os.path.join(os.path.abspath(os.environ.get('GP_OUT',os.path.join(B,'out'))),fn);s=open(p,encoding='utf8').read()
    s=re.sub(r'<style id="repoback-css">.*?</style>\n','',s,flags=re.S)
    s=s.replace(LINK,'')
    s=s.replace('<div class="hdr">','<div class="hdr">'+LINK,1)
    s=s.replace('</head>',CSS+'</head>',1)
    open(p,'w',encoding='utf8').write(s)
if __name__=='__main__':
    for f in sys.argv[1:]: add(f)
