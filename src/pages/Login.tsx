
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LanguageSelector from "@/components/auth/LanguageSelector";
import { translations } from "@/lib/translations";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState<"en" | "te" | "kn">("en");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to home page
    navigate("/");
  };

  const t = translations[language];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ayurveda-sage/20 to-ayurveda-terracotta/20">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-ayurveda-deepblue">
              {t.loginTitle}
            </CardTitle>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.emailLabel}</label>
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.passwordLabel}</label>
              <Input
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
              {t.loginButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
