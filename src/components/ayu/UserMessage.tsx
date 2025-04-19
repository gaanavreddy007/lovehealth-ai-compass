import React from "react";
import { User } from "lucide-react";

interface UserMessageProps {
  content: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div className="flex items-start justify-end">
      <div className="bg-ayurveda-deepblue text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%]">
        <div className="text-sm whitespace-pre-wrap">{content}</div>
      </div>
      <div className="flex-shrink-0 ml-3 mt-0.5">
        <div className="h-8 w-8 rounded-full bg-ayurveda-terracotta/20 flex items-center justify-center">
          <User className="h-4 w-4 text-ayurveda-terracotta" />
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
