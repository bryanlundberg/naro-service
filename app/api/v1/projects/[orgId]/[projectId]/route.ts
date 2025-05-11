import db from "@/naro/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  if (!appId || appId === "undefined") throw new Error("Invalid projectId");

  const projects = await db.getAll("projects", {
    limit: 1,
    filters: [
      {
        field: "applicationId",
        operator: "==",
        value: appId
      }
    ]
  });

  if (!projects || projects.length === 0) {
    return NextResponse.json({ ok: false, message: "No projects found" });
  }

  const project = projects[0];

  return NextResponse.json(project);
}
