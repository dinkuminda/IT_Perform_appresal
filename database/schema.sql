-- =============================================================================
-- PERFORMANCE APPRAISAL & HR CIVIL SERVICE MANAGEMENT SYSTEM
-- PostgreSQL Database Schema (Compatible with Desktop PostgreSQL 12+ & Vercel Postgres)
-- UTF-8 Support for Amharic (ኢትዮጵያ) & English
-- =============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Trigger Function for Automatic updated_at Timestamps
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- 3. DEPARTMENTS & DIVISIONS TABLE
-- =============================================================================
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

CREATE TRIGGER trg_departments_updated_at
BEFORE UPDATE ON departments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- 4. OFFICIAL CIVIL SERVICE POSITIONS LOOKUP
-- =============================================================================
CREATE TABLE IF NOT EXISTS official_staff_positions (
    id VARCHAR(100) PRIMARY KEY,
    title_am VARCHAR(255) NOT NULL UNIQUE,
    title_en VARCHAR(255) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL, -- network, database, system, etc.
    reports_to_am VARCHAR(255) NOT NULL,
    reports_to_en VARCHAR(255),
    job_objective_am TEXT,
    job_objective_en TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 5. JOB DESCRIPTIONS & 60% RESULT-ORIENTED EVALUATION MATRICES
-- =============================================================================
CREATE TABLE IF NOT EXISTS job_descriptions (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    level VARCHAR(100) NOT NULL,          -- e.g. 'ደረጃ XIII (Grade XIII)'
    department VARCHAR(255) NOT NULL,
    reports_to VARCHAR(255) NOT NULL,
    job_objective TEXT NOT NULL,
    duties JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { id, title, description, weightPercentage } (sum to 100%)
    evaluation_table JSONB NOT NULL DEFAULT '[]'::jsonb, -- Official 60% civil service matrix { no, expectedResult, weight, tasks }
    task_categories JSONB DEFAULT '[]'::jsonb, -- Compiled TaskCategory[] for live scoring
    requirements JSONB NOT NULL DEFAULT '{}'::jsonb, -- { education, experience, certifications: [], technicalSkills: [] }
    key_performance_indicators JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_custom BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_descriptions_dept ON job_descriptions(department);
CREATE INDEX IF NOT EXISTS idx_job_descriptions_level ON job_descriptions(level);
CREATE INDEX IF NOT EXISTS idx_job_descriptions_custom ON job_descriptions(is_custom);

CREATE TRIGGER trg_job_descriptions_updated_at
BEFORE UPDATE ON job_descriptions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- 6. EMPLOYEES DIRECTORY
-- =============================================================================
CREATE TABLE IF NOT EXISTS employees (
    id VARCHAR(100) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE, -- e.g. ICS-IT-0842
    full_name_am VARCHAR(255) NOT NULL,
    full_name_en VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL,             -- 'ወንድ' | 'ሴት'
    directorate_am VARCHAR(255) NOT NULL,
    directorate_en VARCHAR(255) NOT NULL,
    team_am VARCHAR(255) NOT NULL,
    team_en VARCHAR(255) NOT NULL,
    position_am VARCHAR(255) NOT NULL,
    position_en VARCHAR(255) NOT NULL,
    job_level VARCHAR(100) NOT NULL,         -- 'ደረጃ XIII', 'ደረጃ XII', etc.
    employment_type VARCHAR(50) NOT NULL DEFAULT 'ቋሚ', -- 'ቋሚ' | 'ኮንትራት'
    hire_date VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    office_location VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active' | 'on_leave' | 'transferred' | 'probation'
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

CREATE INDEX IF NOT EXISTS idx_employees_emp_id ON employees(employee_id);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_employees_job ON employees(linked_job_id);
CREATE INDEX IF NOT EXISTS idx_employees_dept ON employees(directorate_am, team_am);

CREATE TRIGGER trg_employees_updated_at
BEFORE UPDATE ON employees
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- 7. PERFORMANCE APPRAISAL RECORDS (60% Tasks + 40% Competencies = 100%)
-- =============================================================================
CREATE TABLE IF NOT EXISTS appraisal_records (
    id VARCHAR(100) PRIMARY KEY,
    employee_id VARCHAR(100) REFERENCES employees(id) ON DELETE SET NULL,
    emp_name VARCHAR(255) NOT NULL,
    emp_code VARCHAR(100) NOT NULL,
    emp_dept VARCHAR(255) NOT NULL,
    emp_position VARCHAR(255) NOT NULL,
    eval_period VARCHAR(100) NOT NULL,        -- e.g. 'የ2017 ዓ.ም የመጀመሪያ ግማሽ ዓመት'
    supervisor_name VARCHAR(255) NOT NULL,
    eval_date VARCHAR(50) NOT NULL,
    eval_type VARCHAR(50) NOT NULL DEFAULT 'half-year', -- 'half-year' | 'annual' | 'probation'
    
    -- 60% Task Categories Breakdown
    categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- 40% Behavioral & Leadership Competency Items
    competencies JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- Calculated Scores
    task_score_60 NUMERIC(5,2) DEFAULT 0.00,
    competency_score_40 NUMERIC(5,2) DEFAULT 0.00,
    total_score_100 NUMERIC(5,2) DEFAULT 0.00,
    performance_grade VARCHAR(100),          -- 'እጅግ የላቀ (Very High)', 'ከፍተኛ (High)', etc.
    
    -- Remarks & Comments
    supervisor_comments TEXT,
    employee_comments TEXT,
    
    -- Digital Verification / Signatures
    supervisor_signed BOOLEAN NOT NULL DEFAULT false,
    employee_signed BOOLEAN NOT NULL DEFAULT false,
    supervisor_sign_date VARCHAR(50),
    employee_sign_date VARCHAR(50),
    
    -- Status Workflow
    approval_status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft' | 'submitted' | 'reviewed' | 'approved'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appraisal_emp ON appraisal_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_appraisal_status ON appraisal_records(approval_status);
CREATE INDEX IF NOT EXISTS idx_appraisal_period ON appraisal_records(eval_period);
CREATE INDEX IF NOT EXISTS idx_appraisal_created ON appraisal_records(created_at DESC);

CREATE TRIGGER trg_appraisals_updated_at
BEFORE UPDATE ON appraisal_records
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- 8. MONTHLY PERFORMANCE & TASK REPORTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS monthly_reports (
    id VARCHAR(100) PRIMARY KEY,
    employee_id VARCHAR(100) REFERENCES employees(id) ON DELETE SET NULL,
    employee_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    supervisor_name VARCHAR(255) NOT NULL,
    year INT NOT NULL DEFAULT 2018,          -- Ethiopian Calendar Year
    month VARCHAR(50) NOT NULL,              -- 'መስከረም', 'ጥቅምት', 'ሕዳር', etc.
    report_date VARCHAR(50) NOT NULL,
    submission_date VARCHAR(50),
    
    -- Tasks List
    tasks JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { id, taskTitle, plannedTarget, achievedResult, progressPercent, status, evidenceOrRemark }
    
    challenges_faced TEXT,
    solutions_taken TEXT,
    support_needed TEXT,
    next_month_plan TEXT,
    
    supervisor_rating INT DEFAULT 4,
    supervisor_comments TEXT,
    supervisor_signed BOOLEAN NOT NULL DEFAULT false,
    employee_signed BOOLEAN NOT NULL DEFAULT false,
    
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft' | 'submitted' | 'reviewed' | 'approved'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_monthly_emp ON monthly_reports(employee_id);
CREATE INDEX IF NOT EXISTS idx_monthly_period ON monthly_reports(year, month);
CREATE INDEX IF NOT EXISTS idx_monthly_status ON monthly_reports(status);

CREATE TRIGGER trg_monthly_reports_updated_at
BEFORE UPDATE ON monthly_reports
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- 9. AUDIT LOGS FOR INSTITUTIONAL COMPLIANCE
-- =============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,  -- 'appraisal', 'employee', 'job_description', 'monthly_report'
    entity_id VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,       -- 'create', 'update', 'delete', 'sign', 'approve'
    actor_name VARCHAR(255),
    actor_role VARCHAR(100),
    changes JSONB,
    ip_address VARCHAR(50),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);

-- =============================================================================
-- 10. SEED DATA - OFFICIAL DIVISIONS & DEPARTMENTS
-- =============================================================================
INSERT INTO departments (id, name_am, name_en, code, is_active)
VALUES
  ('dept-div-dns', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Division', 'DNS-DIV', true),
  ('dept-div-branch', 'የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን', 'Branch IT Support Division', 'BIT-DIV', true),
  ('dept-div-service', 'የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን', 'IT Support Service Division', 'ITS-DIV', true),
  ('dept-net-admin', 'የኔትዎርክ አስተዳደር (Network Administration)', 'Network Administration Department', 'NET-ADM', true),
  ('dept-db-admin', 'የዳታቤዝ አስተዳደር (Database Administration)', 'Database Administration Department', 'DB-ADM', true),
  ('dept-sys-admin', 'የሲስተም አስተዳደር (System Administration)', 'System Administration Department', 'SYS-ADM', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- 11. SEED DATA - OFFICIAL CIVIL SERVICE STAFF POSITIONS
-- =============================================================================
INSERT INTO official_staff_positions (id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am)
VALUES
  ('pos-net-xiii', 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII', 'Senior Network Specialist Grade XIII', 'ደረጃ XIII', 'network', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን ኃላፊ', 'DNS Division Head', 'የተቋሙን የኮር ኔትወርክ፣ WAN/LAN፣ የደህንነት ፋየርዎሎችና የመረጃ ልውውጥ መሰረተ ልማት ማቀድ፣ ማዋቀር እና ከፍተኛ ተደራሽነት ማረጋገጥ።'),
  ('pos-net-xii', 'መካከለኛ የኔትወርክ ባለሙያ ደረጃ XII', 'Associate Network Specialist Grade XII', 'ደረጃ XII', 'network', 'ከፍተኛ የኔትወርክ ባለሙያ', 'Senior Network Specialist', 'የትራፊክ ክትትል፣ የቅርንጫፎች ኔትወርክ ጥገና፣ የVPN ግንኙነቶች እና የኔትወርክ መሳሪያዎች ዕለታዊ ቁጥጥር ማከናወን።'),
  ('pos-net-xi', 'ረዳት የኔትወርክ ባለሙያ ደረጃ XI', 'Assistant Network Specialist Grade XI', 'ደረጃ XI', 'network', 'መካከለኛ የኔትወርክ ባለሙያ', 'Associate Network Specialist', 'የኔትወርክ ኬብሊንግ፣ የAccess Switches ወደቦችና የዋይፋይ አክሰስ ፖይንቶች ቁጥጥርና የቅድመ-ብልሽት ፍተሻ መስጠት።'),
  ('pos-net-x', 'ጀማሪ የኔትወርክ ባለሙያ ደረጃ X', 'Junior Network Specialist Grade X', 'ደረጃ X', 'network', 'ረዳት የኔትወርክ ባለሙያ', 'Assistant Network Specialist', 'የዕለታዊ የኔትወርክ ግንኙነት ክትትል፣ የጥሪዎች ምዝገባ እና የመሰረታዊ የኔትወርክ ኬብሎች ፍተሻና ዝግጅት ማከናወን።'),
  ('pos-db-xiii', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'Senior Database Specialist Grade XIII', 'ደረጃ XIII', 'database', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን ኃላፊ', 'DNS Division Head', 'የተቋሙን ዳታቤዞች አርክቴክቸር፣ High Availability፣ የመረጃ ደህንነት፣ ባክአፕ እና አፈጻጸም ማስተዳደር።'),
  ('pos-db-xii', 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII', 'Associate Database Specialist Grade XII', 'ደረጃ XII', 'database', 'ከፍተኛ የዳታቤዝ ባለሙያ', 'Senior Database Specialist', 'ዕለታዊ የዳታቤዝ ክትትል፣ የውሂብ ማዛወር (ETL)፣ የመረጃ ቅጂዎች እና የተጠቃሚዎች ፈቃድ አስተዳደር ማከናወን።'),
  ('pos-db-xi', 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI', 'Assistant Database Specialist Grade XI', 'ደረጃ XI', 'database', 'መካከለኛ የዳታቤዝ ባለሙያ', 'Associate Database Specialist', 'ዕለታዊ የዳታ ቅጂዎች ክትትል፣ የመረጃ ቋት መጠይቆች እና የዲስክ ቦታ ክትትል ማከናወን።'),
  ('pos-db-x', 'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X', 'Junior Database Specialist Grade X', 'ደረጃ X', 'database', 'ረዳት የዳታቤዝ ባለሙያ', 'Assistant Database Specialist', 'የዳታቤዝ ሁነታ ሎጎች ምዝገባ፣ የመሰረታዊ የዳታ ጥያቄዎች ምዝገባ እና የሙከራ ዳታቤዞች ጭነት ማከናወን።'),
  ('pos-sys-xiii', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'Senior System Specialist Grade XIII', 'ደረጃ XIII', 'system', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን ኃላፊ', 'DNS Division Head', 'የዳታ ሴንተር ሰርቨሮች፣ ቨርቹዋል ፕላትፎርሞች፣ SAN/NAS ስቶሬጅ እና የሲስተም ደህንነት አርክቴክቸር ማስተዳደር።'),
  ('pos-sys-xii', 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII', 'Associate System Specialist Grade XII', 'ደረጃ XII', 'system', 'ከፍተኛ የሲስተም ባለሙያ', 'Senior System Specialist', 'የሰርቨሮችና ቨርቹዋል ማሽኖች ክትትል፣ የኦፕሬቲንግ ሲስተም ጭነቶችና ዝመናዎች (Patching) ማከናወን።'),
  ('pos-sys-xi', 'ረዳት የሲስተም ባለሙያ ደረጃ XI', 'Assistant System Specialist Grade XI', 'ደረጃ XI', 'system', 'መካከለኛ የሲስተም ባለሙያ', 'Associate System Specialist', 'የሰርቨር ኦፕሬቲንግ ሲስተሞች ጭነት፣ የተጠቃሚዎች መለያዎች አያያዝ እና የዳታ ሴንተር አካላዊ ፍተሻ ማከናወን።'),
  ('pos-sys-x', 'ጀማሪ የሲስተም ባለሙያ ደረጃ X', 'Junior System Specialist Grade X', 'ደረጃ X', 'system', 'ረዳት የሲስተም ባለሙያ', 'Assistant System Specialist', 'የሲስተም ሎጎች ምዝገባ፣ የመሰረታዊ ሶፍትዌር ጭነቶች እና የሲስተም መሳሪያዎች ኢንቬንተሪ ማከናወን።')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SCHEMA SETUP COMPLETED SUCCESSFULLY
-- =============================================================================
