// ==========================================================================
// SMART CROP DOCTOR — AGRO-WEATHER ROUTES
// Stage 4: Real-time Weather API Integration
// ==========================================================================

import express from 'express';
import { getLiveWeather } from '../services/weatherApiService.js';

const router = express.Router();

/**
 * GET /api/weather?location=Pune
 * Returns real-time localized agricultural weather metrics and disease risk calculation
 */
router.get('/weather', async (req, res) => {
  try {
    const location = req.query.location || 'Pune, Maharashtra';

    const weatherPayload = await getLiveWeather(location);

    return res.status(200).json({
      success: true,
      data: weatherPayload
    });
  } catch (err) {
    console.error('❌ Error in /api/weather:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve live weather data',
      message: err.message
    });
  }
});

export default router;

