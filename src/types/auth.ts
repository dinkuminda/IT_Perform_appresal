export interface AuthUser {
  id: string;
  employeeId?: string; // e.g. 'ICS-NET-0842'
  username: string;
  nameAm: string;
  nameEn: string;
  role: 'admin' | 'supervisor' | 'employee';
  department: string;
  positionAm: string;
  positionEn: string;
  jobLevel?: string;
  linkedJobId?: string;
  email: string;
  loggedInAt: string;
}
