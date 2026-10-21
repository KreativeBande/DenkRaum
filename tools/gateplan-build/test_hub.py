import asyncio, re, os, sys, json
from playwright.async_api import async_playwright
OUT=os.path.abspath(os.environ.get('GP_OUT','out'))
def U(f,extra=''): return 'file://'+OUT+'/'+f+extra
async def main():
    res=[]
    def ok(c,m):
        res.append(('OK ' if c else 'FAIL ')+m); 
    async with async_playwright() as p:
        br=await p.chromium.launch()
        for trainer,fn in ((True,'lindenfeld-gateplan.html'),(False,'lindenfeld-gateplan-teilnehmende.html')):
            tag='T' if trainer else 'P'
            for w,h in ((1300,900),(390,800)):
                pg=await br.new_page(viewport={'width':w,'height':h})
                errs=[]
                pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
                pg.on('pageerror',lambda e: errs.append(str(e)))
                await pg.goto(U(fn))
                ok(not errs,f'{tag}{w} keine Konsolenfehler {errs[:2]}')
                # horizontal overflow of page
                sw=await pg.evaluate('document.documentElement.scrollWidth')
                ok(sw<=w+1,f'{tag}{w} kein horizontaler Seitenscroll (scrollWidth {sw})')
                # every station / gate: overflow
                for st in range(6):
                    await pg.evaluate(f'document.querySelector(\'.tab[data-s="{st}"]\').dispatchEvent(new Event("pointerup",{{bubbles:true}}))')
                    sw=await pg.evaluate('document.documentElement.scrollWidth')
                    ok(sw<=w+1,f'{tag}{w} Station {st} Overflow {sw}')
                for g in range(7):
                    await pg.evaluate(f'document.querySelector(\'.tab[data-s="1"]\').dispatchEvent(new Event("pointerup",{{bubbles:true}}));document.querySelector(\'.gsel[data-g="{g}"]\').dispatchEvent(new Event("pointerup",{{bubbles:true}}))')
                    sw=await pg.evaluate('document.documentElement.scrollWidth')
                    vis=await pg.evaluate('document.querySelectorAll(".gate.on").length')
                    ok(sw<=w+1 and vis==1,f'{tag}{w} Gate {g} Overflow {sw} sichtbar {vis}')
                await pg.close()
            pg=await br.new_page(viewport={'width':1300,'height':900})
            await pg.goto(U(fn))
            # Schriftgrößen
            small=await pg.evaluate('''()=>{const bad=[];document.querySelectorAll('.station').forEach(s=>s.classList.add('on'));
              const it=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=it.nextNode()){const t=n.textContent.trim();if(!t)continue;const el=n.parentElement;const cs=getComputedStyle(el);
              if(el.closest('svg'))continue; if(el.closest('.footer'))continue; if(cs.display==='none')continue; const fs=parseFloat(cs.fontSize); if(fs<14)bad.push(fs+':'+t.slice(0,30));}return bad.slice(0,10)}''')
            ok(not small,f'{tag} Schrift >=14px {small}')
            # SVG-Schrift
            svgf=await pg.evaluate('''()=>{const sv=document.querySelector('.svgw svg');const w=sv.getBoundingClientRect().width;const vb=sv.viewBox.baseVal.width;return [...sv.querySelectorAll('text')].map(t=>parseFloat(getComputedStyle(t).fontSize)*w/vb).reduce((a,b)=>Math.min(a,b),99)}''')
            ok(svgf>=14,f'{tag} SVG min Schrift {svgf:.1f}px bei 1300')
            pg2=await br.new_page(viewport={'width':390,'height':800}); await pg2.goto(U(fn))
            svgf=await pg2.evaluate('''()=>{const sv=document.querySelector('.svgw svg');const w=sv.getBoundingClientRect().width;const vb=sv.viewBox.baseVal.width;return [...sv.querySelectorAll('text')].map(t=>parseFloat(getComputedStyle(t).fontSize)*w/vb).reduce((a,b)=>Math.min(a,b),99)}''')
            ok(svgf>=14,f'{tag} SVG min Schrift {svgf:.1f}px bei 390'); await pg2.close()
            # Touch targets
            tt=await pg.evaluate('''()=>{const bad=[];document.querySelectorAll('.station').forEach(s=>s.classList.add('on'));document.querySelectorAll('.gate').forEach(s=>s.classList.add('on'));
              document.querySelectorAll('button,a.go,a.tab,.chip').forEach(e=>{const r=e.getBoundingClientRect();if(r.width===0)return;if(r.height<43.5||r.width<43.5)bad.push(e.className+':'+Math.round(r.width)+'x'+Math.round(r.height))});return bad.slice(0,8)}''')
            ok(not tt,f'{tag} Touch >=44px {tt}')
            await pg.close()
            pg=await br.new_page(viewport={'width':1300,'height':900}); await pg.goto(U(fn))
            # Trainer/Teilnehmende-Unterschiede
            nans=await pg.evaluate('document.querySelectorAll(".ansbtn").length'); nrev=await pg.evaluate('document.querySelectorAll("#revealAll").length'); nft=await pg.evaluate('document.querySelectorAll(".footer").length'); nfb=await pg.evaluate('document.querySelectorAll(".footer-box").length')
            if trainer: ok(nans==8 and nrev==1 and nft==1 and nfb==4,f'T Antworten {nans}, revealAll {nrev}, Footerboxen {nfb}')
            else: ok(nans==0 and nrev==0 and nft==0 and (await pg.evaluate('document.querySelectorAll(".ansbox").length'))==0,f'P ohne Antworten/Footer ({nans},{nrev},{nft})')
            # Matrix
            rows_vis=await pg.evaluate('''()=>{document.querySelector('.tab[data-s="2"]').dispatchEvent(new Event("pointerup",{bubbles:true}));return [...document.querySelectorAll('.mx tbody:not(.more) tr')].filter(r=>r.offsetParent).length}''')
            ok(rows_vis==5,f'{tag} Matrix 5 Zeilen sichtbar ({rows_vis})')
            await pg.evaluate('document.querySelector("#st2 .morebtn").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            allv=await pg.evaluate('[...document.querySelectorAll(".mx tr[data-ln]")].filter(r=>r.offsetParent).length')
            ok(allv==9,f'{tag} Matrix 9 nach Aufklappen ({allv})')
            # Filter N
            await pg.evaluate('document.querySelector(".chip[data-f=\\"n\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            fv=await pg.evaluate('[...document.querySelectorAll(".mx tr[data-ln]")].filter(r=>r.offsetParent).length')
            ok(fv==1,f'{tag} Filter N zeigt 1 Zeile ({fv})')
            await pg.evaluate('document.querySelector(".chip[data-f=\\"a\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            fv=await pg.evaluate('[...document.querySelectorAll(".mx tr[data-ln]")].filter(r=>r.offsetParent).length')
            ok(fv==2,f'{tag} Filter A zeigt 2 Zeilen ({fv})')
            await pg.evaluate('document.querySelector(".chip[data-f=\\"\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            # Gate-Sprung aus Matrix
            await pg.evaluate('document.querySelector(".gjump[data-g=\\"3\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            on=await pg.evaluate('[document.querySelector(".tab.on").dataset.s,document.querySelector(".gate.on").dataset.g]')
            ok(on==['1','3'],f'{tag} Matrix->Gate 3 {on}')
            # SVG
            await pg.evaluate('document.querySelector(".tab[data-s=\\"0\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            await pg.evaluate('document.querySelector(".gp[data-g=\\"5\\"] text").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            on=await pg.evaluate('[document.querySelector(".tab.on").dataset.s,document.querySelector(".gate.on").dataset.g]')
            ok(on==['1','5'],f'{tag} SVG-Klick -> Gate 5 {on}')
            # Quiz
            await pg.evaluate('document.querySelector(".tab[data-s=\\"3\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            sc=0
            for i in range(6):
                okidx=await pg.evaluate(f'[...document.querySelectorAll(".qq")[{i}].querySelectorAll(".opt")].findIndex(o=>o.dataset.ok==="1")')
                await pg.evaluate(f'document.querySelectorAll(".qq")[{i}].querySelectorAll(".opt")[{okidx}].dispatchEvent(new Event("pointerup",{{bubbles:true}}))')
                if i<5: await pg.evaluate('document.querySelector(".qnext").dispatchEvent(new Event("pointerup",{bubbles:true}))')
                sc+= (okidx,)[0]*0
                if i==0: pos=[okidx]
                else: pos.append(okidx)
            summ=await pg.evaluate('document.querySelector(".qs").textContent+"/"+(!document.querySelector(".qsum").hidden)+"/"+document.querySelector(".tab[data-s=\\"3\\"]").classList.contains("done")')
            ok(pos==[2,0,3,1,2,1] and summ=='6/true/true',f'{tag} Quiz Positionen {pos} Ergebnis {summ}')
            # EN: deutsche Reste
            await pg.evaluate('document.querySelector("#langBtn").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            de=await pg.evaluate('''()=>{document.querySelectorAll('.station,.gate').forEach(s=>s.classList.add('on'));document.querySelectorAll('.ansbox').forEach(a=>a.hidden=false);document.querySelectorAll('.fb,.qq').forEach(a=>a.hidden=false);
               const words=/\\b(und|der|die|das|nicht|mit|für|ist|wird|sind|zum|zur|Gate für|Linie|Anforderung|Entscheidung|Annahme|Fall)\\b/;const bad=[];const it=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
               while(n=it.nextNode()){const el=n.parentElement;if(el.closest('script,style'))continue;if(el.closest('a[href^="http"]'))continue;if(el.closest('.footer-mono'))continue;const t=n.textContent.trim();if(!t)continue;if(words.test(t)&&/[äöüß]|\\b(und|nicht|mit|für|wird|sind)\\b/.test(t))bad.push(t.slice(0,60));}
               return bad.slice(0,12)}''')
            ok(not de,f'{tag} EN ohne Deutsch-Reste {de}')
            title=await pg.title(); ok(title=='Lindenfeld Lunch: Gate Plan',f'{tag} EN Titel {title}')
            await pg.evaluate('document.querySelector("#langBtn").dispatchEvent(new Event("pointerup",{bubbles:true}))')
            # Glossar-Sortierung
            gl=await pg.evaluate('[...document.querySelectorAll("#gl .gl-item dt")].map(e=>e.textContent)')
            ok(gl==sorted(gl,key=lambda x:x.lower().replace('ä','a').replace('ö','o').replace('ü','u')) ,f'{tag} Glossar DE alphabetisch')
            # Beamer
            for k in range(1,4):
                await pg.evaluate('document.querySelector("#beamerBtn").dispatchEvent(new Event("pointerup",{bubbles:true}))')
                cls=await pg.evaluate('document.documentElement.className'); fv=await pg.evaluate('getComputedStyle(document.querySelector(".footer")||document.body).display') if trainer else 'none'
                ok((fv=='none') or not trainer,f'{tag} Beamer {k} {cls} Footer {fv}')
            await pg.close()
        # Dateien oben, Inhalte links
        for fn,tr in (('lindenfeld-gateplan.html',True),('lindenfeld-gateplan-teilnehmende.html',False)):
            pg=await br.new_page(viewport={'width':1300,'height':900}); await pg.goto(U(fn))
            ev=lambda sel: f'document.querySelector(\'{sel}\').dispatchEvent(new Event("pointerup",{{bubbles:true}}))'
            w=await pg.evaluate('document.querySelector(".layout").getBoundingClientRect().width/innerWidth')
            ok(w>=0.94,f'{fn} Layout {w:.2f} der Breite')
            ok(await pg.evaluate('document.querySelectorAll(".ftab").length')==3,f'{fn} 3 Datei-Reiter')
            side=await pg.evaluate('(()=>{const a=document.querySelector(".side").getBoundingClientRect(),m=document.querySelector("main").getBoundingClientRect();return a.right<=m.left+1&&Math.abs(a.top-m.top)<80})()')
            ok(side,f'{fn} Navigation links neben dem Inhalt')
            # Case: alle Sidebar-Einträge
            await pg.evaluate(ev('.ftab[data-file="c"]')); await pg.wait_for_timeout(500)
            n=await pg.evaluate('document.querySelectorAll("#navC .snv").length'); ok(n==16,f'{fn} Case-Navigation {n} Einträge')
            bad=[]
            ids=await pg.evaluate('[...document.querySelectorAll("#navC .snv")].map(b=>b.dataset.a)')
            fr=[f for f in pg.frames if f!=pg.main_frame][0]
            for a in ids:
                await pg.evaluate(ev(f'#navC .snv[data-a="{a}"]')); await pg.wait_for_timeout(200)
                vis=await fr.evaluate(f'(()=>{{const e=document.getElementById("{a}");return !!e&&e.classList.contains("on")}})()')
                mark=await pg.evaluate('(document.querySelector("#navC .snv.on")||{dataset:{}}).dataset.a')
                if not vis or mark!=a: bad.append((a,vis,mark))
            ok(not bad,f'{fn} Case-Sidebar schaltet Stationen {bad[:4]}')
            # inner chrome hidden
            hid=await fr.evaluate('["hdr","sig","ctl","stepnav"].map(c=>{const e=document.querySelector("."+c);return !e||getComputedStyle(e).display==="none"})')
            ok(all(hid),f'{fn} Case-Innennavigation ausgeblendet {hid}')
            # Sync Sprache/Beamer/Tiefe
            await pg.evaluate(ev('#langBtn')); await pg.wait_for_timeout(500)
            ok(await fr.evaluate('document.documentElement.lang')=='en',f'{fn} Sprache synchron Case')
            await pg.evaluate(ev('#beamerBtn')); await pg.wait_for_timeout(500)
            ok(await fr.evaluate('document.documentElement.classList.contains("beamer")'),f'{fn} Beamer synchron Case')
            await pg.evaluate(ev('#beamerBtn'));await pg.evaluate(ev('#beamerBtn'));await pg.evaluate(ev('#beamerBtn')); await pg.wait_for_timeout(500)
            await pg.evaluate(ev('#langBtn')); await pg.wait_for_timeout(500)
            ok(await fr.evaluate('document.documentElement.lang')=='de' and not await fr.evaluate('document.documentElement.classList.contains("beamer")'),f'{fn} Rücksync')
            # PA
            await pg.evaluate(ev('.ftab[data-file="p"]')); await pg.wait_for_timeout(500)
            n=await pg.evaluate('document.querySelectorAll("#navP .snv").length'); ok(n==8,f'{fn} PA-Navigation {n}')
            fr2=[f for f in pg.frames if f!=pg.main_frame and f!=fr]
            frp=[f for f in pg.frames if f!=pg.main_frame][1]
            bad=[]
            for a in await pg.evaluate('[...document.querySelectorAll("#navP .snv")].map(b=>b.dataset.a)'):
                await pg.evaluate(ev(f'#navP .snv[data-a="{a}"]')); await pg.wait_for_timeout(150)
                vis=await frp.evaluate(f'document.getElementById("{a}").classList.contains("on")')
                mark=await pg.evaluate('(document.querySelector("#navP .snv.on")||{dataset:{}}).dataset.a')
                if not vis or mark!=a: bad.append((a,vis,mark))
            ok(not bad,f'{fn} PA-Sidebar schaltet Stationen {bad[:4]}')
            hid=await frp.evaluate('["hdr","sig","ctl","tabs"].map(c=>{const e=document.querySelector("."+c);return !e||getComputedStyle(e).display==="none"})')
            ok(all(hid),f'{fn} PA-Innennavigation ausgeblendet {hid}')
            # Rückweg + Gate-Links
            await pg.evaluate(ev('.ftab[data-file="hub"]'))
            ok(await pg.evaluate('!document.querySelector("main").hidden'),f'{fn} zurück zum Gateplan')
            pairs=await pg.evaluate('[...new Set([...document.querySelectorAll("a.go")].map(a=>a.dataset.k+"|"+(a.dataset.a||"")))]')
            bad=[]
            for pr in pairs:
                k,a=pr.split('|')
                sel=f'a.go[data-k="{k}"]'+(f'[data-a="{a}"]' if a else ':not([data-a])')
                await pg.evaluate(ev(sel)); await pg.wait_for_timeout(200)
                f=[x for x in pg.frames if x!=pg.main_frame][0 if k=='c' else 1]
                lay=await pg.evaluate('document.querySelector(".layout").dataset.file')
                if a:
                    isst='.on' 
                    sec=await f.evaluate(f'(()=>{{const e=document.getElementById("{a.split(":")[0]}");return !!e&&(e.classList.contains("on")||e.offsetParent!==null)}})()')
                else: sec=True
                if lay!=k or not sec: bad.append((pr,lay,sec))
                await pg.evaluate(ev('.ftab[data-file="hub"]'))
            ok(not bad,f'{fn} Gate-Links öffnen Datei und Station {bad[:5]}')
            await pg.close()
        # 95 % in den Einzeldateien
        for fn in ('ba-re-case-lindenfeld-lunch.html','lindenfeld-projektauftrag-pflichtenheft.html','lindenfeld-projektauftrag-pflichtenheft-teilnehmende.html'):
            pg=await br.new_page(viewport={'width':1300,'height':900}); await pg.goto(U(fn))
            w=await pg.evaluate('document.querySelector("main").getBoundingClientRect().width/innerWidth')
            ok(0.94<=w<=0.96,f'{fn} main {w:.2f} der Breite')
            await pg.close()
        await br.close()
    for r in res: print(r)
    print('FAILS:',sum(r.startswith('FAIL') for r in res),'von',len(res))
asyncio.run(main())
