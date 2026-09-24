export interface StaffPositionItem {
  id: string;
  category: 'network' | 'database' | 'system';
  categoryAm: string;
  categoryEn: string;
  titleAm: string;
  titleEn: string;
  grade: 'ደረጃ XIII' | 'ደረጃ XII' | 'ደረጃ XI' | 'ደረጃ X';
  departmentAm: string;
  departmentEn: string;
  reportsToAm: string;
  evalTemplateType: 'network' | 'database' | 'system';
  jobObjectiveAm: string;
}

export const OFFICIAL_STAFF_POSITIONS: StaffPositionItem[] = [
  // =========================================================================
  // 1. ኔትዎርክ አስተዳደር (Network Administration)
  // =========================================================================
  {
    id: 'pos-net-xiii',
    category: 'network',
    categoryAm: 'ኔትዎርክ አስተዳደር',
    categoryEn: 'Network Administration',
    titleAm: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Network Specialist Grade XIII',
    grade: 'ደረጃ XIII',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Network Administration',
    reportsToAm: 'የኔትወርክ አስተዳደር ቡድን መሪ',
    evalTemplateType: 'network',
    jobObjectiveAm: 'የተቋሙን ዋና መ/ቤት፣ ቅርንጫፎችና ኬላዎች የሚያገናኝ የኮር ኔትወርክ አርክቴክቸር፣ SD-WAN፣ BGP/OSPF ራውቲንግ፣ ከፍተኛ ደህንነትና የአደጋ ጊዜ ማገገሚያ ስርዓቶችን ማቀድ፣ ማዋቀርና መምራት።'
  },
  {
    id: 'pos-net-xii',
    category: 'network',
    categoryAm: 'ኔትዎርክ አስተዳደር',
    categoryEn: 'Network Administration',
    titleAm: 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
    titleEn: 'Intermediate Network Specialist Grade XII',
    grade: 'ደረጃ XII',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Network Administration',
    reportsToAm: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
    evalTemplateType: 'network',
    jobObjectiveAm: 'የኔትወርክ ስዊቾችን፣ ራውተሮችን፣ የፋየርዎል ህጎችን ማስተዳደር፤ የትራፊክ ፍሰትና የቪፒኤን መዳረሻን መከታተል፤ የቅርንጫፎች የኔትወርክ ብልሽቶችን መፍታት።'
  },
  {
    id: 'pos-net-xi',
    category: 'network',
    categoryAm: 'ኔትዎርክ አስተዳደር',
    categoryEn: 'Network Administration',
    titleAm: 'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
    titleEn: 'Assistant Network Specialist Grade XI',
    grade: 'ደረጃ XI',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Network Administration',
    reportsToAm: 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
    evalTemplateType: 'network',
    jobObjectiveAm: 'የኔትወርክ ኬብሊንግ፣ የመቀያየሪያ ወደቦች (Access Switches/Ports) ዝርጋታና ፍተሻ፣ የኔትወርክ መሳሪያዎች የቅድመ ብልሽት ጥገና እና የቅርንጫፎች የቴክኒክ ድጋፍ ማከናወን።'
  },
  {
    id: 'pos-net-x',
    category: 'network',
    categoryAm: 'ኔትዎርክ አስተዳደር',
    categoryEn: 'Network Administration',
    titleAm: 'ጀማሪ የኔትዎርክ ባለሙያ ደረጃ X',
    titleEn: 'Junior Network Specialist Grade X',
    grade: 'ደረጃ X',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Network Administration',
    reportsToAm: 'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
    evalTemplateType: 'network',
    jobObjectiveAm: 'ዕለታዊ የኔትወርክ መሳሪያዎች ጤንነት መከታተል፣ የተጠቃሚዎች የኔትወርክ ግንኙነት ጥያቄዎችን መመዝገብ፣ መሰረታዊ የኔትወርክ ጥገና እና የወደብ ፍተሻዎችን በክትትል ስር ማከናወን።'
  },

  // =========================================================================
  // 2. ዳታቤዝ አስተዳደር (Database Administration)
  // =========================================================================
  {
    id: 'pos-db-xiii',
    category: 'database',
    categoryAm: 'ዳታቤዝ አስተዳደር',
    categoryEn: 'Database Administration',
    titleAm: 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Database Specialist Grade XIII',
    grade: 'ደረጃ XIII',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Database Administration',
    reportsToAm: 'የዳታቤዝ አስተዳደር ቡድን መሪ',
    evalTemplateType: 'database',
    jobObjectiveAm: 'የተቋሙን ዋና ዋና ኢንተርፕራይዝ ዳታቤዞች (Oracle RAC, PostgreSQL, SQL Server) አርክቴክቸር፣ High Availability፣ አፈጻጸም ማሻሻያ (Performance Tuning)፣ የዳታ ምስጠራና የDR ማገገሚያ ስርዓት መምራት።'
  },
  {
    id: 'pos-db-xii',
    category: 'database',
    categoryAm: 'ዳታቤዝ አስተዳደር',
    categoryEn: 'Database Administration',
    titleAm: 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
    titleEn: 'Intermediate Database Specialist Grade XII',
    grade: 'ደረጃ XII',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Database Administration',
    reportsToAm: 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
    evalTemplateType: 'database',
    jobObjectiveAm: 'የዳታቤዝ ዕለታዊ ክትትልና የሀብቶች አጠቃቀም ቁጥጥር፣ የዳታ ልወጣና ኢንተግሬሽን (ETL/Pipelines)፣ የባክአፕ ማረጋገጫ እና የተጠቃሚዎች ፈቃድ አስተዳደር ማከናወን።'
  },
  {
    id: 'pos-db-xi',
    category: 'database',
    categoryAm: 'ዳታቤዝ አስተዳደር',
    categoryEn: 'Database Administration',
    titleAm: 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
    titleEn: 'Assistant Database Specialist Grade XI',
    grade: 'ደረጃ XI',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Database Administration',
    reportsToAm: 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
    evalTemplateType: 'database',
    jobObjectiveAm: 'የዳታቤዝ ቅጂዎችን (Daily Backups) በወቅቱ መውሰድ፣ የቴብልስፔስና የዲስክ ቦታ ክትትል ማድረግ፣ ቀላል የSQL ስክሪፕቶችን ማሄድ እና የአፕሊኬሽን ዳታ ፍተሻ ማካሄድ።'
  },
  {
    id: 'pos-db-x',
    category: 'database',
    categoryAm: 'ዳታቤዝ አስተዳደር',
    categoryEn: 'Database Administration',
    titleAm: 'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X',
    titleEn: 'Junior Database Specialist Grade X',
    grade: 'ደረጃ X',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / Database Administration',
    reportsToAm: 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
    evalTemplateType: 'database',
    jobObjectiveAm: 'የዳታቤዝ ሁነታ ሎጎችን መመዝገብ፣ መሰረታዊ የዳታ ቅጂዎች መያዛቸውን ማረጋገጥ፣ የዳታ ቋት የተጠቃሚዎች ጥያቄዎችን መቀበልና መመዝገብ።'
  },

  // =========================================================================
  // 3. ሲስተም አስተዳደር (System Administration)
  // =========================================================================
  {
    id: 'pos-sys-xiii',
    category: 'system',
    categoryAm: 'ሲስተም አስተዳደር',
    categoryEn: 'System Administration',
    titleAm: 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
    titleEn: 'Senior System Specialist Grade XIII',
    grade: 'ደረጃ XIII',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / System Administration',
    reportsToAm: 'የሲስተም አስተዳደር ቡድን መሪ',
    evalTemplateType: 'system',
    jobObjectiveAm: 'የተቋሙን ዋና ዋና ኢንተርፕራይዝ ሰርቨሮች፣ VMware vSphere ቨርቹዋል ክላስተሮች፣ SAN/NAS ስቶሬጅ፣ Active Directory እና የተቋሙን DR Site አጠቃላይ አሰራር በበላይነት ማቀድና ማስተዳደር።'
  },
  {
    id: 'pos-sys-xii',
    category: 'system',
    categoryAm: 'ሲስተም አስተዳደር',
    categoryEn: 'System Administration',
    titleAm: 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
    titleEn: 'Intermediate System Specialist Grade XII',
    grade: 'ደረጃ XII',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / System Administration',
    reportsToAm: 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
    evalTemplateType: 'system',
    jobObjectiveAm: 'የሰርቨሮችና የቨርቹዋል ማሽኖች ዕለታዊ ጤንነት መከታተል፣ ወርሃዊ የደህንነት ፓቾችን (Patch Management) መተግበር፣ Veeam ባክአፖችን ማረጋገጥና የሰርቨር ሃርድዌር ጥገናዎችን ማስተባበር።'
  },
  {
    id: 'pos-sys-xi',
    category: 'system',
    categoryAm: 'ሲስተም አስተዳደር',
    categoryEn: 'System Administration',
    titleAm: 'ረዳት የሲስተም ባለሙያ ደረጃ XI',
    titleEn: 'Assistant System Specialist Grade XI',
    grade: 'ደረጃ XI',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / System Administration',
    reportsToAm: 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
    evalTemplateType: 'system',
    jobObjectiveAm: 'የሰርቨር ኦፕሬቲንግ ሲስተሞች ጭነት፣ የአካላዊ ዳታ ሴንተር አካባቢ (የሙቀት፣ የኤሲ፣ የUPS) ክትትል፣ የተጠቃሚዎች መለያ (AD User Provisioning) እና የመሰረታዊ ሲስተም ችግሮች ጥገና ማከናወን።'
  },
  {
    id: 'pos-sys-x',
    category: 'system',
    categoryAm: 'ሲስተም አስተዳደር',
    categoryEn: 'System Administration',
    titleAm: 'ጀማሪ የሲስተም ባለሙያ ደረጃ X',
    titleEn: 'Junior System Specialist Grade X',
    grade: 'ደረጃ X',
    departmentAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
    departmentEn: 'Institutional Technology Directorate / System Administration',
    reportsToAm: 'ረዳት የሲስተም ባለሙያ ደረጃ XI',
    evalTemplateType: 'system',
    jobObjectiveAm: 'የሰርቨር ሎጎችን በየዕለቱ መፈተሽ፣ የመሰረታዊ ሲስተም ብልሽት ጥሪዎችን መቀበልና መመዝገብ፣ ቀላል የሶፍትዌር ጭነቶችንና ፍተሻዎችን በክትትል ስር ማከናወን።'
  }
];
