/* ==========================================================================
   BanSeok — 성장일지(one-file) 스크립트
   - 전역 테마 토글
   - 더미 데이터(2025-09 ~ 2026-04, 주 1~3회, 같은 날 중복 방지)
   - 월별 요약(스택 바 + 라인)
   - 달력(월 이동, 날짜 클릭)
   - 카테고리 칩 필터 + 리스트 카드 + 미니 스파크
   - 주간 히트맵 + 누적 레이더
   - 필터 전환 애니메이션
   ========================================================================== */

/* ====== 유틸 ====== */
// 시각화 공통 옵션 (원하면 수치만 바꿔도 즉시 반영)
const CHART_OPTS = {
  heatmap: {
    weeksShown: 10,  // 최근 10주만 (카드에 딱 맞음)
    cell: 12,        // 12px 셀
    gap: 3
  },
  radar: {
    size: 180,       // 180px 정사각 SVG
    levels: 4,
    pulse: true
  }
};
function renderHeatmap(){
  const holder = $('#rfHeatmap'); if(!holder) return;
  holder.innerHTML='';

  const posts = filteredPosts();
  const countMap = new Map();
  posts.forEach(p => {
    const k = fmt(p.date);
    countMap.set(k, (countMap.get(k)||0) + 1);
  });

  // 최근 N주만 취득
  const allWeeks = rangeWeeks(START, END);
  const weeks = allWeeks.slice(-CHART_OPTS.heatmap.weeksShown);

  const cols=7;
  const rows=weeks.length;
  const cell=CHART_OPTS.heatmap.cell;
  const gap =CHART_OPTS.heatmap.gap;
  const padL=42, padT=18;

  const w = padL + cols*(cell+gap) + 8;
  const h = padT + rows*(cell+gap) + 24;

  const svg = svgEl('svg',{viewBox:`0 0 ${w} ${h}`, width:'100%', height:String(h)});

  // 요일 라벨
  ['월','화','수','목','금','토','일'].forEach((lb,i)=>{
    const t=svgEl('text',{
      x: String(padL + i*(cell+gap) + cell/2),
      y: '12',
      'text-anchor':'middle',
      class:'rf-hm-label'
    }); 
    t.textContent=lb; svg.appendChild(t);
  });

  // 최대값(강도 스케일)
  let vmax = 1;
  weeks.forEach(wk=>{
    for(let c=0;c<7;c++){
      const d=new Date(wk); d.setDate(d.getDate()+c);
      if(d<START||d>END) continue;
      vmax = Math.max(vmax, countMap.get(fmt(d))||0);
    }
  });
  const colorOf = v=>{
    if(v===0) return 'var(--hm0)';
    const band = Math.min(5, Math.ceil((v/vmax)*5));
    return `var(--hm${band})`;
  };

  // 셀 그리기(지연 등장 + hover scale)
  let idx=0;
  weeks.forEach((wk,r)=>{
    const rl=svgEl('text',{
      x:'8', y:String(padT + r*(cell+gap) + cell*.75), class:'rf-hm-label'
    });
    rl.textContent=String(r+1);
    svg.appendChild(rl);

    for(let c=0;c<7;c++){
      const d=new Date(wk); d.setDate(d.getDate()+c);
      if(d<START||d>END) continue;

      const v = countMap.get(fmt(d))||0;
      const x = padL + c*(cell+gap);
      const y = padT + r*(cell+gap);

      const rect = svgEl('rect',{
        x, y, width:cell, height:cell, rx:3,
        fill: colorOf(v), class:'hm-cell',
        'data-tip': `${fmt(d)} · ${v}건`
      });
      svg.appendChild(rect);

      // 순차 등장
      rect.style.opacity='0';
      rect.style.transform='scale(0.6)';
      rect.style.transformOrigin = `${x+cell/2}px ${y+cell/2}px`;
      setTimeout(()=>{
        rect.style.opacity='1';
        rect.style.transform='scale(1)';
      }, 20*idx++);
    }
  });

  holder.appendChild(svg);
}

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const ym  = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
const svgEl = (tag, attrs={}) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
};

