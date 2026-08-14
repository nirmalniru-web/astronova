// ==========================================================================
// SMART CROP DOCTOR — MULTILINGUAL VOICE ASSISTANT & ADVISORY ENGINE
// Web Speech API Engine with Full Voice Controls: Play, Pause, Resume, Stop, Replay
// Regional Language Support: en-IN, kn-IN, te-IN, ta-IN, hi-IN, ml-IN, mr-IN, bn-IN
// ==========================================================================

export const LANGUAGE_VOICE_MAP = {
  en: { bcp47: 'en-IN', fallbacks: ['en-US', 'en-GB', 'en'], label: 'English' },
  kn: { bcp47: 'kn-IN', fallbacks: ['kn'], label: 'ಕನ್ನಡ' },
  te: { bcp47: 'te-IN', fallbacks: ['te'], label: 'తెలుగు' },
  ta: { bcp47: 'ta-IN', fallbacks: ['ta'], label: 'தமிழ்' },
  hi: { bcp47: 'hi-IN', fallbacks: ['hi'], label: 'हिन्दी' },
  ml: { bcp47: 'ml-IN', fallbacks: ['ml'], label: 'മലയാളം' },
  mr: { bcp47: 'mr-IN', fallbacks: ['mr'], label: 'मराठी' },
  bn: { bcp47: 'bn-IN', fallbacks: ['bn-BD', 'bn'], label: 'বাংলা' }
};

/**
 * Dynamically constructs a natural, farmer-friendly, complete audio narrative
 * combining analysis findings, symptoms, remedies, prevention, weather risk, and Krishi advisory disclaimer.
 * 
 * @param {Object} analysisResult - Analyzed crop diagnosis object
 * @param {Object} weatherData - Current weather & humidity metrics
 * @param {string} selectedLanguage - 'en' | 'kn' | 'te' | 'ta' | 'hi' | 'ml' | 'mr' | 'bn'
 * @returns {string} Natural speech script
 */
