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

      {/* 1. Job Performance Section (60%) - Official Format (60.jpg) */}
      <div className="mb-6">
        <div className="text-center pb-3 mb-3">
          <h3 className="font-extrabold text-base sm:text-lg">
            የ6 ወር የአፈፃፀም ምዘና ቅጽ ከ60%
          </h3>
        </div>

        {/* Two-Column Official Metadata Header */}
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold mb-4 text-black">
          <div className="space-y-1">
            <div><span className="font-bold">የሠራተኛው ሙሉ ስም በአማርኛ ፡-</span> {metadata.empName}</div>
            <div><span className="font-bold">የሥራ ክፍሉ መጠሪያ፡-</span>{metadata.empDept}</div>
          </div>
          <div className="space-y-1">
            <div>
              <span className="font-bold">ደረጃ፡-</span>{' '}
              {metadata.empPosition.includes('ደረጃ XIII') ? 'XIII' :
               metadata.empPosition.includes('ደረጃ XII') ? 'XII' :
               metadata.empPosition.includes('ደረጃ XI') ? 'XI' :
               metadata.empPosition.includes('ደረጃ X') ? 'X' : 'XIII'}
            </div>
            <div>
              <span className="font-bold">የሥራ መደብ መጠሪያ ፡-</span>{' '}
              {metadata.empPosition.replace(/ደረጃ\s*(XIII|XII|XI|X)/gi, '').trim() || 'ከፍተኛ የኔትወርክ ባለሙያ'}
            </div>
            <div><span className="font-bold">የአፈፃፀም ምዘናው ጊዜ</span> {metadata.evalPeriod}</div>
          </div>
        </div>

        <table className="w-full border-collapse border border-black text-[9px] sm:text-[10px]">
          <thead className="bg-slate-100 font-bold text-center">
            <tr>
              <th rowSpan={2} className="border border-black p-1 w-6 align-middle">ተቁ</th>
              <th rowSpan={2} className="border border-black p-1 w-36 align-middle">የሚጠበቅ ውጤት</th>
              <th rowSpan={2} className="border border-black p-1 align-middle">ከባለሙያ የሚጠበቅ ውጤት</th>
              <th rowSpan={2} className="border border-black p-1 w-8 align-middle">ክብደት</th>
              <th rowSpan={2} className="border border-black p-1 w-14 align-middle">መመዘኛ/ ጥራት፣ ጊዜ፣ ወጪ/</th>
              <th rowSpan={2} className="border border-black p-1 w-10 align-middle">የመመዘኛ ክብደት</th>
              <th colSpan={4} className="border border-black p-0.5">የአፈፃፀም ደረጃ</th>
              <th rowSpan={2} className="border border-black p-1 w-16 align-middle leading-tight text-[8px]">
                አጠቃላይ ውጤት/የተገኘ ውጤት/በ-አፈጻጸም ደረጃ/
              </th>
              <th rowSpan={2} className="border border-black p-1 w-16 align-middle leading-tight text-[8px]">
                በ/ ከፍተኛ ተባዝቶ የሚገኝ ውጤት /በክብደት*4/
              </th>
              <th rowSpan={2} className="border border-black p-1 w-14 align-middle leading-tight text-[8px]">
                የተሰጠ ውጤት
                <span className="block font-normal text-[7px]">አንጻር የተሰጠ ውጤት /ከስድሳ/በአጠቃላይ ውጤት /</span>
              </th>
            </tr>
            <tr>
              <th className="border border-black p-0.5 w-7 text-center">ዝቅተኛ 1</th>
              <th className="border border-black p-0.5 w-7 text-center">አጥጋቢ 2</th>
              <th className="border border-black p-0.5 w-7 text-center">ከፍተኛ 3</th>
              <th className="border border-black p-0.5 w-8 text-center">በጣም ከፍተኛ 4</th>
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
                                  {cat.title}
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
                              {isStFirst && (
                                <td
                                  rowSpan={stRowSpan}
                                  className="border border-black p-1 text-center font-bold align-middle bg-slate-50"
                                >
                                  {st.criteria.reduce((s, c) => s + (Number(c.weight) || 0), 0)}
                                </td>
                              )}
                              <td className="border border-black p-1 text-center">{crit.type}</td>
                              <td className="border border-black p-1 text-center font-bold">{crit.weight}</td>
                              <td className="border border-black p-1 text-center font-bold">{crit.rating === 1 ? '1' : ''}</td>
                              <td className="border border-black p-1 text-center font-bold">{crit.rating === 2 ? '2' : ''}</td>
                              <td className="border border-black p-1 text-center font-bold">{crit.rating === 3 ? '3' : ''}</td>
                              <td className="border border-black p-1 text-center font-bold">{crit.rating === 4 ? '4' : ''}</td>
                              <td className="border border-black p-1 text-center font-mono">{calc.actualProduct}</td>
                              <td className="border border-black p-1 text-center font-mono">{calc.actualProduct}</td>
                              <td className="border border-black p-1 text-center font-bold font-mono">
                                {Number.isInteger(calc.scaledScore) ? calc.scaledScore : calc.scaledScore.toFixed(2)}
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
              <td colSpan={5} className="border border-black p-1"></td>
              <td className="border border-black p-1 text-center font-mono">60</td>
              <td colSpan={5} className="border border-black p-1"></td>
              <td className="border border-black p-1 text-center font-bold">ድምር</td>
              <td className="border border-black p-1 text-center font-bold font-mono">
                {Number.isInteger(grandTaskScore) ? grandTaskScore : grandTaskScore.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Page Break for Part 2 and Summary */}
      <div className="print-break-before"></div>

      {/* 2. Core Competencies Section (40%) - Official Format */}
      <div className="mb-6 pt-2">
        <div className="text-center mb-3">
          <h4 className="font-extrabold text-sm sm:text-base border-b border-black pb-1 inline-block">
            የኢሚግሬሽንና ዜግነት አገልግሎት የሠራተኛ የባህሪ (Core Competencies) ግምገማና ምዘና መሙያ ቅጽ ከ40%
          </h4>
        </div>

        {/* Employee Metadata Header */}
        <div className="text-xs space-y-1 mb-3 font-semibold">
          <div><span className="font-bold">የሰራተኛው ስም :-</span> {metadata.empName}</div>
          <div><span className="font-bold">የሥራ ክፍል :-</span> {metadata.empDept}</div>
          <div><span className="font-bold">ሥራ መደቡ:-</span> {metadata.empPosition}</div>
          <div><span className="font-bold">የግምገማው ጊዜ :-</span> {metadata.evalPeriod}</div>
        </div>

        <table className="w-full border-collapse border border-black text-xs mb-3">
          <thead className="bg-slate-100 font-bold">
            <tr>
              <th rowSpan={2} className="border border-black p-1.5 w-2/5 text-left">የመገምገሚያ ነጥብ</th>
              <th rowSpan={2} className="border border-black p-1.5 text-center w-16">ክብደት</th>
              <th colSpan={4} className="border border-black p-1 text-center">የአፈፃፀም ደረጃ</th>
              <th rowSpan={2} className="border border-black p-1 text-center w-20">የተገኘው ውጤት</th>
              <th className="border border-black p-1 text-center w-20">የቡድን መሪው</th>
            </tr>
            <tr>
              <th className="border border-black p-1 text-center w-8">1</th>
              <th className="border border-black p-1 text-center w-8">2</th>
              <th className="border border-black p-1 text-center w-8">3</th>
              <th className="border border-black p-1 text-center w-8">4</th>
              <th className="border border-black p-1 text-center text-[10px]">40%</th>
            </tr>
          </thead>
          <tbody>
            {competencies.map((comp) => {
              const weight = Number(comp.weight) || 25;
              const rating = comp.rating || 4;
              const scorePercent = Number(((rating / 4) * 100).toFixed(0));
              const weightedShare = Number(((weight * scorePercent) / 100).toFixed(2));
              const score40 = Number(((weightedShare * 40) / 100).toFixed(2));

              return (
                <tr key={`print-comp-${comp.id}`}>
                  <td className="border border-black p-1.5 font-medium">{comp.name}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{weight}%</td>
                  <td className="border border-black p-1.5 text-center font-bold">{rating === 1 ? '1' : ''}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{rating === 2 ? '2' : ''}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{rating === 3 ? '3' : ''}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{rating === 4 ? '4' : ''}</td>
                  <td className="border border-black p-1.5 text-center font-mono">{scorePercent}</td>
                  <td className="border border-black p-1.5 text-center font-bold font-mono">
                    {Number.isInteger(score40) ? score40 : score40.toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-100 font-bold">
            <tr>
              <td className="border border-black p-1.5 font-bold">አጠቃላይ ድምር</td>
              <td className="border border-black p-1.5 text-center font-mono">100%</td>
              <td className="border border-black p-1.5"></td>
              <td className="border border-black p-1.5"></td>
              <td className="border border-black p-1.5"></td>
              <td className="border border-black p-1.5"></td>
              <td className="border border-black p-1.5"></td>
              <td className="border border-black p-1.5 text-center font-bold font-mono text-sm">
                {Number.isInteger(grandCompScore) ? grandCompScore : grandCompScore.toFixed(1)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Legend & Calculation Breakdown */}
        <div className="text-xs space-y-1 font-semibold pt-1">
          <div className="flex gap-4 font-bold">
            <span>በጣም ከፍተኛ = 4</span>
            <span>ከፍተኛ = 3</span>
            <span>አጥጋቢ = 2</span>
            <span>ዝቅተኛ = 1</span>
          </div>
          <div className="font-mono text-[11px] space-y-0.5 pt-1">
            {competencies.map((comp, idx) => {
              const weight = Number(comp.weight) || 25;
              const rating = comp.rating || 4;
              const scorePercent = Number(((rating / 4) * 100).toFixed(0));
              const weightedShare = Number(((weight * scorePercent) / 100).toFixed(2));
              const score40 = Number(((weightedShare * 40) / 100).toFixed(2));
              let shortName = comp.name.includes('አገር') ? 'አገር ወዳድነት' :
                              comp.name.includes('ስብዕና') ? 'የተሟላ ስብዕና' :
                              comp.name.includes('ተባብሮ') || comp.name.includes('Sprit') ? 'በቡድን መስራት' :
                              comp.name.includes('ሙያዊ') ? 'ሙያዊ ብቃት' : `ባህሪ ${idx+1}`;
              return (
                <div key={`p-calc-${comp.id}`}>
                  ✓ {shortName}= {weightedShare}*40/100={score40}
                </div>
              );
            })}
            <div className="font-bold pt-1 text-xs">
              ከ40% = {Number.isInteger(grandCompScore) ? grandCompScore : grandCompScore.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* 3. Overall Performance Summary & Signatures - Official Format */}
      <div className="mb-6 pt-4">
        <h4 className="font-extrabold text-sm sm:text-base mb-3 pb-1 underline decoration-2 underline-offset-4">
          የአፈፃፀም ምዘናው ማጠቃለያ ውጤት መግለጫ
        </h4>

        {/* Metadata Bullets */}
        <div className="text-xs space-y-1 mb-3 font-semibold">
          <div>• <span className="font-bold">የሠራተኛው ሙሉ ስም:-</span> {metadata.empName}</div>
          <div>• <span className="font-bold">የሥራ ክፍሉ:-</span> {metadata.empDept}</div>
          <div>• <span className="font-bold">ሥራ መደቡ:-</span> {metadata.empPosition}</div>
          <div>• <span className="font-bold">የአፈፃፀም ምዘናው ጊዜ :-</span> {metadata.evalPeriod}</div>
          <div>• <span className="font-bold">የአፈፃፀም ምዘናው ውጤት መግለጫ--------------------------------------------------------------------------------</span></div>
        </div>

        <table className="w-full border-collapse border border-black text-xs mb-6">
          <thead className="bg-slate-100 font-bold text-center">
            <tr>
              <th className="border border-black p-2 w-1/4" rowSpan={2}>የምዘና ጊዜያት</th>
              <th className="border border-black p-2" colSpan={4}>የውጤት ተኮር እቅድ አፈፃፀም</th>
            </tr>
            <tr>
              <th className="border border-black p-1.5 w-1/5">አፈፃፀም ከእቅድ ጋር በማነፃፀር(60%)</th>
              <th className="border border-black p-1.5 w-1/4">ሥራዎች በሚከናወኑበት ሂደት አስፈላጊ የሆኑ ባህሪያት አፈፃፀም (40%)</th>
              <th className="border border-black p-1.5 w-20">ድምር ከ 100 %</th>
              <th className="border border-black p-1.5 w-20">የአፈፃፀም ደረጃ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center font-bold">
              <td className="border border-black p-2 font-semibold">
                የግማሽ ዓመት የተጠቃለለ አፈፃፀም
              </td>
              <td className="border border-black p-2 font-mono">
                {Number.isInteger(grandTaskScore) ? grandTaskScore : grandTaskScore.toFixed(1)}
              </td>
              <td className="border border-black p-2 font-mono">
                {Number.isInteger(grandCompScore) ? grandCompScore : grandCompScore.toFixed(1)}
              </td>
              <td className="border border-black p-2 font-mono text-sm">
                {Number.isInteger(grandTotal) ? grandTotal : grandTotal.toFixed(1)}
              </td>
              <td className="border border-black p-2 text-sm">{grade.levelAm}</td>
            </tr>
          </tbody>
        </table>

        {/* Formal Signatures (as in the official document) */}
        <div className="space-y-4 pt-2 text-xs font-semibold">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold">የቅርብ ኃላፊው ሙሉ ስም:</span> {metadata.supervisorName || 'ምንዳዬ ሀይሌ'}
            </div>
            <div>
              <span>ፊርማ -------------------</span>
              <span className="ml-4 font-bold">ቀን</span> {supervisorSignDate || metadata.evalDate || '2018-06-30'}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold">የሠራተኛው ስም:</span> {metadata.empName || 'ሊዲያ ግሩም ገብረስላሴ'}
            </div>
            <div>
              <span>ፊርማ -------------------</span>
              <span className="ml-4 font-bold">ቀን</span> {employeeSignDate || metadata.evalDate || '2018-06-30'}
            </div>
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
