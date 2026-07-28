/* Render dinámico de la grilla de proyectos a partir de PROJECTS (projects-data.js) */

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  grid.innerHTML = PROJECTS.map((p) => {
    const tags = Array.isArray(p.tags) && p.tags.length
      ? `<div class="card-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
      : "";

    return `
      <article class="card">
        <div class="card-mockup">
          <img src="${p.mockup}" alt="Mockup de ${p.title}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-header">
            <img class="card-logo" src="${p.logo}" alt="Logo de ${p.title}" loading="lazy" />
            <h3 class="card-title">${p.title}</h3>
          </div>
          <p class="card-description">${p.description}</p>
          ${tags}
          <a class="card-link" href="${p.url}" target="_blank" rel="noopener noreferrer">
            Probar la app
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join("");

  const countEl = document.getElementById("projects-count");
  if (countEl) countEl.textContent = PROJECTS.length;
}

function setupModals() {
  const openTriggers = document.querySelectorAll("[data-modal-open]");
  const closeButtons = document.querySelectorAll("[data-modal-close], .modal-close");

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-locked");
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-locked");
  }

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(trigger.getAttribute("data-modal-open"));
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".modal-overlay"));
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.open").forEach(closeModal);
    }
  });
}

function setupParallax() {
  const el = document.querySelector(".hero-avatar");
  if (!el) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const speed = 0.15; // qué tan rápido se mueve respecto al scroll (0 = fijo, 1 = igual que el scroll)
  let ticking = false;

  function update() {
    const offset = window.scrollY * speed;
    el.style.transform = `translateY(${offset}px)`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupModals();
  setupParallax();

  // Menú mobile
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.classList.toggle("active");
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("active");
      })
    );
  }

  // Año dinámico en footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
