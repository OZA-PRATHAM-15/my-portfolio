import { supabase } from "../supabase";
import type { Avatar } from "../schema";

export const createAvatars = async (
  urls: string[]
): Promise<Avatar[] | null> => {
  const insertPayload = urls.map((url) => ({ url }));

  const { data, error } = await supabase
    .from("avatars")
    .insert(insertPayload)
    .select();

  if (error) {
    console.error("Error creating avatars:", error);
    return null;
  }

  return data as Avatar[];
};

export const getAllAvatars = async (): Promise<Avatar[] | null> => {
  const { data, error } = await supabase.from("avatars").select("*");

  if (error) {
    console.error("Error fetching avatars:", error);
    return null;
  }

  return data as Avatar[];
};
