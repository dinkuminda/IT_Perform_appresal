import React from 'react';
import { Language, translations } from '../utils/i18n';
import { AppraisalRecord } from '../types/appraisal';
import { getPerformanceGrade } from '../utils/calculations';
import { 
  BarChart3, 
  FileSpreadsheet, 
  CalendarDays, 
  Briefcase, 
  FolderArchive, 
  PlusCircle, 
  FileText, 
  RotateCcw, 
  X, 
  ShieldCheck, 
  ChevronRight,
  UserCheck,
  Building2,
  ExternalLink,
  Users
} from 'lucide-react';

interface SidebarProps {
  currentModule: 'dashboard' | 'appraisal' | 'monthly' | 'jobs' | 'employees';
  onSelectModule: (mod: 'dashboard' | 'appraisal' | 'monthly' | 'jobs' | 'employees') => void;
  lang: Language;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onNewAppraisal: () => void;
  onLoadSample: () => void;
  onOpenArchive: () => void;
  onReset: () => void;
  savedCount: number;
  employeesCount?: number;
  activeRecord: AppraisalRecord;
  totalScore: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  lang,
  isOpenMobile,
  onCloseMobile,
  onNewAppraisal,
  onLoadSample,
  onOpenArchive,
  onReset,
  savedCount,
  employeesCount = 6,
  activeRecord,
  totalScore
}) => {
  const t = translations[lang];
  const grade = getPerformanceGrade(totalScore);

  const navItems = [
    {
      id: 'dashboard' as const,
      labelAm: 'ዳሽቦርድ',
      labelEn: 'Dashboard',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'employees' as const,
      labelAm: 'የሰራተኞች ማውጫና ፕሮፋይል',
      labelEn: 'Staff Directory & Profiles',
      icon: Users,
      badge: `${employeesCount} ሰራተኞች`
    },
    {
      id: 'appraisal' as const,
      labelAm: 'የሥራ አፈጻጸም ምዘና (100%)',
      labelEn: 'Performance Appraisal',
      icon: FileSpreadsheet,
      badge: `${totalScore.toFixed(1)}%`
    },
    {
      id: 'monthly' as const,
      labelAm: 'ወርሃዊ የስራ ሪፖርት',
      labelEn: 'Monthly Progress Report',
      icon: CalendarDays,
      badge: 'Active'
    },
    {
      id: 'jobs' as const,
      labelAm: 'የሥራ መደቦች መግለጫ (JD)',
      labelEn: 'Job Descriptions & KPIs',
      icon: Briefcase,
      badge: '3 መደቦች'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto no-print ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Organization Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] tracking-wider uppercase text-blue-400 font-bold block">
                {lang === 'am' ? 'ኢ.ፌ.ዴ.ሪ' : 'FDRE'}
              </span>
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight truncate">
                {lang === 'am' ? 'የኢሚግሬሽንና ዜግነት አገልግሎት' : 'Immigration & Citizenship'}
              </h1>
              <span className="text-[11px] text-slate-400 block truncate">
                {lang === 'am' ? 'የተቋማዊ ቴክኖሎጂ አስተዳደር' : 'IT Administration Directorate'}
              </span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation section */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Section 1: Main Modules */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider uppercase text-slate-400">
              {lang === 'am' ? 'ዋና ዋና ሞጁሎች' : 'Primary Modules'}
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectModule(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{lang === 'am' ? item.labelAm : item.labelEn}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                          isActive
                            ? 'bg-blue-700/80 text-white'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Section 2: Management & Records Actions */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider uppercase text-slate-400">
              {lang === 'am' ? 'የምዘና አስተዳደር መሳሪያዎች' : 'Record Management'}
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onNewAppraisal();
                  onSelectModule('appraisal');
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.newAppraisal}</span>
              </button>

              <button
                onClick={() => {
                  onOpenArchive();
                  onCloseMobile();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FolderArchive className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t.tab4}</span>
                </div>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  {savedCount}
                </span>
              </button>

              <button
                onClick={() => {
                  onLoadSample();
                  onSelectModule('appraisal');
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t.loadSample}</span>
              </button>

              <button
                onClick={onReset}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{t.resetForm}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer: Active Employee Summary Card */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'am' ? 'ገባሪ ሰራተኛ' : 'Active Employee'}
                  </span>
                  <span className="text-xs font-bold text-white block truncate leading-tight">
                    {activeRecord.metadata.empName || (lang === 'am' ? 'ያልተገለጸ ሰራተኛ' : 'Unnamed Staff')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-700/60">
              <span className="font-mono text-slate-400">
                {activeRecord.metadata.empId || 'No ID'}
              </span>
              <div className="flex items-center gap-1 font-bold">
                <span className="text-blue-400 font-mono">{totalScore.toFixed(1)}%</span>
                <span className="text-[9px] text-slate-400">({grade.levelAm})</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
