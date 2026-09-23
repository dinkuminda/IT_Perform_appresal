export interface JobDuty {
  id: string;
  title: string;
  description: string;
  weightPercentage: number;
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
  requirements: {
    education: string;
    experience: string;
    certifications?: string[];
    technicalSkills: string[];
  };
  keyPerformanceIndicators: string[];
}
