import React from 'react';
import { TaskCategory, RatingLevel, EmployeeMetadata } from '../types/appraisal';
import { JobDescription } from '../types/jobDescription';
import { Language } from '../utils/i18n';
import { 
  calculateCriterion, 
  calculateTotalTaskScore, 
  convertEvaluationTableToTaskCategories,
  divideWeightIntoCriteria
} from '../utils/calculations';
import { 
  Briefcase,
  Printer,
  Trash2
} from 'lucide-react';
import { 
  DATABASE_ADMIN_EVALUATION_TABLE, 
  SYSTEM_ADMIN_EVALUATION_TABLE, 
  NETWORK_ADMIN_EVALUATION_TABLE 
} from '../data/extraModulesData';
import { OFFICIAL_STAFF_POSITIONS } from '../data/officialStaffPositions';

interface TaskEvaluationTabProps {
  categories: TaskCategory[];
  onChangeCategories: (updated: TaskCategory[]) => void;
  metadata: EmployeeMetadata;
  onChangeMetadata: (updated: EmployeeMetadata) => void;
  lang: Language;
  jobDescriptions?: JobDescription[];
  onDeleteRecord?: () => void;
}

export const TaskEvaluationTab: React.FC<TaskEvaluationTabProps> = ({
  categories,
  onChangeCategories,
  metadata,
  onChangeMetadata,
  lang,
  onDeleteRecord
}) => {
  const grandTaskScore = calculateTotalTaskScore(categories);

  // Live sum of all criteria weights (should sum to 60)
  const totalCriteriaWeights = categories.reduce(
    (sum, cat) =>
      sum +
      cat.subtasks.reduce(
        (stSum, st) =>
          stSum +
          st.criteria.reduce((crSum, cr) => crSum + (Number(cr.weight) || 0), 0),
        0
      ),
    0
  );

  // Handle Metadata Field Updates
  const handleMetadataChange = (field: keyof EmployeeMetadata, value: string) => {
    onChangeMetadata({
      ...metadata,
      [field]: value
    });
  };

  // Derive Grade and Clean Position Title
  const getGradeFromPosition = (pos: string) => {
    if (pos.includes('ደረጃ XIII')) return 'XIII';
    if (pos.includes('ደረጃ XII')) return 'XII';
    if (pos.includes('ደረጃ XI')) return 'XI';
    if (pos.includes('ደረጃ X')) return 'X';
    return 'XIII';
  };

  const getTitleWithoutGrade = (pos: string) => {
    return pos
      .replace(/ደረጃ\s*(XIII|XII|XI|X)/gi, '')
      .replace(/\s+/g, ' ')
      .trim() || 'ከፍተኛ የኔትወርክ ባለሙያ';
  };

  // 1. Rating Change Handler (Sets rating directly by clicking level 1, 2, 3, or 4)
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

  // 2. Subtask Description Change Handler (ከባለሙያ የሚጠበቅ ውጤት)
  const handleSubtaskDescChange = (
    catId: number,
    subtaskIdx: number,
    newDesc: string
  ) => {
    const updated = categories.map((cat) => {
      if (cat.id !== catId) return cat;

      const updatedSubtasks = cat.subtasks.map((st, sIdx) => {
        if (sIdx !== subtaskIdx) return st;
        return { ...st, desc: newDesc };
      });

      return { ...cat, subtasks: updatedSubtasks };
    });

    onChangeCategories(updated);
  };

  // 3. Subtask Total Weight Change Handler (under ክብደት)
  const handleSubtaskTotalWeightChange = (
    catId: number,
    subtaskIdx: number,
    rawWeight: number
  ) => {
    const newTotal = Math.max(0, Number(rawWeight) || 0);

    const updated = categories.map((cat) => {
      if (cat.id !== catId) return cat;

      const updatedSubtasks = cat.subtasks.map((st, sIdx) => {
        if (sIdx !== subtaskIdx) return st;
        const dividedCriteria = divideWeightIntoCriteria(newTotal, st.criteria);
        return { ...st, criteria: dividedCriteria };
      });

      const sumCriteriaInCat = updatedSubtasks.reduce(
        (stSum, st) =>
          stSum +
          st.criteria.reduce((crSum, cr) => crSum + (Number(cr.weight) || 0), 0),
        0
      );

      return {
        ...cat,
        weight: Number(sumCriteriaInCat.toFixed(2)),
        subtasks: updatedSubtasks
      };
    });

    onChangeCategories(updated);
  };

  // 4. Criteria Weight Change Handler (የመመዘኛ ክብደት)
  const handleCriteriaWeightChange = (
    catId: number,
    subtaskIdx: number,
    critId: string,
    rawWeight: number
  ) => {
    const newWeight = Math.max(0, Number(rawWeight) || 0);

    const updated = categories.map((cat) => {
      if (cat.id !== catId) return cat;

      const updatedSubtasks = cat.subtasks.map((st, sIdx) => {
        if (sIdx !== subtaskIdx) return st;

        const updatedCriteria = st.criteria.map((cr) => {
          if (cr.id !== critId) return cr;
          return { ...cr, weight: newWeight };
        });

        return { ...st, criteria: updatedCriteria };
      });

      const sumCriteriaInCat = updatedSubtasks.reduce(
        (stSum, st) =>
          stSum +
          st.criteria.reduce((crSum, cr) => crSum + (Number(cr.weight) || 0), 0),
        0
      );

      return {
        ...cat,
        weight: Number(sumCriteriaInCat.toFixed(2)),
        subtasks: updatedSubtasks
      };
    });

    onChangeCategories(updated);
  };

  // 5. Category Title Change Handler (የሚጠበቅ ውጤት)
  const handleCategoryTitleChange = (catId: number, newTitle: string) => {
    const updated = categories.map((cat) => {
      if (cat.id !== catId) return cat;
      return { ...cat, title: newTitle };
    });
    onChangeCategories(updated);
  };

  // 6. Quick Official Position Selector
  const handleSelectOfficialRole = (roleTitle: string) => {
    const found = OFFICIAL_STAFF_POSITIONS.find((p) => p.titleAm === roleTitle);
    if (!found) return;

    onChangeMetadata({
      ...metadata,
      empPosition: found.titleAm,
      empDept: found.departmentAm
    });

    // Auto-load official table template if applicable
    if (found.category === 'network') {
      onChangeCategories(convertEvaluationTableToTaskCategories(NETWORK_ADMIN_EVALUATION_TABLE));
    } else if (found.category === 'database') {
      onChangeCategories(convertEvaluationTableToTaskCategories(DATABASE_ADMIN_EVALUATION_TABLE));
    } else if (found.category === 'system') {
      onChangeCategories(convertEvaluationTableToTaskCategories(SYSTEM_ADMIN_EVALUATION_TABLE));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-4 sm:p-8 mb-6 font-sans text-slate-900">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-200 print:hidden">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-slate-600" />
          <span className="text-xs font-bold text-slate-700">ይፋዊ የሥራ መደብ ምረጥ፡</span>
          <select
            value={
              OFFICIAL_STAFF_POSITIONS.some((p) => p.titleAm === metadata.empPosition)
                ? metadata.empPosition
                : metadata.empPosition || ''
            }
            onChange={(e) => handleSelectOfficialRole(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 bg-white font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="">-- የስራ መደብ ይምረጡ --</option>
            <optgroup label="🌐 የኔትዎርክ አስተዳደር">
              <option value="ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII">ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII</option>
              <option value="መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII">መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII</option>
              <option value="ረዳት የኔትወርክ ባለሙያ ደረጃ XI">ረዳት የኔትወርክ ባለሙያ ደረጃ XI</option>
              <option value="ጀማሪ የኔትወርክ ባለሙያ ደረጃ X">ጀማሪ የኔትወርክ ባለሙያ ደረጃ X</option>
            </optgroup>
            <optgroup label="💾 የዳታቤዝ አስተዳደር">
              <option value="ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII">ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII</option>
              <option value="መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII">መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII</option>
              <option value="ረዳት የዳታቤዝ ባለሙያ ደረጃ XI">ረዳት የዳታቤዝ ባለሙያ ደረጃ XI</option>
              <option value="ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X">ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X</option>
            </optgroup>
            <optgroup label="🖥️ የሲስተም አስተዳደር">
              <option value="ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII">ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII</option>
              <option value="መካከለኛ የሲስተም ባለሙያ ደረጃ XII">መካከለኛ የሲስተም ባለሙያ ደረጃ XII</option>
              <option value="ረዳት የሲስተም ባለሙያ ደረጃ XI">ረዳት የሲስተም ባለሙያ ደረጃ XI</option>
              <option value="ጀማሪ የሲስተም ባለሙያ ደረጃ X">ጀማሪ የሲስተም ባለሙያ ደረጃ X</option>
            </optgroup>
          </select>
        </div>

        <div className="flex items-center gap-2">
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
      </div>

      {/* 1. Official Header Title (strictly matching 60.jpg) */}
      <div className="text-center pb-4 mb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-950 tracking-tight">
          የ6 ወር የአፈፃፀም ምዘና ቅጽ ከ60%
        </h2>
      </div>

      {/* 2. Official Metadata Header - 2 Columns (strictly matching 60.jpg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold mb-6 text-slate-900">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap">የሠራተኛው ሙሉ ስም በአማርኛ ፡-</span>
            <input
              type="text"
              value={metadata.empName || 'ሊዲያ ግሩም ገብረስላሴ'}
              onChange={(e) => handleMetadataChange('empName', e.target.value)}
              placeholder="ሊዲያ ግሩም ገብረስላሴ"
              className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap">የሥራ ክፍሉ መጠሪያ፡-</span>
            <input
              type="text"
              value={metadata.empDept || 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት'}
              onChange={(e) => handleMetadataChange('empDept', e.target.value)}
              placeholder="የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት"
              className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap">ደረጃ፡-</span>
            <input
              type="text"
              value={getGradeFromPosition(metadata.empPosition)}
              onChange={(e) => {
                const baseTitle = getTitleWithoutGrade(metadata.empPosition);
                handleMetadataChange('empPosition', `${baseTitle} ደረጃ ${e.target.value}`.trim());
              }}
              placeholder="XIII"
              className="w-24 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap">የሥራ መደብ መጠሪያ ፡-</span>
            <input
              type="text"
              value={getTitleWithoutGrade(metadata.empPosition)}
              onChange={(e) => {
                const grade = getGradeFromPosition(metadata.empPosition);
                handleMetadataChange('empPosition', `${e.target.value} ደረጃ ${grade}`.trim());
              }}
              placeholder="ከፍተኛ የኔትወርክ ባለሙያ"
              className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap">የአፈፃፀም ምዘናው ጊዜ</span>
            <input
              type="text"
              value={metadata.evalPeriod || 'ከ ጥር1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም'}
              onChange={(e) => handleMetadataChange('evalPeriod', e.target.value)}
              placeholder="ከ ጥር1/ 2018 ዓ.ም እስከ ሰኔ 30/2018 ዓ.ም"
              className="flex-1 border-b border-dotted border-slate-500 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>
      </div>

      {/* 3. Official 60% Table (strictly matching 60.jpg columns & structure) */}
      <div className="overflow-x-auto border border-black shadow-2xs mb-6">
        <table className="w-full text-xs border-collapse border border-black min-w-[1100px]">
          <thead className="bg-slate-50 font-bold text-slate-900 text-center">
            {/* Header Row 1 */}
            <tr>
              <th rowSpan={2} className="border border-black p-1 w-8 text-center align-middle">
                ተቁ
              </th>
              <th rowSpan={2} className="border border-black p-1 w-44 text-center align-middle">
                የሚጠበቅ ውጤት
              </th>
              <th rowSpan={2} className="border border-black p-1.5 min-w-[280px] text-center align-middle">
                ከባለሙያ የሚጠበቅ ውጤት
              </th>
              <th rowSpan={2} className="border border-black p-1 w-12 text-center align-middle">
                ክብደት
              </th>
              <th rowSpan={2} className="border border-black p-1 w-20 text-center align-middle text-[11px]">
                መመዘኛ/ ጥራት፣ ጊዜ፣ ወጪ/
              </th>
              <th rowSpan={2} className="border border-black p-1 w-14 text-center align-middle text-[11px]">
                የመመዘኛ ክብደት
              </th>
              <th colSpan={4} className="border border-black p-1 text-center font-bold">
                የአፈፃፀም ደረጃ
              </th>
              <th rowSpan={2} className="border border-black p-1 w-24 text-center align-middle text-[10px] leading-tight">
                አጠቃላይ ውጤት/የተገኘ ውጤት/በ-አፈጻጸም ደረጃ/
              </th>
              <th rowSpan={2} className="border border-black p-1 w-24 text-center align-middle text-[10px] leading-tight">
                በ/ ከፍተኛ ተባዝቶ የሚገኝ ውጤት /በክብደት*4/
              </th>
              <th rowSpan={2} className="border border-black p-1 w-20 text-center align-middle text-[10px] leading-tight">
                የተሰጠ ውጤት
                <span className="block font-normal text-[9px] mt-0.5">
                  አንጻር የተሰጠ ውጤት /ከስድሳ/በአጠቃላይ ውጤት /
                </span>
              </th>
            </tr>

            {/* Header Row 2: 4 Levels */}
            <tr className="bg-slate-100 text-[10px]">
              <th className="border border-black p-1 w-10 text-center">ዝቅተኛ 1</th>
              <th className="border border-black p-1 w-10 text-center">አጥጋቢ 2</th>
              <th className="border border-black p-1 w-10 text-center">ከፍተኛ 3</th>
              <th className="border border-black p-1 w-12 text-center">በጣም ከፍተኛ 4</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => {
              const catRowSpan = cat.subtasks.reduce((sum, st) => sum + st.criteria.length, 0);
              let catFirst = true;

              return (
                <React.Fragment key={`cat-${cat.id}`}>
                  {cat.subtasks.map((st, stIdx) => {
                    const stRowSpan = st.criteria.length;
                    const stTotalWeight = st.criteria.reduce(
                      (sum, cr) => sum + (Number(cr.weight) || 0),
                      0
                    );
                    let stFirst = true;

                    return (
                      <React.Fragment key={`st-${cat.id}-${st.subId}`}>
                        {st.criteria.map((crit) => {
                          const calc = calculateCriterion(crit.weight, crit.rating);
                          const isCatFirst = catFirst;
                          const isStFirst = stFirst;
                          if (catFirst) catFirst = false;
                          if (stFirst) stFirst = false;

                          return (
                            <tr
                              key={`crit-${crit.id}`}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              {/* 1. Category Number */}
                              {isCatFirst && (
                                <td
                                  rowSpan={catRowSpan}
                                  className="border border-black p-1.5 text-center font-bold align-top bg-white"
                                >
                                  {cat.id}
                                </td>
                              )}

                              {/* 2. Category Title (Expected Result / የሚጠበቅ ውጤት) */}
                              {isCatFirst && (
                                <td
                                  rowSpan={catRowSpan}
                                  className="border border-black p-2 font-bold text-xs align-top bg-white leading-relaxed"
                                >
                                  <textarea
                                    value={cat.title}
                                    onChange={(e) => handleCategoryTitleChange(cat.id, e.target.value)}
                                    rows={5}
                                    className="w-full bg-transparent border-none p-0 text-xs font-bold text-slate-900 focus:outline-none resize-none"
                                  />
                                </td>
                              )}

                              {/* 3. Subtask Description (ከባለሙያ የሚጠበቅ ውጤት) */}
                              {isStFirst && (
                                <td
                                  rowSpan={stRowSpan}
                                  className="border border-black p-2 align-top text-xs leading-relaxed"
                                >
                                  <textarea
                                    value={st.desc}
                                    onChange={(e) => handleSubtaskDescChange(cat.id, stIdx, e.target.value)}
                                    rows={stRowSpan > 1 ? 3 : 2}
                                    className="w-full bg-transparent border-none p-0 text-xs text-slate-900 focus:outline-none resize-none"
                                  />
                                </td>
                              )}

                              {/* 4. Subtask Total Weight (ክብደት) */}
                              {isStFirst && (
                                <td
                                  rowSpan={stRowSpan}
                                  className="border border-black p-1 text-center font-bold text-xs align-middle bg-slate-50/50"
                                >
                                  <input
                                    type="number"
                                    value={stTotalWeight}
                                    onChange={(e) => handleSubtaskTotalWeightChange(cat.id, stIdx, parseFloat(e.target.value))}
                                    className="w-10 text-center font-bold text-xs bg-transparent border-none p-0 focus:outline-none"
                                  />
                                </td>
                              )}

                              {/* 5. Criterion Type (መመዘኛ/ ጥራት፣ ጊዜ፣ ወጪ/) */}
                              <td className="border border-black p-1 text-center font-medium text-xs">
                                {crit.type}
                              </td>

                              {/* 6. Criterion Weight (የመመዘኛ ክብደት) */}
                              <td className="border border-black p-1 text-center font-bold text-xs">
                                <input
                                  type="number"
                                  value={crit.weight}
                                  onChange={(e) => handleCriteriaWeightChange(cat.id, stIdx, crit.id, parseFloat(e.target.value))}
                                  className="w-9 text-center font-bold text-xs bg-transparent border-none p-0 focus:outline-none"
                                />
                              </td>

                              {/* 7. Rating Level 1 (ዝቅተኛ 1) */}
                              <td
                                onClick={() => handleRatingChange(cat.id, stIdx, crit.id, 1)}
                                className={`border border-black p-1 text-center font-bold text-xs cursor-pointer select-none transition-colors ${
                                  crit.rating === 1 ? 'bg-slate-200 font-black' : 'hover:bg-blue-50/50'
                                }`}
                              >
                                {crit.rating === 1 ? '1' : ''}
                              </td>

                              {/* 8. Rating Level 2 (አጥጋቢ 2) */}
                              <td
                                onClick={() => handleRatingChange(cat.id, stIdx, crit.id, 2)}
                                className={`border border-black p-1 text-center font-bold text-xs cursor-pointer select-none transition-colors ${
                                  crit.rating === 2 ? 'bg-slate-200 font-black' : 'hover:bg-blue-50/50'
                                }`}
                              >
                                {crit.rating === 2 ? '2' : ''}
                              </td>

                              {/* 9. Rating Level 3 (ከፍተኛ 3) */}
                              <td
                                onClick={() => handleRatingChange(cat.id, stIdx, crit.id, 3)}
                                className={`border border-black p-1 text-center font-bold text-xs cursor-pointer select-none transition-colors ${
                                  crit.rating === 3 ? 'bg-slate-200 font-black' : 'hover:bg-blue-50/50'
                                }`}
                              >
                                {crit.rating === 3 ? '3' : ''}
                              </td>

                              {/* 10. Rating Level 4 (በጣም ከፍተኛ 4) */}
                              <td
                                onClick={() => handleRatingChange(cat.id, stIdx, crit.id, 4)}
                                className={`border border-black p-1 text-center font-bold text-xs cursor-pointer select-none transition-colors ${
                                  crit.rating === 4 ? 'bg-slate-200 font-black' : 'hover:bg-blue-50/50'
                                }`}
                              >
                                {crit.rating === 4 ? '4' : ''}
                              </td>

                              {/* 11. አጠቃላይ ውጤት/የተገኘ ውጤት/በ-አፈጻጸም ደረጃ/ (weight * rating) */}
                              <td className="border border-black p-1 text-center font-mono font-bold text-xs">
                                {calc.actualProduct}
                              </td>

                              {/* 12. በ/ ከፍተኛ ተባዝቶ የሚገኝ ውጤት /በክብደት*4/ */}
                              <td className="border border-black p-1 text-center font-mono font-bold text-xs">
                                {calc.actualProduct}
                              </td>

                              {/* 13. የተሰጠ ውጤት (Scaled Score out of 60) */}
                              <td className="border border-black p-1 text-center font-mono font-bold text-xs">
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

          {/* Official Table Footer (strictly matching 60.jpg) */}
          <tfoot className="bg-slate-100 font-bold text-slate-900">
            <tr>
              <td colSpan={5} className="border border-black p-1.5"></td>
              {/* Total Criteria Weight: 60 */}
              <td className="border border-black p-1.5 text-center font-mono font-bold text-xs">
                {Number.isInteger(totalCriteriaWeights) ? totalCriteriaWeights : totalCriteriaWeights.toFixed(0)}
              </td>
              <td colSpan={5} className="border border-black p-1.5"></td>
              {/* Grand Total Label */}
              <td className="border border-black p-1.5 text-center font-bold text-xs">
                ድምር
              </td>
              {/* Grand Task Score: e.g. 52.92 */}
              <td className="border border-black p-1.5 text-center font-mono font-black text-xs sm:text-sm">
                {Number.isInteger(grandTaskScore) ? grandTaskScore : grandTaskScore.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
