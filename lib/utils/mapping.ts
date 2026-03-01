import { majors } from "@/lib/data/majors";
import { careers } from "@/lib/data/careers";
import type { Major, Career } from "@/lib/types";

/** Get majors that lead to a given career (by career name) */
export function getMajorsForCareer(careerName: string): Major[] {
  return majors.filter(
    (m) => m.related_careers?.some((c) => c.toLowerCase() === careerName.toLowerCase())
  );
}

/** Get careers that a major leads to */
export function getCareersForMajor(major: Major): Career[] {
  if (!major.related_careers?.length) return [];
  return careers.filter((c) =>
    major.related_careers!.some((rc) => rc.toLowerCase() === c.name.toLowerCase())
  );
}
