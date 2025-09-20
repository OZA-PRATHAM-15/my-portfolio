import { supabase } from "../supabase";
import type { QuizUser } from "../schema";

export const createQuizUser = async (
  payload: Omit<QuizUser, "id" | "finished_at">
): Promise<QuizUser | null> => {
  const { data, error } = await supabase
    .from("quiz_users")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("Error creating quiz user:", error);
    return null;
  }

  return data as QuizUser;
};

export const getLeaderboard = async (): Promise<QuizUser[] | null> => {
  const { data, error } = await supabase
    .from("quiz_users")
    .select("*")
    .order("correct", { ascending: false })
    .order("time_finished", { ascending: true });

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return null;
  }

  return data as QuizUser[];
};

export const getQuizUserById = async (id: string): Promise<QuizUser | null> => {
  const { data, error } = await supabase
    .from("quiz_users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching quiz user by ID:", error);
    return null;
  }

  return data as QuizUser;
};

export const updateQuizUser = async (
  id: string,
  updates: Partial<QuizUser>
): Promise<QuizUser | null> => {
  const { data, error } = await supabase
    .from("quiz_users")
    .update(updates)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating quiz user:", error);
    return null;
  }

  return data as QuizUser;
};
