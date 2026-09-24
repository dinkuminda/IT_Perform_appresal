import { JobDescription, EvaluationCategoryItem } from '../types/jobDescription';
import { MonthlyReport } from '../types/monthlyReport';
import { convertEvaluationTableToTaskCategories } from '../utils/calculations';

// =========================================================================
// 1. የዳታቤዝ አስተዳደር ይፋዊ የሥራ አፈጻጸም ምዘና ሰንጠረዥ (DATABASE ADMINISTRATION TABLE)
// ድምር ክብደት: 60%
// =========================================================================
export const DATABASE_ADMIN_EVALUATION_TABLE: EvaluationCategoryItem[] = [
  {
    no: 1,
    expectedResult: 'የራስን እቅድ ማቀድና መፈፀም፤ 10%',
    weight: 10,
    tasks: [
      {
        code: '1.1',
        description: 'የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት',
        weight: 3
      },
      {
        code: '1.2',
        description: 'የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ',
        weight: 3
      },
      {
        code: '1.3',
        description: 'ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና ይሰጣል፤',
        weight: 3
      }
    ]
  },
  {
    no: 2,
    expectedResult: 'የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%',
    weight: 10,
    tasks: [
      {
        code: '2.1',
        description: 'ስራዎችን ውጤታማ ለማድረግ የሚረዱ ዓለም አቀፍ ምርጥ ተሞክሮዎችን መቀመርና ማስፋፋት፤',
        weight: 3
      },
      {
        code: '2.2',
        description: 'የተቋሙ ዳታቤዝ በዘመናዊ መንገድ ለማስተዳደር የሚያግዙ አዳዲስ አሰራር ስልቶችን መከታተል',
        weight: 3
      },
      {
        code: '2.3',
        description: 'የዳታ ሴንተር ሃብቶች የአደጋ ጊዜ መውጫና የስራ ማስቀጠያ (Disaster Recovery and Business Continuity) አሰራር መዘገጀት፤ መከታተል፤',
        weight: 2
      }
    ]
  },
  {
    no: 3,
    expectedResult: 'በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%',
    weight: 20,
    tasks: [
      {
        code: '3.1',
        description: 'የተቋሙን የዳታቤዝ ፍላጎቶችን በጥናት መለየትና አዳዲስ አሰራሮችን መቀየስ',
        weight: 2
      },
      {
        code: '3.2',
        description: 'ለቅርንጫፍና ለዋና መስሪያ ቤት ረዳትና ጀማሪ የዳታቤዝ ባለሙያዎች የቴክኒክ ድጋፍ መስጠት፤',
        weight: 3
      },
      {
        code: '3.3',
        description: 'የዳታቤዝ አፈጻጸምን መከታተል፤የዳታቤዝ ውቅሮችን ማመቻቸት እና የመጠባበቂያ(backup) እና መልሶ ማግኛ(recovery) ሂደቶችን መተግበር፤መደበኛ የዳታ ቤዝ ጥገና ሥራዎችን ማከናወን፤',
        weight: 3
      },
      {
        code: '3.4',
        description: 'ከመረጃ ቋቱ ስርዓት ጋር የተያያዙ ችግሮችን መለየት እና የመፍታት ሥራን መስራት',
        weight: 3
      },
      {
        code: '3.5',
        description: 'ዳታቤዝ ከሌሎች ስስተሞች እና አፕሊኬሽኖች ጋር በትክክል እንዲቀናጁ ማድረግ፤',
        weight: 3
      },
      {
        code: '3.6',
        description: 'የዳታ ዋስትና (Data Integrity)፣ ደህንነት (Security) እና የዳታ ስርዓት ተከታታይነት (Consistency) ማረጋገጥ፤',
        weight: 3
      },
      {
        code: '3.7',
        description: 'የዳታቤዝ ስርዓቶችን (MySQL, Oracle, SQL Server, PostgreSQL, MongoDB, ወዘተ) መጫን፣ ማዋቀር፣ እና እንዲዘምን ማድረግ፤',
        weight: 2
      }
    ]
  },
  {
    no: 4,
    expectedResult: 'በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት ውጤታማ ማድረግ 20%',
    weight: 20,
    tasks: [
      {
        code: '4.1',
        description: 'በዋናው መስሪያ ቤት፣ በቅርንጫፎችና በCloud የሚገኙ ዳታቤዞች በትክክል መስራታቸውን መከታተልና የቴክኒክ ድጋፍ መስጠት፤',
        weight: 2
      },
      {
        code: '4.2',
        description: 'የዳታቤዝ መረጃዎች ቅጅ (Backup) ሚስጢራዊነታቸውን ጠብቆ እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) ማረጋገጥና መያዝ፤',
        weight: 2
      },
      {
        code: '4.3',
        description: 'ማንኛውንም የአፕሊኬሽን ዳታቤዝ ሳይቋረጥ አገልግሎት እንዲሰጥ (High availability and Fault tolerance) በአሰራር መሰረት ተግባራዊ ማድረግ፤ ሂደቱንም መከታተል፤',
        weight: 2
      },
      {
        code: '4.4',
        description: 'በአደጋ ጊዜ መጠበቂያ ዳታሴንተር (Disaster Recovery Site) የDatabase Replication መስራቱን መከታተል፤',
        weight: 3
      },
      {
        code: '4.5',
        description: 'የዳታቤዝ የአቅም ማሻሻል (Performance tuning,monitoring)፣ መቆራረጥ እንዳይኖር መከታተልና የቴክኒክ ብልሽቶችን (Single point of failure) መከላከል፤',
        weight: 2
      },
      {
        code: '4.6',
        description: 'በዳታ ቤዝ ሰርቨሮች፣ ስቶሬጆች፣ ቨርቹዋልላይዜሽን የአፕሬቲንግ ሲስተም ሰዓትጭሮች፣ ሳይቆራረጡ እንዲሰሩ ክትትል ማድረግ፤',
        weight: 3
      },
      {
        code: '4.7',
        description: 'የዳታቤዝ ደህንነትን በመቆጣጠር፣ የይለፍ ቃሎች (Passwords)፣ ፈቃዶች (Permissions) እና የስምጣኔ ማረጋገጫ (Authentication) እንድቀጥሩ ማድረግ፤',
        weight: 2
      },
      {
        code: '4.8',
        description: 'የዳታ ሞዴሊንግ(Data Modeling)፣ የዳታ መዋቅር (Schema Design) እና የዳታ ማከማቻ ስልቶችን (Storage Strategies) በማጥናት ላይ ምክር እንዲቀርብ ማድረግ፤',
        weight: 2
      },
      {
        code: '4.9',
        description: 'የክላውድ ዳታቤዝ (Cloud Databases) እንደ AWS RDS፣ Azure SQL፣ ወይም Google Cloud SQL ተግባራዊ ያደርጋል',
        weight: 2
      },
      {
        code: '4.10',
        description: 'የዳታቤዝ (Schemas)፣ ሰንጠረዦችን (Tables) እና ግንኙነቶችን (Relationships) መፍጠር እና ማስተዳደር፤',
        weight: 2
      },
      {
        code: '4.11',
        description: 'ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ያከናውናል።',
        weight: 2
      }
    ]
  }
];

