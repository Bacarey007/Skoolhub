export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  credits: number;
}

export interface TimetableEntry {
  day: string;
  periods: {
    time: string;
    subject: string;
    room: string;
  }[];
}

export const MOCK_SUBJECTS: Subject[] = [
  { id: "1", name: "Mathematics", code: "MTH101", teacher: "Mr. Anderson", credits: 4 },
  { id: "2", name: "Physics", code: "PHY101", teacher: "Ms. Curie", credits: 3 },
  { id: "3", name: "Chemistry", code: "CHM101", teacher: "Mr. White", credits: 3 },
  { id: "4", name: "English Literature", code: "ENG101", teacher: "Mrs. Woolf", credits: 2 },
  { id: "5", name: "History", code: "HIS101", teacher: "Mr. Hobsbawm", credits: 2 },
];

export const MOCK_TIMETABLE: TimetableEntry[] = [
  {
    day: "Monday",
    periods: [
      { time: "09:00 - 10:00", subject: "Mathematics", room: "301" },
      { time: "10:00 - 11:00", subject: "Physics", room: "Lab 2" },
      { time: "11:15 - 12:15", subject: "English", room: "204" },
      { time: "13:00 - 14:00", subject: "History", room: "105" },
    ],
  },
  {
    day: "Tuesday",
    periods: [
      { time: "09:00 - 10:00", subject: "Chemistry", room: "Lab 1" },
      { time: "10:00 - 11:00", subject: "Mathematics", room: "301" },
      { time: "11:15 - 12:15", subject: "Sports", room: "Field" },
      { time: "13:00 - 14:00", subject: "Physics", room: "Lab 2" },
    ],
  },
  {
    day: "Wednesday",
    periods: [
      { time: "09:00 - 10:00", subject: "English", room: "204" },
      { time: "10:00 - 11:00", subject: "History", room: "105" },
      { time: "11:15 - 12:15", subject: "Mathematics", room: "301" },
      { time: "13:00 - 14:00", subject: "Chemistry", room: "Lab 1" },
    ],
  },
  {
    day: "Thursday",
    periods: [
      { time: "09:00 - 10:00", subject: "Physics", room: "Lab 2" },
      { time: "10:00 - 11:00", subject: "Chemistry", room: "Lab 1" },
      { time: "11:15 - 12:15", subject: "Library", room: "Lib" },
      { time: "13:00 - 14:00", subject: "Mathematics", room: "301" },
    ],
  },
  {
    day: "Friday",
    periods: [
      { time: "09:00 - 10:00", subject: "Mathematics", room: "301" },
      { time: "10:00 - 11:00", subject: "English", room: "204" },
      { time: "11:15 - 12:15", subject: "Art", room: "Studio" },
      { time: "13:00 - 14:00", subject: "Club Activities", room: "Various" },
    ],
  },
];
