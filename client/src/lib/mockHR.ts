export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  joinDate: Date;
  email: string;
  phone: string;
  status: "active" | "leave" | "resigned";
}

export const MOCK_EMPLOYEES: Employee[] = [
  { id: "e1", name: "John Anderson", employeeId: "EMP001", department: "Mathematics", designation: "HOD", joinDate: new Date(2018, 5, 15), email: "j.anderson@school.edu", phone: "+1 555 0101", status: "active" },
  { id: "e2", name: "Marie Curie", employeeId: "EMP002", department: "Science", designation: "Senior Teacher", joinDate: new Date(2019, 2, 10), email: "m.curie@school.edu", phone: "+1 555 0102", status: "active" },
  { id: "e3", name: "Walt Whitman", employeeId: "EMP003", department: "English", designation: "Teacher", joinDate: new Date(2020, 8, 1), email: "w.whitman@school.edu", phone: "+1 555 0103", status: "leave" },
  { id: "e4", name: "Alan Turing", employeeId: "EMP004", department: "Computer Science", designation: "Lab Instructor", joinDate: new Date(2021, 1, 20), email: "a.turing@school.edu", phone: "+1 555 0104", status: "active" },
];
