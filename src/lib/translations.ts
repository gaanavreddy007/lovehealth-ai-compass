// Translations utility for multilingual support
// Currently supporting English, Telugu, and Kannada

type Language = "en" | "te" | "kn";

interface TranslationKeys {
  greeting: string;
  welcomeMessage: string;
  searchPlaceholder: string;
  chatPlaceholder: string;
  seeDoctor: string;
  remedies: string;
  commonSymptoms: string;
  disclaimer: string;
  talkToAyu: string;
  findProviders: string;
  locatePharmacies: string;
  // Login related translations
  loginTitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  loginButton: string;
  forgotPassword: string;
  createAccount: string;
}

// English translations (default)
const en: TranslationKeys = {
  greeting: "Hello! I'm Ayu",
  welcomeMessage: "How can I help you today?",
  searchPlaceholder: "Search...",
  chatPlaceholder: "Type your health concern...",
  seeDoctor: "When to See a Doctor",
  remedies: "Home Remedies",
  commonSymptoms: "Common Symptoms",
  disclaimer: "Medical Disclaimer: The information provided is for general informational purposes only and is not a substitute for professional medical advice.",
  talkToAyu: "Talk to Ayu",
  findProviders: "Find Healthcare Providers",
  locatePharmacies: "Locate Pharmacies",
  // Login related translations
  loginTitle: "Login to Your Account",
  emailLabel: "Email",
  emailPlaceholder: "Enter your email",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  loginButton: "Sign In",
  forgotPassword: "Forgot Password?",
  createAccount: "Create Account"
};

// Telugu translations
const te: TranslationKeys = {
  greeting: "నమస్కారం! నేను ఆయు",
  welcomeMessage: "నేను మీకు ఎలా సహాయపడగలను?",
  searchPlaceholder: "వెతకండి...",
  chatPlaceholder: "మీ ఆరోగ్య సమస్యను టైప్ చేయండి...",
  seeDoctor: "డాక్టర్‌ని ఎప్పుడు సందర్శించాలి",
  remedies: "ఇంటి చికిత్సలు",
  commonSymptoms: "సాధారణ లక్షణాలు",
  disclaimer: "వైద్య గమనిక: అందించబడిన సమాచారం కేవలం సాధారణ సమాచార ప్రయోజనాల కోసం మాత్రమే మరియు వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు.",
  talkToAyu: "ఆయుతో మాట్లాడండి",
  findProviders: "ఆరోగ్య సంరక్షణ ప్రొవైడర్లను కనుగొనండి",
  locatePharmacies: "ఫార్మసీలను కనుగొనండి",
  // Login related translations
  loginTitle: "మీ ఖాతాకు లాగిన్ చేయండి",
  emailLabel: "ఇమెయిల్",
  emailPlaceholder: "మీ ఇమెయిల్‌ని నమోదు చేయండి",
  passwordLabel: "పాస్‌వర్డ్",
  passwordPlaceholder: "మీ పాస్‌వర్డ్‌ని నమోదు చేయండి",
  loginButton: "సైన్ ఇన్ చేయండి",
  forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
  createAccount: "ఖాతాను సృష్టించండి"
};

// Kannada translations
const kn: TranslationKeys = {
  greeting: "ನಮಸ್ಕಾರ! ನಾನು ಆಯು",
  welcomeMessage: "ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  searchPlaceholder: "ಹುಡುಕಿ...",
  chatPlaceholder: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಕಾಳಜಿಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
  seeDoctor: "ವೈದ್ಯರನ್ನು ಯಾವಾಗ ನೋಡಬೇಕು",
  remedies: "ಮನೆ ಪರಿಹಾರಗಳು",
  commonSymptoms: "ಸಾಮಾನ್ಯ ಲಕ್ಷಣಗಳು",
  disclaimer: "ವೈದ್ಯಕೀಯ ಹಕ್ಕುತ್ಯಾಗ: ಒದಗಿಸಲಾದ ಮಾಹಿತಿಯು ಕೇವಲ ಸಾಮಾನ್ಯ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ ಮತ್ತು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ.",
  talkToAyu: "ಆಯುವನ್ನು ಮಾತನಾಡಿ",
  findProviders: "ಆರೋಗ್ಯ ಸೇವಾ ಪೂರೈಕೆದಾರರನ್ನು ಹುಡುಕಿ",
  locatePharmacies: "ಔಷಧಾಲಯಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ",
  // Login related translations
  loginTitle: "ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
  emailLabel: "ಇಮೇಲ್",
  emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ",
  passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
  passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
  loginButton: "ಸೈನ್ ಇನ್",
  forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?",
  createAccount: "ಖಾತೆಯನ್ನು ರಚಿಸಿ"
};

// Translation collection
const translations: Record<Language, TranslationKeys> = {
  en,
  te,
  kn
};

/**
 * Get translation for a specific key in the specified language
 * @param key - Translation key to lookup
 * @param language - Language code ('en', 'te', 'kn')
 * @returns The translated string
 */
export const getTranslation = (key: keyof TranslationKeys, language: Language = 'en'): string => {
  // Fallback to English if the translation is not available
  return translations[language]?.[key] || translations.en[key];
};

/**
 * Check if a language is right-to-left
 * Currently we don't have RTL languages, but this is for future support
 */
export const isRTL = (language: Language): boolean => {
  const rtlLanguages: Language[] = [];
  return rtlLanguages.includes(language);
};

export { translations };
export type { Language };
export default translations;
