import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <AppLayout>
      <div className="ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Medical Disclaimer</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: April 18, 2025
        </p>

        <Alert className="mb-8 border-ayurveda-terracotta/50 bg-ayurveda-terracotta/10">
          <AlertTriangle className="h-5 w-5 text-ayurveda-terracotta" />
          <AlertTitle className="text-ayurveda-terracotta font-medium">Important Notice</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            The information provided by LoveHealth AI Compass is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="pt-6 prose prose-slate max-w-none">
            <h2>Not Medical Advice</h2>
            <p>
              The content provided on the LoveHealth AI Compass platform, including all text, graphics, images, and information available through our AI health assistant Ayu, is for general informational and educational purposes only. It is not intended to be and should not be interpreted as medical advice or a diagnosis from a physician or other healthcare professional.
            </p>

            <h2>No Doctor-Patient Relationship</h2>
            <p>
              Using LoveHealth AI Compass does not create a doctor-patient relationship between you and LoveHealth AI Compass, its employees, or its contractors. The information provided by LoveHealth AI Compass, including responses from Ayu, should not be used as a substitute for medical advice from your doctor or other professional healthcare provider.
            </p>

            <h2>Emergency Situations</h2>
            <p>
              LoveHealth AI Compass is not designed to handle emergency situations. If you are experiencing a medical emergency, please call your local emergency services (108 in India) immediately or go to the nearest emergency department.
            </p>
            <p>
              Emergency warning signs that require immediate medical attention include:
            </p>
            <ul>
              <li>Difficulty breathing or shortness of breath</li>
              <li>Persistent pain or pressure in the chest</li>
              <li>New confusion or inability to arouse</li>
              <li>Bluish lips or face</li>
              <li>Severe or persistent pain</li>
              <li>Uncontrolled bleeding</li>
              <li>Severe burns or injuries</li>
              <li>Poisoning</li>
              <li>Serious head, neck, or back injury</li>
              <li>Loss of consciousness</li>
              <li>Seizures</li>
              <li>Sudden, severe headache</li>
              <li>Sudden weakness or numbness, especially on one side of the body</li>
              <li>Sudden difficulty speaking or understanding speech</li>
            </ul>

            <h2>Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the platform for any purpose.
            </p>
            <p>
              Medical knowledge and best practices change constantly. The information provided may not reflect the most current medical developments, and information may be incorrect or out of date.
            </p>

            <h2>Individual Variations</h2>
            <p>
              Every individual is unique, and health conditions affect people differently. The information provided by LoveHealth AI Compass is general in nature and may not apply to your specific health situation. What works for one person may not work for another.
            </p>

            <h2>Traditional and Ayurvedic Remedies</h2>
            <p>
              LoveHealth AI Compass may provide information about traditional or Ayurvedic remedies. These remedies may not have been evaluated by regulatory authorities and are not meant to diagnose, treat, cure, or prevent any disease. Some traditional remedies may interact with medications or may not be appropriate for certain medical conditions.
            </p>
            <p>
              Always consult with a qualified healthcare provider before starting any new treatment or remedy, especially if you are pregnant, nursing, have a medical condition, or are taking medications.
            </p>

            <h2>Healthcare Provider Information</h2>
            <p>
              Information about healthcare providers, hospitals, clinics, and pharmacies is provided for convenience only. LoveHealth AI Compass does not endorse or recommend any specific healthcare providers. We do not verify the credentials, qualifications, or abilities of any healthcare providers mentioned on our platform.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, LoveHealth AI Compass and its suppliers shall not be liable for any direct, indirect, punitive, incidental, special, consequential damages, or any damages whatsoever including, without limitation, damages for loss of use, data, or profits, arising out of or in any way connected with the use or performance of the platform, with the delay or inability to use the platform, or for any information, products, services, or related graphics obtained through the platform.
            </p>

            <h2>Consult a Professional</h2>
            <p>
              Always consult with a qualified healthcare professional before making any health-related decisions or taking any action that may affect your health. Never disregard professional medical advice or delay in seeking it because of something you have read on the LoveHealth AI Compass platform.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about this Medical Disclaimer, please contact us at:
            </p>
            <p>
              Email: medical@lovehealthai.com<br />
              Address: 123 Health Street, Bengaluru, Karnataka, India
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Disclaimer;