/* ====== 전역 테마 토글(안정화) ====== */
(function(){
  const DOC = document.documentElement;
  const get = () => DOC.getAttribute('data-theme') || localStorage.getItem('bs-theme') || 'light';
  const set = (m) => {
    DOC.setAttribute('data-theme', m);
    try{ localStorage.setItem('bs-theme', m); }catch(e){}
    const btn = $('#themeToggle');
    if(btn){
      btn.setAttribute('aria-pressed', String(m==='dark'));
      btn.textContent = (m==='dark') ? '🌙' : '☀️';
      btn.title = (m==='dark') ? '다크 모드' : '라이트 모드';
    }
  };
  set(get());
  window.addEventListener('DOMContentLoaded', () => {
    const btn = $('#themeToggle');
    if(btn && !btn.dataset.bound){
      btn.dataset.bound='1';
      btn.addEventListener('click', ()=> set(get()==='dark'?'light':'light'==='???'?'':'dark' /* hush lints */ || (get()==='dark'?'light':'dark')));
    }
  });
})();

/* ====== 범위/카테고리 ====== */
const START = new Date(2025, 8, 1);   // 2025-09-01
const END   = new Date(2026, 3, 30);  // 2026-04-30

const CATS = ['데이터분석','마케팅','A/B Test','PM','기획','리서치'];
const CAT_COLOR = {
  '데이터분석':'#4f83ff',
  '마케팅':'#f59e0b',
  'A/B Test':'#22c55e',
  'PM':'#a78bfa',
  '기획':'#8b5cf6',
  '리서치':'#ef4444',
};

/* ====== 시드 랜덤 ====== */
function seededRand(seed=202509){
  let s = seed >>> 0;
  return function(){
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s>>>0) / 4294967296);
  };
}

/* ====== 날짜 유틸 ====== */
function enumerateMonths(start, end){
  const out=[], d=new Date(start.getFullYear(), start.getMonth(), 1);
  while(d<=end){
    out.push({ y:d.getFullYear(), m:d.getMonth(), label:`${d.getMonth()+1}월`, key: ym(d)});
    d.setMonth(d.getMonth()+1, 1);
  }
  return out;
}
function firstDayOfMonth(y,m){ return new Date(y,m,1); }
function lastDayOfMonth(y,m){ return new Date(y,m+1,0); }
function rangeWeeks(start, end){ // 월요일 시작
  const out=[], d=new Date(start);
  const day=(d.getDay()+6)%7; d.setDate(d.getDate()-day);
  while(d<=end){ out.push(new Date(d)); d.setDate(d.getDate()+7); }
  return out;
}

/* ====== 데이터 생성(같은 날 중복 방지) ====== */
function generateData(){
  const weeks = rangeWeeks(START, END);
  const rnd = seededRand(202509);
  const occ = new Set();
  const posts=[];

  const titleTail = ['리뷰','실험','정리','케이스','노트'];

  const nearestFree = (base)=>{
    for(let r=0;r<=6;r++){
      for(const sgn of [-1,1]){
        const cand = new Date(base); cand.setDate(cand.getDate()+r*sgn);
        if(cand<START || cand>END) continue;
        const k=fmt(cand);
        if(!occ.has(k)) return cand;
      }
    }
    return null;
  };

  weeks.forEach(w=>{
    const count = 1+Math.floor(rnd()*3); // 주 1~3회
    const picked = new Set();
    while(picked.size<count) picked.add(1+Math.floor(rnd()*7)); // 서로 다른 요일
    for(const d of picked){
      const base=new Date(w); base.setDate(base.getDate()+(d-1));
      if(base<START||base>END) continue;
      let use=base;
      if(occ.has(fmt(use))){
        const free=nearestFree(base); if(!free) continue; use=free;
      }
      occ.add(fmt(use));

      // 카테고리 1~2개
      const set=new Set(); set.add(CATS[Math.floor(rnd()*CATS.length)]);
      if(rnd()>.6) set.add(CATS[Math.floor(rnd()*CATS.length)]);
      const cats=[...set];

      posts.push({
        id: fmt(use),
        date: new Date(use),
        cats,
        title: `${cats[0]} • ${titleTail[Math.floor(rnd()*titleTail.length)]}`,
        desc: [
          '핵심 지표 정의→수집→시각화까지 일관 정리.',
          '실험 설계/통제변수/검정력 이슈 점검.',
          'SQL·Python 파이프라인 리팩토링.',
          'PM 관점 의사결정/리스크 관리 로그.',
          'UX 관찰 인사이트를 캠페인에 접목.'
        ][Math.floor(rnd()*5)],
        notion: 'https://www.notion.so/your-space',
        tistory:'https://your-tistory.tistory.com'
      });
    }
  });
  posts.sort((a,b)=> a.date-b.date);
  return posts;
}

