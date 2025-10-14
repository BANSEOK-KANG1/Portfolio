// ============================
// index.js — 인덱스 전용
// - 타이핑 이펙트(저는/[타이핑]/입니다)
// - 풀 배경 슬라이더(연속 모션)
// ============================

window.$ = window.$ || ((s, r = document) => r.querySelector(s));

/* 3행 타이핑 */
(function typingInit(){
  const el = document.querySelector('#typingTarget');
  if(!el) return;
  const roles = (el.getAttribute('data-roles') || '').split(',').map(s=>s.trim()).filter(Boolean);
  if(!roles.length) return;

  let idx = 0, pos = 0, dir = 1;
  const speedType = 85, speedBack = 45, holdAfterType = 1200, holdAfterErase = 300;

  function restartUnderline(){
    el.classList.remove('restart-underline');
    // 강제로 리플로우 시켜 애니메이션 재시작
    void el.offsetWidth;
    el.classList.add('restart-underline');
  }

  function loop(){
    const current = roles[idx];

    if (dir === 1){
      pos++; el.textContent = current.slice(0, pos);
      if (pos === current.length){ dir = -1; return setTimeout(loop, holdAfterType); }
      return setTimeout(loop, speedType);
    } else {
      pos--; el.textContent = current.slice(0, Math.max(0,pos));
      if (pos === 0){
        dir = 1; idx = (idx + 1) % roles.length;
        restartUnderline();                 // ← 여기 추가
        return setTimeout(loop, holdAfterErase);
      }
      return setTimeout(loop, speedBack);
    }
  }
  restartUnderline(); // 첫 단어에도 적용
  loop();
})();

/* 풀 배경 슬라이더(페이드 + 스케일 + 살짝 이동) */
(function bgSlider(){
  const imgs = document.querySelectorAll('.hero-bg__img');
  if(imgs.length < 2) return;
  let i = 0, dur = 4200;
  setInterval(()=>{
    const next = (i + 1) % imgs.length;
    imgs[i].classList.remove('is-active');
    imgs[i].classList.add('is-leaving');
    imgs[next].classList.add('is-active');
    setTimeout(()=> imgs[i].classList.remove('is-leaving'), 1400);
    i = next;
  }, dur);
})();
