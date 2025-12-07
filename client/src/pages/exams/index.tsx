import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Clock, FileQuestion, Calendar, PlayCircle, Edit } from "lucide-react";
import { MOCK_EXAMS, Exam } from "@/lib/mockExams";
import { Link, useLocation } from "wouter";
import { format } from "date-fns";

export default function ExamsDashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">CBT Exams</h1>
              <p className="text-muted-foreground mt-1">Manage and conduct computer-based tests.</p>
            </div>
          </div>

          <Tabs defaultValue="teacher" className="w-full space-y-6">
            <div className="flex justify-between items-center bg-muted/30 p-1 rounded-lg">
              <TabsList>
                <TabsTrigger value="teacher">Teacher View (Manage)</TabsTrigger>
                <TabsTrigger value="student">Student View (Take)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="teacher" className="space-y-6 animate-in fade-in-50">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-semibold">Created Exams</h2>
                 <Link href="/exams/create">
                   <Button>
                     <Plus className="w-4 h-4 mr-2" />
                     Create New Exam
                   </Button>
                 </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_EXAMS.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} mode="teacher" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="student" className="space-y-6 animate-in fade-in-50">
               <h2 className="text-xl font-semibold">Available Exams</h2>
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_EXAMS.filter(e => e.status !== 'draft').map((exam) => (
                  <ExamCard key={exam.id} exam={exam} mode="student" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function ExamCard({ exam, mode }: { exam: Exam; mode: 'teacher' | 'student' }) {
  const [, setLocation] = useLocation();

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={exam.status === 'active' ? 'default' : 'secondary'} className="capitalize">
            {exam.status}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium bg-secondary px-2 py-1 rounded">
            {exam.subject}
          </span>
        </div>
        <CardTitle className="font-display text-lg">{exam.title}</CardTitle>
        <CardDescription>{format(exam.date, "PPP p")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{exam.durationMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <FileQuestion className="w-4 h-4" />
            <span>{exam.totalQuestions} Qs</span>
          </div>
        </div>
        
        {mode === 'teacher' ? (
          <Button variant="outline" className="w-full">
            <Edit className="w-4 h-4 mr-2" />
            Edit Exam
          </Button>
        ) : (
          <Button 
            className="w-full" 
            disabled={exam.status !== 'active'}
            onClick={() => setLocation(`/exams/${exam.id}/take`)}
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            {exam.status === 'active' ? 'Start Exam' : 'Not Available'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
