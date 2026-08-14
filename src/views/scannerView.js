// ==========================================================================
// SMART CROP DOCTOR — PAGE 3: CROP SCANNER VIEW (CORE FEATURE)
// Features: Drag & Drop, File Picker, Camera Capture, 1-Click Sample Leaves,
// Crop Selector, Multi-stage Cinematic Scanning Overlay
// ==========================================================================

import { store } from '../state.js';
import { aiService } from '../services/aiService.js';
import { sampleCrops } from '../services/sampleData.js';

let selectedImage = 'assets/images/tomato-blight.jpg';
let selectedCrop = 'tomato';
let isScanning = false;

export function renderScannerView() {
  const t = store.t;
  const sampleLeaves = aiService.getSampleLeaves();

  // Crop selector options
  const cropList = [
    { id: 'tomato', name: 'Tomato', icon: '🍅' },
    { id: 'rice', name: 'Rice', icon: '🌾' },
    { id: 'chilli', name: 'Chilli', icon: '🌶️' },
    { id: 'potato', name: 'Potato', icon: '🥔' },
    { id: 'maize', name: 'Maize', icon: '🌽' },
    { id: 'other', name: 'Other', icon: '🌱' }
  ];

  const cropChipsHtml = cropList.map(c => `
    <button class="crop-chip ${c.id === selectedCrop ? 'active' : ''}" data-crop-id="${c.id}">
      <span>${c.icon}</span>
      <span>${c.name}</span>
    </button>
  `).join('');

  const sampleLeavesHtml = sampleLeaves.map(s => `
    <div class="sample-leaf-chip ${s.cropCode === selectedCrop ? 'active' : ''}" 
         data-sample-id="${s.id}" 
         data-sample-crop="${s.cropCode}"
         data-sample-img="${s.image}">
      <img src="${s.image}" alt="${s.crop}" class="sample-leaf-thumb" onerror="this.src='assets/images/tomato-blight.jpg'" />
      <span class="sample-leaf-name">${s.crop}</span>
      <span class="sample-leaf-status">${s.status === 'healthy' ? 'Healthy' : 'Diseased'}</span>
    </div>
  `).join('');

  return `
    <div class="view-container scanner-view">
      
      <!-- 1. HEADER -->
      <div class="scanner-page-header">
        <div class="hero-pill-badge">
          <span>📷</span>
          <span>AI Vision Diagnostics</span>
        </div>
        <h1 class="section-title">${t.scannerTitle}</h1>
        <p class="section-subtitle">${t.scannerSubtitle}</p>
      </div>

      <div class="container-narrow">

        <!-- 2. SCANNING PREVIEW / SCANNER VIEWPORT -->
        <div class="glass-card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
          
          <div class="scanner-viewport" id="scanner-viewport-box">
            <img src="${selectedImage}" alt="Selected leaf preview" class="scanner-image-preview" id="preview-img" onerror="this.src='assets/images/tomato-blight.jpg'" />
            
            <!-- Cinematic Scanning Overlays (Active when isScanning is true) -->
            <div class="scanner-laser-line" id="scanner-laser" style="display: ${isScanning ? 'block' : 'none'};"></div>
            <div class="scanner-grid-overlay" id="scanner-grid" style="display: ${isScanning ? 'block' : 'none'};"></div>
            <div class="scanner-reticle" id="scanner-reticle" style="display: ${isScanning ? 'block' : 'none'}; top: calc(50% - 70px); left: calc(50% - 70px);"></div>
            
            <div class="scanner-corner corner-tl"></div>
            <div class="scanner-corner corner-tr"></div>
            <div class="scanner-corner corner-bl"></div>
            <div class="scanner-corner corner-br"></div>
          </div>

          <!-- Scanning Progress Stage Card -->
          <div class="scanning-status-card" id="scanning-progress-box" style="display: ${isScanning ? 'block' : 'none'};">
            <div style="font-size: 1.1rem; font-weight: 700; color: #34D399; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <span class="pulse-soft">⚡</span>
              <span id="scanning-stage-text">${t.scanningStep1}</span>
            </div>

            <div class="scanning-steps-list">
              <div class="scanning-step-item active" id="step-ind-1">
                <span class="step-dot"></span>
                <span>${t.scanningStep1}</span>
              </div>
              <div class="scanning-step-item" id="step-ind-2">
                <span class="step-dot"></span>
                <span>${t.scanningStep2}</span>
              </div>
              <div class="scanning-step-item" id="step-ind-3">
                <span class="step-dot"></span>
                <span>${t.scanningStep3}</span>
              </div>
              <div class="scanning-step-item" id="step-ind-4">
                <span class="step-dot"></span>
                <span>${t.scanningStep4}</span>
              </div>
            </div>
          </div>

          <!-- UPLOAD DROPZONE & CONTROLS -->
          <div id="upload-controls-section" style="display: ${isScanning ? 'none' : 'block'}; margin-top: 1.5rem;">
            
            <div class="upload-dropzone" id="dropzone-area">
              <div class="upload-icon-circle">📸</div>
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-white); margin-bottom: 0.25rem;">
                  ${t.dragDropText}
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0;">
                  Supported: JPG, PNG, WEBP • Max 10MB
                </p>
              </div>
              
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
                <label class="btn btn-primary btn-sm" style="cursor: pointer;">
                  <span>📂</span>
                  <span>${t.clickToUpload}</span>
                  <input type="file" id="file-input" accept="image/*" style="display: none;" />
                </label>

                <label class="btn btn-secondary btn-sm" style="cursor: pointer;">
                  <span>📷</span>
                  <span>${t.takePhoto}</span>
                  <input type="file" id="camera-input" accept="image/*" capture="environment" style="display: none;" />
                </label>
              </div>
            </div>

            <!-- 1-CLICK SAMPLE LEAVES TESTER -->
            <div class="sample-leaves-section">
              <div class="sample-leaves-title">
                <span>⚡</span>
                <span>${t.sampleLeavesTitle}</span>
              </div>
              <div class="sample-leaves-grid">
                ${sampleLeavesHtml}
              </div>
            </div>

            <!-- CROP SELECTOR -->
            <div class="crop-selector-group">
              <label class="form-label" style="font-size: 1rem;">${t.selectCropPrompt}</label>
              <div class="crop-chips-list">
                ${cropChipsHtml}
              </div>
            </div>

            <!-- ANALYZE ACTION BUTTON -->
            <button class="btn btn-primary btn-lg" id="btn-analyze-crop" style="width: 100%;">
              <span>🔬</span>
              <span>${t.analyzeCropBtn}</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  `;
}

