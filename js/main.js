/* ============================================================
   MAIN JAVASCRIPT
   Handles: nav toggle, active link, newsletter filters & accordions
   ============================================================
   All functions are labelled — search by name to find what to edit.
   ============================================================ */

/* ── 1. MOBILE NAV TOGGLE ── */
/* Opens/closes the hamburger menu on small screens */
(function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Accessibility: update aria attribute
    const isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav if a link is clicked (useful on mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();

/* ── 2. ACTIVE NAV LINK ── */
/* Highlights the nav link matching the current page */
(function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── 3. NEWSLETTER ENTRY ACCORDION ── */
/*
  Clicking an entry card toggles its full content open/closed.
  To add more entries, just add new .entry-card elements in newsletter.html —
  no JS changes needed.
*/
(function initEntryAccordion() {
  const entryCards = document.querySelectorAll('.entry-card');
  if (!entryCards.length) return;

  entryCards.forEach(card => {
    // Find the clickable header area (everything above .entry-body)
    const body = card.querySelector('.entry-body');
    if (!body) return;

    card.addEventListener('click', () => {
      const isOpen = body.classList.contains('open');

      // Close all others (accordion behaviour)
      document.querySelectorAll('.entry-body.open').forEach(b => b.classList.remove('open'));

      // Toggle clicked one
      if (!isOpen) body.classList.add('open');
    });
  });
})();

/* ── 4. NEWSLETTER FILTER BAR ── */
/*
  Filters displayed entries by topic tag.
  The filter reads the data-tag attribute on each .entry-card.
  To add a new topic:
    1. Add a <button class="filter-btn" data-filter="yourtopic"> in the HTML
    2. Add data-tag="yourtopic" on relevant .entry-card elements
*/
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const entries    = document.querySelectorAll('.entry-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide entries
      entries.forEach(entry => {
        const tag = entry.dataset.tag;
        if (filter === 'all' || tag === filter) {
          entry.style.display = '';
          // Small fade-in animation
          entry.style.animation = 'none';
          entry.offsetHeight;   // force reflow
          entry.style.animation = 'fadeDown 0.3s ease';
        } else {
          entry.style.display = 'none';
        }
      });
    });
  });
})();

/* ── 5. SUBSCRIBE FORM (placeholder) ── */
/*
  Currently just shows a confirmation message.
  To hook up a real service (Mailchimp, ConvertKit, etc.),
  replace the inside of handleSubscribe() with your API call.
*/
(function initSubscribeForm() {
  const form  = document.querySelector('.subscribe-form');
  const input = document.querySelector('.subscribe-input');
  const btn   = document.querySelector('.subscribe-btn');
  if (!form || !input || !btn) return;

  function handleSubscribe(e) {
    e.preventDefault();
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      input.style.borderColor = 'var(--color-neon-red)';
      setTimeout(() => (input.style.borderColor = ''), 1500);
      return;
    }

    // ── Replace this block with your real subscription API call ──
    btn.textContent = 'SUBSCRIBED ✓';
    btn.style.background = 'var(--color-neon-teal)';
    btn.style.borderColor = 'var(--color-neon-teal)';
    btn.style.color = 'var(--color-bg)';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'SUBSCRIBE';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 3000);
  }

  btn.addEventListener('click', handleSubscribe);
})();

/* ── 6. SCROLL REVEAL (lightweight) ── */
/*
  Adds a subtle fade-up animation to elements with class="reveal"
  as they enter the viewport.
  Usage: add class="reveal" to any element you want animated on scroll.
*/
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Add base styles via JS (keeps CSS clean)
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate once only
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
})();
