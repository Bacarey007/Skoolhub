import { Calendar, Trophy, BookOpen, Music, Users, Clock, MapPin } from "lucide-react";

export type EventType = "academic" | "sports" | "cultural" | "administrative";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: EventType;
  location: string;
  organizer: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Annual Science Fair 2025",
    description: "Showcasing innovative student projects across physics, chemistry, and biology.",
    date: new Date(2025, 11, 15, 9, 0), // Dec 15, 2025
    type: "academic",
    location: "Main Auditorium",
    organizer: "Science Department",
    attendees: 450,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Inter-School Basketball Finals",
    description: "Championship match against St. Mary's High School.",
    date: new Date(2025, 11, 10, 14, 30),
    type: "sports",
    location: "Sports Complex",
    organizer: "Athletics Dept",
    attendees: 200,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Winter Musical: Les Misérables",
    description: "The drama club presents a student-led production of the classic musical.",
    date: new Date(2025, 11, 20, 18, 0),
    type: "cultural",
    location: "Theater Hall",
    organizer: "Arts Council",
    attendees: 300,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Parent-Teacher Meeting",
    description: "Semester 1 progress review for all grades.",
    date: new Date(2025, 11, 5, 8, 0),
    type: "administrative",
    location: "Classrooms 1-12",
    organizer: "Administration",
    attendees: 150,
    status: "completed",
  },
  {
    id: "5",
    title: "Math Olympiad Prep",
    description: "Advanced problem solving workshop for registered students.",
    date: new Date(2025, 11, 12, 15, 0),
    type: "academic",
    location: "Room 304",
    organizer: "Math Department",
    attendees: 25,
    status: "upcoming",
  },
];

export const EVENT_TYPE_CONFIG = {
  academic: { label: "Academic", icon: BookOpen, color: "text-blue-600 bg-blue-50 border-blue-200" },
  sports: { label: "Sports", icon: Trophy, color: "text-orange-600 bg-orange-50 border-orange-200" },
  cultural: { label: "Cultural", icon: Music, color: "text-purple-600 bg-purple-50 border-purple-200" },
  administrative: { label: "Admin", icon: Users, color: "text-gray-600 bg-gray-50 border-gray-200" },
};
