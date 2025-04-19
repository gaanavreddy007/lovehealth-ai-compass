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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="w-full max-w-2xl mx-auto" role="main" aria-label="Contact form">
              {isSubmitted ? (
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2 text-ayurveda-deepblue" id="contact-title">Thank You!</h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
                    aria-label="Send another message"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle id="contact-title">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll respond as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="contact-title" role="form">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                        <Input 
                          id="name" 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          aria-required="true"
                          aria-label="Your name"
                          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          aria-required="true"
                          aria-label="Your email address"
                          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                        <Select 
                          value={subject} 
                          onValueChange={setSubject}
                          aria-label="Subject"
                        >
                          <SelectTrigger className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Feedback">Feedback</SelectItem>
                            <SelectItem value="Support">Support</SelectItem>
                            <SelectItem value="Medical">Medical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                        <Textarea 
                          id="message" 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          aria-required="true"
                          aria-label="Your message"
                          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all flex items-center justify-center gap-2" 
                        aria-label="Send message" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting && <span className="loader h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>}
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
                
                <Button asChild variant="outline" size="sm" className="w-full mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all" aria-label="View all FAQs">
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
