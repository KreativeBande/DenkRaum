(function(){
if(window.__anchorJump)return;window.__anchorJump=1;
var ID=/^(?:(?:GZ|FE|BR|FR|NFR|NT|IF|UC|US|TF|CR|EM|OP|ADR|R)-\d+|KR\d\.\d|M\d|E\d|O\d|BC)$/;
var st=document.createElement('style');
st.textContent='.anc-flash{animation:ancFlash 2.4s ease-out}@keyframes ancFlash{0%,30%{background:#FFE58A;box-shadow:0 0 0 4px #FFE58A}100%{background:transparent;box-shadow:none}}.anc{display:block;position:relative;top:-80px;height:0;overflow:hidden}';
document.head.appendChild(st);
function press(el){if(!el)return;el.dispatchEvent(new Event('pointerup',{bubbles:true}));}
function go(){
 var h='';try{h=decodeURIComponent((location.hash||'').slice(1));}catch(e){return;}
 if(!ID.test(h))return;
 var el=document.getElementById(h);if(!el)return;
 /* BA/RE-Case: Schritt aktivieren */
 var step=el.closest('.step');
 if(step&&!step.classList.contains('on')&&window.__case&&window.__case.goStep){var all=[].slice.call(document.querySelectorAll('.step'));var i=all.indexOf(step);if(i>=0)window.__case.goStep(i,true);}
 /* Projektauftrag/Pflichtenheft: Station aktivieren, eingeklappte Tabelle aufklappen */
 var sta=el.closest('.station');
 if(sta&&/^st\d$/.test(sta.id)){var tab=document.querySelector('.tab[data-s="'+sta.id.slice(2)+'"]');if(tab&&!tab.classList.contains('on')&&!tab.classList.contains('active'))press(tab);}
 var tw=el.closest('.tw');if(tw&&!tw.classList.contains('open')){var nx=tw.nextElementSibling,mb=nx&&nx.querySelector?nx.querySelector('.morebtn'):null;if(mb)press(mb);}
 /* Steckbrief: Reiter aktivieren */
 var tp=el.closest('.tab-panel');if(tp&&!tp.classList.contains('active')){var tb=document.querySelector('.tab-btn[data-tab="'+tp.id+'"]');if(tb)tb.click();}
 /* zugeklappte details öffnen */
 for(var d=el.parentElement;d;d=d.parentElement){if(d.tagName==='DETAILS'&&!d.open)d.open=true;}
 setTimeout(function(){
  var t=el.classList.contains('anc')?el.parentElement:el;
  var box=t.closest('tr,.uc,.story,.field-box')||t;
  try{box.scrollIntoView({block:'center'});}catch(e){}
  box.classList.remove('anc-flash');void box.offsetWidth;box.classList.add('anc-flash');
 },60);
}
window.addEventListener('hashchange',go);
if(document.readyState==='complete')setTimeout(go,250);else window.addEventListener('load',function(){setTimeout(go,250);});
})();
