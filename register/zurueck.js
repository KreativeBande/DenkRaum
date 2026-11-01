/* Sprungmarken „Zurück zu Start“ und „Zurück zum Seminar“.
   Einbinden:  Werkzeug: <script src="../register/zurueck.js" defer></script>
               Seminarseite (kurse/): dieselbe Zeile; sie hängt ?s=<Nr> an Werkzeug-Links.
   Liest window.DENKRAUM_REGISTER (lädt register/tools.js selbst, falls nötig). */
(function(){
  var me=document.currentScript,base=new URL('../',me.src);
  function abs(p){return new URL(p,base).href}
  function load(cb){
    if(window.DENKRAUM_REGISTER)return cb();
    var s=document.createElement('script');s.src=abs('register/tools.js');s.onload=cb;document.head.appendChild(s);
  }
  function rel(){var p=location.pathname,i=p.indexOf('/tools/');if(i>-1)return p.slice(i+1);i=p.indexOf('/kurse/');return i>-1?p.slice(i+1):''}
  function T(de,en){return (document.documentElement.lang||'de').slice(0,2)==='en'?en:de}
  function sess(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}
  function init(){
    var R=window.DENKRAUM_REGISTER,datei=rel(),sem={};R.seminare.forEach(function(s){sem[s.nr]=s});
    if(datei.indexOf('kurse/')===0){ // Seminarseite: Werkzeug-Links markieren
      var me2=R.seminare.filter(function(s){return s.datei===datei})[0];if(!me2)return;
      sess('dr_sem',me2.nr);
      [].forEach.call(document.querySelectorAll('a[href*="tools/"]'),function(a){
        var h=a.getAttribute('href');if(h.indexOf('?')<0&&/\.html(#|$)/.test(h))a.setAttribute('href',h.replace(/\.html(#|$)/,'.html?s='+me2.nr+'$1'))});
      return;
    }
    var tool=R.tools.filter(function(t){return t.datei===datei})[0];
    var q=new URLSearchParams(location.search).get('s');
    if(q&&sem[q]){sess('dr_sem',q)}
    var nr=q&&sem[q]?q:sess('dr_sem'),list=(tool&&tool.haufeSeminare)||[];
    var cur=nr&&sem[nr]&&(!tool||list.indexOf(nr)>-1||q)?sem[nr]:null;
    if(!cur&&list.length===1)cur=sem[list[0]];
    var box=document.createElement('div');box.className='dr-sprung';box.setAttribute('role','navigation');box.setAttribute('aria-label','Sprungmarken');
    var h='<a href="'+abs('index.html')+'">← '+T('Zurück zu Start','Back to start')+'</a>';
    if(cur)h+='<a href="'+abs(cur.datei)+'">← '+T('Zurück zum Seminar','Back to seminar')+'<small>'+(T(cur.kurz,cur.kurz_en||cur.kurz))+'</small></a>';
    else if(list.length>1)h+='<details><summary>← '+T('Zurück zum Seminar','Back to seminar')+'</summary>'+list.map(function(n){return sem[n]?'<a href="'+abs(sem[n].datei)+'">'+(T(sem[n].kurz,sem[n].kurz_en||sem[n].kurz))+'</a>':''}).join('')+'</details>';
    box.innerHTML=h;
    var st=document.createElement('style');
    st.textContent='.dr-sprung{font:600 14px/1.3 system-ui,sans-serif;display:flex;flex-direction:column;gap:4px;margin:0 0 12px;padding:8px;border:1px solid #c9d2e6;border-radius:10px;background:#f2f5fb}'
     +'.dr-sprung a,.dr-sprung summary{color:#1d3a8a;text-decoration:none;padding:6px 8px;border-radius:6px;display:block;cursor:pointer}'
     +'.dr-sprung a:hover,.dr-sprung summary:hover{background:#dfe7f7}.dr-sprung small{display:block;font-weight:400;color:#5b6475;font-size:12px}'
     +'.dr-sprung details a{padding-left:20px;font-weight:500}.dr-sprung.dr-fix{position:fixed;left:8px;bottom:8px;z-index:9999;max-width:210px;box-shadow:0 4px 14px rgba(0,0,0,.18)}'
     +'.back-link[href$="index.html"]{display:none!important}'
     +'html.beamer .dr-sprung{font-size:17px}@media print{.dr-sprung{display:none}}'
     +'.dr-sprung a:focus-visible,.dr-sprung summary:focus-visible{outline:3px solid #ffb300}';
    document.head.appendChild(st);
    var host=document.querySelector('nav.sidebar')||document.querySelector('aside.sidebar')||document.querySelector('.sidebar')||document.querySelector('nav');
    if(host)host.insertBefore(box,host.firstChild);else{box.className+=' dr-fix';document.body.appendChild(box)}
  }
  function go(){load(init)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
