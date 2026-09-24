import React from 'react';
import { Language, translations } from '../utils/i18n';
import { 
  Menu, 
  Save, 
  Printer, 
  Trash2,
  CheckCircle2, 
  Languages, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { getPerformanceGrade } from '../utils/calculations';

interface TopBarProps {
  currentModule: 'dashboard' | 'appraisal' | 'monthly' | 'jobs' | 'employees';
  lang: Language;
  onToggleLang: () => void;
  onToggleSidebarMobile: () => void;
  onSave: () => void;
  onPrint: () => void;
  onDelete?: () => void;
  isSavedToast: boolean;
  totalScore: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentModule,
  lang,
  onToggleLang,
  onToggleSidebarMobile,
  onSave,
  onPrint,
  onDelete,
  isSavedToast,
  totalScore
}) => {
  const t = translations[lang];
  const grade = getPerformanceGrade(totalScore);

  const getModuleTitle = () => {
    switch (currentModule) {
      case 'dashboard':
        return {
          am: 'የአፈጻጸም ዳሽቦርድ',
          en: 'Directorate Dashboard'
        };
      case 'employees':
        return {
          am: 'የባለሙያዎችና ሰራተኞች ማውጫ (Staff Directory)',
          en: 'Staff Directory & Profiles'
        };
      case 'appraisal':
        return {
          am: 'የሥራ አፈጻጸም ምዘና ቅጽ (100%)',
          en: 'Performance Appraisal Form (100%)'
        };
      case 'monthly':
        return {
          am: 'ወርሃዊ የሰራተኛ ክትትልና አፈጻጸም ሪፖርት',
          en: 'Monthly Employee Performance Report'
        };
      case 'jobs':
        return {
          am: 'የሥራ መደቦች መግለጫ (Job Descriptions)',
          en: 'Directorate Job Descriptions & KPIs'
        };
      default:
        return { am: 'ምዘና', en: 'Appraisal' };
    }
  };

  const title = getModuleTitle();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 no-print">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Hamburger & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebarMobile}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs text-slate-500 hidden sm:inline truncate">
              {lang === 'am' ? 'የኢሚግሬሽንና ዜግነት አገልግሎት' : 'Immigration & Citizenship'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {lang === 'am' ? title.am : title.en}
            </h2>
          </div>
        </div>

        {/* Right Side: Score indicator & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Score Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-500 font-medium">
              {lang === 'am' ? 'ድምር ውጤት:' : 'Live Score:'}
            </span>
            <span className="font-mono font-bold text-blue-700">
              {totalScore.toFixed(2)}%
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700 text-[11px]">
              {lang === 'am' ? grade.levelAm : grade.levelEn}
            </span>
          </div>

          {/* Delete Button (ሰርዝ) - Works on any active page */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer shadow-2xs"
              title={lang === 'am' ? 'ሰርዝ' : 'Delete'}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">{lang === 'am' ? 'ሰርዝ' : 'Delete'}</span>
            </button>
          )}

          {/* Save Button */}
          <button
            onClick={onSave}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer ${
              isSavedToast
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSavedToast ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ተቀምጧል</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.saveAppraisal}</span>
              </>
            )}
          </button>

          {/* Print Button */}
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title={t.printReport}
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.printReport}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'am' ? 'EN' : 'አማ'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
