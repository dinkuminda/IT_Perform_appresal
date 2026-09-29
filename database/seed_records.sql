-- =============================================================================
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
INSERT INTO departments (
  id, name_am, name_en, code, parent_division, description, is_active
) VALUES (
  'dept-div-dns',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Division',
  'DNS-DIV',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'የኮር ኔትወርክ፣ የዳታቤዝ እና የሲስተም መሰረተ ልማት ማስተዳደር',
  true
) ON CONFLICT (id) DO UPDATE SET
  name_am = EXCLUDED.name_am,
  name_en = EXCLUDED.name_en,
  code = EXCLUDED.code,
  description = EXCLUDED.description;

INSERT INTO departments (
  id, name_am, name_en, code, parent_division, description, is_active
) VALUES (
  'dept-div-branch',
  'የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን',
  'Branch IT Support Division',
  'BIT-DIV',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'የቅርንጫፎች፣ ኤርፖርቶች እና የኬላዎች የኢንፎርሜሽን ቴክኖሎጂ ድጋፍ',
  true
) ON CONFLICT (id) DO UPDATE SET
  name_am = EXCLUDED.name_am,
  name_en = EXCLUDED.name_en,
  code = EXCLUDED.code,
  description = EXCLUDED.description;

INSERT INTO departments (
  id, name_am, name_en, code, parent_division, description, is_active
) VALUES (
  'dept-div-service',
  'የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን',
  'IT Support Service Division',
  'ITS-DIV',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'የተጠቃሚዎች የቴክኒክ ድጋፍ፣ ሄልፕዴስክ እና የሃርድዌር ጥገና',
  true
) ON CONFLICT (id) DO UPDATE SET
  name_am = EXCLUDED.name_am,
  name_en = EXCLUDED.name_en,
  code = EXCLUDED.code,
  description = EXCLUDED.description;

INSERT INTO departments (
  id, name_am, name_en, code, parent_division, description, is_active
) VALUES (
  'dept-net-admin',
  'የኔትዎርክ አስተዳደር የስራ ክፍል',
  'Network Administration Section',
  'NET-ADM',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'የኮር ኔትወርክ፣ የደህንነት ፋየርዎል እና የርቀት ቪፒኤን ግንኙነቶች',
  true
) ON CONFLICT (id) DO UPDATE SET
  name_am = EXCLUDED.name_am,
  name_en = EXCLUDED.name_en,
  code = EXCLUDED.code,
  description = EXCLUDED.description;

INSERT INTO departments (
  id, name_am, name_en, code, parent_division, description, is_active
) VALUES (
  'dept-db-admin',
  'የዳታቤዝ አስተዳደር የስራ ክፍል',
  'Database Administration Section',
  'DB-ADM',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'የተቋማዊ ዳታቤዞች ደህንነት፣ ባክአፕ እና አፈጻጸም ቁጥጥር',
  true
) ON CONFLICT (id) DO UPDATE SET
  name_am = EXCLUDED.name_am,
  name_en = EXCLUDED.name_en,
  code = EXCLUDED.code,
  description = EXCLUDED.description;

INSERT INTO departments (
  id, name_am, name_en, code, parent_division, description, is_active
) VALUES (
  'dept-sys-admin',
  'የሲስተም አስተዳደር የስራ ክፍል',
  'System Administration Section',
  'SYS-ADM',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'የዳታ ሴንተር ሰርቨሮች፣ ቨርቹዋል ማሽኖች እና ክላውድ መሰረተ ልማት',
  true
) ON CONFLICT (id) DO UPDATE SET
  name_am = EXCLUDED.name_am,
  name_en = EXCLUDED.name_en,
  code = EXCLUDED.code,
  description = EXCLUDED.description;

-- =============================================================================
-- 2. TABLE: official_staff_positions (12 Official Civil Service Positions)
-- =============================================================================
INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-net-xiii',
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'Senior Network Specialist Grade XIII',
  'ደረጃ XIII',
  'network',
  'የኔትወርክ አስተዳደር ቡድን መሪ',
  'የኔትወርክ አስተዳደር ቡድን መሪ',
  'የተቋሙን ዋና መ/ቤት፣ ቅርንጫፎችና ኬላዎች የሚያገናኝ የኮር ኔትወርክ አርክቴክቸር፣ SD-WAN፣ BGP/OSPF ራውቲንግ፣ ከፍተኛ ደህንነትና የአደጋ ጊዜ ማገገሚያ ስርዓቶችን ማቀድ፣ ማዋቀርና መምራት።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-net-xii',
  'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
  'Intermediate Network Specialist Grade XII',
  'ደረጃ XII',
  'network',
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'የኔትወርክ ስዊቾችን፣ ራውተሮችን፣ የፋየርዎል ህጎችን ማስተዳደር፤ የትራፊክ ፍሰትና የቪፒኤን መዳረሻን መከታተል፤ የቅርንጫፎች የኔትወርክ ብልሽቶችን መፍታት።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-net-xi',
  'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
  'Assistant Network Specialist Grade XI',
  'ደረጃ XI',
  'network',
  'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
  'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
  'የኔትወርክ ኬብሊንግ፣ የመቀያየሪያ ወደቦች (Access Switches/Ports) ዝርጋታና ፍተሻ፣ የኔትወርክ መሳሪያዎች የቅድመ ብልሽት ጥገና እና የቅርንጫፎች የቴክኒክ ድጋፍ ማከናወን።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-net-x',
  'ጀማሪ የኔትዎርክ ባለሙያ ደረጃ X',
  'Junior Network Specialist Grade X',
  'ደረጃ X',
  'network',
  'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
  'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
  'ዕለታዊ የኔትወርክ መሳሪያዎች ጤንነት መከታተል፣ የተጠቃሚዎች የኔትወርክ ግንኙነት ጥያቄዎችን መመዝገብ፣ መሰረታዊ የኔትወርክ ጥገና እና የወደብ ፍተሻዎችን በክትትል ስር ማከናወን።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-db-xiii',
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'Senior Database Specialist Grade XIII',
  'ደረጃ XIII',
  'database',
  'የዳታቤዝ አስተዳደር ቡድን መሪ',
  'የዳታቤዝ አስተዳደር ቡድን መሪ',
  'የተቋሙን ዋና ዋና ኢንተርፕራይዝ ዳታቤዞች (Oracle RAC, PostgreSQL, SQL Server) አርክቴክቸር፣ High Availability፣ አፈጻጸም ማሻሻያ (Performance Tuning)፣ የዳታ ምስጠራና የDR ማገገሚያ ስርዓት መምራት።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-db-xii',
  'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
  'Intermediate Database Specialist Grade XII',
  'ደረጃ XII',
  'database',
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'የዳታቤዝ ዕለታዊ ክትትልና የሀብቶች አጠቃቀም ቁጥጥር፣ የዳታ ልወጣና ኢንተግሬሽን (ETL/Pipelines)፣ የባክአፕ ማረጋገጫ እና የተጠቃሚዎች ፈቃድ አስተዳደር ማከናወን።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-db-xi',
  'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
  'Assistant Database Specialist Grade XI',
  'ደረጃ XI',
  'database',
  'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
  'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
  'የዳታቤዝ ቅጂዎችን (Daily Backups) በወቅቱ መውሰድ፣ የቴብልስፔስና የዲስክ ቦታ ክትትል ማድረግ፣ ቀላል የSQL ስክሪፕቶችን ማሄድ እና የአፕሊኬሽን ዳታ ፍተሻ ማካሄድ።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-db-x',
  'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X',
  'Junior Database Specialist Grade X',
  'ደረጃ X',
  'database',
  'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
  'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
  'የዳታቤዝ ሁነታ ሎጎችን መመዝገብ፣ መሰረታዊ የዳታ ቅጂዎች መያዛቸውን ማረጋገጥ፣ የዳታ ቋት የተጠቃሚዎች ጥያቄዎችን መቀበልና መመዝገብ።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-sys-xiii',
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'Senior System Specialist Grade XIII',
  'ደረጃ XIII',
  'system',
  'የሲስተም አስተዳደር ቡድን መሪ',
  'የሲስተም አስተዳደር ቡድን መሪ',
  'የተቋሙን ዋና ዋና ኢንተርፕራይዝ ሰርቨሮች፣ VMware vSphere ቨርቹዋል ክላስተሮች፣ SAN/NAS ስቶሬጅ፣ Active Directory እና የተቋሙን DR Site አጠቃላይ አሰራር በበላይነት ማቀድና ማስተዳደር።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-sys-xii',
  'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
  'Intermediate System Specialist Grade XII',
  'ደረጃ XII',
  'system',
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'የሰርቨሮችና የቨርቹዋል ማሽኖች ዕለታዊ ጤንነት መከታተል፣ ወርሃዊ የደህንነት ፓቾችን (Patch Management) መተግበር፣ Veeam ባክአፖችን ማረጋገጥና የሰርቨር ሃርድዌር ጥገናዎችን ማስተባበር።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-sys-xi',
  'ረዳት የሲስተም ባለሙያ ደረጃ XI',
  'Assistant System Specialist Grade XI',
  'ደረጃ XI',
  'system',
  'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
  'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
  'የሰርቨር ኦፕሬቲንግ ሲስተሞች ጭነት፣ የአካላዊ ዳታ ሴንተር አካባቢ (የሙቀት፣ የኤሲ፣ የUPS) ክትትል፣ የተጠቃሚዎች መለያ (AD User Provisioning) እና የመሰረታዊ ሲስተም ችግሮች ጥገና ማከናወን።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

INSERT INTO official_staff_positions (
  id, title_am, title_en, grade, category, reports_to_am, reports_to_en, job_objective_am
) VALUES (
  'pos-sys-x',
  'ጀማሪ የሲስተም ባለሙያ ደረጃ X',
  'Junior System Specialist Grade X',
  'ደረጃ X',
  'system',
  'ረዳት የሲስተም ባለሙያ ደረጃ XI',
  'ረዳት የሲስተም ባለሙያ ደረጃ XI',
  'የሰርቨር ሎጎችን በየዕለቱ መፈተሽ፣ የመሰረታዊ ሲስተም ብልሽት ጥሪዎችን መቀበልና መመዝገብ፣ ቀላል የሶፍትዌር ጭነቶችንና ፍተሻዎችን በክትትል ስር ማከናወን።'
) ON CONFLICT (id) DO UPDATE SET
  title_am = EXCLUDED.title_am,
  title_en = EXCLUDED.title_en,
  grade = EXCLUDED.grade,
  category = EXCLUDED.category,
  job_objective_am = EXCLUDED.job_objective_am;

