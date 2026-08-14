// ==========================================================================
// SMART CROP DOCTOR — AI CROP ANALYSIS ROUTES
// Stage 3: Google Gemini Vision AI Integration
// ==========================================================================

import express from 'express';
import { analyzeCropWithGemini } from '../services/geminiService.js';
import { generateCombinedAdvisory } from '../services/advisoryService.js';

const router = express.Router();

/**
 * POST /api/analyze-crop
 * Analyzes uploaded crop leaf image using Google Gemini Vision API
 */
router.post('/analyze-crop', async (req, res) => {
  try {
    const { imageSrc, cropType = 'tomato' } = req.body || {};

    // Analyze leaf image with Google Gemini Vision
    const result = await analyzeCropWithGemini(imageSrc, cropType);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('❌ Error in /api/analyze-crop:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to analyze crop image',
      message: err.message
    });
  }
});

/**
 * POST /api/advisory
 * Combines disease diagnosis and live weather to produce farmer advisory
 */
router.post('/advisory', (req, res) => {
  try {
    const { diseaseData, weatherData } = req.body || {};
    const advisory = generateCombinedAdvisory(diseaseData, weatherData);
    return res.status(200).json({
      success: true,
      data: advisory
    });
  } catch (err) {
    console.error('❌ Error in /api/advisory:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate combined advisory',
      message: err.message
    });
  }
});

/**
 * GET /api/sample-crops
 * Returns pre-configured diagnostic profiles for instant testing
 */
router.get('/sample-crops', (req, res) => {
  return res.status(200).json({
    success: true,
    data: sampleCrops
  });
});

export default router;
