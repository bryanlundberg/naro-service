import { NextResponse } from "next/server";
import getDatabase from "@/naro/db";

export async function GET(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const db = getDatabase();
  const { projectId } = await params;

  if (!projectId || projectId === "undefined") throw new Error("Invalid projectId");

  const projects = await db.getAll("projects", {
    limit: 1,
    filters: [
      {
        field: "id",
        operator: "==",
        value: projectId
      }
    ]
  });

  const project = projects[0];
  return NextResponse.json(project);
}
