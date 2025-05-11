import { NextResponse } from "next/server";
import { Naro } from "@narodb/naro";

/* eslint-disable @typescript-eslint/no-explicit-any */
const dbs: Record<string, any> = {};

export async function POST(request: Request, { params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  if (!dbs[appId]) dbs[appId] = new Naro(appId);

  const body = await request.json();

  const projects = await dbs[appId].getAll("projects")

  return NextResponse.json({ ok: true, ...body, projects });
}
