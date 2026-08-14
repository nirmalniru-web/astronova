// ==========================================================================
// SMART CROP DOCTOR — AGRO-WEATHER & DISEASE RISK SERVICE (FRONTEND BRIDGE)
// Stage 2: Communicates with Express Backend /api/weather with offline fallback
// ==========================================================================

export const weatherService = {
  /**
   * Fetch current agro-weather and risk forecast from backend API
   * @param {string} location - District / coordinates
   * @returns {Promise<Object>} Weather payload
   */
  async getCurrentWeather(location = "Pune, Maharashtra") {
    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
      throw new Error(`Weather API returned status ${response.status}`);
    } catch (err) {
      console.warn('Backend Weather API failed, using fallback agro-weather payload:', err.message);
      
      // Fallback agro-weather payload
      return {
        location: location,
        updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        current: {
          temp: 28,
          tempUnit: "°C",
          condition: "Partly Cloudy with Humid Spells",
          icon: "⛅",
          humidity: 84,
          rainProbability: 60,
          windSpeed: 14,
          windDirection: "SW",
          uvIndex: 6,
          soilMoisture: "Adequate (72%)",
          dewPoint: "23°C"
        },
        diseaseRisk: {
          level: "moderate",
          levelLabel: "Moderate Risk",
          score: 68,
          summary: "High humidity (84%) and 60% expected rainfall create favorable conditions for early fungal and blight spore proliferation.",
          actionAdvice: "Avoid overhead watering; schedule protective bio-fungicide spray before evening showers; inspect lower leaves.",
          fungalRisk: "Elevated (Early Blight / Blast)",
          pestRisk: "Moderate (Whitefly / Leafhopper)"
        },
        forecast: [
          { day: "Today", date: "Aug 14", tempHigh: 29, tempLow: 22, rainChance: 60, humidity: 84, icon: "🌦️", sprayStatus: "caution", sprayLabel: "Exercise Caution" },
          { day: "Tomorrow", date: "Aug 15", tempHigh: 27, tempLow: 21, rainChance: 85, humidity: 90, icon: "🌧️", sprayStatus: "avoid", sprayLabel: "Avoid Spraying (Rain)" },
          { day: "Saturday", date: "Aug 16", tempHigh: 28, tempLow: 22, rainChance: 45, humidity: 78, icon: "⛅", sprayStatus: "good", sprayLabel: "Good for Spraying" },
          { day: "Sunday", date: "Aug 17", tempHigh: 30, tempLow: 23, rainChance: 20, humidity: 68, icon: "🌤️", sprayStatus: "good", sprayLabel: "Good for Spraying" },
          { day: "Monday", date: "Aug 18", tempHigh: 31, tempLow: 24, rainChance: 15, humidity: 62, icon: "☀️", sprayStatus: "good", sprayLabel: "Good for Spraying" }
        ]
      };
    }
  }
};
