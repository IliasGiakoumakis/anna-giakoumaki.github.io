/* ====================================================================
   ANNA GIAKOUMAKI PORTFOLIO — INTERACTIVITY v2
   Professional scroll animations, navbar, filters, parallax
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────── 1. REVEAL ON SCROLL ────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  // ──────────────── 2. NAVBAR SCROLL STATE ────────────────
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const y = window.scrollY;
    if (y > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // init


  // ──────────────── 3. MOBILE MENU ────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  // ──────────────── 4. SMOOTH SCROLL WITH OFFSET ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ──────────────── 5. SKILLS FILTER ────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.style.display = '';
          // Re-trigger animation
          card.style.animation = 'none';
          card.offsetHeight; // force reflow
          card.style.animation = 'fadeUp .5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ──────────────── 6. PARALLAX DIVIDER (subtle) ────────────────
  const parallax = document.querySelector('.parallax-divider img');

  if (parallax) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = parallax.parentElement.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.top < vh && rect.bottom > 0) {
            const progress = (vh - rect.top) / (vh + rect.height);
            const offset = (progress - 0.5) * 80;
            parallax.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // ──────────────── 7. ACTIVE NAV LINK HIGHLIGHT ────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => activeObserver.observe(section));

});

/* CSS-in-JS: inject fadeUp keyframes */
const style = document.createElement('style');
style.textContent = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nav-link.active {
  background: rgba(200,132,45,.12) !important;
  color: #c8842d !important;
}
`;
document.head.appendChild(style);
