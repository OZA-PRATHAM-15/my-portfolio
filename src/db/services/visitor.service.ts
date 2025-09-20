import { supabase } from "../supabase";
import type { ConsentStatus, VisitorLog } from "../schema";

export const logVisitor = async (
  ip: string,
  consent: ConsentStatus,
  user_agent: string
): Promise<VisitorLog | null> => {
  const insertPayload = {
    consent,
    user_agent,
    ...(consent === "ACCEPTED" && { ip }),
  };

  const { data, error } = await supabase
    .from("visitor_logs")
    .insert([insertPayload])
    .select()
    .single();

  if (error) {
    console.error("Failed to log visitor:", error);
    return null;
  }

  return data as VisitorLog;
};
