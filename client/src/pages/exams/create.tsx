import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function CreateExamPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [questions, setQuestions] = useState([
    { id: 1, text: "", options: ["", "", "", ""], correct: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQs = [...questions];
    if (field === "text") newQs[index].text = value;
    if (field === "correct") newQs[index].correct = value;
    setQuestions(newQs);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQs = [...questions];
    newQs[qIndex].options[oIndex] = value;
    setQuestions(newQs);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast({
      title: "Exam Created",
      description: "The exam has been saved successfully.",
    });
    setLocation("/exams");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/exams">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold">Create New Exam</h1>
              <p className="text-muted-foreground">Set up details and add questions.</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Exam Details */}
            <Card>
              <CardHeader>
                <CardTitle>Exam Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Exam Title</Label>
                  <Input placeholder="e.g. Final Mathematics Assessment" />
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="e.g. Mathematics" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>Duration (Minutes)</Label>
                  <Input type="number" placeholder="60" />
                </div>
              </CardContent>
            </Card>

            {/* Questions Builder */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
                <Button onClick={addQuestion} variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> Add Question
                </Button>
              </div>

              {questions.map((q, qIndex) => (
                <Card key={q.id} className="relative group">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold text-sm">
                        {qIndex + 1}
                      </span>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <Label>Question Text</Label>
                          <Input 
                            value={q.text} 
                            onChange={(e) => updateQuestion(qIndex, "text", e.target.value)} 
                            placeholder="Enter your question here..." 
                          />
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          {q.options.map((opt, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <div 
                                className={`w-4 h-4 rounded-full border cursor-pointer flex items-center justify-center ${q.correct === oIndex ? 'border-primary bg-primary' : 'border-muted-foreground'}`}
                                onClick={() => updateQuestion(qIndex, "correct", oIndex)}
                              >
                                {q.correct === oIndex && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                              <Input 
                                value={opt} 
                                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                placeholder={`Option ${oIndex + 1}`} 
                                className={q.correct === oIndex ? "border-primary ring-1 ring-primary" : ""}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeQuestion(qIndex)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link href="/exams">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button onClick={handleSave} size="lg">Save Exam</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
