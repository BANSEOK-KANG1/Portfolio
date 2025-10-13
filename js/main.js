const $=(s,r=document)=>r.querySelector(s);

// 테마 토글
(function(){
  const btn=$('#themeToggle'); const doc=document.documentElement;
  const set=m=>{ doc.setAttribute('data-theme',m);
    localStorage.setItem('bs-theme',m);
    if(btn){ btn.setAttribute('aria-pressed',String(m==='dark'));
      btn.querySelector('.icon').textContent=m==='dark'?'🌙':'☀️'; } };
  set(doc.getAttribute('data-theme')||'dark');
  btn&&btn.addEventListener('click',()=>set(doc.getAttribute('data-theme')==='dark'?'light':'dark'));
})();

// 헤더 스크롤 상태
(function(){
  const root=document.body;
  const onScroll=()=>{ (window.scrollY>8)?root.classList.add('scrolled'):root.classList.remove('scrolled'); };
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
})();

// 연도 갱신
(function(){
  const el=document.getElementById('year'); if(el) el.textContent=new Date().getFullYear();
})();