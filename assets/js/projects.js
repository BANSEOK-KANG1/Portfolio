// ============================
// projects.js — 검색/필터/정렬
// ============================

const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const $  = (sel, root = document) => root.querySelector(sel);

(function initProjects(){
  const listEl  = $('#pjList');
  const cards   = $$('.pj-card', listEl);
  const search  = $('#pjSearch');
  const sortSel = $('#pjSort');
  const tags    = $$('.pj-tag');

  let state = {
    q: '',
    tag: 'all',
    sort: 'new'
  };

  function normalize(s){ return (s||'').toLowerCase().trim(); }

  function apply(){
    // 1) 필터
    const q = normalize(state.q);
    const tag = state.tag;

    let visible = [];

    cards.forEach(card => {
      const title = normalize(card.dataset.title);
      const tags  = (card.dataset.tags || '').split(',').map(s=>s.trim());
      const matchQ   = q ? title.includes(q) : true;
      const matchTag = (tag === 'all') ? true : tags.includes(tag);

      const show = matchQ && matchTag;
      card.style.display = show ? '' : 'none';
      if(show) visible.push(card);
    });

    // 2) 정렬
    const cmp = {
      new: (a,b) => (b.dataset.date||'').localeCompare(a.dataset.date||''),
      old: (a,b) => (a.dataset.date||'').localeCompare(b.dataset.date||''),
      az:  (a,b) => (a.dataset.title||'').localeCompare(b.dataset.title||''),
      za:  (a,b) => (b.dataset.title||'').localeCompare(a.dataset.title||''),
    }[state.sort];

    visible.sort(cmp);
    visible.forEach(el => listEl.appendChild(el)); // DOM 재배치

    // 3) 비어있을 때 메시지
    let empty = $('#pjEmpty');
    if(visible.length === 0){
      if(!empty){
        empty = document.createElement('div');
        empty.id = 'pjEmpty';
        empty.className = 'pj-empty';
        empty.textContent = '조건에 맞는 프로젝트가 없습니다.';
        listEl.after(empty);
      }
    }else{
      empty && empty.remove();
    }
  }

  // 이벤트 바인딩
  search && search.addEventListener('input', (e)=>{ state.q = e.target.value; apply(); });
  sortSel && sortSel.addEventListener('change', (e)=>{ state.sort = e.target.value; apply(); });
  tags.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tags.forEach(b=>{ b.classList.remove('is-on'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('is-on'); btn.setAttribute('aria-pressed','true');
      state.tag = btn.dataset.filter || 'all';
      apply();
    });
  });

  apply(); // 초기 렌더
})();
