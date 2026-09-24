import { TaskCategory, CompetencyItem, EmployeeMetadata, AppraisalRecord } from '../types/appraisal';
import { 
  DATABASE_ADMIN_EVALUATION_TABLE, 
  SYSTEM_ADMIN_EVALUATION_TABLE, 
  NETWORK_ADMIN_EVALUATION_TABLE 
} from './extraModulesData';
import { convertEvaluationTableToTaskCategories } from '../utils/calculations';

// Official categories compiled from the official civil service performance appraisal tables
export const DATABASE_CATEGORIES: TaskCategory[] = convertEvaluationTableToTaskCategories(DATABASE_ADMIN_EVALUATION_TABLE);
export const SYSTEM_CATEGORIES: TaskCategory[] = convertEvaluationTableToTaskCategories(SYSTEM_ADMIN_EVALUATION_TABLE);
export const NETWORK_CATEGORIES: TaskCategory[] = convertEvaluationTableToTaskCategories(NETWORK_ADMIN_EVALUATION_TABLE);

// Set default categories to Network by default (with rating 4 and 3 for sample)
export const DEFAULT_CATEGORIES: TaskCategory[] = convertEvaluationTableToTaskCategories(NETWORK_ADMIN_EVALUATION_TABLE);

export const DEFAULT_COMPETENCIES: CompetencyItem[] = [
  {
    id: 'c1',
    name: 'አገር ወዳድነት',
    nameEn: 'Patriotism',
    weight: 25,
    rating: 4,
    notes: ''
  },
  {
    id: 'c2',
    name: 'የተሟላ ስብዕና /integrity/',
    nameEn: 'Integrity',
    weight: 25,
    rating: 4,
    notes: ''
  },
  {
    id: 'c3',
    name: 'ሙያዊ እውቀትና ችሎታ /Professionalism/',
    nameEn: 'Professionalism',
    weight: 25,
    rating: 4,
    notes: ''
  },
  {
    id: 'c4',
    name: 'ተባብሮ የመስራት ልምድና ችሎታ /Team Sprit/',
    nameEn: 'Team Spirit',
    weight: 25,
    rating: 3,
    notes: ''
  }
];

export const DEFAULT_METADATA: EmployeeMetadata = {
  empName: 'ሊዲያ ግሩም ገብረስላሴ',
  empId: 'ICS-IT-0482',
  empDept: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  empPosition: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  evalPeriod: 'ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም',
  supervisorName: 'ምንዳዬ ሀይሌ',
  evalDate: '2026-06-30',
  evalType: 'half-year'
};

export const SAMPLE_APPRAISAL: AppraisalRecord = {
  id: 'appraisal-lydia-2018',
  createdAt: '2026-06-30T09:00:00.000Z',
  updatedAt: '2026-06-30T10:30:00.000Z',
  metadata: DEFAULT_METADATA,
  categories: DEFAULT_CATEGORIES,
  competencies: DEFAULT_COMPETENCIES,
  supervisorComments: 'ሰራተኛዋ የተጣለባትን የኔትወርክ ማሻሻያ እና የዳታ ሴንተር አስተዳደር ስራዎችን በላቀ ብቃትና በጥራት አከናውናለች። በሁሉም ቅርንጫፎች ተደራሽነትን በማረጋገጥ ከፍተኛ ሚና ተጫውታለች።',
  employeeComments: 'በግምገማው ወቅት የተሰጡኝን አስተያየቶችና ግብረ-መልሶችን ሙሉ በሙሉ እስማማበታለሁ። በቀጣዩ የምዘና ወቅት የቡድን አሰራርንና የኔትወርክ ሰነዶች ማደራጀትን ይበልጥ አጠናክሬ እቀጥላለሁ።',
  supervisorSigned: true,
  employeeSigned: true,
  supervisorSignDate: '2026-06-30',
  employeeSignDate: '2026-06-30',
  approvalStatus: 'approved'
};
