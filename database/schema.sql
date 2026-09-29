-- =============================================================================
-- PERFORMANCE APPRAISAL & HR CIVIL SERVICE MANAGEMENT SYSTEM
-- PostgreSQL Database Schema (Compatible with Desktop PostgreSQL 12+ & Vercel Postgres)
-- UTF-8 Support for Amharic (ኢትዮጵያ) & English
-- =============================================================================

-- 1. Enable Required Extensions (Safely ignore if permissions are restricted)
DO $$ 
BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Extensions could not be loaded (non-superuser); continuing.';
END $$;

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
-- 12. SEED DATA - ALL 12 OFFICIAL JOB DESCRIPTIONS
-- =============================================================================
INSERT INTO job_descriptions (id, title, title_en, level, department, reports_to, job_objective, duties, evaluation_table, requirements, key_performance_indicators)
VALUES
  -- Network Administration (4 Positions)
  ('jd-network-xiii', 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII', 'Senior Network Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር', 'የኔትወርክ አስተዳደር ቡድን መሪ', 'የተቋሙን ዋና መ/ቤት፣ ቅርንጫፎች፣ ኤርፖርቶች እና ኬላዎች የሚያገናኘውን ሰፊ የኔትወርክ መሰረተ ልማት ማቀድ፣ ማዋቀር፣ ማስተዳደር።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/MSc in Computer Engineering", "experience": "6+ years"}'::jsonb, '["Network Uptime >= 99.8%", "Failover < 30s"]'::jsonb),
  ('jd-network-xii', 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII', 'Intermediate Network Specialist Grade XII', 'ደረጃ XII (Grade XII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር', 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII', 'የተቋሙን ኔትወርክ በ24/7 ሞኒተሪንግ ሲስተሞች መከታተል፣ የትራፊክ መጨናነቆችን መፍታት፣ የፋየርዎል ህጎችን ማስተዳደር።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc in Computer Science/IT", "experience": "4+ years"}'::jsonb, '["Alerts resolved < 15 min"]'::jsonb),
  ('jd-network-xi', 'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI', 'Assistant Network Specialist Grade XI', 'ደረጃ XI (Grade XI)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር', 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII', 'የኔትወርክ ኬብሊንግ፣ የመቀያየሪያ ወደቦች (Switch Ports) ፍተሻ፣ የኔትወርክ መሳሪያዎች ቅድመ-ብልሽት ጥገና ማከናወን።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/Diploma in IT", "experience": "2+ years"}'::jsonb, '["Ports checked 100%"]'::jsonb),
  ('jd-network-x', 'ጀማሪ የኔትዎርክ ባለሙያ ደረጃ X', 'Junior Network Specialist Grade X', 'ደረጃ X (Grade X)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር', 'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI', 'የኔትወርክ ኬብሎች ዝርጋታ፣ መሰረታዊ የኮምፒውተር ግንኙነት ፍተሻ እና የተጠቃሚዎች ጥያቄዎችን መመዝገብ።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/Diploma in IT", "experience": "0-1 years"}'::jsonb, '["Ticket logging 100%"]'::jsonb),
  
  -- Database Administration (4 Positions)
  ('jd-database-xiii', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'Senior Database Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር', 'የዳታቤዝ አስተዳደር ቡድን መሪ', 'የተቋሙን የፓስፖርት፣ የዜግነትና የሲቪል ምዝገባ ኮር ዳታቤዞች አርክቴክቸር፣ High Availability፣ የመረጃ ደህንነት፣ ባክአፕ እና አፈጻጸም ማስተዳደር።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/MSc in Computer Science", "experience": "6+ years"}'::jsonb, '["Database Uptime >= 99.9%", "RPO < 15 min"]'::jsonb),
  ('jd-db-xiii', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'Senior Database Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር', 'የዳታቤዝ አስተዳደር ቡድን መሪ', 'የተቋሙን የፓስፖርት፣ የዜግነትና የሲቪል ምዝገባ ኮር ዳታቤዞች አርክቴክቸር ማስተዳደር።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/MSc in Computer Science", "experience": "6+ years"}'::jsonb, '["Database Uptime >= 99.9%"]'::jsonb),
  ('jd-database-xii', 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII', 'Intermediate Database Specialist Grade XII', 'ደረጃ XII (Grade XII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'ዕለታዊ የዳታቤዝ ክትትል፣ የውሂብ ማዛወር (ETL)፣ የመረጃ ቅጂዎች (Backups) እና የተጠቃሚዎች ፈቃድ ማስተዳደር።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc in Computer Science/IT", "experience": "4+ years"}'::jsonb, '["Backup success 100%"]'::jsonb),
  ('jd-database-xi', 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI', 'Assistant Database Specialist Grade XI', 'ደረጃ XI (Grade XI)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር', 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII', 'የዳታቤዝ ሰንጠረዦች መጠይቆች፣ የዲስክ ቦታ ክትትል እና የዳታ ቅጂዎች ትክክለኛነት ማረጋገጥ።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/Diploma in IT", "experience": "2+ years"}'::jsonb, '["Disk check daily"]'::jsonb),
  ('jd-database-x', 'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X', 'Junior Database Specialist Grade X', 'ደረጃ X (Grade X)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር', 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI', 'የዳታቤዝ ሁነታ ሎጎች ምዝገባ፣ የመሰረታዊ ዳታ መጠይቆች ድጋፍ እና የሙከራ ዳታቤዞች ጭነት።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/Diploma in IT", "experience": "0-1 years"}'::jsonb, '["Log review 100%"]'::jsonb),

  -- System Administration (4 Positions)
  ('jd-system-xiii', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'Senior System Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር', 'የሲስተም አስተዳደር ቡድን መሪ', 'የዳታ ሴንተር ሰርቨሮች፣ ቨርቹዋል ፕላትፎርሞች፣ SAN/NAS ስቶሬጅ እና የሲስተም ደህንነት አርክቴክቸር ማስተዳደር።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/MSc in Computer Science/IT", "experience": "6+ years"}'::jsonb, '["Server Uptime >= 99.8%"]'::jsonb),
  ('jd-sys-xiii', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'Senior System Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር', 'የሲስተም አስተዳደር ቡድን መሪ', 'የዳታ ሴንተር ሰርቨሮች፣ ቨርቹዋል ፕላትፎርሞች እና የሲስተም ደህንነት አርክቴክቸር ማስተዳደር።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/MSc in IT", "experience": "6+ years"}'::jsonb, '["Server Uptime >= 99.8%"]'::jsonb),
  ('jd-system-xii', 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII', 'Intermediate System Specialist Grade XII', 'ደረጃ XII (Grade XII)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'የሰርቨሮችና ቨርቹዋል ማሽኖች ክትትል፣ የኦፕሬቲንግ ሲስተም ዝመናዎች (Patching) እና የመተግበሪያዎች ዝርጋታ።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc in IT", "experience": "4+ years"}'::jsonb, '["Patching SLA >= 98%"]'::jsonb),
  ('jd-system-xi', 'ረዳት የሲስተም ባለሙያ ደረጃ XI', 'Assistant System Specialist Grade XI', 'ደረጃ XI (Grade XI)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር', 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII', 'የሰርቨር ኦፕሬቲንግ ሲስተሞች ጭነት፣ የተጠቃሚዎች መለያዎች አያያዝ እና የሃርድዌር ፍተሻ።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/Diploma in IT", "experience": "2+ years"}'::jsonb, '["Hardware audit 100%"]'::jsonb),
  ('jd-system-x', 'ጀማሪ የሲስተም ባለሙያ ደረጃ X', 'Junior System Specialist Grade X', 'ደረጃ X (Grade X)', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር', 'ረዳት የሲስተም ባለሙያ ደረጃ XI', 'የሲስተም ሎጎች ምዝገባ፣ የመሰረታዊ ሶፍትዌር ጭነቶች እና የኢንቬንተሪ ዝርዝር አያያዝ።', '[]'::jsonb, '[]'::jsonb, '{"education": "BSc/Diploma in IT", "experience": "0-1 years"}'::jsonb, '["Inventory 100%"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective;

-- =============================================================================
-- 13. SEED DATA - EMPLOYEES DIRECTORY (12 Civil Service Staff)
-- =============================================================================
INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender, directorate_am, directorate_en,
  team_am, team_en, position_am, position_en, job_level, employment_type, hire_date,
  phone, email, office_location, status, education_am, education_en, supervisor_name, linked_job_id
) VALUES
  -- Network Team
  ('emp-net-001', 'ICS-NET-0842', 'ሊዲያ ግሩም ገብረስላሴ', 'Lydia Girum Gebresilassie', 'ሴት', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII', 'Senior Network Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'ቋሚ', '2019-10-12', '+251 91 123 4567', 'lydia.girum@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 304', 'active', 'በኮምፒውተር ምህንድስና የማስተርስ ዲግሪ (MSc)', 'MSc in Computer Engineering', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', 'jd-network-xiii'),
  ('emp-net-002', 'ICS-NET-0914', 'ሄኖክ ተስፋዬ በቀለ', 'Henok Tesfaye Bekele', 'ወንድ', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII', 'Intermediate Network Specialist Grade XII', 'ደረጃ XII (Grade XII)', 'ቋሚ', '2020-03-15', '+251 91 234 5678', 'henok.tesfaye@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 304', 'active', 'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Computer Science', 'ሊዲያ ግሩም (ከፍተኛ ባለሙያ)', 'jd-network-xii'),
  ('emp-net-003', 'ICS-NET-1102', 'ማርታ ኃይሉ ካሳ', 'Marta Hailu Kassa', 'ሴት', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI', 'Assistant Network Specialist Grade XI', 'ደረጃ XI (Grade XI)', 'ቋሚ', '2022-01-10', '+251 91 345 6789', 'marta.hailu@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 305', 'active', 'በኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Information Technology', 'ሄኖክ ተስፋዬ (መካከለኛ ባለሙያ)', 'jd-network-xi'),
  ('emp-net-004', 'ICS-NET-1240', 'በረከት አስፋው ዘውዴ', 'Bereket Asfaw Zewde', 'ወንድ', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ጀማሪ የኔትዎርክ ባለሙያ ደረጃ X', 'Junior Network Specialist Grade X', 'ደረጃ X (Grade X)', 'ቋሚ', '2023-08-01', '+251 91 456 7891', 'bereket.asfaw@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 305', 'active', 'በኢንፎርሜሽን ሳይንስ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Information Science', 'ማርታ ኃይሉ (ረዳት ባለሙያ)', 'jd-network-x'),

  -- Database Team
  ('emp-db-001', 'ICS-DB-0654', 'ዳዊት አበራ ወርቁ', 'Dawit Abera Worku', 'ወንድ', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'Senior Database Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'ቋሚ', '2017-09-04', '+251 91 456 7890', 'dawit.abera@ics.gov.et', 'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 105', 'active', 'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Computer Science', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', 'jd-database-xiii'),
  ('emp-db-002', 'ICS-DB-0881', 'ሰላማዊት ደረጀ ሞገስ', 'Selamawit Dereje Moges', 'ሴት', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII', 'Intermediate Database Specialist Grade XII', 'ደረጃ XII (Grade XII)', 'ቋሚ', '2019-11-20', '+251 91 567 8901', 'selamawit.dereje@ics.gov.et', 'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 105', 'active', 'በዳታቤዝ ሲስተምስ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Database Systems', 'ዳዊት አበራ (ከፍተኛ ባለሙያ)', 'jd-database-xii'),
  ('emp-db-003', 'ICS-DB-1055', 'ናትናኤል ግርማ በቀለ', 'Natnael Girma Bekele', 'ወንድ', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI', 'Assistant Database Specialist Grade XI', 'ደረጃ XI (Grade XI)', 'ቋሚ', '2021-06-15', '+251 91 678 9012', 'natnael.girma@ics.gov.et', 'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 106', 'active', 'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Computer Science', 'ሰላማዊት ደረጀ (መካከለኛ ባለሙያ)', 'jd-database-xi'),
  ('emp-db-004', 'ICS-DB-1209', 'ራሔል ክፍሌ ወልደማሪያም', 'Rahel Kifle Woldemariam', 'ሴት', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X', 'Junior Database Specialist Grade X', 'ደረጃ X (Grade X)', 'ቋሚ', '2023-04-10', '+251 91 789 0123', 'rahel.kifle@ics.gov.et', 'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 106', 'active', 'በኢንፎርሜሽን ሲስተምስ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Information Systems', 'ናትናኤል ግርማ (ረዳት ባለሙያ)', 'jd-database-x'),

  -- System Team
  ('emp-sys-001', 'ICS-SYS-0711', 'ዮናስ ታደሰ አያሌው', 'Yonas Tadesse Ayalew', 'ወንድ', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'Senior System Specialist Grade XIII', 'ደረጃ XIII (Grade XIII)', 'ቋሚ', '2018-02-18', '+251 91 321 0987', 'yonas.tadesse@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 306', 'active', 'በኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Information Technology', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', 'jd-system-xiii'),
  ('emp-sys-002', 'ICS-SYS-0932', 'መሰረት አለሙ ገብሬ', 'Meseret Alemu Gebre', 'ሴት', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII', 'Intermediate System Specialist Grade XII', 'ደረጃ XII (Grade XII)', 'ቋሚ', '2020-07-22', '+251 91 890 1234', 'meseret.alemu@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 306', 'active', 'በኮምፒውተር ምህንድስና የመጀመሪያ ዲግሪ (BSc)', 'BSc in Computer Engineering', 'ዮናስ ታደሰ (ከፍተኛ ባለሙያ)', 'jd-system-xii'),
  ('emp-sys-003', 'ICS-SYS-1144', 'አማኑኤል ጥላሁን ደስታ', 'Amanuel Tilahun Desta', 'ወንድ', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ረዳት የሲስተም ባለሙያ ደረጃ XI', 'Assistant System Specialist Grade XI', 'ደረጃ XI (Grade XI)', 'ቋሚ', '2022-03-30', '+251 91 901 2345', 'amanuel.tilahun@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 307', 'active', 'በኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Information Technology', 'መሰረት አለሙ (መካከለኛ ባለሙያ)', 'jd-system-xi'),
  ('emp-sys-004', 'ICS-SYS-1265', 'ትዕግስት ታከለ ንጉሴ', 'Tigist Takele Nigussie', 'ሴት', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'Institutional Technology Administration Directorate', 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን', 'Database, Network & System Admin Division', 'ጀማሪ የሲስተም ባለሙያ ደረጃ X', 'Junior System Specialist Grade X', 'ደረጃ X (Grade X)', 'ቋሚ', '2023-11-05', '+251 91 012 3456', 'tigist.takele@ics.gov.et', 'ዋናው ህንፃ ቢሮ ቁጥር 307', 'active', 'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc)', 'BSc in Computer Science', 'አማኑኤል ጥላሁን (ረዳት ባለሙያ)', 'jd-system-x')
ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

-- =============================================================================
-- 14. SEED DATA - PERFORMANCE APPRAISALS (Referencing Employees)
-- =============================================================================
INSERT INTO appraisal_records (
  id, employee_id, emp_name, emp_code, emp_dept, emp_position, eval_period,
  supervisor_name, eval_date, eval_type, task_score_60, competency_score_40,
  total_score_100, performance_grade, supervisor_comments, employee_comments,
  supervisor_signed, employee_signed, approval_status
) VALUES
  ('appraisal-lydia-2018', 'emp-net-001', 'ሊዲያ ግሩም ገብረስላሴ', 'ICS-NET-0842', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII', 'የ2018 ዓ.ም የመጀመሪያ ግማሽ ዓመት', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', '2026-06-30', 'half-year', 58.20, 37.40, 95.60, 'እጅግ የላቀ (Very High)', 'የተሰጡትን የኔትወርክ ስራዎች በከፍተኛ ጥራትና ፍጥነት አከናውኗል።', 'በምዘናው እስማማለሁ።', true, true, 'approved'),
  ('appraisal-dawit-2018', 'emp-db-001', 'ዳዊት አበራ ወርቁ', 'ICS-DB-0654', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'የ2018 ዓ.ም የመጀመሪያ ግማሽ ዓመት', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', '2026-06-30', 'half-year', 57.00, 38.00, 95.00, 'እጅግ የላቀ (Very High)', 'የዳታቤዝ ደህንነትና ባክአፕ ስራዎች በከፍተኛ ጥራት ተከናውነዋል።', 'በምዘናው እስማማለሁ።', true, true, 'approved'),
  ('appraisal-yonas-2018', 'emp-sys-001', 'ዮናስ ታደሰ አያሌው', 'ICS-SYS-0711', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'የ2018 ዓ.ም የመጀመሪያ ግማሽ ዓመት', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', '2026-06-30', 'half-year', 56.40, 36.80, 93.20, 'ከፍተኛ (High)', 'የዳታ ሴንተር ሰርቨሮች ያለማቋረጥ አገልግሎት እንዲሰጡ ተደርጓል።', 'በምዘናው እስማማለሁ።', true, true, 'approved')
ON CONFLICT (id) DO UPDATE SET
  emp_name = EXCLUDED.emp_name,
  task_score_60 = EXCLUDED.task_score_60,
  competency_score_40 = EXCLUDED.competency_score_40,
  total_score_100 = EXCLUDED.total_score_100;

-- =============================================================================
-- 15. SEED DATA - MONTHLY PERFORMANCE REPORTS (Referencing Employees)
-- =============================================================================
INSERT INTO monthly_reports (
  id, employee_id, employee_name, position, department, supervisor_name,
  year, month, report_date, tasks, supervisor_rating, supervisor_signed, employee_signed, status
) VALUES
  ('mr-sample-01', 'emp-net-001', 'ሊዲያ ግሩም ገብረስላሴ', 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', 2018, 'መስከረም', '2024-10-05', '[]'::jsonb, 5, true, true, 'approved'),
  ('mr-sample-02', 'emp-db-001', 'ዳዊት አበራ ወርቁ', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', 2018, 'መስከረም', '2024-10-05', '[]'::jsonb, 5, true, true, 'approved'),
  ('mr-sample-03', 'emp-sys-001', 'ዮናስ ታደሰ አያሌው', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', 2018, 'መስከረም', '2024-10-05', '[]'::jsonb, 4, true, true, 'approved')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- 16. SEED DATA - AUDIT LOGS (System History)
-- =============================================================================
INSERT INTO audit_logs (entity_type, entity_id, action, actor_name, actor_role, changes, ip_address)
VALUES
  ('system', 'sys-init', 'SCHEMA_INITIALIZATION', 'System Administrator', 'admin', '{"status": "Database schema created and all 7 tables verified"}'::jsonb, '127.0.0.1'),
  ('departments', 'dept-div-dns', 'RECORD_CREATED', 'System Setup', 'admin', '{"name": "የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን"}'::jsonb, '127.0.0.1'),
  ('employees', 'emp-net-001', 'RECORD_VERIFIED', 'ምንዳዬ ሀይሌ (ዳይሬክተር)', 'supervisor', '{"status": "active", "position": "ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII"}'::jsonb, '192.168.1.15');

-- =============================================================================
-- SCHEMA SETUP & INSERTS FOR ALL TABLES COMPLETED SUCCESSFULLY
-- =============================================================================
