import { NextRequest, NextResponse } from "next/server";
import {
  createQuizUser,
  getLeaderboard,
  getQuizUserById,
  updateQuizUser,
} from "@/db/services/quiz-users.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const quizUser = await createQuizUser(body);

    if (!quizUser) {
      return NextResponse.json(
        { success: false, message: "Failed to create quiz user." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: quizUser });
  } catch (error) {
    console.error("POST /api/quiz-users error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const leaderboard = searchParams.get("leaderboard");

  try {
    if (leaderboard === "true") {
      const data = await getLeaderboard();
      return NextResponse.json({ success: true, data });
    }

    if (id) {
      const user = await getQuizUserById(id);
      return NextResponse.json({ success: true, data: user });
    }

    return NextResponse.json(
      { success: false, message: "Invalid query." },
      { status: 400 }
    );
  } catch (error) {
    console.error("GET /api/quiz-users error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required for update." },
        { status: 400 }
      );
    }

    const updatedUser = await updateQuizUser(id, updates);

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Failed to update quiz user." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("PATCH /api/quiz-users error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
