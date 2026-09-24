import { TaskCategory, CompetencyItem, PerformanceGrade, Criterion } from '../types/appraisal';
import { EvaluationCategoryItem } from '../types/jobDescription';

export interface CriterionCalculation {
  maxProduct: number;
  actualProduct: number;
  scaledScore: number;
}

export function calculateCriterion(weight: number, rating: number): CriterionCalculation {
  const maxProduct = weight * 4;
  const actualProduct = weight * rating;
  const scaledScore = (rating / 4) * weight;

  return {
    maxProduct,
    actualProduct,
    scaledScore: Number(scaledScore.toFixed(2))
  };
}

export function calculateCategoryScore(category: TaskCategory): number {
  let catTotal = 0;
  category.subtasks.forEach(sub => {
    sub.criteria.forEach(crit => {
      catTotal += (crit.rating / 4) * crit.weight;
    });
  });
  return Number(catTotal.toFixed(2));
}

export function calculateTotalTaskScore(categories: TaskCategory[]): number {
  let total = 0;
  categories.forEach(cat => {
    total += calculateCategoryScore(cat);
  });
  return Number(total.toFixed(2));
}

export interface CompetencyCalculation {
  percentResult: number;
  scoreOutOf40: number;
}

export function calculateCompetencyItem(rating: number, weight: number = 25): CompetencyCalculation {
  const percentResult = (rating / 4) * weight;
  const scoreOutOf40 = (percentResult * 40) / 100;

  return {
    percentResult: Number(percentResult.toFixed(1)),
    scoreOutOf40: Number(scoreOutOf40.toFixed(2))
  };
}

export function calculateTotalCompetencyScore(competencies: CompetencyItem[]): {
  totalPercent: number;
  totalOutOf40: number;
} {
  let totalPercent = 0;
  competencies.forEach(c => {
    const calc = calculateCompetencyItem(c.rating, c.weight);
    totalPercent += calc.percentResult;
  });

  const totalOutOf40 = (totalPercent * 40) / 100;

  return {
    totalPercent: Number(totalPercent.toFixed(1)),
    totalOutOf40: Number(totalOutOf40.toFixed(2))
  };
}

export function getPerformanceGrade(score: number): PerformanceGrade {
  if (score >= 90) {
    return {
      levelAm: 'በጣም ከፍተኛ',
      levelEn: 'Outstanding / Very High',
      colorClass: 'text-emerald-700 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderClass: 'border-emerald-300 dark:border-emerald-800',
      minScore: 90
    };
  }
  if (score >= 75) {
    return {
      levelAm: 'ከፍተኛ',
      levelEn: 'Exceeds Standards / High',
      colorClass: 'text-blue-700 dark:text-blue-400',
      bgClass: 'bg-blue-50 dark:bg-blue-950/40',
      borderClass: 'border-blue-300 dark:border-blue-800',
      minScore: 75
    };
  }
  if (score >= 60) {
    return {
      levelAm: 'አጥጋቢ',
      levelEn: 'Satisfactory / Meets Standards',
      colorClass: 'text-amber-700 dark:text-amber-400',
      bgClass: 'bg-amber-50 dark:bg-amber-950/40',
      borderClass: 'border-amber-300 dark:border-amber-800',
      minScore: 60
    };
  }
  return {
    levelAm: 'ዝቅተኛ',
    levelEn: 'Unsatisfactory / Low',
    colorClass: 'text-rose-700 dark:text-rose-400',
    bgClass: 'bg-rose-50 dark:bg-rose-950/40',
    borderClass: 'border-rose-300 dark:border-rose-800',
    minScore: 0
  };
}

/**
 * Automatically divides a subtask's total weight into its criteria (such as Quality / Time)
 * following the standard Ethiopian civil service 60/40 distribution.
 */
export function divideWeightIntoCriteria(
  totalWeight: number,
  criteria: Criterion[]
): Criterion[] {
  const w = Math.max(0, Number(totalWeight) || 0);
  if (criteria.length <= 1) {
    return criteria.map((c) => ({ ...c, weight: w }));
  }

  if (criteria.length === 2) {
    let qWeight = Math.ceil(w / 2);
    if (w === 3) qWeight = 2;
    else if (w === 5) qWeight = 3;
    else if (w === 6) qWeight = 4;
    else if (w === 7) qWeight = 4;
    else if (w === 8) qWeight = 5;
    else if (w === 1) qWeight = 1;
    else if (w % 2 !== 0) qWeight = Math.ceil(w * 0.55);
    const tWeight = Number((w - qWeight).toFixed(2));

    return criteria.map((c, idx) => ({
      ...c,
      weight: idx === 0 ? qWeight : Math.max(0, tWeight)
    }));
  }

  const base = Math.floor((w / criteria.length) * 10) / 10;
  const remainder = Number((w - base * criteria.length).toFixed(2));
  return criteria.map((c, idx) => ({
    ...c,
    weight: idx === 0 ? Number((base + remainder).toFixed(2)) : base
  }));
}

/**
 * Converts the official civil service evaluation task tables (such as Database, System, and Network)
 * into TaskCategory[] objects for real-time appraisal scoring.
 */
export function convertEvaluationTableToTaskCategories(
  evalTable: EvaluationCategoryItem[],
  defaultRating: 1 | 2 | 3 | 4 = 4
): TaskCategory[] {
  return evalTable.map((cat) => ({
    id: cat.no,
    title: cat.expectedResult,
    weight: cat.weight,
    subtasks: cat.tasks.map((task) => {
      const w = task.weight;
      let criteria: Criterion[] = [];
      if (w >= 4) {
        const qWeight = Math.ceil(w / 2);
        const tWeight = w - qWeight;
        criteria = [
          { id: `${task.code}-q`, type: 'ጥራት', weight: qWeight, rating: defaultRating },
          { id: `${task.code}-t`, type: 'ጊዜ', weight: tWeight, rating: defaultRating }
        ];
      } else if (w === 3) {
        criteria = [
          { id: `${task.code}-q`, type: 'ጥራት', weight: 2, rating: defaultRating },
          { id: `${task.code}-t`, type: 'ጊዜ', weight: 1, rating: defaultRating }
        ];
      } else if (w === 2) {
        criteria = [
          { id: `${task.code}-q`, type: 'ጥራት', weight: 1, rating: defaultRating },
          { id: `${task.code}-t`, type: 'ጊዜ', weight: 1, rating: defaultRating }
        ];
      } else {
        criteria = [
          { id: `${task.code}-q`, type: 'ጥራት', weight: 1, rating: defaultRating }
        ];
      }
      return {
        subId: task.code,
        desc: task.description,
        criteria
      };
    })
  }));
}
