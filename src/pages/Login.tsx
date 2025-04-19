import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import LanguageSelector from "@/components/auth/LanguageSelector";
import { translations } from "@/lib/translations";
import { login } from "@/lib/services/authService";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState<"en" | "te" | "kn">("en");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await login(email, password);
      
      if (response.success) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.user?.name}!`,
          duration: 3000,
        });
        
        // Navigate to home page after successful login
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: response.message || "Invalid email or password",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const t = translations[language];

  // For demo purposes, show login credentials
  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ayurveda-sage/20 to-ayurveda-terracotta/20 ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <Card className="w-full max-w-md mx-4" role="main" aria-label="Login form">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 bg-gradient-to-br from-ayurveda-terracotta to-ayurveda-sage rounded-full flex items-center justify-center">
              <Heart className="text-white h-4 w-4" />
            </div>
            <CardTitle className="text-2xl font-bold text-ayurveda-deepblue" id="login-title">
              {t.loginTitle}
            </CardTitle>
          </div>
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4" aria-labelledby="login-title" aria-describedby="login-error" role="form">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium">{t.emailLabel}</label>
              <Input
                id="login-email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all ${errors.email ? "border-red-500" : ""}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "login-email-error" : undefined}
              />
              {errors.email && (
                <p id="login-email-error" className="text-xs text-red-500 mt-1" role="alert">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="text-sm font-medium">{t.passwordLabel}</label>
                <Link to="/forgot-password" className="text-xs text-ayurveda-deepblue hover:underline">
                  {t.forgotPassword}
                </Link>
              </div>
              <Input
                id="login-password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all ${errors.password ? "border-red-500" : ""}`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "login-password-error" : undefined}
              />
              {errors.password && (
                <p id="login-password-error" className="text-xs text-red-500 mt-1" role="alert">{errors.password}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all flex items-center justify-center gap-2"
              aria-label={t.loginButton}
              disabled={isLoading}
            >
              {isLoading && <span className="loader h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>}
              {isLoading ? "Signing in..." : t.loginButton}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-center text-muted-foreground mb-3">Demo accounts (password: password123)</p>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin("user@example.com")}
                className="text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
              >
                English
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin("telugu@example.com")}
                className="text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
              >
                Telugu
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin("kannada@example.com")}
                className="text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
              >
                Kannada
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-ayurveda-deepblue hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
