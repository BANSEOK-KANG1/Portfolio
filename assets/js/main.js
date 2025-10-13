// ============================
// main.js — 전역 스크립트
// - 헬퍼
// - 테마 토글
// - 헤더 스크롤 상태
// - 푸터 연도 갱신
// ============================

// 전역 헬퍼: 중복 선언 방지
window.$ = window.$ || ((s, r = document) => r.querySelector(s));

/* 테마 토글(아이콘 전환 + data-theme 저장) */
(function(){
  const btn = $('#themeToggle');
  const doc = document.documentElement;

  const set = (mode) => {
    doc.setAttribute('data-theme', mode);
    try{ localStorage.setItem('bs-theme', mode); }catch(e){}
    if(btn){
      btn.setAttribute('aria-pressed', String(mode==='dark'));
      const icon = btn.querySelector('.icon');
      if(icon) icon.textContent = mode==='dark' ? '🌙' : '☀️';
    }
  };

  set(doc.getAttribute('data-theme') || 'dark');
  if(btn){
    btn.addEventListener('click', ()=>{
      const next = (doc.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      set(next);
    });
  }
})();

/* 헤더 스크롤 상태 (배경 농도 살짝) */
(function(){
  const root = document.body;
  const onScroll = () => {
    if(window.scrollY > 8) root.classList.add('scrolled');
    else root.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* 푸터 연도 갱신 */
(function(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
})();