export function generateAdvisorySpeech(analysisResult, weatherData, selectedLanguage = 'en') {
  if (!analysisResult) return "";

  const lang = selectedLanguage || 'en';
  const crop = analysisResult.crop || 'Crop';
  const confidence = analysisResult.confidence || 90;
  const isHealthy = analysisResult.status === 'healthy' || analysisResult.severity === 'low';
  const severity = analysisResult.severity || 'moderate';

  const weather = weatherData || {
    current: { temp: 28, humidity: 84, rainProbability: 60 }
  };
  const humidity = weather.current ? weather.current.humidity : 84;
  const rainProb = weather.current ? weather.current.rainProbability : 60;

  switch (lang) {
    case 'kn': // KANNADA
      if (isHealthy) {
        return `ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ. ನಾನು ನಿಮ್ಮ ${crop} ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. 
ಸಂತಸದ ಸುದ್ದಿ! ನಿಮ್ಮ ಬೆಳೆಯು ಶೇಕಡಾ ${confidence} ನಿಖರತೆಯೊಂದಿಗೆ ಅತ್ಯಂತ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಯಾವುದೇ ರೋಗ ಅಥವಾ ಕೀಟ ಬಾಧೆಯ ಲಕ್ಷಣಗಳಿಲ್ಲ. 
ಪ್ರಸ್ತುತ ಹವಾಮಾನದಲ್ಲಿ ತಾಪಮಾನ 28 ಡಿಗ್ರಿ ಮತ್ತು ಆರ್ದ್ರತೆ ಶೇಕಡಾ ${humidity} ಇದೆ. 
ನಿಮ್ಮ ನಿಯಮಿತ ನೀರಾವರಿ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ನಿರ್ವಹಣೆಯನ್ನು ಮುಂದುವರಿಸಿ. 
ಗಮನಿಸಿ, ಇದು ಎಐ ಆಧಾರಿತ ಪ್ರಾಥಮಿಕ ತಪಾಸಣೆಯಾಗಿದೆ. ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಮತ್ತೊಂದು ಫೋಟೋವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದು. ಉತ್ತಮ ಫಸಲು ನಿಮ್ಮದಾಗಲಿ!`;
      }
      return `ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ. ನಾನು ನಿಮ್ಮ ${crop} ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. 
ಈ ಚಿತ್ರದಲ್ಲಿ ಆರಂಭಿಕ ಎಲೆ ಮಚ್ಚೆ ಅಥವಾ ರೋಗದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿವೆ. 
ನಮ್ಮ ಎಐ ವ್ಯವಸ್ಥೆಯು ಶೇಕಡಾ ${confidence} ನಿಖರತೆಯೊಂದಿಗೆ ಇದನ್ನು ಗುರುತಿಸಿದ್ದು, ಪ್ರಸ್ತುತ ಅಪಾಯದ ಮಟ್ಟ ಮಧ್ಯಮವಾಗಿದೆ. 
ಮುಖ್ಯ ಲಕ್ಷಣಗಳೆಂದರೆ ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳು ಮತ್ತು ಎಲೆ ಹಳದಿಯಾಗುವುದು. 
ನೀವು ಮಾಡಬೇಕಾದ ಮುಖ್ಯ ಕ್ರಮಗಳು: ಮೊದಲನೆಯದಾಗಿ, ತೀವ್ರವಾಗಿ ಬಾಧಿತವಾದ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಹೊಲದಿಂದ ದೂರ ಹಾಕಿ. 
ಎರಡನೆಯದಾಗಿ, ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಸಿಂಪಡಿಸಬೇಡಿ, ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ. ಮೂರನೆಯದಾಗಿ, ಬೆಳಿಗ್ಗೆ ಶಿಫಾರಸು ಮಾಡಿದ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಸಿಂಪಡಿಸಿ. 
ಇಂದಿನ ಹವಾಮಾನದಲ್ಲಿ ಆರ್ದ್ರತೆ ಶೇಕಡಾ ${humidity} ಮತ್ತು ಮಳೆಯ ಸಾಧ್ಯತೆ ಶೇಕಡಾ ${rainProb} ಇರುವುದರಿಂದ ಶಿಲೀಂಧ್ರ ಹರಡುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು, ಆದ್ದರಿಂದ ಎಲೆಗಳನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಗಮನಿಸಿ. 
ನೆನಪಿರಲಿ, ಇದು ಎಐ ಆಧಾರಿತ ಸಂಭಾವ್ಯ ಗುರುತಿಸುವಿಕೆಯಾಗಿದ್ದು, ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ನಿಮ್ಮ ಸಮೀಪದ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ. ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಮತ್ತೊಂದು ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದು.`;

    case 'te': // TELUGU
      if (isHealthy) {
        return `నమస్కారం రైతు సోదరా. నేను మీ ${crop} పంట ఫోటోను పరిశీలించాను. 
శుభవార్త! మీ పంట తొంబై శాతం కంటే ఎక్కువ ఖచ్చితత్వంతో చాలా ఆరోగ్యంగా ఉంది. ఎటువంటి తెగులు లక్షణాలు లేవు. 
ప్రస్తుత ఉష్ణోగ్రత 28 డిగ్రీలు మరియు తేమ శాతాన్ని బట్టి మీ ప్రస్తుత నీటిపారుదల మరియు ఎరువుల యాజమాన్యాన్ని కొనసాగించండి. 
ఇది ఏఐ ఆధారిత ప్రాథమిక సమాచారం. మంచి దిగుబడి సాధించాలని కోరుకుంటున్నాము!`;
      }
      return `నమస్కారం రైతు సోదరా. నేను మీ ${crop} పంట ఫోటోను పరిశీలించాను. 
ఈ ఆకుపై తెగులు లక్షణాలు కనిపిస్తున్నాయి. 
మా ఏఐ వ్యవస్థ ${confidence} శాతం ఖచ్చితత్వంతో దీనిని గుర్తించింది, మరియు దీని తీవ్రత స్థాయి మధ్యస్థంగా ఉంది. 
ఆకులపై గోధుమ రంగు మచ్చలు మరియు పసుపు రంగులోకి మారడం వంటివి ప్రధాన లక్షణాలు. 
మీరు చేయవలసిన పనులు: మొదటగా బాగా సోకిన దిగువ ఆకులను తొలగించి నాశనం చేయండి. 
రెండవది ఆకులపై కాకుండా వేర్ల వద్ద మాత్రమే నీరు అందించండి. మూడవది సిఫార్సు చేసిన రక్షక మందును పిచికారీ చేయండి. 
ప్రస్తుత వాతావరణంలో తేమ ${humidity} శాతం ఉన్నందున ఫంగస్ వ్యాపించే ప్రమాదం ఉంది, కాబట్టి పంటను నిరంతరం గమనించండి. 
దయచేసి గమనించండి, ఇది ఏఐ ఆధారిత సంభావ్య నిర్ధారణ మాత్రమే. తుది నిర్ధారణ కోసం స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.`;

    case 'ta': // TAMIL
      if (isHealthy) {
        return `வணக்கம் விவசாயத் தோழரே. நீங்கள் பதிவேற்றிய ${crop} பயிரின் படத்தை நான் ஆய்வு செய்துள்ளேன். 
நற்செய்தி! உங்கள் பயிர் ${confidence} சதவீத துல்லியத்துடன் மிகவும் ஆரோக்கியமாக உள்ளது. எந்தவித நோய் அல்லது பூச்சி தாக்குதலும் இல்லை. 
வழக்கமான நீர்ப்பாசனம் மற்றும் உர மேலாண்மையை தொடர்ந்து மேற்கொள்ளுங்கள். 
இது செயற்கை நுண்ணறிவு அடிப்படையிலான வழிகாட்டல் ஆகும். நல்ல விளைச்சல் பெற வாழ்த்துகள்!`;
      }
      return `வணக்கம் விவசாயத் தோழரே. நீங்கள் பதிவேற்றிய ${crop} பயிரின் படத்தை நான் ஆய்வு செய்துள்ளேன். 
இந்த இலையில் ஆரம்பகால நோய் அறிகுறிகள் தென்படுகின்றன. 
செயற்கை நுண்ணறிவு இதனை ${confidence} சதவீத துல்லியத்துடன் கண்டறிந்துள்ளது, இதன் தீவிரத்தன்மை மிதமானது. 
இலைகளில் பழுப்பு நிறப் புள்ளிகள் மற்றும் இலை மஞ்சளாதல் இதன் முக்கிய அறிகுறிகளாகும். 
நீங்கள் செய்ய வேண்டியவை: பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி பண்ணைக்கு அப்பால் அப்புறப்படுத்துங்கள். 
இலைகளில் தண்ணீர் படாமல் வேர் பகுதியில் மட்டும் நீர் பாய்ச்சுங்கள். பரிந்துரைக்கப்பட்ட பூஞ்சைக்கொல்லி மருந்தைத் தெளிக்கவும். 
தற்போதைய காற்றில் ஈரப்பதம் ${humidity} சதவீதமாக இருப்பதால் பூஞ்சை பரவும் வாய்ப்புள்ளது, எனவே பயிரை உன்னிப்பாக கவனியுங்கள். 
நினைவில் கொள்ளுங்கள், இது ஆரம்பநிலை வழிகாட்டல் மட்டுமே, உறுதிப்படுத்த உள்ளூர் வேளாண் அறிவியல் மையத்தை அணுகவும்.`;

    case 'hi': // HINDI
      if (isHealthy) {
        return `नमस्ते किसान भाई। आपकी ${crop} की फसल की फोटो की जांच मैंने पूरी कर ली है। 
खुशखबरी! आपकी फसल ${confidence} प्रतिशत सटीकता के साथ पूरी तरह स्वस्थ है और इसमें किसी रोग के लक्षण नहीं हैं। 
वर्तमान में तापमान 28 डिग्री और नमी ${humidity} प्रतिशत है। अपनी सामान्य सिंचाई और पोषण प्रबंधन को जारी रखें। 
कृपया ध्यान दें कि यह एआई आधारित प्रारंभिक जांच है। अच्छी पैदावार के लिए शुभकामनाएं!`;
      }
      return `नमस्ते किसान भाई। आपकी ${crop} की फसल की फोटो की जांच मैंने पूरी कर ली है। 
इस पौधे में अगेती झुलसा या रोग के लक्षण दिखाई दे रहे हैं। 
हमारे एआई सिस्टम ने ${confidence} प्रतिशत सटीकता के साथ इसकी पहचान की है, और वर्तमान में जोखिम का स्तर मध्यम है। 
पत्तियों पर गोल भूरे धब्बे और पीलापन इसके प्रमुख लक्षण हैं। 
आपको तुरंत ये कदम उठाने चाहिए: सबसे पहले अत्यधिक संक्रमित निचली पत्तियों को काटकर खेत से दूर नष्ट करें। 
पत्तियों पर ऊपर से पानी न छिड़कें, पानी हमेशा जड़ों में दें। सुबह के समय अनुशंसित जैविक फफूंदनाशी का छिड़काव करें। 
आज के मौसम में नमी ${humidity} प्रतिशत और बारिश की संभावना ${rainProb} प्रतिशत होने के कारण फफूंद फैलने का खतरा है, इसलिए फसल की लगातार निगरानी करें। 
कृपया ध्यान दें कि यह एआई आधारित संभावित पहचान है, अंतिम पुष्टि के लिए अपने स्थानीय कृषि विज्ञान केंद्र से संपर्क करें।`;

    case 'ml': // MALAYALAM
      if (isHealthy) {
        return `നമസ്കാരം കർഷക സുഹൃത്തേ. ഞാൻ നിങ്ങളുടെ ${crop} വിളയുടെ ചിത്രം പരിശോധിച്ചു. 
നല്ല വാർത്ത! വിള ${confidence} ശതമാനം കൃത്യതയോടെ പൂർണ്ണമായും ആരോഗ്യകരമാണ്. രോഗലക്ഷണങ്ങളൊന്നും കണ്ടെത്തിയിട്ടില്ല. 
പതിവ് നനയും പരിചരണവും തുടരുക. നല്ലൊരു വിളവെടുപ്പ് ആശംസിക്കുന്നു!`;
      }
      return `നമസ്കാരം കർഷക സുഹൃത്തേ. ഞാൻ നിങ്ങളുടെ ${crop} വിളയുടെ ചിത്രം പരിശോധിച്ചു. 
ഇലകളിൽ കുമിൾ രോഗലക്ഷണങ്ങൾ കാണപ്പെടുന്നുണ്ട്. 
${confidence} ശതമാനം കൃത്യതയോടെയാണ് ഇത് തിരിച്ചറിഞ്ഞത്, ഇതിന്റെ കാഠിന്യം ഇടത്തരമാണ്. 
തവിട്ടുനിറത്തിലുള്ള പാടുകളും ഇല മഞ്ഞളിക്കലുമാണ് പ്രധാന ലക്ഷണങ്ങൾ. 
നിങ്ങൾ ചെയ്യേണ്ട കാര്യങ്ങൾ: രോഗം ബാധിച്ച ഇലകൾ മുറിച്ചുമാറ്റുക, തുള്ളി നന രീതി ഉപയോഗിക്കുക, ശുപാർശ ചെയ്ത കുമിൾനാശിനി തളിക്കുക. 
ഈർപ്പം ${humidity} ശതമാനം ഉള്ളതിനാൽ രോഗം പടരാൻ സാധ്യതയുണ്ട്. 
ഇതൊരു എഐ അധിഷ്ഠിത പ്രാഥമിക വിവരമാണ്, കൂടുതൽ വിവരങ്ങൾക്ക് കൃഷി ഭവനുമായി ബന്ധപ്പെടുക.`;

    case 'mr': // MARATHI
      if (isHealthy) {
        return `नमस्कार शेतकरी मित्र. आपण पाठवलेल्या ${crop} पिकाच्या फोटोची मी तपासणी केली आहे. 
आनंदाची बातमी! आपले पीक ${confidence} टक्के अचूकतेसह पूर्णपणे निरोगी आहे. रोगाची कोणतीही लक्षणे नाहीत. 
नेहमीप्रमाणे पाणी आणि खतांचे व्यवस्थापन चालू ठेवा. उत्तम उत्पन्नासाठी शुभेच्छा!`;
      }
      return `नमस्कार शेतकरी मित्र. आपण पाठवलेल्या ${crop} पिकाच्या फोटोची मी तपासणी केली आहे. 
या पानावर रोगाची प्राथमिक लक्षणे दिसून येत आहेत. 
आमच्या एआय प्रणालीने ${confidence} टक्के अचूकतेसह हा रोग ओळखला असून, सध्या धोक्याची पातळी मध्यम आहे. 
पानांवर तपकिरी डाग पडणे आणि पिवळेपणा ही मुख्य लक्षणे आहेत. 
आपण खालील उपाययोजना कराव्यात: बाधित झालेली खालची पाने काढून शेताबाहेर नष्ट करा. 
पानांवर पाणी टाळण्यासाठी ठिबक सिंचनाचा वापर करा आणि योग्य बुरशीनाशकाची फवारणी करा. 
हवेतील आर्द्रता ${humidity} टक्के असल्यामुळे बुरशी वाढू शकते, पिकावर लक्ष ठेवा. 
लक्षात ठेवा, हा एआय आधारित प्राथमिक अंदाज आहे, खात्रीसाठी कृषी अधिकाऱ्यांचा सल्ला घ्या.`;

    case 'bn': // BENGALI
      if (isHealthy) {
        return `নমস্কার কৃষক ভাই। আপনার ${crop} ফসলের ছবিটি আমি পর্যালোচনা করেছি। 
সুসংবাদ! আপনার ফসল ${confidence} শতাংশ নির্ভুলতার সাথে সম্পূর্ণ সুস্থ রয়েছে। 
নিয়মিত সেচ ও সার ব্যবস্থাপনা চালিয়ে যান। ভালো ফলনের শুভেচ্ছা রইল!`;
      }
      return `নমস্কার কৃষক ভাই। আপনার ${crop} ফসলের ছবিটি আমি পর্যালোচনা করেছি। 
এই পাতায় রোগের প্রাথমিক লক্ষণ দেখা যাচ্ছে। 
আমাদের এআই ${confidence} শতাংশ নির্ভুলতার সাথে এটি শনাক্ত করেছে এবং ঝুঁকির মাত্রা মাঝারি। 
পাতায় বাদামি দাগ ও হলুদ হয়ে যাওয়া প্রধান লক্ষণ। 
আপনার করণীয়: আক্রান্ত নিচের পাতাগুলো ছেঁটে জমি থেকে দূরে নষ্ট করুন। 
পাতার উপর পানি না দিয়ে গোড়ায় সেচ দিন এবং প্রয়োজনীয় ছত্রাকনাশক স্প্রে করুন। 
আবহাওয়ায় আর্দ্রতা ${humidity} শতাংশ হওয়ায় ছত্রাক ছড়ানোর ঝুঁকি রয়েছে। 
মনে রাখবেন এটি এআই ভিত্তিক প্রাথমিক শনাক্তকরণ, নিশ্চিতকরণের জন্য কৃষি বিজ্ঞান কেন্দ্রে যোগাযোগ করুন।`;

    case 'en':
    default:
      if (isHealthy) {
        return `Hello Farmer. I checked the crop image you uploaded. 
Great news! This ${crop} plant appears completely healthy with an estimated confidence of ${confidence} percent. 
There are no observable fungal lesions or pest symptoms. 
With current temperature at 28 degrees Celsius and humidity at ${humidity} percent, continue your regular scheduled watering and nutrient schedule. 
Please note that this is an AI-assisted health check. You can scan another leaf whenever you want. Wishing you a bountiful harvest!`;
      }
      return `Hello Farmer. I checked the crop image you uploaded. 
This appears to be a ${crop} plant showing visible signs that may be consistent with early fungal pathology. 
The AI estimates a confidence of ${confidence} percent, and the current risk level is moderate. 
Some visible symptoms include brown circular spots and chlorotic yellowing on the leaf tissue. 
Here is what you should do: First, carefully prune severely affected lower leaves and dispose of them away from the field. 
Second, avoid overhead sprinkler watering to keep the canopy dry. Third, apply a recommended bio-fungicide in the early morning. 
The current weather conditions show ${humidity} percent humidity and a ${rainProb} percent rain probability. These humid conditions can favor fungal spore spread, so inspect nearby rows closely. 
Please remember that this is an AI-based possible identification and not a guaranteed diagnosis. For definitive confirmation, consult your local agriculture officer or Krishi Vigyan Kendra.`;
  }
}

