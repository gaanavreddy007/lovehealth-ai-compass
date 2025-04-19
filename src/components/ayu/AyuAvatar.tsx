import React from "react";
import { cn } from "@/lib/utils";

interface AyuAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  isAnimating?: boolean;
  isThinking?: boolean;
  showGreeting?: boolean;
}

const AyuAvatar: React.FC<AyuAvatarProps> = ({
  size = "md",
  className,
  isAnimating = false,
  isThinking = false,
  showGreeting = false,
}) => {
  // Size classes based on the size prop
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-32 w-32 md:h-40 md:w-40",
  };

  return (
    <div className="relative">
      {/* Avatar container */}
      <div
        className={cn(
          "rounded-full relative overflow-hidden",
          sizeClasses[size],
          isAnimating && "animate-gentle-bounce",
          className
        )}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-ayurveda-sage/30 to-ayurveda-terracotta/30"></div>

        {/* Face features */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head shape */}
            <circle cx="50" cy="50" r="45" fill="#F2F0EB" />

            {/* Eyes */}
            {isThinking ? (
              <>
                {/* Thinking expression (closed eyes) */}
                <path
                  d="M35 45 Q40 42, 45 45"
                  fill="none"
                  stroke="#273553"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M55 45 Q60 42, 65 45"
                  fill="none"
                  stroke="#273553"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                {/* Normal eyes */}
                <circle cx="40" cy="45" r="5" fill="#273553" />
                <circle cx="60" cy="45" r="5" fill="#273553" />
                
                {/* Eye shine */}
                <circle cx="42" cy="43" r="1.5" fill="white" />
                <circle cx="62" cy="43" r="1.5" fill="white" />
              </>
            )}

            {/* Smile */}
            <path
              d={isThinking ? "M40 65 Q50 60, 60 65" : "M35 65 Q50 75, 65 65"}
              fill="none"
              stroke="#273553"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Ayurvedic tilak */}
            <circle cx="50" cy="30" r="3" fill="#E97F61" />
          </svg>
        </div>
      </div>

      {/* Greeting bubble for large avatar */}
      {size === "lg" && showGreeting && (
        <div className="absolute -top-2 -right-2 md:top-5 md:-right-16 bg-white px-4 py-2 rounded-xl shadow-sm border animate-fade-in-right">
          <div className="text-sm font-medium">Namaste! I'm Ayu.</div>
          <div className="absolute left-2 bottom-0 transform rotate-45 w-4 h-4 bg-white border-l border-b translate-y-2"></div>
        </div>
      )}

      {/* Thinking animation */}
      {isThinking && (
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-ayurveda-sage animate-pulse"></div>
      )}
    </div>
  );
};

export default AyuAvatar;
