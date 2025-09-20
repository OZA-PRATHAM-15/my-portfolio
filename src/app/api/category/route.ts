import { NextRequest, NextResponse } from "next/server";
import { createCategories } from "@/db/services/category.service";
import type { Category } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected an array of categories" },
        { status: 400 }
      );
    }

    const valid = body.every((item) => typeof item.name === "string");
    if (!valid) {
      return NextResponse.json(
        { error: "Each category must have a 'name' field" },
        { status: 400 }
      );
    }

    const names = (body as Category[]).map((item) => item.name);
    const inserted = await createCategories(names);
    return NextResponse.json({ success: true, inserted });
  } catch (error) {
    console.error("Failed to insert categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
