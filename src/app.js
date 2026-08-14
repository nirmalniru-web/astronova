// ==========================================================================
// SMART CROP DOCTOR — APPLICATION ENTRY POINT & ROUTER
// ==========================================================================

import { store } from './state.js';
import { languages } from './i18n/translations.js';

// Views
import { renderLandingView, attachLandingEvents } from './views/landingView.js';
import { renderDashboardView, attachDashboardEvents } from './views/dashboardView.js';
import { renderScannerView, attachScannerEvents } from './views/scannerView.js';
import { renderResultView, attachResultEvents } from './views/resultView.js';
import { renderWeatherView, attachWeatherEvents } from './views/weatherView.js';
import { renderHistoryView, attachHistoryEvents } from './views/historyView.js';
import { renderLanguageView, attachLanguageEvents } from './views/languageView.js';
import { renderProfileView, attachProfileEvents } from './views/profileView.js';

// ==========================================================================
// 1. GLOBAL TOAST SYSTEM
// ==========================================================================
window.showToast = function(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🌱</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// ==========================================================================
// 2. FLOATING LEAF PARTICLES CANVAS (Cinematic Background Motion)
// ==========================================================================
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 24; // Subtle, non-distracting

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 4,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2, // Gentle upward drift
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.25 + 0.1,
      hue: Math.random() > 0.3 ? 150 : 45 // Soft green or golden amber
    });
  }

  function drawLeaf(ctx, x, y, size, rotation, opacity, hue) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 1.5, size * 0.7, 0, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 65%, 55%, ${opacity})`;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      drawLeaf(ctx, p.x, p.y, p.size, p.rotation, p.opacity, p.hue);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 3. NAVBAR RENDERING & LOGIC
// ==========================================================================
function renderNavbar() {
  const navContainer = document.getElementById('navbar-mount');
  if (!navContainer) return;

  const t = store.t;
  const currentView = store.state.currentView;
  const currentLang = store.state.language;
  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];

  const langMenuItemsHtml = languages.map(l => `
    <div class="lang-menu-item ${l.code === currentLang ? 'active' : ''}" data-nav-lang="${l.code}">
      <span>${l.flag} ${l.native}</span>
      <span style="font-size: 0.75rem; color: var(--text-muted);">${l.name}</span>
    </div>
  `).join('');

  navContainer.innerHTML = `
    <header class="top-navbar">
      <div class="nav-container">
        <!-- Brand Logo -->
        <a href="#" class="brand-logo" id="nav-brand-link">
          <div class="brand-icon">🌿</div>
          <div>
            <span class="brand-name">${t.brandName}</span>
            <span class="brand-tagline">AI CROP HEALTH</span>
          </div>
        </a>

        <!-- Desktop Nav Links -->
        <nav class="desktop-nav-links" aria-label="Main Navigation">
          <button class="nav-link-btn ${currentView === 'landing' ? 'active' : ''}" data-view="landing">
            <span>🏠</span> <span>${t.navHome}</span>
          </button>
          <button class="nav-link-btn ${currentView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
            <span>📊</span> <span>${t.navDashboard}</span>
          </button>
          <button class="nav-link-btn ${currentView === 'scanner' ? 'active' : ''}" data-view="scanner">
            <span>📷</span> <span>${t.navScan}</span>
          </button>
          <button class="nav-link-btn ${currentView === 'weather' ? 'active' : ''}" data-view="weather">
            <span>🌦️</span> <span>${t.navWeather}</span>
          </button>
          <button class="nav-link-btn ${currentView === 'history' ? 'active' : ''}" data-view="history">
            <span>📈</span> <span>${t.navHistory}</span>
          </button>
          <button class="nav-link-btn ${currentView === 'language' ? 'active' : ''}" data-view="language">
            <span>🌐</span> <span>${t.navLanguage}</span>
          </button>
          <button class="nav-link-btn ${currentView === 'profile' ? 'active' : ''}" data-view="profile">
            <span>👨‍🌾</span> <span>${t.navProfile}</span>
          </button>
        </nav>

        <!-- Nav Right Actions -->
        <div class="nav-actions">
          <!-- Compact Language Dropdown -->
          <div class="lang-dropdown-container">
            <button class="lang-dropdown-btn" id="btn-lang-dropdown">
              <span>${currentLangObj.flag}</span>
              <span>${currentLangObj.native}</span>
              <span style="font-size: 0.7rem;">▼</span>
            </button>
            <div class="lang-dropdown-menu" id="lang-dropdown-menu">
              ${langMenuItemsHtml}
            </div>
          </div>

          <!-- Quick Action CTA -->
          <button class="btn btn-primary btn-sm" id="btn-nav-quick-scan" style="display: none;">
            <span>📷</span> <span>Scan</span>
          </button>
        </div>
      </div>
    </header>
  `;

  // Attach nav events
  navContainer.querySelector('#nav-brand-link').addEventListener('click', (e) => {
    e.preventDefault();
    store.setView('landing');
  });

  navContainer.querySelectorAll('.nav-link-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.currentTarget.getAttribute('data-view');
      if (view) store.setView(view);
    });
  });

  // Language dropdown toggle
  const langBtn = navContainer.querySelector('#btn-lang-dropdown');
  const langMenu = navContainer.querySelector('#lang-dropdown-menu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      langMenu.classList.remove('open');
    });

    langMenu.querySelectorAll('.lang-menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const langCode = e.currentTarget.getAttribute('data-nav-lang');
        if (langCode) {
          store.setLanguage(langCode);
          langMenu.classList.remove('open');
        }
      });
    });
  }
}

// ==========================================================================
// 4. MOBILE BOTTOM BAR
// ==========================================================================
function renderMobileBottomBar() {
  const barContainer = document.getElementById('mobile-bottom-mount');
  if (!barContainer) return;

  const t = store.t;
  const currentView = store.state.currentView;

  barContainer.innerHTML = `
    <nav class="mobile-bottom-bar" aria-label="Mobile Navigation">
      <button class="mobile-nav-item ${currentView === 'landing' || currentView === 'dashboard' ? 'active' : ''}" data-mobile-view="dashboard">
        <span class="nav-icon">📊</span>
        <span>${t.navDashboard}</span>
      </button>
      
      <button class="mobile-nav-item ${currentView === 'weather' ? 'active' : ''}" data-mobile-view="weather">
        <span class="nav-icon">🌦️</span>
        <span>${t.navWeather}</span>
      </button>

      <!-- Prominent Center Scan Highlight -->
      <button class="mobile-nav-item mobile-scan-highlight" data-mobile-view="scanner" aria-label="Scan Crop">
        <span style="font-size: 1.5rem;">📷</span>
        <span style="font-size: 0.65rem; font-weight: 700;">SCAN</span>
      </button>

      <button class="mobile-nav-item ${currentView === 'history' ? 'active' : ''}" data-mobile-view="history">
        <span class="nav-icon">📈</span>
        <span>${t.navHistory}</span>
      </button>

      <button class="mobile-nav-item ${currentView === 'profile' || currentView === 'language' ? 'active' : ''}" data-mobile-view="profile">
        <span class="nav-icon">👨‍🌾</span>
        <span>${t.navProfile}</span>
      </button>
    </nav>
  `;

  barContainer.querySelectorAll('.mobile-nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.currentTarget.getAttribute('data-mobile-view');
      if (view) store.setView(view);
    });
  });
}

// ==========================================================================
// 5. MAIN ROUTER & APP RENDERER
// ==========================================================================
function renderApp() {
  renderNavbar();
  renderMobileBottomBar();

  const mainMount = document.getElementById('main-content-mount');
  if (!mainMount) return;

  const currentView = store.state.currentView;

  switch (currentView) {
    case 'landing':
      mainMount.innerHTML = renderLandingView();
      attachLandingEvents(mainMount);
      break;

    case 'dashboard':
      mainMount.innerHTML = renderDashboardView();
      attachDashboardEvents(mainMount);
      break;

    case 'scanner':
      mainMount.innerHTML = renderScannerView();
      attachScannerEvents(mainMount);
      break;

    case 'result':
      mainMount.innerHTML = renderResultView();
      attachResultEvents(mainMount);
      break;

    case 'weather':
      mainMount.innerHTML = renderWeatherView();
      attachWeatherEvents(mainMount);
      break;

    case 'history':
      mainMount.innerHTML = renderHistoryView();
      attachHistoryEvents(mainMount);
      break;

    case 'language':
      mainMount.innerHTML = renderLanguageView();
      attachLanguageEvents(mainMount);
      break;

    case 'profile':
      mainMount.innerHTML = renderProfileView();
      attachProfileEvents(mainMount);
      break;

    default:
      mainMount.innerHTML = renderLandingView();
      attachLandingEvents(mainMount);
      break;
  }
}

// Initial Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  renderApp();
  store.subscribe(() => renderApp());
});
