import React, { useState } from "react";
import AyuAvatar from "./AyuAvatar";
import { Clipboard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AyuMessageProps {
  content: string;
}

const AyuMessage: React.FC<AyuMessageProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    
    toast({
      title: "Message copied to clipboard",
      duration: 2000,
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-start space-x-3 group">
      <div className="flex-shrink-0 mt-0.5">
        <AyuAvatar size="sm" />
      </div>
      <div className="bg-ayurveda-cream/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] relative">
        <div className="text-sm whitespace-pre-wrap">{content}</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopyMessage}
          title="Copy message"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
          <span className="sr-only">Copy message</span>
        </Button>
      </div>
    </div>
  );
};

export default AyuMessage;
