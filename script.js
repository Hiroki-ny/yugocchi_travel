/* =====================================================
   script.js – ゆごっち旅ティザーサイト (Days‑only Countdown)
   ===================================================== */

// ---------------- 1. 残り日数だけを表示 ----------------
(() => {
  const span = document.getElementById("countdown-days");
  if (!span) return;

  const TARGET = new Date("2025-10-05T00:00:00+09:00"); // 出発日

  const update = () => {
    const now = new Date();

    // 時刻を 0:00 に丸めて純粋な日付差分を算出
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffMs = TARGET - today;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    span.textContent = diffDays <= 0 ? 0 : diffDays;
  };

  update();              // 初回
  setInterval(update, 8.64e7); // 24時間ごと更新（ミリ秒）
})();

// ---------------- 2. タイムラインハイライト ----------------
(() => {
  const sections = document.querySelectorAll("section.day");
  const markers  = document.querySelectorAll(".timeline li.day");
  if (!sections.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id; // day1, day2, ...
          markers.forEach(m => m.classList.toggle("active", m.dataset.target === id));
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach(sec => io.observe(sec));
})();

// ---------------- 3. モバイル：リストクリックでドロワー閉じ ----------------
(() => {
  const aside = document.querySelector(".timeline");
  const chk   = document.getElementById("schedule-check");
  if (!aside || !chk) return;
  aside.addEventListener("click", () => { if (chk.checked) chk.checked = false; });
})();

// ---------------- 4. スクロールでin-viewクラスを付与 ----------------
(() => {
  const items = document.querySelectorAll(".item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.6, // 中心に近づいた時
    }
  );

  items.forEach(item => observer.observe(item));
})();

(() => {
  const sections = document.querySelectorAll('.day-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, {
    threshold: 0.5
  });

  sections.forEach(sec => observer.observe(sec));
})();

