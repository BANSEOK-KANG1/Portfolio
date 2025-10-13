const $=(s,r=document)=>r.querySelector(s);

// 타이핑
(function(){
  const el=$('#typingTarget'); if(!el) return;
  const roles=(el.getAttribute('data-roles')||'').split(',').map(s=>s.trim()).filter(Boolean);
  if(!roles.length) return;
  let i=0,p=0,d=1, type=85, back=45, hold1=1200, hold0=300;
  (function loop(){
    const cur=roles[i];
    if(d===1){ p++; el.textContent=cur.slice(0,p);
      if(p===cur.length){ d=-1; return setTimeout(loop,hold1); }
      return setTimeout(loop,type);
    }else{ p--; el.textContent=cur.slice(0,Math.max(0,p));
      if(p===0){ d=1; i=(i+1)%roles.length; return setTimeout(loop,hold0); }
      return setTimeout(loop,back);
    }
  })();
})();

// 프로필 슬라이더
(function(){
  const fig=document.querySelector('.ix-profile'); if(!fig) return;
  const imgs=[...fig.querySelectorAll('.ix-profile__img')]; if(imgs.length<=1) return;
  const btn=fig.querySelector('.ix-profile__toggle');
  const interval=Number(fig.getAttribute('data-interval'))||3000;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let idx=imgs.findIndex(i=>i.classList.contains('is-active')); if(idx<0) idx=0;
  let playing=true, timer=null;

  const next=()=> (idx+1)%imgs.length;
  function show(n){
    const cur=imgs[idx], nxt=imgs[n]; if(cur===nxt) return;
    cur.classList.remove('is-active'); cur.classList.add('is-leaving');
    nxt.classList.add('is-active'); setTimeout(()=>cur.classList.remove('is-leaving'),650);
    idx=n;
  }
  const tick=()=>{ show(next()); schedule(); };
  function schedule(){ clearTimeout(timer); if(playing) timer=setTimeout(tick,interval); }
  schedule();

  fig.addEventListener('mouseenter',()=>{ playing=false; clearTimeout(timer); btn&&btn.setAttribute('aria-pressed','true'); });
  fig.addEventListener('mouseleave',()=>{ playing=true; schedule(); btn&&btn.setAttribute('aria-pressed','false'); });
  btn&&btn.addEventListener('click',()=>{ playing=!playing; btn.setAttribute('aria-pressed',String(!playing)); playing?schedule():clearTimeout(timer); });
  if(reduced){ imgs.forEach(img=>img.style.transition='opacity .2s linear'); }
})();