import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, MessageCircle, Heart } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is LoveHealth AI Compass?",
      answer: "LoveHealth AI Compass is a health assistant platform featuring Ayu, an AI health companion designed for Bengaluru residents. The application blends modern healthcare with traditional wisdom to provide personalized health guidance, help find healthcare providers, and locate pharmacies in your area."
    },
    {
      question: "Is Ayu a replacement for professional medical advice?",
      answer: "No, Ayu is not a replacement for professional medical advice. While Ayu can provide general health information and guidance, it should not be used for diagnosis or treatment decisions. Always consult with qualified healthcare professionals for medical concerns."
    },
    {
      question: "How accurate is the health information provided by Ayu?",
      answer: "Ayu provides evidence-based health information drawn from reputable medical sources. However, health information is constantly evolving, and individual circumstances vary. The information is meant to be educational and should be verified with healthcare professionals."
    },
    {
      question: "What languages does Ayu support?",
      answer: "Ayu currently supports English, Telugu, and Kannada to better serve the diverse population of Bengaluru. You can change your language preference in the chat interface or in your profile settings if you're logged in."
    },
    {
      question: "How does the Healthcare Provider Finder work?",
      answer: "The Healthcare Provider Finder helps you locate hospitals, clinics, and specialists in Bengaluru. You can search by neighborhood, specialty, or provider name. The results include contact information, services offered, and operating hours."
    },
    {
      question: "How does the Pharmacy Locator work?",
      answer: "The Pharmacy Locator helps you find nearby pharmacies in Bengaluru. You can search by location or pharmacy name. The results include operating hours, contact information, and whether they offer delivery services."
    },
    {
      question: "Is my personal health information secure?",
      answer: "Yes, we take your privacy seriously. Your conversations with Ayu are not stored permanently, and we do not share your personal information with third parties. For more details, please review our Privacy Policy."
    },
    {
      question: "Do I need to create an account to use LoveHealth AI?",
      answer: "No, you can use the basic features of LoveHealth AI without creating an account. However, creating an account allows you to save your preferences, including language settings, and access personalized features."
    },
    {
      question: "What should I do in a medical emergency?",
      answer: "In case of a medical emergency, please call emergency services (108 in India) immediately or go to the nearest emergency department. LoveHealth AI is not designed to handle emergency situations."
    },
    {
      question: "How can I provide feedback or report an issue?",
      answer: "We value your feedback! You can provide feedback or report issues by clicking on the 'Feedback' button in the app or by contacting us directly through the Contact page."
    }
  ];

  return (
    <AppLayout>
      <div className="ayu-container py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about LoveHealth AI Compass and how to make the most of your health assistant, Ayu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-ayurveda-deepblue">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-ayurveda-sage" />
                  Still have questions?
                </CardTitle>
                <CardDescription>
                  Talk to Ayu or contact our support team for assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
                  <Link to="/symptoms">
                    Talk to Ayu
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">
                    Contact Support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-ayurveda-terracotta" />
                  Health Resources
                </CardTitle>
                <CardDescription>
                  Explore additional health resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/blog" className="block text-sm text-ayurveda-deepblue hover:underline">
                  Health Blog
                </Link>
                <Link to="/disclaimer" className="block text-sm text-ayurveda-deepblue hover:underline">
                  Medical Disclaimer
                </Link>
                <Link to="/privacy" className="block text-sm text-ayurveda-deepblue hover:underline">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-sm text-ayurveda-deepblue hover:underline">
                  Terms of Use
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative w-10 h-10 bg-gradient-to-br from-ayurveda-terracotta to-ayurveda-sage rounded-full flex items-center justify-center">
              <Heart className="text-white h-5 w-5" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-ayurveda-deepblue">
            Ready to talk with Ayu?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Get personalized health guidance, find healthcare providers, or locate nearby pharmacies with your compassionate AI health companion.
          </p>
          <Button asChild size="lg" className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
            <Link to="/symptoms">
              Start a Conversation
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default FAQ;
