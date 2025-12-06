import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Event, EVENT_TYPE_CONFIG } from "@/lib/mockData";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const typeConfig = EVENT_TYPE_CONFIG[event.type];
  const Icon = typeConfig.icon;

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-l-4" style={{ borderLeftColor: event.type === 'academic' ? '#2563eb' : event.type === 'sports' ? '#ea580c' : event.type === 'cultural' ? '#9333ea' : '#4b5563' }}>
      <CardHeader className="pb-3 space-y-0">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className={`${typeConfig.color} hover:${typeConfig.color} border-0`}>
            <Icon className="w-3 h-3 mr-1" />
            {typeConfig.label}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
            {event.status}
          </span>
        </div>
        <h3 className="font-display font-bold text-lg mt-3 leading-tight group-hover:text-primary transition-colors">
          {event.title}
        </h3>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary/70" />
            <span>{format(event.date, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary/70" />
            <span>{format(event.date, "h:mm a")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary/70" />
            <span>{event.attendees} Attendees</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t bg-muted/10 flex justify-end gap-2">
        <Button variant="ghost" size="sm" className="h-8 text-xs">View Details</Button>
        <Button variant="outline" size="sm" className="h-8 text-xs">Edit</Button>
      </CardFooter>
    </Card>
  );
}
