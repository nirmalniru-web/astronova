// ==========================================================================
// SMART CROP DOCTOR — PAGE 2: FARMER DASHBOARD VIEW
// Features: Dynamic Farmer Greeting, Hero Scan Action Card,
// Animated Circular Health Score (82/100), Weather Summary, Risk Card, Recent Scans
// ==========================================================================

import { store } from '../state.js';
import { historyService } from '../services/historyService.js';

export function renderDashboardView() {
  const t = store.t;
  const weather = store.state.weather || {
    current: { temp: 28, humidity: 84, rainProbability: 60, icon: "⛅" },
    diseaseRisk: { levelLabel: "Moderate Risk", summary: "High humidity and moisture." }
  };
  const healthScore = historyService.calculateHealthScore();
  const recentScans = store.state.history.slice(0, 3);

  // SVG Gauge calculations
  // Circle radius 70, circumference = 2 * PI * 70 ≈ 440
  const circumference = 440;
  const offset = circumference - (healthScore / 100) * circumference;

  const recentScansHtml = recentScans.map(scan => `
    <div class="scan-item-card" data-scan-id="${scan.scanId}">
      <div class="scan-item-left">
        <img src="${scan.image}" alt="${scan.crop}" class="scan-thumbnail" onerror="this.src='assets/images/tomato-blight.jpg'" />
        <div class="scan-item-info">
          <h4>${scan.crop} — <span style="font-weight: normal; color: var(--primary-300);">${scan.diseaseDisplay}</span></h4>
          <p>Confidence: <strong>${scan.confidence}%</strong> • ${scan.date} • ${scan.fieldLocation || 'Farm Plot'}</p>
        </div>
      </div>
      <span class="badge ${scan.severity === 'low' ? 'badge-low' : scan.severity === 'moderate' ? 'badge-mod' : 'badge-high'}">
        ${scan.severity.toUpperCase()}
      </span>
    </div>
  `).join('');

  return `
    <div class="view-container dashboard-view">
      
      <!-- 1. DASHBOARD HEADER -->
      <div class="dashboard-header">
        <h1 class="greeting-title">${t.goodMorning}</h1>
        <p class="greeting-subtitle">${t.dashboardSubtitle}</p>
      </div>

      <!-- 2. PRIMARY SCAN HERO CARD -->
      <div class="dashboard-hero-scan">
        <div class="dashboard-hero-text">
          <h3>${t.dashboardScanHeroTitle}</h3>
          <p>${t.dashboardScanHeroSub}</p>
        </div>
        <button class="btn btn-primary btn-lg" id="btn-dash-start-scan">
          <span>📷</span>
          <span>${t.startCropScan}</span>
        </button>
      </div>

      <!-- 3. TRI-CARD METRIC GRID -->
      <div class="dashboard-grid-3">
        
        <!-- CARD A: CROP HEALTH (Animated Circular Indicator) -->
        <div class="glass-card">
          <div class="card-header">
            <span class="card-title">
              <span>🌿</span>
              <span>${t.overallCropHealth}</span>
            </span>
            <span class="badge badge-low">Live</span>
          </div>

          <div class="circular-gauge-container">
            <div class="circular-gauge">
              <svg viewBox="0 0 160 160">
                <defs>
                  <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#34D399" />
                    <stop offset="100%" stop-color="#059669" />
                  </linearGradient>
                </defs>
                <circle class="gauge-bg-circle" cx="80" cy="80" r="70" />
                <circle class="gauge-progress-circle" cx="80" cy="80" r="70" 
                        style="stroke-dashoffset: ${offset};" />
              </svg>
              <div class="gauge-content">
                <div class="gauge-score">${healthScore}<span class="gauge-score-total">/100</span></div>
                <div class="gauge-label">${t.healthStatusGood}</div>
              </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; margin-top: 0.75rem; margin-bottom: 0;">
              Based on ${store.state.history.length} recent field scans across your acreage.
            </p>
          </div>
        </div>

        <!-- CARD B: WEATHER CARD -->
        <div class="glass-card glass-card-interactive" id="dash-weather-card">
          <div class="card-header">
            <span class="card-title">
              <span>⛅</span>
              <span>${t.todaysWeather}</span>
            </span>
            <span style="font-size: 0.8rem; color: var(--primary-400);">${weather.location || 'Pune'}</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin: 0.5rem 0;">
            <div style="font-size: 2.8rem; font-weight: 800; color: #FFFFFF;">${weather.current.temp}°C</div>
            <div style="font-size: 2.8rem;">${weather.current.icon}</div>
          </div>

          <div class="weather-metric-row">
            <div class="weather-metric-box">
              <div class="weather-metric-val">${weather.current.humidity}%</div>
              <div class="weather-metric-lbl">${t.humidity}</div>
            </div>
            <div class="weather-metric-box">
              <div class="weather-metric-val">${weather.current.rainProbability}%</div>
              <div class="weather-metric-lbl">${t.rainProbability}</div>
            </div>
            <div class="weather-metric-box">
              <div class="weather-metric-val">${weather.current.windSpeed || 14} km/h</div>
              <div class="weather-metric-lbl">${t.windSpeed}</div>
            </div>
          </div>

          <p style="font-size: 0.8rem; color: var(--primary-300); margin-top: 1rem; margin-bottom: 0; text-align: center;">
            Tap to view 5-day spray forecast ➔
          </p>
        </div>

        <!-- CARD C: RISK CARD -->
        <div class="glass-card">
          <div class="card-header">
            <span class="card-title">
              <span>⚠️</span>
              <span>${t.cropRisk}</span>
            </span>
            <span class="badge badge-mod">${t.riskModerate}</span>
          </div>

          <div style="background: var(--severity-mod-bg); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem;">
            <div style="font-size: 1.05rem; font-weight: 700; color: #FBBF24; margin-bottom: 0.25rem;">
              Fungal & Blight Threat
            </div>
            <p style="font-size: 0.88rem; color: var(--text-body); margin-bottom: 0;">
              ${t.riskExplanation}
            </p>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
              <span>Fungal Spore Index:</span>
              <strong style="color: #FBBF24;">Elevated (68%)</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Pest Activity Risk:</span>
              <strong style="color: #34D399;">Low (22%)</strong>
            </div>
          </div>
        </div>

      </div>

      <!-- 4. RECENT SCANS SECTION -->
      <div class="glass-card">
        <div class="card-header">
          <span class="card-title">
            <span>📋</span>
            <span>${t.recentScans}</span>
          </span>
          <button class="btn btn-secondary btn-sm" id="btn-dash-view-history">
            <span>${t.viewHistory}</span>
            <span>➔</span>
          </button>
        </div>

        <div class="recent-scans-list">
          ${recentScansHtml}
        </div>
      </div>

    </div>
  `;
}

export function attachDashboardEvents(container) {
  const startScan = container.querySelector('#btn-dash-start-scan');
  if (startScan) {
    startScan.addEventListener('click', () => store.setView('scanner'));
  }

  const viewHistory = container.querySelector('#btn-dash-view-history');
  if (viewHistory) {
    viewHistory.addEventListener('click', () => store.setView('history'));
  }

  const weatherCard = container.querySelector('#dash-weather-card');
  if (weatherCard) {
    weatherCard.addEventListener('click', () => store.setView('weather'));
  }

  // Clicking any recent scan opens it in result view
  container.querySelectorAll('.scan-item-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const scanId = e.currentTarget.getAttribute('data-scan-id');
      const scan = store.state.history.find(s => s.scanId === scanId);
      if (scan) {
        store.setCurrentScan(scan);
        store.setView('result');
      }
    });
  });
}
