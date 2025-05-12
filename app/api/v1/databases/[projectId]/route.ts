import getDatabase from "@/naro/db";
import { NextResponse } from "next/server";
import { dbManager } from "@/naro/db-manager";

export async function GET(request: Request, { params }: { params: Promise<{ projectId: string }> }) {

  const { projectId } = await params;
  if (!projectId || projectId === "undefined") throw new Error("Invalid projectId");

  const db = getDatabase();
  const project = await db.get(`projects/${projectId}`);

  if (!project) throw new Error("Not found project");

  const manager = dbManager.getDb(projectId);

  console.log("manager", manager);

  await manager.add("users", { number: Math.floor(Math.random() * 100) });
  await manager.add("tickets", { number: Math.floor(Math.random() * 100) });

  return NextResponse.json(manager.getStructuredCollections());
}
