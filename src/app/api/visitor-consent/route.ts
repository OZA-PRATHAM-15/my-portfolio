import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase";

export async function GET() {
  const { data, error } = await supabase.from("visitor_logs").select("consent");

  if (error) {
    console.error("Failed to fetch consent data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  const accepted = data.filter((entry) => entry.consent === "ACCEPTED").length;
  const rejected = data.filter((entry) => entry.consent === "REJECTED").length;

  return NextResponse.json({ accepted, rejected });
}
