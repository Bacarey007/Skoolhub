import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import EventsPage from "@/pages/events";
import ExamsDashboard from "@/pages/exams/index";
import CreateExamPage from "@/pages/exams/create";
import TakeExamPage from "@/pages/exams/take";
import StudentsPage from "@/pages/students";
import AcademicsPage from "@/pages/academics";
import SettingsPage from "@/pages/settings";
import FinancePage from "@/pages/finance";
import AttendancePage from "@/pages/attendance";
import ClassesPage from "@/pages/classes";
import HRPage from "@/pages/hr";

function Router() {
  return (
    <Switch>
      <Route path="/events" component={EventsPage} />
      <Route path="/exams" component={ExamsDashboard} />
      <Route path="/exams/create" component={CreateExamPage} />
      <Route path="/exams/:id/take" component={TakeExamPage} />
      <Route path="/students" component={StudentsPage} />
      <Route path="/academics" component={AcademicsPage} />
      <Route path="/finance" component={FinancePage} />
      <Route path="/attendance" component={AttendancePage} />
      <Route path="/classes" component={ClassesPage} />
      <Route path="/hr" component={HRPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/">
        <Redirect to="/events" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
