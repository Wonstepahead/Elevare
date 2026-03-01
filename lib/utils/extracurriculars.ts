import { extracurriculars } from "@/lib/data/extracurriculars";
import { majors } from "@/lib/data/majors";
import { careers } from "@/lib/data/careers";
import type { HollandCode, Extracurricular } from "@/lib/types";

function hollandOverlap(codes1: HollandCode[], codes2: HollandCode[]): number {
  return codes1.filter((c) => codes2.includes(c)).length;
}

/** Recommend extracurriculars by Holland codes (e.g. from quiz results) */
export function recommendByHollandCodes(codes: HollandCode[], limit = 8): Extracurricular[] {
  return [...extracurriculars]
    .map((e) => ({
      extracurricular: e,
      score: hollandOverlap(codes, e.holland_codes),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.extracurricular);
}

/** Recommend extracurriculars by major name */
export function recommendByMajor(majorName: string, limit = 8): Extracurricular[] {
  const major = majors.find((m) => m.name.toLowerCase() === majorName.toLowerCase());
  if (!major) return extracurriculars.slice(0, limit);
  return recommendByHollandCodes(major.holland_codes, limit);
}

/** Recommend extracurriculars by career name */
export function recommendByCareer(careerName: string, limit = 8): Extracurricular[] {
  const career = careers.find((c) => c.name.toLowerCase() === careerName.toLowerCase());
  if (!career) return extracurriculars.slice(0, limit);
  return recommendByHollandCodes(career.holland_codes, limit);
}
