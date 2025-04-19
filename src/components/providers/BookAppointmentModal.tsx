import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, Clock, Video, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
];

const BookAppointmentModal = ({ isOpen, onClose, providerName }: BookAppointmentModalProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");
  
  const { toast } = useToast();
  
  // Get available time slots for selected date (simulated)
  const getAvailableTimeSlots = () => {
    if (!date) return [];
    
    const day = date.getDay();
    
    // Simulate unavailable slots for weekends and certain times on weekdays
    if (day === 0) {
      // Sunday - limited slots
      return timeSlots.filter((_, index) => index < 4);
    } else if (day === 6) {
      // Saturday - morning only
      return timeSlots.filter((_, index) => index < 8);
    } else {
      // Weekdays - random slots unavailable
      return timeSlots.filter((_, index) => {
        const dateValue = date.getDate();
        return (index + dateValue) % 4 !== 0; // Simple algorithm to make some slots unavailable
      });
    }
  };
  
  const availableTimeSlots = getAvailableTimeSlots();
  
  // Check if a date should be disabled (past dates or full days)
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (date < today) {
      return true;
    }
    
    // Disable dates more than 30 days in the future
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    if (date > thirtyDaysFromNow) {
      return true;
    }
    
    return false;
  };
  
  const handleBookAppointment = () => {
    // Validate form
    if (!date) {
      toast({
        title: "Missing Date",
        description: "Please select an appointment date",
        variant: "destructive",
      });
      return;
    }
    
    if (!timeSlot) {
      toast({
        title: "Missing Time",
        description: "Please select an appointment time",
        variant: "destructive",
      });
      return;
    }
    
    if (!patientName || !patientPhone) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and contact information",
        variant: "destructive",
      });
      return;
    }
    
    // Format date for display
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // In a real app, this would submit the booking to an API
    toast({
      title: "Appointment Booked Successfully",
      description: `Your ${appointmentType} appointment with ${providerName} is scheduled for ${formattedDate} at ${timeSlot}.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5 text-ayurveda-sage" />
            Book Appointment with {providerName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-semibold flex items-center">
              <CalendarCheck className="mr-2 h-4 w-4 text-ayurveda-sage" />
              Select Date
            </Label>
            <div className="mt-2 border rounded-md p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateDisabled}
                className="mx-auto"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-semibold flex items-center">
              <Clock className="mr-2 h-4 w-4 text-ayurveda-sage" />
              Select Time
            </Label>
            <Select
              value={timeSlot}
              onValueChange={setTimeSlot}
              disabled={!date || availableTimeSlots.length === 0}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    No available slots for the selected date
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-semibold flex items-center">
              <Video className="mr-2 h-4 w-4 text-ayurveda-sage" />
              Appointment Type
            </Label>
            <RadioGroup 
              value={appointmentType}
              onValueChange={setAppointmentType}
              className="mt-2 space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person" className="flex items-center">
                  <span>In-Person Visit</span>
                  <Badge className="ml-2" variant="outline">Regular Price</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="flex items-center">
                  <span>Video Consultation</span>
                  <Badge className="ml-2" variant="outline">10% Off</Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <Label className="text-sm font-semibold flex items-center">
              <User className="mr-2 h-4 w-4 text-ayurveda-sage" />
              Patient Information
            </Label>
            
            <div className="space-y-2">
              <Label htmlFor="patient-name">Full Name</Label>
              <Input
                id="patient-name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient's full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patient-phone">Phone Number</Label>
              <Input
                id="patient-phone"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="Enter contact phone number"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center" htmlFor="appointment-reason">
              <FileText className="mr-2 h-4 w-4 text-ayurveda-sage" />
              Reason for Visit (Optional)
            </Label>
            <Textarea
              id="appointment-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe your symptoms or reason for appointment"
              rows={3}
            />
          </div>
          
          <Button 
            className="w-full"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
