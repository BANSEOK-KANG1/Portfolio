// assets/js/portfolio.js
(() => {
  const heroBg = document.querySelector(".hero__bg img");
  if (heroBg) {
    // 아주 약한 패럴랙스(과하면 촌스러움)
    const onScroll = () => {
      const y = window.scrollY || 0;
      heroBg.style.transform = `scale(1.06) translateY(${Math.min(18, y * 0.03)}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 카드 hover 미세 광택(마우스 위치 기반)
  const cards = document.querySelectorAll(".port-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.background = `radial-gradient(600px 240px at ${x}% ${y}%, rgba(255,255,255,.10), transparent 45%), var(--panel)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.background = "var(--panel)";
    });
  });
})();

