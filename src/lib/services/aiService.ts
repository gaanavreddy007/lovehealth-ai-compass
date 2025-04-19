// AI Service for Health Chatbot
// This service handles communication with OpenAI API - optimized for low token usage

interface AIServiceResponse {
  text: string;
  success: boolean;
  error?: string;
}

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

  // If AI is not enabled, return a generic hardcoded response
  if (!isAIEnabled()) {
    return {
      text: getHardcodedAIChatResponse(userMessage, language),
      success: false,
      error: "AI is disabled. Showing hardcoded response."
    };
  }
  
  try {
    // Use a more efficient model with lower token costs
    const model = "gpt-3.5-turbo";
    
    // Try to connect to API with a timeout to avoid long waiting times
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // System prompt updated to be a general health assistant
    const systemMessage = {
      role: "system", 
      content: `You are Ayu, a compassionate health assistant providing guidance on basic symptoms for people in Bengaluru, India. 
      Give evidence-based health information that blends modern medicine with traditional Ayurvedic approaches when appropriate.
      Always advise users to consult healthcare professionals for proper diagnosis and treatment.
      Keep responses concise, helpful, and culturally relevant to Indian users.
      Focus on common health issues, preventive care, and when to seek professional help.`
    };
    
    // Only keep the most recent 4 exchanges to reduce token count
    let recentContext: {role: string, content: string}[] = [];
    
    // Process recent messages to keep context concise
    if (conversationContext.length > 0) {
      const maxContextMessages = Math.min(conversationContext.length, 4);
      for (let i = conversationContext.length - maxContextMessages; i < conversationContext.length; i++) {
        recentContext.push({
          role: i % 2 === 0 ? "user" : "assistant",
          content: conversationContext[i]
        });
      }
    }
    
    // Build messages array with system message, recent context, and current message
    const messages = [
      systemMessage,
      ...recentContext,
      { role: "user", content: userMessage }
    ];
    
    // If language is not English, add translation instruction
    if (language !== "en") {
      let languageName = language === "te" ? "Telugu" : "Kannada";
      messages.push({
        role: "system",
        content: `Respond in ${languageName} language. If you include any medical terms that don't have a direct translation, provide the English term in parentheses.`
      });
    }
    
    // Check if API key is available
    if (!OPENAI_API_KEY) {
      console.warn("No OpenAI API key provided. Using fallback responses.");
      return provideFallbackResponse(userMessage, language);
    }
    
    // Attempt to fetch from OpenAI API
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API error:", response.status, errorData);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();
    
    return {
      text: aiResponse,
      success: true
    };
    
  } catch (error) {
    console.error("AI Service Error:", error);
    return provideFallbackResponse(userMessage, language);
  }
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
  if (messageLower.includes("fever") || messageLower.includes("temperature")) {
    if (language === "te") {
      return "మీరు జ్వరం అనుభవిస్తుంటే, విశ్రాంతి తీసుకోండి, తగినంత నీరు త్రాగండి, మరియు అవసరమైతే పారాసెటమాల్ తీసుకోండి. లక్షణాలు కొనసాగితే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಜ್ವರ ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಪ್ಯಾರಾಸಿಟಮಾಲ್ ತೆಗೆದುಕೊಳ್ಳಿ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have a fever, please rest, drink plenty of fluids, and take paracetamol if needed. If symptoms persist, consult a doctor.";
  }
  if (messageLower.includes("cold") || messageLower.includes("runny nose") || messageLower.includes("sneezing")) {
    if (language === "te") {
      return "మీరు జలుబు అనుభవిస్తుంటే, తగినంత విశ్రాంతి తీసుకోండి మరియు నీరు త్రాగండి. లక్షణాలు కొనసాగితే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಜಲದೋಷ ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have a cold, rest and drink water. If symptoms persist, consult a doctor.";
  }
  if (messageLower.includes("cough")) {
    if (language === "te") {
      return "మీరు దగ్గు అనుభవిస్తుంటే, తగినంత నీరు త్రాగండి మరియు అవసరమైతే తేలికపాటి దగ్గు మందులు వాడండి. తీవ్రమైన దగ్గు ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಕೆಮ್ಮು ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಸೌಮ್ಯ ಕೆಮ್ಮು ಔಷಧಿ ಬಳಸಿ. ತೀವ್ರವಾದ ಕೆಮ್ಮಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have a cough, drink plenty of water and use mild cough syrup if needed. For severe cough, consult a doctor.";
  }
  if (messageLower.includes("headache")) {
    if (language === "te") {
      return "తల నొప్పి కోసం, విశ్రాంతి తీసుకోండి మరియు తగినంత నీరు త్రాగండి. తీవ్రమైన లేదా కొనసాగుతున్న తల నొప్పికి డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ತಲೆನೋವಿಗೆ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ತೀವ್ರವಾದ ಅಥವಾ ಮುಂದುವರಿದ ತಲೆನೋವಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For headaches, rest and hydrate well. If the headache is severe or persistent, consult a doctor.";
  }
  if (messageLower.includes("stomach") && messageLower.includes("pain")) {
    if (language === "te") {
      return "పేగు నొప్పికి తేలికపాటి ఆహారం తీసుకోండి మరియు తగినంత నీరు త్రాగండి. తీవ్రమైన నొప్పి ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಹುಜುಕಿನಲ್ಲಿ ನೋವು ಇದ್ದರೆ, ಲಘು ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ. ತೀವ್ರವಾದ ನೋವಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For stomach pain, eat light food and drink water. For severe pain, consult a doctor.";
  }
  if (messageLower.includes("vomit") || messageLower.includes("vomiting")) {
    if (language === "te") {
      return "వాంతులు ఉంటే, తగినంత నీరు త్రాగండి మరియు తేలికపాటి ఆహారం తీసుకోండి. తీవ్రమైన వాంతులు ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಬೇಗನೆ ವಾಂತಿ ಆಗುತ್ತಿದ್ದರೆ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಲಘು ಆಹಾರ ಸೇವಿಸಿ. ತೀವ್ರವಾದ ವಾಂತಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If vomiting, drink water and eat light food. For severe vomiting, consult a doctor.";
  }
  if (messageLower.includes("diarrhea") || messageLower.includes("loose motion")) {
    if (language === "te") {
      return "డయేరియా ఉంటే, తగినంత నీరు త్రాగండి మరియు ఒఆర్‌ఎస్ వాడండి. తీవ్రమైన డయేరియా ఉంటే డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ನೀವು ಡೈರಿಯಾ ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಓಆರ್‌ಎಸ್ ಬಳಸಿ. ತೀವ್ರವಾದ ಡೈರಿಯಾಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "If you have diarrhea, drink water and use ORS. For severe diarrhea, consult a doctor.";
  }
  if (messageLower.includes("rash") || messageLower.includes("skin")) {
    if (language === "te") {
      return "చర్మంపై ర్యాష్ ఉంటే, శుభ్రంగా ఉంచండి మరియు అవసరమైతే తేలికపాటి క్రీమ్ వాడండి. తీవ్రమైన ర్యాష్‌కు డాక్టర్‌ను సంప్రదించండి.";
    } else if (language === "kn") {
      return "ಚರ್ಮದ ಮೇಲೆ ರ್ಯಾಶ್ ಇದ್ದರೆ, ಸ್ವಚ್ಛವಾಗಿರಿಸಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಸೌಮ್ಯ ಕ್ರಿಮ್ ಬಳಸಿ. ತೀವ್ರವಾದ ರ್ಯಾಶ್ಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    }
    return "For skin rashes, keep the area clean and use mild cream if needed. For severe rashes, consult a doctor.";
  }
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