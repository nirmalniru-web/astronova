// ==========================================================================
// SMART CROP DOCTOR — MULTILINGUAL SAMPLE CROP & DISEASE DATABASE
// Full 8-Language Agricultural Diagnostic Profiles & Voice Advisory Scripts
// Languages: English, Kannada (kn), Telugu (te), Tamil (ta), Hindi (hi),
// Malayalam (ml), Marathi (mr), Bengali (bn)
// ==========================================================================

export const sampleCrops = [
  {
    id: "tomato-early-blight",
    crop: "Tomato",
    cropCode: "tomato",
    cropEmoji: "🍅",
    diseaseName: "Early Blight (Alternaria solani)",
    diseaseCode: "early_blight",
    confidence: 92,
    severity: "moderate",
    severityScore: 65,
    status: "needs_attention",
    image: "assets/images/tomato-blight.jpg",
    boundingBox: { top: 32, left: 38, width: 34, height: 32 },

    // Multilingual Diagnostic Profiles & Audio Scripts
    locales: {
      en: {
        diseaseDisplay: "Possible Early Blight",
        explanation: "Early Blight is a common fungal disease that attacks tomato leaves and stems. It usually starts on older lower leaves after warm, humid periods, causing target-board concentric circular spots.",
        symptoms: [
          { id: "spots", name: "Concentric Brown Spots", desc: "Dark brown target-like rings with yellow chlorotic halos around them.", icon: "🎯" },
          { id: "yellowing", name: "Leaf Yellowing", desc: "Leaves turn yellow starting from lower canopy and dry up prematurely.", icon: "🍂" },
          { id: "damage", name: "Tissue Collapse", desc: "Dead leaf tissue weakens photosynthesis and reduces fruit yield.", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "Prune Infected Lower Leaves", desc: "Cut off leaves touching the ground or showing brown spots and dispose of them away from the field." },
          { step: 2, title: "Avoid Overhead Sprinkler Irrigation", desc: "Switch to drip irrigation or water directly at root level to prevent fungal spore germination." },
          { step: 3, title: "Apply Bio-Fungicide / Organic Spray", desc: "Spray Trichoderma viride or Copper Oxychloride as recommended by your local agriculture officer." },
          { step: 4, title: "Maintain Proper Plant Spacing", desc: "Ensure adequate air circulation between tomato plants (at least 45–60 cm) to allow foliage to dry rapidly." }
        ],
        prevention: [
          { title: "Crop Rotation", desc: "Do not plant tomatoes or potatoes in the same soil for 2-3 consecutive seasons." },
          { title: "Mulching", desc: "Apply straw mulch around the base to prevent soil-borne spores from splashing onto leaves." }
        ],
        audioText: "Smart Crop Doctor advisory for your Tomato crop. We detected possible Early Blight with 92 percent confidence. Severity is moderate. Key steps: First, prune infected lower leaves. Second, avoid overhead watering. Third, spray recommended bio-fungicide or copper spray in the early morning."
      },

      kn: {
        diseaseDisplay: "ಆರಂಭಿಕ ಬ್ಲೈಟ್ (Early Blight)",
        explanation: "ಆರಂಭಿಕ ಬ್ಲೈಟ್ ಟೊಮೇಟೊ ಬೆಳೆಯ ಸಾಮಾನ್ಯ ಶಿಲೀಂಧ್ರ ರೋಗವಾಗಿದೆ. ಇದು ಬೆಚ್ಚನೆಯ, ಆರ್ದ್ರ ವಾತಾವರಣದ ನಂತರ ಕೆಳಗಿನ ಎಲೆಗಳ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಕಂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.",
        symptoms: [
          { id: "spots", name: "ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಮಚ್ಚೆಗಳು", desc: "ಎಲೆಯ ಮೇಲೆ ಗುರಿ ಫಲಕದಂತಿರುವ ಕಂದು ಮಚ್ಚೆಗಳು ಮತ್ತು ಹಳದಿ ಬಣ್ಣದ ಗಡಿ.", icon: "🎯" },
          { id: "yellowing", name: "ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು", desc: "ಕೆಳಗಿನ ಎಲೆಗಳು ಮೊದಲು ಹಳದಿಯಾಗಿ ಉದುರಿಹೋಗುತ್ತವೆ.", icon: "🍂" },
          { id: "damage", name: "ಬೆಳವಣಿಗೆ ಕುಂಠಿತ", desc: "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಕ್ಷೀಣಿಸಿ ಫಸಲಿನ ಇಳುವರಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ.", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "ಬಾಧಿತ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ", desc: "ನೆಲಕ್ಕೆ ತಾಗುವ ಮತ್ತು ಮಚ್ಚೆಗಳಿರುವ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಹೊಲದಿಂದ ದೂರ ಹಾಕಿ." },
          { step: 2, title: "ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ", desc: "ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಬೀಳದಂತೆ ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿಯನ್ನು ಅನುಸರಿಸಿ." },
          { step: 3, title: "ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಣೆ", desc: "ಟ್ರೈಕೋಡರ್ಮಾ ಅಥವಾ ಶಿಫಾರಸು ಮಾಡಿದ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಸಿಂಪಡಿಸಿ." },
          { step: 4, title: "ಸಸಿಗಳ ನಡುವೆ ಅಂತರ ಕಾಪಾಡಿ", desc: "ಗಿಡಗಳ ನಡುವೆ ಗಾಳಿಯಾಡಲು ಸೂಕ್ತ ಜಾಗವನ್ನು (45-60 ಸೆಂ.ಮೀ) ಒದಗಿಸಿ." }
        ],
        prevention: [
          { title: "ಬೆಳೆ ಪರಿವರ್ತನೆ", desc: "ಟೊಮೇಟೊ ನಂತರ ಅದೇ ಜಾಗದಲ್ಲಿ ಆಲೂಗಡ್ಡೆ ಅಥವಾ ಬದನೆ ಬೆಳೆಯಬೇಡಿ." },
          { title: "ಹೊದಿಕೆ ಹಾಕುವುದು (Mulching)", desc: "ಮಣ್ಣಿನಿಂದ ಶಿಲೀಂಧ್ರ ಎಲೆಗೆ ಹರಡದಂತೆ ಹುಲ್ಲಿನ ಹೊದಿಕೆ ಹಾಕಿ." }
        ],
        audioText: "ನಿಮ್ಮ ಟೊಮೇಟೊ ಬೆಳೆಗೆ ಸ್ಮಾರ್ಟ್ ಕ್ರಾಪ್ ಡಾಕ್ಟರ್ ಕೃಷಿ ಸಲಹೆ. ಆರಂಭಿಕ ಬ್ಲೈಟ್ ರೋಗದ ಲಕ್ಷಣಗಳು ಶೇಕಡಾ 92 ನಿಖರತೆಯೊಂದಿಗೆ ಕಂಡುಬಂದಿವೆ. ರೋಗದ ತೀವ್ರತೆ ಮಧ್ಯಮವಾಗಿದೆ. ಮೊದಲನೆಯದಾಗಿ ಬಾಧಿತ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ಎರಡನೆಯದಾಗಿ ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಬೀಳದಂತೆ ಬುಡಕ್ಕೆ ನೀರು ಹಾಯಿಸಿ. ಮೂರನೆಯದಾಗಿ ಶಿಫಾರಸು ಮಾಡಿದ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಸಿಂಪಡಿಸಿ."
      },

      te: {
        diseaseDisplay: "ప్రారంభ బ్లైట్ తెగులు (Early Blight)",
        explanation: "ఎర్లీ బ్లైట్ అనేది టమోటా ఆకులు మరియు కాండంపై దాడి చేసే సాధారణ శిలీంధ్ర వ్యాధి. ఇది వెచ్చని, తేమతో కూడిన వాతావరణంలో దిగువ ఆకులపై గుండ్రని ముదురు గోధుమ రంగు మచ్చలను కలిగిస్తుంది.",
        symptoms: [
          { id: "spots", name: "గుండ్రని గోధుమ మచ్చలు", desc: "ఆకులపై గురిబోర్డు ఆకారంలో గోధుమ రంగు మచ్చలు మరియు పసుపు రంగు వలయాలు.", icon: "🎯" },
          { id: "yellowing", name: "ఆకులు పసుపు రంగులోకి మారడం", desc: "దిగువ ఆకులు ముందుగా పసుపు రంగులోకి మారి ఎండిపోతాయి.", icon: "🍂" },
          { id: "damage", name: "దిగుబడి క్షీణత", desc: "కిరణజన్య సంయోగక్రియ తగ్గి కాయల దిగుబడి గణనీయంగా తగ్గుతుంది.", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "సోకిన దిగువ ఆకులను తొలగించండి", desc: "నేలను తాకుతున్న లేదా గోధుమ మచ్చలు ఉన్న ఆకులను కత్తిరించి పొలానికి దూరంగా నాశనం చేయండి." },
          { step: 2, title: "బిందు సేద్యం ఉపయోగించండి", desc: "ఆకులపై నీరు పడకుండా మొక్క మొదట్లోనే నీరు అందించండి." },
          { step: 3, title: "శిలీంధ్రనాశిని పిచికారీ చేయండి", desc: "ట్రైకోడెర్మా లేదా కాపర్ ఆక్సిక్లోరైడ్ మందును తెల్లవారుజామున పిచికారీ చేయండి." },
          { step: 4, title: "మొక్కల మధ్య సరైన దూరం", desc: "గాలి వెలుతురు బాగా ప్రసరించేలా మొక్కల మధ్య తగినంత దూరం ఉంచండి." }
        ],
        prevention: [
          { title: "పంట మార్పిడి", desc: "వరుసగా రెండు మూడు సీజన్లలో ఒకే నేలలో టమోటా లేదా బంగాళాదుంప వేయకండి." },
          { title: "మల్చింగ్", desc: "మట్టి నుండి శిలీంధ్ర బీజాలు ఆకులకు చేరకుండా గడ్డి లేదా ప్లాస్టిక్ మల్చింగ్ చేయండి." }
        ],
        audioText: "మీ టమోటా పంట కోసం స్మార్ట్ క్రాప్ డాక్టర్ వ్యవసాయ సలహా. 92 శాతం ఖచ్చితత్వంతో ప్రారంభ బ్లైట్ తెగులు లక్షణాలు గుర్తించబడ్డాయి. తీవ్రత మధ్యస్థంగా ఉంది. ముఖ్యమైన చర్యలు: మొదటగా సోకిన ఆకులను తొలగించండి. రెండవది ఆకులపై కాకుండా వేర్ల వద్ద మాత్రమే నీరు అందించండి. మూడవది సిఫార్సు చేసిన కాపర్ ఆక్సిక్లోరైడ్ మందును పిచికారీ చేయండి."
      },

      ta: {
        diseaseDisplay: "ஆரம்பகால கருகல் நோய் (Early Blight)",
        explanation: "ஆரம்பகால கருகல் நோய் தக்காளி இலைகளைத் தாக்கும் ஒரு பூஞ்சை நோயாகும். இது வெப்பமான மற்றும் ஈரப்பதமான காலங்களில் கீழ்ப்பகுதி இலைகளில் வட்ட வடிவ பழுப்புப் புள்ளிகளை ஏற்படுத்துகிறது.",
        symptoms: [
          { id: "spots", name: "வட்ட வடிவ பழுப்புப் புள்ளிகள்", desc: "இலைகளில் மஞ்சள் நிற வளையத்துடன் கூடிய அடர் பழுப்பு நிறப் புள்ளிகள்.", icon: "🎯" },
          { id: "yellowing", name: "இலைகள் மஞ்சளாதல்", desc: "கீழ் இலைகள் முதலில் மஞ்சளாகி காய்ந்து உதிர்கின்றன.", icon: "🍂" },
          { id: "damage", name: "மகசூல் இழப்பு", desc: "இலைகள் காய்வதால் ஒளிச்சேர்க்கை குறைந்து காய் உற்பத்தி பாதிக்கப்படுகிறது.", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "பாதிக்கப்பட்ட இலைகளை அகற்றவும்", desc: "மண்ணில் படும் மற்றும் புள்ளி விழுந்த இலைகளை வெட்டி பண்ணைக்கு அப்பால் அப்புறப்படுத்தவும்." },
          { step: 2, title: "சொட்டு நீர் பாசனம் பயன்படுத்தவும்", desc: "இலைகளில் தண்ணீர் படாமல் வேர் பகுதியில் மட்டும் நீர் பாய்ச்சவும்." },
          { step: 3, title: "பூஞ்சைக்கொல்லி தெளிக்கவும்", desc: "டிரைக்கோடெர்மா விரிடி அல்லது காப்பர் ஆக்ஸிகுளோரைடு மருந்தைத் தெளிக்கவும்." },
          { step: 4, title: "பயிர் இடைவெளி பராமரிக்கவும்", desc: "செடிகளுக்கு இடையே நல்ல காற்றோட்டம் இருக்கும் வகையில் இடைவெளி விடவும்." }
        ],
        prevention: [
          { title: "பயிர் சுழற்சி", desc: "ஒரே நிலத்தில் தொடர்ந்து தக்காளி அல்லது உருளைக்கிழங்கு பயிரிட வேண்டாம்." },
          { title: "மூடாக்கு போடுதல்", desc: "மண்ணிலிருந்து பூஞ்சை வித்துக்கள் இலைகளில் தெறிக்காமல் இருக்க மூடாக்கு இடவும்." }
        ],
        audioText: "உங்கள் தக்காளி பயிருக்கான ஸ்மார்ட் பயிர் டாக்டர் ஆலோசனை. ஆரம்பகால கருகல் நோய் தொண்ணூற்று இரண்டு சதவீத துல்லியத்துடன் கண்டறியப்பட்டுள்ளது. தீவிரத்தன்மை மிதமானது. முக்கியமான நடவடிக்கைகள்: முதலாவதாக பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி அகற்றவும். இரண்டாவதாக இலைகளில் படாமல் வேர் வழியே நீர் பாய்ச்சவும். மூன்றாவதாக பரிந்துரைக்கப்பட்ட பூஞ்சைக்கொல்லி மருந்தை காலை வேளையில் தெளிக்கவும்."
      },

      hi: {
        diseaseDisplay: "संभावित अगेती झुलसा (Early Blight)",
        explanation: "अगेती झुलसा टमाटर का एक प्रमुख फफूंद जनित रोग है। यह गर्म और नम मौसम में निचली पत्तियों पर संकेंद्रित छल्लों जैसे गोल भूरे धब्बे बनाता है।",
        symptoms: [
          { id: "spots", name: "गोल भूरे छल्लेदार धब्बे", desc: "पत्तियों पर पीले घेरे के साथ गहरे भूरे संकेंद्रित धब्बे।", icon: "🎯" },
          { id: "yellowing", name: "पत्तियों का पीला पड़ना", desc: "निचली पत्तियां पीली पड़कर समय से पहले सूखने लगती हैं।", icon: "🍂" },
          { id: "damage", name: "पैदावार में कमी", desc: "पत्तियां नष्ट होने से पौधों का भोजन बनना कम हो जाता है।", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "संक्रमित निचली पत्तियों को काटें", desc: "जमीन से छूने वाली और धब्बेदार पत्तियों को काटकर खेत से दूर नष्ट करें।" },
          { step: 2, title: "ड्रिप सिंचाई का प्रयोग करें", desc: "पत्तियों पर पानी का छिड़काव न करें, पानी हमेशा जड़ों में दें।" },
          { step: 3, title: "फफूंदनाशी का छिड़काव करें", desc: "ट्राइकोडर्मा विरिडी या कॉपर ऑक्सीक्लोराइड का सुबह के समय छिड़काव करें।" },
          { step: 4, title: "पौधों के बीच उचित दूरी रखें", desc: "हवा के सही संचार के लिए पौधों के बीच 45 से 60 सेंटीमीटर की दूरी बनाए रखें।" }
        ],
        prevention: [
          { title: "फसल चक्र अपनाएं", desc: "लगातार 2-3 वर्षों तक एक ही खेत में टमाटर या आलू न लगाएं।" },
          { title: "मल्चिंग का उपयोग", desc: "मिट्टी के बीजाणुओं को पत्तियों पर उछलने से रोकने के लिए पुआल की मल्चिंग करें।" }
        ],
        audioText: "आपकी टमाटर की फसल के लिए स्मार्ट क्रॉप डॉक्टर की कृषि सलाह। बयान्वे प्रतिशत सटीकता के साथ संभावित अगेती झुलसा रोग की पहचान हुई है। रोग की गंभीरता मध्यम है। मुख्य उपाय: सबसे पहले संक्रमित निचली पत्तियों को काटकर हटा दें। दूसरा, पत्तियों के ऊपर से पानी देने से बचें। तीसरा, अनुशंसित फफूंदनाशी दवा का सुबह के समय छिड़काव करें।"
      },

      ml: {
        diseaseDisplay: "ഏർലി ബ്ലൈറ്റ് (Early Blight)",
        explanation: "തക്കാളി ചെടികളെ ബാധിക്കുന്ന ഒരു കുമിൾ രോഗമാണ് ഏർലി ബ്ലൈറ്റ്. ഈർപ്പമുള്ള കാലാവസ്ഥയിൽ താഴത്തെ ഇലകളിൽ വൃത്താകൃതിയിലുള്ള തവിട്ടുനിറത്തിലുള്ള പാടുകൾ ഉണ്ടാകുന്നു.",
        symptoms: [
          { id: "spots", name: "തവിട്ടുനിറത്തിലുള്ള പാടുകൾ", desc: "മഞ്ഞ വലയത്തോടെയുള്ള തവിട്ടുനിറത്തിലുള്ള വട്ടപ്പാടുകൾ.", icon: "🎯" },
          { id: "yellowing", name: "ഇലകൾ മഞ്ഞളിക്കൽ", desc: "താഴത്തെ ഇലകൾ മഞ്ഞളിച്ച് ഉണങ്ങി വീഴുന്നു.", icon: "🍂" },
          { id: "damage", name: "വിളവ് കുറയുന്നു", desc: "ഇലകൾ നശിക്കുന്നത് കായ്ഫലത്തെ പ്രതികൂലമായി ബാധിക്കുന്നു.", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "ബാധിച്ച ഇലകൾ മുറിച്ചു മാറ്റുക", desc: "പാടുകൾ വീണ ഇലകൾ ചെത്തിക്കളഞ്ഞ് തോട്ടത്തിൽ നിന്ന് അകലെ കളയുക." },
          { step: 2, title: "തുള്ളി നന രീതി ഉപയോഗിക്കുക", desc: "ഇലകളിൽ വെള്ളം തളിക്കാതെ വേരുകളിൽ മാത്രം നനയ്ക്കുക." },
          { step: 3, title: "കുമിൾനാശിനി തളിക്കുക", desc: "ട്രൈക്കോഡെർമ അല്ലെങ്കിൽ കോപ്പർ ഓക്സിക്ലോറൈഡ് തളിക്കുക." },
          { step: 4, title: "ചെടികൾ തമ്മിൽ അകലം പാലിക്കുക", desc: "വായുസഞ്ചാരത്തിനായി ചെടികൾ തമ്മിൽ ശരിയായ അകലം നൽകുക." }
        ],
        prevention: [
          { title: "വിള പരിക്രമണം", desc: "തുടർച്ചയായി ഒരേ നിലത്തിൽ തക്കാളി നടരുത്." },
          { title: "പുതയിടൽ", desc: "മണ്ണിലെ അണുക്കൾ ഇലയിലേക്ക് തെറിക്കാതിരിക്കാൻ പുതയിടുക." }
        ],
        audioText: "നിങ്ങളുടെ തക്കാളി വിളയ്ക്കുള്ള സ്മാർട്ട് ക്രോപ്പ് ഡോക്ടർ കാർഷിക ഉപദേശം. തൊണ്ണൂറ്റിരണ്ട് ശതമാനം കൃത്യതയോടെ ഏർലി ബ്ലൈറ്റ് രോഗലക്ഷണങ്ങൾ കണ്ടെത്തി. ബാധിച്ച ഇലകൾ ഉടൻ നീക്കം ചെയ്യുകയും ശുപാർശ ചെയ്ത കുമിൾനാശിനി തളിക്കുകയും ചെയ്യുക."
      },

      mr: {
        diseaseDisplay: "संभाव्य अर्ली ब्लाइट (Early Blight)",
        explanation: "अर्ली ब्लाइट हा टोमॅटो पिकावरील एक सामान्य बुरशीजन्य रोग आहे. दमट हवामानात खालच्या पानांवर गोल तपकिरी डाग पडतात.",
        symptoms: [
          { id: "spots", name: "गोल तपकिरी डाग", desc: "पानांवर पिवळसर कडा असलेले गडद तपकिरी डाग.", icon: "🎯" },
          { id: "yellowing", name: "पाने पिवळी पडणे", desc: "खालची पाने पिवळी पडून लवकर सुकतात.", icon: "🍂" },
          { id: "damage", name: "उत्पादनात घट", desc: "पानांचे नुकसान झाल्यामुळे फळांचे उत्पादन घटते.", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "बाधित खालची पाने काढा", desc: "जमिनीला टेकणारी व डाग असलेली पाने छाटून शेताबाहेर नष्ट करा." },
          { step: 2, title: "ठिबक सिंचनाचा वापर करा", desc: "पानांवर पाणी पडू देऊ नका, फक्त मुळांशी पाणी द्या." },
          { step: 3, title: "बुरशीनाशकाची फवारणी", desc: "ट्रायकोडर्मा किंवा कॉपर ऑक्सीक्लोराईडची सकाळच्या वेळी फवारणी करा." },
          { step: 4, title: "रोपांमध्ये योग्य अंतर ठेवा", desc: "हवा खेळती राहण्यासाठी रोपांमध्ये ४५ ते ६० सें.मी. अंतर ठेवा." }
        ],
        prevention: [
          { title: "पीक फेरपालट", desc: "एकाच जमिनीत सलग टोमॅटो किंवा बटाटा लावू नका." },
          { title: "मल्चिंगचा वापर", desc: "मातीतील बुरशी पानांवर उडू नये म्हणून पेंढ्याचे आच्छादन करा." }
        ],
        audioText: "तुमच्या टोमॅटो पिकासाठी स्मार्ट क्रॉप डॉक्टरचा कृषी सल्ला. ब्याण्णव टक्के अचूकतेसह अर्ली ब्लाइट रोगाची लक्षणे आढळली आहेत. बाधित पाने काढून टाका आणि शिफारस केलेल्या बुरशीनाशकाची फवारणी करा."
      },

      bn: {
        diseaseDisplay: "সম্ভাব্য আর্লি ব্লাইট (Early Blight)",
        explanation: "আর্লি ব্লাইট টমেটোর একটি সাধারণ ছত্রাকজনিত রোগ। আর্দ্র আবহাওয়ার পর নিচের পাতায় গোল ঘন বাদামি দাগ দেখা দেয়।",
        symptoms: [
          { id: "spots", name: "গোলাকার বাদামি দাগ", desc: "পাতায় হলুদ বলয়যুক্ত গাঢ় বাদামি দাগ।", icon: "🎯" },
          { id: "yellowing", name: "পাতা হলুদ হওয়া", desc: "নিচের পাতাগুলো হলুদ হয়ে অকালে ঝরে যায়।", icon: "🍂" },
          { id: "damage", name: "ফলন হ্রাস", desc: "পাতা নষ্ট হয়ে যাওয়ায় ফলন মারাত্মকভাবে কমে যায়।", icon: "⚠️" }
        ],
        recommendations: [
          { step: 1, title: "আক্রান্ত পাতা ছেঁটে ফেলুন", desc: "মাটিতে লাগা ও দাগযুক্ত পাতা কেটে জমি থেকে দূরে নষ্ট করুন।" },
          { step: 2, title: "ড্রিপ সেচ ব্যবহার করুন", desc: "পাতার উপর পানি না দিয়ে গোড়ায় পানি দিন।" },
          { step: 3, title: "ছত্রাকনাশক স্প্রে করুন", desc: "ট্রাইকোডার্মা বা কপার অক্সিক্লোরাইড সকালে স্প্রে করুন।" },
          { step: 4, title: "গাছের মাঝে ফাঁকা রাখুন", desc: "বাতাস চলাচলের জন্য গাছের মাঝে সঠিক দূরত্ব রাখুন।" }
        ],
        prevention: [
          { title: "ফসল পর্যায়ক্রম", desc: "একই জমিতে পরপর টমেটো বা আলু চাষ করবেন না।" },
          { title: "মালচিং ব্যবহার", desc: "মাটির জীবাণু পাতায় ছিটকে আসা রোধ করতে মালচিং করুন।" }
        ],
        audioText: "আপনার টমেটো ফসলের জন্য স্মার্ট ক্রপ ডাক্তার পরামর্শ। ৯২ শতাংশ নির্ভুলতার সাথে আর্লি ব্লাইট রোগের লক্ষণ শনাক্ত হয়েছে। আক্রান্ত নিচের পাতাগুলো সরিয়ে ফেলুন এবং প্রস্তাবিত ছত্রাকনাশক স্প্রে করুন।"
      }
    }
  },

  {
    id: "rice-leaf-blast",
    crop: "Rice / Paddy",
    cropCode: "rice",
    cropEmoji: "🌾",
    diseaseName: "Rice Blast (Magnaporthe oryzae)",
    diseaseCode: "rice_blast",
    confidence: 94,
    severity: "high",
    severityScore: 85,
    status: "needs_attention",
    image: "assets/images/rice-blast.jpg",
    boundingBox: { top: 25, left: 40, width: 30, height: 45 },

    locales: {
      en: {
        diseaseDisplay: "Possible Rice Blast",
        explanation: "Rice blast is a destructive fungal disease of paddy. It produces diamond-shaped spindle lesions with grey centers and dark brown margins.",
        symptoms: [
          { id: "spindle", name: "Spindle-shaped Spots", desc: "Diamond/eye-shaped lesions with ash-grey center and brown borders.", icon: "🔶" },
          { id: "burn", name: "Leaf Desiccation", desc: "Lesions merge together, causing leaf blades to look scorched.", icon: "🔥" }
        ],
        recommendations: [
          { step: 1, title: "Regulate Excess Nitrogen", desc: "Immediately stop top-dressing urea fertilizers which make plant tissues tender." },
          { step: 2, title: "Maintain Standing Water", desc: "Maintain 2–3 cm standing water in paddy to reduce spore germination." },
          { step: 3, title: "Spray Targeted Fungicide", desc: "Spray Tricyclazole 75% WP during calm morning hours." }
        ],
        prevention: [
          { title: "Seed Treatment", desc: "Treat seeds with Pseudomonas fluorescens before sowing." }
        ],
        audioText: "Smart Crop Doctor advisory for your Rice crop. We detected possible Rice Blast with 94 percent confidence. Severity is high. Please avoid excessive nitrogen fertilizer immediately, maintain standing water in paddy, and apply recommended Tricyclazole spray."
      },

      kn: {
        diseaseDisplay: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Rice Blast)",
        explanation: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗವು ಅತ್ಯಂತ ಅಪಾಯಕಾರಿ ಶಿಲೀಂಧ್ರ ರೋಗವಾಗಿದೆ. ಇದು ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನ ಆಕಾರದ ಬೂದು-ಕಂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.",
        symptoms: [
          { id: "spindle", name: "ಕಣ್ಣಿನ ಆಕಾರದ ಮಚ್ಚೆಗಳು", desc: "ಮಧ್ಯದಲ್ಲಿ ಬೂದು ಬಣ್ಣ ಮತ್ತು ಕಂದು ಅಂಚುಳ್ಳ ಮಚ್ಚೆಗಳು.", icon: "🔶" },
          { id: "burn", name: "ಎಲೆಗಳು ಸುಟ್ಟಂತೆ ಕಾಣುವುದು", desc: "ಮಚ್ಚೆಗಳು ಒಟ್ಟಾಗಿ ಎಲೆ ಸಂಪೂರ್ಣವಾಗಿ ಒಣಗುತ್ತದೆ.", icon: "🔥" }
        ],
        recommendations: [
          { step: 1, title: "ಯೂರಿಯಾ ಗೊಬ್ಬರ ಕಡಿಮೆ ಮಾಡಿ", desc: "ಸಾರಜನಕ ಹೆಚ್ಚಾದರೆ ರೋಗ ತೀವ್ರವಾಗುತ್ತದೆ, ಯೂರಿಯಾ ಸಿಂಪಡಿಸುವುದನ್ನು ನಿಲ್ಲಿಸಿ." },
          { step: 2, title: "ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲಿಸಿ", desc: "ಗದ್ದೆ ಒಣಗದಂತೆ 2-3 ಸೆಂ.ಮೀ ನೀರನ್ನು ನಿಲ್ಲಿಸಿ." },
          { step: 3, title: "ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ಸಿಂಪಡಿಸಿ", desc: "ಶಿಫಾರಸು ಮಾಡಿದ ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬೆಳಿಗ್ಗೆ ಸಿಂಪಡಿಸಿ." }
        ],
        prevention: [
          { title: "ಬೀಜೋಪಚಾರ", desc: "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಬೀಜಕ್ಕೆ ಸೂಡೋಮೊನಾಸ್ ಉಪಚಾರ ಮಾಡಿ." }
        ],
        audioText: "ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆಗೆ ಸ್ಮಾರ್ಟ್ ಕ್ರಾಪ್ ಡಾಕ್ಟರ್ ಕೃಷಿ ಸಲಹೆ. ತೊಂಬತ್ನಾಲ್ಕು ಪ್ರತಿಶತ ನಿಖರತೆಯೊಂದಿಗೆ ಭತ್ತದ ಬೆಂಕಿ ರೋಗ ಪತ್ತೆಯಾಗಿದೆ. ರೋಗದ ತೀವ್ರತೆ ಹೆಚ್ಚಾಗಿದೆ. ತಕ್ಷಣವೇ ಯೂರಿಯಾ ಗೊಬ್ಬರ ಕೊಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ, ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲಿಸಿ ಮತ್ತು ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ಸಿಂಪಡಿಸಿ."
      },

      te: {
        diseaseDisplay: "వరి అగ్గితెగులు (Rice Blast)",
        explanation: "వరి అగ్గితెగులు అత్యంత ప్రమాదకరమైన శిలీంధ్ర వ్యాధి. ఇది ఆకులపై కంటి ఆకారపు బూడిద-గోధుమ రంగు మచ్చలను కలిగిస్తుంది.",
        symptoms: [
          { id: "spindle", name: "కంటి ఆకారపు మచ్చలు", desc: "మధ్యలో బూడిద రంగు మరియు గోధుమ రంగు అంచులు కలిగిన మచ్చలు.", icon: "🔶" },
          { id: "burn", name: "ఆకులు ఎండిపోవడం", desc: "మచ్చలు కలిసిపోయి ఆకులు కాలిపోయినట్లు కనిపిస్తాయి.", icon: "🔥" }
        ],
        recommendations: [
          { step: 1, title: "యూరియా వాడకం తగ్గించండి", desc: "అధిక నత్రజని వాడకం ఆపండి." },
          { step: 2, title: "పొలంలో నీరు నిల్వ ఉంచండి", desc: "పొలం ఎండిపోకుండా 2-3 సెం.మీ నీరు ఉంచండి." },
          { step: 3, title: "ట్రైసైక్లాజోల్ పిచికారీ చేయండి", desc: "తెల్లవారుజామున ట్రైసైక్లాజోల్ మందు పిచికారీ చేయండి." }
        ],
        prevention: [
          { title: "విత్తన శుద్ధి", desc: "విత్తే ముందు సూడోమోనాస్తో విత్తన శుద్ధి చేయండి." }
        ],
        audioText: "మీ వరి పంట కోసం స్మార్ట్ క్రాప్ డాక్టర్ వ్యవసాయ సలహా. తొంబై నాలుగు శాతం ఖచ్చితత్వంతో వరి అగ్గితెగులు గుర్తించబడింది. తీవ్రత ఎక్కువగా ఉంది. వెంటనే అధిక యూరియా వాడకాన్ని నిలిపివేయండి మరియు ట్రైసైక్లాజోల్ మందును పిచికారీ చేయండి."
      },

      ta: {
        diseaseDisplay: "நெல் குலை நோய் (Rice Blast)",
        explanation: "நெல் குலை நோய் பயிரை கடுமையாக தாக்கும் பூஞ்சை நோயாகும். இது இலைகளில் கண் வடிவ சாம்பல்-பழுப்புப் புள்ளிகளை உண்டாக்குகிறது.",
        symptoms: [
          { id: "spindle", name: "கண் வடிவப் புள்ளிகள்", desc: "சாம்பல் நிற மையமும் பழுப்பு நிற விளிம்பும் கொண்ட புள்ளிகள்.", icon: "🔶" },
          { id: "burn", name: "இலைகள் கருகல்", desc: "புள்ளிகள் இணைந்து இலைகள் தீயில் கருகியது போல் மாறும்.", icon: "🔥" }
        ],
        recommendations: [
          { step: 1, title: "யூரியா பயன்பாட்டைக் குறைக்கவும்", desc: "அதிகப்படியான தழைச்சத்து உரங்களை உடனடியாக நிறுத்தவும்." },
          { step: 2, title: "வயலில் நீர் நிறுத்தவும்", desc: "வயல் காயாமல் 2-3 செ.மீ நீர் இருக்குமாறு பார்த்துக் கொள்ளவும்." },
          { step: 3, title: "டிரைசைக்ளோசோல் தெளிக்கவும்", desc: "பரிந்துரைக்கப்பட்ட டிரைசைக்ளோசோல் மருந்தை காலையில் தெளிக்கவும்." }
        ],
        prevention: [
          { title: "விதை நேர்த்தி", desc: "விதைப்பதற்கு முன் சூடோமோனாஸ் கொண்டு விதை நேர்த்தி செய்யவும்." }
        ],
        audioText: "உங்கள் நெல் பயிருக்கான ஸ்மார்ட் பயிர் டாக்டர் ஆலோசனை. தொண்ணூற்று நான்கு சதவீத துல்லியத்துடன் நெல் குலை நோய் கண்டறியப்பட்டுள்ளது. தீவிரத்தன்மை அதிகம். உடனடியாக அதிகப்படியான யூரியா பயன்பாட்டை நிறுத்திவிட்டு பரிந்துரைக்கப்பட்ட டிரைசைக்ளோசோல் மருந்தை தெளிக்கவும்."
      },

      hi: {
        diseaseDisplay: "धान का झोंका रोग (Rice Blast)",
        explanation: "धान का ब्लास्ट या झोंका एक विनाशकारी फफूंद रोग है। इसमें पत्तियों पर आंख या नाव के आकार के राख जैसे धब्बे बनते हैं।",
        symptoms: [
          { id: "spindle", name: "नाव के आकार के धब्बे", desc: "बीच में राख जैसे धूसर और किनारों पर भूरे धब्बे।", icon: "🔶" },
          { id: "burn", name: "पत्तियों का झुलसना", desc: "धब्बे मिलकर पूरी पत्ती को झुलसा देते हैं।", icon: "🔥" }
        ],
        recommendations: [
          { step: 1, title: "यूरिया का प्रयोग तुरंत रोकें", desc: "अत्यधिक नाइट्रोजन खाद पौधों को रोग के प्रति संवेदनशील बनाती है।" },
          { step: 2, title: "खेत में नमी बनाए रखें", desc: "खेत में 2-3 सेमी पानी का स्तर बनाए रखें।" },
          { step: 3, title: "ट्राइसाइक्लाजोल का छिड़काव", desc: "ट्राइसाइक्लाजोल 75% WP का सुबह शांत मौसम में छिड़काव करें।" }
        ],
        prevention: [
          { title: "बीज शोधन", desc: "बुवाई से पहले स्यूडोमोनास से बीज उपचार अवश्य करें।" }
        ],
        audioText: "आपकी धान की फसल के लिए स्मार्ट क्रॉप डॉक्टर की सलाह। चौरान्वे प्रतिशत सटीकता के साथ झोंका रोग की पहचान हुई है। रोग की गंभीरता अधिक है। कृपया यूरिया का अधिक उपयोग तुरंत रोकें, खेत में पानी का स्तर बनाए रखें और ट्राइसाइक्लाजोल का छिड़काव करें।"
      },

      ml: {
        diseaseDisplay: "നെല്ലിലെ കുമിൾ രോഗം (Rice Blast)",
        explanation: "നെല്ലിനെ ബാധിക്കുന്ന ഒരു പ്രധാന രോഗമാണ് ബ്ലാസ്റ്റ്. ഇലകളിൽ കണ്ണിന്റെ ആകൃതിയിലുള്ള പാടുകൾ ഉണ്ടാകുന്നു.",
        symptoms: [{ id: "spindle", name: "കണ്ണാകൃതിയിലുള്ള പാടുകൾ", desc: "തവിട്ടുനിറത്തിലുള്ള പാടുകൾ.", icon: "🔶" }],
        recommendations: [{ step: 1, title: "യൂറിയ കുറയ്ക്കുക", desc: "അമിത നൈട്രജൻ ഒഴിവാക്കുക." }],
        prevention: [{ title: "വിത്തുചികിത്സ", desc: "വിത്ത് പരിചരിക്കുക." }],
        audioText: "നിങ്ങളുടെ നെല്ലിന് സ്മാർട്ട് ക്രോപ്പ് ഡോക്ടർ ഉപദേശം. റൈസ് ബ്ലാസ്റ്റ് രോഗലക്ഷണങ്ങൾ കണ്ടെത്തി. യൂറിയയുടെ ഉപയോഗം കുറയ്ക്കുകയും കുമിൾനാശിനി തളിക്കുകയും ചെയ്യുക."
      },

      mr: {
        diseaseDisplay: "भातावरील करपा (Rice Blast)",
        explanation: "भातावरील करपा हा एक घातक बुरशीजन्य रोग आहे. पानांवर डोळ्याच्या आकाराचे करडे-तपकिरी डाग पडतात.",
        symptoms: [{ id: "spindle", name: "डोळ्यासारखे डाग", desc: "मध्यभागी राखाडी आणि कडेला तपकिरी डाग.", icon: "🔶" }],
        recommendations: [{ step: 1, title: "युरियाचा वापर थांबवा", desc: "अतिरिक्त नत्र देणे टाळा." }],
        prevention: [{ title: "बीजप्रक्रिया", desc: "पेरणीपूर्वी बीजप्रक्रिया करा." }],
        audioText: "तुमच्या भात पिकासाठी स्मार्ट क्रॉप डॉक्टरचा सल्ला. भातावरील करपा रोग आढळला आहे. युरियाचा वापर कमी करा आणि योग्य बुरशीनाशक फवारा."
      },

      bn: {
        diseaseDisplay: "ধানের ব্লাস্ট রোগ (Rice Blast)",
        explanation: "ধানের ব্লাস্ট একটি মারাত্মক ছত্রাকজনিত রোগ। এতে পাতায় চোখের মতো বা নৌকার মতো ধূসর দাগ তৈরি হয়।",
        symptoms: [{ id: "spindle", name: "চোখের মতো দাগ", desc: "মাঝখানে ছাই রঙের দাগ।", icon: "🔶" }],
        recommendations: [{ step: 1, title: "ইউরিয়ার ব্যবহার কমান", desc: "অতিরিক্ত নাইট্রোজেন সার দেওয়া বন্ধ করুন।" }],
        prevention: [{ title: "বীজ শোধন", desc: "বীজ শোধন করে বপন করুন।" }],
        audioText: "আপনার ধান ফসলের জন্য পরামর্শ। ধানের ব্লাস্ট রোগ শনাক্ত হয়েছে। অতিরিক্ত ইউরিয়া সার প্রয়োগ বন্ধ রাখুন এবং ছত্রাকনাশক স্প্রে করুন।"
      }
    }
  },

  {
    id: "chilli-leaf-curl",
    crop: "Chilli",
    cropCode: "chilli",
    cropEmoji: "🌶️",
    diseaseName: "Chilli Leaf Curl Virus",
    diseaseCode: "leaf_curl",
    confidence: 88,
    severity: "moderate",
    severityScore: 60,
    status: "needs_attention",
    image: "assets/images/hero-crop.jpg",
    boundingBox: { top: 20, left: 30, width: 45, height: 40 },

    locales: {
      en: {
        diseaseDisplay: "Possible Chilli Leaf Curl",
        explanation: "Chilli Leaf Curl is a viral disease transmitted by whiteflies and thrips. Leaves curl upward and plants become stunted.",
        symptoms: [
          { id: "curling", name: "Upward Leaf Curling", desc: "Leaves curl towards the sky and puckered.", icon: "🍃" }
        ],
        recommendations: [
          { step: 1, title: "Install Yellow Sticky Traps", desc: "Set up yellow traps to catch whiteflies." },
          { step: 2, title: "Spray Neem Formulation", desc: "Apply organic Neem oil (3ml/L)." }
        ],
        prevention: [{ title: "Border Crops", desc: "Plant maize as barrier." }],
        audioText: "Smart Crop Doctor advisory for your Chilli crop. We detected possible Chilli Leaf Curl with 88 percent confidence. Severity is moderate. Control whitefly vectors by installing yellow sticky traps and spraying neem oil."
      },

      kn: {
        diseaseDisplay: "ಮೆಣಸಿನಕಾಯಿ ಎಲೆ ಮುರುಟು ರೋಗ (Leaf Curl)",
        explanation: "ಮೆಣಸಿನಕಾಯಿ ಎಲೆ ಮುರುಟು ರೋಗವು ನುಸಿ ಮತ್ತು ಬಿಳಿ ನೊಣಗಳಿಂದ ಹರಡುವ ವೈರಸ್ ರೋಗವಾಗಿದೆ. ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಮುದುರಿಕೊಳ್ಳುತ್ತವೆ.",
        symptoms: [
          { id: "curling", name: "ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಮುದುರುವುದು", desc: "ಎಲೆಗಳು ದೋಣಿಯಂತೆ ಮುದುಡಿ ಬೆಳವಣಿಗೆ ಕುಂಠಿತವಾಗುತ್ತದೆ.", icon: "🍃" }
        ],
        recommendations: [
          { step: 1, title: "ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ", desc: "ಬಿಳಿ ನೊಣಗಳನ್ನು ಹಿಡಿಯಲು ಎಕರೆಗೆ 10-12 ಹಳದಿ ಬಲೆ ಹಾಕಿ." },
          { step: 2, title: "ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ", desc: "ಬೇವಿನ ಕಷಾಯ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ." }
        ],
        prevention: [{ title: "ಗಡಿ ಬೆಳೆಗಳು", desc: "ಹೊಲದ ಸುತ್ತ ಜೋಳ ಅಥವಾ ಮೆಕ್ಕೆಜೋಳ ಬೆಳೆಯಿರಿ." }],
        audioText: "ನಿಮ್ಮ ಮೆಣಸಿನಕಾಯಿ ಬೆಳೆಗೆ ಕೃಷಿ ಸಲಹೆ. ಎಲೆ ಮುರುಟು ರೋಗದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿವೆ. ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ ಮತ್ತು ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ."
      },

      te: {
        diseaseDisplay: "మిరప ఆకుముడత తెగులు (Leaf Curl)",
        explanation: "మిరప ఆకుముడత అనేది తెల్లదోమల ద్వారా వ్యాపించే వైరస్ తెగులు. ఆకులు పైకి ముడుచుకుపోతాయి.",
        symptoms: [{ id: "curling", name: "ఆకులు పైకి ముడుచుకోవడం", desc: "ఆకులు దోనె ఆకారంలో ముడుచుకుంటాయి.", icon: "🍃" }],
        recommendations: [{ step: 1, title: "పసుపు జిగురు బుట్టలు అమర్చండి", desc: "తెల్లదోమల నివారణకు పసుపు ట్రాప్స్ వాడండి." }],
        prevention: [{ title: "సరిహద్దు పంటలు", desc: "పొలం చుట్టూ జొన్న లేదా మొక్కజొన్న వేయండి." }],
        audioText: "మీ మిరప పంట కోసం సలహా. ఆకుముడత తెగులు లక్షణాలు గుర్తించబడ్డాయి. పసుపు జిగురు బుట్టలు అమర్చి వేపనూనె పిచికారీ చేయండి."
      },

      ta: {
        diseaseDisplay: "மிளகாய் இலைச்சுருட்டல் நோய் (Leaf Curl)",
        explanation: "மிளகாய் இலைச்சுருட்டல் என்பது வெள்ளை ஈக்களால் பரவும் வைரஸ் நோயாகும். இலைகள் மேல்நோக்கி சுருண்டு விடும்.",
        symptoms: [{ id: "curling", name: "இலை சுருங்குதல்", desc: "இலைகள் மேல்நோக்கி சுருண்டு காய் உற்பத்தி குறையும்.", icon: "🍃" }],
        recommendations: [{ step: 1, title: "மஞ்சள் ஒட்டும் பொறிகள் வைக்கவும்", desc: "வெள்ளை ஈக்களைக் கட்டுப்படுத்த பொறிகள் அமைக்கவும்." }],
        prevention: [{ title: "எல்லைப் பயிர்கள்", desc: "வரப்புகளில் சோளம் நடவும்." }],
        audioText: "உங்கள் மிளகாய் பயிருக்கான ஆலோசனை. இலைச்சுருட்டல் நோய் கண்டறியப்பட்டுள்ளது. மஞ்சள் ஒட்டும் பொறிகள் அமைத்து வேப்ப எண்ணெய் தெளிக்கவும்."
      },

      hi: {
        diseaseDisplay: "मिर्च का पर्ण कुंचन (Leaf Curl)",
        explanation: "मिर्च का लीफ कर्ल या मरोड़िया रोग सफेद मक्खी द्वारा फैलता है। पत्तियां ऊपर की ओर मुड़ जाती हैं।",
        symptoms: [{ id: "curling", name: "पत्तियों का ऊपर मुड़ना", desc: "पत्तियां नाव के आकार में मुड़ जाती हैं।", icon: "🍃" }],
        recommendations: [{ step: 1, title: "पीले चिपचिपे ट्रैप लगाएं", desc: "सफेद मक्खी नियंत्रण के लिए पीले ट्रैप लगाएं।" }],
        prevention: [{ title: "सीमांत फसलें", desc: "खेत के चारों ओर मक्का या ज्वार लगाएं।" }],
        audioText: "आपकी मिर्च की फसल के लिए सलाह। मरोड़िया रोग के लक्षण दिखे हैं। सफेद मक्खी नियंत्रण के लिए पीले ट्रैप लगाएं और नीम का तेल छिड़कें।"
      },

      ml: {
        diseaseDisplay: "മുളക് ഇലച്ചുരുൾ രോഗം (Leaf Curl)",
        explanation: "വെള്ളീച്ച പരത്തുന്ന ഒരു വൈറസ് രോഗമാണ് ഇലച്ചുരുൾ.",
        symptoms: [{ id: "curling", name: "ഇല ചുരുളൽ", desc: "ഇലകൾ മുകളിലേക്ക് ചുരുളുന്നു.", icon: "🍃" }],
        recommendations: [{ step: 1, title: "മഞ്ഞക്കെണി സ്ഥാപിക്കുക", desc: "വെള്ളീച്ചകളെ പിടിക്കാൻ മഞ്ഞക്കെണി വയ്ക്കുക." }],
        prevention: [{ title: "വേലിവിളകൾ", desc: "ചോളമോ ചാമയോ നടുക." }],
        audioText: "നിങ്ങളുടെ മുളക് വിളയ്ക്കുള്ള ഉപദേശം. ഇലച്ചുരുൾ രോഗലക്ഷണങ്ങൾ കണ്ടെത്തി. മഞ്ഞക്കെണികൾ സ്ഥാപിക്കുകയും വേപ്പെണ്ണ തളിക്കുകയും ചെയ്യുക."
      },

      mr: {
        diseaseDisplay: "मिरचीवरील चुरडा-मुरडा (Leaf Curl)",
        explanation: "मिरचीवरील चुरडा मुरडा हा पांढऱ्या माशीमुळे पसरणारा विषाणूजन्य रोग आहे.",
        symptoms: [{ id: "curling", name: "पाने वर वळणे", desc: "पाने वाटीच्या आकारासारखी वर वळतात.", icon: "🍃" }],
        recommendations: [{ step: 1, title: "पिवळे चिकट सापळे लावा", desc: "पांढऱ्या माशीच्या नियंत्रणासाठी सापळे वापरा." }],
        prevention: [{ title: "संरक्षक पिके", desc: "मका किंवा ज्वारी लावा." }],
        audioText: "तुमच्या मिरची पिकासाठी सल्ला. चुरडा मुरडा रोगाची लक्षणे आढळली आहेत. पिवळे चिकट सापळे लावा आणि निंबोळी अर्क फवारा."
      },

      bn: {
        diseaseDisplay: "মরিচের পাতা কোঁকড়ানো (Leaf Curl)",
        explanation: "মরিচের পাতা কোঁকড়ানো রোগ সাদা মাছি দ্বারা বাহিত একটি ভাইরাস রোগ।",
        symptoms: [{ id: "curling", name: "পাতা উপরের দিকে কোঁকড়ানো", desc: "গাছের বৃদ্ধি বন্ধ হয়ে যায়।", icon: "🍃" }],
        recommendations: [{ step: 1, title: "হলুদ আঠালো ফাঁদ পাতুন", desc: "সাদা মাছি দমনে ফাঁদ ব্যবহার করুন।" }],
        prevention: [{ title: "সীমানা ফসল", desc: "ভূট্টা রোপণ করুন।" }],
        audioText: "আপনার মরিচ ফসলের জন্য পরামর্শ। পাতা কোঁকড়ানো রোগের লক্ষণ শনাক্ত হয়েছে। হলুদ ফাঁদ ব্যবহার করুন এবং নিম তেল স্প্রে করুন।"
      }
    }
  },

  {
    id: "healthy-maize",
    crop: "Maize / Corn",
    cropCode: "maize",
    cropEmoji: "🌽",
    diseaseName: "Healthy Crop (No Disease Detected)",
    diseaseCode: "healthy",
    confidence: 97,
    severity: "low",
    severityScore: 10,
    status: "healthy",
    image: "assets/images/hero-crop.jpg",
    boundingBox: null,

    locales: {
      en: {
        diseaseDisplay: "Healthy Plant",
        explanation: "The analyzed crop leaf displays vibrant green pigmentation, clean margins, and no observable fungal, bacterial, or pest damage.",
        symptoms: [
          { id: "color", name: "Vibrant Deep Green", desc: "Uniform chlorophyll distribution across leaf blade.", icon: "✨" }
        ],
        recommendations: [
          { step: 1, title: "Continue Regular Irrigation", desc: "Maintain standard scheduled watering at silking stage." }
        ],
        prevention: [{ title: "Soil Health", desc: "Apply balanced micronutrients as per soil health card." }],
        audioText: "Great news from Smart Crop Doctor! Your Maize crop appears very healthy with 97 percent confidence. Continue your current irrigation and nutrient schedule."
      },

      kn: {
        diseaseDisplay: "ಆರೋಗ್ಯಕರ ಬೆಳೆ (Healthy Plant)",
        explanation: "ಪರೀಕ್ಷಿಸಲಾದ ಎಲೆಯು ಯಾವುದೇ ಶಿಲೀಂಧ್ರ ಅಥವಾ ಕೀಟ ಬಾಧೆಯಿಲ್ಲದೆ ಅತ್ಯಂತ ಆರೋಗ್ಯಕರ ಹಸಿರು ಬಣ್ಣದಿಂದ ಕೂಡಿದೆ.",
        symptoms: [{ id: "color", name: "ಉತ್ತಮ ಹಸಿರು ಬಣ್ಣ", desc: "ಸಂಪೂರ್ಣ ಎಲೆಯು ಆರೋಗ್ಯಕರವಾಗಿದೆ.", icon: "✨" }],
        recommendations: [{ step: 1, title: "ನಿಯಮಿತ ನೀರಾವರಿ ಮುಂದುವರಿಸಿ", desc: "ಪ್ರಸ್ತುತ ವೇಳಾಪಟ್ಟಿಯಂತೆ ನೀರು ಹಾಯಿಸಿ." }],
        prevention: [{ title: "ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ", desc: "ಸೂಕ್ತ ರಸಗೊಬ್ಬರ ನೀಡಿ." }],
        audioText: "ಸ್ಮಾರ್ಟ್ ಕ್ರಾಪ್ ಡಾಕ್ಟರ್ ಕಡೆಯಿಂದ ಸಂತಸದ ಸುದ್ದಿ! ನಿಮ್ಮ ಮೆಕ್ಕೆಜೋಳದ ಬೆಳೆ ತೊಂಬತ್ತೇಳು ಪ್ರತಿಶತ ನಿಖರತೆಯೊಂದಿಗೆ ಅತ್ಯಂತ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಎಂದಿನಂತೆ ನೀರಾವರಿ ಮತ್ತು ಪೋಷಕಾಂಶಗಳನ್ನು ಮುಂದುವರಿಸಿ."
      },

      te: {
        diseaseDisplay: "ఆరోగ్యకరమైన పంట (Healthy Plant)",
        explanation: "పరీక్షించిన ఆకు ఎటువంటి తెగులు లక్షణాలు లేకుండా చాలా ఆరోగ్యంగా మరియు పచ్చగా ఉంది.",
        symptoms: [{ id: "color", name: "మంచి పచ్చదనం", desc: "ఎటువంటి మచ్చలు లేవు.", icon: "✨" }],
        recommendations: [{ step: 1, title: "సాధారణ నీటిపారుదల కొనసాగించండి", desc: "ఎప్పటిలాగే నీరందించండి." }],
        prevention: [{ title: "పోషకాలు", desc: "సరైన పోషకాలు అందించండి." }],
        audioText: "స్మార్ట్ క్రాప్ డాక్టర్ నుండి శుభవార్త! మీ మొక్కజొన్న పంట తొంబై ఏడు శాతం ఖచ్చితత్వంతో చాలా ఆరోగ్యంగా ఉంది. మీ ప్రస్తుత సాగు పద్ధతులను కొనసాగించండి."
      },

      ta: {
        diseaseDisplay: "ஆரோக்கியமான பயிர் (Healthy Plant)",
        explanation: "ஆய்வு செய்யப்பட்ட இலை எந்தவித பூச்சி அல்லது பூஞ்சை பாதிப்பும் இன்றி நல்ல ஆரோக்கியத்துடன் உள்ளது.",
        symptoms: [{ id: "color", name: "அடர்ந்த பச்சை நிறம்", desc: "ஆரோக்கியமான வளர்ச்சி.", icon: "✨" }],
        recommendations: [{ step: 1, title: "வழக்கமான நீர்ப்பாசனம் தொடரவும்", desc: "சரியான நேரத்தில் நீர் பாய்ச்சவும்." }],
        prevention: [{ title: "மண் வளம்", desc: "சத்துக்களை முறையாக இடவும்." }],
        audioText: "ஸ்மார்ட் பயிர் டாக்டர் வழங்கும் நற்செய்தி! உங்கள் மக்காச்சோளப் பயிர் தொண்ணூற்று ஏழு சதவீத துல்லியத்துடன் மிகவும் ஆரோக்கியமாக உள்ளது. உங்கள் வழக்கமான பராமரிப்பைத் தொடரவும்."
      },

      hi: {
        diseaseDisplay: "स्वस्थ फसल (Healthy Plant)",
        explanation: "जांच की गई पत्ती पूरी तरह स्वस्थ है और इसमें किसी भी रोग या कीट का कोई लक्षण नहीं पाया गया है।",
        symptoms: [{ id: "color", name: "गहरा हरा रंग", desc: "पत्ती पर कोई धब्बा नहीं है।", icon: "✨" }],
        recommendations: [{ step: 1, title: "नियमित सिंचाई जारी रखें", desc: "समय पर पानी और खाद देते रहें।" }],
        prevention: [{ title: "मिट्टी स्वास्थ्य", desc: "संतुलित उर्वरक का प्रयोग करें।" }],
        audioText: "स्मार्ट क्रॉप डॉक्टर से अच्छी खबर! आपकी मक्का की फसल संतान्वे प्रतिशत सटीकता के साथ पूरी तरह स्वस्थ है। अपनी वर्तमान सिंचाई और पोषण प्रबंधन को जारी रखें।"
      },

      ml: {
        diseaseDisplay: "ആരോഗ്യമുള്ള വിള (Healthy Plant)",
        explanation: "വിള പൂർണ്ണമായും ആരോഗ്യകരമാണ്.",
        symptoms: [{ id: "color", name: "പച്ചപ്പ്", desc: "രോഗലക്ഷണങ്ങളില്ല.", icon: "✨" }],
        recommendations: [{ step: 1, title: "നന തുടരുക", desc: "കൃത്യമായി നനയ്ക്കുക." }],
        prevention: [{ title: "വളം", desc: "ശരിയായ അളവിൽ വളം നൽകുക." }],
        audioText: "നല്ല വാർത്ത! നിങ്ങളുടെ ചോളം വിള പൂർണ്ണമായും ആരോഗ്യകരമാണ്. പതിവ് പരിചരണം തുടരുക."
      },

      mr: {
        diseaseDisplay: "निरोगी पीक (Healthy Plant)",
        explanation: "तपासलेले पान पूर्णपणे निरोगी असून रोगाचे कोणतेही लक्षण नाही.",
        symptoms: [{ id: "color", name: "हिरवेगार पान", desc: "उत्तम वाढ.", icon: "✨" }],
        recommendations: [{ step: 1, title: "नियमित पाणी द्या", desc: "वेळेवर पाणी व खते द्या." }],
        prevention: [{ title: "खत व्यवस्थापन", desc: "योग्य खते वापरा." }],
        audioText: "आनंदाची बातमी! तुमचे मका पीक सत्त्याण्णव टक्के अचूकतेसह पूर्णपणे निरोगी आहे. नेहमीप्रमाणे पाणी व खत व्यवस्थापन चालू ठेवा."
      },

      bn: {
        diseaseDisplay: "সুস্থ ফসল (Healthy Plant)",
        explanation: "পরীক্ষিত পাতাটি সম্পূর্ণ সুস্থ ও রোগমুক্ত।",
        symptoms: [{ id: "color", name: "সবুজ পাতা", desc: "কোনো রোগ নেই।", icon: "✨" }],
        recommendations: [{ step: 1, title: "নিয়মিত সেচ দিন", desc: "সময়মতো সেচ ও সার দিন।" }],
        prevention: [{ title: "পুষ্টি ব্যবস্থাপনা", desc: "সুষম সার দিন।" }],
        audioText: "সুসংবাদ! আপনার ভুট্টা ফসল ৯৭ শতাংশ নির্ভুলতার সাথে সম্পূর্ণ সুস্থ রয়েছে। আপনার নিয়মিত যত্ন চালিয়ে যান।"
      }
    }
  }
];

/**
 * Helper to get active localized diagnostic data based on current language
 */
export function getLocalizedCropData(scan, langCode = 'en') {
  if (!scan) return sampleCrops[0].locales.en;
  
  const locales = scan.locales || (sampleCrops.find(c => c.id === scan.id) || sampleCrops[0]).locales;
  if (!locales) {
    return {
      diseaseDisplay: scan.diseaseDisplay || "Possible Crop Disease",
      explanation: scan.explanation || "",
      symptoms: scan.symptoms || [],
      recommendations: scan.recommendations || [],
      prevention: scan.prevention || [],
      audioText: scan.audioText || ""
    };
  }

  return locales[langCode] || locales.en;
}
