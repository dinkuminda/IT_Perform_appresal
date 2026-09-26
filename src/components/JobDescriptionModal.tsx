import React, { useState, useEffect } from 'react';
import { JobDescription, JobDuty, EvaluationCategoryItem } from '../types/jobDescription';
import { Language } from '../utils/i18n';
import { convertEvaluationTableToTaskCategories } from '../utils/calculations';
import { 
  X, 
  Plus, 
  Trash2, 
  Briefcase, 
  Check, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Award,
  Sparkles,
  Table,
  Building,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { 
  DEFAULT_JOB_DESCRIPTIONS, 
  NETWORK_ADMIN_EVALUATION_TABLE, 
  DATABASE_ADMIN_EVALUATION_TABLE, 
  SYSTEM_ADMIN_EVALUATION_TABLE 
} from '../data/extraModulesData';
import { OFFICIAL_STAFF_POSITIONS } from '../data/officialStaffPositions';

interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jd: JobDescription) => void;
  initialData?: JobDescription | null;
  departments: string[];
  lang: Language;
}

// Standard Department Categories
const CORE_IT_DEPARTMENTS = [
  'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
  'የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን',
  'የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን',
  'የኔትዎርክ አስተዳደር (Network Administration)',
  'የዳታቤዝ አስተዳደር (Database Administration)',
  'የሲስተም አስተዳደር (System Administration)'
];

const OTHER_DEPARTMENTS = [
  'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
  'የሶፍትዌር ልማትና አስተዳደር የስራ ክፍል',
  'የኢንፎርሜሽን ደህንነት አስተዳደር የስራ ክፍል',
  'የሃርድዌር እና መሠረተ-ልማት ጥገና የስራ ክፍል',
  'የኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ (ICT) የስራ ክፍል',
  'የሰው ኃይል ልማትና አስተዳደር ዳይሬክቶሬት',
  'የፋይናንስና ግዥ አስተዳደር ዳይሬክቶሬት'
];

// Official Role Options per IT Department
const OFFICIAL_NETWORK_ROLES = [
  'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
  'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII',
  'ረዳት የኔትወርክ ባለሙያ ደረጃ XI',
  'ጀማሪ የኔትወርክ ባለሙያ ደረጃ X'
];

const OFFICIAL_DATABASE_ROLES = [
  'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
  'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
  'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
  'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X'
];

const OFFICIAL_SYSTEM_ROLES = [
  'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
  'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
  'ረዳት የሲስተም ባለሙያ ደረጃ XI',
  'ጀማሪ የሲስተም ባለሙያ ደረጃ X'
];

const DEFAULT_EVAL_CATEGORIES: EvaluationCategoryItem[] = [
  {
    no: 1,
    expectedResult: 'የራስን እቅድ ማቀድና መፈፀም፤ 10%',
    weight: 10,
    tasks: [
      { code: '1.1', description: 'የክክለቶችን ዕቅድ መሠረት በማድረግ የራስን ዕቅድ ማዘጋጀት', weight: 4 },
      { code: '1.2', description: 'የእቅድ አፈጻጸም ሪፖርት በወቅቱ አቅርቦ ሀላፊው ማቅረብ', weight: 3 },
      { code: '1.3', description: 'ራስን የማጎልበቻ እቅድ/Self Development Plan/ ያቅዳል፤ ይተገብራል፤ ለሌሎች ባለሙያዎች ያበቃል፤ ስልጠና መስጠት፤', weight: 3 }
    ]
  },
  {
    no: 2,
    expectedResult: 'የተቋሙ ቴክኖሎጂዎች ውጤታማነት የሚያረጋግጥ የአሰራር ስርዓት መዘርጋት 10%',
    weight: 10,
    tasks: [
      { code: '2.1', description: 'ስራዎችን ውጤታማ ለማድረግ የሚረዱ ዓለም አቀፍ ምርጥ ተሞክሮዎችን መቀመርና ማስፋፋት፤', weight: 4 },
      { code: '2.2', description: 'የተቋሙን ስራዎች በዘመናዊ መንገድ ለማስተዳደር የሚያግዙ አዳዲስ አሰራር ስልቶችን መከታተልና መተግበር', weight: 3 },
      { code: '2.3', description: 'የአደጋ ጊዜ መውጫና የስራ ማስቀጠያ (Disaster Recovery & Business Continuity) አሰራር መዘርጋትና መከታተል፤', weight: 3 }
    ]
  },
  {
    no: 3,
    expectedResult: 'በአለምአቀፍ ደረጃ ተደራሽ የሆነ መሰረተ ልማት አገልግሎት በጥናት መለየትና መተግበር 20%',
    weight: 20,
    tasks: [
      { code: '3.1', description: 'የተቋሙን አገልግሎት ለማቀላጠፍና ለማዘመን የሚረዱ አዳዲስ የቴክኖሎጂ ፍላጎቶችን በጥናት መለየት፤', weight: 5 },
      { code: '3.2', description: 'የቴክኖሎጂ መሰረተ ልማትና እቃዎች የግዥ ስፔስፊኬሽን ስንድ በጥናት ማዘጋጀት፤', weight: 5 },
      { code: '3.3', description: 'ለቅርንጫፍና ለዋና መስሪያ ቤት ረዳትና ጀማሪ ባለሙያዎች የቴክኒክ ድጋፍና ስልጠና መስጠት፤', weight: 5 },
      { code: '3.4', description: 'በውጭ አማካሪ ድርጅቶች እና በውስጥ አቅም የተዘጋጁ ቴክኖሎጂዎች ጥራት በሙከራ ጥናት ማረጋገጥ፤', weight: 5 }
    ]
  },
  {
    no: 4,
    expectedResult: 'በአለምአቀፍ ደረጃ ተደራሽ የሆነ የኢፎርሜሽን ቴክኖሎጂ መሰረተ ልማት ውጤታማ ማድረግ 20%',
    weight: 20,
    tasks: [
      { code: '4.1', description: 'በዋናው መ/ቤትና በቅርንጫፎች የሚገኙ ቴክኖሎጂዎች በትክክል መስራታቸውን መከታተልና ያልተቋረጠ አገልግሎት መስጠት፤', weight: 5 },
      { code: '4.2', description: 'የመረጃ ቅጂ (Backup) ሚስጢራዊነቱን ጠብቆ መያዙንና ወደ ሲስተም መመለሱን (Restore) ማረጋገጥ፤', weight: 5 },
      { code: '4.3', description: 'የአቅም ማሻሻል (Performance tuning)፣ የደህንነት ፖሊሲዎችን ማስተዳደርና ብልሽቶችን መከላከል፤', weight: 5 },
      { code: '4.4', description: 'ከቅርብ ኃላፊዎች የሚሰጡ ሌሎች ተልእኮዎችን በአስተማማኝ ሁኔታ ማከናወን፤', weight: 5 }
    ]
  }
];

