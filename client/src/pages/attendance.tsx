import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MOCK_STUDENTS } from "@/lib/mockStudents";
import { Check, X, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late">>({});

  const markAttendance = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${date?.toLocaleDateString()} has been recorded.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Attendance</h1>
              <p className="text-muted-foreground mt-1">Track student and staff attendance daily.</p>
            </div>
            <Button onClick={handleSave}>Save Attendance</Button>
          </div>

          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-none w-full"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Class Filter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select defaultValue="10A">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10A">Grade 10 - A</SelectItem>
                      <SelectItem value="10B">Grade 10 - B</SelectItem>
                      <SelectItem value="9A">Grade 9 - A</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            <Card className="h-fit">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Mark Attendance</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {date?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> Present</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> Absent</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Late</div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_STUDENTS.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-mono">{student.rollNo}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          {attendance[student.id] ? (
                            <Badge variant={attendance[student.id] === 'present' ? 'default' : attendance[student.id] === 'absent' ? 'destructive' : 'secondary'} className="capitalize">
                              {attendance[student.id]}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm italic">Not marked</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              size="icon" 
                              variant={attendance[student.id] === 'present' ? 'default' : 'outline'} 
                              className={`h-8 w-8 ${attendance[student.id] === 'present' ? 'bg-green-600 hover:bg-green-700' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                              onClick={() => markAttendance(student.id, 'present')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant={attendance[student.id] === 'absent' ? 'destructive' : 'outline'} 
                              className="h-8 w-8"
                              onClick={() => markAttendance(student.id, 'absent')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant={attendance[student.id] === 'late' ? 'secondary' : 'outline'} 
                              className={`h-8 w-8 ${attendance[student.id] === 'late' ? 'bg-yellow-100 text-yellow-700' : 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50'}`}
                              onClick={() => markAttendance(student.id, 'late')}
                            >
                              <Clock className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
