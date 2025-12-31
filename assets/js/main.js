// assets/js/main.js
(() => {
  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  // 연도
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 테마
  const btn = $("#themeToggle");
  const root = document.documentElement;
  const KEY = "bs-theme";

  const applyTheme = (t) => {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch(e) {}
    if (btn) {
      const isDark = t === "dark";
      btn.setAttribute("aria-pressed", String(isDark));
      btn.innerHTML = `<span class="icon" aria-hidden="true">${isDark ? "☀️" : "🌙"}</span>`;
    }
  };

  // 초기값: localStorage > system
  const saved = (() => { try { return localStorage.getItem(KEY); } catch(e){ return null; } })();
  if (!root.getAttribute("data-theme")) {
    const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (sysDark ? "dark" : "light"));
  } else {
    applyTheme(root.getAttribute("data-theme"));
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "dark";
      applyTheme(cur === "dark" ? "light" : "dark");
    });
  }

  // 스크롤 리빌
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach(el => io.observe(el));
})();
