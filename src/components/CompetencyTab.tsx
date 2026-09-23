import React from 'react';
import { CompetencyItem, RatingLevel } from '../types/appraisal';
import { Language, translations } from '../utils/i18n';
import { calculateCompetencyItem, calculateTotalCompetencyScore } from '../utils/calculations';
import { Info, ShieldCheck, Heart, Award, Users } from 'lucide-react';

interface CompetencyTabProps {
  competencies: CompetencyItem[];
  onChangeCompetencies: (updated: CompetencyItem[]) => void;
  lang: Language;
}

export const CompetencyTab: React.FC<CompetencyTabProps> = ({
  competencies,
  onChangeCompetencies,
  lang
}) => {
  const t = translations[lang];
  const { totalPercent, totalOutOf40 } = calculateTotalCompetencyScore(competencies);

  const getCompetencyIcon = (id: string) => {
    switch (id) {
      case 'c1':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'c2':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'c3':
        return <Award className="w-4 h-4 text-blue-500" />;
      case 'c4':
        return <Users className="w-4 h-4 text-indigo-500" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleRatingChange = (id: string, rating: RatingLevel) => {
    const updated = competencies.map((comp) => {
      if (comp.id !== id) return comp;
      return { ...comp, rating };
    });
    onChangeCompetencies(updated);
  };

  const handleNotesChange = (id: string, notes: string) => {
    const updated = competencies.map((comp) => {
      if (comp.id !== id) return comp;
      return { ...comp, notes };
    });
    onChangeCompetencies(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-6">
      {/* Tab Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {t.tab2Header}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'am'
              ? 'በሥራ ሂደት ውስጥ የሚጠበቁ 4 ቁልፍ የስነ-ምግባርና የአሰራር ባህሪያት ምዘና'
              : 'Appraisal of 4 Core Civil Service Competencies & Behavioral Attributes'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-500 block">{t.compScoreLabel}</span>
          <span className="text-lg font-extrabold font-mono tabular-nums text-emerald-700">
            {totalOutOf40.toFixed(2)}{' '}
            <span className="text-xs font-semibold text-slate-400">/ 40.00</span>
          </span>
        </div>
      </div>

      {/* Guide Note */}
      <div className="text-xs text-slate-600 mb-4 bg-emerald-50/70 p-3 rounded-lg border border-emerald-100/80 flex items-start gap-2">
        <Info className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <strong>{lang === 'am' ? 'የስሌት መመሪያ፡' : 'Calculation Formula:'}</strong>{' '}
          {t.compFormulaNote}{' '}
          <span className="block mt-0.5 text-emerald-800 font-mono text-[11px]">
            (ደረጃ / 4) * 25% = የተገኘ ውጤት % | ከተሰጠው 40% አንጻር = (የተገኘ ውጤት% * 40 / 100)
          </span>
        </div>
      </div>

      {/* Competencies Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 mb-6">
        <table className="w-full text-xs text-left border-collapse min-w-[760px]">
          <thead className="bg-slate-100/90 text-slate-700 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="border-r border-slate-200 p-3 w-1/3">{t.compColName}</th>
              <th className="border-r border-slate-200 p-3 text-center w-20">{t.compColWeight}</th>
              <th className="border-r border-slate-200 p-3 text-center w-48">{t.compColRating}</th>
              <th className="border-r border-slate-200 p-3 text-center w-28">{t.compColPercent}</th>
              <th className="p-3 text-center w-32">{t.compColScore40}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {competencies.map((comp) => {
              const calc = calculateCompetencyItem(comp.rating, comp.weight);

              return (
                <tr key={comp.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="border-r border-slate-200 p-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-slate-100 text-slate-700">
                        {getCompetencyIcon(comp.id)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {comp.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {comp.nameEn}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="border-r border-slate-200 p-3 text-center font-bold text-slate-700 font-mono tabular-nums">
                    {comp.weight}%
                  </td>

                  <td className="border-r border-slate-200 p-3 text-center">
                    <select
                      value={comp.rating}
                      onChange={(e) =>
                        handleRatingChange(comp.id, Number(e.target.value) as RatingLevel)
                      }
                      className={`w-full max-w-[210px] mx-auto py-1.5 px-2 rounded-md border text-xs font-bold text-center transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        comp.rating === 4
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : comp.rating === 3
                          ? 'bg-blue-50 border-blue-300 text-blue-900'
                          : comp.rating === 2
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'bg-rose-50 border-rose-300 text-rose-900'
                      }`}
                    >
                      <option value={4}>4 - በጣም ከፍተኛ (10.0)</option>
                      <option value={3}>3 - ከፍተኛ (7.5)</option>
                      <option value={2}>2 - አጥጋቢ (5.0)</option>
                      <option value={1}>1 - ዝቅተኛ (2.5)</option>
                    </select>
                  </td>

                  <td className="border-r border-slate-200 p-3 text-center font-semibold text-slate-800 font-mono tabular-nums">
                    {calc.percentResult.toFixed(0)}%
                  </td>

                  <td className="p-3 text-center font-bold text-emerald-700 font-mono tabular-nums text-sm bg-emerald-50/20">
                    {calc.scoreOutOf40.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-800">
            <tr>
              <td className="border-r border-slate-300 p-3 text-right">
                {lang === 'am' ? 'አጠቃላይ ድምር (Total Competencies):' : 'Total Competencies Sum:'}
              </td>
              <td className="border-r border-slate-300 p-3 text-center font-mono tabular-nums">
                100%
              </td>
              <td className="border-r border-slate-300 p-3"></td>
              <td className="border-r border-slate-300 p-3 text-center font-mono tabular-nums">
                {totalPercent.toFixed(0)}%
              </td>
              <td className="p-3 text-center text-emerald-800 text-sm font-mono tabular-nums bg-emerald-100/50">
                {totalOutOf40.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Behavioral Observation Notes Section */}
      <div className="mt-6 pt-5 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t.compNotes}</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competencies.map((comp) => (
            <div key={`note-${comp.id}`} className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                {getCompetencyIcon(comp.id)}
                <span>{comp.name}</span>
              </label>
              <textarea
                value={comp.notes || ''}
                onChange={(e) => handleNotesChange(comp.id, e.target.value)}
                placeholder={`${comp.name} የተመለከተ የተግባር ማረጋገጫ ወይም ማስታወሻ ይጻፉ...`}
                rows={2}
                className="w-full text-xs p-2 rounded border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
