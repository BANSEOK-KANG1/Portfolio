// branding.js — 작은 상호작용(예: 프리뷰 토글)
// 필요 시 확장 가능. 지금은 안내용 스크립트만.

(function(){
  // 예시: 체크리스트 상태를 저장/복원
  const keys = ['g1','g2','g3','g4','g5'];
  keys.forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    try{
      const saved = localStorage.getItem('br-chk-'+id);
      if(saved !== null) el.checked = saved === '1';
      el.addEventListener('change', ()=> localStorage.setItem('br-chk-'+id, el.checked?'1':'0'));
    }catch(e){}
  });
})();
