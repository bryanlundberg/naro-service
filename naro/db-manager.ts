import { Naro } from "@narodb/naro";

export class DbManager {
  private dbs: Record<string, Naro> = {};

  getDb(appId: string) {
    if (!this.dbs[appId]) this.dbs[appId] = new Naro(appId);
    return this.dbs[appId];
  }
}

export const dbManager = new DbManager();
