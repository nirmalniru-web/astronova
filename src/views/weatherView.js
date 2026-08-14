// ==========================================================================
// SMART CROP DOCTOR — PAGE 5: WEATHER & CROP ADVISORY VIEW
// Features: Agro-Weather Dashboard, Atmospheric Metrics, Fungal/Pest Risk Index,
// 5-Day Forecast with Spray Suitability Tags
// ==========================================================================

import { store } from '../state.js';

export function renderWeatherView() {
  const t = store.t;
  const weather = store.state.weather || {
    location: "Pune, Maharashtra",
    current: { temp: 28, humidity: 84, rainProbability: 60, windSpeed: 14, icon: "⛅", condition: "Humid Spells" },
    diseaseRisk: {
      levelLabel: "Moderate Risk",
      summary: "High humidity and expected rainfall may create conditions favorable for some fungal diseases. Monitor affected plants closely.",
      actionAdvice: "Schedule protective spray before evening showers; maintain drainage in low-lying beds."
    },
    forecast: []
  };

  const forecastHtml = (weather.forecast || []).map(f => {
    const sprayClass = f.sprayStatus === 'good' ? 'spray-good' : f.sprayStatus === 'caution' ? 'spray-caution' : 'spray-avoid';
    return `
      <div class="forecast-day-card">
        <div style="font-weight: 700; font-size: 0.95rem; color: #FFFFFF;">${f.day}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${f.date}</div>
        <div style="font-size: 2.2rem; margin: 0.4rem 0;">${f.icon}</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: #FFFFFF;">
          ${f.tempHigh}° <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: normal;">/ ${f.tempLow}°</span>
        </div>
        <div style="font-size: 0.78rem; color: #38BDF8; display: flex; align-items: center; gap: 0.25rem;">
          <span>💧</span> <span>${f.rainChance}% rain</span>
        </div>
        <div class="spray-suitability-tag ${sprayClass}" style="margin-top: 0.5rem;">
          ${f.sprayLabel}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="view-container weather-view">
      
      <!-- 1. PAGE HEADER -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div class="hero-pill-badge">
            <span>🌦️</span>
            <span>Agro-Meteorological Intel</span>
          </div>
          <h1 class="section-title" style="margin-bottom: 0.25rem;">${t.weatherAdvisoryTitle}</h1>
          <p class="section-subtitle">Real-time localized micro-climate intelligence for disease prevention</p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 0.6rem 1rem; font-size: 0.88rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
          <span>📍</span>
          <strong style="color: var(--text-white);">${weather.location || 'Pune, Maharashtra'}</strong>
        </div>
      </div>

      <!-- 2. WEATHER HERO CARD -->
      <div class="weather-hero-card">
        <div class="weather-temp-main">
          <span class="weather-icon-animated">${weather.current.icon}</span>
          <div>
            <div class="weather-big-temp">${weather.current.temp}°C</div>
            <div style="font-size: 1.1rem; font-weight: 600; color: #FFFFFF;">${weather.current.condition}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Updated just now • IMD Station Grid</div>
          </div>
        </div>

        <div class="weather-metric-row" style="margin-top: 0; min-width: 320px;">
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
      </div>

      <!-- 3. CROP RISK BASED ON WEATHER -->
      <div class="glass-card" style="margin-bottom: 2rem;">
        <div class="card-header">
          <span class="card-title">
            <span>⚠️</span>
            <span>Crop Risk Based on Weather</span>
          </span>
          <span class="badge badge-mod">${weather.diseaseRisk.levelLabel}</span>
        </div>

        <div style="background: var(--severity-mod-bg); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: #FBBF24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.4rem;">
            Fungal Spore Proliferation Alert
          </h4>
          <p style="font-size: 0.98rem; line-height: 1.6; color: var(--text-white); margin-bottom: 0;">
            ${weather.diseaseRisk.summary}
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          <div class="prevention-item">
            <strong style="color: #34D399; font-size: 0.95rem;">💧 Moisture Action Plan</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0;">
              Clear drainage channels in low-lying plots to avoid root hypoxia and damp soil microclimates.
            </p>
          </div>
          <div class="prevention-item">
            <strong style="color: #FBBF24; font-size: 0.95rem;">🚜 Spraying Window</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0;">
              Favorable window for preventive sprays: Saturday morning (calm winds < 8 km/h, no rain).
            </p>
          </div>
        </div>
      </div>

      <!-- 4. 5-DAY AGRICULTURAL FORECAST -->
      <div class="glass-card" style="margin-bottom: 2rem;">
        <div class="card-header">
          <span class="card-title">
            <span>📅</span>
            <span>${t.fiveDayForecast}</span>
          </span>
        </div>

        <div class="forecast-5day-grid">
          ${forecastHtml}
        </div>
      </div>

    </div>
  `;
}

export function attachWeatherEvents(container) {
  // Empty or interactive hooks for future radar toggles
}
