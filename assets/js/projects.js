// projects.js — 카드 렌더 + 필터 + 안전한 상세 시트
document.getElementById('year').textContent = new Date().getFullYear();

const DATA = [
  {id:1,  title:"노션 공부 아카이브", desc:"마케팅/데이터 학습을 노션으로 구조화한 기록 저장소.",
   img:"assets/img/projects/pj-1.jpg", link:"https://www.notion.so/",
   tags:["데이터분석","마케팅","PM"], period:"2024.05 ~ 진행중", role:"학습 콘텐츠 큐레이션, 구조 설계"},
  {id:2,  title:"데이터 분석 블로그", desc:"티스토리 기반 인사이트 공유 블로그.",
   img:"assets/img/projects/pj-2.jpg", link:"https://banseok-data.tistory.com/",
   tags:["데이터분석","마케팅"], period:"2023.12 ~ 진행중", role:"콘텐츠 작성, SEO/트래픽 분석"},
  {id:3,  title:"Wix 실습 웹사이트", desc:"Wix로 반응형 프로모션 사이트 제작.",
   img:"assets/img/projects/pj-3.jpg", link:"https://wix.com/",
   tags:["웹","브랜딩"], period:"2024.02 ~ 2024.03", role:"IA/디자인/퍼블리싱"},
  {id:4,  title:"데이터 대시보드 시각화", desc:"실시간 KPI 볼 수 있는 경량 대시보드.",
   img:"assets/img/projects/pj-4.jpg", link:"#",
   tags:["데이터분석","웹"], period:"2024.01 ~ 2024.03", role:"프론트엔드/차트"},
  {id:5,  title:"콘텐츠 퍼널 자동화", desc:"SNS/블로그 동시 발행 파이프라인.",
   img:"assets/img/projects/pj-5.jpg", link:"#",
   tags:["마케팅","자동화","PM"], period:"2024.04 ~ 2024.06", role:"기획/운영 자동화"},
  {id:6,  title:"유튜브 분석 도구", desc:"조회수/구독자 예측 간이 모델.",
   img:"assets/img/projects/pj-6.jpg", link:"#",
   tags:["데이터분석","마케팅"], period:"2024.07 ~ 2024.08", role:"데이터 모델링"},
  {id:7,  title:"SQL 리포팅 자동화", desc:"주간 지표 리포트 자동 생성.",
   img:"assets/img/projects/pj-7.jpg", link:"#",
   tags:["데이터분석","자동화"], period:"2024.03 ~ 2024.04", role:"쿼리/스케줄링"},
  {id:8,  title:"AI 리서치 봇", desc:"키워드 트렌드 모니터링 및 큐레이션.",
   img:"assets/img/projects/pj-8.jpg", link:"#",
   tags:["데이터분석","마케팅","자동화"], period:"2025.01 ~ 2025.02", role:"기획/분석"},
  {id:9,  title:"포트폴리오 리뉴얼", desc:"반응형+다크모드+접근성 강화.",
   img:"assets/img/projects/pj-9.jpg", link:"#",
   tags:["웹","브랜딩","PM"], period:"2025.03 ~ 2025.04", role:"디자인/개발"},
  {id:10, title:"마케팅 데이터 허브", desc:"여정 기반 지표 통합 플랫폼.",
   img:"assets/img/projects/pj-10.jpg", link:"#",
   tags:["데이터분석","마케팅","PM"], period:"2025.05 ~ 2025.07", role:"PM/데이터 전략"},
];

// 렌더 대상
const grid = document.getElementById('pjGrid');

// 카드 생성
function renderCards(list){
  grid.innerHTML = list.map(p => `
    <article class="pj-card" data-id="${p.id}" tabindex="0">
      <img class="pj-thumb" src="${p.img||''}" alt="${p.title}" onerror="this.removeAttribute('src')" />
      <div class="pj-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <ul class="tags">${p.tags.map(t=>`<li>#${t}</li>`).join('')}</ul>
      </div>
    </article>
  `).join('');
}
renderCards(DATA);

// 필터칩
const chips = Array.from(document.querySelectorAll('.pj-filter .chip'));
chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const tag = chip.dataset.tag;
    if(tag === 'all') return renderCards(DATA);
    const filtered = DATA.filter(p => p.tags.includes(tag));
    renderCards(filtered);
    attachOpenEvents(); // 새 카드에 이벤트 다시 연결
  });
});

// 상세 시트
const sheet = document.getElementById('pjSheet');
const closeEls = sheet.querySelectorAll('[data-close]');
const imgEl   = document.getElementById('pjImg');
const titleEl = document.getElementById('pjTitle');
const tagsEl  = document.getElementById('pjTags');
const descEl  = document.getElementById('pjDesc');
const metaEl  = document.getElementById('pjMeta');
const linkEl  = document.getElementById('pjLink');

function openSheet(p){
  // 안전 주입
  imgEl.src = ''; imgEl.removeAttribute('src'); // 초기화
  if(p.img){ imgEl.src = p.img; imgEl.alt = p.title; imgEl.onerror = ()=> imgEl.removeAttribute('src'); }

  titleEl.textContent = p.title || '(제목 없음)';
  tagsEl.innerHTML = (p.tags||[]).map(t=>`<li>#${t}</li>`).join('');
  descEl.textContent = p.desc || '';
  metaEl.innerHTML = `
    <li><strong>기간:</strong> ${p.period||'-'}</li>
    <li><strong>맡은 일:</strong> ${p.role||'-'}</li>
  `;
  linkEl.href = p.link || '#';

  sheet.removeAttribute('hidden');
  sheet.setAttribute('aria-hidden','false');
  // 포커스 이동(접근성)
  sheet.querySelector('.pj-sheet__close').focus();
}
function closeSheet(){
  sheet.setAttribute('hidden','');
  sheet.setAttribute('aria-hidden','true');
}

// 카드/키보드로 열기
function attachOpenEvents(){
  document.querySelectorAll('.pj-card').forEach(card=>{
    const open = ()=>{
      const id = Number(card.dataset.id);
      const p = DATA.find(x=>x.id===id);
      if(p) openSheet(p);
    };
    card.onclick = open;
    card.onkeydown = (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); open(); } };
  });
}
attachOpenEvents();

// 닫기/ESC/배경 클릭
closeEls.forEach(el=> el.addEventListener('click', closeSheet));
window.addEventListener('keydown', e=>{ if(e.key==='Escape' && sheet.getAttribute('aria-hidden')==='false') closeSheet(); });