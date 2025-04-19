import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface HealthLog {
  date: string;
  symptom: string;
  notes: string;
}

const LOCAL_STORAGE_KEY = "health_logs";

export default function HealthTracker() {
  const [symptom, setSymptom] = useState("");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setLogs(JSON.parse(stored));
  }, []);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptom.trim()) {
      toast({ title: "Symptom is required", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const newLog: HealthLog = {
      date: new Date().toLocaleString(),
      symptom,
      notes,
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLogs));
    setSymptom("");
    setNotes("");
    toast({ title: "Health log added" });
    setIsLoading(false);
  };

  return (
    <div className="ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <Card role="main" aria-label="Health tracking form">
        <CardHeader>
          <CardTitle id="health-tracker-title">Health Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddLog} className="space-y-4" aria-labelledby="health-tracker-title" role="form">
            <div>
              <label htmlFor="health-symptom" className="block text-sm font-medium mb-1">Symptom / Event</label>
              <Input
                id="health-symptom"
                value={symptom}
                onChange={e => setSymptom(e.target.value)}
                placeholder="e.g. Headache, Fever, Mood, Medication"
                required
                aria-required="true"
                aria-label="Symptom or health event"
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
              />
            </div>
            <div>
              <label htmlFor="health-notes" className="block text-sm font-medium mb-1">Notes (optional)</label>
              <Textarea
                id="health-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add any details, triggers, or actions taken"
                aria-label="Additional notes"
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all"
              />
            </div>
            <Button type="submit" className="w-full bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ayurveda-terracotta transition-all flex items-center justify-center gap-2" aria-label="Add health log" disabled={isLoading}>
              {isLoading && <span className="loader h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>}
              {isLoading ? "Adding..." : "Add Log"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Logs</h2>
        {logs.length === 0 ? (
          <p className="text-muted-foreground">No logs yet. Start tracking your health events!</p>
        ) : (
          <div className="space-y-4" role="list" aria-label="Recent health logs">
            {logs.slice(0, 10).map((log, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base">{log.symptom}</CardTitle>
                  <div className="text-xs text-muted-foreground">{log.date}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm whitespace-pre-line">{log.notes || <span className="italic text-muted-foreground">No notes</span>}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
