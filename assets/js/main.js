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
  const DOC = document.documentElement;
  function get() { return DOC.getAttribute('data-theme') || localStorage.getItem('bs-theme') || 'light'; }
  function set(m){
    DOC.setAttribute('data-theme', m);
    try{ localStorage.setItem('bs-theme', m); }catch(e){}
    const btn = document.getElementById('themeToggle');
    if(btn){ btn.setAttribute('aria-pressed', String(m==='dark')); btn.textContent = (m==='dark') ? '🌙' : '☀️'; btn.title = (m==='dark'?'다크 모드':'라이트 모드'); }
  }
  set(get());
  window.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('themeToggle');
    if(btn && !btn.dataset.bound){
      btn.dataset.bound='1';
      btn.addEventListener('click', ()=> set(get()==='dark'?'light':'dark'), {passive:true});
    }
  });
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