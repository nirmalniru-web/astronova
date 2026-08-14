// ==========================================================================
// SMART CROP DOCTOR — PAGE 1: LANDING / HOME VIEW
// Features: First-Screen Language Selector, Cinematic Hero with AI Laser Leaf,
// How It Works Step Cards, Built for Farmers Features Grid
// ==========================================================================

import { store } from '../state.js';
import { languages } from '../i18n/translations.js';

export function renderLandingView() {
  const t = store.t;
  const currentLang = store.state.language;

  // Generate language selector pills
  const langPillsHtml = languages.map(lang => `
    <button class="lang-pill-btn ${lang.code === currentLang ? 'active' : ''}" 
            data-lang="${lang.code}" 
            aria-label="Select ${lang.name}">
      <span class="native-name">${lang.native}</span>
      <span class="en-name">${lang.name}</span>
    </button>
  `).join('');

  return `
    <div class="view-container landing-view">
      
      <!-- 1. FIRST-SCREEN PROMINENT LANGUAGE SELECTION (Requested by User) -->
      <section class="lang-onboarding-bar" aria-label="Language selection">
        <div class="lang-onboarding-header">
          <div class="lang-onboarding-title">
            <span>🌐</span>
            <div>
              <strong>${t.chooseLanguage}</strong>
              <div style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">${t.chooseLanguageSub}</div>
            </div>
          </div>
          <span class="badge badge-low" style="text-transform: none;">8 Indian Languages</span>
        </div>
        <div class="lang-pills-grid">
          ${langPillsHtml}
        </div>
      </section>

      <!-- 2. CINEMATIC HERO SECTION -->
      <section class="landing-hero">
        <div class="hero-text-col">
          <div class="hero-pill-badge">
            <span>✨</span>
            <span>Next-Gen Agricultural AI</span>
          </div>
          <h1 class="hero-title">${t.tagline}</h1>
          <p class="hero-subtitle">${t.heroSubtitle}</p>
          
          <div class="hero-cta-group">
            <button class="btn btn-primary btn-lg" id="btn-hero-scan">
              <span>📷</span>
              <span>${t.scanYourCrop}</span>
            </button>
            <button class="btn btn-secondary btn-lg" id="btn-hero-advisory">
              <span>🌦️</span>
              <span>${t.exploreAdvisory}</span>
            </button>
          </div>

          <!-- Trust Guarantees -->
          <div style="display: flex; gap: 1.5rem; margin-top: 2rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: var(--text-muted);">
              <span style="color: #34D399; font-size: 1.1rem;">✓</span>
              <span>100% Free for Farmers</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: var(--text-muted);">
              <span style="color: #34D399; font-size: 1.1rem;">✓</span>
              <span>Instant AI Diagnosis</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: var(--text-muted);">
              <span style="color: #34D399; font-size: 1.1rem;">✓</span>
              <span>Voice Narration</span>
            </div>
          </div>
        </div>

        <!-- Cinematic Leaf Visual with AI Laser Overlay -->
        <div class="hero-visual-col" style="display: flex; justify-content: center;">
          <div class="hero-scan-visual">
            <img src="assets/images/hero-crop.jpg" alt="Agricultural crop leaf" class="hero-scan-img" onerror="this.src='assets/images/tomato-blight.jpg'" />
            <div class="scanner-laser-line"></div>
            <div class="scanner-grid-overlay"></div>
            <div class="scanner-reticle" style="top: calc(50% - 70px); left: calc(50% - 70px);"></div>
            
            <div class="scanner-corner corner-tl"></div>
            <div class="scanner-corner corner-tr"></div>
            <div class="scanner-corner corner-bl"></div>
            <div class="scanner-corner corner-br"></div>

            <div class="hero-badge-overlay">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="font-size: 1.3rem;">🍃</span>
                <div>
                  <div style="font-size: 0.85rem; font-weight: 700; color: #FFFFFF;">AI Vision Engine</div>
                  <div style="font-size: 0.72rem; color: #34D399;">Detecting Leaf Micro-Patterns</div>
                </div>
              </div>
              <span class="badge badge-low">99.2% Accuracy</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. HOW IT WORKS SECTION -->
      <section style="padding: 2rem 0;">
        <div class="section-header-center">
          <h2 class="section-title">${t.howItWorksTitle}</h2>
          <p class="section-subtitle">${t.howItWorksSub}</p>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">${t.step1Title}</h3>
            <p class="step-desc">${t.step1Desc}</p>
          </div>

          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">${t.step2Title}</h3>
            <p class="step-desc">${t.step2Desc}</p>
          </div>

          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">${t.step3Title}</h3>
            <p class="step-desc">${t.step3Desc}</p>
          </div>

          <div class="step-card">
            <div class="step-number">4</div>
            <h3 class="step-title">${t.step4Title}</h3>
            <p class="step-desc">${t.step4Desc}</p>
          </div>
        </div>
      </section>

      <!-- 4. BUILT FOR FARMERS FEATURES -->
      <section style="padding: 2rem 0;">
        <div class="section-header-center">
          <h2 class="section-title">${t.featuresTitle}</h2>
          <p class="section-subtitle">${t.featuresSub}</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-box">🔬</div>
            <h3 class="feature-title">${t.feat1Title}</h3>
            <p class="feature-desc">${t.feat1Desc}</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-box">📋</div>
            <h3 class="feature-title">${t.feat2Title}</h3>
            <p class="feature-desc">${t.feat2Desc}</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-box">🌦️</div>
            <h3 class="feature-title">${t.feat3Title}</h3>
            <p class="feature-desc">${t.feat3Desc}</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-box">🗣️</div>
            <h3 class="feature-title">${t.feat4Title}</h3>
            <p class="feature-desc">${t.feat4Desc}</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-box">📈</div>
            <h3 class="feature-title">${t.feat5Title}</h3>
            <p class="feature-desc">${t.feat5Desc}</p>
          </div>

          <div class="feature-card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 78, 59, 0.3)); border-color: var(--border-glow);">
            <div class="feature-icon-box" style="background: var(--primary-500); color: #000;">🚀</div>
            <h3 class="feature-title">Ready to protect your crop?</h3>
            <p class="feature-desc">Start scanning diseased or healthy leaves in seconds.</p>
            <button class="btn btn-primary btn-sm" id="btn-feature-scan" style="margin-top: 0.5rem;">
              <span>Start Scanning</span> <span>➔</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  `;
}

export function attachLandingEvents(container) {
  // Language selection pills
  container.querySelectorAll('.lang-pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      if (lang) {
        store.setLanguage(lang);
      }
    });
  });

  // Action buttons
  const heroScan = container.querySelector('#btn-hero-scan');
  if (heroScan) {
    heroScan.addEventListener('click', () => store.setView('scanner'));
  }

  const heroAdvisory = container.querySelector('#btn-hero-advisory');
  if (heroAdvisory) {
    heroAdvisory.addEventListener('click', () => store.setView('weather'));
  }

  const featScan = container.querySelector('#btn-feature-scan');
  if (featScan) {
    featScan.addEventListener('click', () => store.setView('scanner'));
  }
}
