import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AyuChat from "@/components/ayu/AyuChat";
import SymptomCard from "@/components/symptoms/SymptomCard";
import { 
  Brain, 
  Thermometer, 
  Stethoscope, 
  Activity, 
  HeartPulse, 
  Frown 
} from "lucide-react";

const Symptoms = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const commonSymptoms = [
    {
      title: "Headache",
      description: "Headaches are pain in any region of the head. They may occur on one or both sides of the head, be isolated to a certain location, radiate across the head, or have a viselike quality.",
      remedies: [
        "Rest in a quiet, dark room with a cool cloth on your forehead",
        "Stay hydrated by drinking plenty of water",
        "Try gentle temple massage with diluted peppermint oil",
        "Apply tulsi (holy basil) paste on the forehead",
        "Drink ginger tea with honey"
      ],
      whenToSeeDoctor: "If your headache is severe, comes on suddenly, or is accompanied by fever, stiff neck, confusion, seizures, double vision, weakness, numbness, or difficulty speaking.",
      icon: <Brain />
    },
    {
      title: "Fever",
      description: "Fever is a temporary increase in your body temperature, often due to an illness. Having a fever is a sign that something out of the ordinary is going on in your body.",
      remedies: [
        "Rest and drink plenty of fluids",
        "Take a lukewarm bath or apply cool compresses",
        "Drink tulsi (holy basil) and ginger tea",
        "Consume light, easily digestible foods",
        "Stay in a comfortably cool environment"
      ],
      whenToSeeDoctor: "If your temperature is higher than 103°F (39.4°C), lasts more than three days, or is accompanied by severe headache, stiff neck, confusion, or difficulty breathing.",
      icon: <Thermometer />
    },
    {
      title: "Common Cold",
      description: "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way.",
      remedies: [
        "Rest and stay hydrated",
        "Gargle with salt water for sore throat",
        "Inhale steam with tulsi (holy basil) leaves or eucalyptus oil",
        "Drink warm turmeric milk before bed",
        "Try honey and ginger tea for cough relief"
      ],
      whenToSeeDoctor: "If symptoms last more than 10 days, you experience unusually severe symptoms, or you have a fever above 101.3°F (38.5°C) for adults.",
      icon: <Frown />
    },
    {
      title: "Digestive Issues",
      description: "Digestive issues include symptoms like bloating, gas, indigestion, stomach pain, and irregular bowel movements that can impact your comfort and daily activities.",
      remedies: [
        "Drink ajwain (carom seeds) water for gas and bloating",
        "Try ginger and lemon tea for indigestion",
        "Consume curd with cumin powder for upset stomach",
        "Eat smaller, more frequent meals",
        "Avoid spicy, oily foods and carbonated drinks"
      ],
      whenToSeeDoctor: "If you experience severe abdominal pain, blood in stool, unexplained weight loss, persistent nausea/vomiting, or symptoms lasting more than a few days.",
      icon: <Stethoscope />
    },
    {
      title: "Fatigue",
      description: "Fatigue is a feeling of constant tiredness or weakness and can be physical, mental, or both. It's different from just feeling tired or sleepy.",
      remedies: [
        "Ensure adequate sleep (7-8 hours)",
        "Stay hydrated and maintain a balanced diet",
        "Include ashwagandha or amla (Indian gooseberry) in your diet",
        "Practice gentle yoga or pranayama (breathing exercises)",
        "Reduce caffeine and screen time before bed"
      ],
      whenToSeeDoctor: "If fatigue is severe, lasts for weeks, is not relieved by rest, or is accompanied by other symptoms like fever, pain, or unexplained weight loss.",
      icon: <Activity />
    },
    {
      title: "High Blood Pressure",
      description: "High blood pressure (hypertension) is a common condition where the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems.",
      remedies: [
        "Reduce salt intake in your diet",
        "Practice regular physical activity",
        "Manage stress through meditation and deep breathing",
        "Consume garlic, hibiscus tea, and methi (fenugreek) seeds regularly",
        "Maintain a healthy weight"
      ],
      whenToSeeDoctor: "If your blood pressure readings are consistently above 140/90 mmHg, or if you experience severe headaches, vision problems, chest pain, or difficulty breathing.",
      icon: <HeartPulse />
    }
  ];

  return (
    <AppLayout>
      <div className="ayu-container py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Symptom Guide</h1>
        <p className="text-muted-foreground mb-8">
          Get personalized guidance for common symptoms and learn when to seek professional help.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="chat">Chat with Ayu</TabsTrigger>
            <TabsTrigger value="guide">Common Symptoms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="animate-fade-in">
            <div className="max-w-2xl mx-auto h-[600px]">
              <AyuChat />
            </div>
          </TabsContent>
          
          <TabsContent value="guide" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonSymptoms.map((symptom, index) => (
                <SymptomCard
                  key={index}
                  title={symptom.title}
                  description={symptom.description}
                  remedies={symptom.remedies}
                  whenToSeeDoctor={symptom.whenToSeeDoctor}
                  icon={symptom.icon}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 p-4 bg-ayurveda-cream/30 border border-ayurveda-cream rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Medical Disclaimer:</strong> The information provided is for general informational purposes only and is not intended as medical advice. 
            Always consult with a qualified healthcare provider for medical conditions.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Symptoms;
