/* Autotech Service Baku — interfeys davranışları */
(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;

  /* ---------- Mövzu (qaranlıq / işıqlı) ---------- */

  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try {
        localStorage.setItem("autotech-theme", next);
      } catch (e) {}
    });
  }

  /* ---------- Mobil naviqasiya ---------- */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    const setNav = (open) => {
      body.classList.toggle("nav-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      body.style.overflow = open ? "hidden" : "";
    };

    menuBtn.addEventListener("click", () =>
      setNav(!body.classList.contains("nav-open"))
    );

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && body.classList.contains("nav-open")) setNav(false);
    });

    // Masaüstü ölçüsünə keçdikdə çekmeceni bağla
    matchMedia("(min-width: 761px)").addEventListener("change", (e) => {
      if (e.matches) setNav(false);
    });
  }

  /* ---------- Sərhəd xətti olan "yapışqan" header ---------- */

  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () =>
      header.classList.toggle("is-stuck", window.scrollY > 8);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Görünəndə yumşaq peyda olma ---------- */

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          entry.target.style.transitionDelay = Math.min(i * 70, 280) + "ms";
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Naviqasiyada cari bölmə ---------- */

  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) =>
            a.classList.toggle(
              "is-active",
              a.getAttribute("href") === "#" + entry.target.id
            )
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();
