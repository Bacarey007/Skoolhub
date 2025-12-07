import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_EMPLOYEES } from "@/lib/mockHR";
import { Plus, Search, Mail, Phone, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HRPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddOpen(false);
    toast({
      title: "Employee Added",
      description: "New staff member has been registered.",
    });
  };

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">HR & Staff</h1>
              <p className="text-muted-foreground mt-1">Manage employees, departments, and payroll.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" /> Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleAddEmployee}>
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>Register a new teacher or staff member.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Full Name</Label>
                        <Input required placeholder="John Doe" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Employee ID</Label>
                        <Input required placeholder="EMP00X" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input type="email" required placeholder="john@school.edu" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select dept" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Designation</Label>
                        <Input required placeholder="Senior Teacher" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Register</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search staff..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{emp.name}</div>
                          <div className="text-xs text-muted-foreground">{emp.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{emp.designation}</div>
                      <div className="text-xs text-muted-foreground">{emp.department}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="w-3 h-3" /> {emp.email}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="w-3 h-3" /> {emp.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{emp.joinDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={emp.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                        {emp.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
