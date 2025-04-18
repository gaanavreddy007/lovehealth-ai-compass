
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SymptomCardProps {
  title: string;
  description: string;
  remedies: string[];
  whenToSeeDoctor: string;
  icon: React.ReactNode;
}

const SymptomCard = ({
  title,
  description,
  remedies,
  whenToSeeDoctor,
  icon,
}: SymptomCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn(
      "ayu-card p-6",
      "transform transition-all duration-300",
      isExpanded ? "scale-[1.02]" : ""
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-3 p-3 bg-ayurveda-sage/10 rounded-full text-ayurveda-sage">
            {icon}
          </div>
          <h3 className="text-lg font-medium text-ayurveda-deepblue">{title}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-ayurveda-deepblue hover:text-ayurveda-terracotta hover:bg-ayurveda-cream/20"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </div>

      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
      )}>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <h4 className="font-medium text-ayurveda-deepblue mb-2">Home Remedies:</h4>
        <ul className="space-y-1 mb-4">
          {remedies.map((remedy, index) => (
            <li key={index} className="flex items-start">
              <span className="text-ayurveda-terracotta mr-2">•</span>
              <span className="text-muted-foreground">{remedy}</span>
            </li>
          ))}
        </ul>
        
        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
          <h4 className="font-medium text-red-700 mb-1">When to See a Doctor:</h4>
          <p className="text-red-600 text-sm">{whenToSeeDoctor}</p>
        </div>
      </div>
    </div>
  );
};

export default SymptomCard;