// =========================================================================
// 2. የሲስተም አስተዳደር ይፋዊ የሥራ አፈጻጸም ምዘና ሰንጠረዥ (SYSTEMS ADMINISTRATION TABLE)
// ድምር ክብደት: 60%
// =========================================================================
export const SYSTEM_ADMIN_EVALUATION_TABLE: EvaluationCategoryItem[] = [
  {
    no: 1,
    expectedResult: 'የራስን እቅድ ማቀድና መፈፀም፤ 10%',
    weight: 10,
    tasks: [
      {
        code: '1.1',
        description: 'የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት',
        weight: 4
      },
      {
        code: '1.2',
        description: 'የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ',
        weight: 3
      },
      {
        code: '1.3',
        description: 'ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤',
        weight: 3
      }
    ]
  },
  {
    no: 2,
    expectedResult: 'የተቋሙ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት አገልግሎት ተደራሽነትና ውጤታማነትን ማረጋገጥ፤ 20%',
    weight: 20,
    tasks: [
      {
        code: '2.1',
        description: 'በተቋሙ፣ በቅርንጫፍ፣ በድንበር አስተዳደሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖች የሚገኘው ሲስተም በትክክል እየሰራ መሆናቸው መከታተል፤',
        weight: 2
      },
      {
        code: '2.2',
        description: 'የሲስተም ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ አግባብ መያዛቸው እንዲሁም የተያዙ ቅጅዎች (backups) ወደ ሲስተም መመለሳቸውን (Restore) እንዲመለሱ ማድረግ፤',
        weight: 2
      },
      {
        code: '2.3',
        description: 'የሲስተም ሁነታ መመዝገቢያ ሎጎችን (system logs) በሁሉም የመረጃ መያዣ ሳጥኖች (Storages)፣ ሰርቨሮች፣ ማዕከላዊ የሀይል መቆጣጠሪያዎች (Central UPS) እና የአየር ማቀዝቀዣዎች እቃዎች እንዲወሰድ ማድረግ፤',
        weight: 2
      },
      {
        code: '2.4',
        description: 'በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖች፣ በCloud አገልግሎት ላይ የሚገኘውን ማንኛውንም የአፕሊኬሽን ሲስተም ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) እንዲሰጥ ማድረግ፤',
        weight: 2
      },
      {
        code: '2.5',
        description: 'በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ሁሉም የአፕሊኬሽን ሲስተም Disaster Recovery Site እንዲኖር ማድረግ፤',
        weight: 2
      },
      {
        code: '2.6',
        description: 'የሲስተም ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤',
        weight: 2
      },
      {
        code: '2.7',
        description: 'የሲስተም አቅም ማሻሻል (Performance tuning) ስራዎችን መስራት፤',
        weight: 2
      },
      {
        code: '2.8',
        description: 'የሲስተም አስተዳደር ስልጠና ፕሮግራሞችን ማዘጋጀት እና ከስሩ ላሉት መካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤',
        weight: 2
      },
      {
        code: '2.9',
        description: 'የሲስተም ዝርዝር የስራ ሰነዶች (Documentation) ማዘጋጀትና መከታተል፤',
        weight: 2
      },
      {
        code: '2.10',
        description: 'የሲስተም የደህንነት ፖሊሲዎችን መተግበር፣ የደህንነት ስጋቶችን መከታተል እና መከላከል፤',
        weight: 2
      }
    ]
  },
  {
    no: 3,
    expectedResult: 'በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%',
    weight: 20,
    tasks: [
      {
        code: '3.1',
        description: 'የተቋሙን አገልግሎት አሰጣጥ ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የሲስተም ፍላጎቶችን በጥናት መለየት፤',
        weight: 3
      },
      {
        code: '3.2',
        description: 'የተቋሙ ሲስተም ስርአት በሁሉም የተቋሙ አገልግሎት መስጫዎች ቦታዎች ተደራሽ እንዲሆን ጥናት ማድረግ፤',
        weight: 3
      },
      {
        code: '3.3',
        description: 'የተቋሙን የሲስተም መሰረተ ልማት የአገልግሎቶች ስፋት፣ የመረጃ እድገትና ተደራሽነት ታሳቢ ያደረገ ጥናት ማድረግ፤',
        weight: 3
      },
      {
        code: '3.4',
        description: 'የተቋሙ አገልግሎት ለማቀላጠፍ በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም ለሚሰሩ የሲስተም ስራዎች ቴክኖሎጂ እቃዎች የግዥ ስፔስፊኬሽን ስንድ በጥናት ማዘጋጀት፤',
        weight: 4
      },
      {
        code: '3.5',
        description: 'በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የሲስተም ቴክኖሎጂዎች ጥራት በሙከራ ጥናት እንዲረጋገጥ ማድረግ፤',
        weight: 3
      },
      {
        code: '3.6',
        description: 'በስራ ላይ የሚገኙ የServer, Storage የሲስተም፣ ቨርቹዋልላይዜሽን እና ኦፕሬቲንግ ሲስተሞች የማሻሻል ስራዎች ከተሰሩ በኋላም ይሁን በፊት የTesting Environment በመፍጠር የሙከራ ጥናት ፍተሻ ማድረግ፤',
        weight: 4
      }
    ]
  },
  {
    no: 4,
    expectedResult: 'የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%',
    weight: 10,
    tasks: [
      {
        code: '4.1',
        description: 'የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት',
        weight: 4
      },
      {
        code: '4.2',
        description: 'የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ የሲስተም አስተዳደር ስርዓት ይዘረጋል፤ ውጤታማነቱን በመገምገም ማሻሻያዎችን ማድረግ፤',
        weight: 3
      },
      {
        code: '4.3',
        description: 'ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችንም ማከናወን።',
        weight: 3
      }
    ]
  }
];

