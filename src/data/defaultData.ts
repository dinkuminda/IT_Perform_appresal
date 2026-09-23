import { TaskCategory, CompetencyItem, EmployeeMetadata, AppraisalRecord } from '../types/appraisal';

export const DEFAULT_CATEGORIES: TaskCategory[] = [
  {
    id: 1,
    title: 'የራሱን ዕቅድ ማዘጋጀትና መፈጸም',
    weight: 9,
    subtasks: [
      {
        subId: '1.1',
        desc: 'የቢሮውን ዕቅድ መሠረት በማድረግ የራሱን ዕቅድ ማዘጋጀት',
        criteria: [
          { id: '1.1-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '1.1-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '1.2',
        desc: 'የሥራ አፈጻጸም ሪፖርት በወቅቱ ለአቅርቦት ህብረቱ ማቅረብ',
        criteria: [
          { id: '1.2-q', type: 'ጥራት', weight: 2, rating: 3 },
          { id: '1.2-t', type: 'ጊዜ', weight: 1, rating: 3 }
        ]
      },
      {
        subId: '1.3',
        desc: 'ራሱን የሚያስደስት ዕቅድ/Self Development Plan/ ያዘጋጃል፤ ይተገብራል፤ ሌሎች ባለሙያዎችን ያበቃል፤ ስልጠና መስጠት፤',
        criteria: [
          { id: '1.3-q', type: 'ጥራት', weight: 2, rating: 3 },
          { id: '1.3-t', type: 'ጊዜ', weight: 1, rating: 3 }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'በዓለምአቀፍ ደረጃ ተደራሽ የሆነ መሠረተ ልማት አገልግሎት ጥናት፣ መዋቅርና መተግበር',
    weight: 18,
    subtasks: [
      {
        subId: '2.1',
        desc: 'የተቋሙን አገልግሎት ለማዘመን የኔትወርክ ፍላጎቶችን በጥናት መለየት፤ የጨረታ እድገትን ያገናዘበ ዲዛይን በማዘጋጀት በሁሉም የሥራ ክፍሎች የኔትወርክ ተደራሽነትን ማረጋገጥ',
        criteria: [
          { id: '2.1-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '2.1-t', type: 'ጊዜ', weight: 1, rating: 3 }
        ]
      },
      {
        subId: '2.2',
        desc: 'የተቋሙ አገልግሎት ለማፋጠን የሚረዱ አዳዲስ የኔትወርክ ዕቃዎችን በስፔሲፊኬሽን ጥናት መሠረት በማድረግ ማዘጋጀት፤',
        criteria: [
          { id: '2.2-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '2.2-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '2.3',
        desc: 'የተቋማዊ ኔትወርክ ስልጠና ፕሮግራሞችን ማዘጋጀት እና አመራርና፤ ሰራተኛ እና ለጀማሪ ባለሙያዎች የአቅም ግንባታ ስልጠና መስጠት፤',
        criteria: [
          { id: '2.3-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '2.3-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '2.4',
        desc: 'ኔትወርክ ዘርዝር የሥራ ሰነዶች (Documentation) እና የኮንፊገሬሽን መረጃ ማዘጋጀትና ማደራጀት፤',
        criteria: [
          { id: '2.4-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '2.4-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '2.5',
        desc: 'የኔትወርክ መሠረተ ልማት (ራውተሮች፣ ስዊች፣ እና የኬብሊንግ) በመመዘን እና በማዋቀር ወይም ከጋራዥ የማይቀር የድጋፍ እና ጥገና ሥራ በመስራት ድጋፍ መስጠት፤',
        criteria: [
          { id: '2.5-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '2.5-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '2.6',
        desc: 'በሙያው አማካሪ ድርጅቶች እና በወጡ አቅም የተዘጋጁ ቴክኖሎጂዎች ጥራት ደረጃቸውን መከታተል፤',
        criteria: [
          { id: '2.6-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '2.6-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'በዓለምአቀፍ ደረጃ ተደራሽ የሆነ የኢንፎርሜሽን መሠረተ ልማቶች ምርታማነትን ማረጋገጥ',
    weight: 20,
    subtasks: [
      {
        subId: '3.1',
        desc: 'በተቋሙ፡ በቅርንጫፎች፡ በኤርፖርቶች፡ በካሌዶኒያ ከተማ አስተዳደር የሲቪል ምዝገባ ተቋማት ሚሲዮኖችን የሚገኙትን ኔትወርኮች በትክክል እየሰሩ መሆናቸውን መከታተል፤',
        criteria: [
          { id: '3.1-q', type: 'ጥራት', weight: 1, rating: 4 },
          { id: '3.1-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '3.2',
        desc: 'የኔትወርክ ኮንፊገሬሽን ቅጂዎች (System State backup) ሚስጥራዊነታቸውን መጠበቅ፤ የኔትወርክ መገናኛ ዕቃዎች በሰነድ መሠረት መከታተል፤',
        criteria: [
          { id: '3.2-q', type: 'ጥራት', weight: 1, rating: 4 },
          { id: '3.2-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '3.3',
        desc: 'በተቋሙ የአገልግሎት መስጫ ቦታዎች፡ በቅርንጫፍ፡ በኤርፖርቶች፤ በሚሲዮኖች Cloud አገልግሎት ላይ የሚገኘውን ኔትወርክ ላይይቋረጥ አገልግሎት (High availability and Fault tolerance) መስጠት፤',
        criteria: [
          { id: '3.3-q', type: 'ጥራት', weight: 1, rating: 4 },
          { id: '3.3-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '3.4',
        desc: 'በዳታሴንተር ውስጥ ያሉ መሠረተ ልማት (ራውተሮች፣ ስዊቾች፣ ፋየርዎል እና ሌሎችም) ሁሉም ግድግዳ እና ሌሎችን በግልጽ ምልክት ማድረግ (labeling) ተግባራዊ ማድረግ፤',
        criteria: [
          { id: '3.4-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '3.4-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '3.5',
        desc: 'በCloud ሆነ በዳታሴንተር ውስጥ ያሉ ኔትወርክ የDisaster Recovery Site ማዘጋጀትና ተግባራዊ ማድረግ፤',
        criteria: [
          { id: '3.5-q', type: 'ጥራት', weight: 1, rating: 4 },
          { id: '3.5-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '3.6',
        desc: 'በሁሉም ቅርንጫፍ ጽ/ቤቶች፤ ድንበሮች፤ ቆንሱላዎች፤ እንደኢንተርፖል ያሉት ፕሮጀክቶች በሲቪል ምዝገባ ጣቢያዎች የኔትወርክ አገልግሎት ተደራሽ መሆኑን በጥራት መከታተልና ድጋፍ ማድረግ፤',
        criteria: [
          { id: '3.6-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '3.6-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '3.7',
        desc: 'የኔትወርክ ሀብቶች ቅድመ-ብልሽት (Preventive Maintenance) እና ድህረ-ብልሽት ጥገና (Curative Maintenance) ተግባራትን ማከናወን፤',
        criteria: [
          { id: '3.7-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '3.7-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '3.8',
        desc: 'የኔትወርክ አቅም ማሻሻል (Performance tuning)፤ አዳዲስ ኤመርጂንግ የኔትወርክ ቴክኖሎጂዎችን (AI-driven Networking, SD-WAN) መምረጥና ተግባራዊ ማድረግና መከታተል፤',
        criteria: [
          { id: '3.8-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '3.8-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'የተቋሙ ቴክኖሎጂዎች ምርታማነት የሚያረጋግጡ የአሰራር ስርዓቶች መዘርጋት',
    weight: 13,
    subtasks: [
      {
        subId: '4.1',
        desc: 'የሥራ ውጤታማነትን ለማሳደግ የአሰራር ሐሳቦችን ማመንጨት፤ መመሪያዎችን፣ ማኑዋሎችን፣ ስታንዳርዶችን ማዘጋጀት፤ እንዲሁም ምርጥ ተሞክሮዎችን በመቅሰም ማስፋፋት፤',
        criteria: [
          { id: '4.1-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '4.1-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '4.2',
        desc: 'የተቋሙ መረጃዎችን በዘመናዊ መንገድ ለመሰብሰብና ለማደራጀት የሚያስችሉ አዳዲስ የኔትወርክ አስተዳደር ስርዓት ማዘጋጀት፤ መከታተል፤',
        criteria: [
          { id: '4.2-q', type: 'ጥራት', weight: 1, rating: 4 },
          { id: '4.2-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '4.3',
        desc: 'የተቋሙ የኔትወርክ ስርዓት አስተማማኝነት፣ ደህንነቱ የተጠበቀ እና ብቃት ያለው እንዲሆን ማድረግ፤',
        criteria: [
          { id: '4.3-q', type: 'ጥራት', weight: 2, rating: 4 },
          { id: '4.3-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      },
      {
        subId: '4.4',
        desc: 'የኔትወርክ ደህንነት ፖሊሲዎችን እና የዳታ ማስተላለፍ ጥራት (Data Transfer Rates) መከታተል፤',
        criteria: [
          { id: '4.4-q', type: 'ጥራት', weight: 2, rating: 3 },
          { id: '4.4-t', type: 'ጊዜ', weight: 1, rating: 3 }
        ]
      },
      {
        subId: '4.5',
        desc: 'ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተዛማጅ ተግባራትን ማከናወን፤',
        criteria: [
          { id: '4.5-q', type: 'ጥራት', weight: 1, rating: 4 },
          { id: '4.5-t', type: 'ጊዜ', weight: 1, rating: 4 }
        ]
      }
    ]
  }
];

export const DEFAULT_COMPETENCIES: CompetencyItem[] = [
  {
    id: 'c1',
    name: 'አገር ወዳድነት',
    nameEn: 'Patriotism & Institutional Commitment',
    weight: 25,
    rating: 4,
    notes: 'የተቋሙን ተልዕኮ በከፍተኛ ተነሳሽነትና ቁርጠኝነት ይደግፋል፤ የተቋሙን ሀብት በአግባቡ ይጠብቃል።'
  },
  {
    id: 'c2',
    name: 'የታማኝነት/የተሟላ ስብዕና /Integrity/',
    nameEn: 'Integrity & Ethical Conduct',
    weight: 25,
    rating: 4,
    notes: 'ከፍተኛ የስነ-ምግባር ደረጃ ያለው፣ ለስራው ታማኝ እና ግልጽነትን የሚያሰፍን።'
  },
  {
    id: 'c3',
    name: 'ሙያዊ እውቀትና ችሎታ /Professionalism/',
    nameEn: 'Professionalism & Technical Competence',
    weight: 25,
    rating: 4,
    notes: 'በኔትወርክና መሰረተ ልማት ቴክኖሎጂዎች የላቀ ሙያዊ ብቃትና ወቅታዊ እውቀት አለው።'
  },
  {
    id: 'c4',
    name: 'ተባብሮ የመሥራት ልምድና ችሎታ /Team Spirit/',
    nameEn: 'Collaboration & Team Spirit',
    weight: 25,
    rating: 3,
    notes: 'ከቡድን አባላትና ከቅርንጫፍ ባለሙያዎች ጋር በመተባበር የጋራ ግቦችን ለማሳካት በቁርጠኝነት ይሰራል፤ ማስተባበር ላይ ተጨማሪ እድገት ይታያል።'
  }
];

export const DEFAULT_METADATA: EmployeeMetadata = {
  empName: 'ሊዲያ ግሩም ገብረስላሴ',
  empId: 'ICS-IT-0482',
  empDept: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  empPosition: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  evalPeriod: 'ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም',
  supervisorName: 'ምንዳዬ ሀይሌ',
  evalDate: '2026-06-30',
  evalType: 'half-year'
};

export const SAMPLE_APPRAISAL: AppraisalRecord = {
  id: 'appraisal-lydia-2018',
  createdAt: '2026-06-30T09:00:00.000Z',
  updatedAt: '2026-06-30T10:30:00.000Z',
  metadata: DEFAULT_METADATA,
  categories: DEFAULT_CATEGORIES,
  competencies: DEFAULT_COMPETENCIES,
  supervisorComments: 'ሰራተኛዋ የተጣለባትን የኔትወርክ ማሻሻያ እና የዳታ ሴንተር አስተዳደር ስራዎችን በላቀ ብቃትና በጥራት አከናውናለች። በሁሉም ቅርንጫፎች ተደራሽነትን በማረጋገጥ ከፍተኛ ሚና ተጫውታለች።',
  employeeComments: 'በግምገማው ወቅት የተሰጡኝን አስተያየቶችና ግብረ-መልሶችን ሙሉ በሙሉ እስማማበታለሁ። በቀጣዩ የምዘና ወቅት የቡድን አሰራርንና የኔትወርክ ሰነዶች ማደራጀትን ይበልጥ አጠናክሬ እቀጥላለሁ።',
  supervisorSigned: true,
  employeeSigned: true,
  supervisorSignDate: '2026-06-30',
  employeeSignDate: '2026-06-30',
  approvalStatus: 'approved'
};
