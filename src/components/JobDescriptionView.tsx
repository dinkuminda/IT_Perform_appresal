import React, { useState } from 'react';
import { JobDescription } from '../types/jobDescription';
import { Language } from '../utils/i18n';
import { 
  Briefcase, 
  Search, 
  Plus, 
  BookOpen, 
  Award, 
  GraduationCap, 
  CheckCircle, 
  Layers, 
  Printer, 
  FileText,
  ChevronRight,
  ExternalLink
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
  const [selectedJdId, setSelectedJdId] = useState<string>(jobDescriptions[0]?.id || '');

  const filteredJds = jobDescriptions.filter((jd) => 
    jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jd.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jd.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeJd = jobDescriptions.find((jd) => jd.id === selectedJdId) || jobDescriptions[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'የሥራ መደብ መግለጫና መስፈርቶች ሞጁል' : 'Job Description & Specification Module'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'am' ? 'የተቋሙ ይፋዊ የሥራ መደቦች መግለጫ (Job Descriptions)' : 'Official Directorate Job Descriptions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {lang === 'am'
              ? 'የቴክኖሎጂ ዳይሬክቶሬቱ የስራ መደቦች ዋና ዋና ተግባራት፣ ተፈላጊ ችሎታዎችና የውጤት መለኪያ አመልካቾች (KPIs)።'
              : 'Standardized job roles, core duties, educational requirements, and key performance indicators.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'am' ? 'ይህንን መደብ አትም' : 'Print JD'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Job Directory Selector (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'am' ? 'የስራ መደብ ፈልግ...' : 'Search position or level...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition"
            />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              {lang === 'am' ? 'የተመዘገቡ መደቦች' : 'Active Positions'} ({filteredJds.length})
            </span>

            {filteredJds.map((jd) => {
              const isSelected = jd.id === activeJd?.id;
              return (
                <button
                  key={jd.id}
                  onClick={() => setSelectedJdId(jd.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs leading-snug">
                      {jd.title}
                    </span>
                    <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 transition-transform ${isSelected ? 'text-amber-700 translate-x-1' : 'text-slate-300'}`} />
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-amber-700">
                    {jd.level}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500 truncate">
                    {jd.department}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Job Description Sheet (8 cols) */}
        {activeJd && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header info */}
            <div className="border-b border-slate-200 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="inline-block px-3 py-1 bg-amber-100/70 text-amber-900 rounded-md text-xs font-bold font-mono">
                  {activeJd.level}
                </span>
                <span className="text-xs text-slate-500">
                  {lang === 'am' ? 'ሪፖርት የሚያደርገው ለ:' : 'Reports To:'} <strong className="text-slate-800">{activeJd.reportsTo}</strong>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeJd.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {activeJd.titleEn}
              </p>
            </div>

            {/* 1. Job Objective */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>{lang === 'am' ? 'የሥራው ዋና ዓላማ (Job Purpose)' : 'Job Purpose / Objective'}</span>
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {activeJd.jobObjective}
              </p>
            </div>

            {/* 2. Main Duties and Responsibilities */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{lang === 'am' ? 'ዋና ዋና ተግባራትና ኃላፊነቶች (Main Duties & Responsibilities)' : 'Key Duties & Responsibilities'}</span>
              </h4>

              <div className="space-y-3">
                {activeJd.duties.map((duty, idx) => (
                  <div key={duty.id} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-xs">
                        {idx + 1}. {duty.title}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {duty.weightPercentage}% {lang === 'am' ? 'ድርሻ' : 'share'}
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
                        <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 text-[11px] font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-2">
                    {lang === 'am' ? 'የቴክኒክ ክህሎቶች (Technical Skills):' : 'Technical Competencies:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeJd.requirements.technicalSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 text-[11px]">
                        {s}
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
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-lg bg-purple-50/50 border border-purple-100">
                    <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{kpi}</span>
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
