
(function(){
var R=document.documentElement;
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v);}catch(e){return null;}}
var lang='de',userDepth='short',bLevel=0,station=0;
var BL=[{c:[],l:'☀ Beamer'},{c:['beamer'],l:'☀ Beamer XL'},{c:['beamer','beamer-xl'],l:'☀ Beamer XXL'},{c:['beamer','beamer-xl','beamer-xxl'],l:'☀ Normal'}];
var $=function(s,r){return (r||document).querySelector(s);},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var langBtn=$('#langBtn'),depthBtn=$('#depthBtn'),bBtn=$('#beamerBtn');
function applyLang(l){
 lang=l;R.lang=l;
 $$('[data-en]').forEach(function(el){
  if(!el.hasAttribute('data-de'))el.setAttribute('data-de',el.textContent);
  el.textContent=(l==='en')?el.getAttribute('data-en'):el.getAttribute('data-de');
 });
 langBtn.textContent=(l==='en')?'DE':'EN';
 document.title=(l==='en')?'Lindenfeld Lunch: Project Charter and Functional Specification':'Lindenfeld Lunch: Projektauftrag und Pflichtenheft';
 setDepth(userDepth,true);sortGl();ss('lang',l);
}
function setDepth(d,quiet){
 userDepth=d;var eff=(bLevel>0)?'short':d;R.setAttribute('data-depth',eff);
 var full=(d==='full');
 depthBtn.textContent=(lang==='en'?'Depth: ':'Vertiefung: ')+(full?(lang==='en'?'Full':'Ausführlich'):(lang==='en'?'Short':'Kurz'));
 depthBtn.setAttribute('aria-disabled',bLevel>0?'true':'false');
 if(!quiet)ss('depth',d);
}
function setBeamer(n){
 bLevel=n;['beamer','beamer-xl','beamer-xxl'].forEach(function(c){R.classList.remove(c);});
 BL[n].c.forEach(function(c){R.classList.add(c);});bBtn.textContent=BL[n].l;setDepth(userDepth,true);
}
function sortGl(){
 var gl=$('#gl');if(!gl)return;
 var it=$$('.gl-item',gl);var k=(lang==='en')?'data-k-en':'data-k-de';
 it.sort(function(a,b){return a.getAttribute(k).localeCompare(b.getAttribute(k),lang);});
 it.forEach(function(x){gl.appendChild(x);});
}
function show(n){
 var st=$$('.station'),tb=$$('.tab');if(n<0)n=0;if(n>=st.length)n=st.length-1;station=n;
 st.forEach(function(s,i){s.classList.toggle('on',i===n);});
 tb.forEach(function(t,i){t.classList.toggle('on',i===n);});
 ss('station',String(n));window.scrollTo(0,0);
}
function setFacet(f){
 if(f)R.setAttribute('data-facet',f);else R.removeAttribute('data-facet');
 $$('.chip').forEach(function(c){c.classList.toggle('on',(c.getAttribute('data-f')||'')===(f||''));});
 ss('facet',f||'');
}
function quizInit(q){
 var qs=$$('.qq',q),n=qs.length,idx=0,done=[],score=0;
 function render(){
  qs.forEach(function(x,i){x.hidden=(i!==idx);});
  $('.qi',q).textContent=String(idx+1);
  $('.qprev',q).disabled=(idx===0);
  var ans=!!done[idx];$('.qnext',q).disabled=!ans||(idx===n-1);
  $('.qsum',q).hidden=!(idx===n-1&&ans);
  $('.qs',q).textContent=String(score);
 }
 q.addEventListener('quizpick',function(e){
  var o=e.detail.opt,qq=o.closest('.qq'),i=parseInt(qq.getAttribute('data-i'),10);
  if(done[i])return;done[i]=true;var v=o.getAttribute('data-ok');
  $$('.opt',qq).forEach(function(b){var ok=b.getAttribute('data-ok');b.disabled=true;
   if(ok==='1')b.classList.add('right');else if(ok==='2')b.classList.add('alt');});
  o.classList.add('sel');if(v==='0')o.classList.add('wrong');
  if(v==='1')score++;
  var fb=$('.fb',qq);fb.hidden=false;fb.className='fb f'+v;
  render();
  if(done.filter(Boolean).length===n){var st=q.closest('.station');var si=$$('.station').indexOf(st);var t=$$('.tab')[si];if(t)t.classList.add('done');}
 });
 q.addEventListener('quizgo',function(e){idx=Math.max(0,Math.min(n-1,idx+e.detail.d));render();});
 render();
}
$$('.quiz').forEach(quizInit);
document.addEventListener('pointerup',function(e){
 var t=e.target;if(!t.closest)return;
 var b=t.closest('button,a.tab,.chip');if(!b)return;
 if(b.id==='langBtn'){applyLang(lang==='de'?'en':'de');return;}
 if(b.id==='depthBtn'){if(bLevel>0)return;setDepth(userDepth==='short'?'full':'short');return;}
 if(b.id==='beamerBtn'){setBeamer((bLevel+1)%4);return;}
 if(b.classList.contains('tab')){show(parseInt(b.getAttribute('data-s'),10));return;}
 if(b.classList.contains('snav')){show(station+parseInt(b.getAttribute('data-d'),10));return;}
 if(b.classList.contains('chip')){setFacet(b.getAttribute('data-f')||'');return;}
 if(b.classList.contains('morebtn')){var tw=b.parentNode.previousElementSibling;var o=tw.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');return;}
 if(b.classList.contains('ansbtn')){var bx=b.nextElementSibling;bx.hidden=!bx.hidden;b.classList.toggle('on',!bx.hidden);return;}
 if(b.id==='revealAll'){var all=$$('.ansbox');var anyHidden=all.some(function(x){return x.hidden;});
   all.forEach(function(x){x.hidden=!anyHidden;var bt=x.previousElementSibling;if(bt)bt.classList.toggle('on',anyHidden);});return;}
 if(b.classList.contains('opt')){var q=b.closest('.quiz');q.dispatchEvent(new CustomEvent('quizpick',{detail:{opt:b}}));return;}
 if(b.classList.contains('qprev')||b.classList.contains('qnext')){var qz=b.closest('.quiz');qz.dispatchEvent(new CustomEvent('quizgo',{detail:{d:b.classList.contains('qprev')?-1:1}}));return;}
});
document.addEventListener('keydown',function(e){
 if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.matches&&e.target.matches('button,a.tab,.chip')){
  if(e.target.tagName==='A')return;e.preventDefault();e.target.dispatchEvent(new Event('pointerup',{bubbles:true}));}
});
var sl=ss('lang'),sd=ss('depth'),sf=ss('facet'),sn=ss('station');
if(sd==='full')userDepth='full';
setBeamer(0);setFacet(sf||'');
if(sl==='en')applyLang('en');else{applyLang('de');}
show(sn?parseInt(sn,10)||0:0);
})();