// =========================================================================
// 3. የኔትዎርክ አስተዳደር ይፋዊ የሥራ አፈጻጸም ምዘና ሰንጠረዥ (NETWORK ADMINISTRATION TABLE)
// ድምር ክብደት: 60%
// =========================================================================
export const NETWORK_ADMIN_EVALUATION_TABLE: EvaluationCategoryItem[] = [
  {
    no: 1,
    expectedResult: 'የራስን እቅድ ማቀድና መፈፀም፤ 9%',
    weight: 9,
    tasks: [
      {
        code: '1.1',
        description: 'የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት',
        weight: 3
      },
      {
        code: '1.2',
        description: 'የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ',
        weight: 3
      },
      {
        code: '1.3',
        description: 'ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤',
        weight: 3
      }
    ]
  },
  {
    no: 2,
    expectedResult: 'በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 18%',
    weight: 18,
    tasks: [
      {
        code: '2.1',
        description: 'የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የመረጃ እድገትን ያገናዘበ ዲዛይን በማዘጋጀትም በሁሉም የስራ ክፍሎች የኔትዎርክ ተደራሽነትን ማረጋገጥ',
        weight: 3
      },
      {
        code: '2.2',
        description: 'የተቋሙ አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የኔትወርክ እቃዎች ስፔስፊኬሽን ጥናትን መሰረት በማድረግ ማዘጋጀት፤',
        weight: 3
      },
      {
        code: '2.3',
        description: 'የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና ለመካከለኛ ፣ ረዳት እና ጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤',
        weight: 3
      },
      {
        code: '2.4',
        description: 'ኔትወርክ ዝርዝር የስራ ሰነዶች (Documentation) እና የኮንፊግሬሽን መረጃ ማዘጋጀትና ማደራጀት፤',
        weight: 3
      },
      {
        code: '2.5',
        description: 'የኔትወርክ መሠረተ ልማት (ራውተሮች፣ስዊቾች እና ዎርክስቴሽኖችን) በመጫን እና በማዋቀር ወይም ኮንፊገር የማድረግ፣የድጋፍ እና የጥገና ስራ በመስራት ድጋፍ መስጠት፤',
        weight: 3
      },
      {
        code: '2.6',
        description: 'በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ የኔትወርክ ቴክኖሎጂዎች ጥራት ይፈትሻል፤',
        weight: 3
      }
    ]
  },
  {
    no: 3,
    expectedResult: 'በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን መሰረተ ልማት ውጤታማነትን ማረጋገጥ 20%',
    weight: 20,
    tasks: [
      {
        code: '3.1',
        description: 'በተቋሙ፣ በቅርንጫፍ፣ በድንበሮች፣ በክልልና ከተማ አስተዳደር የቤተሰብና ሲቪል መዝገብ ተቋማትና ሚሲዮኖችን የሚገኘው ኔትዎርክቶች በትክክል እየሰሩ መሆናቸው መከታተል፤',
        weight: 2
      },
      {
        code: '3.2',
        description: 'የኔትወርክ ኮንፊግሬሽን ቅጅዎች (System State backup) ሚስጥራዊነታቸውን ጠብቆ፣የኔትዎርክ መገናኛ እቃዎች በአሰራሩ መሰረት መከታተል፤',
        weight: 2
      },
      {
        code: '3.3',
        description: 'በተቋሙ የአገልግሎት መስጫ ቦታዎች፣ በቅርንጫፍ፣ በድንበሮች፣ በሚሲዮኖችን በCloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ሳይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤',
        weight: 2
      },
      {
        code: '3.4',
        description: 'በዳታሴንተር ውስጥ ያሉ መሰረተ ልማት (ራውተሮች፣ኮርቪቾች፣ኬብሎች እና ሌሎችም) ሁሉም ፖርቶች እና ኬብሎችን በግልፅ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤',
        weight: 3
      },
      {
        code: '3.5',
        description: 'በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማከታተልና ተግባራዊ ማድረግ፤',
        weight: 2
      },
      {
        code: '3.6',
        description: 'በሁሉም ቅርንጫፍ ጽ/ቤቶች፣ ድንበሮች፣ ቆንስላዎች፣ ኢንደስትሪያል ፓርኮችና በቤተሰብ ሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎቱ ተደራሽ መሆኑን በየቀኑ የክትትልና ድጋፍ ማድረግ፤',
        weight: 3
      },
      {
        code: '3.7',
        description: 'የኔትወርክ ሀብቶች የቅድመ ብልሽት (Preventive Maintenance) እና ድህረ ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤',
        weight: 3
      },
      {
        code: '3.8',
        description: 'የኔትወርክ አቅም ማሻሻል (Performance tuning)፣ አዳዲስ አመራርጭ የኔትዎርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN ) መምረጥና ተግባራዊ ማድረግና መከታተል፤',
        weight: 3
      }
    ]
  },
  {
    no: 4,
    expectedResult: 'የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 13%',
    weight: 13,
    tasks: [
      {
        code: '4.1',
        description: 'የስራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ማንዋሎችንና ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቀመር ማስፋፋት',
        weight: 3
      },
      {
        code: '4.2',
        description: 'የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለማሰባሰብና ለማደራጀት የሚያስችሉ አዳዲስ ኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤',
        weight: 2
      },
      {
        code: '4.3',
        description: 'የተቋሙ የኔትዎርክ ስርዓት አስተማማኝ፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤',
        weight: 3
      },
      {
        code: '4.4',
        description: 'የኔትወርክ ደህንነት ፖሊሲዎችን (የፋየርዎል ህጎች፣አክሰስ ኮንትሮል፣የአንድሮይድት) እና የዳታ ማስተላለፊያ ጥራት (Data Transfer Rates) መከታተል፤',
        weight: 3
      },
      {
        code: '4.5',
        description: 'ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን ማከናወን።',
        weight: 2
      }
    ]
  }
];

