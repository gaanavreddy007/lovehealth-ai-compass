import React, { useState, useRef, useEffect } from "react";
import { CornerDownLeft, Smile, Paperclip, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AyuAvatar from "./AyuAvatar";
import AyuMessage from "./AyuMessage";
import UserMessage from "./UserMessage";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ayu";
  timestamp: Date;
}

const AyuChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isAyuTyping, setIsAyuTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial greeting message
  useEffect(() => {
    setTimeout(() => {
      const greeting: Message = {
        id: "greeting",
        content: "Namaste! I'm Ayu, your AI-powered Ayurvedic health companion. How can I assist you with your health today?",
        sender: "ayu",
        timestamp: new Date()
      };
      setMessages([greeting]);
    }, 1000);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSymptoms = (message: string): string[] => {
    const symptoms = [
      'headache', 'fever', 'cough', 'cold', 'pain', 'tired', 'stress', 'anxiety',
      'sleep', 'digestion', 'nausea', 'breathing', 'joint', 'muscle', 'skin'
    ];
    return symptoms.filter(symptom => message.toLowerCase().includes(symptom));
  };

  const generateResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      const lowerMessage = userMessage.toLowerCase();
      const detectedSymptoms = analyzeSymptoms(userMessage);
      
      // Advanced response mapping with Ayurvedic context
      const responseMap: { [key: string]: string[] } = {
        'headache': [
          "I notice you're experiencing a headache. In Ayurveda, headaches can be caused by imbalances in Vata (stress), Pitta (inflammation), or Kapha (congestion). Have you been experiencing any stress lately?",
          "For headache relief, I recommend: 1) Massaging your temples with diluted peppermint oil 2) Drinking ginger tea with honey 3) Practicing deep breathing in a quiet, dark room. Would you like more specific remedies?",
          "Besides the headache, are you experiencing any sensitivity to light or sound? This will help me understand if it's a Vata, Pitta, or Kapha imbalance."
        ],
        'fever': [
          "A fever is your body's natural defense mechanism. From an Ayurvedic perspective, this indicates a Pitta (heat) imbalance. Are you also experiencing thirst or warmth in your body?",
          "I recommend: 1) Drinking cooling herbs like holy basil (tulsi) tea 2) Light fasting or easily digestible foods 3) Rest and meditation. Would you like me to elaborate on any of these?",
          "Have you noticed any patterns with your fever, like does it increase at certain times of the day? This could help us understand the underlying dosha imbalance."
        ],
        'tired': [
          "Fatigue in Ayurveda often indicates an imbalance in your vital energy (prana). Could you tell me about your sleep patterns and daily routine?",
          "Consider these Ayurvedic recommendations: 1) Taking Ashwagandha supplement 2) Oil pulling in the morning 3) Practicing gentle yoga. Would you like a detailed routine?",
          "Is your fatigue worse at certain times of day? This could help us identify which dosha needs balancing."
        ],
        'stress': [
          "Stress in Ayurveda is often related to Vata imbalance. Let's work on grounding practices. How long have you been feeling this way?",
          "Here are some immediate Ayurvedic stress-relief practices: 1) Abhyanga (self-massage) with warm sesame oil 2) Pranayama breathing 3) Drinking warm milk with nutmeg before bed. Shall we explore these further?",
          "Are you also experiencing any physical symptoms with the stress? This will help me suggest more targeted remedies."
        ]
      };

      // Context-aware fallback responses
      const fallbackResponses = [
        "I'm analyzing your symptoms through an Ayurvedic lens. Could you tell me more about when these symptoms started?",
        "In Ayurveda, we look at the whole person, not just symptoms. How's your daily routine and diet been lately?",
        "Understanding your prakriti (body constitution) will help me give better advice. Do you typically run warm or cool?",
        "Let's explore your symptoms together. Are they worse at any particular time of day?",
        "Ayurveda teaches us that health is a balance of mind, body, and spirit. How's your emotional well-being lately?"
      ];

      // Build contextual response
      let response: string;
      if (detectedSymptoms.length > 0) {
        const relevantResponses = detectedSymptoms
          .map(symptom => responseMap[symptom])
          .filter(Boolean)
          .flat();
        
        response = relevantResponses.length > 0
          ? relevantResponses[Math.floor(Math.random() * relevantResponses.length)]
          : fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      } else {
        response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      }

      // Add conversation memory
      setConversationContext(prev => [...prev, userMessage]);
      
      // Simulate AI processing time
      setTimeout(() => {
        resolve(response);
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Show Ayu typing indicator
    setIsAyuTyping(true);
    
    try {
      // Get AI response
      const response = await generateResponse(input);
      
      // Add Ayu message
      const ayuMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ayu",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, ayuMessage]);
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

  return (
    <div className="flex flex-col h-full border rounded-xl shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
      {/* Chat header */}
      <div className="p-4 border-b bg-white/80 backdrop-blur-sm flex items-center space-x-3">
        <AyuAvatar size="sm" />
        <div>
          <h3 className="font-medium">Ayu</h3>
          <p className="text-xs text-muted-foreground">Your Health Companion</p>
        </div>
      </div>
      
      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
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
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t p-4 bg-white/60 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health concern..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <CornerDownLeft size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AyuChat;
