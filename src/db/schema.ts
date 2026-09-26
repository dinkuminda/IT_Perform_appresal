import { pgTable, varchar, text, boolean, numeric, timestamp, jsonb, integer, bigserial } from 'drizzle-orm/pg-core';

// =============================================================================
// DEPARTMENTS & DIVISIONS TABLE
// =============================================================================
export const departments = pgTable('departments', {
  id: varchar('id', { length: 100 }).primaryKey(),
  nameAm: varchar('name_am', { length: 255 }).notNull(),
  nameEn: varchar('name_en', { length: 255 }),
  code: varchar('code', { length: 50 }).unique(),
  parentDivision: varchar('parent_division', { length: 255 }),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// =============================================================================
// OFFICIAL CIVIL SERVICE POSITIONS LOOKUP
// =============================================================================
export const officialStaffPositions = pgTable('official_staff_positions', {
  id: varchar('id', { length: 100 }).primaryKey(),
  titleAm: varchar('title_am', { length: 255 }).notNull().unique(),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(), // network, database, system
  reportsToAm: varchar('reports_to_am', { length: 255 }).notNull(),
  reportsToEn: varchar('reports_to_en', { length: 255 }),
  jobObjectiveAm: text('job_objective_am'),
  jobObjectiveEn: text('job_objective_en'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// =============================================================================
// JOB DESCRIPTIONS & 60% RESULT-ORIENTED MATRICES
// =============================================================================
export const jobDescriptions = pgTable('job_descriptions', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  level: varchar('level', { length: 100 }).notNull(),
  department: varchar('department', { length: 255 }).notNull(),
  reportsTo: varchar('reports_to', { length: 255 }).notNull(),
  jobObjective: text('job_objective').notNull(),
  duties: jsonb('duties').notNull().default('[]'),
  evaluationTable: jsonb('evaluation_table').notNull().default('[]'),
  taskCategories: jsonb('task_categories').default('[]'),
  requirements: jsonb('requirements').notNull().default('{}'),
  keyPerformanceIndicators: jsonb('key_performance_indicators').notNull().default('[]'),
  isCustom: boolean('is_custom').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// =============================================================================
// EMPLOYEES DIRECTORY
// =============================================================================
export const employees = pgTable('employees', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 50 }).notNull().unique(),
  fullNameAm: varchar('full_name_am', { length: 255 }).notNull(),
  fullNameEn: varchar('full_name_en', { length: 255 }).notNull(),
  gender: varchar('gender', { length: 20 }).notNull(),
  directorateAm: varchar('directorate_am', { length: 255 }).notNull(),
  directorateEn: varchar('directorate_en', { length: 255 }).notNull(),
  teamAm: varchar('team_am', { length: 255 }).notNull(),
  teamEn: varchar('team_en', { length: 255 }).notNull(),
  positionAm: varchar('position_am', { length: 255 }).notNull(),
  positionEn: varchar('position_en', { length: 255 }).notNull(),
  jobLevel: varchar('job_level', { length: 100 }).notNull(),
  employmentType: varchar('employment_type', { length: 50 }).default('ቋሚ').notNull(),
  hireDate: varchar('hire_date', { length: 50 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  officeLocation: varchar('office_location', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  educationAm: text('education_am').notNull(),
  educationEn: text('education_en').notNull(),
  certifications: jsonb('certifications').default('[]').notNull(),
  supervisorName: varchar('supervisor_name', { length: 255 }).notNull(),
  skills: jsonb('skills').default('[]').notNull(),
  notes: text('notes'),
  linkedJobId: varchar('linked_job_id', { length: 100 }).references(() => jobDescriptions.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// =============================================================================
// PERFORMANCE APPRAISALS (60% Task + 40% Competencies = 100%)
// =============================================================================
export const appraisalRecords = pgTable('appraisal_records', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 100 }).references(() => employees.id),
  empName: varchar('emp_name', { length: 255 }).notNull(),
  empCode: varchar('emp_code', { length: 100 }).notNull(),
  empDept: varchar('emp_dept', { length: 255 }).notNull(),
  empPosition: varchar('emp_position', { length: 255 }).notNull(),
  evalPeriod: varchar('eval_period', { length: 100 }).notNull(),
  supervisorName: varchar('supervisor_name', { length: 255 }).notNull(),
  evalDate: varchar('eval_date', { length: 50 }).notNull(),
  evalType: varchar('eval_type', { length: 50 }).default('half-year').notNull(),
  categories: jsonb('categories').notNull().default('[]'),
  competencies: jsonb('competencies').notNull().default('[]'),
  taskScore60: numeric('task_score_60', { precision: 5, scale: 2 }).default('0.00'),
  competencyScore40: numeric('competency_score_40', { precision: 5, scale: 2 }).default('0.00'),
  totalScore100: numeric('total_score_100', { precision: 5, scale: 2 }).default('0.00'),
  performanceGrade: varchar('performance_grade', { length: 100 }),
  supervisorComments: text('supervisor_comments'),
  employeeComments: text('employee_comments'),
  supervisorSigned: boolean('supervisor_signed').default(false).notNull(),
  employeeSigned: boolean('employee_signed').default(false).notNull(),
  supervisorSignDate: varchar('supervisor_sign_date', { length: 50 }),
  employeeSignDate: varchar('employee_sign_date', { length: 50 }),
  approvalStatus: varchar('approval_status', { length: 50 }).default('draft').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// =============================================================================
// MONTHLY PERFORMANCE REPORTS
// =============================================================================
export const monthlyReports = pgTable('monthly_reports', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 100 }).references(() => employees.id),
  employeeName: varchar('employee_name', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  department: varchar('department', { length: 255 }).notNull(),
  supervisorName: varchar('supervisor_name', { length: 255 }).notNull(),
  year: integer('year').default(2018).notNull(),
  month: varchar('month', { length: 50 }).notNull(),
  reportDate: varchar('report_date', { length: 50 }).notNull(),
  submissionDate: varchar('submission_date', { length: 50 }),
  tasks: jsonb('tasks').notNull().default('[]'),
  challengesFaced: text('challenges_faced'),
  solutionsTaken: text('solutions_taken'),
  supportNeeded: text('support_needed'),
  nextMonthPlan: text('next_month_plan'),
  supervisorRating: integer('supervisor_rating').default(4),
  supervisorComments: text('supervisor_comments'),
  supervisorSigned: boolean('supervisor_signed').default(false).notNull(),
  employeeSigned: boolean('employee_signed').default(false).notNull(),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// =============================================================================
// AUDIT LOGS
// =============================================================================
export const auditLogs = pgTable('audit_logs', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: varchar('entity_id', { length: 100 }).notNull(),
  action: varchar('action', { length: 50 }).notNull(),
  actorName: varchar('actor_name', { length: 255 }),
  actorRole: varchar('actor_role', { length: 100 }),
  changes: jsonb('changes'),
  ipAddress: varchar('ip_address', { length: 50 }),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull()
});
