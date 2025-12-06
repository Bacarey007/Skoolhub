import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { EventCard } from "@/components/events/EventCard";
import { EventStats } from "@/components/events/EventStats";
import { MOCK_EVENTS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateOpen(false);
    toast({
      title: "Event Created",
      description: "The event has been successfully scheduled.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Events</h1>
              <p className="text-muted-foreground mt-1">Manage school activities, schedules, and extracurriculars.</p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="shadow-lg hover:shadow-xl transition-shadow">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleCreateEvent}>
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>
                        Add a new event to the school calendar.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input id="title" placeholder="e.g. Science Fair 2025" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Date</Label>
                          <Input type="date" required />
                        </div>
                        <div className="grid gap-2">
                          <Label>Time</Label>
                          <Input type="time" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="admin">Administrative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g. Auditorium" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter event details..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Event</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats */}
          <EventStats />

          {/* Main Content */}
          <Tabs defaultValue="list" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="list" className="px-4">List View</TabsTrigger>
                <TabsTrigger value="calendar" className="px-4">Calendar</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search events..." 
                    className="pl-8 w-[250px] bg-background" 
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="list" className="space-y-6 animate-in fade-in-50 duration-500 slide-in-from-bottom-5">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {MOCK_EVENTS.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="animate-in fade-in-50 duration-500 slide-in-from-bottom-5">
              <div className="grid md:grid-cols-[300px_1fr] gap-6">
                <Card>
                  <CardContent className="p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border shadow-none w-full"
                    />
                  </CardContent>
                </Card>
                <Card className="flex-1 min-h-[500px]">
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-lg mb-4">
                      Events for {date?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    {MOCK_EVENTS.filter(e => e.date.toDateString() === date?.toDateString()).length > 0 ? (
                      <div className="grid gap-4">
                        {MOCK_EVENTS.filter(e => e.date.toDateString() === date?.toDateString()).map(event => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2">
                        <Calendar className="h-12 w-12 opacity-20" />
                        <p>No events scheduled for this day.</p>
                        <Button variant="link" onClick={() => setIsCreateOpen(true)}>Schedule something?</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
