import { TaskCategory, CompetencyItem, PerformanceGrade } from '../types/appraisal';

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
