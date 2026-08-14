// ==========================================================================
// SMART CROP DOCTOR — EXPRESS BACKEND SERVER
// Stage 2: Express Server with AI & Weather REST API Routes
// ==========================================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Route Handlers
import aiRoutes from './routes/aiRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Request Logger (Development)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  }
  next();
});

// ==========================================================================
// 1. BACKEND API ROUTES
// ==========================================================================

// Health Check Endpoint (Stage 1)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    app: 'Smart Crop Doctor Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()) + ' seconds',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount AI Analysis, Weather, and History Routes
app.use('/api', aiRoutes);
app.use('/api', weatherRoutes);
app.use('/api', historyRoutes);

// ==========================================================================
// 2. FRONTEND STATIC FILE SERVING
// ==========================================================================
app.use(express.static(ROOT_DIR, {
  extensions: ['html', 'htm']
}));

// SPA Fallback for any client-side routes (excluding /api)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌿 Smart Crop Doctor Server running at: http://localhost:${PORT}`);
  console.log(`🩺 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`🔬 AI Analysis route at: POST http://localhost:${PORT}/api/analyze-crop`);
  console.log(`🌦️ Weather route at: GET http://localhost:${PORT}/api/weather`);
  console.log(`📦 History database route at: GET/POST http://localhost:${PORT}/api/history`);
});

export default app;

