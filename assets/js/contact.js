// contact.js — 간단한 폼 유효성 + 메시지 피드백
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const text = document.getElementById('message').value.trim();

  if(!name || !email || !text){
    msg.textContent = "모든 항목을 입력해주세요.";
    msg.style.color = "#b6463c";
    return;
  }

  // 실제 서버 전송 없이 데모 메시지
  msg.textContent = "메시지가 전송되었습니다. 감사합니다!";
  msg.style.color = "#0a8f3a";
  form.reset();
});
