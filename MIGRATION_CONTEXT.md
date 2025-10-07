# Migration Context

## Source Codebase

**Location**: `/Users/huynh.duy.khanh/Documents/GITs/pwa/`
**Target**: `/Users/huynh.duy.khanh/Documents/GITs/expense-fsd/`

### Source Structure

```
pwa/src/tools/expense-manager/
├── types/                  # Type definitions
├── utils/                  # Utilities (currency, categories)
├── components/
│   ├── sidebar/           # Navigation
│   ├── settings/          # Settings UI
│   ├── expense/           # Expense components
│   ├── income/            # Income components
│   ├── input/             # AI/Manual input forms
│   ├── shared/            # Shared components (⚠️ mixed expense/income)
│   ├── dashboard/         # Dashboard views
│   ├── transactions/      # Transaction views (⚠️ combined)
│   └── views/             # Page views
├── hooks/                 # React hooks
└── services/
    └── ai-providers/      # AI integration (Gemini, etc.)
```

### ⚠️ Key Issues in Source

1. **Mixed Types**: `TransactionRecord = ExpenseRecord | IncomeRecord` (line 26)
2. **Type Field**: Both have `type: "expense" | "income"` discriminator
3. **Shared Components**: `transaction-item.tsx`, `recent-transactions.tsx` handle both
4. **Single Store**: `ExpenseManagerState` contains both `expenses[]` and `income[]`

### Migration Strategy

**DO NOT** copy these patterns:
- ❌ `TransactionRecord` union type
- ❌ `type` field discriminators
- ❌ Shared components for both types
- ❌ Mixed stores

**INSTEAD**:
- ✅ Completely separate expense and income
- ✅ Duplicate components if needed
- ✅ Separate stores (useExpenseStore, useIncomeStore)
- ✅ Separate services and entities

---

## Migration Mapping

### Source → Target

| Source | Target (FSD) | Notes |
|--------|--------------|-------|
| `types/index.ts` | `shared/types/` | ✅ Separate expense/income types |
| `utils/currency-utils.ts` | `shared/lib/format.ts` | ✅ Pure utilities |
| `utils/default-categories.ts` | `shared/config/categories.ts` | ✅ Config only |
| `components/input/ai-expense-input.tsx` | `features/add-expense/ui/` | ⚠️ Remove preview |
| `components/input/ai-income-input.tsx` | `features/add-income/ui/` | ⚠️ Remove preview |
| `components/shared/transaction-item.tsx` | Split → `entities/expense/ui/expense-item.tsx` + `entities/income/ui/income-item.tsx` | ❌ No shared component |
| `components/expense/` | `features/`, `entities/expense/` | ✅ Restructure by FSD |
| `components/income/` | `features/`, `entities/income/` | ✅ Restructure by FSD |
| `components/dashboard/` | `widgets/`, `pages/dashboard-page/` | ✅ Separate data streams |
| `services/ai-providers/` | `entities/ai-provider/api/` | ✅ Keep Gemini only |
| `hooks/` | Distribute to features/entities | ✅ Co-locate with logic |

---

## AI Provider Analysis

**Source Uses**: Multiple AI providers (Gemini, OpenAI, Claude)
**Target Uses**: **Gemini only** (Gemini 2.0 Flash)

### What to Migrate
- ✅ Gemini provider implementation
- ✅ Vietnamese parsing logic
- ✅ Category keyword detection
- ✅ Amount parsing (100k, 1tr)

### What to Remove
- ❌ OpenAI provider
- ❌ Claude provider
- ❌ Provider selection UI
- ❌ Preview step after parsing

---

## Database Migration

### Source (Current)
```typescript
// Mixed approach - likely using IndexedDB
ExpenseManagerState {
  expenses: ExpenseRecord[];
  income: IncomeRecord[];
  categories: CategoryRecord[];  // Single categories table
}
```

### Target (FSD)
```typescript
// Dexie with separate tables
db.version(1).stores({
  expenses: "id, amount, category, *date, description",
  income: "id, amount, category, *date, description",
  "expense-categories": "id, name, icon, color",
  "income-categories": "id, name, icon, color",
});
```

**Key Changes**:
- Separate `expense-categories` and `income-categories` tables
- No `type` field in records
- No combined queries

---

## UI Components Migration

### shadcn/ui Components (Copy as-is)
Source likely has these, need to verify and copy:
- Button
- Card
- Input
- Dialog
- Select
- Calendar
- Badge
- Separator

### Custom Components (Refactor)

| Component | Action |
|-----------|--------|
| `transaction-item.tsx` | ❌ Split into `expense-item.tsx` + `income-item.tsx` |
| `recent-transactions.tsx` | ❌ Split into `recent-expenses.tsx` + `recent-income.tsx` |
| `expense-filters.tsx` | ✅ Keep for expenses only |
| `income-filters.tsx` | ✅ Keep for income only |
| `date-range-picker.tsx` | ✅ Shared (pure UI) |
| `expense-pagination.tsx` | ✅ Rename to generic pagination if used by both |

---

## Phase 1 Progress

### Completed ✅
- [x] Basic project setup (Vite, React, TypeScript)
- [x] Shared types defined (separate expense/income)
- [x] Shared config (categories, keywords)
- [x] Basic utilities (format, cn)

### Next Steps 🎯
1. Copy shadcn/ui components from source
2. Set up Dexie database with separate tables
3. Migrate Gemini AI provider
4. Build expense entity layer
5. Implement add-expense feature (no preview)

---

## Reference Links

- **Source Code**: `/Users/huynh.duy.khanh/Documents/GITs/pwa/`
- **Migration Plan**: [docs/migration-plan.md](docs/migration-plan.md)
- **Architecture Rules**: [docs/rules.md](docs/rules.md)

---

**Last Updated**: 2025-10-06
