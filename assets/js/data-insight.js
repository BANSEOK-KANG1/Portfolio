/* =======================
   데이터 인사이트 전용 JS (Chart.js 스케폴드 포함)
======================= */

// 모달에서 재사용할 Chart 인스턴스
let __chartInstance = null;

// 가짜 데이터(모달용). 필요시 실제 데이터로 대체
const INSIGHT_DATA = {
  i1: {
    title: '검색 트렌드 리포트 2025Q1',
    tags: ['트렌드','검색데이터'],
    // 이미지 대신 라인차트 스케폴드
    chart: {
      type: 'line',
      data: {
        labels: ['01월','02월','03월','04월','05월','06월'],
        datasets: [{
          label: '키워드A',
          data: [48, 52, 61, 59, 66, 71],
          tension: 0.35,
          fill: false
        },{
          label: '키워드B',
          data: [30, 33, 35, 42, 40, 46],
          tension: 0.35,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { ticks: { precision: 0 } } }
      }
    },
    desc: '검색량/연관어/계절성 데이터를 결합, 사회 관심사 흐름과 잠재 수요를 도출했습니다.',
    meta: [
      ['데이터 소스', 'Google Trends · 네이버 데이터랩'],
      ['분석 포인트', '수요 전조지표, 시차/상관, 키워드 클러스터'],
      ['형식', 'PDF 리포트 + 시트']
    ],
    link: '#'
  },
  i2: {
    title: '광고 효율 대시보드',
    tags: ['마케팅','성과분석'],
    chart: {
      type: 'bar',
      data: {
        labels: ['검색광고','SNS피드','동영상','디스플레이'],
        datasets: [{
          label: 'CTR(%)',
          data: [4.2, 2.8, 3.4, 1.9],
          yAxisID: 'y1'
        },{
          label: '전환율(%)',
          data: [2.1, 1.2, 1.6, 0.8],
          yAxisID: 'y2'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y1: { type: 'linear', position: 'left', min: 0, ticks: { callback:v=>v+'%' } },
          y2: { type: 'linear', position: 'right', min: 0, grid: { drawOnChartArea: false }, ticks: { callback:v=>v+'%' } }
        }
      }
    },
    desc: '채널별 CTR/전환율/ROAS를 비교해 예산 재배분 레버리지를 도출했습니다.',
    meta: [
      ['지표', '노출 · 클릭 · 전환 · CPA · ROAS'],
      ['인사이트', '모바일 피드형 CTR↑, 검색브랜드 전환율↑'],
      ['형식', '인터랙티브 대시보드']
    ],
    link: '#'
  },
  i3: {
    title: '유저 리텐션 분석',
    tags: ['사용자행동','리텐션'],
    chart: {
      type: 'line',
      data: {
        labels: ['D1','D3','D7','D14','D21','D30'],
        datasets: [{
          label: '리텐션(%)',
          data: [42, 33, 27, 21, 18, 15],
          tension: 0.3,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { suggestedMin: 0, suggestedMax: 60, ticks: { callback:v=>v+'%' } } }
      }
    },
    desc: '코호트별 잔존율을 기반으로 리텐션을 세분화하고, 재방문 경로를 시각화했습니다.',
    meta: [
      ['코호트', '가입 주차 기준'],
      ['핵심', 'D1/D7/D30 잔존 · 재활성 큐'],
      ['형식', '히트맵 · 퍼널']
    ],
    link: '#'
  },
  i4: {
    title: '랜딩 A/B 테스트',
    tags: ['AB테스트','가설검증'],
    chart: {
      type: 'bar',
      data: {
        labels: ['A','B'],
        datasets: [{
          label: '전환율(%)',
          data: [3.1, 4.9]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display:false } },
        scales: { y: { suggestedMin: 0, suggestedMax: 6, ticks: { callback:v=>v+'%' } } }
      }
    },
    desc: '히어로 문구/CTA 대비 실험을 설계하고 통계적 유의성(α=0.05)으로 판단했습니다.',
    meta: [
      ['실험 대상', '신규 유입 랜딩'],
      ['결과', '변형B의 전환율 +8.2%p(유의)'],
      ['형식', '테스트 리포트']
    ],
    link: '#'
  },
  i5: {
    title: '통찰 노트: 구매 장벽',
    tags: ['인사이트','레버리지'],
    // 이 항목은 이미지를 계속 활용하고 싶다면 chart 속성을 생략하고 img를 사용 가능
    img: 'assets/img/insight/insight-5.jpg',
    desc: '퍼널 이탈 구간을 진단하고 질문/카피/보장 정책으로 장벽을 낮추는 방안을 제시합니다.',
    meta: [
      ['퍼널', '노출 → 클릭 → 상세 체류 → 장바구니 → 결제'],
      ['Quick Win', 'FAQ/보장정책 · 간결한 체크아웃'],
      ['형식', '텍스트 노트']
    ],
    link: '#'
  }
};

// 유틸
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

/* ---------- 필터칩 ---------- */
(function filterChips(){
  const chips = $$('.chip-list .chip');
  const cards = $$('.insight-card');

  function apply(cat){
    cards.forEach(card=>{
      const on = (cat==='all') || card.dataset.cat===cat;
      card.style.display = on ? '' : 'none';
    });
  }
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('is-active'));
      chip.classList.add('is-active');
      apply(chip.dataset.cat);
    });
  });
})();

