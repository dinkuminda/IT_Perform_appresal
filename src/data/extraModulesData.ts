import { JobDescription } from '../types/jobDescription';
import { MonthlyReport } from '../types/monthlyReport';

export const DEFAULT_JOB_DESCRIPTIONS: JobDescription[] = [
  {
    id: 'jd-network-xiii',
    title: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Network Infrastructure Specialist Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
    reportsTo: 'የኔትወርክና መሰረተ ልማት ቡድን መሪ',
    jobObjective: 'የተቋሙን የኢንፎርሜሽን ኔትወርክ መሠረተ-ልማት ጥናት ማካሄድ፣ ዲዛይን ማዘጋጀት፣ መዘርጋት፣ የዳታ ሴንተር አስተዳደርን ማከናወን እና በሁሉም ቅርንጫፎች ያልተቋረጠ ጥራት ያለው አገልግሎት እንዲሰጥ ማድረግ።',
    duties: [
      {
        id: 'd1',
        title: 'የራሱን ዕቅድ ማዘጋጀትና መፈጸም',
        description: 'የዳይሬክቶሬቱን ዓመታዊና ግማሽ ዓመት ዕቅድ መሠረት በማድረግ የግል ተግባር ዕቅድ ማዘጋጀት፣ ወቅታዊ ሪፖርት ማቅረብ እና የግል አቅም ማጎልበቻ ስራዎችን ማከናወን።',
        weightPercentage: 15
      },
      {
        id: 'd2',
        title: 'የኔትወርክ መሠረተ-ልማት ጥናት፣ ዲዛይንና ዝርጋታ',
        description: 'የኔትወርክ ፍላጎቶችን በጥናት መለየት፣ ራውተሮች፣ ስዊቾች እና የፋየርዎል ኮንፊገሬሽን ማከናወን፣ ለአዳዲስ ዕቃዎች ስፔሲፊኬሽን ማዘጋጀት እና ስልጠና መስጠት።',
        weightPercentage: 30
      },
      {
        id: 'd3',
        title: 'የኔትወርክ መሠረተ ልማቶች አስተማማኝነትና ምርታማነትን ማረጋገጥ',
        description: 'በቅርንጫፎች፣ ኤርፖርቶች እና ሚሲዮኖች ኔትወርክ በከፍተኛ ተደራሽነት (High Availability) እንዲሰራ ክትትል ማድረግ፣ ቅድመና ድህረ-ብልሽት ጥገና ማከናወን እና የDisaster Recovery Site ዝግጁ ማድረግ።',
        weightPercentage: 35
      },
      {
        id: 'd4',
        title: 'የአሰራር ስርዓቶች፣ ፖሊሲዎች እና ደህንነት መዘርጋት',
        description: 'የኔትወርክ አስተዳደር ማኑዋሎችን ማዘጋጀት፣ የዳታ ማስተላለፍ ፍጥነት መከታተል፣ የደህንነት ፖሊሲዎችን ማረጋገጥ እና ተዛማጅ ስራዎችን መፈጸም።',
        weightPercentage: 20
      }
    ],
    requirements: {
      education: 'በኮምፒውተር ሳይንስ፣ በኮምፒውተር ምህንድስና ወይም በተመሳሳይ የትምህርት መስክ የመጀመሪያ/ሁለተኛ ዲግሪ',
      experience: 'ቢያንስ 6 ዓመት ቀጥተኛ የኔትወርክ መሠረተ ልማት ዝርጋታና አስተዳደር የስራ ልምድ',
      certifications: ['CCNP (Routing & Switching / Enterprise)', 'CCNA', 'CompTIA Security+', 'HCIP'],
      technicalSkills: [
        'Cisco, Juniper, Huawei ራውተርና ስዊቾች ኮንፊገሬሽን',
        'VLAN, OSPF, BGP, VPN, SD-WAN አሰራር',
        'Next-Gen Firewall (Fortinet, Palo Alto, Sophos) አስተዳደር',
        'Network Monitoring (Nagios, Zabbix, PRTG, SolarWinds)'
      ]
    },
    keyPerformanceIndicators: [
      'የኔትወርክ ያልተቋረጠ አገልግሎት መስጠት ምጣኔ (Uptime >= 99.8%)',
      'የቅርንጫፎች የኔትወርክ ጥገና ጥያቄዎችን በወቅቱ መመለስ (SLA response time < 2 hours)',
      'የዳታ ሴንተርና የደመና (Cloud) ደህንነት መስፈርቶች ተሟልተው መተግበራቸው',
      'የወርሃዊና የሩብ ዓመት የኔትወርክ አፈጻጸም ሪፖርቶች ጥራትና ወቅታዊነት'
    ]
  },
  {
    id: 'jd-sysadmin-xii',
    title: 'ከፍተኛ የሲስተም እና ዳታ ሴንተር አስተዳዳሪ ደረጃ XII',
    titleEn: 'Senior Systems & Data Center Administrator Grade XII',
    level: 'ደረጃ XII (Grade XII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
    reportsTo: 'የዳታ ሴንተር እና ሲስተምስ ቡድን መሪ',
    jobObjective: 'የተቋሙን ሰርቨሮች፣ ቨርቹዋል ማሽኖች፣ የኦፕሬቲንግ ሲስተሞች አስተዳደር፣ የመረጃ ቅጂ (Backup) ደህንነት እና የዳታ ሴንተር አካላዊና ሎጂካዊ ደህንነት ማረጋገጥ።',
    duties: [
      {
        id: 'd1',
        title: 'የሰርቨሮችና ቨርቹዋል ፕላትፎርሞች አስተዳደር',
        description: 'VMware ESXi, Hyper-V, Linux (RHEL/Ubuntu) እና Windows Server ስርዓቶችን መጫን፣ ማዋቀርና ማስተዳደር።',
        weightPercentage: 35
      },
      {
        id: 'd2',
        title: 'የመረጃ ቅጂ (Backup) እና አደጋ ማገገሚያ (Disaster Recovery)',
        description: 'ዕለታዊና ሳምንታዊ የሲስተም ቅጂዎችን ማረጋገጥ፣ የአደጋ ጊዜ መልሶ ማግኛ ሙከራዎችን ማካሄድ።',
        weightPercentage: 30
      },
      {
        id: 'd3',
        title: 'የዳታ ሴንተር ሀብቶች ቁጥጥርና ክትትል',
        description: 'የዳታ ሴንተር የሙቀት፣ የኤሌክትሪክ እና የሀርድዌር ጤንነትን በየዕለቱ መከታተልና ሰነድ ማዘጋጀት።',
        weightPercentage: 20
      },
      {
        id: 'd4',
        title: 'የተጠቃሚዎች መለያ (Identity & Access Management)',
        description: 'Active Directory, LDAP, Single Sign-On (SSO) እና የመዳረሻ ፈቃዶችን በአግባቡ ማስተዳደር።',
        weightPercentage: 15
      }
    ],
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ ወይም ተዛማጅ መስክ ቢኤስሲ/ኤምኤስሲ',
      experience: 'ቢያንስ 4 ዓመት በዳታ ሴንተር እና ሲስተም አስተዳደር ስራ ልምድ',
      certifications: ['VMware VCP', 'RHCSA / RHCE', 'Microsoft Azure / Windows Server Administrator'],
      technicalSkills: [
        'Enterprise Virtualization (VMware vSphere/vCenter)',
        'Storage Area Network (SAN/NAS) Management',
        'Linux Bash Scripting and Automation (Ansible)',
        'Veeam Backup & Replication'
      ]
    },
    keyPerformanceIndicators: [
      'የሰርቨር አስተማማኝነት እና የአገልግሎት ቅልጥፍና (Server Availability >= 99.9%)',
      'የመረጃ ቅጂ ሙሉነትና የተረጋገጠ ማገገም (RTO < 4 hrs, RPO < 1 hr)',
      'የደህንነት ፓቾችና ማሻሻያዎች በወቅቱ መተግበራቸው'
    ]
  },
  {
    id: 'jd-cybersec-xiii',
    title: 'ከፍተኛ የኢንፎርሜሽን ደህንነት (Cybersecurity) ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Cybersecurity Specialist Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
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
    id: 'rep-lydia-sene-2018',
    employeeId: 'ICS-IT-0482',
    employeeName: 'ሊዲያ ግሩም ገብረስላሴ',
    position: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
    supervisorName: 'ምንዳዬ ሀይሌ',
    year: 2018,
    month: 'ሰኔ',
    reportDate: '2026-06-28',
    submissionDate: '2026-06-29',
    tasks: [
      {
        id: 'mt1',
        taskTitle: 'በዋናው መ/ቤትና በቅርንጫፎች መካከል ያለውን የSD-WAN ኔትወርክ ማዋቀር',
        plannedTarget: '4 ቅርንጫፎችን በSD-WAN ማገናኘት',
        achievedResult: '4ቱም ቅርንጫፎች በተሳካ ሁኔታ ተገናኝተዋል፣ የዳታ ማስተላለፍ ፍጥነት በ 35% ጨምሯል',
        progressPercent: 100,
        status: 'completed',
        evidenceOrRemark: 'የኔትወርክ ፍተሻ ሰነድና የኮንፊገሬሽን ሎግ ተያይዟል'
      },
      {
        id: 'mt2',
        taskTitle: 'የዳታ ሴንተር ኮር ስዊቾች (Core Switches) Firmware ማሻሻል',
        plannedTarget: '2 ኮር ስዊቾችን ያለምንም አገልግሎት መቋረጥ ማዘመን',
        achievedResult: 'በእረፍት ሰዓት በተሳካ ሁኔታ ተሻሽሏል',
        progressPercent: 100,
        status: 'completed',
        evidenceOrRemark: 'የመጠባበቂያ ቅጂ (Config backup) ተወስዷል'
      },
      {
        id: 'mt3',
        taskTitle: 'የቦሌ ዓለምአቀፍ ኤርፖርት ቅርንጫፍ ጽ/ቤት የኔትወርክ ብልሽት ጥገና',
        plannedTarget: 'የቀረበውን የፋይበር መስመር መቆራረጥ ጥያቄ በ 2 ሰዓት ውስጥ መፍታት',
        achievedResult: 'በ 1 ሰዓት ከ 20 ደቂቃ ውስጥ ወደ መደበኛ ስራ ተመልሷል',
        progressPercent: 100,
        status: 'completed',
        evidenceOrRemark: 'የቅርንጫፍ ኃላፊው የስራ ማረጋገጫ ፊርማ አለው'
      },
      {
        id: 'mt4',
        taskTitle: 'ለአዳዲስ ጀማሪ ባለሙያዎች የኔትወርክ መዋቅር ስልጠና መስጠት',
        plannedTarget: 'ለ 6 አዳዲስ ሰራተኞች የ 2 ቀን ስልጠና መስጠት',
        achievedResult: 'የመጀመሪያ ዙር ስልጠና ተጠናቋል፤ የሁለተኛው ዙር ተግባራዊ ልምምድ በቀጣይ ወር ይከናወናል',
        progressPercent: 85,
        status: 'in-progress',
        evidenceOrRemark: 'የስልጠና ማኑዋልና የስራ መገኘት ቅጽ ተዘጋጅቷል'
      }
    ],
    challengesFaced: 'በአንዳንድ አውራጃ ቅርንጫፎች የቴሌኮም የመስመር መቆራረጥ መደጋገም እና የፋይበር ኬብል መጎዳት አጋጥሟል።',
    solutionsTaken: 'ከኢትዮ ቴሌኮም የቴክኒክ ድጋፍ ቡድን ጋር በጋራ በመሆን የBackup 4G/LTE ራውተሮች ተጠቃሚ እንዲሆኑ ተደርጓል።',
    supportNeeded: 'ለቀጣዩ ወር የታቀደውን የዳታ ሴንተር ኬብሊንግ መልሶ ማደራጀት ስራ ለማከናወን ተጨማሪ የኔትወርክ መለኪያ መሣሪያዎች (Cable tester/Fluke) አቅርቦት ያስፈልጋል።',
    nextMonthPlan: '1. የዳታ ሴንተር ራክ ማደራጀትና ምልክት ማድረግ (Labeling)\n2. የዲዛስተር ሪከቨሪ (DR) ኔትወርክ የሙከራ ፍተሻ ማካሄድ\n3. የኔትወርክ ደህንነት ፖሊሲዎችን ማሻሻል',
    supervisorRating: 4,
    supervisorComments: 'ሊዲያ በወሩ የታቀዱትን እጅግ ውስብስብ የኔትወርክ ስራዎች በከፍተኛ ቁርጠኝነትና ባልተቋረጠ ጥረት አከናውናለች። በተለይም የኤርፖርት መስመር ፈጣን ጥገና የተቋሙን አገልግሎት ከመስተጓጎል አድኗል።',
    supervisorSigned: true,
    employeeSigned: true,
    status: 'approved'
  }
];
