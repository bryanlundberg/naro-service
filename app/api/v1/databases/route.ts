import { NextResponse } from "next/server";
import { dbManager } from "@/naro/db-manager";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, method, params = [] } = body;

    if (!projectId || !method) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: projectId or method" },
        { status: 400 }
      );
    }

    const database = dbManager.getDb(projectId);

    // @ts-ignore
    if (typeof database[method] !== "function") {
      return NextResponse.json(
        { success: false, error: `The method "${method}" does not exist in the database` },
        { status: 400 }
      );
    }

    // @ts-ignore
    const result = await database[method](...params);
    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
