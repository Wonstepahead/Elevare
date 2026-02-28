import type { HollandCode, HollandScores, Career, Major } from "@/lib/types";

export type { HollandScores };

const HOLLAND_CODES: HollandCode[] = ["R", "I", "A", "S", "E", "C"];

export function createEmptyScores(): HollandScores {
  return { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
}

export function addScores(
  scores: HollandScores,
  additions: Partial<Record<HollandCode, number>>
): HollandScores {
  const next = { ...scores };
  for (const code of HOLLAND_CODES) {
    next[code] += additions[code] ?? 0;
  }
  return next;
}

export function getTopCodes(scores: HollandScores, count = 3): HollandCode[] {
  return (HOLLAND_CODES as HollandCode[])
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, count);
}

function hollandMatchScore(
  userCodes: HollandCode[],
  itemCodes: HollandCode[]
): number {
  let score = 0;
  for (let i = 0; i < userCodes.length; i++) {
    const idx = itemCodes.indexOf(userCodes[i]);
    if (idx >= 0) {
      score += 3 - Math.min(i, idx);
    }
  }
  return score;
}

export function matchCareers(
  scores: HollandScores,
  careers: Career[],
  limit = 8
): Career[] {
  const topCodes = getTopCodes(scores, 3);
  return [...careers]
    .map((career) => ({
      career,
      score: hollandMatchScore(topCodes, career.holland_codes),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ career }) => career);
}

export function matchMajors(
  scores: HollandScores,
  majors: Major[],
  limit = 8
): Major[] {
  const topCodes = getTopCodes(scores, 3);
  return [...majors]
    .map((major) => ({
      major,
      score: hollandMatchScore(topCodes, major.holland_codes),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ major }) => major);
}
