import { Naro } from "@narodb/naro";

let db: Naro | null = null;

const getDatabase = (): Naro => {
  if (!db) db = new Naro("system-dev");
  return db;
};

export default getDatabase;
