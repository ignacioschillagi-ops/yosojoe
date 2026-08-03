/* Render dinámico de la grilla de proyectos a partir de PROJECTS (projects-data.js) */

function escapeAttr(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

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
          <div class="card-footer">
            <a class="card-link" href="${p.url}" target="_blank" rel="noopener noreferrer">
              Probar la app
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <button
              type="button"
              class="share-btn"
              aria-label="Compartir ${escapeAttr(p.title)}"
              data-title="${escapeAttr(p.title)}"
              data-desc="${escapeAttr(p.description)}"
              data-url="${escapeAttr(p.url)}"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="5" r="2.6" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="6" cy="12" r="2.6" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="18" cy="19" r="2.6" stroke="currentColor" stroke-width="1.8"/>
                <path d="M8.3 10.7l7.3-4.2M8.3 13.3l7.3 4.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
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

/* ---------- Compartir tarjetas ---------- */

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  fallbackCopy(text);
  return Promise.resolve();
}

function fallbackCopy(text) {
  const input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    /* noop */
  }
  document.body.removeChild(input);
}

let toastTimeout;
function showToast(message) {
  let toast = document.getElementById("ysj-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "ysj-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3200);
}

function setupShareButtons() {
  const popover = document.createElement("div");
  popover.className = "share-popover";
  popover.innerHTML = `
    <button type="button" class="share-option" data-action="whatsapp">
      <span class="share-dot" style="background:#3fae59"></span> WhatsApp
    </button>
    <button type="button" class="share-option" data-action="facebook">
      <span class="share-dot" style="background:#4a6fa5"></span> Facebook
    </button>
    <button type="button" class="share-option" data-action="instagram">
      <span class="share-dot" style="background:#a35c8f"></span> Instagram
    </button>
    <button type="button" class="share-option" data-action="gmail">
      <span class="share-dot" style="background:#c0553f"></span> Gmail
    </button>
    <button type="button" class="share-option" data-action="copy">
      <span class="share-dot" style="background:var(--text-muted)"></span> Copiar link
    </button>
  `;
  document.body.appendChild(popover);

  let activeData = null;

  function closePopover() {
    popover.classList.remove("open");
    activeData = null;
  }

  function positionPopover(btn) {
    const rect = btn.getBoundingClientRect();
    popover.style.top = `${window.scrollY + rect.bottom + 8}px`;
    popover.style.left = `${window.scrollX + rect.right}px`;
    popover.classList.add("open");
    requestAnimationFrame(() => {
      const pRect = popover.getBoundingClientRect();
      let left = rect.right - pRect.width;
      if (left < 8) left = 8;
      const maxLeft = window.scrollX + document.documentElement.clientWidth - pRect.width - 8;
      if (left > maxLeft) left = maxLeft;
      popover.style.left = `${left}px`;
    });
  }

  document.addEventListener("click", (e) => {
    const shareBtn = e.target.closest(".share-btn");
    if (shareBtn) {
      e.stopPropagation();
      const data = {
        title: shareBtn.getAttribute("data-title"),
        desc: shareBtn.getAttribute("data-desc"),
        url: shareBtn.getAttribute("data-url")
      };

      // En mobile (y algunos navegadores de escritorio) usamos el share nativo del sistema,
      // que ya incluye WhatsApp, Instagram, Gmail, etc. según lo que tenga instalado el usuario.
      if (navigator.share) {
        navigator.share({ title: data.title, text: data.desc, url: data.url }).catch(() => {});
        return;
      }

      activeData = data;
      positionPopover(shareBtn);
      return;
    }

    const option = e.target.closest(".share-option");
    if (option && activeData) {
      const { title, desc, url } = activeData;
      const encodedUrl = encodeURIComponent(url);
      const text = encodeURIComponent(`${title} — ${desc}`);
      const action = option.getAttribute("data-action");

      if (action === "whatsapp") {
        window.open(`https://wa.me/?text=${text}%20${encodedUrl}`, "_blank", "noopener,noreferrer");
      } else if (action === "facebook") {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer,width=600,height=520"
        );
      } else if (action === "gmail") {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(title)}&body=${text}%20${encodedUrl}`,
          "_blank",
          "noopener,noreferrer"
        );
      } else if (action === "instagram") {
        copyToClipboard(url);
        showToast("Link copiado. Instagram no permite compartir directo desde la web: pegalo en un DM o en tu historia.");
      } else if (action === "copy") {
        copyToClipboard(url);
        showToast("¡Link copiado!");
      }

      closePopover();
      return;
    }

    if (popover.classList.contains("open")) closePopover();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopover();
  });

  window.addEventListener("scroll", () => {
    if (popover.classList.contains("open")) closePopover();
  }, { passive: true });
}

function setupHeroLottie() {
  const container = document.getElementById("hero-lottie");
  if (!container || typeof lottie === "undefined") return;

  lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/logos/loguito.json"
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupModals();
  setupShareButtons();
  setupParallax();
  setupHeroLottie();

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
