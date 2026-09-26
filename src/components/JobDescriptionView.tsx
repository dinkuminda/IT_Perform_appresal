import React, { useState, useMemo } from 'react';
import { JobDescription } from '../types/jobDescription';
import { Language } from '../utils/i18n';
import { JobDescriptionModal } from './JobDescriptionModal';
import { 
  Briefcase, 
  Search, 
  BookOpen, 
  Award, 
  GraduationCap, 
  CheckCircle, 
  Layers, 
  Printer, 
  FileSpreadsheet,
  Database,
  Server,
  Network,
  ShieldAlert,
  Building2,
  Plus,
  Edit3,
  Trash2,
  Table as TableIcon,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';

interface JobDescriptionViewProps {
  jobDescriptions: JobDescription[];
  onSelectJDToAppraisal?: (jd: JobDescription) => void;
  onAddJobDescription?: (jd: JobDescription) => void;
  onUpdateJobDescription?: (jd: JobDescription) => void;
  onDeleteJobDescription?: (id: string) => void;
  onRestoreDefaultJobDescriptions?: () => void;
  lang: Language;
}

export const JobDescriptionView: React.FC<JobDescriptionViewProps> = ({
  jobDescriptions,
  onSelectJDToAppraisal,
  onAddJobDescription,
  onUpdateJobDescription,
  onDeleteJobDescription,
  onRestoreDefaultJobDescriptions,
  lang
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedJdId, setSelectedJdId] = useState<string>(jobDescriptions[0]?.id || '');
  const [detailTab, setDetailTab] = useState<'evaluationTable' | 'specifications'>('evaluationTable');
  
  // Modal state for adding/editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJd, setEditingJd] = useState<JobDescription | null>(null);
  const [jdToDelete, setJdToDelete] = useState<JobDescription | null>(null);

  // Department metadata helper
  const getDeptMeta = (deptName: string) => {
    if (deptName.includes('ዳታቤዝ') || deptName.toLowerCase().includes('database')) {
      return {
        labelAm: 'የዳታቤዝ አስተዳደር',
        labelEn: 'Database Administration',
        icon: Database,
        color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
        badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-200'
      };
    }
    if (deptName.includes('ሲስተም') || deptName.toLowerCase().includes('system')) {
      return {
        labelAm: 'የሲስተም አስተዳደር',
        labelEn: 'Systems Administration',
        icon: Server,
        color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200'
      };
    }
    if (deptName.includes('ኔትዎርክ') || deptName.includes('ኔትወርክ') || deptName.toLowerCase().includes('network')) {
      return {
        labelAm: 'የኔትዎርክ አስተዳደር',
        labelEn: 'Network Administration',
        icon: Network,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200'
      };
    }
    return {
      labelAm: 'የኢንፎርሜሽን ቴክኖሎጂ',
      labelEn: 'Information Technology',
      icon: ShieldAlert,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-200'
    };
  };

  // Distinct department names
  const departmentsList = useMemo(() => {
    const list: string[] = [];
    jobDescriptions.forEach((jd) => {
      if (!list.includes(jd.department)) {
        list.push(jd.department);
      }
    });
    return list;
  }, [jobDescriptions]);

  // Counts
  const dbCount = jobDescriptions.filter((j) => j.department.includes('ዳታቤዝ') || j.department.toLowerCase().includes('database')).length;
  const sysCount = jobDescriptions.filter((j) => j.department.includes('ሲስተም') || j.department.toLowerCase().includes('system')).length;
  const netCount = jobDescriptions.filter((j) => j.department.includes('ኔትዎርክ') || j.department.includes('ኔትወርክ') || j.department.toLowerCase().includes('network')).length;

  // Filtered Job Descriptions
  const filteredJds = useMemo(() => {
    return jobDescriptions.filter((jd) => {
      const matchesSearch = 
        jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jd.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jd.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jd.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = 
        selectedDept === 'all' || 
        jd.department === selectedDept ||
        (selectedDept === 'database' && (jd.department.includes('ዳታቤዝ') || jd.department.toLowerCase().includes('database'))) ||
        (selectedDept === 'system' && (jd.department.includes('ሲስተም') || jd.department.toLowerCase().includes('system'))) ||
        (selectedDept === 'network' && (jd.department.includes('ኔትዎርክ') || jd.department.includes('ኔትወርክ') || jd.department.toLowerCase().includes('network')));

      return matchesSearch && matchesDept;
    });
  }, [jobDescriptions, searchTerm, selectedDept]);

  // Selected active JD
  const activeJd = useMemo(() => {
    const found = filteredJds.find((j) => j.id === selectedJdId);
    if (found) return found;
    return filteredJds[0] || jobDescriptions[0];
  }, [filteredJds, selectedJdId, jobDescriptions]);

  const activeDeptMeta = activeJd ? getDeptMeta(activeJd.department) : null;
  const ActiveDeptIcon = activeDeptMeta ? activeDeptMeta.icon : Building2;

  // Handlers for modal
  const handleOpenAddModal = () => {
    setEditingJd(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (jd: JobDescription) => {
    setEditingJd(jd);
    setIsModalOpen(true);
  };

  const handleSaveJd = (saved: JobDescription) => {
    if (editingJd && onUpdateJobDescription) {
      onUpdateJobDescription(saved);
    } else if (onAddJobDescription) {
      onAddJobDescription(saved);
    }
    setSelectedJdId(saved.id);
  };

  const handleDeleteJd = (jd: JobDescription) => {
    setJdToDelete(jd);
  };

  const handleConfirmDelete = () => {
    if (!jdToDelete) return;
    const idToDelete = jdToDelete.id;
    if (onDeleteJobDescription) {
      onDeleteJobDescription(idToDelete);
    }
    const remaining = jobDescriptions.filter((j) => j.id !== idToDelete);
    if (remaining.length > 0) {
      setSelectedJdId(remaining[0].id);
    }
    setJdToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Institutional Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'የሥራ መደቦችና ይፋዊ የምዘና ሰንጠረዥ ሞጁል' : 'Job Descriptions & Official Evaluation Matrix'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'am' ? 'የስራ ክፍሎች ይፋዊ የሥራ መደቦችና የምዘና መስፈርቶች (60%)' : 'Departmental Job Descriptions & 60% Evaluation Matrix'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            {lang === 'am'
              ? 'ለዳታቤዝ አስተዳደር፣ ለሲስተም አስተዳደር እና ለኔትዎርክ አስተዳደር የስራ ክፍሎች የተዘጋጁ ይፋዊ የውጤት ተኮር የምዘና ሰንጠረዦች (60 ነጥብ)፣ ዋና ዋና ተግባራት እና የብቃት መስፈርቶች። እንዲሁም አዲስ የስራ መደብ መመዝገብ ወይም ማስተካከል ይችላሉ።'
              : 'Official civil service 60% result-oriented evaluation matrices, core responsibilities, and specifications for Database, Systems, and Network Administration departments. You can also register or remove Job Descriptions.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'am' ? 'አዲስ የስራ መደብ መዝግብ' : 'Add New Job Description'}</span>
          </button>

          {activeJd && (
            <button
              onClick={() => handleDeleteJd(activeJd)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 hover:text-rose-700 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs"
              title={lang === 'am' ? 'የተመረጠውን የስራ መደብ ሰርዝ' : 'Delete selected Job Description'}
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>{lang === 'am' ? 'ይህንን መደብ ሰርዝ' : 'Delete'}</span>
            </button>
          )}

          {onRestoreDefaultJobDescriptions && (
            <button
              onClick={onRestoreDefaultJobDescriptions}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
              title={lang === 'am' ? 'ነባር ይፋዊ የስራ መደቦችን ወደ መጀመሪያው ይዘት መልስ' : 'Restore Default Job Descriptions'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'am' ? 'ነባር መደቦች' : 'Restore'}</span>
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'am' ? 'አትም' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* 3 Department Highlight Filter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Dept 1: Database Administration */}
        <div
          onClick={() => {
            setSelectedDept('database');
            const firstDb = jobDescriptions.find((j) => j.department.includes('ዳታቤዝ') || j.department.toLowerCase().includes('database'));
            if (firstDb) setSelectedJdId(firstDb.id);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedDept === 'database'
              ? 'bg-cyan-50/90 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-cyan-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                {lang === 'am' ? 'የዳታቤዝ አስተዳደር' : 'Database Administration'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {dbCount} {lang === 'am' ? 'የተመዘገቡ መደቦች' : 'Positions'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-900">
            60% ምዘና
          </span>
        </div>

        {/* Dept 2: Systems Administration */}
        <div
          onClick={() => {
            setSelectedDept('system');
            const firstSys = jobDescriptions.find((j) => j.department.includes('ሲስተም') || j.department.toLowerCase().includes('system'));
            if (firstSys) setSelectedJdId(firstSys.id);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedDept === 'system'
              ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                {lang === 'am' ? 'የሲስተም አስተዳደር' : 'Systems Administration'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {sysCount} {lang === 'am' ? 'የተመዘገቡ መደቦች' : 'Positions'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
            60% ምዘና
          </span>
        </div>

        {/* Dept 3: Network Administration */}
        <div
          onClick={() => {
            setSelectedDept('network');
            const firstNet = jobDescriptions.find((j) => j.department.includes('ኔትዎርክ') || j.department.includes('ኔትወርክ') || j.department.toLowerCase().includes('network'));
            if (firstNet) setSelectedJdId(firstNet.id);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedDept === 'network'
              ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                {lang === 'am' ? 'የኔትዎርክ አስተዳደር' : 'Network Administration'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {netCount} {lang === 'am' ? 'የተመዘገቡ መደቦች' : 'Positions'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
            60% ምዘና
          </span>
        </div>
      </div>

      {/* Main Grid: Left Job List (4 cols) & Right Detailed Sheet (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Job Selector (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 h-fit">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">
              {lang === 'am' ? 'የሥራ መደቦች ዝርዝር' : 'Positions Directory'} ({filteredJds.length})
            </span>
            {selectedDept !== 'all' && (
              <button
                onClick={() => setSelectedDept('all')}
                className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                {lang === 'am' ? 'ሁሉንም አሳይ' : 'Show All'}
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'am' ? 'በመደብ፣ በደረጃ ወይም በስራ ክፍል ፈልግ...' : 'Search by title, level...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>

          {/* List */}
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredJds.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                {lang === 'am' ? 'ምንም የተገኘ የስራ መደብ የለም' : 'No job descriptions found'}
              </div>
            ) : (
              filteredJds.map((jd) => {
                const isSelected = jd.id === activeJd?.id;
                const meta = getDeptMeta(jd.department);
                const DeptIcon = meta.icon;

                return (
                  <div
                    key={jd.id}
                    onClick={() => setSelectedJdId(jd.id)}
                    role="button"
                    tabIndex={0}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-400 shadow-xs ring-1 ring-blue-400/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-slate-900 text-xs line-clamp-1 pr-1">
                        {jd.title}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {jd.isCustom && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                            አዲስ
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteJd(jd);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title={lang === 'am' ? 'ይህንን የስራ መደብ ሰርዝ' : 'Delete job position'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 line-clamp-1 mb-2 font-mono">
                      {jd.level}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${meta.badgeBg}`}>
                        <DeptIcon className="w-3 h-3" />
                        <span>{meta.labelAm}</span>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed View (8 cols) */}
        {activeJd && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header info */}
            <div className="border-b border-slate-200 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border ${activeDeptMeta?.badgeBg}`}>
                    <ActiveDeptIcon className="w-3.5 h-3.5" />
                    <span>{activeJd.department}</span>
                  </span>
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-bold font-mono">
                    {activeJd.level}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(activeJd)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'አርትዕ' : 'Edit'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteJd(activeJd)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>{lang === 'am' ? 'ሰርዝ' : 'Delete'}</span>
                  </button>

                  {onSelectJDToAppraisal && (
                    <button
                      onClick={() => onSelectJDToAppraisal(activeJd)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>{lang === 'am' ? 'በዚህ መደብ ምዘና ጀምር' : 'Start Appraisal'}</span>
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeJd.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {activeJd.titleEn}
              </p>
              <div className="mt-2 text-xs text-slate-600">
                <span className="text-slate-400">{lang === 'am' ? 'ሪፖርት የሚያደርገው ለ:' : 'Reports To:'}</span>{' '}
                <strong className="text-slate-800 font-semibold">{activeJd.reportsTo}</strong>
              </div>
            </div>

            {/* Subtab Toggle for Active JD: Official Evaluation Matrix vs Job Description */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setDetailTab('evaluationTable')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  detailTab === 'evaluationTable'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>{lang === 'am' ? 'ይፋዊ የሥራ አፈጻጸም ምዘና ሰንጠረዥ (60%)' : 'Official Evaluation Matrix (60%)'}</span>
              </button>

              <button
                onClick={() => setDetailTab('specifications')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  detailTab === 'specifications'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'am' ? 'የሥራ መደቡ ዝርዝር መግለጫ (Job Description)' : 'Job Description & Duties'}</span>
              </button>
            </div>

            {/* SUBTAB 1: Official Evaluation Matrix (matching the uploaded images!) */}
            {detailTab === 'evaluationTable' && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 bg-blue-50/80 p-3.5 rounded-xl border border-blue-200 text-xs text-blue-900">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>{lang === 'am' ? 'ይፋዊ የሥራ አፈጻጸም ምዘና መስፈርት ሰንጠረዥ፡' : 'Official 60% Evaluation Matrix:'}</strong>{' '}
                    {lang === 'am'
                      ? 'ይህ ሰንጠረዥ ለዚህ የስራ መደብ የተዘጋጀ 4ቱን የትኩረት አቅጣጫዎች እና ከባለሙያው የሚጠበቁ ዝርዝር ውጤቶችን ከክብደታቸው ጋር የያዘ ነው። አጠቃላይ ድምር ክብደት 60% (60 ነጥብ) ነው።'
                      : 'Standardized result-oriented evaluation matrix covering the 4 strategic focus areas with assigned weights totaling 60 points.'}
                  </div>
                </div>

                {/* Table representation exactly matching the uploaded official images */}
                <div className="overflow-x-auto rounded-xl border border-slate-300">
                  <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px] tracking-wider border-b border-slate-300">
                      <tr>
                        <th className="border-r border-slate-300 p-3 text-center w-14">ተ.ቁ</th>
                        <th className="border-r border-slate-300 p-3 w-1/3">የሚጠበቅ ውጤት</th>
                        <th className="border-r border-slate-300 p-3">ከባለሙያው የሚጠበቅ ውጤት</th>
                        <th className="p-3 text-center w-20">ክብደት</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {activeJd.evaluationTable?.map((cat) => {
                        const totalRows = cat.tasks.length;
                        return (
                          <React.Fragment key={cat.no}>
                            {cat.tasks.map((task, tIdx) => {
                              const isFirst = tIdx === 0;
                              return (
                                <tr key={task.code} className="hover:bg-slate-50 transition">
                                  {isFirst && (
                                    <td
                                      rowSpan={totalRows}
                                      className="border-r border-slate-300 p-3 text-center font-bold text-slate-800 bg-slate-50/70 align-top"
                                    >
                                      {cat.no}
                                    </td>
                                  )}

                                  {isFirst && (
                                    <td
                                      rowSpan={totalRows}
                                      className="border-r border-slate-300 p-3 font-semibold text-slate-800 bg-slate-50/70 align-top leading-relaxed"
                                    >
                                      <div className="text-slate-900 font-bold mb-1">
                                        {cat.expectedResult}
                                      </div>
                                    </td>
                                  )}

                                  <td className="border-r border-slate-300 p-3 text-slate-700 leading-relaxed">
                                    <span className="font-bold text-slate-900 mr-2 font-mono">
                                      {task.code}
                                    </span>
                                    {task.description}
                                  </td>

                                  <td className="p-3 text-center font-bold text-blue-700 font-mono text-sm bg-blue-50/20">
                                    {task.weight}
                                  </td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-900">
                      <tr>
                        <td colSpan={3} className="border-r border-slate-300 p-3 text-right">
                          {lang === 'am' ? 'አጠቃላይ ድምር ክብደት (Total Weight):' : 'Grand Total Weight:'}
                        </td>
                        <td className="p-3 text-center text-blue-800 text-sm font-mono font-extrabold bg-blue-100/60">
                          {activeJd.evaluationTable?.reduce(
                            (sum, c) => sum + c.tasks.reduce((tSum, t) => tSum + t.weight, 0),
                            0
                          ) || 60}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex justify-end pt-2">
                  {onSelectJDToAppraisal && (
                    <button
                      onClick={() => onSelectJDToAppraisal(activeJd)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'am' ? 'ይህንን የምዘና ሰንጠረዥ ጫንና ምዘና ጀምር' : 'Load this Matrix & Begin Appraisal'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* SUBTAB 2: Full Job Description, Duties, Requirements & KPIs */}
            {detailTab === 'specifications' && (
              <div className="space-y-6">
                {/* 1. Job Objective */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>{lang === 'am' ? 'የሥራው ዋና ዓላማ (Job Purpose)' : 'Job Purpose / Objective'}</span>
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px]">
                    {activeJd.jobObjective}
                  </p>
                </div>

                {/* 2. Main Duties and Responsibilities (Total 100%) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>{lang === 'am' ? 'ዋና ዋና ተግባራትና ኃላፊነቶች (Main Duties & Responsibilities)' : 'Key Duties & Responsibilities'}</span>
                    </h4>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      ድምር ክብደት: 100%
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeJd.duties.map((duty, idx) => (
                      <div key={duty.id || idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {idx + 1}. {duty.title}
                          </span>
                          <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 shrink-0">
                            {duty.weightPercentage}% {lang === 'am' ? 'ክብደት' : 'weight'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {duty.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Job Specifications & Requirements */}
                <div className="border-t border-slate-200 pt-5">
                  <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'am' ? 'ተፈላጊ የትምህርትና የልምድ ዝግጅት (Job Specifications)' : 'Qualifications & Skills'}</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-700 block mb-1">
                        {lang === 'am' ? 'የትምህርት ደረጃ:' : 'Education:'}
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {activeJd.requirements.education}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-700 block mb-1">
                        {lang === 'am' ? 'የስራ ልምድ:' : 'Experience:'}
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {activeJd.requirements.experience}
                      </p>
                    </div>
                  </div>

                  {/* Technical skills and certifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
                    {activeJd.requirements.certifications && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="font-bold text-slate-700 block mb-2">
                          {lang === 'am' ? 'ሙያዊ ማረጋገጫዎች (Certifications):' : 'Professional Certifications:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeJd.requirements.certifications.map((c, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-white text-slate-800 border border-slate-200 text-[11px] font-semibold flex items-center gap-1">
                              <Award className="w-3 h-3 text-purple-600" />
                              <span>{c}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-700 block mb-2">
                        {lang === 'am' ? 'የቴክኒክ ክህሎቶች (Technical Competencies):' : 'Technical Competencies:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeJd.requirements.technicalSkills.map((s, i) => (
                          <span key={i} className="px-2 py-1 rounded-md bg-white text-slate-800 border border-slate-200 text-[11px]">
                            #{s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Key Performance Indicators (KPIs) */}
                <div className="border-t border-slate-200 pt-5">
                  <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span>{lang === 'am' ? 'ቁልፍ የአፈጻጸም መለኪያ አመልካቾች (KPIs)' : 'Key Performance Indicators (KPIs)'}</span>
                  </h4>

                  <div className="space-y-2">
                    {activeJd.keyPerformanceIndicators.map((kpi, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                        <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Job Description Modal */}
      <JobDescriptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJd(null);
        }}
        onSave={handleSaveJd}
        initialData={editingJd}
        departments={departmentsList}
        lang={lang}
      />

      {/* Delete Job Description Confirmation Modal */}
      {jdToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {lang === 'am' ? 'የስራ መደብ ይሰረዝ?' : 'Delete Job Position?'}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  {jdToDelete.id}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {lang === 'am'
                ? `እርግጠኛ ነዎት "${jdToDelete.title}" የተባለውን የስራ መደብ መግለጫ እና ተያያዥ 60% የምዘና ሰንጠረዥ ከሲስተሙ መሰረዝ ይፈልጋሉ?`
                : `Are you sure you want to permanently remove "${jdToDelete.title}" and its associated 60% evaluation matrix?`}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-5 text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">{lang === 'am' ? 'የስራ ክፍል፡' : 'Department:'}</span>
                <span className="text-slate-800">{jdToDelete.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">{lang === 'am' ? 'ደረጃ፡' : 'Level:'}</span>
                <span className="font-mono text-slate-800">{jdToDelete.level}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setJdToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                {lang === 'am' ? 'ተመለስ' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition cursor-pointer"
              >
                {lang === 'am' ? 'አዎ፣ የስራ መደቡ ይሰረዝ' : 'Yes, Delete Position'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
