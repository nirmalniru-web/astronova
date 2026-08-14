// ==========================================================================
// SMART CROP DOCTOR — CENTRAL REACTIVE STATE STORE
// ==========================================================================

import { translations, languages } from './i18n/translations.js';
import { historyService } from './services/historyService.js';
import { weatherService } from './services/weatherService.js';
import { sampleCrops } from './services/sampleData.js';
import { ttsService } from './services/ttsService.js';

class StateStore {
  constructor() {
    // Load saved language or default to English
    const savedLang = localStorage.getItem('smart_crop_lang') || 'en';
    const savedContrast = localStorage.getItem('smart_crop_contrast') === 'true';
    const savedFontScale = localStorage.getItem('smart_crop_font') || 'normal';

    this.state = {
      currentView: 'landing', // 'landing', 'dashboard', 'scanner', 'result', 'weather', 'history', 'language', 'profile'
      language: savedLang,
      languages: languages,
      currentScan: sampleCrops[0], // Default loaded sample (Tomato Early Blight)
      history: historyService.getAllScans(),
      weather: null,
      isScanning: false,
      scanningStage: null,
      settings: {
        highContrast: savedContrast,
        fontSize: savedFontScale,
        ttsSpeed: 1.0,
        alertsPest: true,
        alertsWeather: true,
        farmerName: "Ramesh Patel",
        farmLocation: "Pune, Maharashtra",
        farmSize: "4.5",
        primaryCrops: "Tomato, Chilli, Rice"
      }
    };

    this.listeners = new Set();
    this.initThemeAndFont();
    this.loadInitialWeather();
    this.loadInitialHistory();
  }

  initThemeAndFont() {
    if (this.state.settings.highContrast) {
      document.body.classList.add('high-contrast');
    }
    if (this.state.settings.fontSize === 'large') {
      document.body.classList.add('font-large');
    } else if (this.state.settings.fontSize === 'xlarge') {
      document.body.classList.add('font-xlarge');
    }
  }

  async loadInitialWeather() {
    this.state.weather = await weatherService.getCurrentWeather(this.state.settings.farmLocation);
    this.notify();
  }

  async loadInitialHistory() {
    this.state.history = await historyService.fetchHistoryFromServer();
    this.notify();
  }

  get t() {
    return translations[this.state.language] || translations.en;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  setView(viewName) {
    if (this.state.currentView !== viewName) {
      ttsService.stop();
      this.state.currentView = viewName;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.notify();
    }
  }

  setLanguage(langCode) {
    if (translations[langCode]) {
      ttsService.stop();
      this.state.language = langCode;
      localStorage.setItem('smart_crop_lang', langCode);
      this.notify();
    }
  }

  setCurrentScan(scanResult) {
    ttsService.stop();
    this.state.currentScan = scanResult;
    this.notify();
  }

  addScanToHistory(scanResult) {
    const updated = historyService.addScan(scanResult);
    this.state.history = updated;
    this.notify();
  }

  updateSettings(newSettings) {
    this.state.settings = { ...this.state.settings, ...newSettings };
    
    // Apply contrast
    if (this.state.settings.highContrast) {
      document.body.classList.add('high-contrast');
      localStorage.setItem('smart_crop_contrast', 'true');
    } else {
      document.body.classList.remove('high-contrast');
      localStorage.setItem('smart_crop_contrast', 'false');
    }

    // Apply font scale
    document.body.classList.remove('font-large', 'font-xlarge');
    if (this.state.settings.fontSize === 'large') {
      document.body.classList.add('font-large');
    } else if (this.state.settings.fontSize === 'xlarge') {
      document.body.classList.add('font-xlarge');
    }
    localStorage.setItem('smart_crop_font', this.state.settings.fontSize);

    this.notify();
  }
}

export const store = new StateStore();
