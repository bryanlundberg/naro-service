import { NextResponse } from "next/server";
import db from "@/naro/db";

export async function POST(request: Request) {
  const body = await request.json();
  const newProject = await db.add("projects", body);
  return NextResponse.json({ ...newProject });
}
