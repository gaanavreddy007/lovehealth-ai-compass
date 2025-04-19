import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SymptomCardProps {
  title: string;
  description: string;
  remedies: string[];
  whenToSeeDoctor: string;
  icon?: React.ReactNode;
  className?: string;
}

const SymptomCard = ({
  title,
  description,
  remedies,
  whenToSeeDoctor,
  icon,
  className,
}: SymptomCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg focus-within:shadow-lg transition-shadow border border-ayurveda-sage/30 min-h-[180px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta"
      tabIndex={0}
      role="button"
      aria-label={`Symptom: ${title}`}
    >
      <CardHeader className="bg-gradient-to-r from-ayurveda-sage/10 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-2">
            {icon && <div className="text-ayurveda-deepblue">{icon}</div>}
            <CardTitle className="text-lg font-semibold text-ayurveda-deepblue">{title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-6 pt-4">
        <p className="text-sm text-ayurveda-deepblue/90 mb-1">{description}</p>

        {expanded && (
          <>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-ayurveda-terracotta mb-2">
                  Home Remedies
                </h3>
                <div className="space-y-2">
                  {remedies.map((remedy, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm text-muted-foreground">{remedy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="text-lg font-medium text-red-600 mb-2">
                  When to See a Doctor
                </h3>
                <div className="bg-red-50 p-3 rounded-md border border-red-100">
                  <p className="text-sm text-red-700">{whenToSeeDoctor}</p>
                </div>
                
                <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-100">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">
                      <strong>Medical Disclaimer:</strong> The information provided here is for educational purposes only and is not a substitute for professional medical advice. Always consult with a healthcare provider for diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!expanded && (
          <Button
            variant="link"
            onClick={() => setExpanded(true)}
            className="text-ayurveda-sage p-0 h-auto font-normal"
          >
            Click to see home remedies and when to see a doctor
          </Button>
        )}
      </CardContent>
    </div>
  );
};

export default SymptomCard;
