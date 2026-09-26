import React, { useRef, useMemo } from 'react';
import { AppraisalRecord } from '../types/appraisal';
import { Language, translations } from '../utils/i18n';
import { calculateTotalTaskScore, calculateTotalCompetencyScore, getPerformanceGrade } from '../utils/calculations';
import { AuthUser } from '../types/auth';
import { 
  X, 
  FolderArchive, 
  Download, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  User, 
  Calendar, 
  Award,
  Plus
} from 'lucide-react';

interface SavedAppraisalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: AppraisalRecord[];
  currentId: string;
  onSelectRecord: (record: AppraisalRecord) => void;
  onDeleteRecord: (id: string) => void;
  onDuplicateRecord: (record: AppraisalRecord) => void;
  onNewRecord: () => void;
  onImportRecords: (records: AppraisalRecord[]) => void;
  lang: Language;
}

export const SavedAppraisalsModal: React.FC<SavedAppraisalsModalProps> = ({
  isOpen,
  onClose,
  savedList,
  currentId,
  onSelectRecord,
  onDeleteRecord,
  onDuplicateRecord,
  onNewRecord,
  onImportRecords,
  lang
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  if (!isOpen) return null;

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `performance_appraisals_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportRecords(parsed);
        } else if (parsed && parsed.id) {
          onImportRecords([parsed]);
        }
      } catch (err) {
        alert('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'am' ? 'የተቀመጡ የምዘና መዝገቦች' : 'Saved Appraisal Records'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'am'
                  ? `${savedList.length} የተመዘገቡ የሰራተኞች ምዘናዎች በስርዓቱ ውስጥ አሉ`
                  : `${savedList.length} records available in local storage`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Action Bar */}
        <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => {
              onNewRecord();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.newAppraisal}</span>
          </button>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJson}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium transition"
              title="Import JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'ፋይል አስገባ' : 'Import JSON'}</span>
            </button>
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium transition"
              title="Export all records as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'ባክአፕ ውሰድ' : 'Export JSON'}</span>
            </button>
          </div>
        </div>

        {/* List of Records */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {savedList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FolderArchive className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">ምንም የተቀመጠ የምዘና መረጃ የለም</p>
              <p className="text-xs mt-1">አዲስ ምዘና ለመጀመር ወይም ናሙና ለመጫን አዝራሮቹን ይጠቀሙ</p>
            </div>
          ) : (
            savedList.map((rec) => {
              const taskScore = calculateTotalTaskScore(rec.categories);
              const { totalOutOf40: compScore } = calculateTotalCompetencyScore(rec.competencies);
              const totalScore = Number((taskScore + compScore).toFixed(2));
              const grade = getPerformanceGrade(totalScore);
              const isCurrent = rec.id === currentId;

              return (
                <div
                  key={rec.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">
                        {rec.metadata.empName || (lang === 'am' ? 'ስም አልተገለጸም' : 'Unnamed Employee')}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                          Active
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-mono">
                        ({rec.metadata.empId || 'No ID'})
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="truncate max-w-xs">{rec.metadata.empPosition || 'No Position'}</span>
                      <span className="text-slate-400">·</span>
                      <span>{rec.metadata.evalPeriod || 'No Period'}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <span className="font-mono tabular-nums font-bold text-slate-800">
                        Total: <span className="text-blue-700">{totalScore.toFixed(2)}%</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${grade.bgClass} ${grade.colorClass} border ${grade.borderClass}`}>
                        {lang === 'am' ? grade.levelAm : grade.levelEn}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        {new Date(rec.updatedAt || rec.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {!isCurrent && (
                      <button
                        onClick={() => {
                          onSelectRecord(rec);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                      >
                        {lang === 'am' ? 'ምረጥ' : 'Open'}
                      </button>
                    )}
                    <button
                      onClick={() => onDuplicateRecord(rec)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                      title={lang === 'am' ? 'ቅጂ ፍጠር' : 'Duplicate'}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {savedList.length > 1 && (
                      <button
                        onClick={() => onDeleteRecord(rec.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title={lang === 'am' ? 'አጥፋ' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition"
          >
            {lang === 'am' ? 'ዝጋ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
