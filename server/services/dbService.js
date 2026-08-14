// ==========================================================================
// SMART CROP DOCTOR — PERSISTENT CROP SCAN DATABASE SERVICE
// Stage 6: Persistent JSON Database Engine for Crop Pathology & Weather Records
// ==========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'crop_history.json');

const INITIAL_BASELINE_HISTORY = [
  {
    scanId: "hist-001",
    crop: "Tomato",
    cropCode: "tomato",
    diseaseName: "Early Blight (Alternaria solani)",
    diseaseDisplay: "Possible Early Blight",
    confidence: 92,
    severity: "moderate",
    severityScore: 65,
    status: "needs_attention",
    image: "assets/images/tomato-blight.jpg",
    date: "Aug 14, 2026",
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    fieldLocation: "Plot A (North Ridge)",
    weather: { temp: 27, humidity: 86, condition: "Humid Spells" },
    advisory: {
      alertTitle: "🌧️ Rain Alert — Postpone Foliar Spraying",
      sprayAction: "Hold foliar spraying today. Safe window: Saturday morning."
    }
  },
  {
    scanId: "hist-002",
    crop: "Rice / Paddy",
    cropCode: "rice",
    diseaseName: "Healthy Crop (No Disease Detected)",
    diseaseDisplay: "Healthy Plant",
    confidence: 98,
    severity: "low",
    severityScore: 98,
    status: "healthy",
    image: "assets/images/hero-crop.jpg",
    date: "Aug 11, 2026",
    timestamp: Date.now() - 1000 * 60 * 60 * 72,
    fieldLocation: "Plot B (Wetland)",
    weather: { temp: 28, humidity: 65, condition: "Mainly Clear" },
    advisory: {
      alertTitle: "🌱 Optimal Growth Conditions",
      sprayAction: "No corrective spray required. Continue routine care."
    }
  },
  {
    scanId: "hist-003",
    crop: "Chilli",
    cropCode: "chilli",
    diseaseName: "Healthy Crop",
    diseaseDisplay: "Healthy Plant",
    confidence: 94,
    severity: "low",
    severityScore: 92,
    status: "healthy",
    image: "assets/images/hero-crop.jpg",
    date: "Aug 08, 2026",
    timestamp: Date.now() - 1000 * 60 * 60 * 144,
    fieldLocation: "Greenhouse Polyhouse",
    weather: { temp: 30, humidity: 60, condition: "Sunny" },
    advisory: {
      alertTitle: "🌱 Healthy Vegetative Phase",
      sprayAction: "Maintain regular drip irrigation."
    }
  },
  {
    scanId: "hist-004",
    crop: "Tomato",
    cropCode: "tomato",
    diseaseName: "Mild Leaf Spot",
    diseaseDisplay: "Possible Septoria Leaf Spot",
    confidence: 86,
    severity: "moderate",
    severityScore: 70,
    status: "needs_attention",
    image: "assets/images/tomato-blight.jpg",
    date: "Aug 02, 2026",
    timestamp: Date.now() - 1000 * 60 * 60 * 288,
    fieldLocation: "Plot A (North Ridge)",
    weather: { temp: 26, humidity: 82, condition: "Drizzle" },
    advisory: {
      alertTitle: "⚠️ Moisture Spore Alert",
      sprayAction: "Apply preventive copper fungicide spray."
    }
  }
];

class CropDatabase {
  constructor() {
    this.ensureDbExists();
  }

  ensureDbExists() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_BASELINE_HISTORY, null, 2), 'utf8');
        console.log('📦 [Database Service] Initialized persistent crop_history.json database.');
      }
    } catch (err) {
      console.error('❌ [Database Service] Error initializing database file:', err.message);
    }
  }

  readDb() {
    try {
      this.ensureDbExists();
      const content = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(content || '[]');
    } catch (err) {
      console.warn('⚠️ [Database Service] Read error, returning baseline:', err.message);
      return INITIAL_BASELINE_HISTORY;
    }
  }

  writeDb(data) {
    try {
      this.ensureDbExists();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('❌ [Database Service] Write error:', err.message);
      return false;
    }
  }

  getAllScans() {
    const scans = this.readDb();
    return scans.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }

  getScanById(id) {
    const scans = this.readDb();
    return scans.find(s => s.scanId === id) || null;
  }

  addScan(scanPayload) {
    const scans = this.readDb();

    const newRecord = {
      scanId: scanPayload.scanId || 'scan-' + Date.now(),
      crop: scanPayload.crop || 'Crop',
      cropCode: (scanPayload.cropCode || scanPayload.crop || 'other').toLowerCase(),
      diseaseName: scanPayload.diseaseName || 'Analyzed Crop',
      diseaseDisplay: scanPayload.diseaseDisplay || scanPayload.diseaseName || 'Possible Crop Condition',
      confidence: scanPayload.confidence || 90,
      severity: scanPayload.severity || 'moderate',
      severityScore: scanPayload.severityScore || (scanPayload.severity === 'low' ? 95 : scanPayload.severity === 'moderate' ? 65 : 30),
      status: scanPayload.status || (scanPayload.severity === 'low' ? 'healthy' : 'needs_attention'),
      image: scanPayload.image || 'assets/images/tomato-blight.jpg',
      date: scanPayload.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: scanPayload.timestamp || Date.now(),
      fieldLocation: scanPayload.fieldLocation || 'Active Farm Plot',
      symptoms: scanPayload.symptoms || [],
      recommendations: scanPayload.recommendations || [],
      weather: scanPayload.weather || { temp: 28, humidity: 75, condition: 'Favorable' },
      advisory: scanPayload.advisory || { alertTitle: 'Advisory Saved', sprayAction: 'Follow standard application protocol' },
      disclaimer: scanPayload.disclaimer || 'AI-assisted preliminary diagnostic record.'
    };

    // Filter out duplicates if same scanId already exists
    const updated = [newRecord, ...scans.filter(s => s.scanId !== newRecord.scanId)];
    this.writeDb(updated);

    console.log(`📦 [Database Service] Saved scan record ${newRecord.scanId} for ${newRecord.crop} (${newRecord.diseaseDisplay})`);
    return newRecord;
  }

  deleteScan(scanId) {
    const scans = this.readDb();
    const filtered = scans.filter(s => s.scanId !== scanId);
    this.writeDb(filtered);
    return filtered;
  }

  getStats() {
    const scans = this.getAllScans();
    if (!scans.length) return { total: 0, healthScore: 85, healthyCount: 0, diseasedCount: 0 };

    const totalScore = scans.reduce((acc, curr) => acc + (curr.severityScore || 75), 0);
    const healthyCount = scans.filter(s => s.status === 'healthy' || s.severity === 'low').length;

    return {
      total: scans.length,
      healthScore: Math.round(totalScore / scans.length),
      healthyCount: healthyCount,
      diseasedCount: scans.length - healthyCount
    };
  }
}

export const dbService = new CropDatabase();
