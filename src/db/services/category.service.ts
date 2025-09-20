import { supabase } from "../supabase";
import type { Category } from "../schema";

export const createCategories = async (
  names: string[]
): Promise<Category[] | null> => {
  const insertPayload = names.map((name) => ({ name }));

  const { data, error } = await supabase
    .from("categories")
    .insert(insertPayload)
    .select();

  if (error) {
    console.error("Error creating categories:", error);
    return null;
  }

  return data as Category[];
};

export const getAllCategories = async (): Promise<Category[] | null> => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return null;
  }

  return data as Category[];
};
