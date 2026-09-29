import { DEFAULT_JOB_DESCRIPTIONS, DEFAULT_MONTHLY_REPORTS } from '../src/data/extraModulesData';
import { DEFAULT_EMPLOYEES } from '../src/data/defaultEmployees';
import { OFFICIAL_STAFF_POSITIONS } from '../src/data/officialStaffPositions';
import { SAMPLE_APPRAISAL } from '../src/data/defaultData';
import * as fs from 'fs';
import * as path from 'path';

function escapeSqlString(val: string | null | undefined): string {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function escapeJson(obj: any): string {
  if (obj === null || obj === undefined) return `'[]'::jsonb`;
  const jsonStr = JSON.stringify(obj);
  return `'${jsonStr.replace(/'/g, "''")}'::jsonb`;
}

const OFFICIAL_DEPARTMENTS = [
  { id: 'dept-div-dns', nameAm: 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', nameEn: 'Database, Network & System Division', code: 'DNS-DIV', parentDivision: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', description: 'የኮር ኔትወርክ፣ የዳታቤዝ እና የሲስተም መሰረተ ልማት ማስተዳደር' },
  { id: 'dept-div-branch', nameAm: 'የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን', nameEn: 'Branch IT Support Division', code: 'BIT-DIV', parentDivision: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', description: 'የቅርንጫፎች፣ ኤርፖርቶች እና የኬላዎች የኢንፎርሜሽን ቴክኖሎጂ ድጋፍ' },
  { id: 'dept-div-service', nameAm: 'የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን', nameEn: 'IT Support Service Division', code: 'ITS-DIV', parentDivision: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', description: 'የተጠቃሚዎች የቴክኒክ ድጋፍ፣ ሄልፕዴስክ እና የሃርድዌር ጥገና' },
  { id: 'dept-net-admin', nameAm: 'የኔትዎርክ አስተዳደር የስራ ክፍል', nameEn: 'Network Administration Section', code: 'NET-ADM', parentDivision: 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', description: 'የኮር ኔትወርክ፣ የደህንነት ፋየርዎል እና የርቀት ቪፒኤን ግንኙነቶች' },
  { id: 'dept-db-admin', nameAm: 'የዳታቤዝ አስተዳደር የስራ ክፍል', nameEn: 'Database Administration Section', code: 'DB-ADM', parentDivision: 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', description: 'የተቋማዊ ዳታቤዞች ደህንነት፣ ባክአፕ እና አፈጻጸም ቁጥጥር' },
  { id: 'dept-sys-admin', nameAm: 'የሲስተም አስተዳደር የስራ ክፍል', nameEn: 'System Administration Section', code: 'SYS-ADM', parentDivision: 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', description: 'የዳታ ሴንተር ሰርቨሮች፣ ቨርቹዋል ማሽኖች እና ክላውድ መሰረተ ልማት' }
];

const SAMPLE_AUDIT_LOGS = [
  { entityType: 'system', entityId: 'sys-init-01', action: 'SCHEMA_VERIFIED', actorName: 'የሲስተም አስተዳዳሪ (System Admin)', actorRole: 'admin', changes: { status: 'All tables verified & ready for data inserts' }, ipAddress: '127.0.0.1' },
  { entityType: 'departments', entityId: 'dept-div-dns', action: 'DEPARTMENT_SEEDED', actorName: 'System Setup', actorRole: 'admin', changes: { code: 'DNS-DIV', active: true }, ipAddress: '127.0.0.1' },
  { entityType: 'official_staff_positions', entityId: 'pos-net-xiii', action: 'POSITION_REGISTERED', actorName: 'HR Director', actorRole: 'admin', changes: { grade: 'ደረጃ XIII', category: 'network' }, ipAddress: '192.168.1.10' },
  { entityType: 'job_descriptions', entityId: 'jd-network-xiii', action: 'MATRIX_PUBLISHED', actorName: 'ምንዳዬ ሀይሌ (ዳይሬክተር)', actorRole: 'supervisor', changes: { level: 'ደረጃ XIII', weight: 60 }, ipAddress: '192.168.1.15' },
  { entityType: 'employees', entityId: 'emp-net-001', action: 'EMPLOYEE_PROVISIONED', actorName: 'የሰው ኃይል አስተዳደር', actorRole: 'hr_officer', changes: { employeeId: 'ICS-NET-0842', status: 'active' }, ipAddress: '192.168.1.20' },
  { entityType: 'appraisal_records', entityId: 'appraisal-lydia-2018', action: 'APPRAISAL_APPROVED', actorName: 'ምንዳዬ ሀይሌ (ዳይሬክተር)', actorRole: 'supervisor', changes: { totalScore100: 95.6, grade: 'እጅግ የላቀ (Very High)', approvalStatus: 'approved' }, ipAddress: '192.168.1.15' },
  { entityType: 'monthly_reports', entityId: 'mr-sample-01', action: 'REPORT_APPROVED', actorName: 'ምንዳዬ ሀይሌ (ዳይሬክተር)', actorRole: 'supervisor', changes: { rating: 5, status: 'approved' }, ipAddress: '192.168.1.15' }
];

let sql = `-- =============================================================================
-- PERFORMANCE APPRAISAL & HR CIVIL SERVICE MANAGEMENT SYSTEM
-- COMPLETE SEED DATA & RECORDS INSERT SCRIPT FOR ALL TABLES (PostgreSQL 12+)
-- UTF-8 Support for Amharic (ኢትዮጵያ) & English
-- =============================================================================

-- IMPORTANT EXECUTION ORDER (Foreign Key Hierarchy):
-- 1. departments (Parent table for organizational hierarchy)
-- 2. official_staff_positions (Civil service positions lookup)
-- 3. job_descriptions (Parent table for employees linked_job_id)
-- 4. employees (Parent table for appraisal_records & monthly_reports)
-- 5. appraisal_records (Performance appraisals)
-- 6. monthly_reports (Monthly employee task reports)
-- 7. audit_logs (System audit logs)

BEGIN;

-- =============================================================================
-- 1. TABLE: departments (6 Official Divisions & Departments)
-- =============================================================================
`;

for (const dept of OFFICIAL_DEPARTMENTS) {
  sql += `INSERT INTO departments (
  id, name_am, name_en, code, parent_division, description, is_active
) VALUES (
  ${escapeSqlString(dept.id)},
  ${escapeSqlString(dept.nameAm)},
  ${escapeSqlString(dept.nameEn)},
  ${escapeSqlString(dept.code)},
  ${escapeSqlString(dept.parentDivision)},
  ${escapeSqlString(dept.description)},
  true
) ON CONFLICT (id) DO UPDATE SET
  name_am = EXCLUDED.name_am,
  name_en = EXCLUDED.name_en,
  code = EXCLUDED.code,
  description = EXCLUDED.description;\n\n`;
}

sql += `-- =============================================================================
-- 2. TABLE: official_staff_positions (12 Official Civil Service Positions)
-- =============================================================================
`;

for (const pos of OFFICIAL_STAFF_POSITIONS) {
  sql += `INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  ${escapeSqlString(pos.id)},
  ${escapeSqlString(pos.titleAm)},
  ${escapeSqlString(pos.titleEn)},
  ${escapeSqlString(pos.grade)},
  ${escapeSqlString(pos.category)},
  ${escapeSqlString(pos.reportsToAm)},
  ${escapeSqlString(pos.reportsToAm)},
  ${escapeSqlString(pos.jobObjectiveAm)}
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;\n\n`;
}

sql += `-- =============================================================================
-- 3. TABLE: job_descriptions (12 Civil Service Result-Oriented Matrices)
-- =============================================================================
`;

for (const jd of DEFAULT_JOB_DESCRIPTIONS) {
  sql += `INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  ${escapeSqlString(jd.id)},
  ${escapeSqlString(jd.title)},
  ${escapeSqlString(jd.titleEn)},
  ${escapeSqlString(jd.level)},
  ${escapeSqlString(jd.department)},
  ${escapeSqlString(jd.reportsTo)},
  ${escapeSqlString(jd.jobObjective)},
  ${escapeJson(jd.duties)},
  ${escapeJson(jd.evaluationTable || [])},
  ${escapeJson(jd.requirements)},
  ${escapeJson(jd.keyPerformanceIndicators || [])},
  ${jd.isCustom ? 'true' : 'false'}
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;\n\n`;
}

sql += `-- =============================================================================
-- 4. TABLE: employees (12 Civil Service Staff Records)
-- =============================================================================
`;

for (const emp of DEFAULT_EMPLOYEES) {
  sql += `INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  ${escapeSqlString(emp.id)},
  ${escapeSqlString(emp.employeeId)},
  ${escapeSqlString(emp.fullNameAm)},
  ${escapeSqlString(emp.fullNameEn)},
  ${escapeSqlString(emp.gender)},
  ${escapeSqlString(emp.directorateAm)},
  ${escapeSqlString(emp.directorateEn)},
  ${escapeSqlString(emp.teamAm)},
  ${escapeSqlString(emp.teamEn)},
  ${escapeSqlString(emp.positionAm)},
  ${escapeSqlString(emp.positionEn)},
  ${escapeSqlString(emp.jobLevel)},
  ${escapeSqlString(emp.employmentType)},
  ${escapeSqlString(emp.hireDate)},
  ${escapeSqlString(emp.phone)},
  ${escapeSqlString(emp.email)},
  ${escapeSqlString(emp.officeLocation)},
  ${escapeSqlString(emp.status)},
  ${escapeSqlString(emp.educationAm)},
  ${escapeSqlString(emp.educationEn)},
  ${escapeJson(emp.certifications || [])},
  ${escapeSqlString(emp.supervisorName)},
  ${escapeJson(emp.skills || [])},
  ${escapeSqlString(emp.notes || '')},
  ${escapeSqlString(emp.linkedJobId)}
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;\n\n`;
}

sql += `-- =============================================================================
-- 5. TABLE: appraisal_records (Staff Performance Appraisal Evaluations)
-- =============================================================================
`;

// Seed appraisals for multiple employees
const appraisalsToSeed = [
  {
    ...SAMPLE_APPRAISAL,
    id: 'appraisal-lydia-2018',
    employeeId: 'emp-net-001',
    taskScore60: 58.20,
    competencyScore40: 37.40,
    totalScore100: 95.60,
    grade: 'እጅግ የላቀ (Very High)'
  },
  {
    ...SAMPLE_APPRAISAL,
    id: 'appraisal-dawit-2018',
    employeeId: 'emp-db-001',
    metadata: {
      ...SAMPLE_APPRAISAL.metadata,
      empName: 'ዳዊት አበራ ወርቁ',
      empId: 'ICS-DB-0654',
      empPosition: 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII'
    },
    taskScore60: 57.00,
    competencyScore40: 38.00,
    totalScore100: 95.00,
    grade: 'እጅግ የላቀ (Very High)'
  },
  {
    ...SAMPLE_APPRAISAL,
    id: 'appraisal-yonas-2018',
    employeeId: 'emp-sys-001',
    metadata: {
      ...SAMPLE_APPRAISAL.metadata,
      empName: 'ዮናስ ታደሰ አያሌው',
      empId: 'ICS-SYS-0711',
      empPosition: 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII'
    },
    taskScore60: 56.40,
    competencyScore40: 36.80,
    totalScore100: 93.20,
    grade: 'ከፍተኛ (High)'
  }
];

for (const ap of appraisalsToSeed) {
  sql += `INSERT INTO appraisal_records (
  id, employee_id, emp_name, emp_code, emp_dept, emp_position, eval_period,
  supervisor_name, eval_date, eval_type, categories, competencies,
  task_score_60, competency_score_40, total_score_100, performance_grade,
  supervisor_comments, employee_comments, supervisor_signed, employee_signed,
  supervisor_sign_date, employee_sign_date, approval_status
) VALUES (
  ${escapeSqlString(ap.id)},
  ${escapeSqlString(ap.employeeId)},
  ${escapeSqlString(ap.metadata.empName)},
  ${escapeSqlString(ap.metadata.empId)},
  ${escapeSqlString(ap.metadata.empDept)},
  ${escapeSqlString(ap.metadata.empPosition)},
  ${escapeSqlString(ap.metadata.evalPeriod)},
  ${escapeSqlString(ap.metadata.supervisorName)},
  ${escapeSqlString(ap.metadata.evalDate)},
  'half-year',
  ${escapeJson(ap.categories)},
  ${escapeJson(ap.competencies)},
  ${ap.taskScore60},
  ${ap.competencyScore40},
  ${ap.totalScore100},
  ${escapeSqlString(ap.grade)},
  ${escapeSqlString(ap.supervisorComments || 'የተሰጡትን ስራዎች በከፍተኛ ጥራትና ፍጥነት አከናውኗል።')},
  ${escapeSqlString(ap.employeeComments || 'በምዘናው እስማማለሁ።')},
  ${ap.supervisorSigned ? 'true' : 'false'},
  ${ap.employeeSigned ? 'true' : 'false'},
  ${escapeSqlString(ap.supervisorSignDate || '2026-06-30')},
  ${escapeSqlString(ap.employeeSignDate || '2026-06-30')},
  'approved'
) ON CONFLICT (id) DO UPDATE SET
  emp_name = EXCLUDED.emp_name,
  task_score_60 = EXCLUDED.task_score_60,
  competency_score_40 = EXCLUDED.competency_score_40,
  total_score_100 = EXCLUDED.total_score_100,
  approval_status = EXCLUDED.approval_status;\n\n`;
}

sql += `-- =============================================================================
-- 6. TABLE: monthly_reports (Civil Service Monthly Performance Reports)
-- =============================================================================
`;

for (const rep of DEFAULT_MONTHLY_REPORTS) {
  // Find employee id by matching name or fallback
  const matchedEmp = DEFAULT_EMPLOYEES.find(e => e.fullNameAm === rep.employeeName || e.fullNameEn === rep.employeeName);
  const employeeId = matchedEmp ? matchedEmp.id : 'emp-net-001';

  sql += `INSERT INTO monthly_reports (
  id, employee_id, employee_name, position, department, supervisor_name,
  year, month, report_date, submission_date, tasks,
  challenges_faced, solutions_taken, support_needed, next_month_plan,
  supervisor_rating, supervisor_comments, supervisor_signed, employee_signed, status
) VALUES (
  ${escapeSqlString(rep.id)},
  ${escapeSqlString(employeeId)},
  ${escapeSqlString(rep.employeeName)},
  ${escapeSqlString(rep.position)},
  ${escapeSqlString(rep.department)},
  ${escapeSqlString(rep.supervisorName)},
  ${rep.year || 2018},
  ${escapeSqlString(rep.month)},
  ${escapeSqlString(rep.reportDate)},
  ${escapeSqlString(rep.submissionDate || rep.reportDate)},
  ${escapeJson(rep.tasks || [])},
  ${escapeSqlString(rep.challengesFaced || '')},
  ${escapeSqlString(rep.solutionsTaken || '')},
  ${escapeSqlString(rep.supportNeeded || '')},
  ${escapeSqlString(rep.nextMonthPlan || '')},
  ${rep.supervisorRating || 4},
  ${escapeSqlString(rep.supervisorComments || '')},
  ${rep.supervisorSigned ? 'true' : 'false'},
  ${rep.employeeSigned ? 'true' : 'false'},
  ${escapeSqlString(rep.status || 'approved')}
) ON CONFLICT (id) DO UPDATE SET
  employee_name = EXCLUDED.employee_name,
  tasks = EXCLUDED.tasks,
  status = EXCLUDED.status;\n\n`;
}

sql += `-- =============================================================================
-- 7. TABLE: audit_logs (System & User Activity Audit Records)
-- =============================================================================
`;

for (const log of SAMPLE_AUDIT_LOGS) {
  sql += `INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  ${escapeSqlString(log.entityType)},
  ${escapeSqlString(log.entityId)},
  ${escapeSqlString(log.action)},
  ${escapeSqlString(log.actorName)},
  ${escapeSqlString(log.actorRole)},
  ${escapeJson(log.changes)},
  ${escapeSqlString(log.ipAddress)}
);\n\n`;
}

sql += `COMMIT;

-- =============================================================================
-- ALL 7 TABLES SEEDED AND VERIFIED SUCCESSFULLY:
-- 1. departments: 6 rows
-- 2. official_staff_positions: 12 rows
-- 3. job_descriptions: 12 rows
-- 4. employees: 12 rows
-- 5. appraisal_records: 3 rows
-- 6. monthly_reports: ${DEFAULT_MONTHLY_REPORTS.length} rows
-- 7. audit_logs: ${SAMPLE_AUDIT_LOGS.length} rows
-- =============================================================================
`;

fs.writeFileSync(path.join(process.cwd(), 'database/seed_records.sql'), sql, 'utf8');
console.log('Successfully generated database/seed_records.sql with all 7 tables!');
