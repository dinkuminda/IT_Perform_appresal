import React from 'react';
import { AppraisalRecord } from '../types/appraisal';
import { 
  calculateCriterion, 
  calculateCategoryScore, 
  calculateTotalTaskScore, 
  calculateCompetencyItem, 
  calculateTotalCompetencyScore, 
  getPerformanceGrade 
} from '../utils/calculations';

interface PrintDocumentProps {
  record: AppraisalRecord;
}

export const PrintDocument: React.FC<PrintDocumentProps> = ({ record }) => {
  const { metadata, categories, competencies, supervisorComments, employeeComments, supervisorSigned, employeeSigned, supervisorSignDate, employeeSignDate } = record;

  const grandTaskScore = calculateTotalTaskScore(categories);
  const { totalPercent, totalOutOf40: grandCompScore } = calculateTotalCompetencyScore(competencies);
  const grandTotal = Number((grandTaskScore + grandCompScore).toFixed(2));
  const grade = getPerformanceGrade(grandTotal);

  return (
    <div className="hidden print:block text-black bg-white p-8 max-w-[210mm] mx-auto text-xs leading-normal">
      {/* Official State Header */}
      <div className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="text-lg font-bold tracking-wide uppercase">
          በኢትዮጵያ ፌዴራላዊ ዴሞክራሲያዊ ሪፐብሊክ
        </h1>
        <h2 className="text-base font-bold tracking-normal mt-0.5">
          የኢሚግሬሽንና ዜግነት አገልግሎት
        </h2>
        <h3 className="text-sm font-semibold mt-0.5">
          የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት
        </h3>
        <p className="text-xs font-bold mt-2 uppercase border border-black inline-block px-4 py-1">
          የሥራ አፈጻጸም እና የባህሪ ምዘና ይፋዊ ቅጽ
        </p>
      </div>

      {/* Metadata Table */}
      <table className="w-full border-collapse border border-black text-xs mb-6">
        <tbody>
          <tr>
            <td className="border border-black p-2 font-bold w-1/4 bg-slate-100">የሰራተኛው ሙሉ ስም:</td>
            <td className="border border-black p-2 w-1/4">{metadata.empName || '---'}</td>
            <td className="border border-black p-2 font-bold w-1/4 bg-slate-100">የመለያ ቁጥር:</td>
            <td className="border border-black p-2 w-1/4 font-mono">{metadata.empId || '---'}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-slate-100">የሥራ ክፍል:</td>
            <td className="border border-black p-2">{metadata.empDept || '---'}</td>
            <td className="border border-black p-2 font-bold bg-slate-100">የሥራ መደብ:</td>
            <td className="border border-black p-2">{metadata.empPosition || '---'}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-slate-100">የምዘናው ጊዜ:</td>
            <td className="border border-black p-2">{metadata.evalPeriod || '---'}</td>
            <td className="border border-black p-2 font-bold bg-slate-100">የቅርብ ኃላፊው ሙሉ ስም:</td>
            <td className="border border-black p-2">{metadata.supervisorName || '---'}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold bg-slate-100">የምዘናው ዓይነት:</td>
            <td className="border border-black p-2 font-semibold">
              {metadata.evalType === 'half-year' ? 'የአጋማሽ ዓመት' : metadata.evalType === 'annual' ? 'የዓመት መጨረሻ' : 'የሙከራ ጊዜ'}
            </td>
            <td className="border border-black p-2 font-bold bg-slate-100">የምዘናው ቀን:</td>
            <td className="border border-black p-2 font-mono">{metadata.evalDate || '---'}</td>
          </tr>
        </tbody>
      </table>

      {/* 1. Job Performance Section (60%) */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 pb-1 border-b border-black">
          <h4 className="font-bold text-sm">
            ክፍል 1፡ የሥራ አፈጻጸም ምዘና ቅጽ (ከ 60%)
          </h4>
          <span className="font-bold font-mono text-sm">
            ድምር፡ {grandTaskScore.toFixed(2)} / 60.00
          </span>
        </div>

        <table className="w-full border-collapse border border-black text-[10px]">
          <thead className="bg-slate-100 font-bold">
            <tr>
              <th className="border border-black p-1 text-center w-6">ተ.ቁ</th>
              <th className="border border-black p-1 w-1/4">የሚጠበቅ ውጤት</th>
              <th className="border border-black p-1 w-1/3">ከባለሙያ የሚጠበቅ ዝርዝር ተግባር</th>
              <th className="border border-black p-1 text-center w-10">ክብደት</th>
              <th className="border border-black p-1 text-center w-12">መለኪያ</th>
              <th className="border border-black p-1 text-center w-10">ክብደት</th>
              <th className="border border-black p-1 text-center w-14">ደረጃ</th>
              <th className="border border-black p-1 text-center w-12">አጠቃላይ</th>
              <th className="border border-black p-1 text-center w-12">የተገኘ</th>
              <th className="border border-black p-1 text-center w-14">ውጤት</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const catRowSpan = cat.subtasks.reduce((sum, st) => sum + st.criteria.length, 0);
              let catFirst = true;

              return (
                <React.Fragment key={`print-cat-${cat.id}`}>
                  {cat.subtasks.map((st, stIdx) => {
                    const stRowSpan = st.criteria.length;
                    let stFirst = true;

                    return (
                      <React.Fragment key={`print-st-${cat.id}-${st.subId}`}>
                        {st.criteria.map((crit) => {
                          const calc = calculateCriterion(crit.weight, crit.rating);
                          const isCatFirst = catFirst;
                          const isStFirst = stFirst;
                          if (catFirst) catFirst = false;
                          if (stFirst) stFirst = false;

                          return (
                            <tr key={`print-crit-${crit.id}`}>
                              {isCatFirst && (
                                <td
                                  rowSpan={catRowSpan}
                                  className="border border-black p-1 text-center font-bold align-top bg-slate-50"
                                >
                                  {cat.id}
                                </td>
                              )}
                              {isCatFirst && (
                                <td
                                  rowSpan={catRowSpan}
                                  className="border border-black p-1 font-semibold align-top bg-slate-50"
                                >
                                  {cat.title} ({cat.weight}%)
                                </td>
                              )}
                              {isStFirst && (
                                <td
                                  rowSpan={stRowSpan}
                                  className="border border-black p-1 align-top"
                                >
                                  <strong>{st.subId}</strong> {st.desc}
                                </td>
                              )}
                              <td className="border border-black p-1 text-center">{cat.weight}</td>
                              <td className="border border-black p-1 text-center">{crit.type}</td>
                              <td className="border border-black p-1 text-center">{crit.weight}</td>
                              <td className="border border-black p-1 text-center font-bold">
                                {crit.rating}
                              </td>
                              <td className="border border-black p-1 text-center">{calc.maxProduct}</td>
                              <td className="border border-black p-1 text-center">{calc.actualProduct}</td>
                              <td className="border border-black p-1 text-center font-bold font-mono">
                                {calc.scaledScore.toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-100 font-bold">
            <tr>
              <td colSpan={3} className="border border-black p-1.5 text-right">
                የተግባራት አጠቃላይ ድምር (ከ 60%):
              </td>
              <td className="border border-black p-1.5 text-center font-mono">60</td>
              <td colSpan={5} className="border border-black p-1.5 text-right">
                የተገኘ የሥራ አፈጻጸም ውጤት:
              </td>
              <td className="border border-black p-1.5 text-center font-bold font-mono text-xs">
                {grandTaskScore.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Page Break for Part 2 and Summary */}
      <div className="print-break-before"></div>

      {/* 2. Core Competencies Section (40%) */}
      <div className="mb-6 pt-4">
        <div className="flex justify-between items-center mb-2 pb-1 border-b border-black">
          <h4 className="font-bold text-sm">
            ክፍል 2፡ የባህሪ ምዘና - Core Competencies (ከ 40%)
          </h4>
          <span className="font-bold font-mono text-sm">
            ድምር፡ {grandCompScore.toFixed(2)} / 40.00
          </span>
        </div>

        <table className="w-full border-collapse border border-black text-xs mb-4">
          <thead className="bg-slate-100 font-bold">
            <tr>
              <th className="border border-black p-1.5 w-1/3">የመገምገሚያ ነጥብ</th>
              <th className="border border-black p-1.5 text-center w-16">ክብደት</th>
              <th className="border border-black p-1.5 text-center w-24">የአፈጻጸም ደረጃ (1-4)</th>
              <th className="border border-black p-1.5 text-center w-24">የተገኘ ውጤት (%)</th>
              <th className="border border-black p-1.5 text-center w-28">የቡድን መሪው / ከ 40%</th>
            </tr>
          </thead>
          <tbody>
            {competencies.map((comp) => {
              const calc = calculateCompetencyItem(comp.rating, comp.weight);
              return (
                <tr key={`print-comp-${comp.id}`}>
                  <td className="border border-black p-2 font-semibold">
                    {comp.name}
                    {comp.notes && (
                      <div className="text-[10px] text-slate-700 italic mt-0.5">
                        ማስታወሻ፡ {comp.notes}
                      </div>
                    )}
                  </td>
                  <td className="border border-black p-2 text-center font-bold">{comp.weight}%</td>
                  <td className="border border-black p-2 text-center font-bold">{comp.rating}</td>
                  <td className="border border-black p-2 text-center font-mono">{calc.percentResult.toFixed(0)}%</td>
                  <td className="border border-black p-2 text-center font-bold font-mono">
                    {calc.scoreOutOf40.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-100 font-bold">
            <tr>
              <td className="border border-black p-1.5 text-right">አጠቃላይ ድምር (Total):</td>
              <td className="border border-black p-1.5 text-center font-mono">100%</td>
              <td className="border border-black p-1.5"></td>
              <td className="border border-black p-1.5 text-center font-mono">{totalPercent.toFixed(0)}%</td>
              <td className="border border-black p-1.5 text-center font-bold font-mono text-xs">
                {grandCompScore.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 3. Overall Performance Summary & Signatures */}
      <div className="mb-6">
        <h4 className="font-bold text-sm mb-2 pb-1 border-b border-black">
          ክፍል 3፡ ጠቅላላ የአፈጻጸም ምዘና ማጠቃለያ ውጤት መግለጫ (Overall Summary)
        </h4>

        <table className="w-full border-collapse border border-black text-xs mb-4">
          <thead className="bg-slate-100 font-bold text-center">
            <tr>
              <th className="border border-black p-2 w-1/4" rowSpan={2}>የምዘና ጊዜያት</th>
              <th className="border border-black p-2" colSpan={4}>የውጤት ተኮር ዕቅድ አፈጻጸም</th>
            </tr>
            <tr>
              <th className="border border-black p-1.5 w-1/5">አፈጻጸም ከዕቅድ ጋር (60%)</th>
              <th className="border border-black p-1.5 w-1/5">የባህሪያት አፈጻጸም (40%)</th>
              <th className="border border-black p-1.5 w-1/5">ድምር ከ 100%</th>
              <th className="border border-black p-1.5 w-1/5">የአፈጻጸም ደረጃ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center font-bold">
              <td className="border border-black p-2 font-semibold">
                {metadata.evalPeriod || 'የአጋማሽ ዓመት የተጠቃለለ አፈጻጸም'}
              </td>
              <td className="border border-black p-2 font-mono">{grandTaskScore.toFixed(2)}</td>
              <td className="border border-black p-2 font-mono">{grandCompScore.toFixed(2)}</td>
              <td className="border border-black p-2 font-mono text-sm">{grandTotal.toFixed(2)}%</td>
              <td className="border border-black p-2 text-sm">{grade.levelAm}</td>
            </tr>
          </tbody>
        </table>

        {/* Narrative comments */}
        <div className="border border-black p-3 text-xs mb-4">
          <strong className="block mb-1">የቅርብ ኃላፊው አስተያየት (የታዩ ጠንካራ ጎኖችና ቀጣይ ድጋፍ)፡</strong>
          <p className="min-h-[40px] italic">
            {supervisorComments || 'ምንም ተጨማሪ አስተያየት አልተሰጠም።'}
          </p>
        </div>

        <div className="border border-black p-3 text-xs mb-6">
          <strong className="block mb-1">የሰራተኛው አስተያየት እና ምላሽ፡</strong>
          <p className="min-h-[40px] italic">
            {employeeComments || 'ሰራተኛው በምዘናው ውጤት ላይ ሙሉ ስምምነት አለው።'}
          </p>
        </div>

        {/* Formal Signatures and Approval Stamp */}
        <div className="grid grid-cols-2 gap-8 pt-4 border-t-2 border-black text-xs">
          <div className="space-y-3">
            <p><strong>የቅርብ ኃላፊው ሙሉ ስም፡</strong> {metadata.supervisorName || '____________________'}</p>
            <p><strong>ፊርማ፡</strong> {supervisorSigned ? '✓ በስርዓቱ የተረጋገጠ (Electronically Signed)' : '________________________'}</p>
            <p><strong>ቀን፡</strong> {supervisorSignDate || metadata.evalDate || '________________________'}</p>
          </div>

          <div className="space-y-3">
            <p><strong>የሰራተኛው ሙሉ ስም፡</strong> {metadata.empName || '____________________'}</p>
            <p><strong>ፊርማ፡</strong> {employeeSigned ? '✓ በስርዓቱ የተረጋገጠ (Electronically Signed)' : '________________________'}</p>
            <p><strong>ቀን፡</strong> {employeeSignDate || metadata.evalDate || '________________________'}</p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-dotted border-black flex justify-between items-end text-[10px] text-slate-600">
          <div>
            የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት · የኢሚግሬሽንና ዜግነት አገልግሎት
          </div>
          <div>
            የታተመበት ቀን፡ {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
