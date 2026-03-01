import type { HollandCode, HollandScores, Career, Major, CareerMatch, MajorMatch } from "@/lib/types";

export type { HollandScores };

const HOLLAND_CODES: HollandCode[] = ["R", "I", "A", "S", "E", "C"];

/** Max possible Holland match score (perfect 3-code alignment) */
const MAX_MATCH_SCORE = 6;

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

/** Convert raw match score (0-6) to percentage (0-100) */
function scoreToPercentage(score: number): number {
  return Math.round((score / MAX_MATCH_SCORE) * 100);
}

export function matchCareers(
  scores: HollandScores,
  careers: Career[],
  limit = 8
): CareerMatch[] {
  const topCodes = getTopCodes(scores, 3);
  const scored = [...careers]
    .map((career) => ({
      career,
      score: hollandMatchScore(topCodes, career.holland_codes),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const maxScore = scored[0]?.score ?? 1;
  return scored.map(({ career, score }) => ({
    career,
    match_percentage: maxScore > 0 ? Math.min(100, scoreToPercentage(score)) : 0,
  }));
}

export function matchMajors(
  scores: HollandScores,
  majors: Major[],
  limit = 8
): MajorMatch[] {
  const topCodes = getTopCodes(scores, 3);
  const scored = [...majors]
    .map((major) => ({
      major,
      score: hollandMatchScore(topCodes, major.holland_codes),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const maxScore = scored[0]?.score ?? 1;
  return scored.map(({ major, score }) => ({
    major,
    match_percentage: maxScore > 0 ? Math.min(100, scoreToPercentage(score)) : 0,
  }));
}
