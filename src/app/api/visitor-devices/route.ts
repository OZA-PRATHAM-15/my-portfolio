import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("visitor_logs")
    .select("user_agent");

  if (error) {
    console.error("Failed to fetch device data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  let desktop = 0;
  let android = 0;
  let other = 0;

  data.forEach(({ user_agent }) => {
    const ua = user_agent.toLowerCase();
    if (ua.includes("android")) {
      android++;
    } else if (
      ua.includes("windows") ||
      ua.includes("macintosh") ||
      ua.includes("linux")
    ) {
      desktop++;
    } else {
      other++;
    }
  });

  return NextResponse.json({ desktop, android, other });
}
