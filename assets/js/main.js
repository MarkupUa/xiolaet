'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (menuButton && navigation) {
  document.documentElement.classList.add('js-nav');
  menuButton.hidden = false;
  const closeMenu = (restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  window.matchMedia('(min-width: 721px)').addEventListener('change', () => closeMenu());
}
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('is-pending');
    observer.observe(element);
  });
}
