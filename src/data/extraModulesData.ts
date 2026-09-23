import { JobDescription } from '../types/jobDescription';
import { MonthlyReport } from '../types/monthlyReport';

export const DEFAULT_JOB_DESCRIPTIONS: JobDescription[] = [
  // ==========================================
  // 1. የዳታቤዝ አስተዳደር የስራ ክፍል (Database Administration Department)
  // ==========================================
  {
    id: 'jd-database-admin-xiii',
    title: 'ከፍተኛ የዳታቤዝ አስተዳደር ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Database Administrator (DBA) Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የዳታቤዝ አስተዳደር የስራ ክፍል (Database Administration Department)',
    reportsTo: 'የዳታቤዝ አስተዳደር ቡድን መሪ',
    jobObjective: 'የተቋሙን ዋና ዋና የመረጃ ቋቶች (Oracle Database, PostgreSQL, Microsoft SQL Server) አርክቴክቸር ማቀድ፣ መዘርጋት፣ የዳታ ተደራሽነት (High Availability/RAC/Clustering) ማረጋገጥ፣ የጥያቄዎችና ትራንዛክሽኖች ፍጥነት (Performance Tuning & Optimization) ማሻሻል፣ የዳታ ደህንነትና ኢንክሪፕሽን መጠበቅ እና አስተማማኝ የመረጃ ቅጂ (Disaster Recovery/Backup) ስርዓት መምራት።',
    duties: [
      {
        id: 'd1',
        title: 'የዳታቤዝ አርክቴክቸር፣ ዲዛይንና ከፍተኛ ተደራሽነት (High Availability & Clustering)',
        description: 'የOracle RAC (Real Application Clusters), Data Guard, እና PostgreSQL Patroni/Streaming Replication ክላስተሮችን ዲዛይን ማድረግ፣ መጫን፣ ማዋቀርና አስተማማኝ ተደራሽነታቸውን ማረጋገጥ።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የዳታቤዝ አፈጻጸም ቁጥጥር፣ መጠይቆች ማሻሻያ (Query Optimization & Performance Tuning)',
        description: 'የዳታቤዝ ትራንዛክሽኖችን ፍጥነት መከታተል፣ Execution Plans መተንተን፣ ኢንዴክሶችን ማሻሻል፣ ማነቆ የሆኑ ውስብስብ SQL/PL-SQL መጠይቆችን መፍታትና የሀብት አጠቃቀምን ማመቻቸት።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የመረጃ ቅጂ (Backup)፣ ማገገሚያ (Disaster Recovery) እና ተከታታይ ፍተሻ',
        description: 'RMAN እና pg_backrest በመጠቀም ራስ-ሰር ዕለታዊና ሳምንታዊ ሙሉ የዳታ ቅጂዎችን ማከናወን፣ የWAL ማህደር ማስተዳደር እና በወር ቢያንስ አንድ ጊዜ የማገገም (DR Drill) ሙከራ ማድረግ።',
        weightPercentage: 25
      },
      {
        id: 'd4',
        title: 'የዳታ ደህንነት፣ ምስጠራ፣ ኦዲትና የተጠቃሚዎች ፈቃድ ቁጥጥር (Security & Access Control)',
        description: 'Transparent Data Encryption (TDE) መተግበር፣ የመረጃ ቋቶችን ተጋላጭነት መፈተሽ፣ ሚስጥራዊ የዜጎች መረጃ እንዳይፈስ መጠበቅ እና የዳታቤዝ ተጠቃሚዎች መዳረሻን በደረጃ መቆጣጠር።',
        weightPercentage: 20
      }
    ],
    requirements: {
      education: 'በኮምፒውተር ሳይንስ፣ በሶፍትዌር ምህንድስና፣ በዳታቤዝ ሲስተምስ ወይም በተመሳሳይ መስክ የመጀመሪያ ወይም ሁለተኛ ዲግሪ',
      experience: 'ቢያንስ 6 ዓመት በኢንተርፕራይዝ ደረጃ የዳታቤዝ አስተዳደር (Enterprise DBA) ቀጥተኛ የስራ ልምድ',
      certifications: [
        'Oracle Certified Professional (OCP Database)',
        'PostgreSQL Certified Professional',
        'Microsoft Certified: Azure Database Administrator Associate',
        'AWS Certified Database - Specialty'
      ],
      technicalSkills: [
        'Oracle 19c/21c Enterprise, RAC, ASM, Data Guard',
        'PostgreSQL High Availability (Patroni, PgBouncer, Replication)',
        'Microsoft SQL Server AlwaysOn Availability Groups',
        'SQL, PL/SQL, T-SQL performance tuning & profiling',
        'Automated Backup Tools (RMAN, pg_backrest, Commvault)',
        'Database Encryption (TDE), Database Auditing, Row-Level Security'
      ]
    },
    keyPerformanceIndicators: [
      'የዋና ዋና ዳታቤዞች ያልተቋረጠ አገልግሎት መስጠት ምጣኔ (Database Uptime >= 99.95%)',
      'የዳታ ማጣት ምጣኔ ዜሮ መሆኑ (Zero Data Loss: RPO = 0, RTO < 30 minutes)',
      'የተከናወኑ የዳታ ቅጂዎች (Backups) 100% ትክክለኛነትና ሳምንታዊ የማገገሚያ ፍተሻ መሳካት',
      'የወሳኝ መጠይቆች (Critical Queries) ምላሽ ፍጥነት ከ1 ሰከንድ በታች መሆኑ'
    ]
  },
  {
    id: 'jd-database-spec-xii',
    title: 'የዳታቤዝ እና የዳታ ኢንተግሬሽን ባለሙያ ደረጃ XII',
    titleEn: 'Database Administrator & Data Integration Specialist Grade XII',
    level: 'ደረጃ XII (Grade XII)',
    department: 'የዳታቤዝ አስተዳደር የስራ ክፍል (Database Administration Department)',
    reportsTo: 'ከፍተኛ የዳታቤዝ አስተዳደር ባለሙያ',
    jobObjective: 'የተቋሙን የዳታ ቋቶች ዕለታዊ አሰራርና ጤንነት መከታተል፣ የዳታ ማዛወርና ልወጣ (ETL/Data Pipelines) ስራዎችን ማከናወን፣ ከተለያዩ ዲጂታል ሲስተሞች ጋር የሚደረጉ የመረጃ ትስስሮችን ማስተዳደር እና የዳታ ጥራት ማረጋገጥ።',
    duties: [
      {
        id: 'd1',
        title: 'ዕለታዊ የዳታቤዝ ክትትልና የሀብቶች አጠቃቀም ቁጥጥር (Daily Monitoring & Health Check)',
        description: 'የዳታቤዝ ስቶሬጅ፣ ቴብልስፔስ፣ ሎግ ፋይሎች እና የሲፒዩ/ራም አጠቃቀምን በየቀኑ መከታተል፣ ማስጠንቀቂያዎችን በወቅቱ መፍታት።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የዳታ ማዛወር፣ ልወጣና የትስስር ስራዎች (ETL, Data Pipelines & Integration)',
        description: 'የዜግነትና የኢ-ቪዛ ዳታቤዞች እርስበርስና ከሌሎች ተቋማት ጋር የሚለዋወጡትን የዳታ ቧንቧዎች (Data Pipelines) መገንባትና መከታተል።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የዳታ ቅጂዎችና ማህደሮች ቁጥጥር (Routine Backups & Archive Management)',
        description: 'ዕለታዊ ሎግ ባክአፖችን መከታተል፣ አሮጌ ዳታዎችን ወደ ማህደር (Archive Storage) ማዛወርና የዲስክ ቦታን ማመቻቸት።',
        weightPercentage: 25
      },
      {
        id: 'd4',
        title: 'የተጠቃሚዎች ድጋፍና የዳታቤዝ አክሰስ አስተዳደር (User Support & Access Provisioning)',
        description: 'ለአፕሊኬሽን አልሚዎችና ለሲስተም ባለሙያዎች የተፈቀደ የዳታቤዝ መዳረሻ መስጠት፣ ስክሪፕቶችን መፈተሽና ድጋፍ ማድረግ።',
        weightPercentage: 20
      }
    ],
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ፣ በኮምፒውተር ሳይንስ ወይም በተመሳሳይ መስክ የመጀመሪያ ዲግሪ',
      experience: 'ቢያንስ 4 ዓመት በዳታቤዝ አስተዳደርና ኢንተግሬሽን የስራ ልምድ',
      certifications: [
        'Oracle Certified Associate (OCA)',
        'PostgreSQL Associate DBA',
        'Microsoft Certified: Database Administrator Fundamentals'
      ],
      technicalSkills: [
        'Oracle, PostgreSQL, MySQL Administration',
        'ETL Tools (Talend, Apache NiFi, Python scripts)',
        'SQL script writing, Index maintenance, View generation',
        'Linux command line and Bash script automation'
      ]
    },
    keyPerformanceIndicators: [
      'የዕለት ተዕለት የዳታ ቅጂዎች (Backups) 100% ያለመሳካት መከናወናቸው',
      'የዳታ ልውውጥና የኢንተግሬሽን ስራዎች መዘግየት ከ5 ደቂቃ በታች መሆኑ',
      'የተጠቃሚዎች አክሰስና ፈቃድ ጥያቄዎችን በ2 ሰዓት ውስጥ ምላሽ መስጠት'
    ]
  },

  // ==========================================
  // 2. የሲስተም አስተዳደር የስራ ክፍል (Systems Administration Department)
  // ==========================================
  {
    id: 'jd-sysadmin-xiii',
    title: 'ከፍተኛ የሲስተም አስተዳደር ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Systems & Infrastructure Administrator Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የሲስተም አስተዳደር የስራ ክፍል (Systems Administration Department)',
    reportsTo: 'የሲስተም አስተዳደር ቡድን መሪ',
    jobObjective: 'የተቋሙን ዋና ዋና ኢንተርፕራይዝ ሰርቨሮች (Blade/Rack Servers), ቨርቹዋል ፕላትፎርሞች (VMware vSphere/vCenter), የዳታ ሴንተር ስቶሬጅ (SAN/NAS All-Flash Arrays), Active Directory/Identity Management, Cloud/Hybrid መሰረተ ልማት እና የአደጋ ጊዜ ማገገሚያ (Disaster Recovery Center) በከፍተኛ ጥራትና አስተማማኝነት መምራት።',
    duties: [
      {
        id: 'd1',
        title: 'የኢንተርፕራይዝ ሰርቨሮችና ቨርቹዋል ፕላትፎርሞች አርክቴክቸርና አስተዳደር (Enterprise Server & Virtualization)',
        description: 'VMware ESXi ክላስተሮች፣ vCenter፣ DRS፣ High Availability እና Linux/Windows ኢንተርፕራይዝ ኦፕሬቲንግ ሲስተሞችን ማዋቀር፣ ማስተዳደርና ተደራሽነታቸውን ማረጋገጥ።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የዳታ ሴንተር ስቶሬጅ (SAN/NAS/Storage Arrays) እና አቅም ማቀድ (Capacity Planning)',
        description: 'የDell EMC/HPE ስቶሬጅ አሬይ፣ Fiber Channel ዞኒንግ፣ LUN/vSAN ፕሮቪዥኒንግ እና የሃብት ፍላጎት ትንበያ ማካሄድ።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የሲስተም አደጋ ማገገሚያ (Disaster Recovery & Business Continuity) እና የባክአፕ ቁጥጥር',
        description: 'Veeam Backup & Replication በመጠቀም የቨርቹዋል ማሽኖችን ሙሉ ቅጂ ማከናወን፣ ወደ አደጋ ማገገሚያ ማዕከል (DR Site) ማዛወርና ማረጋገጥ።',
        weightPercentage: 25
      },
      {
        id: 'd4',
        title: 'የኢንተርፕራይዝ መለያ (Active Directory, IAM, SSO) እና የደህንነት ፓቾች አስተዳደር (Patch Management)',
        description: 'Active Directory ዶሜይን፣ የቡድን ፖሊሲዎች (GPO)፣ DNS/DHCP እና ወርሃዊ የኦፕሬቲንግ ሲስተም የደህንነት ፓቾችን በሁሉም ሰርቨሮች ላይ መተግበር።',
        weightPercentage: 20
      }
    ],
    requirements: {
      education: 'በኮምፒውተር ምህንድስና፣ ኢንፎርሜሽን ቴክኖሎጂ ወይም ተዛማጅ መስክ የመጀመሪያ ወይም ሁለተኛ ዲግሪ',
      experience: 'ቢያንስ 6 ዓመት በኢንተርፕራይዝ ሲስተምስ እና ዳታ ሴንተር አስተዳደር የስራ ልምድ',
      certifications: [
        'VMware Certified Professional (VCP-DCV)',
        'Red Hat Certified Engineer (RHCE)',
        'Microsoft Certified: Windows Server / Azure Administrator Associate',
        'CompTIA Server+'
      ],
      technicalSkills: [
        'VMware vSphere 7/8, ESXi, vCenter, vSAN, High Availability (HA), DRS',
        'Linux Enterprise Administration (RHEL, Ubuntu Server, Rocky Linux)',
        'Windows Server 2019/2022, Active Directory Domain Services, GPO, DNS, DHCP',
        'SAN/NAS Storage Arrays (Dell EMC PowerStore, HPE Nimble, NetApp)',
        'Veeam Backup & Replication Enterprise, Instant VM Recovery',
        'Ansible, PowerShell, and Bash Infrastructure Automation'
      ]
    },
    keyPerformanceIndicators: [
      'የሰርቨሮችና ቨርቹዋል ማሽኖች አገልግሎት መስጠት ምጣኔ (Server Availability >= 99.9%)',
      'የሲስተም የደህንነት ፓቾችና ዝመናዎች በየወሩ 100% መተግበራቸው (Patch Compliance Rate 100%)',
      'የአደጋ ጊዜ ማገገሚያ (RTO < 2 hours, RPO < 30 minutes) መሳካት',
      'የስቶሬጅ እና የሲስተም አቅም ማነስ ችግር 0% መሆኑ (Zero Unplanned Downtime due to Storage)'
    ]
  },
  {
    id: 'jd-sysadmin-xii',
    title: 'የሲስተም እና ሰርቨር አስተዳዳሪ ደረጃ XII',
    titleEn: 'Systems & Server Administrator Grade XII',
    level: 'ደረጃ XII (Grade XII)',
    department: 'የሲስተም አስተዳደር የስራ ክፍል (Systems Administration Department)',
    reportsTo: 'ከፍተኛ የሲስተም አስተዳደር ባለሙያ',
    jobObjective: 'የተቋሙን ሰርቨሮች ዕለታዊ ጤንነት መከታተል፣ አዳዲስ ቨርቹዋል ማሽኖችን ማዘጋጀት፣ የሶፍትዌር ጭነቶችን ማከናወን፣ የሃርድዌር ጤንነት መከታተል እና የመረጃ ቅጂዎችን በየቀኑ ማረጋገጥ።',
    duties: [
      {
        id: 'd1',
        title: 'ዕለታዊ የሰርቨሮችና የቨርቹዋል ማሽኖች ክትትልና ጥገና (Server Administration & Maintenance)',
        description: 'የሰርቨር ሲፒዩ፣ ራም እና የዲስክ ሀብቶች አጠቃቀምን መከታተል፣ የአፈጻጸም ማነቆዎችን መፍታት።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የሶፍትዌርና ኦፕሬቲንግ ሲስተም ጭነቶች፣ ዝመናና ፓቺንግ (OS & Software Provisioning)',
        description: 'አዳዲስ የቨርቹዋል ማሽኖችን ማዘጋጀት፣ ኦፕሬቲንግ ሲስተሞችን መጫንና ወርሃዊ የደህንነት ፓቾችን መተግበር።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የመረጃ ቅጂ (Backup Execution) እና የማረጋገጫ ስራዎች',
        description: 'የዕለት ተዕለት የባክአፕ ስራዎች በሙሉ መከናወናቸውን መከታተልና የስህተት መልዕክቶችን በፍጥነት ማስተካከል።',
        weightPercentage: 25
      },
      {
        id: 'd4',
        title: 'የዳታ ሴንተር አካላዊ ቁጥጥርና የሃርድዌር ክትትል (Physical Data Center Operations)',
        description: 'የሰርቨር ራክ፣ ኬብሊንግ፣ የሃይልና የኤሲ ጤንነት መከታተልና የሃርድዌር ብልሽቶችን ለጥገና ሪፖርት ማድረግ።',
        weightPercentage: 20
      }
    ],
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ ወይም በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ',
      experience: 'ቢያንስ 4 ዓመት በሰርቨር እና ሲስተም አስተዳደር የስራ ልምድ',
      certifications: [
        'Red Hat Certified System Administrator (RHCSA)',
        'VMware Certified Associate (VCA)',
        'Microsoft Certified: Windows Server Fundamentals'
      ],
      technicalSkills: [
        'Linux and Windows Server Administration',
        'VMware ESXi and Virtual Machine lifecycle management',
        'Backup software operations (Veeam, Windows Server Backup)',
        'Hardware diagnostic tools and server racking/cabling'
      ]
    },
    keyPerformanceIndicators: [
      'የሰርቨር ብልሽት ጥያቄዎችን በ1 ሰዓት ውስጥ ምላሽ መስጠት',
      'ዕለታዊ የባክአፕ ስራዎችን በ100% ስኬት ማጠናቀቅ',
      'የዳታ ሴንተር የአካባቢ ቁጥጥር (ሙቀት፣ ሃይል) በየቀኑ መመዝገቡ'
    ]
  },

  // ==========================================
  // 3. የኔትዎርክ አስተዳደር የስራ ክፍል (Network Administration Department)
  // ==========================================
  {
    id: 'jd-network-admin-xiii',
    title: 'ከፍተኛ የኔትወርክ አስተዳደር ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Network Administrator Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የኔትዎርክ አስተዳደር የስራ ክፍል (Network Administration Department)',
    reportsTo: 'የኔትወርክ አስተዳደር ቡድን መሪ',
    jobObjective: 'የተቋሙን ዋና መ/ቤት፣ ቅርንጫፎች፣ ኤርፖርቶች እና ኬላዎች የሚያገናኘውን ሰፊ የኔትወርክ (WAN/LAN/WLAN) መሰረተ ልማት ማቀድ፣ ማዋቀር፣ ማስተዳደር፤ የኔትወርክ ደህንነትን (Next-Gen Firewalls/VPN/SD-WAN) እና የዳታ ማስተላለፍ ፍጥነትን በከፍተኛ ጥራት ማስጠበቅ።',
    duties: [
      {
        id: 'd1',
        title: 'የኮርና ዲስትሪቢውሽን ኔትወርክ አርክቴክቸር፣ ዲዛይንና ዝርጋታ (Core/Distribution Switching & Routing)',
        description: 'Cisco Nexus/Catalyst እና Huawei ኮር ስዊቾችን፣ ራውተሮችን፣ VLAN፣ OSPF፣ BGP እና VRF ቴክኖሎጂዎችን ዲዛይን ማድረግና ማስተዳደር።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የቅርንጫፎች WAN፣ SD-WAN እና የኢንተርኔት ግንኙነቶች አስተዳደር (Enterprise WAN & SD-WAN Management)',
        description: 'የቅርንጫፍ ጽ/ቤቶችን እና የድንበር ኬላዎችን ከዋናው ዳታ ሴንተር ጋር የሚያገናኙ የSD-WAN፣ MPLS እና ሳተላይት ግንኙነቶችን ማስተዳደርና ተደጋጋሚነት (Redundancy) ማረጋገጥ።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የኔትወርክ ደህንነት፣ ፋየርዎል እና የርቀት መዳረሻ (Next-Gen Firewalls, IPsec/SSL VPN)',
        description: 'FortiGate/Palo Alto ፋየርዎሎችን በHA ሞድ ማዋቀር፣ የደህንነት ፖሊሲዎችን ማስተዳደር እና የርቀት ሰራተኞች ደህንነቱ የተጠበቀ የVPN መዳረሻ ማረጋገጥ።',
        weightPercentage: 25
      },
      {
        id: 'd4',
        title: 'የኔትወርክ ትራፊክ ቁጥጥር፣ QoS እና የመተላለፊያ ይዘት አስተዳደር (Bandwidth Optimization & Monitoring)',
        description: 'የባንድዊድዝ አጠቃቀምን መከታተል፣ Quality of Service (QoS) በመተግበር ለፓስፖርትና ለዜግነት አገልግሎት ቅድሚያ መስጠት።',
        weightPercentage: 20
      }
    ],
    requirements: {
      education: 'በኮምፒውተር ምህንድስና፣ ኤሌክትሪካል ምህንድስና፣ ኔትወርክ ኢንጂነሪንግ ወይም ተዛማጅ መስክ የመጀመሪያ ወይም ሁለተኛ ዲግሪ',
      experience: 'ቢያንስ 6 ዓመት በኢንተርፕራይዝ ኔትወርክ ዝርጋታና አስተዳደር የስራ ልምድ',
      certifications: [
        'Cisco Certified Network Professional (CCNP Enterprise)',
        'Fortinet Network Security Expert (NSE 4 / NSE 7)',
        'Huawei Certified ICT Professional (HCIP Routing & Switching)',
        'CompTIA Security+'
      ],
      technicalSkills: [
        'Cisco Catalyst 9000 & Nexus series switches, ISR/ASR routers',
        'Dynamic Routing Protocols: BGP, OSPF, EIGRP, VRF, MPLS',
        'Next-Generation Firewalls: FortiGate, Palo Alto Networks, Cisco Firepower',
        'Enterprise SD-WAN, Site-to-Site IPsec VPN, AnyConnect SSL VPN',
        'Network Access Control (802.1X, Cisco ISE / Aruba ClearPass)',
        'Monitoring & Analytics: SolarWinds NPM, PRTG, Zabbix, Wireshark'
      ]
    },
    keyPerformanceIndicators: [
      'የኮር ኔትወርክ ያልተቋረጠ አገልግሎት መስጠት ምጣኔ (Core Network Uptime >= 99.8%)',
      'የቅርንጫፎች የኔትወርክ መቋረጥ ሲያጋጥም ወዲያውኑ ወደ ባክአፕ መስመር መቀየር (Failover < 30 seconds)',
      'የኔትወርክ ፓኬት መጥፋት (Packet Loss < 0.1%) እና የላተንሲ መጠን መጠበቅ',
      'የአዳዲስ ቅርንጫፎች ኔትወርክ ዝርጋታ በተያዘለት የጊዜ ሰሌዳ መከናወኑ'
    ]
  },
  {
    id: 'jd-network-security-xii',
    title: 'የኔትወርክ ክትትልና ደህንነት ባለሙያ ደረጃ XII',
    titleEn: 'Network Security & Operations Specialist Grade XII',
    level: 'ደረጃ XII (Grade XII)',
    department: 'የኔትዎርክ አስተዳደር የስራ ክፍል (Network Administration Department)',
    reportsTo: 'ከፍተኛ የኔትወርክ አስተዳደር ባለሙያ',
    jobObjective: 'የተቋሙን ኔትወርክ በ24/7 ሞኒተሪንግ ሲስተሞች መከታተል፣ የትራፊክ መጨናነቆችን መፍታት፣ የፋየርዎል ህጎችን (Firewall Rules) ማስተዳደር፣ የቅርንጫፍ መስመሮችን ጤንነት መቆጣጠር እና የኔትወርክ ብልሽቶችን በፍጥነት መጠገን።',
    duties: [
      {
        id: 'd1',
        title: 'የኔትወርክ ትራፊክና የመስመሮች ጤንነት 24/7 ክትትል (24/7 Network Monitoring & NOC Operations)',
        description: 'PRTG, Zabbix እና SolarWinds በመጠቀም የኔትወርክ መስመሮችና መሣሪያዎች አገልግሎት መስጠታቸውን በየሰከንዱ መከታተል።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የፋየርዎል ፖሊሲዎች፣ ቪፒኤን እና የአክሰስ ቁጥጥር (Firewall Policy & VPN Administration)',
        description: 'የፋየርዎል ወደብ (Port) ፈቃዶችን ማስተዳደር፣ አጠራጣሪ አይፒዎችን ማገድ እና የተጠቃሚዎች የቪፒኤን አካውንት ማዘጋጀት።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የቅርንጫፎች ኔትወርክ ጥገናና የድጋፍ አገልግሎት (Branch Network Troubleshooting)',
        description: 'በቅርንጫፍ ጽ/ቤቶች የሚከሰቱ የኔትወርክ መቋረጦችን በርቀት ወይም በአካል በመገኘት መጠገንና አገልግሎቱን ማስቀጠል።',
        weightPercentage: 25
      },
      {
        id: 'd4',
        title: 'የኔትወርክ ዕቃዎች ማኑዋል፣ ኢንቬንተሪና ሰነድ አስተዳደር (Network Asset & Configuration Documentation)',
        description: 'የኔትወርክ ቶፖሎጂ ካርታዎችን ማዘጋጀት፣ የኮንፊገሬሽን ባክአፖችን መውሰድና የዕቃዎችን መዝገብ መያዝ።',
        weightPercentage: 20
      }
    ],
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ፣ በኮምፒውተር ሳይንስ ወይም በኤሌክትሪካል ምህንድስና የመጀመሪያ ዲግሪ',
      experience: 'ቢያንስ 4 ዓመት በኔትወርክ አስተዳደርና ክትትል የስራ ልምድ',
      certifications: [
        'Cisco Certified Network Associate (CCNA)',
        'Fortinet NSE 4 (Network Security Professional)',
        'CompTIA Network+'
      ],
      technicalSkills: [
        'Cisco IOS/IOS-XE configuration and troubleshooting',
        'FortiGate and Sophos firewall administration',
        'VLAN segmentation, Spanning Tree Protocol (STP), EtherChannel',
        'NOC monitoring tools (PRTG, Zabbix, Cacti, Grafana)'
      ]
    },
    keyPerformanceIndicators: [
      'የኔትወርክ ብልሽት ማስጠንቀቂያዎች (Alerts) በ15 ደቂቃ ውስጥ ምላሽ ማግኘታቸው',
      'የቅርንጫፎች የቴክኒክ ድጋፍ ጥያቄዎች SLA ምላሽ ጊዜ ከ2 ሰዓት በታች መሆኑ',
      'የኔትወርክ መሳሪያዎች ውቅር (Configurations) በየሳምንቱ ባክአፕ መደረጋቸው'
    ]
  },

  // ==========================================
  // 4. የኢንፎርሜሽን ደህንነት የስራ ክፍል (Information Security Department)
  // ==========================================
  {
    id: 'jd-cybersec-xiii',
    title: 'ከፍተኛ የኢንፎርሜሽን ደህንነት (Cybersecurity) ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Cybersecurity Specialist Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የኢንፎርሜሽን ደህንነት የስራ ክፍል (Information Security Department)',
    reportsTo: 'የቴክኖሎጂ ደህንነት ኦዲት ኃላፊ',
    jobObjective: 'የተቋሙን ኔትወርክ፣ የመረጃ ቋቶች እና ዲጂታል አገልግሎቶች ከሳይበር ጥቃቶች፣ ካልተፈቀደ መዳረሻ እና ከዳታ መፍሰስ መጠበቅ፤ የደህንነት ኦዲት ማካሄድ።',
    duties: [
      {
        id: 'd1',
        title: 'የሳይበር ደህንነት ክትትልና የጥቃት መከላከል (SOC Monitoring)',
        description: 'SIEM ሲስተሞችን በመጠቀም የኔትወርክ ትራፊክ መከታተል፣ አጠራጣሪ እንቅስቃሴዎችን መለየትና ምላሽ መስጠት።',
        weightPercentage: 35
      },
      {
        id: 'd2',
        title: 'የተጋላጭነት ፍተሻና የደህንነት ኦዲት (Vulnerability Assessment)',
        description: 'በሁሉም ሰርቨሮችና አፕሊኬሽኖች ላይ የደህንነት ክፍተቶችን መፈተሽ፣ የማሻሻያ እርምጃዎችን መምከር።',
        weightPercentage: 30
      },
      {
        id: 'd3',
        title: 'የደህንነት ፖሊሲዎች ማዘጋጀትና የግንዛቤ ማስጨበጫ',
        description: 'የተቋሙን የኢንፎርሜሽን ደህንነት መመሪያዎችን ማዘጋጀት፣ ለሰራተኞች የሳይበር ደህንነት ስልጠና መስጠት።',
        weightPercentage: 20
      },
      {
        id: 'd4',
        title: 'የሳይበር አደጋ ምላሽ አሰጣጥ (Incident Response)',
        description: 'የደህንነት ጥሰት ሲያጋጥም ፈጣን እርምጃ መውሰድ፣ ዲጂታል ፎረንሲክ ምርመራ ማድረግና ሪፖርት ማቅረብ።',
        weightPercentage: 15
      }
    ],
    requirements: {
      education: 'በኮምፒውተር ሳይንስ፣ ኢንፎርሜሽን ደህንነት ወይም ተዛማጅ መስክ የመጀመሪያ ዲግሪ',
      experience: 'ቢያንስ 6 ዓመት በኢንፎርሜሽን ደህንነት መስክ የስራ ልምድ',
      certifications: ['CISSP', 'CEH (Certified Ethical Hacker)', 'CompTIA CySA+', 'CISM'],
      technicalSkills: [
        'SIEM tools (Splunk, Wazuh, QRadar)',
        'Vulnerability scanners (Nessus, OpenVAS)',
        'Endpoint Detection & Response (EDR)',
        'Firewall and IPS/IDS fine-tuning'
      ]
    },
    keyPerformanceIndicators: [
      'የሳይበር ጥቃቶችን የመለየትና የመከላከል ምጣኔ (100% critical incidents mitigated)',
      'የተጋላጭነት ፍተሻ በየሩብ ዓመቱ መካሄዱና ክፍተቶች መደፈናቸው',
      'የሰራተኞች የደህንነት ግንዛቤ ምጣኔ ማደግ'
    ]
  }
];

