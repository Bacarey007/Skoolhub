export interface ClassGrade {
  id: string;
  name: string; // e.g. "Grade 10"
  sections: string[]; // e.g. ["A", "B", "C"]
  classTeacher?: string;
}

export interface AcademicTerm {
  id: string;
  name: string; // e.g. "Fall 2025"
  startDate: Date;
  endDate: Date;
  status: "current" | "upcoming" | "past";
}

export const MOCK_CLASSES: ClassGrade[] = [
  { id: "c1", name: "Grade 10", sections: ["A", "B", "C"], classTeacher: "John Anderson" },
  { id: "c2", name: "Grade 9", sections: ["A", "B"], classTeacher: "Marie Curie" },
  { id: "c3", name: "Grade 8", sections: ["A", "B", "C", "D"], classTeacher: "Walt Whitman" },
];

export const MOCK_TERMS: AcademicTerm[] = [
  { id: "t1", name: "Fall 2025", startDate: new Date(2025, 8, 1), endDate: new Date(2025, 11, 20), status: "current" },
  { id: "t2", name: "Spring 2026", startDate: new Date(2026, 0, 10), endDate: new Date(2026, 4, 30), status: "upcoming" },
];
