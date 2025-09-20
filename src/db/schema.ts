export type ConsentStatus = "ACCEPTED" | "DECLINED";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface VisitorLog {
  id?: string; //UUID
  ip: string;
  consent: ConsentStatus;
  user_agent: string;
  created_at?: string;
}

export interface Avatar {
  id?: string; //UUID
  url: string;
}

export interface Category {
  id?: string; //UUID
  name: string;
}

export interface Question {
  id?: string; //UUID
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_index: number;
  category_id: string;
  difficulty: Difficulty;
}

export interface QuizUser {
  id?: string; //UUID
  name: string;
  avatar_id?: string;
  category_id?: string;
  questions_attempted?: number;
  correct?: number;
  wrong?: number;
  time_finished?: number;
  finished_at?: string;
}
