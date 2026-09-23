import React from 'react';
import { TaskCategory, RatingLevel } from '../types/appraisal';
import { Language, translations } from '../utils/i18n';
import { calculateCriterion, calculateCategoryScore, calculateTotalTaskScore } from '../utils/calculations';
import { Check, Info, Sparkles, ChevronDown } from 'lucide-react';

interface TaskEvaluationTabProps {
  categories: TaskCategory[];
  onChangeCategories: (updated: TaskCategory[]) => void;
  lang: Language;
}

export const TaskEvaluationTab: React.FC<TaskEvaluationTabProps> = ({
  categories,
  onChangeCategories,
  lang
}) => {
  const t = translations[lang];
  const grandTaskScore = calculateTotalTaskScore(categories);

  const handleRatingChange = (
    catId: number,
    subtaskIdx: number,
    critId: string,
    newRating: RatingLevel
  ) => {
    const updated = categories.map((cat) => {
      if (cat.id !== catId) return cat;

      const updatedSubtasks = cat.subtasks.map((st, sIdx) => {
        if (sIdx !== subtaskIdx) return st;

        const updatedCriteria = st.criteria.map((cr) => {
          if (cr.id !== critId) return cr;
          return { ...cr, rating: newRating };
        });

        return { ...st, criteria: updatedCriteria };
      });

      return { ...cat, subtasks: updatedSubtasks };
    });

    onChangeCategories(updated);
  };

  const handleQuickFill = (targetRating: RatingLevel) => {
    const updated = categories.map((cat) => ({
      ...cat,
      subtasks: cat.subtasks.map((st) => ({
        ...st,
        criteria: st.criteria.map((cr) => ({ ...cr, rating: targetRating }))
      }))
    }));
    onChangeCategories(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-6">
      {/* Tab Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {t.tab1Header}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'am'
              ? 'በውጤት ተኮር ዕቅድ ላይ የተመሠረተ 4 ዋና ዋና የትኩረት አቅጣጫዎች ምዘና'
              : 'Evaluation across 4 Key Strategic Result Areas based on Result-Oriented Operational Plan'}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Quick Rating Fillers */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
            <span className="text-[11px] font-medium text-slate-500 px-1 hidden md:inline">
              <Sparkles className="w-3 h-3 inline mr-1 text-amber-500" />
              {t.fillAllRatings}:
            </span>
            <button
              onClick={() => handleQuickFill(4)}
              className="px-2 py-1 font-semibold rounded bg-white text-blue-700 shadow-xs hover:bg-blue-50 transition text-[11px]"
              title="ሁሉንም 4 አድርግ"
            >
              4 (በጣም ከፍተኛ)
            </button>
            <button
              onClick={() => handleQuickFill(3)}
              className="px-2 py-1 font-semibold rounded bg-white text-slate-700 shadow-xs hover:bg-slate-50 transition text-[11px]"
              title="ሁሉንም 3 አድርግ"
            >
              3 (ከፍተኛ)
            </button>
          </div>

          {/* Subtotal badge */}
          <div className="text-right pl-3 border-l border-slate-200">
            <span className="text-[11px] text-slate-500 block">{t.taskScoreLabel}</span>
            <span className="text-lg font-extrabold font-mono tabular-nums text-blue-700">
              {grandTaskScore.toFixed(2)}{' '}
              <span className="text-xs font-semibold text-slate-400">/ 60.00</span>
            </span>
          </div>
        </div>
      </div>

      {/* Guide strip */}
      <div className="text-xs text-slate-600 mb-4 bg-blue-50/70 p-3 rounded-lg border border-blue-100/80 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <strong>{lang === 'am' ? 'የደረጃ መለኪያ መመሪያ፡' : 'Rating Standard:'}</strong>{' '}
          1 = ዝቅተኛ (Low) | 2 = አጥጋቢ (Satisfactory) | 3 = ከፍተኛ (High) | 4 = በጣም ከፍተኛ (Very High)።
          <span className="block mt-0.5 text-blue-800 font-mono text-[11px]">
            {lang === 'am'
              ? 'ስሌት፡ የተገኘ ውጤት = (መለኪያ ክብደት * ደረጃ)፤ ከተሰጠው ክብደት አንጻር = (ደረጃ / 4) * መለኪያ ክብደት'
              : 'Formula: Actual Product = (Criteria Weight * Rating); Score = (Rating / 4) * Criteria Weight'}
          </span>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-xs text-left border-collapse min-w-[980px]">
          <thead className="bg-slate-100/90 text-slate-700 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="border-r border-slate-200 p-2.5 text-center w-10">{t.colNo}</th>
              <th className="border-r border-slate-200 p-2.5 w-1/4">{t.colCategory}</th>
              <th className="border-r border-slate-200 p-2.5 w-1/3">{t.colSubtask}</th>
              <th className="border-r border-slate-200 p-2.5 text-center w-14">{t.colCatWeight}</th>
              <th className="border-r border-slate-200 p-2.5 text-center w-20">{t.colCriteriaType}</th>
              <th className="border-r border-slate-200 p-2.5 text-center w-14">{t.colCritWeight}</th>
              <th className="border-r border-slate-200 p-2.5 text-center w-36">{t.colRating}</th>
              <th className="border-r border-slate-200 p-2.5 text-center w-16">{t.colMaxProd}</th>
              <th className="border-r border-slate-200 p-2.5 text-center w-16">{t.colActProd}</th>
              <th className="p-2.5 text-center w-20">{t.colScaledScore}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {categories.map((cat) => {
              const catScore = calculateCategoryScore(cat);
              const catRowSpan = cat.subtasks.reduce((sum, st) => sum + st.criteria.length, 0);
              let catFirstCell = true;

              return (
                <React.Fragment key={cat.id}>
                  {cat.subtasks.map((st, stIdx) => {
                    const stRowSpan = st.criteria.length;
                    let stFirstCell = true;

                    return (
                      <React.Fragment key={`${cat.id}-${st.subId}`}>
                        {st.criteria.map((crit) => {
                          const calc = calculateCriterion(crit.weight, crit.rating);
                          const isCatFirst = catFirstCell;
                          const isStFirst = stFirstCell;
                          if (catFirstCell) catFirstCell = false;
                          if (stFirstCell) stFirstCell = false;

                          return (
                            <tr
                              key={crit.id}
                              className="hover:bg-blue-50/30 transition-colors group"
                            >
                              {/* Category Index Column */}
                              {isCatFirst && (
                                <td
                                  rowSpan={catRowSpan}
                                  className="border-r border-slate-200 p-3 text-center font-bold text-slate-800 bg-slate-50/60 align-top"
                                >
                                  {cat.id}
                                </td>
                              )}

                              {/* Category Title Column */}
                              {isCatFirst && (
                                <td
                                  rowSpan={catRowSpan}
                                  className="border-r border-slate-200 p-3 font-semibold text-slate-800 bg-slate-50/60 align-top leading-snug"
                                >
                                  <div className="text-slate-900">{cat.title}</div>
                                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-100/70 text-blue-800 text-[11px] font-bold">
                                    <span>ክብደት: {cat.weight}%</span>
                                  </div>
                                  <div className="mt-1 text-[11px] text-slate-500">
                                    የተገኘ፡ <strong className="text-blue-700 font-mono">{catScore.toFixed(2)}</strong> / {cat.weight}
                                  </div>
                                </td>
                              )}

                              {/* Subtask Description Column */}
                              {isStFirst && (
                                <td
                                  rowSpan={stRowSpan}
                                  className="border-r border-slate-200 p-3 text-slate-700 align-top leading-relaxed"
                                >
                                  <span className="font-bold text-slate-900 mr-1.5 font-mono">
                                    {st.subId}
                                  </span>
                                  {st.desc}
                                </td>
                              )}

                              {/* Category Fixed Weight */}
                              <td className="border-r border-slate-200 p-2 text-center text-slate-500 font-mono tabular-nums">
                                {cat.weight}
                              </td>

                              {/* Criterion Type (Quality / Time) */}
                              <td className="border-r border-slate-200 p-2 text-center font-medium">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                                    crit.type === 'ጥራት' || crit.type === 'Quality'
                                      ? 'text-indigo-700 bg-indigo-50'
                                      : 'text-amber-700 bg-amber-50'
                                  }`}
                                >
                                  {crit.type}
                                </span>
                              </td>

                              {/* Criterion Weight */}
                              <td className="border-r border-slate-200 p-2 text-center font-bold text-slate-700 font-mono tabular-nums">
                                {crit.weight}
                              </td>

                              {/* Rating Dropdown (1 to 4) */}
                              <td className="border-r border-slate-200 p-1.5 text-center">
                                <select
                                  value={crit.rating}
                                  onChange={(e) =>
                                    handleRatingChange(
                                      cat.id,
                                      stIdx,
                                      crit.id,
                                      Number(e.target.value) as RatingLevel
                                    )
                                  }
                                  className={`w-full py-1 px-1.5 rounded border text-xs font-bold text-center transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    crit.rating === 4
                                      ? 'bg-blue-50/70 border-blue-300 text-blue-900'
                                      : crit.rating === 3
                                      ? 'bg-slate-50 border-slate-300 text-slate-800'
                                      : crit.rating === 2
                                      ? 'bg-amber-50/70 border-amber-300 text-amber-900'
                                      : 'bg-rose-50/70 border-rose-300 text-rose-900'
                                  }`}
                                >
                                  <option value={4}>4 - በጣም ከፍተኛ</option>
                                  <option value={3}>3 - ከፍተኛ</option>
                                  <option value={2}>2 - አጥጋቢ</option>
                                  <option value={1}>1 - ዝቅተኛ</option>
                                </select>
                              </td>

                              {/* Max Product */}
                              <td className="border-r border-slate-200 p-2 text-center text-slate-400 font-mono tabular-nums">
                                {calc.maxProduct}
                              </td>

                              {/* Actual Product */}
                              <td className="border-r border-slate-200 p-2 text-center font-semibold text-slate-700 font-mono tabular-nums">
                                {calc.actualProduct}
                              </td>

                              {/* Scaled Score */}
                              <td className="p-2 text-center font-bold text-blue-700 font-mono tabular-nums bg-blue-50/20">
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
          <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-800">
            <tr>
              <td colSpan={3} className="border-r border-slate-300 p-3 text-right">
                {lang === 'am' ? 'የሁሉም ተግባራት ድምር (Total Task Points):' : 'Sum of Task Weights:'}
              </td>
              <td className="border-r border-slate-300 p-3 text-center font-mono tabular-nums">
                60
              </td>
              <td colSpan={5} className="border-r border-slate-300 p-3 text-right text-xs">
                {t.totalTaskPoints}:
              </td>
              <td className="p-3 text-center text-blue-800 text-sm font-mono tabular-nums bg-blue-100/50">
                {grandTaskScore.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
