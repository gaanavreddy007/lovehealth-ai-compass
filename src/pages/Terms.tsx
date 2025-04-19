import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <AppLayout>
      <div className="ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Terms of Use</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: April 18, 2025
        </p>

        <Card>
          <CardContent className="pt-6 prose prose-slate max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and LoveHealth AI Compass ("we," "us" or "our"), concerning your access to and use of the LoveHealth AI Compass website and mobile application (collectively, the "Platform").
            </p>
            <p>
              By accessing or using the Platform, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, then you may not access the Platform.
            </p>

            <h2>Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Platform (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
            </p>
            <p>
              The Content and Marks are provided on the Platform "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Platform and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>

            <h2>User Representations</h2>
            <p>
              By using the Platform, you represent and warrant that:
            </p>
            <ol>
              <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
              <li>You are not under the age of 13.</li>
              <li>You will not access the Platform through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Platform for any illegal or unauthorized purpose.</li>
              <li>Your use of the Platform will not violate any applicable law or regulation.</li>
            </ol>

            <h2>Health Information Disclaimer</h2>
            <p>
              The Platform provides general health information and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            <p>
              The AI health assistant, Ayu, provides general guidance based on the information you provide. Ayu's responses should not be considered medical advice, diagnosis, or treatment recommendations. The information provided by Ayu is for educational purposes only.
            </p>
            <p>
              Never disregard professional medical advice or delay in seeking it because of something you have read or heard on the Platform. If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>

            <h2>User Registration</h2>
            <p>
              You may be required to register with the Platform. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>

            <h2>Prohibited Activities</h2>
            <p>
              You may not access or use the Platform for any purpose other than that for which we make the Platform available. The Platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p>
              As a user of the Platform, you agree not to:
            </p>
            <ol>
              <li>Systematically retrieve data or other content from the Platform to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Platform.</li>
              <li>Engage in unauthorized framing of or linking to the Platform.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages.</li>
              <li>Interfere with, disrupt, or create an undue burden on the Platform or the networks or services connected to the Platform.</li>
              <li>Attempt to impersonate another user or person or use the username of another user.</li>
              <li>Use any information obtained from the Platform in order to harass, abuse, or harm another person.</li>
              <li>Use the Platform as part of any effort to compete with us or otherwise use the Platform and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
            </ol>

            <h2>Limitation of Liability</h2>
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE PLATFORM, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your use of the Platform, your breach of these Terms of Use, or your violation of any law or the rights of a third party.
            </p>

            <h2>Term and Termination</h2>
            <p>
              These Terms of Use shall remain in full force and effect while you use the Platform. We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Use.
            </p>

            <h2>Modifications and Interruptions</h2>
            <p>
              We reserve the right to change, modify, or remove the contents of the Platform at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Platform without notice at any time.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and defined following the laws of India. LoveHealth AI Compass and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <p>
              Email: terms@lovehealthai.com<br />
              Address: 123 Health Street, Bengaluru, Karnataka, India
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Terms;
