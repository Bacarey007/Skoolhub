import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MOCK_CLASSES, MOCK_TERMS } from "@/lib/mockClasses";
import { MOCK_SUBJECTS } from "@/lib/mockAcademics";
import { Plus, Book, CalendarRange, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClassesPage() {
  const { toast } = useToast();
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);

  const handleCreate = (type: string) => {
    setIsClassOpen(false);
    setIsSubjectOpen(false);
    setIsTermOpen(false);
    toast({
      title: `${type} Created`,
      description: `New ${type.toLowerCase()} has been added to the system.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Classes & Academics</h1>
            <p className="text-muted-foreground mt-1">Manage classes, subjects, and academic terms.</p>
          </div>

          <Tabs defaultValue="classes" className="space-y-6">
            <TabsList>
              <TabsTrigger value="classes">Classes & Sections</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
            </TabsList>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Class Management</h2>
                <Dialog open={isClassOpen} onOpenChange={setIsClassOpen}>
                  <DialogTrigger asChild>
                    <Button><Plus className="w-4 h-4 mr-2" /> Create Class</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Class</DialogTitle>
                      <DialogDescription>Define a new grade level and its sections.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Class Name</Label>
                        <Input placeholder="e.g. Grade 11" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Sections (comma separated)</Label>
                        <Input placeholder="A, B, C" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Class Teacher (Optional)</Label>
                        <Input placeholder="Select teacher..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleCreate("Class")}>Create Class</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_CLASSES.map((cls) => (
                  <Card key={cls.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between">
                        {cls.name}
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </CardTitle>
                      <CardDescription>Teacher: {cls.classTeacher}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cls.sections.map((sec) => (
                          <Badge key={sec} variant="secondary">Section {sec}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Subjects Tab */}
            <TabsContent value="subjects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Subject Allocation</h2>
                <Dialog open={isSubjectOpen} onOpenChange={setIsSubjectOpen}>
                  <DialogTrigger asChild>
                    <Button><Plus className="w-4 h-4 mr-2" /> Add Subject</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Subject</DialogTitle>
                      <DialogDescription>Create a subject and assign it to a teacher.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Subject Name</Label>
                        <Input placeholder="e.g. Biology" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Subject Code</Label>
                        <Input placeholder="e.g. BIO101" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Assign Teacher</Label>
                        <Input placeholder="Select teacher..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleCreate("Subject")}>Add Subject</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="border rounded-md bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Subject Name</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_SUBJECTS.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-mono">{sub.code}</TableCell>
                        <TableCell className="font-medium">{sub.name}</TableCell>
                        <TableCell>{sub.teacher}</TableCell>
                        <TableCell>{sub.credits}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Terms Tab */}
            <TabsContent value="terms" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Academic Terms</h2>
                <Dialog open={isTermOpen} onOpenChange={setIsTermOpen}>
                  <DialogTrigger asChild>
                    <Button><Plus className="w-4 h-4 mr-2" /> New Term</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Academic Term</DialogTitle>
                      <DialogDescription>Set dates for a new semester or term.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Term Name</Label>
                        <Input placeholder="e.g. Summer 2026" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Start Date</Label>
                          <Input type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label>End Date</Label>
                          <Input type="date" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleCreate("Term")}>Create Term</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {MOCK_TERMS.map((term) => (
                  <Card key={term.id} className={term.status === 'current' ? 'border-primary' : ''}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{term.name}</CardTitle>
                        <Badge variant={term.status === 'current' ? 'default' : 'secondary'} className="capitalize">
                          {term.status}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <CalendarRange className="w-4 h-4" />
                        {term.startDate.toLocaleDateString()} - {term.endDate.toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
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
