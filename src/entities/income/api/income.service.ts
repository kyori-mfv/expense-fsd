import { db } from "@/shared/api";
import type { IncomeRecord } from "@/shared/contract";
import { generateUUID } from "@/shared/lib/utils";
import Dexie from "dexie";

export const incomeService = {
  // Get all incomes
  async getAll(): Promise<IncomeRecord[]> {
    return await db.incomes.orderBy("date").reverse().toArray();
  },

  // Get recent incomes
  async getRecent(limit: number): Promise<IncomeRecord[]> {
    return await db.incomes.orderBy("createdAt").reverse().limit(limit).toArray();
  },

  // Get income by ID
  async getById(id: string): Promise<IncomeRecord | undefined> {
    return await db.incomes.where("id").equals(id).first();
  },

  // Add new income
  async add(income: Omit<IncomeRecord, "id" | "createdAt" | "updatedAt">): Promise<IncomeRecord> {
    const now = new Date();
    const newIncome: IncomeRecord = {
      ...income,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };

    await db.incomes.add(newIncome);
    return newIncome;
  },

  // Update income
  async update(id: string, updates: Partial<IncomeRecord>): Promise<void> {
    await db.incomes
      .where("id")
      .equals(id)
      .modify({
        ...updates,
        updatedAt: new Date(),
      });
  },

  // Delete income
  async delete(id: string): Promise<void> {
    await db.incomes.where("id").equals(id).delete();
  },

  // Query incomes with filters (no pagination - returns all matching records)
  async queryIncomesAll(params: {
    category?: string;
    dateFrom: Date;
    dateTo: Date;
    searchText?: string;
  }): Promise<IncomeRecord[]> {
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

    let results = await db.incomes
      .where(indexKey)
      .between(bounds[0], bounds[1], true, true)
      .toArray();

    // Reverse to DESC order (non-mutating to prevent React re-render issues)
    results = [...results].reverse();

    // Step 2: Text search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      results = results.filter((i) => i.description.toLowerCase().includes(searchLower));
    }

    return results;
  },

  // Query incomes with filters and pagination (optimized with DB-level pagination)
  async queryIncomesPaginated(params: {
    category?: string;
    dateFrom: Date;
    dateTo: Date;
    searchText?: string;
    page: number;
    limit: number;
  }): Promise<{ items: IncomeRecord[]; total: number }> {
    const { category, dateFrom, dateTo, searchText, page, limit } = params;

    const hasCategory = category && category !== "all";
    const offset = (page - 1) * limit;

    // Step 1: Build query with compound index
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

    const query = db.incomes.where(indexKey).between(bounds[0], bounds[1], true, true).reverse(); // DESC order by date

    // Step 2: Handle text search (requires special treatment for accurate pagination)
    if (searchText) {
      // For text search, we need to fetch all matching records first
      // then paginate in memory (IndexedDB doesn't support compound text search)
      const allResults = await query.toArray();
      const searchLower = searchText.toLowerCase();
      const filteredResults = allResults.filter((i) =>
        i.description.toLowerCase().includes(searchLower)
      );

      const total = filteredResults.length;
      const items = filteredResults.slice(offset, offset + limit);

      return { items, total };
    }

    // Step 3: No text search - use pure DB-level pagination (optimal performance)
    const total = await query.count();
    const items = await query.offset(offset).limit(limit).toArray();

    return { items, total };
  },

  // Count total incomes
  async count(): Promise<number> {
    return await db.incomes.count();
  },

  // Bulk add incomes (for import)
  async bulkAdd(incomes: Omit<IncomeRecord, "id" | "createdAt" | "updatedAt">[]): Promise<number> {
    const now = new Date();
    const incomesToAdd: IncomeRecord[] = incomes.map((income) => ({
      ...income,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    }));

    await db.incomes.bulkAdd(incomesToAdd);
    return incomesToAdd.length;
  },

  // Delete all incomes
  async deleteAll(): Promise<void> {
    await db.incomes.clear();
  },
};
