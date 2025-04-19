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
      translatedResponse = "ಹಲವಾರು ಸಾಮಾನ್ಯ ರೋಗಲಕ್ಷಣಗಳಿಗೆ, ವಿಶ್ರಾಂತಿ, ಹೈಡ್ರೇಶನ್ ಮತ್ತು ಕೌಂಟರ್ ಔಷಧಿಗಳು ಸಹಾಯ ಮಾಡಬಹುದು. ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಹೆಚ್ಚು ವಿವರವಾಗಿ ವಿವರಿಸಬಹುದೇ?";
    }
  }
  
  return {
    text: translatedResponse,
    success: false,
    error: "API connection failed"
  };
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