import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="ayu-container py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              {isSubmitted ? (
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2 text-ayurveda-deepblue">Thank You!</h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll respond as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input 
                            id="name" 
                            placeholder="Enter your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select 
                          value={subject} 
                          onValueChange={setSubject}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Type your message here" 
                          rows={6}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </>
              )}
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-ayurveda-terracotta mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">info@lovehealthai.com</p>
                    <p className="text-sm text-muted-foreground">support@lovehealthai.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-ayurveda-sage mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">+91 80 1234 5678</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-ayurveda-deepblue mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Health Street<br />
                      Indiranagar, Bengaluru<br />
                      Karnataka 560038, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">How quickly will I receive a response?</h3>
                  <p className="text-xs text-muted-foreground">We typically respond to all inquiries within 24-48 business hours.</p>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Is there a customer support number?</h3>
                  <p className="text-xs text-muted-foreground">Yes, you can reach our support team at +91 80 1234 5678 during business hours.</p>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Can I visit your office?</h3>
                  <p className="text-xs text-muted-foreground">Yes, but please schedule an appointment first by contacting us via email or phone.</p>
                </div>
                
                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                  <Link to="/faq">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View All FAQs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contact;
