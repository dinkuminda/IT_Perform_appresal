import React, { useState } from 'react';
import { AppraisalRecord } from '../types/appraisal';
import { MonthlyReport } from '../types/monthlyReport';
import { JobDescription } from '../types/jobDescription';
import { Language } from '../utils/i18n';
import { calculateTotalTaskScore, calculateTotalCompetencyScore, getPerformanceGrade } from '../utils/calculations';
import { 
  BarChart3, 
  Users, 
  FileCheck2, 
  Clock, 
  TrendingUp, 
  Award, 
  Layers, 
  ArrowUpRight, 
  Briefcase, 
  CalendarDays,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Database,
  Server,
  Network
} from 'lucide-react';

interface DashboardViewProps {
  appraisals: AppraisalRecord[];
  monthlyReports: MonthlyReport[];
  jobDescriptions: JobDescription[];
  onSelectAppraisal: (record: AppraisalRecord) => void;
  onNavigateToTab: (tab: 'appraisal' | 'monthly' | 'jobs' | 'employees') => void;
  lang: Language;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  appraisals,
  monthlyReports,
  jobDescriptions,
  onSelectAppraisal,
  onNavigateToTab,
  lang
}) => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  // Compute aggregate statistics
  const totalEmployees = appraisals.length;

  const scoresList = appraisals.map((app) => {
    const taskScore = calculateTotalTaskScore(app.categories);
    const { totalOutOf40: compScore } = calculateTotalCompetencyScore(app.competencies);
    return Number((taskScore + compScore).toFixed(2));
  });

  const avgScore = totalEmployees > 0 
    ? Number((scoresList.reduce((acc, curr) => acc + curr, 0) / totalEmployees).toFixed(2)) 
    : 0;

  // Grade distributions
  const gradeDistribution = {
    outstanding: 0, // >= 90
    high: 0,        // 75 - 89.9
    satisfactory: 0, // 60 - 74.9
    low: 0          // < 60
  };

  scoresList.forEach((score) => {
    if (score >= 90) gradeDistribution.outstanding += 1;
    else if (score >= 75) gradeDistribution.high += 1;
    else if (score >= 60) gradeDistribution.satisfactory += 1;
    else gradeDistribution.low += 1;
  });

  const signedCount = appraisals.filter((a) => a.supervisorSigned && a.employeeSigned).length;
  const pendingCount = totalEmployees - signedCount;

  // Monthly reports progress
  const approvedReports = monthlyReports.filter((r) => r.status === 'approved').length;

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'የዳይሬክቶሬቱ የስራ አፈጻጸም ዳሽቦርድ' : 'Directorate Performance Executive Dashboard'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'am' ? 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት' : 'Institutional Technology Administration Directorate'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {lang === 'am' 
              ? 'የሰራተኞች የውጤት ተኮር ምዘና (60%)፣ የባህሪ ብቃት (40%)፣ ወርሃዊ የስራ ሪፖርቶች እና የስራ መደብ መግለጫዎች ማጠቃለያ ቁጥጥር።'
              : 'Real-time overview of staff evaluations (60% Task, 40% Competencies), monthly progress logs, and standardized job descriptions.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateToTab('jobs')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span>{lang === 'am' ? 'የሥራ መደቦች (JD)' : 'Job Descriptions'}</span>
          </button>
          <button
            onClick={() => onNavigateToTab('employees')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>{lang === 'am' ? 'የሰራተኞች ማውጫ' : 'Staff Directory'}</span>
          </button>
          <button
            onClick={() => onNavigateToTab('monthly')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <span>{lang === 'am' ? 'ወርሃዊ ሪፖርት መዝግብ' : 'Monthly Report'}</span>
          </button>
          <button
            onClick={() => onNavigateToTab('appraisal')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{lang === 'am' ? 'ወደ ምዘና ቅጽ ሂድ' : 'Appraisal Sheet'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Evaluated Employees */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'am' ? 'የተመዘገቡ ሰራተኞች' : 'Evaluated Staff'}
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900 tabular-nums">
              {totalEmployees}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'am' ? 'ባለሙያዎች' : 'employees'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% {lang === 'am' ? 'የዳይሬክቶሬቱ ሽፋን' : 'Directorate coverage'}</span>
          </div>
        </div>

        {/* Stat 2: Directorate Average Score */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'am' ? 'አማካይ የአፈጻጸም ውጤት' : 'Average Score'}
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-indigo-700 tabular-nums">
              {avgScore}%
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100%</span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
            <span>{getPerformanceGrade(avgScore).levelAm} ደረጃ</span>
          </div>
        </div>

        {/* Stat 3: Completed & Signed Evaluations */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'am' ? 'የተፈረሙና የጸደቁ' : 'Approved & Signed'}
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-emerald-700 tabular-nums">
              {signedCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {totalEmployees}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            {pendingCount > 0 ? (
              <span className="text-amber-600 font-semibold">{pendingCount} {lang === 'am' ? 'ፊርማ የሚጠብቁ' : 'pending signature'}</span>
            ) : (
              <span className="text-emerald-600 font-semibold">{lang === 'am' ? 'ሁሉም ተረጋግጠዋል' : 'All fully signed'}</span>
            )}
          </div>
        </div>

        {/* Stat 4: Active Job Descriptions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'am' ? 'የሥራ መደብ መግለጫዎች' : 'Job Descriptions'}
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-amber-700 tabular-nums">
              {jobDescriptions.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'am' ? 'መደቦች' : 'active JDs'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            {monthlyReports.length} {lang === 'am' ? 'የተመዘገቡ ወርሃዊ ሪፖርቶች' : 'monthly reports logged'}
          </div>
        </div>
      </div>

      {/* Main Visual Panels: Distribution & Category Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: Performance Rating Level Distribution (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                {lang === 'am' ? 'የሰራተኞች አፈጻጸም ደረጃ ክፍፍል' : 'Performance Level Breakdown'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'am' ? 'በተቋሙ የደረጃ መመዘኛ ስታንዳርድ መሠረት' : 'Distributed according to civil service benchmark standards'}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              {totalEmployees} {lang === 'am' ? 'መዛግብት' : 'Records'}
            </span>
          </div>

          <div className="space-y-4">
            {/* Very High >= 90% */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  {lang === 'am' ? 'በጣም ከፍተኛ (>= 90%)' : 'Outstanding / Very High (>= 90%)'}
                </span>
                <span className="font-mono font-bold text-slate-700">
                  {gradeDistribution.outstanding} {lang === 'am' ? 'ሰራተኞች' : 'staff'} ({totalEmployees ? Math.round((gradeDistribution.outstanding / totalEmployees) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalEmployees ? (gradeDistribution.outstanding / totalEmployees) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* High 75% - 89.9% */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 font-bold text-blue-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  {lang === 'am' ? 'ከፍተኛ (75% - 89.9%)' : 'High / Exceeds (75% - 89.9%)'}
                </span>
                <span className="font-mono font-bold text-slate-700">
                  {gradeDistribution.high} {lang === 'am' ? 'ሰራተኞች' : 'staff'} ({totalEmployees ? Math.round((gradeDistribution.high / totalEmployees) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalEmployees ? (gradeDistribution.high / totalEmployees) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Satisfactory 60% - 74.9% */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 font-bold text-amber-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  {lang === 'am' ? 'አጥጋቢ (60% - 74.9%)' : 'Satisfactory (60% - 74.9%)'}
                </span>
                <span className="font-mono font-bold text-slate-700">
                  {gradeDistribution.satisfactory} {lang === 'am' ? 'ሰራተኞች' : 'staff'} ({totalEmployees ? Math.round((gradeDistribution.satisfactory / totalEmployees) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalEmployees ? (gradeDistribution.satisfactory / totalEmployees) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Low < 60% */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 font-bold text-rose-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  {lang === 'am' ? 'ዝቅተኛ (< 60%)' : 'Low / Unsatisfactory (< 60%)'}
                </span>
                <span className="font-mono font-bold text-slate-700">
                  {gradeDistribution.low} {lang === 'am' ? 'ሰራተኞች' : 'staff'} ({totalEmployees ? Math.round((gradeDistribution.low / totalEmployees) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalEmployees ? (gradeDistribution.low / totalEmployees) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Guidance banner */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{lang === 'am' ? 'የምዘና ቀመር፡ የሥራ አፈጻጸም 60% + የባህሪ ምዘና 40% = 100%' : 'Formula: 60% Tasks + 40% Competencies = 100%'}</span>
            <button
              onClick={() => onNavigateToTab('appraisal')}
              className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1"
            >
              <span>{lang === 'am' ? 'ምዘናውን ይመልከቱ' : 'View Detailed Form'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Panel 2: Appraisal Pillars Weighting (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-1">
              {lang === 'am' ? 'የትኩረት መስኮች የክብደት ድርሻ' : 'Core Evaluation Pillars'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'am' ? 'የተቋሙ 4ቱ ቁልፍ የአፈጻጸም ምሶሶዎች' : 'Strategic allocation of 60% task points'}
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div className="font-semibold text-slate-800">1. የራሱን ዕቅድ ማዘጋጀትና መፈጸም</div>
                <div className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  9%
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div className="font-semibold text-slate-800">2. የመሠረተ ልማት አገልግሎት ጥናትና መዋቅር</div>
                <div className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  18%
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div className="font-semibold text-slate-800">3. የኢንፎርሜሽን መሠረተ ልማቶች ምርታማነት</div>
                <div className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  20%
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div className="font-semibold text-slate-800">4. ምርታማነት የሚያረጋግጡ የአሰራር ስርዓቶች</div>
                <div className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  13%
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex justify-between items-center">
                <div className="font-bold text-emerald-900">የባህሪ ምዘና (4 Core Competencies)</div>
                <div className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  40%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">{lang === 'am' ? 'ጠቅላላ ድምር:' : 'Total Weight:'}</span>
            <span className="font-mono font-black text-slate-900 text-sm">100.00%</span>
          </div>
        </div>
      </div>

      {/* Staff Evaluation Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'am' ? 'የዳይሬክቶሬቱ ሰራተኞች የምዘና ዝርዝር' : 'Staff Appraisal Register'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'am' ? 'ማንኛውንም ሰራተኛ በመምረጥ በቀጥታ ሙሉ የምዘና ቅጹን ማስተካከል ይችላሉ' : 'Click any employee to load and review their complete appraisal document'}
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {lang === 'am' ? 'የተመዘገቡ፡' : 'Records:'} <strong className="text-slate-800 font-mono">{appraisals.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3 w-1/4">{lang === 'am' ? 'የሰራተኛው ስም እና መለያ' : 'Employee & ID'}</th>
                <th className="p-3 w-1/4">{lang === 'am' ? 'የሥራ መደብ' : 'Job Title'}</th>
                <th className="p-3 text-center w-24">{lang === 'am' ? 'የሥራ (60%)' : 'Tasks (60%)'}</th>
                <th className="p-3 text-center w-24">{lang === 'am' ? 'ባህሪ (40%)' : 'Comp (40%)'}</th>
                <th className="p-3 text-center w-28">{lang === 'am' ? 'ጠቅላላ (100%)' : 'Total (100%)'}</th>
                <th className="p-3 text-center w-28">{lang === 'am' ? 'ደረጃ' : 'Rating Grade'}</th>
                <th className="p-3 text-center w-28">{lang === 'am' ? 'ሁኔታ' : 'Status'}</th>
                <th className="p-3 text-right w-20">{lang === 'am' ? 'እርምጃ' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {appraisals.map((app) => {
                const tScore = calculateTotalTaskScore(app.categories);
                const { totalOutOf40: cScore } = calculateTotalCompetencyScore(app.competencies);
                const total = Number((tScore + cScore).toFixed(2));
                const grade = getPerformanceGrade(total);

                return (
                  <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-900 text-xs">
                        {app.metadata.empName || '---'}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {app.metadata.empId || 'No ID'}
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="text-slate-800 font-medium truncate max-w-xs">
                        {app.metadata.empPosition || '---'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {app.metadata.evalPeriod}
                      </div>
                    </td>

                    <td className="p-3 text-center font-mono font-bold text-blue-700">
                      {tScore.toFixed(2)}
                    </td>

                    <td className="p-3 text-center font-mono font-bold text-emerald-700">
                      {cScore.toFixed(2)}
                    </td>

                    <td className="p-3 text-center font-mono font-black text-slate-900 text-xs">
                      {total.toFixed(2)}%
                    </td>

                    <td className="p-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${grade.bgClass} ${grade.colorClass} border ${grade.borderClass}`}>
                        {lang === 'am' ? grade.levelAm : grade.levelEn}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      {app.supervisorSigned && app.employeeSigned ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{lang === 'am' ? 'የጸደቀ' : 'Approved'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>{lang === 'am' ? 'ረቂቅ/ያልተፈረመ' : 'Pending'}</span>
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          onSelectAppraisal(app);
                          onNavigateToTab('appraisal');
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-blue-700 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-md transition"
                      >
                        {lang === 'am' ? 'ክፈት' : 'Open'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Departmental Job Roles & Standards Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>{lang === 'am' ? 'የዳይሬክቶሬቱ የስራ ክፍሎች ይፋዊ የሥራ መደቦች (Job Descriptions)' : 'Directorate Departmental Job Profiles'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'am'
                ? 'በዳታቤዝ አስተዳደር፣ በሲስተም አስተዳደር እና በኔትዎርክ አስተዳደር የስራ ክፍሎች የተዘጋጁ ይፋዊ መደቦችና የክብደት ድርሻዎች'
                : 'Standardized job roles, core duties, and weight distributions for Database, Systems, and Network departments.'}
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('jobs')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition self-start sm:self-auto cursor-pointer"
          >
            <span>{lang === 'am' ? 'ሁሉንም መደቦች ተመልከት' : 'View All Job Descriptions'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Department 1: Database Admin */}
          <div
            onClick={() => onNavigateToTab('jobs')}
            className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/40 hover:bg-cyan-50 transition cursor-pointer space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-600 text-white">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  {lang === 'am' ? 'የዳታቤዝ አስተዳደር' : 'Database Administration'}
                </h4>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">
                {jobDescriptions.filter((j) => j.department.includes('ዳታቤዝ')).length} መደቦች
              </span>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Oracle RAC, PostgreSQL Patroni, High Availability, RMAN/Disaster Recovery, እና Query Optimization።
            </p>
            <div className="text-[10px] text-cyan-800 font-semibold flex items-center gap-1">
              <span>ከፍተኛ የዳታቤዝ አስተዳዳሪ XIII • የዳታቤዝ ባለሙያ XII</span>
            </div>
          </div>

          {/* Department 2: Systems Admin */}
          <div
            onClick={() => onNavigateToTab('jobs')}
            className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50 transition cursor-pointer space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-600 text-white">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  {lang === 'am' ? 'የሲስተም አስተዳደር' : 'Systems Administration'}
                </h4>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                {jobDescriptions.filter((j) => j.department.includes('ሲስተም')).length} መደቦች
              </span>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              VMware vSphere/vCenter, Enterprise SAN Storage, Linux/Windows Active Directory, እና Veeam Backup።
            </p>
            <div className="text-[10px] text-indigo-800 font-semibold flex items-center gap-1">
              <span>ከፍተኛ የሲስተም አስተዳዳሪ XIII • የሲስተም ባለሙያ XII</span>
            </div>
          </div>

          {/* Department 3: Network Admin */}
          <div
            onClick={() => onNavigateToTab('jobs')}
            className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 transition cursor-pointer space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-600 text-white">
                  <Network className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  {lang === 'am' ? 'የኔትዎርክ አስተዳደር' : 'Network Administration'}
                </h4>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {jobDescriptions.filter((j) => j.department.includes('ኔትዎርክ') || j.department.includes('ኔትወርክ')).length} መደቦች
              </span>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Cisco Nexus/Catalyst Core, WAN/SD-WAN, FortiGate Next-Gen Firewalls, IPsec/SSL VPN, እና QoS።
            </p>
            <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
              <span>ከፍተኛ የኔትወርክ አስተዳዳሪ XIII • የኔትወርክ ባለሙያ XII</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
