import React, { useState } from 'react';
import { 
  Database, 
  Copy, 
  Check, 
  Download, 
  X, 
  Terminal, 
  Server, 
  ExternalLink,
  BookOpen,
  Code2
} from 'lucide-react';
import { Language } from '../utils/i18n';

interface DatabaseSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const RAW_SQL_SCHEMA = `-- =============================================================================
-- PERFORMANCE APPRAISAL & HR CIVIL SERVICE MANAGEMENT SYSTEM
-- PostgreSQL Database Schema (Compatible with Desktop PostgreSQL 12+ & Vercel Postgres)
-- UTF-8 Support for Amharic (ኢትዮጵያ) & English
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. DEPARTMENTS & DIVISIONS
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(100) PRIMARY KEY,
    name_am VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    code VARCHAR(50) UNIQUE,
    parent_division VARCHAR(255),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. OFFICIAL CIVIL SERVICE POSITIONS LOOKUP
CREATE TABLE IF NOT EXISTS official_staff_positions (
    id VARCHAR(100) PRIMARY KEY,
    title_am VARCHAR(255) NOT NULL UNIQUE,
    title_en VARCHAR(255) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL, -- network, database, system
    reports_to_am VARCHAR(255) NOT NULL,
    reports_to_en VARCHAR(255),
    job_objective_am TEXT,
    job_objective_en TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. JOB DESCRIPTIONS & 60% RESULT-ORIENTED MATRICES
CREATE TABLE IF NOT EXISTS job_descriptions (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    level VARCHAR(100) NOT NULL,
    department VARCHAR(255) NOT NULL,
    reports_to VARCHAR(255) NOT NULL,
    job_objective TEXT NOT NULL,
    duties JSONB NOT NULL DEFAULT '[]'::jsonb,
    evaluation_table JSONB NOT NULL DEFAULT '[]'::jsonb,
    task_categories JSONB DEFAULT '[]'::jsonb,
    requirements JSONB NOT NULL DEFAULT '{}'::jsonb,
    key_performance_indicators JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_custom BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. EMPLOYEES DIRECTORY
CREATE TABLE IF NOT EXISTS employees (
    id VARCHAR(100) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    full_name_am VARCHAR(255) NOT NULL,
    full_name_en VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    directorate_am VARCHAR(255) NOT NULL,
    directorate_en VARCHAR(255) NOT NULL,
    team_am VARCHAR(255) NOT NULL,
    team_en VARCHAR(255) NOT NULL,
    position_am VARCHAR(255) NOT NULL,
    position_en VARCHAR(255) NOT NULL,
    job_level VARCHAR(100) NOT NULL,
    employment_type VARCHAR(50) NOT NULL DEFAULT 'ቋሚ',
    hire_date VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    office_location VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    education_am TEXT NOT NULL,
    education_en TEXT NOT NULL,
    certifications JSONB NOT NULL DEFAULT '[]'::jsonb,
    supervisor_name VARCHAR(255) NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    notes TEXT,
    linked_job_id VARCHAR(100) REFERENCES job_descriptions(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PERFORMANCE APPRAISALS (60% Task + 40% Competencies = 100%)
CREATE TABLE IF NOT EXISTS appraisal_records (
    id VARCHAR(100) PRIMARY KEY,
    employee_id VARCHAR(100) REFERENCES employees(id) ON DELETE SET NULL,
    emp_name VARCHAR(255) NOT NULL,
    emp_code VARCHAR(100) NOT NULL,
    emp_dept VARCHAR(255) NOT NULL,
    emp_position VARCHAR(255) NOT NULL,
    eval_period VARCHAR(100) NOT NULL,
    supervisor_name VARCHAR(255) NOT NULL,
    eval_date VARCHAR(50) NOT NULL,
    eval_type VARCHAR(50) NOT NULL DEFAULT 'half-year',
    categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    competencies JSONB NOT NULL DEFAULT '[]'::jsonb,
    task_score_60 NUMERIC(5,2) DEFAULT 0.00,
    competency_score_40 NUMERIC(5,2) DEFAULT 0.00,
    total_score_100 NUMERIC(5,2) DEFAULT 0.00,
    performance_grade VARCHAR(100),
    supervisor_comments TEXT,
    employee_comments TEXT,
    supervisor_signed BOOLEAN NOT NULL DEFAULT false,
    employee_signed BOOLEAN NOT NULL DEFAULT false,
    supervisor_sign_date VARCHAR(50),
    employee_sign_date VARCHAR(50),
    approval_status VARCHAR(50) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. MONTHLY PERFORMANCE REPORTS
CREATE TABLE IF NOT EXISTS monthly_reports (
    id VARCHAR(100) PRIMARY KEY,
    employee_id VARCHAR(100) REFERENCES employees(id) ON DELETE SET NULL,
    employee_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    supervisor_name VARCHAR(255) NOT NULL,
    year INT NOT NULL DEFAULT 2018,
    month VARCHAR(50) NOT NULL,
    report_date VARCHAR(50) NOT NULL,
    submission_date VARCHAR(50),
    tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
    challenges_faced TEXT,
    solutions_taken TEXT,
    support_needed TEXT,
    next_month_plan TEXT,
    supervisor_rating INT DEFAULT 4,
    supervisor_comments TEXT,
    supervisor_signed BOOLEAN NOT NULL DEFAULT false,
    employee_signed BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    actor_name VARCHAR(255),
    actor_role VARCHAR(100),
    changes JSONB,
    ip_address VARCHAR(50),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`;

