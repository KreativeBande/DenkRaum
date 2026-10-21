ZOOM_CSS = """
.zoomb,#zoomov{display:none !important}
.svgw svg,.figw img,figure svg,figure img{max-height:min(46vh,400px);cursor:zoom-in}
.figw img{width:auto !important;max-width:100% !important;margin:0 auto}
.gp,.gp *{cursor:pointer}
.gpz-btn{margin:4px 0 12px}
#gpzv{position:fixed;inset:0;z-index:2000;background:rgba(15,23,42,.95);display:flex;flex-direction:column}
#gpzv[hidden]{display:none}
#gpzv .gpz-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;padding:8px 12px}
#gpzv .gpz-bar .btn{background:#fff;color:#1F2A3A}
#gpzv .gpz-body{flex:1;min-height:0;background:#fff;margin:0 12px 12px;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center}
#gpzv .gpz-body.full{overflow:auto;display:block}
#gpzv .gpz-body>svg,#gpzv .gpz-body>img{max-height:none !important;cursor:zoom-out;display:block}
"""
ZOOM_JS = r"""<script>(function(){
if(window.__gpz)return;window.__gpz=1;
var D=document,R=D.documentElement;
function L(){return R.lang==='en'?{open:'Enlarge image',close:'Close',fit:'Fit to screen',full:'Original size'}:{open:'Bild vergrößern',close:'Schließen',fit:'Einpassen',full:'Originalgröße'};}
var SEL='.svgw svg,.figw img,figure svg,figure img';
function ok(el){if(!el||el.closest('#gpzv'))return false;if(el.tagName.toLowerCase()==='svg'){var vb=(el.getAttribute('viewBox')||'').split(/\s+/);return parseFloat(vb[3])>=150;}return true;}
var ov=D.createElement('div');ov.id='gpzv';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');
ov.innerHTML='<div class="gpz-bar"><button type="button" class="btn" data-a="fit"></button><button type="button" class="btn" data-a="full"></button><button type="button" class="btn" data-a="close"></button></div><div class="gpz-body"></div>';
D.body.appendChild(ov);
var body=ov.querySelector('.gpz-body'),mode='fit',src=null,opener=null;
function q(a){return ov.querySelector('[data-a="'+a+'"]');}
function labels(){var l=L();q('fit').textContent=l.fit;q('full').textContent=l.full;q('close').textContent=l.close;ov.setAttribute('aria-label',l.open);}
function render(){
 body.innerHTML='';var c=src.cloneNode(true);c.removeAttribute('id');c.removeAttribute('style');
 var isSvg=c.tagName.toLowerCase()==='svg',im=function(k,v){c.style.setProperty(k,v,'important');};
 if(mode==='fit'){body.className='gpz-body';im('width','100%');im('height','100%');im('max-width','none');if(!isSvg)im('object-fit','contain');}
 else{body.className='gpz-body full';im('max-width','none');
  if(isSvg){var v=c.getAttribute('viewBox').split(/\s+/);im('width',v[2]+'px');im('height',v[3]+'px');}
  else{im('width',Math.max(src.naturalWidth||1200,900)+'px');im('height','auto');}}
 body.appendChild(c);
 q('fit').setAttribute('aria-pressed',mode==='fit'?'true':'false');q('full').setAttribute('aria-pressed',mode==='full'?'true':'false');
}
function note(on){if(window.parent!==window){try{parent.postMessage({gp:'zoomstate',on:on},'*');}catch(e){}}}
function open(el,from){src=el;opener=from||null;mode='fit';labels();render();ov.hidden=false;note(true);q('close').focus();}
function close(){ov.hidden=true;body.innerHTML='';note(false);if(opener&&opener.focus){try{opener.focus();}catch(e){}}}
D.addEventListener('pointerup',function(e){
 var t=e.target;if(!t||!t.closest)return;
 var b=t.closest('#gpzv [data-a]');
 if(b){var a=b.getAttribute('data-a');if(a==='close')close();else{mode=a;render();}return;}
 if(t.closest('#gpzv')){if(t.closest('.gpz-body')){mode=(mode==='fit')?'full':'fit';render();}return;}
 var z=t.closest('.gpz-btn');if(z){open(z._gpz,z);return;}
 var el=t.closest(SEL);if(el&&ok(el)&&!t.closest('.gp,[role="button"]')){open(el,null);}
});
D.addEventListener('keydown',function(e){
 if(e.key==='Escape'&&!ov.hidden){close();return;}
 if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.closest&&e.target.closest('#gpzv [data-a]')){e.preventDefault();e.target.dispatchEvent(new Event('pointerup',{bubbles:true}));}
 if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.classList&&e.target.classList.contains('gpz-btn')){e.preventDefault();open(e.target._gpz,e.target);}
});
var btns=[];
function setup(){
 var els=D.querySelectorAll(SEL);
 for(var i=0;i<els.length;i++){var el=els[i];if(!ok(el)||el._gpzb)continue;
  var w=el.closest('figure')||el.closest('.svgw,.figw')||el;
  var b=D.createElement('button');b.type='button';b.className='btn gpz-btn';b._gpz=el;b.textContent=L().open;el._gpzb=b;btns.push(b);
  w.insertAdjacentElement('afterend',b);}
}
function relabel(){var l=L();btns.forEach(function(b){b.textContent=l.open;});labels();}
new MutationObserver(relabel).observe(R,{attributes:true,attributeFilter:['lang']});
setup();
})();</script>
"""
