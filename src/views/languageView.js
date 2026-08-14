// ==========================================================================
// SMART CROP DOCTOR — PAGE 7: LANGUAGE & ACCESSIBILITY SUITE
// Features: 8 Indian Regional Language Switcher Cards, Font Scaling,
// Outdoor High-Contrast Mode Toggle, Voice Narration Speed Controller
// ==========================================================================

import { store } from '../state.js';
import { languages } from '../i18n/translations.js';

export function renderLanguageView() {
  const t = store.t;
  const currentLang = store.state.language;
  const settings = store.state.settings;

  const langCardsHtml = languages.map(lang => `
    <div class="lang-card-option ${lang.code === currentLang ? 'active' : ''}" data-lang-code="${lang.code}">
      <div style="display: flex; align-items: center; gap: 0.85rem;">
        <span style="font-size: 1.8rem;">${lang.flag}</span>
        <div>
          <div style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF;">${lang.native}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${lang.name}</div>
        </div>
      </div>
      <div style="font-size: 1.2rem; color: ${lang.code === currentLang ? '#34D399' : 'var(--text-dim)'};">
        ${lang.code === currentLang ? '✓' : '○'}
      </div>
    </div>
  `).join('');

  return `
    <div class="view-container language-view">
      
      <!-- 1. PAGE HEADER -->
      <div style="margin-bottom: 2rem;">
        <div class="hero-pill-badge">
          <span>🌐</span>
          <span>Regional Inclusivity</span>
        </div>
        <h1 class="section-title">${t.languageSettingsTitle}</h1>
        <p class="section-subtitle">Tailor the app experience to your native language and viewing environment</p>
      </div>

      <!-- 2. REGIONAL LANGUAGE SELECTION CARDS -->
      <div class="glass-card" style="margin-bottom: 2rem;">
        <div class="card-header">
          <span class="card-title">
            <span>🗣️</span>
            <span>Regional Language</span>
          </span>
          <span class="badge badge-low">Instant Switch</span>
        </div>

        <div class="lang-grid-full">
          ${langCardsHtml}
        </div>
      </div>

      <!-- 3. ACCESSIBILITY CONTROLS -->
      <div class="glass-card">
        <div class="card-header">
          <span class="card-title">
            <span>👁️</span>
            <span>Visual & Audio Accessibility</span>
          </span>
        </div>

        <div class="accessibility-controls-grid">
          
          <!-- Font Size Scaler -->
          <div class="setting-row">
            <div>
              <div style="font-weight: 700; color: #FFFFFF; font-size: 1rem;">${t.textSize}</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">Adjust typography scale for easy reading</div>
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <button class="crop-chip ${settings.fontSize === 'normal' ? 'active' : ''}" data-font-size="normal">
                ${t.textNormal}
              </button>
              <button class="crop-chip ${settings.fontSize === 'large' ? 'active' : ''}" data-font-size="large">
                ${t.textLarge}
              </button>
              <button class="crop-chip ${settings.fontSize === 'xlarge' ? 'active' : ''}" data-font-size="xlarge">
                ${t.textXLarge}
              </button>
            </div>
          </div>

          <!-- Outdoor High Contrast Mode -->
          <div class="setting-row">
            <div>
              <div style="font-weight: 700; color: #FFFFFF; font-size: 1rem;">${t.highContrastMode}</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">${t.highContrastSub}</div>
            </div>
            <div class="toggle-switch ${settings.highContrast ? 'active' : ''}" id="toggle-high-contrast">
              <div class="toggle-switch-handle"></div>
            </div>
          </div>

          <!-- Voice Reading Speed -->
          <div class="setting-row" style="border-bottom: none;">
            <div>
              <div style="font-weight: 700; color: #FFFFFF; font-size: 1rem;">${t.audioNarrationSpeed}</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">Speech rate for voice advisory playback</div>
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <button class="crop-chip ${settings.ttsSpeed === 0.8 ? 'active' : ''}" data-tts-speed="0.8">0.8x Slow</button>
              <button class="crop-chip ${settings.ttsSpeed === 1.0 ? 'active' : ''}" data-tts-speed="1.0">1.0x Normal</button>
              <button class="crop-chip ${settings.ttsSpeed === 1.2 ? 'active' : ''}" data-tts-speed="1.2">1.2x Fast</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;
}

export function attachLanguageEvents(container) {
  // Language option cards
  container.querySelectorAll('.lang-card-option').forEach(card => {
    card.addEventListener('click', (e) => {
      const code = e.currentTarget.getAttribute('data-lang-code');
      if (code) {
        store.setLanguage(code);
        window.showToast(`🌐 Language switched to ${code.toUpperCase()}`);
      }
    });
  });

  // Font size buttons
  container.querySelectorAll('button[data-font-size]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const size = e.currentTarget.getAttribute('data-font-size');
      store.updateSettings({ fontSize: size });
    });
  });

  // High contrast toggle
  const contrastToggle = container.querySelector('#toggle-high-contrast');
  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      const current = store.state.settings.highContrast;
      store.updateSettings({ highContrast: !current });
      window.showToast(!current ? "☀️ High-Contrast Mode Enabled" : "🌙 Standard Theme Restored");
    });
  }

  // TTS speed buttons
  container.querySelectorAll('button[data-tts-speed]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const speed = parseFloat(e.currentTarget.getAttribute('data-tts-speed'));
      store.updateSettings({ ttsSpeed: speed });
    });
  });
}
