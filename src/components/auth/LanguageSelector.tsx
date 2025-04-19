import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface LanguageSelectorProps {
  currentLanguage: "en" | "te" | "kn";
  onLanguageChange: (language: "en" | "te" | "kn") => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  const { toast } = useToast();

  const handleLanguageChange = (language: "en" | "te" | "kn") => {
    onLanguageChange(language);
    
    const languageName = language === "en" ? "English" : language === "te" ? "Telugu" : "Kannada";
    
    toast({
      title: `Language Changed: ${languageName}`,
      description: language === "en" 
        ? "Ayu will now respond in English"
        : language === "te"
          ? "Ayu will now respond in Telugu"
          : "Ayu will now respond in Kannada",
      duration: 2000,
    });
  };

  const getLanguageLabel = (code: string): string => {
    switch(code) {
      case "en": return "English";
      case "te": return "తెలుగు (Telugu)";
      case "kn": return "ಕನ್ನಡ (Kannada)";
      default: return "English";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("en")}
          className={currentLanguage === "en" ? "bg-muted" : ""}
        >
          <span className="mr-1">🇬🇧</span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("te")}
          className={currentLanguage === "te" ? "bg-muted" : ""}
        >
          <span className="mr-1">🇮🇳</span> తెలుగు (Telugu)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("kn")}
          className={currentLanguage === "kn" ? "bg-muted" : ""}
        >
          <span className="mr-1">🇮🇳</span> ಕನ್ನಡ (Kannada)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
