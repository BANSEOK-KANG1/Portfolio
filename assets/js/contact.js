// 유틸
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

// 테마 토글(안정화)
(function themeInit(){
  function set(mode){
    const doc=document.documentElement;
    const btn=$('#themeToggle');
    doc.setAttribute('data-theme', mode);
    try{ localStorage.setItem('bs-theme', mode); }catch(e){}
    if(btn){
      btn.setAttribute('aria-pressed', String(mode==='dark'));
      btn.textContent = (mode==='dark') ? '🌙' : '☀️';
      btn.title = (mode==='dark') ? '다크 모드' : '라이트 모드';
    }
  }
  const cur = localStorage.getItem('bs-theme') || document.documentElement.getAttribute('data-theme') || 'light';
  set(cur);
  const btn=$('#themeToggle');
  if(btn && !btn.dataset.bound){
    btn.dataset.bound='1';
    btn.addEventListener('click', ()=> set((document.documentElement.getAttribute('data-theme')==='dark')?'light':'dark'));
  }
})();

// 푸터 연도
(function(){ const y=$('#year'); if(y) y.textContent = new Date().getFullYear(); })();

// 연락처 개별 복사
$$('.ct-copy').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const target = btn.getAttribute('data-copy');
    const el = $(target);
    if(!el) return;
    const text = (el.tagName==='A') ? el.textContent.trim() : el.textContent.trim();
    try{
      await navigator.clipboard.writeText(text);
      toast('복사되었습니다');
    }catch(e){
      toast('복사에 실패했어요');
    }
  });
});

// 전체 복사
$('#copyAll')?.addEventListener('click', async ()=>{
  const email = $('#ctEmail')?.textContent.trim() || '';
  const phone = $('#ctPhone')?.textContent.trim() || '';
  const addr  = $('#ctAddr')?.textContent.trim()  || '';
  const lines = [`이메일: ${email}`, `전화: ${phone}`, `주소: ${addr}`].filter(Boolean).join('\n');
  try{
    await navigator.clipboard.writeText(lines);
    toast('연락처 전체가 복사되었습니다');
  }catch(e){
    toast('복사에 실패했어요');
  }
});

// 폼 유효성 & 의사전송
$('#contactForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const form = e.currentTarget;
  const status = $('#formStatus');
  const data = Object.fromEntries(new FormData(form).entries());
  // 간단한 검증
  if(!data.name || !data.email || !data.subject || !data.message){
    status.textContent = '필수 항목을 확인해주세요.';
    status.style.color = 'crimson';
    return;
  }
  // 실제 전송 로직이 있다면 fetch로 연결
  // 여기서는 의사 딜레이 후 성공 메시지
  status.textContent = '전송 중...';
  status.style.color = 'inherit';
  setTimeout(()=>{
    form.reset();
    status.textContent = '전송되었습니다. 빠르게 답장드릴게요!';
  }, 700);
});

// 가벼운 토스트
function toast(msg){
  let t = $('#ctToast');
  if(!t){
    t = document.createElement('div');
    t.id = 'ctToast';
    Object.assign(t.style, {
      position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
      background:'color-mix(in srgb, var(--bg), var(--fg) 6%)',
      color:'var(--fg)', border:'1px solid color-mix(in srgb, var(--fg), transparent 80%)',
      padding:'10px 14px', borderRadius:'10px', zIndex:'9999',
      boxShadow:'0 10px 30px rgba(0,0,0,.2)', backdropFilter:'blur(5px)', transition:'opacity .2s'
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  setTimeout(()=>{ t.style.opacity='0'; }, 1400);
}