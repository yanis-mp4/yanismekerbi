/* ============================================================
   COMPONENTS.JS
   Injects shared HTML: the navbar and footer into every page.
   This way you only edit one place to update nav or footer.

   HOW TO UPDATE THE NAV:
     - Add new pages: duplicate a <li> in navHTML and update href + label
     - Change the site name: edit the .nav-logo span text

   HOW TO UPDATE THE FOOTER:
     - Edit footerHTML below
   ============================================================ */

(function injectComponents() {
  /*
    Detect if we're inside the /pages/ subdirectory so all links resolve
    correctly regardless of which page is loaded.
  */
  const inSubfolder = window.location.pathname.includes('/pages/');
  const root = inSubfolder ? '../' : '';

  /* ── NAVIGATION HTML ── */
  /* Add or remove <li> items to add pages to the nav */
  const navHTML = `
    <div class="film-strip-top"></div>
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <a class="nav-logo" href="${root}index.html" style="text-decoration:none;">
        YANIS<span style="color:var(--color-neon-red)">MEKERBI</span>
      </a>

      <!-- Hamburger button (visible on mobile) -->
      <button class="nav-toggle" aria-expanded="false" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>

      <!-- Navigation links — add more pages here -->
      <ul class="nav-links">
        <li><a href="${root}index.html">Home</a></li>
        <li><a href="${root}newsletter.html">Newsletter</a></li>
        <li><a href="${root}contact.html">Contact</a></li>
      </ul>
    </nav>
  `;

  /* ── TICKER BAR HTML ── */
  /* The scrolling text bar below the nav — change the text as you like */
  const tickerHTML = `
    <div class="ticker-bar" aria-hidden="true">
      <span class="ticker-inner">
        ✦ WELCOME TO MY PORTFOLIO WEBSITE &nbsp;&nbsp;&nbsp; ✦ DATA SCIENCE &nbsp;&nbsp;&nbsp; ✦ MACHINE LEARNING &nbsp;&nbsp;&nbsp; ✦ VIDEO EDITING &nbsp;&nbsp;&nbsp; ✦ MOTION GRAPHICS &nbsp;&nbsp;&nbsp; ✦ CONTENT CREATION &nbsp;&nbsp;&nbsp; 
      </span>
    </div>
  `;

  /* ── FOOTER HTML ── */
  const footerHTML = `
    <div class="film-strip-bottom"></div>
    <footer>
      <p class="footer-copy">© <span id="footer-year"></span> <span>Yanis Mekerbi</span> — All rights reserved.</p>
      <p class="footer-copy" style="font-size:0.9rem;">You can't make this up</p>
    </footer>
  `;

  /* ── INJECT ── */
  const body = document.body;

  // Inject nav at the very top of <body>
  const navContainer = document.createElement('div');
  navContainer.innerHTML = navHTML + tickerHTML;
  body.insertBefore(navContainer, body.firstChild);

  // Inject footer at the bottom of <body>
  const footerContainer = document.createElement('div');
  footerContainer.innerHTML = footerHTML;
  body.appendChild(footerContainer);

  // Auto-update copyright year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
