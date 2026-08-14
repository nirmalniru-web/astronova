// ==========================================================================
// SMART CROP DOCTOR — DISEASE + WEATHER RISK ADVISORY ENGINE
// Stage 5: Combines AI Pathology Diagnosis with Live Agro-Weather Forecast
// ==========================================================================

/**
 * Generates a holistic, farmer-friendly advisory combining crop disease pathology with live weather
 * @param {Object} diseaseData - AI diagnosis payload
 * @param {Object} weatherData - Live agro-weather metrics
 * @returns {Object} Combined agro-meteorological advisory
 */
export function generateCombinedAdvisory(diseaseData, weatherData) {
  const isHealthy = diseaseData?.status === 'healthy' || diseaseData?.severity === 'low';
  const diseaseName = diseaseData?.diseaseDisplay || diseaseData?.diseaseName || 'Crop';
  const severity = diseaseData?.severity || 'moderate';

  const current = weatherData?.current || { temp: 28, humidity: 75, rainProbability: 50, windSpeed: 12 };
  const forecast = weatherData?.forecast || [];

  const temp = current.temp || 28;
  const humidity = current.humidity || 75;
  const rainProb = current.rainProbability || 50;
  const windSpeed = current.windSpeed || 12;

  // Find best spray window from 5-day forecast
  let bestSprayDay = forecast.find(f => f.sprayStatus === 'good') || 
                     forecast.find(f => f.sprayStatus === 'caution') || 
                     { day: 'Morning Window', date: 'Next dry spell', sprayLabel: 'Dry window' };

  let alertLevel = 'info'; // 'danger' | 'warning' | 'info' | 'success'
  let alertTitle = '';
  let impactSummary = '';
  let sprayAction = '';
  let irrigationAction = '';

  if (isHealthy) {
    alertLevel = 'success';
    alertTitle = '🌱 Optimal Growth Conditions';
    impactSummary = `Your crop is healthy! Current atmospheric conditions (${temp}°C, ${humidity}% humidity) support robust photosynthesis and vegetative vigor.`;
    sprayAction = 'No corrective fungicide spray required. Continue regular bio-fertilizer schedule.';
    irrigationAction = rainProb >= 60 ? 'Natural rainfall expected; pause scheduled irrigation.' : 'Maintain regular root irrigation schedule.';
  } else {
    // Diseased crop
    if (rainProb >= 60) {
      alertLevel = 'warning';
      alertTitle = '🌧️ Rain Alert — Postpone Foliar Spraying';
      impactSummary = `High rain chance (${rainProb}%) will wash off foliar treatments before absorption. Elevated moisture will accelerate fungal spore spread for ${diseaseName}.`;
      sprayAction = `Hold foliar spraying today. Best upcoming application window: ${bestSprayDay.day} (${bestSprayDay.date}) when rain clears.`;
      irrigationAction = 'Clear drainage furrows immediately to prevent damp soil stagnation around root zones.';
    } else if (humidity >= 80) {
      alertLevel = 'warning';
      alertTitle = '⚠️ High Humidity Spore Spreading Window';
      impactSummary = `Elevated relative humidity (${humidity}%) creates a microclimate conducive to rapid lesion enlargement for ${diseaseName}.`;
      sprayAction = `Apply protective bio-fungicide during early morning hours (${bestSprayDay.day} recommended).`;
      irrigationAction = 'Strictly avoid evening overhead sprinkler watering to ensure leaves stay dry before nightfall.';
    } else if (temp >= 33) {
      alertLevel = 'caution';
      alertTitle = '☀️ High Heat & Moisture Stress';
      impactSummary = `Warm temperatures (${temp}°C) increase evapotranspiration stress on affected plants.`;
      sprayAction = 'Spray only in early morning (before 8:30 AM) or late evening to prevent chemical leaf burn.';
      irrigationAction = 'Apply light mulching to retain soil moisture and prevent root heat stress.';
    } else {
      alertLevel = 'info';
      alertTitle = '🚜 Favorable Treatment Window';
      impactSummary = `Moderate humidity (${humidity}%) and low rain chance (${rainProb}%) create an ideal window to treat ${diseaseName}.`;
      sprayAction = `Proceed with recommended treatment: ${diseaseData?.recommendations?.[0]?.title || 'Targeted bio-fungicide spray'}.`;
      irrigationAction = 'Water at soil level during early morning hours.';
    }
  }

  return {
    alertLevel,
    alertTitle,
    impactSummary,
    sprayAction,
    irrigationAction,
    bestSprayWindow: `${bestSprayDay.day} (${bestSprayDay.date})`,
    atmosphericSummary: `${temp}°C • ${humidity}% Humidity • ${rainProb}% Rain Chance`
  };
}
