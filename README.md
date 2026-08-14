# 🌿 Smart Crop Doctor (स्मार्ट क्रॉप डॉक्टर)
> **Protect Every Crop. Grow With Confidence.**  
> *AI-Powered Multilingual Crop Pathology & Agro-Meteorological Intelligence Platform for Farmers.*

---

## 🌟 Overview
**Smart Crop Doctor** is a full-stack, AI-powered agricultural health assistant designed specifically for Indian farmers. By combining **Google Gemini Vision AI** leaf diagnostics with **Real-Time Agro-Weather Intelligence**, the platform not only identifies crop diseases early from photo uploads but also calculates **how current microclimates impact spraying and treatment efficacy** — narrated in **8 regional Indian languages** with speech synthesis.

---

## 🚀 Key Features

* 🔬 **Instant AI Leaf Pathology**: Upload or capture crop leaf photos to detect diseases (Early Blight, Rice Blast, Leaf Curl, etc.) with confidence metrics and 3-tier severity analysis.
* 🌦️ **Agro-Meteorological Intel**: Real-time localized temperature, relative humidity, rain probability, fungal spore proliferation risk, and 5-day agricultural spray suitability forecasts (`Good` / `Caution` / `Avoid`).
* 🌾 **Combined Disease + Weather Advisory**: Translates complex plant pathology into actionable, sequential steps tailored to the farmer's immediate weather window.
* 🌐 **8 Indian Regional Languages**: Seamless instant translation across English, Kannada (ಕನ್ನಡ), Telugu (తెలుగు), Tamil (தமிழ்), Hindi (हिन्दी), Malayalam (മലയാളം), Marathi (मराठी), and Bengali (বাংলা).
* 🔊 **Farmer-Friendly Voice Assistant**: Natural, regional accent voice narration with Play, Pause, Resume, Stop, Replay, and 3-speed rate controls (0.8x, 1.0x, 1.2x).
* 📈 **Longitudinal Health History**: Real-time persistent database tracking crop recovery timeline with SVG health trend graphs and farm health scores.
* 🌙 **Outdoor Accessibility**: High-contrast outdoor sunlight viewing mode and 3-tier typography scaler for field accessibility.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FARMER INTERFACE                       │
│  • Pure Vanilla JS + CSS (Zero-build Native ES Modules)     │
│  • 8 Regional Languages & Web Speech API Voice Synthesizer  │
│  • Responsive Camera Capture & 1-Click Sample Leaves        │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON REST API (/api/*)
┌──────────────────────────────▼──────────────────────────────┐
│                    EXPRESS BACKEND SERVER                   │
│  server/server.js (Node.js • Port 3000)                     │
│  ├── /api/health           (Health & Uptime Monitoring)     │
│  ├── /api/analyze-crop     (Google Gemini Vision AI Engine) │
│  ├── /api/weather          (Live Agro-Weather Grid)         │
│  ├── /api/advisory         (Disease + Weather Correlator)   │
│  └── /api/history          (Persistent Crop Scan Database)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│     GOOGLE GEMINI VISION     │    │   REAL AGRO-WEATHER GRID     │
│  • gemini-2.5-flash          │    │  • Open-Meteo Live Grid      │
│  • Structured Pathology JSON │    │  • OpenWeatherMap API        │
│  • Symptoms & Remedies       │    │  • Fungal Risk Calculation   │
└──────────────────────────────┘    └──────────────────────────────┘
```

---

## 📦 Quick Start Guide (Beginner Friendly)

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (Version 18.0 or higher)

### 2. Installation
Clone or open the project folder in your terminal and install dependencies:
```bash
npm install
```

### 3. Environment Setup (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Note: Smart Crop Doctor works immediately out of the box with zero configuration! Real-time live weather and diagnostic databases are active by default).*

To connect your own **Google Gemini Vision API Key**:
1. Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Add your key into `.env`:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   ```

### 4. Start the Application
Run the local server:
```bash
npm start
```
Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## 🔌 API Reference

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/health` | `GET` | Server status, version, uptime, and health diagnostics |
| `/api/analyze-crop` | `POST` | Analyzes base64 leaf photo via Google Gemini Vision API |
| `/api/weather` | `GET` | Fetches real-time agro-weather, fungal risk, and 5-day spray forecast |
| `/api/advisory` | `POST` | Combines disease pathology with live weather to generate spray advice |
| `/api/history` | `GET` | Retrieves persistent crop scan history and overall farm health score |
| `/api/history` | `POST` | Saves a newly analyzed crop scan to the persistent database |
| `/api/history/:id` | `DELETE` | Removes a specific historical scan record from the database |

---

## 🚢 Cloud Deployment Guide

### Deploy on Render / Railway / Heroku
1. Push your repository to GitHub.
2. In your cloud dashboard (e.g. Render/Railway):
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
   * **Environment Variables:** Add `GEMINI_API_KEY` and `NODE_ENV=production`.
3. The server automatically listens on `process.env.PORT` provided by the cloud host.

### Deploy with Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🎯 Hackathon Demo Script & Walkthrough

1. **Language Inclusivity:** Start on the Home screen and switch to **Kannada (ಕನ್ನಡ)** or **Hindi (हिन्दी)** to showcase instant multilingual localization.
2. **AI Leaf Diagnosis:** Go to **Scan Crop** ➔ Select a leaf photo (e.g. Tomato or Rice) ➔ Click **Analyze Crop Now**. Show the cinematic scanning HUD.
3. **Voice Narration & Weather Timing:** On the **Disease Result** page, highlight the **Live Weather Impact Card** (*"Rain Alert — Postpone Spraying"*) and press **🔊 Listen to Full Advisory** to hear the voice assistant synthesize the custom advisory.
4. **Agro-Weather Dashboard:** Navigate to **Weather** to show live real-time temperatures, humidity, and 5-day spray suitability forecasts.
5. **Crop Health Tracking:** Navigate to **History** to show persistent database records, SVG trend line charts, and overall farm health recovery scoring.

---

## 📄 License
This project is licensed under the **MIT License** — free and open for farmers and agricultural communities worldwide.
