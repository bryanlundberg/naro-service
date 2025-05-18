import { NextResponse } from "next/server";
import { metricsManager } from "@/naro/metrics-manager";
import getDatabase from "@/naro/db";

export async function GET(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const { projectId } = await params;

    const db = getDatabase();
    const project = await db.get(`projects/${projectId}`);
    if (!project) {
      return NextResponse.json(
        { message: `Project with ID "${projectId}" does not exist` },
        { status: 404 }
      );
    }

    const metrics = metricsManager.getMetrics(projectId);

    if (!metrics) {
      return NextResponse.json(
        {
          metrics: {
            operations: {
              reads: 0,
              writes: 0,
              queries: 0,
              traffic: 0,
              lastUpdated: Date.now()
            },
            readHistory: [],
            writeHistory: [],
            queryHistory: [],
            trafficHistory: []
          }
        }
      );
    }

    return NextResponse.json({ metrics });
  } catch (error: unknown) {
    console.error("Error in metrics API route:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