export const DEFAULT_MONTHLY_REPORTS: MonthlyReport[] = [
  {
    id: 'mr-2018-06-001',
    employeeId: 'ICS-IT-0842',
    employeeName: 'ሊዲያ ግሩም ገብረስላሴ',
    position: 'ከፍተኛ የኔትወርክ ባለሙያ (ደረጃ XIII)',
    department: 'የኔትወርክና መሰረተ ልማት ቡድን',
    supervisorName: 'ምንዳዬ ሀይሌ (የቡድን መሪ)',
    year: 2018,
    month: 'ሰኔ',
    reportDate: '2026-06-28',
    submissionDate: '2026-06-29',
    tasks: [
      {
        id: 't1',
        taskTitle: 'የቦሌ ኤርፖርት ተርሚናል 2 የቅርንጫፍ ኔትወርክ ፍጥነት ማሻሻያ (Bandwidth Upgrade)',
        plannedTarget: 'የዳታ ማስተላለፍ ፍጥነትን ከ100Mbps ወደ 1Gbps ማሳደግና መቀያየሪያዎችን ማዋቀር',
        achievedResult: 'ዝርጋታው ሙሉ ለሙሉ ተጠናቆ ፍተሻ ተካሂዷል፤ የፓስፖርት ቼኪንግ ፍጥነት በ40% ጨምሯል።',
        progressPercent: 100,
        status: 'completed',
        evidenceOrRemark: 'የፍጥነት መለኪያ ሪፖርትና የርክክብ ሰነድ ተያይዟል'
      },
      {
        id: 't2',
        taskTitle: 'የዋናው መስሪያ ቤት Core Switch HA (High Availability) ውቅር ማጠናከር',
        plannedTarget: 'የሁለተኛ ደረጃ Cisco Nexus ስዊች ውቅር እና አውቶማቲክ Failover ፍተሻ',
        achievedResult: 'የቪላን እና የVRRP ውቅር ተጠናቋል፤ በሙከራ ጊዜ በ3 ሰከንድ ውስጥ መቀየር ችሏል።',
        progressPercent: 95,
        status: 'in-progress',
        evidenceOrRemark: 'የመጨረሻ የደህንነት ኦዲት እየተጠበቀ ነው'
      },
      {
        id: 't3',
        taskTitle: 'በክልል ቅርንጫፎች (ድሬዳዋና ሐዋሳ) የቪፒኤን መቆራረጥ ችግርን መፍታት',
        plannedTarget: 'የሁለቱም ቅርንጫፎች የቴሌኮም መስመር መፈተሽና የIPsec VPN ፖሊሲ ማስተካከል',
        achievedResult: 'ከኢትዮ ቴሌኮም ጋር በመቀናጀት አዲስ የመጠባበቂያ መስመር ተዘርግቶ ችግሩ ተፈቷል።',
        progressPercent: 100,
        status: 'completed',
        evidenceOrRemark: 'የቅርንጫፍ ኃላፊዎች ማረጋገጫ ደብዳቤ'
      }
    ],
    challengesFaced: 'በቦሌ ኤርፖርት ስራ ወቅት የቀን በረራዎች እንዳይስተጓጎሉ በለሊት ብቻ የመስራት ግዴታ በመኖሩ ተጨማሪ ጊዜ ወስዷል።',
    solutionsTaken: 'የቴክኒክ ቡድኑ በፈረቃ በለሊት እንዲሰራ በማድረግ ያለ ምንም የአገልግሎት መቋረጥ ስራው ተጠናቋል።',
    supportNeeded: 'ለቀጣይ የቅርንጫፍ ዝርጋታዎች ተጨማሪ የፋይበር ኦፕቲክ መሞከሪያ መሣሪያዎች (OTDR) እንዲሟሉልን።',
    nextMonthPlan: 'የባህር ዳር እና የመቀሌ ቅርንጫፎች የSD-WAN ትስስር ማካሄድ እና የዳይሬክቶሬቱን የፋየርዎል ፍቃድ ማደስ።',
    supervisorRating: 4,
    supervisorComments: 'በጣም የሚያበረታታና የተቋሙን አገልግሎት ያሳደገ ከፍተኛ የቴክኒክ አፈጻጸም ነው፤ ጥረቱ ይቀጥል።',
    supervisorSigned: true,
    employeeSigned: true,
    status: 'approved'
  }
];
