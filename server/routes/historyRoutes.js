// ==========================================================================
// SMART CROP DOCTOR — CROP SCAN HISTORY ROUTES
// Stage 6: Persistent Database CRUD Routes for Agricultural Health Timeline
// ==========================================================================

import express from 'express';
import { dbService } from '../services/dbService.js';

const router = express.Router();

/**
 * GET /api/history
 * Returns all historical crop scans and overall health statistics
 */
router.get('/history', (req, res) => {
  try {
    const scans = dbService.getAllScans();
    const stats = dbService.getStats();

    return res.status(200).json({
      success: true,
      data: scans,
      stats: stats
    });
  } catch (err) {
    console.error('❌ Error in GET /api/history:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve scan history from database',
      message: err.message
    });
  }
});

/**
 * POST /api/history
 * Saves a newly analyzed crop scan to the persistent database
 */
router.post('/history', (req, res) => {
  try {
    const scanPayload = req.body || {};
    const savedRecord = dbService.addScan(scanPayload);

    return res.status(201).json({
      success: true,
      data: savedRecord,
      message: 'Scan successfully saved to farm history'
    });
  } catch (err) {
    console.error('❌ Error in POST /api/history:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to save scan to database',
      message: err.message
    });
  }
});

/**
 * DELETE /api/history/:id
 * Removes a specific scan record from the database
 */
router.delete('/history/:id', (req, res) => {
  try {
    const scanId = req.params.id;
    const remaining = dbService.deleteScan(scanId);

    return res.status(200).json({
      success: true,
      data: remaining,
      message: `Scan ${scanId} deleted successfully`
    });
  } catch (err) {
    console.error('❌ Error in DELETE /api/history:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete scan',
      message: err.message
    });
  }
});

export default router;
