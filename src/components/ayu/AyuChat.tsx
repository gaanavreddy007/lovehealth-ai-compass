
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial greeting message
  useEffect(() => {
    setTimeout(() => {
      const greeting: Message = {
        id: "greeting",
        content: "Namaste! I'm Ayu, your health companion. How are you feeling today?",
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

  const generateResponse = (userMessage: string): Promise<string> => {
    // This would be replaced with a real AI backend in production
    return new Promise((resolve) => {
      const responses = [
        "I understand how you're feeling. What symptoms are you experiencing?",
        "I'm here to help. Could you tell me more about when these symptoms started?",
        "Based on what you've shared, this could be related to a few different conditions. Let's explore some possibilities.",
        "Taking care of your health is important. Would you like me to suggest some home remedies?",
        "It might be helpful to consult with a healthcare provider. Would you like me to find specialists nearby?",
        "Rest and proper hydration can help with these symptoms. Would you like more specific advice?",
        "I'm here to support you on your health journey. Let's work on this together.",
        "Traditional remedies include turmeric milk for inflammation. Would you like to know more?"
      ];
      
      // Simulate typing delay
      setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
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