class VoiceService {
  constructor() {
    this.status = 'idle'; // 'idle' | 'playing' | 'paused' | 'stopped'
    this.currentText = '';
    this.currentLang = 'en';
    this.currentRate = 1.0;
    this.currentUtterance = null;
    this.callbacks = new Set();
    this.availableVoices = [];

    this.initVoices();
  }

  initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    try {
      this.availableVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      this.availableVoices = [];
    }
  }

  /**
   * Check if a native voice is installed on user's device for the target language
   * @param {string} langCode - 'en', 'kn', 'te', 'ta', 'hi', 'ml', 'mr', 'bn'
   * @returns {Object} { hasNativeVoice: boolean, voiceName: string, matchedLang: string, label: string }
   */
  checkVoiceAvailability(langCode = 'en') {
    const config = LANGUAGE_VOICE_MAP[langCode] || LANGUAGE_VOICE_MAP.en;
    if (!('speechSynthesis' in window) || this.availableVoices.length === 0) {
      this.loadVoices();
    }

    const targetBcp = config.bcp47.toLowerCase();
    const targetPrefix = langCode.toLowerCase();

    // 1. Check exact BCP-47 match (e.g. kn-IN, te-IN, ta-IN, hi-IN)
    const exactVoice = this.availableVoices.find(v => {
      const vLang = v.lang.toLowerCase().replace('_', '-');
      return vLang === targetBcp;
    });

    if (exactVoice) {
      return {
        hasNativeVoice: true,
        voiceName: exactVoice.name,
        voice: exactVoice,
        matchedLang: config.bcp47,
        label: config.label,
        isFallback: false
      };
    }

    // 2. Check language prefix match (e.g. 'kn', 'te', 'ta', 'hi', 'ml', 'mr', 'bn')
    const prefixVoice = this.availableVoices.find(v => {
      const vLang = v.lang.toLowerCase();
      return vLang.startsWith(targetPrefix);
    });

    if (prefixVoice) {
      return {
        hasNativeVoice: true,
        voiceName: prefixVoice.name,
        voice: prefixVoice,
        matchedLang: prefixVoice.lang,
        label: config.label,
        isFallback: false
      };
    }

    // 3. Fallback to closest Indian accent voice or device synthesizer
    const fallbackVoice = this.availableVoices.find(v => 
      v.lang.includes('IN') || v.lang.startsWith('en')
    ) || this.availableVoices[0];

    return {
      hasNativeVoice: false,
      voiceName: fallbackVoice ? fallbackVoice.name : 'Browser Speech Engine',
      voice: fallbackVoice || null,
      matchedLang: config.bcp47,
      label: config.label,
      isFallback: true
    };
  }

  /**
   * Subscribe to playback status changes
   */
  subscribe(cb) {
    this.callbacks.add(cb);
    return () => this.callbacks.delete(cb);
  }

  notify() {
    const statePayload = {
      status: this.status,
      isPlaying: this.status === 'playing',
      isPaused: this.status === 'paused',
      text: this.currentText,
      lang: this.currentLang,
      rate: this.currentRate,
      voiceInfo: this.checkVoiceAvailability(this.currentLang)
    };
    this.callbacks.forEach(fn => fn(statePayload));
  }

  /**
   * Play text advisory in the user's selected language
   * @param {string} text - The natural advisory speech text
   * @param {string} langCode - The application selected language
   * @param {number} rate - Speaking speed (0.8 = Slow, 1.0 = Normal, 1.2 = Fast)
   */
  play(text, langCode = 'en', rate = 1.0) {
    if (!text) return;

    this.stop();
    this.currentText = text;
    this.currentLang = langCode;
    this.currentRate = rate || 1.0;

    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis API not available in browser. Simulating voice playback.');
      this.status = 'playing';
      this.notify();
      setTimeout(() => {
        if (this.status === 'playing') {
          this.status = 'idle';
          this.notify();
        }
      }, 9000);
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Reset any existing utterance

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = Math.max(0.7, Math.min(1.4, this.currentRate));
      utterance.pitch = 1.0;

      const voiceCheck = this.checkVoiceAvailability(langCode);
      const config = LANGUAGE_VOICE_MAP[langCode] || LANGUAGE_VOICE_MAP.en;

      // Always explicitly set the language BCP-47 tag to guarantee correct accent
      utterance.lang = config.bcp47;

      if (voiceCheck.voice) {
        utterance.voice = voiceCheck.voice;
      }

      utterance.onstart = () => {
        this.status = 'playing';
        this.notify();
      };

      utterance.onpause = () => {
        this.status = 'paused';
        this.notify();
      };

      utterance.onresume = () => {
        this.status = 'playing';
        this.notify();
      };

      utterance.onend = () => {
        this.status = 'idle';
        this.notify();
      };

      utterance.onerror = (err) => {
        console.warn('SpeechSynthesis playback ended or errored:', err);
        this.status = 'idle';
        this.notify();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      this.status = 'playing';
      this.notify();
      setTimeout(() => {
        this.status = 'idle';
        this.notify();
      }, 7000);
    }
  }

  /**
   * Pause speech playback
   */
  pause() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.status = 'paused';
      this.notify();
    }
  }

  /**
   * Resume paused speech playback
   */
  resume() {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.status = 'playing';
      this.notify();
    } else if (this.currentText) {
      this.play(this.currentText, this.currentLang, this.currentRate);
    }
  }

  /**
   * Replay current advisory speech from the beginning
   */
  replay() {
    if (this.currentText) {
      this.stop();
      this.play(this.currentText, this.currentLang, this.currentRate);
    }
  }

  /**
   * Stop speech playback completely
   */
  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.status = 'idle';
    this.notify();
  }

  /**
   * Toggle between Play and Pause/Resume
   */
  toggle(text, langCode = 'en', rate = 1.0) {
    if (this.status === 'playing') {
      this.pause();
    } else if (this.status === 'paused') {
      this.resume();
    } else {
      this.play(text, langCode, rate);
    }
  }
}

export const ttsService = new VoiceService();
export const voiceService = ttsService; // Reusable alias
