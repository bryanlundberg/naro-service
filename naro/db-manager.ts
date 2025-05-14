import { Naro } from "@narodb/naro";

export class DbManager {
  private static instance: DbManager | null = null;
  private dbs: Record<string, Naro> = {};

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
      setInterval(() => {
        this.dbs[projectId].writeToDisk();
      }, 5000);
    }
    return this.dbs[projectId];
  }
}

export const dbManager = DbManager.getInstance();
