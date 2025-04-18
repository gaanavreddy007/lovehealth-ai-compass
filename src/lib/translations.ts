
interface Translation {
  loginTitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  loginButton: string;
}

export const translations: Record<"en" | "te" | "kn", Translation> = {
  en: {
    loginTitle: "Login",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    loginButton: "Sign In",
  },
  te: {
    loginTitle: "లాగిన్",
    emailLabel: "ఇమెయిల్",
    emailPlaceholder: "మీ ఇమెయిల్‌ను నమోదు చేయండి",
    passwordLabel: "పాస్‌వర్డ్",
    passwordPlaceholder: "మీ పాస్‌వర్డ్‌ను నమోదు చేయండి",
    loginButton: "సైన్ ఇన్",
  },
  kn: {
    loginTitle: "ಲಾಗಿನ್",
    emailLabel: "ಇಮೇಲ್",
    emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ",
    passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
    passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    loginButton: "ಸೈನ್ ಇನ್",
  },
};
