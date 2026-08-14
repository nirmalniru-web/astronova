// ==========================================================================
// SMART CROP DOCTOR — AI DISEASE DETECTION SERVICE (FRONTEND BRIDGE)
// Stage 2: Communicates with Express Backend /api/analyze-crop with offline fallback
// ==========================================================================

import { sampleCrops } from './sampleData.js';

export const aiService = {
  /**
   * Analyze an uploaded image / crop selection
   * @param {Object} options - { imageSrc, cropType, onProgress }
   * @returns {Promise<Object>} Analyzed Disease Profile
   */
  async analyzeCrop({ imageSrc, cropType = 'tomato', onProgress = null }) {
    // 1. Multi-stage visual scanning simulation (keeps the cinematic animation responsive)
    const stages = [
      { step: 1, textKey: 'scanningStep1', delay: 400 },
      { step: 2, textKey: 'scanningStep2', delay: 650 },
      { step: 3, textKey: 'scanningStep3', delay: 650 },
      { step: 4, textKey: 'scanningStep4', delay: 500 }
    ];

    for (const stage of stages) {
      if (typeof onProgress === 'function') {
        onProgress(stage);
      }
      await new Promise(resolve => setTimeout(resolve, stage.delay));
    }

    // 2. Fetch diagnosis from Express backend API
    try {
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageSrc,
          cropType
        })
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
      throw new Error(`Server returned status ${response.status}`);
    } catch (err) {
      console.warn('Backend API request failed or offline, using fallback diagnostic profile:', err.message);
      
      // Fallback to local profile matching
      const normalized = (cropType || '').toLowerCase();
      let matchedProfile = sampleCrops.find(c => 
        c.cropCode.toLowerCase() === normalized || 
        c.crop.toLowerCase().includes(normalized)
      ) || sampleCrops[0];

      const fallbackResult = JSON.parse(JSON.stringify(matchedProfile));
      if (imageSrc && imageSrc.startsWith('data:image')) {
        fallbackResult.image = imageSrc;
      }
      fallbackResult.scanId = 'scan-' + Date.now();
      fallbackResult.analyzedAt = new Date().toISOString();
      return fallbackResult;
    }
  },

  /**
   * Get all available demo sample leaves
   */
  getSampleLeaves() {
    return sampleCrops;
  }
};
