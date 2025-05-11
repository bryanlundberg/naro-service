import { Naro } from "@narodb/naro";

export class DbManager {
  private dbs: Record<string, Naro> = {};

  addDb(appId: string) {
    if (!this.dbs[appId]) this.dbs[appId] = new Naro(appId);
    return this.dbs[appId];
  }

  getDb(appId: string) {
    return this.dbs[appId];
  }
}

export const dbManager = new DbManager();
