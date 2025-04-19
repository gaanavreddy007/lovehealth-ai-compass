// AI Service for Health Chatbot
// This service handles communication with OpenAI API - optimized for low token usage

interface AIServiceResponse {
  text: string;
  success: boolean;
  error?: string;
}

// Gemini API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; // Use environment variable
const GEMINI_API_URL = "http://localhost:5174/api/gemini"; // Use backend proxy endpoint

// OpenAI API configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ""; // Use environment variable
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Health-specific knowledge base for fallback responses
const healthFallbackResponses = {
  general: [
    "I'm here to help with general health questions. Could you provide more details about your concern?",
    "I can provide basic health information. What specific symptoms or health topic are you interested in?",
    "I'm your health assistant Ayu. I can help with basic health guidance. What would you like to know?",
  ],
  symptoms: [
    "For many common symptoms, rest, hydration, and over-the-counter medications can help. Could you describe your symptoms in more detail?",
    "I can provide general information about common symptoms. What are you experiencing?",
    "Understanding your symptoms helps me provide better guidance. Could you tell me more about what you're feeling?",
  ],
  emergency: [
    "This sounds serious. Please contact emergency services (108) or visit the nearest emergency room immediately.",
    "For severe symptoms like these, please seek immediate medical attention rather than waiting for online advice.",
    "Your symptoms require professional medical evaluation. Please contact a healthcare provider right away.",
  ],
};

// Utility to determine if AI is enabled (for demo: checks if API key is present)
function isAIEnabled() {
  return !!OPENAI_API_KEY && OPENAI_API_KEY !== "demo";
}

/**
 * Generate a response from the AI based on user input
 */
export async function generateAIResponse(
  userMessage: string, 
  conversationContext: string[] = [],
  language: string = "en"
): Promise<AIServiceResponse> {
  // First check if this might be a medical emergency
  if (checkMedicalUrgency(userMessage)) {
    return {
      text: getEmergencyResponse(language),
      success: true
    };
  }

  // Always check for basic symptoms and provide a hardcoded response if matched
  const hardcoded = getBasicSymptomResponse(userMessage, language);
  if (hardcoded) {
    return {
      text: hardcoded,
      success: true
    };
  }

  // --- Gemini API integration (via backend proxy) ---
  try {
    const geminiBody = {
      contents: [
        { role: "user", parts: [{ text: userMessage }] },
        ...conversationContext.map(msg => ({ role: "model", parts: [{ text: msg }] }))
      ]
    };
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(geminiBody)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", response.status, errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }
    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (aiResponse) {
      return {
        text: aiResponse,
        success: true
      };
    }
  } catch (error) {
    console.error("Gemini AI Service Error:", error);
    // fallback to hardcoded below
  }

  // If Gemini API fails, fallback to hardcoded
  return {
    text: getHardcodedAIChatResponse(userMessage, language),
    success: false,
    error: "Gemini API unavailable, using hardcoded fallback."
  };
}

