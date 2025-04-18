
import { cn } from "@/lib/utils";
import AyuAvatar from "./AyuAvatar";

interface AyuMessageProps {
  content: string;
  className?: string;
}

const AyuMessage = ({ content, className }: AyuMessageProps) => {
  return (
    <div className={cn("flex items-start space-x-3 animate-fade-in", className)}>
      <AyuAvatar size="sm" />
      <div className="bg-ayurveda-cream/30 text-foreground rounded-r-xl rounded-bl-xl px-4 py-3 max-w-[80%]">
        {content}
      </div>
    </div>
  );
};

export default AyuMessage;
