(function () {
  "use strict";

  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("active");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          links.classList.remove("active");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initStatCounters() {
    var nums = document.querySelectorAll(".stat-num[data-target]");
    if (!nums.length) return;

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-target"), 10);
          if (isNaN(target)) return;

          var duration = 1400;
          var start = performance.now();

          function tick(now) {
            var t = Math.min(1, (now - start) / duration);
            var eased = 1 - Math.pow(1 - t, 3);
            var val = Math.round(eased * target);
            el.textContent = val + (el.getAttribute("data-suffix") || "");
            if (t < 1) requestAnimationFrame(tick);
            else {
              el.textContent = target + (el.getAttribute("data-suffix") || "");
            }
          }

          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.45 }
    );

    nums.forEach(function (n) {
      observer.observe(n);
    });
  }

  function initContactForm() {
    var form = document.getElementById("contactForm");
    var msg = document.getElementById("form-message");
    if (!form || !msg) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.classList.remove("success", "error", "visible");
      msg.textContent = "";

      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      window.setTimeout(function () {
        msg.classList.add("success", "visible");
        msg.textContent = "Thanks — we received your message and will reply within one business day.";
        form.reset();
        if (btn) btn.disabled = false;
      }, 650);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initReveal();
    initStatCounters();
    initContactForm();
  });
})();
