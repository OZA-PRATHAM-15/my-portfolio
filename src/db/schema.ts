export type ConsentStatus = "ACCEPTED" | "DECLINED";

export interface VisitorLog {
  id?: number; //UUID
  ip: string;
  consent: ConsentStatus;
  user_agent: string;
  created_at?: string;
}
