import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MOCK_SUBJECTS, MOCK_TIMETABLE } from "@/lib/mockAcademics";
import { BookOpen, Users, Clock, GraduationCap, BarChart3 } from "lucide-react";

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Academics</h1>
            <p className="text-muted-foreground mt-1">Curriculum, class schedules, and subject management.</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timetable">Timetable</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
            </TabsList>

            {/* Overview Content */}
            <TabsContent value="overview" className="space-y-6 animate-in fade-in-50">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{MOCK_SUBJECTS.length}</div>
                    <p className="text-xs text-muted-foreground">Active curriculum</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Class Average</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">88%</div>
                    <p className="text-xs text-muted-foreground">+2.5% from last term</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">Across all departments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">School Days</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">180</div>
                    <p className="text-xs text-muted-foreground">Days in academic year</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Department Performance</CardTitle>
                    <CardDescription>Average student grades by department.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Mathematics", "Science", "Languages", "Arts", "Humanities"].map((dept, i) => (
                        <div key={dept} className="flex items-center gap-4">
                          <div className="w-24 text-sm font-medium">{dept}</div>
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${85 + (i * 2)}%` }}
                            />
                          </div>
                          <div className="w-12 text-sm text-right text-muted-foreground">{85 + (i * 2)}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Upcoming Assessments</CardTitle>
                    <CardDescription>Key dates for tests and submissions.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Mid-Term Physics Exam", date: "Dec 15", type: "Exam" },
                        { title: "English Essay Submission", date: "Dec 18", type: "Assignment" },
                        { title: "History Project Presentation", date: "Dec 20", type: "Project" },
                        { title: "Math Quiz - Algebra", date: "Dec 22", type: "Quiz" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                          <Badge variant="outline">{item.date}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Timetable Content */}
            <TabsContent value="timetable" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                   <CardTitle>Class Schedule - Grade 10A</CardTitle>
                   <CardDescription>Weekly timetable for the current semester.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="rounded-md border overflow-x-auto">
                     <div className="min-w-[800px]">
                       <div className="grid grid-cols-6 border-b bg-muted/50 text-sm font-medium">
                         <div className="p-4 border-r">Time / Day</div>
                         {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                           <div key={day} className="p-4 border-r last:border-r-0 text-center">{day}</div>
                         ))}
                       </div>
                       
                       {/* This is a simplified view, normally you'd map timeslots. 
                           Here we map rows based on mock data structure for demo */}
                        <div className="divide-y">
                          {[0, 1, 2, 3].map((periodIndex) => (
                             <div key={periodIndex} className="grid grid-cols-6 text-sm">
                                <div className="p-4 border-r font-medium flex items-center justify-center bg-muted/10">
                                  {MOCK_TIMETABLE[0].periods[periodIndex].time}
                                </div>
                                {MOCK_TIMETABLE.map((day, dayIndex) => {
                                  const period = day.periods[periodIndex];
                                  return (
                                    <div key={day.day} className="p-4 border-r last:border-r-0 hover:bg-muted/30 transition-colors">
                                      <div className="font-medium text-primary">{period.subject}</div>
                                      <div className="text-xs text-muted-foreground mt-1">Room {period.room}</div>
                                    </div>
                                  );
                                })}
                             </div>
                          ))}
                        </div>
                     </div>
                   </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subjects Content */}
            <TabsContent value="subjects" className="animate-in fade-in-50">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_SUBJECTS.map((subject) => (
                  <Card key={subject.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                       <div className="flex justify-between items-start">
                         <Badge variant="outline">{subject.code}</Badge>
                         <GraduationCap className="h-4 w-4 text-muted-foreground" />
                       </div>
                       <CardTitle className="text-lg mt-2">{subject.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Teacher:</span>
                          <span className="font-medium text-foreground">{subject.teacher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credits:</span>
                          <span className="font-medium text-foreground">{subject.credits}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
