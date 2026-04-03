/**
 * interactions.js — Insight Blog
 * Emil Kowalski design engineering principles applied via JS:
 *
 * 1. IntersectionObserver scroll reveals (GPU-only: opacity + transform)
 * 2. Sticky header shadow on scroll
 * 3. Mobile menu toggle (with animation)
 * 4. Active nav link detection
 * 5. Reading progress bar (post.html only)
 * 6. Newsletter subscribe morphing button
 * 7. Dark theme toggle (with system detection + persistence)
 *
 * Performance rules:
 *   - Only animate transform and opacity (GPU, no layout/paint)
 *   - Update element.style.transform directly (not CSS vars on parent)
 *   - CSS handles the actual animation; JS only toggles classes
 */

(function () {
  'use strict';

  /* ─── 1. SCROLL REVEAL via IntersectionObserver ─────────────────────────
     Emil: { once: true } equivalent — fire only on entry, never on exit.
     -100px margin means reveal starts slightly before fully in view.
     Stagger handled via CSS transition-delay on .reveal-stagger children.
  ──────────────────────────────────────────────────────────────────────── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('[data-animate]');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Mark container visible so stagger CSS kicks in
            entry.target.classList.add('reveal-stagger');
            // Mark each child visible (staggered delay via CSS nth-child)
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('is-visible');
            });
            // Also reveal the container itself if it has .reveal
            if (entry.target.classList.contains('reveal')) {
              entry.target.classList.add('is-visible');
            }
            observer.unobserve(entry.target); // fire once only
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px', // trigger before fully in view
      }
    );

    revealEls.forEach((el) => {
      observer.observe(el);

      // Apply .reveal to children (cards, etc.) for stagger animation
      el.querySelectorAll('.card, .category-card, .testimonial-card').forEach((child) => {
        child.classList.add('reveal');
      });

      // If the container itself should animate (e.g. about-preview)
      if (el.hasAttribute('data-animate-self')) {
        el.classList.add('reveal');
      }
    });
  }

  /* ─── 2. STICKY HEADER SHADOW ────────────────────────────────────────── */
  function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    // Throttle scroll listener (requestAnimationFrame)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── 3. MOBILE MENU TOGGLE ─────────────────────────────────────────── */
  function initMobileMenu() {
    const menuBtn = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (!menuBtn || !mainNav) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));

      // Animate hamburger → X
      const spans = menuBtn.querySelectorAll('span');
      if (isOpen) {
        if (spans[0]) spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        if (spans[1]) spans[1].style.opacity = '0';
        if (spans[2]) spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        if (spans[0]) spans[0].style.transform = '';
        if (spans[1]) spans[1].style.opacity = '';
        if (spans[2]) spans[2].style.transform = '';
      }
    });

    // Close menu on nav link click (mobile UX)
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* ─── 4. ACTIVE NAV LINK ─────────────────────────────────────────────── */
  function initActiveNav() {
    const navLinks = document.querySelectorAll('.header__nav a');
    if (!navLinks.length) return;

    const path = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      // Exact match or index fallback
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ─── 5. READING PROGRESS BAR (post.html only) ───────────────────────
     Emil: thin 2px gradient bar — users feel the page is moving.
     width 100ms linear keeps it in sync with scroll (no lag).
  ──────────────────────────────────────────────────────────────────────── */
  function initReadingProgress() {
    // Only run on post page
    const article = document.querySelector('.article__content');
    if (!article) return;

    // Create and inject progress bar
    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Reading progress');
    document.body.prepend(bar);

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docH > 0 ? (window.scrollY / docH) * 100 : 0;
          // Update transform directly — never via CSS var on parent (Emil perf rule)
          bar.style.width = `${Math.min(progress, 100)}%`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── 6. NEWSLETTER MORPHING BUTTON ─────────────────────────────────────
     Emil: State change communicated clearly, no animation needed here —
     the color change IS the animation. Fast and clear.
  ──────────────────────────────────────────────────────────────────────── */
  function initNewsletterForms() {
    document.querySelectorAll('.newsletter__form, #newsletter-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const input = form.querySelector('input[type="email"]');
        if (!btn) return;

        const originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.dataset.state = 'success';
        if (input) input.value = '';

        // Reset after 3s
        setTimeout(() => {
          btn.textContent = originalText;
          btn.dataset.state = '';
        }, 3000);
      });
    });
  }

  /* ─── 7. HAMBURGER CSS TRANSITIONS ──────────────────────────────────── */
  function injectHamburgerStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .header__menu-btn span {
        transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
                    opacity 150ms ease;
      }
    `;
    document.head.appendChild(style);
  }

  /* ─── 7. DARK THEME TOGGLE ──────────────────────────────────────────
     Emil: high-performance toggle. No layout thrashing.
     Persistence via localStorage. Respect system preference.
  ──────────────────────────────────────────────────────────────────────── */
  function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // 1. Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // 2. Toggle event
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Animate the icons (CSS handles rotation, JS handles state)
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Physical feedback (Emil)
      toggleBtn.classList.add('is-active');
      setTimeout(() => toggleBtn.classList.remove('is-active'), 100);
    });
  }

  /* ─── INIT ───────────────────────────────────────────────────────────── */
  function init() {
    injectHamburgerStyles();
    initHeader();
    initMobileMenu();
    initActiveNav();
    initScrollReveal();
    initReadingProgress();
    initNewsletterForms();
    initThemeToggle();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
