(function(){
var D=__DATA__;
var CASE='ba-re-case-lindenfeld-lunch.html',PH='lindenfeld-projektauftrag-pflichtenheft.html';
var R=document.documentElement;
var HOST=document.getElementById('navHub')?'g':(document.querySelector('.tab[data-s="0"]')&&document.getElementById('st0')?'p':'s');
var framed=window.parent!==window;
var RE=/\b(?:(?:GZ|FE|BR|FR|NFR|NT|UC|US|TF|CR|EM|OP|ADR|R)-\d+|KR\d\.\d|M[0-6]|E[1-8]|O[1-3])\b/g;
var SKIP='a,button,script,style,textarea,input,select,option,svg,h1,summary,.tab,.chip,.opt,.fallk,.footer-mono,#idxpop,#fallpop,.ansbtn,.snav';
var pop=document.createElement('div');pop.id='idxpop';pop.hidden=true;pop.setAttribute('role','dialog');pop.setAttribute('aria-label','Kürzel');document.body.appendChild(pop);
var cur=null;
function en(){return R.lang==='en';}
function pick(o){return en()?o.e:o.d;}
function kindOf(id){return D.kinds[D.ids[id].k];}
function link(){
 var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),ns=[],n;
 while((n=w.nextNode())){if(n.nodeValue&&n.nodeValue.search(RE)>=0)ns.push(n);}
 ns.forEach(function(tn){
  var p=tn.parentNode;if(!p||(p.closest&&p.closest(SKIP)))return;
  var t=tn.nodeValue,last=0,fr=document.createDocumentFragment(),any=false,m;
  RE.lastIndex=0;
  while((m=RE.exec(t))){
   var id=m[0];if(!D.ids[id])continue;
   if(m.index>last)fr.appendChild(document.createTextNode(t.slice(last,m.index)));
   var a=document.createElement('a');a.className='idx';a.href='#';a.setAttribute('role','button');a.setAttribute('data-idx',id);a.setAttribute('aria-haspopup','dialog');a.textContent=id;
   fr.appendChild(a);last=m.index+id.length;any=true;
  }
  if(any){if(last<t.length)fr.appendChild(document.createTextNode(t.slice(last)));p.replaceChild(fr,tn);}
 });
}
function close(){pop.hidden=true;cur=null;}
function render(id){
 var e=D.ids[id],k=D.kinds[e.k],x=en(),h='';
 var tp=e.p?pick(e.p):'',tc=e.c?pick(e.c):'',title=tp.length>=tc.length?tp:tc;
 if(e.k==='NT'&&title)title=(x?'tests ':'prüft ')+title;
 h+='<p class="ip-h"><span class="ip-id">'+id+'</span> · '+(x?k[1]:k[0])+'</p>';
 if(title)h+='<p class="ip-t">'+title.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</p>';
 h+='<p class="ip-d">'+(x?k[3]:k[2])+'</p><div class="ip-b"></div>';
 pop.innerHTML=h;
 var b=pop.querySelector('.ip-b');
 function btn(txt,cls,fn){var o=document.createElement('button');o.type='button';o.className=cls||'';o.textContent=txt;o.addEventListener('click',function(ev){ev.stopPropagation();fn();});b.appendChild(o);}
 if(e.p&&HOST!=='p')btn(x?'Show in the charter →':'Im Pflichtenheft ansehen →',e.c?'':'go',function(){close();goP(id);});
 if(e.p&&HOST==='p')btn(x?'Jump to the row →':'Zur Zeile springen →','go',function(){close();goP(id);});
 if(e.c)btn(x?'Show in the case →':'Im Case ansehen →',(e.p&&HOST!=='p')?'go':'',function(){close();goC(id);});
 btn(x?'Close':'Schließen','',close);
}
function open(id,a){cur=id;render(id);pop.hidden=false;}
function stOf(s){return s.replace('st','');}
function goP(id){
 var e=D.ids[id];if(!e||!e.p)return;
 if(HOST==='g'&&window.__gpOpen){window.__gpOpen('p',e.p.s+':'+id,id);return;}
 if(HOST==='p'){reveal(e.p.s,id);return;}
 var a=e.p.s+':'+id;
 if(framed)parent.postMessage({gp:'open',k:'p',a:a,l:id},'*');else{if(window.__idxBack)window.__idxBack.mark(id);location.href=PH+'#'+a;}
}
function goC(id){
 var e=D.ids[id];if(!e||!e.c)return;
 var a=e.c.s+(/\./.test(e.c.r)?'':':ref-'+e.c.r);
 if(HOST==='g'&&window.__gpOpen){window.__gpOpen('c',a,id);return;}
 if(framed)parent.postMessage({gp:'open',k:'c',a:a,l:id},'*');else{if(window.__idxBack)window.__idxBack.mark(id);location.href=CASE+'#'+a;}
}
function reveal(st,id){
 var t=document.querySelector('.tab[data-s="'+stOf(st)+'"]');
 if(t)t.dispatchEvent(new Event('pointerup',{bubbles:true}));
 if(!id){window.scrollTo(0,0);return;}
 var rows=document.querySelectorAll('#'+st+' tr'),hit=null;
 for(var i=0;i<rows.length&&!hit;i++){var c=rows[i].querySelector('td');if(c&&(c.textContent.trim().split(/\s+/)[0]===id))hit=rows[i];}
 if(!hit)return;
 var tw=hit.closest('.tw');if(tw&&!tw.classList.contains('open')){var mb=tw.nextElementSibling&&tw.nextElementSibling.querySelector('.morebtn');if(mb)mb.dispatchEvent(new Event('pointerup',{bubbles:true}));}
 try{hit.scrollIntoView({block:'center'});}catch(e){}
 hit.classList.remove('idx-flash');void hit.offsetWidth;hit.classList.add('idx-flash');
}
document.addEventListener('click',function(ev){
 var t=ev.target;if(!t.closest)return;
 var a=t.closest('a.idx');
 if(a){ev.preventDefault();ev.stopPropagation();var id=a.getAttribute('data-idx');if(cur===id&&!pop.hidden){close();}else{open(id);}return;}
 if(!pop.hidden&&!t.closest('#idxpop'))close();
},true);
document.addEventListener('keydown',function(ev){if(ev.key==='Escape'&&!pop.hidden)close();});
new MutationObserver(function(){if(!pop.hidden&&cur)render(cur);}).observe(R,{attributes:true,attributeFilter:['lang']});
var tm=null;
function sched(){if(tm)return;tm=setTimeout(function(){tm=null;link();},30);}
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){if(ms[i].type==='childList'&&(ms[i].addedNodes.length)){var ok=false;ms[i].addedNodes.forEach(function(n){if(!(n.nodeType===1&&n.id==='idxpop')&&!(n.nodeType===1&&n.classList.contains('idx')))ok=true;});if(ok){sched();return;}}}}).observe(document.body,{childList:true,subtree:true});
link();
window.__idx={reveal:reveal,link:link};
})();