-- =============================================================================
-- 3. TABLE: job_descriptions (12 Civil Service Result-Oriented Matrices)
-- =============================================================================
INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-network-xiii',
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'Senior Network Specialist Grade XIII',
  'ደረጃ XIII (Grade XIII)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
  'የኔትወርክ አስተዳደር ቡድን መሪ',
  'የተቋሙን ዋና መ/ቤት፣ ቅርንጫፎች፣ ኤርፖርቶች እና ኬላዎች የሚያገናኘውን ሰፊ የኔትወርክ (WAN/LAN/WLAN) መሰረተ ልማት ማቀድ፣ ማዋቀር፣ ማስተዳደር፤ የኔትወርክ ደህንነትን (Next-Gen Firewalls/VPN/SD-WAN) እና የዳታ ማስተላለፍ ፍጥነትን በከፍተኛ ጥራት ማስጠበቅ።',
  '[{"id":"d1","title":"የኮርና ዲስትሪቢውሽን ኔትወርክ አርክቴክቸር፣ ዲዛይንና ዝርጋታ (Core/Distribution Switching & Routing)","description":"Cisco Nexus/Catalyst እና Huawei ኮር ስዊቾችን፣ ራውተሮችን፣ VLAN፣ OSPF፣ BGP እና VRF ቴክኖሎጂዎችን ዲዛይን ማድረግና ማስተዳደር።","weightPercentage":30},{"id":"d2","title":"የቅርንጫፎች WAN፣ SD-WAN እና የኢንተርኔት ግንኙነቶች አስተዳደር (Enterprise WAN & SD-WAN Management)","description":"የቅርንጫፍ ጽ/ቤቶችን እና የድንበር ኬላዎችን ከዋናው ዳታ ሴንተር ጋር የሚያገናኙ የSD-WAN፣ MPLS እና ሳተላይት ግንኙነቶችን ማስተዳደርና ተደጋጋሚነት (Redundancy) ማረጋገጥ።","weightPercentage":25},{"id":"d3","title":"የኔትወርክ ደህንነት፣ ፋየርዎል እና የርቀት መዳረሻ (Next-Gen Firewalls, IPsec/SSL VPN)","description":"FortiGate/Palo Alto ፋየርዎሎችን በHA ሞድ ማዋቀር፣ የደህንነት ፖሊሲዎችን ማስተዳደር እና የርቀት ሰራተኞች ደህንነቱ የተጠበቀ የVPN መዳረሻ ማረጋገጥ።","weightPercentage":25},{"id":"d4","title":"የኔትወርክ ትራፊክ ቁጥጥር፣ QoS እና የመተላለፊያ ይዘት አስተዳደር (Bandwidth Optimization & Monitoring)","description":"የባንድዊድዝ አጠቃቀምን መከታተል፣ Quality of Service (QoS) በመተግበር ለፓስፖርትና ለዜግነት አገልግሎት ቅድሚያ መስጠት።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 9%","weight":9,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%","weight":18,"tasks":[{"code":"2.1","description":"የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ","weight":3},{"code":"2.2","description":"የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤","weight":3},{"code":"2.3","description":"የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":3},{"code":"2.4","description":"ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤","weight":3},{"code":"2.5","description":"የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤","weight":3},{"code":"2.6","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤","weight":3}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%","weight":20,"tasks":[{"code":"3.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤","weight":2},{"code":"3.2","description":"የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤","weight":2},{"code":"3.3","description":"በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤","weight":2},{"code":"3.4","description":"በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤","weight":3},{"code":"3.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤","weight":2},{"code":"3.6","description":"በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤","weight":3},{"code":"3.7","description":"የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":3},{"code":"3.8","description":"የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤","weight":3}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%","weight":13,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":3},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤","weight":2},{"code":"4.3","description":"የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤","weight":3},{"code":"4.4","description":"የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤","weight":3},{"code":"4.5","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።","weight":2}]}]'::jsonb,
  '{"education":"በኮምፒውተር ምህንድስና፣ ኤሌክትሪካል ምህንድስና፣ ኔትወርክ ኢንጂነሪንግ ወይም ተዛማጅ መስክ የመጀመሪያ ወይም ሁለተኛ ዲግሪ","experience":"ቢያንስ 6 ዓመት በኢንተርፕራይዝ ኔትወርክ ዝርጋታና አስተዳደር የስራ ልምድ","certifications":["Cisco Certified Network Professional (CCNP Enterprise)","Fortinet Network Security Expert (NSE 4 / NSE 7)","Huawei Certified ICT Professional (HCIP Routing & Switching)","CompTIA Security+"],"technicalSkills":["Cisco Catalyst 9000 & Nexus series switches, ISR/ASR routers","Dynamic Routing Protocols: BGP, OSPF, EIGRP, VRF, MPLS","Next-Generation Firewalls: FortiGate, Palo Alto Networks, Cisco Firepower","Enterprise SD-WAN, Site-to-Site IPsec VPN, AnyConnect SSL VPN","Network Access Control (802.1X, Cisco ISE / Aruba ClearPass)","Monitoring & Analytics: SolarWinds NPM, PRTG, Zabbix, Wireshark"]}'::jsonb,
  '["የኮር ኔትወርክ ያልተቋረጠ አገልግሎት መስጠት ምጣኔ (Core Network Uptime >= 99.8%)","የቅርንጫፎች የኔትወርክ መቋረጥ ሲያጋጥም ወዲያውኑ ወደ ባክአፕ መስመር መቀየር (Failover < 30 seconds)","የኔትወርክ ፓኬት መጥፋት (Packet Loss < 0.1%) እና የላተንሲ መጠን መጠበቅ","የአዳዲስ ቅርንጫፎች ኔትወርክ ዝርጋታ በተያዘለት የጊዜ ሰሌዳ መከናወኑ"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-network-xii',
  'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
  'Intermediate Network Specialist Grade XII',
  'ደረጃ XII (Grade XII)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'የተቋሙን ኔትወርክ በ24/7 ሞኒተሪንግ ሲስተሞች መከታተል፣ የትራፊክ መጨናነቆችን መፍታት፣ የፋየርዎል ህጎችን (Firewall Rules) ማስተዳደር፣ የቅርንጫፍ መስመሮችን ጤንነት መቆጣጠር እና የኔትወርክ ብልሽቶችን በፍጥነት መጠገን።',
  '[{"id":"d1","title":"የኔትወርክ ትራፊክና የመስመሮች ጤንነት 24/7 ክትትል (24/7 Network Monitoring & NOC Operations)","description":"PRTG, Zabbix እና SolarWinds በመጠቀም የኔትወርክ መስመሮችና መሣሪያዎች አገልግሎት መስጠታቸውን በየሰከንዱ መከታተል።","weightPercentage":30},{"id":"d2","title":"የፋየርዎል ፖሊሲዎች፣ ቪፒኤን እና የአክሰስ ቁጥጥር (Firewall Policy & VPN Administration)","description":"የፋየርዎል ወደብ (Port) ፈቃዶችን ማስተዳደር፣ አጠራጣሪ አይፒዎችን ማገድ እና የተጠቃሚዎች የቪፒኤን አካውንት ማዘጋጀት።","weightPercentage":25},{"id":"d3","title":"የቅርንጫፎች ኔትወርክ ጥገናና የድጋፍ አገልግሎት (Branch Network Troubleshooting)","description":"በቅርንጫፍ ጽ/ቤቶች የሚከሰቱ የኔትወርክ መቋረጦችን በርቀት ወይም በአካል በመገኘት መጠገንና አገልግሎቱን ማስቀጠል።","weightPercentage":25},{"id":"d4","title":"የኔትወርክ ዕቃዎች ማኑዋል፣ ኢንቬንተሪና ሰነድ አስተዳደር (Network Asset & Configuration Documentation)","description":"የኔትወርክ ቶፖሎጂ ካርታዎችን ማዘጋጀት፣ የኮንፊገሬሽን ባክአፖችን መውሰድና የዕቃዎችን መዝገብ መያዝ።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 9%","weight":9,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%","weight":18,"tasks":[{"code":"2.1","description":"የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ","weight":3},{"code":"2.2","description":"የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤","weight":3},{"code":"2.3","description":"የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":3},{"code":"2.4","description":"ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤","weight":3},{"code":"2.5","description":"የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤","weight":3},{"code":"2.6","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤","weight":3}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%","weight":20,"tasks":[{"code":"3.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤","weight":2},{"code":"3.2","description":"የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤","weight":2},{"code":"3.3","description":"በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤","weight":2},{"code":"3.4","description":"በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤","weight":3},{"code":"3.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤","weight":2},{"code":"3.6","description":"በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤","weight":3},{"code":"3.7","description":"የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":3},{"code":"3.8","description":"የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤","weight":3}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%","weight":13,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":3},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤","weight":2},{"code":"4.3","description":"የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤","weight":3},{"code":"4.4","description":"የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤","weight":3},{"code":"4.5","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።","weight":2}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ፣ በኮምፒውተር ሳይንስ ወይም በኤሌክትሪካል ምህንድስና የመጀመሪያ ዲግሪ","experience":"ቢያንስ 4 ዓመት በኔትወርክ አስተዳደርና ክትትል የስራ ልምድ","certifications":["Cisco Certified Network Associate (CCNA)","Fortinet NSE 4 (Network Security Professional)","CompTIA Network+"],"technicalSkills":["Cisco IOS/IOS-XE configuration and troubleshooting","FortiGate and Sophos firewall administration","VLAN segmentation, Spanning Tree Protocol (STP), EtherChannel","NOC monitoring tools (PRTG, Zabbix, Cacti, Grafana)"]}'::jsonb,
  '["የኔትወርክ ብልሽት ማስጠንቀቂያዎች (Alerts) በ15 ደቂቃ ውስጥ ምላሽ ማግኘታቸው","የቅርንጫፎች የቴክኒክ ድጋፍ ጥያቄዎች SLA ምላሽ ጊዜ ከ2 ሰዓት በታች መሆኑ","የኔትወርክ መሳሪያዎች ውቅር (Configurations) በየሳምንቱ ባክአፕ መደረጋቸው"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-network-xi',
  'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
  'Assistant Network Specialist Grade XI',
  'ደረጃ XI (Grade XI)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
  'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
  'የኔትወርክ መዋቅር ዝርጋታዎችን (Structured Cabling/Patch Panels)፣ የመቀያየሪያ ስዊቾች ወደቦች አደረጃጀት፣ የዋይፋይ አክሰስ ፖይንቶች ተከላ እና የቅርንጫፎች የኔትወርክ ኬብልና ሃርድዌር ጥገና ማከናወን።',
  '[{"id":"d1","title":"የኔትወርክ ኬብሊንግና የሃርድዌር ዝርጋታ (Cabling & Hardware Installation)","description":"Cat6/Fiber ኬብሎችን መዘርጋት፣ የRJ45 ተርሚኔሽን ማዘጋጀት፣ Patch Panels እና Faceplates ማስተካከልና መፈተሽ።","weightPercentage":30},{"id":"d2","title":"የAccess Switches ወደቦችና የዋይፋይ አክሰስ ፖይንቶች ቁጥጥር (Access Ports & Wi-Fi APs)","description":"የሰራተኞች ኔትወርክ ወደቦችን ማገናኘት፣ የዋይፋይ ራውተሮችንና Access Points መስራታቸውን በየቢሮው ማረጋገጥ።","weightPercentage":25},{"id":"d3","title":"የኔትወርክ መሳሪያዎች የቅድመ ብልሽት ፍተሻ (Preventive Maintenance)","description":"የኔትወርክ ራኮችን ማጽዳት፣ የአየር ዝውውር መቆጣጠር፣ የኬብል አስተዳደር (Cable Management) ማስተካከልና መዝገብ መያዝ።","weightPercentage":25},{"id":"d4","title":"የመሰረታዊ የኔትወርክ ብልሽቶች አፋጣኝ ጥገና (First-Level Network Troubleshooting)","description":"በተጠቃሚዎች ዘንድ የሚከሰቱ የIP አለመቀበል፣ የኬብል መበጠስ እና የስዊች ወደብ ችግሮችን ወዲያውኑ መፍታት።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 9%","weight":9,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%","weight":18,"tasks":[{"code":"2.1","description":"የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ","weight":3},{"code":"2.2","description":"የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤","weight":3},{"code":"2.3","description":"የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":3},{"code":"2.4","description":"ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤","weight":3},{"code":"2.5","description":"የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤","weight":3},{"code":"2.6","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤","weight":3}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%","weight":20,"tasks":[{"code":"3.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤","weight":2},{"code":"3.2","description":"የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤","weight":2},{"code":"3.3","description":"በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤","weight":2},{"code":"3.4","description":"በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤","weight":3},{"code":"3.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤","weight":2},{"code":"3.6","description":"በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤","weight":3},{"code":"3.7","description":"የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":3},{"code":"3.8","description":"የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤","weight":3}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%","weight":13,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":3},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤","weight":2},{"code":"4.3","description":"የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤","weight":3},{"code":"4.4","description":"የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤","weight":3},{"code":"4.5","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።","weight":2}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ፣ ኮምፒውተር ሳይንስ ወይም ኤሌክትሮኒክስ ዲፕሎማ ወይም የመጀመሪያ ዲግሪ","experience":"ቢያንስ 2 ዓመት በኔትወርክ ዝርጋታና ቴክኒካል ድጋፍ የስራ ልምድ","certifications":["CompTIA Network+","Cisco CCNA (ተመራጭ)"],"technicalSkills":["Structured Cabling and Cable Testing Tools (Fluke Network Tester)","Switch port patching and basic VLAN assignment","Wi-Fi Access Point deployment and testing","Network troubleshooting (Ping, Traceroute, IPConfig)"]}'::jsonb,
  '["የተጠቃሚዎች የኬብልና የኔትወርክ ወደብ ጥያቄዎች በ1 ሰዓት ውስጥ መፈታታቸው","የኔትወርክ ራክ ካቢኔቶች 100% ንጽህናና ስታንዳርድ የጠበቀ የኬብል አደረጃጀት መያዛቸው"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-network-x',
  'ጀማሪ የኔትዎርክ ባለሙያ ደረጃ X',
  'Junior Network Specialist Grade X',
  'ደረጃ X (Grade X)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
  'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
  'ዕለታዊ የኔትወርክ መስመሮችና መሣሪያዎች ጤንነት መከታተል፣ የተጠቃሚዎች የኔትወርክ ጥሪዎችን መመዝገብ፣ መሰረታዊ የኔትወርክ ፍተሻዎችን በክትትል ስር ማከናወን።',
  '[{"id":"d1","title":"የዕለታዊ የኔትወርክ ግንኙነት ክትትልና የጥሪዎች ምዝገባ (Helpdesk & Ticket Logging)","description":"ከተጠቃሚዎች የሚመጡ የኔትወርክ መቋረጥ ጥሪዎችን መመዝገብ፣ የመጀመሪያ ደረጃ ፍተሻ ማካሄድና ለከፍተኛ ባለሙያዎች ማስተላለፍ።","weightPercentage":35},{"id":"d2","title":"የመሰረታዊ የኔትወርክ ኬብሎች ፍተሻና ዝግጅት (Patch Cord Fabrication & Cable Testing)","description":"የኔትወርክ ፓች ኮርዶችን ማዘጋጀት፣ ኬብል ቴስተር በመጠቀም መስራታቸውን ማረጋገጥና ለተጠቃሚዎች ማዳረስ።","weightPercentage":25},{"id":"d3","title":"የኔትወርክ እቃዎች ኢንቬንተሪና ሰነድ አያያዝ (Inventory Assistance)","description":"የተቀመጡ ስዊቾች፣ ራውተሮችና የኬብል ጥቅሎች ዝርዝር መዝገብ መያዝ እና በየወሩ ቆጠራ ማካሄድ።","weightPercentage":20},{"id":"d4","title":"የስራ ልምድ ማዳበርና ስልጠናዎችን መከታተል (Learning & Skills Development)","description":"ከፍተኛ ባለሙያዎችን በመከታተል የኔትወርክ ውቅሮችን መማር እና የተሰጡ የስልጠና እቅዶችን ማጠናቀቅ።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 9%","weight":9,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%","weight":18,"tasks":[{"code":"2.1","description":"የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ","weight":3},{"code":"2.2","description":"የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤","weight":3},{"code":"2.3","description":"የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":3},{"code":"2.4","description":"ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤","weight":3},{"code":"2.5","description":"የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤","weight":3},{"code":"2.6","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤","weight":3}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%","weight":20,"tasks":[{"code":"3.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤","weight":2},{"code":"3.2","description":"የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤","weight":2},{"code":"3.3","description":"በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤","weight":2},{"code":"3.4","description":"በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤","weight":3},{"code":"3.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤","weight":2},{"code":"3.6","description":"በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤","weight":3},{"code":"3.7","description":"የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":3},{"code":"3.8","description":"የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤","weight":3}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%","weight":13,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":3},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤","weight":2},{"code":"4.3","description":"የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤","weight":3},{"code":"4.4","description":"የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤","weight":3},{"code":"4.5","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።","weight":2}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ፣ ኮምፒውተር ሳይንስ ወይም ተዛማጅ መስክ የመጀመሪያ ዲግሪ ወይም የኮሌጅ ዲፕሎማ","experience":"0 - 1 ዓመት የስራ ልምድ (Entry Level)","certifications":["CompTIA IT Fundamentals / Network+ (የተመረጠ)"],"technicalSkills":["RJ45 crimping and cable testing","Basic TCP/IP concepts (IP address, Subnet Mask, Gateway)","Basic Windows/Linux network settings"]}'::jsonb,
  '["የተጠቃሚዎች የኔትወርክ ጥሪዎችን በወቅቱ መመዝገብና መመለስ","የተሰጡ የቴክኒክ ተልእኮዎችን በታማኝነትና በወቅቱ ማከናወን"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-database-xiii',
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'Senior Database Specialist Grade XIII',
  'ደረጃ XIII (Grade XIII)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
  'የዳታቤዝ አስተዳደር ቡድን መሪ',
  'የተቋሙን ዋና ዋና የመረጃ ቋቶች (Oracle Database, PostgreSQL, Microsoft SQL Server) አርክቴክቸር ማቀድ፣ መዘርጋት፣ የዳታ ተደራሽነት (High Availability/RAC/Clustering) ማረጋገጥ፣ የጥያቄዎችና ትራንዛክሽኖች ፍጥነት (Performance Tuning & Optimization) ማሻሻል፣ የዳታ ደህንነትና ኢንክሪፕሽን መጠበቅ እና አስተማማኝ የመረጃ ቅጂ (Disaster Recovery/Backup) ስርዓት መምራት።',
  '[{"id":"d1","title":"የዳታቤዝ አርክቴክቸር፣ ዲዛይንና ከፍተኛ ተደራሽነት (High Availability & Clustering)","description":"የOracle RAC (Real Application Clusters), Data Guard, እና PostgreSQL Patroni/Streaming Replication ክላስተሮችን ዲዛይን ማድረግ፣ መጫን፣ ማዋቀርና አስተማማኝ ተደራሽነታቸውን ማረጋገጥ።","weightPercentage":30},{"id":"d2","title":"የዳታቤዝ አፈጻጸም ቁጥጥር፣ መጠይቆች ማሻሻያ (Query Optimization & Performance Tuning)","description":"የዳታቤዝ ትራንዛክሽኖችን ፍጥነት መከታተል፣ Execution Plans መተንተን፣ ኢንዴክሶችን ማሻሻል፣ ማነቆ የሆኑ ውስብስብ SQL/PL-SQL መጠይቆችን መፍታትና የሀብት አጠቃቀምን ማመቻቸት።","weightPercentage":25},{"id":"d3","title":"የመረጃ ቅጂ (Backup)፣ ማገገሚያ (Disaster Recovery) እና ተከታታይ ፍተሻ","description":"RMAN እና pg_backrest በመጠቀም ራስ-ሰር ዕለታዊና ሳምንታዊ ሙሉ የዳታ ቅጂዎችን ማከናወን፣ የWAL ማህደር ማስተዳደር እና በወር ቢያንስ አንድ ጊዜ የማገገም (DR Drill) ሙከራ ማድረግ።","weightPercentage":25},{"id":"d4","title":"የዳታ ደህንነት፣ ምስጠራ፣ ኦዲትና የተጠቃሚዎች ፈቃድ ቁጥጥር (Security & Access Control)","description":"Transparent Data Encryption (TDE) መተግበር፣ የመረጃ ቋቶችን ተጋላጭነት መፈተሽ፣ ሚስጥራዊ የዜጎች መረጃ እንዳይፈስ መጠበቅ እና የዳታቤዝ ተጠቃሚዎች መዳረሻን በደረጃ መቆጣጠር።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና ይሰጣል፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"2.1","description":"ስራዎችን ውጤታማ ለማድረግ የሚረዱ ዓለም አቀፍ ምርጥ ተሞክሮዎችን መቀመርና ማስፋፋት፤","weight":3},{"code":"2.2","description":"የተቋሙ ዳታቤዝ በዘመናዊ መንገድ ለማስተዳደር የሚያግዙ አዳዲስ አሰራር ስልቶችን መከታተል","weight":3},{"code":"2.3","description":"የዳታ ሴንተር ሃብቶች የአደጋ ጊዜ መውጫና የስራ ማስቀጠያ (Disaster Recovery and Business Continuity) አሰራር መዘገጀት፤ መከታተል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን የዳታቤዝ ፍላጎቶችን በጥናት መለየትና አዳዲስ አሰራሮችን መቀየስ","weight":2},{"code":"3.2","description":"ለቅርንጫፍና ለዋና መስሪያ ቤት ረዳትና ጀማሪ የዳታቤዝ ባለሙያዎች የቴክኒክ ድጋፍ መስጠት፤","weight":3},{"code":"3.3","description":"የዳታቤዝ አፈጻጸምን መከታተል፤የዳታቤዝ ውቅሮችን ማመቻቸት እና የመጠባበቂያ(backup) እና መልሶ ማግኛ(recovery) ሂደቶችን መተግበር፤መደበኛ የዳታ ቤዝ ጥገና ሥራዎችን ማከናወን፤","weight":3},{"code":"3.4","description":"ከመረጃ ቋቱ ስርዓት ጋር የተያያዙ ችግሮችን መለየት እና የመፍታት ሥራን መስራት","weight":3},{"code":"3.5","description":"ዳታቤዝ ከሌሎች ስስተሞች እና አፕሊኬሽኖች ጋር በትክክል እንዲቀናጁ ማድረግ፤","weight":3},{"code":"3.6","description":"የዳታ ዋስትና (Data Integrity)፣ ደህንነት (Security) እና የዳታ ስርዓት ተከታታይነት (Consistency) ማረጋገጥ፤","weight":3},{"code":"3.7","description":"የዳታቤዝ ስርዓቶችን (MySQL, Oracle, SQL Server, PostgreSQL, MongoDB, ወዘተ) መጫን፣ ማዋቀር፣ እና እንዲዘምን ማድረግ፤","weight":2}]},{"no":4,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት ውጤታማ ማድረግ 20%","weight":20,"tasks":[{"code":"4.1","description":"በዋናው መስሪያ ቤት፣ በቅርንጫፎችና በCloud የሚገኙ ዳታቤዞች በትክክል መስራታቸውን መከታተልና የቴክኒክ ድጋፍ መስጠት፤","weight":2},{"code":"4.2","description":"የዳታቤዝ መረጃዎች ቅጅ (Backup) ሚስጢራዊነታቸውን ጠብቆ እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) ማረጋገጥና መያዝ፤","weight":2},{"code":"4.3","description":"ማንኛውንም የአፕሊኬሽን ዳታቤዝ ሳይቋረጥ አገልግሎት እንዲሰጥ (High availability and Fault tolerance) በአሰራር መሰረት ተግባራዊ ማድረግ፤ ሂደቱንም መከታተል፤","weight":2},{"code":"4.4","description":"በአደጋ ጊዜ መጠበቂያ ዳታሴንተር (Disaster Recovery Site) የDatabase Replication መስራቱን መከታተል፤","weight":3},{"code":"4.5","description":"የዳታቤዝ የአቅም ማሻሻል (Performance tuning,monitoring)፣ መቆራረጥ እንዳይኖር መከታተልና የቴክኒክ ብልሽቶችን (Single point of failure) መከላከል፤","weight":2},{"code":"4.6","description":"በዳታ ቤዝ ሰርቨሮች፣ ስቶሬጆች፣ ቨርቹዋልላይዜሽን የአፕሬቲንግ ሲስተም ሰዓትጭሮች፣ ሳይቆራረጡ እንዲሰሩ ክትትል ማድረግ፤","weight":3},{"code":"4.7","description":"የዳታቤዝ ደህንነትን በመቆጣጠር፣ የይለፍ ቃሎች (Passwords)፣ ፈቃዶች (Permissions) እና የስምጣኔ ማረጋገጫ (Authentication) እንድቀጥሩ ማድረግ፤","weight":2},{"code":"4.8","description":"የዳታ ሞዴሊንግ(Data Modeling)፣ የዳታ መዋቅር (Schema Design) እና የዳታ ማከማቻ ስልቶችን (Storage Strategies) በማጥናት ላይ ምክር እንዲቀርብ ማድረግ፤","weight":2},{"code":"4.9","description":"የክላውድ ዳታቤዝ (Cloud Databases) እንደ AWS RDS፣ Azure SQL፣ ወይም Google Cloud SQL ተግባራዊ ያደርጋል","weight":2},{"code":"4.10","description":"የዳታቤዝ (Schemas)፣ ሰንጠረዦችን (Tables) እና ግንኙነቶችን (Relationships) መፍጠር እና ማስተዳደር፤","weight":2},{"code":"4.11","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ያከናውናል።","weight":2}]}]'::jsonb,
  '{"education":"በኮምፒውተር ሳይንስ፣ በሶፍትዌር ምህንድስና፣ በዳታቤዝ ሲስተምስ ወይም በተመሳሳይ መስክ የመጀመሪያ ወይም ሁለተኛ ዲግሪ","experience":"ቢያንስ 6 ዓመት በኢንተርፕራይዝ ደረጃ የዳታቤዝ አስተዳደር (Enterprise DBA) ቀጥተኛ የስራ ልምድ","certifications":["Oracle Certified Professional (OCP Database)","PostgreSQL Certified Professional","Microsoft Certified: Azure Database Administrator Associate","AWS Certified Database - Specialty"],"technicalSkills":["Oracle 19c/21c Enterprise, RAC, ASM, Data Guard","PostgreSQL High Availability (Patroni, PgBouncer, Replication)","Microsoft SQL Server AlwaysOn Availability Groups","SQL, PL/SQL, T-SQL performance tuning & profiling","Automated Backup Tools (RMAN, pg_backrest, Commvault)","Database Encryption (TDE), Database Auditing, Row-Level Security"]}'::jsonb,
  '["የዋና ዋና ዳታቤዞች ያልተቋረጠ አገልግሎት መስጠት ምጣኔ (Database Uptime >= 99.95%)","የዳታ ማጣት ምጣኔ ዜሮ መሆኑ (Zero Data Loss: RPO = 0, RTO < 30 minutes)","የተከናወኑ የዳታ ቅጂዎች (Backups) 100% ትክክለኛነትና ሳምንታዊ የማገገሚያ ፍተሻ መሳካት","የወሳኝ መጠይቆች (Critical Queries) ምላሽ ፍጥነት ከ1 ሰከንድ በታች መሆኑ"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-database-xii',
  'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
  'Intermediate Database Specialist Grade XII',
  'ደረጃ XII (Grade XII)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'የተቋሙን የዳታ ቋቶች ዕለታዊ አሰራርና ጤንነት መከታተል፣ የዳታ ማዛወርና ልወጣ (ETL/Data Pipelines) ስራዎችን ማከናወን፣ ከተለያዩ ዲጂታል ሲስተሞች ጋር የሚደረጉ የመረጃ ትስስሮችን ማስተዳደር እና የዳታ ጥራት ማረጋገጥ።',
  '[{"id":"d1","title":"ዕለታዊ የዳታቤዝ ክትትልና የሀብቶች አጠቃቀም ቁጥጥር (Daily Monitoring & Health Check)","description":"የዳታቤዝ ስቶሬጅ፣ ቴብልስፔስ፣ ሎግ ፋይሎች እና የሲፒዩ/ራም አጠቃቀምን በየቀኑ መከታተል፣ ማስጠንቀቂያዎችን በወቅቱ መፍታት።","weightPercentage":30},{"id":"d2","title":"የዳታ ማዛወር፣ ልወጣና የትስስር ስራዎች (ETL, Data Pipelines & Integration)","description":"የዜግነትና የኢ-ቪዛ ዳታቤዞች እርስበርስና ከሌሎች ተቋማት ጋር የሚለዋወጡትን የዳታ ቧንቧዎች (Data Pipelines) መገንባትና መከታተል።","weightPercentage":25},{"id":"d3","title":"የዳታ ቅጂዎችና ማህደሮች ቁጥጥር (Routine Backups & Archive Management)","description":"ዕለታዊ ሎግ ባክአፖችን መከታተል፣ አሮጌ ዳታዎችን ወደ ማህደር (Archive Storage) ማዛወርና የዲስክ ቦታን ማመቻቸት።","weightPercentage":25},{"id":"d4","title":"የተጠቃሚዎች ድጋፍና የዳታቤዝ አክሰስ አስተዳደር (User Support & Access Provisioning)","description":"ለአፕሊኬሽን አልሚዎችና ለሲስተም ባለሙያዎች የተፈቀደ የዳታቤዝ መዳረሻ መስጠት፣ ስክሪፕቶችን መፈተሽና ድጋፍ ማድረግ።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና ይሰጣል፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"2.1","description":"ስራዎችን ውጤታማ ለማድረግ የሚረዱ ዓለም አቀፍ ምርጥ ተሞክሮዎችን መቀመርና ማስፋፋት፤","weight":3},{"code":"2.2","description":"የተቋሙ ዳታቤዝ በዘመናዊ መንገድ ለማስተዳደር የሚያግዙ አዳዲስ አሰራር ስልቶችን መከታተል","weight":3},{"code":"2.3","description":"የዳታ ሴንተር ሃብቶች የአደጋ ጊዜ መውጫና የስራ ማስቀጠያ (Disaster Recovery and Business Continuity) አሰራር መዘገጀት፤ መከታተል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን የዳታቤዝ ፍላጎቶችን በጥናት መለየትና አዳዲስ አሰራሮችን መቀየስ","weight":2},{"code":"3.2","description":"ለቅርንጫፍና ለዋና መስሪያ ቤት ረዳትና ጀማሪ የዳታቤዝ ባለሙያዎች የቴክኒክ ድጋፍ መስጠት፤","weight":3},{"code":"3.3","description":"የዳታቤዝ አፈጻጸምን መከታተል፤የዳታቤዝ ውቅሮችን ማመቻቸት እና የመጠባበቂያ(backup) እና መልሶ ማግኛ(recovery) ሂደቶችን መተግበር፤መደበኛ የዳታ ቤዝ ጥገና ሥራዎችን ማከናወን፤","weight":3},{"code":"3.4","description":"ከመረጃ ቋቱ ስርዓት ጋር የተያያዙ ችግሮችን መለየት እና የመፍታት ሥራን መስራት","weight":3},{"code":"3.5","description":"ዳታቤዝ ከሌሎች ስስተሞች እና አፕሊኬሽኖች ጋር በትክክል እንዲቀናጁ ማድረግ፤","weight":3},{"code":"3.6","description":"የዳታ ዋስትና (Data Integrity)፣ ደህንነት (Security) እና የዳታ ስርዓት ተከታታይነት (Consistency) ማረጋገጥ፤","weight":3},{"code":"3.7","description":"የዳታቤዝ ስርዓቶችን (MySQL, Oracle, SQL Server, PostgreSQL, MongoDB, ወዘተ) መጫን፣ ማዋቀር፣ እና እንዲዘምን ማድረግ፤","weight":2}]},{"no":4,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት ውጤታማ ማድረግ 20%","weight":20,"tasks":[{"code":"4.1","description":"በዋናው መስሪያ ቤት፣ በቅርንጫፎችና በCloud የሚገኙ ዳታቤዞች በትክክል መስራታቸውን መከታተልና የቴክኒክ ድጋፍ መስጠት፤","weight":2},{"code":"4.2","description":"የዳታቤዝ መረጃዎች ቅጅ (Backup) ሚስጢራዊነታቸውን ጠብቆ እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) ማረጋገጥና መያዝ፤","weight":2},{"code":"4.3","description":"ማንኛውንም የአፕሊኬሽን ዳታቤዝ ሳይቋረጥ አገልግሎት እንዲሰጥ (High availability and Fault tolerance) በአሰራር መሰረት ተግባራዊ ማድረግ፤ ሂደቱንም መከታተል፤","weight":2},{"code":"4.4","description":"በአደጋ ጊዜ መጠበቂያ ዳታሴንተር (Disaster Recovery Site) የDatabase Replication መስራቱን መከታተል፤","weight":3},{"code":"4.5","description":"የዳታቤዝ የአቅም ማሻሻል (Performance tuning,monitoring)፣ መቆራረጥ እንዳይኖር መከታተልና የቴክኒክ ብልሽቶችን (Single point of failure) መከላከል፤","weight":2},{"code":"4.6","description":"በዳታ ቤዝ ሰርቨሮች፣ ስቶሬጆች፣ ቨርቹዋልላይዜሽን የአፕሬቲንግ ሲስተም ሰዓትጭሮች፣ ሳይቆራረጡ እንዲሰሩ ክትትል ማድረግ፤","weight":3},{"code":"4.7","description":"የዳታቤዝ ደህንነትን በመቆጣጠር፣ የይለፍ ቃሎች (Passwords)፣ ፈቃዶች (Permissions) እና የስምጣኔ ማረጋገጫ (Authentication) እንድቀጥሩ ማድረግ፤","weight":2},{"code":"4.8","description":"የዳታ ሞዴሊንግ(Data Modeling)፣ የዳታ መዋቅር (Schema Design) እና የዳታ ማከማቻ ስልቶችን (Storage Strategies) በማጥናት ላይ ምክር እንዲቀርብ ማድረግ፤","weight":2},{"code":"4.9","description":"የክላውድ ዳታቤዝ (Cloud Databases) እንደ AWS RDS፣ Azure SQL፣ ወይም Google Cloud SQL ተግባራዊ ያደርጋል","weight":2},{"code":"4.10","description":"የዳታቤዝ (Schemas)፣ ሰንጠረዦችን (Tables) እና ግንኙነቶችን (Relationships) መፍጠር እና ማስተዳደር፤","weight":2},{"code":"4.11","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ያከናውናል።","weight":2}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ፣ በኮምፒውተር ሳይንስ ወይም በተመሳሳይ መስክ የመጀመሪያ ዲግሪ","experience":"ቢያንስ 4 ዓመት በዳታቤዝ አስተዳደርና ኢንተግሬሽን የስራ ልምድ","certifications":["Oracle Certified Associate (OCA)","PostgreSQL Associate DBA","Microsoft Certified: Database Administrator Fundamentals"],"technicalSkills":["Oracle, PostgreSQL, MySQL Administration","ETL Tools (Talend, Apache NiFi, Python scripts)","SQL script writing, Index maintenance, View generation","Linux command line and Bash script automation"]}'::jsonb,
  '["የዕለት ተዕለት የዳታ ቅጂዎች (Backups) 100% ያለመሳካት መከናወናቸው","የዳታ ልውውጥና የኢንተግሬሽን ስራዎች መዘግየት ከ5 ደቂቃ በታች መሆኑ","የተጠቃሚዎች አክሰስና ፈቃድ ጥያቄዎችን በ2 ሰዓት ውስጥ ምላሽ መስጠት"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-database-xi',
  'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
  'Assistant Database Specialist Grade XI',
  'ደረጃ XI (Grade XI)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
  'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
  'የዳታቤዝ ባክአፖችን በየዕለቱ ማረጋገጥ፣ የዳታ ማስገባትና ማረም ስክሪፕቶችን ማሄድ፣ የዲስክ አጠቃቀምና የቴብልስፔስ ዕለታዊ ሪፖርት ማዘጋጀት።',
  '[{"id":"d1","title":"ዕለታዊ የዳታ ቅጂዎች (Backup Routine) ክትትልና ማረጋገጫ","description":"የዳታቤዝ ባክአፕ ስራዎች በሙሉ በትክክል መከናወናቸውን በየማለዳው ማረጋገጥና የመዝገብ ሰነድ መያዝ።","weightPercentage":35},{"id":"d2","title":"የመረጃ ቋት መጠይቆችና የዳታ ማረጋገጫ (Data Verification & Query Execution)","description":"ከተፈቀዱ ክፍሎች የሚመጡ የዳታ ፍተሻ መጠይቆችን በSQL ማሄድና ውጤቱን ለሚመለከተው አካል ማቅረብ።","weightPercentage":25},{"id":"d3","title":"የቴብልስፔስና የዲስክ ቦታ ክትትል (Disk Space & Tablespace Tracking)","description":"የዳታቤዝ ፋይሎች የዲስክ ሙላት ከመድረሱ በፊት ለከፍተኛ ባለሙያ ሪፖርት ማድረግ።","weightPercentage":20},{"id":"d4","title":"የዳታቤዝ ሰነዶችና የስራ መዝገቦች አያያዝ (Documentation & Audit Support)","description":"የተደረጉ ለውጦችን (Change logs) መመዝገብና የመረጃ ቋት ማኑዋሎችን ማደራጀት።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና ይሰጣል፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"2.1","description":"ስራዎችን ውጤታማ ለማድረግ የሚረዱ ዓለም አቀፍ ምርጥ ተሞክሮዎችን መቀመርና ማስፋፋት፤","weight":3},{"code":"2.2","description":"የተቋሙ ዳታቤዝ በዘመናዊ መንገድ ለማስተዳደር የሚያግዙ አዳዲስ አሰራር ስልቶችን መከታተል","weight":3},{"code":"2.3","description":"የዳታ ሴንተር ሃብቶች የአደጋ ጊዜ መውጫና የስራ ማስቀጠያ (Disaster Recovery and Business Continuity) አሰራር መዘገጀት፤ መከታተል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን የዳታቤዝ ፍላጎቶችን በጥናት መለየትና አዳዲስ አሰራሮችን መቀየስ","weight":2},{"code":"3.2","description":"ለቅርንጫፍና ለዋና መስሪያ ቤት ረዳትና ጀማሪ የዳታቤዝ ባለሙያዎች የቴክኒክ ድጋፍ መስጠት፤","weight":3},{"code":"3.3","description":"የዳታቤዝ አፈጻጸምን መከታተል፤የዳታቤዝ ውቅሮችን ማመቻቸት እና የመጠባበቂያ(backup) እና መልሶ ማግኛ(recovery) ሂደቶችን መተግበር፤መደበኛ የዳታ ቤዝ ጥገና ሥራዎችን ማከናወን፤","weight":3},{"code":"3.4","description":"ከመረጃ ቋቱ ስርዓት ጋር የተያያዙ ችግሮችን መለየት እና የመፍታት ሥራን መስራት","weight":3},{"code":"3.5","description":"ዳታቤዝ ከሌሎች ስስተሞች እና አፕሊኬሽኖች ጋር በትክክል እንዲቀናጁ ማድረግ፤","weight":3},{"code":"3.6","description":"የዳታ ዋስትና (Data Integrity)፣ ደህንነት (Security) እና የዳታ ስርዓት ተከታታይነት (Consistency) ማረጋገጥ፤","weight":3},{"code":"3.7","description":"የዳታቤዝ ስርዓቶችን (MySQL, Oracle, SQL Server, PostgreSQL, MongoDB, ወዘተ) መጫን፣ ማዋቀር፣ እና እንዲዘምን ማድረግ፤","weight":2}]},{"no":4,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት ውጤታማ ማድረግ 20%","weight":20,"tasks":[{"code":"4.1","description":"በዋናው መስሪያ ቤት፣ በቅርንጫፎችና በCloud የሚገኙ ዳታቤዞች በትክክል መስራታቸውን መከታተልና የቴክኒክ ድጋፍ መስጠት፤","weight":2},{"code":"4.2","description":"የዳታቤዝ መረጃዎች ቅጅ (Backup) ሚስጢራዊነታቸውን ጠብቆ እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) ማረጋገጥና መያዝ፤","weight":2},{"code":"4.3","description":"ማንኛውንም የአፕሊኬሽን ዳታቤዝ ሳይቋረጥ አገልግሎት እንዲሰጥ (High availability and Fault tolerance) በአሰራር መሰረት ተግባራዊ ማድረግ፤ ሂደቱንም መከታተል፤","weight":2},{"code":"4.4","description":"በአደጋ ጊዜ መጠበቂያ ዳታሴንተር (Disaster Recovery Site) የDatabase Replication መስራቱን መከታተል፤","weight":3},{"code":"4.5","description":"የዳታቤዝ የአቅም ማሻሻል (Performance tuning,monitoring)፣ መቆራረጥ እንዳይኖር መከታተልና የቴክኒክ ብልሽቶችን (Single point of failure) መከላከል፤","weight":2},{"code":"4.6","description":"በዳታ ቤዝ ሰርቨሮች፣ ስቶሬጆች፣ ቨርቹዋልላይዜሽን የአፕሬቲንግ ሲስተም ሰዓትጭሮች፣ ሳይቆራረጡ እንዲሰሩ ክትትል ማድረግ፤","weight":3},{"code":"4.7","description":"የዳታቤዝ ደህንነትን በመቆጣጠር፣ የይለፍ ቃሎች (Passwords)፣ ፈቃዶች (Permissions) እና የስምጣኔ ማረጋገጫ (Authentication) እንድቀጥሩ ማድረግ፤","weight":2},{"code":"4.8","description":"የዳታ ሞዴሊንግ(Data Modeling)፣ የዳታ መዋቅር (Schema Design) እና የዳታ ማከማቻ ስልቶችን (Storage Strategies) በማጥናት ላይ ምክር እንዲቀርብ ማድረግ፤","weight":2},{"code":"4.9","description":"የክላውድ ዳታቤዝ (Cloud Databases) እንደ AWS RDS፣ Azure SQL፣ ወይም Google Cloud SQL ተግባራዊ ያደርጋል","weight":2},{"code":"4.10","description":"የዳታቤዝ (Schemas)፣ ሰንጠረዦችን (Tables) እና ግንኙነቶችን (Relationships) መፍጠር እና ማስተዳደር፤","weight":2},{"code":"4.11","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ያከናውናል።","weight":2}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ፣ ኮምፒውተር ሳይንስ ዲፕሎማ ወይም የመጀመሪያ ዲግሪ","experience":"ቢያንስ 2 ዓመት በዳታ አስተዳደር ወይም IT ድጋፍ","certifications":["Oracle SQL Certified Associate","Microsoft SQL Fundamentals"],"technicalSkills":["Basic SQL querying","Linux file commands","Backup log inspection"]}'::jsonb,
  '["ዕለታዊ የባክአፕ ሪፖርት በየማለዳው በሰዓቱ ማቅረብ","የዳታ ጥያቄዎችን በ1 ሰዓት ውስጥ መመለስ"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-database-x',
  'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X',
  'Junior Database Specialist Grade X',
  'ደረጃ X (Grade X)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
  'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
  'የመረጃ ቋት ሁነታ ሎጎችን በየዕለቱ መመዝገብ፣ መሰረታዊ የSQL መጠይቆችን መለማመድና የዳታቤዝ ስራዎችን በክትትል ስር ማከናወን።',
  '[{"id":"d1","title":"የዳታቤዝ ሁነታ ሎጎችና ማስጠንቀቂያዎች ምዝገባ (Alert Log Checking)","description":"የዳታቤዝ Alert logs መፈተሽ፣ ያልተለመዱ መልዕክቶችን መመዝገብና ለከፍተኛ ባለሙያ ማሳወቅ።","weightPercentage":35},{"id":"d2","title":"የመሰረታዊ የዳታ ጥያቄዎች ምዝገባና ድጋፍ (User Request Logging)","description":"የተጠቃሚዎችን የይለፍ ቃል መቀየርና የመዳረሻ ጥያቄዎችን ተቀብሎ በስርዓቱ መመዝገብ።","weightPercentage":25},{"id":"d3","title":"የሙከራ ዳታቤዞች ጭነትና ልምምድ (Testing & Lab Environments)","description":"በሙከራ ሰርቨሮች ላይ ዳታቤዞችን መጫን፣ የSQL ትዕዛዞችን መለማመድና ራስን ማብቃት።","weightPercentage":20},{"id":"d4","title":"የቡድን ስራና የዕቅድ አፈጻጸም (Team Collaboration)","description":"የዕቅድ አፈጻጸም ሪፖርቶችን ማዘጋጀትና በቡድን ስራዎች በንቃት መሳተፍ።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":3},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና ይሰጣል፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"2.1","description":"ስራዎችን ውጤታማ ለማድረግ የሚረዱ ዓለም አቀፍ ምርጥ ተሞክሮዎችን መቀመርና ማስፋፋት፤","weight":3},{"code":"2.2","description":"የተቋሙ ዳታቤዝ በዘመናዊ መንገድ ለማስተዳደር የሚያግዙ አዳዲስ አሰራር ስልቶችን መከታተል","weight":3},{"code":"2.3","description":"የዳታ ሴንተር ሃብቶች የአደጋ ጊዜ መውጫና የስራ ማስቀጠያ (Disaster Recovery and Business Continuity) አሰራር መዘገጀት፤ መከታተል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን የዳታቤዝ ፍላጎቶችን በጥናት መለየትና አዳዲስ አሰራሮችን መቀየስ","weight":2},{"code":"3.2","description":"ለቅርንጫፍና ለዋና መስሪያ ቤት ረዳትና ጀማሪ የዳታቤዝ ባለሙያዎች የቴክኒክ ድጋፍ መስጠት፤","weight":3},{"code":"3.3","description":"የዳታቤዝ አፈጻጸምን መከታተል፤የዳታቤዝ ውቅሮችን ማመቻቸት እና የመጠባበቂያ(backup) እና መልሶ ማግኛ(recovery) ሂደቶችን መተግበር፤መደበኛ የዳታ ቤዝ ጥገና ሥራዎችን ማከናወን፤","weight":3},{"code":"3.4","description":"ከመረጃ ቋቱ ስርዓት ጋር የተያያዙ ችግሮችን መለየት እና የመፍታት ሥራን መስራት","weight":3},{"code":"3.5","description":"ዳታቤዝ ከሌሎች ስስተሞች እና አፕሊኬሽኖች ጋር በትክክል እንዲቀናጁ ማድረግ፤","weight":3},{"code":"3.6","description":"የዳታ ዋስትና (Data Integrity)፣ ደህንነት (Security) እና የዳታ ስርዓት ተከታታይነት (Consistency) ማረጋገጥ፤","weight":3},{"code":"3.7","description":"የዳታቤዝ ስርዓቶችን (MySQL, Oracle, SQL Server, PostgreSQL, MongoDB, ወዘተ) መጫን፣ ማዋቀር፣ እና እንዲዘምን ማድረግ፤","weight":2}]},{"no":4,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት ውጤታማ ማድረግ 20%","weight":20,"tasks":[{"code":"4.1","description":"በዋናው መስሪያ ቤት፣ በቅርንጫፎችና በCloud የሚገኙ ዳታቤዞች በትክክል መስራታቸውን መከታተልና የቴክኒክ ድጋፍ መስጠት፤","weight":2},{"code":"4.2","description":"የዳታቤዝ መረጃዎች ቅጅ (Backup) ሚስጢራዊነታቸውን ጠብቆ እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) ማረጋገጥና መያዝ፤","weight":2},{"code":"4.3","description":"ማንኛውንም የአፕሊኬሽን ዳታቤዝ ሳይቋረጥ አገልግሎት እንዲሰጥ (High availability and Fault tolerance) በአሰራር መሰረት ተግባራዊ ማድረግ፤ ሂደቱንም መከታተል፤","weight":2},{"code":"4.4","description":"በአደጋ ጊዜ መጠበቂያ ዳታሴንተር (Disaster Recovery Site) የDatabase Replication መስራቱን መከታተል፤","weight":3},{"code":"4.5","description":"የዳታቤዝ የአቅም ማሻሻል (Performance tuning,monitoring)፣ መቆራረጥ እንዳይኖር መከታተልና የቴክኒክ ብልሽቶችን (Single point of failure) መከላከል፤","weight":2},{"code":"4.6","description":"በዳታ ቤዝ ሰርቨሮች፣ ስቶሬጆች፣ ቨርቹዋልላይዜሽን የአፕሬቲንግ ሲስተም ሰዓትጭሮች፣ ሳይቆራረጡ እንዲሰሩ ክትትል ማድረግ፤","weight":3},{"code":"4.7","description":"የዳታቤዝ ደህንነትን በመቆጣጠር፣ የይለፍ ቃሎች (Passwords)፣ ፈቃዶች (Permissions) እና የስምጣኔ ማረጋገጫ (Authentication) እንድቀጥሩ ማድረግ፤","weight":2},{"code":"4.8","description":"የዳታ ሞዴሊንግ(Data Modeling)፣ የዳታ መዋቅር (Schema Design) እና የዳታ ማከማቻ ስልቶችን (Storage Strategies) በማጥናት ላይ ምክር እንዲቀርብ ማድረግ፤","weight":2},{"code":"4.9","description":"የክላውድ ዳታቤዝ (Cloud Databases) እንደ AWS RDS፣ Azure SQL፣ ወይም Google Cloud SQL ተግባራዊ ያደርጋል","weight":2},{"code":"4.10","description":"የዳታቤዝ (Schemas)፣ ሰንጠረዦችን (Tables) እና ግንኙነቶችን (Relationships) መፍጠር እና ማስተዳደር፤","weight":2},{"code":"4.11","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ያከናውናል።","weight":2}]}]'::jsonb,
  '{"education":"በኮምፒውተር ሳይንስ ወይም ኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ ወይም የኮሌጅ ዲፕሎማ","experience":"0 - 1 ዓመት የስራ ልምድ (Entry Level)","certifications":["Database Fundamentals"],"technicalSkills":["Basic SQL commands (SELECT, INSERT, UPDATE)","Basic Relational Database concepts"]}'::jsonb,
  '["የዕለታዊ ሎግ ፍተሻዎችን ያለማቋረጥ ማከናወን","የአቅም ማጎልበቻ እቅዶችን በተቀመጠላቸው የጊዜ ገደብ ማጠናቀቅ"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-system-xiii',
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'Senior System Specialist Grade XIII',
  'ደረጃ XIII (Grade XIII)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
  'የሲስተም አስተዳደር ቡድን መሪ',
  'የተቋሙን ዋና ዋና ኢንተርፕራይዝ ሰርቨሮች (Blade/Rack Servers), ቨርቹዋል ፕላትፎርሞች (VMware vSphere/vCenter), የዳታ ሴንተር ስቶሬጅ (SAN/NAS All-Flash Arrays), Active Directory/Identity Management, Cloud/Hybrid መሰረተ ልማት እና የአደጋ ጊዜ ማገገሚያ (Disaster Recovery Center) በከፍተኛ ጥራትና አስተማማኝነት መምራት።',
  '[{"id":"d1","title":"የኢንተርፕራይዝ ሰርቨሮችና ቨርቹዋል ፕላትፎርሞች አርክቴክቸርና አስተዳደር (Enterprise Server & Virtualization)","description":"VMware ESXi ክላስተሮች፣ vCenter፣ DRS፣ High Availability እና Linux/Windows ኢንተርፕራይዝ ኦፕሬቲንግ ሲስተሞችን ማዋቀር፣ ማስተዳደርና ተደራሽነታቸውን ማረጋገጥ።","weightPercentage":30},{"id":"d2","title":"የዳታ ሴንተር ስቶሬጅ (SAN/NAS/Storage Arrays) እና አቅም ማቀድ (Capacity Planning)","description":"የDell EMC/HPE ስቶሬጅ አሬይ፣ Fiber Channel ዞኒንግ፣ LUN/vSAN ፕሮቪዥኒንግ እና የሃብት ፍላጎት ትንበያ ማካሄድ።","weightPercentage":25},{"id":"d3","title":"የሲስተም አደጋ ማገገሚያ (Disaster Recovery & Business Continuity) እና የባክአፕ ቁጥጥር","description":"Veeam Backup & Replication በመጠቀም የቨርቹዋል ማሽኖችን ሙሉ ቅጂ ማከናወን፣ ወደ አደጋ ማገገሚያ ማዕከል (DR Site) ማዛወርና ማረጋገጥ።","weightPercentage":25},{"id":"d4","title":"የኢንተርፕራይዝ መለያ (Active Directory, IAM, SSO) እና የደህንነት ፓቾች አስተዳደር (Patch Management)","description":"Active Directory ዶሜይን፣ የቡድን ፖሊሲዎች (GPO)፣ DNS/DHCP እና ወርሃዊ የኦፕሬቲንግ ሲስተም የደህንነት ፓቾችን በሁሉም ሰርቨሮች ላይ መተግበር።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":4},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት አገልግሎት ተደራሽነትና ውጤታማነትን ማረጋገጥ፤ 20%","weight":20,"tasks":[{"code":"2.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበር አስተዳደሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖች የሚገኘው ሲስተም በትክክል እየሰራ መሆናቸው መከታተል፤","weight":2},{"code":"2.2","description":"የሲስተም ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ አግባብ መያዛቸው እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) እንዲመለሱ ማድረግ፤","weight":2},{"code":"2.3","description":"የሲስተም ሁነታ መመዝገቢያ ሎጎችን (system logs) በሁሉም የመረጃ መያዣ ሳጥኖች (Storages)፣ ሰርቨሮች፣ ማዕከላዊ የሀይል መቆጣጠሪያዎች (Central UPS) እና የአየር ማቀዝቀዣዎች እቃዎች እንዲወሰድ ማድረግ፤","weight":2},{"code":"2.4","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖች፣ በCloud አገልግሎት ላይ የሚገኘውን ማንኛውንም የአፕሊኬሽን ሲስተም ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) እንዲሰጥ ማድረግ፤","weight":2},{"code":"2.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ሁሉም የአፕሊኬሽን ሲስተም Disaster Recovery Site እንዲኖር ማድረግ፤","weight":2},{"code":"2.6","description":"የሲስተም ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":2},{"code":"2.7","description":"የሲስተም አቅም ማሻሻል (Performance tuning) ስራዎችን መስራት፤","weight":2},{"code":"2.8","description":"የሲስተም አስተዳደር ስልጠና ፕሮግራሞችን ማዘጋጀት እና ከስሩ ላሉት መካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":2},{"code":"2.9","description":"የሲስተም ዝርዝር የስራ ሰነዶች (Documentation) ማዘጋጀትና መከታተል፤","weight":2},{"code":"2.10","description":"የሲስተም የደህንነት ፖሊሲዎችን መተግበር፣ የደህንነት ስጋቶችን መከታተል እና መከላከል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን አገልግሎት አሰጣጥ ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የሲስተም ፍላጎቶችን በጥናት መለየት፤","weight":3},{"code":"3.2","description":"የተቋሙ ሲስተም ስርአት በሁሉም የተቋሙ አገልግሎት መስጫዎች ቦታዎች ተደራሽ እንዲሆን ጥናት ማድረግ፤","weight":3},{"code":"3.3","description":"የተቋሙን የሲስተም መሰረተ ልማት የአገልግሎቶች ስፋት፣ የመረጃ እድገትና ተደራሽነት ታሳቢ ያደረገ ጥናት ማድረግ፤","weight":3},{"code":"3.4","description":"የተቋሙ አገልግሎት ለማቀላጠፍ በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም ለሚሰሩ የሲስተም ስራዎች ቴክኖሎጂ እቃዎች የግዥ ስፔስፊኬሽን ስንድ በጥናት ማዘጋጀት፤","weight":4},{"code":"3.5","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የሲስተም ቴክኖሎጂዎች ጥራት በሙከራ ጥናት እንዲረጋገጥ ማድረግ፤","weight":3},{"code":"3.6","description":"በስራ ላይ የሚገኙ የServer, Storage የሲስተም፣ ቨርቹዋልላይዜሽን እና ኦፕሬቲንግ ሲስተሞች የማሻሻል ስራዎች ከተሰሩ በኋላም ይሁን በፊት የTesting Environment በመፍጠር የሙከራ ጥናት ፍተሻ ማድረግ፤","weight":4}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":4},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ የሲስተም አስተዳደር ስርዓት ይዘረጋል፤ ውጤታማነቱን በመገምገም ማሻሻያዎችን ማድረግ፤","weight":3},{"code":"4.3","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ማከናወን።","weight":3}]}]'::jsonb,
  '{"education":"በኮምፒውተር ምህንድስና፣ ኢንፎርሜሽን ቴክኖሎጂ ወይም ተዛማጅ መስክ የመጀመሪያ ወይም ሁለተኛ ዲግሪ","experience":"ቢያንስ 6 ዓመት በኢንተርፕራይዝ ሲስተምስ እና ዳታ ሴንተር አስተዳደር የስራ ልምድ","certifications":["VMware Certified Professional (VCP-DCV)","Red Hat Certified Engineer (RHCE)","Microsoft Certified: Windows Server / Azure Administrator Associate","CompTIA Server+"],"technicalSkills":["VMware vSphere 7/8, ESXi, vCenter, vSAN, High Availability (HA), DRS","Linux Enterprise Administration (RHEL, Ubuntu Server, Rocky Linux)","Windows Server 2019/2022, Active Directory Domain Services, GPO, DNS, DHCP","SAN/NAS Storage Arrays (Dell EMC PowerStore, HPE Nimble, NetApp)","Veeam Backup & Replication Enterprise, Instant VM Recovery","Ansible, PowerShell, and Bash Infrastructure Automation"]}'::jsonb,
  '["የሰርቨሮችና ቨርቹዋል ማሽኖች አገልግሎት መስጠት ምጣኔ (Server Availability >= 99.9%)","የሲስተም የደህንነት ፓቾችና ዝመናዎች በየወሩ 100% መተግበራቸው (Patch Compliance Rate 100%)","የአደጋ ጊዜ ማገገሚያ (RTO < 2 hours, RPO < 30 minutes) መሳካት","የስቶሬጅ እና የሲስተም አቅም ማነስ ችግር 0% መሆኑ (Zero Unplanned Downtime due to Storage)"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-system-xii',
  'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
  'Intermediate System Specialist Grade XII',
  'ደረጃ XII (Grade XII)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'የተቋሙን ሰርቨሮች ዕለታዊ ጤንነት መከታተል፣ አዳዲስ ቨርቹዋል ማሽኖችን ማዘጋጀት፣ የሶፍትዌር ጭነቶችን ማከናወን፣ የሃርድዌር ጤንነት መከታተል እና የመረጃ ቅጂዎችን በየቀኑ ማረጋገጥ።',
  '[{"id":"d1","title":"ዕለታዊ የሰርቨሮችና የቨርቹዋል ማሽኖች ክትትልና ጥገና (Server Administration & Maintenance)","description":"የሰርቨር ሲፒዩ፣ ራም እና የዲስክ ሀብቶች አጠቃቀምን መከታተል፣ የአፈጻጸም ማነቆዎችን መፍታት።","weightPercentage":30},{"id":"d2","title":"የሶፍትዌርና ኦፕሬቲንግ ሲስተም ጭነቶች፣ ዝመናና ፓቺንግ (OS & Software Provisioning)","description":"አዳዲስ የቨርቹዋል ማሽኖችን ማዘጋጀት፣ ኦፕሬቲንግ ሲስተሞችን መጫንና ወርሃዊ የደህንነት ፓቾችን መተግበር።","weightPercentage":25},{"id":"d3","title":"የመረጃ ቅጂ (Backup Execution) እና የማረጋገጫ ስራዎች","description":"የዕለት ተዕለት የባክአፕ ስራዎች በሙሉ መከናወናቸውን መከታተልና የስህተት መልዕክቶችን በፍጥነት ማስተካከል።","weightPercentage":25},{"id":"d4","title":"የዳታ ሴንተር አካላዊ ቁጥጥርና የሃርድዌር ክትትል (Physical Data Center Operations)","description":"የሰርቨር ራክ፣ ኬብሊንግ፣ የሃይልና የኤሲ ጤንነት መከታተልና የሃርድዌር ብልሽቶችን ለጥገና ሪፖርት ማድረግ።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":4},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት አገልግሎት ተደራሽነትና ውጤታማነትን ማረጋገጥ፤ 20%","weight":20,"tasks":[{"code":"2.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበር አስተዳደሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖች የሚገኘው ሲስተም በትክክል እየሰራ መሆናቸው መከታተል፤","weight":2},{"code":"2.2","description":"የሲስተም ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ አግባብ መያዛቸው እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) እንዲመለሱ ማድረግ፤","weight":2},{"code":"2.3","description":"የሲስተም ሁነታ መመዝገቢያ ሎጎችን (system logs) በሁሉም የመረጃ መያዣ ሳጥኖች (Storages)፣ ሰርቨሮች፣ ማዕከላዊ የሀይል መቆጣጠሪያዎች (Central UPS) እና የአየር ማቀዝቀዣዎች እቃዎች እንዲወሰድ ማድረግ፤","weight":2},{"code":"2.4","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖች፣ በCloud አገልግሎት ላይ የሚገኘውን ማንኛውንም የአፕሊኬሽን ሲስተም ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) እንዲሰጥ ማድረግ፤","weight":2},{"code":"2.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ሁሉም የአፕሊኬሽን ሲስተም Disaster Recovery Site እንዲኖር ማድረግ፤","weight":2},{"code":"2.6","description":"የሲስተም ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":2},{"code":"2.7","description":"የሲስተም አቅም ማሻሻል (Performance tuning) ስራዎችን መስራት፤","weight":2},{"code":"2.8","description":"የሲስተም አስተዳደር ስልጠና ፕሮግራሞችን ማዘጋጀት እና ከስሩ ላሉት መካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":2},{"code":"2.9","description":"የሲስተም ዝርዝር የስራ ሰነዶች (Documentation) ማዘጋጀትና መከታተል፤","weight":2},{"code":"2.10","description":"የሲስተም የደህንነት ፖሊሲዎችን መተግበር፣ የደህንነት ስጋቶችን መከታተል እና መከላከል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን አገልግሎት አሰጣጥ ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የሲስተም ፍላጎቶችን በጥናት መለየት፤","weight":3},{"code":"3.2","description":"የተቋሙ ሲስተም ስርአት በሁሉም የተቋሙ አገልግሎት መስጫዎች ቦታዎች ተደራሽ እንዲሆን ጥናት ማድረግ፤","weight":3},{"code":"3.3","description":"የተቋሙን የሲስተም መሰረተ ልማት የአገልግሎቶች ስፋት፣ የመረጃ እድገትና ተደራሽነት ታሳቢ ያደረገ ጥናት ማድረግ፤","weight":3},{"code":"3.4","description":"የተቋሙ አገልግሎት ለማቀላጠፍ በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም ለሚሰሩ የሲስተም ስራዎች ቴክኖሎጂ እቃዎች የግዥ ስፔስፊኬሽን ስንድ በጥናት ማዘጋጀት፤","weight":4},{"code":"3.5","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የሲስተም ቴክኖሎጂዎች ጥራት በሙከራ ጥናት እንዲረጋገጥ ማድረግ፤","weight":3},{"code":"3.6","description":"በስራ ላይ የሚገኙ የServer, Storage የሲስተም፣ ቨርቹዋልላይዜሽን እና ኦፕሬቲንግ ሲስተሞች የማሻሻል ስራዎች ከተሰሩ በኋላም ይሁን በፊት የTesting Environment በመፍጠር የሙከራ ጥናት ፍተሻ ማድረግ፤","weight":4}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":4},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ የሲስተም አስተዳደር ስርዓት ይዘረጋል፤ ውጤታማነቱን በመገምገም ማሻሻያዎችን ማድረግ፤","weight":3},{"code":"4.3","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ማከናወን።","weight":3}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ ወይም በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ","experience":"ቢያንስ 4 ዓመት በሰርቨር እና ሲስተም አስተዳደር የስራ ልምድ","certifications":["Red Hat Certified System Administrator (RHCSA)","VMware Certified Associate (VCA)","Microsoft Certified: Windows Server Fundamentals"],"technicalSkills":["Linux and Windows Server Administration","VMware ESXi and Virtual Machine lifecycle management","Backup software operations (Veeam, Windows Server Backup)","Hardware diagnostic tools and server racking/cabling"]}'::jsonb,
  '["የሰርቨር ብልሽት ጥያቄዎችን በ1 ሰዓት ውስጥ ምላሽ መስጠት","ዕለታዊ የባክአፕ ስራዎችን በ100% ስኬት ማጠናቀቅ","የዳታ ሴንተር የአካባቢ ቁጥጥር (ሙቀት፣ ሃይል) በየቀኑ መመዝገቡ"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-system-xi',
  'ረዳት የሲስተም ባለሙያ ደረጃ XI',
  'Assistant System Specialist Grade XI',
  'ደረጃ XI (Grade XI)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
  'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
  'የሰርቨሮች ኦፕሬቲንግ ሲስተም ጭነቶችን ማከናወን፣ የተጠቃሚዎች መለያ (Active Directory Users) መክፈትና ማስተዳደር፣ የዳታ ሴንተር አካባቢ ቁጥጥር መመዝገብ።',
  '[{"id":"d1","title":"የሰርቨር ኦፕሬቲንግ ሲስተሞች ጭነትና ዝግጅት (OS Installation & Setup)","description":"Windows Server እና Linux OS በሰርቨሮችና በቨርቹዋል ማሽኖች ላይ መጫንና መሰረታዊ ውቅሮችን ማከናወን።","weightPercentage":30},{"id":"d2","title":"የተጠቃሚዎች አካውንትና ፈቃዶች አያያዝ (User Accounts & Permissions)","description":"በActive Directory ውስጥ አዳዲስ ሰራተኞችን መመዝገብ፣ የይለፍ ቃል መቀየር እና የፋይል ሼሪንግ ፈቃዶችን ማስተናገድ።","weightPercentage":30},{"id":"d3","title":"የዳታ ሴንተር አካላዊ ፍተሻ (Data Center Environment Monitoring)","description":"የዳታ ሴንተር የሙቀት መጠን፣ የUPS ሃይል እና የኤርኮንዲሽነሮችን በየቀኑ መፈተሽና በሎግ ቡክ መመዝገብ።","weightPercentage":20},{"id":"d4","title":"የሃርድዌር አካላት ጥገናና ምትክ (Hardware Maintenance Assistance)","description":"የሰርቨር ዲስኮች (Hot-swap disks)፣ የሃይል አቅርቦቶች (PSU) ብልሽት ሲያጋጥም በክትትል ስር መቀየር።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":4},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት አገልግሎት ተደራሽነትና ውጤታማነትን ማረጋገጥ፤ 20%","weight":20,"tasks":[{"code":"2.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበር አስተዳደሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖች የሚገኘው ሲስተም በትክክል እየሰራ መሆናቸው መከታተል፤","weight":2},{"code":"2.2","description":"የሲስተም ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ አግባብ መያዛቸው እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) እንዲመለሱ ማድረግ፤","weight":2},{"code":"2.3","description":"የሲስተም ሁነታ መመዝገቢያ ሎጎችን (system logs) በሁሉም የመረጃ መያዣ ሳጥኖች (Storages)፣ ሰርቨሮች፣ ማዕከላዊ የሀይል መቆጣጠሪያዎች (Central UPS) እና የአየር ማቀዝቀዣዎች እቃዎች እንዲወሰድ ማድረግ፤","weight":2},{"code":"2.4","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖች፣ በCloud አገልግሎት ላይ የሚገኘውን ማንኛውንም የአፕሊኬሽን ሲስተም ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) እንዲሰጥ ማድረግ፤","weight":2},{"code":"2.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ሁሉም የአፕሊኬሽን ሲስተም Disaster Recovery Site እንዲኖር ማድረግ፤","weight":2},{"code":"2.6","description":"የሲስተም ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":2},{"code":"2.7","description":"የሲስተም አቅም ማሻሻል (Performance tuning) ስራዎችን መስራት፤","weight":2},{"code":"2.8","description":"የሲስተም አስተዳደር ስልጠና ፕሮግራሞችን ማዘጋጀት እና ከስሩ ላሉት መካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":2},{"code":"2.9","description":"የሲስተም ዝርዝር የስራ ሰነዶች (Documentation) ማዘጋጀትና መከታተል፤","weight":2},{"code":"2.10","description":"የሲስተም የደህንነት ፖሊሲዎችን መተግበር፣ የደህንነት ስጋቶችን መከታተል እና መከላከል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን አገልግሎት አሰጣጥ ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የሲስተም ፍላጎቶችን በጥናት መለየት፤","weight":3},{"code":"3.2","description":"የተቋሙ ሲስተም ስርአት በሁሉም የተቋሙ አገልግሎት መስጫዎች ቦታዎች ተደራሽ እንዲሆን ጥናት ማድረግ፤","weight":3},{"code":"3.3","description":"የተቋሙን የሲስተም መሰረተ ልማት የአገልግሎቶች ስፋት፣ የመረጃ እድገትና ተደራሽነት ታሳቢ ያደረገ ጥናት ማድረግ፤","weight":3},{"code":"3.4","description":"የተቋሙ አገልግሎት ለማቀላጠፍ በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም ለሚሰሩ የሲስተም ስራዎች ቴክኖሎጂ እቃዎች የግዥ ስፔስፊኬሽን ስንድ በጥናት ማዘጋጀት፤","weight":4},{"code":"3.5","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የሲስተም ቴክኖሎጂዎች ጥራት በሙከራ ጥናት እንዲረጋገጥ ማድረግ፤","weight":3},{"code":"3.6","description":"በስራ ላይ የሚገኙ የServer, Storage የሲስተም፣ ቨርቹዋልላይዜሽን እና ኦፕሬቲንግ ሲስተሞች የማሻሻል ስራዎች ከተሰሩ በኋላም ይሁን በፊት የTesting Environment በመፍጠር የሙከራ ጥናት ፍተሻ ማድረግ፤","weight":4}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":4},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ የሲስተም አስተዳደር ስርዓት ይዘረጋል፤ ውጤታማነቱን በመገምገም ማሻሻያዎችን ማድረግ፤","weight":3},{"code":"4.3","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ማከናወን።","weight":3}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ ወይም ኮምፒውተር ሳይንስ ዲፕሎማ ወይም የመጀመሪያ ዲግሪ","experience":"ቢያንስ 2 ዓመት በሲስተም ድጋፍና ሰርቨር አያያዝ","certifications":["CompTIA Server+","Microsoft Windows Server Fundamentals"],"technicalSkills":["Active Directory user management","Windows Server & Linux basics","Hardware maintenance"]}'::jsonb,
  '["የተጠቃሚ አካውንት ጥያቄዎችን በ30 ደቂቃ ውስጥ ማጠናቀቅ","የዳታ ሴንተር አካባቢ ቁጥጥር ሎግ በየቀኑ መያዙ"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

