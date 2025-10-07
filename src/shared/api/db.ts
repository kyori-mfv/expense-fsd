import type { ExpenseRecord } from "@/shared/types";
import Dexie, { type EntityTable } from "dexie";

// Database class
class ExpenseDatabase extends Dexie {
  expenses!: EntityTable<ExpenseRecord, "id">;

  constructor() {
    super("ExpenseManagerDB");

    // Single version with optimized compound indexes
    this.version(1).stores({
      expenses:
        "id, createdAt, date, category, [category+date+createdAt], [date+createdAt], *description",
    });
  }
}

export const db = new ExpenseDatabase();
