
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserMessageProps {
  content: string;
  className?: string;
}

const UserMessage = ({ content, className }: UserMessageProps) => {
  return (
    <div className={cn("flex items-start space-x-3 justify-end animate-fade-in", className)}>
      <div className="bg-ayurveda-deepblue text-white rounded-l-xl rounded-br-xl px-4 py-3 max-w-[80%]">
        {content}
      </div>
      <Avatar className="h-8 w-8 bg-ayurveda-terracotta/70">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserMessage;
