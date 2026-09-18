const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");

const onScroll = () => {
  if (!header || header.classList.contains("is-solid")) return;
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".product-list .product-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("is-active"));
    chip.classList.add("is-active");
    const filter = chip.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

const form = document.getElementById("orderForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      "Salam, Purple Cake Boutique.",
      `Ad: ${data.get("name") || ""}`,
      `Telefon: ${data.get("phone") || ""}`,
      `Məhsul: ${data.get("item") || ""}`,
      `Tarix: ${data.get("date") || "dəqiqləşdirilməyib"}`,
      `Qeyd: ${data.get("note") || "—"}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/994507468384?text=${text}`, "_blank", "noopener");
  });
}
