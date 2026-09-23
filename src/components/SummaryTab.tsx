import React from 'react';
import { AppraisalRecord } from '../types/appraisal';
import { Language, translations } from '../utils/i18n';
import { 
  calculateTotalTaskScore, 
  calculateTotalCompetencyScore, 
  getPerformanceGrade 
} from '../utils/calculations';
import { 
  CheckCircle2, 
  Printer, 
  Award, 
  FileCheck, 
  PenTool, 
  Stamp,
  Calendar,
  UserCheck
} from 'lucide-react';

interface SummaryTabProps {
  record: AppraisalRecord;
  onUpdateRecord: (updated: Partial<AppraisalRecord>) => void;
  lang: Language;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({
  record,
  onUpdateRecord,
  lang
}) => {
  const t = translations[lang];
  const { metadata, categories, competencies, supervisorComments, employeeComments, supervisorSigned, employeeSigned, supervisorSignDate, employeeSignDate } = record;

  const taskScore = calculateTotalTaskScore(categories);
  const { totalOutOf40: compScore } = calculateTotalCompetencyScore(competencies);
  const totalScore = Number((taskScore + compScore).toFixed(2));
  const grade = getPerformanceGrade(totalScore);

  const toggleSupervisorSign = () => {
    const isNowSigned = !supervisorSigned;
    onUpdateRecord({
      supervisorSigned: isNowSigned,
      supervisorSignDate: isNowSigned ? new Date().toISOString().split('T')[0] : ''
    });
  };

  const toggleEmployeeSign = () => {
    const isNowSigned = !employeeSigned;
    onUpdateRecord({
      employeeSigned: isNowSigned,
      employeeSignDate: isNowSigned ? new Date().toISOString().split('T')[0] : ''
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
      {/* Official Header */}
      <div className="text-center pb-6 mb-6 border-b border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t.institution}
        </h2>
        <h3 className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
          {t.directorate}
        </h3>
        <h4 className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wider mt-2.5 inline-block px-3 py-1 bg-blue-50 rounded-md border border-blue-100">
          {t.summaryHeader}
        </h4>
      </div>

      {/* Employee Metadata Info Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-8 bg-slate-50/80 p-4 rounded-xl border border-slate-200/90">
        <div>
          <span className="text-slate-500 block">{t.empName}:</span>
          <span className="font-bold text-slate-900 text-sm mt-0.5 block truncate">
            {metadata.empName || '---'}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">{t.empId}:</span>
          <span className="font-mono font-bold text-slate-800 mt-0.5 block">
            {metadata.empId || '---'}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">{t.empPosition}:</span>
          <span className="font-semibold text-slate-800 mt-0.5 block truncate">
            {metadata.empPosition || '---'}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">{t.evalPeriod}:</span>
          <span className="font-semibold text-slate-800 mt-0.5 block">
            {metadata.evalPeriod || '---'}
          </span>
        </div>
      </div>

      {/* 3 Dominant Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Task Score Card (60%) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center relative overflow-hidden">
          <div className="absolute top-3 right-3 text-blue-200">
            <FileCheck className="w-8 h-8 opacity-40" />
          </div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            {t.cardTaskTitle}
          </span>
          <span className="text-4xl font-black font-mono tabular-nums text-slate-900 my-2 block">
            {taskScore.toFixed(2)}
          </span>
          <span className="text-xs font-medium text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 inline-block">
            {t.cardTaskSub}
          </span>
        </div>

        {/* Competencies Score Card (40%) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center relative overflow-hidden">
          <div className="absolute top-3 right-3 text-emerald-200">
            <Award className="w-8 h-8 opacity-40" />
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            {t.cardCompTitle}
          </span>
          <span className="text-4xl font-black font-mono tabular-nums text-slate-900 my-2 block">
            {compScore.toFixed(2)}
          </span>
          <span className="text-xs font-medium text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 inline-block">
            {t.cardCompSub}
          </span>
        </div>

        {/* Total Score Card (100%) */}
        <div className="bg-blue-900 text-white rounded-xl p-5 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-3 right-3 text-blue-400">
            <Stamp className="w-8 h-8 opacity-25" />
          </div>
          <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block">
            {t.cardTotalTitle}
          </span>
          <span className="text-4xl font-black font-mono tabular-nums text-white my-2 block">
            {totalScore.toFixed(2)}%
          </span>
          <span className="text-xs font-bold text-blue-100 bg-blue-800/80 px-2.5 py-0.5 rounded-full border border-blue-700 inline-block">
            {lang === 'am' ? grade.levelAm : grade.levelEn}
          </span>
        </div>
      </div>

      {/* Official Breakdown Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-300 mb-6">
        <table className="w-full text-xs sm:text-sm border-collapse">
          <thead className="bg-slate-100 text-slate-800 font-bold">
            <tr>
              <th className="border-r border-b border-slate-300 p-3 text-center w-1/4" rowSpan={2}>
                {lang === 'am' ? 'የምዘና ጊዜያት' : 'Evaluation Period Cycle'}
              </th>
              <th className="border-b border-slate-300 p-3 text-center" colSpan={4}>
                {lang === 'am' ? 'የውጤት ተኮር ዕቅድ አፈጻጸም ማጠቃለያ' : 'Summary of Result-Oriented Plan Performance'}
              </th>
            </tr>
            <tr className="bg-slate-50 text-slate-700 text-xs">
              <th className="border-r border-b border-slate-300 p-2 text-center w-1/5">
                {lang === 'am' ? 'አፈጻጸም ከዕቅድ ጋር (60%)' : 'Task Performance (60%)'}
              </th>
              <th className="border-r border-b border-slate-300 p-2 text-center w-1/5">
                {lang === 'am' ? 'የባህሪያት አፈጻጸም (40%)' : 'Core Competencies (40%)'}
              </th>
              <th className="border-r border-b border-slate-300 p-2 text-center w-1/5">
                {lang === 'am' ? 'ድምር ከ 100%' : 'Total out of 100%'}
              </th>
              <th className="border-b border-slate-300 p-2 text-center w-1/5">
                {t.ratingGrade}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr>
              <td className="border-r border-slate-300 p-3.5 font-semibold text-center text-slate-800">
                {metadata.evalPeriod || (lang === 'am' ? 'የአጋማሽ ዓመት የተጠቃለለ አፈጻጸም' : 'Mid-Year Comprehensive')}
              </td>
              <td className="border-r border-slate-300 p-3.5 text-center font-mono tabular-nums font-bold text-blue-700">
                {taskScore.toFixed(2)}
              </td>
              <td className="border-r border-slate-300 p-3.5 text-center font-mono tabular-nums font-bold text-emerald-700">
                {compScore.toFixed(2)}
              </td>
              <td className="border-r border-slate-300 p-3.5 text-center font-mono tabular-nums font-black text-slate-900 text-base">
                {totalScore.toFixed(2)}%
              </td>
              <td className={`p-3.5 text-center font-black ${grade.colorClass}`}>
                <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${grade.bgClass} border ${grade.borderClass}`}>
                  {lang === 'am' ? grade.levelAm : grade.levelEn}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Benchmark Standards Legend */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-8">
        <span className="font-bold text-slate-800 block mb-2">{t.ratingLegendTitle}:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-2 rounded bg-emerald-50 border border-emerald-200/80">
            <span className="font-bold text-emerald-800 block">{t.levelVeryHigh}</span>
            <span className="text-[11px] text-emerald-600">የላቀ ውጤት (Outstanding)</span>
          </div>
          <div className="p-2 rounded bg-blue-50 border border-blue-200/80">
            <span className="font-bold text-blue-800 block">{t.levelHigh}</span>
            <span className="text-[11px] text-blue-600">ከሚጠበቀው በላይ (Exceeds)</span>
          </div>
          <div className="p-2 rounded bg-amber-50 border border-amber-200/80">
            <span className="font-bold text-amber-800 block">{t.levelSatisfactory}</span>
            <span className="text-[11px] text-amber-600">ደረጃውን ያሟላ (Meets standards)</span>
          </div>
          <div className="p-2 rounded bg-rose-50 border border-rose-200/80">
            <span className="font-bold text-rose-800 block">{t.levelLow}</span>
            <span className="text-[11px] text-rose-600">ማሻሻያ የሚያስፈልገው (Needs Improvement)</span>
          </div>
        </div>
      </div>

      {/* Narrative Feedback Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Supervisor Comments */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>{t.supervisorCommentsLabel}</span>
          </label>
          <textarea
            value={supervisorComments}
            onChange={(e) => onUpdateRecord({ supervisorComments: e.target.value })}
            placeholder={lang === 'am' ? 'የቅርብ ኃላፊው በምዘናው ወቅት የታዩ ጠንካራ ጎኖችንና የማሻሻያ ነጥቦችን እዚህ ያሰፍራሉ...' : 'Enter supervisor appraisal remarks, key strengths, and recommendations...'}
            rows={4}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Employee Comments */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-indigo-600" />
            <span>{t.employeeCommentsLabel}</span>
          </label>
          <textarea
            value={employeeComments}
            onChange={(e) => onUpdateRecord({ employeeComments: e.target.value })}
            placeholder={lang === 'am' ? 'ሰራተኛው በምዘናው ውጤት ላይ ያገኘውን አስተያየትና በቀጣይ ለማከናወን ያሰበውን እዚህ ያሰፍራል...' : 'Enter employee comments, reflections, and commitments for the next cycle...'}
            rows={4}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
        </div>
      </div>

      {/* Signatures & Approval Blocks */}
      <div className="pt-6 border-t border-slate-300 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Supervisor Signature Box */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800">{t.supervisorSig}</span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                supervisorSigned
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {supervisorSigned ? t.signed : t.notSigned}
            </span>
          </div>

          <div className="text-xs text-slate-700 space-y-1.5 mb-4">
            <div>
              <strong>{lang === 'am' ? 'የኃላፊው ስም፡' : 'Name:'}</strong>{' '}
              <span className="font-semibold">{metadata.supervisorName || '---'}</span>
            </div>
            <div>
              <strong>{lang === 'am' ? 'የተፈረመበት ቀን፡' : 'Date:'}</strong>{' '}
              <span className="font-mono">{supervisorSignDate || metadata.evalDate || '---'}</span>
            </div>
          </div>

          <button
            onClick={toggleSupervisorSign}
            className={`w-full py-2 px-3 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              supervisorSigned
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          >
            {supervisorSigned ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'am' ? 'ፊርማውን አጽድቅ (Signed)' : 'Signature Confirmed'}</span>
              </>
            ) : (
              <>
                <PenTool className="w-3.5 h-3.5" />
                <span>{t.signNow}</span>
              </>
            )}
          </button>
        </div>

        {/* Employee Signature Box */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800">{t.employeeSig}</span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                employeeSigned
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {employeeSigned ? t.signed : t.notSigned}
            </span>
          </div>

          <div className="text-xs text-slate-700 space-y-1.5 mb-4">
            <div>
              <strong>{lang === 'am' ? 'የሰራተኛው ስም፡' : 'Name:'}</strong>{' '}
              <span className="font-semibold">{metadata.empName || '---'}</span>
            </div>
            <div>
              <strong>{lang === 'am' ? 'የተፈረመበት ቀን፡' : 'Date:'}</strong>{' '}
              <span className="font-mono">{employeeSignDate || metadata.evalDate || '---'}</span>
            </div>
          </div>

          <button
            onClick={toggleEmployeeSign}
            className={`w-full py-2 px-3 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              employeeSigned
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            {employeeSigned ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'am' ? 'ተፈርሟል (Signed)' : 'Signature Confirmed'}</span>
              </>
            ) : (
              <>
                <PenTool className="w-3.5 h-3.5" />
                <span>{t.signNow}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Print Action Banner */}
      <div className="text-center pt-4 no-print border-t border-slate-200">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition cursor-pointer text-sm"
        >
          <Printer className="w-4 h-4" />
          <span>{t.printReport}</span>
        </button>
      </div>
    </div>
  );
};
