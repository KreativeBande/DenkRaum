import asyncio,os
from playwright.async_api import async_playwright
OUT=os.path.abspath(os.environ.get('GP_OUT','out')); U=lambda f:'file://'+OUT+'/'+f
res=[]
def ok(c,m): res.append(('OK ' if c else 'FAIL ')+m)
async def main():
    async with async_playwright() as p:
        br=await p.chromium.launch()
        for fn in ('ba-re-case-lindenfeld-lunch.html','lindenfeld-projektauftrag-pflichtenheft.html','lindenfeld-gateplan.html'):
            for vw,vh in ((1920,1080),(1300,800),(390,800)):
                pg=await br.new_page(viewport={'width':vw,'height':vh}); errs=[]
                pg.on('pageerror',lambda e:errs.append(str(e)))
                await pg.goto(U(fn)); await pg.wait_for_timeout(200)
                info=await pg.evaluate('''()=>{document.querySelectorAll(".step,.station,.gate").forEach(s=>s.classList.add("on"));
                  const els=[...document.querySelectorAll(".svgw svg,.figw img,figure svg,figure img")].filter(e=>{if(e.tagName.toLowerCase()==="svg"){const v=(e.getAttribute("viewBox")||"").split(/\\s+/);return parseFloat(v[3])>=150}return true});
                  const hs=els.map(e=>e.getBoundingClientRect().height); return {n:els.length,btn:document.querySelectorAll(".gpz-btn").length,maxh:Math.max(0,...hs),vh:innerHeight}}''')
                ok(info['n']==info['btn'] and info['maxh']<=min(0.46*vh,400)+2,f'{fn} {vw}: {info["n"]} Bilder, {info["btn"]} Buttons, größte Höhe im Text {info["maxh"]:.0f}px (Grenze {min(0.46*vh,400):.0f})')
                if info['btn']:
                    # öffnen: letzten Button (sichtbar machen)
                    await pg.evaluate('document.querySelector(".gpz-btn").dispatchEvent(new Event("pointerup",{bubbles:true}))')
                    r=await pg.evaluate('''()=>{const o=document.getElementById("gpzv");const c=document.querySelector("#gpzv .gpz-body>*");const r=c.getBoundingClientRect(),b=document.querySelector("#gpzv .gpz-body").getBoundingClientRect();
                      // gerendertes Bild: bei svg viewBox-Fit
                      return {open:!o.hidden,w:r.width,h:r.height,bw:b.width,bh:b.height,iw:innerWidth,ih:innerHeight,sw:document.documentElement.scrollWidth}}''')
                    ok(r['open'] and r['w']<=r['iw'] and r['h']<=r['ih'] and r['bh']<=r['ih'],f'{fn} {vw}: Lightbox offen, Inhalt {r["w"]:.0f}x{r["h"]:.0f} in {r["iw"]}x{r["ih"]}')
                    await pg.evaluate('document.querySelector("#gpzv .gpz-body").dispatchEvent(new Event("pointerup",{bubbles:true}))')
                    full=await pg.evaluate('document.querySelector("#gpzv .gpz-body").classList.contains("full")')
                    ok(full,f'{fn} {vw}: Antippen wechselt auf Originalgröße')
                    await pg.keyboard.press('Escape'); await pg.wait_for_timeout(50)
                    ok(await pg.evaluate('document.getElementById("gpzv").hidden'),f'{fn} {vw}: Esc schließt')
                ok(not errs,f'{fn} {vw}: keine Fehler {errs[:1]}')
                await pg.close()
        # Hub: eingebettet
        pg=await br.new_page(viewport={'width':1920,'height':1080}); await pg.goto(U('lindenfeld-gateplan.html'))
        await pg.evaluate('document.querySelector(".ftab[data-file=\\"c\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))'); await pg.wait_for_timeout(600)
        fr=[f for f in pg.frames if f!=pg.main_frame][0]
        await pg.evaluate('document.querySelector("#navC .snv[data-a=\\"s2\\"]").dispatchEvent(new Event("pointerup",{bubbles:true}))'); await pg.wait_for_timeout(300)
        await fr.evaluate('document.querySelector(".step.on .gpz-btn").dispatchEvent(new Event("pointerup",{bubbles:true}))'); await pg.wait_for_timeout(200)
        r=await pg.evaluate('(()=>{const f=document.getElementById("frC").getBoundingClientRect();return [f.width,f.height,document.getElementById("frC").classList.contains("zoomfull")]})()')
        ok(r[2] and r[0]==1920 and r[1]==1080,f'Hub: eingebettetes Bild füllt den ganzen Bildschirm {r}')
        await pg.screenshot(path='shots/z1.png')
        await fr.evaluate('document.querySelector("#gpzv [data-a=close]").dispatchEvent(new Event("pointerup",{bubbles:true}))'); await pg.wait_for_timeout(100)
        ok(not await pg.evaluate('document.getElementById("frC").classList.contains("zoomfull")'),'Hub: Schließen gibt Rahmen frei')
        await br.close()
    for r in res: print(r)
    print('FAILS',sum(r.startswith('FAIL') for r in res),'von',len(res))
asyncio.run(main())
