// ============================
// data-insight.js — 외부 라이브러리 없이 차트/필터/테이블
// ============================

const $  = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

/* ---------------------------
   예시 데이터 생성
   - 날짜: 최근 30일
   - 세그먼트: ios/android/web
---------------------------- */
function generateMock(days=30){
  const today = new Date();
  const data = [];
  for(let i=days-1;i>=0;i--){
    const d = new Date(today); d.setDate(d.getDate()-i);
    const date = d.toISOString().slice(0,10);
    const segs = ['ios','android','web'];
    segs.forEach(seg=>{
      const base = 500 + Math.round(200*Math.sin((days-i)/5) + Math.random()*120);
      const sessions = Math.max(50, base + (seg==='web'?60:seg==='ios'?20:-20));
      const conv = Math.max(2, Math.round(sessions*(0.025 + (seg==='ios'?0.006:0) + (Math.random()*0.008-0.004))));
      const revenue = conv * (20000 + (seg==='ios'?5000:0) + Math.round(Math.random()*8000));
      const bounce = Math.min(0.7, Math.max(0.25, 0.4 + (Math.random()*0.1-0.05) + (seg==='web'?0.04:0)));
      const memo = (Math.random()<0.05) ? '프로모션' : '';
      data.push({date, segment:seg, sessions, conversions:conv, revenue, bounce, memo});
    });
  }
  return data;
}

const RAW = generateMock(30);

/* ---------------------------
   상태/필터
---------------------------- */
const state = {
  from: null,
  to:   null,
  segment: 'all',
  query: ''
};

function applyFilters(rows){
  return rows.filter(r=>{
    const okSeg = (state.segment==='all' || r.segment===state.segment);
    const okFrom = !state.from || r.date >= state.from;
    const okTo = !state.to || r.date <= state.to;
    const okQ = !state.query || (r.memo||'').toLowerCase().includes(state.query.toLowerCase());
    return okSeg && okFrom && okTo && okQ;
  });
}

/* ---------------------------
   KPI 계산
---------------------------- */
function computeKPI(rows){
  const byDate = {};
  rows.forEach(r=>{
    if(!byDate[r.date]) byDate[r.date] = {sessions:0, conversions:0, revenue:0, bounce:0, cnt:0};
    byDate[r.date].sessions += r.sessions;
    byDate[r.date].conversions += r.conversions;
    byDate[r.date].revenue += r.revenue;
    byDate[r.date].bounce += r.bounce; // 평균 위해 합산
    byDate[r.date].cnt += 1;
  });

  const days = Object.keys(byDate).sort();
  if(days.length===0) return { sessions:0, conv:0, revenue:0, bounce:0, delta:{} };

  const last = days[days.length-1];
  const prev = days[days.length-2] || last;

  const sum = d => byDate[d];

  const S = sum(last).sessions;
  const C = sum(last).conversions;
  const R = sum(last).revenue;
  const B = sum(last).bounce / sum(last).cnt;

  const Sp = sum(prev).sessions;
  const Cp = sum(prev).conversions;
  const Rp = sum(prev).revenue;
  const Bp = sum(prev).bounce / sum(prev).cnt;

  const pct = (a,b)=> (b===0?0: ((a-b)/b*100));

  return {
    sessions: S,
    conv: (C/Math.max(1,S))*100,
    revenue: R,
    bounce: B*100,
    delta: {
      sessions: pct(S,Sp),
      conv: pct(C/Math.max(1,S), Cp/Math.max(1,Sp)),
      revenue: pct(R,Rp),
      bounce: pct(B,Bp)
    },
    series: days.map(d=>({
      date: d,
      sessions: byDate[d].sessions,
      revenue:  byDate[d].revenue
    }))
  };
}

/* ---------------------------
   테이블 렌더 + CSV
---------------------------- */
function formatNumber(n){ return n.toLocaleString('ko-KR'); }
function formatPct(n){ return `${n.toFixed(1)}%`; }

function renderTable(rows){
  const tb = $('#diTable tbody');
  tb.innerHTML = rows.map(r=>`
    <tr>
      <td>${r.date}</td>
      <td>${r.segment}</td>
      <td>${formatNumber(r.sessions)}</td>
      <td>${formatNumber(r.conversions)}</td>
      <td>${formatPct(r.conversions/Math.max(1,r.sessions)*100)}</td>
      <td>${formatNumber(r.revenue)}</td>
      <td>${formatPct(r.bounce*100)}</td>
      <td>${r.memo||''}</td>
    </tr>
  `).join('');
}

