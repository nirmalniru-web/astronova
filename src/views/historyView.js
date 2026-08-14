// ==========================================================================
// SMART CROP DOCTOR — PAGE 6: CROP HISTORY & HEALTH TRACKING VIEW
// Features: Animated Health Progress SVG Trend Graph, Category Filter Pills,
// Search Bar, Interactive History Timeline with Modal Details
// ==========================================================================

import { store } from '../state.js';

let activeFilter = 'all'; // 'all' | 'healthy' | 'needs_attention' | 'high_risk'
let searchQuery = '';

export function renderHistoryView() {
  const t = store.t;
  const scans = store.state.history;

  // Filter scans
  const filteredScans = scans.filter(scan => {
    // Category filter
    if (activeFilter === 'healthy' && scan.status !== 'healthy' && scan.severity !== 'low') return false;
    if (activeFilter === 'needs_attention' && scan.status !== 'needs_attention') return false;
    if (activeFilter === 'high_risk' && scan.severity !== 'high') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCrop = (scan.crop || '').toLowerCase().includes(q);
      const matchDisease = (scan.diseaseDisplay || '').toLowerCase().includes(q);
      return matchCrop || matchDisease;
    }

    return true;
  });

  // Generate SVG Health Progress Trend Graph
  // Points: (x, y) coordinates from past scans
  const points = [
    { x: 30, y: 70, label: "Aug 02", score: 70 },
    { x: 120, y: 30, label: "Aug 08", score: 94 },
    { x: 210, y: 20, label: "Aug 11", score: 98 },
    { x: 300, y: 80, label: "Aug 14", score: 65 }
  ];

  const svgPathD = `M 30,70 L 120,30 L 210,20 L 300,80`;

  const timelineHtml = filteredScans.length > 0 ? filteredScans.map(scan => `
    <div class="scan-item-card" data-scan-id="${scan.scanId}">
      <div class="scan-item-left">
        <img src="${scan.image}" alt="${scan.crop}" class="scan-thumbnail" onerror="this.src='assets/images/tomato-blight.jpg'" />
        <div class="scan-item-info">
          <h4>${scan.crop} — <span style="color: var(--primary-300); font-weight: normal;">${scan.diseaseDisplay}</span></h4>
          <p>
            Confidence: <strong>${scan.confidence}%</strong> • ${scan.date} • ${scan.fieldLocation || 'Plot A'}
          </p>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span class="badge ${scan.severity === 'low' ? 'badge-low' : scan.severity === 'moderate' ? 'badge-mod' : 'badge-high'}">
          ${scan.severity.toUpperCase()}
        </span>
        <button class="btn btn-secondary btn-sm" style="min-height: 32px; padding: 0.35rem 0.65rem;">
          View
        </button>
      </div>
    </div>
  `).join('') : `
    <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
      <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-white);">No scans match your filter</p>
      <p style="font-size: 0.85rem;">Try adjusting the filter pills or search query.</p>
    </div>
  `;

  return `
    <div class="view-container history-view">
      
      <!-- 1. PAGE HEADER -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div class="hero-pill-badge">
            <span>📈</span>
            <span>Historical Health Tracking</span>
          </div>
          <h1 class="section-title" style="margin-bottom: 0.25rem;">${t.cropHistoryTitle}</h1>
          <p class="section-subtitle">Longitudinal timeline of crop pathology and health recoveries</p>
        </div>

        <button class="btn btn-primary btn-sm" id="btn-history-new-scan">
          <span>📷</span>
          <span>${t.startCropScan}</span>
        </button>
      </div>

      <!-- 2. ANIMATED HEALTH-PROGRESS GRAPH -->
      <div class="glass-card chart-container-card">
        <div class="card-header">
          <span class="card-title">
            <span>📊</span>
            <span>Farm Crop Health Progress</span>
          </span>
          <span class="badge badge-low">Average Score: 82/100</span>
        </div>

        <div class="svg-chart-wrapper">
          <svg viewBox="0 0 340 120" style="width: 100%; height: 100%; overflow: visible;">
            <defs>
              <linearGradient id="chart-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#10B981" stop-opacity="0.35" />
                <stop offset="100%" stop-color="#10B981" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Chart Horizontal Gridlines -->
            <line x1="20" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
            <line x1="20" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
            <line x1="20" y1="100" x2="320" y2="100" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />

            <!-- Area Fill -->
            <path d="${svgPathD} L 300,110 L 30,110 Z" fill="url(#chart-area-grad)" />

            <!-- Animated Trend Line -->
            <path d="${svgPathD}" fill="none" stroke="#34D399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

            <!-- Point Dots & Labels -->
            ${points.map(p => `
              <circle cx="${p.x}" cy="${p.y}" r="5" fill="#FFFFFF" stroke="#10B981" stroke-width="2" />
              <text x="${p.x}" y="${p.y - 10}" text-anchor="middle" fill="#34D399" font-size="10" font-weight="bold">${p.score}%</text>
              <text x="${p.x}" y="115" text-anchor="middle" fill="#8FB4A0" font-size="9">${p.label}</text>
            `).join('')}
          </svg>
        </div>
      </div>

      <!-- 3. SEARCH & FILTERS -->
      <div class="glass-card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
        <div class="history-filter-bar">
          
          <!-- Search Input -->
          <div style="flex: 1; min-width: 240px;">
            <input type="text" 
                   id="history-search-input" 
                   class="form-input" 
                   style="width: 100%;" 
                   placeholder="${t.searchPlaceholder}" 
                   value="${searchQuery}" />
          </div>

          <!-- Filter Pills -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="crop-chip ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
              ${t.filterAll}
            </button>
            <button class="crop-chip ${activeFilter === 'healthy' ? 'active' : ''}" data-filter="healthy">
              ${t.filterHealthy}
            </button>
            <button class="crop-chip ${activeFilter === 'needs_attention' ? 'active' : ''}" data-filter="needs_attention">
              ${t.filterNeedsAttention}
            </button>
            <button class="crop-chip ${activeFilter === 'high_risk' ? 'active' : ''}" data-filter="high_risk">
              ${t.filterHighRisk}
            </button>
          </div>

        </div>

        <!-- 4. TIMELINE LIST -->
        <div class="history-timeline">
          ${timelineHtml}
        </div>
      </div>

    </div>
  `;
}

export function attachHistoryEvents(container) {
  // New scan button
  const newScanBtn = container.querySelector('#btn-history-new-scan');
  if (newScanBtn) {
    newScanBtn.addEventListener('click', () => store.setView('scanner'));
  }

  // Search input
  const searchInput = container.querySelector('#history-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      store.notify();
    });
  }

  // Filter chips
  container.querySelectorAll('.crop-chip[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeFilter = e.currentTarget.getAttribute('data-filter');
      store.notify();
    });
  });

  // Clicking history item to inspect
  container.querySelectorAll('.scan-item-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const scanId = e.currentTarget.getAttribute('data-scan-id');
      const scan = store.state.history.find(s => s.scanId === scanId);
      if (scan) {
        store.setCurrentScan(scan);
        store.setView('result');
      }
    });
  });
}