export const JobDescriptionModal: React.FC<JobDescriptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  departments,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'duties' | 'evaluation' | 'requirements'>('general');
  const [title, setTitle] = useState(initialData?.title || '');
  const [titleEn, setTitleEn] = useState(initialData?.titleEn || '');
  const [department, setDepartment] = useState(
    initialData?.department || 'የኔትዎርክ አስተዳደር (Network Administration)'
  );
  const [customDept, setCustomDept] = useState('');
  const [isCustomDept, setIsCustomDept] = useState(false);
  const [selectedRoleOption, setSelectedRoleOption] = useState<string>(initialData?.title || '');
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [customRoleTitle, setCustomRoleTitle] = useState('');
  const [level, setLevel] = useState(initialData?.level || 'ደረጃ XIII (Grade XIII)');
  const [reportsTo, setReportsTo] = useState(initialData?.reportsTo || 'የኔትወርክ አስተዳደር ቡድን መሪ');
  const [jobObjective, setJobObjective] = useState(initialData?.jobObjective || '');
  const [autoAdjustNotice, setAutoAdjustNotice] = useState<string | null>(null);
  
  // Duties (100%)
  const [duties, setDuties] = useState<JobDuty[]>(
    initialData?.duties?.length
      ? initialData.duties
      : [
          {
            id: 'd1',
            title: 'የቴክኖሎጂ መሰረተ ልማት አርክቴክቸርና አስተዳደር',
            description: 'የስራ ክፍሉን ዋና ዋና ቴክኖሎጂዎች ማቀድ፣ ማዋቀር፣ ማስተዳደር እና ተደራሽነታቸውን ማረጋገጥ።',
            weightPercentage: 30
          },
          {
            id: 'd2',
            title: 'የአፈጻጸም ክትትልና ማሻሻያ (Performance Tuning)',
            description: 'የትራፊክና የሃብቶች አጠቃቀምን መከታተል፣ ማነቆዎችን መፍታትና አቅምን ማሳደግ።',
            weightPercentage: 25
          },
          {
            id: 'd3',
            title: 'የመረጃ ቅጂና የአደጋ ጊዜ ማገገሚያ (Disaster Recovery)',
            description: 'አስተማማኝ የመረጃ ቅጂዎችን መያዝ እና የማገገሚያ ሙከራዎችን ማከናወን።',
            weightPercentage: 25
          },
          {
            id: 'd4',
            title: 'የደህንነት፣ ፈቃዶችና የተጠቃሚዎች ድጋፍ',
            description: 'የደህንነት ህጎችን ማክበር፣ ፈቃዶችን መቆጣጠር እና የቴክኒክ ድጋፍ መስጠት።',
            weightPercentage: 20
          }
        ]
  );

  // Evaluation Table (60%)
  const [evaluationTable, setEvaluationTable] = useState<EvaluationCategoryItem[]>(
    initialData?.evaluationTable?.length ? initialData.evaluationTable : DEFAULT_EVAL_CATEGORIES
  );

  // Requirements
  const [education, setEducation] = useState(
    initialData?.requirements?.education || 'በኮምፒውተር ሳይንስ፣ በሶፍትዌር ምህንድስና፣ በኢንፎርሜሽን ቴክኖሎጂ ወይም በተመሳሳይ መስክ የመጀመሪያ ወይም ሁለተኛ ዲግሪ'
  );
  const [experience, setExperience] = useState(
    initialData?.requirements?.experience || 'ቢያንስ 6 ዓመት አግባብነት ባለው የኢንፎርሜሽን ቴክኖሎጂ የስራ ዘርፍ ቀጥተኛ የስራ ልምድ'
  );
  const [certificationsText, setCertificationsText] = useState(
    initialData?.requirements?.certifications?.join(', ') || ''
  );
  const [technicalSkillsText, setTechnicalSkillsText] = useState(
    initialData?.requirements?.technicalSkills?.join(', ') || ''
  );

  // KPIs
  const [kpis, setKpis] = useState<string[]>(
    initialData?.keyPerformanceIndicators?.length
      ? initialData.keyPerformanceIndicators
      : [
          'የሲስተም / የቴክኖሎጂ ያልተቋረጠ አገልግሎት መስጠት ምጣኔ (Uptime >= 99.8%)',
          'የአደጋ ጊዜ ማገገሚያ (RTO / RPO) ስኬት ምጣኔ 100% መሆኑ',
          'የደህንነት ፓቾችና ዝመናዎች በወቅቱ መተግበራቸው (Compliance 100%)',
          'የተገልጋዮች የቴክኒክ ድጋፍ ጥያቄዎች በSLA መሰረት ምላሽ ማግኘታቸው'
        ]
  );

  // Title Normalizer to handle ኔትወርክ vs ኔትዎርክ flexibly
  const normalizeTitle = (str: string) =>
    (str || '').replace(/ዎ/g, 'ወ').replace(/\s+/g, ' ').trim();

  const STANDARD_ROLE_OPTIONS = [
    'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
    'መካከለኛ የኔትወርክ ባለሙያ ደረጃ XII',
    'ረዳት የኔትወርክ ባለሙያ ደረጃ XI',
    'ጀማሪ የኔትወርክ ባለሙያ ደረጃ X',
    'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII',
    'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII',
    'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI',
    'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X',
    'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII',
    'መካከለኛ የሲስተም ባለሙያ ደረጃ XII',
    'ረዳት የሲስተም ባለሙያ ደረጃ XI',
    'ጀማሪ የሲስተም ባለሙያ ደረጃ X'
  ];

  const resolveTitleDropdownValue = (currentTitle: string) => {
    if (isCustomRole) return '__custom_role__';
    if (!currentTitle) return '';
    const norm = normalizeTitle(currentTitle);
    const matched = STANDARD_ROLE_OPTIONS.find((opt) => normalizeTitle(opt) === norm);
    if (matched) return matched;
    return currentTitle;
  };

  // Reset or Populate on initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setTitleEn(initialData.titleEn || '');
      setDepartment(initialData.department);
      setLevel(initialData.level);
      setReportsTo(initialData.reportsTo);
      setJobObjective(initialData.jobObjective);
      setDuties(initialData.duties || []);
      setEvaluationTable(initialData.evaluationTable || DEFAULT_EVAL_CATEGORIES);
      setEducation(initialData.requirements?.education || '');
      setExperience(initialData.requirements?.experience || '');
      setCertificationsText(initialData.requirements?.certifications?.join(', ') || '');
      setTechnicalSkillsText(initialData.requirements?.technicalSkills?.join(', ') || '');
      setKpis(initialData.keyPerformanceIndicators || []);
      setSelectedRoleOption(initialData.title);
      setIsCustomRole(false);
    } else {
      setTitle('');
      setTitleEn('');
      setDepartment('የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን');
      setLevel('ደረጃ XIII (Grade XIII)');
      setReportsTo('የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን ኃላፊ');
      setJobObjective('');
      setSelectedRoleOption('');
      setIsCustomRole(false);
      setAutoAdjustNotice(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Department Type detector
  const isNetworkDept = department.includes('ኔትዎርክ') || department.includes('ኔትወርክ') || department.toLowerCase().includes('network');
  const isDatabaseDept = department.includes('ዳታቤዝ') || department.toLowerCase().includes('database');
  const isSystemDept = department.includes('ሲስተም') || department.toLowerCase().includes('system');

  // Determine which official roles to list in the dropdown
  const getRolesForDepartment = () => {
    if (isNetworkDept) return OFFICIAL_NETWORK_ROLES;
    if (isDatabaseDept) return OFFICIAL_DATABASE_ROLES;
    if (isSystemDept) return OFFICIAL_SYSTEM_ROLES;
    return [];
  };

  // Adjust entire job description based on selected official role
  const handleSelectOfficialRole = (roleTitle: string) => {
    setSelectedRoleOption(roleTitle);

    if (!roleTitle) {
      setTitle('');
      setTitleEn('');
      setAutoAdjustNotice(null);
      return;
    }

    if (roleTitle === '__custom_role__') {
      setIsCustomRole(true);
      setTitle('');
      setTitleEn('');
      setAutoAdjustNotice(null);
      return;
    }

    setIsCustomRole(false);
    // Always set the selected title immediately so the dropdown stays selected
    setTitle(roleTitle);

    const norm = normalizeTitle(roleTitle);

    // 1. Check in DEFAULT_JOB_DESCRIPTIONS first for full pre-configured JD
    const foundJd = DEFAULT_JOB_DESCRIPTIONS.find(
      (j) => normalizeTitle(j.title) === norm
    );
    // 2. Check in OFFICIAL_STAFF_POSITIONS
    const foundPos = OFFICIAL_STAFF_POSITIONS.find(
      (p) => normalizeTitle(p.titleAm) === norm
    );

    if (foundJd) {
      setTitleEn(foundJd.titleEn);
      setLevel(foundJd.level);
      setReportsTo(foundJd.reportsTo);
      setJobObjective(foundJd.jobObjective);
      setDuties(foundJd.duties);
      setEvaluationTable(foundJd.evaluationTable);
      if (foundJd.requirements) {
        setEducation(foundJd.requirements.education || '');
        setExperience(foundJd.requirements.experience || '');
        setCertificationsText(foundJd.requirements.certifications?.join(', ') || '');
        setTechnicalSkillsText(foundJd.requirements.technicalSkills?.join(', ') || '');
      }
      setKpis(foundJd.keyPerformanceIndicators || []);

      setAutoAdjustNotice(
        lang === 'am'
          ? `✨ ለ"${roleTitle}" ይፋዊ የሥራ ዝርዝር (100%)፣ የምዘና ሰንጠረዥ (60%) እና መስፈርቶች በራስ-ሰር ተስተካክለው ተሞልተዋል!`
          : `✨ Official duties (100%), evaluation table (60%), and requirements loaded for "${roleTitle}"!`
      );
    } else if (foundPos) {
      setTitleEn(foundPos.titleEn);
      const gradeToLevel: Record<string, string> = {
        'ደረጃ XIII': 'ደረጃ XIII (Grade XIII)',
        'ደረጃ XII': 'ደረጃ XII (Grade XII)',
        'ደረጃ XI': 'ደረጃ XI (Grade XI)',
        'ደረጃ X': 'ደረጃ X (Grade X)'
      };
      setLevel(gradeToLevel[foundPos.grade] || foundPos.grade);
      setReportsTo(foundPos.reportsToAm);
      setJobObjective(foundPos.jobObjectiveAm);

      // Appropriate evaluation table
      if (foundPos.category === 'network') {
        setEvaluationTable(NETWORK_ADMIN_EVALUATION_TABLE);
      } else if (foundPos.category === 'database') {
        setEvaluationTable(DATABASE_ADMIN_EVALUATION_TABLE);
      } else if (foundPos.category === 'system') {
        setEvaluationTable(SYSTEM_ADMIN_EVALUATION_TABLE);
      }

      setAutoAdjustNotice(
        lang === 'am'
          ? `✨ ለ"${roleTitle}" ይፋዊ መረጃዎችና የምዘና ሰንጠረዥ በራስ-ሰር ተስተካክለው ተሞልተዋል!`
          : `✨ Official job details & matrix loaded for "${roleTitle}"!`
      );
    } else {
      setAutoAdjustNotice(null);
    }
  };

  // Handle department change
  const handleDepartmentChange = (newDept: string) => {
    if (newDept === '__custom__') {
      setIsCustomDept(true);
      return;
    }
    setIsCustomDept(false);
    setDepartment(newDept);

    // If changing to Network/Database/System and currently on an empty or default title, offer auto-selecting top position
    if (newDept.includes('ኔትዎርክ') || newDept.includes('ኔትወርክ') || newDept.toLowerCase().includes('network')) {
      handleSelectOfficialRole('ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII');
    } else if (newDept.includes('ዳታቤዝ') || newDept.toLowerCase().includes('database')) {
      handleSelectOfficialRole('ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII');
    } else if (newDept.includes('ሲስተም') || newDept.toLowerCase().includes('system')) {
      handleSelectOfficialRole('ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII');
    }
  };

  // Duty handlers
  const handleAddDuty = () => {
    const newId = `duty-${Date.now()}`;
    setDuties([...duties, { id: newId, title: '', description: '', weightPercentage: 15 }]);
  };

  const handleUpdateDuty = (index: number, field: keyof JobDuty, value: any) => {
    const updated = [...duties];
    updated[index] = { ...updated[index], [field]: value };
    setDuties(updated);
  };

  const handleRemoveDuty = (index: number) => {
    if (duties.length <= 1) return;
    setDuties(duties.filter((_, i) => i !== index));
  };

  // KPI handlers
  const handleAddKpi = () => {
    setKpis([...kpis, '']);
  };

  const handleUpdateKpi = (index: number, val: string) => {
    const updated = [...kpis];
    updated[index] = val;
    setKpis(updated);
  };

  const handleRemoveKpi = (index: number) => {
    setKpis(kpis.filter((_, i) => i !== index));
  };

  // Evaluation Table handlers
  const handleUpdateCategoryExpectedResult = (catIdx: number, val: string) => {
    const updated = [...evaluationTable];
    updated[catIdx] = { ...updated[catIdx], expectedResult: val };
    setEvaluationTable(updated);
  };

  const handleUpdateTask = (catIdx: number, taskIdx: number, field: 'description' | 'weight', val: any) => {
    const updated = [...evaluationTable];
    const cat = { ...updated[catIdx] };
    const tasks = [...cat.tasks];
    tasks[taskIdx] = { ...tasks[taskIdx], [field]: field === 'weight' ? Number(val) || 0 : val };
    cat.tasks = tasks;
    updated[catIdx] = cat;
    setEvaluationTable(updated);
  };

  const handleAddTaskToCategory = (catIdx: number) => {
    const updated = [...evaluationTable];
    const cat = { ...updated[catIdx] };
    const newCode = `${cat.no}.${cat.tasks.length + 1}`;
    cat.tasks = [...cat.tasks, { code: newCode, description: '', weight: 3 }];
    updated[catIdx] = cat;
    setEvaluationTable(updated);
  };

  const handleRemoveTaskFromCategory = (catIdx: number, taskIdx: number) => {
    const updated = [...evaluationTable];
    const cat = { ...updated[catIdx] };
    if (cat.tasks.length <= 1) return;
    cat.tasks = cat.tasks.filter((_, i) => i !== taskIdx);
    updated[catIdx] = cat;
    setEvaluationTable(updated);
  };

  // Calculations
  const totalDutyWeight = duties.reduce((sum, d) => sum + (Number(d.weightPercentage) || 0), 0);
  const totalEvalWeight = evaluationTable.reduce(
    (sum, cat) => sum + cat.tasks.reduce((tSum, t) => tSum + (Number(t.weight) || 0), 0),
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = isCustomRole && customRoleTitle.trim() ? customRoleTitle.trim() : title.trim();
    if (!finalTitle) {
      alert(lang === 'am' ? 'እባክዎ የስራ መደቡን መጠሪያ ያስገቡ' : 'Please provide a job title');
      setActiveTab('general');
      return;
    }

    const finalDept = isCustomDept && customDept.trim() ? customDept.trim() : department;
    const certs = certificationsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const skills = technicalSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const filteredKpis = kpis.map((k) => k.trim()).filter(Boolean);

    const compiledTaskCategories = convertEvaluationTableToTaskCategories(evaluationTable);

    const newJd: JobDescription = {
      id: initialData?.id || `jd-custom-${Date.now()}`,
      title: finalTitle,
      titleEn: titleEn.trim() || finalTitle,
      level: level.trim(),
      department: finalDept,
      reportsTo: reportsTo.trim(),
      jobObjective: jobObjective.trim(),
      duties: duties.filter((d) => d.title.trim()),
      evaluationTable,
      taskCategories: compiledTaskCategories,
      requirements: {
        education: education.trim(),
        experience: experience.trim(),
        certifications: certs,
        technicalSkills: skills.length ? skills : ['Enterprise IT', 'Systems Operations', 'Technical Documentation']
      },
      keyPerformanceIndicators: filteredKpis.length ? filteredKpis : ['የስራ ክፍሉን ዕቅድ በ100% ማሳካት'],
      isCustom: true
    };

    onSave(newJd);
    onClose();
  };

  const roleOptionsForCurrentDept = getRolesForDepartment();

  // Combine passed departments with standard lists to avoid duplicates
  const allDeptOptions = Array.from(
    new Set([
      ...CORE_IT_DEPARTMENTS,
      ...OTHER_DEPARTMENTS,
      ...departments
    ])
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {initialData
                  ? (lang === 'am' ? 'የስራ መደብ መግለጫ አርትዕ' : 'Edit Job Description')
                  : (lang === 'am' ? 'አዲስ የስራ መደብ መግለጫ መዝግብ' : 'Add New Job Description')}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'am'
                  ? 'የስራ ክፍሉን መደብ ይምረጡ፤ ይፋዊ የስራ ዝርዝሮች (100%) እና የ60% ምዘና ሰንጠረዥ በራስ-ሰር ይሞላሉ'
                  : 'Select department and official position to auto-load 100% duties and 60% evaluation table'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-white gap-2 sm:gap-6 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 px-2 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'general'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'አጠቃላይ መረጃ' : 'General Info'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('duties')}
            className={`py-3 px-2 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'duties'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'ዋና ዋና ተግባራት (100%)' : 'Duties & Responsibilities'}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                totalDutyWeight === 100
                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                  : 'bg-amber-100 text-amber-800 font-bold'
              }`}
            >
              {totalDutyWeight}%
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('evaluation')}
            className={`py-3 px-2 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'evaluation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'ይፋዊ የምዘና ሰንጠረዥ (60%)' : 'Evaluation Matrix (60%)'}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                totalEvalWeight === 60
                  ? 'bg-blue-100 text-blue-800 font-bold'
                  : 'bg-amber-100 text-amber-800 font-bold'
              }`}
            >
              {totalEvalWeight}/60
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('requirements')}
            className={`py-3 px-2 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'requirements'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'መስፈርቶችና KPIs' : 'Requirements & KPIs'}</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: General Info */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              {/* Notification Banner when template is adjusted */}
              {autoAdjustNotice && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs font-semibold animate-in fade-in duration-150">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{autoAdjustNotice}</span>
                </div>
              )}

              {/* Department Dropdown */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                    <span>{lang === 'am' ? 'የስራ ክፍል (Department) *' : 'Department *'}</span>
                    <span className="text-[10px] text-blue-600 font-normal">
                      {lang === 'am' ? 'የተዘጋጁ ክፍሎችና ዲቪዥኖች' : 'Pre-configured divisions'}
                    </span>
                  </label>
                  {!isCustomDept ? (
                    <select
                      value={department}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                    >
                      <optgroup label="🏢 ይፋዊ ዲቪዥኖችና የቴክኖሎጂ ክፍሎች (IT Divisions & Departments)">
                        {CORE_IT_DEPARTMENTS.map((deptName) => (
                          <option key={deptName} value={deptName}>
                            {deptName}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🏛️ ሌሎች የስራ ክፍሎች (Other Departments)">
                        {OTHER_DEPARTMENTS.map((deptName) => (
                          <option key={deptName} value={deptName}>
                            {deptName}
                          </option>
                        ))}
                        {departments
                          .filter((d) => !CORE_IT_DEPARTMENTS.includes(d) && !OTHER_DEPARTMENTS.includes(d))
                          .map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                      </optgroup>
                      <option value="__custom__">
                        {lang === 'am' ? '+ ሌላ አዲስ የስራ ክፍል ጻፍ (Custom)...' : '+ Write Custom Department...'}
                      </option>
                    </select>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customDept}
                        onChange={(e) => setCustomDept(e.target.value)}
                        placeholder="አዲሱን የስራ ክፍል ስም ጻፍ..."
                        className="w-full text-xs p-2.5 rounded-xl border border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomDept(false)}
                        className="px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-xl transition cursor-pointer"
                      >
                        {lang === 'am' ? 'ተመለስ' : 'List'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Job Title Amharic - Categorized Dropdown matching user screenshot */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      {lang === 'am' ? 'የስራ መደቡ መጠሪያ (በአማርኛ) *' : 'Job Title (Amharic) *'}
                    </label>
                    {isCustomRole ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomRole(false);
                          handleSelectOfficialRole('ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII');
                        }}
                        className="text-[10px] text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        {lang === 'am' ? 'ከይፋዊ ዝርዝር ምረጥ' : 'Select from Official List'}
                      </button>
                    ) : (
                      title && (
                        <button
                          type="button"
                          onClick={() => {
                            setTitle('');
                            setTitleEn('');
                            setSelectedRoleOption('');
                          }}
                          className="text-[10px] text-rose-600 hover:underline font-semibold cursor-pointer"
                        >
                          {lang === 'am' ? 'አስወግድ' : 'Clear'}
                        </button>
                      )
                    )}
                  </div>

                  {!isCustomRole ? (
                    <select
                      value={resolveTitleDropdownValue(title)}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '__custom_role__') {
                          setIsCustomRole(true);
                          setTitle('');
                          return;
                        }
                        if (!val) {
                          setTitle('');
                          setTitleEn('');
                          setSelectedRoleOption('');
                          return;
                        }
                        handleSelectOfficialRole(val);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-900 cursor-pointer"
                    >
                      <option value="">-- የስራ መደብ የለም / አስወግድ --</option>
                      <optgroup label="🌐 የኔትዎርክ አስተዳደር (Network Administration)">
                        <option value="ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII">ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII</option>
                        <option value="መካከለኛ የኔትወርክ ባለሙያ ደረጃ XII">መካከለኛ የኔትወርክ ባለሙያ ደረጃ XII</option>
                        <option value="ረዳት የኔትወርክ ባለሙያ ደረጃ XI">ረዳት የኔትወርክ ባለሙያ ደረጃ XI</option>
                        <option value="ጀማሪ የኔትወርክ ባለሙያ ደረጃ X">ጀማሪ የኔትወርክ ባለሙያ ደረጃ X</option>
                      </optgroup>
                      <optgroup label="💾 የዳታቤዝ አስተዳደር (Database Administration)">
                        <option value="ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII">ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII</option>
                        <option value="መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII">መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII</option>
                        <option value="ረዳት የዳታቤዝ ባለሙያ ደረጃ XI">ረዳት የዳታቤዝ ባለሙያ ደረጃ XI</option>
                        <option value="ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X">ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X</option>
                      </optgroup>
                      <optgroup label="🖥️ የሲስተም አስተዳደር (System Administration)">
                        <option value="ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII">ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII</option>
                        <option value="መካከለኛ የሲስተም ባለሙያ ደረጃ XII">መካከለኛ የሲስተም ባለሙያ ደረጃ XII</option>
                        <option value="ረዳት የሲስተም ባለሙያ ደረጃ XI">ረዳት የሲስተም ባለሙያ ደረጃ XI</option>
                        <option value="ጀማሪ የሲስተም ባለሙያ ደረጃ X">ጀማሪ የሲስተም ባለሙያ ደረጃ X</option>
                      </optgroup>
                      {title &&
                        !STANDARD_ROLE_OPTIONS.some(
                          (opt) => normalizeTitle(opt) === normalizeTitle(title)
                        ) && (
                          <optgroup label="ሌላ / የተለየ የስራ መደብ">
                            <option value={title}>{title}</option>
                          </optgroup>
                        )}
                      <option value="__custom_role__">
                        {lang === 'am' ? '+ ሌላ አዲስ የስራ መደብ ጻፍ (Custom Role)...' : '+ Write Custom Job Title...'}
                      </option>
                    </select>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          setCustomRoleTitle(e.target.value);
                        }}
                        placeholder="ምሳሌ፡ ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII"
                        className="w-full text-xs p-2.5 rounded-xl border border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomRole(false)}
                        className="px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-xl transition cursor-pointer shrink-0"
                      >
                        {lang === 'am' ? 'ዝርዝር' : 'List'}
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Job Title English */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'am' ? 'የስራ መደቡ መጠሪያ (በእንግሊዝኛ)' : 'Job Title (English)'}
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g., Senior Network Specialist Grade XIII"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Grade and Reports To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'am' ? 'ደረጃ (Grade / Level)' : 'Job Level'}
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="ደረጃ XIII (Grade XIII)">ደረጃ XIII (Grade XIII)</option>
                    <option value="ደረጃ XII (Grade XII)">ደረጃ XII (Grade XII)</option>
                    <option value="ደረጃ XI (Grade XI)">ደረጃ XI (Grade XI)</option>
                    <option value="ደረጃ X (Grade X)">ደረጃ X (Grade X)</option>
                    <option value="ደረጃ XIV (Grade XIV)">ደረጃ XIV (Grade XIV)</option>
                    <option value="ደረጃ IX (Grade IX)">ደረጃ IX (Grade IX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'am' ? 'ሪፖርት የሚያደርገው ለ' : 'Reports To'}
                  </label>
                  <input
                    type="text"
                    value={reportsTo}
                    onChange={(e) => setReportsTo(e.target.value)}
                    placeholder="ምሳሌ፡ የኔትወርክ አስተዳደር ቡድን መሪ"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Job Purpose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'am' ? 'የስራ መደቡ ዋና ዓላማ (Job Purpose / Objective) *' : 'Job Purpose *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={jobObjective}
                  onChange={(e) => setJobObjective(e.target.value)}
                  placeholder="የስራ መደቡ ዋና አላማና የተቋሙን ተልዕኮ የሚያሳካበት መንገድ..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Duties (100%) */}
          {activeTab === 'duties' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {lang === 'am' ? 'ዋና ዋና ተግባራትና ኃላፊነቶች (ድምር 100%)' : 'Core Duties & Responsibilities (100%)'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'am'
                      ? 'የእያንዳንዱ ተግባር ክብደት በመቶኛ (%) ድምር በትክክል 100% መሆን አለበት'
                      : 'The sum of weights must equal 100%'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold font-mono ${
                      totalDutyWeight === 100
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    ድምር፡ {totalDutyWeight}% {totalDutyWeight === 100 ? '✓' : '(100 መሆን አለበት)'}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddDuty}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'ተግባር ጨምር' : 'Add Duty'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {duties.map((duty, idx) => (
                  <div
                    key={duty.id || idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 space-y-2 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 w-6">#{idx + 1}</span>
                      <input
                        type="text"
                        required
                        value={duty.title}
                        onChange={(e) => handleUpdateDuty(idx, 'title', e.target.value)}
                        placeholder="የተግባሩ አርእስት (ምሳሌ፡ የኮር ኔትወርክ አርክቴክቸር)"
                        className="flex-1 text-xs p-2 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-slate-900"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500 font-bold">ክብደት %:</span>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          required
                          value={duty.weightPercentage}
                          onChange={(e) => handleUpdateDuty(idx, 'weightPercentage', e.target.value)}
                          className="w-16 text-xs p-2 rounded-lg border border-slate-300 bg-white font-mono font-bold text-center focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      {duties.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDuty(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={2}
                      value={duty.description}
                      onChange={(e) => handleUpdateDuty(idx, 'description', e.target.value)}
                      placeholder="ዝርዝር የስራ ማብራሪያ..."
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Evaluation Matrix (60%) */}
          {activeTab === 'evaluation' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {lang === 'am'
                      ? 'ይፋዊ የሥራ አፈጻጸም ምዘና ሰንጠረዥ (ድምር 60 ነጥብ)'
                      : 'Official Job Performance Evaluation Table (60 Points)'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'am'
                      ? 'በየስራ ክፍሉ ይፋዊ መመሪያ መሰረት የተዋቀሩ ምድቦችና ዝርዝር ተግባራት'
                      : 'Structured civil service categories and key result areas'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold font-mono ${
                      totalEvalWeight === 60
                        ? 'bg-blue-100 text-blue-900 border border-blue-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    የምዘና ድምር፡ {totalEvalWeight} / 60 {totalEvalWeight === 60 ? '✓' : ''}
                  </span>
                </div>
              </div>

              {/* Categories list */}
              <div className="space-y-4">
                {evaluationTable.map((cat, catIdx) => (
                  <div
                    key={cat.no}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {cat.no}
                      </span>
                      <div className="flex-1">
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          {lang === 'am' ? 'የሚጠበቅ ውጤት (Key Result Area)' : 'Expected Result'}
                        </label>
                        <input
                          type="text"
                          value={cat.expectedResult}
                          onChange={(e) => handleUpdateCategoryExpectedResult(catIdx, e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddTaskToCategory(catIdx)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 transition cursor-pointer mt-5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'am' ? 'ተግባር ጨምር' : 'Add Task'}</span>
                      </button>
                    </div>

                    {/* Tasks within this category */}
                    <div className="space-y-2 pl-8">
                      {cat.tasks.map((task, taskIdx) => (
                        <div
                          key={task.code || taskIdx}
                          className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs"
                        >
                          <span className="text-xs font-mono font-bold text-slate-500 w-10">
                            {task.code}
                          </span>
                          <input
                            type="text"
                            value={task.description}
                            onChange={(e) =>
                              handleUpdateTask(catIdx, taskIdx, 'description', e.target.value)
                            }
                            placeholder="የተግባር መግለጫ..."
                            className="flex-1 text-xs p-1.5 rounded border border-slate-200 focus:outline-none focus:border-blue-500"
                          />
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] text-slate-500 font-semibold">ክብደት:</span>
                            <input
                              type="number"
                              min="1"
                              max="20"
                              value={task.weight}
                              onChange={(e) =>
                                handleUpdateTask(catIdx, taskIdx, 'weight', e.target.value)
                              }
                              className="w-12 text-xs p-1.5 text-center font-mono font-bold border border-slate-200 rounded focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          {cat.tasks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveTaskFromCategory(catIdx, taskIdx)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Requirements & KPIs */}
          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'am' ? 'የትምህርት ዝግጅት (Education) *' : 'Education *'}
                  </label>
                  <textarea
                    rows={3}
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="የትምህርት ደረጃና የተፈላጊ የትምህርት መስክ..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'am' ? 'የስራ ልምድ (Experience) *' : 'Experience *'}
                  </label>
                  <textarea
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="አግባብ ያለው የስራ ልምድ መጠንና ዓይነት..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'am'
                    ? 'ሙያዊ ሰርተፊኬቶች (Certifications - በኮማ ይለዩ)'
                    : 'Certifications (comma separated)'}
                </label>
                <input
                  type="text"
                  value={certificationsText}
                  onChange={(e) => setCertificationsText(e.target.value)}
                  placeholder="ምሳሌ፡ CCNP Enterprise, Fortinet NSE 7, CompTIA Security+"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'am'
                    ? 'ቴክኒካዊ ክህሎቶች (Technical Skills - በኮማ ይለዩ)'
                    : 'Technical Skills (comma separated)'}
                </label>
                <input
                  type="text"
                  value={technicalSkillsText}
                  onChange={(e) => setTechnicalSkillsText(e.target.value)}
                  placeholder="ምሳሌ፡ Cisco Nexus, BGP/OSPF Routing, FortiGate Next-Gen Firewall, SD-WAN"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* KPIs list */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'am'
                      ? 'ቁልፍ የአፈጻጸም አመልካቾች (Key Performance Indicators - KPIs)'
                      : 'Key Performance Indicators (KPIs)'}
                  </label>
                  <button
                    type="button"
                    onClick={handleAddKpi}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'KPI ጨምር' : 'Add KPI'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {kpis.map((kpi, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={kpi}
                        onChange={(e) => handleUpdateKpi(idx, e.target.value)}
                        placeholder="የአፈጻጸም አመልካች መለኪያ..."
                        className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                      {kpis.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveKpi(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer with Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {totalDutyWeight === 100 && totalEvalWeight === 60 ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {lang === 'am' ? 'ክብደቶች በትክክል ተሟልተዋል (100% / 60%)' : 'All weights balanced!'}
                </span>
              ) : (
                <span className="text-amber-700 font-medium">
                  {totalDutyWeight !== 100 && `ተግባራት: ${totalDutyWeight}% (100% መሆን አለበት) `}
                  {totalEvalWeight !== 60 && `ምዘና: ${totalEvalWeight}/60`}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                {lang === 'am' ? 'ሰርዝ' : 'Cancel'}
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>
                  {initialData
                    ? (lang === 'am' ? 'ለውጦችን መዝግብ' : 'Save Changes')
                    : (lang === 'am' ? 'የስራ መደቡን መዝግብ' : 'Register Job Description')}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
