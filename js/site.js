// Shared behaviour for every page: mobile nav toggle + scroll reveal.
(() => {
  // ─── Mobile nav ───
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !e.target.closest('nav')) setOpen(false);
    });
  }

  // ─── Project filters (projects.html) ───
  const filters = document.querySelector('.filters');
  if (filters) {
    const cards = [...document.querySelectorAll('.project-card[data-roles]')];
    const buttons = [...filters.querySelectorAll('.filter')];
    const matches = (card, role) => role === 'all' || card.dataset.roles.split(' ').includes(role);
    buttons.forEach((btn) => {
      const role = btn.dataset.filter;
      const count = cards.filter((card) => matches(card, role)).length;
      btn.querySelector('.count').textContent = count;
      if (!count) btn.hidden = true;
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        cards.forEach((card) => {
          card.hidden = !matches(card, role);
          if (!card.hidden) card.classList.add('visible');
        });
      });
    });
    filters.hidden = false;
  }

  // ─── Scroll reveal ───
  const reveals = document.querySelectorAll('.reveal');
  const show = (el) => el.classList.add('visible');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(show);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => show(entry.target), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  reveals.forEach((el) => observer.observe(el));
})();
