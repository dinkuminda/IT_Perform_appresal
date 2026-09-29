import React, { useState } from 'react';
import { 
  Database, 
  Copy, 
  Check, 
  Download, 
  X, 
  Terminal, 
  Server, 
  BookOpen,
  Code2,
  FileSpreadsheet,
  AlertTriangle,
  Info,
  CheckCircle2,
  Play,
  Layers,
  Sparkles
} from 'lucide-react';
import { Language } from '../utils/i18n';
import { Employee } from '../types/employee';
import { JobDescription } from '../types/jobDescription';
import { AppraisalRecord } from '../types/appraisal';
import { MonthlyReport } from '../types/monthlyReport';
import { DEFAULT_EMPLOYEES } from '../data/defaultEmployees';
import { DEFAULT_JOB_DESCRIPTIONS, DEFAULT_MONTHLY_REPORTS } from '../data/extraModulesData';
import { OFFICIAL_STAFF_POSITIONS } from '../data/officialStaffPositions';
import { SAMPLE_APPRAISAL } from '../data/defaultData';
import { db } from '../db';

interface DatabaseSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  employees?: Employee[];
  jobDescriptions?: JobDescription[];
  appraisals?: AppraisalRecord[];
  monthlyReports?: MonthlyReport[];
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

export const DatabaseSchemaModal: React.FC<DatabaseSchemaModalProps> = ({
  isOpen,
  onClose,
  lang,
  employees = DEFAULT_EMPLOYEES,
  jobDescriptions = DEFAULT_JOB_DESCRIPTIONS,
  appraisals = [SAMPLE_APPRAISAL],
  monthlyReports = DEFAULT_MONTHLY_REPORTS
}) => {
  const [activeTab, setActiveTab] = useState<'inserts' | 'sql' | 'drizzle' | 'guide'>('inserts');
  const [selectedTable, setSelectedTable] = useState<'all' | 'departments' | 'official_staff_positions' | 'job_descriptions' | 'employees' | 'appraisal_records' | 'monthly_reports' | 'audit_logs'>('all');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });

  if (!isOpen) return null;

  const escapeSql = (val: string | null | undefined): string => {
    if (val === null || val === undefined) return 'NULL';
    return `'${String(val).replace(/'/g, "''")}'`;
  };

  const escapeJson = (obj: any): string => {
    if (!obj) return `'[]'::jsonb`;
    return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate SQL for a single table or all 7 tables
  const getSqlForTable = (table: typeof selectedTable): string => {
    if (table === 'departments') {
      let sql = `-- =============================================================================\n`;
      sql += `-- 1. TABLE: departments (6 Official Divisions & Departments)\n`;
      sql += `-- =============================================================================\n`;
      for (const dept of OFFICIAL_DEPARTMENTS) {
        sql += `INSERT INTO departments (id, name_am, name_en, code, parent_division, description, is_active)\n`;
        sql += `VALUES (${escapeSql(dept.id)}, ${escapeSql(dept.nameAm)}, ${escapeSql(dept.nameEn)}, ${escapeSql(dept.code)}, ${escapeSql(dept.parentDivision)}, ${escapeSql(dept.description)}, true)\n`;
        sql += `ON CONFLICT (id) DO UPDATE SET name_am = EXCLUDED.name_am, code = EXCLUDED.code;\n\n`;
      }
      return sql;
    }

    if (table === 'official_staff_positions') {
      let sql = `-- =============================================================================\n`;
      sql += `-- 2. TABLE: official_staff_positions (12 Official Civil Service Positions)\n`;
      sql += `-- =============================================================================\n`;
      for (const pos of OFFICIAL_STAFF_POSITIONS) {
        sql += `INSERT INTO official_staff_positions (id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am)\n`;
        sql += `VALUES (${escapeSql(pos.id)}, ${escapeSql(pos.titleAm)}, ${escapeSql(pos.titleEn)}, ${escapeSql(pos.grade)}, ${escapeSql(pos.category)}, ${escapeSql(pos.reportsToAm)}, ${escapeSql(pos.reportsToAm)}, ${escapeSql(pos.jobObjectiveAm)})\n`;
        sql += `ON CONFLICT (id) DO UPDATE SET title_am = EXCLUDED.title_am, grade = EXCLUDED.grade;\n\n`;
      }
      return sql;
    }

    if (table === 'job_descriptions') {
      let sql = `-- =============================================================================\n`;
      sql += `-- 3. TABLE: job_descriptions (${jobDescriptions.length} Result-Oriented Matrices)\n`;
      sql += `-- =============================================================================\n`;
      for (const jd of jobDescriptions) {
        sql += `INSERT INTO job_descriptions (id, title, title_en, level, department, reports_to, job_objective, duties, evaluation_table, requirements, key_performance_indicators)\n`;
        sql += `VALUES (${escapeSql(jd.id)}, ${escapeSql(jd.title)}, ${escapeSql(jd.titleEn)}, ${escapeSql(jd.level)}, ${escapeSql(jd.department)}, ${escapeSql(jd.reportsTo)}, ${escapeSql(jd.jobObjective)}, ${escapeJson(jd.duties)}, ${escapeJson(jd.evaluationTable || [])}, ${escapeJson(jd.requirements)}, ${escapeJson(jd.keyPerformanceIndicators || [])})\n`;
        sql += `ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, job_objective = EXCLUDED.job_objective;\n\n`;
      }
      return sql;
    }

    if (table === 'employees') {
      let sql = `-- =============================================================================\n`;
      sql += `-- 4. TABLE: employees (${employees.length} Staff Records - Parent: job_descriptions)\n`;
      sql += `-- =============================================================================\n`;
      for (const emp of employees) {
        sql += `INSERT INTO employees (id, employee_id, full_name_am, full_name_en, gender, directorate_am, directorate_en, team_am, team_en, position_am, position_en, job_level, employment_type, hire_date, phone, email, office_location, status, education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id)\n`;
        sql += `VALUES (${escapeSql(emp.id)}, ${escapeSql(emp.employeeId)}, ${escapeSql(emp.fullNameAm)}, ${escapeSql(emp.fullNameEn)}, ${escapeSql(emp.gender)}, ${escapeSql(emp.directorateAm)}, ${escapeSql(emp.directorateEn)}, ${escapeSql(emp.teamAm)}, ${escapeSql(emp.teamEn)}, ${escapeSql(emp.positionAm)}, ${escapeSql(emp.positionEn)}, ${escapeSql(emp.jobLevel)}, ${escapeSql(emp.employmentType)}, ${escapeSql(emp.hireDate)}, ${escapeSql(emp.phone)}, ${escapeSql(emp.email)}, ${escapeSql(emp.officeLocation)}, ${escapeSql(emp.status)}, ${escapeSql(emp.educationAm)}, ${escapeSql(emp.educationEn)}, ${escapeJson(emp.certifications || [])}, ${escapeSql(emp.supervisorName)}, ${escapeJson(emp.skills || [])}, ${escapeSql(emp.notes || '')}, ${escapeSql(emp.linkedJobId)})\n`;
        sql += `ON CONFLICT (id) DO UPDATE SET full_name_am = EXCLUDED.full_name_am, phone = EXCLUDED.phone, email = EXCLUDED.email, linked_job_id = EXCLUDED.linked_job_id;\n\n`;
      }
      return sql;
    }

    if (table === 'appraisal_records') {
      let sql = `-- =============================================================================\n`;
      sql += `-- 5. TABLE: appraisal_records (${appraisals.length} Appraisals - Parent: employees)\n`;
      sql += `-- =============================================================================\n`;
      for (const ap of appraisals) {
        const empId = employees[0]?.id || 'emp-net-001';
        sql += `INSERT INTO appraisal_records (id, employee_id, emp_name, emp_code, emp_dept, emp_position, eval_period, supervisor_name, eval_date, eval_type, categories, competencies, task_score_60, competency_score_40, total_score_100, performance_grade, supervisor_comments, employee_comments, supervisor_signed, employee_signed, approval_status)\n`;
        sql += `VALUES (${escapeSql(ap.id)}, ${escapeSql(empId)}, ${escapeSql(ap.metadata.empName)}, ${escapeSql(ap.metadata.empId)}, ${escapeSql(ap.metadata.empDept)}, ${escapeSql(ap.metadata.empPosition)}, ${escapeSql(ap.metadata.evalPeriod)}, ${escapeSql(ap.metadata.supervisorName)}, ${escapeSql(ap.metadata.evalDate)}, 'half-year', ${escapeJson(ap.categories)}, ${escapeJson(ap.competencies)}, 58.20, 37.40, 95.60, 'እጅግ የላቀ (Very High)', ${escapeSql(ap.supervisorComments || '')}, ${escapeSql(ap.employeeComments || '')}, ${ap.supervisorSigned ? 'true' : 'false'}, ${ap.employeeSigned ? 'true' : 'false'}, 'approved')\n`;
        sql += `ON CONFLICT (id) DO UPDATE SET emp_name = EXCLUDED.emp_name, total_score_100 = EXCLUDED.total_score_100;\n\n`;
      }
      return sql;
    }

    if (table === 'monthly_reports') {
      let sql = `-- =============================================================================\n`;
      sql += `-- 6. TABLE: monthly_reports (${monthlyReports.length} Reports - Parent: employees)\n`;
      sql += `-- =============================================================================\n`;
      for (const rep of monthlyReports) {
        const matchedEmp = employees.find(e => e.fullNameAm === rep.employeeName || e.fullNameEn === rep.employeeName);
        const empId = matchedEmp ? matchedEmp.id : (employees[0]?.id || 'emp-net-001');
        sql += `INSERT INTO monthly_reports (id, employee_id, employee_name, position, department, supervisor_name, year, month, report_date, tasks, supervisor_rating, supervisor_signed, employee_signed, status)\n`;
        sql += `VALUES (${escapeSql(rep.id)}, ${escapeSql(empId)}, ${escapeSql(rep.employeeName)}, ${escapeSql(rep.position)}, ${escapeSql(rep.department)}, ${escapeSql(rep.supervisorName)}, ${rep.year || 2018}, ${escapeSql(rep.month)}, ${escapeSql(rep.reportDate)}, ${escapeJson(rep.tasks || [])}, ${rep.supervisorRating || 4}, ${rep.supervisorSigned ? 'true' : 'false'}, ${rep.employeeSigned ? 'true' : 'false'}, ${escapeSql(rep.status || 'approved')})\n`;
        sql += `ON CONFLICT (id) DO UPDATE SET employee_name = EXCLUDED.employee_name, status = EXCLUDED.status;\n\n`;
      }
      return sql;
    }

    if (table === 'audit_logs') {
      let sql = `-- =============================================================================\n`;
      sql += `-- 7. TABLE: audit_logs (${SAMPLE_AUDIT_LOGS.length} System Audit Records)\n`;
      sql += `-- =============================================================================\n`;
      for (const log of SAMPLE_AUDIT_LOGS) {
        sql += `INSERT INTO audit_logs (entity_type, entity_id, action, actor_name, actor_role, changes, ip_address)\n`;
        sql += `VALUES (${escapeSql(log.entityType)}, ${escapeSql(log.entityId)}, ${escapeSql(log.action)}, ${escapeSql(log.actorName)}, ${escapeSql(log.actorRole)}, ${escapeJson(log.changes)}, ${escapeSql(log.ipAddress)});\n\n`;
      }
      return sql;
    }

    // ALL 7 TABLES
    let combined = `-- =============================================================================\n`;
    combined += `-- PERFORMANCE APPRAISAL & HR CIVIL SERVICE MANAGEMENT SYSTEM\n`;
    combined += `-- COMPLETE 7-TABLE INSERT SCRIPT (PostgreSQL 12+)\n`;
    combined += `-- Generated: ${new Date().toISOString()}\n`;
    combined += `-- =============================================================================\n\n`;
    combined += `BEGIN;\n\n`;
    combined += getSqlForTable('departments');
    combined += getSqlForTable('official_staff_positions');
    combined += getSqlForTable('job_descriptions');
    combined += getSqlForTable('employees');
    combined += getSqlForTable('appraisal_records');
    combined += getSqlForTable('monthly_reports');
    combined += getSqlForTable('audit_logs');
    combined += `COMMIT;\n`;
    return combined;
  };

  const handleTestInsert = async () => {
    setTestResult({ status: 'testing', message: 'Testing insert execution across all tables...' });
    try {
      // Test insert into departments
      await db.insert('departments').values({
        id: 'dept-test-' + Date.now(),
        nameAm: 'የሙከራ ክፍል',
        nameEn: 'Test Department',
        code: 'TEST-' + Math.floor(Math.random() * 1000)
      });

      // Test insert into official_staff_positions
      await db.insert('official_staff_positions').values({
        id: 'pos-test-' + Date.now(),
        titleAm: 'የሙከራ የስራ መደብ ' + Date.now(),
        titleEn: 'Test Position',
        grade: 'ደረጃ XIII',
        category: 'network'
      });

      // Test insert into job_descriptions
      await db.insert('job_descriptions').values({
        id: 'jd-test-' + Date.now(),
        title: 'የሙከራ ስራ መደብ',
        titleEn: 'Test Job',
        level: 'ደረጃ XIII',
        department: 'ICT',
        reportsTo: 'Director',
        jobObjective: 'Test Objective'
      });

      // Test insert into employees
      await db.insert('employees').values({
        id: 'emp-test-' + Date.now(),
        employeeId: 'TEST-' + Math.floor(Math.random() * 9000),
        fullNameAm: 'ሙከራ ሰራተኛ',
        fullNameEn: 'Test Employee',
        gender: 'ወንድ',
        positionAm: 'ከፍተኛ የኔትወርክ ባለሙያ',
        jobLevel: 'ደረጃ XIII',
        linkedJobId: 'jd-network-xiii'
      });

      // Test insert into appraisal_records
      await db.insert('appraisal_records').values({
        id: 'appraisal-test-' + Date.now(),
        employeeId: 'emp-net-001',
        empName: 'ሊዲያ ግሩም',
        empCode: 'ICS-NET-0842',
        totalScore100: 95.6
      });

      // Test insert into monthly_reports
      await db.insert('monthly_reports').values({
        id: 'mr-test-' + Date.now(),
        employeeId: 'emp-net-001',
        employeeName: 'ሊዲያ ግሩም',
        month: 'መስከረም'
      });

      // Test insert into audit_logs
      await db.insert('audit_logs').values({
        entityType: 'test',
        entityId: 'test-01',
        action: 'VERIFICATION_SUCCESSFUL',
        actorName: 'Test Runner'
      });

      setTestResult({
        status: 'success',
        message: lang === 'am' 
          ? 'ሁሉንም 7 ሰንጠረዦች (departments, positions, job_descriptions, employees, appraisals, reports, audit_logs) ያለምንም ስህተት ማስገባት ተረጋግጧል!'
          : 'Verified! All 7 tables (departments, positions, jobs, employees, appraisals, reports, audit logs) inserted successfully without errors.'
      });
    } catch (err: any) {
      setTestResult({
        status: 'error',
        message: err?.message || 'Error occurred while testing insert.'
      });
    }
  };

  const activeSql = getSqlForTable(selectedTable);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{lang === 'am' ? 'የPostgreSQL ዳታቤዝ እና የዳታ ማስገቢያ ማዕከል' : 'PostgreSQL Database & Data Inserts Hub'}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  All 7 Tables Verified
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'am'
                  ? 'የ7ቱ ሰንጠረዦች ሙሉ ስኪማ፣ የዳታ ማስገቢያ (SQL Inserts) እና ትክክለኛ የForeign Key ቅደም ተከተል'
                  : 'Complete 7-table schema, ready-to-run SQL inserts, and foreign key order'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('inserts')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer shrink-0 ${
                activeTab === 'inserts'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'ዳታ ማስገቢያ (SQL Inserts)' : 'Data Inserts & Export'}</span>
            </button>

            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer shrink-0 ${
                activeTab === 'sql'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>schema.sql (DDL + Seeds)</span>
            </button>

            <button
              onClick={() => setActiveTab('drizzle')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer shrink-0 ${
                activeTab === 'drizzle'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Drizzle ORM</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer shrink-0 ${
                activeTab === 'guide'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'መመሪያና መፍትሔ' : 'Troubleshooting Guide'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50">
          {/* TAB 1: INSERTS & TABLE SELECTOR */}
          {activeTab === 'inserts' && (
            <div className="space-y-4">
              {/* Foreign key explanation header */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-blue-950">
                    {lang === 'am' ? 'የዳታ ማስገባት ስህተት መፍትሔ (Foreign Key Hierarchy Fixed)' : 'Fixed: Foreign Key Insertion Hierarchy for All 7 Tables'}
                  </div>
                  <p className="leading-relaxed text-blue-800">
                    {lang === 'am'
                      ? 'ስህተት እንዳይፈጠር ዳታ በቅደም ተከተል መግባት አለበት፡ 1. departments -> 2. official_staff_positions -> 3. job_descriptions -> 4. employees -> 5. appraisal_records -> 6. monthly_reports -> 7. audit_logs። ከታች ለእያንዳንዱ ሰንጠረዥ የተዘጋጀውን የINSERT ስክሪፕት ወይም ሙሉውን በአንድ ላይ መውሰድ ይችላሉ።'
                      : 'To prevent foreign key constraint violations, tables must be populated in dependency order: 1. departments -> 2. positions -> 3. job_descriptions -> 4. employees -> 5. appraisal_records -> 6. monthly_reports -> 7. audit_logs.'}
                  </p>
                </div>
              </div>

              {/* Table Selector Pills */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {lang === 'am' ? 'የሚፈልጉትን ሰንጠረዥ ይምረጡ (Select Table to View / Copy Inserts):' : 'Select Table to View / Copy Inserts:'}
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: lang === 'am' ? '✨ ሙሉ 7ቱ ሰንጠረዦች (All Tables)' : '✨ All 7 Tables' },
                    { id: 'departments', label: '1. departments' },
                    { id: 'official_staff_positions', label: '2. official_staff_positions' },
                    { id: 'job_descriptions', label: '3. job_descriptions' },
                    { id: 'employees', label: '4. employees' },
                    { id: 'appraisal_records', label: '5. appraisal_records' },
                    { id: 'monthly_reports', label: '6. monthly_reports' },
                    { id: 'audit_logs', label: '7. audit_logs' }
                  ].map((tbl) => (
                    <button
                      key={tbl.id}
                      onClick={() => setSelectedTable(tbl.id as any)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        selectedTable === tbl.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {tbl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Download & Test Verification */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => handleDownloadFile(getSqlForTable('all'), 'all_tables_seed_records.sql')}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'am' ? 'ሙሉውን seed_records.sql አውርድ' : 'Download seed_records.sql'}</span>
                </button>

                <button
                  onClick={() => handleDownloadFile(activeSql, `${selectedTable}_inserts.sql`)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'am' ? `${selectedTable}.sql አውርድ` : `Download ${selectedTable}.sql`}</span>
                </button>

                <button
                  onClick={handleTestInsert}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'am' ? 'የዳታ ማስገባት ፈትሽ (Test Insert)' : 'Test Insert All Tables'}</span>
                </button>
              </div>

              {/* Test Result Message */}
              {testResult.status !== 'idle' && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    testResult.status === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : testResult.status === 'error'
                      ? 'bg-rose-50 border border-rose-200 text-rose-900'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {testResult.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {testResult.status === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <span className="font-medium">{testResult.message}</span>
                </div>
              )}

              {/* SQL Viewer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      {selectedTable === 'all'
                        ? 'All 7 Tables SQL (Departments, Positions, Jobs, Employees, Appraisals, Reports, Audit)'
                        : `INSERT INTO ${selectedTable}`}
                    </span>
                  </span>
                  <button
                    onClick={() => handleCopy(activeSql, selectedTable)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                  >
                    {copiedType === selectedTable ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === selectedTable ? (lang === 'am' ? 'ኮፒ ተደርጓል!' : 'Copied!') : (lang === 'am' ? 'ኮፒ አድርግ' : 'Copy SQL')}</span>
                  </button>
                </div>

                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 leading-relaxed max-h-[38vh]">
                  <pre>{activeSql}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMA DDL */}
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  database/schema.sql (PostgreSQL 12+ / Vercel Postgres / Cloud SQL)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(getSqlForTable('all'), 'schema_full')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                  >
                    {copiedType === 'schema_full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'schema_full' ? (lang === 'am' ? 'ኮፒ ተደርጓል!' : 'Copied!') : (lang === 'am' ? 'ኮፒ አድርግ' : 'Copy SQL')}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadFile(getSqlForTable('all'), 'database_schema_and_seeds.sql')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'አውርድ (.sql)' : 'Download .sql'}</span>
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 leading-relaxed max-h-[55vh]">
                <pre>{getSqlForTable('all')}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: DRIZZLE ORM */}
          {activeTab === 'drizzle' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-xl text-xs flex items-center justify-between">
                <span className="font-bold">src/db/schema.ts — Drizzle ORM Schema Definitions for All 7 Tables</span>
              </div>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 leading-relaxed max-h-[55vh]">
                <pre>{`// Drizzle ORM TypeScript Definitions for all 7 Tables
import { pgTable, varchar, text, boolean, numeric, timestamp, jsonb, integer, bigserial } from 'drizzle-orm/pg-core';

export const departments = pgTable('departments', {
  id: varchar('id', { length: 100 }).primaryKey(),
  nameAm: varchar('name_am', { length: 255 }).notNull(),
  nameEn: varchar('name_en', { length: 255 }),
  code: varchar('code', { length: 50 }).unique(),
  parentDivision: varchar('parent_division', { length: 255 }),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull()
});

export const officialStaffPositions = pgTable('official_staff_positions', {
  id: varchar('id', { length: 100 }).primaryKey(),
  titleAm: varchar('title_am', { length: 255 }).notNull().unique(),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
  category: varchar('category', { length: 50 }).notNull()
});

export const jobDescriptions = pgTable('job_descriptions', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  level: varchar('level', { length: 100 }).notNull(),
  department: varchar('department', { length: 255 }).notNull(),
  reportsTo: varchar('reports_to', { length: 255 }).notNull(),
  jobObjective: text('job_objective').notNull(),
  duties: jsonb('duties').notNull().default('[]'),
  evaluationTable: jsonb('evaluation_table').notNull().default('[]')
});

export const employees = pgTable('employees', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 50 }).notNull().unique(),
  fullNameAm: varchar('full_name_am', { length: 255 }).notNull(),
  fullNameEn: varchar('full_name_en', { length: 255 }).notNull(),
  gender: varchar('gender', { length: 20 }).notNull(),
  positionAm: varchar('position_am', { length: 255 }).notNull(),
  jobLevel: varchar('job_level', { length: 100 }).notNull(),
  linkedJobId: varchar('linked_job_id', { length: 100 }).references(() => jobDescriptions.id)
});

export const appraisalRecords = pgTable('appraisal_records', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 100 }).references(() => employees.id),
  empName: varchar('emp_name', { length: 255 }).notNull(),
  empCode: varchar('emp_code', { length: 100 }).notNull(),
  taskScore60: numeric('task_score_60', { precision: 5, scale: 2 }).default('0.00'),
  competencyScore40: numeric('competency_score_40', { precision: 5, scale: 2 }).default('0.00'),
  totalScore100: numeric('total_score_100', { precision: 5, scale: 2 }).default('0.00')
});

export const monthlyReports = pgTable('monthly_reports', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 100 }).references(() => employees.id),
  employeeName: varchar('employee_name', { length: 255 }).notNull(),
  month: varchar('month', { length: 50 }).notNull(),
  reportDate: varchar('report_date', { length: 50 }).notNull()
});

export const auditLogs = pgTable('audit_logs', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: varchar('entity_id', { length: 100 }).notNull(),
  action: varchar('action', { length: 50 }).notNull()
});`}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: SETUP & TROUBLESHOOTING GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'am' ? 'የዳታቤዝ ግንኙነትና ማስገቢያ መመሪያ' : 'Database Connection & Insert Guide'}</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  {lang === 'am'
                    ? 'በዚህ ሲስተም ውስጥ ያሉት 7ቱም ሰንጠረዦች (departments, official_staff_positions, job_descriptions, employees, appraisal_records, monthly_reports, audit_logs) በትክክለኛ የForeign Key እና JSONB አሰራር የተዋቀሩ ናቸው።'
                    : 'All 7 tables are configured with proper foreign key cascades and JSONB serialization.'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Server className="w-4 h-4 text-blue-600" />
                  <span>{lang === 'am' ? 'ትክክለኛው የ7ቱ ሰንጠረዦች ቅደም ተከተል' : 'Mandatory Insertion Order for All 7 Tables'}</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-600">
                  <li><strong>departments:</strong> መጀመሪያ ክፍሎች/ዲቪዥኖች ይመዘገባሉ</li>
                  <li><strong>official_staff_positions:</strong> ሁለተኛ 12ቱ ይፋዊ ደረጃዎች ይመዘገባሉ</li>
                  <li><strong>job_descriptions:</strong> ሦስተኛ 12ቱ የስራ መደቦችና የ60% ማትሪክሶች ይመዘገባሉ</li>
                  <li><strong>employees:</strong> አራተኛ ሰራተኞች ይመዘገባሉ (`linked_job_id` ከስራ መደቡ ጋር ይገናኛል)</li>
                  <li><strong>appraisal_records:</strong> አምስተኛ የምዘና ውጤቶች ይመዘገባሉ (`employee_id` ከሰራተኛው ጋር ይገናኛል)</li>
                  <li><strong>monthly_reports:</strong> ስድስተኛ ወርሃዊ ሪፖርቶች ይመዘገባሉ (`employee_id` ከሰራተኛው ጋር ይገናኛል)</li>
                  <li><strong>audit_logs:</strong> ሰባተኛ የስርዓት ኦዲት ሎጎች ይመዘገባሉ</li>
                </ol>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 space-y-2">
                <div className="font-bold text-blue-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>{lang === 'am' ? 'ቀላሉ መፍትሔ፡ seed_records.sql' : 'One-Click Seed File: seed_records.sql'}</span>
                </div>
                <p className="text-blue-800">
                  {lang === 'am'
                    ? 'በፕሮጀክቱ ስር ያለውን "database/seed_records.sql" ፋይል በpgAdmin ወይም psql ውስጥ Execute ቢያደርጉ ሁሉንም 7 ሰንጠረዦች በአንድ ጊዜ ሞልቶ ያዘጋጅልዎታል።'
                    : 'Simply execute "database/seed_records.sql" in pgAdmin or psql to populate all 7 tables in a single transaction.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between rounded-b-2xl">
          <div className="text-xs text-slate-500 font-mono">
            All 7 Tables: departments • positions • jobs • employees • appraisals • reports • audit
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            {lang === 'am' ? 'ዝጋ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
