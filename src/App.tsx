import React, { useState, useEffect } from 'react';
import { AppraisalRecord } from './types/appraisal';
import { MonthlyReport } from './types/monthlyReport';
import { JobDescription } from './types/jobDescription';
import { Employee } from './types/employee';
import { 
  DEFAULT_CATEGORIES, 
  DEFAULT_COMPETENCIES, 
  DEFAULT_METADATA, 
  SAMPLE_APPRAISAL 
} from './data/defaultData';
import { 
  DEFAULT_JOB_DESCRIPTIONS, 
  DEFAULT_MONTHLY_REPORTS 
} from './data/extraModulesData';
import { DEFAULT_EMPLOYEES } from './data/defaultEmployees';
import { Language, translations } from './utils/i18n';
import { 
  calculateTotalTaskScore, 
  calculateTotalCompetencyScore, 
  getPerformanceGrade 
} from './utils/calculations';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MetadataSection } from './components/MetadataSection';
import { TaskEvaluationTab } from './components/TaskEvaluationTab';
import { CompetencyTab } from './components/CompetencyTab';
import { SummaryTab } from './components/SummaryTab';
import { SavedAppraisalsModal } from './components/SavedAppraisalsModal';
import { PrintDocument } from './components/PrintDocument';

import { DashboardView } from './components/DashboardView';
import { MonthlyReportView } from './components/MonthlyReportView';
import { JobDescriptionView } from './components/JobDescriptionView';
import { EmployeeModuleView } from './components/EmployeeModuleView';

