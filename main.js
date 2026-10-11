/* =========================================================
   flurr — main.js
   Plain vanilla JS, no build step, no dependencies.
   ========================================================= */

(function () {
  "use strict";

  /**
   * TODO before launch: replace with flurr's real WhatsApp business number,
   * in international format with no "+", "-" or spaces (e.g. "919876543210").
   * This is a placeholder and will NOT deliver real messages.
   */
  const WHATSAPP_NUMBER = "91XXXXXXXXXX";

  const DEFAULT_MESSAGE = "Hi flurr! I'd love to place an order.";
  const CUSTOM_MESSAGE = "Hi flurr! I'd love to talk about a custom order.";

  function waLink(productName) {
    const text = productName
      ? `Hi flurr! I'd love to order ${productName}. Could you share more details?`
      : DEFAULT_MESSAGE;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  /* ---- wire every WhatsApp link from the single number constant ---- */
  function initWhatsAppLinks() {
    document.querySelectorAll("[data-wa-product], [data-wa-default], [data-wa-custom]").forEach((el) => {
      if (el.hasAttribute("data-wa-custom")) {
        el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CUSTOM_MESSAGE)}`;
      } else {
        const product = el.getAttribute("data-wa-product") || "";
        el.href = waLink(product);
      }
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  /* ---- image fallback: real photo if present, else the SVG placeholder ---- */
  function initImageFallbacks() {
    document.querySelectorAll("img[data-fallback]").forEach((img) => {
      img.addEventListener(
        "error",
        () => {
          img.src = img.getAttribute("data-fallback");
          img.classList.add("is-placeholder");
        },
        { once: true }
      );
    });
  }

  /* ---- filter between plushies and flowers ---- */
  function initFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".make-card");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.getAttribute("data-filter");

        cards.forEach((card) => {
          const match = filter === "all" || card.getAttribute("data-category") === filter;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---- the one authored moment: the stitch/thread line draws in on scroll ---- */
  function initThreadDrawIn() {
    const paths = document.querySelectorAll(".thread-path");
    if (!paths.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);

      if (reduceMotion) {
        path.style.strokeDashoffset = "0";
        return;
      }
      path.style.strokeDashoffset = String(length);
    });

    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const path = entry.target.querySelector(".thread-path");
            if (path) {
              path.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)";
              path.style.strokeDashoffset = "0";
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll(".thread-layout").forEach((layout) => observer.observe(layout));
  }

  function initYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWhatsAppLinks();
    initImageFallbacks();
    initFilters();
    initThreadDrawIn();
    initYear();
  });
})();
