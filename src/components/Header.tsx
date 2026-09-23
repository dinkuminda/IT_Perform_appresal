import React from 'react';
import { Language, translations } from '../utils/i18n';
import { 
  FileText, 
  RotateCcw, 
  Printer, 
  Save, 
  FolderArchive, 
  Languages, 
  PlusCircle, 
  CheckCircle2 
} from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  onSave: () => void;
  onOpenArchive: () => void;
  onNewAppraisal: () => void;
  isSavedToast: boolean;
  totalScore: number;
  currentModule: 'dashboard' | 'appraisal' | 'monthly' | 'jobs';
  onSelectModule: (mod: 'dashboard' | 'appraisal' | 'monthly' | 'jobs') => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onLoadSample,
  onReset,
  onSave,
  onOpenArchive,
  onNewAppraisal,
  isSavedToast,
  totalScore,
  currentModule,
  onSelectModule
}) => {
  const t = translations[lang];

  return (
    <header className="bg-slate-900 text-white shadow-sm border-b border-slate-800 no-print sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Wordmark Brand */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onSelectModule('dashboard')}
              className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm cursor-pointer"
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white block leading-tight">
                {t.appTitle}
              </span>
              <span className="text-[11px] text-slate-400 block truncate max-w-xs sm:max-w-md">
                {t.institution} · {t.directorate}
              </span>
            </div>
          </div>

          {/* Module Switcher Buttons */}
          <div className="hidden md:flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => onSelectModule('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currentModule === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {lang === 'am' ? 'ዳሽቦርድ' : 'Dashboard'}
            </button>
            <button
              onClick={() => onSelectModule('appraisal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currentModule === 'appraisal'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {lang === 'am' ? 'የምዘና ቅጽ' : 'Appraisal'}
            </button>
            <button
              onClick={() => onSelectModule('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currentModule === 'monthly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {lang === 'am' ? 'ወርሃዊ ሪፖርት' : 'Monthly Report'}
            </button>
            <button
              onClick={() => onSelectModule('jobs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currentModule === 'jobs'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {lang === 'am' ? 'የሥራ መደቦች (JD)' : 'Job Descriptions'}
            </button>
          </div>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            {/* Realtime mini-score indicator */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded border border-slate-700/60 text-xs">
              <span className="text-slate-400">Total:</span>
              <span className="font-mono tabular-nums font-bold text-blue-400">
                {totalScore.toFixed(2)}%
              </span>
            </div>

            <button
              onClick={onOpenArchive}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
              title={t.tab4}
            >
              <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t.tab4}</span>
            </button>

            <button
              onClick={onSave}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all shadow-sm ${
                isSavedToast
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isSavedToast ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{t.saveAppraisal}</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
              title={t.printReport}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.printReport}</span>
            </button>

            {/* Language toggle */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
              title="ቋንቋ ቀይር / Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'am' ? 'English' : 'አማርኛ'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-800 gap-2">
          <button
            onClick={() => onSelectModule('dashboard')}
            className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${
              currentModule === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'am' ? 'ዳሽቦርድ' : 'Dashboard'}
          </button>
          <button
            onClick={() => onSelectModule('appraisal')}
            className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${
              currentModule === 'appraisal' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'am' ? 'የምዘና ቅጽ' : 'Appraisal'}
          </button>
          <button
            onClick={() => onSelectModule('monthly')}
            className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${
              currentModule === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'am' ? 'ወርሃዊ ሪፖርት' : 'Monthly Report'}
          </button>
          <button
            onClick={() => onSelectModule('jobs')}
            className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${
              currentModule === 'jobs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'am' ? 'የሥራ መደቦች' : 'Job Descriptions'}
          </button>
        </div>
      </div>
    </header>
  );
};
