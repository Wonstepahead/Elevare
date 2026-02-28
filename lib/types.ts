export type HollandCode = "R" | "I" | "A" | "S" | "E" | "C";

export interface Career {
  id: string;
  name: string;
  description: string;
  holland_codes: HollandCode[];
  salary_min?: number;
  salary_max?: number;
}

export interface Major {
  id: string;
  name: string;
  description: string;
  holland_codes: HollandCode[];
  related_careers?: string[];
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
