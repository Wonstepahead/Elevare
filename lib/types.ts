export type HollandCode = "R" | "I" | "A" | "S" | "E" | "C";

export interface Career {
  id: string;
  name: string;
  description: string;
  holland_codes: HollandCode[];
  salary_min?: number;
  salary_max?: number;
  /** Specific job titles within this career path */
  job_options?: string[];
  /** How future-proof this career is (1-10) */
  future_proof_score?: number;
}

export interface Major {
  id: string;
  name: string;
  description: string;
  holland_codes: HollandCode[];
  related_careers?: string[];
  /** Top colleges/universities for this major */
  top_schools?: string[];
  /** How future-proof this major is (1-10) */
  future_proof_score?: number;
}

export interface CareerMatch {
  career: Career;
  match_percentage: number;
}

export interface MajorMatch {
  major: Major;
  match_percentage: number;
}

export interface HollandScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    codes: Partial<Record<HollandCode, number>>;
  }[];
}
