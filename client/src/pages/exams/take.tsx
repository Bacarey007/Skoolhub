import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { MOCK_EXAMS, Question } from "@/lib/mockExams";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function TakeExamPage() {
  const [, params] = useRoute("/exams/:id/take");
  const examId = params?.id;
  const exam = MOCK_EXAMS.find(e => e.id === examId);
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(exam ? exam.durationMinutes * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!exam || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [exam, isSubmitted]);

  if (!exam) return <div className="p-8">Exam not found</div>;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((Object.keys(answers).length) / exam.questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    if (isSubmitted) return;
    setAnswers({
      ...answers,
      [currentQuestion.id]: parseInt(value)
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Exam Submitted",
      description: "Your responses have been recorded.",
    });
  };

  if (isSubmitted) {
    // Simple Score Calculation for Mock
    let score = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correctOption) score++;
    });

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Exam Completed!</h1>
              <p className="text-muted-foreground">You have successfully finished {exam.title}.</p>
            </div>
            
            <div className="bg-secondary/50 p-6 rounded-lg space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Your Score</p>
              <div className="text-4xl font-display font-bold text-primary">
                {score} / {exam.questions.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((score / exam.questions.length) * 100)}% Accuracy
              </p>
            </div>

            <Link href="/exams">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-8 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">{exam.title}</h1>
            <p className="text-sm text-muted-foreground">{exam.subject}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-destructive' : 'text-primary'}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
            <Button variant="destructive" size="sm" onClick={handleSubmit}>Finish Exam</Button>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-8 grid gap-8 md:grid-cols-[1fr_300px]">
        {/* Question Area */}
        <div className="space-y-8">
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="mb-6">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {exam.questions.length}
                </span>
                <h2 className="text-xl font-medium mt-2 leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>

              <RadioGroup 
                value={answers[currentQuestion.id]?.toString()} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className={`flex items-center space-x-2 border rounded-lg p-4 transition-all hover:bg-secondary/50 ${answers[currentQuestion.id] === index ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-input'}`}>
                    <RadioGroupItem value={index.toString()} id={`opt-${index}`} />
                    <Label htmlFor={`opt-${index}`} className="flex-1 cursor-pointer font-normal text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button 
              onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === exam.questions.length - 1}
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar / Question Palette */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 w-10 rounded-md text-sm font-medium transition-colors border
                      ${currentQuestionIndex === idx ? 'ring-2 ring-offset-2 ring-primary border-primary' : ''}
                      ${answers[q.id] !== undefined ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-muted-foreground border-transparent hover:bg-secondary/80'}
                    `}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary border" />
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-primary" />
                  <span>Current</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
