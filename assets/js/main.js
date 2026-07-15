/* ============================================================
   HV Limpezas — main.js  (vanilla, no dependencies)
   ============================================================ */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Header scroll state ---------- */
  var header = $('.header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
    var tt = $('.to-top'); if (tt) tt.classList.toggle('show', window.scrollY > 620);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav (with focus management) ---------- */
  var toggle = $('.nav-toggle');
  var navEl = $('.nav');
  var mainEl = $('#main');
  var footerEl = $('.footer');
  var isMobileNav = function () { return toggle && getComputedStyle(toggle).display !== 'none'; };

  var openNav = function () {
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    if (isMobileNav()) {
      if (mainEl) mainEl.setAttribute('inert', '');
      if (footerEl) footerEl.setAttribute('inert', '');
      var first = $('.nav__links a', navEl);
      if (first) setTimeout(function () { first.focus(); }, 60);
    }
  };
  var closeNav = function (restoreFocus) {
    if (!document.body.classList.contains('nav-open')) return;
    document.body.classList.remove('nav-open');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); }
    if (mainEl) mainEl.removeAttribute('inert');
    if (footerEl) footerEl.removeAttribute('inert');
    if (restoreFocus && toggle) toggle.focus();
  };
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (document.body.classList.contains('nav-open')) closeNav(true); else openNav();
    });
  }
  $$('.nav__links a').forEach(function (a) { a.addEventListener('click', function () { closeNav(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav(true);
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Active nav link (scroll spy) ---------- */
  var navLinks = $$('.nav__links a[href^="#"]');
  var sections = navLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) {
            a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false');
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Gallery lightbox ---------- */
  var lb = $('#lightbox');
  if (lb) {
    var items = $$('.gallery__item');
    var imgEl = $('.lightbox__img', lb);
    var countEl = $('.lightbox__count', lb);
    var idx = 0;
    var srcs = items.map(function (it) {
      var im = $('img', it);
      return { src: it.getAttribute('data-full') || im.getAttribute('src'), alt: im.getAttribute('alt') };
    });
    var render = function () {
      imgEl.setAttribute('src', srcs[idx].src);
      imgEl.setAttribute('alt', srcs[idx].alt);
      if (countEl) countEl.textContent = (idx + 1) + ' / ' + srcs.length;
    };
    var open = function (i) { idx = i; render(); if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', ''); };
    var move = function (d) { idx = (idx + d + srcs.length) % srcs.length; render(); };
    items.forEach(function (it, i) {
      it.addEventListener('click', function () { open(i); });
      it.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    $('.lightbox__close', lb).addEventListener('click', function () { lb.close(); });
    $('.lightbox__next', lb).addEventListener('click', function () { move(1); });
    $('.lightbox__prev', lb).addEventListener('click', function () { move(-1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lightbox__stage')) lb.close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.open) return;
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    });
  }

  /* ---------- Cookie consent + Google Maps gate ---------- */
  var KEY = 'hv-cookie-consent';
  var store = {
    get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  var bar = $('.cookiebar');
  var mapWrap = $('#map');

  var loadMap = function () {
    if (!mapWrap || mapWrap.classList.contains('is-active')) return;
    var src = mapWrap.getAttribute('data-map-src');
    if (!src) return;
    var f = document.createElement('iframe');
    f.setAttribute('src', src);
    f.setAttribute('title', 'Mapa da localização da HV Limpezas em Mozelos');
    f.setAttribute('loading', 'lazy');
    f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    f.setAttribute('allowfullscreen', '');
    mapWrap.insertBefore(f, mapWrap.firstChild);
    mapWrap.classList.add('is-active');
  };
  var unloadMap = function () {
    if (!mapWrap) return;
    var f = $('iframe', mapWrap);
    if (f) f.remove();
    mapWrap.classList.remove('is-active');
  };
  var showBar = function () { if (bar) { bar.hidden = false; requestAnimationFrame(function () { bar.classList.add('is-visible'); }); } };
  var hideBar = function () { if (bar) { bar.classList.remove('is-visible'); setTimeout(function () { bar.hidden = true; }, 460); } };

  var accept = function () { store.set('accepted'); loadMap(); hideBar(); };
  var reject = function () { store.set('rejected'); unloadMap(); hideBar(); };

  // init
  var consent = store.get();
  if (consent === 'accepted') { loadMap(); }
  else if (consent !== 'rejected') { setTimeout(showBar, 700); }

  $$('[data-cookie="accept"]').forEach(function (b) { b.addEventListener('click', accept); });
  $$('[data-cookie="reject"]').forEach(function (b) { b.addEventListener('click', reject); });
  $$('[data-cookie="settings"]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); showBar(); }); });

  /* ---------- To-top ---------- */
  var tt = $('.to-top');
  if (tt) tt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: (matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth') });
  });

  /* ---------- Year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
