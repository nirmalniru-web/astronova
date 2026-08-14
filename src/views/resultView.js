// ==========================================================================
// SMART CROP DOCTOR — PAGE 4: DISEASE RESULT & FARMER-FRIENDLY VOICE ADVISORY
// Features: Content-Aware Speech Generation (Greeting, Pathology, Confidence,
// Symptoms, Recommendations, Weather Risk, Krishi Disclaimer), Full Voice Controls
// Controls: Play, Pause, Resume, Stop, Replay, Voice Speed (Slow/Normal/Fast),
// Dynamic Waveform, and "Speaking in: [Selected Language]" Indicator
// ==========================================================================

import { store } from '../state.js';
import { ttsService, generateAdvisorySpeech } from '../services/ttsService.js';
import { getLocalizedCropData } from '../services/sampleData.js';

export function renderResultView() {
  const t = store.t;
  const currentLang = store.state.language;
  const scan = store.state.currentScan;
  const weather = store.state.weather;
  const currentSpeed = store.state.settings.ttsSpeed || 1.0;

  // Retrieve active localized diagnostic profile
  const localizedData = getLocalizedCropData(scan, currentLang);

  const isHealthy = scan.status === 'healthy';
  const isModerate = scan.severity === 'moderate';
  const isHigh = scan.severity === 'high';
  const isLow = scan.severity === 'low';

  // Check voice availability for selected language
  const voiceInfo = ttsService.checkVoiceAvailability(currentLang);

  // Symptom Cards HTML
  const symptomsHtml = (localizedData.symptoms || []).map(sym => `
    <div class="symptom-card">
      <span class="symptom-icon">${sym.icon || '🍂'}</span>
      <div>
        <div class="symptom-name">${sym.name}</div>
        <div style="font-size: 0.82rem; color: var(--text-muted);">${sym.desc}</div>
      </div>
    </div>
  `).join('');

  // Numbered Recommendations Checklist HTML
  const recommendationsHtml = (localizedData.recommendations || []).map(rec => `
    <div class="recom-item">
      <div class="recom-num">${rec.step}</div>
      <div class="recom-content">
        <h4>${rec.title}</h4>
        <p>${rec.desc}</p>
      </div>
    </div>
  `).join('');

  // Prevention Grid HTML
  const preventionHtml = (localizedData.prevention || []).map(prev => `
    <div class="prevention-item">
      <div style="font-weight: 700; color: #34D399; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem;">
        <span>🛡️</span>
        <span>${prev.title}</span>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">${prev.desc}</div>
    </div>
  `).join('');

  // Bounding box if diseased
  const bboxHtml = scan.boundingBox ? `
    <div class="symptom-bbox" style="top: ${scan.boundingBox.top}%; left: ${scan.boundingBox.left}%; width: ${scan.boundingBox.width}%; height: ${scan.boundingBox.height}%;">
      <span class="symptom-bbox-tag">Symptom Detected</span>
    </div>
  ` : '';

  return `
    <div class="view-container result-view">
      
      <!-- 1. TOP TITLE -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge ${isHealthy ? 'badge-low' : isHigh ? 'badge-high' : 'badge-mod'}">
            ${isHealthy ? t.statusHealthy : t.statusNeedsAttention}
          </span>
          <h1 class="section-title" style="margin-top: 0.4rem; margin-bottom: 0;">${t.cropAnalysisTitle}</h1>
        </div>

        <button class="btn btn-secondary btn-sm" id="btn-result-scan-another">
          <span>📷</span>
          <span>${t.scanAnother}</span>
        </button>
      </div>

      <!-- 2. RESULT HEADER CARD -->
      <div class="glass-card" style="margin-bottom: 1.75rem;">
        <div class="result-header-card">
          
          <!-- Image with Bounding Box Overlay -->
          <div class="result-image-wrapper">
            <img src="${scan.image}" alt="${scan.crop} scan" onerror="this.src='assets/images/tomato-blight.jpg'" />
            ${bboxHtml}
          </div>

          <!-- Diagnostic Metrics & Severity -->
          <div class="result-details-col">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 1.1rem; color: var(--text-muted); font-weight: 600;">${scan.crop}</span>
              <span class="badge badge-info" style="font-size: 0.85rem;">${t.confidence}: <strong>${scan.confidence}%</strong></span>
            </div>

            <h2 style="font-size: 1.85rem; color: #FFFFFF; font-weight: 800; margin: 0.2rem 0;">
              ${localizedData.diseaseDisplay || scan.diseaseDisplay}
            </h2>

            <!-- 3-TIER SEVERITY METER -->
            <div class="severity-meter">
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
                <span style="font-weight: 600; color: var(--text-muted);">${t.severity}:</span>
                <strong style="color: ${isLow ? 'var(--severity-low)' : isModerate ? 'var(--severity-mod)' : 'var(--severity-high)'}; text-transform: uppercase;">
                  ${scan.severity}
                </strong>
              </div>
              
              <div class="severity-meter-track">
                <div class="severity-segment seg-low ${isLow || isModerate || isHigh ? 'active' : ''}"></div>
                <div class="severity-segment seg-mod ${isModerate || isHigh ? 'active' : ''}"></div>
                <div class="severity-segment seg-high ${isHigh ? 'active' : ''}"></div>
              </div>

              <div class="severity-labels">
                <span class="severity-label-item ${isLow ? 'active' : ''}">${t.sevLow}</span>
                <span class="severity-label-item ${isModerate ? 'active' : ''}">${t.sevModerate}</span>
                <span class="severity-label-item ${isHigh ? 'active' : ''}">${t.sevHigh}</span>
              </div>
            </div>

            <!-- MANDATORY DISCLAIMER BANNER -->
            <div class="disclaimer-banner">
              <span>⚠️</span>
              <span>${t.disclaimerText}</span>
            </div>

            <!-- ==========================================================
                 🔊 FARMER-FRIENDLY VOICE ADVISORY PLAYER SUITE
                 ========================================================== -->
            <div class="tts-player-card" style="flex-direction: column; align-items: stretch; gap: 1rem;">
              
              <!-- Voice Header & Language State -->
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div class="tts-icon-circle" id="tts-play-icon">🔊</div>
                  <div>
                    <div style="font-weight: 700; color: #FFFFFF; font-size: 1rem;">
                      ${t.speakingIn}: <span style="color: #34D399;">${voiceInfo.label}</span>
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);" id="tts-status-subtext">
                      ${voiceInfo.hasNativeVoice ? '🎙️ Regional voice synthesizer active' : '🎙️ Device speech synthesizer ready'}
                    </div>
                  </div>
                </div>

                <!-- Animated Waveforms -->
                <div class="tts-waves" id="tts-visual-waves">
                  <div class="tts-wave-bar"></div>
                  <div class="tts-wave-bar"></div>
                  <div class="tts-wave-bar"></div>
                  <div class="tts-wave-bar"></div>
                  <div class="tts-wave-bar"></div>
                </div>
              </div>

              <!-- Main Control Bar: Large Listen Button + Stop + Replay -->
              <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center;">
                <button class="btn btn-primary btn-md" id="btn-toggle-tts" style="flex: 1; min-width: 200px;" title="Listen to Full Advisory">
                  <span id="tts-btn-icon">▶</span>
                  <span id="tts-btn-text">${t.listenFullAdvisory}</span>
                </button>

                <button class="btn btn-secondary btn-sm" id="btn-replay-tts" style="padding: 0.6rem 1rem;" title="${t.replayAudio || 'Replay'}">
                  <span>🔄</span>
                  <span>${t.replayAudio || 'Replay'}</span>
                </button>

                <button class="btn btn-secondary btn-sm" id="btn-stop-tts" style="padding: 0.6rem 1rem;" title="${t.stopAudio || 'Stop'}">
                  <span>⏹</span>
                  <span>${t.stopAudio || 'Stop'}</span>
                </button>
              </div>

              <!-- Voice Speed Control (Slow / Normal / Fast) -->
              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
                  ⚡ ${t.voiceSpeed || 'Voice Speed'}:
                </span>
                <div style="display: flex; gap: 0.35rem;">
                  <button class="crop-chip ${currentSpeed === 0.8 ? 'active' : ''}" data-res-speed="0.8" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">
                    ${t.speedSlow || 'Slow (0.8x)'}
                  </button>
                  <button class="crop-chip ${currentSpeed === 1.0 ? 'active' : ''}" data-res-speed="1.0" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">
                    ${t.speedNormal || 'Normal (1.0x)'}
                  </button>
                  <button class="crop-chip ${currentSpeed === 1.2 ? 'active' : ''}" data-res-speed="1.2" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">
                    ${t.speedFast || 'Fast (1.2x)'}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      <!-- 3. WHAT'S HAPPENING SECTION (LOCALIZED) -->
      <div class="glass-card" style="margin-bottom: 1.5rem;">
        <h3 class="card-title" style="margin-bottom: 0.75rem;">
          <span>📖</span>
          <span>${t.whatsHappening}</span>
        </h3>
        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-body); margin-bottom: 0;">
          ${localizedData.explanation || scan.explanation || 'Detailed agricultural explanation of the diagnosed crop pattern.'}
        </p>
      </div>

      <!-- 4. LIVE WEATHER IMPACT & SPRAY TIMING ADVISORY (STAGE 5) -->
      <div class="glass-card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <span class="card-title">
            <span>🌦️</span>
            <span>Live Weather Impact on Disease & Spraying</span>
          </span>
          <span class="badge ${isHealthy ? 'badge-low' : (weather && weather.current && weather.current.rainProbability >= 60) ? 'badge-high' : 'badge-mod'}">
            ${isHealthy ? '🌱 Optimal Conditions' : (weather && weather.current && weather.current.rainProbability >= 60) ? '🌧️ Delay Spray (Rain)' : '🚜 Good Spray Window'}
          </span>
        </div>

        <div style="background: ${isHealthy ? 'rgba(16, 185, 129, 0.12)' : 'var(--severity-mod-bg)'}; border: 1px solid ${isHealthy ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.35)'}; border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: ${isHealthy ? '#34D399' : '#FBBF24'}; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.35rem;">
            ${isHealthy ? '🌱 Optimal Growth Environment' : (weather && weather.current && weather.current.rainProbability >= 60) ? '🌧️ Rain Alert — Postpone Foliar Spraying' : '⚠️ Atmospheric Moisture Spore Alert'}
          </h4>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-white); margin-bottom: 0;">
            ${isHealthy 
              ? `Current weather in ${weather?.location || 'your farm'} (${weather?.current?.temp || 28}°C, ${weather?.current?.humidity || 75}% humidity) provides ideal conditions for vegetative vigor.`
              : (weather && weather.current && weather.current.rainProbability >= 60)
                ? `High rain chance (${weather.current.rainProbability}%) will wash off foliar treatments. Damp leaves accelerate fungal spore propagation. Postpone chemical sprays until dry window.`
                : `Relative humidity is ${weather?.current?.humidity || 75}%. Inspect lower leaves regularly and schedule protective bio-fungicide during early morning hours.`}
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem;">
          <div class="prevention-item">
            <div style="font-weight: 700; color: #38BDF8; font-size: 0.9rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>📍</span> <span>Atmospheric Context</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
              ${weather?.location || 'Active Farm'} • ${weather?.current?.temp || 28}°C • ${weather?.current?.humidity || 75}% Humidity
            </div>
          </div>

          <div class="prevention-item">
            <div style="font-weight: 700; color: #34D399; font-size: 0.9rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>🚜</span> <span>Recommended Spray Window</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
              ${(weather?.forecast && weather.forecast[0]) ? `${weather.forecast[0].day} (${weather.forecast[0].date}) — ${weather.forecast[0].sprayLabel}` : 'Early morning dry hours (Calm winds)'}
            </div>
          </div>
        </div>
      </div>

      <!-- 5. COMMON SYMPTOMS (LOCALIZED) -->
      <div class="glass-card" style="margin-bottom: 1.5rem;">
        <h3 class="card-title">
          <span>🔍</span>
          <span>${t.commonSymptoms}</span>
        </h3>
        <div class="symptoms-icon-grid">
          ${symptomsHtml}
        </div>
      </div>

      <!-- 5. ACTIONABLE RECOMMENDATIONS (LOCALIZED) -->
      <div class="glass-card" style="margin-bottom: 1.5rem;">
        <h3 class="card-title">
          <span>✅</span>
          <span>${t.whatShouldYouDo}</span>
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
          Follow these sequential steps to treat the infected crop and prevent spread to adjacent rows.
        </p>
        <div class="recommendations-list">
          ${recommendationsHtml}
        </div>
      </div>

      <!-- 6. PREVENTION & LONG TERM CARE (LOCALIZED) -->
      <div class="glass-card" style="margin-bottom: 2rem;">
        <h3 class="card-title">
          <span>🛡️</span>
          <span>${t.prevention}</span>
        </h3>
        <div class="prevention-grid">
          ${preventionHtml}
        </div>
      </div>

      <!-- 7. BOTTOM ACTION BUTTONS -->
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <button class="btn btn-primary btn-lg" id="btn-bottom-scan-another">
          <span>📷</span>
          <span>${t.scanAnother}</span>
        </button>
        <button class="btn btn-secondary btn-lg" id="btn-bottom-share">
          <span>📤</span>
          <span>${t.shareAdvisory}</span>
        </button>
      </div>

    </div>
  `;
}

