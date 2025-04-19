# LoveHealth AI Compass

A comprehensive, multilingual AI-powered health assistant for Bengaluru residents and beyond. LoveHealth AI Compass offers personalized health guidance, symptom tracking, provider and pharmacy locators, robust authentication, and a modern, accessible user experience.

---

## 🌟 Features

- **AI Health Assistant (Ayu):**
  - Context-aware, multilingual chat (English, Telugu, Kannada)
  - Emergency detection and response
  - Fallbacks for uncertain queries
- **Authentication & User Management:**
  - Signup, login, logout, profile management
  - Language preference per user
- **Comprehensive Health Resources:**
  - Symptom Guide
  - Healthcare Provider Finder
  - Pharmacy Locator
  - FAQ, Blog, About, Contact, Privacy, Terms, Disclaimer
- **Health Tracker:**
  - Log symptoms, mood, and health events
  - Dashboard of recent logs (local storage, privacy-first)
- **Multilingual Support:**
  - English, Telugu, Kannada (easy to extend)
- **Modern UI/UX:**
  - Responsive, accessible (ARIA labels, keyboard navigation)
  - Consistent design with shadcn/ui and Tailwind CSS
- **Robust Error Handling:**
  - Toasts/snackbars for all major actions
  - Friendly error messages
- **Security & Privacy:**
  - Environment variable management for API keys
  - No persistent storage of sensitive health conversations
  - Medical disclaimer on all health info

---

## 🚀 Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/lovehealth-ai-compass.git
cd lovehealth-ai-compass
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
- Copy `.env.example` to `.env` and add your [OpenAI API key](https://platform.openai.com/account/api-keys):
```
VITE_OPENAI_API_KEY=your-openai-key-here
```

### 4. Run the App Locally
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```sh
npm run build
```

---

## 🌐 Deployment

- **Vercel** and **Netlify** are recommended for seamless deployment.
- Connect your GitHub repo, set environment variables in the dashboard, and deploy.
- For GitHub Pages, use a static build and publish the `dist` folder.

---

## 🛡️ Accessibility & Best Practices
- All forms, navigation, and chat are ARIA-labeled and keyboard accessible.
- High color contrast and visible focus states for all interactive elements.
- Responsive layouts for desktop and mobile.

---

## 🧑‍💻 Tech Stack
- **Frontend:** React, TypeScript, Vite
- **UI:** shadcn/ui, Tailwind CSS
- **State:** React Context API
- **AI:** OpenAI API
- **Icons:** Lucide

---

## 👩‍⚕️ Demo Users
- English: `user@example.com` / `password123`
- Telugu: `telugu@example.com` / `password123`
- Kannada: `kannada@example.com` / `password123`

---

## 📄 License
MIT

---

## 🙏 Disclaimer
LoveHealth AI Compass is for educational purposes only and does not provide professional medical advice. Always consult a qualified healthcare provider for medical concerns.

---

## 💬 Feedback & Contributions
Issues and PRs welcome! Help us make health guidance accessible for all.