INSERT INTO job_descriptions (
  id, title, title_en, level, department, reports_to, job_objective,
  duties, evaluation_table, requirements, key_performance_indicators, is_custom
) VALUES (
  'jd-system-x',
  'ጀማሪ የሲስተም ባለሙያ ደረጃ X',
  'Junior System Specialist Grade X',
  'ደረጃ X (Grade X)',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
  'ረዳት የሲስተም ባለሙያ ደረጃ XI',
  'ዕለታዊ የሰርቨር ሎጎችን መፈተሽ፣ የመሰረታዊ ሲስተም ችግሮችን መመዝገብና መፍታት፣ የሶፍትዌር ጭነቶችን በክትትል ስር ማከናወን።',
  '[{"id":"d1","title":"የሲስተም ሎጎችና የሁኔታዎች ምዝገባ (System Log Auditing)","description":"የሰርቨሮች Event Viewer እና System Logs መፈተሽ፣ ያልተለመዱ ስህተቶችን መመዝገብና ለቡድኑ ማሳወቅ።","weightPercentage":35},{"id":"d2","title":"የመሰረታዊ የሶፍትዌር ጭነቶችና ዝመናዎች (Basic Software Deployment)","description":"አስፈላጊ የመተግበሪያ ሶፍትዌሮችን መጫን፣ አንቲቫይረስ ዝመናዎችን መፈተሽ።","weightPercentage":25},{"id":"d3","title":"የሲስተም መሳሪያዎች ኢንቬንተሪ ዝግጅት (System Asset Tracking)","description":"የሰርቨሮች፣ ስቶሬጆችና ተዛማጅ እቃዎች የመለያ ቁጥሮችና የቦታ መረጃዎችን ማደራጀት።","weightPercentage":20},{"id":"d4","title":"የቴክኒክ ክህሎት ማሳደግ (Professional Growth)","description":"በቨርቹዋልላይዜሽንና በክላውድ ቴክኖሎጂዎች ዙሪያ የሚሰጡ ስልጠናዎችን መከታተልና መተግበር።","weightPercentage":20}]'::jsonb,
  '[{"no":1,"expectedResult":"የራስን እቅድ ማቀድና መፈፀም፤ 10%","weight":10,"tasks":[{"code":"1.1","description":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","weight":4},{"code":"1.2","description":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","weight":3},{"code":"1.3","description":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","weight":3}]},{"no":2,"expectedResult":"የተቋሙ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት አገልግሎት ተደራሽነትና ውጤታማነትን ማረጋገጥ፤ 20%","weight":20,"tasks":[{"code":"2.1","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበር አስተዳደሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖች የሚገኘው ሲስተም በትክክል እየሰራ መሆናቸው መከታተል፤","weight":2},{"code":"2.2","description":"የሲስተም ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ አግባብ መያዛቸው እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) እንዲመለሱ ማድረግ፤","weight":2},{"code":"2.3","description":"የሲስተም ሁነታ መመዝገቢያ ሎጎችን (system logs) በሁሉም የመረጃ መያዣ ሳጥኖች (Storages)፣ ሰርቨሮች፣ ማዕከላዊ የሀይል መቆጣጠሪያዎች (Central UPS) እና የአየር ማቀዝቀዣዎች እቃዎች እንዲወሰድ ማድረግ፤","weight":2},{"code":"2.4","description":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖች፣ በCloud አገልግሎት ላይ የሚገኘውን ማንኛውንም የአፕሊኬሽን ሲስተም ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) እንዲሰጥ ማድረግ፤","weight":2},{"code":"2.5","description":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ሁሉም የአፕሊኬሽን ሲስተም Disaster Recovery Site እንዲኖር ማድረግ፤","weight":2},{"code":"2.6","description":"የሲስተም ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","weight":2},{"code":"2.7","description":"የሲስተም አቅም ማሻሻል (Performance tuning) ስራዎችን መስራት፤","weight":2},{"code":"2.8","description":"የሲስተም አስተዳደር ስልጠና ፕሮግራሞችን ማዘጋጀት እና ከስሩ ላሉት መካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","weight":2},{"code":"2.9","description":"የሲስተም ዝርዝር የስራ ሰነዶች (Documentation) ማዘጋጀትና መከታተል፤","weight":2},{"code":"2.10","description":"የሲስተም የደህንነት ፖሊሲዎችን መተግበር፣ የደህንነት ስጋቶችን መከታተል እና መከላከል፤","weight":2}]},{"no":3,"expectedResult":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%","weight":20,"tasks":[{"code":"3.1","description":"የተቋሙን አገልግሎት አሰጣጥ ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የሲስተም ፍላጎቶችን በጥናት መለየት፤","weight":3},{"code":"3.2","description":"የተቋሙ ሲስተም ስርአት በሁሉም የተቋሙ አገልግሎት መስጫዎች ቦታዎች ተደራሽ እንዲሆን ጥናት ማድረግ፤","weight":3},{"code":"3.3","description":"የተቋሙን የሲስተም መሰረተ ልማት የአገልግሎቶች ስፋት፣ የመረጃ እድገትና ተደራሽነት ታሳቢ ያደረገ ጥናት ማድረግ፤","weight":3},{"code":"3.4","description":"የተቋሙ አገልግሎት ለማቀላጠፍ በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም ለሚሰሩ የሲስተም ስራዎች ቴክኖሎጂ እቃዎች የግዥ ስፔስፊኬሽን ስንድ በጥናት ማዘጋጀት፤","weight":4},{"code":"3.5","description":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የሲስተም ቴክኖሎጂዎች ጥራት በሙከራ ጥናት እንዲረጋገጥ ማድረግ፤","weight":3},{"code":"3.6","description":"በስራ ላይ የሚገኙ የServer, Storage የሲስተም፣ ቨርቹዋልላይዜሽን እና ኦፕሬቲንግ ሲስተሞች የማሻሻል ስራዎች ከተሰሩ በኋላም ይሁን በፊት የTesting Environment በመፍጠር የሙከራ ጥናት ፍተሻ ማድረግ፤","weight":4}]},{"no":4,"expectedResult":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%","weight":10,"tasks":[{"code":"4.1","description":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","weight":4},{"code":"4.2","description":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ የሲስተም አስተዳደር ስርዓት ይዘረጋል፤ ውጤታማነቱን በመገምገም ማሻሻያዎችን ማድረግ፤","weight":3},{"code":"4.3","description":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ማከናወን።","weight":3}]}]'::jsonb,
  '{"education":"በኢንፎርሜሽን ቴክኖሎጂ ወይም ኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ ወይም ዲፕሎማ","experience":"0 - 1 ዓመት የስራ ልምድ (Entry Level)","certifications":["CompTIA A+ / IT Fundamentals"],"technicalSkills":["Operating systems installation","Basic server knowledge","Troubleshooting methodology"]}'::jsonb,
  '["የዕለታዊ የስራ ሎጎች በትክክል መመዝገባቸው","የተሰጡ የሙያ ማጎልበቻ ተግባራት በወቅቱ መከናወናቸው"]'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  job_objective = EXCLUDED.job_objective,
  duties = EXCLUDED.duties,
  evaluation_table = EXCLUDED.evaluation_table,
  requirements = EXCLUDED.requirements,
  key_performance_indicators = EXCLUDED.key_performance_indicators;

-- =============================================================================
-- 4. TABLE: employees (12 Civil Service Staff Records)
-- =============================================================================
INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-net-001',
  'ICS-NET-0842',
  'ሊዲያ ግሩም ገብረስላሴ',
  'Lydia Girum Gebresilassie',
  'ሴት',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'Senior Network Specialist Grade XIII',
  'ደረጃ XIII (Grade XIII)',
  'ቋሚ',
  '2019-10-12',
  '+251 91 123 4567',
  'lydia.girum@ics.gov.et',
  'ዋናው ህንፃ ቢሮ ቁጥር 304',
  'active',
  'በኮምፒውተር ምህንድስና የማስተርስ ዲግሪ (MSc)',
  'MSc in Computer Engineering',
  '["CCNP Enterprise (Cisco)","Fortinet NSE 4 / NSE 7","ITIL v4"]'::jsonb,
  'ምንዳዬ ሀይሌ (ዳይሬክተር)',
  '["Cisco Nexus Routing/Switching","FortiGate HA Firewalls","SD-WAN","BGP/OSPF Architecture","Wireshark Diagnostics"]'::jsonb,
  'የዋናው መስሪያ ቤት እና የቅርንጫፍ ጽ/ቤቶች SD-WAN እና VPN ማስተሳሰሪያ ፕሮጀክት አስተባባሪ።',
  'jd-network-xiii'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-net-002',
  'ICS-NET-0931',
  'ካሌብ ተስፋዬ ተክሌ',
  'Kaleb Tesfaye Tekle',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
  'Intermediate Network Specialist Grade XII',
  'ደረጃ XII (Grade XII)',
  'ቋሚ',
  '2021-04-15',
  '+251 91 234 8899',
  'kaleb.tesfaye@ics.gov.et',
  'ዋናው ህንፃ ቢሮ ቁጥር 305 (NOC)',
  'active',
  'በኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ (BSc IT)',
  'BSc in Information Technology',
  '["Cisco CCNA","Fortinet NSE 4","CompTIA Network+"]'::jsonb,
  'ሊዲያ ግሩም (ከፍተኛ ባለሙያ ደረጃ XIII)',
  '["NOC Monitoring (PRTG/Zabbix)","VLAN Segmentation","FortiGate Policy Admin","Branch VPN Troubleshooting"]'::jsonb,
  'የNOC ክፍል 24/7 የትራፊክ ክትትልና የቅርንጫፎች የቴክኒክ ድጋፍ አስተባባሪ።',
  'jd-network-xii'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-net-003',
  'ICS-NET-1032',
  'ሰለሞን ከበደ ሀብቴ',
  'Solomon Kebede Habte',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
  'Assistant Network Specialist Grade XI',
  'ደረጃ XI (Grade XI)',
  'ቋሚ',
  '2022-11-15',
  '+251 91 567 8901',
  'solomon.kebede@ics.gov.et',
  'ዋናው ህንፃ ምድር ቤት ዎርክሾፕ ቁጥር 012',
  'active',
  'በኢንፎርሜሽን ሲስተምስ ዲፕሎማ/BSc',
  'BSc in Information Systems',
  '["CompTIA Network+","Fluke Networks Certified Cabling Test Technician"]'::jsonb,
  'ካሌብ ተስፋዬ (መካከለኛ ባለሙያ ደረጃ XII)',
  '["Structured Cabling (Cat6/Fiber)","Patch Panel Termination","Access Switches Patching","Wi-Fi AP Deployment"]'::jsonb,
  'የተቋሙ አዳዲስ ቢሮዎች ኔትወርክ ዝርጋታ እና የኬብል ጥገና ሃላፊ።',
  'jd-network-xi'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-net-004',
  'ICS-NET-1205',
  'ኤልያስ ግርማ ወልዴ',
  'Elias Girma Wolde',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ጀማሪ የኔትዎርክ ባለሙያ ደረጃ X',
  'Junior Network Specialist Grade X',
  'ደረጃ X (Grade X)',
  'ቋሚ',
  '2024-01-10',
  '+251 92 111 2233',
  'elias.girma@ics.gov.et',
  'ዋናው ህንፃ ቢሮ ቁጥር 305',
  'active',
  'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc)',
  'BSc in Computer Science',
  '["CompTIA IT Fundamentals"]'::jsonb,
  'ሰለሞን ከበደ (ረዳት ባለሙያ ደረጃ XI)',
  '["Network Helpdesk Ticketing","RJ45 Crimping & Testing","IP Settings Configuration","Asset Documentation"]'::jsonb,
  'የኔትወርክ እገዛ ጥሪዎች ምዝገባ እና የመሰረታዊ ኬብሊንግ ድጋፍ።',
  'jd-network-x'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-db-001',
  'ICS-DB-0654',
  'ዳዊት አበራ ወርቁ',
  'Dawit Abera Worku',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'Senior Database Specialist Grade XIII',
  'ደረጃ XIII (Grade XIII)',
  'ቋሚ',
  '2017-09-04',
  '+251 91 456 7890',
  'dawit.abera@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 105',
  'active',
  'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc Computer Science)',
  'BSc in Computer Science',
  '["Oracle Certified Professional (OCP)","PostgreSQL Certified Architect","AWS Certified Database"]'::jsonb,
  'ምንዳዬ ሀይሌ (ዳይሬክተር)',
  '["Oracle 19c RAC Cluster","PostgreSQL Patroni High Availability","SQL/PL-SQL Query Tuning","Transparent Data Encryption (TDE)","RMAN Backup & DR"]'::jsonb,
  'የዜግነት መረጃ ቋት እና የኢ-ቪዛ ሲስተም ዳታቤዞች ዋና መሪና አርክቴክት።',
  'jd-database-xiii'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-db-002',
  'ICS-DB-0892',
  'ብርሃኑ አለማየሁ ገብሬ',
  'Birhanu Alemayehu Gebre',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
  'Intermediate Database Specialist Grade XII',
  'ደረጃ XII (Grade XII)',
  'ቋሚ',
  '2020-08-20',
  '+251 91 345 1122',
  'birhanu.alemayehu@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 105',
  'active',
  'በኢንፎርሜሽን ሲስተምስ የመጀመሪያ ዲግሪ (BSc IS)',
  'BSc in Information Systems',
  '["Oracle Certified Associate (OCA)","PostgreSQL Associate DBA"]'::jsonb,
  'ዳዊት አበራ (ከፍተኛ ባለሙያ ደረጃ XIII)',
  '["ETL Data Pipelines","Data Integration (REST/Kafka)","Database Performance Monitoring","Index Maintenance","Archive Management"]'::jsonb,
  'የዜግነት እና የውጭ ጉዳይ ሚኒስቴር የዳታ ልውውጥ መስመሮች አስተባባሪ።',
  'jd-database-xii'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-db-003',
  'ICS-DB-1044',
  'ራሄል ገብረእግዚአብሔር ካሳ',
  'Rahel Gebreigziabher Kassa',
  'ሴት',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
  'Assistant Database Specialist Grade XI',
  'ደረጃ XI (Grade XI)',
  'ቋሚ',
  '2022-07-01',
  '+251 91 789 6543',
  'rahel.gebre@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 105',
  'active',
  'በኢንፎርሜሽን ቴክኖሎጂ ዲፕሎማ/BSc',
  'BSc in Information Technology',
  '["Oracle SQL Certified Associate"]'::jsonb,
  'ብርሃኑ አለማየሁ (መካከለኛ ባለሙያ ደረጃ XII)',
  '["Daily Backup Verification","SQL Query Execution","Tablespace Tracking","Data Audit Logging"]'::jsonb,
  'ዕለታዊ የዳታቤዝ ባክአፖች ትክክለኛነት ማረጋገጫና የመዝገብ አያያዝ።',
  'jd-database-xi'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-db-004',
  'ICS-DB-1219',
  'ናሆም ታደለ ባልቻ',
  'Nahom Tadele Balcha',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X',
  'Junior Database Specialist Grade X',
  'ደረጃ X (Grade X)',
  'ቋሚ',
  '2024-02-15',
  '+251 93 456 7890',
  'nahom.tadele@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 105',
  'active',
  'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc)',
  'BSc in Computer Science',
  '["Database Fundamentals Certificate"]'::jsonb,
  'ራሄል ገብረእግዚአብሔር (ረዳት ባለሙያ ደረጃ XI)',
  '["Basic SQL Queries","Alert Log Review","User Access Logging","Documentation"]'::jsonb,
  'የዳታቤዝ Alert logs ዕለታዊ ፍተሻና የተጠቃሚዎች መለያ ጥያቄዎች ምዝገባ።',
  'jd-database-x'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-sys-001',
  'ICS-SYS-0721',
  'ዮናስ በቀለ ተፈራ',
  'Yonas Bekele Tefera',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'Senior System Specialist Grade XIII',
  'ደረጃ XIII (Grade XIII)',
  'ቋሚ',
  '2018-05-18',
  '+251 91 234 5678',
  'yonas.bekele@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 102',
  'active',
  'በኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ (BSc in IT)',
  'BSc in Information Technology',
  '["VMware VCP-DCV","RHCE (Red Hat)","Microsoft Certified: Azure Admin","Veeam Backup Certified"]'::jsonb,
  'ምንዳዬ ሀይሌ (ዳይሬክተር)',
  '["VMware vSphere Enterprise Plus","SAN/NAS Storage Arrays (Dell EMC)","Hyper-converged Systems","Disaster Recovery DR Site (RTO/RPO)","Active Directory & IAM"]'::jsonb,
  'የዋና ዳታ ሴንተር ኢንተርፕራይዝ ሰርቨሮች፣ ቨርቹዋል ክላስተሮች እና የDR ማዕከል ኃላፊ።',
  'jd-system-xiii'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-sys-002',
  'ICS-SYS-0884',
  'ተመስገን አሰፋ ደስታ',
  'Temesgen Assefa Desta',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
  'Intermediate System Specialist Grade XII',
  'ደረጃ XII (Grade XII)',
  'ቋሚ',
  '2020-10-05',
  '+251 91 998 7766',
  'temesgen.assefa@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 102',
  'active',
  'በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ (BSc)',
  'BSc in Computer Science',
  '["RHCSA (Red Hat)","VMware VCA","Windows Server Fundamentals"]'::jsonb,
  'ዮናስ በቀለ (ከፍተኛ ባለሙያ ደረጃ XIII)',
  '["VMware ESXi Operations","Monthly Patch Management (WSUS/Yum)","Veeam Backup & Replication Jobs","Server Hardware Racking & Diagnostics"]'::jsonb,
  'የቨርቹዋል ማሽኖች ዕለታዊ ክትትልና ወርሃዊ የደህንነት ፓቾች ተቆጣጣሪ።',
  'jd-system-xii'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-sys-003',
  'ICS-SYS-1055',
  'ማህሌት ጥላሁን ዘለቀ',
  'Mahlet Tilahun Zeleke',
  'ሴት',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ረዳት የሲስተም ባለሙያ ደረጃ XI',
  'Assistant System Specialist Grade XI',
  'ደረጃ XI (Grade XI)',
  'ቋሚ',
  '2022-09-12',
  '+251 91 445 6677',
  'mahlet.tilahun@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 102',
  'active',
  'በኢንፎርሜሽን ቴክኖሎጂ ዲፕሎማ/BSc',
  'BSc in Information Technology',
  '["CompTIA Server+","Microsoft Windows Server Fundamentals"]'::jsonb,
  'ተመስገን አሰፋ (መካከለኛ ባለሙያ ደረጃ XII)',
  '["Active Directory User Provisioning","Windows/Linux OS Installation","Data Center Environment Monitoring (Temp/UPS)","Hot-swap Disk Replacements"]'::jsonb,
  'የተጠቃሚዎች አካውንት መክፈትና የዳታ ሴንተር አካባቢ ቁጥጥር ሎግ አያያዝ።',
  'jd-system-xi'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

INSERT INTO employees (
  id, employee_id, full_name_am, full_name_en, gender,
  directorate_am, directorate_en, team_am, team_en, position_am, position_en,
  job_level, employment_type, hire_date, phone, email, office_location, status,
  education_am, education_en, certifications, supervisor_name, skills, notes, linked_job_id
) VALUES (
  'emp-sys-004',
  'ICS-SYS-1230',
  'አቤል ማርቆስ ዘውዴ',
  'Abel Markos Zewde',
  'ወንድ',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'Institutional Technology Administration Directorate',
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'Database, Network & System Admin Division',
  'ጀማሪ የሲስተም ባለሙያ ደረጃ X',
  'Junior System Specialist Grade X',
  'ደረጃ X (Grade X)',
  'ቋሚ',
  '2024-03-01',
  '+251 94 555 6677',
  'abel.markos@ics.gov.et',
  'ዳታ ሴንተር ህንፃ ቢሮ ቁጥር 102',
  'active',
  'በኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ (BSc IT)',
  'BSc in Information Technology',
  '["CompTIA A+"]'::jsonb,
  'ማህሌት ጥላሁን (ረዳት ባለሙያ ደረጃ XI)',
  '["System Event Viewer Log Checking","Software Package Installation","Hardware Asset Tagging","First-level Issue Escalation"]'::jsonb,
  'የሰርቨር Event Logs ዕለታዊ ክትትልና የመተግበሪያ ሶፍትዌሮች ጭነት።',
  'jd-system-x'
) ON CONFLICT (id) DO UPDATE SET
  full_name_am = EXCLUDED.full_name_am,
  full_name_en = EXCLUDED.full_name_en,
  position_am = EXCLUDED.position_am,
  position_en = EXCLUDED.position_en,
  team_am = EXCLUDED.team_am,
  team_en = EXCLUDED.team_en,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  linked_job_id = EXCLUDED.linked_job_id;

-- =============================================================================
-- 5. TABLE: appraisal_records (Staff Performance Appraisal Evaluations)
-- =============================================================================
INSERT INTO appraisal_records (
  id, employee_id, emp_name, emp_code, emp_dept, emp_position, eval_period,
  supervisor_name, eval_date, eval_type, categories, competencies,
  task_score_60, competency_score_40, total_score_100, performance_grade,
  supervisor_comments, employee_comments, supervisor_signed, employee_signed,
  supervisor_sign_date, employee_sign_date, approval_status
) VALUES (
  'appraisal-lydia-2018',
  'emp-net-001',
  'ሊዲያ ግሩም ገብረስላሴ',
  'ICS-IT-0482',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም',
  'ምንዳዬ ሀይሌ',
  '2026-06-30',
  'half-year',
  '[{"id":1,"title":"የራስን እቅድ ማቀድና መፈፀም፤ 9%","weight":9,"subtasks":[{"subId":"1.1","desc":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","criteria":[{"id":"1.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"1.2","desc":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","criteria":[{"id":"1.2-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"1.3","desc":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","criteria":[{"id":"1.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.3-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":2,"title":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%","weight":18,"subtasks":[{"subId":"2.1","desc":"የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ","criteria":[{"id":"2.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.2","desc":"የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤","criteria":[{"id":"2.2-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.3","desc":"የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","criteria":[{"id":"2.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.4","desc":"ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤","criteria":[{"id":"2.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.5","desc":"የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤","criteria":[{"id":"2.5-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.5-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.6","desc":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤","criteria":[{"id":"2.6-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.6-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":3,"title":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%","weight":20,"subtasks":[{"subId":"3.1","desc":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤","criteria":[{"id":"3.1-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.2","desc":"የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤","criteria":[{"id":"3.2-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.3","desc":"በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤","criteria":[{"id":"3.3-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.4","desc":"በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤","criteria":[{"id":"3.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.5","desc":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤","criteria":[{"id":"3.5-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.5-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.6","desc":"በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤","criteria":[{"id":"3.6-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.6-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.7","desc":"የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","criteria":[{"id":"3.7-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.7-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.8","desc":"የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤","criteria":[{"id":"3.8-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.8-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":4,"title":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%","weight":13,"subtasks":[{"subId":"4.1","desc":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","criteria":[{"id":"4.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.2","desc":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤","criteria":[{"id":"4.2-q","type":"ጥራት","weight":1,"rating":4},{"id":"4.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.3","desc":"የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤","criteria":[{"id":"4.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.4","desc":"የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤","criteria":[{"id":"4.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.5","desc":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።","criteria":[{"id":"4.5-q","type":"ጥራት","weight":1,"rating":4},{"id":"4.5-t","type":"ጊዜ","weight":1,"rating":4}]}]}]'::jsonb,
  '[{"id":"c1","name":"አገር ወዳድነት","nameEn":"Patriotism","weight":25,"rating":4,"notes":""},{"id":"c2","name":"የተሟላ ስብዕና /integrity/","nameEn":"Integrity","weight":25,"rating":4,"notes":""},{"id":"c3","name":"ሙያዊ እውቀትና ችሎታ /Professionalism/","nameEn":"Professionalism","weight":25,"rating":4,"notes":""},{"id":"c4","name":"ተባብሮ የመስራት ልምድና ችሎታ /Team Sprit/","nameEn":"Team Spirit","weight":25,"rating":3,"notes":""}]'::jsonb,
  58.2,
  37.4,
  95.6,
  'እጅግ የላቀ (Very High)',
  'ሰራተኛዋ የተጣለባትን የኔትወርክ ማሻሻያ እና የዳታ ሴንተር አስተዳደር ስራዎችን በላቀ ብቃትና በጥራት አከናውናለች። በሁሉም ቅርንጫፎች ተደራሽነትን በማረጋገጥ ከፍተኛ ሚና ተጫውታለች።',
  'በግምገማው ወቅት የተሰጡኝን አስተያየቶችና ግብረ-መልሶችን ሙሉ በሙሉ እስማማበታለሁ። በቀጣዩ የምዘና ወቅት የቡድን አሰራርንና የኔትወርክ ሰነዶች ማደራጀትን ይበልጥ አጠናክሬ እቀጥላለሁ።',
  true,
  true,
  '2026-06-30',
  '2026-06-30',
  'approved'
) ON CONFLICT (id) DO UPDATE SET
  emp_name = EXCLUDED.emp_name,
  task_score_60 = EXCLUDED.task_score_60,
  competency_score_40 = EXCLUDED.competency_score_40,
  total_score_100 = EXCLUDED.total_score_100,
  approval_status = EXCLUDED.approval_status;

INSERT INTO appraisal_records (
  id, employee_id, emp_name, emp_code, emp_dept, emp_position, eval_period,
  supervisor_name, eval_date, eval_type, categories, competencies,
  task_score_60, competency_score_40, total_score_100, performance_grade,
  supervisor_comments, employee_comments, supervisor_signed, employee_signed,
  supervisor_sign_date, employee_sign_date, approval_status
) VALUES (
  'appraisal-dawit-2018',
  'emp-db-001',
  'ዳዊት አበራ ወርቁ',
  'ICS-DB-0654',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም',
  'ምንዳዬ ሀይሌ',
  '2026-06-30',
  'half-year',
  '[{"id":1,"title":"የራስን እቅድ ማቀድና መፈፀም፤ 9%","weight":9,"subtasks":[{"subId":"1.1","desc":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","criteria":[{"id":"1.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"1.2","desc":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","criteria":[{"id":"1.2-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"1.3","desc":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","criteria":[{"id":"1.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.3-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":2,"title":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%","weight":18,"subtasks":[{"subId":"2.1","desc":"የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ","criteria":[{"id":"2.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.2","desc":"የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤","criteria":[{"id":"2.2-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.3","desc":"የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","criteria":[{"id":"2.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.4","desc":"ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤","criteria":[{"id":"2.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.5","desc":"የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤","criteria":[{"id":"2.5-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.5-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.6","desc":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤","criteria":[{"id":"2.6-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.6-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":3,"title":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%","weight":20,"subtasks":[{"subId":"3.1","desc":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤","criteria":[{"id":"3.1-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.2","desc":"የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤","criteria":[{"id":"3.2-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.3","desc":"በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤","criteria":[{"id":"3.3-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.4","desc":"በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤","criteria":[{"id":"3.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.5","desc":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤","criteria":[{"id":"3.5-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.5-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.6","desc":"በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤","criteria":[{"id":"3.6-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.6-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.7","desc":"የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","criteria":[{"id":"3.7-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.7-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.8","desc":"የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤","criteria":[{"id":"3.8-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.8-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":4,"title":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%","weight":13,"subtasks":[{"subId":"4.1","desc":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","criteria":[{"id":"4.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.2","desc":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤","criteria":[{"id":"4.2-q","type":"ጥራት","weight":1,"rating":4},{"id":"4.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.3","desc":"የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤","criteria":[{"id":"4.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.4","desc":"የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤","criteria":[{"id":"4.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.5","desc":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።","criteria":[{"id":"4.5-q","type":"ጥራት","weight":1,"rating":4},{"id":"4.5-t","type":"ጊዜ","weight":1,"rating":4}]}]}]'::jsonb,
  '[{"id":"c1","name":"አገር ወዳድነት","nameEn":"Patriotism","weight":25,"rating":4,"notes":""},{"id":"c2","name":"የተሟላ ስብዕና /integrity/","nameEn":"Integrity","weight":25,"rating":4,"notes":""},{"id":"c3","name":"ሙያዊ እውቀትና ችሎታ /Professionalism/","nameEn":"Professionalism","weight":25,"rating":4,"notes":""},{"id":"c4","name":"ተባብሮ የመስራት ልምድና ችሎታ /Team Sprit/","nameEn":"Team Spirit","weight":25,"rating":3,"notes":""}]'::jsonb,
  57,
  38,
  95,
  'እጅግ የላቀ (Very High)',
  'ሰራተኛዋ የተጣለባትን የኔትወርክ ማሻሻያ እና የዳታ ሴንተር አስተዳደር ስራዎችን በላቀ ብቃትና በጥራት አከናውናለች። በሁሉም ቅርንጫፎች ተደራሽነትን በማረጋገጥ ከፍተኛ ሚና ተጫውታለች።',
  'በግምገማው ወቅት የተሰጡኝን አስተያየቶችና ግብረ-መልሶችን ሙሉ በሙሉ እስማማበታለሁ። በቀጣዩ የምዘና ወቅት የቡድን አሰራርንና የኔትወርክ ሰነዶች ማደራጀትን ይበልጥ አጠናክሬ እቀጥላለሁ።',
  true,
  true,
  '2026-06-30',
  '2026-06-30',
  'approved'
) ON CONFLICT (id) DO UPDATE SET
  emp_name = EXCLUDED.emp_name,
  task_score_60 = EXCLUDED.task_score_60,
  competency_score_40 = EXCLUDED.competency_score_40,
  total_score_100 = EXCLUDED.total_score_100,
  approval_status = EXCLUDED.approval_status;

INSERT INTO appraisal_records (
  id, employee_id, emp_name, emp_code, emp_dept, emp_position, eval_period,
  supervisor_name, eval_date, eval_type, categories, competencies,
  task_score_60, competency_score_40, total_score_100, performance_grade,
  supervisor_comments, employee_comments, supervisor_signed, employee_signed,
  supervisor_sign_date, employee_sign_date, approval_status
) VALUES (
  'appraisal-yonas-2018',
  'emp-sys-001',
  'ዮናስ ታደሰ አያሌው',
  'ICS-SYS-0711',
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም',
  'ምንዳዬ ሀይሌ',
  '2026-06-30',
  'half-year',
  '[{"id":1,"title":"የራስን እቅድ ማቀድና መፈፀም፤ 9%","weight":9,"subtasks":[{"subId":"1.1","desc":"የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት","criteria":[{"id":"1.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"1.2","desc":"የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ","criteria":[{"id":"1.2-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"1.3","desc":"ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤","criteria":[{"id":"1.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"1.3-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":2,"title":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%","weight":18,"subtasks":[{"subId":"2.1","desc":"የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ","criteria":[{"id":"2.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.2","desc":"የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤","criteria":[{"id":"2.2-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.3","desc":"የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤","criteria":[{"id":"2.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.4","desc":"ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤","criteria":[{"id":"2.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.5","desc":"የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤","criteria":[{"id":"2.5-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.5-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"2.6","desc":"በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤","criteria":[{"id":"2.6-q","type":"ጥራት","weight":2,"rating":4},{"id":"2.6-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":3,"title":"በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%","weight":20,"subtasks":[{"subId":"3.1","desc":"በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤","criteria":[{"id":"3.1-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.2","desc":"የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤","criteria":[{"id":"3.2-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.3","desc":"በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤","criteria":[{"id":"3.3-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.4","desc":"በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤","criteria":[{"id":"3.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.5","desc":"በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤","criteria":[{"id":"3.5-q","type":"ጥራት","weight":1,"rating":4},{"id":"3.5-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.6","desc":"በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤","criteria":[{"id":"3.6-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.6-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.7","desc":"የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤","criteria":[{"id":"3.7-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.7-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"3.8","desc":"የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤","criteria":[{"id":"3.8-q","type":"ጥራት","weight":2,"rating":4},{"id":"3.8-t","type":"ጊዜ","weight":1,"rating":4}]}]},{"id":4,"title":"የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%","weight":13,"subtasks":[{"subId":"4.1","desc":"የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት","criteria":[{"id":"4.1-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.1-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.2","desc":"የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤","criteria":[{"id":"4.2-q","type":"ጥራት","weight":1,"rating":4},{"id":"4.2-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.3","desc":"የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤","criteria":[{"id":"4.3-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.3-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.4","desc":"የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤","criteria":[{"id":"4.4-q","type":"ጥራት","weight":2,"rating":4},{"id":"4.4-t","type":"ጊዜ","weight":1,"rating":4}]},{"subId":"4.5","desc":"ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።","criteria":[{"id":"4.5-q","type":"ጥራት","weight":1,"rating":4},{"id":"4.5-t","type":"ጊዜ","weight":1,"rating":4}]}]}]'::jsonb,
  '[{"id":"c1","name":"አገር ወዳድነት","nameEn":"Patriotism","weight":25,"rating":4,"notes":""},{"id":"c2","name":"የተሟላ ስብዕና /integrity/","nameEn":"Integrity","weight":25,"rating":4,"notes":""},{"id":"c3","name":"ሙያዊ እውቀትና ችሎታ /Professionalism/","nameEn":"Professionalism","weight":25,"rating":4,"notes":""},{"id":"c4","name":"ተባብሮ የመስራት ልምድና ችሎታ /Team Sprit/","nameEn":"Team Spirit","weight":25,"rating":3,"notes":""}]'::jsonb,
  56.4,
  36.8,
  93.2,
  'ከፍተኛ (High)',
  'ሰራተኛዋ የተጣለባትን የኔትወርክ ማሻሻያ እና የዳታ ሴንተር አስተዳደር ስራዎችን በላቀ ብቃትና በጥራት አከናውናለች። በሁሉም ቅርንጫፎች ተደራሽነትን በማረጋገጥ ከፍተኛ ሚና ተጫውታለች።',
  'በግምገማው ወቅት የተሰጡኝን አስተያየቶችና ግብረ-መልሶችን ሙሉ በሙሉ እስማማበታለሁ። በቀጣዩ የምዘና ወቅት የቡድን አሰራርንና የኔትወርክ ሰነዶች ማደራጀትን ይበልጥ አጠናክሬ እቀጥላለሁ።',
  true,
  true,
  '2026-06-30',
  '2026-06-30',
  'approved'
) ON CONFLICT (id) DO UPDATE SET
  emp_name = EXCLUDED.emp_name,
  task_score_60 = EXCLUDED.task_score_60,
  competency_score_40 = EXCLUDED.competency_score_40,
  total_score_100 = EXCLUDED.total_score_100,
  approval_status = EXCLUDED.approval_status;

-- =============================================================================
-- 6. TABLE: monthly_reports (Civil Service Monthly Performance Reports)
-- =============================================================================
INSERT INTO monthly_reports (
  id, employee_id, employee_name, position, department, supervisor_name,
  year, month, report_date, submission_date, tasks,
  challenges_faced, solutions_taken, support_needed, next_month_plan,
  supervisor_rating, supervisor_comments, supervisor_signed, employee_signed, status
) VALUES (
  'mr-2018-06-001',
  'emp-net-001',
  'ሊዲያ ግሩም ገብረስላሴ',
  'ከፍተኛ የኔትወርክ ባለሙያ (ደረጃ XIII)',
  'የኔትወርክና መሰረተ ልማት ቡድን',
  'ምንዳዬ ሀይሌ (የቡድን መሪ)',
  2018,
  'ሰኔ',
  '2026-06-28',
  '2026-06-29',
  '[{"id":"t1","taskTitle":"የቦሌ ኤርፖርት ተርሚናል 2 የቅርንጫፍ ኔትወርክ ፍጥነት ማሻሻያ (Bandwidth Upgrade)","plannedTarget":"የዳታ ማስተላለፍ ፍጥነትን ከ100Mbps ወደ 1Gbps ማሳደግና መቀያየሪያዎችን ማዋቀር","achievedResult":"ዝርጋታው ሙሉ ለሙሉ ተጠናቆ ፍተሻ ተካሂዷል፤ የፓስፖርት ቼኪንግ ፍጥነት በ40% ጨምሯል።","progressPercent":100,"status":"completed","evidenceOrRemark":"የፍጥነት መለኪያ ሪፖርትና የርክክብ ሰነድ ተያይዟል"},{"id":"t2","taskTitle":"የዋናው መስሪያ ቤት Core Switch HA (High Availability) ውቅር ማጠናከር","plannedTarget":"የሁለተኛ ደረጃ Cisco Nexus ስዊች ውቅር እና አውቶማቲክ Failover ፍተሻ","achievedResult":"የቪላን እና የVRRP ውቅር ተጠናቋል፤ በሙከራ ጊዜ በ3 ሰከንድ ውስጥ መቀየር ችሏል።","progressPercent":95,"status":"in-progress","evidenceOrRemark":"የመጨረሻ የደህንነት ኦዲት እየተጠበቀ ነው"},{"id":"t3","taskTitle":"በክልል ቅርንጫፎች (ድሬዳዋና ሐዋሳ) የቪፒኤን መቆራረጥ ችግርን መፍታት","plannedTarget":"የሁለቱም ቅርንጫፎች የቴሌኮም መስመር መፈተሽና የIPsec VPN ፖሊሲ ማስተካከል","achievedResult":"ከኢትዮ ቴሌኮም ጋር በመቀናጀት አዲስ የመጠባበቂያ መስመር ተዘርግቶ ችግሩ ተፈቷል።","progressPercent":100,"status":"completed","evidenceOrRemark":"የቅርንጫፍ ኃላፊዎች ማረጋገጫ ደብዳቤ"}]'::jsonb,
  'በቦሌ ኤርፖርት ስራ ወቅት የቀን በረራዎች እንዳይስተጓጎሉ በለሊት ብቻ የመስራት ግዴታ በመኖሩ ተጨማሪ ጊዜ ወስዷል።',
  'የቴክኒክ ቡድኑ በፈረቃ በለሊት እንዲሰራ በማድረግ ያለ ምንም የአገልግሎት መቋረጥ ስራው ተጠናቋል።',
  'ለቀጣይ የቅርንጫፍ ዝርጋታዎች ተጨማሪ የፋይበር ኦፕቲክ መሞከሪያ መሣሪያዎች (OTDR) እንዲሟሉልን።',
  'የባህር ዳር እና የመቀሌ ቅርንጫፎች የSD-WAN ትስስር ማካሄድ እና የዳይሬክቶሬቱን የፋየርዎል ፍቃድ ማደስ።',
  4,
  'በጣም የሚያበረታታና የተቋሙን አገልግሎት ያሳደገ ከፍተኛ የቴክኒክ አፈጻጸም ነው፤ ጥረቱ ይቀጥል።',
  true,
  true,
  'approved'
) ON CONFLICT (id) DO UPDATE SET
  employee_name = EXCLUDED.employee_name,
  tasks = EXCLUDED.tasks,
  status = EXCLUDED.status;

-- =============================================================================
-- 7. TABLE: audit_logs (System & User Activity Audit Records)
-- =============================================================================
INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  'system',
  'sys-init-01',
  'SCHEMA_VERIFIED',
  'የሲስተም አስተዳዳሪ (System Admin)',
  'admin',
  '{"status":"All tables verified & ready for data inserts"}'::jsonb,
  '127.0.0.1'
);

INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  'departments',
  'dept-div-dns',
  'DEPARTMENT_SEEDED',
  'System Setup',
  'admin',
  '{"code":"DNS-DIV","active":true}'::jsonb,
  '127.0.0.1'
);

INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  'official_staff_positions',
  'pos-net-xiii',
  'POSITION_REGISTERED',
  'HR Director',
  'admin',
  '{"grade":"ደረጃ XIII","category":"network"}'::jsonb,
  '192.168.1.10'
);

INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  'job_descriptions',
  'jd-network-xiii',
  'MATRIX_PUBLISHED',
  'ምንዳዬ ሀይሌ (ዳይሬክተር)',
  'supervisor',
  '{"level":"ደረጃ XIII","weight":60}'::jsonb,
  '192.168.1.15'
);

INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  'employees',
  'emp-net-001',
  'EMPLOYEE_PROVISIONED',
  'የሰው ኃይል አስተዳደር',
  'hr_officer',
  '{"employeeId":"ICS-NET-0842","status":"active"}'::jsonb,
  '192.168.1.20'
);

INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  'appraisal_records',
  'appraisal-lydia-2018',
  'APPRAISAL_APPROVED',
  'ምንዳዬ ሀይሌ (ዳይሬክተር)',
  'supervisor',
  '{"totalScore100":95.6,"grade":"እጅግ የላቀ (Very High)","approvalStatus":"approved"}'::jsonb,
  '192.168.1.15'
);

INSERT INTO audit_logs (
  entity_type, entity_id, action, actor_name, actor_role, changes, ip_address
) VALUES (
  'monthly_reports',
  'mr-sample-01',
  'REPORT_APPROVED',
  'ምንዳዬ ሀይሌ (ዳይሬክተር)',
  'supervisor',
  '{"rating":5,"status":"approved"}'::jsonb,
  '192.168.1.15'
);

COMMIT;

-- =============================================================================
-- ALL 7 TABLES SEEDED AND VERIFIED SUCCESSFULLY:
-- 1. departments: 6 rows
-- 2. official_staff_positions: 12 rows
-- 3. job_descriptions: 12 rows
-- 4. employees: 12 rows
-- 5. appraisal_records: 3 rows
-- 6. monthly_reports: 1 rows
-- 7. audit_logs: 7 rows
-- =============================================================================