function downloadCSV(rows){
  const header = ['date','segment','sessions','conversions','conversion_rate','revenue','bounce_rate','memo'];
  const lines = [header.join(',')].concat(rows.map(r=>{
    const cr = (r.conversions/Math.max(1,r.sessions))*100;
    return [r.date,r.segment,r.sessions,r.conversions,cr.toFixed(2),r.revenue,(r.bounce*100).toFixed(2),`"${(r.memo||'').replace(/"/g,'""')}"`].join(',');
  }));
  const blob = new Blob([lines.join('\n')], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'data-insight.csv'; a.click();
  URL.revokeObjectURL(url);
}

/* ---------------------------
   캔버스 차트 유틸(바닐라)
---------------------------- */
function makeCtx(id){ const c = $(id); const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio||1; c.width*=dpr; c.height*=dpr; ctx.scale(dpr,dpr); return ctx; }

function clearCanvas(ctx){
  const c = ctx.canvas;
  ctx.clearRect(0,0,c.width, c.height);
  // 라이트/다크 대비를 위해 반투명 배경
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg');
  ctx.globalAlpha = 0.02; ctx.fillRect(0,0,c.width, c.height); ctx.globalAlpha = 1;
}

/* 라인 차트 */
function drawLine(ctx, labels, values, {label='값', color='#888'}={}){
  clearCanvas(ctx);
  const {width:W,height:H} = ctx.canvas;
  const pL=42,pR=16,pT=16,pB=28;
  const x0 = pL, x1 = W/dpr - pR, y0 = pT, y1 = H/dpr - pB;

  // 축
  ctx.strokeStyle = 'rgba(127,127,127,.35)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(x0,y1); ctx.lineTo(x1,y1); ctx.moveTo(x0,y0); ctx.lineTo(x0,y1); ctx.stroke();

  const max = Math.max(...values)*1.12 || 1;
  const min = 0;

  // 영역
  ctx.beginPath();
  values.forEach((v,i)=>{
    const x = x0 + (x1-x0)*(i/(values.length-1||1));
    const y = y1 - (y1-y0)*((v-min)/(max-min));
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.strokeStyle = color; ctx.lineWidth=2.2; ctx.stroke();

  // 넓은 영역 살짝
  const grd = ctx.createLinearGradient(0,y0,0,y1);
  grd.addColorStop(0, color+'33'); grd.addColorStop(1, color+'05');
  ctx.lineTo(x1,y1); ctx.lineTo(x0,y1); ctx.closePath();
  ctx.fillStyle = grd; ctx.fill();

  // 라벨 간략화(끝 1개)
  const last = values[values.length-1]||0;
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg'); ctx.font='12px system-ui';
  ctx.fillText(`${label}: ${last.toLocaleString('ko-KR')}`, x0+6, y0+16);
}

/* 막대 차트 */
function drawBar(ctx, labels, values, {color='#888'}={}){
  clearCanvas(ctx);
  const {width:W,height:H} = ctx.canvas;
  const pL=42,pR=16,pT=16,pB=28;
  const x0 = pL, x1 = W/dpr - pR, y0 = pT, y1 = H/dpr - pB;

  ctx.strokeStyle = 'rgba(127,127,127,.35)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(x0,y1); ctx.lineTo(x1,y1); ctx.moveTo(x0,y0); ctx.lineTo(x0,y1); ctx.stroke();

  const max = Math.max(...values)*1.1 || 1;
  const bw = (x1-x0)/values.length*0.68;

  values.forEach((v,i)=>{
    const x = x0 + (x1-x0)*(i/values.length)+ ((x1-x0)/values.length - bw)/2;
    const y = y1 - (y1-y0)*(v/max);
    ctx.fillStyle = color;
    ctx.fillRect(x,y,bw,y1-y);
  });

  // 간단한 범례
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg'); ctx.font='12px system-ui';
  ctx.fillText('채널', x0+6, y0+16);
}

/* 도넛 차트 */
function drawDonut(ctx, labels, values, colors){
  clearCanvas(ctx);
  const {width:W,height:H} = ctx.canvas;
  const cx = (W/dpr)/2, cy = (H/dpr)/2, r = Math.min(cx,cy)-10;
  const total = values.reduce((a,b)=>a+b,0) || 1;
  let start = -Math.PI/2;

  values.forEach((v,i)=>{
    const ang = v/total * Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,start,start+ang);
    ctx.closePath();
    ctx.fillStyle = colors[i%colors.length];
    ctx.fill();
    start += ang;
  });

  // 구멍
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath(); ctx.arc(cx,cy,r*0.62,0,Math.PI*2); ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  // 라벨
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg');
  ctx.font='13px system-ui';
  const lines = labels.map((l,i)=>`${l}: ${(values[i]/total*100).toFixed(1)}%`);
  lines.forEach((t,i)=> ctx.fillText(t, 12, 18+16*i));
}

/* ---------------------------
   렌더 파이프라인
---------------------------- */
function renderAll(){
  const filtered = applyFilters(RAW);

  // KPI
  const k = computeKPI(filtered);
  $('#kpiSessions').textContent = k.sessions.toLocaleString('ko-KR');
  $('#kpiConv').textContent     = `${k.conv.toFixed(2)}%`;
  $('#kpiRevenue').textContent  = k.revenue.toLocaleString('ko-KR');
  $('#kpiBounce').textContent   = `${k.bounce.toFixed(1)}%`;
  const dset = [
    ['deltaSessions', k.delta.sessions],
    ['deltaConv',     k.delta.conv],
    ['deltaRevenue',  k.delta.revenue],
    ['deltaBounce',   k.delta.bounce]
  ];
  dset.forEach(([id,v])=>{
    const el = $('#'+id); const sign = (v>=0?'+':'');
    el.textContent = `${sign}${v.toFixed(1)}%`;
    el.classList.toggle('pos', v>=0); el.classList.toggle('neg', v<0);
  });

  // 차트 데이터
  const labels = k.series.map(s=>s.date);
  const sessions = k.series.map(s=>s.sessions);

  // 트렌드(라인)
  drawLine(makeCtx('#chartTrend'), labels, sessions, {label:'세션', color:'#B68B44'});

  // 바: 채널별 세션 집계
  const chAgg = {Direct:0, Organic:0, Ads:0, Social:0};
  filtered.forEach(r=>{
    // 랜덤 채널 할당(데모)
    const keys = Object.keys(chAgg);
    const key = keys[(r.sessions + r.conversions + r.revenue) % keys.length];
    chAgg[key] += r.sessions;
  });
  const barLabels = Object.keys(chAgg);
  const barVals = barLabels.map(k=>chAgg[k]);
  drawBar(makeCtx('#chartBar'), barLabels, barVals, {color:'#8E7C66'});

  // 도넛: 기기 비중
  const segAgg = {iOS:0, Android:0, Web:0};
  filtered.forEach(r=>{
    if(r.segment==='ios') segAgg.iOS += r.sessions;
    else if(r.segment==='android') segAgg.Android += r.sessions;
    else segAgg.Web += r.sessions;
  });
  drawDonut(makeCtx('#chartDonut'), Object.keys(segAgg), Object.values(segAgg), ['#C8A25E','#A67C37','#6b6b6b']);

  // 테이블
  renderTable(filtered);
}

/* ---------------------------
   초기값/이벤트
---------------------------- */
(function init(){
  // 기본 기간: 최근 14일
  const today = new Date().toISOString().slice(0,10);
  const from = new Date(); from.setDate(from.getDate()-13);
  $('#diFrom').value = from.toISOString().slice(0,10);
  $('#diTo').value   = today;

  state.from = $('#diFrom').value;
  state.to   = $('#diTo').value;

  $('#diFrom').addEventListener('change', e=>{ state.from = e.target.value||null; renderAll(); });
  $('#diTo').addEventListener('change',   e=>{ state.to   = e.target.value||null; renderAll(); });
  $('#diSegment').addEventListener('change', e=>{ state.segment = e.target.value; renderAll(); });
  $('#diQuery').addEventListener('input', e=>{ state.query = e.target.value.trim(); renderAll(); });

  $('#diReset').addEventListener('click', ()=>{
    $('#diFrom').value = from.toISOString().slice(0,10);
    $('#diTo').value   = today;
    $('#diSegment').value = 'all';
    $('#diQuery').value = '';
    state.from = $('#diFrom').value; state.to = $('#diTo').value; state.segment='all'; state.query='';
    renderAll();
  });

  $('#diDownload').addEventListener('click', ()=> downloadCSV(applyFilters(RAW)));

  renderAll();
})();
