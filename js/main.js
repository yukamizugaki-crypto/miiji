/* ============================================================
   みーじ - Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('site-header');
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Hamburger menu toggle ---- */
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.removeAttribute('aria-hidden');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', function () {
    if (hamburger.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when a mobile link is clicked
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      closeMenu();
    }
  });

  /* ---- Page top button ---- */
  const pageTopBtn = document.getElementById('page-top-btn');
  function togglePageTop() {
    if (window.scrollY > 300) {
      pageTopBtn.classList.add('visible');
    } else {
      pageTopBtn.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', togglePageTop, { passive: true });

  /* ---- Fade-in on scroll (IntersectionObserver) ---- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Use fixed header-inner height to avoid mobile menu height offset issue
        const headerInner = document.querySelector('.header-inner');
        const headerH = headerInner ? headerInner.offsetHeight : 68;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
  /* ---- Menu slider ---- */
  const menuSlider = document.getElementById('menu-slider');
  const menuPrevBtn = document.getElementById('menu-prev');
  const menuNextBtn = document.getElementById('menu-next');
  const menuCounter = document.getElementById('menu-counter');

  if (menuSlider && menuPrevBtn && menuNextBtn && menuCounter) {
    const getScrollAmount = () => {
      const firstCard = menuSlider.querySelector('.menu-card');
      if (!firstCard) return 300;
      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(menuSlider);
      const gap = parseFloat(style.columnGap || style.gap) || 24;
      return cardWidth + gap;
    };

    menuPrevBtn.addEventListener('click', () => {
      menuSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    menuNextBtn.addEventListener('click', () => {
      menuSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Update counter on scroll
    const updateCounter = () => {
      const cards = menuSlider.querySelectorAll('.menu-card');
      const total = cards.length;
      if (total === 0) return;

      const firstCard = cards[0];
      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(menuSlider);
      const gap = parseFloat(style.columnGap || style.gap) || 24;
      const step = cardWidth + gap;

      const currentIndex = Math.min(
        total,
        Math.max(1, Math.round(menuSlider.scrollLeft / step) + 1)
      );

      menuCounter.textContent = `${currentIndex} / ${total}`;
    };

    menuSlider.addEventListener('scroll', updateCounter, { passive: true });
    // Initialize counter
    updateCounter();
  }
  /* ---- Staggered fade delay for cards in a grid ---- */
  document.querySelectorAll('.hours-grid .fade-in, .about-grid .fade-in').forEach(function (el, idx) {
    el.style.transitionDelay = (idx * 0.12) + 's';
  });

  /* ---- Opening Loader ---- */
  window.addEventListener('load', function () {
    const loader = document.getElementById('opening-loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('loaded');
        document.body.classList.add('site-loaded');
      }, 1200);
    }
  });

})();
