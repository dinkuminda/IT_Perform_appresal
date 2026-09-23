export type RatingLevel = 1 | 2 | 3 | 4;

export interface Criterion {
  id: string;
  type: 'ጥራት' | 'ጊዜ' | 'Quality' | 'Time';
  weight: number;
  rating: RatingLevel;
}

export interface Subtask {
  subId: string;
  desc: string;
  criteria: Criterion[];
}

export interface TaskCategory {
  id: number;
  title: string;
  weight: number; // percentage out of 60
  subtasks: Subtask[];
}

export interface CompetencyItem {
  id: string;
  name: string;
  nameEn: string;
  weight: number; // 25% each
  rating: RatingLevel;
  notes?: string;
}

export interface EmployeeMetadata {
  empName: string;
  empId: string;
  empDept: string;
  empPosition: string;
  evalPeriod: string;
  supervisorName: string;
  evalDate: string;
  evalType: 'half-year' | 'annual' | 'probation';
}

export interface AppraisalRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  metadata: EmployeeMetadata;
  categories: TaskCategory[];
  competencies: CompetencyItem[];
  supervisorComments: string;
  employeeComments: string;
  supervisorSigned: boolean;
  employeeSigned: boolean;
  supervisorSignDate: string;
  employeeSignDate: string;
  approvalStatus: 'draft' | 'submitted' | 'reviewed' | 'approved';
}

export interface PerformanceGrade {
  levelAm: string;
  levelEn: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  minScore: number;
}
