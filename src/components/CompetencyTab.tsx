import React, { useState } from 'react';
import { CompetencyItem, RatingLevel, EmployeeMetadata } from '../types/appraisal';
import { Language } from '../utils/i18n';
import { Edit3, Printer, Trash2 } from 'lucide-react';

interface CompetencyTabProps {
  competencies: CompetencyItem[];
  onChangeCompetencies: (updated: CompetencyItem[]) => void;
  metadata?: EmployeeMetadata;
  onChangeMetadata?: (updated: EmployeeMetadata) => void;
  lang: Language;
  onDeleteRecord?: () => void;
}

export const CompetencyTab: React.FC<CompetencyTabProps> = ({
  competencies,
  onChangeCompetencies,
  metadata,
  onChangeMetadata,
  lang,
  onDeleteRecord
}) => {
  const [isEditingNames, setIsEditingNames] = useState(false);

  // Compute values for each competency
  const rowData = competencies.map((comp) => {
    const weight = Number(comp.weight) || 25;
    const rating = (comp.rating || 4) as RatingLevel;
    const scorePercent = Number(((rating / 4) * 100).toFixed(0)); // 100, 75, 50, 25
    const weightedShare = Number(((weight * scorePercent) / 100).toFixed(2)); // e.g. 25, 18.75, 12.5, 6.25
    const score40 = Number(((weightedShare * 40) / 100).toFixed(2)); // e.g. 10, 7.5, 5, 2.5

    return {
      ...comp,
      weight,
      rating,
      scorePercent,
      weightedShare,
      score40
    };
  });

  const totalWeight = rowData.reduce((sum, r) => sum + r.weight, 0);
  const totalOutOf40 = Number(rowData.reduce((sum, r) => sum + r.score40, 0).toFixed(2));

  const handleRatingChange = (id: string, rating: RatingLevel) => {
    const updated = competencies.map((comp) => {
      if (comp.id !== id) return comp;
      return { ...comp, rating };
    });
    onChangeCompetencies(updated);
  };

  const handleNameChange = (id: string, newName: string) => {
    const updated = competencies.map((comp) => {
      if (comp.id !== id) return comp;
      return { ...comp, name: newName };
    });
    onChangeCompetencies(updated);
  };

  const handleWeightChange = (id: string, newWeight: number) => {
    const weight = Math.max(0, Number(newWeight) || 0);
    const updated = competencies.map((comp) => {
      if (comp.id !== id) return comp;
      return { ...comp, weight };
    });
    onChangeCompetencies(updated);
  };

  const handleMetadataChange = (field: keyof EmployeeMetadata, value: string) => {
    if (metadata && onChangeMetadata) {
      onChangeMetadata({
        ...metadata,
        [field]: value
      });
    }
  };

  // Short labels for bottom calculation breakdown
  const getShortLabel = (comp: typeof rowData[0], idx: number) => {
    if (comp.name.includes('አገር ወዳድነት')) return 'አገር ወዳድነት';
    if (comp.name.includes('ስብዕና') || comp.name.includes('integrity')) return 'የተሟላ ስብዕና';
    if (comp.name.includes('ተባብሮ') || comp.name.includes('Sprit') || comp.name.includes('Spirit') || comp.name.includes('ቡድን')) return 'በቡድን መስራት';
    if (comp.name.includes('ሙያዊ') || comp.name.includes('Professionalism')) return 'ሙያዊ ብቃት';
    return comp.name.split('/')[0].trim() || `ባህሪ ${idx + 1}`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-8 mb-6 max-w-5xl mx-auto font-sans text-slate-900">
      {/* Top Action Bar (Print & Delete) */}
      <div className="flex justify-end items-center gap-2 mb-3 no-print">
        {onDeleteRecord && (
          <button
            type="button"
            onClick={onDeleteRecord}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded shadow-2xs transition cursor-pointer"
            title={lang === 'am' ? 'ሰርዝ' : 'Delete'}
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>{lang === 'am' ? 'ሰርዝ' : 'Delete'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-slate-600" />
          <span>{lang === 'am' ? 'አትም / Print' : 'Print'}</span>
        </button>
      </div>

      {/* 1. Official Header Title (strictly as in official document) */}
      <div className="text-center pb-4 mb-4">
        <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
          የኢሚግሬሽንና ዜግነት አገልግሎት የሠራተኛ የባህሪ (Core Competencies) ግምገማና ምዘና መሙያ ቅጽ ከ40%
        </h2>
      </div>

      {/* 2. Employee Metadata Section (strictly as in official document) */}
      <div className="space-y-1.5 text-xs sm:text-sm font-semibold mb-6 pb-2 text-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-900 min-w-[130px] shrink-0">የሰራተኛው ስም :-</span>
          <input
            type="text"
            value={metadata?.empName || 'ሊዲያ ግሩም ገብረስላሴ'}
            onChange={(e) => handleMetadataChange('empName', e.target.value)}
            placeholder="ሊዲያ ግሩም ገብረስላሴ"
            className="flex-1 min-w-[200px] border-b border-dotted border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-900 min-w-[130px] shrink-0">የሥራ ክፍል :-</span>
          <input
            type="text"
            value={metadata?.empDept || 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት'}
            onChange={(e) => handleMetadataChange('empDept', e.target.value)}
            placeholder="የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት"
            className="flex-1 min-w-[200px] border-b border-dotted border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-900 min-w-[130px] shrink-0">ሥራ መደቡ:-</span>
          <input
            type="text"
            value={metadata?.empPosition || 'ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII'}
            onChange={(e) => handleMetadataChange('empPosition', e.target.value)}
            placeholder="ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII"
            className="flex-1 min-w-[200px] border-b border-dotted border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-900 min-w-[130px] shrink-0">የግምገማው ጊዜ :-</span>
          <input
            type="text"
            value={metadata?.evalPeriod || 'ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም'}
            onChange={(e) => handleMetadataChange('evalPeriod', e.target.value)}
            placeholder="ከ ጥር 1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም"
            className="flex-1 min-w-[200px] border-b border-dotted border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 transition"
          />
        </div>
      </div>

      {/* 3. Official Evaluation Table (strictly as in official document) */}
      <div className="overflow-x-auto rounded border border-slate-400 shadow-2xs mb-6">
        <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-400">
          <thead>
            {/* Header Row 1 */}
            <tr className="bg-slate-50 text-slate-900 font-bold border-b border-slate-400">
              <th
                rowSpan={2}
                className="border-r border-b border-slate-400 p-2.5 sm:p-3 w-2/5 font-extrabold align-middle"
              >
                <div className="flex items-center justify-between">
                  <span>የመገምገሚያ ነጥብ</span>
                  <button
                    type="button"
                    onClick={() => setIsEditingNames(!isEditingNames)}
                    className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5 font-normal print:hidden cursor-pointer"
                    title="የባህሪያት ጽሁፍ አርም"
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>{isEditingNames ? 'ተጠናቀቀ' : 'አርም'}</span>
                  </button>
                </div>
              </th>

              <th
                rowSpan={2}
                className="border-r border-b border-slate-400 p-2.5 sm:p-3 text-center w-20 font-extrabold align-middle"
              >
                ክብደት
              </th>

              <th
                colSpan={4}
                className="border-r border-b border-slate-400 p-1.5 sm:p-2 text-center font-extrabold"
              >
                የአፈፃፀም ደረጃ
              </th>

              <th
                rowSpan={2}
                className="border-r border-b border-slate-400 p-2 text-center w-24 font-extrabold align-middle leading-tight"
              >
                የተገኘው ውጤት
              </th>

              <th className="border-b border-slate-400 p-1.5 text-center w-24 font-extrabold leading-tight">
                የቡድን መሪው
              </th>
            </tr>

            {/* Header Row 2 */}
            <tr className="bg-slate-50 text-slate-900 font-bold border-b border-slate-400">
              <th className="border-r border-b border-slate-400 p-1.5 text-center w-12 font-bold">1</th>
              <th className="border-r border-b border-slate-400 p-1.5 text-center w-12 font-bold">2</th>
              <th className="border-r border-b border-slate-400 p-1.5 text-center w-12 font-bold">3</th>
              <th className="border-r border-b border-slate-400 p-1.5 text-center w-12 font-bold">4</th>
              <th className="border-b border-slate-400 p-1.5 text-center w-24 font-bold text-xs text-slate-700">
                40%
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-400 bg-white">
            {rowData.map((comp) => (
              <tr key={comp.id} className="hover:bg-slate-50/50 transition">
                {/* Competency Title */}
                <td className="border-r border-slate-400 p-2.5 sm:p-3 font-medium text-slate-900 leading-snug">
                  {isEditingNames ? (
                    <input
                      type="text"
                      value={comp.name}
                      onChange={(e) => handleNameChange(comp.id, e.target.value)}
                      className="w-full p-1 text-xs border border-blue-400 rounded bg-white font-medium"
                    />
                  ) : (
                    <span>{comp.name}</span>
                  )}
                </td>

                {/* Weight (default 25%) */}
                <td className="border-r border-slate-400 p-2 text-center font-bold font-mono text-slate-900">
                  {comp.weight}%
                </td>

                {/* Rating 1 Column Cell */}
                <td
                  onClick={() => handleRatingChange(comp.id, 1)}
                  className={`border-r border-slate-400 p-2 text-center font-extrabold font-mono text-sm cursor-pointer select-none transition ${
                    comp.rating === 1
                      ? 'bg-blue-50/80 text-blue-900 font-black ring-1 ring-inset ring-blue-300'
                      : 'hover:bg-slate-100/60 text-slate-300'
                  }`}
                  title="ደረጃ 1 (ዝቅተኛ) ምረጥ"
                >
                  {comp.rating === 1 ? '1' : ''}
                </td>

                {/* Rating 2 Column Cell */}
                <td
                  onClick={() => handleRatingChange(comp.id, 2)}
                  className={`border-r border-slate-400 p-2 text-center font-extrabold font-mono text-sm cursor-pointer select-none transition ${
                    comp.rating === 2
                      ? 'bg-blue-50/80 text-blue-900 font-black ring-1 ring-inset ring-blue-300'
                      : 'hover:bg-slate-100/60 text-slate-300'
                  }`}
                  title="ደረጃ 2 (አጥጋቢ) ምረጥ"
                >
                  {comp.rating === 2 ? '2' : ''}
                </td>

                {/* Rating 3 Column Cell */}
                <td
                  onClick={() => handleRatingChange(comp.id, 3)}
                  className={`border-r border-slate-400 p-2 text-center font-extrabold font-mono text-sm cursor-pointer select-none transition ${
                    comp.rating === 3
                      ? 'bg-blue-50/80 text-blue-900 font-black ring-1 ring-inset ring-blue-300'
                      : 'hover:bg-slate-100/60 text-slate-300'
                  }`}
                  title="ደረጃ 3 (ከፍተኛ) ምረጥ"
                >
                  {comp.rating === 3 ? '3' : ''}
                </td>

                {/* Rating 4 Column Cell */}
                <td
                  onClick={() => handleRatingChange(comp.id, 4)}
                  className={`border-r border-slate-400 p-2 text-center font-extrabold font-mono text-sm cursor-pointer select-none transition ${
                    comp.rating === 4
                      ? 'bg-blue-50/80 text-blue-900 font-black ring-1 ring-inset ring-blue-300'
                      : 'hover:bg-slate-100/60 text-slate-300'
                  }`}
                  title="ደረጃ 4 (በጣም ከፍተኛ) ምረጥ"
                >
                  {comp.rating === 4 ? '4' : ''}
                </td>

                {/* Obtained Result (e.g. 100, 75, 50, 25) */}
                <td className="border-r border-slate-400 p-2 text-center font-bold font-mono text-slate-900">
                  {comp.scorePercent}
                </td>

                {/* Team Leader 40% Column */}
                <td className="p-2 text-center font-bold font-mono text-slate-900">
                  {Number.isInteger(comp.score40) ? comp.score40 : comp.score40.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Footer / Total Row */}
          <tfoot>
            <tr className="bg-slate-50 font-extrabold border-t-2 border-slate-400 text-slate-900">
              <td className="border-r border-slate-400 p-2.5 sm:p-3 font-extrabold">
                አጠቃላይ ድምር
              </td>
              <td className="border-r border-slate-400 p-2 text-center font-mono font-extrabold">
                {totalWeight}%
              </td>
              <td className="border-r border-slate-400 p-2"></td>
              <td className="border-r border-slate-400 p-2"></td>
              <td className="border-r border-slate-400 p-2"></td>
              <td className="border-r border-slate-400 p-2"></td>
              <td className="border-r border-slate-400 p-2"></td>
              <td className="p-2 text-center font-mono font-black text-slate-950 text-sm sm:text-base">
                {Number.isInteger(totalOutOf40) ? totalOutOf40 : totalOutOf40.toFixed(1)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 4. Bottom Legend & Formula Breakdown (strictly as in official document) */}
      <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 space-y-3">
        {/* Rating Scale Legend */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-bold pb-1 text-slate-900">
          <span>በጣም ከፍተኛ = 4</span>
          <span>ከፍተኛ = 3</span>
          <span>አጥጋቢ = 2</span>
          <span>ዝቅተኛ = 1</span>
        </div>

        {/* Dynamic Calculation Breakdown */}
        <div className="space-y-1.5 font-mono text-xs sm:text-sm text-slate-800 pt-1">
          {rowData.map((comp, idx) => {
            const shortName = getShortLabel(comp, idx);
            const shareStr = comp.weightedShare % 1 === 0 ? comp.weightedShare : comp.weightedShare;
            const scoreStr = comp.score40 % 1 === 0 ? comp.score40 : comp.score40;

            return (
              <div key={`formula-${comp.id}`} className="flex items-center gap-1.5">
                <span className="text-slate-900 font-bold">✓ {shortName}=</span>
                <span className="tracking-tight">
                  {shareStr}*40/100={scoreStr}
                </span>
              </div>
            );
          })}
        </div>

        {/* Total Score from 40% */}
        <div className="pt-3 border-t border-slate-200">
          <span className="font-extrabold text-sm sm:text-base text-slate-900 font-mono">
            ከ40% = {Number.isInteger(totalOutOf40) ? totalOutOf40 : totalOutOf40.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
