document.addEventListener("DOMContentLoaded", () => {
  const fvSteps = Array.from(document.querySelectorAll(".fv [data-fv-step]")).filter(
    (step) => step.offsetParent !== null
  );
  const revealTargets = document.querySelectorAll(".section");
  const pageTopButton = document.querySelector(".page-top");
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".site-header__toggle");
  const siteNav = document.querySelector(".site-header__nav");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hamburger menu
  const setMenuOpen = (isOpen) => {
    if (!siteHeader || !menuToggle) return;
    siteHeader.classList.toggle("is-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  };

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(!siteHeader?.classList.contains("is-menu-open"));
  });

  siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });

  if (prefersReducedMotion) {
    fvSteps.forEach((step) => step.classList.add("is-visible"));
  } else {
    fvSteps.forEach((step, index) => {
      window.setTimeout(() => {
        step.classList.add("is-visible");
      }, index * 950);
    });
  }

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -24% 0px",
        threshold: 0.18,
      }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  const togglePageTopButton = () => {
    if (!pageTopButton) return;
    pageTopButton.classList.toggle("is-visible", window.scrollY > 420);
  };

  togglePageTopButton();
  window.addEventListener("scroll", togglePageTopButton, { passive: true });

  pageTopButton?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});
