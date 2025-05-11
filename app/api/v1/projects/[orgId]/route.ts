import { NextResponse } from "next/server";
import db from "@/naro/db";

export async function POST(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  if (!projectId || projectId === "undefined") throw new Error("Invalid projectId");

  const body = await request.json();
  const newProject = await db.add(`projects`, {
    ...body,
    applicationId: `${Math.floor(Math.random() * 1e12)}`,
    finishBuild: Date.now() + 30000
  });

  return NextResponse.json(newProject);
}

export async function GET(request: Request, { params }: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await params;
  if (!orgId || orgId === "undefined") throw new Error("Invalid orgId");

  const projects = await db.getAll("projects", {
    filters: [
      {
        field: "orgId",
        operator: "==",
        value: orgId
      }
    ]
  });

  return NextResponse.json(projects);
}
