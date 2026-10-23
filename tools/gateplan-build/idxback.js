(function(){
if(window.parent!==window||document.getElementById('navHub'))return;
var K='idxBack',KR='idxRet',R=document.documentElement;
function ss(){try{return window.sessionStorage;}catch(e){return null;}}
function get(k){var s=ss();if(!s)return null;try{return JSON.parse(s.getItem(k)||'null');}catch(e){return null;}}
function put(k,v){var s=ss();if(!s)return;try{if(v===null)s.removeItem(k);else s.setItem(k,JSON.stringify(v));}catch(e){}}
function file(u){return (u||'').split('#')[0].split('?')[0];}
function en(){return R.lang==='en';}
var st=document.createElement('style');
st.textContent='#idxback{position:fixed;left:16px;bottom:16px;z-index:125;min-height:44px;padding:8px 18px;border-radius:999px;border:2px solid var(--ink,#1F2A3A);background:var(--ink,#1F2A3A);color:#fff;font:600 16px/1.2 inherit;font-family:inherit;cursor:pointer;box-shadow:0 6px 18px rgba(31,42,58,.3);max-width:calc(100vw - 32px)}#idxback[hidden]{display:none}#idxback:focus-visible{outline:3px solid #E0A800;outline-offset:2px}html.beamer #idxback{font-size:22px}html.beamer-xl #idxback{font-size:28px}html.beamer-xxl #idxback{font-size:34px}@media (max-width:600px){#idxback{left:8px;bottom:8px}}';
document.head.appendChild(st);
var b=document.createElement('button');b.id='idxback';b.type='button';b.hidden=true;document.body.appendChild(b);
function top(){var s=get(K);if(!s||!s.length)return null;var t=s[s.length-1];if(Date.now()-t.t>6*3600*1000)return null;return t;}
function refresh(){
 var t=top();
 if(!t||file(t.u)===file(location.href)){b.hidden=true;return;}
 b.textContent='↩ '+(en()?'Back to ':'Zurück zu ')+t.l;b.hidden=false;
}
function tabNow(){var a=document.querySelector('.tab-btn.active');return a?a.getAttribute('data-tab'):'';}
window.__idxBack={mark:function(label){
 var s=get(K)||[];s.push({u:location.href.split('#')[0],y:Math.round(window.pageYOffset),tab:tabNow(),l:label,t:Date.now()});
 if(s.length>6)s.shift();put(K,s);}};
b.addEventListener('click',function(){
 var s=get(K)||[],t=s.pop();if(!t)return;put(K,s);
 put(KR,{u:file(t.u),y:t.y,tab:t.tab,t:Date.now()});
 location.href=t.u;
});
new MutationObserver(refresh).observe(R,{attributes:true,attributeFilter:['lang']});
refresh();
var r=get(KR);
if(r&&file(r.u)===file(location.href)&&Date.now()-r.t<60000){
 put(KR,null);
 function apply(){
  if(r.tab){var tb=document.querySelector('.tab-btn[data-tab="'+r.tab+'"]');if(tb&&!tb.classList.contains('active'))tb.click();}
  window.scrollTo(0,r.y);
 }
 setTimeout(apply,250);setTimeout(apply,800);
}
})();
