import { NextResponse } from "next/server";
import { metricsManager } from "@/naro/metrics-manager";
import getDatabase from "@/naro/db";

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = await params;

    const db = getDatabase();
    const project = await db.get(`projects/${projectId}`);
    if (!project) {
      return NextResponse.json(
        { success: false, error: `Project with ID "${projectId}" does not exist` },
        { status: 404 }
      );
    }

    const metrics = metricsManager.getMetrics(projectId);

    if (!metrics) {
      return NextResponse.json(
        {
          success: true,
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

    return NextResponse.json({ success: true, metrics });
  } catch (error: unknown) {
    console.error("Error in metrics API route:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
