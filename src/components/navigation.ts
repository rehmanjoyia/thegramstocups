/**
 * Global Navigation & Mobile Menu Handler
 */
export function initNavigation() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  // Mobile Drawer Toggle
  if (menuBtn && overlay) {
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

  // Desktop Dropdowns (Keyboard & Touch Accessibility)
  const dropdownItems = document.querySelectorAll<HTMLElement>('.nav-item.has-dropdown');
  dropdownItems.forEach((item) => {
    const toggle = item.querySelector<HTMLButtonElement>('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = item.classList.contains('active');
      // Close other open dropdowns
      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on click outside
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement)?.closest('.nav-item.has-dropdown')) {
      dropdownItems.forEach((item) => {
        item.classList.remove('active');
        item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdowns on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach((item) => {
        item.classList.remove('active');
        item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

