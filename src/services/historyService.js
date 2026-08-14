// ==========================================================================
// SMART CROP DOCTOR — CROP SCAN HISTORY & TRACKING SERVICE
// Stage 2: Express Backend Integration (/api/history) + LocalStorage Sync
// ==========================================================================

const STORAGE_KEY = 'smart_crop_doctor_history';

// Default initial history records
const INITIAL_HISTORY = [
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
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    fieldLocation: "Plot A (North Ridge)"
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
    fieldLocation: "Plot B (Wetland)"
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
    fieldLocation: "Greenhouse Polyhouse"
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
    fieldLocation: "Plot A (North Ridge)"
  }
];

export const historyService = {
  /**
   * Fetch scan history from Express persistent database (/api/history)
   */
  async fetchHistoryFromServer() {
    try {
      const res = await fetch('/api/history');
      if (res.ok) {
        const payload = await res.json();
        if (payload && payload.success && Array.isArray(payload.data)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.data));
          return payload.data;
        }
      }
    } catch (e) {
      console.warn('Could not fetch server history, using local history cache:', e);
    }
    return this.getAllScans();
  },

  /**
   * Get all past crop scans from cache/storage
   * @returns {Array} List of scan objects
   */
  getAllScans() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HISTORY));
        return INITIAL_HISTORY;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn("Could not read localStorage history", e);
      return INITIAL_HISTORY;
    }
  },

  /**
   * Add a new scan to history and sync with server database
   * @param {Object} scanResult
   */
  addScan(scanResult) {
    try {
      const current = this.getAllScans();
      const newEntry = {
        scanId: scanResult.scanId || 'scan-' + Date.now(),
        crop: scanResult.crop,
        cropCode: (scanResult.cropCode || scanResult.crop || 'other').toLowerCase(),
        diseaseName: scanResult.diseaseName,
        diseaseDisplay: scanResult.diseaseDisplay || scanResult.diseaseName,
        confidence: scanResult.confidence,
        severity: scanResult.severity,
        severityScore: scanResult.severityScore || (scanResult.severity === 'low' ? 95 : scanResult.severity === 'moderate' ? 65 : 30),
        status: scanResult.status || (scanResult.severity === 'low' ? 'healthy' : 'needs_attention'),
        image: scanResult.image,
        date: scanResult.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        timestamp: scanResult.timestamp || Date.now(),
        fieldLocation: scanResult.fieldLocation || "Active Farm Plot",
        symptoms: scanResult.symptoms || [],
        recommendations: scanResult.recommendations || [],
        weather: scanResult.weather || null,
        advisory: scanResult.advisory || null
      };

      const updated = [newEntry, ...current.filter(s => s.scanId !== newEntry.scanId)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Asynchronously persist to backend database
      fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      }).catch(err => console.warn('Could not sync scan with backend database:', err));

      return updated;
    } catch (e) {
      console.warn("Could not write scan to history", e);
      return [];
    }
  },

  /**
   * Calculate overall farm crop health score (0-100)
   */
  calculateHealthScore() {
    const scans = this.getAllScans();
    if (!scans || scans.length === 0) return 82;

    const total = scans.reduce((acc, curr) => acc + (curr.severityScore || 75), 0);
    return Math.round(total / scans.length);
  }
};


