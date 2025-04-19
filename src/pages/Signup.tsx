import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import LanguageSelector from "@/components/auth/LanguageSelector";
import { translations } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { Language } from "@/lib/translations";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    let isValid = true;

    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created",
        description: "Your account has been successfully created. Please log in.",
        duration: 3000,
      });
      
      // Navigate to login page after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ayurveda-sage/20 to-ayurveda-terracotta/20 ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <Card className="w-full max-w-md mx-4" role="main" aria-label="Signup form">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 bg-gradient-to-br from-ayurveda-terracotta to-ayurveda-sage rounded-full flex items-center justify-center">
                <Heart className="text-white h-4 w-4" />
              </div>
              <CardTitle className="text-2xl font-bold text-ayurveda-deepblue" id="signup-title">
                Create Account
              </CardTitle>
            </div>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
              aria-label="Select language"
            />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4" aria-labelledby="signup-title" aria-describedby="signup-error" role="form">
            <div className="space-y-2">
              <label htmlFor="signup-name" className="text-sm font-medium">Full Name</label>
              <Input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className={errors.name ? "border-red-500" : ""}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "signup-name-error" : undefined}
              />
              {errors.name && (
                <p id="signup-name-error" className="text-xs text-red-500 mt-1" role="alert">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="signup-email" className="text-sm font-medium">Email</label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={errors.email ? "border-red-500" : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "signup-email-error" : undefined}
              />
              {errors.email && (
                <p id="signup-email-error" className="text-xs text-red-500 mt-1" role="alert">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="signup-password" className="text-sm font-medium">Password</label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={errors.password ? "border-red-500" : ""}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "signup-password-error" : undefined}
              />
              {errors.password && (
                <p id="signup-password-error" className="text-xs text-red-500 mt-1" role="alert">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="signup-confirm-password" className="text-sm font-medium">Confirm Password</label>
              <Input
                id="signup-confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className={errors.confirmPassword ? "border-red-500" : ""}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "signup-confirm-password-error" : undefined}
              />
              {errors.confirmPassword && (
                <p id="signup-confirm-password-error" className="text-xs text-red-500 mt-1" role="alert">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Language</label>
              <div className="mt-1">
                <LanguageSelector
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                  aria-label="Select language"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all flex items-center justify-center gap-2"
              disabled={isLoading}
              aria-label="Create account"
            >
              {isLoading && <span className="loader h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>}
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-center text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-ayurveda-deepblue hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-ayurveda-deepblue hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-ayurveda-deepblue hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
