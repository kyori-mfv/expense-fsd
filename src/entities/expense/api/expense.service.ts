import { db } from "@/shared/api";
import type { ExpenseRecord } from "@/shared/contract";
import { generateUUID } from "@/shared/lib/utils";
import Dexie from "dexie";

export const expenseService = {
  // Get all expenses
  async getAll(): Promise<ExpenseRecord[]> {
    return await db.expenses.orderBy("date").reverse().toArray();
  },

  // Get recent expenses
  async getRecent(limit: number): Promise<ExpenseRecord[]> {
    return await db.expenses.orderBy("createdAt").reverse().limit(limit).toArray();
  },

  // Get expense by ID
  async getById(id: string): Promise<ExpenseRecord | undefined> {
    return await db.expenses.where("id").equals(id).first();
  },

  // Add new expense
  async add(
    expense: Omit<ExpenseRecord, "id" | "createdAt" | "updatedAt">
  ): Promise<ExpenseRecord> {
    const now = new Date();
    const newExpense: ExpenseRecord = {
      ...expense,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };

    await db.expenses.add(newExpense);
    return newExpense;
  },

  // Update expense
  async update(id: string, updates: Partial<ExpenseRecord>): Promise<void> {
    await db.expenses
      .where("id")
      .equals(id)
      .modify({
        ...updates,
        updatedAt: new Date(),
      });
  },

  // Delete expense
  async delete(id: string): Promise<void> {
    await db.expenses.where("id").equals(id).delete();
  },

  // Query expenses with filters (no pagination - returns all matching records)
  async queryExpensesAll(params: {
    category?: string;
    dateFrom: Date;
    dateTo: Date;
    searchText?: string;
  }): Promise<ExpenseRecord[]> {
    const { category, dateFrom, dateTo, searchText } = params;

    const hasCategory = category && category !== "all";

    // Step 1: Query with compound index
    const indexKey = hasCategory ? "[category+date+createdAt]" : "[date+createdAt]";
    const bounds = hasCategory
      ? [
          [category, dateFrom, Dexie.minKey],
          [category, dateTo, Dexie.maxKey],
        ]
      : [
          [dateFrom, Dexie.minKey],
          [dateTo, Dexie.maxKey],
        ];

    let results = await db.expenses
      .where(indexKey)
      .between(bounds[0], bounds[1], true, true)
      .toArray();

    // Reverse to DESC order (non-mutating to prevent React re-render issues)
    results = [...results].reverse();

    // Step 2: Text search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      results = results.filter((e) => e.description.toLowerCase().includes(searchLower));
    }

    return results;
  },

  // Query expenses with filters and pagination
  async queryExpensesPaginated(params: {
    category?: string;
    dateFrom: Date;
    dateTo: Date;
    searchText?: string;
    page: number;
    limit: number;
  }): Promise<{ items: ExpenseRecord[]; total: number }> {
    const { category, dateFrom, dateTo, searchText, page, limit } = params;

    // Get all matching records first
    const allResults = await expenseService.queryExpensesAll({
      category,
      dateFrom,
      dateTo,
      searchText,
    });

    // Get total
    const total = allResults.length;

    // Paginate
    const offset = (page - 1) * limit;
    const items = allResults.slice(offset, offset + limit);

    return { items, total };
  },

  // Count total expenses
  async count(): Promise<number> {
    return await db.expenses.count();
  },

  // Bulk add expenses (for import)
  async bulkAdd(
    expenses: Omit<ExpenseRecord, "id" | "createdAt" | "updatedAt">[]
  ): Promise<number> {
    const now = new Date();
    const expensesToAdd: ExpenseRecord[] = expenses.map((expense) => ({
      ...expense,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    }));

    await db.expenses.bulkAdd(expensesToAdd);
    return expensesToAdd.length;
  },

  // Delete all expenses
  async deleteAll(): Promise<void> {
    await db.expenses.clear();
  },
};
