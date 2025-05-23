import { NextResponse } from "next/server";
import getDatabase from "@/naro/db";
import { dbManager } from "@/naro/db-manager";
import { ok } from "node:assert";

export async function POST(request: Request, { params }: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await params;
  if (!orgId || orgId === "undefined") throw new Error("Invalid orgId");

  const body = await request.json();

  const db = getDatabase();
  const newProject = await db.add(`projects`, {
    ...body,
    applicationId: `${Math.floor(Math.random() * 1e12)}`,
    finishBuild: Date.now() + 10000,
  });

  return NextResponse.json(newProject);
}

export async function GET(request: Request, { params }: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await params;
  if (!orgId || orgId === "undefined") throw new Error("Invalid orgId");

  const db = getDatabase();
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

export async function DELETE(request: Request, { params }: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await params;
  if (!orgId || orgId === "undefined") throw new Error("Invalid orgId");

  const body = await request.json();
  const db = getDatabase();
  await db.delete(`projects/${body.id}`);
  dbManager.removeDb(body.id);

  return NextResponse.json({ ok });
}