// =========================================================================
// DEFAULT JOB DESCRIPTIONS LIST (Including official evaluation tables)
// =========================================================================
export const DEFAULT_JOB_DESCRIPTIONS: JobDescription[] = [
  // =========================================================================
  // 1. የኔትዎርክ አስተዳደር (Network Administration) - 4 ደረጃዎች
  // =========================================================================
  {
    id: 'jd-network-xiii',
    title: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Network Specialist Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
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
    evaluationTable: NETWORK_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(NETWORK_ADMIN_EVALUATION_TABLE),
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
    id: 'jd-network-xii',
    title: 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
    titleEn: 'Intermediate Network Specialist Grade XII',
    level: 'ደረጃ XII (Grade XII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
    reportsTo: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
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
    evaluationTable: NETWORK_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(NETWORK_ADMIN_EVALUATION_TABLE),
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
  {
    id: 'jd-network-xi',
    title: 'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
    titleEn: 'Assistant Network Specialist Grade XI',
    level: 'ደረጃ XI (Grade XI)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
    reportsTo: 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
    jobObjective: 'የኔትወርክ መዋቅር ዝርጋታዎችን (Structured Cabling/Patch Panels)፣ የመቀያየሪያ ስዊቾች ወደቦች አደረጃጀት፣ የዋይፋይ አክሰስ ፖይንቶች ተከላ እና የቅርንጫፎች የኔትወርክ ኬብልና ሃርድዌር ጥገና ማከናወን።',
    duties: [
      {
        id: 'd1',
        title: 'የኔትወርክ ኬብሊንግና የሃርድዌር ዝርጋታ (Cabling & Hardware Installation)',
        description: 'Cat6/Fiber ኬብሎችን መዘርጋት፣ የRJ45 ተርሚኔሽን ማዘጋጀት፣ Patch Panels እና Faceplates ማስተካከልና መፈተሽ።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የAccess Switches ወደቦችና የዋይፋይ አክሰስ ፖይንቶች ቁጥጥር (Access Ports & Wi-Fi APs)',
        description: 'የሰራተኞች ኔትወርክ ወደቦችን ማገናኘት፣ የዋይፋይ ራውተሮችንና Access Points መስራታቸውን በየቢሮው ማረጋገጥ።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የኔትወርክ መሳሪያዎች የቅድመ ብልሽት ፍተሻ (Preventive Maintenance)',
        description: 'የኔትወርክ ራኮችን ማጽዳት፣ የአየር ዝውውር መቆጣጠር፣ የኬብል አስተዳደር (Cable Management) ማስተካከልና መዝገብ መያዝ።',
        weightPercentage: 25
      },
      {
        id: 'd4',
        title: 'የመሰረታዊ የኔትወርክ ብልሽቶች አፋጣኝ ጥገና (First-Level Network Troubleshooting)',
        description: 'በተጠቃሚዎች ዘንድ የሚከሰቱ የIP አለመቀበል፣ የኬብል መበጠስ እና የስዊች ወደብ ችግሮችን ወዲያውኑ መፍታት።',
        weightPercentage: 20
      }
    ],
    evaluationTable: NETWORK_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(NETWORK_ADMIN_EVALUATION_TABLE),
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ፣ ኮምፒውተር ሳይንስ ወይም ኤሌክትሮኒክስ ዲፕሎማ ወይም የመጀመሪያ ዲግሪ',
      experience: 'ቢያንስ 2 ዓመት በኔትወርክ ዝርጋታና ቴክኒካል ድጋፍ የስራ ልምድ',
      certifications: ['CompTIA Network+', 'Cisco CCNA (ተመራጭ)'],
      technicalSkills: [
        'Structured Cabling and Cable Testing Tools (Fluke Network Tester)',
        'Switch port patching and basic VLAN assignment',
        'Wi-Fi Access Point deployment and testing',
        'Network troubleshooting (Ping, Traceroute, IPConfig)'
      ]
    },
    keyPerformanceIndicators: [
      'የተጠቃሚዎች የኬብልና የኔትወርክ ወደብ ጥያቄዎች በ1 ሰዓት ውስጥ መፈታታቸው',
      'የኔትወርክ ራክ ካቢኔቶች 100% ንጽህናና ስታንዳርድ የጠበቀ የኬብል አደረጃጀት መያዛቸው'
    ]
  },
  {
    id: 'jd-network-x',
    title: 'ጀማሪ የኔትዎርክ ባለሙያ ደረጃ X',
    titleEn: 'Junior Network Specialist Grade X',
    level: 'ደረጃ X (Grade X)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የኔትዎርክ አስተዳደር',
    reportsTo: 'ረዳት የኔትዎርክ ባለሙያ ደረጃ XI',
    jobObjective: 'ዕለታዊ የኔትወርክ መስመሮችና መሣሪያዎች ጤንነት መከታተል፣ የተጠቃሚዎች የኔትወርክ ጥሪዎችን መመዝገብ፣ መሰረታዊ የኔትወርክ ፍተሻዎችን በክትትል ስር ማከናወን።',
    duties: [
      {
        id: 'd1',
        title: 'የዕለታዊ የኔትወርክ ግንኙነት ክትትልና የጥሪዎች ምዝገባ (Helpdesk & Ticket Logging)',
        description: 'ከተጠቃሚዎች የሚመጡ የኔትወርክ መቋረጥ ጥሪዎችን መመዝገብ፣ የመጀመሪያ ደረጃ ፍተሻ ማካሄድና ለከፍተኛ ባለሙያዎች ማስተላለፍ።',
        weightPercentage: 35
      },
      {
        id: 'd2',
        title: 'የመሰረታዊ የኔትወርክ ኬብሎች ፍተሻና ዝግጅት (Patch Cord Fabrication & Cable Testing)',
        description: 'የኔትወርክ ፓች ኮርዶችን ማዘጋጀት፣ ኬብል ቴስተር በመጠቀም መስራታቸውን ማረጋገጥና ለተጠቃሚዎች ማዳረስ።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የኔትወርክ እቃዎች ኢንቬንተሪና ሰነድ አያያዝ (Inventory Assistance)',
        description: 'የተቀመጡ ስዊቾች፣ ራውተሮችና የኬብል ጥቅሎች ዝርዝር መዝገብ መያዝ እና በየወሩ ቆጠራ ማካሄድ።',
        weightPercentage: 20
      },
      {
        id: 'd4',
        title: 'የስራ ልምድ ማዳበርና ስልጠናዎችን መከታተል (Learning & Skills Development)',
        description: 'ከፍተኛ ባለሙያዎችን በመከታተል የኔትወርክ ውቅሮችን መማር እና የተሰጡ የስልጠና እቅዶችን ማጠናቀቅ።',
        weightPercentage: 20
      }
    ],
    evaluationTable: NETWORK_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(NETWORK_ADMIN_EVALUATION_TABLE),
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ፣ ኮምፒውተር ሳይንስ ወይም ተዛማጅ መስክ የመጀመሪያ ዲግሪ ወይም የኮሌጅ ዲፕሎማ',
      experience: '0 - 1 ዓመት የስራ ልምድ (Entry Level)',
      certifications: ['CompTIA IT Fundamentals / Network+ (የተመረጠ)'],
      technicalSkills: [
        'RJ45 crimping and cable testing',
        'Basic TCP/IP concepts (IP address, Subnet Mask, Gateway)',
        'Basic Windows/Linux network settings'
      ]
    },
    keyPerformanceIndicators: [
      'የተጠቃሚዎች የኔትወርክ ጥሪዎችን በወቅቱ መመዝገብና መመለስ',
      'የተሰጡ የቴክኒክ ተልእኮዎችን በታማኝነትና በወቅቱ ማከናወን'
    ]
  },

  // =========================================================================
  // 2. የዳታቤዝ አስተዳደር (Database Administration) - 4 ደረጃዎች
  // =========================================================================
  {
    id: 'jd-database-xiii',
    title: 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
    titleEn: 'Senior Database Specialist Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
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
    evaluationTable: DATABASE_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(DATABASE_ADMIN_EVALUATION_TABLE),
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
    id: 'jd-database-xii',
    title: 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
    titleEn: 'Intermediate Database Specialist Grade XII',
    level: 'ደረጃ XII (Grade XII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
    reportsTo: 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
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
    evaluationTable: DATABASE_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(DATABASE_ADMIN_EVALUATION_TABLE),
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
  {
    id: 'jd-database-xi',
    title: 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
    titleEn: 'Assistant Database Specialist Grade XI',
    level: 'ደረጃ XI (Grade XI)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
    reportsTo: 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
    jobObjective: 'የዳታቤዝ ባክአፖችን በየዕለቱ ማረጋገጥ፣ የዳታ ማስገባትና ማረም ስክሪፕቶችን ማሄድ፣ የዲስክ አጠቃቀምና የቴብልስፔስ ዕለታዊ ሪፖርት ማዘጋጀት።',
    duties: [
      {
        id: 'd1',
        title: 'ዕለታዊ የዳታ ቅጂዎች (Backup Routine) ክትትልና ማረጋገጫ',
        description: 'የዳታቤዝ ባክአፕ ስራዎች በሙሉ በትክክል መከናወናቸውን በየማለዳው ማረጋገጥና የመዝገብ ሰነድ መያዝ።',
        weightPercentage: 35
      },
      {
        id: 'd2',
        title: 'የመረጃ ቋት መጠይቆችና የዳታ ማረጋገጫ (Data Verification & Query Execution)',
        description: 'ከተፈቀዱ ክፍሎች የሚመጡ የዳታ ፍተሻ መጠይቆችን በSQL ማሄድና ውጤቱን ለሚመለከተው አካል ማቅረብ።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የቴብልስፔስና የዲስክ ቦታ ክትትል (Disk Space & Tablespace Tracking)',
        description: 'የዳታቤዝ ፋይሎች የዲስክ ሙላት ከመድረሱ በፊት ለከፍተኛ ባለሙያ ሪፖርት ማድረግ።',
        weightPercentage: 20
      },
      {
        id: 'd4',
        title: 'የዳታቤዝ ሰነዶችና የስራ መዝገቦች አያያዝ (Documentation & Audit Support)',
        description: 'የተደረጉ ለውጦችን (Change logs) መመዝገብና የመረጃ ቋት ማኑዋሎችን ማደራጀት።',
        weightPercentage: 20
      }
    ],
    evaluationTable: DATABASE_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(DATABASE_ADMIN_EVALUATION_TABLE),
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ፣ ኮምፒውተር ሳይንስ ዲፕሎማ ወይም የመጀመሪያ ዲግሪ',
      experience: 'ቢያንስ 2 ዓመት በዳታ አስተዳደር ወይም IT ድጋፍ',
      certifications: ['Oracle SQL Certified Associate', 'Microsoft SQL Fundamentals'],
      technicalSkills: ['Basic SQL querying', 'Linux file commands', 'Backup log inspection']
    },
    keyPerformanceIndicators: [
      'ዕለታዊ የባክአፕ ሪፖርት በየማለዳው በሰዓቱ ማቅረብ',
      'የዳታ ጥያቄዎችን በ1 ሰዓት ውስጥ መመለስ'
    ]
  },
  {
    id: 'jd-database-x',
    title: 'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X',
    titleEn: 'Junior Database Specialist Grade X',
    level: 'ደረጃ X (Grade X)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የዳታቤዝ አስተዳደር',
    reportsTo: 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
    jobObjective: 'የመረጃ ቋት ሁነታ ሎጎችን በየዕለቱ መመዝገብ፣ መሰረታዊ የSQL መጠይቆችን መለማመድና የዳታቤዝ ስራዎችን በክትትል ስር ማከናወን።',
    duties: [
      {
        id: 'd1',
        title: 'የዳታቤዝ ሁነታ ሎጎችና ማስጠንቀቂያዎች ምዝገባ (Alert Log Checking)',
        description: 'የዳታቤዝ Alert logs መፈተሽ፣ ያልተለመዱ መልዕክቶችን መመዝገብና ለከፍተኛ ባለሙያ ማሳወቅ።',
        weightPercentage: 35
      },
      {
        id: 'd2',
        title: 'የመሰረታዊ የዳታ ጥያቄዎች ምዝገባና ድጋፍ (User Request Logging)',
        description: 'የተጠቃሚዎችን የይለፍ ቃል መቀየርና የመዳረሻ ጥያቄዎችን ተቀብሎ በስርዓቱ መመዝገብ።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የሙከራ ዳታቤዞች ጭነትና ልምምድ (Testing & Lab Environments)',
        description: 'በሙከራ ሰርቨሮች ላይ ዳታቤዞችን መጫን፣ የSQL ትዕዛዞችን መለማመድና ራስን ማብቃት።',
        weightPercentage: 20
      },
      {
        id: 'd4',
        title: 'የቡድን ስራና የዕቅድ አፈጻጸም (Team Collaboration)',
        description: 'የዕቅድ አፈጻጸም ሪፖርቶችን ማዘጋጀትና በቡድን ስራዎች በንቃት መሳተፍ።',
        weightPercentage: 20
      }
    ],
    evaluationTable: DATABASE_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(DATABASE_ADMIN_EVALUATION_TABLE),
    requirements: {
      education: 'በኮምፒውተር ሳይንስ ወይም ኢንፎርሜሽን ቴክኖሎጂ የመጀመሪያ ዲግሪ ወይም የኮሌጅ ዲፕሎማ',
      experience: '0 - 1 ዓመት የስራ ልምድ (Entry Level)',
      certifications: ['Database Fundamentals'],
      technicalSkills: ['Basic SQL commands (SELECT, INSERT, UPDATE)', 'Basic Relational Database concepts']
    },
    keyPerformanceIndicators: [
      'የዕለታዊ ሎግ ፍተሻዎችን ያለማቋረጥ ማከናወን',
      'የአቅም ማጎልበቻ እቅዶችን በተቀመጠላቸው የጊዜ ገደብ ማጠናቀቅ'
    ]
  },

  // =========================================================================
  // 3. የሲስተም አስተዳደር (Systems Administration) - 4 ደረጃዎች
  // =========================================================================
  {
    id: 'jd-system-xiii',
    title: 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
    titleEn: 'Senior System Specialist Grade XIII',
    level: 'ደረጃ XIII (Grade XIII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
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
    evaluationTable: SYSTEM_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(SYSTEM_ADMIN_EVALUATION_TABLE),
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
    id: 'jd-system-xii',
    title: 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
    titleEn: 'Intermediate System Specialist Grade XII',
    level: 'ደረጃ XII (Grade XII)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
    reportsTo: 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
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
    evaluationTable: SYSTEM_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(SYSTEM_ADMIN_EVALUATION_TABLE),
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
  {
    id: 'jd-system-xi',
    title: 'ረዳት የሲስተም ባለሙያ ደረጃ XI',
    titleEn: 'Assistant System Specialist Grade XI',
    level: 'ደረጃ XI (Grade XI)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
    reportsTo: 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
    jobObjective: 'የሰርቨሮች ኦፕሬቲንግ ሲስተም ጭነቶችን ማከናወን፣ የተጠቃሚዎች መለያ (Active Directory Users) መክፈትና ማስተዳደር፣ የዳታ ሴንተር አካባቢ ቁጥጥር መመዝገብ።',
    duties: [
      {
        id: 'd1',
        title: 'የሰርቨር ኦፕሬቲንግ ሲስተሞች ጭነትና ዝግጅት (OS Installation & Setup)',
        description: 'Windows Server እና Linux OS በሰርቨሮችና በቨርቹዋል ማሽኖች ላይ መጫንና መሰረታዊ ውቅሮችን ማከናወን።',
        weightPercentage: 30
      },
      {
        id: 'd2',
        title: 'የተጠቃሚዎች አካውንትና ፈቃዶች አያያዝ (User Accounts & Permissions)',
        description: 'በActive Directory ውስጥ አዳዲስ ሰራተኞችን መመዝገብ፣ የይለፍ ቃል መቀየር እና የፋይል ሼሪንግ ፈቃዶችን ማስተናገድ።',
        weightPercentage: 30
      },
      {
        id: 'd3',
        title: 'የዳታ ሴንተር አካላዊ ፍተሻ (Data Center Environment Monitoring)',
        description: 'የዳታ ሴንተር የሙቀት መጠን፣ የUPS ሃይል እና የኤርኮንዲሽነሮችን በየቀኑ መፈተሽና በሎግ ቡክ መመዝገብ።',
        weightPercentage: 20
      },
      {
        id: 'd4',
        title: 'የሃርድዌር አካላት ጥገናና ምትክ (Hardware Maintenance Assistance)',
        description: 'የሰርቨር ዲስኮች (Hot-swap disks)፣ የሃይል አቅርቦቶች (PSU) ብልሽት ሲያጋጥም በክትትል ስር መቀየር።',
        weightPercentage: 20
      }
    ],
    evaluationTable: SYSTEM_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(SYSTEM_ADMIN_EVALUATION_TABLE),
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ ወይም ኮምፒውተር ሳይንስ ዲፕሎማ ወይም የመጀመሪያ ዲግሪ',
      experience: 'ቢያንስ 2 ዓመት በሲስተም ድጋፍና ሰርቨር አያያዝ',
      certifications: ['CompTIA Server+', 'Microsoft Windows Server Fundamentals'],
      technicalSkills: ['Active Directory user management', 'Windows Server & Linux basics', 'Hardware maintenance']
    },
    keyPerformanceIndicators: [
      'የተጠቃሚ አካውንት ጥያቄዎችን በ30 ደቂቃ ውስጥ ማጠናቀቅ',
      'የዳታ ሴንተር አካባቢ ቁጥጥር ሎግ በየቀኑ መያዙ'
    ]
  },
  {
    id: 'jd-system-x',
    title: 'ጀማሪ የሲስተም ባለሙያ ደረጃ X',
    titleEn: 'Junior System Specialist Grade X',
    level: 'ደረጃ X (Grade X)',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት / የሲስተም አስተዳደር',
    reportsTo: 'ረዳት የሲስተም ባለሙያ ደረጃ XI',
    jobObjective: 'ዕለታዊ የሰርቨር ሎጎችን መፈተሽ፣ የመሰረታዊ ሲስተም ችግሮችን መመዝገብና መፍታት፣ የሶፍትዌር ጭነቶችን በክትትል ስር ማከናወን።',
    duties: [
      {
        id: 'd1',
        title: 'የሲስተም ሎጎችና የሁኔታዎች ምዝገባ (System Log Auditing)',
        description: 'የሰርቨሮች Event Viewer እና System Logs መፈተሽ፣ ያልተለመዱ ስህተቶችን መመዝገብና ለቡድኑ ማሳወቅ።',
        weightPercentage: 35
      },
      {
        id: 'd2',
        title: 'የመሰረታዊ የሶፍትዌር ጭነቶችና ዝመናዎች (Basic Software Deployment)',
        description: 'አስፈላጊ የመተግበሪያ ሶፍትዌሮችን መጫን፣ አንቲቫይረስ ዝመናዎችን መፈተሽ።',
        weightPercentage: 25
      },
      {
        id: 'd3',
        title: 'የሲስተም መሳሪያዎች ኢንቬንተሪ ዝግጅት (System Asset Tracking)',
        description: 'የሰርቨሮች፣ ስቶሬጆችና ተዛማጅ እቃዎች የመለያ ቁጥሮችና የቦታ መረጃዎችን ማደራጀት።',
        weightPercentage: 20
      },
      {
        id: 'd4',
        title: 'የቴክኒክ ክህሎት ማሳደግ (Professional Growth)',
        description: 'በቨርቹዋልላይዜሽንና በክላውድ ቴክኖሎጂዎች ዙሪያ የሚሰጡ ስልጠናዎችን መከታተልና መተግበር።',
        weightPercentage: 20
      }
    ],
    evaluationTable: SYSTEM_ADMIN_EVALUATION_TABLE,
    taskCategories: convertEvaluationTableToTaskCategories(SYSTEM_ADMIN_EVALUATION_TABLE),
    requirements: {
      education: 'በኢንፎርሜሽን ቴክኖሎጂ ወይም ኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ ወይም ዲፕሎማ',
      experience: '0 - 1 ዓመት የስራ ልምድ (Entry Level)',
      certifications: ['CompTIA A+ / IT Fundamentals'],
      technicalSkills: ['Operating systems installation', 'Basic server knowledge', 'Troubleshooting methodology']
    },
    keyPerformanceIndicators: [
      'የዕለታዊ የስራ ሎጎች በትክክል መመዝገባቸው',
      'የተሰጡ የሙያ ማጎልበቻ ተግባራት በወቅቱ መከናወናቸው'
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