/* ====== 상태 ====== */
let ALL_POSTS = [];
let ACTIVE_CATS = new Set();              // empty = all
let CURRENT_MONTH_INDEX = 0;               // enumerateMonths 기준
const MONTHS = enumerateMonths(START, END);

/* ====== 필터 결과 ====== */
function filteredPosts(){
  if(ACTIVE_CATS.size===0) return ALL_POSTS;
  return ALL_POSTS.filter(p => p.cats.some(c=> ACTIVE_CATS.has(c)));
}

/* ====== 월별 요약(스택 바 + 라인) ====== */
function renderSummary(){
  const holder = $('#rfSummary'); if(!holder) return;
  holder.innerHTML='';
  const months = MONTHS;
  const stats = months.map(m=>{
    const posts = filteredPosts().filter(p => ym(p.date)===`${m.y}-${String(m.m+1).padStart(2,'0')}`);
    const counts = Object.fromEntries(CATS.map(c=>[c,0]));
    posts.forEach(p=> p.cats.forEach(c=> counts[c]++));
    const total = Object.values(counts).reduce((a,b)=>a+b,0);
    return {m, counts, total};
  });

  const pad={t:8,b:22,l:18,r:18}, barW=22, gap=12, hBar=120, hLine=90, w=months.length*(barW+gap)+pad.l+pad.r;
  const maxT = Math.max(1, ...stats.map(s=>s.total));

  // stack bar
  const svgBar = svgEl('svg',{viewBox:`0 0 ${w} ${hBar}`, width:'100%', height:String(hBar)});
  const scaleY = v => (hBar-pad.t-pad.b) * (v / Math.max(1, ...stats.map(s=>s.total)));
  stats.forEach((s,i)=>{
    let acc=0;
    CATS.forEach(cat=>{
      const v=s.counts[cat], h=scaleY(v);
      const x=pad.l + i*(barW+gap), y=hBar-pad.b-(acc+h); acc+=h;
      if(h>0) svgBar.appendChild(svgEl('rect',{x,y,width:barW,height:h,rx:4,fill:CAT_COLOR[cat]}));
    });
    const tx = pad.l+i*(barW+gap)+barW/2;
    const lbl=svgEl('text',{x:tx, y:hBar-6, 'text-anchor':'middle', 'font-size':10, fill:'currentColor'}); 
    lbl.textContent = s.m.label; svgBar.appendChild(lbl);
  });

  // total line
  const svgLine = svgEl('svg',{viewBox:`0 0 ${w} ${hLine}`, width:'100%', height:String(hLine), style:'margin-top:10px'});
  const xAt = i => pad.l+i*(barW+gap)+barW/2;
  const yAt = v => (hLine-pad.t-pad.b)*(1 - v/maxT) + pad.t;
  let d=''; stats.forEach((s,i)=> d += `${i?'L':'M'} ${xAt(i)} ${yAt(s.total)} `);
  svgLine.appendChild(svgEl('path',{d, fill:'none', stroke:'currentColor','stroke-width':2}));
  stats.forEach((s,i)=> svgLine.appendChild(svgEl('circle',{cx:xAt(i), cy:yAt(s.total), r:3, fill:'currentColor'})));
  holder.append(svgBar, svgLine);
}