import { 
  Briefcase, 
  ShieldCheck, 
  Award, 
  FolderArchive,
  BarChart3,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

const STORAGE_KEY = 'ics_performance_appraisals_v1';
const CURRENT_ID_KEY = 'ics_current_appraisal_id_v1';
const MONTHLY_REPORTS_KEY = 'ics_monthly_reports_v1';
const JOB_DESCRIPTIONS_KEY = 'ics_job_descriptions_v1';
const EMPLOYEES_KEY = 'ics_employees_v1';

export default function App() {
  const [lang, setLang] = useState<Language>('am');
  const [currentModule, setCurrentModule] = useState<'dashboard' | 'appraisal' | 'monthly' | 'jobs' | 'employees'>('dashboard');
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Initialize saved records from localStorage
  const [savedRecords, setSavedRecords] = useState<AppraisalRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return [SAMPLE_APPRAISAL];
  });

  // Monthly Reports State
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>(() => {
    try {
      const stored = localStorage.getItem(MONTHLY_REPORTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_MONTHLY_REPORTS;
  });

  // Job Descriptions State
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>(() => {
    try {
      const stored = localStorage.getItem(JOB_DESCRIPTIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const hasDbDept = Array.isArray(parsed) && parsed.some((j: JobDescription) => j.department?.includes('ዳታቤዝ'));
        if (Array.isArray(parsed) && parsed.length >= 6 && hasDbDept) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_JOB_DESCRIPTIONS;
  });

  // Staff / Employees State
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const stored = localStorage.getItem(EMPLOYEES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_EMPLOYEES;
  });

  // Current active record
  const [currentRecord, setCurrentRecord] = useState<AppraisalRecord>(() => {
    try {
      const lastId = localStorage.getItem(CURRENT_ID_KEY);
      if (lastId) {
        const found = savedRecords.find((r) => r.id === lastId);
        if (found) return found;
      }
    } catch (e) {
      console.error(e);
    }
    return savedRecords[0] || SAMPLE_APPRAISAL;
  });

  // Keep localStorage updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRecords));
      localStorage.setItem(CURRENT_ID_KEY, currentRecord.id);
      localStorage.setItem(MONTHLY_REPORTS_KEY, JSON.stringify(monthlyReports));
      localStorage.setItem(JOB_DESCRIPTIONS_KEY, JSON.stringify(jobDescriptions));
      localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [savedRecords, currentRecord.id, monthlyReports, jobDescriptions, employees]);

  const t = translations[lang];

  // Calculate live scores
  const taskScore = calculateTotalTaskScore(currentRecord.categories);
  const { totalOutOf40: compScore } = calculateTotalCompetencyScore(currentRecord.competencies);
  const totalScore = Number((taskScore + compScore).toFixed(2));
  const grade = getPerformanceGrade(totalScore);

  // Save changes to current record & master list
  const handleUpdateRecord = (updates: Partial<AppraisalRecord>) => {
    const updated: AppraisalRecord = {
      ...currentRecord,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setCurrentRecord(updated);

    setSavedRecords((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleSaveMonthlyReport = (rep: MonthlyReport) => {
    setMonthlyReports((prev) => {
      const exists = prev.some((r) => r.id === rep.id);
      if (exists) {
        return prev.map((r) => (r.id === rep.id ? rep : r));
      }
      return [rep, ...prev];
    });
  };

  const handleManualSave = () => {
    handleUpdateRecord({});
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2000);
  };

  const handleLoadSample = () => {
    setCurrentRecord(SAMPLE_APPRAISAL);
    setSavedRecords((prev) => {
      const exists = prev.some((r) => r.id === SAMPLE_APPRAISAL.id);
      return exists ? prev.map((r) => (r.id === SAMPLE_APPRAISAL.id ? SAMPLE_APPRAISAL : r)) : [SAMPLE_APPRAISAL, ...prev];
    });
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 1800);
  };

  const handleReset = () => {
    if (window.confirm(lang === 'am' ? 'ቅጹን ማፅዳት ይፈልጋሉ? የተመዘገቡት ነጥቦች ወደ ነባሪ ይመለሳሉ።' : 'Reset this appraisal form? Current ratings will reset.')) {
      const resetCategories = DEFAULT_CATEGORIES.map((cat) => ({
        ...cat,
        subtasks: cat.subtasks.map((st) => ({
          ...st,
          criteria: st.criteria.map((cr) => ({ ...cr, rating: 4 as const }))
        }))
      }));

      const resetCompetencies = DEFAULT_COMPETENCIES.map((c) => ({
        ...c,
        rating: 4 as const,
        notes: ''
      }));

      handleUpdateRecord({
        categories: resetCategories,
        competencies: resetCompetencies,
        supervisorComments: '',
        employeeComments: '',
        supervisorSigned: false,
        employeeSigned: false,
        supervisorSignDate: '',
        employeeSignDate: ''
      });
    }
  };

  const handleNewAppraisal = () => {
    const newId = `appraisal-${Date.now()}`;
    const newRecord: AppraisalRecord = {
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        ...DEFAULT_METADATA,
        empName: '',
        empId: `ICS-IT-${Math.floor(1000 + Math.random() * 9000)}`,
        evalPeriod: 'ከ ጥር 1/2018 እስከ ሰኔ 30/2018 ዓ.ም',
        evalDate: new Date().toISOString().split('T')[0]
      },
      categories: DEFAULT_CATEGORIES.map((c) => ({
        ...c,
        subtasks: c.subtasks.map((s) => ({
          ...s,
          criteria: s.criteria.map((cr) => ({ ...cr, rating: 4 as const }))
        }))
      })),
      competencies: DEFAULT_COMPETENCIES.map((c) => ({
        ...c,
        rating: 4 as const,
        notes: ''
      })),
      supervisorComments: '',
      employeeComments: '',
      supervisorSigned: false,
      employeeSigned: false,
      supervisorSignDate: '',
      employeeSignDate: '',
      approvalStatus: 'draft'
    };

    setSavedRecords((prev) => [newRecord, ...prev]);
    setCurrentRecord(newRecord);
    setCurrentModule('appraisal');
    setActiveTab(1);
  };

  const handleDeleteRecord = (id: string) => {
    if (savedRecords.length <= 1) {
      alert(lang === 'am' ? 'ቢያንስ አንድ የምዘና መዝገብ መኖር አለበት።' : 'At least one record must be maintained.');
      return;
    }
    const filtered = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(filtered);
    if (currentRecord.id === id) {
      setCurrentRecord(filtered[0]);
    }
  };

  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const handleUpdateEmployee = (updatedEmp: Employee) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updatedEmp.id ? updatedEmp : e))
    );
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm(lang === 'am' ? 'ይህንን ሰራተኛ ከዝርዝር መሰረዝ ይፈልጋሉ?' : 'Delete this employee from directory?')) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleStartAppraisalForEmployee = (emp: Employee) => {
    const existing = savedRecords.find((r) => r.metadata.empId === emp.employeeId);
    if (existing) {
      setCurrentRecord(existing);
    } else {
      const newId = `appraisal-${Date.now()}`;
      const newRecord: AppraisalRecord = {
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
          ...DEFAULT_METADATA,
          empName: emp.fullNameAm,
          empId: emp.employeeId,
          empDept: emp.teamAm,
          empPosition: emp.positionAm,
          evalPeriod: 'ከ ጥር 1/2018 እስከ ሰኔ 30/2018 ዓ.ም',
          supervisorName: emp.supervisorName,
          evalDate: new Date().toISOString().split('T')[0],
          evalType: 'half-year'
        },
        categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
        competencies: JSON.parse(JSON.stringify(DEFAULT_COMPETENCIES)),
        supervisorComments: '',
        employeeComments: '',
        supervisorSigned: false,
        employeeSigned: false,
        supervisorSignDate: '',
        employeeSignDate: '',
        approvalStatus: 'draft'
      };
      setSavedRecords((prev) => [newRecord, ...prev]);
      setCurrentRecord(newRecord);
    }
    setCurrentModule('appraisal');
    setActiveTab(1);
  };

  const handleStartReportForEmployee = (_emp: Employee) => {
    setCurrentModule('monthly');
  };

  const handleSelectJDToAppraisal = (jd: JobDescription) => {
    const newId = `appraisal-${Date.now()}`;
    const newRecord: AppraisalRecord = {
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        ...DEFAULT_METADATA,
        empName: '',
        empId: `ICS-IT-${Math.floor(1000 + Math.random() * 9000)}`,
        empDept: jd.department.split(' ')[0],
        empPosition: jd.title,
        evalPeriod: 'ከ ጥር 1/2018 እስከ ሰኔ 30/2018 ዓ.ም',
        supervisorName: jd.reportsTo,
        evalDate: new Date().toISOString().split('T')[0],
        evalType: 'half-year'
      },
      categories: jd.duties.map((duty, idx) => {
        const catWeight = Math.round((duty.weightPercentage / 100) * 60);
        const qualityWeight = Math.max(1, Math.round(catWeight * 0.6));
        const timeWeight = Math.max(1, catWeight - qualityWeight);

        return {
          id: idx + 1,
          title: duty.title,
          weight: catWeight,
          subtasks: [
            {
              subId: `${idx + 1}.1`,
              desc: duty.description,
              criteria: [
                {
                  id: `${idx + 1}.1-q`,
                  type: 'ጥራት',
                  weight: qualityWeight,
                  rating: 4
                },
                {
                  id: `${idx + 1}.1-t`,
                  type: 'ጊዜ',
                  weight: timeWeight,
                  rating: 4
                }
              ]
            }
          ]
        };
      }),
      competencies: JSON.parse(JSON.stringify(DEFAULT_COMPETENCIES)),
      supervisorComments: '',
      employeeComments: '',
      supervisorSigned: false,
      employeeSigned: false,
      supervisorSignDate: '',
      employeeSignDate: '',
      approvalStatus: 'draft'
    };

    setSavedRecords((prev) => [newRecord, ...prev]);
    setCurrentRecord(newRecord);
    setCurrentModule('appraisal');
    setActiveTab(1);
  };

  const handleDuplicateRecord = (rec: AppraisalRecord) => {
    const dupId = `appraisal-${Date.now()}`;
    const dup: AppraisalRecord = {
      ...rec,
      id: dupId,
      metadata: {
        ...rec.metadata,
        empName: `${rec.metadata.empName} (Copy)`
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      supervisorSigned: false,
      employeeSigned: false
    };
    setSavedRecords((prev) => [dup, ...prev]);
    setCurrentRecord(dup);
  };

  const handleImportRecords = (imported: AppraisalRecord[]) => {
    const valid = imported.filter((r) => r && r.id && r.metadata && r.categories);
    if (valid.length === 0) {
      alert('Invalid appraisal file format.');
      return;
    }
    setSavedRecords((prev) => {
      const existingIds = new Set(prev.map((r) => r.id));
      const newItems = valid.filter((r) => !existingIds.has(r.id));
      return [...newItems, ...prev];
    });
    setCurrentRecord(valid[0]);
    setIsArchiveOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex">
      {/* Institutional Sidebar Navigation */}
      <Sidebar
        currentModule={currentModule}
        onSelectModule={(mod) => setCurrentModule(mod)}
        lang={lang}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
        onNewAppraisal={handleNewAppraisal}
        onLoadSample={handleLoadSample}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onReset={handleReset}
        savedCount={savedRecords.length}
        employeesCount={employees.length}
        jobsCount={jobDescriptions.length}
        activeRecord={currentRecord}
        totalScore={totalScore}
      />

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          currentModule={currentModule}
          lang={lang}
          onToggleLang={() => setLang(lang === 'am' ? 'en' : 'am')}
          onToggleSidebarMobile={() => setIsSidebarOpenMobile((prev) => !prev)}
          onSave={handleManualSave}
          onPrint={() => window.print()}
          isSavedToast={isSavedToast}
          totalScore={totalScore}
        />

        {/* Scrollable View Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 no-print">
        {/* Module 1: Dashboard View */}
        {currentModule === 'dashboard' && (
          <DashboardView
            appraisals={savedRecords}
            monthlyReports={monthlyReports}
            jobDescriptions={jobDescriptions}
            onSelectAppraisal={(rec) => setCurrentRecord(rec)}
            onNavigateToTab={(tab) => setCurrentModule(tab)}
            lang={lang}
          />
        )}

        {/* Module 2: Staff / Employee Directory View */}
        {currentModule === 'employees' && (
          <EmployeeModuleView
            employees={employees}
            appraisals={savedRecords}
            monthlyReports={monthlyReports}
            jobDescriptions={jobDescriptions}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onStartAppraisalForEmployee={handleStartAppraisalForEmployee}
            onStartReportForEmployee={handleStartReportForEmployee}
            lang={lang}
          />
        )}

        {/* Module 3: Monthly Report View */}
        {currentModule === 'monthly' && (
          <MonthlyReportView
            reports={monthlyReports}
            onSaveReport={handleSaveMonthlyReport}
            lang={lang}
          />
        )}

        {/* Module 4: Job Description View */}
        {currentModule === 'jobs' && (
          <JobDescriptionView
            jobDescriptions={jobDescriptions}
            onSelectJDToAppraisal={handleSelectJDToAppraisal}
            lang={lang}
          />
        )}

        {/* Module 5: Performance Appraisal Form View */}
        {currentModule === 'appraisal' && (
          <div>
            {/* Employee & Evaluation Metadata */}
            <MetadataSection
              metadata={currentRecord.metadata}
              onChange={(newMeta) => handleUpdateRecord({ metadata: newMeta })}
              lang={lang}
            />

            {/* Tab Navigation: Zero-Pill Interactive Filter/Tab Controls */}
            <div className="border-b border-slate-200 mb-6 bg-white rounded-t-xl px-4 shadow-2xs">
              <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab(1)}
                  className={`py-4 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 1
                      ? 'border-blue-600 text-blue-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>{t.tab1}</span>
                  <span className="font-mono text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1">
                    {taskScore.toFixed(2)}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab(2)}
                  className={`py-4 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 2
                      ? 'border-emerald-600 text-emerald-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.tab2}</span>
                  <span className="font-mono text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">
                    {compScore.toFixed(2)}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab(3)}
                  className={`py-4 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 3
                      ? 'border-indigo-600 text-indigo-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{t.tab3}</span>
                  <span className="font-mono text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded ml-1 font-bold">
                    {totalScore.toFixed(2)}%
                  </span>
                </button>
              </nav>
            </div>

            {/* Tab 1: 60% Job Performance Table */}
            {activeTab === 1 && (
              <TaskEvaluationTab
                categories={currentRecord.categories}
                onChangeCategories={(cats) => handleUpdateRecord({ categories: cats })}
                lang={lang}
              />
            )}

            {/* Tab 2: 40% Core Competencies Table */}
            {activeTab === 2 && (
              <CompetencyTab
                competencies={currentRecord.competencies}
                onChangeCompetencies={(comps) => handleUpdateRecord({ competencies: comps })}
                lang={lang}
              />
            )}

            {/* Tab 3: 100% Summary & Signatures */}
            {activeTab === 3 && (
              <SummaryTab
                record={currentRecord}
                onUpdateRecord={handleUpdateRecord}
                lang={lang}
              />
            )}
          </div>
        )}
      </main>
      </div>

      {/* Archives Modal */}
      <SavedAppraisalsModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        savedList={savedRecords}
        currentId={currentRecord.id}
        onSelectRecord={(rec) => {
          setCurrentRecord(rec);
          setCurrentModule('appraisal');
        }}
        onDeleteRecord={handleDeleteRecord}
        onDuplicateRecord={handleDuplicateRecord}
        onNewRecord={handleNewAppraisal}
        onImportRecords={handleImportRecords}
        lang={lang}
      />

      {/* Dedicated Print View (Rendered only on window.print()) */}
      <PrintDocument record={currentRecord} />
    </div>
  );
}