export function attachResultEvents(container) {
  const scan = store.state.currentScan;
  const currentLang = store.state.language;
  const weather = store.state.weather;
  const t = store.t;
  const localizedData = getLocalizedCropData(scan, currentLang);

  // Scan another buttons
  const scanAnotherTop = container.querySelector('#btn-result-scan-another');
  const scanAnotherBottom = container.querySelector('#btn-bottom-scan-another');
  [scanAnotherTop, scanAnotherBottom].forEach(btn => {
    if (btn) btn.addEventListener('click', () => {
      ttsService.stop();
      store.setView('scanner');
    });
  });

  // Share button
  const shareBtn = container.querySelector('#btn-bottom-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: `Smart Crop Doctor — ${scan.crop} Advisory`,
          text: `${scan.crop} diagnosis: ${localizedData.diseaseDisplay}. ${localizedData.explanation}`,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(`${scan.crop} Advisory: ${localizedData.diseaseDisplay}. ${localizedData.explanation}`);
        window.showToast("📋 Advisory summary copied to clipboard!");
      }
    });
  }

  // Voice Controls Elements
  const ttsBtn = container.querySelector('#btn-toggle-tts');
  const stopBtn = container.querySelector('#btn-stop-tts');
  const replayBtn = container.querySelector('#btn-replay-tts');
  const ttsWaves = container.querySelector('#tts-visual-waves');
  const ttsBtnText = container.querySelector('#tts-btn-text');
  const ttsBtnIcon = container.querySelector('#tts-btn-icon');
  const statusSubtext = container.querySelector('#tts-status-subtext');

  // Dynamically generate complete farmer-friendly narrative in active language
  const fullNarrativeSpeech = generateAdvisorySpeech(scan, weather, currentLang);

  // Subscribe to TTS state changes
  ttsService.subscribe((state) => {
    const isPlaying = state.status === 'playing';
    const isPaused = state.status === 'paused';

    if (ttsWaves) ttsWaves.classList.toggle('playing', isPlaying);

    if (isPlaying) {
      if (ttsBtnText) ttsBtnText.textContent = t.pauseAudio || "⏸ Pause";
      if (ttsBtnIcon) ttsBtnIcon.textContent = "⏸";
      if (statusSubtext) statusSubtext.textContent = `Speaking full advisory in ${state.voiceInfo.label}...`;
    } else if (isPaused) {
      if (ttsBtnText) ttsBtnText.textContent = t.resumeAudio || "▶ Resume";
      if (ttsBtnIcon) ttsBtnIcon.textContent = "▶";
      if (statusSubtext) statusSubtext.textContent = "Audio advisory paused";
    } else {
      if (ttsBtnText) ttsBtnText.textContent = t.listenFullAdvisory || "🔊 Listen to Full Advisory";
      if (ttsBtnIcon) ttsBtnIcon.textContent = "▶";
      if (statusSubtext) {
        statusSubtext.textContent = state.voiceInfo.hasNativeVoice 
          ? `🎙️ ${state.voiceInfo.label} voice synthesizer active` 
          : `🎙️ Device speech synthesizer ready`;
      }
    }
  });

  // Play / Pause / Resume toggle
  if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
      const speed = store.state.settings.ttsSpeed || 1.0;
      ttsService.toggle(fullNarrativeSpeech, currentLang, speed);
    });
  }

  // Stop button
  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      ttsService.stop();
    });
  }

  // Replay button
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      const speed = store.state.settings.ttsSpeed || 1.0;
      ttsService.stop();
      ttsService.play(fullNarrativeSpeech, currentLang, speed);
    });
  }

  // Speed chips
  container.querySelectorAll('button[data-res-speed]').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const speed = parseFloat(e.currentTarget.getAttribute('data-res-speed'));
      store.updateSettings({ ttsSpeed: speed });
      
      // Update active chip state visually
      container.querySelectorAll('button[data-res-speed]').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');

      // If currently playing or was playing, re-play with new rate
      if (ttsService.status === 'playing') {
        ttsService.play(fullNarrativeSpeech, currentLang, speed);
      }
    });
  });
}
