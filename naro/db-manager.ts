import { Naro } from "@narodb/naro";

export class DbManager {
  private static instance: DbManager | null = null;
  private dbs: Record<string, Naro> = {};
  private intervals: Record<string, NodeJS.Timeout> = {};

  private constructor() {
  }

  static getInstance(): DbManager {
    if (!DbManager.instance) {
      DbManager.instance = new DbManager();
    }
    return DbManager.instance;
  }

  getDb(projectId: string) {
    if (!this.dbs[projectId]) {
      this.dbs[projectId] = new Naro(projectId);
      this.intervals[projectId] = setInterval(() => {
        this.dbs[projectId].writeToDisk();
      }, 5000);
    }
    return this.dbs[projectId];
  }

  removeDb(projectId: string) {
    if (this.dbs[projectId]) {
      clearInterval(this.intervals[projectId]);
      delete this.intervals[projectId];
      delete this.dbs[projectId];
    }
  }
}

export const dbManager = DbManager.getInstance();
