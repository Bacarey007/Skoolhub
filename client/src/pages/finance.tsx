import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign, Download, Filter, TrendingUp, AlertCircle } from "lucide-react";
import { MOCK_FEE_CATEGORIES, MOCK_TRANSACTIONS } from "@/lib/mockFinance";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function FinancePage() {
  const { toast } = useToast();
  const [isAddFeeOpen, setIsAddFeeOpen] = useState(false);

  const handleAddFee = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddFeeOpen(false);
    toast({
      title: "Fee Structure Created",
      description: "New fee category has been added successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Finance</h1>
              <p className="text-muted-foreground mt-1">Manage fees, collections, and transactions.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Report
              </Button>
              <Dialog open={isAddFeeOpen} onOpenChange={setIsAddFeeOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> Create Fee
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleAddFee}>
                    <DialogHeader>
                      <DialogTitle>Create Fee Category</DialogTitle>
                      <DialogDescription>Add a new fee type (e.g., Tuition, Excursion).</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input placeholder="e.g. Annual Sports Fee" required />
                      </div>
                      <div className="grid gap-2">
                        <Label>Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-8" type="number" placeholder="0.00" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Frequency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="termly">Termly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="one-time">One-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Description</Label>
                        <Input placeholder="Optional details..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Fee</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Collections (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.00</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1 text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">$12,450.00</div>
                <p className="text-xs text-muted-foreground mt-1">
                  145 students overdue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,200.00</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Salaries & Maintenance
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="structure">Fee Structure</TabsTrigger>
              <TabsTrigger value="defaulters">Defaulters</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Input placeholder="Search transaction ID or student..." className="max-w-sm" />
                <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
              </div>
              <div className="border rounded-md bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_TRANSACTIONS.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>
                          <div className="font-medium">{t.studentName}</div>
                          <div className="text-xs text-muted-foreground">{t.rollNo}</div>
                        </TableCell>
                        <TableCell>{t.category}</TableCell>
                        <TableCell>{format(t.date, "MMM d, yyyy")}</TableCell>
                        <TableCell className="capitalize">{t.paymentMethod || "-"}</TableCell>
                        <TableCell>
                          <Badge variant={t.status === 'paid' ? 'default' : t.status === 'overdue' ? 'destructive' : 'secondary'}>
                            {t.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${t.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_FEE_CATEGORIES.map((fee) => (
                  <Card key={fee.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{fee.name}</CardTitle>
                        <Badge variant="outline" className="capitalize">{fee.frequency}</Badge>
                      </div>
                      <CardDescription>{fee.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${fee.amount.toFixed(2)}</div>
                      {fee.dueDate && (
                        <p className="text-sm text-muted-foreground mt-2 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" /> Due: {format(fee.dueDate, "MMM d, yyyy")}
                        </p>
                      )}
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
