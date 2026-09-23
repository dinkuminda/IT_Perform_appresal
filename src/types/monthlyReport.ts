export type EthiopianMonth = 
  | 'መስከረም' 
  | 'ጥቅምት' 
  | 'ሕዳር' 
  | 'ታኅሣሥ' 
  | 'ጥር' 
  | 'የካቲት' 
  | 'መጋቢት' 
  | 'ሚያዝያ' 
  | 'ግንቦት' 
  | 'ሰኔ' 
  | 'ሐምሌ' 
  | 'ነሐሴ';

export interface MonthlyTaskItem {
  id: string;
  taskTitle: string;
  plannedTarget: string;
  achievedResult: string;
  progressPercent: number;
  status: 'completed' | 'in-progress' | 'delayed';
  evidenceOrRemark: string;
}

export interface MonthlyReport {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  supervisorName: string;
  year: number; // e.g. 2018 ዓ.ም
  month: EthiopianMonth;
  reportDate: string;
  submissionDate?: string;
  tasks: MonthlyTaskItem[];
  challengesFaced: string;
  solutionsTaken: string;
  supportNeeded: string;
  nextMonthPlan: string;
  supervisorRating: number; // 1-4
  supervisorComments: string;
  supervisorSigned: boolean;
  employeeSigned: boolean;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved';
}