/* ---------- 시트(모달) ---------- */
(function sheet(){
  const sheet = $('#insightSheet');
  const closeTargets = $$('[data-close]', sheet);
  const imgEl  = $('#isImg', sheet);
  const chartEl= $('#isChart', sheet);
  const titleEl= $('#isTitle', sheet);
  const tagsEl = $('#isTags', sheet);
  const descEl = $('#isDesc', sheet);
  const metaEl = $('#isMeta', sheet);
  const linkEl = $('#isLink', sheet);

  function lockScroll(on){ document.body.classList.toggle('is-sheet-open', !!on); }

  function renderChart(cfg){
    // 이전 차트 파괴
    if(__chartInstance){ __chartInstance.destroy(); __chartInstance = null; }
    chartEl.hidden = false;  chartEl.removeAttribute('aria-hidden');
    imgEl.hidden   = true;   imgEl.setAttribute('aria-hidden','true');

    const ctx = chartEl.getContext('2d');
    __chartInstance = new Chart(ctx, {
      type: cfg.type,
      data: cfg.data,
      options: cfg.options || { responsive:true, maintainAspectRatio:false }
    });
  }

  function showImage(src, alt){
    if(__chartInstance){ __chartInstance.destroy(); __chartInstance = null; }
    imgEl.hidden = false;  imgEl.removeAttribute('aria-hidden');
    chartEl.hidden = true; chartEl.setAttribute('aria-hidden','true');
    imgEl.src = src || '';
    imgEl.alt = alt || '';
  }

  function open(id){
    const item = INSIGHT_DATA[id];
    if(!item) return;

    // 미디어 선택: chart 우선, 없으면 이미지
    if(item.chart && window.Chart){
      renderChart(item.chart);
    }else{
      showImage(item.img, item.title);
    }

    titleEl.textContent = item.title || '(제목 없음)';
    tagsEl.innerHTML = (item.tags||[]).map(t=>`<li>#${t}</li>`).join('');
    descEl.textContent = item.desc || '';
    metaEl.innerHTML = (item.meta||[]).map(([k,v])=>`<li><strong>${k}:</strong> ${v}</li>`).join('');
    linkEl.href = item.link || '#';

    sheet.hidden = false;
    sheet.setAttribute('aria-hidden','false');
    lockScroll(true);
    $('.is-sheet__close', sheet).focus();
  }

  function close(){
    sheet.hidden = true;
    sheet.setAttribute('aria-hidden','true');
    lockScroll(false);
  }

  // 카드 → 열기
  $$('.insight-card').forEach(card=>{
    const id = card.dataset.id;
    const openFn = ()=> open(id);
    card.addEventListener('click', openFn);
    card.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); openFn(); }});
  });

  // 닫기
  closeTargets.forEach(el=> el.addEventListener('click', close));
  window.addEventListener('keydown', e=>{ if(e.key==='Escape' && !sheet.hidden) close(); });
})();

/* ---------- 푸터 연도 ---------- */
(function(){ const y=$('#year'); if(y) y.textContent=new Date().getFullYear(); })();