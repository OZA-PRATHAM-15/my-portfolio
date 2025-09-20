import { supabase } from "../supabase";
import type { Difficulty, Question } from "../schema";

export type QuestionInsert = {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_index: number;
  difficulty: Difficulty;
  category_id: string;
};

export const createQuestions = async (
  questions: QuestionInsert[]
): Promise<Question[] | null> => {
  const { data, error } = await supabase
    .from("questions")
    .insert(questions)
    .select();

  if (error) {
    console.error("Error inserting questions:", error);
    return null;
  }

  return data as Question[];
};

export const getAllQuestions = async (): Promise<Question[] | null> => {
  const { data, error } = await supabase.from("questions").select("*");

  if (error) {
    console.error("Error fetching questions:", error);
    return null;
  }

  return data as Question[];
};

export const getQuestionsByCategory = async (
  categoryId: string
): Promise<Question[] | null> => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    console.error("Error fetching questions by category:", error);
    return null;
  }

  return data as Question[];
};
