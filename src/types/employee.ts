export type Gender = 'ወንድ' | 'ሴት' | 'Male' | 'Female';
export type EmploymentStatus = 'active' | 'on_leave' | 'transferred' | 'probation';
export type EmploymentType = 'ቋሚ' | 'ኮንትራት' | 'Permanent' | 'Contract';

export interface Employee {
  id: string;
  employeeId: string; // e.g. ICS-IT-0842
  fullNameAm: string;
  fullNameEn: string;
  gender: Gender;
  directorateAm: string;
  directorateEn: string;
  teamAm: string;
  teamEn: string;
  positionAm: string;
  positionEn: string;
  jobLevel: string; // e.g. ደረጃ XIII, ደረጃ XII, etc.
  employmentType: EmploymentType;
  hireDate: string; // YYYY-MM-DD or Ethiopian format
  phone: string;
  email: string;
  officeLocation: string;
  status: EmploymentStatus;
  educationAm: string;
  educationEn: string;
  certifications: string[];
  supervisorName: string;
  skills: string[];
  notes?: string;
  linkedJobId?: string; // links to JobDescription id
}
