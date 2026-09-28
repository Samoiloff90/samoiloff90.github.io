(function () {
  var root = document.documentElement;
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Тема: ручной выбор сохраняется, иначе следуем системе
  var toggle = document.getElementById("theme-toggle");
  function currentTheme() {
    return root.dataset.theme || (darkQuery.matches ? "dark" : "light");
  }
  function updateLabel() {
    toggle.setAttribute("aria-label", currentTheme() === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
  }
  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateLabel();
  });
  if (darkQuery.addEventListener) darkQuery.addEventListener("change", updateLabel);
  updateLabel();

  // Резюме в PDF: печатная версия страницы
  document.getElementById("print-btn").addEventListener("click", function () {
    window.print();
  });

  // Плавное появление блоков при прокрутке
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    root.classList.add("js-reveal");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
