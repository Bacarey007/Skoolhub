export interface FeeCategory {
  id: string;
  name: string;
  description: string;
  amount: number;
  frequency: "monthly" | "termly" | "yearly" | "one-time";
  dueDate?: Date;
}

export interface Transaction {
  id: string;
  studentName: string;
  rollNo: string;
  category: string;
  amount: number;
  date: Date;
  status: "paid" | "pending" | "overdue";
  paymentMethod?: "cash" | "online" | "check";
}

export const MOCK_FEE_CATEGORIES: FeeCategory[] = [
  { id: "1", name: "Tuition Fee - Grade 10", description: "Standard academic tuition", amount: 1500, frequency: "termly" },
  { id: "2", name: "School Bus", description: "Transportation service", amount: 300, frequency: "monthly" },
  { id: "3", name: "Annual Excursion", description: "Trip to Science Museum", amount: 50, frequency: "one-time", dueDate: new Date(2025, 10, 15) },
  { id: "4", name: "Library Fee", description: "Annual library maintenance", amount: 100, frequency: "yearly" },
  { id: "5", name: "Lab Fee", description: "Science laboratory materials", amount: 200, frequency: "termly" },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", studentName: "Alex Johnson", rollNo: "10A001", category: "Tuition Fee", amount: 1500, date: new Date(2025, 9, 1), status: "paid", paymentMethod: "online" },
  { id: "t2", studentName: "Sarah Williams", rollNo: "10A002", category: "Tuition Fee", amount: 1500, date: new Date(2025, 9, 2), status: "paid", paymentMethod: "check" },
  { id: "t3", studentName: "Michael Chen", rollNo: "10B001", category: "School Bus", amount: 300, date: new Date(2025, 9, 5), status: "overdue" },
  { id: "t4", studentName: "Emma Davis", rollNo: "09A015", category: "Annual Excursion", amount: 50, date: new Date(2025, 9, 10), status: "pending" },
  { id: "t5", studentName: "James Wilson", rollNo: "09A016", category: "Library Fee", amount: 100, date: new Date(2025, 9, 1), status: "paid", paymentMethod: "cash" },
];
