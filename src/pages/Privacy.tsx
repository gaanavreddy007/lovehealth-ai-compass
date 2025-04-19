import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <AppLayout>
      <div className="ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: April 18, 2025
        </p>

        <Card>
          <CardContent className="pt-6 prose prose-slate max-w-none">
            <h2>Introduction</h2>
            <p>
              LoveHealth AI Compass ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and mobile application (collectively, the "Platform").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the Platform, express interest in obtaining information about us or our products and services, or otherwise contact us. The personal information we collect may include:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Language preferences</li>
              <li>Health-related information you choose to share</li>
            </ul>

            <h3>Usage Information</h3>
            <p>
              We automatically collect certain information when you visit, use, or navigate the Platform. This information does not reveal your specific identity but may include:
            </p>
            <ul>
              <li>Device and usage information</li>
              <li>IP address</li>
              <li>Browser and device characteristics</li>
              <li>Operating system</li>
              <li>Language preferences</li>
              <li>Referring URLs</li>
              <li>Information about how and when you use our Platform</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
              <li>Providing, personalizing, and improving our Platform</li>
              <li>Communicating with you about our services</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Sending you updates and promotional materials</li>
              <li>Monitoring and analyzing usage trends</li>
              <li>Protecting our Platform and users from security threats</li>
            </ul>

            <h2>Health Information and AI Interactions</h2>
            <p>
              Our Platform includes an AI health assistant named Ayu. When you interact with Ayu:
            </p>
            <ul>
              <li>Your conversations may be temporarily stored to provide context for the conversation</li>
              <li>We do not permanently store the content of your health-related conversations</li>
              <li>We may use anonymized and aggregated data to improve our AI services</li>
              <li>We do not use your health information for marketing purposes</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>We may share information in the following situations:</p>
            <ul>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third-party vendors, service providers, and other third parties who perform services for us.</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
              <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
              <li><strong>Legal Obligations:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission or storage of information can be entirely secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul>
              <li>The right to access the personal information we have about you</li>
              <li>The right to request correction of your personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to withdraw consent</li>
              <li>The right to object to processing of your personal information</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our Platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@lovehealthai.com<br />
              Address: 123 Health Street, Bengaluru, Karnataka, India
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Privacy;
