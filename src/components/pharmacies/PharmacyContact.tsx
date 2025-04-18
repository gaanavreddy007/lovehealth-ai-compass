
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface PharmacyContactProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacyName: string;
  pharmacyPhone: string;
}

const PharmacyContact = ({ isOpen, onClose, pharmacyName, pharmacyPhone }: PharmacyContactProps) => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !phone.trim()) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent",
      description: `Your inquiry has been sent to ${pharmacyName}. They will contact you shortly.`,
    });
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {pharmacyName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pharmacy-phone">Pharmacy Phone</Label>
            <Input 
              id="pharmacy-phone" 
              value={pharmacyPhone} 
              readOnly 
              className="bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="your-phone">Your Phone Number</Label>
            <Input 
              id="your-phone" 
              type="tel" 
              placeholder="+91 XXXXX XXXXX" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Your Message or Query</Label>
            <Textarea 
              id="message" 
              placeholder="I'd like to inquire about medication availability..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Send Message
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PharmacyContact;
