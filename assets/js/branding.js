/* branding-v3.js — 테마, 성장 그래프, 스파크라인, SVG 루프, 스크립트 인터뷰 */
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* ===== 0) 테마 토글 (페이지 독립) ===== */
  const root = document.body;
  const key = 'banseok-theme';
  const saved = localStorage.getItem(key);
  if (saved) root.className = saved;

  const themeBtn = $('#themeToggle');
  if (themeBtn){
    themeBtn.addEventListener('click', ()=>{
      root.classList.toggle('theme--dark');
      root.classList.toggle('theme--light');
      localStorage.setItem(key, root.className);
    });
  }

  /* ===== 1) Bars 생성 & 애니메이션 ===== */
  const barsWrap = $('#bars');
  if (barsWrap){
    const items = JSON.parse(barsWrap.getAttribute('data-items')||'[]');
    items.forEach(({label, value})=>{
      const row = document.createElement('div');
      row.className = 'bar';
      row.style.setProperty('--val', value + '%');

      const lab = document.createElement('span');
      lab.className = 'label';
      lab.textContent = label;

      const fill = document.createElement('span');
      fill.className = 'fill';

      row.append(lab, fill);
      barsWrap.appendChild(row);
    });

    const IO = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('active');
      });
    }, {threshold:.35});
    $$('.bar', barsWrap).forEach(el=> IO.observe(el));
  }

  /* ===== 2) 스파크라인(Canvas) ===== */
   /* ===== 2) 스파크라인(Canvas) ===== */
  const sparkCanvas = $('#sparkCanvas');
  if (sparkCanvas){
    const ctx = sparkCanvas.getContext('2d');
    const data = JSON.parse($('#sparkData').textContent);
    const series = data.series;

    // 캔버스 내부 비트맵 사이즈를 부모 레이아웃에 맞춰 세팅
    function fitCanvas(){
      const dpr = window.devicePixelRatio || 1;
      // 레이아웃 크기는 clientWidth/Height만 사용 (무한 루프 방지)
      const w = sparkCanvas.clientWidth;
      const h = sparkCanvas.clientHeight;
      sparkCanvas.width  = Math.max(1, Math.floor(w * dpr));
      sparkCanvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function draw(){
      fitCanvas();
      const w = sparkCanvas.clientWidth;
      const h = sparkCanvas.clientHeight;

      ctx.clearRect(0,0,w,h);
      const pad = {l:40, r:12, t:18, b:22};
      const gw = w - pad.l - pad.r;
      const gh = h - pad.t - pad.b;

      // 축
      ctx.strokeStyle = getCS('--fg', .25);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.l, pad.t);
      ctx.lineTo(pad.l, pad.t+gh);
      ctx.lineTo(pad.l+gw, pad.t+gh);
      ctx.stroke();

      const max = Math.max(...series.flatMap(s=>s.points), 100);
      const min = Math.min(...series.flatMap(s=>s.points), 0);
      const stepX = gw / (data.labels.length - 1 || 1);

      series.forEach((s, si)=>{
        ctx.lineWidth = 2;
        ctx.strokeStyle = si===series.length-1 ? getVar('--accent') : getCS('--fg', .6);
        ctx.beginPath();
        s.points.forEach((v,i)=>{
          const x = pad.l + i*stepX;
          const y = pad.t + gh - ((v-min)/(max-min||1))*gh;
          i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
        });
        ctx.stroke();

        ctx.fillStyle = getVar('--accent');
        s.points.forEach((v,i)=>{
          const x = pad.l + i*stepX;
          const y = pad.t + gh - ((v-min)/(max-min||1))*gh;
          ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2); ctx.fill();
        });
      });

      // 라벨
      ctx.fillStyle = getCS('--fg', .8);
      ctx.font = '12px system-ui';
      data.labels.forEach((lb,i)=>{
        const x = pad.l + i*stepX;
        ctx.fillText(lb, x-6, pad.t+gh+16);
      });
    }

    // 스크롤 인입 시 1회 그리기 + 윈도우 리사이즈 디바운스
    const redraw = debounce(draw, 120);
    window.addEventListener('resize', redraw, {passive:true});

    const onceIO = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{ if(e.isIntersecting){ draw(); onceIO.disconnect(); } });
    }, {threshold:.3});
    onceIO.observe(sparkCanvas);
  }

  // 공용 헬퍼 – 디바운스
  function debounce(fn, ms=150){
    let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); };
  }

  /* ===== 3) Process SVG 루프 스트로크 애니 ===== */
  const loop = $('#loop');
  if(loop){
    const len = loop.getTotalLength();
    loop.style.strokeDasharray = `${len}`;
    loop.style.strokeDashoffset = `${len}`;

    const IO2 = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{
        if(e.isIntersecting){
          loop.style.strokeDashoffset = '0';
          IO2.disconnect();
        }
      });
    }, {threshold:.4});
    IO2.observe(loop);
  }

  /* ===== 4) Script Interview 순차 노출 ===== */
  const list = $('#scriptList');
  if (list){
    const items = $$('#scriptList li');
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{
        if(e.isIntersecting){
          items.forEach((li, idx)=> setTimeout(()=> li.classList.add('reveal'), 180*idx));
          io.disconnect();
        }
      });
    }, {threshold:.25});
    io.observe(list);
  }

  /* ===== 5) Footer 연도 ===== */
  const y = (new Date()).getFullYear();
  const yEl = $('#year'); if(yEl) yEl.textContent = y;

  /* ===== helpers ===== */
  function getVar(name){ return getComputedStyle(document.body).getPropertyValue(name).trim() || '#000'; }
  function getCS(name, alpha=1){
    // color-mix를 단순화: 실제 컬러값을 가져와 alpha 적용
    const c = getVar(name) || '#000';
    if(alpha >= 1) return c;
    // rgba로 변환 (단일 색 가정)
    const rgb = toRGB(c);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
  }
  function toRGB(hex){
    let h = hex.replace('#','').trim();
    if(h.length===3){ h = h.split('').map(ch=>ch+ch).join(''); }
    const num = parseInt(h,16);
    return { r:(num>>16)&255, g:(num>>8)&255, b:num&255 };
  }
})();
