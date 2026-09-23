import React, { useState, useMemo } from 'react';
import { JobDescription } from '../types/jobDescription';
import { Language } from '../utils/i18n';
import { 
  Briefcase, 
  Search, 
  BookOpen, 
  Award, 
  GraduationCap, 
  CheckCircle, 
  Layers, 
  Printer, 
  FileText,
  ChevronRight,
  ExternalLink,
  Database,
  Server,
  Network,
  ShieldAlert,
  Building2,
  FileSpreadsheet,
  Filter
} from 'lucide-react';

interface JobDescriptionViewProps {
  jobDescriptions: JobDescription[];
  onSelectJDToAppraisal?: (jd: JobDescription) => void;
  lang: Language;
}

export const JobDescriptionView: React.FC<JobDescriptionViewProps> = ({
  jobDescriptions,
  onSelectJDToAppraisal,
  lang
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedJdId, setSelectedJdId] = useState<string>(jobDescriptions[0]?.id || '');

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
      labelAm: 'የኢንፎርሜሽን ደህንነት',
      labelEn: 'Information Security',
      icon: ShieldAlert,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-200'
    };
  };

  // Distinct department names
  const departmentsList = useMemo(() => {
    const map = new Map<string, number>();
    jobDescriptions.forEach((jd) => {
      const current = map.get(jd.department) || 0;
      map.set(jd.department, current + 1);
    });
    return Array.from(map.entries());
  }, [jobDescriptions]);

  // Filtered Job Descriptions
  const filteredJds = useMemo(() => {
    return jobDescriptions.filter((jd) => {
      const matchesSearch = 
        jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jd.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jd.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jd.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = selectedDept === 'all' || jd.department === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [jobDescriptions, searchTerm, selectedDept]);

  // Selected JD
  const activeJd = useMemo(() => {
    const found = filteredJds.find((j) => j.id === selectedJdId);
    if (found) return found;
    return filteredJds[0] || jobDescriptions[0];
  }, [filteredJds, selectedJdId, jobDescriptions]);

  const activeDeptMeta = activeJd ? getDeptMeta(activeJd.department) : null;
  const ActiveDeptIcon = activeDeptMeta ? activeDeptMeta.icon : Building2;

  return (
    <div className="space-y-6">
      {/* Top Banner & Institutional Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'የሥራ መደቦችና የባለሙያዎች መስፈርት ሞጁል' : 'Job Descriptions & Competencies Module'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'am' ? 'የስራ ክፍሎች ይፋዊ የሥራ መደቦች መግለጫ (Job Descriptions)' : 'Departmental Job Descriptions & Specifications'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {lang === 'am'
              ? 'ለዳታቤዝ አስተዳደር፣ ለሲስተም አስተዳደር እና ለኔትዎርክ አስተዳደር የስራ ክፍሎች የተዘጋጁ ዋና ዋና ተግባራት፣ የብቃት መስፈርቶች እና የውጤት መለኪያ አመልካቾች (KPIs)።'
              : 'Standardized job roles, core responsibilities, qualifications, and KPIs tailored for Database, Systems, and Network Administration departments.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'am' ? 'ይህንን መደብ አትም' : 'Print JD'}</span>
          </button>
        </div>
      </div>

      {/* 3 Department Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dept 1: Database Administration */}
        <div
          onClick={() => {
            const dbDept = jobDescriptions.find((j) => j.department.includes('ዳታቤዝ'))?.department;
            if (dbDept) {
              setSelectedDept(dbDept);
              const firstDb = jobDescriptions.find((j) => j.department === dbDept);
              if (firstDb) setSelectedJdId(firstDb.id);
            }
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedDept.includes('ዳታቤዝ')
              ? 'bg-cyan-50/80 border-cyan-400 ring-2 ring-cyan-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-cyan-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {lang === 'am' ? 'የዳታቤዝ አስተዳደር' : 'Database Administration'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Oracle, PostgreSQL, RAC & HA
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
            {jobDescriptions.filter((j) => j.department.includes('ዳታቤዝ')).length} መደቦች
          </span>
        </div>

        {/* Dept 2: Systems Administration */}
        <div
          onClick={() => {
            const sysDept = jobDescriptions.find((j) => j.department.includes('ሲስተም'))?.department;
            if (sysDept) {
              setSelectedDept(sysDept);
              const firstSys = jobDescriptions.find((j) => j.department === sysDept);
              if (firstSys) setSelectedJdId(firstSys.id);
            }
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedDept.includes('ሲስተም')
              ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {lang === 'am' ? 'የሲስተም አስተዳደር' : 'Systems Administration'}
              </h3>
              <p className="text-[11px] text-slate-500">
                VMware, Linux/Windows, Storage
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
            {jobDescriptions.filter((j) => j.department.includes('ሲስተም')).length} መደቦች
          </span>
        </div>

        {/* Dept 3: Network Administration */}
        <div
          onClick={() => {
            const netDept = jobDescriptions.find((j) => j.department.includes('ኔትዎርክ') || j.department.includes('ኔትወርክ'))?.department;
            if (netDept) {
              setSelectedDept(netDept);
              const firstNet = jobDescriptions.find((j) => j.department === netDept);
              if (firstNet) setSelectedJdId(firstNet.id);
            }
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedDept.includes('ኔትዎርክ') || selectedDept.includes('ኔትወርክ')
              ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {lang === 'am' ? 'የኔትዎርክ አስተዳደር' : 'Network Administration'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Cisco, Fortinet, SD-WAN, BGP
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            {jobDescriptions.filter((j) => j.department.includes('ኔትዎርክ') || j.department.includes('ኔትወርክ')).length} መደቦች
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Job Directory Selector & Department Filter (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'am' ? 'በስራ መደብ ወይም ደረጃ ፈልግ...' : 'Search position or level...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>

          {/* Department Filter Tabs */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>{lang === 'am' ? 'የስራ ክፍል ማጣሪያ' : 'Filter Department'}</span>
              </span>
              {selectedDept !== 'all' && (
                <button
                  onClick={() => setSelectedDept('all')}
                  className="text-[11px] text-blue-600 font-bold hover:underline"
                >
                  ሁሉንም አሳይ
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedDept('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedDept === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ሁሉም ({jobDescriptions.length})
              </button>
              {departmentsList.map(([dept, count]) => {
                const isSelected = selectedDept === dept;
                const meta = getDeptMeta(dept);
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? `${meta.badgeBg} font-bold shadow-2xs`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{meta.labelAm.replace('የ', '').replace(' አስተዳደር', '')}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              {lang === 'am' ? 'የተመዘገቡ መደቦች' : 'Active Positions'} ({filteredJds.length})
            </span>

            {filteredJds.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                ምንም መደብ አልተገኘም።
              </div>
            ) : (
              filteredJds.map((jd) => {
                const isSelected = jd.id === activeJd?.id;
                const meta = getDeptMeta(jd.department);
                const DeptIcon = meta.icon;

                return (
                  <button
                    key={jd.id}
                    onClick={() => setSelectedJdId(jd.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 text-xs leading-snug">
                        {jd.title}
                      </span>
                      <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 transition-transform ${isSelected ? 'text-blue-700 translate-x-1' : 'text-slate-300'}`} />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700 font-mono">
                        {jd.level.split(' ')[0]}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${meta.badgeBg}`}>
                        <DeptIcon className="w-3 h-3" />
                        <span>{meta.labelAm}</span>
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Job Description Sheet (8 cols) */}
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
                  {onSelectJDToAppraisal && (
                    <button
                      onClick={() => onSelectJDToAppraisal(activeJd)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
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
                  <div key={duty.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition">
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
    </div>
  );
};
