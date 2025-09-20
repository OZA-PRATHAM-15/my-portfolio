import { NextRequest, NextResponse } from "next/server";
import { createAvatars } from "@/db/services/avatar.service";
import type { Avatar } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected an array of avatars" },
        { status: 400 }
      );
    }

    const valid = body.every((item) => typeof item.url === "string");
    if (!valid) {
      return NextResponse.json(
        { error: "Each avatar must have a 'url' field of type string" },
        { status: 400 }
      );
    }

    const urls = (body as Avatar[]).map((item) => item.url);
    const inserted = await createAvatars(urls);
    return NextResponse.json({ success: true, inserted });
  } catch (error) {
    console.error("Failed to insert avatars:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
