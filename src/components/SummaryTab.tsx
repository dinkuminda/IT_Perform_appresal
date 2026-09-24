import React from 'react';
import { AppraisalRecord } from '../types/appraisal';
import { Language } from '../utils/i18n';
import { 
  calculateTotalTaskScore, 
  calculateTotalCompetencyScore, 
  getPerformanceGrade 
} from '../utils/calculations';
import { Printer, CheckCircle, Trash2 } from 'lucide-react';

interface SummaryTabProps {
  record: AppraisalRecord;
  onUpdateRecord: (updated: Partial<AppraisalRecord>) => void;
  lang: Language;
  onDeleteRecord?: () => void;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({
  record,
  onUpdateRecord,
  lang,
  onDeleteRecord
}) => {
  const { 
    metadata, 
    categories, 
    competencies, 
    supervisorSigned, 
    employeeSigned, 
    supervisorSignDate, 
    employeeSignDate 
  } = record;

  const taskScore = calculateTotalTaskScore(categories);
  const { totalOutOf40: compScore } = calculateTotalCompetencyScore(competencies);
  const totalScore = Number((taskScore + compScore).toFixed(2));
  const autoGrade = getPerformanceGrade(totalScore);

  const handleMetadataChange = (field: keyof typeof metadata, value: string) => {
    onUpdateRecord({
      metadata: {
        ...metadata,
        [field]: value
      }
    });
  };

  const toggleSupervisorSign = () => {
    const isNowSigned = !supervisorSigned;
    onUpdateRecord({
      supervisorSigned: isNowSigned,
      supervisorSignDate: isNowSigned ? (supervisorSignDate || new Date().toISOString().split('T')[0]) : ''
    });
  };

  const toggleEmployeeSign = () => {
    const isNowSigned = !employeeSigned;
    onUpdateRecord({
      employeeSigned: isNowSigned,
      employeeSignDate: isNowSigned ? (employeeSignDate || new Date().toISOString().split('T')[0]) : ''
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-10 mb-6 max-w-5xl mx-auto font-sans text-slate-900">
      {/* Top Action Bar (Print & Delete buttons) */}
      <div className="flex justify-end items-center gap-2 mb-4 print:hidden">
        {onDeleteRecord && (
          <button
            type="button"
            onClick={onDeleteRecord}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg shadow-2xs transition cursor-pointer"
            title={lang === 'am' ? 'ሰርዝ' : 'Delete'}
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>{lang === 'am' ? 'ሰርዝ' : 'Delete'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-slate-600" />
          <span>{lang === 'am' ? 'ሰነዱን አትም / Print' : 'Print Document'}</span>
        </button>
      </div>

      {/* 1. Official Header Title (underlined as in the official document) */}
      <div className="text-left pb-4 mb-3">
        <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight underline decoration-2 underline-offset-4">
          የአፈፃፀም ምዘናው ማጠቃለያ ውጤት መግለጫ
        </h2>
      </div>

      {/* 2. Official Metadata Bullet Points (strictly as in official document) */}
      <div className="space-y-2 text-xs sm:text-sm font-semibold mb-6 text-slate-900">
        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-base leading-none">•</span>
          <span className="font-bold text-slate-900 whitespace-nowrap">የሠራተኛው ሙሉ ስም:-</span>
          <input
            type="text"
            value={metadata.empName || 'ሊዲያ ግሩም ገብረስላሴ'}
            onChange={(e) => handleMetadataChange('empName', e.target.value)}
            placeholder="ሊዲያ ግሩም ገብረስላሴ"
            className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-base leading-none">•</span>
          <span className="font-bold text-slate-900 whitespace-nowrap">የሥራ ክፍሉ:-</span>
          <input
            type="text"
            value={metadata.empDept || 'ተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት'}
            onChange={(e) => handleMetadataChange('empDept', e.target.value)}
            placeholder="ተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት"
            className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-base leading-none">•</span>
          <span className="font-bold text-slate-900 whitespace-nowrap">ሥራ መደቡ:-</span>
          <input
            type="text"
            value={metadata.empPosition || 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII'}
            onChange={(e) => handleMetadataChange('empPosition', e.target.value)}
            placeholder="ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII"
            className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-base leading-none">•</span>
          <span className="font-bold text-slate-900 whitespace-nowrap">የአፈፃፀም ምዘናው ጊዜ :-</span>
          <input
            type="text"
            value={metadata.evalPeriod || 'ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም'}
            onChange={(e) => handleMetadataChange('evalPeriod', e.target.value)}
            placeholder="ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም"
            className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-slate-800 text-base leading-none">•</span>
          <span className="font-bold text-slate-900 whitespace-nowrap">
            የአፈፃፀም ምዘናው ውጤት መግለጫ----------------------------------------------------------------------------------------------------
          </span>
        </div>
      </div>

      {/* 3. Official Summary Table (strictly matching the uploaded image format) */}
      <div className="overflow-x-auto rounded border border-slate-400 shadow-2xs mb-8">
        <table className="w-full text-xs sm:text-sm text-center border-collapse border border-slate-400">
          <thead>
            {/* Header Row 1 */}
            <tr className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-400">
              <th
                rowSpan={2}
                className="border-r border-b border-slate-400 p-3 sm:p-4 w-1/4 text-center align-middle font-extrabold"
              >
                የምዘና ጊዜያት
              </th>
              <th
                colSpan={4}
                className="border-b border-slate-400 p-2 sm:p-2.5 text-center font-extrabold"
              >
                የውጤት ተኮር እቅድ አፈፃፀም
              </th>
            </tr>

            {/* Header Row 2 */}
            <tr className="bg-slate-50 text-slate-900 font-bold border-b border-slate-400 text-[11px] sm:text-xs">
              <th className="border-r border-b border-slate-400 p-2 text-center w-1/5 leading-snug">
                አፈፃፀም ከእቅድ ጋር በማነፃፀር(60%)
              </th>
              <th className="border-r border-b border-slate-400 p-2 text-center w-1/4 leading-snug">
                ሥራዎች በሚከናወኑበት ሂደት አስፈላጊ የሆኑ ባህሪያት አፈፃፀም (40%)
              </th>
              <th className="border-r border-b border-slate-400 p-2 text-center w-24 leading-snug">
                ድምር ከ 100 %
              </th>
              <th className="border-b border-slate-400 p-2 text-center w-24 leading-snug">
                የአፈፃፀም ደረጃ
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            <tr className="divide-x divide-slate-400 text-slate-900">
              {/* Period Cycle Column */}
              <td className="p-3.5 sm:p-4 text-center font-bold text-slate-900 text-xs sm:text-sm">
                የግማሽ ዓመት የተጠቃለለ አፈፃፀም
              </td>

              {/* Task Score Column (60%) */}
              <td className="p-3.5 sm:p-4 text-center font-mono font-bold text-sm sm:text-base text-slate-900">
                {Number.isInteger(taskScore) ? taskScore : taskScore.toFixed(1)}
              </td>

              {/* Competency Score Column (40%) */}
              <td className="p-3.5 sm:p-4 text-center font-mono font-bold text-sm sm:text-base text-slate-900">
                {Number.isInteger(compScore) ? compScore : compScore.toFixed(1)}
              </td>

              {/* Total Sum Column (100%) */}
              <td className="p-3.5 sm:p-4 text-center font-mono font-black text-sm sm:text-base text-slate-950">
                {Number.isInteger(totalScore) ? totalScore : totalScore.toFixed(1)}
              </td>

              {/* Performance Grade Level Column */}
              <td className="p-3.5 sm:p-4 text-center font-extrabold text-xs sm:text-sm text-slate-900">
                <span className="font-bold text-slate-900">
                  {autoGrade.levelAm}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Official Signatures Section (strictly as in the official document) */}
      <div className="space-y-4 pt-4 text-xs sm:text-sm font-semibold text-slate-900">
        {/* Supervisor Signature Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 min-w-[280px]">
            <span className="font-bold whitespace-nowrap">የቅርብ ኃላፊው ሙሉ ስም:</span>
            <input
              type="text"
              value={metadata.supervisorName || 'ምንዳዬ ሀይሌ'}
              onChange={(e) => handleMetadataChange('supervisorName', e.target.value)}
              placeholder="ምንዳዬ ሀይሌ"
              className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <button
              type="button"
              onClick={toggleSupervisorSign}
              className="font-bold cursor-pointer text-slate-900 hover:text-blue-700 transition select-none"
              title="ፊርማ ለማረጋገጥ ይጫኑ"
            >
              ፊርማ -------------------
              {supervisorSigned && (
                <span className="ml-1 inline-flex items-center text-emerald-700 font-bold text-xs bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300 print:bg-transparent print:border-none">
                  <CheckCircle className="w-3 h-3 inline mr-0.5" /> በፊርማ ጸድቋል
                </span>
              )}
            </button>

            <span className="font-bold whitespace-nowrap ml-auto">ቀን</span>
            <input
              type="text"
              value={supervisorSignDate || metadata.evalDate || '2018-06-30'}
              onChange={(e) => onUpdateRecord({ supervisorSignDate: e.target.value })}
              placeholder="2018-06-30"
              className="w-32 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-900 text-center focus:outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>

        {/* Employee Signature Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
          <div className="flex items-center gap-1.5 min-w-[280px]">
            <span className="font-bold whitespace-nowrap">የሠራተኛው ስም:</span>
            <input
              type="text"
              value={metadata.empName || 'ሊዲያ ግሩም ገብረስላሴ'}
              onChange={(e) => handleMetadataChange('empName', e.target.value)}
              placeholder="ሊዲያ ግሩም ገብረስላሴ"
              className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <button
              type="button"
              onClick={toggleEmployeeSign}
              className="font-bold cursor-pointer text-slate-900 hover:text-blue-700 transition select-none"
              title="ፊርማ ለማረጋገጥ ይጫኑ"
            >
              ፊርማ -------------------
              {employeeSigned && (
                <span className="ml-1 inline-flex items-center text-emerald-700 font-bold text-xs bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300 print:bg-transparent print:border-none">
                  <CheckCircle className="w-3 h-3 inline mr-0.5" /> በፊርማ ጸድቋል
                </span>
              )}
            </button>

            <span className="font-bold whitespace-nowrap ml-auto">ቀን</span>
            <input
              type="text"
              value={employeeSignDate || metadata.evalDate || '2018-06-30'}
              onChange={(e) => onUpdateRecord({ employeeSignDate: e.target.value })}
              placeholder="2018-06-30"
              className="w-32 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-900 text-center focus:outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