export const DatabaseSchemaModal: React.FC<DatabaseSchemaModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'drizzle' | 'guide'>('sql');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(RAW_SQL_SCHEMA);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([RAW_SQL_SCHEMA], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'schema.sql');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                <span>{lang === 'am' ? 'የPostgreSQL ዳታቤዝ ስኪማ' : 'PostgreSQL Database Schema'}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Desktop & Vercel Ready
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'am'
                  ? 'ለዴስክቶፕ ፖስትግሬስ (pgAdmin/psql) እና ለVercel የተዘጋጀ ሙሉ ስኪማ'
                  : 'Production-ready schema for Desktop PostgreSQL & Vercel deployment'}
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
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'sql'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>schema.sql (PostgreSQL)</span>
            </button>

            <button
              onClick={() => setActiveTab('drizzle')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'drizzle'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Drizzle ORM (TypeScript)</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'guide'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'የአጠቃቀም መመሪያ' : 'Setup Guide'}</span>
            </button>
          </div>

          {activeTab === 'sql' && (
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? (lang === 'am' ? 'ኮፒ ተደርጓል!' : 'Copied!') : (lang === 'am' ? 'ኮፒ አድርግ' : 'Copy SQL')}</span>
              </button>

              <button
                onClick={handleDownloadSql}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'am' ? 'አውርድ (.sql)' : 'Download .sql'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50">
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 leading-relaxed max-h-[55vh]">
                <pre>{RAW_SQL_SCHEMA}</pre>
              </div>
            </div>
          )}

          {activeTab === 'drizzle' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold">src/db/schema.ts</span> — Ready for Vercel Serverless Functions, Next.js, and Express.
                </div>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 leading-relaxed max-h-[55vh]">
                <pre>{`// Drizzle ORM Schema (src/db/schema.ts)
import { pgTable, varchar, text, boolean, numeric, timestamp, jsonb, integer, bigserial } from 'drizzle-orm/pg-core';

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
  requirements: jsonb('requirements').notNull().default('{}'),
  keyPerformanceIndicators: jsonb('key_performance_indicators').notNull().default('[]'),
  isCustom: boolean('is_custom').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const employees = pgTable('employees', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 50 }).notNull().unique(),
  fullNameAm: varchar('full_name_am', { length: 255 }).notNull(),
  fullNameEn: varchar('full_name_en', { length: 255 }).notNull(),
  gender: varchar('gender', { length: 20 }).notNull(),
  positionAm: varchar('position_am', { length: 255 }).notNull(),
  jobLevel: varchar('job_level', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  linkedJobId: varchar('linked_job_id', { length: 100 }).references(() => jobDescriptions.id)
});

export const appraisalRecords = pgTable('appraisal_records', {
  id: varchar('id', { length: 100 }).primaryKey(),
  employeeId: varchar('employee_id', { length: 100 }).references(() => employees.id),
  empName: varchar('emp_name', { length: 255 }).notNull(),
  evalPeriod: varchar('eval_period', { length: 100 }).notNull(),
  categories: jsonb('categories').notNull().default('[]'),
  competencies: jsonb('competencies').notNull().default('[]'),
  taskScore60: numeric('task_score_60', { precision: 5, scale: 2 }).default('0.00'),
  competencyScore40: numeric('competency_score_40', { precision: 5, scale: 2 }).default('0.00'),
  totalScore100: numeric('total_score_100', { precision: 5, scale: 2 }).default('0.00'),
  performanceGrade: varchar('performance_grade', { length: 100 }),
  approvalStatus: varchar('approval_status', { length: 50 }).default('draft').notNull()
});`}</pre>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {/* Local Desktop Setup */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Server className="w-4 h-4 text-blue-600" />
                  <span>1. ዴስክቶፕ ፖስትግሬስ (Desktop PostgreSQL / pgAdmin 4)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-600">
                  <li>በኮምፒውተርዎ ላይ <strong>pgAdmin</strong> ወይም <strong>psql</strong> ይክፈቱ።</li>
                  <li>አዲስ ዳታቤዝ ይፍጠሩ፡ <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-mono">CREATE DATABASE appraisal_db WITH ENCODING &apos;UTF8&apos;;</code></li>
                  <li><strong>schema.sql</strong> ፋይልን በpgAdmin Query Tool ውስጥ ለጥፈው <strong>Execute (F5)</strong> ያድርጉ።</li>
                  <li>የአካባቢ ግንኙነት (Local Connection string)፡
                    <div className="mt-1 p-2 bg-slate-900 text-slate-100 font-mono rounded-lg">
                      DATABASE_URL=&quot;postgresql://postgres:your_password@localhost:5432/appraisal_db&quot;
                    </div>
                  </li>
                </ol>
              </div>

              {/* Vercel Deployment */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                  <span>2. Vercel Deployment (Vercel Postgres / Neon)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-600">
                  <li>ወደ <strong>vercel.com</strong> ዳሽቦርድ ይግቡና <strong>Storage</strong> የሚለውን ይምረጡ።</li>
                  <li><strong>Create Database -&gt; Postgres</strong> በመጫን አዲስ ዳታቤዝ ይፍጠሩ።</li>
                  <li>በVercel ዳታቤዝ ገፅ ላይ <strong>Query Tool</strong>ን ከፍተው <strong>schema.sql</strong>ን Run ያድርጉ።</li>
                  <li>በVercel ፕሮጀክትዎ Settings -&gt; Environment Variables ውስጥ <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">POSTGRES_URL</code> በራስ-ሰር ይገናኛል።</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between rounded-b-2xl">
          <div className="text-xs text-slate-500 font-mono">
            database/schema.sql • src/db/schema.ts
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
