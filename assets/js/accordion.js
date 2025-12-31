// assets/js/accordion.js
(() => {
  const rootList = document.querySelectorAll("[data-accordion]");
  if (!rootList.length) return;

  rootList.forEach(root => {
    const items = Array.from(root.querySelectorAll(".qa__item"));

    const closeAll = (exceptItem = null) => {
      items.forEach(item => {
        if (item === exceptItem) return;
        const btn = item.querySelector(".qa__q");
        const panel = item.querySelector(".qa__a");
        item.classList.remove("is-open");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (panel) panel.hidden = true;
      });
    };

    items.forEach((item, idx) => {
      const btn = item.querySelector(".qa__q");
      const panel = item.querySelector(".qa__a");
      if (!btn || !panel) return;

      // 접근성: 패널 id 연결
      const panelId = `qa-panel-${idx}-${Math.random().toString(16).slice(2)}`;
      panel.id = panelId;
      btn.setAttribute("aria-controls", panelId);

      // 초기 상태는 닫힘
      btn.setAttribute("aria-expanded", "false");
      panel.hidden = true;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        if (isOpen) {
          item.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          panel.hidden = true;
          return;
        }
        // 한 번에 하나만 열리게 (원하면 이 줄 지워서 다중 오픈 가능)
        closeAll(item);

        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      });
    });
  });
})();
