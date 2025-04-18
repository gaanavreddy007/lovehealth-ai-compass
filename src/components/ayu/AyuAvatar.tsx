
import { useState, useEffect } from "react";
import { CornerDownLeft, Heart, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface AyuAvatarProps {
  isThinking?: boolean;
  isAnimating?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  showGreeting?: boolean;
}

const AyuAvatar = ({ 
  isThinking = false, 
  isAnimating = false, 
  size = "md", 
  className,
  showGreeting = false
}: AyuAvatarProps) => {
  const [greeting, setGreeting] = useState(false);
  
  useEffect(() => {
    if (showGreeting) {
      setGreeting(true);
      const timer = setTimeout(() => setGreeting(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  return (
    <div className={cn(
      "relative",
      className
    )}>
      <div 
        className={cn(
          sizeClasses[size],
          "bg-gradient-to-br from-ayurveda-sage via-ayurveda-ochre to-ayurveda-terracotta rounded-full flex items-center justify-center",
          isAnimating ? "animate-breathing" : "",
          "transition-all duration-500 ease-in-out"
        )}
      >
        {isThinking ? (
          <Loader className="text-white animate-spin" size={size === "lg" ? 32 : size === "md" ? 24 : 16} />
        ) : (
          <Heart 
            className={cn(
              "text-white",
              isAnimating ? "animate-pulse-glow" : ""
            )} 
            size={size === "lg" ? 32 : size === "md" ? 24 : 16} 
          />
        )}
      </div>
      
      {greeting && (
        <div className={cn(
          "absolute bottom-full mb-2",
          size === "lg" ? "left-1/2 -translate-x-1/2" : "right-full mr-2",
          "whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md",
          "flex items-center",
          "animate-fade-in"
        )}>
          <span className="mr-1.5 text-ayurveda-deepblue font-medium">Namaste</span>
          <span className="text-sm text-muted-foreground">(ನಮಸ್ತೆ)</span>
          <span className={cn(
            "inline-block",
            "animate-wave origin-bottom-right"
          )}>👋</span>
        </div>
      )}
    </div>
  );
};

export default AyuAvatar;