/* ====== 미니 스파크 ====== */
function drawSpark(svg, cats){
  const w=110, h=32, pad=3, N=10;
  const rnd = Math.random;
  const pts = Array.from({length:N},(_,i)=> 0.4 + 0.6*Math.abs(Math.sin(i*0.6 + rnd()*1.1)));
  const x=i=> pad + i*((w-2*pad)/(N-1));
  const y=v=> h-pad - v*(h-2*pad);
  const type = ['line','area','bar'][Math.floor(Math.random()*3)];
  const color = CAT_COLOR[cats[0]] || 'currentColor';

  if(type==='line'){
    const d=pts.map((v,i)=> `${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ');
    svg.appendChild(svgEl('path',{d,fill:'none',stroke:color,'stroke-width':2}));
  }else if(type==='area'){
    let d=pts.map((v,i)=> `${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ');
    d += ` L ${x(N-1)} ${h-pad} L ${x(0)} ${h-pad} Z`;
    svg.appendChild(svgEl('path',{d, fill:color, opacity:.22}));
    svg.appendChild(svgEl('path',{d:pts.map((v,i)=> `${i?'L':'M'} ${x(i)} ${y(v)}`).join(' '), fill:'none', stroke:color, 'stroke-width':1.5}));
  }else{
    const bw=(w-2*pad)/N * .6;
    pts.forEach((v,i)=>{
      const X=x(i)-bw/2, Y=y(v), H=h-pad-Y;
      svg.appendChild(svgEl('rect',{x:X,y:Y,width:bw,height:H,rx:1,fill:color,opacity:.75}));
    });
  }
}

/* ====== 달력 ====== */
function renderCalendar(){
  const grid = $('#calendar'); if(!grid) return;
  grid.innerHTML='';

  const month = MONTHS[CURRENT_MONTH_INDEX] || MONTHS[0];
  $('#monthLabel').textContent = `${month.y}년 ${month.m+1}월`;

  const fd=firstDayOfMonth(month.y, month.m), ld=lastDayOfMonth(month.y, month.m);
  const startCell = (fd.getDay()+6)%7; // 월=0
  const totalDays = ld.getDate();
  const cells = startCell + totalDays;
  const rows = Math.ceil(cells/7);

  let day=1;
  for(let r=0;r<rows;r++){
    for(let c=0;c<7;c++){
      const idx=r*7+c;
      const cell=document.createElement('button');
      cell.type='button'; cell.className='rf-cal-day';
      if(idx>=startCell && day<=totalDays){
        const d=new Date(month.y, month.m, day);
        cell.dataset.date = fmt(d);
        cell.setAttribute('aria-label', cell.dataset.date);
        const lbl=document.createElement('div'); lbl.className='rf-cal-head'; lbl.textContent=String(day); cell.appendChild(lbl);

        // 도트(최대 4개)
        const posts = filteredPosts().filter(p => fmt(p.date)===fmt(d));
        if(posts.length){
          const dots = document.createElement('div'); dots.className='rf-dots';
          const used=new Set();
          posts.forEach(p=>{
            const cat=p.cats[0]; if(used.has(cat)) return; used.add(cat);
            const dot=document.createElement('span'); dot.className='dot'; dot.style.background = CAT_COLOR[cat]||'currentColor';
            dots.appendChild(dot);
          });
          cell.appendChild(dots);
        }
        cell.addEventListener('click', ()=> showListForDate(d));
        day++;
      }else{
        cell.classList.add('is-empty');
      }
      grid.appendChild(cell);
    }
  }

  $('#prevMonth').onclick = ()=>{ CURRENT_MONTH_INDEX = Math.max(0, CURRENT_MONTH_INDEX-1); rerenderAll(); };
  $('#nextMonth').onclick = ()=>{ CURRENT_MONTH_INDEX = Math.min(MONTHS.length-1, CURRENT_MONTH_INDEX+1); rerenderAll(); };

  // 우측 카운트 & 디폴트 리스트
  const cnt = filteredPosts().filter(p=> ym(p.date)===`${month.y}-${String(month.m+1).padStart(2,'0')}`).length;
  $('#postCount') && ($('#postCount').textContent = String(cnt));
  $('#dateRange') && ($('#dateRange').textContent = `${MONTHS[0].label}~${MONTHS[MONTHS.length-1].label}`);
  const firstInMonth = filteredPosts().find(p=> ym(p.date)===`${month.y}-${String(month.m+1).padStart(2,'0')}`);
  renderList(firstInMonth ? filteredPosts().filter(p=> ym(p.date)===`${month.y}-${String(month.m+1).padStart(2,'0')}`) : filteredPosts().slice(-8));
}

/* ====== 리스트 ====== */
function showListForDate(d){
  const items = filteredPosts().filter(p=> fmt(p.date)===fmt(d));
  renderList(items, d);
}
function renderList(items, ctxDate=null){
  const wrap = $('#postList'); if(!wrap) return;
  wrap.innerHTML='';
  if(ctxDate){
    const h=document.createElement('h4'); h.className='rf-list-title'; h.textContent = `${fmt(new Date(ctxDate))} 기록`;
    wrap.appendChild(h);
  }
  if(items.length===0){
    const p=document.createElement('p'); p.className='rf-empty'; p.textContent='해당 날짜의 기록이 없습니다.';
    wrap.appendChild(p); return;
  }
  items.forEach(p=>{
    const card=document.createElement('article'); card.className='rf-card-post';
    const head=document.createElement('div'); head.className='rf-post-head';

    const ttl=document.createElement('h5'); ttl.className='rf-post-title'; ttl.textContent=p.title;
    const date=document.createElement('time'); date.className='rf-post-date'; date.textContent=fmt(p.date);
    head.append(ttl,date);

    const desc=document.createElement('p'); desc.className='rf-post-desc'; desc.textContent=p.desc;

    const tags=document.createElement('div'); tags.className='rf-tags';
    p.cats.forEach(c=>{
      const t=document.createElement('span'); t.className='rf-tag'; t.textContent=c; t.style.borderColor = CAT_COLOR[c]||'currentColor';
      tags.appendChild(t);
    });

    // spark
    const svg = svgEl('svg',{viewBox:'0 0 110 32', width:'110', height:'32', class:'rf-spark'});
    drawSpark(svg, p.cats);

    const links=document.createElement('div'); links.className='rf-links';
    const a1=document.createElement('a'); a1.href=p.notion; a1.target='_blank'; a1.rel='noopener'; a1.className='rf-btn'; a1.textContent='노션';
    const a2=document.createElement('a'); a2.href=p.tistory; a2.target='_blank'; a2.rel='noopener'; a2.className='rf-btn'; a2.textContent='티스토리';
    links.append(a1,a2);

    card.append(head, tags, desc, svg, links);
    wrap.appendChild(card);
  });
}

/* ====== 카테고리 칩 ====== */
function renderFilters(){
  const box = $('#filters'); if(!box) return;
  box.innerHTML='';
  CATS.forEach(c=>{
    const btn=document.createElement('button');
    btn.type='button'; btn.className='rf-chip';
    btn.textContent=c;
    btn.setAttribute('aria-pressed', String(ACTIVE_CATS.has(c)));
    if(ACTIVE_CATS.has(c)) btn.classList.add('is-on');

    btn.onclick = ()=>{
      const listWrap = $('#postList');
      if(listWrap){ listWrap.classList.remove('done-swapping'); listWrap.classList.add('is-swapping'); }
      if(ACTIVE_CATS.has(c)) ACTIVE_CATS.delete(c); else ACTIVE_CATS.add(c);
      btn.classList.toggle('is-on');
      btn.setAttribute('aria-pressed', String(ACTIVE_CATS.has(c)));
      rerenderAll();
      if(listWrap){ setTimeout(()=>{ listWrap.classList.remove('is-swapping'); listWrap.classList.add('done-swapping'); }, 120); }
    };
    box.appendChild(btn);
  });
}

/* ====== 주간 히트맵 ====== */

/* ====== 누적 레이더 ====== */
function renderRadar(){
  const holder = $('#rfRadar'); if(!holder) return;
  holder.innerHTML='';

  const data = Object.fromEntries(CATS.map(c=>[c,0]));
  filteredPosts().forEach(p=> p.cats.forEach(c=> data[c] = (data[c]||0)+1));

  const N=CATS.length;
  const size  = CHART_OPTS.radar.size;
  const levels= CHART_OPTS.radar.levels;
  const cx=size/2, cy=size/2, R=size*0.38;

  const svg=svgEl('svg',{viewBox:`0 0 ${size} ${size}`, width:'100%', height:String(size)});

  // 격자(다각형)
  for(let lv=1; lv<=levels; lv++){
    const r=(R/levels)*lv; let d='';
    for(let i=0;i<=N;i++){
      const a=(Math.PI*2/N)*i - Math.PI/2;
      d += `${i?'L':'M'} ${cx + r*Math.cos(a)} ${cy + r*Math.sin(a)} `;
    }
    svg.appendChild(svgEl('path',{d, class:'radar-grid', fill:'none'}));
  }

  // 축 & 라벨
  for(let i=0;i<N;i++){
    const a=(Math.PI*2/N)*i - Math.PI/2;
    const x=cx + R*Math.cos(a), y=cy + R*Math.sin(a);
    svg.appendChild(svgEl('line',{x1:cx,y1:cy,x2:x,y2:y,class:'radar-axis'}));

    const tx=cx + (R+14)*Math.cos(a), ty=cy + (R+14)*Math.sin(a);
    const t=svgEl('text',{x:tx,y:ty,'text-anchor':'middle','dominant-baseline':'central',class:'rf-hm-label'});
    t.textContent=CATS[i];
    svg.appendChild(t);
  }

  // 값 다각형
  const max = Math.max(1, ...Object.values(data));
  const pts=[];
  for(let i=0;i<N;i++){
    const v=data[CATS[i]]||0, r=(v/max)*R, a=(Math.PI*2/N)*i - Math.PI/2;
    pts.push([cx + r*Math.cos(a), cy + r*Math.sin(a)]);
  }
  let pathD=''; pts.forEach(([x,y],i)=> pathD += `${i?'L':'M'} ${x} ${y} `); pathD+='Z';
  const shape = svgEl('path',{d:pathD, class:'radar-shape'});
  const stroke = svgEl('path',{d:pathD, class:'radar-stroke'});
  svg.appendChild(shape); svg.appendChild(stroke);

  // 점들
  pts.forEach(([x,y],i)=>{
    const dot=svgEl('circle',{cx:x,cy:y,r:3.2,class:'radar-dot'});
    dot.style.opacity='0';
    svg.appendChild(dot);
    setTimeout(()=>{ dot.style.opacity='1'; }, 80*i);
  });

  // 스트로크 그려지는 애니메이션
  const len = stroke.getTotalLength();
  stroke.style.strokeDasharray = `${len}`;
  stroke.style.strokeDashoffset = `${len}`;
  requestAnimationFrame(()=>{ stroke.style.strokeDashoffset='0'; });

  // “숨쉬기” 효과(살짝 팽창/수축)
  if(CHART_OPTS.radar.pulse){
    shape.classList.add('radar-pulse');
  }

  holder.appendChild(svg);
}

/* ====== 전체 리렌더 ====== */
function rerenderAll(){
  renderSummary();
  renderCalendar();
  renderHeatmap();
  renderRadar();
}

/* ====== 부트 ====== */
document.addEventListener('DOMContentLoaded', ()=>{
  $('#year') && ($('#year').textContent = new Date().getFullYear());
  ALL_POSTS = generateData();

  renderFilters();
  rerenderAll();
});