// Hardcoded fallback for when AI is not enabled
function getHardcodedAIChatResponse(userMessage: string, language: string): string {
  // Simple rule-based hardcoded responses
  const messageLower = userMessage.toLowerCase();
  if (checkMedicalUrgency(userMessage)) {
    return getEmergencyResponse(language);
  }
  if (messageLower.includes("fever") || messageLower.includes("cold") || messageLower.includes("cough")) {
    if (language === "te") {
      return "మీరు జ్వరం లేదా దగ్గు అనుభవిస్తుంటే, దయచేసి విశ్రాంతి తీసుకోండి, తగినంత నీరు త్రాగండి, అవసరమైతే పారాసెటమాల్ తీసుకోండి. లక్షణాలు కొనసాగితే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಜ್ವರ ಅಥವಾ ಕೆಮ್ಮು ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ದಯವಿಟ್ಟು ವಿಶ್ರಾಂತಿ ಮಾಡಿ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಪ್ಯಾರಾಸಿಟಮಾಲ್ ತೆಗೆದುಕೊಳ್ಳಿ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you are experiencing fever or cough, please rest, drink plenty of fluids, and take paracetamol if needed. If symptoms persist, consult a doctor.";
  }
  if (messageLower.includes("headache")) {
    if (language === "te") {
      return "తల నొప్పి కోసం, విశ్రాంతి తీసుకోండి మరియు తగినంత నీరు త్రాగండి. తీవ్రమైన లేదా కొనసాగుతున్న తల నొప్పికి డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ತಲೆನೋವಿಗೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ತೀವ್ರವಾದ ಅಥವಾ ಮುಂದುವರಿದ ತಲೆನೋವಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For headaches, rest and hydrate well. If the headache is severe or persistent, consult a doctor.";
  }
  // Default
  if (language === "te") {
    return "నేను ఆరోగ్య సంబంధిత ప్రశ్నలకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీ ఆందోళన గురించి మరిన్ని వివరాలు చెప్పగలరా?";
  } else if (language === "kn") {
    return "ನಾನು ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನಿಮ್ಮ ಕಾಳಜಿಯ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ನೀಡಬಹುದೇ?";
  }
  return "I'm Ayu, your health companion. I can help with basic health questions. Could you provide more details about your concern?";
}

/**
 * Provide a fallback response when the API is unavailable
 */
function provideFallbackResponse(userMessage: string, language: string): AIServiceResponse {
  const messageLower = userMessage.toLowerCase();
  let category = "general";
  
  // Determine the type of fallback response based on the message content
  if (messageLower.includes("symptom") || 
      messageLower.includes("pain") || 
      messageLower.includes("fever") || 
      messageLower.includes("headache") ||
      messageLower.includes("cough") ||
      messageLower.includes("cold")) {
    category = "symptoms";
  }
  
  // Get a random response from the appropriate category
  const responses = healthFallbackResponses[category as keyof typeof healthFallbackResponses];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Translate the response if needed
  let translatedResponse = randomResponse;
  
  if (language === "te") {
    // Simple Telugu translations for fallback responses
    if (category === "general") {
      translatedResponse = "నేను ఆరోగ్య సంబంధిత ప్రశ్నలకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీ ఆందోళన గురించి మరిన్ని వివరాలు అందించగలరా?";
    } else if (category === "symptoms") {
      translatedResponse = "చాలా సాధారణ లక్షణాలకు, విశ్రాంతి, హైడ్రేషన్ మరియు కౌంటర్ మందులు సహాయపడతాయి. మీ లక్షణాలను మరింత వివరంగా వివరించగలరా?";
    }
  } else if (language === "kn") {
    // Simple Kannada translations for fallback responses
    if (category === "general") {
      translatedResponse = "ನಾನು ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನಿಮ್ಮ ಕಾಳಜಿಯ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ನೀಡಬಹುದೇ?";
    } else if (category === "symptoms") {
      translatedResponse = "ಹಲವಾರು ಸಾಮಾನ್ಯ ರೋಗಲಕ್ಷಣಗಳಿಗೆ, ವಿಶ್ರಾಂತಿ, ಹೈಡ್ರೇಷನ್ ಮತ್ತು ಕೌಂಟರ್ ಔಷಧಿಗಳು ಸಹಾಯ ಮಾಡಬಹುದು. ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಹೆಚ್ಚು ವಿವರವಾಗಿ ವಿವರಿಸಬಹುದೇ?";
    }
  }
  
  return {
    text: translatedResponse,
    success: false,
    error: "API connection failed"
  };
}

// Returns a hardcoded message for basic symptoms, or null if no match
function getBasicSymptomResponse(userMessage: string, language: string): string | null {
  const messageLower = userMessage.toLowerCase();

  // Fever
  if (messageLower.includes("fever") || messageLower.includes("temperature")) {
    if (language === "te") {
      return "మీరు జ్వరం అనుభవిస్తుంటే, విశ్రాంతి తీసుకోండి, తగినంత నీరు త్రాగండి, మరియు అవసరమైతే పారాసెటమాల్ తీసుకోండి. లక్షణాలు కొనసాగితే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಜ್ವರ ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಪ್ಯಾರಾಸಿಟಮಾಲ್ ತೆಗೆದುಕೊಳ್ಳಿ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have a fever, please rest, drink plenty of fluids, and take paracetamol if needed. If symptoms persist, consult a doctor.";
  }

  // Cold
  if (messageLower.includes("cold") || messageLower.includes("runny nose") || messageLower.includes("sneezing")) {
    if (language === "te") {
      return "మీరు జలుబు అనుభవిస్తుంటే, తగినంత విశ్రాంతి తీసుకోండి మరియు నీరు త్రాగండి. లక్షణాలు కొనసాగితే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಜಲದೋಷ ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have a cold, rest and drink water. If symptoms persist, consult a doctor.";
  }

  // Cough
  if (messageLower.includes("cough")) {
    if (language === "te") {
      return "మీరు దగ్గు అనుభవిస్తుంటే, తగినంత నీరు త్రాగండి మరియు అవసరమైతే తేలికపాటి దగ్గు మందులు వాడండి. తీవ్రమైన దగ్గు ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಕೆಮ್ಮು ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಸೌಮ್ಯ ಕೆಮ್ಮು ಔಷಧಿ ಬಳಸಿ. ತೀವ್ರವಾದ ಕೆಮ್ಮಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have a cough, drink plenty of water and use mild cough syrup if needed. For severe cough, consult a doctor.";
  }

  // Headache
  if (messageLower.includes("headache")) {
    if (language === "te") {
      return "తల నొప్పి కోసం, విశ్రాంతి తీసుకోండి మరియు తగినంత నీరు త్రాగండి. తీవ్రమైన లేదా కొనసాగుతున్న తల నొప్పికి డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ತಲೆನೋವಿಗೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ತೀವ್ರವಾದ ಅಥವಾ ಮುಂದುವರಿದ ತಲೆನೋವಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For headaches, rest and hydrate well. If the headache is severe or persistent, consult a doctor.";
  }

  // Stomach pain
  if ((messageLower.includes("stomach") && messageLower.includes("pain")) || messageLower.includes("abdominal pain")) {
    if (language === "te") {
      return "పేగు నొప్పికి తేలికపాటి ఆహారం తీసుకోండి మరియు తగినంత నీరు త్రాగండి. తీవ్రమైన నొప్పి ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಹುಜುಕಿನಲ್ಲಿ ನೋವು ಇದ್ದರೆ, ಲಘು ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ತೀವ್ರವಾದ ನೋವಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For stomach pain, eat light food and drink water. For severe pain, consult a doctor.";
  }

  // Sore throat
  if (messageLower.includes("sore throat") || messageLower.includes("throat pain")) {
    if (language === "te") {
      return "గొంతు నొప్పికి గోరువెచ్చని నీరు త్రాగండి మరియు ఉప్పు నీటితో గార్గిల్ చేయండి. తీవ్రమైన నొప్పి ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಕಂಠನೋವಿಗೆ ಬಿಸಿ ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಉಪ್ಪು ನೀರಿನಿಂದ ಗಾರ್ಗಲ್ ಮಾಡಿ. ತೀವ್ರವಾದ ನೋವಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For sore throat, drink warm water and gargle with salt water. For severe pain, consult a doctor.";
  }

  // Diarrhea
  if (messageLower.includes("diarrhea") || messageLower.includes("loose motion")) {
    if (language === "te") {
      return "డయ్యరీయా ఉన్నప్పుడు, తగినంత నీరు త్రాగండి మరియు తేలికపాటి ఆహారం తీసుకోండి. డీహైడ్రేషన్ ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಅತಿಸಾರ ಇದ್ದರೆ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಲಘು ಆಹಾರ ಸೇವಿಸಿ. ಡಿಹೈಡ್ರೇಶನ್ ಇದ್ದರೆ ವೈದ್ಯರನ್నು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For diarrhea, drink plenty of water and eat light food. If you have dehydration, consult a doctor.";
  }

  // Vomiting
  if (messageLower.includes("vomiting") || messageLower.includes("nausea")) {
    if (language === "te") {
      return "వాంతులు ఉన్నప్పుడు, తగినంత నీరు త్రాగండి మరియు తేలికపాటి ఆహారం తీసుకోండి. తీవ్రమైన వాంతులు ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಬೇಸರ ಅಥವಾ ವಾಂತಿ ಇದ್ದರೆ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಲಘು ಆಹಾರ ಸೇವಿಸಿ. ತೀವ್ರವಾದ ವಾಂತಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For vomiting or nausea, drink water and eat light food. For severe vomiting, consult a doctor.";
  }

  // Back pain
  if (messageLower.includes("back pain")) {
    if (language === "te") {
      return "వెనుక నొప్పికి విశ్రాంతి తీసుకోండి మరియు తగినంత నీరు త్రాగండి. తీవ్రమైన నొప్పి ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಹಿಂದಿನ ನೋವಿಗೆ ವಿಶ್ರಾಂತಿ ಮಾಡಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ತೀವ್ರವಾದ ನೋವಿಗೆ ವೈದ್ಯರನ್నು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For back pain, rest and hydrate. For severe pain, consult a doctor.";
  }

  // Rash
  if (messageLower.includes("rash") || messageLower.includes("skin irritation")) {
    if (language === "te") {
      return "చర్మంపై దద్దుర్లు ఉంటే, శుభ్రంగా ఉంచండి మరియు దురద నివారించండి. తీవ్రమైన దద్దుర్లు ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಚರ್ಮದ ಮೇಲೆ ದದ್ದು ಇದ್ದರೆ, ಸ್ವಚ್ಛವಾಗಿರಿಸಿ ಮತ್ತು ಉರಿ ತಪ್ಪಿಸಿ. ತೀವ್ರವಾದ ದದ್ದು ಇದ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For skin rashes, keep the area clean and avoid scratching. For severe rash, consult a doctor.";
  }

  // Dizziness
  if (messageLower.includes("dizzy") || messageLower.includes("dizziness")) {
    if (language === "te") {
      return "తలనొప్పి లేదా తలనిప్పు ఉంటే, విశ్రాంతి తీసుకోండి మరియు తగినంత నీరు త్రాగండి. తీవ్రమైన తలనొప్పి ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ತಲೆಸುತ್ತು ಇದ್ದರೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀరು ಕುಡಿಯಿರಿ. ತೀವ್ರವಾದ ತಲೆಸುತ್ತಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you feel dizzy, rest and hydrate. For severe dizziness, consult a doctor.";
  }

  // Eye pain
  if (messageLower.includes("eye pain") || messageLower.includes("eye irritation")) {
    if (language === "te") {
      return "కళ్ల నొప్పికి కళ్లను శుభ్రంగా ఉంచండి మరియు ఎక్కువగా రుద్దకుండా ఉండండి. తీవ్రమైన నొప్పి ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಕಣ್ಣಿನ ನೋವಿಗೆ ಕಣ್ಣುಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿರಿಸಿ ಮತ್ತು ಹೆಚ್ಚು ಒತ್ತಡ ನೀಡಬೇಡಿ. ತೀವ್ರವಾದ ನೋವಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For eye pain, keep your eyes clean and avoid rubbing. For severe pain, consult a doctor.";
  }

  // Chest pain
  if (messageLower.includes("chest pain")) {
    if (language === "te") {
      return "ఛాతీ నొప్పి తీవ్రమైనదైతే వెంటనే అత్యవసర సేవలను సంప్రదించండి. తక్కువ తీవ్రతの場合でも డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಛಾತಿ ನೋವು ತೀವ್ರವಾಗಿದ್ದರೆ ತಕ್ಷಣ ತುರ್ತು ಸೇವೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ. ಕಡಿಮೆ ತೀವ್ರತೆ ಇದ್ದರೂ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have severe chest pain, contact emergency services immediately. Even for mild pain, consult a doctor.";
  }

  // Default
  return null;
}

// Function to determine if user's message potentially needs medical attention
export function checkMedicalUrgency(message: string): boolean {
  const urgentKeywords = [
    "emergency", "severe pain", "chest pain", "trouble breathing", "unconscious", 
    "collapsed", "seizure", "stroke", "heart attack", "bleeding heavily", 
    "suicide", "poisoning", "overdose", "trauma", "critical", "can't breathe",
    "not breathing", "unresponsive", "severe bleeding", "head injury",
    "broken bone", "fracture", "accident", "ambulance"
  ];
  
  const messageLower = message.toLowerCase();
  return urgentKeywords.some(keyword => messageLower.includes(keyword));
}

// Function to get an emergency response
export function getEmergencyResponse(language: string = "en"): string {
  switch(language) {
    case "te":
      return "ఇది ఒక వైద్య అత్యవసర పరిస్థితి లాగా అనిపిస్తోంది. దయచేసి వెంటనే 108కి కాల్ చేయండి లేదా సమీపంలోని అత్యవసర విభాగానికి వెళ్లండి. ఈ పరిస్థితులలో AI సలహా కంటే వైద్య నిపుణుల వ్యక్తిగత సంరక్షణ అవసరం.";
    case "kn":
      return "ಇದು ವೈದ್ಯಕೀಯ ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಂತೆ ಕಾಣುತ್ತಿದೆ. ದಯವಿಟ್ಟು 108 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಹತ್ತಿರದ ತುರ್ತು ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ. ಈ ಸಂದರ್ಭಗಳಲ್ಲಿ AI ಸಲಹೆಗಿಂತ ವೈದ್ಯಕೀಯ ತಜ್ಞರಿಂದ ವೈಯಕ್ತಿಕ ಆರೈಕೆಯ ಅಗತ್ಯವಿದೆ.";
    default:
      return "This appears to be a medical emergency. Please call 108 immediately or go to the nearest emergency department. These situations require personal care from medical professionals rather than AI advice.";
  }
}