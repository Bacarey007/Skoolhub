export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number; // Index 0-3
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  status: 'upcoming' | 'active' | 'completed' | 'draft';
  date: Date;
  questions: Question[];
}

export const MOCK_EXAMS: Exam[] = [
  {
    id: "1",
    title: "Mid-Term Physics Assessment",
    subject: "Physics",
    durationMinutes: 45,
    totalQuestions: 20,
    status: 'active',
    date: new Date(2025, 11, 15, 10, 0),
    questions: [
      {
        id: "q1",
        text: "What is the unit of Force?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correctOption: 0
      },
      {
        id: "q2",
        text: "Which of these is a scalar quantity?",
        options: ["Velocity", "Displacement", "Speed", "Acceleration"],
        correctOption: 2
      }
    ]
  },
  {
    id: "2",
    title: "History of World War II",
    subject: "History",
    durationMinutes: 60,
    totalQuestions: 40,
    status: 'upcoming',
    date: new Date(2025, 11, 20, 14, 0),
    questions: []
  },
  {
    id: "3",
    title: "Basic Algebra Quiz",
    subject: "Mathematics",
    durationMinutes: 30,
    totalQuestions: 15,
    status: 'draft',
    date: new Date(2025, 11, 25, 9, 0),
    questions: []
  }
];
