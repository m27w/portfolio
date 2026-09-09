// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// Nav scroll + active link — single throttled listener
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY;
      if (nav) {
        if (y > 60) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      }
      let current = '';
      sections.forEach(section => {
        if (y >= section.offsetTop - 120) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.style.color = '';
        if (current && link.getAttribute('href') === `#${current}`) {
          link.style.color = '#f5f5f0';
        }
      });
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}


// Package enquire CTAs + ?package= query preselect
(function () {
  const packageSelect = document.getElementById('package');
  if (!packageSelect) return;

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('package');
  if (fromQuery) {
    const match = Array.from(packageSelect.options).find(
      (o) => o.value.toLowerCase() === fromQuery.toLowerCase()
    );
    if (match) packageSelect.value = match.value;
  }

  document.querySelectorAll('[data-package]').forEach((el) => {
    el.addEventListener('click', () => {
      const pkg = el.getAttribute('data-package');
      if (pkg && packageSelect) packageSelect.value = pkg;
    });
  });
})();
