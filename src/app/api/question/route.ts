import { NextRequest, NextResponse } from "next/server";
import { createQuestions } from "@/db/services/question.service";
import type { Question } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected an array of questions" },
        { status: 400 }
      );
    }

    const isValid = body.every(
      (item) =>
        typeof item.question === "string" &&
        typeof item.option1 === "string" &&
        typeof item.option2 === "string" &&
        typeof item.option3 === "string" &&
        typeof item.option4 === "string" &&
        typeof item.correct_index === "number" &&
        typeof item.difficulty === "string" &&
        typeof item.category_id === "string"
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Each question must include all required fields" },
        { status: 400 }
      );
    }

    const inserted = await createQuestions(body as Question[]);
    return NextResponse.json({ success: true, inserted });
  } catch (error) {
    console.error("Failed to insert questions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
