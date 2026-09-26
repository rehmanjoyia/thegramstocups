/**
 * Global Navigation & Mobile Menu Handler
 */
export function initNavigation() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!menuBtn || !overlay) return;

  function openMenu() {
    overlay?.classList.add('open');
    menuBtn?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    closeBtn?.focus();
  }

  function closeMenu() {
    overlay?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    menuBtn?.focus();
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });
}
