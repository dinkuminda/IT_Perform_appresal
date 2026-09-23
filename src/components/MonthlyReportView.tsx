import React, { useState } from 'react';
import { MonthlyReport, MonthlyTaskItem, EthiopianMonth } from '../types/monthlyReport';
import { Language } from '../utils/i18n';
import { 
  CalendarDays, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  User, 
  Send,
  Star
} from 'lucide-react';

interface MonthlyReportViewProps {
  reports: MonthlyReport[];
  onSaveReport: (report: MonthlyReport) => void;
  lang: Language;
}

const ETHIOPIAN_MONTHS: EthiopianMonth[] = [
  'መስከረም', 'ጥቅምት', 'ሕዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ'
];

export const MonthlyReportView: React.FC<MonthlyReportViewProps> = ({
  reports,
  onSaveReport,
  lang
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || '');
  const [currentReport, setCurrentReport] = useState<MonthlyReport>(reports[0] || {
    id: `rep-${Date.now()}`,
    employeeId: 'ICS-IT-0482',
    employeeName: 'ሊዲያ ግሩም ገብረስላሴ',
    position: 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
    department: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
    supervisorName: 'ምንዳዬ ሀይሌ',
    year: 2018,
    month: 'ሰኔ',
    reportDate: new Date().toISOString().split('T')[0],
    tasks: [],
    challengesFaced: '',
    solutionsTaken: '',
    supportNeeded: '',
    nextMonthPlan: '',
    supervisorRating: 4,
    supervisorComments: '',
    supervisorSigned: false,
    employeeSigned: false,
    status: 'draft'
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectReport = (r: MonthlyReport) => {
    setSelectedReportId(r.id);
    setCurrentReport(r);
  };

  const handleCreateNewReport = () => {
    const newRep: MonthlyReport = {
      id: `rep-${Date.now()}`,
      employeeId: currentReport.employeeId || 'ICS-IT-0482',
      employeeName: currentReport.employeeName || 'ሊዲያ ግሩም ገብረስላሴ',
      position: currentReport.position || 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII',
      department: currentReport.department || 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
      supervisorName: currentReport.supervisorName || 'ምንዳዬ ሀይሌ',
      year: 2018,
      month: 'ሰኔ',
      reportDate: new Date().toISOString().split('T')[0],
      tasks: [
        {
          id: `task-${Date.now()}-1`,
          taskTitle: '',
          plannedTarget: '',
          achievedResult: '',
          progressPercent: 100,
          status: 'completed',
          evidenceOrRemark: ''
        }
      ],
      challengesFaced: '',
      solutionsTaken: '',
      supportNeeded: '',
      nextMonthPlan: '',
      supervisorRating: 4,
      supervisorComments: '',
      supervisorSigned: false,
      employeeSigned: false,
      status: 'draft'
    };
    setCurrentReport(newRep);
    onSaveReport(newRep);
    showToast(lang === 'am' ? 'አዲስ ወርሃዊ ሪፖርት ተከፍቷል' : 'New monthly report created');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddTask = () => {
    const newTask: MonthlyTaskItem = {
      id: `task-${Date.now()}`,
      taskTitle: '',
      plannedTarget: '',
      achievedResult: '',
      progressPercent: 100,
      status: 'completed',
      evidenceOrRemark: ''
    };
    const updated = {
      ...currentReport,
      tasks: [...currentReport.tasks, newTask]
    };
    setCurrentReport(updated);
  };

  const handleUpdateTask = (id: string, updates: Partial<MonthlyTaskItem>) => {
    const updatedTasks = currentReport.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setCurrentReport({ ...currentReport, tasks: updatedTasks });
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = currentReport.tasks.filter((t) => t.id !== id);
    setCurrentReport({ ...currentReport, tasks: updatedTasks });
  };

  const handleSave = () => {
    onSaveReport(currentReport);
    showToast(lang === 'am' ? 'ወርሃዊ ሪፖርቱ በተሳካ ሁኔታ ተቀምጧል' : 'Monthly report saved successfully');
  };

  const handlePrint = () => {
    window.print();
  };

  // Average progress of tasks
  const avgProgress = currentReport.tasks.length > 0
    ? Math.round(currentReport.tasks.reduce((sum, t) => sum + (t.progressPercent || 0), 0) / currentReport.tasks.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'ወርሃዊ የሥራ አፈጻጸም ሪፖርት ማጠቃለያ' : 'Monthly Employee Activity & Progress Report'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'am' ? 'ወርሃዊ የሰራተኛ ክትትልና አፈጻጸም ሪፖርት' : 'Monthly Employee Performance Tracking'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {lang === 'am'
              ? 'በየወሩ የታቀዱ ተግባራት፣ የተገኙ ውጤቶች፣ ያጋጠሙ ተግዳሮቶችና የቅርብ ኃላፊ ምዘና መመዝገቢያ ቅጽ።'
              : 'Log and track monthly outputs, tasks accomplished vs planned, bottlenecks, and supervisor endorsements.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCreateNewReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'am' ? 'አዲስ ወር ሪፖርት' : 'New Month Report'}</span>
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{lang === 'am' ? 'አስቀምጥ' : 'Save Report'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'am' ? 'አትም (Print)' : 'Print'}</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Form Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        {/* Header Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {lang === 'am' ? 'የሰራተኛው ሙሉ ስም' : 'Employee Name'}
            </label>
            <input
              type="text"
              value={currentReport.employeeName}
              onChange={(e) => setCurrentReport({ ...currentReport, employeeName: e.target.value })}
              className="w-full p-2 bg-white rounded-lg border border-slate-300 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {lang === 'am' ? 'የመለያ ቁጥር (ID)' : 'Employee ID'}
            </label>
            <input
              type="text"
              value={currentReport.employeeId}
              onChange={(e) => setCurrentReport({ ...currentReport, employeeId: e.target.value })}
              className="w-full p-2 bg-white rounded-lg border border-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {lang === 'am' ? 'የሪፖርቱ ወር' : 'Report Month'}
            </label>
            <select
              value={currentReport.month}
              onChange={(e) => setCurrentReport({ ...currentReport, month: e.target.value as EthiopianMonth })}
              className="w-full p-2 bg-white rounded-lg border border-slate-300 font-bold text-blue-700"
            >
              {ETHIOPIAN_MONTHS.map((m) => (
                <option key={m} value={m}>{m} {currentReport.year} ዓ.ም</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {lang === 'am' ? 'የቅርብ ኃላፊ ስም' : 'Supervisor Name'}
            </label>
            <input
              type="text"
              value={currentReport.supervisorName}
              onChange={(e) => setCurrentReport({ ...currentReport, supervisorName: e.target.value })}
              className="w-full p-2 bg-white rounded-lg border border-slate-300"
            />
          </div>
        </div>

        {/* Section 1: Monthly Tasks Executed */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                1. {lang === 'am' ? 'በወሩ የታቀዱና የተከናወኑ ዋና ዋና ተግባራት' : 'Key Tasks Planned & Accomplished This Month'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'am' ? 'የታቀዱት ውጤቶች እና የተገኙ ተጨባጭ አፈጻጸሞች' : 'List deliverables, execution metrics, and completion percentage'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                {lang === 'am' ? 'አማካይ አፈጻጸም:' : 'Avg Progress:'} {avgProgress}%
              </span>
              <button
                onClick={handleAddTask}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'am' ? 'ተግባር ጨምር' : 'Add Task'}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 font-bold text-slate-700 text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-2.5 w-8 text-center">#</th>
                  <th className="p-2.5 w-1/4">{lang === 'am' ? 'የተከናወነ ተግባር ርዕስ' : 'Task Activity'}</th>
                  <th className="p-2.5 w-1/4">{lang === 'am' ? 'የታቀደ ግብ (Target)' : 'Planned Target'}</th>
                  <th className="p-2.5 w-1/4">{lang === 'am' ? 'የተገኘ ውጤት (Achieved Result)' : 'Achieved Result'}</th>
                  <th className="p-2.5 w-24 text-center">{lang === 'am' ? 'አፈጻጸም %' : 'Progress %'}</th>
                  <th className="p-2.5 w-24 text-center">{lang === 'am' ? 'ሁኔታ' : 'Status'}</th>
                  <th className="p-2.5 w-8 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {currentReport.tasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-6 text-slate-400">
                      {lang === 'am' ? 'ምንም ተግባር አልተመዘገበም። "ተግባር ጨምር" የሚለውን ይጫኑ።' : 'No tasks added yet. Click "Add Task".'}
                    </td>
                  </tr>
                ) : (
                  currentReport.tasks.map((task, idx) => (
                    <tr key={task.id} className="hover:bg-slate-50/50">
                      <td className="p-2.5 text-center font-bold text-slate-500 font-mono">
                        {idx + 1}
                      </td>

                      <td className="p-2">
                        <textarea
                          rows={2}
                          value={task.taskTitle}
                          onChange={(e) => handleUpdateTask(task.id, { taskTitle: e.target.value })}
                          placeholder={lang === 'am' ? 'የተግባሩ ዝርዝር...' : 'Task title...'}
                          className="w-full p-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      <td className="p-2">
                        <textarea
                          rows={2}
                          value={task.plannedTarget}
                          onChange={(e) => handleUpdateTask(task.id, { plannedTarget: e.target.value })}
                          placeholder={lang === 'am' ? 'የታቀደው መጠን/ዒላማ...' : 'Planned target...'}
                          className="w-full p-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      <td className="p-2">
                        <textarea
                          rows={2}
                          value={task.achievedResult}
                          onChange={(e) => handleUpdateTask(task.id, { achievedResult: e.target.value })}
                          placeholder={lang === 'am' ? 'የተገኘው ተጨባጭ ውጤት...' : 'Achieved result...'}
                          className="w-full p-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      <td className="p-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={task.progressPercent}
                          onChange={(e) => handleUpdateTask(task.id, { progressPercent: Number(e.target.value) })}
                          className="w-16 p-1.5 text-center font-mono font-bold border border-slate-300 rounded text-xs"
                        />
                        <span className="text-[10px] text-slate-500 block mt-0.5">%</span>
                      </td>

                      <td className="p-2 text-center">
                        <select
                          value={task.status}
                          onChange={(e) => handleUpdateTask(task.id, { status: e.target.value as any })}
                          className="p-1 border border-slate-300 rounded text-[11px] font-semibold"
                        >
                          <option value="completed">{lang === 'am' ? 'የተጠናቀቀ' : 'Completed'}</option>
                          <option value="in-progress">{lang === 'am' ? 'በሂደት ላይ' : 'In Progress'}</option>
                          <option value="delayed">{lang === 'am' ? 'የዘገየ' : 'Delayed'}</option>
                        </select>
                      </td>

                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded"
                          title="Delete task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Challenges, Solutions & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <label className="font-bold text-slate-800 text-xs block mb-1">
              2. {lang === 'am' ? 'ያጋጠሙ ተግዳሮቶች (Challenges Encountered)' : 'Challenges & Bottlenecks'}
            </label>
            <textarea
              rows={3}
              value={currentReport.challengesFaced}
              onChange={(e) => setCurrentReport({ ...currentReport, challengesFaced: e.target.value })}
              placeholder={lang === 'am' ? 'በወሩ ስራዎችን ለማከናወን ያጋጠሙ ችግሮች...' : 'Issues or obstacles faced...'}
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <label className="font-bold text-slate-800 text-xs block mb-1">
              3. {lang === 'am' ? 'የተወሰዱ የመፍትሔ እርምጃዎች (Solutions Taken)' : 'Solutions & Actions Taken'}
            </label>
            <textarea
              rows={3}
              value={currentReport.solutionsTaken}
              onChange={(e) => setCurrentReport({ ...currentReport, solutionsTaken: e.target.value })}
              placeholder={lang === 'am' ? 'ችግሮቹን ለመፍታት የተወሰዱ እርምጃዎች...' : 'Corrective measures taken...'}
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Section 3: Next Month Plan & Support Needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <label className="font-bold text-slate-800 text-xs block mb-1">
              4. {lang === 'am' ? 'የቀጣይ ወር ቁልፍ የትኩረት ዕቅዶች (Next Month Plan)' : 'Next Month Planned Targets'}
            </label>
            <textarea
              rows={3}
              value={currentReport.nextMonthPlan}
              onChange={(e) => setCurrentReport({ ...currentReport, nextMonthPlan: e.target.value })}
              placeholder={lang === 'am' ? 'በቀጣዩ ወር ቅድሚያ የሚሰጣቸው ተግባራት...' : 'Priority focus for upcoming month...'}
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <label className="font-bold text-slate-800 text-xs block mb-1">
              5. {lang === 'am' ? 'ከአመራርና ከሌሎች ክፍሎች የሚፈለግ ድጋፍ (Support Needed)' : 'Required Management Support'}
            </label>
            <textarea
              rows={3}
              value={currentReport.supportNeeded}
              onChange={(e) => setCurrentReport({ ...currentReport, supportNeeded: e.target.value })}
              placeholder={lang === 'am' ? 'አስፈላጊ የቴክኒክ፣ የቁሳቁስ ወይም የሰው ኃይል ድጋፍ...' : 'Support requested from directorate...'}
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Section 4: Supervisor Monthly Review & Sign-off */}
        <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              6. {lang === 'am' ? 'የቅርብ ኃላፊ ወርሃዊ ምዘና እና አስተያየት (Supervisor Monthly Endorsement)' : 'Supervisor Monthly Review'}
            </h4>

            {/* Monthly Rating (1-4) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                {lang === 'am' ? 'የወሩ አፈጻጸም ደረጃ (1-4):' : 'Monthly Rating (1-4):'}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <button
                    key={star}
                    onClick={() => setCurrentReport({ ...currentReport, supervisorRating: star })}
                    className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs transition cursor-pointer ${
                      currentReport.supervisorRating >= star
                        ? 'bg-amber-400 text-amber-950 font-black'
                        : 'bg-white text-slate-400 border border-slate-300'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea
            rows={2}
            value={currentReport.supervisorComments}
            onChange={(e) => setCurrentReport({ ...currentReport, supervisorComments: e.target.value })}
            placeholder={lang === 'am' ? 'የኃላፊው ወርሃዊ ግምገማና የቀጣይ አቅጣጫ ማስታወሻ...' : 'Supervisor feedback and performance comments...'}
            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
          />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-blue-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={currentReport.supervisorSigned}
                onChange={(e) => setCurrentReport({ 
                  ...currentReport, 
                  supervisorSigned: e.target.checked,
                  status: e.target.checked ? 'approved' : 'draft'
                })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{lang === 'am' ? 'በቅርብ ኃላፊው በይፋ ተረጋግጧል (Supervisor Verified & Approved)' : 'Supervisor Endorsed'}</span>
            </label>

            <span className="text-slate-500 font-mono text-[11px]">
              {lang === 'am' ? 'የቀረበበት ቀን:' : 'Date:'} {currentReport.reportDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
