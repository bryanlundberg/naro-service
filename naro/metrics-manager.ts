import { Naro } from "@narodb/naro";

interface OperationMetrics {
  reads: number;
  writes: number;
  queries: number;
  traffic: number; // in bytes
  lastUpdated: number;
}

interface TimeSeriesData {
  timestamp: number;
  value: number;
}

interface ProjectMetrics {
  operations: OperationMetrics;
  readHistory: TimeSeriesData[];
  writeHistory: TimeSeriesData[];
  queryHistory: TimeSeriesData[];
  trafficHistory: TimeSeriesData[];
}

export class MetricsManager {
  private static instance: MetricsManager | null = null;
  private metrics: any = {};
  private db: Naro;
  private readonly HISTORY_LENGTH = 100; // Keep last 100 data points

  private constructor() {
    this.db = new Naro("metrics");
    this.loadMetrics();
  }

  static getInstance(): MetricsManager {
    if (!MetricsManager.instance) {
      MetricsManager.instance = new MetricsManager();
    }
    return MetricsManager.instance;
  }

  private async loadMetrics() {
    try {
      const savedMetrics = await this.db.get("metrics");
      if (savedMetrics) {
        this.metrics = savedMetrics;
      }
    } catch (error) {
      console.error("Error loading metrics:", error);
    }
  }

  private async saveMetrics() {
    try {
      await this.db.set("metrics", this.metrics);
    } catch (error) {
      console.error("Error saving metrics:", error);
    }
  }

  private initializeProjectMetrics(projectId: string) {
    if (!this.metrics[projectId]) {
      this.metrics[projectId] = {
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
      };
    }
  }

  private addToHistory(history: TimeSeriesData[], value: number) {
    const now = Date.now();
    history.push({ timestamp: now, value });

    // Keep history within limit
    if (history.length > this.HISTORY_LENGTH) {
      history.shift();
    }
  }

  trackOperation(projectId: string, method: string, params: any[], resultSize: number) {
    this.initializeProjectMetrics(projectId);

    const metrics = this.metrics[projectId];
    const now = Date.now();

    // Estimate traffic size in bytes (rough approximation)
    const paramsSize = JSON.stringify(params).length;
    const totalTraffic = paramsSize + resultSize;

    // Update metrics based on operation type
    if (method.startsWith("get") || method === "find" || method === "findOne") {
      metrics.operations.reads++;
      this.addToHistory(metrics.readHistory, metrics.operations.reads);
    } else if (method.startsWith("set") || method === "add" || method === "update" || method === "delete") {
      metrics.operations.writes++;
      this.addToHistory(metrics.writeHistory, metrics.operations.writes);
    } else if (method.startsWith("query")) {
      metrics.operations.queries++;
      this.addToHistory(metrics.queryHistory, metrics.operations.queries);
    }

    // Update traffic metrics
    metrics.operations.traffic += totalTraffic;
    this.addToHistory(metrics.trafficHistory, metrics.operations.traffic);

    // Update last updated timestamp
    metrics.operations.lastUpdated = now;

    // Save metrics periodically (not on every operation to avoid performance issues)
    if (Math.random() < 0.1) { // 10% chance to save on each operation
      this.saveMetrics();
    }
  }

  getMetrics(projectId: string): ProjectMetrics | null {
    return this.metrics[projectId] || null;
  }

  getAllMetrics(): Record<string, ProjectMetrics> {
    return this.metrics;
  }
}

export const metricsManager = MetricsManager.getInstance();
