export interface Student {
  id: string;
  name: string;
  rollNo: string;
  grade: string;
  section: string;
  status: "active" | "inactive";
  attendance: number;
  email: string;
  parentName: string;
  parentPhone: string;
}

export const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    rollNo: "10A001",
    grade: "10",
    section: "A",
    status: "active",
    attendance: 98,
    email: "alex.j@school.edu",
    parentName: "Robert Johnson",
    parentPhone: "+1 234 567 8901",
  },
  {
    id: "2",
    name: "Sarah Williams",
    rollNo: "10A002",
    grade: "10",
    section: "A",
    status: "active",
    attendance: 92,
    email: "sarah.w@school.edu",
    parentName: "Emily Williams",
    parentPhone: "+1 234 567 8902",
  },
  {
    id: "3",
    name: "Michael Chen",
    rollNo: "10B001",
    grade: "10",
    section: "B",
    status: "inactive",
    attendance: 75,
    email: "michael.c@school.edu",
    parentName: "David Chen",
    parentPhone: "+1 234 567 8903",
  },
  {
    id: "4",
    name: "Emma Davis",
    rollNo: "09A015",
    grade: "9",
    section: "A",
    status: "active",
    attendance: 96,
    email: "emma.d@school.edu",
    parentName: "Jessica Davis",
    parentPhone: "+1 234 567 8904",
  },
  {
    id: "5",
    name: "James Wilson",
    rollNo: "09A016",
    grade: "9",
    section: "A",
    status: "active",
    attendance: 88,
    email: "james.w@school.edu",
    parentName: "Thomas Wilson",
    parentPhone: "+1 234 567 8905",
  },
];
