// ==========================================================================
// SMART CROP DOCTOR — PAGE 8: FARMER PROFILE & SETTINGS VIEW
// Features: Farmer Details, Farm Acreage, SMS Pest Alert Config,
// Unit Customizer, Offline Mode Status Indicator
// ==========================================================================

import { store } from '../state.js';

export function renderProfileView() {
  const t = store.t;
  const settings = store.state.settings;

  return `
    <div class="view-container profile-view">
      
      <!-- 1. PAGE HEADER -->
      <div style="margin-bottom: 2rem;">
        <div class="hero-pill-badge">
          <span>👨‍🌾</span>
          <span>Farm Operations & Account</span>
        </div>
        <h1 class="section-title">${t.farmerProfile}</h1>
        <p class="section-subtitle">Manage your farm acreage, crop profiles, and alert preferences</p>
      </div>

      <div class="container-narrow">
        
        <!-- 2. FARMER PROFILE FORM -->
        <div class="glass-card" style="margin-bottom: 2rem;">
          <div class="card-header">
            <span class="card-title">
              <span>🌾</span>
              <span>Farm Information</span>
            </span>
            <span class="badge badge-low">Verified Farm</span>
          </div>

          <form id="profile-form" class="profile-form-grid">
            
            <div class="form-group">
              <label class="form-label">${t.farmerName}</label>
              <input type="text" class="form-input" id="input-farmer-name" value="${settings.farmerName || 'Ramesh Patel'}" required />
            </div>

            <div class="form-group">
              <label class="form-label">${t.farmLocation}</label>
              <input type="text" class="form-input" id="input-farm-location" value="${settings.farmLocation || 'Pune, Maharashtra'}" required />
            </div>

            <div class="form-group">
              <label class="form-label">${t.farmSize}</label>
              <input type="number" step="0.1" class="form-input" id="input-farm-size" value="${settings.farmSize || '4.5'}" required />
            </div>

            <div class="form-group">
              <label class="form-label">${t.primaryCrops}</label>
              <input type="text" class="form-input" id="input-primary-crops" value="${settings.primaryCrops || 'Tomato, Chilli, Rice'}" required />
            </div>

            <!-- SMART ALERT PREFERENCES -->
            <div class="form-group full-width" style="margin-top: 1rem;">
              <label class="form-label" style="font-size: 1rem; margin-bottom: 0.5rem;">Smart Advisory Notifications</label>
              
              <div class="setting-row">
                <div>
                  <div style="font-weight: 700; color: #FFFFFF;">${t.pestAlerts}</div>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">Receive early warnings when nearby farms report fungal or pest outbreaks</div>
                </div>
                <div class="toggle-switch ${settings.alertsPest ? 'active' : ''}" id="toggle-pest-alerts">
                  <div class="toggle-switch-handle"></div>
                </div>
              </div>

              <div class="setting-row" style="border-bottom: none;">
                <div>
                  <div style="font-weight: 700; color: #FFFFFF;">${t.weatherAlerts}</div>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">Receive SMS alerts 24 hours prior to heavy rain or high humidity days</div>
                </div>
                <div class="toggle-switch ${settings.alertsWeather ? 'active' : ''}" id="toggle-weather-alerts">
                  <div class="toggle-switch-handle"></div>
                </div>
              </div>
            </div>

            <!-- SUBMIT BUTTON -->
            <div class="form-group full-width" style="margin-top: 1rem;">
              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                <span>💾</span>
                <span>${t.saveChanges}</span>
              </button>
            </div>

          </form>
        </div>

        <!-- 3. SYSTEM & OFFLINE CAPABILITY CARD -->
        <div class="glass-card">
          <div class="card-header">
            <span class="card-title">
              <span>📶</span>
              <span>Connectivity & Offline Mode</span>
            </span>
            <span class="badge badge-low">Ready</span>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
            Smart Crop Doctor caches critical agricultural disease guides and past scans locally on your device, allowing you to review advisories even when working in remote fields without cell network.
          </p>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <div class="weather-metric-box" style="flex: 1;">
              <div style="font-size: 1.1rem; font-weight: 700; color: #34D399;">Offline Cache Active</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Local Storage Sync</div>
            </div>
            <div class="weather-metric-box" style="flex: 1;">
              <div style="font-size: 1.1rem; font-weight: 700; color: #38BDF8;">PWA Installable</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Home Screen Shortcut</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}

export function attachProfileEvents(container) {
  const form = container.querySelector('#profile-form');
  const togglePest = container.querySelector('#toggle-pest-alerts');
  const toggleWeather = container.querySelector('#toggle-weather-alerts');

  let alertsPestState = store.state.settings.alertsPest;
  let alertsWeatherState = store.state.settings.alertsWeather;

  if (togglePest) {
    togglePest.addEventListener('click', () => {
      alertsPestState = !alertsPestState;
      togglePest.classList.toggle('active', alertsPestState);
    });
  }

  if (toggleWeather) {
    toggleWeather.addEventListener('click', () => {
      alertsWeatherState = !alertsWeatherState;
      toggleWeather.classList.toggle('active', alertsWeatherState);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const farmerName = container.querySelector('#input-farmer-name').value;
      const farmLocation = container.querySelector('#input-farm-location').value;
      const farmSize = container.querySelector('#input-farm-size').value;
      const primaryCrops = container.querySelector('#input-primary-crops').value;

      store.updateSettings({
        farmerName,
        farmLocation,
        farmSize,
        primaryCrops,
        alertsPest: alertsPestState,
        alertsWeather: alertsWeatherState
      });

      window.showToast(store.t.profileSaved || "Profile saved successfully!");
    });
  }
}
