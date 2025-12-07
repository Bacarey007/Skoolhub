import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  Clock,
  CheckCircle2
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockStudents";
import { MOCK_EMPLOYEES } from "@/lib/mockHR";
import { MOCK_CLASSES } from "@/lib/mockClasses";
import { MOCK_EVENTS } from "@/lib/mockData";
import { MOCK_TRANSACTIONS } from "@/lib/mockFinance";
import { Link } from "wouter";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const chartData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 1500 },
  { name: "Jun", total: 3200 },
];

export default function DashboardPage() {
  const totalStudents = MOCK_STUDENTS.length;
  const totalStaff = MOCK_EMPLOYEES.length;
  const totalClasses = MOCK_CLASSES.length;
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 3);
  const upcomingEvents = MOCK_EVENTS.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>
            <div className="flex gap-2">
              <Button>
                <TrendingUp className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents * 125}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStaff * 12}</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClasses * 4}</div>
                <p className="text-xs text-muted-foreground">
                  Across 3 grades
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            
            {/* Chart Section */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Fee Collection Overview</CardTitle>
                <CardDescription>Monthly revenue from tuition and other fees.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events / Quick Actions */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  You have {upcomingEvents.length} events scheduled soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center">
                      <div className="w-9 h-9 rounded-full border flex items-center justify-center bg-secondary">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString()} • {event.location}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Link href="/events">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h4 className="text-sm font-medium mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/students">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" /> Add Student
                      </Button>
                    </Link>
                    <Link href="/finance">
                      <Button variant="outline" className="w-full justify-start">
                        <DollarSign className="mr-2 h-4 w-4" /> Collect Fee
                      </Button>
                    </Link>
                    <Link href="/attendance">
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="mr-2 h-4 w-4" /> Attendance
                      </Button>
                    </Link>
                    <Link href="/exams/create">
                      <Button variant="outline" className="w-full justify-start">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Create Exam
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest fee payments received.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 {recentTransactions.map((t) => (
                   <div key={t.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                     <div className="flex items-center gap-4">
                       <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                         <DollarSign className="h-4 w-4" />
                       </div>
                       <div>
                         <p className="text-sm font-medium">{t.studentName}</p>
                         <p className="text-xs text-muted-foreground">{t.category} • {t.rollNo}</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <p className="text-sm font-medium">+${t.amount.toFixed(2)}</p>
                       <p className="text-xs text-muted-foreground">{t.date.toLocaleDateString()}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
