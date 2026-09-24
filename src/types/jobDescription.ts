import { TaskCategory } from './appraisal';

export interface JobDuty {
  id: string;
  title: string;
  description: string;
  weightPercentage: number;
}

export interface EvaluationTaskItem {
  code: string;
  description: string;
  weight: number;
}

export interface EvaluationCategoryItem {
  no: number;
  expectedResult: string;
  weight: number;
  tasks: EvaluationTaskItem[];
}

export interface JobDescription {
  id: string;
  title: string;
  titleEn: string;
  level: string; // e.g., ደረጃ XIII
  department: string;
  reportsTo: string;
  jobObjective: string;
  duties: JobDuty[];
  // Official evaluation task breakdown as shown in official civil service tables (summing to 60)
  evaluationTable: EvaluationCategoryItem[];
  // Pre-compiled TaskCategory[] for the live appraisal matrix
  taskCategories?: TaskCategory[];
  requirements: {
    education: string;
    experience: string;
    certifications?: string[];
    technicalSkills: string[];
  };
  keyPerformanceIndicators: string[];
  isCustom?: boolean;
}
