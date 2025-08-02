// SERP Games Branding Components
(function() {
  'use strict';

  // Create header HTML
  function createHeader() {
    return `
      <header class="sg-header">
        <div class="sg-header-content">
          <a href="https://serpgames.github.io" class="sg-logo">
            <span>SERP Games</span>
          </a>
          <nav class="sg-nav">
            <a href="https://serpgames.github.io">Home</a>
            <a href="https://serpgames.github.io/games">Games</a>
            <a href="https://serpgames.github.io/categories">Categories</a>
            <a href="https://github.com/serpgames" target="_blank">GitHub</a>
          </nav>
        </div>
      </header>
    `;
  }

  // Create footer HTML
  function createFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="sg-footer">
        <div class="sg-footer-content">
          <div class="sg-footer-grid">
            <div class="sg-footer-section">
              <h3>Games</h3>
              <ul>
                <li><a href="https://serpgames.github.io/games">All Games</a></li>
                <li><a href="https://serpgames.github.io/categories">Categories</a></li>
                <li><a href="https://serpgames.github.io/categories/arcade">Arcade</a></li>
                <li><a href="https://serpgames.github.io/categories/puzzle">Puzzle</a></li>
              </ul>
            </div>
            <div class="sg-footer-section">
              <h3>Resources</h3>
              <ul>
                <li><a href="https://github.com/serpgames" target="_blank">GitHub</a></li>
                <li><a href="https://github.com/serpgames/serpgames.github.io/issues" target="_blank">Report Issue</a></li>
                <li><a href="https://serpgames.github.io/sitemap">Sitemap</a></li>
              </ul>
            </div>
            <div class="sg-footer-section">
              <h3>Legal</h3>
              <ul>
                <li><a href="https://serpgames.github.io/legal/privacy-policy">Privacy Policy</a></li>
                <li><a href="https://serpgames.github.io/legal/terms-conditions">Terms & Conditions</a></li>
                <li><a href="https://serpgames.github.io/legal/dmca">DMCA</a></li>
              </ul>
            </div>
            <div class="sg-footer-section">
              <h3>Disclosures</h3>
              <ul>
                <li><a href="https://serpgames.github.io/legal/affiliate-disclosure">Affiliate Disclosure</a></li>
                <li><a href="https://serpgames.github.io/legal/advertising-disclosure">Advertising Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div class="sg-footer-bottom">
            <p>
              © ${year} 
              <a href="https://serp.games" target="_blank">SERP Games</a>. 
              All games are property of their respective creators.
            </p>
            <p>
              A project by 
              <a href="https://serp.co" target="_blank">SERP</a>
            </p>
          </div>
        </div>
      </footer>
    `;
  }

  // Initialize branding
  function initializeBranding() {
    // Add CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'serpgames-branding.css';
    document.head.appendChild(cssLink);

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addBrandingElements);
    } else {
      addBrandingElements();
    }
  }

  function addBrandingElements() {
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'sg-game-container';
    
    // Move all body content into wrapper
    while (document.body.firstChild) {
      wrapper.appendChild(document.body.firstChild);
    }
    
    // Add header
    document.body.insertAdjacentHTML('afterbegin', createHeader());
    
    // Add wrapper
    document.body.appendChild(wrapper);
    
    // Add footer
    document.body.insertAdjacentHTML('beforeend', createFooter());
  }

  // Auto-initialize
  initializeBranding();
})();