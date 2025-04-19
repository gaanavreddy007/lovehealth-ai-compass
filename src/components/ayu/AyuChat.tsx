import React, { useState, useRef, useEffect } from "react";
import { CornerDownLeft, Smile, Paperclip, Image as ImageIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AyuAvatar from "./AyuAvatar";
import AyuMessage from "./AyuMessage";
import UserMessage from "./UserMessage";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/auth/LanguageSelector";
import { generateAIResponse, checkMedicalUrgency, getEmergencyResponse } from "@/lib/services/aiService";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Language } from "@/lib/translations";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ayu";
  timestamp: Date;
}

const AyuChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isAyuTyping, setIsAyuTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language>(user?.language || "en");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Use user's preferred language if logged in
  useEffect(() => {
    if (user?.language) {
      setLanguage(user.language);
    }
  }, [user]);

  // Initial greeting message
  useEffect(() => {
    setTimeout(() => {
      const greeting: Message = {
        id: "greeting",
        content: getGreetingMessage(language),
        sender: "ayu",
        timestamp: new Date()
      };
      setMessages([greeting]);
    }, 1000);
  }, [language]);

  // Auto-scroll within the chat container only
  useEffect(() => {
    if (scrollAreaViewportRef.current && messages.length > 0) {
      const scrollElement = scrollAreaViewportRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages, isAyuTyping]);

  // Focus on input whenever needed
  useEffect(() => {
    inputRef.current?.focus();
  }, [isAyuTyping]);

  // Get appropriate greeting based on language
  const getGreetingMessage = (lang: Language): string => {
    const greetings = {
      en: "Hello! I'm Ayu, your health assistant. I can provide guidance on common symptoms and health concerns. How can I help you today?",
      te: "నమస్కారం! నేను ఆయు, మీ ఆరోగ్య సహాయకుడిని. నేను సాధారణ లక్షణాలు మరియు ఆరోగ్య సమస్యలపై మార్గదర్శకత్వం అందించగలను. నేను మీకు ఈరోజు ఎలా సహాయం చేయగలను?",
      kn: "ನಮಸ್ಕಾರ! ನಾನು ಆಯು, ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಾಯಕ. ನಾನು ಸಾಮಾನ್ಯ ರೋಗಲಕ್ಷಣಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಕಾಳಜಿಗಳ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
    };
    return greetings[lang];
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    // If user is logged in, update their preference
    if (user) {
      toast({
        title: "Language preference saved",
        description: "Your language preference has been updated",
        duration: 2000,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    setIsAyuTyping(true);
    
    try {
      // Check if this might be a medical emergency
      if (checkMedicalUrgency(input)) {
        // Add emergency response
        const emergencyMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getEmergencyResponse(language),
          sender: "ayu",
          timestamp: new Date()
        };
        
        // Short delay to simulate thinking
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setMessages(prev => [...prev, emergencyMessage]);
        setIsAyuTyping(false);
        return;
      }
      
      // Add new message to conversation context for future AI responses
      const updatedContext = [...conversationContext, input];
      setConversationContext(updatedContext);
      
      // Use AI service to generate response
      const aiResponse = await generateAIResponse(
        input, 
        updatedContext,
        language
      );
      
      if (aiResponse.success) {
        const ayuMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.text,
          sender: "ayu",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, ayuMessage]);
      } else {
        // If there was an error, show toast and error message in chat
        toast({
          title: "AI Service Error",
          description: "Could not connect to AI service. Showing fallback response.",
          variant: "destructive"
        });
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.text,
          sender: "ayu",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAyuTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-xl shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
      <div className="p-4 border-b bg-white/80 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AyuAvatar size="sm" />
          <div>
            <h3 className="font-medium">Ayu</h3>
            <p className="text-xs text-muted-foreground">Your Health Companion</p>
          </div>
        </div>
        <div className="flex items-center">
          <LanguageSelector 
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
      
      <div 
        className="flex-1 p-4 overflow-y-auto"
        ref={scrollAreaViewportRef}
        style={{ height: '100%', maxHeight: 'calc(100% - 130px)' }}
      >
        <div className="space-y-4">
          {messages.map((message) => (
            message.sender === "ayu" ? (
              <AyuMessage key={message.id} content={message.content} />
            ) : (
              <UserMessage key={message.id} content={message.content} />
            )
          ))}
          
          {isAyuTyping && (
            <div className="flex items-center space-x-2 animate-fade-in">
              <AyuAvatar size="sm" isThinking={true} />
              <div className="bg-muted rounded-full px-3 py-1.5">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }} 
        className="border-t p-4 bg-white/60 backdrop-blur-sm"
      >
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your health concern..."
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={(e) => handleSubmit(e as unknown as React.FormEvent)} 
            size="icon"
          >
            <CornerDownLeft size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AyuChat;