export function attachScannerEvents(container) {
  const fileInput = container.querySelector('#file-input');
  const cameraInput = container.querySelector('#camera-input');
  const previewImg = container.querySelector('#preview-img');
  const dropzoneArea = container.querySelector('#dropzone-area');
  const analyzeBtn = container.querySelector('#btn-analyze-crop');

  // Handle file selection
  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage = e.target.result;
      if (previewImg) previewImg.src = selectedImage;
    };
    reader.readAsDataURL(file);
  };

  if (fileInput) fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
  if (cameraInput) cameraInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

  // Drag and drop handlers
  if (dropzoneArea) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzoneArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzoneArea.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzoneArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzoneArea.classList.remove('drag-over');
      });
    });

    dropzoneArea.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
  }

  // 1-Click sample leaf selection
  container.querySelectorAll('.sample-leaf-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const sampleId = e.currentTarget.getAttribute('data-sample-id');
      const sampleCrop = e.currentTarget.getAttribute('data-sample-crop');
      const sampleImg = e.currentTarget.getAttribute('data-sample-img');

      selectedCrop = sampleCrop;
      selectedImage = sampleImg;

      // Update UI preview
      if (previewImg) previewImg.src = selectedImage;

      // Update active chip classes
      container.querySelectorAll('.sample-leaf-chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');

      // Update crop selector button
      container.querySelectorAll('.crop-chip').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-crop-id') === selectedCrop);
      });
    });
  });

  // Crop selector chips
  container.querySelectorAll('.crop-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      selectedCrop = e.currentTarget.getAttribute('data-crop-id');
      container.querySelectorAll('.crop-chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // Analyze button click -> Trigger Cinematic Scanning
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
      isScanning = true;

      // Show scanning overlays
      const laser = container.querySelector('#scanner-laser');
      const grid = container.querySelector('#scanner-grid');
      const reticle = container.querySelector('#scanner-reticle');
      const progressBox = container.querySelector('#scanning-progress-box');
      const controlsSection = container.querySelector('#upload-controls-section');
      const stageText = container.querySelector('#scanning-stage-text');

      if (laser) laser.style.display = 'block';
      if (grid) grid.style.display = 'block';
      if (reticle) reticle.style.display = 'block';
      if (progressBox) progressBox.style.display = 'block';
      if (controlsSection) controlsSection.style.display = 'none';

      // Scroll smoothly to top of scanner
      container.querySelector('#scanner-viewport-box').scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Run AI service with multi-stage callback
      const result = await aiService.analyzeCrop({
        imageSrc: selectedImage,
        cropType: selectedCrop,
        onProgress: (stage) => {
          if (stageText) {
            stageText.textContent = store.t[stage.textKey] || 'Analyzing...';
          }
          for (let i = 1; i <= 4; i++) {
            const ind = container.querySelector(`#step-ind-${i}`);
            if (ind) {
              if (i === stage.step) {
                ind.className = 'scanning-step-item active';
              } else if (i < stage.step) {
                ind.className = 'scanning-step-item done';
              } else {
                ind.className = 'scanning-step-item';
              }
            }
          }
        }
      });

      // Save to history & state
      store.addScanToHistory(result);
      store.setCurrentScan(result);
      isScanning = false;

      // Transition to Disease Result View
      setTimeout(() => {
        store.setView('result');
      }, 400);
    });
  }
}
